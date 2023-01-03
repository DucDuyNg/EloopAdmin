const bcrypt = require('bcryptjs');
const admin = require('../models/admin.js')

function createAccountAdmin(name, account, password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const add = admin.addAdmin(name, account, hash)
    if (add) {
        return true
    }
    return false
}

console.log(createAccountAdmin('admin', 'admin', 'admin'))