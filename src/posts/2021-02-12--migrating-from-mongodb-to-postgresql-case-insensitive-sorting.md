---
title: "Migrating from MongoDb to PostgreSQL (Case Insensitive Sorting)"
date: "2021-02-12"
layout: layouts/post.njk
tags: 
  - "case-sensitivity"
  - "database"
  - "mongodb"
  - "postgresql"
  - "sql"
  - "tiktok-project"
description: "After creating a new database in PostgreSQL, I needed to connect my Node/Express application to my database. I decided to use node-postgres to do this. I followed the recommended setup for node-postgres and created a new db folder with an index.js file setting up my PostgreSQL database. After quickly testing to ensure that I was connected to the database, I began the process of updating my routes to reflect the new database."
---

After creating a new database in PostgreSQL, I needed to connect my Node/Express application to my database. I decided to use [node-postgres](https://node-postgres.com/) to do this. I followed the recommended setup for node-postgres and created a new db folder with an index.js file setting up my PostgreSQL database. After quickly testing to ensure that I was connected to the database, I began the process of updating my routes to reflect the new database.

The process of querying from the PostgreSQL database instead of the MongoDb database was mostly straightforward (though I did learn that parameterized queries are preferred over passing information directly to queries, so as to avoid SQL injection attacks). However, I encountered an interesting problem when sorting my queries.

Sorting happens by unicode character, so a query to sort alphanumeric characters is not case insensitive. 'Z' comes before 'a.'

Previously, in MongoDb, I solved this issue by adjusting collation for the query. I used the English ("en") locale and gave it a strength of "1" for a primary level of comparison that ignored case.

I looked for a way to adjust collation strength similarly in PostgreSQL, but the [collation documentation](https://www.postgresql.org/docs/9.1/collation.html) did not seem to indicate this was possible.

I changed my strategy and decided that I could make a case insensitive query if everything in my query was the same case. If I made all of the data in my query either lower case or upper case, I would no longer have an issue with data appearing out of order. However, I wanted to be sure that I did not actually alter any data within the table.

To do this, I used the `lower()` function. To query the names of bookmark lists that a user with a user ID of 1 had saved in alphabetical order, I used the following query:

```
SELECT * FROM lists WHERE user_id = 1 ORDER BY lower(name)
```

This did not alter any data within the table and the query returned the properly capitalized data in alphabetical order.

I ran into another issue with case insensitive sorting later on when I adjusted the sorting options for videos. Users can choose to sort videos in several ways: by date bookmarked, by date added to TikTok, by creator name, and by video description. When I used the same `lower()` function I previously used, this generated a series of different errors.

By default, videos appear either by date bookmarked or by date added to bookmark list (depending on whether a user is viewing all videos or only the videos that appear in a particular list they have created). The `lower()` function did not work on timestamps so this generated the first error.

To fix this error, I decided to create a new "pipeline" to handle video sorting. First, I used my existing [getSortOption](../2020-11-13--using-aggregation-to-work-with-nested-arrays-in-mongodb/) inside of a newly created function called checkCaseSensitivity. I have been trying harder to create functions that serve singular purposes, so checkCaseSensitivity was a pretty simple, self-explanatory function.

```
const checkCaseSensitivity = () => {
  const startsWithDate = (getSortOption(app.locals.sortVideoOption)).startsWith('date')
  startsWithDate ? getVideosCaseInsensitive() : getVideosCaseSensitive()
```

All of the video sorting options without case sensitivity began with "date," so I created a constant with a Boolean value. Either the sorting option started with "date" (and case sensitivity did not apply) or it did not start with "date" (and case sensitivity did apply). If the statement was true (i.e. if there was no case sensitivity to worry about), another function would be called. If the statement was false, a different function would be called. (I used a [ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) to put all of this on one line!)

I created two functions to correspond to the functions I referenced in my `checkCaseSensitivity()` function: `getVideosCaseInsensitive()` and `getVideosCaseSensitive()`. The only real difference between each function was the text that they would use to query the database. Therefore, I decided to create a separate, reusable `getVideos()` function that would accept the text for the query as an argument.

In the ORDER BY clause for `getVideosCaseInsensitive()`, I called the `getSortOption()` function I created and passed whatever sorting option the user had chosen to it as an argument. Because the case insensitive query would only be used for dates, there was no need to use the `lower()` function here.

```
ORDER BY ${getSortOption(app.locals.sortVideoOption)}
```

When creating the `getVideosCaseSensitive()` function, I encountered a new problem. I tried to create an ORDER BY clause that looked like the following:

```
ORDER BY lower(${getSortOption(app.locals.sortVideoOption)})
```

However, the `lower()` function could not be called when there was an ascending or descending option in the text for the query. If I removed the ascending/descending option, the query would work and would be case insensitive, but this only worked for ascending queries.

After doing a bit of digging, I found that the column and the desired sorting direction could be separated so that the `lower()` function could be used on the column and the direction could be included outside of the `lower()` function. I decided to create two arguments to pass to the `getVideosCaseInsensitive()` function: column and direction. That would make my ORDER BY clause look like the following:

```
ORDER BY lower(${column}) ${direction}
```

I returned to my `checkCaseSensitivity()` function to pass a column and direction argument when I called the `getVideosCaseSensitive()` function. When a user chooses a sorting option, the data is passed a string formatted as 'column direction.' I transformed this string into an array and used the space to split it into separate items. The first item (0) would be the column, and the second item (1) would be the direction.

```
const sortOptionArray = app.locals.sortVideoOption.split(' ')  
const sortColumn = sortOptionArray[0]  
const sortDirection = sortOptionArray[1]`
```

Unfortunately, I had to get rid of my ternary operator to define these variables. If a user has not selected a sort option and the default sort option is in place, trying to perform the split() operation on an undefined variable generates an error. It made the most sense to return to a regular conditional statement and define these variables only when the user had selected an option that required case insensitive sorting.

However, fortunately, case insensitive sorting was functional again!
