import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';

import app from './app';
import typeDefs from './graphQl/Modules/baseTypeDefs';
import resolvers from './graphQl/Modules/baseResolvers';
import models from './database/models';
import { getUser } from './utils/auth';


dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    const tokenWithBearer = req.headers.authorization || '';
    const token = tokenWithBearer.split(' ')[1];
    const user = getUser(token);
    return {
      user, models, req, res
    };
  },
});
server.applyMiddleware({ app });
models.sequelize.authenticate();

models.sequelize.sync();
app.listen(process.env.PORT,
  () => console.log(`Node Graphql API listening on port ${process.env.PORT}!`));
