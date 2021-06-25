import { useEffect, useState } from 'react';
import { database } from '../services/firebase';
import { useAuth } from './useAuth';

interface Author {
  displayName: string;
  photoURL: string;
}

export interface IFirebaseQuestion {
  author: Author;
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
  likes: Record<
    string,
    {
      authorId: string;
    }
  >;
}

export interface IQuestion {
  id: string;
  author: Author;
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
  likes: {
    likeCount: number;
    likeId: undefined | string;
  };
}

interface UseRoomData {
  questions: IQuestion[];
  title: string;
}

type FirebaseQuestions = Record<string, IFirebaseQuestion>;

export function useRoom(roomId: string): UseRoomData {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [title, setTitle] = useState<string>('');
  const { user } = useAuth();

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', (room) => {
      const dbRoom = room.val();
      const firebaseQuestion: FirebaseQuestions = dbRoom.questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestion).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likes: {
              likeCount: Object.values(value.likes ?? {}).length,
              likeId: Object.entries(value.likes ?? {}).find(
                ([key, value]) => value.authorId === user?.uid
              )?.[0],
            },
          };
        }
      );

      setQuestions(parsedQuestions);
      setTitle(dbRoom.title);

      return () => {
        roomRef.off('value');
      };
    });
  }, [roomId, user?.uid]);

  return { questions, title };
}
