import React from 'react';

import { Container } from './styles';
import { Auth } from './Auth';
// import App from './App';
import { useAuth } from '../hooks/auth';
import { navigationRef } from './navigation';

function Routes() {
  const isAuth = useAuth().user.token;
  const Application = Auth;
  return (
    <Container ref={navigationRef}>
      <Application />
    </Container>
  );
}

export { Routes };
