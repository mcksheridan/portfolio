---
title: "Automating My Project Setup with NPM Scripts"
date: "2020-07-24"
layout: layouts/post.njk
tags: 
  - "code"
  - "npm"
  - "npm-scripts"
description: "When I create a web application, I typically follow the same steps every time. I create a new directory in my projects folder, open that folder in VSCode, and then create three files: index.html, index.js, and style.scss. After reading about npm Scripts, I wanted to automate these actions and set up new projects from the command line."
---

When I create a web application, I typically follow the same steps every time. I create a new directory in my projects folder, open that folder in VSCode, and then create three files: index.html, index.js, and style.scss. After reading about npm Scripts, I wanted to automate these actions and set up new projects from the command line.

After learning more about the package.json file, I wanted to find a way to use scripts to do the following three things in the terminal:

1. Create a new directory
2. Navigate into that directory
3. Create three new files: index.html, index.js. and style.scss

I knew I would use `mkdir` to create a new directory, `cd` to enter into that directory, and `touch` to create the three files. However, I needed to give the folder a name, and that would require me to pass some sort of argument to create the directory (and to navigate to it).

I read a [blog post by Dominik Kundel](https://www.twilio.com/blog/npm-scripts) that explained passing arguments and parsing in npm Scripts. I could create an environment variable inside of my package.json file that I could later pass as an argument in the terminal. To create an environment variable, I had to use the following format: `$npm_config_foo`. I could parse this argument in the terminal using the following syntax: `--foo=bar`.

With this in mind, I created a script called project and tested it in the terminal.

```
"scripts": {  
"project": "mkdir $npm_config_name && cd $npm_config_name && touch index.html index.js style.scss"  
},
```

<figure>
<img alt="Terminal screen showing the NPM automation process" src="/media/2020/07/images/Screen-Shot-2020-07-24-at-11.08.53-AM-1024x716.png" />
<figcaption>
Testing out npm Scripts
</figcaption>
</figure>
