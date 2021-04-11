const router = require("express").Router();
const {User} = require('../../models/')
console.log("IN QUIZ:")
console.log(User)
router.post("/", async function (req, res) {
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

//   // save it to the db using the user id to connect the score to the user
try{
 const user = await User.update({score: req.body.score},{where: {id: req.session.userId}})
 console.log(user);
}catch(err){
  console.log(err);
}
//   // on the front end you will want to redirect the user to the personality page

  res.json({ msg: "success!" });
});

module.exports = router;
