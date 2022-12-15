const {
      Order,
    findOrder,
    addOrder,
    removeOrder,
    getOrderList,
  } = require('../models/order')
  exports.getOrderList = async (req,res,next) =>{
      const userId = req.params.userId
   
      const OrderList = await getOrderList(1)
      console.log(OrderList.length);
   
      res.render('admin/customer-order',{OrderList :OrderList})
  }
  exports.addToOrder = async (req,res,next) =>{
    const productId = req.params.id
    console.log(productId);
    await addOrder(global.userLoginId,productId)
    res.redirect('/product')
  }