const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');

// Registreringsroute
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save user
        const newUser = new User({ username, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Inloggningsroute
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check user
        const user = await User.findOne({ email });
        if (user) {
            return res.status(200).json({ message: "Valid User" })
        } else {
            res.status(400).json({ message: "Invalid User" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return res.status(200).json({ message: "Valid credentials" })
        } else {
            res.status(400).json({ message: "Invalid credentials" });
        }
        
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;