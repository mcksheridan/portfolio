---
title: "Creating One-to-Many Relationships with Embedded Documents in MongoDB"
date: "2020-11-13"
layout: layouts/post.njk
tags: 
  - "embedded-documents"
  - "mongodb"
  - "tiktok-project"
description: "After adding user authentication, I had three separate schemas for my application: a user schema, a video schema, and a list schema (that referenced videos created using the video schema). After creating an account and logging in, users could see any video or list that any user had created. However, users should have only been able to see the videos and lists that they themselves added. I had to create some sort of relationship between the user and videos and lists of videos."
---

After adding user authentication, I had three separate schemas for my application: a user schema, a video schema, and a list schema (that referenced videos created using the video schema). After creating an account and logging in, users could see any video or list that any user had created. However, users should have only been able to see the videos and lists that they themselves added. I had to create some sort of relationship between the user and videos and lists of videos.

MongoDB outlines two separate methods for creating one-to-many relationships: [embedded documents](https://docs.mongodb.com/manual/tutorial/model-embedded-one-to-many-relationships-between-documents/) and [document references](https://docs.mongodb.com/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/). After reviewing both methods, it looked like embedded documents adhered more to best practices in MongoDB. Based on this, I decided to replace my video and list schemas with a single user schema. Each user schema would retrieve all of the information relevant to any one particular user.

I began the process of redesigning my database by adding the information from the video schema into an array of objects on my user schema.

```
videos: [{
  url: {
  type: String,
  match: /tiktok.com\//i,
  },
  id: { type: String, },
  title: { type: String, },
  authorUrl: { type: String, },
  authorName: { type: String, },
  dateAdded: { type: Date, },
  dateBookmarked: {
  type: Date,
  default: Date.now
  } 
}]
```

Without the video schema, I would need to change the process by which videos were added to the database. I also took this as an opportunity to clean up my existing code and use an async waterfall function to hand off callback data to the next function.

First, I created a function that [followed the URL](../2020-09-14--following-urls-with-redirect-requests-in-node-js-with-follow-redirects/) the user submitted to see if there were any redirects. Next, I created another function that used that redirected URL to check for API data. If the API data could be successfully fetched, the next function I created then checked to confirm that it was not undefined. After that, I used a different function to [determine the ID TikTok assigned to the video](../2020-10-30--getting-tiktok-date-information-in-node-js/). My next function checked for duplicate videos within the database.

This duplicate checker was the first meaningful deviation from my old code. Instead of searching through videos as separate documents, I was searching through the videos array of my user model.

Previously, I could've found the TikTok ID of a video by searching for this:

```
Video.findOne( {'id': tiktokId } )
```

However, I now needed to search users instead of videos, and, after finding the correct user, I needed to search their video array for a matching TikTok ID. I used the `$and` operator to look for the user currently logged in and a video ID in their videos array that matched the TikTok ID in question.

```
User.findOne( { $and: [ { email: req.user.email }, { 'videos.id': tiktokId } ] } )```

After checking for duplicate videos, I created four functions (get binary ID, get thirty two left bits, get decimal from bits, and get date added) to [find the date the video was created](../2020-10-30--getting-tiktok-date-information-in-node-js/) on. I created another function to save all of the video data to a new object.

The way the video data was saved to a variable represents another deviation from my previous code. Previously, I created a object called and added TikTok data to that object. After I finished adding all of the necessary data to the object, I created a variable that represented a new video.

```
const newVideo = {  
url: redirectedUrl,  
id: tiktokId,  
title: tiktokData.title,  
authorUrl: tiktokData.author_url,  
authorName: tiktokData.author_name,  
dateAdded: dateAdded,  
dateBookmarked: Date.now()  
}

const video = new Video(newVideo)
```

However, in my new code, I could not use the `new` operator. I was not creating a new user; I was only adding something to a user. To add something to my user's video array, I used the `push` method instead in my final function.

```
user.videos.push(newVideo)
```

In this final function, I also took the last step of saving this updated information. Previously, I saved the video itself.

```
video.save((error) => { if (error) { return next(error) } })
```

This time, I saved the user (with its updated video array) instead.

```
user.save((error) => { if (error) { return next(error) } })
```

Now, each new video would be associated with the correct user _and_ would be an embedded document within the user.
