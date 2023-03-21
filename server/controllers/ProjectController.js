const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const Project = require('../models/Project');
const User = require('../models/User');

class ProjectController {
  // @desc      Create project
  // @route     POST /api/projects
  // @access    Private
  create = async (req, res) => {
    try {
      // Сбор ошибок при валидации
      const errors = validationResult(req);

      // Если ошибки есть, выводим ответ от сервера
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const { name, description, creator, team } = req.body;

      const projectDoc = await Project.create({
        name,
        description,
        creator,
        team,
      });

      return res.status(200).json(projectDoc);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Failed to create project' });
    }
  };

  // @desc      Update project
  // @route     POST /api/projects/:id
  // @access    Private
  update = async (req, res) => {
    try {
      const projectId = req.params.id;
      const verifiedUserId = req.verifiedUser._id.toString();

      // Проверяю указанный айди проекта на валидность
      const checkIdForValid = mongoose.isValidObjectId(projectId);

      // Если указанный айди проекта не валиден, оповещаю пользователя об этом
      if (!checkIdForValid) {
        return res.status(401).json({ message: 'Project ID not valid' });
      }

      // Ищу в БД проект по валидному айди
      const project = await Project.findById(projectId);

      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      // Ищу в БД пользователя по валидному айди
      const user = await User.findById(verifiedUserId);

      // Если пользователь не найден
      if (!user) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      // Убедимся, что залогиненный автор является создателем проекта
      if (project.creator.toString() !== user.id) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      // Сбор ошибок при валидации
      const errors = validationResult(req);

      // Если ошибки есть, выводим ответ от сервера
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      // Обновляем проект
      const updatedProject = await Project.findByIdAndUpdate(
        { _id: projectId },
        {
          name: req.body.name,
          description: req.body.description,
          team: req.body.team,
        },
        { new: true }
      );

      return res.status(200).json(updatedProject);
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Failed to update project' });
    }
  };

  // @desc      Delete project
  // @route     DELETE /api/projects/:id
  // @access    Private
  delete = async (req, res) => {
    try {
      const projectId = req.params.id;
      const verifiedUserId = req.verifiedUser._id.toString();

      // Проверяю указанный айди проекта на валидность
      const checkIdForValid = mongoose.isValidObjectId(projectId);

      // Если указанный айди проекта не валиден, оповещаю пользователя об этом
      if (!checkIdForValid) {
        return res.status(401).json({ message: 'Project ID not valid' });
      }

      // Ищу в БД проект по валидному айди
      const project = await Project.findById(projectId);

      // Ищу в БД пользователя по валидному айди
      const user = await User.findById(verifiedUserId);

      // Если пользователь не найден
      if (!user) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      // Убедимся, что залогиненный автор является создателем проекта
      if (project.creator.toString() !== user.id) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      Project.findOneAndDelete(
        {
          _id: projectId,
        },
        (error, project) => {
          if (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to delete project' });
          }

          if (!project) {
            res.status(404).json({ message: 'Project not found' });
          }

          res.status(200).json({
            message: `Project with ID ${projectId} successfully deleted`,
            projectId,
          });
        }
      );
    } catch (error) {
      console.error(error);
      return res.status(200).json({ message: 'Failed to delete project' });
    }
  };

  // @desc      Get all projects
  // @route     GET /api/projects
  // @access    Public
  getAll = async (_, res) => {
    try {
      const projects = await Project.find()
        .populate('creator', '-password -email')
        .exec();
      return res.status(200).json(projects);
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: 'Failed to get all projects' });
    }
  };

  // @desc      Get all projects by authorized user
  // @route     GET /api/projects/all/:id
  // @access    Private
  getAllByUser = async (req, res) => {
    try {
      const userId = req.verifiedUser._id;

      const projectsByUser = await Project.find({
        creator: userId,
        team: mongoose.Types.ObjectId(userId),
      }).populate('team', '-password -login -email -avatar -project -__v');

      return res.status(200).json(projectsByUser);
    } catch (error) {
      console.error(error);
      return res
        .status(404)
        .json({ message: 'Failed to get all projects by current user' });
    }
  };

  // @desc      Get project by id
  // @route     GET /api/projects/:id
  // @access    Private
  getOne = async (req, res) => {
    try {
      const projectId = req.params.id;

      // Проверяю указанный айди проекта на валидность
      const checkIdForValid = mongoose.isValidObjectId(projectId);

      // Если указанный айди проекта не валиден, оповещаю пользователя об этом
      if (!checkIdForValid) {
        return res.status(401).json({ message: 'Project ID not valid' });
      }

      const project = await Project.findById(projectId).populate(
        'team',
        '_id, name'
      );
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      return res.status(200).json({ project });
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: 'Failed to load project' });
    }
  };
}

module.exports = new ProjectController();
