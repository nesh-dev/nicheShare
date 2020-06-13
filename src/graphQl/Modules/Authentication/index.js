import jwt from 'jsonwebtoken';
import Notifications from '../Notifcations/index';
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
    if (existingUser) {
      throw new Error('user with email is already registered');
    } else {
      user = await models.Users.create({
        name,
        email,
        password
      });
      const { id, name: userName } = user;
      const userObject = { userId: id, userName };
      token = jwt.sign({ userInfo: userObject }, process.env.SECRET_KEY);
      await Notifications.sendMail(email,
        'Welcome and Kindly Activate Your account', 'activate', userName, token);
      return { user, token };
    }
  }

  static async login(payload) {
    const { email, password } = payload;
    const user = await models.Users.findOne({ where: { email } });
    const { name, id } = user;
    const userObject = { userId: id, userName: name };
    const correct = user && await user.correctPassword(password);
    let token;
    if (user && correct) {
      if (!user.isActive) {
        throw new Error('Kindly check your email address to activate your account');
      } else {
        token = jwt.sign({ userInfo: userObject }, process.env.SECRET_KEY);
        return { token };
      }
    } else {
      throw new Error('wrong credentials');
    }
  }

  static async decodeUtil(token) {
    let result;
    await jwt.verify(
      token,
      process.env.SECRET_KEY,
      (error, decodedToken) => {
        if (error) {
          throw new Error(error);
        } else {
          result = decodedToken;
        }
      }
    );
    return result;
  }

  static async activateUser(payload) {
    const { token } = payload;
    const userInfo = await HandleAuth.decodeUtil(token);
    const { email } = userInfo.userInfo;
    if (email && email !== undefined) {
      const user = await models.Users.findOne({ where: { email } });
      let message;
      if (!user) {
        throw new Error('wrong user information');
      } else {
        if (user.isActive) {
          message = 'Account has already been activated';
        } else {
          await user.update({
            isActive: true
          });
          message = 'Account has successfully been activated';
        }
        return { message };
      }
    }
  }

  static async emailToReset(payload) {
    let message;
    const { email } = payload;
    const user = await models.Users.findOne({ where: { email } });
    const username = user.name;
    if (user) {
      const token = jwt.sign({ userInfo: user }, process.env.SECRET_KEY);
      Notifications.sendMail(email, 'Reset Your Password', 'passwordReset', username, token);
      message = 'Kindly check your email to reset your password';
    } else {
      message = 'Sorry there is no user registered with the email address';
    }
    return { message };
  }

  static async resetPassword(payload) {
    const { password, token } = payload;
    let message;
    const userInfo = await HandleAuth.decodeUtil(token);
    const { email } = userInfo.userInfo;
    const user = await models.Users.findOne({ where: { email } });
    if (user) {
      user.update({
        password
      });
      message = 'password has successfully been updated';
    } else {
      message = 'Sorry there is no user registered with the email address';
    }
    return { message };
  }

  static async googleLogin(payload) {
    const { accessToken, refreshToken, profile } = payload;
    let user;
    let existingUser;
    
    if (profile.emails[0].value) {
      const email = profile.emails[0].value;
      existingUser = await models.Users.findOne({ where: { email } });
    }

    if (existingUser) {
      user = await existingUser.update({
        googleId: profile.id,
        profileAvatar: profile._json.picture,
        googleAccessToken: accessToken,
      });
    } else {
      user = await models.Users.findOne({ where: { googleId: profile.id } });
    }

    if (!user) {
      user = await models.Users.create({
        name: profile.displayName || `${profile.family_name} ${profile.given_name}`,
        email: profile.emails[0].value,
        googleId: profile.id,
        googleAccessToken: accessToken,
        profileAvatar: profile._json.picture
      });

      const token = jwt.sign({ userInfo: user }, process.env.SECRET_KEY);
      await Notifications.sendMail(user.name,
        'Welcome and Kindly Activate Your account',
        'activate', user.name, token);
    }
    if (user) {
      const token = jwt.sign({ userInfo: user }, process.env.SECRET_KEY);
      return { user, token };
    }
  }
}

export default HandleAuth;
