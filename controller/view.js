const router = require("express").Router();
const withAuth = require("../utils/auth");
const myArray = require("../utils/data");

router.get("/", withAuth, (req, res) => {
  //foodDb.findAll((data) => { do stuff with data })
});

router.get("/food", withAuth, (req, res) => {
  console.log(req.session);
  res.render("food", { data: myArray, loggedIn: req.session.loggedIn });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect("/food");
  }
  return res.render("login");
});

router.get("/personality", (req, res) => {
  // const person = await Personality.findOne({where: {id: req.user.personality_id} })n
  console.log(req.user.id);
  return res.render("personality");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/food");
    return;
  }
  res.render("signup");
});

module.exports = router;
