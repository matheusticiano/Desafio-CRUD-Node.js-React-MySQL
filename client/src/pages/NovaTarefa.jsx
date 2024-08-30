import React, { useState } from "react";
import axios from "axios";

const NovaTarefa = () => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log("Enviando requisição com dados:", { title: titulo, desc: descricao });
        const response = await axios.post("/tarefas/adicionarTarefa", {
            title: titulo,
            desc: descricao,
        });

        console.log("Resposta recebida:", response.data);
        setTitulo("");
        setDescricao("");
        setErro("");
        alert(response.data.message);
    } catch (error) {
        if (error.response) {
            console.log("Erro na resposta da requisição:", error.response);
            setErro(error.response.data.error || "Erro ao criar a tarefa. Tente novamente.");
        } else {
            console.log("Erro na requisição:", error);
            setErro("Erro ao criar a tarefa. Tente novamente.");
        }
    }
};




  return (
    <div className="novatarefa">
      <h1>Crie Sua Nova Tarefa</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome da Tarefa"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <button type="submit">Confirmar</button>
        {erro && <p>{erro}</p>}
      </form>
    </div>
  );
};

export default NovaTarefa;
