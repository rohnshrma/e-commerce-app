const router = require("express").Router()



const { LOGIN_USER, SIGNUP_USER, LOGOUT_USER } = require("../controllers/AuthController.js")

router.post("/signup", SIGNUP_USER)



router.post("/login", LOGIN_USER)



router.post("/logout", LOGOUT_USER)

module.exports = router