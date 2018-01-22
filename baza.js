const Sequelize = require("sequelize");
const sequelize = new Sequelize("baza","wtspirala","wtspirala",{host:"mysql-55-centos7-1-9tr7m",dialect:"mysql",port:3306});
module.exports = sequelize;