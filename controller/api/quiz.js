const router = require("express").Router();

router.post("/", function (req, res) {
  // In the session you have access to your users id
  console.log(req.session);
  // in the body you have access to the score from the front end
  console.log(req.body);
  // figure out the personality type
  //create new function with score. will determine what their personality is
  const score = 0;
  //generates personality for user
  function genPers() {
    switch (score) {
      case score >= 10 && score <= 17:
        personality = "Adventurer";
        break;
      case score >= 18 && score <= 25:
        personality = "Homebody";
        break;
      case score >= 26 && score <= 33:
        personality = "Sweet";
        break;
      case score >= 34 && score <= 40:
        personality = "Spicy";
        break;
      default:
    }
  }
  genPers();

  // save it to the db using the user id to connect the score to the user
connection.query(
  'UPDATE user SET ? WHERE ?',
  [
    {
     score: req.body.score
    },
    {
      id: req.session.userId
    }
  ]
)

  // on the front end you will want to redirect the user to the personality page

  res.json({ msg: "success!" });
});

module.exports = router;
