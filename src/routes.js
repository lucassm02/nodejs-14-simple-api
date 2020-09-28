import { Router } from "express";
import { uuid } from "uuidv4";
const routes = Router();

const projects = [];

routes.get("/projects", (request, response) => response.json(projects));

routes.get("/projects/:id", (request, response) => {
  const { id } = request.params;
  const project = projects.find((project) => project.id === id);

  if (!project) response.status(404).json({ error: "Project not found." });

  response.json(project);
});

routes.post("/projects", (request, response) => {
  const { owner, title } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(project);
});

routes.put("/projects/:id", (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0)
    response.status(404).json({ error: "Project not found." });

  projects[projectIndex] = { id, title, owner };

  response.json(projects[projectIndex]);
});

routes.delete("/projects/:id", (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0)
    response.status(404).json({ error: "Project not found." });

  projects.splice(projectIndex, 1);

  response.json({ success: "Project removed whit success." });
});

export default routes;
