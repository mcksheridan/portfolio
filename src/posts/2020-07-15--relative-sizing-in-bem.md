---
title: "Relative Sizing in BEM"
date: 2020-07-15
layout: layouts/post.njk
tags: [bem, css, html]
description: "I am always trying to write cleaner code (although I realize I didn't always have this philosophy when I look at some of my older projects). Learning about CSS architecture makes me feel one step closer to achieving that goal. After reading about naming conventions in BEM, I decided to test drive my newfound knowledge by creating a simple landing page for my website."
---

I am always trying to write cleaner code (although I realize I didn't always have this philosophy when I look at some of my older projects). Learning about CSS architecture makes me feel one step closer to achieving that goal. After reading about [naming conventions in BEM](http://getbem.com/naming/), I decided to test drive my newfound knowledge by creating a simple landing page for my website.

<figure>
<img src="/media/2020/07/images/Screen-Shot-2020-07-15-at-2.51.30-PM-1024x559.png" alt="mcksheridan.com landing page concept with the blog link written in turquoise" />
<figcaption><a href="http://mcksheridan.com">mcksheridan.com</a> landing page concept</figcaption>
</figure>

The concept was minimalist: a quick paragraph to point visitors to this blog and links to my social media accounts. I made the text larger, changed a few colors, and added responsive styles for visitors on smaller screens. For the most part, I found creating stylesheets with BEM to be a straightforward experience.

My design felt a bit _too_ minimalist, so I decided to indicate that "web development" was a keyword by changing both its font weight and color of the words. The words "web development" were contained within a `<p>` tag in a `<div>` tag with a class of `.content`. According to the standards established by BEM, this text could be in a `<b>` tag with a class of `.content--blue` (or some other modifier in place of blue).

<figure>
  <img src="/media/2020/07/images/Screen-Shot-2020-07-15-at-3.14.17-PM-1024x559.png" alt="Revised mcksheridan.com landing page with the words web development in a different blue color" />
  <figcaption>Revised <a href="http://mcksheridan.com">mcksheridan.com</a> landing page</figcaption>
</figure>

I discovered an error in my stylesheet after reviewing the BEM documentation. In addition to the modifier (`.content--blue`), I would also need to add the block (or element) to the class as well. I changed `.content--blue` to `content content--blue` and retained my original stylesheet. This resulted in the relative font size I was using in the `.content` class increasing again for everything in the `.content--blue` class.

<figure>
<img alt="Error on the mcksheridan.com landing page where the word web appears way too big" src="/media/2020/07/images/Screen-Shot-2020-07-15-at-5.49.54-PM-1024x559.png" />
<figcaption>Error on the <a href="http://mcksheridan.com">mcksheridan.com</a> landing page</figcaption>
</figure>

I initially fixed this issue by setting the font size for the `.content--blue` to "inherit", but adding extra code seemed counterintuitive. I reviewed the style for the `.content` block and decided that there must be a way to solve this issue by using a different unit of measurement for the font size in `.content`. Previously, `.content--blue` inherited its font size from `.content`, but now the "web development" text both inherited the font size from `.content` and had it reapplied as part of its own class. This caused the text to appear at `5em` of `5em`, or `25em` relative to the root.

I solved the problem by changing the unit of measurement for the font size in `.content` from `em` to `rem`. By measuring from the root of the document, I did not run the risk of the font size increasing due to the font size of its parent block (or parent element). I look forward to working with BEM again--with different relative units.
