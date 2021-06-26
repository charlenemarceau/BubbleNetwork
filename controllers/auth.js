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










// const UserModel = require('../collections/User');

// module.exports.SignUp = async (req, res) => {
//     console.log(req.body);
//     // const{pseudo, email, password, dateOfBirth} = req.body
//     const pseudo = (req.body.pseudo || '').toString();
//     const password = (req.body.password || '').toString();
//     const email = (req.body.email || '').toString();
//     const dateOfBirth = (req.body.dateOfBirth || '').toString();

//     if (!login || !password || !email || !dateOfBirth) {
//       return res.status(401).send('Il manque un champ');
//     }

//     try {
//         const user = await UserModel.findOne( {
//           $or : [{ pseudo }, { email }],
//         }).lean();

//         if (user) {
//             if (user.pseudo === pseudo) {
//               return res.status(401).send('Pseudo is already used');
//             }
//             else if (user.email === email) {
//               return res.status(401).send('Email is already used');
//             } else {
//               console.error('Wtf, user is found but no match on email/login', user, 
//               'Pseudo was', pseudo,
//               'email was', email)
//               return res.status(500).send('Serve brainfuck');
//             }
//         }

//         const newUser = await UserModel.create({ pseudo, email, password, dateOfBirth });
//         res.status(201).json({ newUser: user._id});
//         res.send('Welcome ' + newUser.pseudo);
//         // const newUser = await collections.Users.create({
//         //   login,
//         //   password: pw,
//         //   email
//         // });
//         // res.send('Welcome ' + newUser.login);

//       } catch(e) {
//         console.error('Register error', e);
//         res.status(500).send('Register error');
//       }
    
//     }

// module.exports.SignIn = async (req, res) => {
//     console.log(req.body);
//     res.send({ user: req.body.email || false });

//     const GENERIC_ERROR_MESSAGE = 'Login or password is incorrect';
//     const email = req.body.email || '';
//     const password = req.body.password || '';

//     if (!email) {
//       return res.status(401).send('Email is required');
//     }
//     if (!password) {
//       return res.status(401).send('Password is required');
//     }

//     UserModel.findOne({email})
//     .then(user => {
//     if (!user || !user.checkPassword(password)) {
//       return res.status(401).send(GENERIC_ERROR_MESSAGE);
//     }
            
//     // req.session.user = user.toObject();
//     }).catch(err => {
//         console.error('LOGIN server error', err);
//         res.status(500).send('Server error unknown');
//       });
// }
























    //     user.last_date_connection = Date.now();
    //     user.save().then(() => {
    //       req.session.save(() => {
    //         res.send({ user: req.session.user });
    //       });
    //     });
    //   }).catch(err => {
    //     console.error('LOGIN server error', err);
    //     res.status(500).send('Server error unknown');
    //   });
    // });

    // app.post('logout', (req, res) => {
    //   //TODO: pas de paramètres
    // });

// module.exports = function (app) {

//     app.get('/login', (req, res) => {
//         res.send({ user: req.session.user || false });
//     });

//     const GENERIC_ERROR_MESSAGE = 'Login or password is incorrect';
//     app.post('/login', (req, res) => {
//       console.log('POST test', req.body);
//       console.log('POST test', req.body.login);

//       const login = req.body.login || '';
//       const pw = req.body.pw || '';
    
//       if (!login) {
//         return res.status(401).send('Login is required');
//       }
//       if (!pw) {
//         return res.status(401).send('Password is required');
//       }
//       // if (login.length < 5 || login.length > 16 || pw.length < 6) {
//       //   return res.status(401).send(GENERIC_ERROR_MESSAGE);
//       // }

//         // une fois que c'est ok, on cherche en DB
//         // en attendant on fait un test en "dur"
//       collections.Users.findOne({
//         login
//       }).then(user => {
//         if (!user || !user.checkPassword(pw)) {
//           return res.status(401).send(GENERIC_ERROR_MESSAGE);
//         }

//         req.session.user = user.toObject();

//         user.last_date_connection = Date.now();
//         user.save().then(() => {
//           req.session.save(() => {
//             res.send({ user: req.session.user });
//           });
//         });
//       }).catch(err => {
//         console.error('LOGIN server error', err);
//         res.status(500).send('Server error unknown');
//       });
//     });

//     // app.post('logout', (req, res) => {
//     //   //TODO: pas de paramètres
//     // });
// }

//     app.post('/register', async (req, res) => {
//       const login = (req.body.login || '').toString();
//       const pw = (req.body.pw || '').toString();
//       const email = (req.body.email || '').toString();

//       if (!login || !pw || !email) {
//         return res.status(401).send('Il manque un champ');
//       }

//       try {
//         const user = await collections.User.findOne( {
//           $or : [{ login }, { email }],
//         }).lean();

//         if (user) {
//           if (user.login === login) {
//             return res.status(401).send('Login is already used');
//           }
//           else if (user.email === email) {
//             return res.status(401).send('Email is already used');
//           } else {
//             console.error('Wtf, user is found but no match on email/login', user, 
//             'login was', login,
//             'email was', email)
//             return res.status(500).send('Serve brainfuck');
//           }
//         }

//         const newUser = await collections.Users.create({
//           login,
//           password: pw,
//           email
//         });
//         res.send('Welcome ' + newUser.login);

//       } catch(e) {
//         console.error('Register error', e);
//         res.status(500).send('Register error');
//       }
//     });
// }
// module.exports = function (app) {

//     app.get('/login', (req, res) => {
//         res.send({ user: req.session.user || false });
//     });

//     const GENERIC_ERROR_MESSAGE = 'Login or password is incorrect';
//     app.post('/login', (req, res) => {
//       console.log('POST test', req.body);
//       console.log('POST test', req.body.login);

//       const login = req.body.login || '';
//       const pw = req.body.pw || '';
    
//       if (!login) {
//         return res.status(401).send('Login is required');
//       }
//       if (!pw) {
//         return res.status(401).send('Password is required');
//       }
//       // if (login.length < 5 || login.length > 16 || pw.length < 6) {
//       //   return res.status(401).send(GENERIC_ERROR_MESSAGE);
//       // }

//         // une fois que c'est ok, on cherche en DB
//         // en attendant on fait un test en "dur"
//       collections.Users.findOne({
//         login
//       }).then(user => {
//         if (!user || !user.checkPassword(pw)) {
//           return res.status(401).send(GENERIC_ERROR_MESSAGE);
//         }

//         req.session.user = user.toObject();

//         user.last_date_connection = Date.now();
//         user.save().then(() => {
//           req.session.save(() => {
//             res.send({ user: req.session.user });
//           });
//         });
//       }).catch(err => {
//         console.error('LOGIN server error', err);
//         res.status(500).send('Server error unknown');
//       });
//     });

//     app.post('logout', (req, res) => {
//       //TODO: pas de paramètres
//     });

//     app.post('/register', async (req, res) => {
//       const login = (req.body.login || '').toString();
//       const pw = (req.body.pw || '').toString();
//       const email = (req.body.email || '').toString();

//       if (!login || !pw || !email) {
//         return res.status(401).send('Il manque un champ');
//       }

//       try {
//         const user = await collections.User.findOne( {
//           $or : [{ login }, { email }],
//         }).lean();

//         if (user) {
//           if (user.login === login) {
//             return res.status(401).send('Login is already used');
//           }
//           else if (user.email === email) {
//             return res.status(401).send('Email is already used');
//           } else {
//             console.error('Wtf, user is found but no match on email/login', user, 
//             'login was', login,
//             'email was', email)
//             return res.status(500).send('Serve brainfuck');
//           }
//         }

//         const newUser = await collections.Users.create({
//           login,
//           password: pw,
//           email
//         });
//         res.send('Welcome ' + newUser.login);

//       } catch(e) {
//         console.error('Register error', e);
//         res.status(500).send('Register error');
//       }
//     });
// 