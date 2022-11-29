const { charity } = require('../models/charity');
const {user,findUser,findAllUser,addUser,removeUser,updateUser} = require('../models/user.js')

// exports.postAdminLogin = async (req,res,next) => {
//     console.log(req.body);
//     const existUser = await findUser(req.body.usermail)
//     console.log(existUser)
//     if(existUser !== null && existUser.password === req.body.password){
//         console.log('Login success')
//         res.render('admins/admin')
//     } else {
//         console.log('Wrong account or password')
//         res.redirect('/login')
//     }

    
// }

exports.getSumCharity = async (req,res,next) =>{

    const ListUser = await findAllUser();
    let sumCharity = 0;
    for (let i = 0; i < ListUser.length; i++) {
        if (ListUser[i].number_charity !== null) {
            sumCharity = sumCharity + ListUser[i].number_charity;
        }   
    }
    ListUser[0].number_charity = sumCharity;
    res.render('admins/admin', {charity : ListUser[0],adminLogin : true})
}

