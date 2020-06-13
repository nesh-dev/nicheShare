import DataLoader from 'dataloader';
import models from '../../../database/models';


const userLoader = async (keys) => {
  const users = await models.User.getAll({
    where: { id: keys }
  });
  const userMap = {};
  users.array.forEach((user) => {
    userMap[user.id] = user;
  });
  return keys.map((key) => userMap[key]);
};


export default userLoader;
