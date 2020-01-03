const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

function projectIdExists(req, res, next) {
  const { id } = req.params;

  const project = projects.find(project => project.id == id);

  if (!project) {
    return res.status(400).json({ error: `Project d'ont exists!` });
  }

  return next();
}

function countRequisitions(req, res, next) {
  console.count("Numero de requisições");

  return next();
}

server.post("/projects", countRequisitions, (req, res) => {
  const { id, title, tasks } = req.body;

  projects.push({ id, title, tasks });

  return res.json(projects);
});

server.get("/projects", countRequisitions, (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", projectIdExists, countRequisitions, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id == id);

  project.title = title;

  return res.json(projects);
});

server.delete(
  "/projects/:id",
  projectIdExists,
  countRequisitions,
  (req, res) => {
    const { id } = req.params;

    const project = projects.find(project => project.id == id);

    projects.splice(project, 1);

    return res.json(projects);
  }
);

server.post(
  "/projects/:id/tasks",
  projectIdExists,
  countRequisitions,
  (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(project => project.id == id);

    project.tasks.push(title);

    return res.json(projects);
  }
);

server.listen(3000);
