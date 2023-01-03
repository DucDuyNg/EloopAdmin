const {user,findUser,findAllUser,addUser,removeUser,updateUser,BanOrUnban, getAccountList} = require('../models/user')
exports.getAccountList = async (req,res,next) =>{
    const accountList = await getAccountList();
    console.log(accountList.length);


    res.render('admins/account-list', {accountList : accountList})
}
exports.banAccount = async (req,res,next) =>{
    let accountBan = req.params.account
    console.log(req.body)
    console.log(req.params)
    
    let status = req.body.status
    console.log('...................account')
    console.log(accountBan);
    console.log(status);
    // if(mess.split(',')[0] === 'ban'){
    //     mess = mess.split(',')[1]
    // }
    //ban account function
    const accountFunction = await BanOrUnban(accountBan, status)
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

exports.getAccountDetail = async (req,res,next) =>{
    const accountEmail = req.params.account
    if(accountEmail !== undefined){
        const account = await findUser(accountEmail);
        
        res.render('admins/account-detail',{account:account})
    }
    //res.redirect('back')
}

