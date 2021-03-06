const express = require("express")
const router = express.Router()
const passport = require("passport")
const bcrypt = require("bcrypt")

const { User } = require("../models/user.model")
const Reader = require("../models/reader.model")

//Endpoints


//Sign up

router.post('/signup', (req, res) => {

    const { username, password, email, firstName, lastName } = req.body

    if (!username || !password) {
        res.status(400).json({ message: 'Please fill all fields' })
        return
    }

    if (password.length < 2) {
        res.status(400).json({ message: 'Weak password' })
        return
    }

    User
        .findOne({ username })
        .then(foundUser => {
            if (foundUser) {
                res.status(400).json({ message: 'User already exists' })
                return
            }

            const salt = bcrypt.genSaltSync(10)
            const hashPass = bcrypt.hashSync(password, salt)
    
            Reader
                .create({ userInfo: {username, email, password: hashPass}, firstName, lastName })
                .then(newUser => req.login(newUser, err => err ? res.status(500).json({ message: 'Login error' }) : res.status(200).json(newUser)))
                .catch(() => res.status(500).json({ message: 'Error saving user to DB' }))
        })
        .catch(() => res.status(500).json({ message: 'This doesnt work' }))
})


//Log in

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {

        if (err) {
            res.status(500).json({ message: 'Error authenticating user' });
            return;
        }

        if (!theUser) {
            res.status(401).json(failureDetails)
            return;
        }

        req.login(theUser, err => err ? res.status(500).json({ message: 'Session error' }) : res.status(200).json(theUser));

    })(req, res, next)
})


//Log out

router.post('/logout', (req, res) => {
    req.logout()
    res.status(200).json({ message: 'Log out success!' });
})


//Logged in

router.get('/loggedin', (req, res) => req.isAuthenticated() ? res.status(200).json(req.user) : res.status(403).json({ message: 'Unauthorized' }))

module.exports = router