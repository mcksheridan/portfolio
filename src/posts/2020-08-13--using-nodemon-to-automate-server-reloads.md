---
title: "Using Nodemon to Automate Server Reloads"
date: "2020-08-13"
layout: layouts/post.njk
tags: 
  - "npm"
  - "npm-scripts"
  - "tiktok-project"
description: "The first step to building my fullstack bookmark application is learning about backend development. While testing out basic concepts in Node.js and Express, I found myself constantly terminating jobs only to restart them a few moments later after making minor changes to my code. Going through this process every time I wanted to see anything updated became pretty annoying fairly quickly."
---

The first step to building my fullstack bookmark application is learning about backend development. While testing out basic concepts in Node.js and Express, I found myself constantly terminating jobs only to restart them a few moments later after making minor changes to my code. Going through this process every time I wanted to see anything updated became pretty annoying fairly quickly.

I decided to install [nodemon](https://github.com/remy/nodemon) to automate the process of reloading my server after changes had been made.

I decided to install it as a dependency first and run it as an npm script.  
`npm install --save-dev nodemon`

Instead of using `npm start`, I used `npx` with the npx package runner instead.

After a successful local installation, I decided to install nodemon globally.  
`npm install -g nodemon`

This way, in addition to being able to use nodemon for any file, I could also save myself the time of writing `npm start` or `npx` prior to `nodemon`.
