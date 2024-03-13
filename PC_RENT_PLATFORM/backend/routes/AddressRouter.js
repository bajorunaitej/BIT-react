const express = require("express");
const router = express.Router();
const AddressModel = require("../model/AddressModel");

router.post("/", async (req, res) => {
  try {
    const {
      country,
      county,
      municipality,
      zipCode,
      city,
      street,
      streetNumber,
      apartmentNumber,
    } = req.body;
    const newAddress = new AddressModel({
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
    res.send(newAddress.getInstance());
  } catch (err) {
    console.error(err);
    if (err.errno === 1062) {
      res.status(400).send("Įterpimas negalimas, toks įrašas jau yra.");
    } else {
      res.status(500).send("Serverio klaida");
    }
  }
});

router.get("/:id", async (req, res) => {
  const address = await AddressModel.findById(req.params.id);
  res.send(address.getInstance());
});

router.get("/", async (req, res) => {
  const allAddressesWithoutId = await AddressModel.findAll();
  const allAddress = allAddressesWithoutId.map((value) => value.getInstance());
  res.send(allAddress);
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await AddressModel.deleteById(req.params.id);
    res.send("Įrašas buvo sėkmingai ištrintas");
  } catch (err) {
    if (err.errno === "Address not found")
      res.status(404).send("Įrašas su id = " + req.params.id + "buvo nerastas");
    else res.status(500).send("Server error!");
  }
});

router.put("/:id", async (req, res) => {
  const {
    country,
    county,
    municipality,
    zipCode,
    city,
    street,
    streetNumber,
    apartmentNumber,
  } = req.body;
  const addressObj = await AddressModel.findById(req.params.id);
  if (country) addressObj.country = country;
  if (county) addressObj.county = county;
  if (municipality) addressObj.municipality = municipality;
  if (zipCode) addressObj.zipCode = zipCode;
  if (city) addressObj.city = city;
  if (street) addressObj.street = street;
  if (streetNumber) addressObj.streetNumber = streetNumber;
  if (apartmentNumber) addressObj.apartmentNumber = apartmentNumber;

  await addressObj.update();
  res.send(addressObj.getInstance());
});

module.exports = router;
