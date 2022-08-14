//jshint esversion:6

const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

mailchimp.setConfig({
  apiKey: "e97cecee2ceaac1c31313b37675074f0-us18",
  server: "us18"
});

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  console.log(firstName, lastName, email);

  const listId = "7d43b09985";

  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email
  };

  const run = async () => {
    try{
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName
        }

    });

    console.log(response);
    res.sendFile(__dirname + "/success.html")
  }catch(err){
    console.log(err.status);
    res.sendFile(__dirname + "/failure.html");
  }
};

  run();
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});



//API Key
// e97cecee2ceaac1c31313b37675074f0-us18
//audience idea
//7d43b09985
