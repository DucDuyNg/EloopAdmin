const { sequelize,DataTypes } = require('../config/db');
const { product } = require('./product');

const Order = sequelize.define('Order', {
  
}, {
  // Other model options go here
});


// console.log(Order === sequelize.models.sellProducts); // true
async function findOrder(id){
  //const sellOrderInstance = await Order.findOne({where : {id:id}})

  const sellOrderInstance = await sequelize.query(`SELECT * FROM sellProducts WHERE id = ${id}`, 
  { type: sequelize.QueryTypes.SELECT});
  //console.log(sellOrderInstance)
  if (sellOrderInstance === null){
    console.log('Not found!')
  }else{
    console.log('Order is found!')
  }
  return sellOrderInstance
}
//findAllOrder()
async function findAllOrder(){
      const orderInstance = await sequelize.query(`   SELECT sellProducts.id,sellProducts.createdAt, productImageUrl, productName,price,sellProducts.status ,name FROM sellProducts, users, products
                                                      WHERE sellProducts.productId = products.id
                                                      AND sellProducts.userId = users.id`,
                                                      {type: sequelize.QueryTypes.SELECT});

                                                  
      // for (let index = 0; index < array.length; index++) {
      //   const element = array[index];
      //   orderInstance.forEach(element => {
      //     element
      //   });
      // }
      // orderInstance.forEach(element => {
      //   console.log(element["productImageUrl"])
      // });
      // console.log(orderInstance[10]["id"]);
      // console.log(orderInstance[10]["createdAt"]);
      // console.log(orderInstance[10]["productImageUrl"]);
      // console.log(orderInstance[10]["productName"]);
      // console.log(orderInstance[10]["price"]);
      // console.log(orderInstance[10]["name"]);

      return orderInstance
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



async function getOrderList(){
      const orderList = await findAllOrder()
      if (orderList === null){
      console.log('order list are not exists')
      }else{
      console.log('order list is built!')
      }
      return orderList
}
// getOrderList(1);
module.exports = {
    Order,
  findOrder,
  findAllOrder,
  addOrder,
  removeOrder,
  getOrderList,
}