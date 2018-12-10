---
title: drngs
description: Experimenting with deterministic RNGs
category: Software
icon: code
feature: true
tags:
  - drngs
  - C
  - Software Library
github: carsonkk/drngs
---

## Random Numbers

**drngs** is an evaluation of different algorithms commonly used to implement determinsic random number generators (also known as [Psuedorandom number generators](https://en.wikipedia.org/wiki/Pseudorandom_number_generator)), which are often used indirectly by developers when implementing anything that relies on random behavior. Since "true randomness" can only be achieved at the [hardware level](https://en.wikipedia.org/wiki/Hardware_random_number_generator), these pseudo-random algorithms do their best to create the illusion of randomness from some initial seed value, often through bit shifting and manipulation. This evaluation included looking at the Linear Congruential Generator, Blum-Blum-Shub, Rabian, RSA, Micali-Schnorr RSA, Power Generator, and Naor-Reingold algorithms, focusing on the speed of each algorithm in terms of both real-world time and CPU-cycles.

## A Better Random Number Generator

An additional goal of this repo was to produce a wrapper around C's standard library implementation of randomness (`rand()` and `srand()`) which would provide a more powerful and well-defined random number generator. This included things like mapping `rand()`'s output over a proper linear distribution to a user defined range, as well as a means to generate unique non-repeating sequences of random values from said range.
