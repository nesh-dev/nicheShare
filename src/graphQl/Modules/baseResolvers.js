import { mergeResolvers } from 'merge-graphql-schemas';
import AuthResolvers from './Authentication/resolver';
import HobbyResolvers from './Hobby/resolvers';

const resolvers = [
  AuthResolvers,
  HobbyResolvers
];
export default mergeResolvers(resolvers);
