const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('./model/index');
require('./model/formSchema');
require('dotenv').config();
const port = process.env.port;
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:'http://localhost:3000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));
passport.serializeUser((user,done)=>{//saving user data to session is serialize
    done(null,user);
})
passport.deserializeUser((user,done)=>{//retreiving user data from session is deserialize
    done(null,user);
})
const router = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/',adminRoutes);
app.use('/',router);

app.set('view engine', 'ejs');
app.set('views', './views'); //


app.listen(port,()=>{
    console.log('server is running on port-',port);
})
// 26.52