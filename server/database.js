const Pool = require("pg").Pool;

const pool = new Pool(
    {user: "gh",
    database: "gh",
    password: "gh",
    host:"localhost",
    port:5433,
    }
)

module.exports=pool;
