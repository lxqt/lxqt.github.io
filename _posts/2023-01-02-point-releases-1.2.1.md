---
layout: post
title: Three Point Releases
slug: 3-point-releases
date: 2022-12-31 14:48
promoted: true
categories: blog
---

The LXQt team has decided to release point releases for three main components:

The main reason for the [point release](https://lxqt-project.org/release/2023/01/02/lxqt-panel-1-2-1/) of lxqt-panel was a change of behavior in xfwm4 version 4.18, which caused full-screen windows to go under the panel. A regression in the volume popup is also fixed and a Qeye plugin has been added.

For libfm-qt the [point release](https://lxqt-project.org/release/2023/01/02/libfm-qt-1-2-1/) provides a smooth Wayland experience with apps that are based on `libfm-qt`, especially PCManFM-Qt. Several problems are fixed regarding Wayland, like context menus, drag-and-drop, and launching of XWayland apps. Also, the minimum width of name column is increased in the detailed list mode.

The [point release](https://lxqt-project.org/release/2023/01/02/pcmanfm-qt-1-2-1/) of pcmanfm-qt was made, alongside the point release of `libfm-qt`, for providing a good Wayland experience before porting both to Qt6. Also, tab drag-and-drop is enabled under Wayland.

