const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user-routes');
const postRoutes = require('./routes/post-routes');
const session = require('express-session');
const cors = require('cors');
const app = express();
const { checkUser, requireAuth } = require('./middleware/auth.middleware');

// app.use((req, res, next) => {
//     console.log('allow origin ', req.headers.origin)
//     res.header("Access-Control-Allow-Headers", "true")
//     res.header("Access-Control-Allow-Origin", req.headers.origin);
//     next();
//   })

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}

app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);


require('dotenv').config({path: './config/.env'})

require('./config/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


// jwt 

app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});


// routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
// app.use('/api/upload', userRoutes);


// server 
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})

