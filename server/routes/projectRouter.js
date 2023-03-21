const router = require('express').Router();

const ProjectController = require('../controllers/ProjectController');
const authMiddleware = require('../middleware/authMiddleware');
const { projectValidation } = require('../config/validations');

// prettier-ignore
router
  .route('/')
  .get(authMiddleware, ProjectController.getAllByUser)
  .post(authMiddleware, projectValidation,  ProjectController.create)

router
  .route('/:id')
  .get(authMiddleware, ProjectController.getOne)
  .patch(authMiddleware, projectValidation, ProjectController.update)
  .delete(authMiddleware, ProjectController.delete);

module.exports = router;
