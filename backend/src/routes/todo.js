import express from "express";
import  Todo  from "../models/Todo.js";

import TodoController from "../controllers/TodoController.js";
const router = express.Router();

// Place routes
router.get('/', TodoController.list);

router.get('/:id/task/',  TodoController.getTaskListById);

router.get('/:id',  TodoController.getById);
router.put('/:id',  TodoController.updateTodo);
router.post('/',  TodoController.createTodo);
router.delete('/:id',  TodoController.deleteTodo);

// [POST]: create a new Task from the Todo List
router.post('/:id/task/',  (req, res) => {
    Todo.findById(req.params.id).then(
        (todoList) => {
            const newTask = new Task({ ...req.body.task });
            newTask.save().then(
                (task) => {
                    todoList.tasks.push({ _id: task._id });
                    todoList.save().then(
                        (todoList) => res.status(200).json(task),
                    ).catch(
                        (err) => { throw err },
                    );
                },
            ).catch(
                (err) => { throw err },
            );
        },
    ).catch(
        (err) => {
            res.status(500).json(err);
        },
    );
});

router.post('/reorder/',  (req, res) => {
    const reOrderedList = req.body.lists;
    const newlyOrderedList = reOrderedList.map((listObject) => {
        const { _id: id, order } = listObject;
        Todo.findByIdAndUpdate(id, { order }, { new: true }).then(
            (todoList) => {
                return todoList;
            },
        ).catch(
            (err) => {
                return false;
            },
        )
    });
    if (newlyOrderedList.includes(false)) {
        res.status(500).json("Error reordering list");
    } else {
        res.status(200).json(newlyOrderedList);
    }
});

router.put('/:id',  (req, res) => {
    const todoListId = req.params.id;
    Todo.findByIdAndUpdate(todoListId, { ...req.body }, { new: true }).then(
        (todoList) => res.status(200).json(todoList),
    ).catch(
        (err) => res.status(500).json(err),
    )
});

router.delete('/:id',  (req, res) => {
    const todoListId = req.params.id;
    Todo.findByIdAndDelete(todoListId).populate("todos").then(
        (todoList) => {
            todoList.tasks.forEach((todo) => {
                Todo.findByIdAndDelete(todo._id).catch((err) => res.status(500).json(err));
            });
            res.status(200).json(todoList);
        },
    ).catch(
        (err) => res.status(500).json(err),
    )
})



export default router;

/*
5 routes

GET *
/todo/ => all todo *
/todo/{id} => get todo with id *

POST *
/todo/ => post new todo *

PUT *
/todo/{id} => put todo with id *

DELETE *
/todo/{id} => delete todo with id *

*/