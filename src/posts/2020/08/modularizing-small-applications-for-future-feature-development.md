---
title: "Modularizing an Exercise App for Future Feature Development"
date: "2020-08-09"
layout: layouts/post.njk
tags: 
  - "css"
  - "html"
  - "javascript"
  - "projects"
description: "Prior to the pandemic, I went to the gym every weekday and ended my workouts with a cooldown stretch. Depending on which muscle groups I used, I followed a particular series of stretches. I could never quite memorize the stretches, so I wound up going between the stopwatch app on my phone and the stretches in my web browser. If my phone memory wasn't feeling generous, this would cause my browser to totally refresh (requiring me to scroll down to find the correct stretch) and my stopwatch to lag before displaying the correct time."
---

Prior to the pandemic, I went to the gym every weekday and ended my workouts with a cooldown stretch. Depending on which muscle groups I used, I followed a particular series of stretches. I could never quite memorize the stretches, so I wound up going between the stopwatch app on my phone and the stretches in my web browser. If my phone memory wasn't feeling generous, this would cause my browser to totally refresh (requiring me to scroll down to find the correct stretch) and my stopwatch to lag before displaying the correct time.

I decided to fix this problem by streamlining the process with a web application that would display the stretch I was currently doing, the stretch I would do next, and the amount of time remaining before it was time to move to that next stretch.

The process was straightforward. I built the structure of the app in HTML using BEM architecture and created a stylesheet using Sass as a processor. I then used vanilla JavaScript to give the app its functionality before using ESLint and Prettier.

The app functioned as I originally envisioned it, but I wanted to leave room for improvement in the future.

For one thing, I wanted to be able to easily add a new stretching routine to the application. To make this as modular as possible, I put each individual routine into a separate object in its own JavaScript file. This way, I could continue to use the same variables and classes for each new routine while automatically updating the name and image used for the exercise.

Secondly, different routines had different timers. For example, the stretches in the leg routine are supposed to be held for at least 1 minute, but the stretches in the arm routine are supposed to be held for about 30 seconds. I isolated the variables that controlled the time for the timer function and also put them in their own separate file. I decided it would be better to have multiple smaller files that were all different from each other than to have a smaller number of larger files with copied and pasted code.

Finally, I knew I wanted to change the functionality of the timer at some point in time. Instead of only being able to start the timer, I wanted to be able to pause the timer as well (like a stopwatch). I wasn't sure exactly how I wanted to implement this yet, but by isolating the other components of the application, I felt confident that I would be able to easily update the function of the timer at a later point in time.

The most current version of this app is [currently available on my website](https://stretches.mcksheridan.com/).
