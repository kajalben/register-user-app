const User = require("../models/User");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let user = await User.findOne({ where: { email } });
  if (!user)
    return res.status(400).send({ error: { email: "Email is not valid" } });
  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(400).send({ error: { password: "Password is not valid" } });
  const token = User.createToken(user.id, user.email);

  res.send({ accessToken: token });
};

module.exports = {
  login,
};
