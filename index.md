---
layout: default
title: Home
---

# My Notes

<ul>
  {% for note in site.notes %}
    <li>
      <a href="{{ note.url | relative_url }}">{{ note.title }}</a>
      <span style="color: #888;">({{ note.date | date: "%Y-%m-%d" }})</span>
    </li>
  {% endfor %}
</ul>
