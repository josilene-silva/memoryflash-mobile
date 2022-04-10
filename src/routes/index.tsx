import React from 'react';

import { Container } from './styles';
import { Auth } from './auth.routes';
import { App } from './app.routes';
import { useAuth } from '../hooks/auth';
import { navigationRef } from './navigation';

function Routes() {
  const isAuth = useAuth().user.token;
  const Application = isAuth ? App : Auth;
  return (
    <Container ref={navigationRef}>
      <Application />
    </Container>
  );
}

export { Routes };
