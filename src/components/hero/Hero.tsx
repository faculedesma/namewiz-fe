import { useState } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { ArrowRight } from '@assets/svgs/ArrowRight';
import { Loader } from '@components/loader/Loader';
import { toast } from 'sonner';
import './hero.scss';

const Hero = () => {
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

  const handleSubscribeNewsletter = (
    e: FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
    setIsSubscribing(true);
    setTimeout(() => {
      setEmail('');
      setIsSubscribing(false);
      toast.success('Subscribed successfuly!');
    }, 2000);
    console.log(e);
  };

  return (
    <div className="hero">
      <div className="hero-left">
        <h1>
          Let's find the <b>perfect</b> name for your little
          one
        </h1>
        <h2>
          Our algorithms take into account a wide range of
          criteria, including zodiac signs, origin, meaning,
          and popularity.
        </h2>
        <div className="content-left--input">
          <label>Subscribe to newsletter</label>
          <form onSubmit={handleSubscribeNewsletter}>
            <div className="content-left--input-box">
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
              <p className="content-left--input-error">
                Please enter a valid email address
              </p>
            ) : (
              <p></p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
