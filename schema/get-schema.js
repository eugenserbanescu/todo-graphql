const { makeExecutableSchema } = require("graphql-tools");
const { QUERY, MUTATION } = require('./utils.js');

const todo =  require('./todo.js');
const user =  require('./user.js');
const entities = [todo, user];

let types = '';
let queries = '';
let mutations = '';

let resolvers = {
  [MUTATION]: {},
  [QUERY]: {}
};

entities.forEach(entity => {
  types += `${entity.types}\n`;
  queries += `${entity.queries}\n`;
  mutations += `${entity.mutations}\n`;

  Object.keys(entity.resolvers).forEach(key => {
    switch(key) {
      case MUTATION: {
        resolvers[MUTATION] = Object.assign(resolvers[MUTATION], entity.resolvers[MUTATION]);
        break;
      }
      case QUERY: {
        resolvers[QUERY] = Object.assign(resolvers[QUERY], entity.resolvers[QUERY]);
        break;
      }
      default: {
        resolvers[key] = entity.resolvers[key];
      }
    }
  })
})

const typeDefs = `
  ${types}

  type Query {
    ${queries}
  }

  type Mutation {
    ${mutations}
  }
`;

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
