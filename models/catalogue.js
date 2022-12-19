const { sequelize,DataTypes } = require('../config/db');

const catalogue = sequelize.define('catalogue', {
  // Model attributes are defined here
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(catalogue === sequelize.models.catalogue); // true

async function findCatalogue(account){
  const catalogueInstance = await catalogue.findOne({where : {account:account}})
  if (catalogueInstance === null){
    console.log('Not found!')
  }else{
    console.log('catalogue is found!')
  }
  return catalogueInstance
}
findCatalogueIdByName('THỰC PHẨM HỮU CƠ')
async function findCatalogueIdByName(name){
  const catalogueInstance = await catalogue.findOne({where : {name:name}})
  console.log(catalogueInstance.id)
  if (catalogueInstance === null){
    console.log('Not found!')
  }else{
    console.log('catalogue is found!')
  }
  return catalogueInstance.id
}

async function findCatalogueIdByName2(){
  const userInstance = await sequelize.query(`select id,name from catalogues`,
  {type: sequelize.QueryTypes.SELECT});
  console.log(userInstance[0]["id"]);
  console.log(userInstance[0]["name"]);
  // if (userInstance === null){
  //   console.log('Not found!')
  // }else{
  //   console.log('User is found!')
  // }
  return userInstance
}

async function addCatalogue(name, account, password){
  const existCatalogue = await findCatalogue(account)
  if(existCatalogue === null){
    const catalogueInstance = catalogue.create({name: name, account: account, password : password})
    console.log('Catalogue is added!')
  }
  else {
    console.log('Catalogue is exist!')
  }
}

async function removeCatalogue(account){
  const catalogueInstance = await findCatalogue(account)
  if(catalogueInstance === null){
    console.log('Catalogue is not exist!')
  }
  else {
    catalogueInstance.destroy()
    console.log('Catalogue is removed!')
  }
}

async function getCatalogueList(){
  const catalogueList = await catalogue.findAll()
  if (catalogueList === null){
    console.log('catalogueList are not exists')
  }else{
    console.log('catalogueList list is built!')
  }
  return catalogueList
}
module.exports = {catalogue,findCatalogue,findCatalogueIdByName,addCatalogue,removeCatalogue,getCatalogueList}