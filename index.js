// const { schema } = require('./schema-js');
// const { schema, rootVal } = require('./schema');
const schema = require('./schema/get-schema.js');
const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if ('OPTIONS' === req.method) {
    res.send(200);
  }
  else {
    next();
  }
});
// app.use(express.static('public'));
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));


app.listen(1337);
console.log('Running a GraphQL API server at localhost:1337/graphql');
