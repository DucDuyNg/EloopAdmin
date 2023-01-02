const { sequelize,DataTypes } = require('../config/db');
const { partner } = require('./partner');
//const { catalogue } = require('./catalogue');

const product = sequelize.define('product', {
  // Model attributes are defined here
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
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
  productName = 'Test Product'
  const productInstance = await findProductById(id)
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
  // declare query params
  let partnerQueryString = ``
  let catalogueQueryString = ``
  let priceQueryString = ``
  let sortTypeQueryString = ``
  
  // price split 
  let minPrice 
  let highPrice 
  
  // price handle
  if(price === "" || price === undefined){
    priceQueryString = ``
  }
  else{
    minPrice = parseInt(price.split(',')[0])
    highPrice = parseInt(price.split(',')[1])
    priceQueryString = `AND price > ${minPrice}
                            AND price <= ${highPrice}`
  }

  // get catalogueId
  let productList = null

  // partnerId handle
  if(partnerId === "" || partnerId === undefined){
    partnerQueryString = `WHERE partnerId != 0`
  }
  else{
    partnerQueryString = `WHERE partnerId = ${partnerId}`
  }
  
  // catalogueId handle
  if(catalogueId === "" || catalogueId === undefined){
    catalogueQueryString = ``
  }
  else{
    catalogueQueryString = `AND catalogueId = ${catalogueId}`
  }

  
  // sortType handle
  if((sortType === "" || sortType === undefined ) || (price === "" && price === undefined)){
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
  getPriceList
}