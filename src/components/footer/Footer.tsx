import {
  FormEvent,
  useEffect,
  useRef,
  useState
} from 'react';
import { ChatGPT } from '@assets/svgs/ChatGPT';
import { Message } from '@assets/svgs/Message';
import { useClickOutside } from '@components/hooks/useClickOutside';
import { ArrowRight } from '@assets/svgs/ArrowRight';
import { Loader } from '@components/loader/Loader';
import { toast } from 'sonner';
import './footer.scss';

const Footer = () => {
  const [email, setEmail] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (isOpen && formRef.current) {
      formRef.current.classList.remove('close-form');
      formRef.current.classList.add('open-form');
    } else if (!isOpen && formRef.current) {
      if (formRef.current.classList.contains('open-form')) {
        formRef.current.classList.add('close-form');
        formRef.current.classList.remove('open-form');
      }
    }
  }, [isOpen]);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  const handleSendFeedback = async (
    e: FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://wisian.onrender.com/feedback',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            feedback: text
          })
        }
      );
      if (response.status === 200) {
        setEmail('');
        setText('');
        toast.success(
          `Thank you for sharing your thoughts.`
        );
      }
    } catch (error) {
      toast.error(
        'There was an error sending feedback. Please try again.'
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useClickOutside(formRef, handleClose);

  return (
    <footer>
      <div className="container">
        <div className="footer">
          <div className="footer-left">
            <button onClick={handleOpen}>
              <Message /> <p>Feedback</p>
            </button>
            <form
              ref={formRef}
              onSubmit={handleSendFeedback}
              className="footer-left--form"
            >
              <h3>We'll be happy to read you :)</h3>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email or name"
              />
              <textarea
                name="textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add your feedback"
                rows={10}
                cols={50}
              >
                Write something here
              </textarea>
              <button
                type="submit"
                onClick={handleSendFeedback}
              >
                <span>
                  Submit
                  {isLoading ? (
                    <Loader width={20} height={20} />
                  ) : (
                    <ArrowRight />
                  )}
                </span>
              </button>
            </form>
          </div>
          <div className="footer-right">
            <p>
              Powered by <b>ChatGPT</b>
            </p>
            <ChatGPT />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
