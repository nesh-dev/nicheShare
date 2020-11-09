import models from '../../../database/models';


const hobbyPostLoader = async (keys) => {
  const posts = await models.HobbyPosts.findAll({
    where: { id: keys }
  });
  const postMap = {};
  posts.forEach((post) => {
    postMap[post.id] = post;
  });
  return keys.map((key) => postMap[key]);
};

  
export default hobbyPostLoader;
