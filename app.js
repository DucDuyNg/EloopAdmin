const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const handlebars = require('express-handlebars')

const homeRouter = require('./home/homeRouter');
const indexRouter = require('./routes/index');


const usersRouter = require('./users/userRouter');
const feedbackRouter = require('./routes/feedback');
const charityRouter = require('./charities/charityRouter');


const loginRouter = require('./login/loginRouter');
const adminRouter = require('./admins/adminRouter');
const productRouter = require('./products/productRouter');
const recycleRouter = require('./recycles/recycleRouter');
const distributorRouter = require('./distributors/distributorRouter');
const profileRouter = require('./profile/profileRouter');
const accountListRouter = require('./account-list/accountListRouter');
const customerOrderRouter = require('./customer-order/customerOrderRouter');

const app = express();
let port = process.env.PORT || 80

// view engine setup
app.engine('.hbs', handlebars.engine({
  extname: '.hbs',
  runtimeOptions:{allowProtoPropertiesByDefault:true,
  allowedProtoMethodsByDefault:true}
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//
app.listen(port || 80, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})



// app.use('/home', homeRouter);
// app.use('/menu',productRouter);
// app.use('/', homeRouter);
// app.use('/user', usersRouter);
// app.use('/feedback', feedbackRouter);
app.use('/login', loginRouter);
app.use('/admin', adminRouter);
app.use('/product', productRouter);
app.use('/recycle', recycleRouter);
app.use('/distributor', distributorRouter);
app.use('/profile', profileRouter);
app.use('/account-list', accountListRouter);
app.use('/customer-order', customerOrderRouter);
// app.use('/charity', charityRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
