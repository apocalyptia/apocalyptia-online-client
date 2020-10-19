import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_store, c as component_subscribe, a as validate_slots, b as authUserStore, a7 as login, h as space, f as element, q as query_selector_all, l as detach_dev, m as claim_space, j as claim_element, k as children, n as attr_dev, p as add_location, t as insert_dev, z as transition_out, A as check_outros, B as transition_in, F as text, G as claim_text, r as append_dev, E as group_outros, N as set_input_value, H as listen_dev, a5 as prevent_default, u as noop, I as run_all, w as create_component, x as claim_component, y as mount_component, C as destroy_component } from './client.89032c5d.js';
import { S as Spinner } from './Spinner.fae279a1.js';

/* src/routes/login/index.svelte generated by Svelte v3.29.0 */
const file = "src/routes/login/index.svelte";

// (33:1) {:else}
function create_else_block(ctx) {
	let form;
	let input0;
	let t0;
	let input1;
	let t1;
	let input2;
	let t2;
	let mounted;
	let dispose;
	let if_block = /*forgotPassword*/ ctx[2] && create_if_block_1(ctx);

	const block = {
		c: function create() {
			form = element("form");
			input0 = element("input");
			t0 = space();
			input1 = element("input");
			t1 = space();
			input2 = element("input");
			t2 = space();
			if (if_block) if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			form = claim_element(nodes, "FORM", {});
			var form_nodes = children(form);

			input0 = claim_element(form_nodes, "INPUT", {
				type: true,
				required: true,
				autocomplete: true,
				placeholder: true
			});

			t0 = claim_space(form_nodes);

			input1 = claim_element(form_nodes, "INPUT", {
				type: true,
				required: true,
				autocomplete: true,
				placeholder: true
			});

			t1 = claim_space(form_nodes);
			input2 = claim_element(form_nodes, "INPUT", { type: true, class: true, value: true });
			t2 = claim_space(form_nodes);
			if (if_block) if_block.l(form_nodes);
			form_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(input0, "type", "email");
			input0.required = true;
			attr_dev(input0, "autocomplete", "email");
			attr_dev(input0, "placeholder", "Email");
			add_location(input0, file, 34, 3, 646);
			attr_dev(input1, "type", "password");
			input1.required = true;
			attr_dev(input1, "autocomplete", "current-password");
			attr_dev(input1, "placeholder", "Password");
			add_location(input1, file, 41, 3, 769);
			attr_dev(input2, "type", "submit");
			attr_dev(input2, "class", "link-btn");
			input2.value = "Login";
			add_location(input2, file, 48, 3, 912);
			add_location(form, file, 33, 2, 602);
		},
		m: function mount(target, anchor) {
			insert_dev(target, form, anchor);
			append_dev(form, input0);
			set_input_value(input0, /*user*/ ctx[0].email);
			append_dev(form, t0);
			append_dev(form, input1);
			set_input_value(input1, /*user*/ ctx[0].password);
			append_dev(form, t1);
			append_dev(form, input2);
			append_dev(form, t2);
			if (if_block) if_block.m(form, null);

			if (!mounted) {
				dispose = [
					listen_dev(input0, "input", /*input0_input_handler*/ ctx[4]),
					listen_dev(input1, "input", /*input1_input_handler*/ ctx[5]),
					listen_dev(form, "submit", prevent_default(/*submit*/ ctx[3]), false, true, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*user*/ 1 && input0.value !== /*user*/ ctx[0].email) {
				set_input_value(input0, /*user*/ ctx[0].email);
			}

			if (dirty & /*user*/ 1 && input1.value !== /*user*/ ctx[0].password) {
				set_input_value(input1, /*user*/ ctx[0].password);
			}

			if (/*forgotPassword*/ ctx[2]) {
				if (if_block) ; else {
					if_block = create_if_block_1(ctx);
					if_block.c();
					if_block.m(form, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(form);
			if (if_block) if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(33:1) {:else}",
		ctx
	});

	return block;
}

// (31:1) {#if pendingApiCall}
function create_if_block(ctx) {
	let spinner;
	let current;
	spinner = new Spinner({ $$inline: true });

	const block = {
		c: function create() {
			create_component(spinner.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(spinner.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(spinner, target, anchor);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(spinner.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(spinner.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(spinner, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(31:1) {#if pendingApiCall}",
		ctx
	});

	return block;
}

// (54:3) {#if forgotPassword}
function create_if_block_1(ctx) {
	let a;
	let t;

	const block = {
		c: function create() {
			a = element("a");
			t = text("Forgot your password?");
			this.h();
		},
		l: function claim(nodes) {
			a = claim_element(nodes, "A", { href: true });
			var a_nodes = children(a);
			t = claim_text(a_nodes, "Forgot your password?");
			a_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(a, "href", "/login/recover");
			add_location(a, file, 54, 4, 1009);
		},
		m: function mount(target, anchor) {
			insert_dev(target, a, anchor);
			append_dev(a, t);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(a);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(54:3) {#if forgotPassword}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let t;
	let div;
	let current_block_type_index;
	let if_block;
	let current;
	const if_block_creators = [create_if_block, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*pendingApiCall*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			t = space();
			div = element("div");
			if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-9pe1qo\"]", document.head);
			head_nodes.forEach(detach_dev);
			t = claim_space(nodes);
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			if_block.l(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			document.title = "Apocalyptia Online - Login";
			attr_dev(div, "class", "cntr-card");
			add_location(div, file, 29, 0, 531);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
			insert_dev(target, div, anchor);
			if_blocks[current_block_type_index].m(div, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				}

				transition_in(if_block, 1);
				if_block.m(div, null);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
			if (detaching) detach_dev(div);
			if_blocks[current_block_type_index].d();
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
	component_subscribe($$self, authUserStore, $$value => $$invalidate(6, $authUserStore = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Login", slots, []);
	if ($authUserStore) window.location.assign(`www.apocalyptiaonline.com`);
	const user = { email: ``, password: `` };
	let pendingApiCall = false;
	let forgotPassword = false;

	const submit = () => {
		$$invalidate(1, pendingApiCall = true);

		login(user).catch(_ => {
			$$invalidate(1, pendingApiCall = false);
			$$invalidate(2, forgotPassword = true);
		});
	};

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Login> was created with unknown prop '${key}'`);
	});

	function input0_input_handler() {
		user.email = this.value;
		$$invalidate(0, user);
	}

	function input1_input_handler() {
		user.password = this.value;
		$$invalidate(0, user);
	}

	$$self.$capture_state = () => ({
		Spinner,
		authUserStore,
		login,
		user,
		pendingApiCall,
		forgotPassword,
		submit,
		$authUserStore
	});

	$$self.$inject_state = $$props => {
		if ("pendingApiCall" in $$props) $$invalidate(1, pendingApiCall = $$props.pendingApiCall);
		if ("forgotPassword" in $$props) $$invalidate(2, forgotPassword = $$props.forgotPassword);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		user,
		pendingApiCall,
		forgotPassword,
		submit,
		input0_input_handler,
		input1_input_handler
	];
}

class Login extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Login",
			options,
			id: create_fragment.name
		});
	}
}

export default Login;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguNDFiNTQ1ZWEuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvbG9naW4vaW5kZXguc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQ+XG5cdGltcG9ydCBTcGlubmVyIGZyb20gJ3ZpZXdzL3dpZGdldHMvU3Bpbm5lci5zdmVsdGUnXG5cdGltcG9ydCB7IGF1dGhVc2VyU3RvcmUsIGxvZ2luIH0gZnJvbSAnc3RvcmVzL25ldGxpZnlTdG9yZS5qcydcblxuXHRpZiAoJGF1dGhVc2VyU3RvcmUpIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24oYHd3dy5hcG9jYWx5cHRpYW9ubGluZS5jb21gKVxuXG5cdGNvbnN0IHVzZXIgPSB7XG5cdFx0ZW1haWw6IGBgLFxuXHRcdHBhc3N3b3JkOiBgYFxuXHR9XG5cblx0bGV0IHBlbmRpbmdBcGlDYWxsID0gZmFsc2Vcblx0XG5cdGxldCBmb3Jnb3RQYXNzd29yZCA9IGZhbHNlXG5cblx0Y29uc3Qgc3VibWl0ID0gKCkgPT4ge1xuXHRcdHBlbmRpbmdBcGlDYWxsID0gdHJ1ZVxuXHRcdGxvZ2luKHVzZXIpXG5cdFx0XHQuY2F0Y2goXyA9PiB7XG5cdFx0XHRcdHBlbmRpbmdBcGlDYWxsID0gZmFsc2Vcblx0XHRcdFx0Zm9yZ290UGFzc3dvcmQgPSB0cnVlXG5cdFx0XHR9KVxuXHR9XG48L3NjcmlwdD5cblxuXG48c3ZlbHRlOmhlYWQ+XG5cdDx0aXRsZT5BcG9jYWx5cHRpYSBPbmxpbmUgLSBMb2dpbjwvdGl0bGU+XG48L3N2ZWx0ZTpoZWFkPlxuPGRpdiBjbGFzcz0nY250ci1jYXJkJz5cblx0eyNpZiBwZW5kaW5nQXBpQ2FsbH1cblx0XHQ8U3Bpbm5lciAvPlxuXHR7OmVsc2V9XG5cdFx0PGZvcm0gb246c3VibWl0fHByZXZlbnREZWZhdWx0PXtzdWJtaXR9PlxuXHRcdFx0PGlucHV0XG5cdFx0XHRcdHR5cGU9J2VtYWlsJ1xuXHRcdFx0XHRyZXF1aXJlZFxuXHRcdFx0XHRhdXRvY29tcGxldGU9J2VtYWlsJ1xuXHRcdFx0XHRwbGFjZWhvbGRlcj0nRW1haWwnXG5cdFx0XHRcdGJpbmQ6dmFsdWU9e3VzZXIuZW1haWx9XG5cdFx0XHQvPlxuXHRcdFx0PGlucHV0XG5cdFx0XHRcdHR5cGU9J3Bhc3N3b3JkJ1xuXHRcdFx0XHRyZXF1aXJlZFxuXHRcdFx0XHRhdXRvY29tcGxldGU9J2N1cnJlbnQtcGFzc3dvcmQnXG5cdFx0XHRcdHBsYWNlaG9sZGVyPSdQYXNzd29yZCdcblx0XHRcdFx0YmluZDp2YWx1ZT17dXNlci5wYXNzd29yZH1cblx0XHRcdC8+XG5cdFx0XHQ8aW5wdXRcblx0XHRcdFx0dHlwZT0nc3VibWl0J1xuXHRcdFx0XHRjbGFzcz0nbGluay1idG4nXG5cdFx0XHRcdHZhbHVlPSdMb2dpbidcblx0XHRcdD5cblx0XHRcdHsjaWYgZm9yZ290UGFzc3dvcmR9XG5cdFx0XHRcdDxhIGhyZWY9Jy9sb2dpbi9yZWNvdmVyJz5Gb3Jnb3QgeW91ciBwYXNzd29yZD88L2E+XG5cdFx0XHR7L2lmfVxuXHRcdDwvZm9ybT5cblx0ey9pZn1cbjwvZGl2PiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OzttQ0FxRFEsR0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQ0FkTixHQUFJLElBQUMsS0FBSzs7O29DQU9WLEdBQUksSUFBQyxRQUFROzs7Ozs7Ozs7OzJEQWJLLEdBQU07Ozs7Ozs7dURBTXhCLEdBQUksSUFBQyxLQUFLO3FDQUFWLEdBQUksSUFBQyxLQUFLOzs7dURBT1YsR0FBSSxJQUFDLFFBQVE7cUNBQWIsR0FBSSxJQUFDLFFBQVE7OzswQkFPckIsR0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5QkF2QmhCLEdBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTFCZixjQUFjLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNO09BRXBDLElBQUksS0FDVCxLQUFLLE1BQ0wsUUFBUTtLQUdMLGNBQWMsR0FBRyxLQUFLO0tBRXRCLGNBQWMsR0FBRyxLQUFLOztPQUVwQixNQUFNO2tCQUNYLGNBQWMsR0FBRyxJQUFJOztFQUNyQixLQUFLLENBQUMsSUFBSSxFQUNSLEtBQUssQ0FBQyxDQUFDO21CQUNQLGNBQWMsR0FBRyxLQUFLO21CQUN0QixjQUFjLEdBQUcsSUFBSTs7Ozs7Ozs7Ozs7RUFtQlQsSUFBSSxDQUFDLEtBQUs7Ozs7O0VBT1YsSUFBSSxDQUFDLFFBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
