import {
  UserInputError,
} from 'apollo-server-express';
import HandleAuth from './index';


const resolvers = {
  Query: {
    async getUser(root, { id }, { models }) {
      return models.Users.findByPk(id);
    },
    async getAllUsers(root, args, { models }) {
      return models.Users.findAll();
    }
  },

  Mutation: {
    async registerUser(Obj, { name, email, password }) {
      return HandleAuth.register({ name, email, password });
    },
    async loginUser(Obj, { email, password }) {
      return HandleAuth.login({ email, password });
    },
    async userInputError(parent, args, context, info) {
      if (args.input !== 'expected') {
        throw new UserInputError('Form Arguments invalid', {
          invalidArgs: Object.keys(args),
        });
      }
    }
  }
};

module.exports = resolvers;
