import HobbyUtils from './index';
import models from '../../../database/models';


const resolvers = {
  
  HobbyPosts: {
    author: async (parent, args, { user, userLoader }) => {
      if (!user) {
        throw new Error('user is not authenticated');
      } else {
        return userLoader.load(parent.userId);
      }
    }
  },
  Query: {
    async Hobby(root, args, { user }) {
      if (!user) {
        throw new Error('user is not authenticated');
      } else {
        return HobbyUtils.getHobby({ ...args });
      }
    },

    async Hobbies(root, args, { user }) {
      if (!user) {
        throw new Error('user is not authenticated');
      } else {
        return models.Hobby.findAll({
          where: {
            isDeleted: false
          },
          order: [
            ['createdAt', 'DESC']
          ]
        });
      }
    }
  },

  Mutation: {
    async createHobby(root, args, { user }) {
      if (!user) {
        throw new Error(' user is not authenticated ');
      } else {
        return HobbyUtils.createHobby({
          user, ...args
        });
      }
    },

    async updateHobby(root, args, { user }) {
      if (!user) {
        throw new Error(' user is not authenticated ');
      } else {
        return HobbyUtils.updateHobby({
          user, ...args
        });
      }
    },

    async deleteHobby(root, { id }, { user }) {
      if (!user) {
        throw new Error(' user is not authenticated ');
      } else {
        return HobbyUtils.deleteHobby({ id, user });
      }
    }

  }
};

export default resolvers;
