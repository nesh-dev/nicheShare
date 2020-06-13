// import { mergeResolvers } from 'merge-graphql-schemas';
import { mergeResolvers } from 'merge-graphql-schemas';
import AuthResolvers from './Authentication/resolver';
import HobbyResolvers from './Hobby/resolvers';
import HobbyPostResolvers from './HobbyPosts/resolvers';


const resolvers = [
  AuthResolvers,
  HobbyResolvers,
  HobbyPostResolvers
];
export default mergeResolvers(resolvers);
