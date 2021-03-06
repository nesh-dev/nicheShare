import dotenv from 'dotenv';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';
import { constraintDirective } from 'graphql-constraint-directive';
import DataLoader from 'dataloader';

import typeDefs from './graphQl/Modules/baseTypeDefs';
import resolvers from './graphQl/Modules/baseResolvers';
import models from './database/models';
import getUser from './utils/auth';
import app from './app';
import userLoader from './graphQl/Modules/DataLoaders/userLoader';
import hobbyLoader from './graphQl/Modules/DataLoaders/hobby';
import middleware from './graphQl/Modules/Middleware';
import commentsLoader from './graphQl/Modules/DataLoaders/comment';
import hobbyPostsLoader from './graphQl/Modules/DataLoaders/hobbyPosts';

dotenv.config();

const schema = makeExecutableSchema(
  {
    typeDefs,
    resolvers,
    schemaTransforms: [constraintDirective('constraint')]
  }
);
const schemaWithMiddleware = applyMiddleware(schema, ...middleware);

const server = new ApolloServer({

  schema: schemaWithMiddleware,
  context: ({ req, res }) => {
    const tokenWithBearer = req.headers.authorization || '';
    const token = tokenWithBearer.split(' ')[1];
    const user = getUser(token);
    const loaders = {
      userLoader: new DataLoader((ids) => userLoader(ids)),
      hobbyLoader: new DataLoader((ids) => hobbyLoader(ids)),
      HobbyPostLoader: new DataLoader((ids) => hobbyPostsLoader(ids)),
      CommentsLoader: new DataLoader((ids) => commentsLoader(ids))
    };
    return {
      user,
      models,
      req,
      res,
      ...loaders,
    };
  },
});

server.applyMiddleware({ app });
models.sequelize.authenticate();
models.sequelize.sync();
app.listen(process.env.PORT,
  () => console.log(`Node Graphql API listening on port ${process.env.PORT}!`));
