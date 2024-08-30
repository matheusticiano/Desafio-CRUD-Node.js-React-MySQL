import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div className="overlay">
        <h1>Gerencie Suas Tarefas com Facilidade</h1>
        <p>Simplifique sua rotina, aumente sua produtividade e mantenha suas tarefas organizadas com nosso software de gerenciamento de tarefas.</p>
        <Link to="/register" className="cta-button">
          Cadastre-se Já
        </Link>
      </div>
    </div>
  );
};

export default Home;
