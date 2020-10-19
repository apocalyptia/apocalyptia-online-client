import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_store, c as component_subscribe, a as validate_slots, o as onMount, b as authUserStore, e as confirm, g as globals, f as element, h as claim_element, j as children, k as detach_dev, l as attr_dev, m as add_location, n as insert_dev, p as noop, t as text, q as space, r as claim_text, u as claim_space, w as append_dev, x as set_data_dev } from './client.132f4c13.js';

/* src/routes/index.svelte generated by Svelte v3.29.0 */

const { console: console_1 } = globals;
const file = "src/routes/index.svelte";

// (27:1) {:else}
function create_else_block(ctx) {
	let a0;
	let t0;
	let t1;
	let a1;
	let t2;

	const block = {
		c: function create() {
			a0 = element("a");
			t0 = text("Login");
			t1 = space();
			a1 = element("a");
			t2 = text("Sign Up");
			this.h();
		},
		l: function claim(nodes) {
			a0 = claim_element(nodes, "A", { href: true, class: true });
			var a0_nodes = children(a0);
			t0 = claim_text(a0_nodes, "Login");
			a0_nodes.forEach(detach_dev);
			t1 = claim_space(nodes);
			a1 = claim_element(nodes, "A", { href: true, class: true });
			var a1_nodes = children(a1);
			t2 = claim_text(a1_nodes, "Sign Up");
			a1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(a0, "href", "/login");
			attr_dev(a0, "class", "link-btn");
			add_location(a0, file, 27, 2, 783);
			attr_dev(a1, "href", "/signup");
			attr_dev(a1, "class", "link-btn");
			add_location(a1, file, 28, 2, 829);
		},
		m: function mount(target, anchor) {
			insert_dev(target, a0, anchor);
			append_dev(a0, t0);
			insert_dev(target, t1, anchor);
			insert_dev(target, a1, anchor);
			append_dev(a1, t2);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(a0);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(a1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(27:1) {:else}",
		ctx
	});

	return block;
}

// (22:1) {#if $authUserStore}
function create_if_block(ctx) {
	let p;
	let t0;
	let t1_value = /*$authUserStore*/ ctx[0].email + "";
	let t1;
	let t2;
	let a0;
	let t3;
	let t4;
	let a1;
	let t5;
	let t6;
	let a2;
	let t7;

	const block = {
		c: function create() {
			p = element("p");
			t0 = text("Logged in as ");
			t1 = text(t1_value);
			t2 = space();
			a0 = element("a");
			t3 = text("Character");
			t4 = space();
			a1 = element("a");
			t5 = text("Manual");
			t6 = space();
			a2 = element("a");
			t7 = text("Generator");
			this.h();
		},
		l: function claim(nodes) {
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			t0 = claim_text(p_nodes, "Logged in as ");
			t1 = claim_text(p_nodes, t1_value);
			p_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			a0 = claim_element(nodes, "A", { href: true, class: true });
			var a0_nodes = children(a0);
			t3 = claim_text(a0_nodes, "Character");
			a0_nodes.forEach(detach_dev);
			t4 = claim_space(nodes);
			a1 = claim_element(nodes, "A", { href: true, class: true });
			var a1_nodes = children(a1);
			t5 = claim_text(a1_nodes, "Manual");
			a1_nodes.forEach(detach_dev);
			t6 = claim_space(nodes);
			a2 = claim_element(nodes, "A", { href: true, class: true });
			var a2_nodes = children(a2);
			t7 = claim_text(a2_nodes, "Generator");
			a2_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(p, file, 22, 2, 573);
			attr_dev(a0, "href", "/character");
			attr_dev(a0, "class", "link-btn");
			add_location(a0, file, 23, 2, 618);
			attr_dev(a1, "href", "/manual");
			attr_dev(a1, "class", "link-btn");
			add_location(a1, file, 24, 2, 672);
			attr_dev(a2, "href", "/generator");
			attr_dev(a2, "class", "link-btn");
			add_location(a2, file, 25, 2, 720);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, t0);
			append_dev(p, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, a0, anchor);
			append_dev(a0, t3);
			insert_dev(target, t4, anchor);
			insert_dev(target, a1, anchor);
			append_dev(a1, t5);
			insert_dev(target, t6, anchor);
			insert_dev(target, a2, anchor);
			append_dev(a2, t7);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*$authUserStore*/ 1 && t1_value !== (t1_value = /*$authUserStore*/ ctx[0].email + "")) set_data_dev(t1, t1_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(a0);
			if (detaching) detach_dev(t4);
			if (detaching) detach_dev(a1);
			if (detaching) detach_dev(t6);
			if (detaching) detach_dev(a2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(22:1) {#if $authUserStore}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div;

	function select_block_type(ctx, dirty) {
		if (/*$authUserStore*/ ctx[0]) return create_if_block;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			div = element("div");
			if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			if_block.l(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "cntr-card");
			add_location(div, file, 20, 0, 525);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			if_block.m(div, null);
		},
		p: function update(ctx, [dirty]) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div, null);
				}
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if_block.d();
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

	return [$authUserStore];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguMzg0OTU2NjcuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvaW5kZXguc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQ+XG4gICAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gJ3N2ZWx0ZSdcbiAgICBpbXBvcnQgeyBhdXRoVXNlclN0b3JlLCBjb25maXJtIH0gZnJvbSAnc3RvcmVzL25ldGxpZnlTdG9yZS5qcydcblxuICAgIGNvbnNvbGUubG9nKCRhdXRoVXNlclN0b3JlKVxuXG4gICAgb25Nb3VudChfID0+IHtcbiAgICAgICAgY29uc3QgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cigxKVxuICAgICAgICBjb25zdCByZXN1bHQgPSBoYXNoLnNwbGl0KGAmYCkucmVkdWNlKChyZXN1bHQsIGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gaXRlbS5zcGxpdChgPWApXG4gICAgICAgICAgICByZXN1bHRbcGFydHNbMF1dID0gcGFydHNbMV1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgfSwge30pXG4gICAgICAgIGlmIChyZXN1bHQuY29uZmlybWF0aW9uX3Rva2VuKSB7XG4gICAgICAgICAgICBjb25maXJtKHJlc3VsdC5jb25maXJtYXRpb25fdG9rZW4pXG4gICAgICAgIH1cbiAgICB9KVxuPC9zY3JpcHQ+XG5cblxuPGRpdiBjbGFzcz0nY250ci1jYXJkJz5cblx0eyNpZiAkYXV0aFVzZXJTdG9yZX1cblx0XHQ8cD5Mb2dnZWQgaW4gYXMgeyRhdXRoVXNlclN0b3JlLmVtYWlsfTwvcD5cblx0XHQ8YSBocmVmPScvY2hhcmFjdGVyJyBjbGFzcz0nbGluay1idG4nPkNoYXJhY3RlcjwvYT5cblx0XHQ8YSBocmVmPScvbWFudWFsJyBjbGFzcz0nbGluay1idG4nPk1hbnVhbDwvYT5cblx0XHQ8YSBocmVmPScvZ2VuZXJhdG9yJyBjbGFzcz0nbGluay1idG4nPkdlbmVyYXRvcjwvYT5cblx0ezplbHNlfVxuXHRcdDxhIGhyZWY9Jy9sb2dpbicgY2xhc3M9J2xpbmstYnRuJz5Mb2dpbjwvYT5cblx0XHQ8YSBocmVmPScvc2lnbnVwJyBjbGFzcz0nbGluay1idG4nPlNpZ24gVXA8L2E+XG5cdHsvaWZ9XG48L2Rpdj4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUNBc0JtQixHQUFjLElBQUMsS0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21GQUFwQixHQUFjLElBQUMsS0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5QkFEakMsR0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBakJoQixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7O0NBRTFCLE9BQU8sQ0FBQyxDQUFDO1FBQ0MsSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztRQUNwQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssTUFBTSxNQUFNO0lBQUUsTUFBTSxFQUFFLElBQUk7VUFDekMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLO0lBQ3hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDO1dBQ25CLE1BQU07Ozs7O01BRWIsTUFBTSxDQUFDLGtCQUFrQjtHQUN6QixPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFrQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9