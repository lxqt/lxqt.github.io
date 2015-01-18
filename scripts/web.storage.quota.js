// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name web.storage.quota.compiled.js
// ==/ClosureCompiler==

(function ()
{
	// Register module
	$Module.add(
	{
		name: 'Web.Storage.Quota',
		src: 'web.storage.quota.js',
		version: '0.1',
		description: 'Provides a universal quota management API for the different storage types.',
		dependencies:
		[
			{
				name: 'jQuery',
				src: 'jquery.js'
			},
			{
				name: 'Web',
				src: 'web.js'
			},
			{
				name: 'Web.Storage',
				src: 'web.stroage.js'
			}
		],
		styles: [],
		callback: function (dependency)
		{
			var m = this;
			
			var waitingFor = [ 'jQuery', 'Web', 'Web.Storage' ];	// Modules that we must wait for
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
						
						if ('storageQuota' in navigator || 'webkitStorageQuota' in navigator || 'persistentStorage' in navigator || 'webkitPersistentStorage' in navigator)
						{
							var _storageQuota;
							if ('storageQuota' in navigator)
							{
								$Console.debug(prefix+'2013 Quota Management API supported.');
								_storageQuota = function (type)
								{
									return navigator.storageQuota;
								};
							}
							else if ('webkitStorageQuota' in navigator)
							{
								$Console.debug(prefix+'(Webkit) 2013 Quota Management API supported.');
								_storageQuota = function (type)
								{
									return navigator.webkitStorageQuota;
								};
							}
							else if ('persistentStorage' in navigator)
							{
								$Console.debug(prefix+'2012 Quota Management API supported.');
								_storageQuota = function (type)
								{
									if (type == 'persistent')
									{
										return navigator.persistentStorage;
									}
									return navigator.temporaryStorage;
								};
							}
							else if ('webkitPersistentStorage' in navigator)
							{
								$Console.debug(prefix+'(Webkit) 2012 Quota Management API supported.');
								_storageQuota = function (type)
								{
									if (type == 'persistent')
									{
										return navigator.webkitPersistentStorage;
									}
									return navigator.webkitTemporaryStorage;
								};
							}
						}
						try
						{
							var _fulfilled = new Promise(function (resolve, reject)
							{
								resolve();
							});
							var _rejected = new Promise(function (resolve, reject)
							{
								reject();
							});
						}
						catch (err)
						{
							// Native promises not supported, so retrofit with $.Deferred()
							var d = $.Deferred();
							var _fulfilled = function (storageInfo)
							{
								d.resolve(storageInfo);
							};
							var _rejected = function (storageInfo)
							{
								d.reject(storageInfo);
							};
						}
						var quota = function (size)
						{
							var type;
							switch (this.name)
							{
								case 'cache':
								case 'local':	// Should be made persistent
								case 'session':
								case 'cookie':
									type = 'temporary';
									break;
								case 'file':
								case 'appcache':	// Currently unsupported
								case 'database':	// Currently unsupported
								default:
									type = 'persistent';
							}
							var q = _storageQuota(type);
							var r;
							if ('queryInfo' in q)
							{
								// 2013 API
								r = q.queryInfo(type).then(function (storageInfo)
								{
									$Console.log(prefix+'Quota usage is '+storageInfo.usage+'/'+storageInfo.quota+'.');
									if (size)
									{
										var available = (storageInfo.quota - size);
										if (available >= size)
										{
											$Console.log(prefix+'Reqiured '+type+' storage space already available ('+available+':'+size+').');
											return _fullfilled(storageInfo);
										}
										$Console.log(prefix+'Not enough '+type+' storage space available ('+available+':'+size+').');
										if (type == 'persistent')
										{
											$Console.log(prefix+'Requesting new quota ('+(size + storageInfo.usage)+').');
											return q.requestPersistentQuota((size + storageInfo.usage)).then(function (storageInfo)
											{
												if (storageInfo.quota >= (size + storageInfo.usage))
												{
													$Console.debug(prefix+'Request for new persistent storage quota granted. Received '+storageInfo.quota+'.');
												}
												else
												{
													$Console.debug(prefix+'Request for new persistent storage quota rejected. Received '+storageInfo.quota+' instead.');
												}
												return _fullfilled(storageInfo);
											}, function (error)
											{
												$Console.debug(prefix+'Request for new persistent storage quota rejected.');
												return _rejected(storageInfo);
											});
										}
									}
									return _fullfilled(storageInfo);
								});
							}
							else if ('queryUsageAndQuota' in q[type+'Storage'])
							{
								// 2012 API
								r = q[type+'Storage'].queryUsageAndQuota(function (usage, quota)
								{
									var storageInfo = { usage: usage, quota: quota };
									$Console.log(prefix+'Quota usage is '+storageInfo.usage+'/'+storageInfo.quota+'.');
									if (size)
									{
										var available = (storageInfo.quota - size);
										if (available >= size)
										{
											$Console.log(prefix+'Reqiured '+type+' storage space already available ('+available+':'+size+').');
											return _fullfilled(storageInfo);
										}
										$Console.log(prefix+'Not enough '+type+' storage space available ('+available+':'+size+').');
										if (type == 'persistent')
										{
											return q[type+'Storage'].requestQuota((size + storageInfo.usage), function (newQuota)
											{
												storageInfo.quota = newQuota;
												if (storageInfo.quota >= (size + storageInfo.usage))
												{
													$Console.debug(prefix+'Request for new persistent storage quota granted. Received '+storageInfo.quota+'.');
												}
												else
												{
													$Console.debug(prefix+'Request for new persistent storage quota rejected. Received '+storageInfo.quota+' instead.');
												}
												return _fullfilled(storageInfo);
											}, function (error)
											{
												$Console.debug(prefix+'Request for new persistent storage quota rejected.');
												return _rejected(storageInfo);
											});
										}
									}
									return _fullfilled(storageInfo);
								});
							}
							return r;	// Return promise
						};
						
						//$Console.debug($Web.extend('store'));
						$Web.extend('store', function (c)	// Extend store class
						{
							c.quota = quota;
							return c;
						});
					})(jQuery);
					
					m.done();
					$Console.group(m.name, 'info', 'color: #393;').info('Version '+m.version+'.').info(m.description).log('Readied in '+$Console.time(m.name)+'.').debug(m).send();
				}
			};
			$Module.get('jQuery').onready(readyCallback);	// Wait for jQuery to be ready
			$Module.get('Web').onready(readyCallback);		// Wait for Web to be ready
			$Module.get('Web.Storage').onready(readyCallback);	// Wait for Web.Storage to be ready
		}
	});
})();