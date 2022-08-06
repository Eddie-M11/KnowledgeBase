const router = require("express").Router();
const bcrypt = require("bcrypt");
const login =  require('../../models');
const { User } = require('../../models');


router.post("/", async (req, res) => {
    try {
        newlogin = require.body;
        newlogin.password = awaits bcrypt.hash(req.body.password, 20);
        const loginData = await login.create(newlogin);
    } catch (error) {
        res.status(400).json(err)
    }

});


module.exports = login;