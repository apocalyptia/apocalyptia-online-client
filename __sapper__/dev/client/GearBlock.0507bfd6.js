import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, J as validate_each_argument, k as space, X as empty, m as claim_space, j as insert_dev, C as transition_in, F as group_outros, A as transition_out, B as check_outros, f as detach_dev, L as destroy_each, e as element, t as text, a as claim_element, b as children, l as claim_text, g as attr_dev, h as add_location, p as append_dev, K as set_data_dev, w as create_component, y as claim_component, z as mount_component, D as destroy_component, V as to_number, M as set_input_value, G as listen_dev } from './client.8c9a88d7.js';

/* src/components/views/widgets/GearBlock.svelte generated by Svelte v3.29.0 */

const file = "src/components/views/widgets/GearBlock.svelte";

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[7] = list[i];
	return child_ctx;
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i];
	return child_ctx;
}

function get_each_context_2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[10] = list[i];
	return child_ctx;
}

function get_each_context_3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[13] = list[i];
	return child_ctx;
}

// (66:1) {#if item}
function create_if_block(ctx) {
	let t0;
	let t1;
	let t2;
	let show_if = /*item*/ ctx[0] && /*item*/ ctx[0].hasOwnProperty("attr") && /*item*/ ctx[0].attr.length > 0;
	let t3;
	let if_block3_anchor;
	let current;
	let if_block0 = /*item*/ ctx[0].name && create_if_block_6(ctx);
	let if_block1 = /*item*/ ctx[0].desc && create_if_block_5(ctx);
	let each_value_2 = /*itemProps*/ ctx[2];
	validate_each_argument(each_value_2);
	let each_blocks = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
	}

	let if_block2 = show_if && create_if_block_2(ctx);
	let if_block3 = /*item*/ ctx[0].table && create_if_block_1(ctx);

	const block = {
		c: function create() {
			if (if_block0) if_block0.c();
			t0 = space();
			if (if_block1) if_block1.c();
			t1 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t2 = space();
			if (if_block2) if_block2.c();
			t3 = space();
			if (if_block3) if_block3.c();
			if_block3_anchor = empty();
		},
		l: function claim(nodes) {
			if (if_block0) if_block0.l(nodes);
			t0 = claim_space(nodes);
			if (if_block1) if_block1.l(nodes);
			t1 = claim_space(nodes);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(nodes);
			}

			t2 = claim_space(nodes);
			if (if_block2) if_block2.l(nodes);
			t3 = claim_space(nodes);
			if (if_block3) if_block3.l(nodes);
			if_block3_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert_dev(target, t0, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_dev(target, t1, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_dev(target, t2, anchor);
			if (if_block2) if_block2.m(target, anchor);
			insert_dev(target, t3, anchor);
			if (if_block3) if_block3.m(target, anchor);
			insert_dev(target, if_block3_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (/*item*/ ctx[0].name) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_6(ctx);
					if_block0.c();
					if_block0.m(t0.parentNode, t0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*item*/ ctx[0].desc) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_5(ctx);
					if_block1.c();
					if_block1.m(t1.parentNode, t1);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty & /*item, itemProps, mode*/ 7) {
				each_value_2 = /*itemProps*/ ctx[2];
				validate_each_argument(each_value_2);
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2(ctx, each_value_2, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(t2.parentNode, t2);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_2.length;
			}

			if (dirty & /*item*/ 1) show_if = /*item*/ ctx[0] && /*item*/ ctx[0].hasOwnProperty("attr") && /*item*/ ctx[0].attr.length > 0;

			if (show_if) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_2(ctx);
					if_block2.c();
					if_block2.m(t3.parentNode, t3);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (/*item*/ ctx[0].table) {
				if (if_block3) {
					if_block3.p(ctx, dirty);

					if (dirty & /*item*/ 1) {
						transition_in(if_block3, 1);
					}
				} else {
					if_block3 = create_if_block_1(ctx);
					if_block3.c();
					transition_in(if_block3, 1);
					if_block3.m(if_block3_anchor.parentNode, if_block3_anchor);
				}
			} else if (if_block3) {
				group_outros();

				transition_out(if_block3, 1, 1, () => {
					if_block3 = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block3);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block3);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach_dev(t0);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(t1);
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(t2);
			if (if_block2) if_block2.d(detaching);
			if (detaching) detach_dev(t3);
			if (if_block3) if_block3.d(detaching);
			if (detaching) detach_dev(if_block3_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(66:1) {#if item}",
		ctx
	});

	return block;
}

// (67:2) {#if item.name}
function create_if_block_6(ctx) {
	let p;
	let strong;
	let t_value = /*item*/ ctx[0].name + "";
	let t;

	const block = {
		c: function create() {
			p = element("p");
			strong = element("strong");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			strong = claim_element(p_nodes, "STRONG", { class: true });
			var strong_nodes = children(strong);
			t = claim_text(strong_nodes, t_value);
			strong_nodes.forEach(detach_dev);
			p_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(strong, "class", "svelte-ifz1xi");
			add_location(strong, file, 67, 6, 751);
			add_location(p, file, 67, 3, 748);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, strong);
			append_dev(strong, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*item*/ 1 && t_value !== (t_value = /*item*/ ctx[0].name + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_6.name,
		type: "if",
		source: "(67:2) {#if item.name}",
		ctx
	});

	return block;
}

// (70:2) {#if item.desc}
function create_if_block_5(ctx) {
	let each_1_anchor;
	let each_value_3 = /*item*/ ctx[0].desc;
	validate_each_argument(each_value_3);
	let each_blocks = [];

	for (let i = 0; i < each_value_3.length; i += 1) {
		each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
	}

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		l: function claim(nodes) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(nodes);
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_dev(target, each_1_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*item*/ 1) {
				each_value_3 = /*item*/ ctx[0].desc;
				validate_each_argument(each_value_3);
				let i;

				for (i = 0; i < each_value_3.length; i += 1) {
					const child_ctx = get_each_context_3(ctx, each_value_3, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_3(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_3.length;
			}
		},
		d: function destroy(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_5.name,
		type: "if",
		source: "(70:2) {#if item.desc}",
		ctx
	});

	return block;
}

// (71:3) {#each item.desc as desc}
function create_each_block_3(ctx) {
	let p;
	let t_value = /*desc*/ ctx[13] + "";
	let t;

	const block = {
		c: function create() {
			p = element("p");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			t = claim_text(p_nodes, t_value);
			p_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(p, file, 71, 4, 843);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*item*/ 1 && t_value !== (t_value = /*desc*/ ctx[13] + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_3.name,
		type: "each",
		source: "(71:3) {#each item.desc as desc}",
		ctx
	});

	return block;
}

// (76:3) {#if item[prop.abv]}
function create_if_block_3(ctx) {
	let p;
	let u;
	let t0_value = /*prop*/ ctx[10].name + "";
	let t0;
	let t1;

	function select_block_type(ctx, dirty) {
		if (/*prop*/ ctx[10].name == "Quantity" && /*mode*/ ctx[1] == "edit") return create_if_block_4;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			p = element("p");
			u = element("u");
			t0 = text(t0_value);
			t1 = text(": \n\t\t\t\t\t");
			if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			u = claim_element(p_nodes, "U", {});
			var u_nodes = children(u);
			t0 = claim_text(u_nodes, t0_value);
			u_nodes.forEach(detach_dev);
			t1 = claim_text(p_nodes, ": \n\t\t\t\t\t");
			if_block.l(p_nodes);
			p_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(u, file, 77, 5, 941);
			add_location(p, file, 76, 4, 932);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, u);
			append_dev(u, t0);
			append_dev(p, t1);
			if_block.m(p, null);
		},
		p: function update(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(p, null);
				}
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
			if_block.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(76:3) {#if item[prop.abv]}",
		ctx
	});

	return block;
}

// (81:5) {:else}
function create_else_block(ctx) {
	let t_value = /*item*/ ctx[0][/*prop*/ ctx[10].abv] + "";
	let t;

	const block = {
		c: function create() {
			t = text(t_value);
		},
		l: function claim(nodes) {
			t = claim_text(nodes, t_value);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*item*/ 1 && t_value !== (t_value = /*item*/ ctx[0][/*prop*/ ctx[10].abv] + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(81:5) {:else}",
		ctx
	});

	return block;
}

// (79:5) {#if prop.name == 'Quantity' && mode == 'edit'}
function create_if_block_4(ctx) {
	let input;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			input = element("input");
			this.h();
		},
		l: function claim(nodes) {
			input = claim_element(nodes, "INPUT", { type: true, class: true, min: true });
			this.h();
		},
		h: function hydrate() {
			attr_dev(input, "type", "number");
			attr_dev(input, "class", "item-qty svelte-ifz1xi");
			attr_dev(input, "min", "0");
			add_location(input, file, 79, 6, 1021);
		},
		m: function mount(target, anchor) {
			insert_dev(target, input, anchor);
			set_input_value(input, /*item*/ ctx[0].qty);

			if (!mounted) {
				dispose = listen_dev(input, "input", /*input_input_handler*/ ctx[3]);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*item*/ 1 && to_number(input.value) !== /*item*/ ctx[0].qty) {
				set_input_value(input, /*item*/ ctx[0].qty);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(input);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(79:5) {#if prop.name == 'Quantity' && mode == 'edit'}",
		ctx
	});

	return block;
}

// (75:2) {#each itemProps as prop}
function create_each_block_2(ctx) {
	let if_block_anchor;
	let if_block = /*item*/ ctx[0][/*prop*/ ctx[10].abv] && create_if_block_3(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (/*item*/ ctx[0][/*prop*/ ctx[10].abv]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_3(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_2.name,
		type: "each",
		source: "(75:2) {#each itemProps as prop}",
		ctx
	});

	return block;
}

// (87:2) {#if item && item.hasOwnProperty('attr') && item.attr.length > 0}
function create_if_block_2(ctx) {
	let p;
	let u;
	let t0;
	let t1;
	let t2;
	let div;
	let ul;
	let each_value = /*item*/ ctx[0].attr;
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			p = element("p");
			u = element("u");
			t0 = text("Attributes");
			t1 = text(":");
			t2 = space();
			div = element("div");
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			u = claim_element(p_nodes, "U", {});
			var u_nodes = children(u);
			t0 = claim_text(u_nodes, "Attributes");
			u_nodes.forEach(detach_dev);
			t1 = claim_text(p_nodes, ":");
			p_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			ul = claim_element(div_nodes, "UL", { class: true });
			var ul_nodes = children(ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(ul_nodes);
			}

			ul_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(u, file, 87, 6, 1241);
			add_location(p, file, 87, 3, 1238);
			attr_dev(ul, "class", "svelte-ifz1xi");
			add_location(ul, file, 89, 4, 1296);
			attr_dev(div, "class", "attributes");
			add_location(div, file, 88, 3, 1267);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, u);
			append_dev(u, t0);
			append_dev(p, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, div, anchor);
			append_dev(div, ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*item*/ 1) {
				each_value = /*item*/ ctx[0].attr;
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(ul, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(div);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(87:2) {#if item && item.hasOwnProperty('attr') && item.attr.length > 0}",
		ctx
	});

	return block;
}

// (92:22) {#each attr.desc as line}
function create_each_block_1(ctx) {
	let t0;
	let t1_value = /*line*/ ctx[7] + "";
	let t1;

	const block = {
		c: function create() {
			t0 = text(" ");
			t1 = text(t1_value);
		},
		l: function claim(nodes) {
			t0 = claim_text(nodes, " ");
			t1 = claim_text(nodes, t1_value);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, t1, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*item*/ 1 && t1_value !== (t1_value = /*line*/ ctx[7] + "")) set_data_dev(t1, t1_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(t1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(92:22) {#each attr.desc as line}",
		ctx
	});

	return block;
}

// (91:5) {#each item.attr as attr}
function create_each_block(ctx) {
	let li;
	let t0_value = /*attr*/ ctx[4].name + "";
	let t0;
	let t1;
	let t2;
	let each_value_1 = /*attr*/ ctx[4].desc;
	validate_each_argument(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const block = {
		c: function create() {
			li = element("li");
			t0 = text(t0_value);
			t1 = text(":");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t2 = space();
			this.h();
		},
		l: function claim(nodes) {
			li = claim_element(nodes, "LI", {});
			var li_nodes = children(li);
			t0 = claim_text(li_nodes, t0_value);
			t1 = claim_text(li_nodes, ":");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(li_nodes);
			}

			t2 = claim_space(li_nodes);
			li_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(li, file, 91, 6, 1338);
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			append_dev(li, t0);
			append_dev(li, t1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(li, null);
			}

			append_dev(li, t2);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*item*/ 1 && t0_value !== (t0_value = /*attr*/ ctx[4].name + "")) set_data_dev(t0, t0_value);

			if (dirty & /*item*/ 1) {
				each_value_1 = /*attr*/ ctx[4].desc;
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(li, t2);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(91:5) {#each item.attr as attr}",
		ctx
	});

	return block;
}

// (100:2) {#if item.table}
function create_if_block_1(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*item*/ ctx[0].table;

	function switch_props(ctx) {
		return { $$inline: true };
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props());
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		l: function claim(nodes) {
			if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (switch_value !== (switch_value = /*item*/ ctx[0].table)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(100:2) {#if item.table}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div;
	let current;
	let if_block = /*item*/ ctx[0] && create_if_block(ctx);

	const block = {
		c: function create() {
			div = element("div");
			if (if_block) if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			if (if_block) if_block.l(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "gear-block");
			add_location(div, file, 64, 0, 690);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			if (if_block) if_block.m(div, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*item*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*item*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
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
			if (detaching) detach_dev(div);
			if (if_block) if_block.d();
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
	validate_slots("GearBlock", slots, []);
	let { mode } = $$props, { item } = $$props;

	const itemProps = [
		{ name: "Damage", abv: "dmg" },
		{ name: "Range", abv: "rng" },
		{ name: "Magazine", abv: "cap" },
		{ name: "Caliber", abv: "cal" },
		{ name: "Quantity", abv: "qty" },
		{ name: "Fuse", abv: "fuse" },
		{ name: "Duration", abv: "dur" },
		{ name: "Mix Difficulty", abv: "mix" },
		{ name: "Overdose Possible", abv: "od" },
		{ name: "Hours", abv: "hrs" },
		{ name: "Slots", abv: "slots" },
		{ name: "Damage Resistance", abv: "dr" },
		{ name: "Body Part", abv: "loc" },
		{ name: "Size", abv: "sz" }
	];

	const writable_props = ["mode", "item"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<GearBlock> was created with unknown prop '${key}'`);
	});

	function input_input_handler() {
		item.qty = to_number(this.value);
		$$invalidate(0, item);
	}

	$$self.$$set = $$props => {
		if ("mode" in $$props) $$invalidate(1, mode = $$props.mode);
		if ("item" in $$props) $$invalidate(0, item = $$props.item);
	};

	$$self.$capture_state = () => ({ mode, item, itemProps });

	$$self.$inject_state = $$props => {
		if ("mode" in $$props) $$invalidate(1, mode = $$props.mode);
		if ("item" in $$props) $$invalidate(0, item = $$props.item);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [item, mode, itemProps, input_input_handler];
}

class GearBlock extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { mode: 1, item: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "GearBlock",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*mode*/ ctx[1] === undefined && !("mode" in props)) {
			console.warn("<GearBlock> was created without expected prop 'mode'");
		}

		if (/*item*/ ctx[0] === undefined && !("item" in props)) {
			console.warn("<GearBlock> was created without expected prop 'item'");
		}
	}

	get mode() {
		throw new Error("<GearBlock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set mode(value) {
		throw new Error("<GearBlock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get item() {
		throw new Error("<GearBlock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set item(value) {
		throw new Error("<GearBlock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export { GearBlock as G };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VhckJsb2NrLjA1MDdiZmQ2LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy92aWV3cy93aWRnZXRzL0dlYXJCbG9jay5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cblx0ZXhwb3J0IGxldCBtb2RlLCBpdGVtXG5cblx0Y29uc3QgaXRlbVByb3BzID0gW1xuXHRcdHtcblx0XHRcdG5hbWU6ICdEYW1hZ2UnLFxuXHRcdFx0YWJ2OiAnZG1nJ1xuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ1JhbmdlJyxcblx0XHRcdGFidjogJ3JuZydcblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdNYWdhemluZScsXG5cdFx0XHRhYnY6ICdjYXAnXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnQ2FsaWJlcicsXG5cdFx0XHRhYnY6ICdjYWwnXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnUXVhbnRpdHknLFxuXHRcdFx0YWJ2OiAncXR5J1xuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ0Z1c2UnLFxuXHRcdFx0YWJ2OiAnZnVzZSdcblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdEdXJhdGlvbicsXG5cdFx0XHRhYnY6ICdkdXInXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnTWl4IERpZmZpY3VsdHknLFxuXHRcdFx0YWJ2OiAnbWl4J1xuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ092ZXJkb3NlIFBvc3NpYmxlJyxcblx0XHRcdGFidjogJ29kJ1xuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ0hvdXJzJyxcblx0XHRcdGFidjogJ2hycydcblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdTbG90cycsXG5cdFx0XHRhYnY6ICdzbG90cydcblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdEYW1hZ2UgUmVzaXN0YW5jZScsXG5cdFx0XHRhYnY6ICdkcidcblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdCb2R5IFBhcnQnLFxuXHRcdFx0YWJ2OiAnbG9jJ1xuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ1NpemUnLFxuXHRcdFx0YWJ2OiAnc3onXG5cdFx0fSxcblx0XVxuPC9zY3JpcHQ+XG5cblxuPGRpdiBjbGFzcz0nZ2Vhci1ibG9jayc+XG5cdHsjaWYgaXRlbX1cblx0XHR7I2lmIGl0ZW0ubmFtZX1cblx0XHRcdDxwPjxzdHJvbmc+e2l0ZW0ubmFtZX08L3N0cm9uZz48L3A+XG5cdFx0ey9pZn1cblx0XHR7I2lmIGl0ZW0uZGVzY31cblx0XHRcdHsjZWFjaCBpdGVtLmRlc2MgYXMgZGVzY31cblx0XHRcdFx0PHA+e2Rlc2N9PC9wPlxuXHRcdFx0ey9lYWNofVxuXHRcdHsvaWZ9XG5cdFx0eyNlYWNoIGl0ZW1Qcm9wcyBhcyBwcm9wfVxuXHRcdFx0eyNpZiBpdGVtW3Byb3AuYWJ2XX1cblx0XHRcdFx0PHA+XG5cdFx0XHRcdFx0PHU+e3Byb3AubmFtZX08L3U+OiBcblx0XHRcdFx0XHR7I2lmIHByb3AubmFtZSA9PSAnUXVhbnRpdHknICYmIG1vZGUgPT0gJ2VkaXQnfVxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9J251bWJlcicgY2xhc3M9J2l0ZW0tcXR5JyBtaW49JzAnIGJpbmQ6dmFsdWU9e2l0ZW0ucXR5fSAvPlxuXHRcdFx0XHRcdHs6ZWxzZX1cblx0XHRcdFx0XHRcdHtpdGVtW3Byb3AuYWJ2XX1cblx0XHRcdFx0XHR7L2lmfVxuXHRcdFx0XHQ8L3A+XG5cdFx0XHR7L2lmfVxuXHRcdHsvZWFjaH1cblx0XHR7I2lmIGl0ZW0gJiYgaXRlbS5oYXNPd25Qcm9wZXJ0eSgnYXR0cicpICYmIGl0ZW0uYXR0ci5sZW5ndGggPiAwfVxuXHRcdFx0PHA+PHU+QXR0cmlidXRlczwvdT46PC9wPlxuXHRcdFx0PGRpdiBjbGFzcz0nYXR0cmlidXRlcyc+XG5cdFx0XHRcdDx1bD5cblx0XHRcdFx0XHR7I2VhY2ggaXRlbS5hdHRyIGFzIGF0dHJ9XG5cdFx0XHRcdFx0XHQ8bGk+e2F0dHIubmFtZX06eyNlYWNoIGF0dHIuZGVzYyBhcyBsaW5lfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCZuYnNwO3tsaW5lfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR7L2VhY2h9XG5cdFx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdHsvZWFjaH1cblx0XHRcdFx0PC91bD5cblx0XHRcdDwvZGl2PlxuXHRcdHsvaWZ9XG5cdFx0eyNpZiBpdGVtLnRhYmxlfVxuXHRcdFx0PHN2ZWx0ZTpjb21wb25lbnQgdGhpcz17aXRlbS50YWJsZX0vPlxuXHRcdHsvaWZ9XG5cdHsvaWZ9XG48L2Rpdj5cblxuXG48c3R5bGU+XG5cdHN0cm9uZyB7XG5cdFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XG5cdH1cblx0dWwge1xuXHRcdGxpc3Qtc3R5bGU6IGRpc2M7XG5cdFx0bWFyZ2luLWxlZnQ6IHZhcigtLXMxMDApO1xuXHR9XG5cdC5pdGVtLXF0eSB7XG5cdFx0d2lkdGg6IDIwJTtcblx0fVxuPC9zdHlsZT4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBc0ZPLEdBQUksZ0JBQUksR0FBSSxJQUFDLGNBQWMsQ0FBQyxNQUFNLGNBQUssR0FBSSxJQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQzs7OzswQkFwQjNELEdBQUksSUFBQyxJQUFJOzBCQUdULEdBQUksSUFBQyxJQUFJO2tDQUtQLEdBQVM7Ozs7a0NBQWQsTUFBSTs7Ozs7MEJBeUJELEdBQUksSUFBQyxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkFqQ1YsR0FBSSxJQUFDLElBQUk7Ozs7Ozs7Ozs7Ozs7Z0JBR1QsR0FBSSxJQUFDLElBQUk7Ozs7Ozs7Ozs7Ozs7O2lDQUtQLEdBQVM7Ozs7aUNBQWQsTUFBSTs7Ozs7Ozs7Ozs7Ozs7OztzQ0FBSixNQUFJOzs7OENBWUQsR0FBSSxnQkFBSSxHQUFJLElBQUMsY0FBYyxDQUFDLE1B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