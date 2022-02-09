---
layout: post
title: Repository move finished
slug: repository-move-finished
date: 2018-03-28
promoted: true
categories: archived
---

After a short discussion we decided to move our repositories from gh/lxde to
https://github.com/lxqt before the upcoming release. Local repositories which
was checked out before will work for a while, github automagically redirects to
the new location – but it will be worth it to change the uris to the new
location.

To do so please edit the .git/config like that  
```
$EDITOR .git/config
[remote "origin"]
url = git@github.com:lxde/$foo
--> url = git@github.com:lxqt/$foo
```

or use  

```
git remote set-url origin git@github.com:lxqt/$foo
```
