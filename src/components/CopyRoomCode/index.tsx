import React from 'react';
import Copy from '../../assets/images/copy.svg';
import { Button } from '../Button';
import './styles.scss';

interface CopyRoomCodeProps {
  roomCode: string;
}

export const CopyRoomCode: React.FC<CopyRoomCodeProps> = ({ roomCode }) => {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(roomCode);
  }

  return (
    <Button className="CopyCode" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={Copy} alt="Copy room code" />
      </div>
      <span>{roomCode}</span>
    </Button>
  );
};
