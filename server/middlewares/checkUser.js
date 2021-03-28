const User = require("../models/User");

exports.checkUserEmail = async (req, res, next) => {
  // Email
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (user) {
    res.status(400).send({
      message: { email: "Failed! Email is already in use!" },
    });
    return;
  }

  next();
};

exports.checkUserId = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
    },
  });

  if (!user) {
     res.status(400).send({
      message: `No user found with the id ${id}`,
    });
    return;
  }
  next();
};
