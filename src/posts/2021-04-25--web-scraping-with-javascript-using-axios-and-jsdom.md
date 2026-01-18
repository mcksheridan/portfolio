---
title: "Web Scraping With JavaScript Using Axios and JSDom"
date: "2021-04-25"
layout: layouts/post.njk
tags: 
  - "api"
  - "axios"
  - "express"
  - "jsdom"
  - "tiktok-project"
description: "It's been almost a year since I created a website whose primary purpose was to consume a Japanese idiom API and give users a new idiom (and its pronunciation) each time they visited in a new browser window. When I originally imagined a concept for this website, I wanted to offer users an idiom, its pronunciation, and its definition. "
---

It's been almost a year since [I created a website whose primary purpose was to consume a Japanese idiom API](../2020-07-22--creating-a-japanese-idiom-web-application/) and give users a new idiom (and its pronunciation) each time they visited in a new browser window. When I originally imagined a concept for this website, I wanted to offer users an idiom, its pronunciation, _and_ its definition. (As a language learner, idioms are pretty challenging. By nature, they are more figurative than literal, so only having access to the characters and pronunciation for a word doesn't help much to understand its meaning.)

However, the API I used did not offer definitions. My first instinct was to find a Japanese dictionary API, pass the idiom received from the Japanese idiom API to it as an argument, and then fetch its definition. Unfortunately, I could not find a Japanese-to-Japanese dictionary API, so I temporarily gave up on this goal.

Now, months later, after learning more about web parsing, I decided to return to my original goal of having definitions for idioms.

I began by adding an Express backend to my application and creating an endpoint specific to idioms. I wanted there to be one specific location for my client side JavaScript to source information. I started by adding in the code for the idiom API I was currently using.

```
async function getIdiomAndPronunciation () {
const response = await fetch('https://corsservice.appspot.com/yojijukugo/api/');
const data = await response.json();
const { pronunciation } = data;
const { idiom } = data;
const idiomAndPronunciation = [ { pronunciation }, { idiom }, ];
return idiomAndPronunciation;
}
```

This asynchronous function would return an object that would contain both the Japanese characters for an idiom (jukugo) as well as its reading (yomi). I could use the value of the idiom when trying to retrieve its definition.

Then, I found a [website](http://dictionary.goo.ne.jp) that used a consistent pattern for displaying definitions and decided to fetch my data from there. Available definitions could be found with URLs that looked like this: https://dictionary.goo.ne.jp/word/`WORD_TO_DEFINE`.

I created another asynchronous function whose job would be to get the definition of a word. I used axios to make a `get` request for definitions, where `WORD_TO_DEFINE` would be a variable representing the idiom. I stored the data for the response in a separate variable.

```
const response = await axios.get(`https://dictionary.goo.ne.jp/word/${idiom}/`);
const data = await response.data;
```

Next, I decided to use JSDOM to create a DOM object that I could parse through using JavaScript.

```
const html = new JSDOM(data);
```

I took a peak at the [page for a definition](https://dictionary.goo.ne.jp/word/%E6%9C%9D%E4%B8%89%E6%9A%AE%E5%9B%9B/) on my selected website and opened up my developer tools. I found the area where the definition was stored and took note of the different HTML classes it was contained in. I wanted to retrieve content that matched all of the various classes where definitions were stored, so I decided to use `querySelectorAll`. As `querySelectorAll` returns an array, I took the text content from the first index of the array.

```
const unparsedDefinition = html.window.document.querySelectorAll('.content-box, .contents_area, .meaning_area, .p10, .contents, .text')[0].textContent;
```

This definition came padded with whitespace, so I used trim to remove it.

```
const definition = unparsedDefinition.trim();
```

I ran into an interesting issue at this point because I was using Japanese characters to retrieve the definition. These characters had to be escaped before they could be used to retrieve data. I created a simple function to encode these characters properly.

```
const escapeCharacters = (word) => {  
const result = encodeURI(word);  
return result;  
};
```

And then passed the escaped characters into my `get` request.

```
const word = escapeCharacters(idiom);  
const response = await axios.get(`https://dictionary.goo.ne.jp/word/${word}/`);
```

In the case that no definition was available for the idiom, an error would occur. To avoid errors, I created an error message to present to users when there was no definition available. I created an empty result array, wrapped my code inside of a try/catch block, pushed the definition to the result array when tries were successful, pushed an apology message when there were errors, and returned whatever was inside of the result array.

```
async function getDefinition (idiom) {
  const word = escapeCharacters(idiom);
  const result = [];

  try {
    const response = await axios.get(`https://dictionary.goo.ne.jp/word/${word}/`);
    const data = await response.data;
    const html = new JSDOM(data);
    const unparsedDefinition = html.window.document.querySelectorAll('.content-box, .contents_area, .meaning_area, .p10, .contents, .text')[0].textContent; 
    const definition = unparsedDefinition.trim();
    result.push(definition);
  } catch (error) {
    result.push('Sorry, definition unavailable');
  }

  return result[0];
}
```

I created a third function that would get the appropriate definition for the idiom at hand. The idiom API I used changes the idiom/pronunciation it provides with each request, so it was pivotal that I only request an idiom once. Otherwise, I was likely to wind up with two idioms and a potentially mismatched definition.

```
async function getIdiomWithMeaning() {  
  const idiomAndPronunciation = await getIdiomAndPronunciation();  
  const { pronunciation } = idiomAndPronunciation[0];  
  const { idiom } = idiomAndPronunciation[1];  
  const definition = await getDefinition(idiom);  
  const idiomWithMeaningData = [  
    { pronunciation },  
    { idiom },  
    { definition },  
  ];  

  return idiomWithMeaningData;  
}
```

I then served this definition (alongside the idiom itself and its pronunciation) up as JSON data available to my client side JavaScript.

```
async function displayIdiomWithPronunciation() {
  const data = await getIdiomWithPronunciation();
  res.json(data);
}

displayYojijukugo();
```

Instead of making multiple network requests on the client side, I made only one request to my own server:

```
const idiomWithDefinition = await fetch('http://localhost:3000/idiom');
```
