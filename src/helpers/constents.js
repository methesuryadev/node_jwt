require("dotenv").config();
const port = process.env.port
//DB
const dbconfig = {
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_name,
}

const BASE_URL = process.env.base_url
const JWT_TOKEN = "Sura#das38SD55%^#"

module.exports={
    port,
    dbconfig,
    BASE_URL,
    JWT_TOKEN
}