import React from 'react';

import './styles.scss';

interface UserInfoProps {
  displayName: string;
  photoURL?: string;
}

export const UserInfo: React.FC<UserInfoProps> = ({
  photoURL,
  displayName,
}) => {
  return (
    <div className="user-info">
      <div className="photo">
        {photoURL ? (
          <img src={photoURL} alt="Foto do usuário" />
        ) : (
          <h1 className="Mock">{displayName[0]}</h1>
        )}
      </div>
      <span>{displayName}</span>
    </div>
  );
};
