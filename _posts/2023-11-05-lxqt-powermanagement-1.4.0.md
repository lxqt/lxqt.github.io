---
layout: post
title: Release lxqt-powermanagement 1.4.0
slug: lxqt-powermanagement-1-4-0
date: 2023-11-05 08:59
promoted: false
categories: release
---

The LXQt team is proud to announce the release of lxqt-powermanagement 1.4.0.
The release can be downloaded from [Github](https://github.com/lxqt/lxqt-powermanagement/releases).

Main changes:

 * Override DPMS on enabling idleness watcher (to fix the problem of default DPMS timeouts being in conflict with lxqt-powermanagement).
 * Suspend screensaver when idle watcher is enabled (to prevent the screensaver timeout from kicking in and interfere with our daemon).
 * Removed "Ask" option from lid and idle watchers.
 * Ported a deprecated KWindowSystem method.

 <br/>
A full list of changes is in the CHANGELOG file.
<br/>
