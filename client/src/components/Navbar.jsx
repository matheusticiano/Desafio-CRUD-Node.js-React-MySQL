import React, { useContext, useState } from "react";
import Logo from "../img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <img src={Logo} alt="imagem do logo" />
          </Link>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <span>☰</span>
        </div>
        <div className={`links-container ${menuOpen ? "active" : ""}`}>
          <div className="links">
            <Link className="link" to="/tarefas">
              <span>Tarefas Pendentes</span>
            </Link>
            <Link className="link" to="/tarefasconcluidas">
              <span>Tarefas Concluídas</span>
            </Link>
            <Link className="link" to="/novatarefa">
              <span>Criar Tarefa</span>
            </Link>
          </div>

          <div className="links_user">
            {currentUser && <span>{currentUser.name}</span>}
            {currentUser ? (
              <span onClick={handleLogout}>Logout</span>
            ) : (
              <Link className="link" to="/login">
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
