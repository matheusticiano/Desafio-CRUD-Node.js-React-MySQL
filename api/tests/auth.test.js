import request from "supertest";
import app from "../index.js";
import { db } from "../db.js";

describe("Auth Endpoints", () => {
  beforeAll(async () => {
    await new Promise((resolve, reject) => {
      db.query("DELETE FROM users", (err) => {
        if (err) reject(err);
        resolve();
      });
    });

    await new Promise((resolve, reject) => {
      db.query("DELETE FROM tarefas", (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  });

  afterAll(() => {
    db.end();
  });

  it("Deve registrar um novo usuário", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "testuserauth",
      email: "testuserauth@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBe("Usuário criado.");
  });

  it("Deve falhar ao registrar um usuário existente", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "testuserauth",
      email: "testuserauth@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(409);
    expect(res.body).toEqual("Usuário já existe");
  });

  it("Deve logar um usuário existente", async () => {
    const res = await request(app).post("/api/auth/login").send({
      name: "testuserauth",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name");
  });

  it("Deve deslogar um usuário existente", async () => {
    const res = await request(app).post("/api/auth/logout").send({
      name: "testuserauth",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).not.toHaveProperty("name");
    expect(res.body).toEqual("Usuario Desconectado");
  });
});
