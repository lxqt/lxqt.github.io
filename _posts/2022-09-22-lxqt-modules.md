---
layout: post
title: About Modules in LXQt
slug: about-modules-in-lxqt
date: 2022-09-20 22:08
promoted: true
categories: blog
---

LXQt is always described as "lightweight and modular" - let's look a little bit closer at the second one.
This screen is familiar, users can choose which parts to run always on startup, or can stop a component:

![Session Settings of LXQt](../../../../../images/posts/sessionsettings.png)

In a wider sense *modular* includes also the window manager which can be chosen or another default
filemanager which could be intergrated easily too.

The main difference from a simple autostart entry for an application and a LXQt Module is
that modules are restarted automatically on failures or crashes, and the start|stop feature. Not known to many is
that it's very easy to add an application or a script as LXQt Module:
all is needed is an extra line in the *.desktop* file which will start the application or script and place it in
`~/.config/autostart` or `/etc/xdg/autostart`.

```
X-LXQt-Module=true

```


So the modules section can also be much more populated. Here we have some components which run only under wayland and
a script which triggers an alert when the CPU get's hot:

![Modules Settings of LXQt](../../../../../images/posts/new_modules.png)


So "modular" is about freedom of choice.
