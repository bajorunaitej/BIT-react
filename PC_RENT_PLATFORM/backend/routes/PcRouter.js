const express = require("express");
const router = express.Router();
const PcModel = require("../model/PcModel");

// router.get("/", (req, res) => {
//   res.send("Veikia pc routeris");
// });
// router.get("/kazkoks", (req, res) => {
//   res.send("Veikia kazkoks pc routeris");
// });

//!!!!!
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
    if (err.errno === 1062) {
      res.status(400).send("Įterpimas negalimas, toks įrašas jau yra.");
    } else {
      res.status(500).send("Serverio klaida");
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
    if (error.message === "Įrašas nerastas")
      res
        .status(404)
        .send("Įrašas su id = " + req.params.id + " buvo nerastas");
    else res.status(500).send("Server error!");
  }
});

router.put("/:id", async (req, res) => {
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
  const pcObj = await PcModel.findById(req.params.id);
  if (user_id) pcObj.user_id = user_id;
  if (CPU) pcObj.CPU = CPU;
  if (GPU) pcObj.GPU = GPU;
  if (DDR) pcObj.DDR = DDR;
  if (RAM_speed_MHz) pcObj.RAM_speed_MHz = RAM_speed_MHz;
  if (RAM_GB) pcObj.RAM_GB = RAM_GB;
  if (rent_history) pcObj.rent_history = rent_history;
  if (pc_type) pcObj.pc_type = pc_type;

  await pcObj.update();
  res.send(pcObj.getInstance());
});

module.exports = router;
