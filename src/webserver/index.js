// Create simple webserver with express and serve index.html which is located one level up in the frontend folder:
const https = require('https'); 
const express = require('express');
const pem = require('pem');

const port = 443;

pem.createCertificate({ days: 365, selfSigned: true }, (err, keys) => {
	  if (err) {
	    throw err
	  }

	  const app = express();

	app.use(express.static('../frontend'));

	  app.get('/', (req, res) => {
	    res.sendFile('index.html');
	  })

  https.createServer({ key: keys.clientKey, cert: keys.certificate }, app).listen(port, () => {
	console.log(`Listening on port ${port}`);
  })
})

