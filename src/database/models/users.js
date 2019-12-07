
import crypto from 'crypto';


module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },

    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
      get() {
        return () => this.getDataValue('password');
      }
    },
    salt: {
      type: DataTypes.STRING,
      get() {
        return () => this.getDataValue('salt');
      }
    },
  }, {});

  Users.generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
  };

  Users.encryptPassword = function (plainText, salt) {
    return crypto
      .createHash('RSA-SHA256')
      .update(plainText)
      .update(salt)
      .digest('hex');
  };

  Users.decrptPassword = function (plainText, salt) {
    return crypto
      .createHash('RSA-SHA256')
      .update(plainText)
      .update(salt)
      .digest('hex');
  };

  const setSaltAndPassword = (users) => {
    if (users.changed('password')) {
      users.salt = Users.generateSalt();
      users.password = Users.encryptPassword(users.password(), users.salt());
    }
  };

  Users.beforeCreate(setSaltAndPassword);
  Users.beforeUpdate(setSaltAndPassword);

  Users.prototype.correctPassword = function (enterPassword) {
    return Users.encryptPassword(enterPassword, this.salt()) === this.password();
  };


  Users.associate = function (models) {
    // associations can be defined here
  };
  return Users;
};
