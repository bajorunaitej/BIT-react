const express = require("express");
const router = express.Router();
const UserModel = require("../model/UserModel");
const AddresModel = require("../model/AddressModel");
const security = require("../utils/security");
let currentAddressId;

// lochalhost:3000/api/user/register

router.post("/register", async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      birth_date,
      phone,
      country,
      county,
      municipality,
      zipCode,
      city,
      street,
      streetNumber,
      apartmentNumber,
    } = req.body;

    const newAddress = new AddresModel({
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
    currentAddressId = newAddress.id;

    const salt = security.generateSalt();
    const hashedPassword = security.hashPassword(password, salt);

    const newUser = new UserModel({
      username,
      pass_encoded: hashedPassword,
      salt,
      email,
      birth_date,
      phone,
      address_id: newAddress.id,
    });

    await newUser.save();
    console.log(newUser);

    //3. Užregistruoti vartotojo sesiją
    req.session.user = {
      username: newUser.username,
      email: newUser.email,
      id: newUser.id,
    };

    req.session.isLoggedIn = true;

    res.status(201).send({
      user: newUser.getInstance(),
      address: newAddress.getInstance(),
    });
  } catch (err) {
    console.log(err);
    AddresModel.deleteById(currentAddressId);
    if (err.errno === 1062) {
      res.status(400).json({ message: "Duomenys neunikalūs" });
    } else {
      res.status(500).json({ message: "Serverio klaida" });
    }
  }
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
    if (err.message === "User not found")
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

//login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Prisijungimo vardas or slaptažodis yra privalomi",
        status: false,
      });
    }

    const existingUser = await UserModel.findByUsername(username);

    if (!existingUser) {
      return res
        .status(401)
        .json({ message: "Toks vartotojas nerastas", status: false });
    }

    if (
      !security.isValidPassword(
        password,
        existingUser.salt,
        existingUser.pass_encoded
      )
    )
      return res
        .status(400)
        .json({ message: "Prisijungimo duomeny yra netinkami", status: false });

    req.session.user = {
      username: existingUser.username,
      email: existingUser.email,
      id: existingUser.id,
    };

    req.session.isLoggedIn = true;
    res
      .status(200)
      .json({ message: "sekmingai prisijungete prie sistemos", status: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Vidine serverio klaida.", status: false });
  }
});

//logout route
router.get("/logout", async (req, res) => {
  if (req.session.isLoggedIn) {
    req.session.destroy();
    return res
      .status(200)
      .json({ message: "Sėkmingai atsijungėte", status: true });
  } else {
    return res.status(200).json({
      message: "Tam kad atsijungtumėtę, turite prisijungti",
      status: false,
    });
  }
});

router.get("/check-session", (req, res) => {
  if (req.session.isLoggedIn)
    return res.status(200).json({ isLoggedIn: req.session.isLoggedIn });
  return res.status(200).json({ isLoggedIn: false });
});

//---------------------------------------------------------------

module.exports = router;
