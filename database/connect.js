const { Pool } = require('pg');
const fs = require("fs")

const db = new Pool({
    connectionString: process.env.DB_URL,
    ssl:{
        rejectUnauthorized: false
    }
})

module.exports = db
