---
created: '2018-01-01'
updated: '2018-01-01'
banner: 'luber-logo-lg.png'
allowCropping: false
transparentLogo: true
logo: 'favicon.png'
title: 'Luber'
description: 'A ridesharing web application designed for scalability'
topic: 'Web'
icon: 'desktop'
feature: true
tags:
  - 'Ruby'
  - 'Rails'
  - 'Web Application'
  - 'AWS'
  - 'Scalability'
github: 'carsonkk/Luber'
website: 'luber-services.herokuapp.com'
---

## Lyft + Uber = Luber: A (not so) New Kind Of Rideshare

Sharing economy is efficient, environmentally-friendly and accessible to all. Companies such as Airbnb and Uber have rapidly risen to claim a substantial chunk of their respective markets from more traditional businesses. 

When it comes to rideshare in particular, Uber, Lyft, and their various clones have simplified getting from point A to point B. However despite the success of these new services, a major point they lack in is the potential market for users who need to travel on much more extended trips, as their current model makes such trips quite expensive.

This is where the make-believe application coined as "Luber" comes in. Luber is basically a booking system, in which the car owners can post the availability of their car in terms of time, location, model, mileage, photo and price. In turn, users can search according to these parameters and the service will find the best match for both sides. We believe this model of short-term vehicle loans would be much more conducive to a userbase that plans to travel far distances, go on road trips, or need a car on a semi-regular basis.

## Motivation

Beyond the concept of this demonstration application, this project was meant to serve as a learning experience for building a web application from scratch using Ruby on Rails as the basis for the project. To make the project more interesting in terms of its complexities, we fully designed/implemented the frontend interface, added a number of different ways to view data about a car loan (user transaction), dynamically rendered information differently depending on if the user was the car owner, the car loaner, a website administrator, or just a guest on the website, and so on. We deployed the site using Amazon EC2's Elastic Beanstalk and ran load tests against it using Tsung to benchmark how our caching methods would help performance during periods of user (and in response resource) scaling.

*This project was a joint effort between Justin Pearson, Michael Zhang, Sammy Guo, Sujaya Maiyya, and myself*