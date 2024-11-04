const { Pool } = require("pg");
process.loadEnvFile();

// Again, this should be read from an environment constiable
module.exports = new Pool({
	connectionString: process.env.CONNECTION_STRING
});
