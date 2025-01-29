---
layout: post
title: Point Releases of lximage-qt and lxqt-runner
slug: Point-Releases-of-lximage-qt-lxqt-runner
date: 2025-01-29 14:44
promoted: true
categories: release
---

The LXQt team announces point releases of the following components:

**LXimage-Qt 2.1.1**

Changes:

 * Don't set a limit for image size (Qt6 had set an allocation limit of 256 MiB).
 * Fixed invalid `nullptr` parameter in `QObject::connect` (and so, silenced a warning).
 * Fixed a small miscalculation in selection screenshot.
 * Ensure the current thumbnail is in the visible part of the thumbnail bar.
 * Fixed a problem in rectangular annotations.
  
The release can be downloaded from [Github](https://github.com/lxqt/lximage-qt/releases).


**lxqt-runner 2.1.2**

Changes:

 * Fixed a regression that broke case-insensitive filtering in some cases.


The release can be downloaded from [Github](https://github.com/lxqt/lxqt-runner/releases).
