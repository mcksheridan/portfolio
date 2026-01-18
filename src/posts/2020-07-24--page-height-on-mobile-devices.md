---
title: "Page Height on Mobile Devices"
date: "2020-07-24"
layout: layouts/post.njk
tags: 
  - "code"
  - "css"
  - "javascript"
  - "user-interface"
description: "Before deploying my application, I tested it using the developer tools available on Chrome. It looked exactly as I envisioned it when testing it across a myriad of screen sizes. However, after I visited the application on my mobile phone, I realized that there was one very big problem. The information at the bottom, which included the music playback option, the temperature, the date, the day, and time, was missing."
---

Before deploying my application, I tested it using the developer tools available on Chrome. It looked exactly as I envisioned it when testing it across a myriad of screen sizes. However, after I visited the application on my mobile phone, I realized that there was one very big problem. The information at the bottom, which included the music playback option, the temperature, the date, the day, and time, was missing.

<figure>
<img alt="Screenshot of idioms site with the Japanese word「失望落胆」and its pronounciation of しつぼうらくたん on a background image of storm clouds]" src="/media/2020/07/images/8D205B3E-6C69-4307-A22B-2FE65CC81A6F_1_201_a-592x1024.jpeg" />
<figcaption>
<span lang="ja">「失望落胆」</span>　means being despondent (Yes, the app is goading me.)
</figcaption>
</figure>

There was no option to scroll further either. I set the height of the page to `100vh` in CS and the grid layout I used that encompassed the entire `<body>` node assigned `7vh` to the footer and `93vh` to the rest of the content on the page. I designed the application this way to be as responsive as possible across devices. It worked exactly as it should have but had the unintended side effect of rendering the content at the bottom of the page invisible.

Changing the distribution of the grid to `17vh` and `83vh` fixed the problem on mobile, but, naturally changed the layout for larger screens. I considered doing a media query based on screen size, but the problem was not the size of the screen so much as it was the presence of the mobile browser's status bars. When scrolling through longer pages, these status bars disappear, but, given how compact the content of the page was, there was nothing to scroll through to allow the status bars to disappear.

Instead of setting the height of the `<body>` node as `100vh` or `100%`, I wanted to set it to the height of the screen actually available to the user. To find this number, I would need to go into the JavaScript for the app, as opposed to the CSS, and find the find the `innerHeight` of the page. I could then set the height of the page to the `innerHeight`. This would make the design of the page resilient to things like browser status bars that would have otherwise hidden content.

```
const innerViewportHeight = window.innerHeight;
page.style.height = `${innerViewportHeight}px`;
```

I also changed the stylesheet of the page to measure the grid layout in percentages as opposed to the `vh` unit.

<figure>
<img alt="Screenshot of idioms site with the Japanese word「孤雲野鶴」 and its pronounciation of こうんやかく on a background of cloudy skies. There is a status bar at the bottom with the time and temperature." src="/media/2020/07/images/D7597ECF-8FAB-4BB9-9723-79A1CBE60FBE_1_201_a-597x1024.jpeg" />
<figcaption>
<span lang="ja">「孤雲野鶴」</span> means hermit (literally a cloud that has broken off, a crane that has left the flock to frolic in the field)
</figcaption>
</figure>