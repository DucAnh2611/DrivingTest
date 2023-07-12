require("dotenv").config();

const mssqlConfig = {
    user: process.env.MSSQLUSER,
    password: process.env.MSSQLPASSWORD,
    server: process.env.MSSQLSERVER,
    database: process.env.MSSQLDATABASE,
    options: {
      trustServerCertificate: true,
      enableArithAort: true,
    },
    port: 1433
};
module.exports = mssqlConfig;