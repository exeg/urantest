var config = require('config');
var express = require('express');
var i18n = require("i18n");
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var mongoose = require('mongoose');

var Content = require('./models/content');

console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));

mongoose.connect(config.get('Customer.dbConfig').mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});

/*checking if content exist
fs.stat('./locales/ru.json', function(err, stat) {
    if(err == null) {
        console.log('File exists');
    } else if(err.code == 'ENOENT') {
        // file does not exist
       console.log('Content not Found');
       process.exit();
    } else {
        console.log('Some other error: ', err.code);
        process.exit();
    }
});*/


//language module
i18n.configure({
  locales: ['en', 'ru'],
  queryParameter: 'lang',
  defaultLocale: 'ru',
  syncFiles: true,
  autoReload: true,
  directory: './locales'
});



var app = express();
app.use(i18n.init);

// Secure traffic only FOR PRODUCTION
/*app.all('*', function(req, res, next){
    console.log('req start: ',req.secure, req.hostname, req.url, app.get('port'));
  if (req.secure) {
    return next();
  };

 res.redirect('https://'+req.hostname+':'+app.get('secPort')+req.url);
});
*/

app.use(express.static('public'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', function(req, res) {
  //copy content from db
db.collection('Content').findOne({ "langfile" : 1 }, function (err, result) {
     if (err) return handleError(err);
   fs.writeFile('./locales/en.json', JSON.stringify(result.en), 'utf8');
   fs.writeFile('./locales/ru.json', JSON.stringify(result.ru), 'utf8');
  // fs.writeFile('./locales/en.json.tmp', JSON.stringify(result.en), 'utf8');
  // fs.writeFile('./locales/ru.json.tmp', JSON.stringify(result.ru), 'utf8');
   //console.log(result);
    res.render('index.ejs');
});
   
});

app.listen(3000, function(){
	console.log('Listening on port 3000');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
};

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;