const express = require("express");
const mathOps = require("./math.operations");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health Check Endpoint
app.get("/health", (req, res) => {
    res.status(200).send("Server is healthy");
});

// Basic Math Operations
app.post("/add", (req, res) => {
    const { a, b } = req.body;
    return res.status(200).json({ result: mathOps.add(a, b) });
});

app.post("/subtract", (req, res) => {
    const { a, b } = req.body;
    return res.status(200).json({ result: mathOps.subtract(a, b) });
});

app.post("/multiply", (req, res) => {
    const { a, b } = req.body;
    return res.status(200).json({ result: mathOps.multiply(a, b) });
});

app.post("/divide", (req, res) => {
    const { a, b } = req.body;
    const result = mathOps.divide(a, b);
    if (result === null) {
        return res.status(400).send("Cannot divide by zero");
    }
    return res.status(200).json({ result });
});

// Advanced Math Operations
app.post("/power", (req, res) => {
    const { base, exponent } = req.body;
    return res.status(200).json({ result: mathOps.power(base, exponent) });
});

app.post("/sqrt", (req, res) => {
    const { number } = req.body;
    const result = mathOps.sqrt(number);
    if (result === null) {
        return res.status(400).send("Cannot find square root of a negative number");
    }
    return res.status(200).json({ result });
});

// Start the server
app.listen(PORT, (error) => {
    if (error) {
        console.log("Error in starting the server");
    } else {
        console.log(`Server started at port - ${PORT}`);
    }
});
