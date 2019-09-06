---
created: '2018-07-01'
updated: '2018-01-01'
banner: gestur.png
logo: logo.png
transparentLogo: true
title: 'Gestur'
description: 'Glove-based VR controller with haptic feedback'
topic: 'Hardware'
icon: 'microchip'
feature: true
tags:
  - 'Embedded Systems'
  - 'Sensors'
  - 'Haptic Feedback'
  - 'Glove'
  - 'VR'
  - 'DotNET'
  - 'C'
  - 'C Sharp'
  - 'Software Application'
  - 'Video Games'
  - 'Senior Project'
  - 'Capstone'
---

## Touching Virtual Worlds

With the releases of the Oculus Rift, HTC Vive, Microsoft Hololens, and Google Daydream, virtual reality is rapidly evolving from an awkward, emerging concept into an industry in and of itself. Advances in VR hardware come out on a near monthly basis, and the virtual environments users interact with seem to be matching pace with improvements in both their expansiveness and overall interactability. Unfortunately, existing hardware peripherals for VR lack key features needed to fully leverage what these environments have to offer. Namely, they still rely on physical designs derived from traditional-style video game controllers. For instance, a simple interaction such as picking up an object is accomplished by pointing a controller at the object and pressing a button. Rather than this, Reihlo believes the future for interacting with virtual environments lies in e-wearables; clothing with integrated electronics. Their project, Gestur, aims to meet this vision by providing a glove-based controller for VR platforms as an alternative to more “standard” controllers. 

Gestur is a glove with an attached sleeve which extends approximately half the length of the forearm. The brains of it are comprised of a primary board located on the top of the forearm which handles all data processing and message passing and a secondary board on the back of the hand equipped with a 10 degrees-of-freedom IMU for obtaining orientation and location data. Additionally, the glove is equipped with a myriad of components, including 24 flex sensors positioned at key joints on the fingers, palm, and wrist, 4 touch sensors positioned on the middle digit of each finger and controlled by the thumb, and 10 linear resonant actuators (LRAs) targeting specific nerve clusters around the fingers and palm. The primary board is equipped with a Bluetooth chip and li-po battery charger for full wireless usage. Its role on the glove is not only to process data, but to proxy the sending of sensor data to the host computer as well as receiving haptic feedback data from the host computer to control the LRAs. The secondary IMU board utilizes on-board processing to both obtain the yaw, pitch, and roll of the glove and derive AHRS data for the glove’s overall world-space position. By performing some senor fusion between this and the flex sensor data in post-processing, a finely tuned 3D model can be built which demonstrates high levels of fidelity in representing the human hand, including the amount of bend in each finger digit and degree of rotation of the overall hand. The touch sensors are made of conductive fabric, which eliminates the need for mechanical push buttons while retaining the traditional-style of controllers with buttons as inputs. Finally, the LRAs are controlled by chains of PWM signals, which enables the glove to associate different textures or forces of impact with different sensations. 

The area of electronics known as e-wearables is nothing new, with one of the oldest examples dating back to the release of Nintendo’s Power Glove in 1989. With the advent of hobbyist-friendly embedded solutions such as Arduino and Raspberry Pi, many new forms of e-wearables have been designed and posted online over the past few years, with gloves being no exception. Gestur was originally conceived during Spring Quarter of 2015 as a project for ECE 92 (currently known as ECE 5), which at the time was a lower-division independent studies course in which teams made a project based around an Arduino. The glove started out with only 5 flex sensors, a 6 degrees-of-freedom IMU, and 4 touch sensors, and was only capable of mapping simple gestures to button on a keyboard. Since then, the Reihlo team has experimented with many different concepts for improving the quality and usability of the glove, while keeping its profile to a minimum, with the goal of designing a drastically improved version for Capstone. From a mechanical perspective, the methodologies Reihlo has used to attach sensors and route wires has gone through multiple prototyping stages to achieve the current level of freedom for the user’s hand. The primary control board has gone through two iterations of design, from a 4-layer test-board approximately 8” x 8”, to the final 6-layer board measuring 2.5” x 5.5”. The knowledge and test results gained from the first spin has helped both to optimize the component choices and layout of the second spin, and to expedite the embedded software development. A forward-thinking style software pipeline was established, starting with a custom software application that would emulate the data the final glove would eventually produce. With this is place, the post-processing API and Unity demonstration game could be developed well before the final glove was finished. 

During the initial brainstorming phase, the team looked to the internet for inspiration, and noticed many trends in the types of gloves being created. It seemed that each glove either lacked enough sensors to represent a hand in 3D space with any high level of resolution, or was over-encumbered by bulky exoskeletons in an attempt to truly realize haptic feedback. As opposed to those designs, Reihlo’s core principal with Gestur has been to design a glove which finds a solid middle ground, balancing the amount of hardware integrated into the glove with the user’s range of motion. 

A full album of pictures can be found [here](https://imgur.com/a/wCUvB0h) and the project presentation can be found [here](Final-Presentation.pdf), below are a few highlights.

<a class="imgur" href="https://imgur.com/a/wCUvB0h#10" target="_blank" rel="external nofollow noopener noreferrer"><img src="https://imgur.com/7aWovXV.jpg"/></a>

<a class="imgur" href="https://imgur.com/a/wCUvB0h#12" target="_blank" rel="external nofollow noopener noreferrer"><img src="https://imgur.com/SvXXVdt.jpg"/></a>

<a class="imgur" href="https://imgur.com/a/wCUvB0h#16" target="_blank" rel="external nofollow noopener noreferrer"><img src="https://imgur.com/lZ4bD6J.jpg"/></a>

<a class="imgur" href="https://imgur.com/a/wCUvB0h#24" target="_blank" rel="external nofollow noopener noreferrer"><img src="https://imgur.com/gO3abpb.jpg"/></a>

*This project was a joint effort between Ryan Kaveh, Jonathan Young, and myself. Assistance provided by Ryan Lee and Ryan Tsukamoto. Advisement and guidance provided by Prof. John Johnson, Prof. Yoga Isukapalli, Caio Motta, Celeste Bean, Will Miller, Prof. Forrest Brewer, and Prof. Yon Visell.*