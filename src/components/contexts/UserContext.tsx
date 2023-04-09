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

interface UserState {
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}

interface UserContextType {
  user: UserState;
  updateUser: <K extends keyof UserState>(
    key: K,
    value: UserState[K]
  ) => void;
}

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType>({
  user: defaultUser,
  updateUser: (newUser: UserState) => {}
});

const UserContextProvider: FC<UserContextProviderProps> = ({
  children
}) => {
  const [user, setState] = useState<UserState>(defaultUser);

  useEffect(() => {
    const userSessionStorage =
      sessionStorage.getItem('user');
    if (userSessionStorage) {
      updateUser(JSON.parse(userSessionStorage));
    }
  }, []);

  const updateUser = (newUser: UserState) => {
    sessionStorage.setItem('user', JSON.stringify(newUser));
    setState(newUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserContextProvider, useUserContext };
