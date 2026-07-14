const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

let db;

async function connectDB() {
  if (db) return db;

  const client = new MongoClient(uri);

  await client.connect();

  db = client.db("open5gs");

  console.log("Connected to Open5GS MongoDB");

  return db;
}

module.exports = connectDB;