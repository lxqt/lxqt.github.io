---
layout: post
title: Release qtermwidget 2.2.0
slug: qtermwidget-2-2-0
date: 2025-04-17 07:27
promoted: true
categories: release
---

The LXQt team announces the release of qtermwidget 2.2.0.
The release can be downloaded from [Github](https://github.com/lxqt/qtermwidget/releases).

Changes:

 * Fixed the problem with characters like '⧸' (U+29F8).
 * Close the session correctly before destroying it.
 * Fixed URL highlighting on wrapping.
 * Handle double-column and small characters correctly on calculating text width.
 * Fixed problem with characters wider than monospace.
 * Support combining characters.
 * Make too wide characters fit into available space.
 * Get rid of "Mq", which sometimes persisted at the top left corner after the display was updated.
 * Added support for auto-hiding inactive mouse cursor.
 * Fixed cursor blinking with subterminals.

<br/>
A full list of changes is in the CHANGELOG file.
<br/>
