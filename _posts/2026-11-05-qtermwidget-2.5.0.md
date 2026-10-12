---
layout: post
title: Release qtermwidget 2.5.0
slug: qtermwidget-2-5-0
date: 2026-10-16 07:00
promoted: true
categories: release
---

The LXQt team announces the release of qtermwidget 2.5.0.
The release can be downloaded from [Github](https://github.com/lxqt/qtermwidget/releases).

Changes:

 * Supported Shift+click for selecting a range.
 * Added an option to look in a custom directory for keyboard layouts.
 * Added more background image modes (filling, corners and tiles) and introduced pixmap cache.
 * Communicate that a failed process ended, by warning the user and allowing to save the history.
 * Added OSC-8 hyperlink support.
 * Added 'man' scheme to the allowed hyperlink protocols.
 * Implemented `CSI;18t` (size request) and `OSC 10/11/12` (color query/setting).
 * Parsed VT100 ECMA-48 Control Strings DCS, APC, PM and SOS.
 * Fixed drawing of double width/height lines.
 * Fixed issues in the selection extending that would go beyond the visible screen.
 * Fixed the cursor drawing routine (to prevent artifacts on moving the cursor in Vim).
 * Account for double-width characters on cursor updates.
 * Applied the filters to the unbound image (to fix a problem in copying/opening URLs on resizing the window).
 * Exposed pty device path via QTermWidget.
 * Inactivate `\033[201~` when bracketing text (to fix bracketed paste vulnerability).
 * Fixed the default keytab and added a "modern" one.
 * Ensured that the image doesn't contain a `\0`-only row.
 * Allocate memory buffers only when needed.
 * Updated the address of Free Software Foundation.
 * Removed translations CMake artifact.
<br/>

A full list of changes is in the CHANGELOG file.
<br/>
