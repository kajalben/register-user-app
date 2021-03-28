const express = require("express");
const router = express.Router();
const {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const {checkUserEmail, checkUserId} = require("../middlewares/checkUser");


router.get("/all", listUsers);
router.post("/add", checkUserEmail, createUser);
router.put("/edit/:id", updateUser);
router.delete("/delete/:id",checkUserId, deleteUser);

module.exports = router;
