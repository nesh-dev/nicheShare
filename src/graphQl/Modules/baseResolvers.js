// import { mergeResolvers } from 'merge-graphql-schemas';
import { mergeResolvers } from 'merge-graphql-schemas';
import AuthResolvers from './Authentication/resolver';
import HobbyResolvers from './Hobby/resolvers';
import HobbyPostResolvers from './HobbyPosts/resolvers';
import CommentsResolvers from './comments/resolvers';


const resolvers = [
  AuthResolvers,
  HobbyResolvers,
  HobbyPostResolvers,
  CommentsResolvers
];
export default mergeResolvers(resolvers);
