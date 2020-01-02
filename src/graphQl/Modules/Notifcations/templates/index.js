import { activateTemplate } from './activateTemplate';
import { passwordResetTemplate } from './passwordReset';

class Mailer {
  static async switchTemplate(type, username, token) {
    switch (type) {
      case 'activate':
        return activateTemplate({ username, token });
      case 'passwordReset':
        return passwordResetTemplate({ username, token });
      default:
        return '<h1>Something went wrong, NicheShare </h1>';
    }
  }

  static async mailerObject(email, subject, type, username, token) {
    const template = await Mailer.switchTemplate(type, username, token);
    const theObject = {
      from: process.env.EMAIL_SENT,
      to: email,
      subject,
      html: template
    };

    return theObject;
  }
}

export default Mailer;
