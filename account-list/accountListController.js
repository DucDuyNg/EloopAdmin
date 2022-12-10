const {user,findUser,findAllUser,addUser,removeUser,updateUser,getAccountList} = require('../models/user')
exports.getAccountList = async (req,res,next) =>{

      const accountList = await getAccountList();
      console.log(accountList.length);
  
      res.render('admins/account-list', {accountList : accountList})
  }