---
layout: post
title: Release lxqt-config 2.5.0
slug: lxqt-config-2-5-0
date: 2026-10-16 07:00
promoted: false
categories: release
---

The LXQt team announces the release of lxqt-config 2.5.0.
The release can be downloaded from [Github](https://github.com/lxqt/lxqt-config/releases).

Main changes:

 * Fixed GTK theme being cleared on applying input/cursor settings.
 * Followed the Freedesktop.org specification for the cursor search paths (instead of relying on `libxcursor`).
 * Fixed compiling after recent KScreen changes.
 * CMake maintenance.
 * Silenced some compilation warnings.
 * Cleaned up some ui files.
 * Added fallback icon to head label in lxqt-config-brightness.
 * Removed redundant/deprecated Qt headers.
 * Deleted `savesettings.cpp`.
 * Removed codes belonging to Qt < 6.9.



<br/>
A full list of changes is in the CHANGELOG file.
<br/>
