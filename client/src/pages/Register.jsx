import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Cadastre-se</h1>
      <form>
        <input
          required
          type="text"
          placeholder="nome"
          name="name"
          onChange={handleChange}
        ></input>
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        ></input>
        <input
          required
          type="password"
          placeholder="senha"
          name="password"
          onChange={handleChange}
        ></input>
        <button onClick={handleSubmit}>Confirmar</button>
        {err && <p>{err}</p>}
        <span>
          {" "}
          Já possui uma conta? <Link to="/login">Fazer Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
