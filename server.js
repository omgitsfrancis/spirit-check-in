// https://api.spirit.com/dotrez2/api/nsk/nk/booking/retrieve?lastName=Enriquez&recordLocator=324324
const request = require("request");

const LAST_NAME = "Enriquez";
const CODE = 324324;

const subscriptionKey = "d915d5442ee6427bb58e33dd93e253b8";

const options = {
  headers: {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": subscriptionKey,
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkb3RSZXpXZWIiLCJqdGkiOiJmYmVjOWJiMC05M2I3LTBmZDMtNzY5NS0yNWM1Nzk4ZDczNjUiLCJpc3MiOiJBUEkifQ.T1Ybrm5E8xz3IJXg3nNoowcdqfyZYkOA6LU3v01GJL8"
  }
};

// request.get(
//   "https://api.spirit.com/dotrez2/api/nsk/v1/token",options,
//   function(err, res, body) {
//     console.log("error:", err); // Print the error if one occurred
//     console.log("statusCode:", res && res.statusCode); // Print the response status code if a response was received
//     console.log("body:", body); // Print the HTML for the Google homepage.
//   });

// request.get("https://api.spirit.com/dotrez2/api/nsk/v1/token", function(err,res, body){
//   console.log('error:', err); // Print the error if one occurred
//   console.log('statusCode:', res && res.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// },getBooking(LAST_NAME, CODE))

function getToken() {
  request.post(
    "https://api.spirit.com/dotrez2/api/nsk/v1/token",
    {
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": subscriptionKey
      },
      body: JSON.stringify({
        applicationName: "dotRezWeb"
      })
    },
    function(err, res, body) {
      console.log("error:", err); // Print the error if one occurred
      console.log("statusCode:", res && res.statusCode); // Print the response status code if a response was received
      console.log("body:", body); // Print the HTML for the Google homepage.
    }
  );
}

function getBooking(lastName, code) {
  request.get(
    `https://api.spirit.com/dotrez2/api/nsk/nk/booking/retrieve?lastName=${LAST_NAME}&recordLocator=${CODE}`,
    options,
    function(err, res, body) {
      console.log("error:", err); // Print the error if one occurred
      console.log("statusCode:", res && res.statusCode); // Print the response status code if a response was received
      console.log("body:", body); // Print the HTML for the Google homepage.
    }
  );
}

// getBooking(LAST_NAME, CODE);
token()
