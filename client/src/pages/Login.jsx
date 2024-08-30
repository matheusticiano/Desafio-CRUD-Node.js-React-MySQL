import React, { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    name: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs)
      navigate("/tarefas")
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="auth">
      <h1>Faça Login</h1>
      <form>
        <input required type="text" placeholder="usuario" name="name" onChange={handleChange}></input>
        <input required type="password" placeholder="senha" name="password" onChange={handleChange}></input>
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>
          {" "}
          Ainda não possui uma conta? <Link to="/register">Cadastre-se Já</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
