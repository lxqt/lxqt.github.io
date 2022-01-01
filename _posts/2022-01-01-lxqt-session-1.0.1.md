---
layout: post
title: Release lxqt-session 1.0.1
slug: lxqt-session-1-0-1
date: Jan 01, 2022, 18:29:47
promoted: true
categories: release
---
The LXQt team is proud to announce the release of lxqt-session 1.0.1.
The release can be downloaded from [Github](https://github.com/lxqt/lxqt-session/releases).

Changes:

* Now, if a module exits with code 1, it will be restarted (in addition to crashed modules) because an exit code other than 0 is a sign of failure. This can especially be helpful after a recent change in `libx11`, which may make `lxqt-globalkeys` exit with code 1 at startup.

