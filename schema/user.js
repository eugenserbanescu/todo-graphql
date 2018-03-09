const { QUERY, MUTATION } = require('./utils.js');
const sampleData = require("../utils/sample-data.js");
const uniqueId = require("../utils/unique-id.js");

const users = sampleData.users;
const usersList = sampleData.usersList;

const mutations = `
  createUser(name: String!): User
  removeUser(id: ID!): User`;
const queries = `
  user(id: ID!): User
  users: [User]`;
const types = `type User {
  id: ID
  name: String
  todos(userId: ID): [Todo]
}`;


const resolvers = {
  [QUERY]: {
    user: (obj, { id }, context) => users[id],
    users: (obj, args, context) => usersList.map(id => users[id])
  },
  [MUTATION]: {
    createUser: (obj, { name }, context) => {
      const id = uniqueId();
      users[id] = {
        id,
        name
      };
      usersList.push(id);
      return users[id];
    },
    removeUser: (obj, { id }, context) => {
      // HACK: to be able to return the user we're about to remove
      const removedUser = Object.assign({}, users[id]);
      delete users[id];
      usersList.splice(usersList.findIndex(uid => id === uid), 1);
      return removedUser;
    },
  },
  User: {
    name: (obj, args, context) => obj.name,
    id: (obj, args, context) => obj.id,
    todos: (obj, args, context) =>
      resolvers.Query.todos(obj, { userId: obj.id }, context)
  }
}

module.exports = {
  mutations,
  resolvers,
  queries,
  types
}
