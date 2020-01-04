import HobbyUtils from './index';
import models from '../../../database/models';


const resolvers = {
  Query: {
    async getHobby(root, { name }, { user }) {
      const userObject = await models.Hobby.findOne({ where: { name } });
      
      if (!user) {
        throw new Error('user is not authenticated');
      } else {
        return userObject;
      }
    },

    async getHobbies(root, args, { user }) {
      if (!user) {
        throw new Error('user is not authenticated');
      } else {
        await models.Hobby.findAll();
      }
    }
  },

  Mutation: {
    async createHobby(root, { name }, { user }) {
      if (!user) {
        throw new Error(' user is not authenticated ');
      } else {
        return HobbyUtils.createHobby({ name, user });
      }
    },

    async updateHobby(root, { id, name }, { user }) {
      if (!user) {
        throw new Error(' user is not authenticated ');
      } else {
        return HobbyUtils.updateHobby({ user, id, name });
      }
    }
  }
};

export default resolvers;
