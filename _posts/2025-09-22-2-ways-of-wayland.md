---
layout: post
title: The Two Ways of Wayland
slug: 2-way-of-wayland
date: 2025-09-22 16:18
promoted: true
categories: blog
---


One way is to offer a fully integrated Wayland session, but only well funded desktop environments that do not emphasize modularity go this way: mainly Gnome, Plasma and the upcoming Cosmic. Smaller ones have
to fork one of the compositors or - like LXQt or Xfce - allow choosing an existing one.

As on Wayland the compositor has much more a say as traditional window managars do under X11 there
will be issues with some functions like input settings, global shortcuts, workspace switchers,
panel menus and else.

LXQt will continue its modular way, and like the X11 WM, the Wayland compositor can be chosen by it. Currently seven Wayland compositors work out of the box, with more or less limitations in the panel's taskmanager functionality.

The bare minimum working everywhere is "Maximize", "Minimize" and "Close" enabled in the right click menu of the window buttons on the panel, other items are greyed out while "Maximize" doesn't do anything on tiling compositors (except niri in its next release) and minimize doesn't exist as concept on "tilers".

On the other hand, with `kwin_wayland`, the maximum number of functions is available since LXQt 2.1:

![Windowbuttonmenu kwin](../../../../../images/posts/windowbutton-kwin.png)

Those functions are enabled by a [dedicated backend](https://github.com/lxqt/lxqt/wiki/ConfigWaylandSettings#lxqt-panels-wayland-backends) in the panel. LXQt 2.3 will have for the
first time a backend based on IPC, in this case for Wayfire, and the support is nearly at the same level:

![Windowbuttom menu Wayfire Icon Settings](../../../../../images/posts/windowbutton-wayfire.png)

In the taskbar settings the following items are enabled:

![Taskmanager Settings Wayfire](../../../../../images/posts/taskmanagersettings-wayfire.png)


Similar backends could be written also for Hyprland, Sway and niri which support IPC and we hope
to have some of them in the future. "Maximize" could work and "Minimize" could send them to the
scratchpad.

### Workspace Switcher

Again, it is already full supported under `kwin_wayland` and will work under Wayfire (using the aforementioned
IPC backend) and work is ongoing to support the `ext_workspace_v1` protocol which will enable it under niri and Labwc which both support this protocol.

### LXQt 2.3 Preview

Version 2.3 will come out as usual in November. An overview of the current state can be found
[here](https://github.com/orgs/lxqt/projects/6/views/1).


