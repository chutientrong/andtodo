import auth from "../middleware/auth.js";
import authRouter from "./auth.js"
import todoRouter from "./todo.js"
import userRouter from "./user.js"
import taskRouter from "./task.js"
import test from "./test.js"
const routes = (app) => {

    app.use('/users', auth, userRouter);
    app.use('/auth', authRouter);
    app.use('/todos', auth, todoRouter);
    app.use('/task', auth, taskRouter);
    
    app.use('/', test);
};

export default routes;