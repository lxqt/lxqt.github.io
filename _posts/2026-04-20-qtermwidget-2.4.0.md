---
layout: post
title: Release qtermwidget 2.4.0
slug: qtermwidget-2-4-0
date: 2026-04-20 08:00
promoted: true
categories: release
---

The LXQt team announces the release of qtermwidget 2.4.0.
The release can be downloaded from [Github](https://github.com/lxqt/qtermwidget/releases).

Changes:

 * emulation: add DECRQM/DECRPM replies for tracked modes.
 * Make sure variables are initialized before use.
 * Fixed env var loop.
 * Added "Nord" theme.
 * Do not emit titleChanged on OSC 7.
 * Added OSC 7 escape sequence support for tracking current working directory.
 * Consume CSI sequences with '=' and '<' private markers.
 * Fix qtermwidget_version.h output path for subproject use.
 * Fixed disappearance of Open/Copy link actions (in context menu).
 * Fixed URL pattern.
 * Improved the code of highlighting of matches.
 * Implemented highlighting of all matches when searching.
 * Fixed typo that leads to undefined behavior.
 * Use RegularExpression::matchView()
 * Use static QRegularExpression's.
 * Updated translations.

<br/>
A full list of changes is in the CHANGELOG file.
<br/>
