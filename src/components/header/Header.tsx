import { Logo } from '@assets/svgs/Logo';
import { Instagram } from '@assets/svgs/Instagram';
import { Twitter } from '@assets/svgs/Twitter';
import { User } from '@assets/svgs/User';
import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="header">
          <div className="header-logo">
            <Logo />
            <p>Wisian AI</p>
          </div>
          <div className="header-right">
            <div className="header-right--links">
              <a
                className="instagram"
                href="https://www.instagram.com/faculedesma73/"
                target="_blank"
                aria-label="Go to Wisian's Instagram account."
              >
                <Instagram />
              </a>
              <a
                className="twitter"
                href="https://twitter.com/faculedesma93"
                target="_blank"
                aria-label="Go to Wisian's Twitter account."
              >
                <Twitter />
              </a>
            </div>
            <div className="header-right--user">
              <Link to="/login">Sign in</Link>
              <div className="header-right--user-pic">
                <User />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
