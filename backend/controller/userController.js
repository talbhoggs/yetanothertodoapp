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
}

module.exports = {signUp, getAllUsers};