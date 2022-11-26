const { sequelize,DataTypes } = require('../config/db');
const { partner } = require('./partner');

const product = sequelize.define('product', {
  // Model attributes are defined here
  productImageUrl:{
      type: DataTypes.STRING,
      allowNull: false
    },
  productName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(3000),
    allowNull: true
  }
}, {
  // Other model options go here
});


console.log(product === sequelize.models.product); // true
async function findProduct(id){
  const productInstance = await product.findOne({where : {id:id}})
  if (productInstance === null){
    console.log('Not found!')
  }else{
    console.log('product is found!')
  }
  return productInstance
}

async function findRelativeProduct(id){
  const sizeRelativeProduct = 4
  const catalogue = await sequelize.query(`SELECT catalogueId FROM products WHERE id = ${id}`, 
                                            { type: sequelize.QueryTypes.SELECT});
  if(catalogue[0] === undefined){
    return null
  }                                      
  const catalogueId = catalogue[0].catalogueId;

  const listRelativeProduct = await sequelize.query(`SELECT * FROM products WHERE catalogueId = ${catalogueId} and id != ${id} LIMIT ${sizeRelativeProduct}`, 
                                                    { type: sequelize.QueryTypes.SELECT });

  if (listRelativeProduct === null){
    console.log('listRelativeProduct Not found!')
  }else{
    console.log('listRelativeProduct is build!')
  }
  return listRelativeProduct
}
async function addProduct(productImageUrl, productName, price,description){
  const existProduct = await findProduct(account)
  if(existProduct === null){
    const productInstance = product.create({productImageUrl: productImageUrl, productName: productName, price: price, description : description})
    console.log('Product is added!')
  }
  else {
    console.log('Product is exist!')
  }
}

async function removeProduct(id){
  const productInstance = await findProduct(id)
  if(productInstance === null){
    console.log('Product is not exist!')
  }
  else {
    productInstance.destroy()
    console.log('Product is removed!')
  }
}

async function updateProduct(id,productImageUrl, productName, price,description){
  const productInstance = await product.update({
    productImageUrl: productImageUrl, productName: productName, price: price, description : description},
    {
      where : {
        id: id
    }
  })
  if(productInstance === null){
    console.log('product is not exist!')
  }
  else {
    productInstance.destroy()
    console.log('User is updated!')
  }
}

async function getProductList(partnerId,catalogueId,price){
  let productList = null
  // all
  if(partnerId === "" && catalogueId === "" && price === ""){
    productList = await product.findAll()
    console.log("case1");
  }
  // empty one atribute
  else if(partnerId === "" && catalogueId !== "" && price !== ""){
    productList = await product.findAll({where : {catalogueId: catalogueId,price : price}})
    console.log("case2");
  }
  else if(partnerId !== "" && catalogueId !== "" && price === ""){
    productList = await product.findAll({where : {partnerId: partnerId,catalogueId : catalogueId}})
    console.log("case3");
  }
  else if(partnerId !== "" && catalogueId === "" && price !== ""){
    productList = await product.findAll({where : {partnerId: partnerId,price :price}})
    console.log("case4");
  }
  // empty two atribute
  else if(partnerId === "" && catalogueId === "" && price !== ""){
    productList = await product.findAll({where : {price :price}})
    console.log("case5");
  }
  else if(partnerId === "" && catalogueId !== "" && price === ""){
    productList = await product.findAll({where : {catalogueId : catalogueId}})
    console.log("case6");
  }
  else if(partnerId !== "" && catalogueId === "" && price === ""){
    productList = await product.findAll({where : {partnerId: partnerId}})
    console.log("case7");
  }
  else{
    console.log("case8");
    productList = await product.findAll({where : {partnerId: partnerId,catalogueId : catalogueId,price :price}})
  }
  if (productList === null){
    console.log('list empty')
  }else{
    console.log('List Product is built!')
  }
  return productList
}

module.exports = {
  product,
  findProduct,
  addProduct,
  removeProduct,
  getProductList,
  findRelativeProduct
}
