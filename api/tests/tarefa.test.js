import request from "supertest";
import app from "../index.js";
import { db } from "../db.js";

describe("Tarefa Endpoints", () => {
  let token;

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

    await request(app).post("/api/auth/register").send({
      name: "testuser",
      email: "testuser@example.com",
      password: "password123",
    });

    const res = await request(app).post("/api/auth/login").send({
      name: "testuser",
      password: "password123",
    });
    token = res.headers["set-cookie"][0].split(";")[0];
  });


  afterAll(() => {
    db.end();
  });

  it("Deve adicionar uma nova tarefa", async () => {
    const res = await request(app).post("/api/tarefas/adicionarTarefa").set("Cookie", token).send({
      title: "Nova Tarefa",
      desc: "Descrição da nova tarefa",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Tarefa criada com sucesso!");
  });

  it("Deve falhar ao adicionar tarefa sem título ou descrição", async () => {
    const res = await request(app).post("/api/tarefas/adicionarTarefa").set("Cookie", token).send({
      title: "",
      desc: "",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error", "Título e descrição são obrigatórios!");
  });

  it("Deve buscar tarefas pendentes", async () => {
    const res = await request(app).get("/api/tarefas/tarefasPendentes").set("Cookie", token);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("Deve buscar tarefas concluídas", async () => {
    const res = await request(app).get("/api/tarefas/tarefasConcluidas").set("Cookie", token);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("Deve concluir uma tarefa existente", async () => {
    const resAdicionar = await request(app).post("/api/tarefas/adicionarTarefa").set("Cookie", token).send({
      title: "Tarefa a ser concluída",
      desc: "Descrição da tarefa a ser concluída",
    });

    const tarefaId = resAdicionar.body.id;

    const res = await request(app).put(`/api/tarefas/concluir/${tarefaId}`).set("Cookie", token);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual("Tarefa concluída com sucesso.");
  });

  it("Deve atualizar uma tarefa existente", async () => {
    const resAdicionar = await request(app).post("/api/tarefas/adicionarTarefa").set("Cookie", token).send({
      title: "Tarefa a ser atualizada",
      desc: "Descrição da tarefa a ser atualizada",
    });

    const tarefaId = resAdicionar.body.id;

    const res = await request(app).put(`/api/tarefas/${tarefaId}`).set("Cookie", token).send({
      title: "Tarefa atualizada",
      desc: "Descrição atualizada da tarefa",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Tarefa atualizada com sucesso!");
  });

  it("Deve excluir uma tarefa existente", async () => {
    const resAdicionar = await request(app).post("/api/tarefas/adicionarTarefa").set("Cookie", token).send({
      title: "Tarefa a ser excluída",
      desc: "Descrição da tarefa a ser excluída",
    });

    const tarefaId = resAdicionar.body.id;

    const res = await request(app).delete(`/api/tarefas/${tarefaId}`).set("Cookie", token);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual("Tarefa excluída com sucesso.");
  });
});
