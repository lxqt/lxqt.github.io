---
layout: post
title: Release lxqt-archiver 1.3.0
slug: lxqt-archiver-1-3-0
date: 2025-11-05 07:00
promoted: true
categories: release
---

The LXQt team announces the release of lxqt-archiver 1.3.0.
The release can be downloaded from [Github](https://github.com/lxqt/lxqt-archiver/releases).

Main changes:

 * Fixed handling of wrong passwords with 7z.
 * Fixed "Re-create folders" on extraction.
 * Fixed crash in parsing `lha` list output.
 * Added LZ4 support.
 * Set the enabled states of delete and view actions appropriately.
 * Fixed an imminent crash with Clang's optimizations by checking `QPointer<QDrag>` for nullity before calling `deleteLater()` on it.
 * Fixed an uninitialized variable.
 * Fixed going back to the root dir after adding/deleting file.
 * Clear selection in directory list appropriately.
 * Minor improvement in core code.
 * Enable the Stop action only when something is in progress.


<br/>
A full list of changes is in the CHANGELOG file.
<br/>
