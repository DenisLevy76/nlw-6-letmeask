import React from 'react';
import cx from 'classnames';

import './styles.scss';
import { UserInfo } from '../UserInfo';

interface Author {
  displayName: string;
  photoURL: string;
}

export interface IQuestion {
  id: string;
  author: Author;
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
}

interface QuestionProps {
  question: IQuestion;
}

export const Question: React.FC<QuestionProps> = ({ question, children }) => {
  return (
    <li
      className={cx(
        { highlighted: question.isHighlighted && !question.isAnswered },
        { answered: question.isAnswered }
      )}
    >
      <p>{question.content}</p>
      <div className="content-container">
        <UserInfo
          photoURL={question.author.photoURL}
          displayName={question.author.displayName}
        />
        <div className="buttons">{children}</div>
      </div>
    </li>
  );
};
