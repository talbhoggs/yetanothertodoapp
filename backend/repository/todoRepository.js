const todo = require('../model/Todo');
const { ResourceError } = require('../utils/errors');

class TodoRepository {
  // create
  async createTodo(newTodo) {
    try {
      return await todo.create(newTodo);
    } catch (err) {
      throw new ResourceError('Unable to Create new Todo');
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

  async deleteTodo(existingTodo) {
    try {
      return await todo.deleteOne(existingTodo);
    } catch (err) {
      throw new ResourceError('Unable to Delete Todo1');
    }
  }
}

module.exports = TodoRepository;
