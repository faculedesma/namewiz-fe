import { Heart } from '@assets/svgs/Heart';
import { Leave } from '@assets/svgs/Leave';
import { User } from '@assets/svgs/User';
import { Link } from 'react-router-dom';
import {
  IUser,
  useUserContext
} from '@components/contexts/UserContext';
import './user-profile.scss';

interface IUserProfileProps {
  user: IUser;
}

export const UserProfile = ({
  user
}: IUserProfileProps) => {
  const { logout } = useUserContext();

  return (
    <div className="user-profile">
      {user.email ? (
        <>
          <div className="user-profile--header">
            <div className="user-profile--header-picture">
              <img src={user.picture} alt="user-image" />
            </div>
            <div className="user-profile--header-info">
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="user-profile--body">
            <Link to="/profile">
              <User />
              <span>Profile</span>
            </Link>
            <Link to="/saved">
              <Heart />
              <span>Saved names</span>
            </Link>
          </div>
          <div className="user-profile--footer">
            <Link to="/login" onClick={logout}>
              <Leave />
              <span>Log out</span>
            </Link>
          </div>
        </>
      ) : (
        <>
          <Link to="/saved-names">Saved</Link>
          <Link to="/logout">Log out</Link>
        </>
      )}
    </div>
  );
};
