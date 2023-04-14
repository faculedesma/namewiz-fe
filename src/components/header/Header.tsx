import { useState, useEffect, useRef } from 'react';
import { Logo } from '@assets/svgs/Logo';
import { Instagram } from '@assets/svgs/Instagram';
import { Twitter } from '@assets/svgs/Twitter';
import { User } from '@assets/svgs/User';
import { UserProfile } from '@components/profile/UserProfile';
import { Link } from 'react-router-dom';
import { useUserContext } from '@components/contexts/UserContext';
import { useClickOutside } from '@components/hooks/useClickOutside';
import './header.scss';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useUserContext();

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && profileRef.current) {
      profileRef.current.classList.remove('close-profile');
      profileRef.current.classList.add('open-profile');
    } else if (!isOpen && profileRef.current) {
      if (
        profileRef.current.classList.contains(
          'open-profile'
        )
      ) {
        profileRef.current.classList.add('close-profile');
        profileRef.current.classList.remove('open-profile');
      }
    }
  }, [isOpen]);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  useClickOutside(profileRef, handleClose);

  return (
    <header>
      <div className="container">
        <div className="header">
          <div className="header-logo">
            <Logo />
            <p>Namewiz</p>
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
              {user.name ? (
                <p>{user.given_name}</p>
              ) : (
                <Link to="/login">Sign in</Link>
              )}

              <div
                className={`header-right--user-pic ${
                  user.picture ? 'no-border' : ''
                }`}
              >
                {user.picture ? (
                  <img
                    src={user.picture}
                    onClick={handleOpen}
                  />
                ) : (
                  <User />
                )}
              </div>
              <div
                ref={profileRef}
                className="header-right--user-profile"
              >
                <UserProfile user={user} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
