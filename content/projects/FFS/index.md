---
created: '2019-09-06'
banner: 'storage.png'
title: FFS
description: Linux-compliant file system using libfuse
topic: Software
icon: code
tags:
  - 'File System'
  - 'Operating System'
  - 'Linux'
  - 'C'
  - 'libfuse'
github: 'carsonkk/FFS'
---

## Building a Filesystem

FFS is a "Linux-compliant" filesystem built on top of [libfuse](https://github.com/libfuse/libfuse), which is the standard implementation of Linux Filesystems in Userspace (FUSE). This project was an exercise in both understanding the composition of a filesystem, and implementing said understanding in such a way that it could be used alongside an existing Linux installation as the filesystem for a secondary disk. 

## High-level Design

The system was built as an iterative process in two separate stages. The first stage was built to run on an in-memory storage system for the purpose of being able to dump the entire contents of the allocated memory and easily inspect/debug the system on the fly. The second stage involved redefining the values for a set of macros which would allow the system to function in the context of a much larger hard disk. These macros were defined as:

| Macro             | Memory Storage                           | Disk Storage                             |
| ----------------- | ---------------------------------------- | ---------------------------------------- |
| Block Size        | 1024 B                                   | 4096 B                                   |
| Block Number Size | 4 B                                      | 4 B                                      |
| Inode Contents    | 8 direct, 3 1st indirect, 1 2nd indirect | 8 direct, 3 1st indirect, 5 2nd indirect |
| Total Blocks      | 66,312                                   | 5,245,960                                |
| Total Bytes       | 67,903,488 B (apprx. 64.75 MiB)          | 21,487,452,160 B (apprx. 20.01 GiB)      |

The disk itself was broken up into 5 components- the super block, the free inode list, the free data block list, the inode blocks, and the data blocks.

## Testing

Validating the functionality of the filesystem was done by first running `mkfs` on a raw disk to format it according to the filesystem's implementation of the command, then running a series of common commands involving filesystem calls, which would get trapped and redirected by libfuse to our filesystem instead of the host OS's filesystem.

*This project was a joint effort by Nikolas Chaconas, Alvin Oliver Glova, and myself*