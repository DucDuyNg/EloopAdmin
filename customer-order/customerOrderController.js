const {
      Order,
    findOrder,
    findAllOrder,
    addOrder,
    removeOrder,
    getOrderList,
  } = require('../models/order')
  exports.getOrderList = async (req,res,next) =>{
   
      const OrderList = await getOrderList()
      console.log(OrderList.length);
   
      res.render('admins/customer-order',{OrderList :OrderList})
  }
  exports.addToOrder = async (req,res,next) =>{
    const productId = req.params.id
    console.log(productId);
    await addOrder(global.userLoginId,productId)
    res.redirect('/product')
  }