const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "bajor",
  password: "Labas0929.00",
  database: "pc_rent_platform",
});

connection.connect((err) => {
  console.log(err);
  if (err) console.log(err);
  else {
    console.log("Connected to DB");
    // executeStatement();
  }
});

async function execute(sql, parameters = []) {
  try {
    console.log(sql);
    console.log(parameters);
    const result = await connection.promise().execute(sql, parameters);
    return result;
  } catch (err) {
    console.error(`Error executing query: ${sql}, Error: ${err}`);
    throw err;
  }
}

module.exports = execute;

// async function executeStatement() {
//READ
//duomenu gavimas is DB
// const [result] = await connection
//   .promise()
//   .execute("SELECT * FROM `addresses` WHERE `id`=1");
// console.log(result);
//CREATE
// const [result] = await connection.promise().execute(
//   `INSERT INTO users (username, pass_encoded, email, birth_date, phone, address_id)
//     VALUES("burger", "asjfksdjfskjdf", "burgeristas@gmail.com", "2000-01-01", "+37064859447", 1)`
// );
// console.log(result);
//UPDATE
// const [result] = await connection.promise().execute(
//   `UPDATE users SET
//   username = 'Burgeristas'
//   WHERE id = 4;`
// );
// console.log(result);
//DELETE
// const [result] = await connection.promise().execute(
//   `DELETE FROM users
//   WHERE id=4;`
// );
// console.log(result);
// }
