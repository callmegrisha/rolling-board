const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const User = require('../models/User');

// Сгенерируем jwt токен
const generateJwtToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

class UserController {
  // @desc      Register new user
  // @route     POST /api/users
  // @access    Public
  registration = async (req, res) => {
    try {
      // Сбор ошибок при валидации
      const errors = validationResult(req);

      // Если ошибки есть, выводим ответ от сервера
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      // Деструктуриризация данных из тела запроса
      const { name, login, email, password } = req.body;

      // Проверка данных на заполненность
      if (!name || !login || !email || !password) {
        return res.status(400).json({ message: 'Please add all fields' });
      }

      // Проверка на наличие аккаунта пользователя в БД
      const existUser = await User.findOne({
        $or: [{ login }, { email }],
      });

      if (existUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Хэширую пароль
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);

      // Создаю пользователя
      const userDoc = await User.create({
        name,
        login,
        email,
        password: encryptedPassword,
      });

      // если пользователь создался успешно
      return res.status(201).json({
        _id: userDoc.id,
        name: userDoc.name,
        login: userDoc.login,
        email: userDoc.email,
        token: generateJwtToken(userDoc._id),
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Invalid user data' });
    }
  };

  // @desc      Authenticate a user
  // @route     POST /api/users/login
  // @access    Public
  login = async (req, res) => {
    try {
      // Сбор ошибок при валидации
      const errors = validationResult(req);

      // Если ошибки есть, выводим ответ от сервера
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      // Деструктуриризация данных из тела запроса
      const { login, password } = req.body;

      // Проверка существования в БД логина пользователя
      const existUser = await User.findOne({ login });

      // Если пользователь не существует, то пароль проверять нет смысла
      if (!existUser) {
        return res.status(400).json({ message: 'User not found' });
      }

      // Сравнение введенного пароля с тем хэшем, который есть в БД
      const validPassword = await bcrypt.compare(password, existUser.password);

      // Если пользователь существует, то мы проверяем пароль
      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Если и пользователь есть, и пароль правильный, возвращаем объект с токеном
      if (existUser && validPassword) {
        return res.status(200).json({
          _id: existUser.id,
          name: existUser.name,
          login: existUser.login,
          token: generateJwtToken(existUser._id),
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Failed to login' });
    }
  };

  // @desc      Get info about logged user
  // @route     POST /api/users/me
  // @access    Private
  getMe = async (req, res) => {
    try {
      const userId = req.verifiedUser._id;

      // Проверяю указанный айди проекта на валидность
      const checkIdForValid = mongoose.isValidObjectId(userId);

      // Если указанный айди проекта не валиден, оповещаю пользователя об этом
      if (!checkIdForValid) {
        return res.status(401).json({ message: 'User ID not valid' });
      }

      const user = await User.findById(userId)
        .select('-password')
        .populate('projects');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to GET user' });
    }
  };

  // @desc      Update user info
  // @route     PATCH /api/users/
  // @access    Private
  update = async (req, res) => {
    try {
      const userId = req.verifiedUser._id;

      // Проверяю указанный айди проекта на валидность
      const checkIdForValid = mongoose.isValidObjectId(userId);

      // Если указанный айди проекта не валиден, оповещаю пользователя об этом
      if (!checkIdForValid) {
        return res.status(401).json({ message: 'User ID not valid' });
      }

      const updatedUser = await User.findByIdAndUpdate(
        { _id: userId },
        {
          login: req.body.login,
          name: req.body.name,
          email: req.body.email,
          avatar: req.body.avatar,
        },
        { new: true }
      ).select('-password');

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to update user' });
    }
  };

  // @desc      Get all users
  // @route     GET /api/users/
  // @access    Private
  getAllUsers = async (_, res) => {
    try {
      const users = await User.find().select([
        '-password',
        '-avatar',
        '-projects',
        '-login',
        '-email',
      ]);

      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to upload all users' });
    }
  };
}

module.exports = new UserController();
