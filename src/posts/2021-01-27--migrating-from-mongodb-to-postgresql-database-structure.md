---
title: "Migrating from MongoDb to PostgreSQL (Database Structure)"
date: "2021-01-27"
layout: layouts/post.njk
tags: 
  - "databases"
  - "mongodb"
  - "postgresql"
  - "sql"
  - "tiktok-project"
description: "As I continued to restructure my database to accommodate user authentication, I ran into several issues. I solved some of these problems using embedded documents and aggregation. However, as I continued to learn more about databases, I came to an important realization: I misunderstood the relationships within the data I created; I incorrectly identified various relationships within my database as one-to-many."
---

As I continued to restructure my database to accommodate user authentication, I ran into several issues. I solved some of these problems using [embedded documents](../2020-11-13--creating-one-to-many-relationships-with-embedded-documents-in-mongodb/) and [aggregation](../2020-11-13--using-aggregation-to-work-with-nested-arrays-in-mongodb/). However, as I continued to learn more about databases, I came to an important realization: I misunderstood the relationships within the data I created; I incorrectly identified various relationships within my database as one-to-many.

After learning more about databases, I sat down (with a pencil and paper) and made some new notes. One user could have many favorite videos and many lists. At first glance, users had a one-to-many relationship with both videos and lists. Although each user would have their own unique set of lists, multiple users could add the same video. In my current database structure, many users could add the same video and this would add a new embedded document to their user document, despite being the exact same information as any other video with the same TikTok video ID. Instead of users and videos having a one-to-many relationship, users and videos should have a many-to-many relationship.

Next, I re-examined the relationship between videos and lists. I erroneously thought this was also a one-to-many relationship, but it is was actually another many-to-many relationship. One video could appear in multiple lists, and one list could have multiple videos.

Although MongoDb could handle these relationships using [document references](https://docs.mongodb.com/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/) instead of embedded documents, it made more sense to me to turn to a relational database for data that included multiple many-to-many relationships. I began learning about SQL and decided to migrate from MongoDb to PostgreSQL for this project.

After installing PostgreSQL and creating a new database for my project, I decided to begin the migration by recreating the documents I made in MongoDb as tables in PostgreSQL.

<table>
<thead>
<tr>
<th>
MongoDB Users Schema
</th>
<th>
PostgreSQL Users Table
</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<pre>
username: {  
type: String,  
required: true,  
minlength: 4,  
maxlength: 100,  
},  
password: {  
type: String,  
required: true,  
minlength: 6,  
maxlength: 100,  
},  
email: {  
type: String,  
required: true,  
unique: true,  
minlength: 4,  
maxlength: 256,  
},  
createdAt: {  
type: Date,  
default: Date.now,  
},  
resetPasswordToken: {  
type: String,  
},  
resetPasswordTokenExpires: {  
type: Date,  
}
</pre>
</td>
<td>
<pre>
user\_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,  
  
username VARCHAR(100) CHECK (LENGTH(username) > 3) NOT NULL,  
  
password VARCHAR(100) CHECK (LENGTH(password) > 5) NOT NULL,  
  
email VARCHAR(256) UNIQUE CHECK (LENGTH(email) > 3) NOT NULL,  
  
created\_at TIMESTAMP DEFAULT CURRENT\_TIMESTAMP,  
  
reset\_password\_token TEXT,  
  
reset\_password\_token\_expiration TIMESTAMP
</pre>
</td>
</tr>
</tbody>

There were several key differences between MongoDb, a noSQL database, and PostgreSQL, a SQL database, that I had to learn to create the user table. First, PostgreSQL does not automatically generated an id the way that MongoDb does. Instead, I created my own user ID column using an integer data type and assigned it as a primary key generated always as identity. This automatically assigned a unique, increasing id number for each new user inserted into the table that could be referenced in other tables as a foreign key.

<table>
<thead>
<tr>
<th>
MongoDb Videos Schema
</th>
<th>
PostgreSQL Videos Table
</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<pre>
url: {  
type: String,  
match: /tiktok.com\\//i,  
},  
id: {  
type: String,  
},  
title: {  
type: String,  
},  
authorUrl: {  
type: String,  
},  
authorName: {  
type: String,  
},  
dateAdded: {  
type: Date,  
},  
dateBookmarked: {  
type: Date,  
default: Date.now  
}
</pre>
</td>
<td>
<pre>
video\_id CHAR(19) PRIMARY KEY NOT NULL,  
  
url VARCHAR(800) CHECK (url ~\* 'tiktok.com\\/') NOT NULL,  
  
title VARCHAR(256),  
  
author\_url VARCHAR(256) NOT NULL,  
  
author\_name VARCHAR(256) NOT NULL,  
  
date\_added TIMESTAMP NOT NULL,
</pre>
</td>
</tr>
</tbody>
</table>

I handled video ids differently on my videos table than I did for my videos schema. For my MongoDb videos schema, each video document had two ids: the id that MongoDb assigned it and the [id for the TikTok video itself](../2020-10-30--getting-tiktok-date-information-in-node-js/). There was no need for these two ids as the id that TikTok assigns each video is already unique. Instead of asking PostgreSQL to assign a unique, increasing integer for each video, I decided to use the id TikTok created when inserting new videos. Aside from the difference in ids, I also introduced a variable character limit for strings in the PostgreSQL table.

The final big difference the original schema and the new table was the date bookmarked field. All of the information for one video could be shared between users, with the exception of the date bookmarked field. This value would be unique among users. However, I did not want to structure this as a one-to-many relationships where there were potentially multiple rows in a table that had identical information, save for one field (the date bookmarked field). I decided to handle the data for the date bookmarked later, in a reference table.

<table>
<thead>
<tr>
<th>
MongoDb Lists Schema
</th>
<th>
PostgreSQL Lists Table
</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<pre>
name: {  
type: String,  
required: true,  
maxlength: 100  
},  
videos: \[{  
type: Schema.Types.ObjectId,  
ref: 'Video'  
}\]
</pre>
</td>
<td>
<pre>
list\_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,  
  
user\_id BIGINT NOT NULL,  
  
name VARCHAR(100) NOT NULL,  
  
CONSTRAINT fk\_user  
FOREIGN KEY(user\_id)  
REFERENCES users(user\_id)  
ON DELETE CASCADE  
ON UPDATE CASCADE
</pre>
</td>
</tr>
</tbody>

I generated an id for lists in the same manner that I generated an id for users. I also introduced relationships in the lists table, just as I had in the MongoDb schema, but I referenced a user id instead of video ids. This represents the one-to-many relationship where one user could have many lists. Each list therefore will reference the one user who created it. I added a foreign key as a constraint and made sure that, if the user it references is updated or deleted, the list will reflect those changes. (For example, if a user decides to delete their account, the lists they have created will also disappear.)

To represent the many-to-many relationship between users and videos and videos and lists, I had to create new tables that linked relevant ids together.

I created this table to link users and videos together:

```
user_id BIGINT NOT NULL,  
video_id CHAR(19) NOT NULL, 
date_bookmarked TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
CONSTRAINT fk_user  
FOREIGN KEY(user_id)  
REFERENCES users(user_id)  
ON DELETE CASCADE  
ON UPDATE CASCADE,  
CONSTRAINT fk_video  
FOREIGN KEY(video_id)  
REFERENCES videos(video_id)  
ON DELETE CASCADE  
ON UPDATE CASCADE,  
PRIMARY KEY(user_id, video_id)
```

The table above also includes a column for date bookmarked, as previously discussed.

Then, I created this table to link videos and lists together:

```
list_id BIGINT NOT NULL,  
video_id CHAR(19) NOT NULL,  
CONSTRAINT fk_list  
FOREIGN KEY(list_id)  
REFERENCES lists(list_id)  
ON DELETE CASCADE  
ON UPDATE CASCADE,  
CONSTRAINT fk_video  
FOREIGN KEY(video_id)  
REFERENCES videos(video_id)  
ON DELETE CASCADE  
ON UPDATE CASCADE,  
PRIMARY KEY(list_id, video_id)
```
