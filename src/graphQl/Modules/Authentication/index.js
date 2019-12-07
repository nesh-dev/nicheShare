import jwt from 'jsonwebtoken';
import models from '../../../database/models';

class HandleAuth {
  static async register(payload) {
    const { name, email, password } = payload;
    let token;
    let user;

    if (name.length < 3) {
      throw new Error('name must be at least three characters long');
    }

    const existingUser = await models.Users.findOne({ where: { email } });
    if (!existingUser) {
      user = await models.Users.create({
        name,
        email,
        password
      });
      token = jwt.sign({ userInfo: user }, process.env.SECRET_KEY);
    } else {
      throw new Error('user with email is already registered');
    }
    
    return { user, token };
  }

  static async login(payload) {
    const { email, password } = payload;
    const user = await models.Users.findOne({ where: { email } });
    const correct = user && await user.correctPassword(password);
    let token;
    if (user && correct) {
      token = jwt.sign({ userInfo: user }, process.env.SECRET_KEY);
    } else {
      throw new Error('wrong credentials');
    }
    return { token };
  }
}

export default HandleAuth;
