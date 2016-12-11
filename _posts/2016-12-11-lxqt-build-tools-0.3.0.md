---
layout: post
title: Introducing lxqt-build-tools, corresponding point releases
slug: introducing-lxqt-build-tools
date: 2016-12-10
promoted: true
categories: release
---

We would like to announce release 0.3.0, the second production release of lxqt-build-tools, as well as the first batch of point releases for those components maintained by the LXQt project which had to be adjusted to lxqt-build-tools.   
These releases represent an effort to ease building and dependency management. They are not relevant for end-users.   

Repository [lxqt-build-tools](https://github.com/lxde/lxqt-build-tools) is summarizing several tools which are needed to build LXQt as well as some of the other components maintained by the project like [ComptonConf](https://github.com/lxde/compton-conf). These tools used to be spread over several other repositories and were now summarized in a single repository to ease building and dependency management. For details see file `README.md` of the [GitHub repository](https://github.com/lxde/lxqt-build-tools).   

Adjusting to lxqt-build-tools was needed in:
* [compton-conf](https://github.com/lxde/compton-conf) 
* [libfm-qt](https://github.com/lxde/libfm-qt) 
* [libsysstat](https://github.com/lxde/libsysstat)
* [liblxqt](https://github.com/lxde/liblxqt) 
* [lximage-qt](https://github.com/lxde/lximage-qt). 
* [lxqt-common](https://github.com/lxde/lxqt-common) 
* [lxqt-l10n](https://github.com/lxde/lxqt-l10n)
* [lxqt-qtplugin](https://github.com/lxde/lxqt-qtplugin)
* [obconf-qt](https://github.com/lxde/obconf-qt) 
* [pavucontrol-qt](https://github.com/lxde/pavucontrol-qt)
* [pcmanfm-qt](https://github.com/lxde/pcmanfm-qt)..
* [qterminal](https://github.com/lxde/qterminal)

All other components are depending on liblxqt which in turn is itself depending on lxqt-build-tools by now. All those adjustments were introduced in these components' branch `master`and will hence be included in their next minor release.

Todays batch contains: compton-conf, libsysstat, lxqt-common, lxqt-l10n, lxqt-qtplugin, obconf-qt, pavucontrol-qt.
