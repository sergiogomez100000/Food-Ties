const router = require('express').Router();
const withAuth = require('../utils/auth');
const myArray = require('../utils/data');
const { User, Personality } = require('../models/');

router.get('/', withAuth, (req, res) => {
  //foodDb.findAll((data) => { do stuff with data })
});

router.get('/food', withAuth, (req, res) => {
  console.log(req.session);
  res.render('food', { data: myArray, loggedIn: req.session.loggedIn });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect('/food');
  }
  return res.render('login');
});

router.get('/personality', async (req, res) => {
  const user = await User.findOne({ where: { id: req.session.userId } });
  const persId = user.get({ plain: true }).personality_id;
  let persData = await Personality.findOne({ where: { id: persId } });
  persData = persData.get({ plain: true });
  console.log(persData);
  return res.render('personality', persData);
});

router.get('/login', (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect('/signup');
  }
  return res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/food');
    return;
  }
  res.render('signup');
});

module.exports = router;
