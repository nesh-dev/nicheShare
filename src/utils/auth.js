import jwt from 'jsonwebtoken';

const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, process.env.SECRET_KEY);
    }
    return null;
  } catch (err) {
    throw new Error(err);
  }
};

export default getUser;
