
import { mergeTypes } from 'merge-graphql-schemas';
import AuthTypeDefs from './Authentication/schema';
import HobbyTypeDefs from './Hobby/schema';

const typeDefs = [
  AuthTypeDefs,
  HobbyTypeDefs
];

export default mergeTypes(typeDefs, { all: true });
