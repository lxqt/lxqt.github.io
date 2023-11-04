---
layout: post
title: Release qtermwidget 1.4.0
slug: qtermwidget-1-4-0
date: 2023-11-05 09:20
promoted: false
categories: release
---

The LXQt team is proud to announce the release of qtermwidget 1.4.0
The release can be downloaded from [Github](https://github.com/lxqt/qtermwidget/releases).

Main changes:

* TERM env variable set to xterm-256color when not set with QTermWidget::setEnvironment().
 * TERM env variable is set to xterm-256color when not set with QTermWidget::setEnvironment().
 * Add getForegroundProcessId() function to QTermWidget class (to allow terminal apps to check if the user has started a process in the shell and alert them).
 * Ported away from deprecated Qt::MidButton.
 * Added missing initialization of some variables.
 * Fixed mixing of bool and int.
 * Prefer ranged loop for over `while`.
 * Backported a kcoreaddons commit (1fed7e861f73a6ecbed79be4625afa52a5eaaf3b).
 * Replaced old-style cast with static_cast.
 * Properly initialize KProcess members.
 * Use Q_DECLARE_PRIVATE_D instead of custom Q_DECLARE_PRIVATE_MI (backport of kpty commit 3ef0d7d9ed980513fb36265e4d73fd79c07d5131).
 * Use class, not struct, for KPtyDevicePrivate for consistency (backport of kpty commit ad5cf9d348c13d3d27591a66fab9ccf20603daf8).
 * Use std::unique_ptr to manage the pimpl object.
 * Backported kpty commits 3526c09cae186bbba32bf3841cab5aa9d24d98b5, ae866fa6063c8d09ff354dc16f3fc8240676c64d and 982bb9e9fc715faae9ba440593ed0e74b8884888.
 * Use pointer to member function connect/disconnect signal/slot syntax.
 * Added `const` to some methods.
 * fixed deprecation warnings.
 * Mark assignment operator as deleted due to existence of copy constructor.
 * Removed useless `sizeof()` from `qtermwidget/BlockArray.h`.
 * Added Falcon colorscheme.
 * Cleaner builds.

<br/>
A full list of changes is in the CHANGELOG file.
<br/>
