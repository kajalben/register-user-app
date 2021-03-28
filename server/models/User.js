const sequelize = require("../database/client");
const jwt = require("jsonwebtoken");

const { DataTypes, Model } = require("sequelize");

class User extends Model {
  static createToken(id, email) {
    const payload = { id, email };
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secretKey);
    return token;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Please enter your name" },
        isAlpha: { msg: "User must contain letter" },
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Please enter your name" },
        isAlpha: { msg: "User must contain letter" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Please enter valid password" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "email address is not valid" },
      },
    },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: false,
  }
);

module.exports = User;
