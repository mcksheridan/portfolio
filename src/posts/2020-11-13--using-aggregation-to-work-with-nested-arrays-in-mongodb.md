---
title: "Using Aggregation to Work With Nested Arrays in MongoDB"
date: "2020-11-13"
layout: layouts/post.njk
tags: 
  - "aggregation"
  - "arrays"
  - "databases"
  - "mongodb"
  - "tiktok-project"
description: "After restructuring my database to accommodate user authentication, I was faced with a new challenge: displaying and manipulating information from arrays."
---

After [restructuring my database to accommodate user authentication](../2020-11-13--creating-one-to-many-relationships-with-embedded-documents-in-mongodb/), I was faced with a new challenge: displaying and manipulating information from arrays.

Before restructuring the database, I had implemented pagination and a way for users to sort videos and have their sorting preference remembered. The variable `videoLimitPerPage` established the number of videos a user would see on each page before needing to go another page. I added a `page` parameter for routes that displayed videos and stored the current page in the variable `page`. Users could store their personal preference for how videos should be sorted in a variable called `sortVideoOption`, and this variable would in turn be stored as a local variable in `app.locals.sortVideoOption`. I implemented these things by creating a function called "video\_list" and accessing its callback in my views to display videos.

```
video_list: function(callback) {
  Video
    .find({}, callback)
    .limit(videoLimitPerPage)
    .skip(videoLimitPerPage * (page - 1))
    .sort(app.locals.sortVideoOption)
}
```

After restructuring my database, I no longer had a video model. Instead, each user had a "videos" array that video objects. Therefore, I would have to completely rethink how I accessed video data.

Initially, I tried to display my data by finding a specific user and populating it with the objects in the videos array.

```
User
  .find({ email : req.user.email }, 'videos', callback)
  .limit(videoLimitPerPage)
  .skip(videoLimitPerPage * (page - 1))
  .sort(app.locals.sortVideoOption)
```

After editing the way my views handled callback data, I was able to view videos added directly to a specific user account and use the `.length` array property to get an accurate count of how many video objects were in my videos array. However, my pagination and sorting did not function as intended. After all, I was only retrieving one user, so there wasn't enough to limit or sort.

After searching for how to access nested arrays in MongoDB, I began to learn about aggregation. Essentially, aggregation means taking data and processing it in some way to get a result. MongoDB has several ways of taking advantage of aggregation, but, in this case, I wanted to use the aggregation pipeline. The aggregation pipeline lets you process data in stages. Every subsequent stage processes the data further.

I began to create my aggregation pipeline by thinking of the criteria I wanted to use. First, I would need to access the correct user. MongoDB advises [filtering early on](https://docs.mongodb.com/manual/core/aggregation-pipeline/#early-filtering) in the aggregation pipeline, so I decided to a `$match` filter for finding the correct user.

```
$match: {email: req.user.email}
```

Once I had the correct user, I would then need to access that user's videos array. To do so, I used the $unwind operator to deconstruct the videos array. This would allow me to access the individual objects within the videos array.

```
$unwind: '$videos'
```

After deconstructing the videos array, I wanted to sort results before anything related to pagination because all of the videos should be sorted together, not on a page-by-page basis. This presented me with an interesting problem. When using cursor `.sort`, as I had done previously, results would load properly even if the user had not requested a sorting method (i.e. `app.locals.sortVideoOption` was undefined). However, when using aggregation, results would not load if there was a aggregation `$sort` operator and no valid means of sorting. I wanted to create a default sort condition that could be used if the user had not requested a specific sorting method.

To create this default sort condition, I created a new function before I began the aggregation pipeline process. I called this function getSortOption and gave it an argument called userInput. I created a conditional statement based on whether userInput existed. If userInput was undefined, I returned an object sorting by date bookmarked as the default sort option. If there was any userInput, I returned that instead. In this case, userInput would be form data submitted in the following format: 'videos.sortOption,sortDirection.' I used the `.split()` method to separate the form data into two separate variables: the field to be sorted and the direction for sorting. I then returned these variables as an object.

```
function getSortOption(userInput) {  
  if (userInput === undefined) {  
    const defaultSortOption = {'videos.dateBookmarked' : 1}  
    return defaultSortOption  
  } else {  
    const optionArray = userInput.split(',')  
    const sortField = optionArray[0]  
    const sortDirection = parseInt(optionArray[1])  
    const userSortOption = {[sortField] : sortDirection}  
    return userSortOption  
  }  
}
```

I then called this function in the `$sort` operator and passed `app.locals.sortVideoOption` to it as the argument for userInput.

```
$sort: getSortOption(app.locals.sortVideoOption)
```

I then took the `.skip` and `.limit` cursor methods and changed them into `$skip` and `$limit` aggregation operators.

```
$skip: (videoLimitPerPage * (page - 1))
$limit: videoLimitPerPage
```

Finally, I used the $group operator to return output, or a document. The $group operator has to be used with an accumulator operator, so I decided to use the $push operator. That way, I would have an array with all of the appropriately matched, sorted, skipped, and limited results. To include all of the results in the same array, I chose an id of null.

```
$group: { _id: null, videos: {$push:'$videos'}}
```

With all of these considerations made, my final aggregation looked like this:

```
User.aggregate([
  { $match: {email: req.user.email} },
  { $unwind: '$videos' },
  { $sort: getSortOption(app.locals.sortVideoOption) },
  { $skip: (videoLimitPerPage * (page - 1)) },
  { $limit: videoLimitPerPage },
  { $group: { _id: null, videos: {$push:'$videos'} } },
], callback)
```

Previously, I used this function (the video\_list) function to get a tally of the videos in the array. With the `$limit` operator in place, the length of the array always appeared to be 15 or less, even when more videos were available. Finally, I created a separate function to find the length of videos in the array. Originally, I recycled my original function and found the length of the video array in my views, as I did before implementing the aggregation framework.

```
User.find({ email : req.user.email }, 'videos', callback)
```

However, I wanted to see if I could find the number of videos in the videos array using the aggregation framework as well. I started off by using the same `$match` criteria and using `$unwind` to access the videos array. I used the `$group` operator next, but instead of using `$push` to add the videos to my callback, I used `$sum` to tally up the total number of videos in the array.

```
User.aggregate([
  { $match: { email: req.user.email } },
  { $unwind: '$videos' },
  { $group: { _id: null, count: { $sum: 1 } } }
], callback)
```
