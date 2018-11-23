"use strict";

const AWS = require("aws-sdk");
const express = require("express");

const AWSMailer = function() {

  let SIMPLE_EMAIL_SERVICE;

  (function /*constructor*/(obj) {
    AWS.config.loadFromPath("./config/aws-config.json");
    SIMPLE_EMAIL_SERVICE = new AWS.SES();
  })(this);

  /*email obj. {
    from: "Name <email>"
    to: ["email 1", "email 2", ..., "email n"]
    subject: "email subject"
    body_text: email text view
    body_html: email html view
    encoding: email charset
  }*/
  this.email = function(email, callback) {
    if(email == null) return false;
    var params = {
      Source: email.from
      ,Destination: {
        ToAddresses: email.to
      }
      ,Message: {
        Subject: {
          Data: email.subject
          ,Charset: email.encoding
        }
        ,Body: {
          Text: {
            Data: email.body_text
            ,Charset: email.encoding
          }
          ,Html: {
            Data: email.body_html
            ,Charset: email.encoding
          }
        }
      }
    };
    SIMPLE_EMAIL_SERVICE.sendEmail(params, callback);
  }
}

module.exports = AWSMailer;
