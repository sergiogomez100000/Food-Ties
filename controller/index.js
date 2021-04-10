const router = require("express").Router();

router.use("/", require("./view")); // renders the pages
router.use("/api", require("./api")); // deals with the data

module.exports = router;
