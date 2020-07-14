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
    },
    hobby: async (parent, args, { user, hobbyLoader }) => {
      if (!user) {
        throw new Error('user is not authenticated');
      } else {
        console.log('got called')
        return hobbyLoader.load(parent.hobbyId);
      }
    }
  },
  Query: {
    async Hobby(_root, args) {
      return HobbyUtils.getHobby({ ...args });
    },

    async Hobbies(_root, _args) {
      return models.Hobby.findAll({
        where: {
          isDeleted: false
        },
        order: [
          ['createdAt', 'DESC']
        ]
      });
    }
  },

  Mutation: {
    async createHobby(_root, args, { user }) {
      return HobbyUtils.createHobby({
        user, ...args
      });
    },

    async updateHobby(_root, args, { user }) {
      return HobbyUtils.updateHobby({
        user, ...args
      });
    },

    async deleteHobby(_root, { id }, { user }) {
      return HobbyUtils.deleteHobby({ id, user });
    }

  }
};

export default resolvers;
