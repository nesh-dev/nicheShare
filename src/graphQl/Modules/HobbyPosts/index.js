
import models from '../../../database/models';

class HobbyPostsUtils {
  static async getAllHobbyPosts() {
    const allHobbies = models.HobbyPosts.findAll({
      where: {
        isDeleted: false
      }
    });
    return allHobbies;
  }

  static async createHobbyPost(payload) {
    const { input, userInfo } = payload;
    const {
      title, description, image, hobbyId
    } = input;
    const { userId } = userInfo;
    try {
      const user = await models.Users.findOne({
        where: {
          id: userId
        }
      });
      const hobbyPosts = await models.HobbyPosts.create({
        userId,
        title,
        description,
        image,
        hobbyId
      });
      return { hobbyPosts, user };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default HobbyPostsUtils;
