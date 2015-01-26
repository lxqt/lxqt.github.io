// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name web.compiled.js
// ==/ClosureCompiler==

(function ()
{
	// Register module
	$Module.add(
	{
		name: 'Web',
		src: 'web.js',
		version: '1.3',
		description: 'Common functions and behaviours to everything.',
		dependencies:
		[
			{
				name: 'jQuery',
				src: 'jquery.js'
			}
		],
		styles:
		[
			'base.scss',
			'web.scss'
		],
		callback: function (dependency)	// Callback once all dependencies have loaded
		{
			var m = this;
			
			var readyCallback = function ()
			{
				$Console.log(m.name+': Initialising ('+$Console.time(m.name)+')...');
				
				// $Web
				(function ($)
				{
					var prefix = '$Web';	// Console prefix
					
					// Web class.
					var Web = function (settings)
					{
						this.title = $(':root > head > title').text();
						this.dom = $(':root');
						if (settings)
						{
							// Merge in custom properties and any overrides.
							jQuery.extend(true, this, settings);
						}
						window.$Web = this;
						return this;
					}
					Web.prototype.toString = function ()
					{
						return this.title;
					}
					Web.prototype.valueOf = function ()
					{
						return this.dom[0];
					}
					var classes = {};	// Class registry
					Web.prototype.extend = function (c, extension)	// Extend or added classes
					{
						if (!c)
						{
							// Invalid call
							$Console.error(prefix+'.extend: Invalid call.');
							return this;
						}
						if (typeof c == 'function' || typeof c == 'object')
						{
							// Call to extend implicit Web class
							extension = c;
							c = 'Web';
						}
						if (!extension)
						{
							// Call for explicit class
							return classes[c];
						}
						if (typeof extension != 'function' && typeof extension != 'object')
						{
							// Call with invalid extension
							$Console.error(prefix+'.extend: Invalid extension.');
							return this;
						}
						if (typeof extension == 'function')
						{
							// Call with class extension function
							extension = extension(classes[c]);
						}
						if (typeof extension == 'function')
						{
							// Set class to function object
							if (classes[c])
							{
								$Console.log(prefix+': Class '+c+' redefined.');
							}
							else
							{
								$Console.log(prefix+': Class '+c+' created.');
							}
							classes[c] = extension;
							return this;
						}
						if (typeof extension == 'object' || typeof extension == 'function')
						{
							// Merge class with class extension object (or extension function with returned extension object)
							classes[c] = (!classes[c]) ? {} : classes[c];
							//classes[c] = jQuery.extend(true, classes[c], extension);
							for (p in extension)
							{
								classes[c].prototype[p] = extension[p];
							}
							$Console.log(prefix+': Extended class '+c+'.');
							return this;
						}
						$Console.error(prefix+'.extend: extension failed.');
						return this;
					}
					var supports = [];
					Web.prototype.supports = function (s)	// Get or add supported feature flags for Web class.
					{
						if (!s)
						{
							return supports;
						}
						if (typeof s == 'string')
						{
							return supports[s];
						}
						if (typeof s == 'object')
						{
							jQuery.extend(true, supports, s);
						}
						return this;
					}
					classes['Web'] = Web;
					
					// Initial $Web functions
					// One time web registration.
					window.$Web = function (settings)
					{
						window.$Web = new classes['Web'](settings);	// Change $Web to use the new Web instance
						$Console.log(prefix+': Registered.');
						return window.$Web;
					}
					// Extend or add classes prior to $Web registration.
					window.$Web.extend = function (c, extension)
					{
						return Web.prototype.extend.call($Web, c, extension);
					}
					// Get or add supported feature flags for Web class prior to $Web registration.
					window.$Web.supports = function (s)
					{
						return Web.prototype.supports.call($Web, s);
					}
				})(jQuery);
				
				// Web.Actions
				// #ToDo: Split into Web.Actions module.
				// Requires: Web, jQuery
				(function ($)
				{
					var prefix = m.name+'.Action: ';	// Console prefix
					
					var actions = {};	// Action definition list
					var actionDefinition = function (type, f)	// Action definitions
					{
						if (!f)
						{
							// Get action definition from list
							return actions[type];
						}
						actions[type] = f;	// Add action definition to list
						return this;
					};
					var action = function (a, self)	// Element action
					{
						if (!a)
						{
							// Get action from element
							return this.attr('data-action');
						}
						if (typeof a == 'boolean')
						{
							// Do action for element
							return doAction.call(this, self);
						}
						if (actions[a.split('.', 1)[0]])
						{
							// Set action for element
							this.attr('data-action', a);
							return this;
						}
						return false;
					};
					var doAction = function (self)	// Do action
					{
						if (this.action().indexOf(' ') >= 0)
						{
							// List of actions
							var as = this.action().split(' ');
							var t = this;
							return $.each(as, function (i, v)
							{
								var type = v.split('.', 1)[0];
								var a = actions[type];
								if (a)
								{
									var r = a.call(t, self, { 'action': v, 'index': i});
									if ('track' in $Web)
									{
										// Support Web.Track module
										$Web.track(type, t);
									}
									return r;
								}
								return false;
							});
						}
						var type = this.action().split('.', 1)[0];
						var a = actions[type];
						if (a)
						{
							var r = a.call(this, self);
							if ('track' in $Web)
							{
								// Support Web.Track module
								$Web.track(type, this);
							}
							return r;
						}
						return false;
					}
					$.fn.extend(	// Extend $()
					{
						// $().action() - Get action for element
						// $().action(action) - Set action for element
						// $().action(action, true) - Set self action for element
						// $().action(true) - Do element's action
						// $().action(true, true) - Do element's self action
						action:	action
					});
					window.$Web.action = actionDefinition;	// Create new action method pre-registration
					$Web.extend(	// Extend $Web
					{
						// $Web.action(type) - Get action from action definition list
						// $Web.action(type, function) - Add action to action definition list
						action: actionDefinition
					});
					$(document).on('click.web.web_action', '[data-action]', function (e)	// Handle events
					{
						$(this).action(true);
						e.preventDefault();
					});
					$(document).on('click.web.web_action', '[data-action-self]', function (e)	// Handle events
					{
						$(this).action(true, true);
						e.preventDefault();
					});
					
					// Replace URL action handler to open new windows when needed.
					var urlOpen = function (target)	// Open URL in new window
					{
						var e = document.createEvent('HTMLEvents');
						e.initEvent('click', true, true);
						$(document.createElement('a')).attr('href', target).attr('target', '_blank')[0].dispatchEvent(e);
					}
					var urlAction = function (self, data)	// URL action
					{
						var a = this.attr('data-action');
						var target = (this.attr('data-target')) ? this.attr('data-target') : $(this).attr('href');
						if (data)
						{
							// Multi action
							a = data.action;
							target = this.attr('data-target').split(' ')[data.index];
						}
						var args = a.split('.');
						if (target)
						{
							$Console.log(prefix+'URL '+target+' requested.');
							if (target.indexOf('#') >= 0)
							{
								// URL fragment
								switch (args[1])
								{
									case 'window':
										return urlOpen(target);
										break;
									case 'frame':
										// Target has data attached.
										return document.frames[target.split(',')[1]].location.href = target.split(',')[0];
									default:
										return window.location.href = target;
								}
							}
							else if (target.indexOf('http') >= 0)
							{
								// Absolute URL
								switch (args[1])
								{
									case 'window':
										return urlOpen(target);
										break;
									case 'frame':
										// Target has data attached.
										return document.frames[target.split(',')[1]].location.href = target.split(',')[0];
										break;
									default:
										return window.location.href = target;
								}
							}
							else
							{
								// Relative URL
								switch (args[1])
								{
									case 'window':
										return urlOpen(target);
										break;
									case 'frame':
										// Target has data attached.
										return document.frames[target.split(',')[1]].location.href = target.split(',')[0];
										break;
									default:
										return window.location.href = target;
								}
							}
						}
						return false;
					}
					$Web.action('url', urlAction);	// Add url action definition to Web.Actions
				})(jQuery);
				
				// Web.Focus
				// #ToDo: Split into Web.Focus module.
				// Requires: Web, jQuery, Web.Actions
				(function ($)
				{
					var prefix = m.name+'.Focus: ';	// Console prefix
					
					var focusAction = function (self, data)	// Focus action
					{
						var a = this.attr('data-action');
						var target = (self) ? this : (this.attr('data-target')) ? this.attr('data-target') : this;
						if (data)
						{
							// Multi action
							a = data.action;
							target = this.attr('data-target').split(' ')[data.index];
							target = (target == 'self') ? this : target;
						}
						var $target = $(target);
						$target.focus();
						return this;
					}
					$Web.action('focus', focusAction);	// Add focus action definition to Web.Actions
				})(jQuery);
				
				// Web.Value
				// #ToDo: Split into Web.Value module
				// Requires: Web, jQuery
				(function ($)
				{
					var prefix = m.name+'.Value: ';	// Console prefix
					
					var valueSync = function ()
					{
						return $(this).each(function (i, v)
						{
							if ($(this).is('input[type="checkbox"]') || $(this).is('input[type="radiobox"]'))
							{
								if ($(this).is(':checked'))
								{
									$(this).attr('data-checked').attr('data-value', $(this).val());
								}
								else
								{
									$(this).removeAttr('data-checked').attr('data-value', '');
								}
							}
							else if ($(this).is('input') || $(this).is('textarea'))
							{
								$(this).attr('data-value', $(this).val());
							}
							else if ($(this).is('select'))
							{
								var s = [];
								$(this).find('option').each(function (i, v)
								{
									if ($(this).is(':selected'))
									{
										s.push(i);
									}
								});
								s = s.join(',');
								$(this).attr('data-selected', s).attr('data-value', $(this).val());
							}
							$Console.debug(this).log(prefix+'value synced.');
						});
					}
					var valueAction = function (self, data)	// Focus action
					{
						var a = this.attr('data-action');
						var target = (self) ? this : (this.attr('data-target')) ? this.attr('data-target') : this;
						if (data)
						{
							// Multi action
							a = data.action;
							target = this.attr('data-target').split(' ')[data.index];
							target = (target == 'self') ? this : target;
						}
						var $target = $(target);
						var args = a.split('.');
						switch (args[1])
						{
							case 'clear':	// Clear value
								return $target.each(function (i, v)
								{
									if ($(this).is('input[type="checkbox"]') || $(this).is('input[type="radiobox"]'))
									{
										$(this).prop('checked', false).removeAttr('data-checked').removeAttr('data-value');
									}
									else if ($(this).is('input') || $(this).is('textarea'))
									{
										$(this).val('').removeAttr('data-value');
									}
									else if ($(this).is('select'))
									{
										var s = [];
										$(this).find('option').each(function (i, v)
										{
											$(this).removeProp('selected');
										});
										$(this).removeAttr('data-selected').removeAttr('data-value');
									}
									$Console.debug(this).log(prefix+'value cleared.');
								});
								break;
							case 'reset':	// Reset value
								return $target.each(function (i, v)
								{
									if ($(this).is('input[type="checkbox"]') || $(this).is('input[type="radiobox"]'))
									{
										if ($(this).is('[checked]'))
										{
											$(this).prop('checked', true).attr('data-checked', true).attr('data-value', $(this).val());
										}
										else
										{
											$(this).prop('checked', false).removeAttr('data-checked').removeAttr('data-value');
										}
									}
									else if ($(this).is('input') || $(this).is('textarea'))
									{
										if ($(this).attr('value'))
										{
											$(this).val($(this).attr('value')).attr('data-value', $(this).attr('value'));
										}
										else
										{
											$(this).val('').removeAttr('data-value');
										}
									}
									else if ($(this).is('select'))
									{
										var s = [];
										$(this).find('option').each(function (i, v)
										{
											if ($(this).is('[selected]'))
											{
												s.push(i);
												$(this).prop('selected');
											}
											else
											{
												$(this).removeProp('selected');
											}
										});
										if (s.length > 0)
										{
											s = s.join(',');
											$(this).attr('data-selected', s).attr('data-value', $(this).val());
										}
										else
										{
											$(this).removeAttr('data-selected').removeAttr('data-value');
										}
									}
									$Console.debug(this).log(prefix+'value reset.');
								});
								break;
							default:
								if (typeof args[1] === 'undefined')
								{
									// Get element value
									if ($target.attr('data-value') != $target.val())
									{
										$target.syncValue();
									}
									$Console.debug($target).log(prefix+'value is '+$target.attr('data-value')+'.');
									return $target.attr('data-value');
								}
								// Set element value
								return $target.each(function (i, v)
								{
									if ($target.is('input[type="checkbox"]') || $target.is('input[type="radiobox"]'))
									{
										if (args[1] == 'check')
										{
											$target.prop('checked', true).attr('data-checked', true).attr('data-value', $(this).val());
										}
										else
										{
											$target.prop('checked', false).removeAttr('data-checked').removeAttr('data-value');
										}
									}
									else if ($target.is('input') || $target.is('textarea'))
									{
										$target.val(args[1]).attr('data-value', args[1]);
									}
									else if ($target.is('select'))
									{
										var s = args[1].split(',');
										$target.find('option').each(function (i, v)
										{
											if ($.inArray(i, args[1]))
											{
												s.push(i);
												$(this).prop('selected', true);
											}
											else
											{
												$(this).prop('selected', false);
											}
										});
										if (s.length > 0)
										{
											s = s.join(',');
											$target.attr('data-selected', s).attr('data-value', $(this).val());
										}
										else
										{
											$target.removeAttr('data-selected').removeAttr('data-value');
										}
									}
									$Console.debug($target).log(prefix+'value set.');
								});
						}
						return this;
					}
					$Web.action('value', valueAction);	// Add focus action definition to Web.Actions
					$.fn.extend(	// Extend $()
					{
						// $().syncValue() - Get element state
						syncValue:			valueSync
					});
					
					$(document).on('input.web change.web', 'input, textarea', function (e)
					{
						$(this).syncValue();
					});
				})(jQuery);
				
				// Web.Track
				// #ToDo: Split into Web.Track module.
				// Requires: Web, jQuery
				(function ($)
				{
					var prefix = m.name+'.Track: ';	// Console prefix
					
					var trackers =	// Trackers list
					{
						'ga':	// Goolge Analytics
						{
							'id':		'ga',
							'name':		'Google Analytics',
							'track':	function (data, success)
							{
								return ga('send', 'event', data['object'], data['action'], data['id'], success);
							}
						}
					};
					var track = function (data, restricted)	// Track element
					{
						if (restricted)
						{
							this.attr('data-restricted', 1);
						}
						return this.each(function (data, restricted)
						{
							if (!$(this).is('[data-track]'))
							{
								$(this).attr('[data-track]', JSON.stringify(data).replace("'", "\'").replace('"', "'")); 
							}
							if (data)
							{
								this.data('track', data);
							}
							var d = this.data('track');
							d['success'] = 1;
							if ($(this).is('[data-restricted]'))
							{
								d['success'] = ($(':root').data('auth').authed) ? 1 : 0;
							}
							$Console.log(prefix+'Data '+$(this).attr('data-track')+' is bound on '+d['on']+'.');
							var f = function (e)
							{
								$Console.log(prefix+'Sent '+$(this).attr('data-track')+'.');
								$.each(trackers, function (i, v)
								{
									v.track($(this).data('track'), d['success']);
								});
								if ($(this).data('track')['once'])
								{
									$(this).off(e.type+'.web.web_track');
								}
							}
							switch (d['on'])
							{
								case 'play':
									$(this).on('play.web.web_track', f);
									break;
								default:
									$(this).on('click.web.web_track', f);
							}
						});
					};
					var webTrack = function(type, $element)
					{
						var d = $element.data('track');
						if (d)
						{
							var data =
							{
								'object':	d['object'],
								'action':	type,
								'id':		d['id']
							}
							$.each(trackers, function (i, v)
							{
								v.track(data, 1);
							});
						}
					};
					var tracker = function (tracker)	// Tracker definition
					{
						if (!tracker)
						{
							return trackers;
						}
						if (typeof tracker == 'String')
						{
							return trackers[tracker];
						}
						else
						{
							trackers[tracker['id']] = tracker;
							return trackers[tracker['id']];
						}
					};
					$.fn.extend(	// Extend $()
					{
						// $().track() - Register element tracking
						// $().track(data, restricted) - Set and register element tracking
						track:	track
					});
					$Web.extend(	// Extend $Web
					{
						// $Web.track(type, element) - Track $Web.Action on an element
						track: webTrack,
						// $Web.tracker() - Get tracker definition list
						// $Web.tracker(id) - Get tracker from tracker definition list
						// $Web.tracker(tracker) = Add tracker to tracker definition list
						tracker: tracker
					});
					$('[data-track]').track()	// Add tracking to all track registered elements
				})(jQuery);
				
				// Web.State
				// #ToDo: Split into Web.State module.
				// Requires: Web, jQuery, Web.Actions
				(function ($)
				{
					var prefix = m.name+'.State: ';	// Console prefix
					
					var states =	// State definition list
					{
						'active':	// Active state (highlighted)
						{
							'state':		'active',
							'shiftUp':		'active',
							'shiftDown':	'none',
							'antonym':		'inert'
						},
						'none':	// Indeterminate (displayed, visible, enabled)
						{
							'state':		'none',
							'shiftUp':		'active',
							'shiftDown':	'inert',
							'antonym':		'none'
						},
						'inert':	// Inert state (undisplayed, hidden, disabled)
						{
							'state':		'inert',
							'shiftUp':		'none',
							'shiftDown':	'inert',
							'antonym':		'active'
						}
					}
					var state = function (s)	// Element state
					{
						var r = [];
						this.each(function ()
						{
							if (this)
							{
								if (typeof s == 'undefined')
								{
									// Get element state
									r.push($(this).attr('data-state'));
									$Console.debug(this).log(prefix+'State is '+s+'.');
									return;
								}
								if (s === false)
								{
									$(this).removeAttr('data-state');
									$Console.debug(this).log(prefix+'State removed.');
								}
								if (typeof states[s] != 'undefined')
								{
									// Set element state
									$(this).attr('data-state', s);
									$Console.debug(this).log(prefix+'State set to '+s+'.');
								}
							}
							return this;
						});
						if (typeof s == 'undefined')
						{
							if (r.length == 1)
							{
								return r[0];
							}
							return r;
						}
						return this;
					};
					var stateToggle = function ()	// Element state toggle
					{
						return this.each(function ()
						{
							var s = ($(this).attr('data-state')) ? $(this).attr('data-state') : 'none';
							var a = (states[s].antonym) ? states[s].antonym : $(this).attr('data-state-toggle')
							
							var t = $(this).attr('data-state-toggles');
							if (t)
							{
								t = t.split(' ');
								a = (t[0] != s) ? t[0] : t[1];
							}
							$(this).attr('data-state', a);
							$Console.debug(this).log(prefix+'State toggled to '+a+'.');
							return this;
						});
					};
					var stateShift = function (dir)	// Element state toggle
					{
						return this.each(function ()
						{
							var shift = '';
							var s = ($(this).attr('data-state')) ? $(this).attr('data-state') : 'none';
							var actions = $(this).attr('data-state', shift).attr('data-action');
							if (dir == 'down')
							{
								shift = states[s].shiftDown;
								actions = actions.replace('shift.down', 'shift.up');
							}
							else
							{
								shift = states[s].shiftUp;
								actions = actions.replace('shift.up', 'shift.down');
							}
							$(this).attr('data-state', shift).attr('data-action', actions);
							$Console.debug(this).log(prefix+'State shifted to '+shift+'.');
							return this;
						});
					};
					var stateAction = function (self, data)	// State action
					{
						var a = this.attr('data-action');
						var target = (self) ? this : (this.attr('data-target')) ? this.attr('data-target') : this;
						if (data)
						{
							// Multi action
							a = data.action;
							if (this.attr('data-target'))
							{
								target = this.attr('data-target').split(' ')[data.index];
								target = (target == 'self') ? this : target;
							}
						}
						var $target = $(target);
						var args = a.split('.');
						switch (args[1])
						{
							case 'toggle':	// Toggle element state
								return $target.stateToggle();
								break;
							case 'shift':	// Shift element state
								return $target.stateShift(args[2]);
								break;
							default:		// Set element state
								if (args[1] == 'none')
								{
									return $target.state(false);
								}
								if (states[args[1]])
								{
									return $target.state(args[1]);
								}
								return false;
						}
						return this;
					}
					$.fn.extend(	// Extend $()
					{
						// $().state() - Get element state
						// $().state(state) - Set element state
						state:			state,
						// $().stateToggle() - Toggle element state
						stateToggle:	stateToggle,
						// $().stateShift(dir) - Shift element state up or down
						stateShift:		stateShift
					});
					$Web.action('state', stateAction);	// Add state action definition to Web.Actions
				})(jQuery);
				
				// Web.Context
				// #ToDo: Split into Web.Context module.
				// Requires: Web, jQuery, Web.Action
				(function ($)
				{
					var prefix = m.name+'.Context: ';	// Console prefix
					
					var $context = $('[data-context="1"]');	// Current context
					var $oldContext = $('[data-context-old]');	// Previous context
					
					var contextHierarchy = function ($element, direction)	// Loop context hierarchy
					{
						if (direction == 'out')
						{
							// Unset outgoing context
							if ($oldContext.is('[data-context="1"]'))
							{
								// Old context was not a mutual parent, so unset.
								$oldContext.attr('data-context', 0).state('inert');
							}
							if ($element.is($oldContext))
							{
								// Started at old context, so no outgoing context heirarchy to unset
								$Console.debug($element).log('Is old context.');
								return $context;
							}
							$element.find('[data-context="1"], [data-context="2"]').each(function ()
							{
								if (!$(this).is($context.parents()) && !$(this).is($oldContext) && !$(this).is($context))
								{
									// Old context hierarchy unset
									$Console.log('Old context hierarchy unset.');
									$(this).attr('data-context', '0').state('inert');
								}
							});
						}
						else
						{
							// Set incoming context
							var $Con = $Console.group('In:', 'log');
							$Con.debug($element);
							if ($element.is($context))
							{
								// At context
								$Con.log('Is context.');
							}
							else
							{
								if ($element.is('[data-context="2"]'))
								{
									// Mutual parent context, so leave alone
									$Con.log('Is mutual parent.');
									if ($element.is($oldContext))
									{
										// At old context, so end.
										$Con.log('Is old context.').log('Done.').send();
										return $context;
									}
									$Con.log('Done.').send();
									$Con = $Console.group('Out:', 'log');
									var r = contextHierarchy($element, 'out');	// Start unsetting old context hierarchy from here
									$Con.log('Done.').send();
									return r;
								}
								$element.state('active').attr('data-context', '2');
							}
							if ($element.is('body'))
							{
								// At highest context level, so don't climb
								$Con.log('Is body.');
								if ($element.is($oldContext))
								{
									// At old context, so end.
									$Con.log('Is old context.').log('Done.').send();
									return $context;
								}
								$element.state('active').attr('data-context', '2');
								$Con.send();
								$Con = $Console.group('Out:', 'log');
								var r = contextHierarchy($element, 'out');	// Start unsetting old context hierarchy from here
								$Con.log('Done.').send();
								return r;
							}
							var $nextElement = $element.parent().closest('[data-context]').first();	// Get next highest context
							if ($nextElement.length == 1)
							{
								$Con.log('Next.').send();
								return contextHierarchy($nextElement, 'in'); // Climbing up new context hierarchy
							}
							$Con.log('Done.').send();
						}
						return $context;
					};
					var changeContext = function ()	// Change context
					{
						var $Con = $Console.group(prefix+' Context change', 'log');
						if (this.is($context))
						{
							// No change required
							$Con.log('No change').log('Done.').send();
							return this;
						}
						$oldContext.removeAttr('data-context-old');
						$oldContext = $context.attr('data-context-old', '');
						$context = this.state('active').attr('data-context', 1);
						contextHierarchy($context);
						$(document).triggerHandler('context',	// Trigger custom context event
						[
							{
								'from': $oldContext,
								'to': $context
							}
						]);
						$Con.log('Done.').send();
						return this;
					};
					var context = function ($element)	// Web context
					{
						switch ($element)
						{
							case 'top':		// Switch to highest context
								return $('body').giveContext();
								break;
							case 'back':	// Return to last context
								return $oldContext.giveContext();
								break;
							case 'up':		// Switch to next highest context
								var $c = $context.parent().closest('[data-context]');
								if ($c.length < 1)
								{
									$c = $('body');
								}
								return $c.giveContext();
								break;
							case 'prev':	// Switch to previous context
								return $context.prevAll('[data-context]').first().giveContext();
								break;
							case 'next':	// Switch to next context
								return $context.nextAll('[data-context]').first().giveContext();
								break;
							default:		// Switch to first element context
								if (!$element || $element.length <= 0)
								{
									return false;
								}
								else if ($element.length > 1)
								{
									$element = $element.first();
								}
								return $element.giveContext();
						}
						return;
					};
					var contextAction = function (self, data)	// Context action
					{
						var a = this.attr('data-action');
						var target = (self) ? this : (this.attr('data-target')) ? this.attr('data-target') : ((this.attr('href')) ? this.attr('href') : this);
						if (data)
						{
							// Multi action
							a = data.action;
							if (this.attr('data-target'))
							{
								target = this.attr('data-target').split(' ')[data.index];
								target = (target == 'self') ? this : target;
							}
						}
						var $target = $(target);
						var args = a.split('.');
						switch (args[1])
						{
							case 'top':
							case 'back':
							case 'up':
							case 'prev':
							case 'next':	// Context keyword
								return $Web.context(args[1]);
								break;
							default:		// Context element
								return $Web.context($target);
						}
						return;
					};
					$.fn.extend(	// Extend $()
					{
						// $().giveContext - Set context to element
						giveContext:	changeContext
					});
					$Web.extend(	// Extend $Web
					{
						// $Web.context() - Get context
						// $Web.context(element) - Set context
						// $Web.context(keyword) - Set context
						context:	context
					})
					$Web.action('context', contextAction);	// Add context.* actions to Web.Action definition list
				})(jQuery);
				
				// Animations
				$('[data-animation-state]').on('webkitAnimationEnd.web.web_animation-state animationend.web.web_animation-state', function (e)
				{
					if (e.target == this)
					{
						$(this).attr('data-animation-state','complete');
					}
				});
				
				// Web.Notify
				// #ToDo: Split into Web.Notify module.
				// Requires: Web, jQuery, Web.State, Web.Action
				(function ($)
				{
					var prefix = m.name+'.Notify: ';	// Console prefix
					
					var notify = function (show)
					{
						$(this).addClass('notification');
						show = (show === false || show == 'dismiss') ? false : true;
						return this.each(function ()
						{
							if (show)
							{
								$(this).state('active');
								$Console.log(prefix+'Notification presented.');
							}
							else
							{
								$(this).state('inert');
								$Console.log(prefix+'Notification dismissed.');
							}
							return this;
						});
					};
					var notifyToggle = function ()
					{
						$(this).addClass('notification');
						return this.each(function ()
						{
							$(this).stateToggle();
							$Console.log(prefix+' Notification toggled.');
							return this;
						});
					}
					var notifyAction = function (self, data)	// Notify action
					{
						var a = this.attr('data-action');
						var target = (self) ? this : (this.attr('data-target')) ? this.attr('data-target') : this;
						alert(target);
						if (data)
						{
							// Multi action
							a = data.action;
							target = this.attr('data-target').split(' ')[data.index];
							target = (target == 'self') ? this : target;
						}
						var $target = $(target);
						var args = a.split('.');
						switch (args[1])
						{
							case 'toggle':	// Toggle notify element
								return $target.notifyToggle();
								break;
							default:		// Set notify element
								return $target.notify(args[1]);
								return false;
						}
						return;
					}
					$.fn.extend(	// Extend $()
					{
						// $().notify() - Present notify elements
						// $().notify(false) - Dismiss notify elements
						notify:	notify,
						// $().notifyToggle() - Toggle notify elements
						notifyToggle:	notifyToggle
					});
					$Web.action('notify', notifyAction);	// Add notify.* actions to Web.Action definition list
				})(jQuery);
				
				// Web.Modal
				// #ToDo: Split into Web.Modal module.
				// Requires: Web, jQuery, Web.State, Web.Action
				(function ($)
				{
					var prefix = m.name+'.Modal: ';	// Console prefix
					var modals = [];
					
					var modalStack = function (m, remove)
					{
						if (remove === false)
						{
							modals.splice($(modals).index(m), 1);
							$(m).state('inert');
							$Console.debug(m).log(prefix+'Modal dismissed and removed from stack.');
							$('body').attr('data-modal', 0);
							if (modals.length > 0)
							{
								var last = modals[modals.length - 1];
								if ($(last).state() != 'active')
								{
									$('body').attr('data-modal', 1);
									$(last).state('active');
									$Console.debug(last).log(prefix+'Last modal in stack presented.');
								}
							}
						}
						else
						{
							var last = modals[modals.length - 1];
							$(last).state(false);
							$Console.debug(last).log(prefix+'Last modal in stack hidden.');
							modals.unshift(m);
							$('body').attr('data-modal', 1);
							$(m).state('active');
							$Console.debug(m).log(prefix+'New Last modal in stack presented.');
						}
					}
					var modal = function (show)
					{
						show = (show === false || show === 'dismiss') ? false : true;
						if (show && $(this).length > 1)
						{
							return this.each(function (i, v)
							{
								modalStack(this);
								return this;
							});
						}
						else if (show)
						{
							modalStack(this);
							$Console.debug(this).log(prefix+'Modal presented.');
						}
						else
						{
							return this.each(function (i, v)
							{
								modalStack(this, false);
								$Console.debug(this).log(prefix+'Modal dismissed.');
								return this;
							});
						}
					};
					var modalToggle = function ()	// Toggle modal element
					{
						return this.each(function (i, v)
						{
							$Console.debug(this).log(prefix+'Toggling modal.');
							if ($(modals).index(this) >= 0)
							{
								return modalStack(this, false);
							}
							return modalStack(this);
						});
					}
					var modalAction = function (self, data)	// Modal action
					{
						var a = this.attr('data-action');
						var target = (self) ? this : (this.attr('data-target')) ? this.attr('data-target') : this;
						if (data)
						{
							// Multi action
							a = data.action;
							target = this.attr('data-target').split(' ')[data.index];
							target = (target == 'self') ? this : target;
						}
						var $target = $(target);
						var args = a.split('.');
						switch (args[1])
						{
							case 'toggle':	// Toggle modal element
								return $target.modalToggle();
								break;
							default:		// Set modal element
								return $target.modal(args[1]);
						}
						return;
					}
					$.fn.extend(	// Extend $()
					{
						// $().modal() - Present modal element(s)
						// $().modal(false) - Dismiss modal element(s)
						modal:	modal,
						// $().modalToggle(false) - Toggle modal element
						modalToggle:	modalToggle
					});
					$Web.action('modal', modalAction);	// Add modal.* actions to Web.Action definition list
				})(jQuery);
				
				m.done();
				$Console.group(m.name, 'info', 'color: #393;').info('Version '+m.version+'.').info(m.description).log('Readied in '+$Console.time(m.name)+'.').debug(m).send();
			};
			$Module.get('jQuery').onready(readyCallback);	// Wait for jQuery to be ready
		}
	});
})();