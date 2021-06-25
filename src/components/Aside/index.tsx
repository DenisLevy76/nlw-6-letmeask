import React from 'react';
import Illustration from '../../assets/images/illustration.svg';

import './styles.scss';

export const Aside: React.FC = () => {
  return (
    <aside>
      <img
        src={Illustration}
        alt="Ilustração simbolizando perguntas e respostas"
      />
      <strong>Crie salas de Q&amp;A ao-vivo</strong>
      <p>Tires as dúvidas da sua audiência em tempo real</p>
    </aside>
  );
};
