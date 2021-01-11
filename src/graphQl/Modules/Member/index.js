import models from '../../../database/models';


class Members {
  static async getMembers(payload) {
    const { hobbyId } = payload;
    const members = await models.member.findAll({ where: { hobbyId } });
    if (members) {
      return members;
    }
    throw new Error('record does not exist');
  }

  static async getMember(payload) {
    const { id } = payload;
    const member = await models.member.findOne({ where: { id } });
    return member;
  }

  static async join(payload) {
    let member;
    const { user: { userInfo: { id: userId } }, hobbyId } = payload;
    const existingMember = await models.member.findOne({ where: { userId, hobbyId, isDeleted: false } });
    if (!existingMember) {
      member = await models.member.create({
        userId,
        hobbyId
      });
      return member;
    }
    throw new Error(' User is already a member of the community');
  }

  static async leave(payload) {
    const { user: { userInfo: { id: userId } }, hobbyId } = payload;
    const existingMember = await models.member.findOne({ where: { userId, hobbyId, isDeleted: false } });
       
    if (!existingMember) {
      throw new Error(' User is not a member of the community');
    } else {
      await existingMember.update({
        isDeleted: true
      });
      return existingMember;
    }
  }

  static async checkIfMember(payload) {
    const { user: { userInfo: { id: userId } }, hobbyId } = payload;
    const existingMember = await models.member.findOne({ where: { userId, hobbyId, isDeleted: false } });
    const member = { member: !!existingMember };
    return member;
  }
}

export default Members;
