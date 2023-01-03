const admin = require('../models/admin.js')
const bcrypt = require('bcryptjs');
//const sessionStorage = require('sessionstorage')
exports.showAdminLogin = (req, res, next) => {
    res.render('features/login')
}
exports.checkUserCredential = async (account, password) => {
    console.log(account)
    console.log(password)
    const user = await admin.findAdmin(account)
    if (!user) return null;
    if (await bcrypt.compare(password, user.password))
        return user;
    return null;
}
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
