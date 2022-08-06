const { User } = require("../../models");
const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const loginData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = loginData.id;
      req.session.logged_in = true;

      res.status(200).json(loginData);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("./login", async (req, res) => {
  try {
    const loginData = await User.findOne({
      where: { username: req.body.username },
    });
    if (!loginData) {
      res.status(400).json({
        message: "Please check your username or password, and try again",
      });
      return;
    }
    const correctPassword = await loginData.checkPassword(req.body.password);
    if (!correctPassword) {
      res.status(400).json({
        message: "Please check your username or password, and try again",
      });
      return;
    }
    req.session.save(() => {
      req.session.user_id = loginData.id;
      req.session.logged_in = true;

      res.json({ message: "You have successfully logged in!" });
    });
  } catch (error) {
    res.status(400).json();
  }
});

router.post("./logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(200).end();
    });
  } else {
    res.status(404).end();
  }
});
