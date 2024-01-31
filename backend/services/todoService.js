const TodoRepository = require('../repository/todoRepository');
const UserRepository = require('../repository/userRepository');
const { ResourceError } = require('../utils/errors');

class TodoService {
  constructor() {
    this.todoRepository = new TodoRepository();
    this.userRepository = new UserRepository();
  }

  async createTodo({ id }, { description, targetDate, status }) {
    const todo = {};
    if (!id || !description) {
      throw new ResourceError('User Id and Description are required');
    }

    todo.userId = id;
    todo.description = description;

    if (targetDate) {
      todo.targetDate = targetDate;
    }

    if (status) {
      todo.status = status;
    }

    const existingUser = await this.userRepository.getUserById(id);

    if (!existingUser) {
      throw new ResourceError(`User ${id} not found`);
    }

    // create a new todo
    const newTodo = await this.todoRepository.createTodo(todo);

    // get the id and put that in the user
    existingUser.todos.push(newTodo._id);

    return await existingUser.save();
  }

  async getTodosByUserId({ id }) {
    if (!id) {
      throw new ResourceError('User Id is required');
    }

    const existingUser = await this.userRepository.getUserById(id);

    if (!existingUser) {
      throw new ResourceError(`User ${id} not found`);
    }

    return await this.todoRepository.getTodosByUserId(id);
  }
}

module.exports = TodoService;
