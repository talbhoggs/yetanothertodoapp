const express = require('express');
const config = require('../config');

const router = express.Router();

const {
  signIn, signUp, getAllUsers, deleteUser, updateUser,
} = require('../controller/userController');

const {
  getTodoById, createTodo, getTodosByUserId, deleteTodo,
} = require('../controller/todoController');

const BASE_URI = `/${config.APP_NAME}/${config.API_VERSION}/${config.API_BASE}`;
router.post(`${BASE_URI}/signup`, signUp);
router.get(`${BASE_URI}/users`, getAllUsers);
router.delete(`${BASE_URI}/users/:id`, deleteUser);
router.put(`${BASE_URI}/users/:id`, updateUser);
router.post(`${BASE_URI}/signin`, signIn);

router.post(`${BASE_URI}/users/:id/todos`, createTodo);
router.get(`${BASE_URI}/users/:id/todos`, getTodosByUserId);
router.delete(`${BASE_URI}/users/:userId/todos/:todoId`, deleteTodo);
router.get(`${BASE_URI}/users/:userId/todos/:todoId`, getTodoById);
module.exports = router;
