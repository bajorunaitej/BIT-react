const express = require("express");
const router = express.Router();
const UserModel = require("../model/UserModel");

router.post("/", async (req, res) => {
  try {
    const { username, pass_encoded, email, birth_date, phone, address_id } =
      req.body;
    const newUser = new UserModel({
      username,
      pass_encoded,
      email,
      birth_date,
      phone,
      address_id,
    });
    await newUser.save();
    res.send(newUser.getInstance());
  } catch (error) {
    console.error(error);
    if (error.errno === 1062) {
      res.status(400).send("Įterpimas negalimas, toks įrašas jau yra.");
    } else {
      res.status(500).send("Serverio klaida");
    }
  }
});

router.get("/:id", async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  res.send(user.getInstance());
});

router.get("/", async (req, res) => {
  const allUsersWithoutId = await UserModel.findAll();
  const allUsers = allUsersWithoutId.map((value) => value.getInstance());
  res.send(allUsers);
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await UserModel.deleteById(req.params.id);
    res.send("Įrašas buvo sėkmingai ištrintas");
  } catch (err) {
    if (err.message === "Įrašas nerastas")
      res
        .status(404)
        .send("Įrašas su id = " + req.params.id + " buvo nerastas");
    else res.status(500).send("Server error!");
  }
});

router.put("/:id", async (req, res) => {
  const { username, pass_encoded, email, birth_date, phone, address_id } =
    req.body;
  const userObj = await UserModel.findById(req.params.id);
  if (username) userObj.username = username;
  if (pass_encoded) userObj.pass_encoded = pass_encoded;
  if (email) userObj.email = email;
  if (birth_date) userObj.birth_date = birth_date;
  if (phone) userObj.phone = phone;
  if (address_id) userObj.address_id = address_id;

  await userObj.update();
  res.send(userObj.getInstance());
});

//---------------------------------------------------------------

module.exports = router;
