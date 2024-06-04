import NotFoundError from "../exception/NotFoundError.js";
import TaskService from "../services/TaskService.js";
import joi from "joi";
// /Task
class TaskController {
  // [GET]
  async list(req, res, next) {
    const { page = 0, size = 20 } = req.query;
    const { _id } = req;
    try {
      const tasks = await TaskService.getList(
        _id,
        parseInt(page),
        parseInt(size)
      );

      return res.json(tasks);
    } catch (err) {
      next(err);
    }
  }
  // [GET]
  async getById(req, res, next) {
    if (!req.params.id)
      res
        .status(422)
        .send({ data: { error: true, message: "Id is reaquire" } });

    try {
      const task = await TaskService.getTaskById(req.params.id);

      return res.json(task);
    } catch (err) {
      next(err);
    }
  }

  // [POST] /create
  async createTask(req, res, next) {
    const { title, description, todoId } = req.body;
    // validate type
    const task = joi.object({
      title: joi.string().min(3).max(30).required(),
      description: joi.string().required(),
      todo: joi.string().required(),
    });

    // validation
    const { error, value } = task.validate({
      title,
      description,
      todo: todoId,
    });
    if (error) return res.status(422).json({ error });
    try {
      const data = await TaskService.create(value);
      return res.json({ data });
    } catch (err) {
      if (err.code === 11000) {
        return res
          .status(422)
          .send({ data: { error: true, message: "title must be unique" } });
      } else {
        return res
          .status(500)
          .send({ data: { error: true, message: "server error" } });
      }
    }
  }
  // [PUT] /update
  async updateTask(req, res, next) {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!id) throw new NotFoundError("task");
    // validate type
    const task = joi.object({
      title: joi.string().min(3).max(30).required(),
      description: joi.string().optional(),
    });

    // validation
    const { error, value } = task.validate({
      title,
      description,
    });
    if (error) throw new Error(error);
    try {
      const data = await TaskService.update(id, value);
      res.json({ data });
    } catch (err) {
      if (err.code === 11000) {
        return res
          .status(422)
          .send({ data: { error: true, message: "title must be unique" } });
      } else {
        return res
          .status(500)
          .send({ data: { error: true, message: "server error" } });
      }
    }
  }
  // [PUT] /update
  async updateStage(req, res, next) {
    const { tasks } = req.body;

    try {
      const data = await TaskService.updateStage(tasks);
      res.json({ data });
    } catch (err) {
      return res
        .status(500)
        .send({ data: { error: true, message: "server error" } });
    }
  }
  // [DELETE] /delete
  async deleteTask(req, res, next) {
    const { id } = req.params;
    if (!id) throw new NotFoundError("task");
    try {
      await TaskService.delete(id);
      return res.json({ data: { message: "success" } });
    } catch (err) {
      return res
        .status(500)
        .send({ data: { error: true, message: "server error" } });
    }
  }
}

export default new TaskController();
