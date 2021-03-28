const User = require("../models/User");

exports.checkUser = async (req, res, next) => {
  // Email
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (user) {
    res.status(400).send({
      message: {email : "Failed! Email is already in use!"},
    });
    return;
  }

  next();
};
