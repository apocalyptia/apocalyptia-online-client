import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_store, c as component_subscribe, a as validate_slots, o as onMount, b as authUserStore, e as confirm, g as globals, f as element, h as space, q as query_selector_all, j as claim_element, k as children, l as detach_dev, m as claim_space, n as attr_dev, p as add_location, r as append_dev, t as insert_dev, u as noop } from './client.ac32a3b6.js';

/* src/routes/index.svelte generated by Svelte v3.29.0 */

const { console: console_1 } = globals;
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
			add_location(script, file, 21, 1, 540);
			attr_dev(div0, "data-netlify-identity-menu", "");
			add_location(div0, file, 24, 0, 685);
			attr_dev(div1, "class", "cntr-card");
			add_location(div1, file, 23, 0, 661);
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
	let $authUserStore;
	validate_store(authUserStore, "authUserStore");
	component_subscribe($$self, authUserStore, $$value => $$invalidate(0, $authUserStore = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Routes", slots, []);
	console.log($authUserStore);

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
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Routes> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({
		onMount,
		authUserStore,
		confirm,
		$authUserStore
	});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguOGY5NWNmMzUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvaW5kZXguc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQ+XG4gICAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gJ3N2ZWx0ZSdcbiAgICBpbXBvcnQgeyBhdXRoVXNlclN0b3JlLCBjb25maXJtIH0gZnJvbSAnc3RvcmVzL25ldGxpZnlTdG9yZS5qcydcblxuICAgIGNvbnNvbGUubG9nKCRhdXRoVXNlclN0b3JlKVxuXG4gICAgb25Nb3VudChfID0+IHtcbiAgICAgICAgY29uc3QgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cigxKVxuICAgICAgICBjb25zdCByZXN1bHQgPSBoYXNoLnNwbGl0KGAmYCkucmVkdWNlKChyZXN1bHQsIGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gaXRlbS5zcGxpdChgPWApXG4gICAgICAgICAgICByZXN1bHRbcGFydHNbMF1dID0gcGFydHNbMV1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgfSwge30pXG4gICAgICAgIGlmIChyZXN1bHQuY29uZmlybWF0aW9uX3Rva2VuKSB7XG4gICAgICAgICAgICBjb25maXJtKHJlc3VsdC5jb25maXJtYXRpb25fdG9rZW4pXG4gICAgICAgIH1cbiAgICB9KVxuPC9zY3JpcHQ+XG5cblxuPHN2ZWx0ZTpoZWFkPlxuXHQ8c2NyaXB0IHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIiBzcmM9XCJodHRwczovL2lkZW50aXR5Lm5ldGxpZnkuY29tL3YxL25ldGxpZnktaWRlbnRpdHktd2lkZ2V0LmpzXCI+PC9zY3JpcHQ+XG48L3N2ZWx0ZTpoZWFkPlxuPGRpdiBjbGFzcz0nY250ci1jYXJkJz5cbjxkaXYgZGF0YS1uZXRsaWZ5LWlkZW50aXR5LW1lbnU+PC9kaXY+XG5cdDwhLS0geyNpZiAkYXV0aFVzZXJTdG9yZX1cblx0XHQ8cD5Mb2dnZWQgaW4gYXMgeyRhdXRoVXNlclN0b3JlLmVtYWlsfTwvcD5cblx0XHQ8YSBocmVmPScvY2hhcmFjdGVyJyBjbGFzcz0nbGluay1idG4nPkNoYXJhY3RlcjwvYT5cblx0XHQ8YSBocmVmPScvbWFudWFsJyBjbGFzcz0nbGluay1idG4nPk1hbnVhbDwvYT5cblx0XHQ8YSBocmVmPScvZ2VuZXJhdG9yJyBjbGFzcz0nbGluay1idG4nPkdlbmVyYXRvcjwvYT5cblx0ezplbHNlfVxuXHRcdDxhIGhyZWY9Jy9sb2dpbicgY2xhc3M9J2xpbmstYnRuJz5Mb2dpbjwvYT5cblx0XHQ8YSBocmVmPScvc2lnbnVwJyBjbGFzcz0nbGluay1idG4nPlNpZ24gVXA8L2E+XG5cdHsvaWZ9IC0tPlxuPC9kaXY+Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQUlJLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYzs7Q0FFMUIsT0FBTyxDQUFDLENBQUM7UUFDQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O1FBQ3BDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxNQUFNLE1BQU07SUFBRSxNQUFNLEVBQUUsSUFBSTtVQUN6QyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUs7SUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUM7V0FDbkIsTUFBTTs7Ozs7TUFFYixNQUFNLENBQUMsa0JBQWtCO0dBQ3pCLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQWtCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
