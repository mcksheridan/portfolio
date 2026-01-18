---
title: "Weather Backgrounds with the Open Weather Map API"
date: "2020-07-19"
layout: layouts/post.njk
tags: 
  - "api"
  - "code"
  - "javascript"
  - "json"
  - "projects"
description: "Despite studying Japanese for nearly a decade now, I still struggle to understand and remember yojijukugo, or idioms comprised of four Chinese characters. For my next project, I decided it would be fun to build an app to start my day off with a different idiom. Aside from the idiom (and its pronunciation and definition), I wanted to add in a few other features for starting my day. Namely, I wanted to know the day, the date, the time, the temperature, and the current weather."
---

Despite studying Japanese for nearly a decade now, I still struggle to understand and remember _yojijukugo_, or idioms comprised of four Chinese characters. For my next project, I decided it would be fun to build an app to start my day off with a different idiom. Aside from the idiom (and its pronunciation and definition), I wanted to add in a few other features for starting my day. Namely, I wanted to know the day, the date, the time, the temperature, and the current weather.

To find the weather, I used an API offered by [Open Weather Map](https://openweathermap.org/). I referenced their list of [weather conditions](https://openweathermap.org/weather-conditions) and found looping videos that corresponded to the groups of weather conditions listed on [Videezy](https://www.videezy.com/). I thought it would be fun for the background to signal current weather conditions as opposed to a more traditional weather icon.

To make a video the background for the webpage, I added a `<video>` element into the HTML.

```
<video src="backgrounds/clearsky.mp4" type="video/mp4" class="video_background" autoplay loop muted></video>
```

In the CSS I styled the video so that it would extend fully to cover the entire page and keep it in the background.

```
.video_background {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  min-width: 100%;
  z-index: -1;
}
```

I used fetch to get the API and then created a variable that corresponded to the data from the icon key in the object from the API. There were nine different descriptions that had icons available, so I saved nine different videos to use as backgrounds. (Some descriptions had both day and night icons available, but I only saved one video per description.) I created a conditional statement that would set a background depending on the leading two digits of the icon.

```
const weather = data['weather'][0]['icon'];
function weatherBackground () {
  if (weather.startsWith('02')) {
    videoBackground.src = 'backgrounds/fewclouds.mov';
  } else if (weather.startsWith('03')) {
    videoBackground.src = 'backgrounds/scatteredclouds.mov';
  } else if (weather.startsWith('04')) {
    videoBackground.src = 'backgrounds/brokenclouds.mp4';
  } else if (weather.startsWith('09')) {
    videoBackground.src = 'backgrounds/shower_rain.mov';
  } else if (weather.startsWith('10')) {
    videoBackground.src = 'backgrounds/rain.mov';
  } else if (weather.startsWith('11')) {
    videoBackground.src = 'backgrounds/thunderstorm.mov';
  } else if (weather.startsWith('13')) {
    videoBackground.src = 'backgrounds/snow.mp4';
  } else if (weather.startsWith('50')) {
    videoBackground.src = 'backgrounds/mist.mp4';
  }
}

weatherBackground();
```
