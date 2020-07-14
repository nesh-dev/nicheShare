import HobbyPostsUtils from './index';

const resolvers = {
  HobbyPosts: {
    hobby: async (parent, args, { user, hobbyLoader }) => {
      if (!user) {
        throw new Error('user is not authenticated');
      } else {
        return hobbyLoader.load(parent.hobbyId);
      }
    }
  },
  Query: {
    async HobbyPost(root, args) {
      return HobbyPostsUtils.getHobbyPost({ ...args });
    },
    async HobbyPosts(root, args) {
      return HobbyPostsUtils.getAllHobbyPosts({ ...args });
    }
  },

  Mutation: {
    async createHobbyPosts(root, args, { user: { userInfo } }) {
      return HobbyPostsUtils.createHobbyPost({
        ...args, userInfo,
      });
    }

  }
};

module.exports = resolvers;
