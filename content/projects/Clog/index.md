---
created: '2018-03-01'
updated: '2018-03-01'
title: 'Clog'
description: 'A simple, versatile logging library for C'
topic: 'Software'
icon: 'code'
tags:
  - 'C'
  - 'Logging'
  - 'Utility'
github: 'carsonkk/Clog'
#website: 'carsonkk.github.io/Clog'
---

## Logging Made Easy

Clog is meant to be a drop-in solution to logging in C projects. It combines a verbose set of customizable options with a set of smart defaults making it easy to get immediate feedback. Some of its more appealing features include:

- Severity level hierarchy
- Colored terminal output to convey severity
- Cleanly formatted meta information for each log output

All of the features listed can be customized by the developer through the library API at both the initialization as well as anytime during execution. This enables hot-swapping between different styles and hierarchies of log messages, which can be useful when dealing with multiple log files.

*This library is currently under experimental development and does not yet have a stable release*

## Building a Package

Clog is my first real attempt at building a software library for C that could actually be distributed. While writing a functional piece of code in C is one thing, packaging it in a usuable form for anyone else to use is another. Some of the considerations and tasks this included were:

- Supporting multiple compliance guides (C89/C99/POSIX)
- Supporting usage in a multi-threaded setting
- Allowing the end-user to supply their own allocator
- Multiple means of actually using the library:
  * Simply dropping the main `.c` and `.h` files into ones project
  * Using `make` to build/test the library's functionality
  * Using `cmake` to include the library
  * Using `autoconf`+`make` for proper support validation before building
- Support for multiple platforms including Linux/Mac/Windows
- Complete documentation and test coverage

Beyond all of this however, it's simply a library that makes logging events in C super simple. Inspired by [this repo](https://github.com/rxi/log.c) with its colored console output, I began writing my own logging library for all of my C projects. However I quickly found the potential for all sorts of features and ways in which one could tailor a logger to suit their needs, and wanted to take on the task of building one that was both as easy as possible to get started with, and as extensible as possible in its feature set for more advanced usage.