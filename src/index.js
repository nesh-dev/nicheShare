import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';

import app from './app';
import typeDefs from './graphQl/Modules/baseTypeDefs';
import resolvers from './graphQl/Modules/baseResolvers';
import models from './database/models';


dotenv.config();

const server = new ApolloServer({ typeDefs, resolvers, context: models });
server.applyMiddleware({ app });
models.sequelize.authenticate();

models.sequelize.sync();
app.listen(process.env.PORT,
  () => console.log(`Node Graphql API listening on port ${process.env.PORT}!`));
