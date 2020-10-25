import React, { useState, useEffect } from "react";
import Header from "./components/Header";

import api from "./services/api";

import "./App.css";
import backgroundImage from "./assets/background.jpg";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setProjects(response.data.repos);
    });
  }, []);

  async function handleAddProject() {
    // setProjects([...projects, `Novo projeto ${Date.now()}`]);

    const response = await api.post("repositories", {
      title: "dedSec",
      techs: "NodeJS, Type Script",
    });

    const project = response.data.repo;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="Projects" />

      <img width={200} src={backgroundImage} alt={backgroundImage} />

      <ul>
        {projects.map((project) => (
          <li key={project._id}>{project.title}</li>
        ))}
      </ul>

      <button type="button" onClick={handleAddProject}>
        Adicionar Projeto
      </button>
    </>
  );
}

export default App;
