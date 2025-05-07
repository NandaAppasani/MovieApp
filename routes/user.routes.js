const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.findAllUsers);
router.post("/signup", userController.addUser);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/coupons", userController.getCouponCode);
router.post("/bookings", userController.bookShow);

module.exports = router;
