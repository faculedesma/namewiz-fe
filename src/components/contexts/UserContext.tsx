import {
  FC,
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect
} from 'react';

const defaultUser = {
  email: '',
  name: '',
  given_name: '',
  family_name: '',
  picture: ''
};

export interface IUser {
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}

interface UserContextType {
  user: IUser;
  updateUser: (newUser: IUser) => void;
}

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType>({
  user: defaultUser,
  updateUser: (newUser: IUser) => {}
});

const UserContextProvider: FC<UserContextProviderProps> = ({
  children
}) => {
  const [user, setUser] = useState<IUser>(defaultUser);

  useEffect(() => {
    const userSessionStorage =
      sessionStorage.getItem('user');
    if (userSessionStorage) {
      setUser(JSON.parse(userSessionStorage));
    }
  }, []);

  const updateUser = (newUser: IUser) => {
    sessionStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserContextProvider, useUserContext };
