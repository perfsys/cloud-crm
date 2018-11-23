const serverless = require("serverless-http");
const express = require("express");
const Mailer = require("./controllers/AWSMailer.js");

const app = express();
const mailman = new Mailer();

app.get("/tracer/", function(request, response) {

  var a = new Promise(function(resolve, reject) {
    //let {item} = request;
    let email = {
      from: "Cloud CRM <robakidzegeorge@gmail.com>"
      ,to: ["robakidzegeorge@gmail.com"]
      ,subject: "New contact added"
      ,body_text: "New contact was added into your contact list."
      ,body_html: "<html><head></head><body> + JSON.stringify(item) + </body></html>"
      ,encoding: "UTF-8"
    };
    mailman.email(email, function(err) {
      if(err != null) reject(err);
      else resolve("some data");
    });
  });
  a.then(function(data) {
    response.end(data.toString());
  });

});

module.exports.app = serverless(app);
