const session = require("express-session");
const express = require("express");
const logger = require("morgan");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const routes = require("./controller");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// const sequelize = require('./config/connection');
const hbs = exphbs.create({});

const PORT = process.env.PORT || 7500;

//Middleware
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
const sess = {
  secret: "cats",
  resave: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(routes);

sequelize.sync().then(function () {
  app.listen(PORT, () => console.log("App listening on port " + PORT));
});
