---
layout: post
title: Release lxqt-policykit 1.4.0
slug: lxqt-policykit-1-4-0
date: 2023-11-05 09:03
promoted: false
categories: release
---

The LXQt team is proud to announce the release of lxqt-policykit 1.4.0.
The release can be downloaded from [Github](https://github.com/lxqt/lxqt-policykit/releases).

 * Prevent multiple instances of authentication-in-progress dialog.
 * Prevent waiting indefinitely for the authentication by notifying polkit that we couldn't do the next authentication if one is already in progress.

<br/>
A full list of changes is in the CHANGELOG file.
<br/>
