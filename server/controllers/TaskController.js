const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const Task = require('../models/Task');
const User = require('../models/User');

class TaskController {
  // @desc      Create task
  // @route     POST /api/tasks
  // @access    Private
  async create(req, res) {
    try {
      // Сбор ошибок при валидации
      const errors = validationResult(req);

      // Если ошибки есть, то выводим ответ от сервера
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const {
        currentProject,
        currentColumn,
        creator,
        name,
        description,
        assignedTo,
      } = req.body;

      const taskDoc = await Task.create({
        currentProject,
        currentColumn,
        creator,
        name,
        description,
        assignedTo,
      });

      return res.status(200).json(taskDoc);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Failed to create task' });
    }
  }
  // @desc      Update task
  // @route     PATCH /api/tasks/:id
  // @access    Private
  async update(req, res) {
    try {
      const taskId = req.params.id;
      const verifiedUserId = req.verifiedUser._id.toString();

      // Проверяю указанный айди таска на валидность
      const checkIdForValid = mongoose.isValidObjectId(taskId);

      // Если указанный айди таска не валиден, оповещаю пользователя об этом
      if (!checkIdForValid) {
        return res.status(401).json({ message: 'Task ID not valid' });
      }

      // Ищу в БД таск по валидному айди
      const task = await Task.findById(taskId);

      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      // Ищу в БД пользователя по валидному айди
      const user = await User.findById(verifiedUserId);

      // Если пользователь не найден
      if (!user) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      // Убедимся, что залогиненный автор является создателем таска
      if (task.creator.toString() !== user.id) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      // Сбор ошибок при валидации
      const errors = validationResult(req);

      // Если ошибки есть, выводим ответ от сервера
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      // Обновляем таск
      const updatedTask = await Task.findByIdAndUpdate(
        { _id: taskId },
        {
          name: req.body.name,
          description: req.body.description,
          assignedTo: req.body.assignedTo,
        },
        { new: true }
      );

      return res.status(200).json(updatedTask);
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Failed to update task' });
    }
  }
  // @desc      Update task
  // @route     DELETE /api/tasks/:id
  // @access    Private
  async delete(req, res) {
    try {
      const taskId = req.params.id;
      const verifiedUserId = req.verifiedUser._id.toString();

      // Проверяю указанный айди таска на валидность
      const checkIdForValid = mongoose.isValidObjectId(taskId);

      // Если указанный айди таска не валиден, оповещаю пользователя об этом
      if (!checkIdForValid) {
        return res.status(401).json({ message: 'Task ID not valid' });
      }

      // Ищу в БД таск по валидному айди
      const task = await Task.findById(taskId);

      // Ищу в БД пользователя по валидному айди
      const user = await User.findById(verifiedUserId);

      // Если пользователь не найден
      if (!user) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      // Убедимся, что залогиненный автор является создателем проекта
      if (task.creator.toString() !== user.id) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      Task.findOneAndDelete(
        {
          _id: taskId,
        },
        (error, task) => {
          if (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to delete task' });
          }

          if (!task) {
            res.status(404).json({ message: 'Task not found' });
          }

          res.status(200).json({
            message: `Task with ID ${taskId} successfully deleted`,
            taskId,
          });
        }
      );
    } catch (error) {
      console.error(error);
      return res.status(200).json({ message: 'Failed to delete task' });
    }
  }
  // @desc      Get all tasks by user
  // @route     GET /api/tasks/user
  // @access    Private
  async getAllTasksByUser(req, res) {
    try {
      const verifiedUserId = req.verifiedUser._id.toString();
      const tasksByUser = await Task.find({
        assignedTo: verifiedUserId,
      }).populate(
        'assignedTo',
        '-password -email -login -avatar -projects -__v'
      );

      return res.status(200).json(tasksByUser);
    } catch (error) {
      console.error(error);
      return res
        .status(404)
        .json({ message: 'Failed to get all tasks by current user' });
    }
  }
  // @desc      Get all tasks
  // @route     GET /api/tasks/project/:id
  // @access    Private
  async getAllTasksByProject(req, res) {
    try {
      const projectId = req.params.id;
      const tasksByProject = await Task.find({
        currentProject: projectId,
      }).populate(
        'assignedTo',
        '-password -email -login -avatar -projects -__v'
      );

      return res.status(200).json(tasksByProject);
    } catch (error) {
      console.error(error);
      return res
        .status(404)
        .json({ message: 'Failed to get all tasks by current project' });
    }
  }
  // @desc      Get one task
  // @route     GET /api/tasks/:id
  // @access    Private
  async getOneTask(req, res) {
    try {
      const taskId = req.params.id;

      // Проверяю указанный айди проекта на валидность
      const checkIdForValid = mongoose.isValidObjectId(taskId);

      // Если указанный айди проекта не валиден, оповещаю пользователя об этом
      if (!checkIdForValid) {
        return res.status(401).json({ message: 'Task ID not valid' });
      }

      const task = await Task.findById(taskId).populate(
        'assignedTo',
        '-password -email -login -avatar -projects -__v'
      );

      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      return res.status(200).json({ task });
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: 'Failed to load task' });
    }
  }
}

module.exports = new TaskController();
