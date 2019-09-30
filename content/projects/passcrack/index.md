---
created: '2018-01-01'
updated: '2018-01-01'
banner: 'password.png'
title: 'passcrack'
description: 'Simple password cracking script based on a breadth-first manipulation of a given search dictionary'
topic: 'Software'
icon: 'code'
tags:
  - 'Python'
  - 'Security'
  - 'Utility'
github: 'carsonkk/passcrack'
---

## Hashes & Salts

**passcrack** was created to be a rudimentary password cracking script while I was studying security and cryptography. Given some hashed password, the salt used to hash it, and the encryption algorithm used, the script goes through a given dictionary of terms attempting to find a matching hash and decrypt the password. Beyond just attempting the password given in the dictionary file, it follows a series of "mutation rules", applying a mutation to every dictionary entry each step of the way. This effectively causes the dictionary's contents to fanout at an exponential rate, since each mutation from a previous step is saved and used in the next step.

When approaching this, I considered three options:

1) Brute force: simple and straightforward to implement, provide a lower and upper bound for length and a set of characters to generate each possible combination
2) Random attacks: similar to brute force in that it also takes a lower and upper bound and a set of characters, however this method would pick a random length and a random character for each position in each attempt, avoiding repeats
3) Dictionary attack: use a dictionary of terms and perform various permutations to their values 

I decided upon implementing a combination of 1 and 3. While there may be advantages to using the "random version" of the brute force attack, I wanted the code to be consistent for testing and output

By including a level system in the dictionary attack, the more simplistic permutations would be attempted first with the rationale being the average user is more likely to have a simpler password than a complex one due to laziness. Another important feature of the level system is that the the total findings outputted from one level are used as the "base" input to the next level. For instance, if the word "the" is in the originally provided dictionary file, then after level 1, a new file will be written which will contain:

```text
...
the
THE
The
ThE
tHe
...
```

Now there are five instances of the original entry "the". When the program begins level 2, this new file will be its input, so each of the permutations performed in level 2 will be performed on each manipulation from level 1. The idea behind this is that, while this makes the time-complexity orders of magnitude larger for each level, the overall time complexity isn't nearly as large as a pure brute force attack, and it abstracts the end-user from needing to know how the permutations works; they just need to provide a good dictionary. A big reason why brute forces are considered "dumb" is the same reason they are guaranteed to find the answer given enough time: they try every single possibility. It would be fair to assume that the average person does not use a purely random sequence of symbols, but rather some slight modification of something that has pre-existing meaning.

While what makes up a "good" dictionary may subjective, there are many things that do increase its usefulness. In my case, I used a dictionary of about 150k entries made up of common names, dates, places, passwords, and a subset of a standard english dictionary. By only relying on the brute force method as a last-resort means of finding the password, it is the specified dictionary that greatly influences the likeliness of finding the password, but the program still ensures that given enough time, it will almost certainly find the password.
