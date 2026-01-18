---
title: "Using Session Storage for API Data"
date: "2020-07-21"
layout: layouts/post.njk
tags: 
  - "api"
  - "code"
  - "fetch"
  - "javascript"
  - "json"
description: "After fetching the idiom API from the server and adding it to the document, I realized I wanted the user to see the same idiom until they closed their browser. To accomplish this, I decided to use sessionStorage."
---

After fetching the idiom API from the server and adding it to the document, I realized I wanted the user to see the same idiom until they closed their browser. To accomplish this, I decided to use `sessionStorage`.

Initially, I fetched the API and used `stringify` to convert the JSON data into a string that sessionStorage could store.

```
fetch('https://corsservice.appspot.com/yojijukugo/api/')
  .then(response => response.json())
  .then(data => { sessionStorage.setItem('jukugo',JSON.stringify(data['jukugo'])); sessionStorage.setItem('yomi',JSON.stringify(data['yomi'])); yojijukugoKanji.innerText = JSON.parse(sessionStorage.getItem('jukugo')); yojijukugoKana.innerText = JSON.parse(sessionStorage.getItem('yomi'));
```

However, ever after using `setItem` and `getItem` for the idiom, the idiom would still change upon refresh. The code I had written was trying to fetch the data and set and get a new item upon each page reload. This was not what I wanted.

To fix this, I decided to write a function that checked to see if `sessionStorage.getItem` existed for the two parts of the idiom (_jukugo_ and _yomi_). If it existed, I wanted to use the data that already existed without fetching anything. If the value was null, that meant the data had not been fetched yet.

```
if (((sessionStorage.getItem('jukugo')) !== null) && ((sessionStorage.getItem('yomi')) !== null)) {
  yojijukugoKanji.innerText = JSON.parse(sessionStorage.getItem('jukugo'))yojijukugoKana.innerText = JSON.parse(sessionStorage.getItem('yomi'))
}
```

If the user had not visited within this browser session, the original code that used `fetch`, `get`, and `set` would be implemented instead with an else statement. That data would then persist across their browser session. Success!
