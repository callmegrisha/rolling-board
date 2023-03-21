const { body } = require('express-validator');

// prettier-ignore
const loginValidation = [
  body('login', 'Username is required')
    .isLength({ min: 3 }),
  body('password', 'Password is required')
    .isLength({ min: 6 }),
];

// prettier-ignore
const registerValidation = [
  body('name', 'Put your name please')
    .optional()
    .isString()
    .isLength({ min: 3 }),
  body('email', 'Invalid email format')
    .isEmail(),
  body('login', 'Login is required')
    .isLength({ min: 5 }),
  body('password', 'Password is required')
    .isLength({ min: 6 }),
  body('avatar', 'Invalid avatar link')
    .optional()
    .isURL(),
];

const projectValidation = [
  body('name', 'Project name is required').notEmpty(),
  body('description', 'Project description is required').notEmpty(),
];

const columnValidation = [
  body('project', 'Project ID is required').notEmpty(),
  body('name', 'Column name is required').notEmpty(),
];

const taskValidation = [
  body('name', 'Name is required').notEmpty(),
  body('description', 'Description is required').notEmpty(),
  body('assignedTo', 'Select task executor please').isArray(),
];

module.exports = {
  registerValidation,
  loginValidation,
  projectValidation,
  columnValidation,
  taskValidation,
};
