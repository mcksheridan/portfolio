---
layout: layouts/base.njk
title: Posts
pagination:
  data: collections.posts
  size: 5
---

<ul class="posts">
{% for post in pagination.items %}
  <li>
    <span>
      <a href="{{ post.url }}">{{ post.data.title }}</a> - 
        <time datetime="{{ post.date | htmlDateString }}">
          {{ post.date | date: "%b %-d, %Y" }}
        </time>
    </span>
    <br />Tags: <ul class="tags">{% for tag in post.data.tags %}<li><a href="/tags/{{ tag }}/">{{ tag }}</a></li>{% endfor %}</ul>
  </li>
{% endfor %}
</ul>

<nav aria-label="Pagination">
  {% if pagination.previousPageHref %}
    <a href="{{ pagination.previousPageHref }}">Previous</a>
  {% endif %}
  {% if pagination.nextPageHref %}
    <a href="{{ pagination.nextPageHref }}">Next</a>
  {% endif %}
</nav>
