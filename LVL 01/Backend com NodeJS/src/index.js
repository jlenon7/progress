const express = require("express");
const { uuid, isUuid } = require("uuidv4");

const app = express();
app.use(express.json());

const projects = [];

function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);

  next();

  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response
      .status(400)
      .json({ type: "error", msg: "Invalid project ID" });
  }

  return next();
}

app.use(logRequests);
app.use("/projects/:id", validateProjectId);

app.get("/projects", (request, response) => {
  const { title } = request.query;

  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;

  return response.status(200).json({
    type: "index",
    msg: "All projects",
    response: { projects: results },
  });
});

app.post("/projects", (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };
  projects.push(project);

  return response.status(200).json({
    type: "store",
    msg: "Project stored",
    response: { project: project },
  });
});

app.put("/projects/:id", (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response
      .status(404)
      .json({ type: "error", msg: "Error, project not found!" });
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.status(200).json({
    type: "update",
    msg: "Project updated",
    response: { project: project },
  });
});

app.delete("/projects/:id", (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response
      .status(404)
      .json({ type: "error", msg: "Error, project not found!" });
  }

  projects.splice(projectIndex, 1);

  return response.status(200).json({
    type: "delete",
    msg: "Project deleted",
  });
});

app.listen(process.env.PORT || 3333, () => {
  console.log(`🚀 API Listening at ${process.env.PORT || 3333}! 🤯`);
});
