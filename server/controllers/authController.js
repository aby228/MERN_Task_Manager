// Authentication controller: issues short-lived JWTs in httpOnly cookies
const User = require('../models/User');

const jwt = require('jsonwebtoken');

const { registerSchema, loginSchema } = require('../validators/authValidator');

const generateToken = (id) => { 

    return jwt.sign({ id }, process.env.JWT_SECRET, {

        expiresIn: '1h',

    });

};

exports.registerUser = async (req, res) => {
    const { error } = registerSchema.validate(req.body);

    if (error) return res.status(400).json({ message: error.details[0].message });


    const { username, email, password } = req.body;

    try {

        const userExists = await User.findOne({ email });

        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ username, email, password });

        if (user) {

            const token = generateToken(user._id);

            // httpOnly cookie prevents JS access; secure in production to require HTTPS
            res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 3600000 });

            res.status(201).json({ _id: user._id, username: user.username, email: user.email });

        } else {

            res.status(400).json({ message: 'Invalid user data' });

        }

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};


exports.loginUser = async (req, res) => {
    const { error } = loginSchema.validate(req.body);

    if (error) return res.status(400).json({ message: error.details[0].message });


    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {

            const token = generateToken(user._id);

            res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 3600000 });

            res.json({ id: user.id, username: user.username, email: user.email });

        } else {

            res.status(401).json({ message: 'Invalid email or password' });

        }

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};


exports.logoutUser = (req, res) => {

    res.cookie('token', '', { httpOnly: true, expires: new Date(0) });

    res.status(200).json({ message: 'Logged out successfully' });

};


exports.getUserProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user._id).select('-password');

        if (user) {

            res.json(user);

        } else {

            res.status(404).json({ message: 'User not found' });

        }

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};