---
layout: post
title: Wayland FAQ
slug: wayland_faq
date: 2024-04-15 21:14
promoted: true
categories: blog
---

As LXQt 2.0 is ready to be released and includes Wayland-specific codes for the first time,
here is a short Q&A about that.


**Will LXQt 2.0 be *full* ready for Wayland?**

Not yet, wayland will be the main target for LXQt 2.1 in autumn as Qt6 was the target for LXQt 2.0.

**So which elements are fully working on wayland?**

* Desktop
* Runner
* Notifications
* Panel(s) except some plugins
* Logout (kwin/labwc 0.7.2)
* All LXQt settings and applications except...

<br/>
**What is missing then?**

* Taskbar, showdesktop and Desktopswitch plugins in panel (a working beta will be available soon in AUR/Git)
* Keyboard indicator plugin
* Some input settings
* Power button settings
* Screen locker settings
* Monitor settings (wlroots)
* Global shortcuts
* ScreenGrab

<br/>
**But I need global shortcuts!**

You can configure them in the compositor.

**But I need a screen locker!**

There is swaylock and others.

**But I need monitor settings!**

There is wldisplay and kanshi.

**But I need a screenshot tool!**

There are wshot as well as scripts for grim and slurp.

**Which compositor is used?**

Any wlroots-based compositor (including Labwc, Wayfire, Hyprland and Sway) should work,
and kwin_wayland works really fine too.

**Is there a recommended one?**

If any then Labwc for its stability, snappiness, features and
because it's settings are very similar to openbox. But the choice is yours.

**But it has no desktop effects!**

There is kwin_wayland, Wayfire and Hyprland for you.

**What are the requirements for running LXQt 2.0 on wayland?**

Qt 6.6, kwindowsystem 6.x, layer-shell-qt 6.x.

**I need only the panel, the desktop, the runner or the notifications.**

LXQt is modular and users can use what they like, but probably you want to use lxqt-qtplugin and
 lxqt-appearance for styling.

**I've a question which is not yet answered!**

On the side panel here are listed all possibilities to ask them.

