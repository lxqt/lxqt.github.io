---
layout: post
title: Point Releases of Several Components
slug: Point-Releases-of-several-components
date: 2024-05-04 16:04
promoted: true
categories: release
---

The LXQt team announces point releases of the following components:

**xdg-desktop-portal-lxqt 1.0.2**

Changes:

* Fixed the initial path, which started to get broken with apps like Firefox recently. The credit goes to the KDE team for their solution in xdg-desktop-portal-kde.
  
The release can be downloaded from [Github](https://github.com/lxqt/xdg-desktop-portal-lxqt/releases).


**Image-Qt 2.0.1**

Changes:

* Fixed a crash on using annotations with Qt ≥ 6.7.
* Fixed a memory leak.

The release can be downloaded from [Github](https://github.com/lxqt/lximage-qt/releases).

**libfm-qt 2.0.1**

Changes:
* Removed a redundant child-parent relation in pathbar to prevent a rare crash with Qt ≥ 6.7.

The release can be downloaded from [Github](https://github.com/lxqt/libfm-qt/releases).

**lxqt-notificationd 2.0.1**

Changes:

* Prevented a random crash on killing the process with Qt ≥ 6.7.

The release can be downloaded from [Github](https://github.com/lxqt/lxqt-notificationd/releases).



