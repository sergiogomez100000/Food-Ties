const router = require("express").Router();
const { User, Personality } = require("../../models/");
console.log("IN QUIZ:");
console.log(User);
router.post("/", async function (req, res) {
  // try {
  // In the session you have access to your users id
  console.log(req.session);
  // in the body you have access to the score from the front end
  console.log(req.body);
  // figure out the personality type
  //create new function with score. will determine what their personality is
  const score = +req.body.score;
  //generates personality for user

  const pers = genPers(score);
  let persData = await Personality.findOne({ where: { title: pers } });
  persData = persData.get({ plain: true });
  //   // save it to the db using the user id to connect the score to the user

  const user = await User.update(
    { score: req.body.score },
    { where: { id: req.session.userId } }
  );
  console.log(persData);
  return res.render("personality", { data: persData });
  // res.send("wefwefjwlkefj")
  // } catch (err) {
  //   console.log(err);
  // }
  //   // on the front end you will want to redirect the user to the personality page
});

function genPers(score) {
  let personality;

  if (score >= 9 && score <= 17) {
    personality = "Adventurer";
  } else if (score >= 18 && score <= 25) {
    personality = "Homebody";
  } else if (score >= 26 && score <= 33) {
    personality = "Sweet";
  } else if (score >= 34 && score <= 40) {
    personality = "Spicy";
  }
  return personality;
}

module.exports = router;
