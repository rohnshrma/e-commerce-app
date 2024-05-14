const User = require("../models/User.js")
const HttpError = require("../models/http-error")
const bcrypt = require("bcrypt")


const LOGIN_USER = async (req, res, next) => {
    const { email, password } = req.body

    let user;

    try {
        user = await User.findOne({ email })
    } catch (err) {
        const error = new HttpError("Something went wrong while searching for user", 500)
        return next(error)
    }


    if (!user) {
        const error = new HttpError("Could not find user with provided email", 404)
        return next(error)
    }

    console.log(user)

    let match;

    try{
        match = await bcrypt.compare(password, user.password)
    }catch(err){
        const error = new HttpError("something went wrong while comparing passwords", 500)
        return next(error)
    }
    
    if (!match){
        const error = new HttpError("Password Does not match", 500)
        return next(error)
    }


    res.status(200).json({ message: "Login Done", foundUser: user })

}



const SIGNUP_USER = async (req, res, next) => {
    console.log(req.body)
    const { name, email, password, address, phone, } = req.body

    let user;
    try {
        user = await User.findOne({ email })
        console.log(user)
    } catch (err) {
        const error = new HttpError("Something went wrong while searching for user with provided email", 500)
        return next(error)
    }

    if (user) {
        const error = new HttpError("User with provided email Already Exisits", 500)
        return next(error)
    }

    let hash;

    try {
        hash = await bcrypt.hash(password, 11)
    } catch (err) {
        const error = new HttpError("Something went wrong while encrypting password", 500)
        return next(error)
    }


    let createdUser;

    createdUser = new User({
        name,
        email,
        password: hash,
        address,
        phone
    })

    console.log(createdUser)

    try {
        await createdUser.save()
    } catch (err) {
        const error = new HttpError("Could not save user!", 500)
        return next(error)
    }

    res.status(201).json({ user: createdUser })


}

const LOGOUT_USER = (req, res) => {
    console.log("Logout");
}

module.exports = {
    LOGIN_USER,
    SIGNUP_USER,
    LOGOUT_USER
}