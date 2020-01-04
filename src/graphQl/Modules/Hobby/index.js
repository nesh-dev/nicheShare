import models from '../../../database/models';

class Hobby {
  static async createHobby(payload) {
    const { name, user } = payload;
    const { userInfo: { id: userId } } = user;
    const existingHobby = await models.Hobby.findOne({ where: { name } });
    let hobby;
    if (!existingHobby) {
      hobby = await models.Hobby.create({
        userId,
        name
      });
    } else {
      throw new Error('Hobby exists');
    }
   
    return hobby;
  }

  static async updateHobby(payload) {
    let hobby;
    const { id, name, user } = payload;
    const hobbyToUpdate = await models.Hobby.findOne({ where: { id }, attributes: ['userId'] });
    const { userInfo: { id: userId } } = user;
    const { dataValues: { userId: ownerId } } = hobbyToUpdate;
    const verifyOwner = userId === ownerId;
    if (!verifyOwner) { throw new Error('Unauthorized action'); }
    if (hobbyToUpdate && verifyOwner) {
      hobby = await hobbyToUpdate.update({
        id,
        userId,
        name
      });
    } else {
      throw new Error('Hobby does not exist');
    }

    return hobby;
  }
}

export default Hobby;
