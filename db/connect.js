const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('onito', 'root', '', {
	dialect: 'mariadb',
});
sequelize
	.authenticate()
	.then(() => console.log('connected'))
	.catch((e) => console.log(e));

module.exports = sequelize;
