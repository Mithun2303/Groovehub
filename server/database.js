const Pool = require("pg").Pool;

const pool = new Pool(
    {user: "gh",
    database: "gh",
    password: "gh",
    host:"localhost",
    port:5434,
    }
)

module.exports=pool;
