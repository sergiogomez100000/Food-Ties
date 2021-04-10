const router = require("express").Router();
// const userRoutes = require() user api routes

router.use("/quiz", require("./quiz"));
router.use("/user", require("./user"));

module.exports = router;
