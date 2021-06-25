import React from 'react';
import Logo from '../../assets/images/logo.svg';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../Button';
import { Link, useParams } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { CopyRoomCode } from '../CopyRoomCode';
import './styles.scss';

interface RoomParams {
  id: string;
}

export const Header: React.FC = ({ children }) => {
  const { user, signInWithGoogle, logout } = useAuth();
  const { id } = useParams<RoomParams>();

  return (
    <header>
      <Container>
        <div className="header">
          <Link to="/">
            <img className="logo" src={Logo} alt="Logo letmeask" />
          </Link>
          <div className="content">
            {id && (
              <>
                <CopyRoomCode roomCode={id} />
              </>
            )}
            {children}
            <Button
              className="login-logout"
              onClick={user ? logout : signInWithGoogle}
            >
              {user ? 'Logout' : 'Login'}
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};
