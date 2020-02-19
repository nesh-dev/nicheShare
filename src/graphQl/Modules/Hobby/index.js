import models from '../../../database/models';

class Hobby {
  static async getHobby(payload) {
    const { name } = payload;
    const existingHobby = await models.Hobby.findOne({ where: { name, isDeleted: false } });
    if (existingHobby === null) { throw new Error('Hobby does not exist'); }
    return existingHobby;
  }

  static async createHobby(payload) {
    const {
      name, user, image, description
    } = payload;
    const { userInfo: { id: userId } } = user;
    const existingHobby = await models.Hobby.findOne({ where: { name, isDeleted: false } });
    let hobby;
    if (!existingHobby) {
      hobby = await models.Hobby.create({
        userId,
        name,
        image,
        description
      });
    } else {
      throw new Error('Hobby exists');
    }
    return hobby;
  }

  static async updateHobby(payload) {
    let hobby;
    const {
      id, name, user, image, description
    } = payload;
    const hobbyToUpdate = await models.Hobby.findOne({ where: { id, isDeleted: false }, attributes: ['userId'] });
    const { userInfo: { id: userId } } = user;
    const { dataValues: { userId: ownerId } } = hobbyToUpdate;
    const verifyOwner = userId === ownerId;
    if (hobbyToUpdate === null) { throw new Error('Hobby does not exist'); }
    if (!verifyOwner) { throw new Error('Unauthorized action'); }
    if (hobbyToUpdate && verifyOwner) {
      hobby = await hobbyToUpdate.update({
        id,
        userId,
        name,
        image,
        description
      });
      return hobby;
    }
  }

  static async deleteHobby(payload) {
    // manage using soft deletes
    const { id } = payload;
    const hobbyToDelete = await models.Hobby.findOne({ where: { id, isDeleted: false } });
    await hobbyToDelete.update({
      isDeleted: true
    });
    const message = 'Succesfully Deleted';
    return { message };
  }
}

export default Hobby;
