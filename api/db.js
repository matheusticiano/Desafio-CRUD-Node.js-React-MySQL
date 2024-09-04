import mysql from "mysql2";

const config = {
  host: process.env.DB_URL ? process.env.DB_URL : "localhost",
  user: "root",
  password: "desafio123",
  database: process.env.NODE_ENV === "test" ? "desafio_test" : "desafio",
};

export const db = mysql.createConnection(config);
