import axios from "axios";
import React, { useEffect, useState } from "react";

const Tarefas = () => {
  const [tarefas, setTarefas] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const fetchTarefasPendentes = async () => {
    try {
      const response = await axios.get("/tarefas/tarefasPendentes", {
        withCredentials: true,
      });
      setTarefas(response.data);
    } catch (err) {
      console.error("Erro ao buscar tarefas pendentes: ", err);
    }
  };

  const handleExcluir = async (id) => {
    try {
      await axios.delete(`/tarefas/${id}`, { withCredentials: true });
      setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
    } catch (err) {
      console.error("Erro ao excluir tarefa: ", err);
    }
  };

  const handleConcluir = async (id) => {
    try {
      await axios.put(`/tarefas/concluir/${id}`, {}, { withCredentials: true });
      setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
    } catch (err) {
      console.error("Erro ao concluir tarefa: ", err);
    }
  };

  const handleEdit = (tarefa) => {
    setEditId(tarefa.id);
    setEditTitle(tarefa.title);
    setEditDesc(tarefa.desc);
  };

  const handleSave = async () => {
    try {
      await axios.put(`/tarefas/${editId}`, { title: editTitle, desc: editDesc }, { withCredentials: true });
      setTarefas(tarefas.map((tarefa) =>
        tarefa.id === editId ? { ...tarefa, title: editTitle, desc: editDesc } : tarefa
      ));
      setEditId(null);
    } catch (err) {
      console.error("Erro ao salvar tarefa: ", err);
    }
  };

  const handleCancel = () => {
    setEditId(null);
  };

  useEffect(() => {
    fetchTarefasPendentes();
  }, []);

  return (
    <div className="tarefas">
      {tarefas.length === 0 ? (
        <h1>Não há tarefas pendentes.</h1>
      ) : (
        tarefas.map((tarefa) => (
          <div className="tarefa" key={tarefa.id}>
            <div className="content">
              {editId === tarefa.id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <textarea
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                  />
                  <button onClick={handleSave}>Salvar</button>
                  <button onClick={handleCancel}>Cancelar</button>
                </>
              ) : (
                <>
                  <h1>{tarefa.title}</h1>
                  <p>{tarefa.desc}</p>
                </>
              )}
            </div>
            <div className="tempo">
              <p>
                Data de criação: <time dateTime={tarefa.date}>{new Date(tarefa.date).toLocaleDateString("pt-BR")}</time>
              </p>
            </div>
            <div className="gerenciamento">
              <button onClick={() => handleConcluir(tarefa.id)} disabled={tarefa.status === 1}>
                Concluir
              </button>
              <button onClick={() => handleEdit(tarefa)}>
                Editar
              </button>
              <button onClick={() => handleExcluir(tarefa.id)}>Excluir</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Tarefas;
