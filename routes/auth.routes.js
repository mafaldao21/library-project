const router = require("express").Router();
const bcryptjs = require('bcryptjs');

const User = require("../models/User.model");

const saltRounds = 10;


router.get("/register", (req, res, next) => {
    res.render("auth/register");
});


router.post("/register", (req, res, next) => {
    
    const { email, password } = req.body;

    bcryptjs
        .genSalt(saltRounds)
        .then( salt => {
            return bcryptjs.hash(password, salt);
        })
        .then( hash => {

            const userDetails = {
                email,
                passwordHash: hash
            }

            return User.create(userDetails)
        })
        .then( userFromDB => {
            res.send("user was created")
        })
        .catch( error => {
            console.log("error creating account", error);
            next(error);
        });

});

module.exports = router;