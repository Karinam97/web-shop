const express = require("express");

const router = express.Router();

const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password match the expected values

  if (username === "karina" && password === "123") {
    const user = { username: "karina", name: "Karina" };

    const token = jwt.sign(user, "super-secret-key", { expiresIn: "1m" });

    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

router.get("/account", (req, res) => {});

module.exports = router;
