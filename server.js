require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const Metaphor = require("metaphor-node").default;

const app = express();
const metaphor = new Metaphor(process.env.METAPHOR_API_KEY);

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

app.post("/api/search", async (req, res) => {
  try {
    const { queryString, numResults = 10 } = req.body;
    const response = await metaphor.search(queryString, {
      numResults,
      useAutoprompt: true,
    });
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
