const executeQuery = require("../mysql");

module.exports = class Country {
  // # - privatus ir neredaguojamas iš klasės išorės
  #id;
  country;
  countryShort;

  constructor({ country, countryShort }, id = null) {
    this.#id = id;
    this.country = country;
    this.countryShort = countryShort;
  }

  async update() {
    const result = await executeQuery(
      `UPDATE countries SET 
    salies_pavadinimas = ?, salies_trumpinys = ?
    WHERE id = ?;`,
      [this.country, this.countryShort, this.#id]
    );
    return result;
  }

  //objektas.id ↓
  get id() {
    return this.#id;
  }

  async save() {
    const result = await executeQuery(
      `INSERT INTO countries (salies_pavadinimas, salies_trumpinys) VALUES (?, ?);`,
      [this.country, this.countryShort]
    );

    this.#id = result[0].insertId;
  }

  static async findAll() {
    const result = await executeQuery(`SELECT * FROM countries`);
    result = result[0].map(
      (countryObj) =>
        new Country(
          {
            country: countryObj.salies_pavadinimas,
            countryShort: countryObj.salies_trumpinys,
          },
          countryObj.id
        )
    );
    return result;
  }

  static async findById(id) {
    const results = await executeQuery(`SELECT * FROM countries WHERE id=?`, [
      id,
    ]);
    const result = results[0][0];
    return new Country(
      {
        country: result.salies_pavadinimas,
        countryShort: result.salies_trumpinys,
      },
      result.id
    );
  }

  static async deleteById(id) {
    const result = await executeQuery(
      `DELETE FROM countries
    WHERE id=?;`,
      [id]
    );
    if (result[0].affectedRows === 0) throw new Error("toks įrašas nerastas");
    return result;
  }

  getInstance() {
    return { ...this, id: this.#id };
  }
};
