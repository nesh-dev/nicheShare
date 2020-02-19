
import { mergeTypes } from 'merge-graphql-schemas';
import AuthTypeDefs from './Authentication/schema';
import HobbyTypeDefs from './Hobby/schema';
import HobbyPostTypeDefs from './HobbyPosts/schema';

const typeDefs = [
  AuthTypeDefs,
  HobbyTypeDefs,
  HobbyPostTypeDefs
];

export default mergeTypes(typeDefs, { all: true });
