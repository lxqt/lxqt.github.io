---
layout: post
title: Qps Revisited
slug: qps-revisited
date: 2022-12-09 18:29
promoted: true
categories: blog
---

The LXQt process manager [Qps](https://github.com/lxqt/qps) has a quite ancient codebasis and some features (like a watchdog and command executing) were planned but never realized and Qt has evolved much since too. So it was time to clean up the code a little bit and give some love to the history graph and it's tooltips which didnt display any useful information.

Before:

![Qps old](../../../../../images/posts/qps-old.png)

Now a summary of CPU usage and I/O at the moment of the mouseover is displayed and the font has been increased:

![Qps new](../../../../../images/posts/qps-new.png)

![Qps new](../../../../../images/posts/qps-new.2.png)

Other tooltips display the CPU load for system, user and nice processes, the memory (total, used, cached and buffered) and an eventual swap usage. Sitting in the systray the icon displays the CPU usage history nicely as before, acting as an CPU monitor.

