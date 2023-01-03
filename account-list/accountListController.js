const {user,findUser,findAllUser,addUser,removeUser,updateUser,getAccountList} = require('../models/user')
exports.getAccountList = async (req,res,next) =>{
    const accountList = await getAccountList();
    console.log(accountList.length);


    res.render('admins/account-list', {accountList : accountList})
}
exports.banAccount = async (req,res,next) =>{
    let accountBan = req.params.name
    console.log(accountBan);
    // if(mess.split(',')[0] === 'ban'){
    //     mess = mess.split(',')[1]
    // }
    //ban account function

    const accountList = await getAccountList();
    console.log(accountList.length);


    res.render('admins/account-list', {accountList : accountList})
}

exports.getFillterAccountList = async (req,res,next) =>{
    const accountList = await getAccountList();
    console.log(req.query);
    console.log(req.params);
    console.log("hello");
    console.log(accountList.length);

    res.render('admins/account-list', {accountList : accountList})
}

