const UserModel = require('../collections/User');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors');

const maxToken = 3 * 24 * 60 * 60 *1000;
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxToken
    })
};

module.exports.signUp = async (req, res) => {
    console.log(req.body);
    const{pseudo, email, password, dateOfBirth} = req.body

    try {
        const user = await UserModel.create({ pseudo, email, password, dateOfBirth });
        res.status(200).json({ user: user._id});
    }
    catch(err) {
        const errors = signUpErrors(err)
        res.status(400).send({ errors });
    }

}

module.exports.SignIn = async (req, res) => {
    const { email, password } = req.body;
    console.log(email);

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxToken});
        res.status(200).json({user: user._id})
    } catch(err) {
        const errors = signInErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
  }