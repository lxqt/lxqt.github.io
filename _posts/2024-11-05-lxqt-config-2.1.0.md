---
layout: post
title: Release lxqt-config 2.1.0
slug: lxqt-config-2-1-0
date: 2024-11-02 18:35
promoted: false
categories: release
---

The LXQt team is proud to announce the release of lxqt-config 2.1.0.
The release can be downloaded from [Github](https://github.com/lxqt/lxqt-config/releases).

Main changes:

 * Fixed a FTBFS with Clang in `lxqt-config-input`.
 * Show unsupported message for `lxqt-config-input` under Wayland.
 * Show unsupported message for `lxqt-config-monitor` under wlroots-based compositors.
 * Fixed a memory leak in `lxqt-config-input`.
 * Added nullity check for monitor config.
 * Safer size saving for the dialog of `lxqt-config-appearance`.
 * Do not load monitor or input settings under Wayland.
 * More informative tooltips in lxqt-config dialog.
 * Standardized desktop files for settings.
 * Consistent capitalization for GenericName for desktop files.
 * Added tooltip colors to LXQt Appearance.
 * Added checkbox to use palette provided by LXQt theme.
 * Fixed an old problem in setting wallpapers.
 * Don't start `xsettingsd` outside X11.
 * Added an option for toolbar icon size.
 * Make sure Monitor Settings dialog is shown completely on Wayland.
 * Remember size of Monitor Settings dialog.
 * Start `xsettingsd` on X11 only when GTK themes should be set.
 * Scale monitor images on resizing monitor settings dialog.


<br/>
A full list of changes is in the CHANGELOG file.
<br/>
