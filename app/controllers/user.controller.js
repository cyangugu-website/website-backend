
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.createAccount = async (req, res) => {
    try {
        const { fullnames, username, email, password, cPassword, role } = req.body;

        console.log(req.body)

        let user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ message: 'User already exists!' })
        }

        else if (password !== cPassword) {
            return res.status(400).json({ message: 'Passwords do not match' })
        }

        // Hashing Password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Creating user
        user = new User({
            fullnames,
            username,
            email,
            password: hashedPassword,
            role
        })

        await user.save();

        res.status(201).json({ message: 'User registered successful!' })
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
};

exports.loginUser = async (req, res) => { 

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User Not Found!' })
        }
        
        // compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        // Generating token

        jwt.sign(payload, 'secretkey', { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.status(200).json({ 
                message: 'Login Successful! Redirecting ...' , 
                token,
                user: {
                    name: user.username,
                    email: user.email
                }
             })
        })
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
}

