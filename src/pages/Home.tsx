import React, { FormEvent, useState } from 'react';
import Logo from '../assets/images/logo.svg';
import GoogleIcon from '../assets/images/google-icon.svg';
import GoogleIconColorized from '../assets/images/google-icon-colorized.svg';
import Join from '../assets/images/join.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { Aside } from '../components/Aside';
import { Input } from '../components/Input';

import { CircularProgress } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import { Header } from '../components/Header';
import toast, { Toaster } from 'react-hot-toast';

export const Home: React.FC = () => {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState<string>('');
  const [load, setLoad] = useState<boolean>(false);

  async function handleCreateRoom() {
    setLoad(true);
    if (!user) {
      await signInWithGoogle();
    }

    setLoad(false);
    history.push('/rooms/new');
  }

  async function handleJoinRoom(e: FormEvent) {
    setLoad(true);
    e.preventDefault();

    if (!roomCode.trim()) {
      toast.error('Entre com um código válido.');
      setLoad(false);
      return;
    }

    const room = await database.ref(`rooms/${roomCode}`).get();

    if (!room.exists()) {
      toast.error('Sala não existe.');
      setLoad(false);
      return;
    }

    if (room.val().endedAt) {
      toast.error('Sala encerrada.');
      setLoad(false);
      return;
    }

    setLoad(false);
    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div>
      <Header />
      <Toaster />
      <div className="page-auth">
        <Aside />
        <main>
          <div className="main-content">
            <img src={Logo} alt="Logo letmeask" />
            <Button
              type="button"
              className={`${user ? 'auth' : 'google'}`}
              onClick={handleCreateRoom}
            >
              <img
                src={user ? GoogleIcon : GoogleIconColorized}
                alt="Logo google"
              />
              Crie a sua sala com o google
            </Button>
            <div className="separator">ou entre em um sala</div>
            <form onSubmit={handleJoinRoom} autoComplete="off">
              <Input
                type="text"
                required
                name="idRoom"
                id="idRoom"
                placeholder="Digite o código da sala"
                onChange={(e) => setRoomCode(e.target.value)}
                value={roomCode}
              />
              <Button
                type="submit"
                className="join"
                disabled={!roomCode.trim() || load}
              >
                {load ? (
                  <CircularProgress size={20} style={{ color: 'white' }} />
                ) : (
                  <>
                    <img src={Join} alt="Entrar" />
                    Entrar na sala
                  </>
                )}
              </Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};
