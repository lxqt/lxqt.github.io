---
layout: post
title: Release lxqt-session 2.2.0
slug: lxqt-session-2-2-0
date: 2025-04-17 07:55
promoted: true
categories: release
---

The LXQt team announces the release of lxqt-session 2.2.0.
The release can be downloaded from [Github](https://github.com/lxqt/lxqt-session/releases).

Main changes:

 * When disabling autostart entries, do it only for LXQt.
 * Changed the default cursor size to 24.
 * Fixed the focus order in the config GUI.
 * Best positioning of Leave dialog with multi-screen on Wayland.
 * Provided a D-Bus method for launching apps under LXQt Session (by adding `execDesktopFile` to its D-Bus adaptor).
 * Prevented a second `lxqt-session` process.
 * Show error message if an autostart name starts with dot or contains slash.


<br/>
A full list of changes is in the CHANGELOG file.
<br/>
