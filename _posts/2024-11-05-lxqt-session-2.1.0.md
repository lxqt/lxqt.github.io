---
layout: post
title: Release lxqt-session 2.1.0
slug: lxqt-session-2-1-0
date: 2024-11-02 18:42
promoted: true
categories: release
---

The LXQt team announces the release of lxqt-session 2.1.0.
The release can be downloaded from [Github](https://github.com/lxqt/lxqt-session/releases).

Main changes:

 * Reenable lock settings under Wayland.
 * Fixed the errors in KF6 check.
 * Under Wayland, show the leave dialog on the screen with the cursor.
 * Don't start apps with "X-LXQt-X11-Only" under Wayland.
 * Check if `wordexp` succeeds before using output (to prevent a segfault).
 * Improved the desktop entry.
 * Added a section for Wayland settings.
 * Added a checkbox for "X-LXQt-X11-Only" to autostart editor.
 * Set `palette_override` to `true` by default.
 * Added tooltip for screen scaling under Wayland.
 * Added a config file for Wayland compositors.
 * Set the layer shell scope to "dialog" for the leave dialog.
 * Added GUI for custom screenlocker on x11.



<br/>
A full list of changes is in the CHANGELOG file.
<br/>
