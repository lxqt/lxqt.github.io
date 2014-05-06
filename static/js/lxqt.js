(function () {
	var e = $Module.add({
		name: "LXQt",
		src: "lxqt.js",
		version: "1.0",
		description: "Common functions and behaviours for LXQt.",
		dependencies: [{
			name: "Base",
			src: "base.js"
		}, {
			name: "Web",
			src: "web.js"
		}, {
			name: "jQuery",
			src: "jquery.js"
		}],
		styles: ["lxqt.scss"],
		callback: function (e) {
			var t = this;
			$Console.log(t.name + ": Initialising (" + $Console.time(t.name) + ")...");
			var n = ["Base", "Web"];
			var r = function () {
				$Console.log(t.name + ": " + this.name + " ready state recieved.");
				if (n.indexOf(this.name) >= 0) {
					n.splice(n.indexOf(this.name), 1);
				}
				if (n.length == 0 && !t.initialised) {
					$Console.log(t.name + ": Initialised (" + $Console.time(t.name) + ").");
					t.done();
					$Console.group(t.name, "info", "color: #393;").info("Version " + t.version + ".", "color: #333;").info(t.description, "color: #333;").log("Readied in " + $Console.time(t.name) + ".", "color: #333;").debug(t).send()
				}
			};
			$Module.get("Base").onready(r);
			$Module.get("Web").onready(r);
		}
	})
})()
