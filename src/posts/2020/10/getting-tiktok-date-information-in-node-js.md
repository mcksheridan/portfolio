---
title: "Getting TikTok Date Information in Node.js"
date: "2020-10-30"
layout: layouts/post.njk
tags: 
  - "bignumber"
  - "binary"
  - "decimal"
  - "nodejs"
  - "recursion"
  - "regex"
  - "tiktok-project"
description: "One of the features many TikTok users, including myself, would like to have is the ability to search for or sort videos according to when they were uploaded. This information is not included in the official TikTok API, so I assumed that it was not available. However, I recently read a very helpful post from Digital Forensics that detailed how to get timestamps from TikTok videos. I decided to implement the steps in Node.js and append this information to videos saved in the database."
---

One of the features many TikTok users, including myself, would like to have is the ability to search for or sort videos according to when they were uploaded. This information is not included in the official TikTok API, so I assumed that it was not available. However, I recently read a [very helpful post from Digital Forensics](https://dfir.blog/tinkering-with-tiktok-timestamps/) that detailed how to get timestamps from TikTok videos. I decided to implement the steps in Node.js and append this information to videos saved in the database.

After [getting the redirected URL](../09/following-urls-with-redirect-requests-in-node-js-with-follow-redirects) and confirming the data retrieved from the TikTok API was valid, I began the process by extracting the video ID from the TikTok URL. So far, I have found two separate patterns for TikTok URLs. URLs coming from mobile browsers look something like "http://m.tiktok.com/v/0000000000000000000" while URLs from desktop browsers look more like this: "https://www.tiktok.com/@user/video/0000000000000000000." I created two separate regular expressions to match both patterns.

For the mobile URL patterns:

```
const idRegexPattern = new RegExp(/\d+/)  
const tiktokIdArray = redirectedUrl.match(idRegexPattern)  
const tiktokId = tiktokIdArray[0]
```

For the desktop URL patterns:

```
const videoRegexPattern = new RegExp(/video\/\d+/)  
const tiktokVideoPattern = redirectedUrl.match(videoRegexPattern)  
const tiktokVideoString = tiktokVideoPattern.toString()  
const tiktokIdArray = tiktokVideoString.match(idRegexPattern)  
const tiktokId = tiktokIdArray[0]
```

To find the timestamp for the video, you have to convert the video ID to binary. However, as it is a 19-digit integer, JavaScript cannot handle the number with enough accuracy for the binary number to correspond to the correct timestamp. The latest Node.js version can handle these big integers (using [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)), but I was working with an earlier version. Instead, I installed [BigNumber](https://github.com/alexbardas/bignumber.js#readme) to correspond with big integers. I then used a recursive function to calculate the binary number of the id.

```
const tiktokIdBigIntBinaryArray = []  
const tiktokIdInteger = BigNumber(tiktokId)  
let currentInteger = tiktokIdInteger  
while (currentInteger > BigNumber(0)) {  
let remainder = BigNumber(currentInteger).mod(2)  
let remainderString = remainder.toString()  
tiktokIdBigIntBinaryArray.unshift(remainderString)  
currentInteger = BigNumber(currentInteger).div(2)  
if (currentInteger == 0) {  
const currentIntegerString = currentInteger.toString()  
tiktokIdBigIntBinaryArray.unshift(currentIntegerString)  
}  
}
```

To calculate the binary number, I used a loop to recursively divide the id of the TikTok video and add its remainder to the beginning of a new array. I then took the first 32-digits from the array to prepare them for conversion to decimal.

```
const tiktokIdBinaryArray = tiktokIdBigIntBinaryArray.map(number => parseInt(number)) const tiktokIdBinaryString = tiktokIdBinaryArray.join('')  
const thirtyTwoLeftBits = tiktokIdBinaryString.slice(0,32)
```

I used another recursive loop to convert the binary string into decimal.

```
const decimalArray = []  
let arrayPlace = 0  
let previousValue = 0  
while (arrayPlace < 32) {  
let valueTotal = previousValue * 2  
let bitAsInteger = parseInt(thirtyTwoLeftBits[arrayPlace])  
let newTotal = bitAsInteger + valueTotal  
decimalArray[0] = newTotal  
previousValue = newTotal  
arrayPlace += 1  
}  
const decimal = decimalArray.toString()
```

From left to right, each value is the result of the previous value doubled with the current value added to it. I looped through the entire array to find a 10-digit decimal number. I used an array to add the results of the recursive function, and, once the function was compete, the sole value left in the array was the decimal number to be converted into a date.

The date currently in the decimal variable is a Unix timestamp. To make it compatible with the Date object, I multiplied it by 1000.

```
const dateAdded = new Date(decimal * 1000)
```

I was able to add this information into a new `dateAdded` field for videos in my database. Now, I will be able to include sorting by the date a video was actually added to TikTok, not just by when a video was added to the bookmark app.
