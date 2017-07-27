const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLFieldConfig
} = require('graphql');
const data = require('./utils/sample-data');

const users = data.users;
const userIds = data.usersList;

const todos = data.todos;
const todoIds = data.todosList;

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: {
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    status: {
      type: GraphQLBoolean
    },
  }
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    name: {
      type: GraphQLString
    },
    id: {
      type: GraphQLID
    },
    todos: {
      type: new GraphQLList(TodoType),
      resolve: (rootObj, args, ctx) => users[rootObj.id].todoIds.map(id => todos[id])
    }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root Query!',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      args: {},
      resolve: (rootObj, args, ctx) => userIds.map(id => users[id])
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve: (rootObj, {id}, ctx) => users[id]
    },
    todos: {
      type: new GraphQLList(TodoType),
      args: {
        userId: {
          type: GraphQLID
        }
      },
      resolve: (rootObj, {userId}, ctx) => {
        return userId ?
          users[userId].todoIds.map(id => todos[id]) :
          todoIds.map(id => todos[id]);
      }
    }
  }
});

module.exports = {
  schema: new GraphQLSchema({
    query: RootQuery,
  })
}
