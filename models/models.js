const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Login = sequelize.define('Login', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
})

const General = sequelize.define('General', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstName: { type: DataTypes.STRING, allowNull: false },
  secondName: { type: DataTypes.STRING },
  position: { type: DataTypes.STRING, allowNull: false },
  skills: { type: DataTypes.STRING, allowNull: false },
  projects: { type: DataTypes.INTEGER },
  experiances: { type: DataTypes.INTEGER },
  email: { type: DataTypes.STRING },
  about: { type: DataTypes.TEXT, allowNull: false },
  avatar: { type: DataTypes.STRING },
  active: { type: DataTypes.BOOLEAN, defaultValue: false },
})

const Experiance = sequelize.define('Experiance', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  begdat: { type: DataTypes.DATE, allowNull: false },
  enddat: { type: DataTypes.DATE, allowNull: false },
  company: { type: DataTypes.STRING, allowNull: false },
  position: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
})

const Education = sequelize.define('Education', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  begdat: { type: DataTypes.DATE, allowNull: false },
  enddat: { type: DataTypes.DATE, allowNull: false },
  company: { type: DataTypes.STRING, allowNull: false },
  position: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
})

module.exports = {
  Login,
  General,
  Experiance,
  Education,
}
