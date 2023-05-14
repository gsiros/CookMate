// Create simple webserver with express and serve index.html which is located one level up in the frontend folder:
const https = require('https'); 
const express = require('express');
const pem = require('pem'); 

pem.createCertificate({ days: 1, selfSigned: true }, (err, keys) => {
	  if (err) {
	    throw err
	  }

	  const app = express();

	app.use(express.static('../frontend'));

	  app.get('/', (req, res) => {
	    res.sendFile('index.html');
	  })

  https.createServer({ key: keys.clientKey, cert: keys.certificate }, app).listen(3000, () => {
	console.log("Listening on port 3000");
  })
})

