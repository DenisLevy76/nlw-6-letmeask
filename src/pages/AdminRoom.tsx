import React from 'react';
import { Question } from '../components/Question';
import { Container } from '@material-ui/core';

import '../styles/room.scss';
import { Header } from '../components/Header';
import { useHistory, useParams } from 'react-router-dom';
import { IQuestion, useRoom } from '../hooks/useRoom';
import { Button } from '../components/Button';
import { database } from '../services/firebase';

interface RoomParams {
  id: string;
}

const AdminRoom: React.FC = () => {
  // const { user, signInWithGoogle } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);
  const history = useHistory();

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    const questionRef = await database.ref(
      `rooms/${roomId}/questions/${questionId}`
    );
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });
    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Are you sure you want to delete this question?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <>
      <Header>
        {true && (
          <Button className="outlined" onClick={handleEndRoom}>
            Encerrar Sala
          </Button>
        )}
      </Header>
      <Container>
        <div className="container">
          <div className="title">
            <h2>{title}</h2>
            <span>{questions.length} pergunta(s)</span>
          </div>

          <ul>
            {questions.map((question: IQuestion) => {
              return (
                <Question question={question} key={question.id}>
                  <button
                    type="button"
                    aria-label="Marcar como respondida"
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    disabled={question.isAnswered}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12.0003"
                        cy="11.9998"
                        r="9.00375"
                        stroke="#737380"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193"
                        stroke="#737380"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    aria-label="Destacar mensagem"
                    type="button"
                    onClick={() => handleHighlightQuestion(question.id)}
                    disabled={question.isAnswered}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z"
                        stroke="#737380"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label="Deletar pergunta"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 5.99988H5H21"
                        stroke="#f00"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z"
                        stroke="#f00"
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

export default AdminRoom;