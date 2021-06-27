import axios from "axios";

function compare(a, b) {
  if (a.date > b.date) {
    return -1;
  } else {
    return 1;
  }
}

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
      date: item.pubDate,
      content: item.content,
    }));
  } else {
    return false;
  }
}

async function refreshFeed() {
  let posts = [];
  let feeds_list = JSON.parse(localStorage.getItem("feeds")) || [];
  for (const feed of feeds_list) {
    if (feed.is_on) {
      posts.push.apply(posts, await getFeed(feed.url));
    }
  }
  return posts.sort(compare);
}

export { getFeed, refreshFeed };
