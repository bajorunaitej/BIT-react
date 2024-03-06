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
    console.log("Connected");
    executeStatement();
  }
});

async function executeStatement() {
  const [result] = await connection
    .promise()
    .execute("SELECT * FROM `addresses` WHERE `id`=1");
  console.log(result);
}
