import axios from "axios";

/**
 * call the lambda function and parses the rss feed 
 * @param {string} url 
 * @returns object || false 
 */
async function getFeed(url) {
  let response = await axios
    .post(
      "http://localhost:9000/.netlify/functions/getfeed",
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
