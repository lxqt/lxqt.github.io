(function () {
	var e = $Module.add({
		name: "Web",
		src: "web.js",
		version: "1.1",
		description: "Common functions and behaviours for the web.",
		dependencies: [{
			name: "Base",
			src: "base.js"
		}, {
			name: "jQuery",
			src: "jquery.js"
		}],
		styles: ["web.scss"],
		callback: function (e) {
			var t = this;
			$Console.log(t.name + ": Initialising (" + $Console.time(t.name) + ")...");
			$Module.get("Base").onready(function () {
				$Console.log(t.name + ": " + this.name + " ready state recieved.");
				(function (e) {
					var t = function (e) {
						if (e) {
							switch (e) {
							case "active":
								e = "inert";
								break;
							case "inert":
								e = "active";
								break;
							default:
								e = ""
							}
							return e
						}
						return false
					};
					e.fn.state = function (t) {
						return this.each(function () {
							if (this) {
								if (typeof t == "undefined") {
									$Console.log("State: return.");
									return e(this).attr("data-state")
								} else {
									switch (t) {
									case "active":
										e(this).attr("data-state", "active");
										$Console.log("State: set to active.");
										break;
									case "inert":
										e(this).attr("data-state", "inert");
										$Console.log("State: set to inert.");
										break;
									case "":
										e(this).attr("data-state", "");
										$Console.log("State: set to null.");
										break;
									case false:
										e(this).removeAttr("data-state");
										$Console.log("State: removed.");
										break;
									default:
									}
								}
							}
							return this
						})
					};
					e.fn.stateToggle = function () {
						return this.each(function () {
							if (this) {
								e(this).attr("data-state", t(e(this).attr("data-state")));
								$Console.log("State: toggled.")
							}
							return this
						})
					}
				})(jQuery);
				(function (e) {
					e.fn.notify = function (t) {
						t = t === false ? false : true;
						return this.each(function () {
							if (this) {
								if (t) {
									e(this).state("active");
									$Console.log("Notification: Presented.")
								} else {
									e(this).state("inert");
									$Console.log("Notification: Dismissed.")
								}
							}
							return this
						})
					}
				})(jQuery);
				(function (e) {
					e.fn.modal = function (t) {
						t = t === false ? false : true;
						return this.each(function (t) {
							if (this) {
								if (t) {
									e(this).state("active");
									$Console.log("Modal: Presented.")
								} else {
									e(this).state("inert");
									$Console.log("Modal: Dismissed.")
								}
							}
							return this
						})
					}
				})(jQuery);
				$Console.log(t.name + ": Initialised (" + $Console.time(t.name) + ").");
				t.done();
				$Console.group(t.name, "info", "color: #393;").info("Version " + t.version + ".", "color: #333;").info(t.description, "color: #333;").log("Readied in " + $Console.time(t.name) + ".", "color: #333;").debug(t).send()
			})
		}
	})
})()
