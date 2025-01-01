const express = require("express");
const router = express.Router();
const { Users } = require("../models");
//bcrypt 是一个用于密码哈希的库
const bcrypt = require("bcryptjs");
const { where } = require("sequelize");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("success");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  //first to check if username exist
  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    res.json({ error: "USer Doesn't Exist" });
  } else {
    //compare
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.json({ error: "Worng Username and Passowrd Combination" });
      } else {
        const accessToken = sign(
          { username: user.username, id: user.id },
          "importantscrect"
        );
        //send to login page in front end
        res.json({ token: accessToken, username: username, id: user.id });
      }
    });
  }
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;

  //exclude password info
  const basicInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  res.json(basicInfo);
});

router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ where: { username: req.user.username } });

  bcrypt.compare(oldPassword, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Passowrd! " });

    bcrypt.hash(newPassword, 10).then((hash) => {
      Users.update(
        { password: hash },
        { where: { username: req.user.username } }
      );
      res.json("success");
    });
  });
});

module.exports = router;
