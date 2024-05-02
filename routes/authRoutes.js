const router = require("express").Router()
const User = require("../models/User")
const HttpError = require("../models/http-error")


router.post("/signup", async (req, res, next) => {
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


    let createdUser;

    createdUser = new User({
        name,
        email,
        password,
        address,
        phone
    })


    try {
        await createdUser.save()
    } catch (err) {
        const error = new HttpError("Could not save user!", 500)
        return next(error)
    }

    res.status(201).json({ user: createdUser })


})



router.post("/login", async (req, res, next) => {
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

    if (user.password != password) {
        const error = new HttpError("Password Does not match", 500)
        return next(error)
    }


    res.status(200).json({ message: "Login Done",foundUser: user })

})



router.post("/logout", (req, res) => {
    console.log("Logout");
})

module.exports = router