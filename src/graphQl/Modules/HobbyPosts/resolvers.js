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

    async createHobbyPost(root, { title, description, image }, { user }) {
      if (!user) {
        throw new Error(' User is not authenticated');
      } else {
        return HobbyPostsUtils.createHobbyPost({ title, description, image });
      }
    }

  }
};

module.exports = resolvers;
