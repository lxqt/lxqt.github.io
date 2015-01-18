// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name module.compiled.js
// ==/ClosureCompiler==

/*---
Title:			@Module
Version:		1.2.1
Description:	Provides a basic framework for defining and dynamically loading modules and their dependencies. It also provides a more object orientated console API that features independent consoles objects, output buffers, and styling to more easily control the flow of the console and group output.
ToDo:
	-	Module registration cancels script loading (For packaged JS) [May need to be via a setting, as dynamically is likely too late]
	-	Dependency version constraints
	-	Deferred CSS dependencies
---*/

// $Console
(function()
{
	// Constants
	var CONSOLELEVEL = 0;	// Levels: Development, 0; Review, 1; Production, 2;
	var MESSAGETYPES =
	{
		debug:
		{
			level: 0,
			style: 'color: #333;'
		},
		trace:
		{
			level: 0,
			style: ''
		},
		log:
		{
			level: 0,
			style: 'color: #999;'
		},
		info: 
		{
			level: 1,
			style: 'color: #33C;'
		},
		warn:
		{
			level: 1,
			style: 'color: #C93;'
		},
		error:
		{
			level: 2,
			style: 'color: #C33;'
		}
	};
	
	// Group state
	var grouped = false;
	
	// Private consoles store
	var _consoles = {};
	
	// Private timers store
	var _timers = {};
	
	// Private Console class
	var _Console = function (con, settings)
	{
		this.id = new Date().getTime();
		this.id = this.id+'-'+(1/Math.random());
		this.console = con;
		settings = (settings) ? settings : {};
		this.level = (settings.level) ? settings.level : 0;
		this.buffered = settings.buffered || false;
		this.messages = [];
		_consoles[this.id] = this;
		return this;
	};
	_Console.prototype.msg = function (msg, style)
	{
		// Build message and return;
		var m = new _ConsoleMessage(this.id, msg, style);
		return m;
	};
	_Console.prototype.buffer = function (msg)
	{
		if (msg)
		{
			// Add msg to buffer
			this.messages.push(msg);
		}
		else
		{
			// Run buffer and clear
			this.messages.forEach(function (f,i,a)
			{
				f();
			});
			this.messages = [];
		}
		return this.messages;
	};
	
	// Public Console class
	var Console = function (settings)
	{
		var c = new _Console(this, settings);
		this.id = c.id;
		if (c.buffered)
		{
			this.send = function ()
			{
				c.buffer();
				console.groupEnd();
				return $Console;
			};
		}
		return this;
	};
	Console.prototype.level = function (level)
	{
		_consoles[this.id].level = level;
		return this;
	};
	Console.prototype.debug = function (msg, style)
	{
		_consoles[this.id].msg(msg, style).type('debug').send();
		return this;
	};
	Console.prototype.log = function (msg, style)
	{
		_consoles[this.id].msg(msg, style).type('log').send();
		return this;
	};
	Console.prototype.trace = function ()
	{
		_consoles[this.id].msg().type('trace').send();
		return this;
	};
	Console.prototype.info = function (msg, style)
	{
		_consoles[this.id].msg(msg, style).type('info').send();
		return this;
	};
	Console.prototype.warn = function (msg, style)
	{
		_consoles[this.id].msg(msg, style).type('warn').send();
		return this;
	};
	Console.prototype.error = function (msg, style)
	{
		_consoles[this.id].msg(msg, style).type('error').send();
		return this;
	};
	Console.prototype.time = function (timer, reset)
	{
		var now = new Date();
		if (_timers[timer] && !reset)
		{
			_timers[timer].diff = (now.getTime() - _timers[timer].start.getTime())+'ms';
		}
		else
		{
			_timers[timer] =
			{
				name: timer,
				start: now,
				diff: '0ms'
			};
		}
		return _timers[timer].diff;
	};
	Console.prototype.group = function (msg, type, style, expand)
	{
		if (msg == false)
		{
			return $Console;
		}
		var settings = {};
		settings.level = _consoles[this.id].level;
		settings.buffered = true;
		var c = new Console(settings);
		type = (MESSAGETYPES[type]) ? type : 'log';
		if (msg)
		{
			_consoles[this.id].group = new _ConsoleGroupMessage(_consoles[this.id].msg(msg, style).type(type), expand);
		}
		return c;
	};
	
	// Private ConsoleMessage class
	var _ConsoleMessage = function(cid, msg, style)
	{
		this.cid = cid;
		this.msg = msg;
		this.style = (style) ? ' '+style : '';
		return this;
	};
	_ConsoleMessage.prototype.type = function (type)
	{
		if (MESSAGETYPES[type])
		{
			this.type = type;
			this.level = MESSAGETYPES[type].level;
			this.style = MESSAGETYPES[type].style+this.style;
			if (typeof this.msg == 'string')
			{
				this.msg = ['%c'+this.msg, this.style];
			}
			else if (Array.isArray(this.msg))
			{
				this.msg[0] = '%c'+this.msg[0];
				this.msg.push(this.style);
			}
			this.group = _consoles[this.cid].group;
		}
		return this;
	};
	_ConsoleMessage.prototype.send = function ()
	{
		var msg = this;
		var f = function ()
		{
			if (msg.level >= 0 && _consoles[msg.cid].level <= msg.level)
			{
				if (Array.isArray(msg.msg))
				{
					console[msg.type].apply(console, msg.msg);
				}
				else
				{
					console[msg.type].call(console, msg.msg);
				}
				return true;
			}
			return false;
		}
		var r = (_consoles[this.cid].buffered) ? _consoles[this.cid].buffer(f) : f();
		return this;
	};
	
	// Private ConsoleGroupMessage class
	var _ConsoleGroupMessage = function (msg, expand)
	{
		this.cid = msg.cid;
		this.type = (expand) ? 'group' : 'groupCollapsed';
		if (msg)
		{
			this.msg = msg;
			this.msg.type = this.type;
			this.msg.send();
		}
		else
		{
			(_consoles[this.cid].buffered) ? _consoles[this.cid].buffer(console[this.type]) : console[this.type]();
		}
		return this;
	};
	
	// Global $Console object
	window.$Console = new Console({level: CONSOLELEVEL});
})();

// $Module
(function ()
{
	var prefix = 'Module: ';
	var thisSrc = '@module.js';
	
	// Internal registries
	var modules = {};
	var callbacks = {};
	var dependencies = {};
	var path = document.querySelector('script[src$="'+thisSrc+'"]').src.replace(thisSrc, '');	// Get script path
	
	// Get head element reference
	var head = document.getElementsByTagName('head')[0];
	
	// Track preloaded status.
	var preloaded = false;
	
	// Module class
	var Module = function (settings)
	{
		// Merge settings in
		for (s in settings)
		{
			this[s] = settings[s];
		}
		if (!this.name)
		{
			// Invalid module format
			$Console.group(prefix+'Unable to load module', 'error').error('Format is invalid.').debug(settings).trace().send();
			return false;
		}
		modules[this.name] = this;	// Add to modules registry
		callbacks[this.name] = [];	// Add module callback to callbacks registry
		$Console.time(this.name);	// Start module timer
		$Console.log(prefix+this.name+' loaded.');	// Module loaded
		var t = this;
		if (this.dependencies.length > 0)
		{
			// Has dependencies
			this.dependencies.forEach(function (d,i,a)
			{
				// Register and return dependency
				a[i] = new Dependency(d, t);
				return a[i];
			});
		}
		else
		{
			// No dependencies
			setTimeout(function () { t.callback.call(t); }, 0);	// Callback immediately
		}
		return this;
	};
	Module.prototype.name = '';
	Module.prototype.version = '';
	Module.prototype.description = '';
	Module.prototype.dependencies = [];
	Module.prototype.styles = [];
	Module.prototype.callback = function (dependency) { };
	Module.prototype.progress = 0;
	Module.prototype.loaded = false;
	Module.prototype.ready = false;
	Module.prototype.done = function ()	// Module ready
	{
		this.ready = true;	// Set module to ready state
		$Console.log(prefix+this.name+' ready.');
		var m = this;
		callbacks[m.name].forEach(function (c,i,a)
		{
			// Async callback modules listening for module's ready state
			setTimeout(function () { c.call(m); }, 0);
		});
	};
	Module.prototype.onready = function (callback)	// Register to listen to this module's ready state
	{
		callbacks[this.name].push(callback);
		var m = this;
		if (this.ready)
		{
			// Already ready
			setTimeout(function () { callback.call(m); }, 0); // Trigger callback immediately
		}
	};
	
	// Dependency class
	var Dependency = function (settings, module)
	{
		// If settings are a string
		if (typeof settings == 'string')
		{
			settings =
			{
				src: settings
			};
		}
		// Create name if missing
		settings.name = (settings.name) ? settings.name : (settings.content) ? settings.content : (settings.src) ? settings.src : false;
		// Merge settings in
		for (s in settings)
		{
			this[s] = settings[s];
		}
		if (!this.name)
		{
			// Invalid dependency format
			$Console.group(prefix+'Unable to request dependency.', 'error').error('Format is invalid.').debug(settings).trace().send();
			return false;
		}
		this.modules = [];
		this.onload = {};
		$Console.log(prefix+module.name+' requires '+this.name+'.');
		
		var t;
		if (dependencies[this.name] || dependencySource(this.src))
		{
			// Dependency already in registry
			t = (dependencies[this.name]) ? dependencies[this.name] : dependencySource(this.src);
			t.modules.push(module.name);	// Add depending module to dependency
			t.onload[module.name] = (typeof this.onload == 'function') ? this.onload : function (e) { }; // Add onload for depending module to dependency
			if (t.loaded)
			{
				// Dependency already loaded
				$Console.group(prefix+this.name+' requested but has already been loaded.', 'info').info('Consider removing the dependency from this module.').debug(t).trace().send();
				module.progress++;	// Increase module dependency progress
				setTimeout(function () { t.onload[module.name].call(module, t); }, 0);	// Async callback module to let it know the dependency has loaded
				if (!module.loaded && module.progress == module.dependencies.length)
				{
					// Module has just loaded final dependency
					module.loaded = true;	// Set module to loaded
					setTimeout(function () { module.callback.call(module); }, 0);	// Async callback module
				}
			}
			else
			{
				// Dependency has not loaded yet
				$Console.group(prefix+this.name+' requested but has already been requested.', 'info').info('Consider removing the dependency from this module.').debug(t).trace().send();
			}
		}
		else if (modules[this.name] || moduleSource(this.src))
		{
			// Dependency is already loaded and registered as a module
			t = this;
			t.modules.push(module.name);	// Add depending module to dependency
			t.onload[module.name] = (typeof this.onload == 'function') ? this.onload : function (e) { };	// Add onload for depending module to dependency
			t.loaded = true;	// Set dependency to loaded, as it must be
			dependencies[t.name] = t;	// Add dependency to dependency registry
			$Console.group(prefix+this.name+' requested but has already been loaded.', 'info').info('Consider removing the dependency from this module.').debug(t).trace().send();
			module.progress++;	// Increase module progress
			if (!module.loaded && module.progress != module.dependencies.length)
			{
				// Dependency for module loaded
				$Console.log(prefix+module.progress+'/'+module.dependencies.length+' dependencies loaded for '+module.name+'.');
			}
			setTimeout(function () { t.onload[module.name].call(module, t); }, 0);	// Async callback module to let it know dependency has loaded
			if (!module.loaded && module.progress == module.dependencies.length)
			{
				// Module has just loaded final dependency
				module.loaded = true;	// Set module to loaded
				$Console.log(prefix+'All dependencies loaded for '+module.name+'.');
				setTimeout(function () { module.callback.call(module); }, 0);	// Async callback module to let it know all dependencies have loaded
			}
		}
		else
		{
			// New dependency
			t = this;
			t.modules.push(module.name);	// Add depending module to dependency
			t.onload[module.name] = (typeof this.onload == 'function') ? this.onload : function (e) { };	// Add onload for depending module to dependency
			dependencies[t.name] = t;	// Add dependency to dependency registry
			if (preloaded)
			{
				// Preloading window missed
				$Console.log(prefix+'Loading '+this.name+'...');
				setTimeout(t.load(), 0);	// Async load dependency
			}
			else
			{
				// Preloading
				$Console.log(prefix+'Registered '+this.name+' for preloading.');
			}
		}
		return dependencies[t.name];
	};
	
	Dependency.prototype.name = '';
	Dependency.prototype.src = '';
	Dependency.prototype.content = '';
	Dependency.prototype.type = 'text/javascript';
	Dependency.prototype.defer = 'defer'
	Dependency.prototype.async = false;
	Dependency.prototype.loaded = false;
	Dependency.prototype.load = function ()	// Load dependency
	{
		var s = document.createElement('script');
		s.type = this.type;
		if (this.src)
		{
			// External script
			s.src = path+this.src;
			s.defer = this.defer;
			s.async = this.async;
		}
		else if (this.content)
		{
			// Inline script
			s.innerHTML = this.content;
		}
		var d = this;
		this.onloadHandler = function (e)	// load event handler
		{
			e.target = s;	// Reassign target to script
			onloadHandler.call(d, e);	// Call global load event handler with dependency context
		};
		// Add event listeners
		s.addEventListener('beforescriptexecute', this.onloadHandler);
		s.addEventListener('afterscriptexecute', this.onloadHandler);
		s.addEventListener('load', this.onloadHandler);
		s.addEventListener('readystatechange', this.onloadHandler);
		head.appendChild(s);	// Add dependency to DOM
	};
	
	// Global Modules object
	window.$Module = {
		add: function (settings)	// Add module to registry
		{
			if (typeof settings == 'object' && Array.isArray(settings))
			{
				var r = [];
				settings.forEach(function (s)
				{
					r.push(window.$Module.add(s));
				});
				return r;
			}
			if (typeof settings == 'object' && settings.name)
			{
				var module = new Module(settings);
				return module;
			}
		},
		get: getModule = function(name)	// Get module by name
		{
			return modules[name];
		}
	};
	
	// Preload all modules
	var preload = function(e)
	{
		if (preloaded)
		{
			$Console.group(prefix+'Preloading requested after preload.', 'warn').warn('Preload window has already passed, so please check for invalid module or dependency requests.').deubg(e).trace().send();
		}
		if (
			(e.type == "readystatechange" && document.readyState == 'interactive')
			|| e.type == 'DOMContentLoaded'
			// || (e.type == "readystatechange" && document.readyState == 'complete')	// #Bug: [Webkit] Scripts added at this stage prevents load event from ever triggering and artificially delays painting.
			|| e.type == 'load'	// Fastest due to caching
		)
		{
			$Console.log(prefix+'Preloading modules...');
			if (!preloaded)
			{
				preloaded = true;
				window.removeEventListener('DOMContentLoaded', preload);
				document.removeEventListener('readystatechange', preload);
				window.removeEventListener('load', preload);
			}
			for (d in dependencies)
			{
				if (!dependencies[d].loaded)
				{
					setTimeout(dependencies[d].load(), 0);
				}
			};
		}
	};
	if (document.readyState)
	{
		document.addEventListener('readystatechange', preload);
		window.addEventListener('DOMContentLoaded', preload);
		window.addEventListener('load', preload);
	}
	else
	{
		window.addEventListener('DOMContentLoaded', preload);
		window.addEventListener('load', preload);
	}
	
	// Load event handler
	var onloadHandler = function (e)
	{
		if (e.type == 'afterscriptexecute' || e.type == 'load' || (e.type == "readystatechange" && s.readyState == 'complete'))
		{
			e.target.removeEventListener('afterscriptexecute', this.onloadHandler);
			e.target.removeEventListener('beforescriptexecute', this.onloadHandler);
			e.target.removeEventListener('load', this.onloadHandler);
			e.target.removeEventListener('readystatechange', this.onloadHandler);
			this.loaded = true;	// Set dependency to loaded
			var d = this;
			d.modules.forEach(function (mn,i,a)
			{
				var m = $Module.get(mn);	// Get module
				$Console.log(prefix+d.name+' loaded for '+m.name+'.');
				// Dependency onload callbacks
				if (d.onload[mn])
				{
					// Module is listening to load events for this dependency
					setTimeout(function () { d.onload[mn].call(m,d); }, 0);	// Async callback module to let it know dependency loaded
				}
				m.progress++;	// Increase module progress
				if (!m.loaded && m.progress != m.dependencies.length)
				{
					$Console.log(prefix+m.progress+'/'+m.dependencies.length+' dependencies loaded for '+m.name+'.');
				}
				if (!m.loaded && m.progress == m.dependencies.length)
				{
					// All dependencies loaded for module
					m.loaded = true;	// Set module to loaded
					$Console.log(prefix+'All dependencies loaded for '+m.name+'.');
					setTimeout(function () { m.callback.call(m); }, 0);	// Async callback module to let it know all dependencies have loaded
				}
			});
		}
	};
	// Get module by source
	var moduleSource = function(src)
	{
		var module = false;
		for (m in modules)
		{
			if (modules[m].src == src)
			{
				module = modules[m];
				return false;
			}
		}
		return module;
	};
	// Get dependency by source
	var dependencySource = function(src)
	{
		var dependency = false;
		for (d in dependencies)
		{
			if (dependencies[d].src == src)
			{
				dependency = dependencies[d];
				return false;
			}
		}
		return dependency;
	};
})();

// App
// Because the application cache is handled before load, despite there being no reason to do it until after load, a non-modular script that is independent of the framework must be used temporarily
(function ()
{
	var prefix = 'Web.App (Embedded): ';	// Console prefix
	
	// WebApp Object
	var App = {};
	
	// Support flags
	App.supports =
	{
		appcache:		false,
		bookmark:		false,
		standalone:		false,
		orientation:	false
	};
	// Check application cache support
	if ('applicationCache' in window)
	{
		$Console.debug(prefix+'Application Cache API supported.');
		App.supports.appcache = true;
		_appCache = window.applicationCache;
	}
	// Check standalone mod support
	if ('requestBookmark' in navigator)
	{
		$Console.debug(prefix+'Bookmark API supported.');
		App.supports.boomark = true;
	}
	// Check standalone mod support
	if ('standalone' in window.navigator)
	{
		$Console.debug(prefix+'Standalone mode supported.');
		App.supports.standalone = true;
		App.mode = (window.navigator.standalone) ? 'standalone' : 'browser';
	}
	else
	{
		if (!(/Version/.test(navigator.userAgent)) && /Windows|Linux|CrOS|Android/.test(navigator.userAgent) && /Chrome\/[.0-9]+/.test(navigator.userAgent))
		{
			// Chrome for Android (not UIWebView), Chrome for Windows (not mobile) and Linux, and Chrome OS support standalone web apps
			$Console.debug(prefix+'Standalone mode supported.');
			App.supports.standalone = true;
			//alert('Screen height: '+screen.height+', Screen available height: '+screen.availHeight+', client height: '+document.documentElement.clientHeight+'.');
			// See if we can detect standalone mode from a difference in height due to browser chrome
			App.mode = ((screen.availHeight - document.documentElement.clientHeight) <= 40) ? 'standalone' : 'browser';
		}
		else if (window.external && 'msIsSiteMode' in window.external)
		{
			// Internet Explorer 9+ on Windows support standalone web apps (site mode) through pinning
			$Console.debug(prefix+'Standalone mode supported.');
			App.supports.standalone = true;
			App.mode = (window.external.msIsSiteMode()) ? 'standalone' : 'browser';
			App.mode = (screen.availHeight == document.documentElement.clientHeight) ? 'browser' : App.mode;	// Ignore standalone mode for metro UI, as it doesn't work correctly.
		}
		else if ('mozApps' in window.navigator)
		{
			// Firefox OS, Firefox desktop, and Firefox for Android support standalone web apps and an install API
			$Console.debug(prefix+'Standalone mode supported.');
			App.supports.standalone = true;
			var mozManifest = 'http://gsk-paro-fdi2014.echocoms.webfactional.com/gsk_paro_fdi2014.moz.manifest';
			var mozApp;
			var mozAppRequest = window.navigator.mozApps.checkInstalled(mozManifest);	// Is installed?
			var mozAbort = function ()
			{
				$Console.log(prefix+'(Moz) Caching aborted!');
				App.aborted = true;
				if ('abort' in _appCache)
				{
					// #BUG: Firefox has yet to support this method
					_appCache.abort();	// Cancel download of app cache  (Currently not working in most browsers)
				}
			}
			mozAppRequest.onsuccess = function ()
			{
				mozApp = this.result;
				if (mozApp)
				{
					$Console.log(prefix+'(Moz) Already installed.');
					var mozAppRequest2 = window.navigator.mozApps.getSelf(mozManifest);	// Is running?
					mozAppRequest2.onsuccess = function ()
					{
						mozApp = this.result;
						if (mozApp)
						{
							$Console.log(prefix+'(Moz) Running.');
							return;
						}
						mozAbort();
					}
					return;
				}
				mozAbort();
				var mozAppInstallRequest = window.navigator.mozApps.install(mozManifest);	// Install
				mozAppInstallRequest.onsuccess = function ()
				{
					mozApp = this.result;
					$Console.log(prefix+'(Moz) Installed.');
				};
				mozAppInstallRequest.onerror = function ()
				{
					$Console.error(prefix+'(Moz) Installation failed with '+this.error.name+'.');
				};
			};
			App.mode = false;
		}
		else
		{
			// Unknown UA
			//alert('Unknown UA : '+navigator.userAgent);
			// See if we can detect a standalone mode from a difference in height due to browser chrome
			App.mode = ((screen.availHeight - document.documentElement.clientHeight) <= 25) ? 'standalone' : 'browser';
			App.supports.standalone = (App.mode == 'standalone') ? true : false;
		}
	}
	$Console.debug(prefix+App.mode+' mode.');
	// Check screen orientation support
	if (screen && 'orientation' in screen)
	{
		$Console.debug(prefix+'Screen Orientation API supported.');
		App.supports.orientation = true;
	}
	
	// Add cache methods
	if (App.supports.appcache)
	{
		// Status
		App.status = function ()
		{
			switch (_appCache.status)
			{
				case '0':	// UNCACHED
					return 'Unavailable';
					break;
				case '1':	// IDLE
					if (this.done)
					{
						return 'Done';
					}
					return 'Idle';
					break;
				case '2':	// CHECKING
					if (this.cached)
					{
						return 'Checking for update';
					}
					return 'Checking for install';
					break;
				case '3':	// DOWNLOADING
					if (this.cached)
					{
						return 'Updating';
					}
					return 'Installing';
					break;
				case '4':	// UPDATEREADY
					if (this.cached)
					{
						return 'Updated';
					}
					return 'Installed';
					break;
				default:
					return _appCache.status;
			}
		}
		// Update
		App.update = function ()
		{
			_appCache.update();	// Attempt to update app cache
			return this;
		}
		// Abort
		App.abort = function ()
		{
			$Console.log(prefix+'Caching aborted!');
			this.aborted = true;
			_appCache.abort();	// Cancel download of app cache  (Currently not working in most browsers)
			return this;
		}
		// Dots
		var dots = '...';
		var moreDots = function (o)
		{
			if (this.done)
			{
				return;	// Stop dots!
			}
			var newDots;
			switch (dots)
			{
				case '.&nbsp;&nbsp;':
					newDots = '..&nbsp;';
					break;
				case '..&nbsp;':
					newDots = '...';
					break;
				default:
					newDots = '.&nbsp;&nbsp;';
			}
			o.innerHTML = o.innerHTML.replace(dots, newDots);	// Watch the tail!
			dots = newDots;
			setTimeout(function () { moreDots.call(this, o); }, 1000);
		}
		// Event handler
		App.on = function (event, f)
		{
			var t = this;
			_appCache.addEventListener(event, function (e)
			{
				f.call(t, e);
			}, false);
			return this;
		}
	}
	
	// Settings
	App.settings =
	{
		install:	'auto',	// Install behaviour: 'auto', Install automatically; 'prompt', Prompt. (Can't use prompt due to lack of abort support)
		update:		'prompt',	// Update behaviour: 'auto', Update automatically; 'wait', Wait until next refresh; 'prompt', Prompt.
		mode: (App.supports.standalone) ? 'standalone' : false,
		notice: function ()
		{
			var notice = document.querySelector(this.noticeID);
			if (notice)
			{
				this.notice = function ()
				{
					return notice;
				};
			}
			return notice;
		},
		noticeID: '#webapp-notice',
		guidanceID: '#webapp-standalone-guidance'
	}
	// Online state
	App.online = ('onLine' in navigator) ? navigator.onLine : true;
	if (App.online)
	{
		$Console.debug(prefix+'Online.');
	}
	else
	{
		$Console.debug(prefix+'Offine.');
	}
	
	// Caching events
	if (App.supports.appcache)
	{
		App.done = false;
		App.aborted = false;
		App.cached = window.localStorage.getItem('cached');	// Already cached knowingly?
		App.reallycached = window.localStorage.getItem('reallycached');	// Already cached regardless of abort?
		App.installed = window.localStorage.getItem('installed');	// Already installed?
		
		// Listen to Application Cache events
		App.on('checking', function (e)
		{
			//alert('checking.');
			// Checking for new app cache (first time or update).
			if (!this.installed && this.reallycached && this.mode == 'standalone')
			{
				// Already (really) cached in browser despite abort, but now running in standalone so consider cached and installed
				$Console.log(prefix+'Switched from browser to standalone, so consider installed.');
				this.cached = true;
				window.localStorage.setItem('cached', true);
				this.installed = true;
				window.localStorage.setItem('installed', true);
				
				if (/Android|Windows|Linux|CrOS/.test(navigator.userAgent) && /Chrome\/[.0-9]+/.test(navigator.userAgent) && !(/Version/.test(navigator.userAgent)))
				{
					// Chrome shares data between browser and standalone mode, so handle standalone first runs as installs.
				}
			}
			if (!this.cached)
			{
				// First time
				$Console.log(prefix+'Not yet cached.');
				if (this.settings.mode && this.mode != this.settings.mode)
				{
					// Wrong mode
					if (this.supports.standalone && this.settings.mode == 'standalone')
					{
						// Browser mode instead of standalone
						$Console.warn(prefix+'Standalone mode requested, but in browser mode.');
						this.abort();
						document.querySelector(this.settings.noticeID+' p > span:first-child').innerHTML = 'You can install this web app for offline use.';
						document.querySelector(this.settings.noticeID+' p > span:first-child').removeAttribute('data-state');
						var notice = this.settings.notice();
						var guidance;
						//alert(navigator.userAgent);
						if (/\(iPhone/.test(navigator.userAgent) && /OS 7/.test(navigator.userAgent))
						{
							//	iOS7 iPhone
							$Console.info(prefix+'iOS 7 (iPhone) - Safari');
							$(notice).css('transition', 'none').addClass('flip')[0].offsetHeight;	// Disable transitions, switch to the flipped notification class, then force a redraw of the new styles.
							$(notice).css('transition', '');	// Enable transitions again.
							guidance = document.querySelector(this.settings.guidanceID+'-ios7');
							guidance.setAttribute('id', this.settings.guidanceID.replace('#', '')+'-ios7-iphone');
						}
						if (/\(iPhone/.test(navigator.userAgent) && /OS 8/.test(navigator.userAgent))
						{
							//	iOS8 iPhone
							$Console.info(prefix+'iOS 8 (iPhone) - Safari');
							$(notice).css('transition', 'none').addClass('flip')[0].offsetHeight;	// Disable transitions, switch to the flipped notification class, then force a redraw of the new styles.
							$(notice).css('transition', '');	// Enable transitions again.
							guidance = document.querySelector(this.settings.guidanceID+'-ios8');
							guidance.setAttribute('id', this.settings.guidanceID.replace('#', '')+'-ios8-iphone');
						}
						else if (/\(iPad/.test(navigator.userAgent) && /OS 7/.test(navigator.userAgent))
						{
							//	iOS7 iPad
							$Console.info(prefix+'iOS 7 (iPad) - Safari');
							guidance = document.querySelector(this.settings.guidanceID+'-ios7');
							guidance.setAttribute('id', this.settings.guidanceID.replace('#', '')+'-ios7-ipad');
						}
						else if (/\(iPad/.test(navigator.userAgent) && /OS 8/.test(navigator.userAgent))
						{
							//	iOS8 iPad
							$Console.info(prefix+'iOS 8 (iPad) - Safari');
							guidance = document.querySelector(this.settings.guidanceID+'-ios8');
							guidance.setAttribute('id', this.settings.guidanceID.replace('#', '')+'-ios8-ipad');
						}
						else if (/Android/.test(navigator.userAgent) && /Chrome\/[.0-9]+/.test(navigator.userAgent) && !(/Version/.test(navigator.userAgent)))
						{
							// Chrome for Android
							$Console.info(prefix+'Android - Chrome');
							guidance = document.querySelector(this.settings.guidanceID+'-chromea');
						}
						else if (/Windows|Linux|CrOS/.test(navigator.userAgent) && /Chrome\/[.0-9]+/.test(navigator.userAgent) && !(/Version/.test(navigator.userAgent)))
						{
							// Chrome for Windows/Linux/Chrome OS
							$Console.info(prefix+'Windows/Linux/Crome OS - Chrome');
							guidance = document.querySelector(this.settings.guidanceID+'-chrome');
						}
						else if (/Trident\/(6|7)/.test(navigator.userAgent) && /Windows NT 6\.(2|3)/.test(navigator.userAgent))
						{
							// IE 10/11 for Windows 8
							$Console.info(prefix+'Windows 8 - IE 10/11');
							guidance = document.querySelector(this.settings.guidanceID+'-iewin');
						}
						else if (/Trident\/(5|6|7)/.test(navigator.userAgent) && /Windows NT 6\.1/.test(navigator.userAgent))
						{
							// IE 9/10/11 for Windows 7
							$Console.info(prefix+'Windows 7 - IE 9/10/11');
							guidance = document.querySelector(this.settings.guidanceID+'-iewin');
						}
						else if (/Trident\/(5|6|7)/.test(navigator.userAgent) && /Windows NT 6\.0/.test(navigator.userAgent))
						{
							// IE9/10/11 for Windows Vista
							$Console.info(prefix+'Windows Vista - IE 9/10/11');
							guidance = document.querySelector(this.settings.guidanceID+'-iewin');
						}
						else
						{
							//alert('Unknown');
							$Console.warn(prefix+'Unsupported user agent ('+navigator.userAgent+').');
						}
						notice.removeAttribute('data-state');
						if (guidance)
						{
							guidance.removeAttribute('data-state');
						}
						setTimeout(function ()
						{
							if (guidance)
							{
								guidance.setAttribute('data-state', 'inert');
							}
							notice.setAttribute('data-state', 'inert');
						}, 30000);
					}
					else if (this.setttings.mode != 'standalone')
					{
						// Standalone mode instead of browser
						$Console.warn(prefix+'Browser mode requested, but in standalone mode.');
						this.abort();
						document.querySelector(this.settings.noticeID+' p > span:first-child').innerHTML = 'You should reopen this web app in your browser for the full experience.';
						document.querySelector(this.settings.noticeID+' p > span:first-child').removeAttribute('data-state');
						this.settings.notice().removeAttribute('data-state');
						var notice = this.settings.notice();
						setTimeout(function ()
						{
							notice.setAttribute('data-state', 'inert');
						}, 30000);
					}
					else
					{
						// Browser mode instead of standalone (unsupported)
						$Console.warn(prefix+'Standalone mode requested, but not supported.');
					}
				}
				if (this.supports.quota)
				{
					// Check required space is available, otherwise request it.
				}
			}
			else
			{
				$Console.log(prefix+'Already cached.');
			}
		}).on('noupdate', function (e)
		{
			// No app cache update.
			$Console.log(prefix+'No update.');
		}).on('downloading', function (e)
		{
			if (this.aborted)
			{
				$Console.log(prefix+'Downloading but aborted.');
				return;
			}
			// New app cache found and downloading
			if (this.settings.install == 'auto' || (!this.cached && confirm('This web app can be used offline. Do you wish to install it?')))
			{
				document.querySelector(this.settings.noticeID+' p > span:first-child').innerHTML = 'Installing in the background...';
				moreDots(document.querySelector(this.settings.noticeID+' p > span:first-child'));
				document.querySelector(this.settings.noticeID+' p > span:first-child').removeAttribute('data-state');
				document.querySelector(this.settings.noticeID+' p > span:last-child').removeAttribute('data-state');
				document.querySelector(this.settings.noticeID+' progress').removeAttribute('data-state');
				document.querySelector(this.settings.noticeID+' label').removeAttribute('data-state');
				this.settings.notice().removeAttribute('data-state');
				$Console.log(prefix+'Installing web app...');
			}
			else if (this.settings.update == 'auto' || (this.cached && confirm('A new version of this web app is available. Install it now?')))
			{
				document.querySelector(this.settings.noticeID+' p > span:first-child').innerHTML = 'Updating in the background...';
				moreDots(document.querySelector(this.settings.noticeID+' p > span:first-child'));
				document.querySelector(this.settings.noticeID+' p > span:first-child').removeAttribute('data-state');
				document.querySelector(this.settings.noticeID+' p > span:last-child').removeAttribute('data-state');
				document.querySelector(this.settings.noticeID+' progress').removeAttribute('data-state');
				document.querySelector(this.settings.noticeID+' label').removeAttribute('data-state');
				this.settings.notice().removeAttribute('data-state');
				$Console.log(prefix+'Installing web app update...');
			}
			else
			{
				// Don't download
				this.abort();
			}
		}).on('progress', function (e)
		{
			// App cache resource downloaded.
			if (e.loaded >= 0)
			{
				var p = (e.loaded / e.total);
				document.querySelector(this.settings.noticeID+' progress').value = p;
				document.querySelector(this.settings.noticeID+' progress').setAttribute('value', p);
				document.querySelector(this.settings.noticeID+' progress').setAttribute('title', Math.floor(p * 100)+'%');
				document.querySelector(this.settings.noticeID+' progress + label').innerHTML = Math.floor(p * 100)+'%';
			}
			else
			{
				// Firefox doesn't implement the progress event correctly, so just hide the progress
				document.querySelector(this.settings.noticeID+' progress').setAttribute('data-state', 'inert');
				document.querySelector(this.settings.noticeID+' progress + label').setAttribute('data-state', 'inert');
			}
		}).on('cached', function (e)
		{
			//alert('cached');
			if (this.aborted)
			{
				$Console.warn(prefix+'Cached but aborted.');
				this.reallycached = true;
				window.localStorage.setItem('reallycached', true);
				return;
			}
			this.cached = true;
			window.localStorage.setItem('cached', true);
			// App has now been cached
			document.querySelector(this.settings.noticeID+' p > span:first-child').innerHTML = 'This web app has been installed and can now be used offline.';
			document.querySelector(this.settings.noticeID+' p > span:first-child').removeAttribute('data-state');
			var noticeID = this.settings.noticeID;
			document.querySelector(this.settings.noticeID+' progress').addEventListener('webkitTransitionEnd', function (e)
			{
				document.querySelector(noticeID+' p > span:last-child').setAttribute('data-state', 'inert');
			}, false);
			document.querySelector(this.settings.noticeID+' progress').addEventListener('transitionEnd', function (e)
			{
				document.querySelector(noticeID+' p > span:last-child').setAttribute('data-state', 'inert');
			}, false);
			setTimeout(function ()
			{
				document.querySelector(noticeID+' progress').setAttribute('data-state', 'inert');
				document.querySelector(noticeID+' label').setAttribute('data-state', 'inert');
			}, 1000);
			var notice = this.settings.notice();
			setTimeout(function ()
			{
				notice.setAttribute('data-state', 'inert');
			}, 5000);
			$Console.log(prefix+'Web app cached.');
		}).on('updateready', function (e)
		{
			// New app cache available
			this.done = true;
			if (!this.cached && this.reallycached)
			{
				$Console.warn(prefix+'Updated but shouldn\'t be cached, so do nothing.');
				return;
			}
			if (this.settings.update == 'auto' || (this.settings.update == 'prompt' && confirm('Update installed. Restart web app now?')))
			{
				// Reload page with new app cache
				$Console.log(prefix+'Reloading to new version of web app...');
				location.reload();
			}
			else if (this.settings.update == 'new')
			{
				// Use new app cache for all new requests (May result in discrepancies between versions)
				_appCache.swapCache();
				$Console.log(prefix+'Swaped to the new version of the web app.');
			}
			else
			{
				// Wait for reload
				$Console.log(prefix+'New version of the web app on next reload.');
			}
		}).on('obsolete', function (e)
		{
			// Manifest was 404 or 410. App cache deleted.
			this.settings.notice().setAttribute('data-state', 'inert');
			this.reallycached = false;
			window.localStorage.setItem('reallycached', true);
			this.cached = false;
			window.localStorage.setItem('cached', true);
			this.installed = false;
			window.localStorage.setItem('installed', true);
			if (!this.online)
			{
				$Console.log(prefix+'Obsolete but offline.');
				this.abort();
				return;
			}
			if (this.aborted)
			{
				$Console.warn(prefix+'Obsolete but aborted.');
				return;
			}
			$Console.warn(prefix+'Obsolete.');
			var noticeID = this.settings.noticeID;
			document.querySelector(noticeID+' p > span:first-child').innerHTML = 'This web app has been uninstalled and will no longer work offline.';
			document.querySelector(noticeID+' p > span:first-child').removeAttribute('data-state');
			document.querySelector(this.settings.noticeID+' progress').addEventListener('webkitTransitionEnd', function (e)
			{
				document.querySelector(noticeID+' p > span:last-child').setAttribute('data-state', 'inert');
			}, false);
			document.querySelector(this.settings.noticeID+' progress').addEventListener('transitionEnd', function (e)
			{
				document.querySelector(noticeID+' p > span:last-child').setAttribute('data-state', 'inert');
			}, false);
			setTimeout(function ()
			{
				document.querySelector(noticeID+' progress').setAttribute('data-state', 'inert');
				document.querySelector(noticeID+' label').setAttribute('data-state', 'inert');
			}, 1000);
			var notice = this.settings.notice();
			notice.removeAttribute('data-state');
			setTimeout(function ()
			{
				notice.setAttribute('data-state', 'inert');
			}, 5000);
		}).on('error', function (e)
		{
			// Manifest was 404 or 410, failed to download, or was changed during download.
			if (!this.online)
			{
				//alert('Error because offline');
				$Console.log(prefix+'Error but offline.');
				this.abort();
				return;
			}
			if (this.aborted)
			{
				//alert('Error because manually aborted.');
				$Console.warn(prefix+'Error but aborted.');
				return;
			}
			if (this.cached)
			{
				//alert('Error updating.');
				$Console.error(prefix+'Unable to update web app.');
				var noticeID = this.settings.noticeID;
				document.querySelector(noticeID+' p > span:first-child').innerHTML = 'Unable to update.';
				document.querySelector(noticeID+' p > span:first-child').removeAttribute('data-state');
				document.querySelector(this.settings.noticeID+' progress').addEventListener('webkitTransitionEnd', function (e)
				{
					document.querySelector(noticeID+' p > span:last-child').setAttribute('data-state', 'inert');
				}, false);
				document.querySelector(this.settings.noticeID+' progress').addEventListener('transitionEnd', function (e)
				{
					document.querySelector(noticeID+' p > span:last-child').setAttribute('data-state', 'inert');
				}, false);
				setTimeout(function ()
				{
					document.querySelector(noticeID+' progress').setAttribute('data-state', 'inert');
					document.querySelector(noticeID+' label').setAttribute('data-state', 'inert');
				}, 1000);
				var notice = this.settings.notice();
				notice.removeAttribute('data-state');
				setTimeout(function ()
				{
					notice.setAttribute('data-state', 'inert');
				}, 5000);
				return;
			}
			if (!window.localStorage.getItem('ios-recache') && this.mode == 'standalone')
			{
				// iOS 6+ always fails first home screen cache with quota error if quota exceeded, so ignore and reload
				$Console.warn(prefix+'Error and not cached, but possibly an iOS quota error, so retrying.');
				//alert('Error and not cached, but possibly an iOS quota error, so retrying');
				window.localStorage.setItem('ios-recache', true);
				window.location.reload();
				return;
			}
			//alert('Error installing.');
			$Console.error(prefix+'Unable to install web app.');
			var noticeID = this.settings.noticeID;
			document.querySelector(noticeID+' p > span:first-child').innerHTML = 'Unable to install.';
			document.querySelector(noticeID+' p > span:first-child').removeAttribute('data-state');
			document.querySelector(this.settings.noticeID+' progress').addEventListener('webkitTransitionEnd', function (e)
			{
				document.querySelector(noticeID+' p > span:last-child').setAttribute('data-state', 'inert');
			}, false);
			document.querySelector(this.settings.noticeID+' progress').addEventListener('transitionEnd', function (e)
			{
				document.querySelector(noticeID+' p > span:last-child').setAttribute('data-state', 'inert');
			}, false);
			setTimeout(function ()
			{
				document.querySelector(noticeID+' progress').setAttribute('data-state', 'inert');
				document.querySelector(noticeID+' label').setAttribute('data-state', 'inert');
			}, 1000);
			var notice = this.settings.notice();
			notice.removeAttribute('data-state');
			setTimeout(function ()
			{
				notice.setAttribute('data-state', 'inert');
			}, 5000);
		});
	}
	else
	{
		// No support
		$Console.warn(prefix+'Web apps not supported.');
		/*
		window.addEventListener('load', function ()
		{
			document.querySelector(this.settings.noticeID+' p > span:first-child').innerHTML = 'Your device does not support offline web apps.';
			this.settings.notice().removeAttribute('data-state');
			var notice = this.settings.notice();
			setTimeout(function ()
			{
				notice.setAttribute('data-state', 'inert');
			}, 5000);
		}, false);*/
	}
})();