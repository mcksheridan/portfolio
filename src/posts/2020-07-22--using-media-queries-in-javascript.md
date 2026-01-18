---
title: "Using Media Queries in JavaScript"
date: "2020-07-22"
layout: layouts/post.njk
tags: 
  - "code"
  - "dom"
  - "javascript"
  - "projects"
description: "Having videos as backgrounds would not be in the best interest of mobile users, who would likely be trying to conserve data usage. To avoid having videos take up any bandwidth whatsoever, I decided to remove the video element from my HTML altogether and use a media query in JavaScript to add it only for users on larger screens. I decided to make the media query using a min-device-width query."
---

Having videos as backgrounds would not be in the best interest of mobile users, who would likely be trying to conserve data usage. To avoid having videos take up any bandwidth whatsoever, I decided to remove the video element from my HTML altogether and use a media query in JavaScript to add it only for users on larger screens. I decided to make the media query using a `min-device-width` query.

```
const mediaQuery = window.matchMedia('(min-device-width: 1200px)')
```

I then created an if statement that would be satisfied if the device width was at least 1,200 px. If that condition was satisfied, then a `<video>` element would be added within the empty video `<div>` in the HTML. Then, the source for the video would be changed depending on the weather condition.

```
if (mediaQuery.matches) {  
  video.innerHTML = '<video src="" type="video/mp4" class="video_background" autoplay loop muted></video>';  
  const videoBackground = document.querySelector('.video_background');  
  videoBackground.src = 'backgrounds/' + weather + '.mp4';  
}
```

I also decided that it would be much more efficient to generate the correct URL for the weather video without the if statement I used previously. Instead, I renamed the videos so that they matched the names of the weather status pulled from the API. This way, I was able to implement the same functionality with far fewer lines of code.

I implemented the same concept for backgrounds for users on smaller screens. Instead of having a video in the background, they would see an image file of the current weather conditions.

```
page.style.backgroundImage = "url('backgrounds/" + weather + ".jpg')";
```

If the user was unable to see the video background on their larger screen, they would still be able to view the current weather conditions via the background JPEG image.
