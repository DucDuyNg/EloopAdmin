const mail = require('./mailFeedback')
exports.getFeedback = (req,res,next) => {
    res.render('features/feedback');
}
exports.postFeedback = (req,res,next) => {
    const name = req.body.name
    const email = req.body.email
    const message = req.body.message
    // Send mail
    mail(name,email,message)
    res.send(`${name}  ${email}   ${message}`);
}
