import axios from "axios";

let server_url =
  process.env.NODE_ENV == "prod"
    ? "/.netlify/functions/getfeed"
    : "http://localhost:9000/.netlify/functions/getfeed";

/**
 * call the lambda function and parses the rss feed
 * @param {string} url
 * @returns object || false
 */
async function getFeed(url) {
  let response = await axios
    .post(
      `${server_url}`,
      JSON.stringify({
        url: url,
      })
    )
    .catch((err) => {
      console.log(err);
    });
  if (response) {
    return response.data.feed.items.map((item) => ({
      feed_title: response.data.feed.title,
      title: item.title,
      creator: item.creator,
      link: item.link,
      date: Date.parse(item.pubDate),
      content: item.content,
    }));
  } else {
    return false;
  }
}

export { getFeed };
