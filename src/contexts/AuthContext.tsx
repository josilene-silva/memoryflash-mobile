import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';

interface User {
  name: string;
  email: string;
  token: string;
}

type AuthContextType = {
  user: User;
  onAuthUser: (data: User) => void;
};

const AuthContext = createContext({} as AuthContextType);

const userDefault = {
  name: '',
  email: '',
  token: '',
};

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(userDefault);

  const onAuthUser = useCallback(newUser => {
    setUser(newUser);
  }, []);

  const authParameters = useMemo(
    () => ({ user, onAuthUser }),
    [user, onAuthUser],
  );

  return (
    <AuthContext.Provider value={authParameters}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider, User };
