const Sequelize = require("sequelize");
const sequelize = new Sequelize("baza","wtspirala","wtspirala",{host:"172.30.127.84",dialect:"mysql"});
//const sequelize = new Sequelize("wtspirala","root","",{host:"127.0.0.1",dialect:"mysql"});
module.exports = sequelize;