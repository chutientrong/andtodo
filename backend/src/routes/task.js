import express from "express";
import TaskController from "../controllers/TaskController.js";
const router = express.Router();

// router.get("/",  (req, res) => {
//     task.find({}).then(
//         (task) => { 
//             res.status(200).json(task);
//         }
//     ).catch(
//         (err) => {
//             res.status(500).json(err);
//         }
//     );
// });

// router.get("/:id",  (req, res) => {
//     const taskId = req.params.id;
//     task.findById(taskId).then(
//         (task) => {
//             res.status(200).json(task);
//         }
//     ).catch(
//         (err) => {
//             res.status(500).json(err)
//         }
//     )
// });

// router.post("/",  (req, res) => {
//     const newtask = new task({ ...req.body, completion: false });
//     newtask.save().then(
//         (task) => {
//             res.status(200).json(newtask);
//         }
//     ).catch(
//         (err) => {
//             res.status(500).json(err)
//         }
//     )
// });
// Place routes
router.get('/', TaskController.list);

router.get('/:id',  TaskController.getById);
router.put('/:id',  TaskController.updateTask);
router.post('/',  TaskController.createTask);
router.delete('/:id',  TaskController.deleteTask);
router.post('/stage',  TaskController.updateStage);
// router.put("/:id",  (req, res) => {
//     const taskId = req.params.id;
//     Task.findByIdAndUpdate(taskId, { ...req.body }, { new: true }).then(
//         (task) => {
//             res.status(200).json(task);
//         }
//     ).catch(
//         (err) => {
//             res.status(500).json(err);
//         }
//     );
// });

// router.delete("/:id",  (req, res) => {
//     const taskId = req.params.id;
//     Task.findByIdAndDelete(taskId).then(
//         (task) => res.status(200).json(task)
//     ).catch(
//         (err) => res.status(500).json(err)
//     )
// });


export default router;

/*
5 routes

GET *
/task/ => all task *
/task/{id} => get task with id *

POST *
/task/ => post new task *

PUT *
/task/{id} => put task with id *

DELETE *
/task/{id} => delete task with id *

*/