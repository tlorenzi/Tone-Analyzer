const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const ToneAnalyzerV3 = require("ibm-watson/tone-analyzer/v3");
const { IamAuthenticator } = require("ibm-watson/auth");
const pino = require("express-pino-logger")();
const cors = require("cors");

app.use(cors());
app.options("*", cors()); // enable pre-flight
app.use(bodyParser.json());
app.use(pino);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client/build")));

const toneAnalyzer = new ToneAnalyzerV3({
  version: "2017-09-21",
  authenticator: new IamAuthenticator({
    apikey: "ENTER YOUR API KEY HERE",
  }),
  url:
    "https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/ddac658e-52c4-463a-810b-f54d2c3283e4",
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`);
});

app.post("/analyze", (req, res) => {
  // res.send({ postman: "TEST SENT RESPONSE!! " });
  console.log("!!!!!!!!!!!!!!!!!! REACHED ANALLYZED ROUTE ");
  let text = req.body.value;

  const toneParams = {
    toneInput: { text: text },
    contentType: "application/json",
  };

  toneAnalyzer
    .tone(toneParams)
    .then((toneAnalysis) => {
      let tones = toneAnalysis["result"]["document_tone"]["tones"];
      if (tones.length === 0) res.send({ toneResult: "No tones detected" });

      let str = "Tone(s) Found: ";

      for (let i = 0; i < tones.length; i++) {
        if (i !== 0) str = str + ", ";
        str = str + tones[i]["tone_name"];
      }
      res.send({ toneResult: str });
    })
    .catch((err) => {
      console.log("error:", err);
    });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
