const { QUERY, MUTATION } = require('./utils.js');
const sampleData = require("../utils/sample-data.js");
const uniqueId = require("../utils/unique-id.js");

const todos = sampleData.todos;
const todosList = sampleData.todosList;

const mutations = `
  createTodo(title: String!): Todo
  editTodo(id: ID!, done:Boolean, title:String): Todo
`;

const queries = `
  todo(id: ID!): Todo
  todos(userId: ID): [Todo]`;

const types = `type Todo {
  id: ID
  title: String
  done: Boolean
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
    createTodo: (obj, { done, title }, context) => {
      const id = uniqueId();
      todos[id] = {
        id,
        userId: "739955945098.7233",
        done: false,
        title
      };
      todosList.push(id);
      return todos[id];
    },
    editTodo: (obj, options, context) => {
      todos[options.id] = Object.assign(todos[options.id], options);
      return todos[options.id];
    }
  }
}


module.exports = {
  mutations,
  resolvers,
  queries,
  types
}
