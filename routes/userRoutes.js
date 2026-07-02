const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');


router.post('/register', async (req, res) => {
  try {
    const item = req.body;
    const datasave = new UserModel(item);
    const savedata = await datasave.save();
    res.send({ message: 'User registered successfully!', data: savedata });
  } catch (err) {
    res.status(500).send({ error: 'Registration failed' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = await UserModel.findOne({ email: email });
  
  if (user && user.password === password) {
    res.send({ 
      success: true, 
      message: 'Login successful!', 
      name: user.name, 
      role: user.role 
    });
  } else {
    res.status(401).send({ success: false, message: 'Invalid email or password' });
  }
});

module.exports = router;