import {
  UserInputError,
} from 'apollo-server-express';
import HandleAuth from './index';
import { authenticateGoogle } from './socialStrategy';


const resolvers = {
  Query: {
    async getUser(root, args, { user, models }) {
      if (!user) {
        throw new Error('user is not authenticated');
      } else {
        const { id } = user.userInfo;
        return models.Users.findByPk(id);
      }
    },
    async getAllUsers(root, args, { user, models }) {
      if (!user) {
        throw new Error('user is not authenticated');
      } else {
        return models.Users.findAll();
      }
    }
  },

  Mutation: {
    async registerUser(Obj, { name, email, password }) {
      return HandleAuth.register({ name, email, password });
    },
    async loginUser(Obj, { email, password }) {
      return HandleAuth.login({ email, password });
    },

    async activateUser(Obj, { token }) {
      return HandleAuth.activateUser({ token });
    },

    async emailToReset(Obj, { email }) {
      return HandleAuth.emailToReset({ email });
    },

    async passwordReset(Obj, { password, token }) {
      return HandleAuth.resetPassword({ password, token });
    },

    async authGoogle(Obj, { accessToken }, { req, res }) {
      req.body = {
        ...req.body,
        access_token: accessToken,
      };
      const { data, info } = await authenticateGoogle(req, res);
      
      if (data) {
        console.log(data, info, '>>>>');
      }
    },

    async userInputError(parent, args) {
      if (args.input !== 'expected') {
        throw new UserInputError('Form Arguments invalid', {
          invalidArgs: Object.keys(args),
        });
      }
    }
  }
};

module.exports = resolvers;
