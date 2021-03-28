const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.listUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (e) {
    res.status(500).send({
      error: "No Records for Users",
    });
  }
};

exports.createUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  console.log(req.body);
  try {
    let passwordHash = password ? await bcrypt.hash(password, 10) : null;
    const newUser = new User({
      first_name,
      last_name,
      email,
      password: passwordHash,
    });
    await newUser.save();
    const token = User.createToken(newUser.id, newUser.email);
    res.send({ success: "User created successfully", accessToken: token });
  } catch (e) {
    if (e.errors) {
      const errObj = {};
      e.errors.map((er) => {
        errObj[er.path] = er.message;
      });
      res.status(500).send({
        error: errObj,
      });
    } else {
      res.status(500).send(e.message);
    }
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.update(
      { ...req.body },
      { where: { id }, returning: true }
    );

    res.send({ success: "User updated successfully" });
  } catch (e) {
    if (e.errors) {
      const errObj = {};
      e.errors.map((er) => {
        errObj[er.path] = er.message;
      });
      res.status(500).send({
        error: errObj,
      });
    } else {
      res.status(500).send(e.message);
    }
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({
      error: "Please provide a id for the user you are trying to delete!",
    });
  }
  const user = await User.findOne({
    where: {
      id,
    },
  });

  if (!user) {
    res.status(400).send({
      error: `No user found with the id ${id}`,
    });
  }

  try {
    const users = await User.destroy({ where: { id } });
    res.send("User is deleted");
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
};
