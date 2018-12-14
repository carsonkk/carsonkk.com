---
created: '2018-09-01'
updated: '2018-10-09'
title: 'HeckaDBMS'
description: 'DBMS stack including storage, two transaction proccessing protocols, and a client for submitting requests'
topic: 'Software'
icon: 'code'
tags:
  - 'HeckaDBMS'
  - 'C Plus Plus'
  - 'Databases'
github: 'carsonkk/HeckaDBMS'
---

## Hecka Transactions

**HeckaDBMS** is a fully-implemented database management system written in C++. The top-down view of the system includes:

- A command-line interface for issuing requests against the client. This includes both read and write requests, as well as the ability to launch concurrent requests
- A transaction manager which proxies the requests made by the client through one of the two available transaction protocols:
  * Strict 2PL
  * Microsoft's [Optimistic Hekaton](http://vldb.org/pvldb/vol5/p298_per-akelarson_vldb2012.pdf)
- Data storage in the form of an in-memory key-value store with an interface agnostic of the transaction protocol utilized

The system was designed to be evaluated on the basis of both how much the multi-threaded support helped when faced with heavy concurrent transaction loads, as well as how the system handled various read/write loads. The results of this evaluation compared Strict 2PL against Microsoft's own protocol in order to pinpoint the tradeoffs made with their design.
