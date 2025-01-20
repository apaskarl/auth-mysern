const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { username, password } = req.body;
  const secretKey = "jwtSecretKey";

  User.findByUsername(username, (err, userData) => {
    if (err) {
      console.error("User query error: ", err);
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }

    if (userData.length > 0) {
      const user = userData[0];

      if (password === user.password) {
        const token = jwt.sign({ id: user.user_id }, secretKey, {
          expiresIn: "1h",
        });

        return res.json({ success: true, token, data: { ...user } });
      } else {
        return res.json({ success: false, message: "Incorrect password" });
      }
    } else {
      return res.json({ success: false, message: "Invalid username" });
    }
  });
};
