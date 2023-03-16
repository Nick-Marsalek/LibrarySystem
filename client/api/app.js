var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
var loginPostRouter = require('./routes/loginPost');
var checkTokenRouter = require('./routes/checkToken')
var searchPostRouter = require('./routes/searchPost');
var registerRouter = require('./routes/registerPost');
var selectRouter = require('./routes/selectPost');
var insertRouter = require('./routes/insertPost');
var deleteLoanRouter = require('./routes/deleteLoan');
var countRouter = require('./routes/countRoute');
var userInfoTokenRouter = require('./routes/userInfoToken');
var employeeLoginPostRouter = require('./routes/employeeLoginPost');
var adminLoanRouter = require('./routes/adminLoans')
var revokeLoanRouter = require('./routes/revokeLoan')
var viewBooksRouter = require('./routes/viewBooks')
var deleteBookRouter = require('./routes/deleteBook')
var addBookRouter = require('./routes/addBook')
var viewUsersRouter = require('./routes/viewUsers')
var deleteUserRouter = require('./routes/deleteUser')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
app.use('/loginPost', loginPostRouter);
app.use('/searchPost', searchPostRouter);
app.use('/checkToken', checkTokenRouter)
app.use('/userInfoToken', userInfoTokenRouter)
app.use('/register', registerRouter)
app.use('/selectPost', selectRouter);
app.use('/insertPost', insertRouter);
app.use('/deleteLoan', deleteLoanRouter);
app.use('/countPost', countRouter);
app.use('/employeeLoginPost', employeeLoginPostRouter);
app.use('/adminLoans', adminLoanRouter);
app.use('/revokeLoan', revokeLoanRouter)
app.use('/viewBooks', viewBooksRouter)
app.use('/deleteBook', deleteBookRouter)
app.use('/addBook', addBookRouter)
app.use('/viewUsers', viewUsersRouter)
app.use('/deleteUser', deleteUserRouter)

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
