---
layout: post
title: Point Releases Qtermwidget and QTerminal 2.0.1
slug: point-releases-qtermwidget-qterminal-2-0-1
date: 2024-06-27 14:52
promoted: true
categories: release
---

The LXQt team announces point releases of qtermwidget and QTerminal 2.0.1.
Those point releases are needed mainly because visual artifacts are fixed in qtermwidget.

#### Changes in qtermwidget:

 * Fixed visual artifacts due to a mistake about conversion to `std::wstring` in Qt6 port.

The release can be downloaded from [Github](https://github.com/lxqt/qtermwidget/releases).


#### Changes in QTerminal:

 * Single instance for drop-down mode.
 * Set layer overlay for dropdown terminal on wayland.
 * Prevented a crash on entering exit when bookmark dock is shown.
 * Fixed the window height in drop-down mode.
 * Set QTERMWIDGET_MINIMUM_VERSION, which was missing after Qt6 port.

The release can be downloaded from [Github](https://github.com/lxqt/qterminal/releases).



<br/>
A full list of changes is in the CHANGELOG files.
<br/>
