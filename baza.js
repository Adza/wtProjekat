const Sequelize = require("sequelize");
const sequelize = new Sequelize("baza","wtspirala","wtspirala",{host:"mysql-57-centos7",dialect:"mysql",port:3306});
module.exports = sequelize;