const admins = require('../models/admin');
const bcrypt = require('bcryptjs');
exports.getProfile = async (req, res) => {
    const account = req.user.username;
    console.log("----------account: " + account);
    const admin = await admins.findAdmin(account);
    res.render('admins/admin-profile', { admin: admin });
}

exports.postProfile = async (req, res) => {
    const account = req.user.username;
    const admin = await admins.findAdmin(account);
    const { image, name } = req.body;
    if (await admins.updateInfo(account, '', name)) {
        console.log("Update info successfully!");
        res.send(`<script>window.location.href = "${req.originalUrl}"; alert("Cập nhật thông tin thành công!"); </script>`);
    } else {
        console.log("Update info failed!");
        res.send(`<script>window.location.href = "${req.originalUrl}"; alert("Cập nhật thông tin thất bại"); </script>`);
    }
}

exports.postUpdatePassword = async (req, res) => {
    const account = req.user.username;
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const admin = await admins.findAdmin(account);
    const validPassword = await bcrypt.compare(oldPassword, admin.password);
    if (!validPassword) {
        res.send(`<script>window.location.href = "${req.originalUrl}"; alert("Mật khẩu cũ không đúng"); </script>`);
    } else {
        if (newPassword !== confirmPassword) {
            res.send(`<script>window.location.href = "${req.originalUrl}"; alert("Mật khẩu mới không khớp"); </script>`);
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(newPassword, salt);
            if (await admins.updatePassword(account, hashPassword)) {
                console.log("Update password successfully!");
                res.send(`<script>window.location.href = "${req.originalUrl}"; alert("Cập nhật mật khẩu thành công!"); </script>`);
            } else {
                console.log("Update password failed!");
                res.send(`<script>window.location.href = "${req.originalUrl}"; alert("Cập nhật mật khẩu thất bại"); </script>`);
            }
        }
    }
}