const { ResourceError } = require('../utils/errors');
const UserService = require('../services/userService');
const TodoService = require('../services/todoService');

const todoService = new TodoService();
const createTodo = async (req, res, next) => {
  try {
    const payload = await todoService.createTodo(req.params, req.body);

    return res.status(201).json({
      successful: true,
      message: 'Created successfully!',
      timestamp: Date.now(),
      status: 201,
      data: payload,
    });
  } catch (err) {
    next(err);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const payload = await todoService.updateTodo(req.params, req.body);

    return res.status(200).json({
      successful: true,
      message: 'Updated successfully!',
      timestamp: Date.now(),
      status: 200,
      data: payload,
    });
  } catch (err) {
    next(err);
  }
};

const getTodosByUserId = async (req, res, next) => {
  try {
    const payload = await todoService.getTodosByUserId(req.params);
    return res.status(200).json({
      successful: true,
      timestamp: Date.now(),
      status: 200,
      data: payload,
    });
  } catch (err) {
    next(err);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const payload = await todoService.deleteTodo(req.params);

    return res.status(200).json({
      successful: true,
      message: 'Todo item Deleted successfully!',
      timestamp: Date.now(),
      status: 201,
      data: payload,
    });
  } catch (err) {
    next(err);
  }
};

const getTodoById = async (req, res, next) => {
  try {
    const payload = await todoService.getTodoById(req.params);

    return res.status(200).json({
      successful: true,
      timestamp: Date.now(),
      status: 200,
      data: payload,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  createTodo, updateTodo, getTodoById, getTodosByUserId, deleteTodo,
};
