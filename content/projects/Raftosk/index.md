---
created: '2018-01-01'
updated: '2018-01-01'
banner: kiosk.png
title: 'Raftosk'
description: 'Distributed ticketing kiosk implemented using Raft consensus'
topic: 'Software'
icon: 'code'
feature: true
tags:
  - 'Distributed Systems'
  - 'CLI'
  - 'Java'
  - 'Networking'
  - 'Multithreading'
  - 'RMI'
github: 'carsonkk/Raftosk'
---

## Tickets for All

Similar to [Lamposk](/projects/lamposk), **Raftosk** is a distributed system based around an imaginary ticketing kiosk. Multiple customers (clients) can simultaneously submit transaction attempts to purchase tickets out of a single, common ticket pool shared by multiple kiosks (servers). 

The system implements the [Raft consensus protocol](https://raft.github.io/raft.pdf) as a means of achieving distributed consensus, leader election, etc, between all of the servers. Programmatically, this is done using Java's [RMI system](https://docs.oracle.com/javase/tutorial/rmi/index.html), which enables Java objects to interact with and act upon other Java objects located in different JVM's. Some of Raft's desirable characteristics include leader-only log management and a form of "joint consensus" which allows system operation to continue amidst configuration changes in terms of which servers make up a given cluster.
