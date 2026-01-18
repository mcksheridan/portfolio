---
title: "Analyzing Code with ESLint and Prettier"
date: "2020-07-18"
layout: layouts/post.njk
tags: 
  - "eslint"
  - "javascript"
  - "prettier"
  - "projects"
  - "regex"
description: "Over the past few days, I've developed a word counter using HTML, CSS, and vanilla JavaScript. I tried my hand at BEM architecture; variables, nesting, modules, inheritance, and parent selectors in Sass; and regular expression and DOM manipulation in JavaScript. Before pushing my project to GitHub, I decided to try using ESLint and Prettier in VSCode with the Air BnB style guide. Although this page counter was very small, I wanted to make sure its code was as clean as possible."
---

Over the past few days, I've developed a word counter using HTML, CSS, and vanilla JavaScript. I tried my hand at BEM architecture; variables, nesting, modules, inheritance, and parent selectors in Sass; and regular expression and DOM manipulation in JavaScript. Before pushing my project to GitHub, I decided to try using ESLint and Prettier in VSCode with the Air BnB style guide. Although this page counter was very small, I wanted to make sure its code was as clean as possible.

Most of the suggestions that ESLint and Prettier gave were very easy to implement. However, there was on suggestion ESLint made that caused me to pause.

```
Unexpected surrogate pair in character class. Use 'u' flag.
```

The piece of code in question was the word counter. In order to [add recognition for Japanese characters](./regular-expression-with-japanese-characters/), I used several Unicode blocks.

```
countWord.innerText = text.match( /[\u3041-\u3096\u30A1-\u30FA々〇〻\u3400-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF\w-']+/g ).length
```

I reviewed the documentation for the rule and decided to rewrite the code using the `u` flag to signal Unicode characters. This was the course of action recommended for surrogate pairs. I also changed the hyphen and apostrophe to Unicode. I didn't think I had any surrogate pairs, so I wasn't terribly surprised when the following code also produced an error.

```
/[\u{3041}-\u{3096}\u{30A1}-\u{30FA}\u{3005}\u{3007}\u{303B}\u{3400}-\u{9FFF}\u{F900}-\u{FAFF}\u{D840}-\u{D87F}\u{DC00}-\u{DFFF}\u{0027}\u{002D}\w]+/gu
```

I returned to the documentation again and realized that the Unicode characters I included in my Unicode blocks included "characters with combining characters," or characters that belonged to the Mc, Me, or Mn Unicode general categories. I took a look at the blocks and the ranges of Unicode characters they provided and realized that I `\u{DC00}-\u{DFFF}` was a match for every existing Unicode character. I removed this from my code and the error in ESLint disappeared. With that segment of code gone, I followed up by referencing a [list of Unicode characters from 3000 to 3FFFF](https://ja.wikipedia.org/wiki/Unicode%E4%B8%80%E8%A6%A7_3000-3FFF) and adding a few more individual Unicode characters for Japanese symbols that occur within words.

```
/[\u{3005}-\u{3096}\u{30A1}-\u{30FF}\u{303B}\u{3400}-\u{9FFF}\u{F900}-\u{FAFF}\u{D840}-\u{D87F}\u{0027}\u{002D}\w]+/gu
```

With the code bug-free, I uploaded my files to [GitHub](https://github.com/mcksheridan/word_counter) and deployed a live version on [my website](https://mcksheridan.github.io/word_counter/).
