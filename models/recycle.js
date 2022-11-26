const { sequelize,DataTypes } = require('../config/db');


const recycle = sequelize.define('recycle', {
  // Model attributes are defined here
  recycleName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  recycleImageURL: {
    type: DataTypes.STRING,
    allowNull: false
  },
  recycleDescription: {
    type: DataTypes.STRING,
    allowNull: true
  },
  recyclePhoneNum: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(recycle === sequelize.models.recycle); // true

async function findRecycle(account){
  const recycleInstance = await recycle.findOne({where : {account:account}})
  if (recycleInstance === null){
    console.log('Not found!')
  }else{
    console.log('recycle is found!')
  }
  return recycleInstance
}

async function addRecycle(name, account, password){
  const existRecycle = await findRecycle(account)
  if(existRecycle === null){
    const recycleInstance = recycle.create({name: name, account: account, password : password})
    console.log('recycle is added!')
  }
  else {
    console.log('recycle is exist!')
  }
}

async function removeRecycle(account){
  const recycleInstance = await findRecycle(account)
  if(recycleInstance === null){
    console.log('recycle is not exist!')
  }
  else {
    recycleInstance.destroy()
    console.log('recycle is removed!')
  }
}

module.exports = {recycle,findRecycle,addRecycle,removeRecycle}
