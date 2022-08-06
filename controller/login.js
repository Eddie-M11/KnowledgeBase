// const router = require("express");
// const bcrypt = require("bcrypt");
// const Login = require("../../models/login");
const router = require("express");
const bcrypt = require("bcrypt");
const Login = require("../../models/login");

router.post("/", async (req, res) => {
  try {
    const newlogin = await Login.create(req.body);
    res.status(200).json(loginData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newlogin = await Login.create(req.body);
    res.status(200).json(loginData);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = Login;
