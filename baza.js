const Sequelize = require("sequelize");
const sequelize = new Sequelize("baza","wtspirala","wtspirala",{host:"172.30.127.84",dialect:"mysql"});
module.exports = sequelize;