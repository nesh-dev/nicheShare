
import models from '../../../database/models';

class HobbyPostsUtils {
  static async getAllHobbyPosts() {
    const allHobbies = models.HobbyPosts.findAll({
      where: {
        isDeleted: false
      },
      order: [
        ['createdAt', 'DESC']
      ]
    });
  
    return allHobbies;
  }

  static async getHobbyPost(payload) {
    try {
      const { slug, } = payload;
      const hobbyToGet = models.HobbyPosts.findOne({
        where: { slug, isDeleted: false }
      });
      if (hobbyToGet) {
        return hobbyToGet;
      }
      throw new Error('Post does not exist');
    } catch (error) {
      throw new Error(error);
    }
  }

  static async createHobbyPost(payload) {
    const { input, userInfo } = payload;
    const {
      title, description, image, hobbyId
    } = input;
    const hobby = await models.Hobby.findOne({ where: { id: hobbyId, isDeleted: false } });

    if (hobby) {
      const { userId: id } = userInfo;
      try {
        const hobbyPosts = await models.HobbyPosts.create({
          userId: id,
          title,
          description,
          image,
          hobbyId
        });
        return hobbyPosts;
      } catch (error) {
        throw new Error(`${error}`);
      }
    } else {
      throw new Error('Post does not exist');
    }
  }

  static async updateHobbyPost(payload) {
    const { userInfo: { userId }, input, slug } = payload;
    const {
      title, description, image, hobbyId,
    } = input;
    const hobbyPost = await models.HobbyPosts.findOne({ where: { slug, userId, isDeleted: false } });
    if (hobbyPost) {
      await hobbyPost.update({
        title, description, image, hobbyId,
      });
      return hobbyPost;
    }
    throw new Error('Post does not exist');
  }


  static async deleteHobbyPost(payload) {
    const { userInfo: { userId }, slug } = payload;
    try {
      let message;
      const hobbyToDelete = await models.HobbyPosts.findOne({ where: { slug, userId, isDeleted: false } });

      if (hobbyToDelete) {
        await hobbyToDelete.update({
          isDeleted: true
        });
        message = 'Succesfully Deleted';
        return { message };
      }
    
      message = ' Hobby does not exist ';
      return { message };
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default HobbyPostsUtils;
