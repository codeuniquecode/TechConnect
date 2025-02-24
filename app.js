const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('./model/index');
require('./model/formSchema');
require('dotenv').config();
const rateLimit = require('express-rate-limit');
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
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user already exists in DB by email
        let user = await admin.findOne({ email: profile.emails[0].value });

        if (!user) {
            // If user doesn't exist, create a new user
            user = await admin.create({
                googleId: profile.id, // Unique Google ID
                name: profile.displayName,
                email: profile.emails[0].value,
            });
        }

        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));
// passport.serializeUser((user,done)=>{//saving user data to session is serialize
//     done(null,user);
// })
// passport.deserializeUser((user,done)=>{//retreiving user data from session is deserialize
//     done(null,user);
// })
// Serialize user into session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    const user = await admin.findById(id);
    done(null, user);
});
const router = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const admin = require('./model/adminSchema');
const limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 5,
    message: 'Too many attempts, please try again after 2 minutes'
  });
app.use('/login',limiter);
app.use('/',adminRoutes);
app.use('/',router);

app.set('view engine', 'ejs');
app.set('views', './views'); //


app.listen(port,()=>{
    console.log('server is running on port-',port);
})
// 26.52