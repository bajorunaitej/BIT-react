const express = require("express");
const router = express.Router();
const PcModel = require("../model/PcModel");

router.post("/", async (req, res) => {
  try {
    const {
      user_id,
      CPU,
      GPU,
      DDR,
      RAM_speed_MHz,
      RAM_GB,
      rent_history,
      pc_type,
    } = req.body;
    const newPc = new PcModel({
      user_id,
      CPU,
      GPU,
      DDR,
      RAM_speed_MHz,
      RAM_GB,
      rent_history,
      pc_type,
    });
    await newPc.save();
    res.send(newPc.getInstance());
  } catch (err) {
    console.error(err);
    if (err.error === 1062) {
      res.status(400).send("Įterpimas negalimas, toks įrašas jau yra.");
    } else {
      res.status(500).send("Serverio klaida");
    }
  }
});

router.get("/:id", async (req, res) => {
  //
});

module.exports = router;
