const { sequelize,DataTypes } = require('../config/db');
const { partner } = require('./partner');
//const { catalogue } = require('./catalogue');

const product = sequelize.define('product', {
  // Model attributes are defined here
  // id: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   primaryKey: true
  // },
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
  },
  catalogueId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  partnerId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  
}, {
  // Other model options go here
});

//findProduct('10')
console.log(product === sequelize.models.product); // true
async function findProduct(productName){
  const productInstance = await product.findOne({where : {productName:productName}})
  //console.log(productInstance.id)
  if (productInstance === null){
    console.log('Not found!')
  }else{
    console.log('product is found!')
  }
  return productInstance
}

//findProduct('10')
async function findProductById(id){
  const productInstance = await product.findOne({where : {id:id}})
  console.log(productInstance.productName)
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
//addProduct()
async function addProduct(productImageUrl, productName, price,description,createdAt,partnerId,catalogueId){
  //console.log(partnerId)
  //const productInstance = product.create({productImageUrl: productImageUrl, productName: productName, price: price, description : description, createdAt:createdAt, partnerId:partnerId, catalogueId:catalogueId})
  const existProduct = await findProduct(productName)
  if(existProduct === null){
    const productInstance = product.create({productImageUrl: productImageUrl, productName: productName, price: price, description : description, createdAt:createdAt, partnerId:partnerId, catalogueId:catalogueId})
    console.log('Product is added!')
  }
  else {
    console.log('Product is exist!')
  }
}
//removeProduct('74')
async function removeProduct(id){
  //productName = 'Test Product'
  const productInstance = await findProductById(id)
  if(productInstance === null){
    console.log('Product is not exist!')
  }
  else {
    productInstance.destroy()
    console.log('Product is removed!')
  }
}

async function updateProduct(productImageUrl, productName, price,description,createdAt,partnerId,catalogueId){
  // const productInstance = await findProduct(productName)
  
    productInstance = await product.update({
    productImageUrl: productImageUrl, productName: productName, price: price, description : description, createdAt:createdAt, partnerId:partnerId,catalogueId:catalogueId},
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

async function getPriceList(){
  const prices = await sequelize.query(`SELECT max(price) FROM products`, 
  { type: sequelize.QueryTypes.SELECT});

  const maxPriceLength =  Math.pow(10,String(prices[0]['max(price)']).length - 1)
  
  const maxPrice = Math.round(prices[0]['max(price)'] / maxPriceLength) * maxPriceLength

  const mediumPrice = Math.round(maxPrice / (maxPriceLength * 3 / 2)) * maxPriceLength

  const minPrice = Math.round(maxPrice / (maxPriceLength * 3)) * maxPriceLength 
  
  return [minPrice ,mediumPrice ,maxPrice ]
}

async function getProductList(partnerId,catalogueId,price,sortType){

  // price split 
  let minPrice = parseInt(price.split(',')[0])
  let highPrice = parseInt(price.split(',')[1])
  
  // get catalogueId
  let productList = null

  // declare query params
  let partnerQueryString = ``
  let catalogueQueryString = ``
  let priceQueryString = ``
  let sortTypeQueryString = ``

  // partnerId handle
  if(partnerId === ""){
    partnerQueryString = `WHERE partnerId != 0`
  }
  else{
    partnerQueryString = `WHERE partnerId = ${partnerId}`
  }
  
  // catalogueId handle
  if(catalogueId === ""){
    catalogueQueryString = ``
  }
  else{
    catalogueQueryString = `AND catalogueId = ${catalogueId}`
  }

  // price handle
  if(price === ""){
    priceQueryString = ``
  }
  else{
    priceQueryString = `AND price > ${minPrice}
                            AND price <= ${highPrice}`
  }
  
  // sortType handle
  if(sortType === ""){
    sortTypeQueryString = ``
  }
  else{
    sortTypeQueryString = `ORDER BY price ${sortType}`
  }
  productList = await sequelize.query(`SELECT * FROM products
                                      ${partnerQueryString} 
                                      ${catalogueQueryString}  
                                      ${priceQueryString}  
                                      ${sortTypeQueryString}   
                                       `
                                ,{ type: sequelize.QueryTypes.SELECT,
                                      models: product});
  if (productList === null){
    console.log('list empty')
  }else{
    console.log('List Product is built!')
  }
  console.log(productList.length);
  return productList
}
  
// async function getProductList(partnerId,catalogueName,price,sortType){


//   let minPrice = parseInt(price.split(',')[0])
//   let highPrice = parseInt(price.split(',')[1])
 
//   let productList = null
//   catalogueId = ""
//   if(catalogueName !== ""){
//     const catalogue = await sequelize.query(`SELECT id FROM catalogues WHERE name = ${catalogueName}`, 
//                                               { type: sequelize.QueryTypes.SELECT});
//     if(catalogue[0] === undefined){
//       return null
//     }   
//     catalogueId = catalogue[0].id;        
//   }
             
//   // all
//   if(partnerId === "" && catalogueId === "" && price === ""){
//     productList = await product.findAll()
//     console.log("case1");
//   }
//   // empty one atribute
//   else if(partnerId === "" && catalogueId !== "" && price !== ""){
//     productList = await sequelize.query(`SELECT * FROM products 
//                                         WHERE catalogueId = ${catalogueId}  
//                                               AND price > ${minPrice}  
//                                               AND price <= ${highPrice}`, 
//     { type: sequelize.QueryTypes.SELECT,
//     models: product});
//     console.log("case2");
//   }
//   else if(partnerId !== "" && catalogueId !== "" && price === ""){
//     productList = await product.findAll({where : {partnerId: partnerId,catalogueId : catalogueId }})
//     console.log("case3");
//   }
//   else if(partnerId !== "" && catalogueId === "" && price !== ""){
//     productList = await sequelize.query(`SELECT * FROM products 
//                                         WHERE partnerId = ${partnerId}    
//                                               AND price > ${minPrice}  
//                                               AND price <= ${highPrice}`, 
//     { type: sequelize.QueryTypes.SELECT,
//     models: product});
//     console.log("case4");
//   }
//   // empty two atribute

//   else if(partnerId === "" && catalogueId === "" && price !== ""){
//     let a = `WHERE price > ${minPrice}`
//     productList = await sequelize.query(`SELECT * FROM products 
//                                         WHERE price > ${minPrice}
//                                         AND price <= ${highPrice}`, 
//     { type: sequelize.QueryTypes.SELECT,

//     models: product});
//     console.log("case5");
//   }
//   else if(partnerId === "" && catalogueId !== "" && price === ""){
//     productList = await product.findAll({where : {catalogueId : catalogueId}})
//     console.log("case6");
//   }
//   else if(partnerId !== "" && catalogueId === "" && price === ""){
//     productList = await product.findAll({where : {partnerId: partnerId}})
//     console.log("case7");
//   }
//   else{
//     productList = await sequelize.query(`SELECT * FROM products 
//                                         WHERE partnerId = ${partnerId}  
//                                               AND catalogueId = ${catalogueId}  
//                                               AND price > ${minPrice}  
//                                               AND price <= ${highPrice}`, 
//     { type: sequelize.QueryTypes.SELECT,
//     models: product});
//     console.log("case8");
//   }
//   if (productList === null){
//     console.log('list empty')
//   }else{
//     console.log('List Product is built!')
//   }
//   console.log(productList.length);
//   return productList
// }


async function searchProduct(key){
  const productList = await sequelize.query(
    'SELECT * FROM products WHERE productName LIKE :search_name',
    {
      replacements: { search_name: `%${key}%` },
      type: sequelize.QueryTypes.SELECT
    }
  );          

  if (productList === null){
    console.log('productList Not found!')
  }else{
    console.log('productList is build!')
  }
  return productList
}
module.exports = {
  product,
  findProduct,
  findProductById,
  addProduct,
  removeProduct,
  getProductList,
  findRelativeProduct,
  searchProduct,
  updateProduct,
  getPriceList
}