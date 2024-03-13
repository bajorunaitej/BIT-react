const executeQuery = require("../mysql");

module.exports = class Pc {
  #id;
  user_id;
  CPU;
  GPU;
  DDR;
  RAM_speed_MHz;
  RAM_GB;
  rent_history;
  pc_type;

  constructor(
    { user_id, CPU, GPU, DDR, RAM_speed_MHz, RAM_GB, rent_history, pc_type },
    id = null
  ) {
    this.#id = id;
    this.user_id = user_id;
    this.CPU = CPU;
    this.GPU = GPU;
    this.DDR = DDR;
    this.RAM_speed_MHz = RAM_speed_MHz;
    this.RAM_GB = RAM_GB;
    this.rent_history = rent_history;
    this.pc_type = pc_type;
  }

  async update() {
    const result = await executeQuery(
      `UPDATE pc SET
        user_id = ?, CPU = ?, GPU = ?, DDR = ?, RAM_speed_MHz = ?, RAM_GB = ?, rent_history = ?, pc_type = ?
        WHERE id = ?;`,
      [
        this.user_id,
        this.CPU,
        this.GPU,
        this.DDR,
        this.RAM_speed_MHz,
        this.RAM_GB,
        this.rent_history,
        this.pc_type,
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
      `INSERT INTO pc (user_id, CPU, GPU, DDR, RAM_speed_MHz, RAM_GB, rent_history, pc_type)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        this.user_id,
        this.CPU,
        this.GPU,
        this.DDR,
        this.RAM_speed_MHz,
        this.RAM_GB,
        this.rent_history,
        this.pc_type,
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
            user_id: pcObj.user_id,
            CPU: pcObj.CPU,
            GPU: pcObj.GPU,
            DDR: pcObj.DDR,
            RAM_speed_MHz: pcObj.RAM_speed_MHz,
            RAM_GB: pcObj.RAM_GB,
            rent_history: pcObj.rent_history,
            pc_type: pcObj.pc_type,
          },
          pcObj.id
        )
    );
    return result;
  }

  static async findById(id) {
    const results = await executeQuery(`SELECT * FROM pc WHERE id=?`, [id]);
    const result = results[0][0];
    return new Pc(
      {
        user_id: result.user_id,
        CPU: result.CPU,
        GPU: result.GPU,
        DDR: result.DDR,
        RAM_speed_MHz: result.RAM_speed_MHz,
        RAM_GB: result.RAM_GB,
        rent_history: result.rent_history,
        pc_type: result.pc_type,
      },
      result.id
    );
  }

  static async deleteById(id) {
    const result = await executeQuery(
      `DELETE FROM pc
    WHERE id=?;`,
      [id]
    );
    if (result[0].affectedRows === 0) throw new Error("");
    return result;
  }

  //---------------------------------------------
  getInstance() {
    return { ...this, id: this.#id };
  }
};
