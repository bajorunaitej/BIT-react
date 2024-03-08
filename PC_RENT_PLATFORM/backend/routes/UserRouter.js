const express = require("express");
const router = express.Router();
const User = require("../model/UserModel");

router.post("/register", async (req, res) => {
  const registrationData = req.body;
  console.log(registrationData);
  res.send("veikia");
});
router.get("/", (req, res) => {
  res.send("Veikia routas");
});

module.exports = router;
