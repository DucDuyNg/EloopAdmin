const {user,findUser,addUser,updateUser} = require("../models/user.js")

exports.getUserLogin = (req,res,next) => {
    res.render('features/login')
}

exports.postUserCreate = (req,res,next) => {
    const userEmail= req.body.email
    if(userEmail.search('@') > 0 && userEmail.search('.com') > 0){
        console.log('Register success')
        const userPassword = req.body.password
        const userPassword2 = req.body.password2
        addUser(userEmail,userPassword,userPassword2)
        res.render('users/home')
    }
    else{
        console.log('Failed')
        res.redirect('/user')
    }
    
}


exports.postUserLogin = async (req,res,next) => {
    console.log(req.body);
    const existUser = await findUser(req.body.username)
    if(existUser !== null && existUser.password === req.body.password){
        console.log('Login success')
        res.render('users/home')
    } else {
        console.log('Wrong account or password')
        res.redirect('/user')
    }
}

// exports.postUserChangePassword = async (req,res,next) => {
//     const existUser = await findUser(req.body.username)
//     if(existUser !== null && existUser.password === req.body.password){
//         console.log('Login success')
//         res.render('users/home')
//     }else{
//         console.log('Wrong account or password')
//         res.redirect('/user')
//     }
// }
