// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name web.storage.compiled.js
// ==/ClosureCompiler==

(function ()
{
	// Register module
	$Module.add(
	{
		name: 'Web.Storage',
		src: 'web.storage.js',
		version: '1.2',
		description: 'Unifies common storage areas on the web into a single utility that can automatically choose the best storage method.',
		dependencies:
		[
			{
				name: 'jQuery',
				src: 'jquery.js'
			},
			{
				name: 'Web',
				src: 'web.js'
			}
		],
		styles: [],
		callback: function (dependency)
		{
			var m = this;
			
			var waitingFor = [ 'jQuery', 'Web' ];	// Modules that we must wait for
			var readyCallback = function ()
			{
				$Console.log(m.name+': '+this.name+' ready state recieved.');
				if (waitingFor.indexOf(this.name) >= 0)
				{
					// Still waiting
					waitingFor.splice(waitingFor.indexOf(this.name),1);
				}
				if (waitingFor.length == 0 && !m.initialised)
				{
					// Stop waiting
					$Console.log(m.name+': Initialising ('+$Console.time(m.name)+')...');
					
					(function ($)
					{
						var prefix = m.name+': ';	// Console prefix
						
						// Internal functions
						function _getCookie(name)
						{
							var r;
							var x, y, z;
							var c = document.cookie.split(";");
							var c_l = c.length;
							for (z = 0; z < c_l; z++)
							{
								x = c[z].substr(0,c[z].indexOf('='));
								y = c[z].substr(c[z].indexOf('=')+1);
								x = x.replace(/^\s+|\s+$/g,'');
								if (typeof name === 'object' && name instanceof RegExp)
								{
									if (name.test(x))
									{
										r = unescape(y);
										break;
									}
								}
								else if (x == name)
								{
									r = unescape(y);
									break;
								}
							}
							return r;
						}
						function _setCookie(name,data,expiry)
						{
							expiry = new Date(new Date().getTime() + expiry);
							document.cookie = name+'='+escape(data)+'; expires='+expiry.toUTCString()+'; path=/';
							return true;
						}
						function _getValidate(name)
						{
							if (typeof name !== 'string' && typeof name !== 'number' && (typeof name === 'object' && !(name instanceof RegExp)))
							{
								$Console.error(prefix+'Can\'t get; '+name+' is not a string, number, or regular expression.');
								return false;
							}
							return true;
						}
						function _setValidate(name, data, expiry)
						{
							if (typeof name !== 'string' && typeof name !== 'number')
							{
								$Console.error(prefix+'Can\'t set; '+name+' is not a string or number.');
								return false;
							}
							if (typeof data === 'object')
							{
								$Console.error(prefix+'Can\'t set; '+data+' is an object.');
								return false;
							}
							if (expiry && typeof expiry !== 'string' && typeof expiry !== 'number')
							{
								$Console.error(prefix+'Can\'t set; '+expiry+' is not a string or number.');
								return false;
							}
							return true;
						}
						function _removeValidate(name)
						{
							if (typeof name !== 'string' && typeof name !== 'number' && (typeof name === 'object' && !(name instanceof RegExp)))
							{
								$Console.error(prefix+'Can\'t remove; '+name+' is not a string, number, or regular expression.');
								return false;
							}
							return true;
						}
						
						// Test support
						var d = new Date();
						var ls = false;
						try
						{
							if (localStorage && typeof localStorage === 'object' && localStorage !== null)
							{
								try
								{
									localStorage.setItem(d,d);
									ls = localStorage.getItem(d) == d;
									localStorage.removeItem(d);
								}
								catch (e)
								{
									
								}
							}
						}
						catch (e)
						{
							
						}
						var ss = false;
						try
						{
							if (sessionStorage && typeof sessionStorage === 'object' && sessionStorage !== null)
							{
								try
								{
									sessionStorage.setItem(d,d);
									ss = sessionStorage.getItem(d) == d;
									sessionStorage.removeItem(d);
								}
								catch (e) {}
							}
						}
						catch (e) {}
						
						// Storage class
						var stores = {};
						var Storage = function (name, dom)
						{
							if (name === undefined)
							{
								name = 'all';
								dom = window;
							}
							this.name = name;
							this.dom = dom;
							$Console.log(prefix+'Registered '+this.name+' store.');
							return this;
						}
						Storage.prototype.toString = function ()
						{
							return this.name;
						}
						Storage.prototype.valueOf = function ()
						{
							return this.dom;
						}
						Storage.prototype.sync = function ()
						{
							$('form [data-store]').each(function (i,v)
							{
								var $this = $(this);
								var expiry = $(this).attr('data-store-expiry');
								var store = (expiry == 0) ? 'local' : 'all';
								var name = $(this).attr('name');
								var value = $Web.storage(store).get(name);
								var debug =
								{
									name: $(this).attr('name'),
									get: $Web.storage(store).get(name)
								}
								if (value)
								{
									value = (value == 'true') ? true : value;
									value = (value == 'false') ? false : value;
									if ($(this).is('input[type="checkbox"]'))
									{
										$(this).prop('checked', value);
									}
									else if ($(this).is('input[type="radio"]'))
									{
										$(this).filter(':not([value="'+value+'"])').prop('checked', false);
										$(this).filter('[value="'+value+'"]').prop('checked', value);
									}
									else if ($(this).is('select'))
									{
										$(this).children('option:not('+value+')').prop('selected', false);
										$(this).children('option[value="'+value+'"]').prop('selected', true);
									}
									else
									{
										$(this).attr('value', value).val(value);
									}
								}
								else
								{
									if ($(this).is('input[type="checkbox"]'))
									{
										debug.live = $(this).prop('checked');
										$Web.storage(store).set($(this).attr('name'), $(this).prop('checked'), expiry);
										debug.set = $Web.storage(store).get($(this).attr('name'));
									}
									else if ($(this).is('input[type="radio"]'))
									{
										if ($(this).is(':checked'))
										{
											$Web.storage(store).set($(this).attr('name'), $(this).value(), expiry);
										}
									}
									else if ($(this).is('select'))
									{
										if ($(this).children('option').filter(':selected') >= 1)
										{
											$Web.storage(store).set($(this).attr('name'), $(this).children('option').filter(':selected').val(), expiry);
										}
									}
									else
									{
										this.set($(this).attr('name'), $(this).value(), expiry);
									}
								}
								$(this).closest('form').on('reset', function ()
								{
									setTimeout(function ()
									{
										$this.change();
									}, 0);
								});
								$(this).on('change', function (e)
								{
									if ($(this).is('input[type="checkbox"]'))
									{
										debug.live = $(this).prop('checked');
										$Web.storage(store).set($(this).attr('name'), $(this).prop('checked'), expiry);
										debug.set = $Web.storage(store).get($(this).attr('name'));
									}
									else if ($(this).is('input[type="radio"]'))
									{
										if ($(this).is(':checked'))
										{
											$Web.storage(store).set($(this).attr('name'), $(this).value(), expiry);
										}
									}
									else if ($(this).is('select'))
									{
										if ($(this).children('option').filter(':selected') >= 1)
										{
											$Web.storage(store).set($(this).attr('name'), $(this).children('option').filter(':selected').val(), expiry);
										}
									}
									else
									{
										$Web.storage(store).set($(this).attr('name'), $(this).val(), expiry);
									}
								});
							});
						}
						
						// storage function
						var _storage = function (store)
						{
							if (store && !stores[store])
							{
								$Console.error(prefix+store+' is not a supported store.');
								return;
							}
							store = (store && stores[store]) ? stores[store] : stores['all'];
							return store;
						}
						// Check results
						if (ls && ss)
						{
							// Build methods
							Storage.prototype.get = function (name)
							{
								if (typeof name === 'object' && name instanceof RegExp)
								{
									if (stores.cookie && this.name !== undefined && this.name != "" && this.name != stores.all.name && this.name != stores.cookie.name)
									{
										return $Web.storage('cookie').get(name);
									}
									else if (!stores.cookie)
									{
										$Console.error(prefix+'Can\'t get; regular expressions are only supported by the cookie store.');
										return false;
									}
								}
								if (!_getValidate(name))
								{
									return false;
								}
								
								var r;
								if (this.name === undefined || this.name == "" || this.name == stores.all.name || this.name == stores.local.name)
								{
									r = localStorage.getItem(name);
									if (r)
									{
										$Console.log(name+' = '+r+' in '+this.name+' store.');
										return r;
									}
									if (this.name == stores.local.name)
									{
										$Console.log(name+' is not set in '+this.name+' store.');
										return false;
									}
								}
								if (this.name === undefined || this.name == "" || this.name == stores.all.name || this.name == stores.session.name)
								{
									r = sessionStorage.getItem(name);
									if (r)
									{
										$Console.log(name+' = '+r+' in '+this.name+' store.');
										return r;
									}
									if (this.name == stores.session.name)
									{
										$Console.log(name+' is not set in '+this.name+' store.');
										return false;
									}
								}
								r = _getCookie(name);
								if (r)
								{
									$Console.log(name+' = '+r+' in '+this.name+' store.');
									return r;
								}
								if (this.name == stores.cookie.name)
								{
									$Console.log(name+' is not set in '+this.name+' store.');
									return false;
								}
								$Console.log(name+' is not set in any store.');
								return false;
							};
							Storage.prototype.set = function (name,data,expiry)
							{
								if (!_setValidate(name,data,expiry))
								{
									return false;
								}
								
								// #TODO: Provide error responses to mismatches between specified store and specified expiry
								
								if (expiry <= 0)
								{
									$Console.log(name+' set to '+data+' in '+stores.local.name+' store.');
									localStorage.setItem(name,data);
									return true;
								}
								else if (expiry)
								{
									$Console.log(name+' set to '+data+' in '+stores.cookie.name+' store.');
									_setCookie(name,data,expiry);
									return true;
								}
								else
								{
									$Console.log(name+' set to '+data+' in '+stores.session.name+' store.');
									sessionStorage.setItem(name,data);
									return true;
								}
							};
							Storage.prototype.remove = function (name)
							{
								if (typeof name === 'object' && name instanceof RegExp)
								{
									if (stores.cookie && this.name !== undefined && this.name != "" && this.name != stores.all.name && this.name != stores.cookie.name)
									{
										return $Web.storage('cookie').remove(name);
									}
									else if (!stores.cookie)
									{
										$Console.error(prefix+'Can\'t remove; regular expressions are only supported by the cookie store.');
										return false;
									}
								}
								if (!_removeValidate(name))
								{
									return false;
								}
								
								var r;
								if (this.name === undefined || this.name == "" || this.name == stores.all.name || this.name == stores.local.name)
								{
									r = localStorage.getItem(name);
									if (r)
									{
										localStorage.removeItem(name);
										$Console.log(name+' removed from '+stores.local.name+'.');
										r = true;
										if (this.name == stores.local.name)
										{
											return true;
										}
									}
								}
								if ((this.name === undefined || this.name == "" || this.name == stores.all.name || this.name == stores.session.name) && !r)
								{
									r = sessionStorage.getItem(name);
									if (r)
									{
										sessionStorage.removeItem(name);
										$Console.log(name+' removed from '+stores.session.name+'.');
										r = true;
										if (this.name == stores.session.name)
										{
											return true;
										}
									}
								}
								if ((this.name === undefined || this.name == "" || this.name == stores.all.name || this.name == stores.cookie.name) && !r)
								{
									if (this.get(name))
									{
										$Console.log(name+' removed from '+stores.cookie.name+'.');
										_setCookie(name, '', -31536000000); // -1 year
										return true;
									}
								}
								if (r)
								{
									return true;
								}
								$Console.warn(prefix+'Can\'t remove; '+name+' is not set in any store.');
								return false;
							};
							
							// Create storage objects
							stores.all = new Storage();
							stores.local = new Storage('local', localStorage);
							stores.session = new Storage('session', sessionStorage);
							stores.cookie = new Storage('cookie', sessionStorage);
							$Console.debug(prefix+''+stores.local.name+', '+stores.session.name+', and '+stores.cookie.name+' stores supported.');
						}
						else if (ls && !ss)
						{
							// Build methods
							Storage.prototype.get = function (name)
							{
								if (typeof name === 'object' && name instanceof RegExp)
								{
									if (stores.cookie && this.name !== undefined && this.name != "" && this.name != stores.all.name && this.name != stores.cookie.name)
									{
										return $Web.storage('cookie').get(name);
									}
									else if (!stores.cookie)
									{
										$Console.error(prefix+'Can\'t get; regular expressions are only supported by the cookie store.');
										return false;
									}
								}
								if (!_getValidate(name))
								{
									return false;
								}
								
								var r
								if (this.name === undefined || this.name == "" || this.name == stores.all.name || this.name == stores.local.name)
								{
									r = localStorage.getItem(name);
									if (r)
									{
										$Console.log(name+' = '+r+' in '+this.name+' store.');
										return r;
									}
									if (this.name == stores.local.name)
									{
										$Console.log(name+' = '+r+' in '+this.name+' store.');
										return false;
									}
								}
								r = _getCookie(name);
								if (r)
								{
									$Console.log(name+' = '+r+' in '+this.name+' store.');
									return r;
								}
								if (this.name == stores.cookie.name)
								{
									$Console.log(name+' = '+r+' in '+this.name+' store.');
									return false;
								}
								$Console.log(name+' is not set in any store.');
								return false;
							};
							Storage.prototype.set = function (name,data,expiry)
							{
								if (!_setValidate(name,data,expiry))
								{
									return false;
								}
								
								// #TODO: Provide error responses to mismatches between specified store and specified expiry
								
								if (expiry <= 0)
								{
									$Console.log(name+' set to '+data+' in '+stores.local.name+' store.');
									localStorage.setItem(name,data);
									return true;
								}
								else if (expiry)
								{
									$Console.log(name+' set to '+data+' in '+stores.cookie.name+' store.');
									_setCookie(name,data,expiry);
									return true;
								}
								else
								{
									$Console.log(name+' set to '+data+' in '+stores.cookie.name+' store.');
									document.cookie = name+'='+escape(data)+'; path=/';
									return true;
								}
							};
							Storage.prototype.remove = function (name)
							{
								if (typeof name === 'object' && name instanceof RegExp)
								{
									if (stores.cookie && this.name !== undefined && this.name != "" && this.name != stores.all.name && this.name != stores.cookie.name)
									{
										return $Web.storage('cookie').remove(name);
									}
									else if (!stores.cookie)
									{
										$Console.error(prefix+'Can\'t remove; regular expressions are only supported by the cookie store.');
										return false;
									}
								}
								if (!_removeValidate(name))
								{
									return false;
								}
								
								var r;
								if ((this.name === undefined || this.name == "" || this.name == stores.all.name || this.name == stores.local.name) && !r)
								{
									r = localStorage.getItem(name);
									if (r)
									{
										localStorage.removeItem(name);
										$Console.log(name+' removed from '+stores.local.name+'.');
										r = true;
										if (this.name == stores.local.name)
										{
											return true;
										}
									}
								}
								if ((this.name === undefined || this.name == "" || this.name == stores.all.name || this.name == stores.cookie.name) && !r)
								{
									if (this.get(name))
									{
										$Console.log(name+' removed from '+stores.cookie.name+'.');
										_setCookie(name, '', -31536000000); // -1 year
										return true;
									}
								}
								if (r)
								{
									return true;
								}
								$Console.warn(prefix+'Can\'t remove; '+name+' is not set in any store.');
								return false;
							};
							
							// Create storage objects
							stores.all = new Storage();
							stores.local = new Storage('local', localStorage);
							stores.cookie = new Storage('cookie', sessionStorage);
							$Console.debug(prefix+''+stores.local.name+', and '+stores.cookie.name+' stores supported.');
						}
						else if (!ls && ss)
						{
							// Build methods
							Storage.prototype.get =  function (name)
							{
								if (typeof name === 'object' && name instanceof RegExp)
								{
									if (stores.cookie && this.name !== undefined && this.name != "" && this.name != stores.all.name && this.name != stores.cookie.name)
									{
										return $Web.storage('cookie').get(name);
									}
									else if (!stores.cookie)
									{
										$Console.error(prefix+'Can\'t get; regular expressions are only supported by the cookie store.');
										return false;
									}
								}
								if (!_getValidate(name))
								{
									return false;
								}
								
								var r
								if (this.name === undefined || this.name == "" || this.name == stores.all.name || this.name == stores.session.name)
								{
									r = localStorage.getItem(name);
									if (r)
									{
										$Console.log(name+' = '+r+' in '+this.name+' store.');
										return r;
									}
									if (this.name == stores.local.name)
									{
										$Console.log(name+' is not set in '+this.name+' store.');
										return false;
									}
								}
								r = _getCookie(name);
								if (r)
								{
									$Console.log(name+' = '+r+' in '+this.name+' store.');
									return r;
								}
								if (this.name == stores.cookie.name)
								{
									$Console.log(name+' = '+r+' in '+this.name+' store.');
									return false;
								}
								$Console.log(name+' is not set in any store.');
								return false;
							};
							Storage.prototype.set = function (name,data,expiry)
							{
								if (!_setValidate(name,data,expiry))
								{
									return false;
								}
								
								if (expiry <= 0)
								{
									expiry = 31536000000; // +1 year
								}
								if (expiry)
								{
									$Console.log(name+' set to '+data+' in '+stores.cookie.name+' store.');
									_setCookie(name,data,expiry);
									return true;
								}
								else
								{
									$Console.log(name+' set to '+data+' in '+stores.session.name+' store.');
									sessionStorage.setItem(name,data);
									return true;
								}
							};
							Storage.prototype.remove = function (name)
							{
								if (typeof name === 'object' && name instanceof RegExp)
								{
									if (stores.cookie && this.name !== undefined && this.name != "" && this.name != stores.all.name && this.name != stores.cookie.name)
									{
										return $Web.storage('cookie').remove(name);
									}
									else if (!stores.cookie)
									{
										$Console.error(prefix+'Can\'t remove; regular expressions are only supported by the cookie store.');
										return false;
									}
								}
								if (!_removeValidate(name))
								{
									return false;
								}
								
								var r;
								if ((this.name === undefined || this.name == "" || this.name == stores.all.name || this.name == stores.session.name) && !r)
								{
									r = sessionStorage.getItem(name);
									if (r)
									{
										sessionStorage.removeItem(name);
										$Console.log(name+' removed from '+stores.session.name+'.');
										r = true;
										if (this.name == stores.session.name)
										{
											return true;
										}
									}
								}
								if ((this.name === undefined || this.name == "" || this.name == stores.all.name || this.name == stores.cookie.name) && !r)
								{
									if (this.get(name))
									{
										$Console.log(name+' removed from '+stores.cookie.name+'.');
										_setCookie(name, '', -31536000000); // -1 year
										return true;
									}
								}
								if (r)
								{
									return true;
								}
								$Console.warn(prefix+'Can\'t remove; '+name+' is not set in any store.');
								return false;
							};
							
							// Create storage objects
							stores.all = new Storage();
							stores.session = new Storage('session', sessionStorage);
							stores.cookie = new Storage('cookie', sessionStorage);
							$Console.debug(prefix+''+stores.session.name+', and '+stores.cookie.name+' stores supported.');
						}
						else
						{
							// Build methods
							Storage.prototype.get = function (name)
							{
								if (typeof name === 'object' && name instanceof RegExp)
								{
									if (stores.cookie && this.name !== undefined && this.name != "" && this.name != stores.all.name && this.name != stores.cookie.name)
									{
										return $Web.storage('cookie').get(name);
									}
									else if (!stores.cookie)
									{
										$Console.error(prefix+'Can\'t get; regular expressions are only supported by the cookie store.');
										return false;
									}
								}
								if (!_getValidate(name))
								{
									return false;
								}
								
								r = _getCookie(name);
								if (r)
								{
									$Console.log(name+' = '+r+' in '+this.name+' store.');
									return r;
								}
								if (this.name == stores.cookie.name)
								{
									$Console.log(name+' is not set in '+this.name+' store.');
									return false;
								}
								$Console.log('Storage: '+name+' is not set.');
							};
							Storage.prototype.set = function (name,data,expiry)
							{
								if (!_setValidate(name,data,expiry))
								{
									return false;
								}
								
								if (expiry <= 0)
								{
									expiry = 31536000000; // +1 year
								}
								if (expiry)
								{
									$Console.log(name+' set to '+data+' in '+stores.cookie.name+' store.');
									_setCookie(name,data,expiry);
									return true;
								}
								else
								{
									$Console.log(name+' set to '+data+' in '+stores.cookie.name+' store.');
									document.cookie = name+'='+escape(data)+'; path=/';
									return true;
								}
							};
							Storage.prototype.remove = function (name,store)
							{
								if (typeof name === 'object' && name instanceof RegExp)
								{
									if (stores.cookie && this.name !== undefined && this.name != "" && this.name != stores.all.name && this.name != stores.cookie.name)
									{
										return $Web.storage('cookie').remove(name);
									}
									else if (!stores.cookie)
									{
										$Console.error(prefix+'Can\'t remove; regular expressions are only supported by the cookie store.');
										return false;
									}
								}
								if (!_removeValidate(name,store))
								{
									return false;
								}
								
								var r;
								if (r = this.get(name))
								{
									$Console.log(name+' removed from '+stores.cookie.name+'.');
									_setCookie(name, '', -31536000000); // -1 year
									return true;
								}
								$Console.warn(prefix+'Can\'t remove; '+name+' is not set in any store.');
								return false;
							};
							
							// Create storage objects
							stores.all = new Storage();
							stores.cookie = new Storage('cookie', sessionStorage);
							$Console.debug(prefix+'Only '+stores.cookie.name+' store supported.');
						}
						
						$Web.extend(	// Extend $Web
						{
							// $Web.storage(type) - Get storage object
							storage: _storage
						}).extend('store', function (c)	// Add store class
						{
							c = Storage;
							return c;
						}).extend(function (c)	// Extend $Web.storage
						{
							// $Web.storage.get(item)			- Get storage item from any store
							c.prototype.storage.get = stores['all'].get;
							// $Web.storage.set(item, value)	- Set storage item to any store
							c.prototype.storage.set = stores['all'].set;
							// $Web.storage.remove(item)		- Remove storage item from any store
							c.prototype.storage.remove = stores['all'].remove;
							// $Web.storage.sync(element)		- Sync input with storage item in any store
							c.prototype.storage.sync = stores['all'].sync;
							/*
							// $Web.storage.sync(element)		- Sync input with storage item in any store (???)
							c.storage.sync = Storage.prototype.sync;
							*/
							return c;
						}).supports(
						{
							localStorage:	ls,
							sessionStorage:	ss,
							cookieStorage:	true
						});
					})(jQuery);
					
					m.done();
					$Console.group(m.name, 'info', 'color: #393;').info('Version '+m.version+'.').info(m.description).log('Readied in '+$Console.time(m.name)+'.').debug(m).send();
				}
			};
			$Module.get('jQuery').onready(readyCallback);	// Wait for jQuery to be ready
			$Module.get('Web').onready(readyCallback);		// Wait for Web to be ready
		}
	});
})();