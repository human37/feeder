import axios from "axios";

function compare(a, b) {
  if (a.date > b.date) {
    return -1;
  } else {
    return 1;
  }
}

async function getFeed(url, check_if_valid = false) {
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
  if (check_if_valid) {
    if (response) {
      return true;
    } else {
      return false;
    }
  }
  return response.data.feed.items.map((item) => ({
    title: item.title,
    creator: item.creator,
    link: item.link,
    date: item.pubDate,
    content: item.content,
  }));
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
