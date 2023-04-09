import { useState, useEffect, useRef } from 'react';
import { FC, ChangeEvent } from 'react';
import { Logo } from '@assets/svgs/Logo';
import { Formule } from '@assets/svgs/Formule';
import { PrimaryButton } from '@components/buttons/PrimaryButton';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '@components/contexts/UserContext';
import jwt_decode from 'jwt-decode';
import './login.scss';

const clientId = 'get-client-id-from-server';

export const Login: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] =
    useState<boolean>(true);

  const { updateUser } = useUserContext();
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
        type: 'icon',
        shape: 'pill'
      }
    );

    google.accounts.id.prompt();
  }, []);

  const handleResponse = (response) => {
    console.log(response.credential);
    const decodedUser = jwt_decode(response.credential);
    const user = {
      email: decodedUser.email,
      name: decodedUser.name,
      given_name: decodedUser.given_name,
      family_name: decodedUser.family_name,
      picture: decodedUser.picture
    };
    updateUser(user);
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
      <div className="login-left">
        <h1>Hello friend</h1>
        <h2>
          We are happy you are <b>here</b>
        </h2>
      </div>
      <div className="login-right">
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
              <div>
                <p>Don't have an account?</p>
                <Link to="/sign-up">Sign up</Link>
              </div>
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
      <div className="login-bg">
        <Formule />
      </div>
    </div>
  );
};
