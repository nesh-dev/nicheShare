
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
      },
      unique: {
        args: true,
        msg: 'This email already exists'
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

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        notEmpty: true
      },
    },
    googleId: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
    },
    googleAccessToken: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
    },
    facebookId: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
    },
    profileAvatar: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
    }


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

  Users.decryptPassword = function (plainText, salt) {
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

  Users.prototype.correctPassword = function (password) {
    return this.password() === Users.encryptPassword(password, this.salt());
  };

  Users.beforeCreate(setSaltAndPassword);
  Users.beforeUpdate(setSaltAndPassword);
  Users.associate = (models) => {
    // associations can be defined here
    Users.hasMany(models.Hobby, {
      foreignKey: 'id',
      as: 'hobbies'
    });

    Users.hasMany(models.HobbyPosts, {
      foreignKey: 'id',
      as: 'posts'
    });
  };
  return Users;
};
