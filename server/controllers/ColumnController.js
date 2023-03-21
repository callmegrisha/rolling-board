const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Column = require('../models/Column');
const User = require('../models/User');

class ColumnController {
  // @desc      Get all columns in project
  // @route     GET /api/columns/project/:id
  // @access    Private
  async getAll(req, res) {
    try {
      const projectId = req.params.id;

      const columns = await Column.find({ project: projectId });

      return res.status(200).json(columns);
    } catch (error) {
      console.error(error);
      return res
        .status(404)
        .json({ message: 'Failed to get all columns by current project' });
    }
  }
  // @desc      Get column by id
  // @route     GET /api/columns/:id
  // @access    Private
  getOne = async (req, res) => {
    try {
      const columnId = req.params.id;

      // Проверяю указанный айди колонки на валидность
      const checkIdForValid = mongoose.isValidObjectId(columnId);

      // Если указанный айди колонки не валиден, оповещаю пользователя об этом
      if (!checkIdForValid) {
        return res.status(401).json({ message: 'Project ID not valid' });
      }

      const column = await Column.findById(columnId);

      if (!column) {
        return res.status(404).json({ message: 'Column not found' });
      }

      return res.status(200).json({ column });
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: 'Failed to load column' });
    }
  };
  // @desc      Create column in project
  // @route     POST /api/columns
  // @access    Private
  async create(req, res) {
    try {
      // Сбор ошибок при валидации
      const errors = validationResult(req);

      // Если ошибки есть, выводим ответ от сервера
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const { project, name } = req.body;
      const verifiedUserId = req.verifiedUser._id.toString();

      // Проверяю указанный айди проекта на валидность
      const checkIdForValid = mongoose.isValidObjectId(project);

      // Если указанный айди проекта не валиден, оповещаю пользователя об этом
      if (!checkIdForValid) {
        return res.status(401).json({ message: 'Project ID not valid' });
      }

      // Ищу в БД пользователя по валидному айди
      const user = await User.findById(verifiedUserId);

      // Если пользователь не найден
      if (!user) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      const columnDoc = await Column.create({
        project,
        creator: verifiedUserId,
        name,
      });

      return res.status(200).json(columnDoc);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Failed to create column' });
    }
    return res.status(200).json({ message: 'Create Column' });
  }
  // @desc      Update column in project
  // @route     POST /api/columns/:id
  // @access    Private
  async update(req, res) {
    try {
      const columnId = req.params.id;
      const verifiedUserId = req.verifiedUser._id.toString();

      // Проверяю указанный айди колонки на валидность
      const checkIdForValid = mongoose.isValidObjectId(columnId);

      // Если указанный айди колонки не валиден, оповещаю пользователя об этом
      if (!checkIdForValid) {
        return res.status(401).json({ message: 'Column ID not valid' });
      }

      // Ищу в БД колонку по валидному айди
      const column = await Column.findById(columnId);

      if (!column) {
        return res.status(404).json({ message: 'Column not found' });
      }

      // Ищу в БД пользователя по валидному айди
      const user = await User.findById(verifiedUserId);

      // Если пользователь не найден
      if (!user) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      // Убедимся, что залогиненный автор является создателем проекта
      if (column.creator.toString() !== user.id) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      // Сбор ошибок при валидации
      const errors = validationResult(req);

      // Если ошибки есть, выводим ответ от сервера
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      // Обновляем проект
      const updatedColumn = await Column.findByIdAndUpdate(
        { _id: columnId },
        {
          name: req.body.name,
        },
        { new: true }
      );

      return res.status(200).json(updatedColumn);
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Failed to update column' });
    }
  }
  // @desc      Delete column
  // @route     DELETE /api/columns/:id
  // @access    Private
  async delete(req, res) {
    try {
      const columnId = req.params.id;
      const verifiedUserId = req.verifiedUser._id.toString();

      // Проверяю указанный айди колонки на валидность
      const checkIdForValid = mongoose.isValidObjectId(columnId);

      // Если указанный айди колонки не валиден, оповещаю пользователя об этом
      if (!checkIdForValid) {
        return res.status(401).json({ message: 'Column ID not valid' });
      }

      // Ищу в БД пользователя по валидному айди
      const user = await User.findById(verifiedUserId);

      // Если пользователь не найден
      if (!user) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      // Ищу в БД колонку по валидному айди
      const column = await Column.findById(columnId);

      // Убедимся, что залогиненный автор является создателем проекта
      if (column.creator.toString() !== user.id) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      Column.findOneAndDelete(
        {
          _id: columnId,
        },
        (error, column) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Failed to delete column' });
          }

          if (!column) {
            return res.status(404).json({ message: 'Column not found' });
          }

          return res.status(200).json({
            message: `Column with ID ${columnId} successfully deleted`,
            columnId,
          });
        }
      );
    } catch (error) {
      console.error(error);
      return res.status(200).json({ message: 'Failed to delete column' });
    }
  }
}

module.exports = new ColumnController();
