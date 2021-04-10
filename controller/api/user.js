const router = require("express").Router();
const { User, Personality } = require("../../models");

router.post("/signup", async (req, res) => {
  try {
    const addUser = await User.create({
      //expects username, email, password
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    //save the data into a session
    req.session.save(() => {
      //date from add user to session
      req.session.userId = addUser.id;
      req.session.name = addUser.name;
      req.session.loggedIn = true;
      res.json(addUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  // try {
  // Find the user who matches the posted e-mail address
  const userData = await User.findOne({ where: { email: req.body.email } });
  console.log("USER", userData);

  if (!userData) {
    res
      .status(400)
      .json({ message: "Incorrect email or password, please try again" });
    return;
  }

  // Verify the posted password with the password store in the database
  const validPassword = await userData.checkPassword(req.body.password);
  console.log(validPassword);

  if (!validPassword) {
    res
      .status(400)
      .json({ message: "Incorrect email or password, please try again" });
    return;
  }

  // Create session variables based on the logged in user
  req.session.save(() => {
    req.session.userId = userData.id;
    req.session.loggedIn = true;
    res.json({ user: userData, message: "You are now logged in!" });
  });

  // } catch (err) {
  //   res.status(405).json(err);
  // }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
