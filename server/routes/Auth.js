const router = require("express").Router();
const { checkUsername,login,logout,register } = require("../controllers/Auth");


router.get("/checkusername/:username",checkUsername )
router.post("/login",login )
router.post("/logout",logout)
router.post("/register",register)
module.exports = router;

