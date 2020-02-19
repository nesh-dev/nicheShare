import HobbyUtils from './index';
import models from '../../../database/models';


const resolvers = {
  Query: {
    async getHobby(root, { name }, { user }) {
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
    async createHobby(root, { name, image, description }, { user }) {
      if (!user) {
        throw new Error(' user is not authenticated ');
      } else {
        return HobbyUtils.createHobby({
          name, user, image, description
        });
      }
    },

    async updateHobby(root, {
      id, name, image, description
    }, { user }) {
      if (!user) {
        throw new Error(' user is not authenticated ');
      } else {
        return HobbyUtils.updateHobby({
          user, id, name, image, description
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
