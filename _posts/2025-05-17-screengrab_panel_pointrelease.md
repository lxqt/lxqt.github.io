---
layout: post
title: Release ScreenGrab 3.0 and 2 point releases
slug: screengrab-3-0-and-2-point-releases
date: 2025-05-17 06:09
promoted: true
categories: release
---

The LXQt team announces the releases of the following components:

**ScreenGrab 3.0**

ScreenGrab can now take screenshots under Wayland compositors that support the
_wlr-screencopy-unstable-v1_ protocol, which includes Labwc, Hyprland, Niri, River, Sway and Wayfire.

In addition:

 * Added a command-line option for saving screenshot and exiting without showing window.
 * Show the window on the screen with cursor under X11.
 * Fixed 2 old X11 bugs in auto-saving and `--minimized` command-line option.
 * Use LXQt build tools for compilation.
 * GUI cleanup.
![ScreenGrab Screenshot](../../../../../images/posts/screengrab.png)

The release can be downloaded from [Github](https://github.com/lxqt/screengrab/releases).


**Point Release lxqt-panel 2.2.1**

The "Show Desktop" plugin works now under Wayland compositors that are compatible with wlroots
 (and support window minimizing).

In addition:

 * Workarounds are added for kwin_wayland's problems with showing desktop.
 * The children of a window are minimized with it on kwin_wayland.
 * Redundant attention demands (urgency hints) are removed under kwin_wayland.
 * A rare DND crash is prevented in Task Manager under Wayland.
 * Removed ancient QT_USE_XXXX variables and dropped QTX_LIBRARIES.
 * Timezone switching with mouse wheel is made optional in World Clock.
 * Added an icon for plugin-sensors.
 * Code cleanup.

<br/>
The release can be downloaded from [Github](https://github.com/lxqt/lxqt-panel/releases).


**Point Release Qps 2.11.1**

Changes:

 * Fixed first launching of Qps without config file.

<br/>
The release can be downloaded from [Github](https://github.com/lxqt/qps/releases).
