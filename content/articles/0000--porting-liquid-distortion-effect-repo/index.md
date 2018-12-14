---
created: '2018-12-04'
updated: '2018-12-22'
banner: 'banner.png'
title: 'Porting The Liquid Distortion Effect Repo'
feature: true
topic: 'Web'
icon: 'desktop'
tags:
  - 'Frontend'
  - 'React'
  - 'Javascript'
  - 'CSS'
  - 'PixiJS'
  - 'Node'
  - 'Meta'
---

I was looking for some sort of image glitch/distortion effect to add to the slideshow of background images on my [landing page](http://carsonkk.com), when I found this neat [project demo](https://tympanus.net/Development/LiquidDistortion/) over on codrops. It had a nice [outline](https://tympanus.net/codrops/2017/10/10/liquid-distortion-effects) of its usage of the PixiJS library, and seemed to be exactly the kind of thing I was looking for.

However, I went through the tutorial only to run into multiple errors, and a closer inspection of the source revealed it was missing a good chunk of code actually needed to do anything with it. Others in the comments seemed to also have trouble getting the source code to work properly, with the only answer given being to ["run it on a server environment"](https://tympanus.net/codrops/2017/10/10/liquid-distortion-effects/comment-page-1/#comment-474865). Well unfortunately the repo has no "server environment" code written in it, with no mention in the README of how to locally run the demo after cloning it.

So, given all of this, I decided I'd figure out how to port it into my own site, then work backwards from my working copy and make an actually usable fork of the project with the minimum amount of server code to drive it.

Below I've outlined the steps I took and changes I made in order to get the repo into a functioning state, however if you're just interested in the finished product, feel free to check it out [here]().

## Cloning & Cleaning

