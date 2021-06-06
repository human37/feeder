let Parser = require("rss-parser");
let parser = new Parser();

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
};

exports.handler = async function(event) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "hello preflight how is your day?",
    };
  }
  console.log(event.body);
  const { url } = JSON.parse(event.body);
  try {
    let feed = await parser.parseURL(url);
    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        feed,
      }),
    };
  } catch (err) {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({
        data: err,
      }),
    };
  }
};
