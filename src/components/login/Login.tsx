import {
  useState,
  useEffect,
  useRef,
  FC,
  ChangeEvent
} from 'react';
import { Logo } from '@assets/svgs/Logo';
import { Formule } from '@assets/svgs/Formule';
import { PrimaryButton } from '@components/buttons/PrimaryButton';
import { Link, useNavigate } from 'react-router-dom';
import {
  useUserContext,
  IUser
} from '@components/contexts/UserContext';
import jwt_decode from 'jwt-decode';
import './login.scss';

const clientId = 'client-id.apps.googleusercontent.com';

export const Login: FC = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] =
    useState<boolean>(true);

  const { login } = useUserContext();
  const navigate = useNavigate();

  const googleButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* global google */
    (window as any).google.accounts.id.initialize({
      client_id: clientId,
      callback: handleResponse
    });

    (window as any).google.accounts.id.renderButton(
      googleButtonRef.current as HTMLDivElement,
      {
        theme: 'outline',
        size: 'large',
        type: 'icon',
        shape: 'pill'
      }
    );

    (window as any).google.accounts.id.prompt();
  }, []);

  const handleResponse = (response: any) => {
    const decodedUser: IUser = jwt_decode(
      response.credential
    );
    const user: IUser = {
      email: decodedUser.email,
      name: decodedUser.name,
      given_name: decodedUser.given_name,
      family_name: decodedUser.family_name,
      picture: decodedUser.picture
    };
    login(user);
    navigate('/');
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(
      emailRegex.test(inputEmail) ||
        !Boolean(inputEmail.length)
    );
  };

  const handleLoginWithEmail = (): void =>
    console.log(email);

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
            <p>Namewiz</p>
          </div>
          <div className="login-page--content">
            <h2>Welcome back</h2>
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
