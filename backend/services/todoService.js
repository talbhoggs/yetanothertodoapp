const TodoRepository = require('../repository/todoRepository');
const UserRepository = require('../repository/userRepository');
const { ResourceError } = require('../utils/errors');

class TodoService {
  constructor() {
    this.todoRepository = new TodoRepository();
    this.userRepository = new UserRepository();
  }

  async createTodo({ id }, { description, targetDate, status }) {

    if (!id || !description) {
      throw new ResourceError('User Id and Description are required');
    }

    const existingUser = await this.userRepository.getUserById(id);

    if (!existingUser) {
      throw new ResourceError(`User ${id} not found`);
    }

    const todo = {
      userId: id,
      description,
      ...(targetDate && { targetDate }),
      ...(status && { status })
    };

    // create a new todo
    const newTodo = await this.todoRepository.createTodo(todo);

    // save id as reference
    existingUser.todos.push(newTodo._id);

    return await existingUser.save();
  }

  async updateTodo({ userId, todoId }, { description, targetDate, status }) {

    if (!userId || !description) {
      throw new ResourceError('User Id and Description are required');
    }

   const existingUser = await this.userRepository.getUserById(userId);

    if (!existingUser) {
      throw new ResourceError(`User ${userId} not found`);
    }

    const todo = {
      userId,
      description,
      ...(targetDate && { targetDate }),
      ...(status && { status })
    };

    return await this.todoRepository.findOneAndUpdate(todoId, todo);
  }

  async getTodoById({ userId, todoId }) {
    // check if existing user
    const existingUser = await this.userRepository.getUserById(userId);

    if (!existingUser) {
      throw new ResourceError('User $userId} not found');
    }

    // check if existing todo Id
    const existingTodo = await this.todoRepository.getTodoById(todoId);
    if (!existingTodo) {
      throw new ResourceError(`Todo ${todoId} not found`);
    }

    return existingTodo;
  }

  async deleteTodo({ userId, todoId }) {
    // check if existing user
    const existingUser = await this.userRepository.getUserById(userId);

    if (!existingUser) {
      throw new ResourceError('User ${userId} not found');
    }

    // check if existing todo Id
    const existingTodo = await this.todoRepository.getTodoById(todoId);
    if (!existingTodo) {
      throw new ResourceError(`Todo ${todoId} not found`);
    }

    // delete user todos id reference
    const updateTodo = existingUser.todos.filter((item) => item._id.toString() !== todoId);
    existingUser.todos = updateTodo;
    await existingUser.save();
    // delete todo id
    return await this.todoRepository.deleteTodo(existingTodo);
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
