const executeStatement = require("../mysql");

module.exports = class User {
  #id;
  username;
  pass_encoded;
  salt;
  email;
  birth_date;
  phone;
  address_id;

  constructor(
    { username, pass_encoded, email, birth_date, phone, address_id, salt },
    id = null
  ) {
    this.#id = id;
    this.username = username;
    this.pass_encoded = pass_encoded;
    this.email = email;
    this.birth_date = birth_date;
    this.phone = phone;
    this.address_id = address_id;
    this.salt = salt;
  }

  async update() {
    const result = await executeStatement(
      `UPDATE users SET 
        username = ?, pass_encoded = ?, email = ?, birth_date = ?, phone = ?, address_id = ?, salt=?
        WHERE id = ?;`,
      [
        this.username,
        this.pass_encoded,
        this.email,
        this.birth_date,
        this.phone,
        this.address_id,
        this.salt,
        this.#id,
      ]
    );
    return result;
  }

  get id() {
    return this.#id;
  }

  async save() {
    const result = await executeStatement(
      `INSERT INTO users (username, pass_encoded, email, birth_date, phone, address_id, salt) 
        VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [
        this.username,
        this.pass_encoded,
        this.email,
        this.birth_date,
        this.phone,
        this.address_id,
        this.salt,
      ]
    );

    this.#id = result[0].insertId;
  }

  static async findAll() {
    const results = await executeStatement(`SELECT * FROM users`);
    const result = results[0].map(
      (userObj) =>
        new User(
          {
            username: userObj.username,
            pass_encoded: userObj.pass_encoded,
            email: userObj.email,
            birth_date: userObj.birth_date,
            phone: userObj.phone,
            address_id: userObj.address_id,
            salt: userObj.salt,
          },
          userObj.id
        )
    );
    return result;
  }

  static async findById(id) {
    const results = await executeStatement(`SELECT * FROM users WHERE id = ?`, [
      id,
    ]);
    const user = results[0];
    return new User(
      {
        username: user.username,
        pass_encoded: user.pass_encoded,
        email: user.email,
        birth_date: user.birth_date,
        phone: user.phone,
        address_id: user.address_id,
        salt: user.salt,
      },
      user.id
    );
  }

  static async deleteById(id) {
    const result = await executeStatement(`DELETE FROM users WHERE id = ?;`, [
      id,
    ]);
    if (result[0].affectedRows === 0) throw new Error("User not found");
    return result;
  }

  getInstance() {
    return { ...this, id: this.#id };
  }
};

// const result = executeStatement(`SELECT * FROM users`);
