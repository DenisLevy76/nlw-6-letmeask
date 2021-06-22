import React from "react";
import Illustration from "../assets/images/illustration.svg";
import Logo from "../assets/images/logo.svg";
import GoogleIcon from "../assets/images/google-icon.svg";
import Join from "../assets/images/join.svg";

const Home: React.FC = () => {
  return (
    <div>
      <aside>
        <img
          src={Illustration}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tires as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div>
          <img src={Logo} alt="Logo letmeask" />
          <button type="button">
            <img src={GoogleIcon} alt="Logo google" />
            Crie a sua sala com o google
          </button>
          <div>ou entre em um sala</div>
          <form>
            <input
              type="text"
              name="idRoom"
              id="idRoom"
              placeholder="Digite o código da sala"
            />
            <button type="button">
              <img src={Join} alt="Entrar" />
              Entrar na sala
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
