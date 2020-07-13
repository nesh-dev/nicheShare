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
    async HobbyPost(root, args, { user }) {
      if (!user) {
        throw new Error('user is not authenticated');
      } else {
        return HobbyPostsUtils.getHobbyPost({ ...args });
      }
    },
    async HobbyPosts(root, args, { user }) {
      if (!user) {
        throw new Error('user is not authenticated');
      } else {
        return HobbyPostsUtils.getAllHobbyPosts();
      }
    }
  },

  Mutation: {
    async createHobbyPosts(root, args, { user: { userInfo } }) {
      if (!userInfo) {
        throw new Error(' User is not authenticated');
      } else {
        return HobbyPostsUtils.createHobbyPost({
          ...args, userInfo,
        });
      }
    }

  }
};

module.exports = resolvers;
