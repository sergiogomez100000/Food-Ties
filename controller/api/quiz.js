const router = require("express").Router();

router.post("/", function (req, res) {
  // In the session you have access to your users id
  console.log(req.session);
  // in the body you have access to the score from the front end
  console.log(req.body);
  // figure out the personality type
  // save it to the db using the user id to connect the score to the user
  // on the front end you will want to redirect the user to the personality page
  res.json({ msg: "success!" });
});

module.exports = router;
