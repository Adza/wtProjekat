const Sequelize = require("sequelize");
const sequelize = new Sequelize("baza","wtspirala","wtspirala",{host:"mysql-57-centos7",dialect:"mysql"});
module.exports = sequelize;