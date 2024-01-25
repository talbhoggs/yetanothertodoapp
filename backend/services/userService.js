const UserRepository = require('../repository/userRepository');
const { ResourceError } = require('../utils/errors');

const {hashPassword} = require('../utils')

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp({ username, password }) {
    try {

      if (!username || !password) {
        throw new ResourceError('Username and Password are required');
      }

      const existingUser = await this.getUserName(username);
      if (existingUser) {
        throw new ResourceError(`username ${username} is already in use by another user`);
      }

      return await this.userRepository.createUser({ username, password: hashPassword(password)});
    } catch (err) {
      throw err;
      //throw new ResourceError(`Cannot create ${username}`);
    }
  }

  async getAllUsers() {
    try {
      return await this.userRepository.getAllUsers();
    } catch (err) {
      throw err;
    }
  }

  async deleteUser(_id) {
    try {
      const existingUser = await this.getUserById(_id);
      if (!existingUser) {
        throw new ResourceError('User not found');
      }

      return await this.userRepository.deleteUser(existingUser);
    } catch (err) {
      throw err;
    }
  }

  async getUserName(username) {
    try {
      return await this.userRepository.getUserName(username);
    } catch (err) {
      throw err;
    }
  }

  async getUserById(_id) {
    try {
      return await this.userRepository.getUserById(_id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserService;
