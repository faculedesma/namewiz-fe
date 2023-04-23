import { useState } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { ArrowRight } from '@assets/svgs/ArrowRight';
import { Loader } from '@components/loader/Loader';
import { toast } from 'sonner';
import './newsletter.scss';

export const Newsletter = () => {
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] =
    useState<boolean>(true);
  const [isSubscribing, setIsSubscribing] =
    useState<boolean>(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(
      emailRegex.test(inputEmail) ||
        !Boolean(inputEmail.length)
    );
  };

  const handleSubscribeNewsletter = async (
    e: FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!isEmailValid) return;
    setIsSubscribing(true);
    try {
      const response = await fetch(
        'https://wisian.onrender.com/newsletter',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: email })
        }
      );
      if (response.status === 200) {
        toast.success(
          `You've been successfully subscribed.`
        );
      }
    } catch (error) {
      toast.error(
        'There was an error subscribing. Please try again.'
      );
      throw error;
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="newsletter">
      <label>Subscribe to newsletter</label>
      <form onSubmit={handleSubscribeNewsletter}>
        <div className="newsletter-input">
          <input
            type="text"
            value={email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          {isSubscribing ? (
            <Loader width={20} height={20} />
          ) : (
            <button
              onClick={handleSubscribeNewsletter}
              disabled={!isEmailValid || !email}
            >
              <ArrowRight />
            </button>
          )}
        </div>
        {!isEmailValid ? (
          <p className="newsletter-input--error">
            Please enter a valid email address
          </p>
        ) : (
          <p></p>
        )}
      </form>
    </div>
  );
};
