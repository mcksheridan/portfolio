---
title: "Creating User Stories for a MERN Stack TikTok Bookmark Organizer"
date: "2020-08-06"
layout: layouts/post.njk
tags: 
  - "development"
  - "mern-stack"
  - "tiktok-project"
description: "During quarantine, TikTok became one of my new favorite sources for entertainment. A never ending series of relatively quick (and mostly fun) videos on a wide variety of topics is a fun way to pass the time. One feature TikTok has is the ability to like videos and store these videos within a folder on the app. However, after several months of liking videos, earlier bookmarks that I wanted to return to were buried very deeply within this folder. The app has no way of sorting these videos or organizing them into folders. After becoming frustrated by not being able to find some of my older bookmarked videos, I decided to build my own external TikTok bookmark organizer."
---

During quarantine, TikTok became one of my new favorite sources for entertainment. A never ending series of relatively quick (and mostly fun) videos on a wide variety of topics is a fun way to pass the time. One feature TikTok has is the ability to "like" videos and store these videos within a folder on the app. However, after several months of liking videos, earlier bookmarks that I wanted to return to were buried very deeply within this folder. The app has no way of sorting these videos or organizing them into folders. After becoming frustrated by not being able to find some of my older bookmarked videos, I decided to build my own external TikTok bookmark organizer.

I knew that I would need a backend for an application like this. As I already knew some JavaScript, I decided to learn (and implement the app with) NodeJS, Express, and mongoDB to make a CRUD application. Before diving deep into learning about these concepts, I decided to create a series of requirements to pinpoint what I wanted to build.

- As a website visitors, I want to be able to log in to or register an account to save my videos and bookmark folders.
- As a registered user, I want to be able to enter URLs for TikTok videos and save these into a default "master" bookmark list.
- As a registered user, I want to be able to permanently delete saved videos that I don't like from the master list.
- As a registered user, I want to be able to create, rename, and delete bookmark folders. I want to be able to add videos to these folders from my master list. I still want these videos to appear in my master list. I want to be able to add videos directly to a bookmark folder and have the video appear in the master list as well.
- As a registered user, I want to be able to add multiple videos to one bookmark folder simultaneously.
- As a registered user, I do not want to see duplicate videos in my bookmark folders or my master list.
- As a registered user, I want to be able to delete video from a bookmark folder without deleting it from the master list of videos.
- As a registered user, I want to be able to change the order of videos in a bookmark folder.
- As a registered user, I want to be able to search my master list using tags and/or video descriptions that TikTok content creators have added.
- As a registered user, I want to be able to share a bookmark list with a friend who does not have an account.
- As a user, if a video that I saved is no longer available on TikTok, I should be able to see name of the content creator and the description for the video.
- As a desktop user, I want to be able to view my saved TikToks in the same browser window.
- As a mobile user, I want to be redirected to the TikTok application (or to the TikTok website) to view videos.

There's a lot in front of me to tackle, but I'm looking forward to breaking down each user story into technical requirements and learning how to implement them!
