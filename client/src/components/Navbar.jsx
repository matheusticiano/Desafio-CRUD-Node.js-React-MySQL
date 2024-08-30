import React, { useContext } from "react";
import Logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
            <Link className="link" to="/">
              <img src={Logo} alt="imagem do logo"/>
            </Link>
        </div>
        <div className="links">
          <Link className="link" to="/tarefas">
            <h6>Tarefas Pendentes</h6>
          </Link>
          <Link className="link" to="/tarefasconcluidas">
            <h6>Tarefas Concluidas</h6>
          </Link>
          <Link className="link" to="/novatarefa">
            <h6>Criar Tarefa</h6>
          </Link>
          <span>{currentUser?.name}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              {" "}
              Login{" "}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
