import models from '../../../database/models';


const userLoader = async (keys) => {
  const users = await models.Users.findAll({
    where: { id: keys }
  });
  const userMap = {};
  users.forEach((user) => {
    userMap[user.id] = user;
  });
  return keys.map((key) => userMap[key]);
};


export default userLoader;
