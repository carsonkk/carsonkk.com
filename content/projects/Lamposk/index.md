---
created: '2018-11-06'
updated: '2019-09-06'
banner: kiosk.png
title: Lamposk
description: "Distributed ticketing kiosk implemented using Lamport's Bakery Algorithm"
topic: Software
icon: code
tags:
  - 'Distributed Systems'
  - 'Networking'
  - 'Sockets'
  - 'Multithreading'
  - 'C'
  - 'pthreads'
  - 'CLI'
github: carsonkk/Lamposk
---

## Modeling Distributed Consensus

**Lamposk** is a command-line based toy application that's meant to achieve distributed consensus in the context of purchasing tickets. In particular, the case study involves a single pool of tickets from which 5 kiosks (or servers/datacenters) pull their inventory from. A variable number of customers (clients) initiate transactions with the various kiosks at any given time, and its up to the system correctly handle the transactions to completion.

The system uses [Lamport's Bakery Algorithm](https://en.wikipedia.org/wiki/Lamport%27s_bakery_algorithm), which (generically speaking) describes a model for achieving mutual exclusion over a shared pool of resources. This means that a set of clearly established rules prevents any kiosk from selling a customer tickets that have already been sold, and thus no longer exist.

This specific implementation is written in C. It uses [pthreads](http://man7.org/linux/man-pages/man7/pthreads.7.html) for all of its thread handling, and C's socket library for all network communication. As a result, a nontrivial portion of the codebase is made up of just getting sockets to work without race conditions in a multi-threaded environment (I later decided to switch to using Java/RMI for the follow-up project to this, [Raftosk](/projects/raftosk)).