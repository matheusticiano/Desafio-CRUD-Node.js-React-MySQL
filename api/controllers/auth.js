import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ? OR name = ?";

  db.query(q, [req.body.email, req.body.name], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("Usuário já existe");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    const values = [req.body.name, req.body.email, hash];

    db.query(q, values, (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("Usuário criado.");
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE name = ?";

  db.query(q, [req.body.name], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("Usuario nao encontrado!!");

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

    if (!isPasswordCorrect) return res.status(400).json("Usuario ou senha incorretos");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      samesite: "none",
      secure: true,
    })
    .status(200)
    .json("Usuario Desconectado");
};
