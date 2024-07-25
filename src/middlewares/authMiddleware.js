const jwt = require("jsonwebtoken");
require("dotenv").config();



module.exports = {
  veryfyUser: async (req, res, next) => {
    const accessToken = req.cookies.accesstoken;

    if (accessToken) {
      try {
        const user = jwt.verify(
          accessToken,
          process.env.ACCESS_TOKEN_SECRET
        );
        const userRoles = user.roles;
        req.roles = userRoles;
        // return res.redirect("/admin/editLandingPage");
        next();
      } catch (error) {
        return res.redirect("/admin");
      }
    } else {
      return res.redirect("/admin");
    }
  }
};