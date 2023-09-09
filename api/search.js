// api/search.js

const Metaphor = require("metaphor-node");
const metaphor = new Metaphor(process.env.METAPHOR_API_KEY);

module.exports = async (req, res) => {
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
};
