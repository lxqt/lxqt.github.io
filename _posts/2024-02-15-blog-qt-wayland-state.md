---
layout: post
title: Qt6 and Wayland
slug: qt-6-and-wayland
date: 2024-02-15 08:58
promoted: true
categories: blog
---

An overview of the development state of both goals. Priority has porting  
all components to the Qt6 libraries and there will be no Qt5-based version of LXQt anymore.


What will be most noticeable in the upcoming LXQt 2.0.0 release due in April
 has nothing to do directly with the port to Qt6: The new default application menu
 "Fancy Menu, featuring "All Applications", favorites and an improved search function.

![Fancy Application Menu](../../../../../images/posts/fancymenu.png)




## Port to Qt6

[![Developer preview of Qt6](../../../../../images/posts/port-qt6.png)](../../../../../images/posts/port-qt6.png)


This is the actual state, with the work-in-progress apps listed in the menu.
The progress can be checked in [project-qt6](https://github.com/orgs/lxqt/projects/3).
It won't be noticeable but Qt6 is supposed to be a little bit faster in processing.



## Wayland

An overview of the actual development is [here.](https://github.com/orgs/lxqt/projects/4/views/2)

Qt6 libraries should provide some more tools to continue development - basically implement
wayland-specific code in components like panel, desktop, runner, shortkeys and notification daemon.
Many applications and LXQt components are already working perfectly on
wayland, others partially and some not, see the table below for a detailed list.

A missing piece is the release of [layer-shell-qt 6.0](https://invent.kde.org/plasma/layer-shell-qt/)
 as the actual version can't be used except to some extent in the notification daemon, the
 second most missing piece is a taskmanager-plugin in the panel for wayland. Some steps are on the way
 in this direction, but "long is the way to wayland" so patience is needed here and help is
 always welcome naturally!

The LXQt philosophy to being modular will not change with wayland: it is supposed to work with all
(wlroots-based) compositors in the same way as users can choose their window manager now.

This said there aren't so many compositors actively developed at the moment, mainly three "stacking":
labwc, wayfire and kwin_wayland and two "tiled": sway and Hyprland. At the moment the
most satisfying results can be achieved with labwc.


![Qt6 and Wayland table](../../../../../images/posts/lxqt-state.png)
