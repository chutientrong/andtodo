import mongoose from "mongoose";
import NotFoundError from "../exception/NotFoundError.js";
import Task from "../models/Task.js";
import commonUtils from "../utils/commonUtils.js";
import Todo from "../models/Todo.js";

class TaskService {
  async getTaskById(taskId) {
    const task = await Task.findOne({ _id: taskId });

    if (!task) throw new NotFoundError("Task");

    return task;
  }

  async getList(userId, page, size) {
    const { skip, limit, totalPages } = commonUtils.getPagination(
      page,
      size,
      await Task.countDocuments({
        user: new mongoose.Types.ObjectId(userId),
      })
    );

    const tasks = await Task.find({
      user: new mongoose.Types.ObjectId(userId),
    })
      .skip(skip)
      .limit(limit);

    return {
      data: tasks,
      page,
      size,
      totalPages,
    };
  }

  async create(task) {
    try {

      const todoList = await Todo.findOne({ _id: task.todo });
      const newTask = await new Task({
        ...task,
        stage: "Requested",
        order: todoList.tasks.length,
        index: todoList.tasks.length + 1,
      }).save();
      todoList.tasks.push(newTask);
      await todoList.save();
      return newTask;
    } catch (error) {
      throw new Error(error);
    }
  }
  async update(id, task) {
    const existed = await Task.findOne({
      title: task.title,
    });
    if (!existed) throw new MyError("Task is already exists");
    const data = await Task.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { ...task },
      { upsert: true }
    );
    return data;
  }
  async updateStage(tasks) {
    try {
      // Iterate over the tasks array and update each task's stage
      for (const task of tasks) {
        const updatedTask = await Task.updateOne(
          { _id: new mongoose.Types.ObjectId(task._id) },
          { ...task },
          { upsert: false }
        );
      }

      return { message: "Tasks updated successfully" };
    } catch (error) {
      throw new Error(error);
    }
  }
  async delete(id) {
    const data = await Task.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    return data;
  }
}

export default new TaskService();
