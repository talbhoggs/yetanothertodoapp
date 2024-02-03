const express = require('express');
const config = require('../config');
const verifyToken = require('../middleware/auth');
const acl = require('../middleware/acl');
const constant = require('../utils/constants.json');

const router = express.Router();

const {
  signIn, signUp, getAllUsers, deleteUser, updateUser,
} = require('../controller/userController');

const {
  createTodo, updateTodo, getTodoById, getTodosByUserId, deleteTodo,
} = require('../controller/todoController');

const BASE_URI = `/${config.APP_NAME}/${config.API_VERSION}/${config.API_BASE}`;
router.post(`${BASE_URI}/signup`, signUp);
router.put(`${BASE_URI}/users/:id`, updateUser);
router.post(`${BASE_URI}/signin`, signIn);

// admin
router.get(`${BASE_URI}/users`, verifyToken, acl(constant.ROLES.ADMIN), getAllUsers);
router.delete(`${BASE_URI}/users/:id`, verifyToken, acl(constant.ROLES.ADMIN), deleteUser);
router.post(`${BASE_URI}/users/:id/todos`, verifyToken, acl(constant.ROLES.ADMIN), createTodo);
router.get(`${BASE_URI}/users/:id/todos`, verifyToken, acl(constant.ROLES.ADMIN), getTodosByUserId);
router.delete(`${BASE_URI}/users/:userId/todos/:todoId`, verifyToken, acl(constant.ROLES.ADMIN), deleteTodo);
router.get(`${BASE_URI}/users/:userId/todos/:todoId`, verifyToken, acl(constant.ROLES.ADMIN), getTodoById);
router.put(`${BASE_URI}/users/:userId/todos/:todoId`, verifyToken, acl(constant.ROLES.ADMIN), updateTodo);

module.exports = router;
