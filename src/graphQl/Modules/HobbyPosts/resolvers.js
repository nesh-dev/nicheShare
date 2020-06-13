import HobbyPostsUtils from './index';

const resolvers = {
  Query: {
    async getHobbyPosts(root, { user }) {
      if (!user) {
        throw new Error('user is not authenticated');
      } else {
        return HobbyPostsUtils.getAllHobbyPosts();
      }
    },

    async getHobbyPost(root, { slug }, { user }) {
      if (!user) {
        throw new Error('user is not authenticated');
      } else {
        return HobbyPostsUtils.getHobbyPost({ slug });
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
