const express = require("express");
const router = express.Router();
const {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const authorize = require('../middlewares/authorizeUser')

router.get("/all", authorize, listUsers);
router.post("/add", createUser);
router.put("/edit/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
