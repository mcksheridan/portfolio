---
title: "Deleting Multiple Documents In One Request With Hidden Form Input"
date: "2020-09-21"
layout: layouts/post.njk
tags: 
  - "express"
  - "javascript"
  - "mongodb"
  - "nodejs"
  - "tiktok-project"
description: "Creating a router and a controller to delete a single video by ID was fairly straightforward. However, this method would give each video its own unique route where a user could then click to delete a video. This sounded pretty tedious, so it was important to me that users could select as many videos as they liked and then click a delete icon to remove videos from their collection of favorites."
---

Creating a router and a controller to delete a single video by ID was fairly straightforward. However, this method would give each video its own unique route where a user could then click to delete a video. This sounded pretty tedious, so it was important to me that users could select as many videos as they liked and then click a "delete" icon to remove videos from their collection of favorites.

In the template engine, I created a "cell" for each video in a grid. Each video came with a checkbox whose value was the ID of the video. I wanted a user to be able to select a checkbox or multiple checkboxes and click the delete icon in the menu. At this point, I wanted some sort of alert asking the user to confirm that they wanted to delete the items, and then I wanted the items to be deleted from the database.

It took several steps, in several different files, to accomplish this.

First, I created a controller to handle POST requests for deleting videos. Secondly, I created a corresponding route for the POST request. Third, I created a form that was empty, aside from having a submit button. I used [Material Icons](https://material.io/resources/icons/?style=baseline) to retool the submit button to look like a trash icon. Although the form was connected to the POST method I had previously created, it wasn't submitting any data for me to use in the controller. I needed to associate the data from the checkboxes the user had (or had not) marked.

To do this, I created a click event in JavaScript that would determine how many videos a user had checked, if any at all, and store this value as an array called `checkedVideos`. The user would then by asked if they were sure they wanted to delete the selected videos. If the user confirmed that they wanted to delete the selected videos, the data from the videos they selected would be appended to the form and the form would be submitted.

I decided to use a for loop to iterate through all of the values of the array. Each value represented one checked video, and I appended the value of that checked video (i.e. its unique ID in the database) to the form before submitting it.

```
for (let i = 0; i < checkedVideos.length; i++) {
  const deletedVideo = document.createElement('input')
  deletedVideo.type = 'hidden'
  deletedVideo.name = 'deleted_video'
  deletedVideo.value = checkedVideos[i].value
  deleteForm.appendChild(deletedVideo)
}

deleteForm.method = 'POST'
deleteForm.action = 'video/delete'
deleteForm.submit()
```

In the controller, I stored the video IDs in an array (appropriately named `videoid`) and iterated through that array to delete each video ID stored within the array.

```
Video.remove({'_id' : {$in: videoid}})
```
