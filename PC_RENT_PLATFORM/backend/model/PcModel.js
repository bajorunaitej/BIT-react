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
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);`[
        (this.user_id,
        this.CPU,
        this.GPU,
        this.DDR,
        this.RAM_speed_MHz,
        this.RAM_GB,
        this.rent_history,
        this.pc_type)
      ]
    );
    this.#id = result[0].insertId;
  }

  //---------------------------------------------
  getInstance() {
    return { ...this, id: this.#id };
  }
};
