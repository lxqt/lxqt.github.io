// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name lxqt.compiled.js
// ==/ClosureCompiler==

(function ()
{
	// Register module
	var module = $Module.add(
	{
		name: 'LXQt',
		src: 'lxqt.js',
		version: '2.0',
		description: 'Common functions and behaviours for LXQt.',
		dependencies:
		[
			{
				name: 'jQuery',
				src: 'jquery.js'
			},
			{
				name: 'Web',
				src: 'web.js'
			},/*
			{
				name: 'Web.Input',
				src: 'web.input.js'
			},*/
			{
				name: 'Web.Storage',
				src: 'web.storage.js'
			},
			{
				name: 'Web.Storage.Quota',
				src: 'web.storage.quota.js'
			}
		],
		styles:
		[
			'lxqt.scss'
		],
		callback: function (dependency)
		{
			var m = this
			
			var waitingFor = [ 'jQuery', 'Web', /*'Web.Input',*/ 'Web.Storage', 'Web.Storage.Quota' ];
			var readyCallback = function ()
			{
				$Console.log(m.name+': '+this.name+' ready state recieved.');
				if (waitingFor.indexOf(this.name) >= 0)
				{
					waitingFor.splice(waitingFor.indexOf(this.name),1);
				}
				if (waitingFor.length == 0 && !m.initialised)
				{
					$Console.log(m.name+': Initialising ('+$Console.time(m.name)+')...');
					
					// Do stuff
					$Web(	// Register website
					{
						name:			'LXQt',
						label:			'LXQt',
						icon:			'/images/lxqt-icon-32.png'
					});
					
					m.done();
					$Console.group(m.name, 'info', 'color: #393;').info('Version '+m.version+'.').info(m.description).log('Readied in '+$Console.time(m.name)+'.').debug(m).send();
				}
			}
			$Module.get('jQuery').onready(readyCallback);
			$Module.get('Web').onready(readyCallback);
			//$Module.get('Web.Input').onready(readyCallback);
			$Module.get('Web.Storage').onready(readyCallback);
			$Module.get('Web.Storage.Quota').onready(readyCallback);
		}
	});
})();