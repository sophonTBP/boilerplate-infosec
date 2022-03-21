const express = require('express');
const helmet = require('helmet');
const app = express();

let timeInSeconds=90*24*60*60











helmet({
  hidePoweredBy:true,
  noSniff:true,
  xssFilter:true,
  ieNoOpen:true,
  hsts:{
    maxAge: timeInSeconds, force: true
  },
  noCache:true,
  
  frameguard: {         // configure
    action: 'deny'
  },
  contentSecurityPolicy: {    // enable and configure
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'trusted-cdn.com'] 
      
    }
  },
  dnsPrefetchControl: true     // disable
})











































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
