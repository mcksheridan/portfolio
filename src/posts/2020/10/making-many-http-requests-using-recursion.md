---
title: "Making Many HTTP Requests Using Recursion"
date: "2020-10-13"
layout: layouts/post.njk
category: "tiktok bookmarks"
tags: 
  - "asynchronous"
  - "express"
  - "nodejs"
  - "recursion"
  - "tiktok-project"
description: "One of the most important functions for my TikTok bookmark app is the ability to import an entire list of liked videos. During the process of testing files for liked videos, I realized that longer lists (with thousands of videos) struggled to import all files in one attempt. After examining 150 videos or so, I started receiving error messages about the connect timing out. I fiddled with the asynchronous code I created (and upgraded the for loop I was using to an ES6 for...of loop in the process), but I continued to see the same error messages after a minute or so of processing HTTP get requests."
---

One of the most important functions for my TikTok bookmark app is the ability to [import an entire list](../../09/using-data-uploaded-from-text-files-in-node-express) of liked videos. During the process of testing files for liked videos, I realized that longer lists (with thousands of videos) struggled to import all files in one attempt. After examining 150 videos or so, I started receiving error messages about the connect timing out. I fiddled with the asynchronous code I created (and upgraded the for loop I was using to an ES6 "for...of" loop in the process), but I continued to see the same error messages after a minute or so of processing HTTP get requests.

To solve this, I decided to add a delay between requests using `setTimeout`. However, after running some more tests, I realized that `setTimeout` was not adding any additional time between requests--even when I placed it inside of a loop.

Although I was sad to say goodbye to my new for...of loop, I realized that I would need to implement a recursion method with a counter. I would need to create a function that ran as many times as there were entries in the array, kept track of the position within the array, and added a delay before running the function again.

I created a new function called "delay" that accepted the number of times I wanted the function to run as an argument. Within that function, I created a new (anonymous) function using `setTimeout` that would decrease the number of times the function would run. I would call the function later and pass the length of the array to it as the argument for the number of times it would run. That way, it wouldn't continue to run indefinitely.

After creating a terminal condition within the delay function, I began to rework the code for adding a single video. Previously, when I used a for loop, I was able to automatically iterate through the array to look for videos and dates. This time around, I had to create my own counter and increment it as necessary. Outside of the delay function, I created a new variable called `videoCount` and gave it a value of zero. I then created a new variable inside of the `setTimeout` function that would access the index of my array at the `videoCount` number. At the end of the `setTimeout` function inside of my delay function, I incremented the `videoCount` by 1. This way, I would work my way through the full length of the array, starting at zero, until I had reached the end of the length of my array.

My final code looked something like this:

```
const arrayLength = dateVideoArray.length  

let videoCount = 0 

function delay(times) {  
  if (times < 1) {  
    console.log('All available, non-duplicate videos added.')  
  } setTimeout(() => {  
    if (videoCount < arrayLength) {  
      const dateVideo = dateVideoArray[videoCount]  
      // Additional code for adding a single video  
      delay(times-1)  
      videoCount += 1  
    } else {  
      return  
    }} catch (error) {  
      throw new Error(error)  
    }  
  }, 500)  
}
  
delay(arrayLength)
```
