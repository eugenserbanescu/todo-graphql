const { buildSchema, graphql } = require('graphql');

const uniqueId = require('./utils/unique-id');
const sampleData = require('./utils/sample-data');

const users = sampleData.users;
const usersList = sampleData.usersList;

const todos = sampleData.todos;
const todosList = sampleData.todosList;

const schema = buildSchema(`
  type Todo {
    id: ID
    title: String
    description: String
    status: Boolean
    user: User
  }

  type User {
    id: ID
    name: String
    todos(userId: ID): [Todo]
  }

  type Query {
    todo(id: ID!): Todo
    todos(userId: ID): [Todo]
    user(id: ID!): User
    users: [User]
  }

  type Mutation {
    createUser(name: String!): User
    removeUser(id: ID!): User
  }
`);

const rootVal = {
  users: () => {
    return usersList.map(id => {
      let ret = Object.assign({},users[id]);
      ret.todos = ret.todoIds.map(todoId => todos[todoId]);
      return ret;
    });
  },
  user: ({id}) => {
    let ret = Object.assign({}, users[id]);
    ret.todos = ret.todoIds.map(todoId => todos[todoId]);
    return ret;
  },
  todos: ({userId}) => todosList.map(id => {
    let ret = Object.assign({},todos[id]);
    ret.user = users[ret.userid];
    return ret;
  }),
  todo: ({id}) => {
    let ret = Object.assign({},todos[id]);
    ret.user = users[ret.userid];
    return ret;
  },
  createUser: ({name}) => {
    const id = uniqueId();
    users[id] = {
      id,
      name: args.name
    }
    usersList.push(id);
  },
  removeUser: ({id}) => {
    delete users[id];
    usersList.splice(usersList.findIndex(uid => id === uid), 1);
  }
};

module.exports = {
  schema,
  rootVal
}
