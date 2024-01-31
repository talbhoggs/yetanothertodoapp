const { ResourceError } = require('../utils/errors');
const UserService = require('../services/userService');
const TodoService = require('../services/todoService');
// GET /users/:id/todos

// POST /users/:id/todos

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

const getTodosByUserId = async (req, res, next) => {
  try {
    const payload = await todoService.getTodosByUserId(req.params);
    return res.status(200).json({
      successful: true,
      // message: 'Created successfully!',
      timestamp: Date.now(),
      status: 200,
      data: payload,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createTodo, getTodosByUserId };
