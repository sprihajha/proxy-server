const Metaphor = require("metaphor-node");
const metaphor = new Metaphor(process.env.METAPHOR_API_KEY);

module.exports = async (req, res) => {
  try {
    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow any origin
    res.setHeader("Access-Control-Allow-Methods", "GET, POST"); // Allow only GET and POST methods
    res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow only Content-Type header

    // Handle preflight request. Don't run the rest of the route for a preflight request.
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

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
