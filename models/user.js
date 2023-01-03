const { sequelize,DataTypes } = require('../config/db');


const user = sequelize.define('user', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  account: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  number_product: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  number_recycles: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  number_charity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  
}, {
  // Other model options go here
});


// `sequelize.define` also returns the model
console.log(user === sequelize.models.user); // true

async function findUser(account){
  const userInstance = await user.findOne({where : {account:account}})
  if (userInstance === null){
    console.log('Not found!')
  }else{
    console.log('User is found!')
  }
  return userInstance
}

//findAllUser()
async function findAllUser(){
  const userInstance = await sequelize.query(`select id,createdAt from users`,
  {type: sequelize.QueryTypes.SELECT});
  console.log(userInstance[0]["id"]);
  console.log(userInstance[0]["createdAt"]);
  // if (userInstance === null){
  //   console.log('Not found!')
  // }else{
  //   console.log('User is found!')
  // }
  return userInstance
}

async function addUser(name, account, password){
  const existUser = await findUser(account)
  if(existUser === null){
    const userInstance = user.create({name: name, account: account, password : password})
    console.log('User is added!')
  }
  else {
    console.log('User is exist!')
  }
}

async function removeUser(account){
  const userInstance = await findUser(account)
  if(userInstance === null){
    console.log('User is not exist!')
  }
  else {
    userInstance.destroy()
    console.log('User is removed!')
  }
}

async function updateUser(name, account, password){
  const userInstance = await user.update({
    name: name, account: account, password : password},
    {
      where : {
        account: account
    }
  })
  if(userInstance === null){
    console.log('User is not exist!')
  }
  else {
    userInstance.destroy()
    console.log('User is updated!')
  }
}
// BanOrUnban('HomerBustos6@nowhere.com', 'unban')
async function BanOrUnban(account, status){
  const userInstance = await user.update({
    status : status},
    {
      where : {
        account: account
    }
  })
  if(userInstance === null){
    console.log('User is not exist!')
  }
  else {
    
    console.log('User is updated!')
  }

}

async function getAccountList(){
  const accountList = await user.findAll()
  if (accountList === null){
    console.log('account are not exists')
  }else{
    console.log('account list is built!')
  }
  return accountList
}
// removeUser('huyhoang')
// addUser('hu','test','123')
// updateUser('hu','hh','12345')

module.exports ={user,findUser,findAllUser,addUser,removeUser,updateUser,BanOrUnban,getAccountList}
