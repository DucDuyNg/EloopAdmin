const { sequelize,DataTypes } = require('../config/db');

const charity = sequelize.define('charity', {
  // Model attributes are defined here
  charityName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  charityImageURL: {
    type: DataTypes.STRING,
    allowNull: false
  },
  charityDescription: {
    type: DataTypes.STRING,
    allowNull: true
  },
  charityPhoneNum: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(charity === sequelize.models.charity); // true

async function findCharity(account){
  const charityInstance = await charity.findOne({where : {account:account}})
  if (charityInstance === null){
    console.log('Not found!')
  }else{
    console.log('charity is found!')
  }
  return charityInstance
}

async function addCharity(name, account, password){
  const existCharity = await findCharity(account)
  if(existCharity === null){
    const charityInstance = charity.create({name: name, account: account, password : password})
    console.log('charity is added!')
  }
  else {
    console.log('charity is exist!')
  }
}

async function removeCharity(account){
  const charityInstance = await findCharity(account)
  if(charityInstance === null){
    console.log('charity is not exist!')
  }
  else {
    charityInstance.destroy()
    console.log('charity is removed!')
  }
}

module.exports = {charity,findCharity,addCharity,removeCharity}
