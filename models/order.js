const { sequelize,DataTypes } = require('../config/db');
const { product } = require('./product');

const sellProducts = sequelize.define('sellProducts', {
  // id: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   primaryKey: true
  // },
  idbk:{
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  // Other model options go here
});


// console.log(sellProducts === sequelize.models.sellProducts); // true
async function findsellProducts(id){
  //const sellsellProductsInstance = await sellProducts.findOne({where : {id:id}})

  const sellsellProductsInstance = await sequelize.query(`SELECT * FROM sellProducts WHERE id = ${id}`, 
  { type: sequelize.QueryTypes.SELECT});
  //console.log(sellsellProductsInstance)
  if (sellsellProductsInstance === null){
    console.log('Not found!')
  }else{
    console.log('sellProducts is found!')
  }
  return sellsellProductsInstance
}
//findAllsellProducts()
async function findAllsellProducts(){
      const sellProductsInstance = await sequelize.query(`   SELECT sellProducts.id,sellProducts.createdAt, productImageUrl, productName,price,sellProducts.status ,name FROM sellProducts, users, products
                                                      WHERE sellProducts.productId = products.id
                                                      AND sellProducts.userId = users.id`,
                                                      {type: sequelize.QueryTypes.SELECT});

                                                  
      // for (let index = 0; index < array.length; index++) {
      //   const element = array[index];
      //   sellProductsInstance.forEach(element => {
      //     element
      //   });
      // }
      // sellProductsInstance.forEach(element => {
      //   console.log(element["productImageUrl"])
      // });
      // console.log(sellProductsInstance[10]["id"]);
      // console.log(sellProductsInstance[10]["createdAt"]);
      // console.log(sellProductsInstance[10]["productImageUrl"]);
      // console.log(sellProductsInstance[10]["productName"]);
      // console.log(sellProductsInstance[10]["price"]);
      // console.log(sellProductsInstance[10]["name"]);

      return sellProductsInstance
}

async function addsellProducts(userId,productId){
  //   INSERT INTO admins(id, name, account, password, createdAt, updatedAt) VALUES
// (1, 'Letha241', 'Bolt@nowhere.com', 'gaaapjacc', '2016-01-01 00:07:13', '2017-01-01 00:00:04'),
  const productInstance = sellProducts.create({userId: userId, productId: productId})
  // sellProducts.update({userId:userId,productId:productId})
  if (userId ===undefined){
    userId = 1
  }
  // var normalizedDate = new Date(Date.now()).toISOString();
  // await sellProducts.sequelize.query(
  //   `INSERT INTO sellProductss( createdAt,updatedAt,productId, userId) VALUE (${normalizedDate},${normalizedDate},${userId},${productId})`,
  //   {
  //    type: sequelize.QueryTypes.INSERT,
  //   },
  //  );
  if(productInstance === null){
    console.log('sellProducts is fail!')
  }
  else {
    console.log('sellProducts is add!')
  }
}
//updateStatus(1, 'Pending')
async function updateStatus(sellProductsId, status){
  //const sellProducts = await findsellProducts(sellProductsId)

  const sellProductsInstance = await sellProducts.update({
    status : status},
    {
      where : {
        idbk: sellProductsId
    }
  })
  if(sellProductsInstance === null){
    console.log('sellProducts is not exist!')
  }
  else {
    
    console.log('sellProducts is updated!')
  }
}
async function removesellProducts(id){
  const productInstance = await findsellProducts(id)
  if(productInstance === null){
    console.log('Product is not exist!')
  }
  else {
    productInstance.destroy()
    console.log('Product is removed!')
  }
}



async function getsellProductsList(){
      const sellProductsList = await findAllsellProducts()
      if (sellProductsList === null){
      console.log('sellProducts list are not exists')
      }else{
      console.log('sellProducts list is built!')
      }
      return sellProductsList
}
// getsellProductsList(1);
module.exports = {
  sellProducts,
  findsellProducts,
  findAllsellProducts,
  addsellProducts,
  updateStatus,
  removesellProducts,
  getsellProductsList,
}