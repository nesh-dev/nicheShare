
import { mergeTypes } from 'merge-graphql-schemas';
import AuthTypeDefs from './Authentication/schema';
import HobbyTypeDefs from './Hobby/schema';
import HobbyPostTypeDefs from './HobbyPosts/schema';
import CommentsTypeDefs from './comments/schema';

const typeDefs = [
  AuthTypeDefs,
  HobbyTypeDefs,
  HobbyPostTypeDefs,
  CommentsTypeDefs
];

export default mergeTypes(typeDefs, { all: true });
