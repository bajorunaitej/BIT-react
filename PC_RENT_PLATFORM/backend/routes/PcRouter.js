const express = require("express");
const router = express.Router();
const PcModel = require("../model/PcModel");

// /server/api/pc/

// router.get("/", (req, res) => {
//   res.send("Veikia pc routeris");
// });
// router.get("/kazkoks", (req, res) => {
//   res.send("Veikia kazkoks pc routeris");
// });

router.post("/", async (req, res) => {
  try {
    const { cpu, gpu, ramType, ramSpeed, ramAmount, pcType } = req.body;
    res.status(200).json({ message: "info priimta" });
    const newPc = new PcModel({
      ownerId: req.session.user.id,
      cpu,
      gpu,
      ramType,
      ramSpeed,
      ramAmount,
      pcType,
    });
    await newPc.save();
    res.send(201).json({
      message: "Info sėkmingai išsiųsta",
      newPc: newPc.getInstance(),
      status: true,
    });
  } catch (err) {
    console.error(err);
    if (err.errno === 1062) {
      res
        .status(400)
        .json({
          message: "Įterpimas negalimas, toks įrašas jau yra.",
          status: false,
        });
    } else {
      res.status(500).json({ message: "Serverio klaida", status: false });
    }
  }
});

router.get("/:id", async (req, res) => {
  const pc = await PcModel.findById(req.params.id);
  res.send(pc.getInstance());
});

router.get("/", async (req, res) => {
  const allPcsWithoutId = await PcModel.findAll();
  const allPcs = allPcsWithoutId.map((value) => value.getInstance());
  res.send(allPcs);
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await PcModel.deleteById(req.params.id);
    res.send("Įrašas buvo sėkmingai ištrintas");
  } catch (error) {
    if (error.message === "PC not found")
      res
        .status(404)
        .send("Įrašas su id = " + req.params.id + " buvo nerastas");
    else res.status(500).send("Server error!");
  }
});

router.put("/:id", async (req, res) => {
  const { ownerId, cpu, gpu, ramType, ramSpeed, ramAmount, pcType } = req.body;
  const pcObj = await PcModel.findById(req.params.id);
  // if (ownerId) pcObj.ownerId = ownerId;
  if (cpu) pcObj.cpu = cpu;
  if (gpu) pcObj.gpu = gpu;
  if (ramType) pcObj.ramType = ramType;
  if (ramSpeed) pcObj.ramSpeed = ramSpeed;
  if (ramAmount) pcObj.ramAmount = ramAmount;
  if (pcType) pcObj.pcType = pcType;

  await pcObj.update();
  res.send(pcObj.getInstance());
});

module.exports = router;
