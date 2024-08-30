import express from "express";
import { getTarefasConcluidas, getTarefasPendentes, adicionarTarefa, excluirTarefa, concluirTarefa, atualizarTarefa } from "../controllers/tarefa.js";

const router = express.Router();

router.get("/tarefasPendentes", getTarefasPendentes);
router.get("/tarefasConcluidas", getTarefasConcluidas);
router.post("/adicionarTarefa", adicionarTarefa);
router.put("/concluir/:id", concluirTarefa);
router.delete("/:id", excluirTarefa);
router.put("/:id", atualizarTarefa);

export default router;
