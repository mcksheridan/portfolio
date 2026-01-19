---
title: "Following URLs with Redirect Requests in Node.js with Follow Redirects"
date: "2020-09-14"
layout: layouts/post.njk
tags: 
  - "api"
  - "json"
  - "node-js"
  - "npm"
  - "tiktok-project"
description: "While building out my TikTok app, I encountered a problem that made storing and displaying data difficult: the TikTok API stopped allowing response requests from mobile TikTok links. When using the Copy Link function on the native TikTok app, the app produces a shortened URL."
---

While building out my TikTok app, I encountered a problem that made storing and displaying data difficult: the TikTok API stopped allowing response requests from mobile TikTok links. When using the "Copy Link" function on the native TikTok app, the app produces a shortened URL.

For example, TikTok uses this video for their API example: [https://www.tiktok.com/@scout2015/video/6718335390845095173](https://www.tiktok.com/@scout2015/video/6718335390845095173). The link to the response data is formatted like this: [https://www.tiktok.com/oembed?url=https://www.tiktok.com/@scout2015/video/6718335390845095173](https://www.tiktok.com/oembed?url=https://www.tiktok.com/@scout2015/video/6718335390845095173).

<figure>
<img alt="Screenshot of API data provided by TikTok for video by user scout2015" src="/media/2020/09/images/Screen-Shot-2020-09-10-at-4.00.34-PM-1024x594.png" />
</figure>

The mobile link is formatted like this: [https://vm.tiktok.com/ZMJAfjEYF/](https://vm.tiktok.com/ZMJAfjEYF/), and TikTok [does not support that URL scheme](https://oembed.com/).

<figure>
<img alt="Screenshot of API data with a status message saying something went wrong" src="/media/2020/09/images/Screen-Shot-2020-09-10-at-4.17.34-PM.png" />
</figure>

When viewing TikTok from their web applications, for both desktop and mobile, the link to the video that the user can send is properly formatted for this URL scheme.

Unfortunately, the ID provided by the native link does not directly provide the information (i.e. author name and web video ID) needed to construct the web application URL. However, when you enter the link from the native application into a browser, it redirects the user to the lengthier, web application URL.

To solve this problem of not being able to retrieve JSON data from mobile URL schemes, I used the [Follow Redirects](https://github.com/follow-redirects/follow-redirects) npm package. When a user adds a video, we use a get request first to find the destination (if any) that the URL redirects to. This guarantees that a user can add a URL from the web application or the native mobile application, and the desired JSON data (i.e. author name, author URL, and title) can be fetched and stored in the MongoDB database with its corresponding video.

```
https.get(video_url, response => {
  const redirectedUrl = response.responseUrl
  fetch(`https://www.tiktok.com/oembed?url=${redirectedUrl}`)
    .then((fetchResponse) => fetchResponse.json())
    .then((data) => {
      videodetail = { video_url: redirectedUrl }
    videodetail.title = data.title
  }}
```

Relatedly, the image from the thumbnail URL is not stored in the database at all because TikTok occasionally changes the URLs for thumbnail URLs, so the latest URL must be retrieved regularly. Likewise, the JavaScript in the front end of the application performs a separate fetch request:

```
const url = videoLinks[i].getAttribute('href') // The link used in the template engine comes is the destination of the redirect, not the original URL scheme for the native mobile application  

fetch(`https://www.tiktok.com/oembed?url=${url}`)
  .then((response) => response.json())
  .then((data) => {
    if (data.thumbnail_url === undefined) {
      videoImages[i].style.backgroundImage = "url('/../images/videounavailable.jpg')"
  } else {
    videoImages[i].style.backgroundImage = `url(${data.thumbnail_url})`
  }
})
```
