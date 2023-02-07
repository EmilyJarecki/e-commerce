const express = require("express");
const router = express.Router();
const {User} = require("../models/User");

const bcrypt = require("bcrypt");

// SIGN UP
// POST /auth/register
router.post("/register", async (req, res, next) => {
  try {
    //1. create salt (make password a hash)
    // (10) = 10 cycles of hashing, the reccommended amount
    const salt = await bcrypt.genSalt(10);
    //2. create the password hash from req.body.password
    const passwordHash = await bcrypt.hash(req.body.password, salt);
    console.log(req.body.password)
    res.status(200).send(passwordHash)
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// SIGN IN
// POST /auth/login
router.post("/login", async (req, res, next) => {})
// token is required in response to authenticate our current user
// token will be sent with every request to protected/authoriezed route

  
  
module.exports = router;
