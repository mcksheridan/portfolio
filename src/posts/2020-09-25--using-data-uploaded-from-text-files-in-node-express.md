---
title: "Using Data Uploaded From Text Files in Node/Express"
date: "2020-09-25"
layout: layouts/post.njk
tags: 
  - "express"
  - "multer"
  - "nodejs"
  - "regex"
  - "tiktok-project"
description: "Longtime users of TikTok will have probably liked hundreds, if not thousands, of videos on the app. It would be incredibly tedious for a user to select each video, click its share icon, copy a link, and then submit data its URL data. Thankfully, TikTok allows users to download all of their data, including their list of Liked videos. The user receives this information as a text file called Like List.txt."
---

Longtime users of TikTok will have probably "liked" hundreds, if not thousands, of videos on the app. It would be incredibly tedious for a user to select each video, click its share icon, copy a link, and then submit data its URL data. Thankfully, TikTok allows users to download all of their data, including their list of "Liked" videos. The user receives this information as a text file called "Like List.txt."

The list is formatted as follows:  
`Date: YYYY-MM-DD HH:MM:SS  
Video Link: https://www.tiktokv.com/share/video/videoidnumber`

I want a user to be able to upload this text file. Each separate entry would create a new video object using the video link and its corresponding date. The video link uses a different schema from the other videos (the host URL is tiktokv.com as opposed to tiktok.com), so I will continue to use the [follow-redirect package](../2020-09-14--following-urls-with-redirect-requests-in-node-js-with-follow-redirects.md) to get a URL scheme that can fetch JSON data.

I created a simple form in my template engine for the user to upload their list.

```
form(method='POST' action='/multi-add' enctype='multipart/form-data`')
label(for='like_list') Upload Your Like List 
input(type='file', name='like_list', required)
button(type='submit') Upload List
```

I used the express middleware [multer](https://github.com/expressjs/multer#readme) to handle the file data from the form. I wanted all files uploaded to fit certain criteria:

1. Any file uploaded must be a text (.txt) file
2. Any file uploaded must be named "Like List.txt"
3. Any file uploaded must be smaller than 1,000 kilobytes
4. Files can only have alphanumeric characters, spaces, line breaks, colons, dashes, forward slashes, and periods.

I used multer to make sure that files fit the first three criteria before being uploaded.

```
const upload = multer({ dest: 'uploads/',  
  limits: { fileSize: 1000000},  
  fileFilter: function(req, file, cb) {  
    if ((file['originalname'] === 'Like List.txt') &&  
    (file['mimetype'] === 'text/plain')) {  
     return cb(null, true)  
    }  
    cb(null, false)  
  } })
```

After a file is uploaded, I read its data using the builtin file system and deleted the original file. I then checked to see if it had invalid characters.

```
const data = fs.readFileSync(req.file.path, 'UTF-8')
fs.unlinkSync(req.file.path)
const regexCheck = new RegExp(/[^A-z0-9\s:\-/.]/)
if (data.match(regexCheck)) {  
  res.send('Your file contains invalid characters. Please upload your Like List file.')
`}
```

I then created a pattern using regular expressions to find each date and its corresponding video URL within the text file.

```
/Date: \d{4}-\d\d-\d\d\s\d\d:\d\d:\d\d\s
Video Link: https:\/\/www.tiktokv.com\/share\/video\/\d*\//g
```

I decided to use this information to create another `RegExp` object. I wanted to create an array of objects where each object represented one video. Within this video object, there would be two key-value pairs. One would represent the date, and the other would represent the video link. Each video link and date would be used to create a new video in the mongodb database.

```
const regexSort = new RegExp(/Date: \d{4}-\d\d-\d\d\s\d\d:\d\d:\d\d\sVideo Link: https:\/\/www.tiktokv.com\/share\/video\/\d*\//, 'g')
const dateVideoArray = data.match(regexSort)
```

I then created a couple of conditions that I thought could be possible for a potential user:

1. I wanted the app to be able to handle an empty Like List.
2. I wanted the app to be able to handle videos that already existed in the user's collection.
3. I wanted the app to be able to handle videos that may have been deleted since the user added them to their like list (i.e. unavailable videos).
4. I wanted the app to add all videos that did not meet any of the criteria above.

First, I created a conditional statement to make sure the Like List had at least one video that matched the regular expression.

```
if (dateVideoArray.length === 0) {
  res.send('Your Like List is empty.')
}
```

Next, I decided to create a new regular expression to divide entries in the array into subarrays where one entry corresponded to the date the video was liked and the other entry corresponded to the video URL. I used a for loop to iterate over each entry in the larger array.

```
const dateMatch = new RegExp(/\d{4}-\d\d-\d\d\s\d\d:\d\d:\d\d/)
const videoMatch = new RegExp(/https:\/\/www.tiktokv.com\/share\/video\/\d*\//)

for (let i = 0; i < dateVideoArray.length; i++) {
  const videoArray = dateVideoArray[i].match(videoMatch)
  const dateArray = dateVideoArray[i].match(dateMatch)
  const newVideo = videoArray.toString()
  const newDate = dateArray.toString()
}
```

I used [follow-redirects and fetch](../2020-09-14--following-urls-with-redirect-requests-in-node-js-with-follow-redirects.md) to get response data about each video. I then checked to see if a video with the same author and title existed in the database already.

```
Video.findOne({ 'title': data.title, 'author_name': data.author_name })
  .exec(function (err, found_video) {
    if (err) {return next(err)}
    if (found_video) {
      console.log(`A video by ${videodetail.author_name} called ${videodetail.title} already exists.`)
  }
```

I then checked to see if the response data for the video was undefined.

```
else if (videodetail.author_name === undefined) {
  console.log('This video is unavailable. It may have been deleted.')
}
```

Finally, if the video did not meet any of those conditions, I added it to the database.

```
else {
  video.save(function (err) {
    if (err) {return next(err)}
      console.log(`Video by ${videodetail.author_name} called ${videodetail.title} added!`)
  })
```
