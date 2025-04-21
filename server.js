const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


    app.post("/", async (req, res) => {
    try {
        const response = await axios.post(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        {
            inputs: req.body.text,
        },
        {
            headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`,
            "Content-Type": "application/json",
            },
        }
        );

        res.json(response.data);
        
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
    });


app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
