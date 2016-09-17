---
layout: post
title: Releases libsysstat 0.3.2, libqtxdg 2.0.0
slug: libsysstat-032-libqtxdg-200
date: 2016-09-17
promoted: true
categories: release
---

Today libsysstat 0.3.2 and libqtxdg 2.0.0 were released.   


The point release to libsysstat 0.3.2 just comes with a fix of a rare file descriptor leak and some improved documentation.   

In contrast to this, major changes took place in libqtxdg 2.0.0.   
XdgIconLoader was outsourced into a library libQt5XdgIconLoader.so, which broke the API of preexisting libQt5Xdg.so. The soname of the latter was hence bumped to libQt5Xdg.so.2.   
The library is now depending on qtsvg and able to use GTK Icon Cache in order to look up icons according to the Icon Theme Specification more quickly.   

For complete changelogs see the file CHANGELOG which will be included in the source tree of all components maintained by the LXQt project from their next release onwards.   
All future release archives will be provided in their GitHub repositories at github.com/lxde/COMPONENT/releases like https://github.com/lxde/libsysstat/releases in addition to downloads.lxqt.org.   

Another purpose of these two releases which are in preparation of LXQt 0.11.0 is to test various changes we made to the release management. So if you think there's something wrong with the archives, e.g. with signing or whatever, please let us know.   
