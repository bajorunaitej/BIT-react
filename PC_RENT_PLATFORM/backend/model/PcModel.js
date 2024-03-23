const executeQuery = require("../mysql");

module.exports = class Pc {
  #id;
  ownerId;
  cpu;
  gpu;
  ramType;
  ramSpeed;
  ramAmount;
  pc_type;
  pc_name;

  constructor(
    { ownerId, cpu, gpu, ramType, ramSpeed, ramAmount, pc_type, pc_name },
    id = null
  ) {
    this.#id = id;
    this.ownerId = ownerId;
    this.cpu = cpu;
    this.gpu = gpu;
    this.ramType = ramType;
    this.ramSpeed = ramSpeed;
    this.ramAmount = ramAmount;
    this.pc_type = pc_type;
    this.pc_name = pc_name;
  }

  async update() {
    const result = await executeQuery(
      `UPDATE pc SET
      ownerId = ?, cpu = ?, gpu = ?, ramType = ?, ramSpeed = ?, ramAmount = ?, pc_type = ?, pc_name = ?
        WHERE id = ?;`,
      [
        this.ownerId,
        this.cpu,
        this.gpu,
        this.ramType,
        this.ramSpeed,
        this.ramAmount,
        this.pc_type,
        this.pc_name,
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
      `INSERT INTO pc (owner_id, cpu, gpu, ram_type, ram_speed, ram_amount, pc_type, pc_name) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        this.ownerId,
        this.cpu,
        this.gpu,
        this.ramType,
        this.ramSpeed,
        this.ramAmount,
        this.pc_type,
        this.pc_name,
      ]
    );
    this.#id = result[0].insertId;
    return result;
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
            pc_type: pcObj.pc_type,
            pc_name: pcObj.pc_name,
          },
          pcObj.id
        )
    );
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
        pc_type: pc.pc_type,
        pc_name: pc.pc_name,
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
