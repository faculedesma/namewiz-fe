import { useState, useEffect, useRef } from 'react';
import { FC, ChangeEvent, FormEvent } from 'react';
import { Logo } from '@assets/svgs/Logo';
import { PrimaryButton } from '@components/buttons/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import './login.scss';

const clientId =
  '484473104100-u14dev8t47u3t8oa0cmfltg6ct10pfmn.apps.googleusercontent.com';

export const Login: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] =
    useState<boolean>(true);

  const navigate = useNavigate();

  const googleButtonRef = useRef();

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleResponse
    });

    google.accounts.id.renderButton(
      googleButtonRef.current,
      {
        theme: 'outline',
        size: 'large',
        text: 'continue_with'
      }
    );
  }, []);

  const handleResponse = (response) => {
    console.log(response.credential);
    navigate('/');
  };

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

  const handleLoginWithEmail = () => console.log(email);

  return (
    <div className="login">
      <div className="login-page">
        <div className="login-page--header">
          <Logo />
          <p>Wisian AI</p>
        </div>
        <div className="login-page--content">
          <h2>Welcome</h2>
          <div className="login-page--content-input">
            <input
              type="text"
              value={email}
              onChange={handleInputChange}
              placeholder="Enter email"
            />
            <PrimaryButton
              label="Log in"
              onClick={handleLoginWithEmail}
            />
            {!isEmailValid ? (
              <p>Please enter a valid email address</p>
            ) : null}
          </div>
          <div className="login-page--content-separator">
            <div></div>
            <p>OR</p>
            <div></div>
          </div>
          <div className="login-page--content-google">
            <div ref={googleButtonRef}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
