---
layout: post
title: Release lxqt-build-tools 0.4.0
slug: lxqt-build-tools-040
date: 2017-09-22
promoted: true
categories: release
---

Today we've released version 0.4.0 of lxqt-build-tools. This is the second
needed piece for the upcoming LXQt 0.12.0 release.

## Developers/Packagers

There is one very important change in the released version: We moved back
the LXQt versioning bits back to liblxqt - so the upcoming release will not
build with older versions of the tools, also the current release will not
build with the new version of the tools.

Second noteworthy change is: We depend from now on minimum versions of
Qt5Core (5.6.1) and glib-2.0 (>=2.50) to prevent FTBFS later in the build
process.

A full list of changes is in the CHANGELOG file.
