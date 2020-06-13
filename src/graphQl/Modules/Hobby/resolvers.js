import HobbyUtils from './index';
import models from '../../../database/models';


const resolvers = {
  Query: {
    async getHobby(parent, { name }, { user }) {
      if (!user) {
        throw new Error('user is not authenticated');
      } else {
        return HobbyUtils.getHobby({ name });
      }
    },

    async getHobbies(root, args, { user }) {
      if (!user) {
        throw new Error('user is not authenticated');
      } else {
        return models.Hobby.findAll({
          where: {
            isDeleted: false
          }
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
