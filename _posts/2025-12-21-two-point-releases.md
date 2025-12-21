---
layout: post
title: Point release for lxqt-panel 2.3.1 and lxqt-wayland-session 0.3.1
slug: point-releases-lxqt-panel-and-lxqt-wayland-session
promoted: true
categories: release
---

The LXQt team announces two point releases:

 **lxqt-panel 2.3.2**


Changes:

 * Used `QPointer` for handling wlroots desktops to prevent dangling pointers, especially with bad compositor codes (previously, Hyprland could make the panel crash).
  
<br/>
The release can be downloaded from [Github](https://github.com/lxqt/lxqt-panel/releases).

**lxqt-wayland-session 0.3.1**

 * Updated manpages.
 * Updated configurations to cover labwc 0.9.3 and niri 25.11. Also, split niri's config by default.

<br/>
 The release can be downloaded from [Github](https://github.com/lxqt/lxqt-wayland-session/releases).
