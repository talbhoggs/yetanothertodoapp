const todo = require('../model/Todo');
const { ResourceError } = require('../utils/errors');

class TodoRepository {
  // create
  async createTodo(newTodo) {
    try {
      console.log(newTodo);
      return await todo.create(newTodo);
    } catch (err) {
      console.log(err);
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
}

module.exports = TodoRepository;
