const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

// =======================
// Google OAuth Strategy
// =======================
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profileImage: profile.photos[0].value,
      };

      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          return done(null, user); // User exists
        } else {
          user = await User.create(newUser); // New user
          return done(null, user);
        }
      } catch (error) {
        console.error("OAuth Error:", error);
        return done(error, null);
      }
    }
  )
);

// =======================
// Auth Routes
// =======================

// Sign Up (redirects to Google account selection)
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// OAuth callback route (Google will call this URL)
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login-failure",
    successRedirect: "/dashboard", // Redirect here after login success
  })
);

// Manual Sign In (if session already exists)
router.get("/signin", (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  }
  return res.redirect("/auth/google"); // fallback
});

// Logout
router.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) {
      console.error("Logout error:", err);
      return res.send("Error logging out");
    }

    req.session.destroy(err => {
      if (err) {
        console.error("Session destroy error:", err);
        return res.send("Failed to destroy session.");
      }

      res.clearCookie("connect.sid"); // Clear session cookie
      res.redirect("/");
    });
  });
});

// Login failure route
router.get("/login-failure", (req, res) => {
  res.status(401).render("login-failure", {
    title: "Login Failed",
    description: "Something went wrong during sign-in",
    layout: "layouts/front-page",
  });
});

// =======================
// Session Management
// =======================
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = router;
