
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

  static async createHobbyPost(payload) {
    const { input, userInfo } = payload;
    const {
      title, description, image, hobbyId
    } = input;
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
  }
}

export default HobbyPostsUtils;
