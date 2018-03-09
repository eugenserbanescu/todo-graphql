const { QUERY, MUTATION } = require('./utils.js');
const sampleData = require("../utils/sample-data.js");
const uniqueId = require("../utils/unique-id.js");

const todos = sampleData.todos;
const todosList = sampleData.todosList;

const mutations = `createTodo(title: String!, description: String): Todo`;

const queries = `
  todo(id: ID!): Todo
  todos(userId: ID): [Todo]`;

const types = `type Todo {
  id: ID
  title: String
  description: String
  status: Boolean
}`;

const resolvers = {
  [QUERY]: {
    todo: (obj, { id }, context) => todos[id],
    todos: (obj, { userId }, context) => {
      const asList = todosList.map(id => todos[id]);
      return userId ? asList.filter(todo => todo.userId === userId) : asList;
    }
  },
  [MUTATION]: {
    createTodo: (obj, { title, description }, context) => {
      const id = uniqueId();
      todos[id] = {
        description,
        id,
        userId: "739955945098.7233",
        status: false,
        title
      };
      todosList.push(id);
      return todos[id];
    }
  }
}


module.exports = {
  mutations,
  resolvers,
  queries,
  types
}
