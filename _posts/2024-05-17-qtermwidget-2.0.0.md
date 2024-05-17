---
layout: post
title: Release qtermwidget 2.0.0
slug: qtermwidget-2-0-0
date: 2024-05-16 19:25
promoted: true
categories: release
---

The LXQt team is proud to announce the release of qtermwidget 2.0.0. This library is ported to Qt6, in addition to receiving several fixes, improvements and code cleanups.
The release can be downloaded from [Github](https://github.com/lxqt/qtermwidget/releases).

Changes:

 * Ported to Qt6.
 * Used "new" signal/slot syntax.
 * Dropped `#define` for bulk timeouts.
 * Removed KDE `#include`s.
 * Dropped XKB related conditional compilation.
 * Assigned a parent to bulkTimers.
 * Removed unused screen artifacts.
 * Added shortcuts for appscreen `default.keytab`.
 * Exposed wordCharacters property to QTermWidget API.
 * Fixed cursor positioning issues.
 * Removed `ChildProcessSetup` and directly called `onsetupChildProcess`.
 * Used PyQt6.
 * Fixed deprecated function warning.
 * Removed anchored pattern for email and url.
 * Adapted to Qt6 `QProcess::setChildProcessModifier()`.
 * Used std library find algorithm.
 * Fixed comparison of pointer addition with NULL.


<br/>
A full list of changes is in the CHANGELOG file.
<br/>
