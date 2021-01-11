import models from '../../../database/models';

class Hobby {
  static async getHobby(payload) {
    const { name } = payload;
    try {
      const hobby = await models.Hobby.findOne({
        where: { name, isDeleted: false }
      });
      if (hobby) {
        const { id } = hobby;
        const hobbyPosts = await models.HobbyPosts.findAll({
          where: {
            hobbyId: id,
            isDeleted: false
          }
        });
        return { hobby, hobbyPosts };
      }
      throw new Error('Hobby does not exist');
    } catch (error) {
      throw new Error(error);
    }
  }

  static async createHobby(payload) {
    const { input, user } = payload;

    const {
      name, image, description, bannerImage, profileImage
    } = input;
    const {
      userInfo: { id }
    } = user;
    const existingHobby = await models.Hobby.findOne({
      where: { name, isDeleted: false }
    });
    let hobby;
    if (!existingHobby) {
      hobby = await models.Hobby.create({
        userId: id,
        name,
        image,
        description,
        bannerImage,
        profileImage
      });
    } else {
      throw new Error('Hobby exists');
    }
    return hobby;
  }

  static async updateHobby(payload) {
    let hobby;
    const { input, user, id } = payload;

    const {
      name, image, description, bannerImage, profileImage
    } = input;

    const {
      userInfo: { id: userId }
    } = user;

    const hobbyToUpdate = await models.Hobby.findOne({
      where: { id, isDeleted: false },
      attributes: ['userId']
    });

    if (hobbyToUpdate == null) {
      throw new Error('Hobby does not exist');
    }

    const {
      dataValues: { userId: ownerId }
    } = hobbyToUpdate;
    const verifyOwner = userId === ownerId;

  
    if (!verifyOwner) {
      throw new Error('Unauthorized action');
    }
    if (hobbyToUpdate && verifyOwner) {
      hobby = await hobbyToUpdate.update({
        id,
        userId,
        name,
        image,
        description,
        bannerImage,
        profileImage
      });
      return hobby;
    }
  }

  static async deleteHobby(payload) {
    // manage using soft deletes
    const { id } = payload;
    try {
      let message;
      const hobbyToDelete = await models.Hobby.findOne({
        where: { id, isDeleted: false }
      });
      if (!hobbyToDelete) {
        message = ' Hobby does not exist ';
        return { message };
      }
      await models.Hobby.destroy({
        where: {
          id
        }
      });
      message = 'Succesfully Deleted';
      return { message };
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default Hobby;
