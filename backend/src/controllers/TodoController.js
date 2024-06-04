import NotFoundError from "../exception/NotFoundError.js";
import TodoService from "../services/TodoService.js";
import joi from "joi";
// /Todo
class TodoController {
  // [GET]
  async list(req, res, next) {
    const { page = 0, size = 20 } = req.query;
    const { _id } = req;
    try {
      const users = await TodoService.getList(
        _id,
        parseInt(page),
        parseInt(size)
      );

      return res.json(users);
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
      const user = await TodoService.getTodoById(req.params.id);

      return res.json(user);
    } catch (err) {
      next(err);
    }
  }
  // [GET]
  async getTaskListById(req, res, next) {
    const { _id } = req;
    if (!req.params.id)
      res
        .status(422)
        .send({ data: { error: true, message: "Id is reaquire" } });

    try {
      const tasks = await TodoService.getTaskListById(_id, req.params.id);

      return res.json(tasks);
    } catch (err) {
      next(err);
    }
  }

  // [POST] /create
  async createTodo(req, res, next) {
    const { _id } = req;
    const { title, description } = req.body;
    if (!_id) throw new NotFoundError("User");
    // validate type
    const todo = joi.object({
      title: joi.string().min(3).max(30).required(),
      description: joi.string().required(),
      user: joi.string().required(),
    });

    // validation
    const { error, value } = todo.validate({
      title,
      description,
      user: _id,
    });
    if (error) return res.status(422).json({ error });
    try {
      const data = await TodoService.create(value);
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
  async updateTodo(req, res, next) {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!id) throw new NotFoundError("User");
    // validate type
    const todo = joi.object({
      title: joi.string().min(3).max(30).required(),
      description: joi.string().optional(),
    });

    // validation
    const { error, value } = todo.validate({
      title,
      description,
    });
    if (error) throw new Error(error);
    try {
      const data = await TodoService.update(id, value);
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
  // [DELETE] /delete
  async deleteTodo(req, res, next) {
    const { id } = req.params;
    if (!id) throw new NotFoundError("User");
    try {
      await TodoService.delete(id);
      return res.json({ data: { message: "success" } });
    } catch (err) {
      return res
        .status(500)
        .send({ data: { error: true, message: "server error" } });
    }
  }
}

export default new TodoController();
