require('dotenv').config()
const request = require("request-promise");


var bodyParser = require("body-parser");

const subscriptionKey = "d915d5442ee6427bb58e33dd93e253b8";

class Session {
  constructor(lastName, code) {
    this.lastName = lastName;
    this.code = code;
    this.authKey = "";
    this.subscriptionKey = subscriptionKey;
  }

  getAuthHeaders() {
    return {
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        Authorization: `Bearer ${this.authKey}`
      }
    };
  }

  getToken() {
    return request.post(
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
      (err, res, body) => {
        console.log("error:", err); // Print the error if one occurred
        console.log("statusCode:", res && res.statusCode); // Print the response status code if a response was received
        // console.log("body:", body); // Print the HTML for the Google homepage.

        this.authKey = JSON.parse(body).data.token;

        if (this.authKey) {
          console.log("GOT KEY");
        } else {
          console.log("NO KEY");
        }
      }
    );
  }

  getReservation() {
    return request.get(
      `https://api.spirit.com/dotrez2/api/nsk/nk/booking/retrieve?lastName=${this.lastName}&recordLocator=${this.code}`,
      {
        ...this.getAuthHeaders()
      },
      function(err, res, body) {
        console.log("error:", err); // Print the error if one occurred
        console.log("statusCode:", res && res.statusCode); // Print the response status code if a response was received
        console.log("body:", body); // Print the HTML for the Google homepage.
      }
    ).on('error', (err) =>
      {}
    );
  }
}

var test = new Session(process.env.LAST_NAME, process.env.CODE);

test
  .getToken()
  .then(() => test.getReservation())
  .then();
