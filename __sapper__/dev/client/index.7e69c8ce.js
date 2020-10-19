import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, o as onMount, a as authUserStore, c as confirm, e as element, b as space, q as query_selector_all, f as claim_element, g as children, h as detach_dev, j as claim_space, k as attr_dev, l as add_location, m as append_dev, n as insert_dev, p as noop } from './client.bca5f36b.js';

/* src/routes/index.svelte generated by Svelte v3.29.0 */
const file = "src/routes/index.svelte";

function create_fragment(ctx) {
	let script;
	let script_src_value;
	let t;
	let div1;
	let div0;

	const block = {
		c: function create() {
			script = element("script");
			t = space();
			div1 = element("div");
			div0 = element("div");
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-byag4n\"]", document.head);
			script = claim_element(head_nodes, "SCRIPT", { type: true, src: true });
			var script_nodes = children(script);
			script_nodes.forEach(detach_dev);
			head_nodes.forEach(detach_dev);
			t = claim_space(nodes);
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { "data-netlify-identity-menu": true });
			children(div0).forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(script, "type", "text/javascript");
			if (script.src !== (script_src_value = "https://identity.netlify.com/v1/netlify-identity-widget.js")) attr_dev(script, "src", script_src_value);
			add_location(script, file, 19, 1, 507);
			attr_dev(div0, "data-netlify-identity-menu", "");
			add_location(div0, file, 22, 0, 652);
			attr_dev(div1, "class", "cntr-card");
			add_location(div1, file, 21, 0, 628);
		},
		m: function mount(target, anchor) {
			append_dev(document.head, script);
			insert_dev(target, t, anchor);
			insert_dev(target, div1, anchor);
			append_dev(div1, div0);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			detach_dev(script);
			if (detaching) detach_dev(t);
			if (detaching) detach_dev(div1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Routes", slots, []);

	onMount(_ => {
		const hash = window.location.hash.substr(1);

		const result = hash.split(`&`).reduce(
			(result, item) => {
				const parts = item.split(`=`);
				result[parts[0]] = parts[1];
				return result;
			},
			{}
		);

		if (result.confirmation_token) {
			confirm(result.confirmation_token);
		}
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Routes> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ onMount, authUserStore, confirm });
	return [];
}

class Routes extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Routes",
			options,
			id: create_fragment.name
		});
	}
}

export default Routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguN2U2OWM4Y2UuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvaW5kZXguc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQ+XG4gICAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gJ3N2ZWx0ZSdcbiAgICBpbXBvcnQgeyBhdXRoVXNlclN0b3JlLCBjb25maXJtIH0gZnJvbSAnc3RvcmVzL25ldGxpZnlTdG9yZS5qcydcblxuICAgIG9uTW91bnQoXyA9PiB7XG4gICAgICAgIGNvbnN0IGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHIoMSlcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gaGFzaC5zcGxpdChgJmApLnJlZHVjZSgocmVzdWx0LCBpdGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXJ0cyA9IGl0ZW0uc3BsaXQoYD1gKVxuICAgICAgICAgICAgcmVzdWx0W3BhcnRzWzBdXSA9IHBhcnRzWzFdXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgIH0sIHt9KVxuICAgICAgICBpZiAocmVzdWx0LmNvbmZpcm1hdGlvbl90b2tlbikge1xuICAgICAgICAgICAgY29uZmlybShyZXN1bHQuY29uZmlybWF0aW9uX3Rva2VuKVxuICAgICAgICB9XG4gICAgfSlcbjwvc2NyaXB0PlxuXG5cbjxzdmVsdGU6aGVhZD5cblx0PHNjcmlwdCB0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCIgc3JjPVwiaHR0cHM6Ly9pZGVudGl0eS5uZXRsaWZ5LmNvbS92MS9uZXRsaWZ5LWlkZW50aXR5LXdpZGdldC5qc1wiPjwvc2NyaXB0PlxuPC9zdmVsdGU6aGVhZD5cbjxkaXYgY2xhc3M9J2NudHItY2FyZCc+XG48ZGl2IGRhdGEtbmV0bGlmeS1pZGVudGl0eS1tZW51PjwvZGl2PlxuXHQ8IS0tIHsjaWYgJGF1dGhVc2VyU3RvcmV9XG5cdFx0PHA+TG9nZ2VkIGluIGFzIHskYXV0aFVzZXJTdG9yZS5lbWFpbH08L3A+XG5cdFx0PGEgaHJlZj0nL2NoYXJhY3RlcicgY2xhc3M9J2xpbmstYnRuJz5DaGFyYWN0ZXI8L2E+XG5cdFx0PGEgaHJlZj0nL21hbnVhbCcgY2xhc3M9J2xpbmstYnRuJz5NYW51YWw8L2E+XG5cdFx0PGEgaHJlZj0nL2dlbmVyYXRvcicgY2xhc3M9J2xpbmstYnRuJz5HZW5lcmF0b3I8L2E+XG5cdHs6ZWxzZX1cblx0XHQ8YSBocmVmPScvbG9naW4nIGNsYXNzPSdsaW5rLWJ0bic+TG9naW48L2E+XG5cdFx0PGEgaHJlZj0nL3NpZ251cCcgY2xhc3M9J2xpbmstYnRuJz5TaWduIFVwPC9hPlxuXHR7L2lmfSAtLT5cbjwvZGl2PiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQUlJLE9BQU8sQ0FBQyxDQUFDO1FBQ0MsSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztRQUNwQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssTUFBTSxNQUFNO0lBQUUsTUFBTSxFQUFFLElBQUk7VUFDekMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLO0lBQ3hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDO1dBQ25CLE1BQU07Ozs7O01BRWIsTUFBTSxDQUFDLGtCQUFrQjtHQUN6QixPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFrQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
