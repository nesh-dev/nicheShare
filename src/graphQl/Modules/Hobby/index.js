import models from '../../../database/models';

class Hobby {
  static async getHobby(payload) {
    const { name } = payload;
    const existingHobby = await models.Hobby.findOne({ where: { name } });
    if (existingHobby === null) { throw new Error('Hobby does not exist'); }
    return existingHobby;
  }

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
    if (hobbyToUpdate === null) { throw new Error('Hobby does not exist'); }
    if (!verifyOwner) { throw new Error('Unauthorized action'); }
    if (hobbyToUpdate && verifyOwner) {
      hobby = await hobbyToUpdate.update({
        id,
        userId,
        name
      });
      return hobby;
    }
  }

  static async deleteHobby(payload) {
  
    const { id, user } = payload;
    const hobbyToDelete = await models.Hobby.findOne({ where: { id }, attributes: ['userId'] });
    if (hobbyToDelete === null) { throw new Error('Hobby does not exist'); }
    const { userInfo: { id: userId } } = user;
    const { dataValues: { userId: ownerId } } = hobbyToDelete;
    const verifyOwner = userId === ownerId;
    if (!verifyOwner) { throw new Error('Unauthorized action')}
    await hobbyToDelete.destroy();
    const message = 'Succesfully Deleted';
    return message;
  }
}

export default Hobby;
