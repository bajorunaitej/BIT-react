const express = require("express");
const router = express.Router();
const UserModel = require("../model/UserModel");
const User = require("../model/UserModel");
const security = require("../utils/security");

// lochalhost:3000/api/user/register

router.get("/register", async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      birthDate,
      phone,
      country,
      county,
      municipality,
      zipCode: postalCode,
      city,
      street,
      streetNumber,
      apartmentNumber,
    } = req.body;

    const newAddress = new Address({
      country,
      county,
      municipality,
      zipCode,
      city,
      street,
      streetNumber,
      apartmentNumber,
    });

    await newAddress.save();
    console.log(newAddress.getInstance());

    const salt = security.generateSalt();
    const hashedPassword = security.hashPassword(password, salt);

    const newUser = new User({
      username,
      pass_encoded: hashedPassword,
      salt,
      email,
      birthDate,
      phone,
      address_id: newAddress.id,
    });

    await newUser.save();

    //3. Užregistruoti vartotojo sesiją
    req.session.user = {
      username: newUser.username,
      email: newUser.email,
      id: newUser.id,
    };

    req.session.isLoggedIn = true;
    req.session.user.username;

    res.status(201).send({
      user: newUser.getInstance(),
      address: newAddress.getInstance(),
    });
  } catch (error) {
    console.log(err);
    if (err.errno === 1062) {
      res.status(400).json({ message: "Duomenys neunikalūs" });
    } else {
      res.status(500).json({ message: "Serverio klaida" });
    }
  }

  // country,
  // county,
  // municipality,
  // postalCode,
  // city,
  // street,
  // streetNumber,
  // apartmentNumber,
});

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
