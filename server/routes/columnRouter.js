const router = require('express').Router();

const ColumnController = require('../controllers/ColumnController');
const authMiddleware = require('../middleware/authMiddleware');
const { columnValidation } = require('../config/validations');

// prettier-ignore
router
  .route('/')
  .post(authMiddleware, columnValidation, ColumnController.create);

// prettier-ignore
router
  .route('/project/:id')
  .get(authMiddleware, ColumnController.getAll);

router
  .route('/:id')
  .get(authMiddleware, columnValidation, ColumnController.getOne)
  .patch(authMiddleware, ColumnController.update)
  .delete(authMiddleware, ColumnController.delete);

module.exports = router;
