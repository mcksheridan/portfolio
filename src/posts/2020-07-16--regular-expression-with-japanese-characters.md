---
title: "Regular Expression with Japanese Characters"
date: "2020-07-16"
layout: layouts/post.njk
tags: 
  - "code"
  - "javascript"
  - "regex"
description: "I decided to build a word counter that would give the user the exact number of words and characters and an estimated number of page numbers for text that the user inputs into a textarea. I wanted to make the word counter bilingual and offer instructions to the user in both English and Japanese. Because the Japanese language does not use spaces, users who choose to input text in Japanese would only be able to make use of the character count and the page number estimate."
---

I decided to build a word counter that would give the user the exact number of words and characters and an estimated number of page numbers for text that the user inputs into a textarea. I wanted to make the word counter bilingual and offer instructions to the user in both English and Japanese. Because the Japanese language does not use spaces, users who choose to input text in Japanese would only be able to make use of the character count and the page number estimate.

I decided to count the number of characters inputted by getting the length of the textarea value and retrieve the number of words using a regular expression.

`/[\w-']+/g`

After testing the code above in Japanese, I realized that it caused an error. In English, a single word would return a length of 1. However, in Japanese there are no "word characters" (or otherwise hyphens or apostrophes), so typing a single word (or character) in Japanese caused an error. The text match returned null, and so the length could not be determined.

In regular express, \\w expresses any letter upper or lower case from a to z as well as numbers 0 to 9 and underscores. To add functionality for Japanese, I would need to include unicode characters in this character set, too.

I referenced [Regular-Expressions.info](https://www.regular-expressions.info/refunicode.html) for more information about including unicode characters in regular expressions. However, the only way to include unicode in JavaScript appeared to be by including individual unicode characters, and there are far, far too many Japanese characters to try and list all of them in a regular expression.

Initially, I tried to find a solution to this problem by using combinations of `\b` or `\s` with, respectively, `\B` or `\S`. Instead of looking for words specifically, I could look for something that was certainly not a word and then look for something that might have been a word. Unfortunately, ideas like `/[\b\B\b]+/g` also yielded null results.

What I wanted was a way to somehow include all possible Japanese unicode characters without having to find the unicode codes for thousands of Japanese characters.

Thankfully, unicode blocks did that work for me. Similarly to `[a-z]`, there were several ranges of unicode codes that covered Japanese characters. [So-zou.jp](https://so-zou.jp/software/tech/programming/tech/regular-expression/meta-character/variable-width-encoding.htm) lists several blocks that encompass the Japanese language.

`/[\u3041-\u3096\u30A1-\u30FA々〇〻\u3400-\u9FFF\uF900-\uFAFF\uD840-\uD87F\uDC00-\uDFFF\w-']+/g`

I combined multiple unicode blocks and tested my counter again using both ASCII characters and Japanese characters. It was fully functionally and finally bilingual!
