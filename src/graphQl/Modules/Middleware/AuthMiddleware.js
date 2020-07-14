import jwt from 'jsonwebtoken';
import { addMiddlewareToResolvers } from './addMiddlewareHelper';
import HobbyResolvers from '../Hobby/resolvers';
import HobbyPostResolvers from '../HobbyPosts/resolvers';
 

const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, process.env.SECRET_KEY);
    }
    throw new Error('No token provided');
  } catch (err) {
    throw new Error(err);
  }
};

async function authenticate(resolve, parent, args, context, info) {
  const tokenWithBearer = context.req.headers.authorization || '';
  const token = tokenWithBearer.split(' ')[1];
  const user = await getUser(token);
  const argWithUser = { user, ...args };
  return resolve(parent, argWithUser, context, info);
}

const authenticateMiddleware = {
  Query: addMiddlewareToResolvers([HobbyResolvers, HobbyPostResolvers], authenticate, 'Query'),
  Mutation: addMiddlewareToResolvers([HobbyResolvers, HobbyPostResolvers], authenticate, 'Mutation')
};

export default authenticateMiddleware;
