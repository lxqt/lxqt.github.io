---
layout: post
title: Release qtermwidget 0.15.0
slug: qtermwidget-0-15-0
date: 2020-04-24
promoted: true
categories: release
---
The LXQt team is proud to announce the release of qtermwidget 0.15.0.
The release can be downloaded from [Github](https://github.com/lxqt/qtermwidget/releases).

Main changes:

 * Fixes for macOS.
 * Fixed the PyQt5 binding with Qt ? 5.11.
 * Fixed a memory access violation.
 * Added `saveHistory` to QTermWidget.
 * Don't set the selection clipboard if it's unsupported.
 * Announce truecolor support via COLORTERM.
 * Fixed the numpad handling and added entries for numpad 5.
 * Allow to disable drawing line characters.
 * Fixed compilation on NetBSD.
 * Fixed flickering on font change.
 * Select all text when opening search-bar.
 * Fixed search-bar's light text over white background with dark themes.
 * Fixed build with LLVM/clang.
 * Several fixes.
 * Bumped the version.


A full list of changes is in the CHANGELOG file.
