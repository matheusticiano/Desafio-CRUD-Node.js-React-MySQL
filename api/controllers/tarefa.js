import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getTarefasConcluidas = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ error: "Você não está autenticado!" });
  }

  jwt.verify(token, "jwtkey", (err, payload) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido!" });
    }

    req.userid = payload.id;

    const q = "SELECT * FROM tarefas WHERE status = true AND userid = ?";
    db.query(q, [req.userid], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json(data);
    });
  });
};

export const getTarefasPendentes = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ error: "Você não está autenticado!" });
  }

  jwt.verify(token, "jwtkey", (err, payload) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido!" });
    }

    req.userid = payload.id;

    const q = "SELECT * FROM tarefas WHERE status = false AND userid = ?";
    db.query(q, [req.userid], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json(data);
    });
  });
};

export const excluirTarefa = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ error: "Você não está autenticado!" });
  }

  jwt.verify(token, "jwtkey", (err, payload) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido!" });
    }

    const userId = payload.id;
    const tarefaId = req.params.id;

    const q = "SELECT userid FROM tarefas WHERE id = ?";
    db.query(q, [tarefaId], (err, data) => {
      if (err) return res.json(err);
      if (data.length === 0) return res.status(404).json({ error: "Tarefa não encontrada!" });

      const tarefaUserId = data[0].userid;
      if (tarefaUserId !== userId) {
        return res.status(403).json({ error: "Acesso negado!" });
      }

      const deleteQ = "DELETE FROM tarefas WHERE id = ?";
      db.query(deleteQ, [tarefaId], (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json("Tarefa excluída com sucesso.");
      });
    });
  });
};

export const adicionarTarefa = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    console.log("Token não encontrado");
    return res.status(401).json({ error: "Você não está autenticado!" });
  }

  jwt.verify(token, "jwtkey", (err, payload) => {
    if (err) {
      console.log("Erro na verificação do token:", err);
      return res.status(403).json({ error: "Token inválido!" });
    }

    const userId = payload.id;
    const { title, desc } = req.body;

    console.log("Dados recebidos:", { title, desc });

    if (!title || !desc) {
      console.log("Título ou descrição ausentes");
      return res.status(400).json({ error: "Título e descrição são obrigatórios!" });
    }

    const dataCriacao = new Date().toISOString().split("T")[0]; // Formato DATE

    const q = "INSERT INTO tarefas (title, `desc`, status, userid, date) VALUES (?, ?, false, ?, ?)";
    db.query(q, [title, desc, userId, dataCriacao], (err, result) => {
      if (err) {
        console.log("Erro ao inserir tarefa:", err);
        return res.json(err);
      }
      console.log("Tarefa inserida com sucesso");
      return res.status(201).json({ message: "Tarefa criada com sucesso!" });
    });
  });
};

export const atualizarTarefa = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ error: "Você não está autenticado!" });
  }

  jwt.verify(token, "jwtkey", (err, payload) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido!" });
    }

    const userId = payload.id;
    const { id } = req.params;
    const { title, desc } = req.body;

    if (!title || !desc) {
      return res.status(400).json({ error: "Título e descrição são obrigatórios!" });
    }

    const q = "UPDATE tarefas SET title = ?, `desc` = ? WHERE id = ? AND userid = ?";

    db.query(q, [title, desc, id, userId], (err, result) => {
      if (err) {
        console.error("Erro ao atualizar tarefa:", err);
        return res.status(500).json({ error: "Erro ao atualizar tarefa!" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Tarefa não encontrada ou você não tem permissão para atualizá-la." });
      }

      return res.status(200).json({ message: "Tarefa atualizada com sucesso!" });
    });
  });
};

export const concluirTarefa = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ error: "Você não está autenticado!" });
  }

  jwt.verify(token, "jwtkey", (err, payload) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido!" });
    }

    const userId = payload.id;
    const tarefaId = req.params.id;

    const q = "SELECT userid FROM tarefas WHERE id = ?";
    db.query(q, [tarefaId], (err, data) => {
      if (err) return res.json(err);
      if (data.length === 0) return res.status(404).json({ error: "Tarefa não encontrada!" });

      const tarefaUserId = data[0].userid;
      if (tarefaUserId !== userId) {
        return res.status(403).json({ error: "Acesso negado!" });
      }

      const updateQ = "UPDATE tarefas SET status = 1, due_date = ? WHERE id = ?";
      const currentDate = new Date().toISOString().slice(0, 10);
      db.query(updateQ, [currentDate, tarefaId], (err, result) => {
        if (err) return res.json(err);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Tarefa não encontrada para atualização!" });
        return res.status(200).json("Tarefa concluída com sucesso.");
      });
    });
  });
};
