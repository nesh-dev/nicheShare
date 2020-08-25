import CommentUtils from './index';


const resolvers = {

  Comment: {
    author: async (parent, args, { user, userLoader }) => {
      if (!user) {
        throw new Error('user is not authenticated');
      } else {
        const { userId } = parent;
        return userLoader.load(userId);
      }
    },
    hobbyPost: async (parent, args, { user, HobbyPostLoader }) => {
      if (!user) {
        throw new Error('user is not authenticated');
      } else {
        const { hobbyPostId } = parent;
        return hobbyPostId && HobbyPostLoader.load(hobbyPostId);
      }
    },

    parent: async (parent, args, { user, CommentsLoader }) => {
      if (!user) {
        throw new Error('user is not authenticated');
      } else {
        const { parent: parentId } = parent;
        return parentId && CommentsLoader.load(parentId);
      }
    },

  },

  Query: {
    async Comments(root, args) {
      return CommentUtils.getComments();
    },

    async Comment(root, args) {
      return CommentUtils.getComment({ ...args });
    },
    
    async Replies(root, args) {
      return CommentUtils.getReplies({ ...args });
    }
  },

  Mutation: {
      
    async createComment(root, args, { user: { userInfo } }) {
      return CommentUtils.createComment({ ...args, userInfo });
    },
  }
};


export default resolvers;
