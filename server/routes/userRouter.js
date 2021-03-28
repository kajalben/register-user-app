const express = require("express");
const router = express.Router();
const {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const {checkUser} = require("../middlewares/checkUser");


router.get("/all", listUsers);
router.post("/add", checkUser, createUser);
router.put("/edit/:id",checkUser, updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
