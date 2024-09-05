import axios from "axios";
import React, { useEffect, useState } from "react";

const TarefasConcluidas = () => {
  const [tarefas, setTarefas] = useState([]);
  const [expandedTarefas, setExpandedTarefas] = useState({});

  const fetchTarefasConcluidas = async () => {
    try {
      const response = await axios.get("/tarefas/tarefasConcluidas", {
        withCredentials: true,
      });
      setTarefas(response.data);
    } catch (err) {
      console.error("Erro ao buscar tarefas concluídas: ", err);
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

  const toggleExpand = (id) => {
    setExpandedTarefas(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    fetchTarefasConcluidas();
  }, []);

  return (
    <div className="tarefas">
      {tarefas.length === 0 ? (
        <h1>Não há tarefas concluidas.</h1>
      ) : (
        tarefas.map((tarefa) => {
          const MAX_LENGTH = 300;
          const shortDesc = tarefa.desc.length > MAX_LENGTH 
            ? tarefa.desc.slice(0, MAX_LENGTH) + '... ' 
            : tarefa.desc;

          return (
            <div className="tarefa" key={tarefa.id}>
              <div className="content">
                    <h1>{tarefa.title}</h1>
                    <p>
                      {expandedTarefas[tarefa.id] ? tarefa.desc : shortDesc}
                      {tarefa.desc.length > MAX_LENGTH && (
                        <button onClick={() => toggleExpand(tarefa.id)}>
                          {expandedTarefas[tarefa.id] ? 'Ler menos' : 'Ler mais'}
                        </button>
                      )}
                    </p>
              </div>
          <div className="tempo">
            <p>
              Data de criação: <time dateTime={tarefa.date}>{new Date(tarefa.date).toLocaleDateString("pt-BR")}</time>
            </p>

            <p>
              Data de conclusão: <time dateTime={tarefa.due_date}>{new Date(tarefa.due_date).toLocaleDateString("pt-BR")}</time>
            </p>
          </div>
          <div className="gerenciamento">
            <button onClick={() => handleExcluir(tarefa.id)}>Excluir</button>
          </div>
        </div>
      );
    })
  )}
</div>
);
};

export default TarefasConcluidas;
