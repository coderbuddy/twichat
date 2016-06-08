
  var fs    = require('fs'),
      nconf = require('nconf');
const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
  // 
  // Setup nconf to use (in-order): 
  //   1. Command-line arguments 
  //   2. Environment variables 
  //   3. A file located at 'path/to/config.json' 
  // 
var configFile = "config.json";
    if (!fs.existsSync(configFile)) {
       console.log("file not found");
    }


  nconf.argv()
   .env()
   .file({ file: configFile });

//console.log(nconf.get());

// Twilio Credentials 
var accountSid = nconf.get("twilio").accountSid; 
var authToken = nconf.get("twilio").authToken; 

 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 

app.get('/twichat.html', function (req, res) {
   res.sendFile( __dirname + "/" + "twichat.html" );
})

app.post('/send', urlencodedParser, function (req, res) {
  console.log("req.body", req.body);
  client.messages.create({ 
    to: "+15102579756", 
    from: "+15005550006", 
    body: req.body.content, 
    //mediaUrl: "http://farm2.static.flickr.com/1075/1404618563_3ed9a44a3a.jpg",  
   }, function(err, message) { 
    if (err) {
     console.log("err", err);
    }
    {
     console.log("message", message); 
    }
  });
  res.send('Hello from Express!');
})

app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
})





console.log("accountSid", accountSid);
console.log("authToken", authToken);
