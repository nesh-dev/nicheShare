import jwt from 'jsonwebtoken';
import models from '../../../database/models';
import { addMiddlewareToResolvers } from './addMiddlewareHelper';
import HobbyResolvers from '../Hobby/resolvers';
import HobbyPostResolvers from '../HobbyPosts/resolvers';
import CommentResolvers from '../comments/resolvers';
import MemberResolvers from '../Member/resolver';
 

const getUser = async (token) => {
  try {
    if (token) {
      const user = jwt.verify(token, process.env.SECRET_KEY);
      if (user.userInfo.name) {
        const { userInfo: { name } } = user;
        const userRecord = await models.Users.findOne({ where: { name } });
        if (userRecord) {
          return jwt.verify(token, process.env.SECRET_KEY);
        }
      }
     
      throw new Error('Token not valid');
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
  Query: addMiddlewareToResolvers([HobbyResolvers, HobbyPostResolvers, CommentResolvers, MemberResolvers], authenticate, 'Query'),
  Mutation: addMiddlewareToResolvers([HobbyResolvers, HobbyPostResolvers, CommentResolvers, MemberResolvers], authenticate, 'Mutation')
};

export default authenticateMiddleware;
