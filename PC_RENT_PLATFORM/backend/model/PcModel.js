const executeQuery = require("../mysql");

module.exports = class Pc {
  #id;
  ownerId;
  cpu;
  gpu;
  ramType;
  ramSpeed;
  ramAmount;
  pcType;

  constructor(
    { ownerId, cpu, gpu, ramType, ramSpeed, ramAmount, pcType },
    id = null
  ) {
    this.#id = id;
    this.ownerId = ownerId;
    this.cpu = cpu;
    this.gpu = gpu;
    this.ramType = ramType;
    this.ramSpeed = ramSpeed;
    this.ramAmount = ramAmount;
    this.pcType = pcType;
  }

  async update() {
    const result = await executeQuery(
      `UPDATE pc SET
      ownerId = ?, cpu = ?, gpu = ?, ramType = ?, ramSpeed = ?, ramAmount = ?, pcType = ?
        WHERE id = ?;`,
      [
        this.ownerId,
        this.cpu,
        this.gpu,
        this.ramType,
        this.ramSpeed,
        this.ramAmount,
        this.pcType,
        this.#id,
      ]
    );
    return result;
  }

  //objektas.id↓
  get id() {
    return this.#id;
  }

  async save() {
    const result = await executeQuery(
      `INSERT INTO pc (owner_id, cpu, gpu, ram_type, ram_speed, ram_amount, pc_type) 
      VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [
        this.ownerId,
        this.cpu,
        this.gpu,
        this.ramType,
        this.ramSpeed,
        this.ramAmount,
        this.pcType,
      ]
    );
    this.#id = result[0].insertId;
  }

  static async findAll() {
    let result = await executeQuery(`SELECT * FROM pc`);
    result = result[0].map(
      (pcObj) =>
        new Pc(
          {
            ownerId: pcObj.owner_id,
            cpu: pcObj.cpu,
            gpu: pcObj.gpu,
            ramType: pcObj.ram_type,
            ramSpeed: pcObj.ram_speed,
            ramAmount: pcObj.ram_amount,
            pcType: pcObj.pc_type,
          },
          pcObj.id
        )
    );
    return result;
  }

  static async findById(id) {
    const results = await executeQuery(`SELECT * FROM pc WHERE id=?`, [id]);
    const pc = results[0][0];
    return new Pc(
      {
        ownerId: pc.owner_id,
        cpu: pc.cpu,
        gpu: pc.gpu,
        ramType: pc.ram_type,
        ramSpeed: pc.ram_speed,
        ramAmount: pc.ram_amount,
        pcType: pc.pc_type,
      },
      pc.id
    );
  }

  static async deleteById(id) {
    const result = await executeQuery(
      `DELETE FROM pc
    WHERE id=?;`,
      [id]
    );
    if (result[0].affectedRows === 0) throw new Error("PC not found");
    return result;
  }

  //---------------------------------------------
  getInstance() {
    return { ...this, id: this.#id };
  }
};
