import models from '../../../database/models';

const hobbyLoader = async (keys) => {
  const posts = await models.Hobby.findAll({
    where: { id: keys, isDeleted: false }
  });
  const postMap = {};
  posts.forEach((post) => {
    postMap[post.id] = post;
  });
  return keys.map((key) => postMap[key]);
};

  
export default hobbyLoader;
