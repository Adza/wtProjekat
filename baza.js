const Sequelize = require("sequelize");
const sequelize = new Sequelize("baza","wtspirala","wtspirala",{host:"mysql-55-centos7-1-mshd4",dialect:"mysql",port:3306});
module.exports = sequelize;