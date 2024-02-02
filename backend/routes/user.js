const express = require('express');
const config = require('../config');
const verifyToken = require('../middleware/auth');

const router = express.Router();

const {
  signIn, signUp, getAllUsers, deleteUser, updateUser,
} = require('../controller/userController');

const {
  createTodo, updateTodo, getTodoById, getTodosByUserId, deleteTodo,
} = require('../controller/todoController');

const BASE_URI = `/${config.APP_NAME}/${config.API_VERSION}/${config.API_BASE}`;
router.post(`${BASE_URI}/signup`, signUp);
router.get(`${BASE_URI}/users`, getAllUsers);
router.delete(`${BASE_URI}/users/:id`, deleteUser);
router.put(`${BASE_URI}/users/:id`, updateUser);
router.post(`${BASE_URI}/signin`, signIn);

// admin
router.post(`${BASE_URI}/users/:id/todos`, verifyToken, createTodo);
router.get(`${BASE_URI}/users/:id/todos`, verifyToken, getTodosByUserId);
router.delete(`${BASE_URI}/users/:userId/todos/:todoId`, verifyToken, deleteTodo);
router.get(`${BASE_URI}/users/:userId/todos/:todoId`, verifyToken, getTodoById);
router.put(`${BASE_URI}/users/:userId/todos/:todoId`, verifyToken, updateTodo);

module.exports = router;
