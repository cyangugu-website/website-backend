
function validateInput (req,res,next) {
    const { email , password } = req.body;

    if(!email || !password ) {
        return res.status(400).json({message: 'Invalid email or password'});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)) {
        return res.status(400).json({message: 'Please enter a valid email'})
    }

    next();
}

module.exports = validateInput;