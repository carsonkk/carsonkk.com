---
created: '2018-06-01'
updated: '2018-06-01'
title: 'drngs'
description: 'Evaluating various deterministic RNGs'
topic: 'Software'
icon: 'code'
tags:
  - 'C'
  - 'Research'
github: 'carsonkk/drngs'
misc: '__misc__/index.md'
---

## Random Numbers

**drngs** is an evaluation of different algorithms commonly used to implement determinsic random number generators (also known as [psuedorandom number generators](https://en.wikipedia.org/wiki/Pseudorandom_number_generator)), which are often used indirectly by developers when implementing anything that relies on random behavior. Since "true randomness" can only be achieved at the [hardware level](https://en.wikipedia.org/wiki/Hardware_random_number_generator), these pseudo-random algorithms do their best to create the illusion of randomness from some initial seed value, often through bit shifting and manipulation. This evaluation included looking at algorithms such as the Linear Congruential Generator, Blum-Blum-Shub, Rabian, RSA, Micali-Schnorr RSA, Power Generator, and Naor-Reingold, focusing on the speed of each algorithm in terms of both real-world time and CPU-cycles.

## A Better Random Number Generator

An additional goal of this project was to produce a wrapper around C's standard library implementation of randomness (`rand()` and `srand()`) which would provide a more feature-rich and well-defined random number generator. This included things like mapping `rand()`'s output over a proper linear distribution to a user defined range, as well as a means to generate unique non-repeating sequences of random values from said range.
