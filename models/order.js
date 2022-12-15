const { sequelize,DataTypes } = require('../config/db');
const { product } = require('./product');

const Order = sequelize.define('Order', {
  
}, {
  // Other model options go here
});


console.log(Order === sequelize.models.Order); // true
async function findOrder(id){
  const sellOrderInstance = await Order.findOne({where : {id:id}})
  if (sellOrderInstance === null){
    console.log('Not found!')
  }else{
    console.log('Order is found!')
  }
  return sellOrderInstance
}

async function addOrder(userId,productId){
  //   INSERT INTO admins(id, name, account, password, createdAt, updatedAt) VALUES
// (1, 'Letha241', 'Bolt@nowhere.com', 'gaaapjacc', '2016-01-01 00:07:13', '2017-01-01 00:00:04'),
  const productInstance = Order.create({userId: userId, productId: productId})
  // Order.update({userId:userId,productId:productId})
  if (userId ===undefined){
    userId = 1
  }
  // var normalizedDate = new Date(Date.now()).toISOString();
  // await Order.sequelize.query(
  //   `INSERT INTO Orders( createdAt,updatedAt,productId, userId) VALUE (${normalizedDate},${normalizedDate},${userId},${productId})`,
  //   {
  //    type: sequelize.QueryTypes.INSERT,
  //   },
  //  );
  if(productInstance === null){
    console.log('Order is fail!')
  }
  else {
    console.log('Order is add!')
  }
}

async function removeOrder(id){
  const productInstance = await findOrder(id)
  if(productInstance === null){
    console.log('Product is not exist!')
  }
  else {
    productInstance.destroy()
    console.log('Product is removed!')
  }
}



async function getOrderList(userId){
   const productInstance = await sequelize.query(`SELECT * FROM sellProducts,products WHERE userId = "${userId}" and sellProducts.productId = products.id`, 
    { type: sequelize.QueryTypes.SELECT
        ,model : product
   });
    //    console.log(productInstance);     
    //    console.log(productInstance.length);       
  if (productInstance === null){
    console.log('list empty')
  }else{
    console.log('List Product is built!')
  }
  return productInstance
}
// getOrderList(1);
module.exports = {
    Order,
  findOrder,
  addOrder,
  removeOrder,
  getOrderList,
}