const User = require('../Models/User'); // Adjust the path as necessary
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CatchAsync = require('../Utili/CatchAsync');

const createToken = (userId) => {
    const playload = { userId }; // playload is obj
    const jwt_Secret = process.env.JWT_SECRET
    return jwt.sign(playload, jwt_Secret, { expiresIn: '1h' })
}

exports.signup = CatchAsync(async (req, res) => {
     const {name, email, password, confirmPassword} = req.body;
     if (!name || !email ||!password || !confirmPassword) {
         return res.status(400).json({message: 'All fields are required'});
     }

     if (password !== confirmPassword) {
          return res.status(400).json({message: 'Password and confirm password do not match'});
     }

     const existingUser = await User.findOne({ email });

     if (existingUser) {
         return res.status(400).json({message: 'User already exists'});
     }

     const hashedPassword = await bcrypt.hash(password, 12);
     const newUser = await User.create({
          name,
          email,
          password:hashedPassword
     })

     const token = createToken(newUser._id)
     res.status(201).json({ status: 'success', message:'New user Created ', token:token })

})

//Login
exports.login = CatchAsync(async(req, res)=>{

     const {email, password } = req.body;

     if (!email || !password) {
          return res.status(400).json({message: 'Email and password are required'});
     }
     const user = await User.findOne({ email });
     if (!user) {
          return res.status(400).json({message: 'Invalid email or password'});
     } 
     
     const isMatch = await bcrypt.compare(password, user.password);

     if (!isMatch) {
          return res.status(400).json({message: 'Invalid email or password'});
     }

     const token = createToken(user._id);
     res.status(200).json({ status: 'success', message: 'User logged in successfully', token: token });

})

