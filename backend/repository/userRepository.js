const user = require('../model/User');
const { ResourceError } = require('../utils/errors');

class UserRepository {
  // create
  async createUser({ username, password }) {
    try {
      return await user.create({ username, password });
    } catch (err) {
      throw new ResourceError('Unable to Create new User');
      // throw new ResourceError('Unable to Create new User', 400, true, err)
    }
  }
  // update

  async updateUser(existingUser) {
    try {
      return await existingUser.save();
    } catch (err) {
      throw new ResourceError('Unable to update user');
    }
  }

  // delete
  async deleteUser(existingUser) {
    try {
      return await user.deleteOne(existingUser);
    } catch (err) {
      throw new ResourceError('Unable to delete user');
    }
  }

  // getUser
  async getUserName(username) {
    try {
      return await user.findOne({ username });
    } catch (err) {
      throw new ResourceError(`User ${username} not found`);
    }
  }

  async getUserById(id) {
    try {
      return await user.findById(id);
    } catch (err) {
      throw new ResourceError(`User ${id} not found`);
    }
  }

  // getAll
  async getAllUsers() {
    try {
      return await user.find();
    } catch (err) {
      throw new ResourceError('Unable to get all users');
    }
  }

  async getTodosByUserId(id) {
    const user = await this.getUserById(id);
    return await user.populate('todos');
  }
}

module.exports = UserRepository;
