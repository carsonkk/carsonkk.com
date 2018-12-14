---
created: '2018-01-01'
updated: '2018-01-01'
title: 'blockstore'
description: 'A distributed key-value storage system built on top of blockchain technology'
topic: 'Software'
icon: 'code'
tags:
  - 'blockstore'
  - 'Blockchain'
  - 'Databases'
  - 'Distributed Systems'
  - 'JavaScript'
  - 'TypeScript'
  - 'C Plus Plus'
github: 'carsonkk/blockstore'
misc: '__misc__/index.md'
---

## Abstract

Blockstore is a key-value storage system built upon a variant of Nakamoto's Blockchain as described in the [Bitcoin white paper](https://bitcoin.org/bitcoin.pdf). The overarching idea behind a system like this is to mitigate the cost, both in terms of storage space and network bandwidth, associated with web applications containing large amounts of data.

## Use Case

Websites where both the generation and consumption of content is driven by users, and where a natural sharding of the website around subcommunities occurs, perfectly fit the services provided by a blockchain-backed data storage solution. Some more popular examples could include [reddit.com](https://www.reddit.com/) and [youtube.com](https://www.youtube.com/), with 'subreddits' and 'channels' acting as the sharding boundary. Each shard acts as it's own blockchain instance, mitigating much of the agreement contention that would occur otherwise, forming a sort of [subchaining hierarchy](https://www.bitcoinunlimited.info/resources/subchains.pdf). Additionally, by storing writes to each shard as a blockchain, desirable features such as checkpointing and failure recovery can be easily achieved.

## Combining Databases and UX

Another interesting aspect of this system is the economy it can create on the platform itself. While the blockchain instances by default would be run internally by the platform's owner, they have the option of asking the community for support in exchange for incentives on the platform. For instance, imagine a web application that costs some small monthly fee to use, in exchange for both access to the platform and a guarantee of the privacy of your information. Traditionally, this monthly fee would then be put towards the hosting of the website as well as the costs of the storage and bandwidth of serving the users' data. Instead, a user could agree to host some portion of a blockchain replica, likely for one of the subcommunities they care about, in place of a monthly fee. Alternatively, the site could be free to all, but those that contribute to serving some of the bandwidth would receive additional perks. "Gig-economy website hosting" schemes such as this become viable given the semantics of storing the data through multiple sharded/replicated blockchain instances, which are forced to confirm the validity of their contents against one another.

## Afterword

When we conceived the idea for this project, Bitcoin was coming off it's major 2017/2018 peak and everyone and their mother was on about blockchain. It seemed like every day a new startup was announced with the goal of needlessly building something that already worked, *but with blockchain*. This was our attempt to both better understand the underlying implementation of a blockchain, as well as have some fun with our own needlessly-blockchained invention. I do however still like the idea of gig-economy websites that this project had the potential to fuel. Whether it be through users' helping host the website, serve the data, or administer it in some other manner, its a fun concept that builds a sense of community on the userbase. There are a couple examples of sites like this out there (beyond just having a "donate to keep the site alive" button), but often the system by which users contribute to the site's functionality seems to bog down the actual experience of using the website. It would be interesting to see the concept expanded further in some form or another.