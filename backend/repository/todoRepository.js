const todo = require('../model/Todo');
const { ResourceError } = require('../utils/errors');
const getLogger = require('../utils/logger');

const logger = getLogger(module);

class TodoRepository {
  // create
  async createTodo(newTodo) {
    try {
      return await todo.create(newTodo);
    } catch (err) {
      throw new ResourceError('Unable to Create new Todo');
    }
  }

  async updateTodo(existingTodo) {
    try {
      return await existingTodo.save();
    } catch (err) {
      throw new ResourceError('Unable to update Todo');
    }
  }

  // getAll
  async getTodosByUserId(userId) {
    try {
      return await todo.find({ userId });
    } catch (err) {
      throw new ResourceError('Unable to Find Todos');
    }
  }

  async getTodoById(id) {
    try {
      return await todo.findById({ _id: id });
    } catch (err) {
      throw new ResourceError('Unable to Find Todos');
    }
  }

  async findOneAndUpdate(id, update) {
    try {
      return await todo.findByIdAndUpdate({ _id: id }, update, { new: true, upsert: true });
    } catch (err) {
      logger.warn(err);
      throw new ResourceError(`Unable to update Todo id ${id}`);
    }
  }

  async deleteTodo(existingTodo) {
    try {
      return await todo.deleteOne(existingTodo);
    } catch (err) {
      throw new ResourceError('Unable to Delete Todo1');
    }
  }
}

module.exports = TodoRepository;
