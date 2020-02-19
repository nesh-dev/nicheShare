
import models from '../../../database/models';

class HobbyPostsUtils {
  static async getAllHobbyPosts() {
    const allHobbies = models.Hobby.findAll({
      where: {
        isDeleted: false
      }
    });
    return allHobbies;
  }

//   static async getHobby(payload){
//       const { id } =
//   }
}

export default HobbyPostsUtils;
