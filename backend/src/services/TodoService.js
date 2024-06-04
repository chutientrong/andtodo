import mongoose from "mongoose";
import NotFoundError from "../exception/NotFoundError.js";
import Todo from "../models/Todo.js";
import commonUtils from "../utils/commonUtils.js";
import MyError from "../exception/MyError.js";

class TodoService {
  async getTodoById(todoId) {
    const todo = await Todo.findOne({ _id: todoId }).populate("tasks");

    if (!todo) throw new NotFoundError("Todo");

    return todo;
  }

  async getList(userId, page, size) {
    const { skip, limit, totalPages } = commonUtils.getPagination(
      page,
      size,
      await Todo.countDocuments({
        user: new mongoose.Types.ObjectId(userId),
      })
    );

    const todos = await Todo.find({
      user: new mongoose.Types.ObjectId(userId),
    })
      .skip(skip)
      .limit(limit);

    return {
      data: todos,
      page,
      size,
      totalPages,
    };
  }
  async getTaskListById(userId, todoId) {
    const todo = await Todo.findOne({
      _id: new mongoose.Types.ObjectId(todoId),
      user: new mongoose.Types.ObjectId(userId),
    }).populate("tasks");

    return {
      data: todo.tasks,
    };
  }

  async create(todo) {
    try {
      const existed = await Todo.findOne({
        user: new mongoose.Types.ObjectId(todo.user),
        title: todo.title,
      });
      if (existed) throw new MyError("Todo is already exists");
      const data = await new Todo({
        ...todo,
        user: new mongoose.Types.ObjectId(todo.user),
      }).save();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async update(id, todo) {
    const existed = await Todo.findOne({
      user: new mongoose.Types.ObjectId(todo.user),
      title: todo.title,
    });
    if (existed) throw new MyError("Todo is already exists");
    const data = await Todo.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { ...todo },
      { upsert: true }
    );
    return data;
  }
  async delete(id) {
    const data = await Todo.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    return data;
  }
}

export default new TodoService();
