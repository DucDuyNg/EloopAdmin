const { sequelize,DataTypes } = require('../config/db');

const catalogue = sequelize.define('catalogue', {
  // Model attributes are defined here
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
module.exports = {catalogue,findCatalogue,addCatalogue,removeCatalogue,getCatalogueList}
