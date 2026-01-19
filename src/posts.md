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
    <span class="posts__details">
      <a href="{{ post.url }}">{{ post.data.title }}</a>
        <time datetime="{{ post.date | htmlDateString }}">
          {{ post.date | date: "%b %-d, %Y" }}
        </time>
    </span>
    Tags: <ul class="tags">{% for tag in post.data.tags %}<li><a href="/tags/{{ tag }}/">{{ tag }}</a></li>{% endfor %}</ul>
  </li>
{% endfor %}
</ul>

{% assign last_page = pagination.href.last | split: "/" | last | times: 1 %}

{% capture list_class_name %}
{% if pagination.pageNumber == last_page %}
left-align
{% elsif pagination.pageNumber == 0 %}
right-align
{% else %}
center
{% endif %}
{% endcapture %}

<nav class="pagination"><h2>Page {{ pagination.pageNumber | plus: 1 }} of {{ last_page | plus: 1 }}</h2><ul class="{{ list_class_name | strip_newlines }}">{% if pagination.previousPageHref %}<li><a href="{{ pagination.firstPageHref }}"><span aria-hidden>&lt;&lt </span>First Page</a></li><li><a href="{{ pagination.previousPageHref }}"><span aria-hidden>&lt; </span>Previous Page</a></span>{% endif %}{% if pagination.nextPageHref %}</li><li><a href="{{ pagination.nextPageHref }}">Next Page<span aria-hidden> &gt;</span></a></li><li><a href="{{ pagination.lastPageHref }}">Last Page <span aria-hidden> &gt;&gt;</span></a>{% endif %}</li></ul></nav>
