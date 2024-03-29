const UserRepository = require('../repository/userRepository');
const { ResourceError } = require('../utils/errors');

const {
  hashPassword, generateToken, generateRefreshToken, validatePassword,
} = require('../utils');

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

      return await this.userRepository.createUser({ username, password: hashPassword(password) });
    } catch (err) {
      throw err;
      // throw new ResourceError(`Cannot create ${username}`);
    }
  }

  async signIn({ username, password }) {
    // validate the input
    if (!username || !password) {
      throw new ResourceError('Username and Password are required');
    }
    // search for existing user
    const existingUser = await this.getUserName(username);
    if (!existingUser) {
      throw new ResourceError('Invalid username or password');
    }
    // validate password
    if (!validatePassword(password, existingUser.password)) {
      throw new ResourceError('Invalid username or password');
    }
    const accessToken = generateToken(
      {
        userInfo: {
          userId: existingUser._id,
          username: existingUser.username,
          roles: existingUser.roles,
        },
      },
    );

    const refreshToken = generateRefreshToken(
      {
        username: existingUser.username,
      },
    );
    const payload = {
      username: existingUser.username,
      roles: existingUser.roles,
      accessToken,
      refreshToken,
    };
    return payload;
  }

  async updateUser(id, {
    username, password, active, picturePath,
  }) {
    try {
      const existingUser = await this.getUserById(id);
      if (!existingUser) {
        throw new ResourceError('User not found');
      }

      if (username) {
        existingUser.username = username;
      }

      if (password) {
        existingUser.password = password;
      }

      if (active !== undefined && existingUser.active !== Boolean(active)) {
        existingUser.active = !existingUser.active;
      }

      if (picturePath) {
        existingUser.picturePath = picturePath;
      }

      // admin user can only update the roles through admin dashboard

      return await this.userRepository.updateUser(existingUser);
    } catch (err) {
      throw err;
    }
  }

  async getAllUsers() {
    try {
      return await this.userRepository.getAllUsers();
    } catch (err) {
      throw err;
    }
  }

  async deleteUser({ id }) {
    try {
      if (!id) {
        throw new ResourceError('id is required');
      }

      const existingUser = await this.userRepository.getUserById(id);

      if (!existingUser) {
        throw new ResourceError(`User ${id} not found`);
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

  async getUserTodos(id) {
    try {
      return await this.userRepository.getTodosByUserId(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserService;
