const {user,findUser,findAllUser,addUser,removeUser,updateUser} = require('../models/admin.js')

exports.postAdminLogin = async (req,res,next) => {
    console.log(req.body);
    const existAdmin = await findUser(req.body.usermail)
    console.log(existAdmin)
    if(existAdmin !== null && existAdmin.password === req.body.password){
        console.log('Login success')
        res.render('admins/admin')
    } else {
        console.log('Wrong account or password')
        res.redirect('/login')
    }

    
}