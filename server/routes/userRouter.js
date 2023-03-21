const router = require('express').Router();

const upload = require('../config/uploadAvatar');
const {
  registerValidation,
  loginValidation,
} = require('../config/validations');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');

// prettier-ignore
router
  .route('/')
  .get(authMiddleware, UserController.getAllUsers)
  .post(registerValidation, UserController.registration)
  .patch(authMiddleware, UserController.update);

// prettier-ignore
router
  .route('/:id')
  .get(authMiddleware, UserController.getMe)

router
  .route('/upload')
  .post(authMiddleware, upload.single('image'), (req, res) => {
    return res.status(200).json({ url: `/uploads/${req.file.originalname}` });
  });

// prettier-ignore
router
  .route('/login')
  .post(loginValidation, UserController.login);

module.exports = router;
