---
title: Semantic HTML
date: '2021-02-21'
description: 'this is my first blog post'
tags: semantic HTML
featuredImage: 
featuredImageAlt: 
---

I’m going to begin my blog posts with the topic of semantic HTML. I was never taught accessibility in school. I was never taught accessibility in the bootcamp I attended in 2018. Accessibility was something I happened to stumble across as I was trying to come up with a topic for a blog post I was required to write during bootcamp. I was shocked and saddened that I was never told about this very important topic. I kept digging into accessibility articles and just couldn’t get enough. It was also a bit overwhelming (I still re-read the Understanding pages for the WCAG success criteria). However, it’s really not so hard if you lead with empathy and stick with the basics. By the basics, I mean semantic HTML.

## What is Semantic HTML?
Semantic HTML is just plain old HTML.  Well, everything except ```<div>```’s and ```<span>```’s.  All of the non-```<div>``` and non-```<span>``` elements have intrinsic meaning to them.  Using an ```<img>``` element means that it is an image.  Using a ```<table>``` element means that it is a table.  Using an ```<h1>```, ```<h2>```, ```<h3>```, etc. means that element is a heading.  Semantic HTML elements represent things and give meaning to the code. 

## Why is Semantic HTML important?
```
<div class="heading-one">heading one</div>
<div class="heading-two">heading two</div>
```
You can style a bunch of ```<div>```’s to look like headings (like in the code sample above), but that won’t make them actual headings.  A visual user would be able to understand that they are headings.  A screen reader would just read the text, but give no hint that the text represents a heading.
Since the meaning is in the code (not the visual presentation of the code), it is not how it looks on the screen that matters.  It is the code that matters.  

## How Does Semantic HTML Give Meaning to the Code?
Each semantic HTML element has a role, name, and sometimes a state or value. For example, a checkbox would have a role of checkbox, a name/label that would describe what the checkbox is for, and a state of checked or not checked.  This is all built-in to HTML without the need for extra code, if the HTML is used according to the [HTML specification](https://html.spec.whatwg.org/).

The browser converts the code into the Accessibility Tree.  Each node or element that makes up the Accessibility Tree is an object with these meaningful keys of name, role, value.  If proper semantic HTML is used, assistive technology APIs are able to interact with the Accessibility Tree and can utilize this important information.   

## More Benefits of Semantic HTML
The information from the semantic HTML is not only important for screen readers, but also important for: 
* Voice to text software
* Search engines
* Browser tools/plugins
* Other technologies that may want to interact with your code

### Keyboard Functionality
Keyboard functionality is also built-in to semantic HTML elements.  For example, HTML ```<button>``` elements work with the Enter key or Spacebar key without any extra coding needed.  HTML ```<a>``` elements work with the Enter key by default.

### Visual Meaning
When you use semantic HTML alone, buttons look like buttons! Headings look like headings!
And users may use their own stylesheets to customize headings, links, text.  These CSS styles will likely target semantic HTML elements.

## Summary
Creating the DOM and the Accessibility Tree is the browser's responsibility. 
Our job as web developers is to be aware that this is going on, and to develop web pages that take advantage of this process to create an accessible experience for our users.  Using semantic HTML is the best way to ensure an accessible experience.
