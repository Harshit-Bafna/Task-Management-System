const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validateRegistration } = require('../utils/validators');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const { isValid, errors } = validateRegistration(req.body);
    if (!isValid) return res.status(400).json(errors);

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ email: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ email: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ password: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};

const logout = (req, res) => {
    res.status(200).json({ message: 'User logged out' });
};

const getAllUsers = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admins only.' });
        }

        const users = await User.find().select('_id name');

        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

const getUserRole = (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admins only.' });
        }
        
        const { role } = req.user;

        res.json({ role });
    } catch (error) {
        console.error('Error fetching user role:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    register,
    login,
    logout,
    getAllUsers,
    getUserRole 
};
