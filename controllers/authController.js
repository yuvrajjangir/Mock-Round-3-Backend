const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const signup = async (req, res) => {
    try {
        const {email, password, confirmPassword} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({message: 'Passwords do not match'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const user = new User({
            email,
            password : hashedPassword,
            confirmPassword
        });
        await user.save();

        res.status(200).json({message: 'User registered successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const token = jwt.sign({ userId: user._id}, process.env.SECRET_KEY);

        res.json({message: 'Login successful', token});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
};

module.exports = {signup, login}