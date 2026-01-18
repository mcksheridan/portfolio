---
title: "Creating a Japanese Idiom Web Application"
date: "2020-07-22"
layout: layouts/post.njk
tags: 
  - "api"
  - "code"
  - "javascript"
  - "projects"
description: "I created a web application that would use two different APIs (one for the idioms, a separate one for the weather) to allow the user to start their day with a piece of wisdom and knowledge about the current weather conditions."
---

I created a web application that would use two different APIs (one for the idioms, a separate one for the weather) to allow the user to "start their day" with a piece of wisdom and knowledge about the current weather conditions.

This was my first time integrating APIs with a web application, and I look forward to using [some of the many APIs available free of charge](https://github.com/public-apis/public-apis). Learning how to use APIs using fetch and then extracting data from those APIs opened up a world of possibilities for exploring different types of data. I also used ESLint and Prettier again before pushing my code to GitHub.

I want to return to this application in the future with further knowledge of databases. My original idea for this application was using one API to get an idiom and its reading and then using a separate API to get the definition of that idiom. Unfortunately, I could not find an API that would allow me to get the Japanese definition of Japanese idioms. I would like to create my own database with JSON that includes an idiom, its meaning, and its Japanese definition (and a source for this information). It would also be nice to use some of my translation skills and provide an English equivalent when possible and a literal English translation when not.

I would also like to return to this application after learning some Node.js and Express to create a proxy server to protect my API key. Although only the Open Weather Application requires an API key (and the API key I chose was provided free of charge), I would still like this data to be more protected in the future.

The live implementation of the Japanese idiom web application is available now on my website: [https://mcksheridan.com/projects/idioms](https://mcksheridan.com/projects/idioms/).

<figure>
<img alt="唯一不二 means 'one and only'" src="/media/2020/07/images/Screen-Shot-2020-07-22-at-1.27.18-PM-1024x559.png" />

<figcaption>
<span lang="ja">「唯一不二」</span> means "one and only"</figcaption>
</figure>
