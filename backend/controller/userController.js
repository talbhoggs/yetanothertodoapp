const mongoose = require('mongoose');
const { ResourceError } = require('../utils/errors');
const UserService = require('../services/userService');

const userService = new UserService();
const signUp = async (req, res, next) => {
  try {
    const payload = await userService.signUp(req.body);
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

const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params);
    return res.status(201).json({
      successful: true,
      message: `User ${req.params.id} deleted successfully`,
      timestamp: Date.now(),
      status: 200,
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const payload = await userService.updateUser(req.params.id, req.body);
    return res.status(200).json({
      successful: true,
      message: 'User updated successfully',
      timestamp: Date.now(),
      status: 200,
      data: payload,
    });
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const payload = await userService.getAllUsers();
    return res.status(200).json({
      successful: true,
      timestamp: Date.now(),
      status: 201,
      data: payload,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signUp, getAllUsers, deleteUser, updateUser,
};
