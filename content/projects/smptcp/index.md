---
created: 2018-01-01
updated: 2018-01-01
title: smptcp
description: A client wrapper and simplified implementation of MultiPath TCP
topic: Software
icon: code
tags:
  - 'C'
  - 'Networking'
  - 'Sockets'
  - 'TCP'
  - 'MPTCP'
  - 'Utility'
github: 'carsonkk/smptcp'
---

## Working with Multipath TCP Connections

MPTCP, or the [Multipath Transmission Control Protocol](https://tools.ietf.org/html/rfc6824) is a variant of TCP which enables multiple connections, or "paths", to be established between two peers. This allows for enhanced communication in terms of both efficiency of data transfer as well as overall throughput for higher bandwidth scenarios such as video livestreaming. Due to the nature of how MPTCP is setup, it is inherently backward compatible with vanilla TCP. Having multiple paths also allows for data transfer to occurs with redundancy over each channel, which can be especially useful in wireless networks that use both mobile data and WiFi connections.

This project is meant to be a simplified implementation of MPTCP. While MPTCP is itself a work in progress, the aim here was to take a fundamental understanding of the core mechanics that make up TCP (slow start, congestion control, fast recovery, fast retransmit, etc), and implement them under the pretext that multiple channels of communication would be available. This was then simulate against a black-box server our implementation was meant to communicate with in ordered to validate our client code could achieve the desired redundancy/throughput metrics.
