// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Hardcoded credentials
const hardcodedEmail = 'mahajanxvishal@gmail.com';
const hardcodedPassword = 'Vishal@123';

// User login with hardcoded credentials
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (email === hardcodedEmail && password === hardcodedPassword) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
});

module.exports = router;
