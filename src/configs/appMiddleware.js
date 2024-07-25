const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const flash = require("connect-flash");


const appMiddleware = (express, app) => {

  app.use(cors());
  app.use(bodyParser.text());
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.use(express.json());
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(
    session({
      secret: "nope",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }, // Nếu bạn sử dụng HTTPS, hãy đặt là true
    })
  );
  app.use(flash());
};

module.exports = appMiddleware;
