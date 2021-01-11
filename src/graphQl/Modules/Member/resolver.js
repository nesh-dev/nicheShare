
import Members from './index';


const resolvers = {

  Member: {
    user: async (parent, args, { userLoader }) => userLoader.load(parent.userId),

    hobby: async (parent, args, { hobbyLoader }) => hobbyLoader.load(parent.hobbyId)
        
  },

  Query: {

    async getMember(root, args) {
      return Members.getMember({ ...args });
    },

    async getMembers(root, args) {
      return Members.getMembers({ ...args });
    },

    async checkIfMember(root, args) {
      return Members.checkIfMember({ ...args });
    }


  },

  Mutation: {

    async joinHobby(root, args) {
      return Members.join({ ...args });
    },

    async leaveHobby(root, args) {
      return Members.leave({ ...args });
    }
  }


};

export default resolvers;
