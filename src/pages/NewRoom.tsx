import React, { FormEvent, useEffect, useState } from 'react';
import Logo from '../assets/images/logo.svg';

import '../styles/newRoom.scss';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Aside } from '../components/Aside';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { Header } from '../components/Header';

export const NewRoom: React.FC = () => {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState<string>('');

  useEffect(() => {
    if (!user) {
      history.push('/');
    }
  }, [user, history]);

  function handleCreateRoom(e: FormEvent) {
    e.preventDefault();

    if (newRoom.trim()) {
      const roomRef = database.ref('rooms');

      const firebaseRoom = roomRef.push({
        title: newRoom,
        authorId: user?.uid,
      });

      history.push(`/admin/rooms/${firebaseRoom.key}`);
    }
  }

  return (
    <div>
      <Header />
      <div className="page-newRoom">
        <Aside />
        <main>
          <div className="main-content">
            <img src={Logo} alt="Logo letmeask" />
            <h2>Crie uma nova sala</h2>

            <form onSubmit={handleCreateRoom}>
              <Input
                type="text"
                name="roomName"
                id="roomName"
                placeholder="Nome da sala"
                onChange={(e) => setNewRoom(e.target.value)}
                value={newRoom}
              />
              <Button type="submit" className="join">
                Criar sala
              </Button>
              <p>
                Quer entrar em uma sala já existente?{' '}
                <Link to="/">Clique aqui</Link>
              </p>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};
