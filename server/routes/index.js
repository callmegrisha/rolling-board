const Router = require('express');

const userRouter = require('./userRouter');
const projectRouter = require('./projectRouter');
const columnRouter = require('./columnRouter');
const taskRouter = require('./taskRouter');

const router = new Router();

router.use('/users', userRouter);
router.use('/projects', projectRouter);
router.use('/columns', columnRouter);
router.use('/tasks', taskRouter);

module.exports = router;
