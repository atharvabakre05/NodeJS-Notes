// servers/config/passport.js
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
// const User = require('../models/User'); // <-- use your User model here

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Here you handle user lookup or creation
          // Example: let user = await User.findOne({ googleId: profile.id });
          // if (!user) user = await User.create({ googleId: profile.id, name: profile.displayName });
          // done(null, user);

          console.log("✅ Google profile:", profile);
          done(null, profile); // temp, replace with real user logic
        } catch (err) {
          done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // Example: User.findById(id).then(user => done(null, user));
    done(null, { id }); // temp
  });
};
