---
layout: post
title: Point Releases of pavucontrol-qt and lxqt-config
slug: Point-Releases-of-pavucontrol-qt-and-lxqt-config
date: 2026-11-12 19:14
promoted: true
categories: release
---

The LXQt team announces point releases of the following components:

**pavucontrol 2.5.1**

Changes:

 * Handled stream state changes and prevented memory leaks (in `MinimalStreamWidget`).
 * Fixed a case of hanging on restarting the sound server, by fixing the iterator invalidation in `MainWindow::removeAllWidgets`.
 * Purged `<normaloff>` and `<hints>` in ui files.
  
The release can be downloaded from [Github](https://github.com/lxqt/pavucontrol-qt/releases).


**lxqt-config 2.5.1**

Changes:

 * A native X11 backend is added (after kscreen 6.8 dropped its X11 support).

<br/>
The release can be downloaded from [Github](https://github.com/lxqt/lxqt-config/releases).



