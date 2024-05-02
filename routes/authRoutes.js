const router = require("express").Router()
const User = require("../models/User")


router.post("/signup", async (req, res) => {
    console.log(req.body)
    const { name, email, password, address, phone, } = req.body

    let user;
    try {
        user = await User.findOne({ email })
        console.log(user)
    } catch (err) {
        console.log(err)
    }

    if (user) {
        return;
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
        console.log(err)
    }

    res.status(201).json({ user: createdUser })


})



router.post("/login", async (req, res) => {
    const { email, password } = req.body

    let user;

    try {
        user = await User.findOne({ email })
    } catch (err) {
        console.log(err)
    }


    if (!user) {
        return;
    }

    console.log(user)

    if (user.password == password) {
        console.log("matching")
        res.status(200).json({ message: "Login Done" })
    } else {
        return;
    }

})



router.post("/logout", (req, res) => {
    console.log("Logout");
})

module.exports = router