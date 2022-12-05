const { sequelize,DataTypes } = require('../config/db');


const distributor = sequelize.define('distributor', {
  // Model attributes are defined here
  distributorName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  distributorImageURL: {
    type: DataTypes.STRING,
    allowNull: false
  },
  distributorDescription: {
    type: DataTypes.STRING,
    allowNull: true
  },
  distributorPhoneNum: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(distributor === sequelize.models.distributor); // true

async function findDistributor(account){
  const distributorInstance = await distributor.findOne({where : {account:account}})
  if (distributorInstance === null){
    console.log('Not found!')
  }else{
    console.log('distributor is found!')
  }
  return distributorInstance
}

async function addDistributor(name, account, password){
  const existdistributor = await findDistributor(account)
  if(existdistributor === null){
    const distributorInstance = distributor.create({name: name, account: account, password : password})
    console.log('distributor is added!')
  }
  else {
    console.log('distributor is exist!')
  }
}

async function removeDistributor(account){
  const distributorInstance = await findDistributor(account)
  if(distributorInstance === null){
    console.log('distributor is not exist!')
  }
  else {
    distributorInstance.destroy()
    console.log('distributor is removed!')
  }
}
async function getDistributorList(){
  const distributorList = await distributor.findAll()
  if (distributorList === null){
    console.log('distributor are not exists')
  }else{
    console.log('distributor list is built!')
  }
  return distributorList
}
module.exports = {distributor,findDistributor,addDistributor,removeDistributor,getDistributorList}
