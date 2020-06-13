import dotenv from 'dotenv';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import { constraintDirective } from 'graphql-constraint-directive';
import DataLoader from 'dataloader';

import typeDefs from './graphQl/Modules/baseTypeDefs';
import resolvers from './graphQl/Modules/baseResolvers';
import models from './database/models';
import getUser from './utils/auth';
import app from './app';
import userLoader from './graphQl/Modules/DataLoaders/userLoader';

dotenv.config();

const schema = makeExecutableSchema(
  {
    typeDefs,
    resolvers,
    schemaTransforms: [constraintDirective('constraint')]
  }
);

const server = new ApolloServer({

  schema,
  context: ({ req, res }) => {
    const tokenWithBearer = req.headers.authorization || '';
    const token = tokenWithBearer.split(' ')[1];
    const user = getUser(token);
    const loaders = {
      userLoader: new DataLoader((ids) => userLoader(ids))
    };
    return {
      user, models, req, res, loaders
    };
  },
});

server.applyMiddleware({ app });
models.sequelize.authenticate();
models.sequelize.sync();
app.listen(process.env.PORT,
  () => console.log(`Node Graphql API listening on port ${process.env.PORT}!`));
