// const { schema } = require('./schema-js');
// const { schema, rootVal } = require('./schema');
const schema = require('./schema/get-schema.js');
const express = require('express');
const graphqlHTTP = require('express-graphql');

var app = express();

app.use(express.static('public'));
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(1337);
console.log('Running a GraphQL API server at localhost:1337/graphql');
