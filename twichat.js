
  var fs    = require('fs'),
      nconf = require('nconf');
 
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

console.log(nconf.get());

// Twilio Credentials 
var accountSid = nconf.get("twilio").accountSid; 
var authToken = nconf.get("twilio").authToken; 

/* 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 

client.messages.create({ 
    to: "+15102579756", 
    from: "+15102579756", 
    body: "body", 
    //mediaUrl: "http://farm2.static.flickr.com/1075/1404618563_3ed9a44a3a.jpg",  
}, function(err, message) { 
    console.log(message.sid); 
});
*/

console.log("accountSid", accountSid);
console.log("authToken", authToken);
