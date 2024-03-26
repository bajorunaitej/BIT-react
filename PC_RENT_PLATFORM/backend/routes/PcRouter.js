const express = require("express");
const router = express.Router();
const PcModel = require("../model/PcModel");
const upload = require("../utils/multerConfig");
const PcImageModel = require("../model/PcImageModel");

// /server/api/pc/
// router.get("/", (req, res) => {
//   res.send("Veikia pc routeris");
// });
// router.get("/kazkoks", (req, res) => {
//   res.send("Veikia kazkoks pc routeris");
// });

router.post("/", upload.array("files", 2), async (req, res) => {
  try {
    const { cpu, gpu, ramType, ramSpeed, ramAmount, pc_type, pc_name } =
      req.body;

    console.log(req.files);
    // res.status(200).json({ message: "info priimta" });
    const newPc = new PcModel({
      ownerId: req.session.user.id,
      cpu,
      gpu,
      ramType,
      ramSpeed,
      ramAmount,
      pc_type,
      pc_name,
    });
    await newPc.save();

    const allPcImageModels = req.files.map(
      (file) => new PcImageModel({ uri: file.path, pcId: newPc.id })
    );
    const allPcImageSavePromises = allPcImageModels.map((model) =>
      model.save()
    );
    await Promise.all(allPcImageSavePromises);

    res.send(201).json({
      message: "Info sėkmingai išsiųsta į DB",
      newPc: newPc.getInstance(),
      pcImages: allPcImageModels.map((model) => model.getInstance()),
      status: true,
    });
  } catch (err) {
    console.log(err);
    if (err.errno === 1062) {
      res.status(400).json({
        message: "Įterpimas negalimas, toks įrašas jau yra.",
        status: false,
      });
    } else {
      res.status(500).json({ message: "Serverio klaida", status: false });
    }
  }
});

router.get("/:id", async (req, res) => {
  try {
    const pc = await PcModel.findById(req.params.id);
    if (!pc) return res.status(404).json({ message: "PC not found", status: false });
    const pcImages = await PcImageModel.getByPcId(pc.id);
    ////---------------------------------------------fix it ↓
    else return res
        .status(200)
        .json({
          pc: pc.getInstance(),
          pcImages: pcImages.map((pcImage) => pcImage.getInstance()),
          status: true,
        });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Bad Id", status: false });
  }
});

router.get("/", async (req, res) => {
  const allPcsWithoutImages = await PcModel.findAll();
  const allPcsWithImages = await Promise.all(
    allPcsWithoutImages.map(async (pcModel) => {
      const pcImages = await PcImageModel.getByPcId(pcModel.id);
      return { ...pcModel.getInstance(), images: pcImages };
    })
  );

  console.log(allPcsWithImages);
  res.status(200).json(allPcsWithImages);
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
  const { ownerId, cpu, gpu, ramType, ramSpeed, ramAmount, pc_type, pc_name } =
    req.body;
  const pcObj = await PcModel.findById(req.params.id);
  if (ownerId) pcObj.ownerId = ownerId;
  if (cpu) pcObj.cpu = cpu;
  if (gpu) pcObj.gpu = gpu;
  if (ramType) pcObj.ramType = ramType;
  if (ramSpeed) pcObj.ramSpeed = ramSpeed;
  if (ramAmount) pcObj.ramAmount = ramAmount;
  if (pc_type) pcObj.pc_type = pc_type;
  if (pc_name) pcObj.pc_name = pc_name;

  await pcObj.update();
  res.send(pcObj.getInstance());
});

router.get("/my-pcs", async (req, res) => {
  //prisijungusio vartotojo kompiuteriai grazinami
  // 1. patikrinti ar vartotojas prisijunges
  // 2. gauti prisijungusio vartotojo ID
  // 3. Su modeliu PcModel gauti visus kompiuterius pagal vartotojo ID  |  SELECT * from pcs WHERE owner_id = userId
});

module.exports = router;
