import jwt from 'jsonwebtoken';

export const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, process.env.SECRET_KEY);
    }
    return null;
  } catch (err) {
    return null;
  }
};
