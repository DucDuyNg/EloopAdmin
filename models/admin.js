const { sequelize,DataTypes } = require('../config/db');


const admin = sequelize.define('admin', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  account: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(admin === sequelize.models.admin); // true

async function findAdmin(account){
  const adminInstance = await admin.findOne({where : {account:account}})
  if (adminInstance === null){
    console.log('Not found!')
  }else{
    console.log('admin is found!')
  }
  return adminInstance
}

async function addAdmin(name, account, password){
  const existAdmin = await findAdmin(account)
  if(existAdmin === null){
    const adminInstance = admin.create({name: name, account: account, password : password})
    console.log('admin is added!')
  }
  else {
    console.log('admin is exist!')
  }
}

async function removeAdmin(account){
  const adminInstance = await findAdmin(account)
  if(adminInstance === null){
    console.log('admin is not exist!')
  }
  else {
    adminInstance.destroy()
    console.log('admin is removed!')
  }
}

module.exports = {admin,findAdmin,addAdmin,removeAdmin}