const express = require("express");
const mongoose = require("mongoose");
require('./models/user');
const keys = require('./config/keys');
const passport = require("passport");

require('dotenv').config();
require("./services/passport");

const cookieSession = require('cookie-session');

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("connected");
});

const app = express();
app.use(cookieSession({
  maxAge:30 * 24 * 60 * 60 *1000,
  keys:[keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());


require("./routes/authRoutes")(app);


const port = process.env.PORT || 5000;











app.listen(port, () => {
  console.log(`connected to port ${port}`);
});
