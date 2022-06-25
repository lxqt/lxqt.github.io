---
layout: post
title: Menu Editing in LXQt
slug: menu-editing-in-lxqt
date: 2022-06-18 22:18
promoted: true
categories: blog
---

Although there is no complete GUI menu editor some basic things can be easily achieved - let's see how.

### Create a menu entry

To create a new menu entry open the hidden directory `.local` in your home, open `share` and then
`applications`. In the case the `applications` directory should not be present create it and maybe bookmark it too for an easier access later. Then open Tools > Create Launcher.

In this example we'll create a menu entry to launch Firefox with a different profile:

![Create Launcher LXQt](../../../../../images/posts/launcher.png)

By default all entries created this way are displayed in the menu under "Other"- if you like to show it under a [given category](https://specifications.freedesktop.org/menu-spec/latest/apa.html) open
the created `.desktop` file with a text editor and add a line, in this case it should be `Categories=Network;WebBrowser;`.

### Hide a menu entry

If you like to hide an entry open "Applications" in PcManFM-Qt's left pane and copy the entry to your local applications directory. Here we are going to hide "Hibernate" from the "Leave" Menu.

![Modify Launcher LXQt](../../../../../images/posts/modify-launcher.png)

Open it with a text editor and add a line `NoDisplay=true`.

### Change text or category of a menu entry

In the same way as above you can modify displayed names, generic names (tooltips) or the category where a menu entry is shown. Again note that the copies of already existing menu entries in your local directory will be always the ones displayed in the menu. To apply the changes the panel should  be restarted from "Session Settings". Alternatively the command `update-desktop-database ~/.local/share/applications` will do the same. To undo changes and displaying the original file again deleting the `.desktop` file in `~/.local/share/applications` is enough.

### Adding a category in the menu

Recommended is also here copying the menu file from `etc/xdg/menus/` to a local directory in your home. In this way, probable mistakes will not damage the menu. Open the copy of the menu file with a text editor. To add a menu category paste and edit to your needs the following block anywhere between the similar blocks for the other categories:


```
<!-- My menu entry -->
	<Menu>
		<Name>Example</Name>
		<Include>
			<And>
				<Category>foo</Category>
			</And>
		</Include>
	</Menu>
<!-- End my menu entry -->
```
Right click on the menu button, select "Configure applications menu" and set the path to your modified menu. Categories are displayed in alphabetical order and an empty category will not be displayed, so this "Example" category is only shown if one or more desktop files containing `Categories=foo`  are present in `~/.local/share/applications` or `/usr/share/applications`.

The complete documentation can be found [here](https://specifications.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html). Enjoy tweaking!
