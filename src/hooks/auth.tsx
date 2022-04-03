import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { useAuth };
