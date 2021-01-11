import models from '../../../database/models';

class CommentsUtils {
  static async getComments() {
    return models.Comments.findAll({
      where: { isDeleted: false },
      order: [['createdAt', 'DESC']]
    });
  }

  static async getComment(payload) {
    const { id } = payload;
    const comment = await models.Comments.findOne({
      where: { id, isDeleted: false }
    });
    if (comment) {
      return comment;
    }
    throw new Error('comment does not exist');
  }

  static async getReplies(payload) {
    const { id } = payload;
    const comments = await models.Comments.findAll({
      where: { parent: id, isDeleted: false }
    });
    if (comments) {
      return comments;
    }
    throw new Error('comment does not exist');
  }

  static async createComment(payload) {
    const {
      input,
      userInfo: { id: userId }
    } = payload;

    const { text, parent, hobbyPostId } = input;
    let reply;
    let comment;
    const hobbyPost = await models.HobbyPosts.findOne({
      where: { id: hobbyPostId, isDeleted: false }
    });
    const hobbyParent = await models.HobbyPosts.findOne({
      where: { id: hobbyPostId, isDeleted: false }
    });
    const commentToReplyTo = parent
      && (await models.Comments.findOne({
        where: { id: parent, isDeleted: false }
      }));

    if (!hobbyPost) {
      throw new Error('HobbyPost with the id does not exist');
    }

    if (parent && !commentToReplyTo) {
      throw new Error('Comment with the id does not exist');
    }

    if (hobbyParent && parent) {
      reply = true;
      comment = await models.Comments.create({
        text,
        reply,
        parent,
        hobbyPostId,
        userId
      });
    } else if (!parent) {
      comment = await models.Comments.create({
        text,
        parent,
        hobbyPostId,
        userId
      });
    }

    return comment;
  }
}

export default CommentsUtils;
