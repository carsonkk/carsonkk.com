---
created: '2018-01-01'
updated: '2018-01-01'
banner: experimental-cloud.png
title: 'Mandrake'
description: 'Durability and fault tolerance for small-scale clouds at the network edge'
topic: 'Software'
icon: 'code'
feature: true
tags:
  - 'Cloud Computing'
  - 'Edge Computing'
  - 'Fault Tolerance'
  - 'Data Durability'
  - 'Resource Management'
  - 'C'
  - 'Python'
  - 'Multithreading'
  - 'Networking'
  - 'API'
---

## Durability at the Edge

Due to the recent growth in Internet of Things (IoT) deployments, an increasing demand has formed for computational infrastructure that can match these deployment's data processing requirements. Such infrastucure, often refferred to as "edge clouds", represents a relatively new branch of cloud computing which attempts to co-locate computational resources with the clusters of IoT devices they support. Edge clouds face many additional challenges compared to their data center-based counterparts, including a severely restricted pool of hardware resources, and in some cases, operating in remote and/or inhospitable environments. Given these conditions, a single failure within an edge cloud has the potential to take nontrivial proportions of the cloud "offline". The delay before manual human servicing can restore such a failure could be days, weeks, or even months.

Mandrake Coordinator (MC) is a software system designed to provide resource management and reprovisioning facilities to edge clouds. The MC provisions virtual machines (VMs) within a given cluster for some user application(s) to use. When a failure, or conversely a recovery, occurs, the MC detects this and reprovisions the VMs running on the cloud while maintaining a mapping of how each host and VM are related. It exposes this mapping through a set of APIs to services running within the VM, enabling them to make more informed decisions about data replication and failover by breaking the "traditional cloud model" of abstraction. This in turn significantly increases the availability and fault tolerance of virtualized user applications.

Mandrake was published in the [2019 IEEE Conference on Edge Computing (EDGE)](https://conferences.computer.org/edge/2019/), and can be found [here](https://ieeexplore.ieee.org/document/8812212). My masters defense presentation on the project can be found [here](Mandrake-Coordinator.pdf).

*This project was a joint effort with John Thomason responsible for the Mandrake Application Orchestrator (MAO) and myself responsible for the Mandrake Coordinator (MC). Research advisement/assistance was provided by Markus Mock, Rich Wolski and Chandra Krintz.*
