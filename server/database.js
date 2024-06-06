const Pool = require("pg").Pool;

const pool = new Pool(
    {user: "postgres",
    database: "groovehub",
    password: "mithun2303",
    host:"localhost",
    port:5432,
    }
)

module.exports=pool;
