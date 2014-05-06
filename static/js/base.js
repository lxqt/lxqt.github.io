(function () {
	$Module.add({
		name: "Base",
		src: "base.js",
		version: "1.1",
		description: "Common functions and behaviours to everything.",
		dependencies: [{
			name: "jQuery",
			src: "jquery.js"
		}],
		styles: ["base.scss"],
		callback: function (e) {
			var t = this;
			$Console.log(t.name + ": Initialising (" + $Console.time(t.name) + ")...");
			var n = function (e, r, i, s) {
				var o = $Console.group(t.name + ": Context", "log");
				if (r.is(i)) {
					o.log("Done.").send();
					return r
				}
				switch (s) {
				case "out":
					var u = o.group("Out:", "log");
					e.find('[data-context="0"], [data-context="-1"]').each(function () {
						$con2.debug($(this));
						if (!$(this).is(r.parents()) && !$(this).is(i)) {
							u.log("Old context.");
							$(this).attr("data-context", "")
						} else if ($(this).is(r.parents()) && $(this).is('[data-context="-1"]')) {
							u.log("Old context converted to new.");
							$(this).attr("data-context", "0")
						} else {
							u.log("New context.")
						}
					});
					u.log("Done.").send();
					break;
				default:
					var u = o.group("In:", "log");
					var a = e.parent().closest("[data-context]").first();
					if (e.is("body")) {
						u.debug(e);
						u.log("Is body.");
						return n(e, r, i, "out")
					}
					if (a.length == 1) {
						u.debug(a);
						if (a.is('[data-context="0"]')) {
							u.log("Is mutual parent.");
							a.attr("data-context", 0);
							return n(a, r, i, "out")
						}
						a.attr("data-context", 0);
						return n(a, r, i, "in")
					}
					u.log("Done.").send()
				}
				return r
			};
			var r = {};
			r.state = function (e, t) {
				t = t ? t : "";
				var n = t ? "-" + t : "";
				var i = $(e);
				var s = i.attr("data-action" + n).replace("state.", "");
				var o = t == "self" ? i : i.attr("data-action-target") ? $(i.attr("data-action-target")) : i;
				var u;
				switch (s) {
				case "toggle":
					u = function () {
						return state.toggle(o)
					};
					break;
				default:
					u = function () {
						i.attr("data-action" + n, "state." + i.attr("data-state"));
						o.attr("data-state", s);
						i.off("click.base_action" + n + "_state-" + s);
						r.state(e, t);
						return o.attr("data-state")
					}
				}
				i.on("click.base.base_action" + t + ".base_action" + n + "_state-" + s, function (e) {
					e.preventDefault();
					return u()
				})
			};
			r.context = function (e, t) {
				t = t ? t : "";
				var r = t ? "-" + t : "";
				var i = $(e);
				var s = i.attr("data-action" + t).replace("context.", "");
				switch (s) {
				case "top":
					var o = function () {
						return $("body")
					};
					break;
				case "up":
					var o = function () {
						var e = $('[data-context="1"]').parent().closest("[data-context]");
						if (e.length < 1) {
							e = $("body")
						}
						return e
					};
					break;
				case "prev":
					var o = function () {
						return $('[data-context="1"]').prevAll("[data-context]").first()
					};
					break;
				case "next":
					var o = function () {
						return $('[data-context="1"]').nextAll("[data-context]").first()
					};
					break;
				default:
					var o = function () {
						return t == "self" ? i : i.attr("data-action-target") ? $(i.attr("data-action-target")) : i.attr("href") ? $(i.attr("href")) : ""
					}
				}
				var u = $('[data-context="1"]');
				i.on("click.base.base_action" + t + ".base_action" + r + "_state-" + s, function (e) {
					e.preventDefault();
					var t = o();
					var r = $('[data-context="1"]').attr("data-context", -1);
					t.attr("data-context", 1);
					$Console.debug(t);
					$("body").trigger("contextchange");
					return n(t, t, r)
				})
			};
			$("[data-action]").on("click.base.base_action.base_action_link", function (e) {
				if (!$(this).is('[data-action="link"]') && $(this).is("a")) {
					e.preventDefault()
				}
			});
			$('[data-action^="state."]').each(function (e) {
				r.state(this)
			});
			$('[data-action-self^="state."]').each(function (e) {
				r.state(this, "self")
			});
			$('[data-action^="context."]').each(function (e) {
				r.context(this)
			});
			$('[data-action-self^="context."]').each(function (e) {
				r.context(this, "self")
			});
			$('label[for][data-action^="value."]').on("click.base.base_action.base_action_value", function (e) {
				$($(this).attr("for")).val($(this).attr("data-action").replace("value.", ""))
			});
			$("[data-animation-state]").on("webkitAnimationEnd.base.base_animation-state animationend.base.base_animation-state", function (e) {
				if (e.target == this) {
					$(this).attr("data-animation-state", "complete")
				}
			});
			$("body").on("contextchange", function (e) {
				var t = $('[data-context="1"]');
				return
			});
			$Console.log(t.name + ": Initialised (" + $Console.time(t.name) + ").");
			t.done();
			$Console.group(t.name, "info", "color: #393;").info("Version " + t.version + ".", "color: #333;").info(t.description, "color: #333;").log("Readied in " + $Console.time(t.name) + ".", "color: #333;").debug(t).send()
		}
	})
})()
