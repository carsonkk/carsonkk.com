---
created: '2019-09-06'
banner: 'checkers.png'
title: 'boARd'
description: 'Augmented reality Android application for local multiplayer board games'
topic: 'Software'
icon: 'code'
tags:
  - 'Augmented Reality'
  - 'AR'
  - 'Android'
  - 'Mobile Application'
  - 'Game Development'
  - 'Java'
  - 'C Sharp'
  - 'Unity'
  - 'Vuforia'
github: 'carsonkk/boARd'

---

**boARd** was a term project for a class focused on embedded hardware architecure and mobile software development. Tha application's initial concept was to be an AR multiplayer game where the players each use their phone to view and control the game pieces of a virtual board game. 

We started off by creating checkers as the first game to implement since its ruleset is relatively simple and making the 3D model assets would be trivial. Using Unity as the game engine and the Vuforia AR library, we were able to get a single player version of the game working, however as we began adding the local multiplayer, we began to learn about a number of networking pitfalls that came with Unit's networking library at the time. The library was in a period of transition and much of the documentation was outdated or too obfuscated for us to understand. 

In the end we were able to get some multiplayer aspects (starting a local network game session, connecting to a session, moving pieces) working, however there were too many edge cases that would cause inconsistencies in the players' views of the game for it to be called a complete success. It ended up being more of a learning experience than anything else, particularly for the importance of researching libraries ahead of time enough to identify major issues that can be avoided by simply using a different library.

*This project was a joint effort between Jonathan Young and myself*