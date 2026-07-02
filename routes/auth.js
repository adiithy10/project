const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const authMiddleware = require('../middleware/authMiddleware'); 

// ==========================================
// 1. REGISTER ROUTE
// ==========================================
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    let user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'student'
    });

    await user.save();
    res.status(201).json({ message: 'Registration Successful' });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// ==========================================
// 2. LOGIN ROUTE
// ==========================================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      role: user.role,
      name: user.name,
      message: 'Login successful!'
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// ==========================================
// 3. GET USER PROFILE ROUTE
// ==========================================
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error("Profile Fetch Error:", err);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
});

// ==========================================
// 4. UPDATE PROFILE ROUTE (NAME, EMAIL & ROLE)
// ==========================================
router.put('/update-profile', authMiddleware, async (req, res) => {
  const { name, email, role } = req.body; 
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (email && email.toLowerCase() !== user.email) {
      const emailExists = await User.findOne({ email: email.toLowerCase() });
      if (emailExists) {
        return res.status(400).json({ message: 'This email is already taken' });
      }
      user.email = email.toLowerCase();
    }

    if (name) user.name = name;
    if (role) user.role = role; 

    await user.save();
    
    
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '1d' }
    );

    res.json({ 
      message: 'Profile updated successfully!', 
      token, 
      user: { name: user.name, email: user.email, role: user.role } 
    });
  } catch (err) {
    console.error("Profile Update Error:", err);
    res.status(500).json({ message: 'Server error during profile update' });
  }
});

// ==========================================
// 5. UPDATE PASSWORD ROUTE
// ==========================================
router.put('/update-password', authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password updated successfully! ' });
  } catch (err) {
    console.error("Password Update Error:", err);
    res.status(500).json({ message: 'Server error during password update' });
  }
});

// ==========================================
// 6. FORGOT PASSWORD ROUTE
// ==========================================
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'This email is not registered!' });
    }
    
    return res.status(200).json({ message: 'Password reset instructions sent to your email! (Simulated)' });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    return res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

module.exports = router;