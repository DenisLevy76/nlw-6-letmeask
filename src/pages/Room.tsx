import React, { FormEvent, useEffect, useState } from 'react';
import { Question } from '../components/Question';
import { Container } from '@material-ui/core';
import { Button } from '../components/Button';
import { UserInfo } from '../components/UserInfo';

import '../styles/room.scss';
import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/Header';
import toast, { Toaster } from 'react-hot-toast';
import { database } from '../services/firebase';
import { useHistory, useParams } from 'react-router-dom';
import { IQuestion, useRoom } from '../hooks/useRoom';

interface Author {
  displayName: string;
  photoURL: string;
}

interface RoomParams {
  id: string;
}

const Room: React.FC = () => {
  const { user, signInWithGoogle } = useAuth();
  const [newQuestion, setNewQuestion] = useState<string>('');
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);
  const history = useHistory();

  useEffect(() => {
    database
      .ref(`rooms/${roomId}`)
      .get()
      .then((room) => {
        if (room.val().endedAt) {
          history.push('/');
        }
      });
  }, [roomId, history]);

  async function handleNewQuestion(e: FormEvent) {
    e.preventDefault();

    if (!newQuestion.trim()) {
      toast.error('Enter a valid question');
      return;
    }

    if (!user) {
      toast.error('You must be logged in to create a question.');
      return;
    }

    const question = {
      content: newQuestion,
      author: {
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
  }

  async function handleLikeQuestion(
    questionId: string,
    likeId: string = ''
  ): Promise<void> {
    if (likeId) {
      await database
        .ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
        .remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.uid,
      });
    }
  }

  return (
    <>
      <Header />
      <Toaster />
      <Container>
        <div className="container">
          <div className="title">
            <h2>{title}</h2>
            <span>{questions.length} pergunta(s)</span>
          </div>

          <form className="ask-me" onSubmit={handleNewQuestion}>
            <textarea
              placeholder="O que você quer perguntar?"
              onChange={(e) => setNewQuestion(e.target.value)}
              value={newQuestion}
            />
            <div className="send">
              {user ? (
                <UserInfo
                  photoURL={user.photoURL}
                  displayName={user.displayName}
                />
              ) : (
                <span>
                  Para enviar uma pergunta,{' '}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      signInWithGoogle();
                    }}
                  >
                    faça seu login.
                  </button>
                </span>
              )}

              <Button type="submit" disabled={!user || newQuestion.length < 4}>
                Enviar pergunta
              </Button>
            </div>
          </form>

          <ul>
            {questions.map((question: IQuestion) => {
              return (
                <Question question={question} key={question.id}>
                  <button
                    type="button"
                    className={`like-button ${
                      question.likes.likeId ? 'liked' : ''
                    }`}
                    aria-label="Dar like na pergunta"
                    onClick={() =>
                      handleLikeQuestion(question.id, question.likes.likeId)
                    }
                    disabled={question.isAnswered}
                  >
                    {question.likes.likeCount > 0 && (
                      <span>{question.likes.likeCount}</span>
                    )}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                        stroke="#737380"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </Question>
              );
            })}
          </ul>
        </div>
      </Container>
    </>
  );
};

export default Room;
