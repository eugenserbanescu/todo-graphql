const { makeExecutableSchema } = require('graphql-tools');
const sampleData = require('./utils/sample-data');
const uniqueId = require('./utils/unique-id');

const users = sampleData.users;
const usersList = sampleData.usersList;

const todos = sampleData.todos;
const todosList = sampleData.todosList;

const typeDefs = `
type Todo {
  id: ID
  title: String
  description: String
  status: Boolean
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
`;

const resolvers = {
  Query: {
    todo: (obj, {id}, context) => todos[id],
    todos: (obj, {userId}, context) => {
      const asList = todosList.map(id => todos[id]);
      return userId ? asList.filter(todo => todo.userId === userId) : asList;
    },
    user: (obj, {id}, context) => users[id],
    users: (obj, args, context) => usersList.map(id => users[id])
  },
  Mutation: {
    createUser: (obj, {name}, context) => {
      const id = uniqueId();
      users[id] = {
        id,
        name
      }
      usersList.push(id);
      return users[id];
    },
    removeUser: (obj, {id}, context) => {
      // HACK: to store the user we're about to remove
      const removedUser = Object.assign({},users[id]);
      delete users[id];
      usersList.splice(usersList.findIndex(uid => id === uid), 1);
      return removedUser;
    }
  },
  User: {
    name: (obj, args, context) => obj.name,
    id: (obj, args, context) => obj.id,
    todos: (obj, args, context) => resolvers.Query.todos(obj, {userId: obj.id}, context)
  }
}

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
