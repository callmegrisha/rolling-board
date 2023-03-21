const router = require('express').Router();

const TaskController = require('../controllers/TaskController');
const authMiddleware = require('../middleware/authMiddleware');
const { taskValidation } = require('../config/validations');

// prettier-ignore
router
  .route('/')
  .post(authMiddleware, taskValidation, TaskController.create);

router
  .route('/project/:id')
  .get(authMiddleware, TaskController.getAllTasksByProject);

// prettier-ignore
router
  .route('/user')
  .get(authMiddleware, TaskController.getAllTasksByUser);

router
  .route('/:id')
  .get(authMiddleware, TaskController.getOneTask)
  .patch(authMiddleware, taskValidation, TaskController.update)
  .delete(authMiddleware, TaskController.delete);

module.exports = router;
