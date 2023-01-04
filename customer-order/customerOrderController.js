const {
      Order,
    findOrder,
    findAllOrder,
    addOrder,
    removeOrder,
    getOrderList,
  } = require('../models/order')
  const {product,findProduct,findProductById,addProduct,removeProduct,getProductList,findRelativeProduct, updateProduct,getPriceList} = require('../models/product')
  const {user,findUser,findUserById,findAllUser,addUser,removeUser,updateUser,BanOrUnban, getAccountList} = require('../models/user')
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
  exports.getOrderDetail = async (req,res,next) =>{
    const orderId = req.params.id
    console.log('...........orderId')
    console.log(orderId)
    if(orderId !== undefined){
        const order = await findOrder(orderId);
        const product = await findProductById(order[0].productId)
        const account = await findUserById(order[0].userId)
        const productName = product[0].productName
        const accountName = account[0].name
        console.log(productName,accountName)
        // const temp1 = {
        //   productName : "default",
        //   name:"default"
        // }

        
        // temp1.productName = product[0].productName
        // temp1.name = account[0].name
        
        // console.log(temp1)
        
        // const temp2 = Object.create(temp1)
        // temp2.productName = product[0].productName
        // temp2.name = account[0].name
        res.render('admins/order-detail',{order:order[0], product:product,account:account})
    }
    //res.redirect('back')
}