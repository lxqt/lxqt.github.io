---
layout: post
title: Migration to lxqt-menu-data
slug: migration-to-lxqt-menu-data
date: 2023-05-19 15:43
promoted: true
categories: blog
---

A relic from older times was the dependency of [lxmenu-data]() for parts of the menus used in the "Applications menu" of the panel, in the LXQt Configuration Center and in PCManFm-Qt. This dependency is now replaced by [lxqt-menu-data](https://github.com/lxqt/lxqt-menu-data), concentrating all menu related files in one place, removing also a duplicate for `LXQt Settings`. 

This are only changes "under the hood" so far but it allowed already to unify "Education" and "Science and Math" categories in one default "Education & Science" category.

To make sure that those files are always installed `lxqt-panel`, `lxqt-config` and `libfm-qt` require it now at build time.


![lxqt menus](../../../../../images/posts/lxqt-menus.png)







