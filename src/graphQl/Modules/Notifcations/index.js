import nodemailer from 'nodemailer';
import Mailer from './templates';

class Notifications {
  static async sendMail(email, subject, type, username, token) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_SENT,
        pass: process.env.EMAIL_SENT_PASSWORD
      }
    });
    const mailOptions = await Mailer.mailerObject(email, subject, type, username, token);
    
    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.log(err);
      else console.log(info);
    });
  }
}

export default Notifications;
