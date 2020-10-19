import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, L as validate_each_argument, v as validate_store, c as component_subscribe, a as validate_slots, X as empty, t as insert_dev, l as detach_dev, h as space, f as element, w as text, q as query_selector_all, m as claim_space, j as claim_element, k as children, x as claim_text, p as add_location, n as attr_dev, r as append_dev, N as set_input_value, I as listen_dev, u as noop, M as destroy_each, J as run_all, G as set_store_value } from './client.ad852c9c.js';
import { c as character } from './characterStore.789c7f8d.js';
import './RandomRoll.f18d347c.js';
import { D as Description } from './Description.8a5b4d62.js';

/* src/routes/character/creator/description.svelte generated by Svelte v3.29.0 */
const file = "src/routes/character/creator/description.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[10] = list[i];
	child_ctx[11] = list;
	child_ctx[12] = i;
	return child_ctx;
}

// (27:2) {#if index % 2 == 0 && index < Description.list.length - 2}
function create_if_block(ctx) {
	let div2;
	let div0;
	let span0;
	let t0_value = Description.list[/*index*/ ctx[12] + 2].name + "";
	let t0;
	let t1;
	let t2;
	let input0;
	let t3;
	let button0;
	let t4;
	let t5;
	let div1;
	let span1;
	let t6_value = Description.list[/*index*/ ctx[12] + 3].name + "";
	let t6;
	let t7;
	let t8;
	let input1;
	let t9;
	let button1;
	let t10;
	let t11;
	let mounted;
	let dispose;

	function input0_input_handler() {
		/*input0_input_handler*/ ctx[6].call(input0, /*index*/ ctx[12]);
	}

	function click_handler_1(...args) {
		return /*click_handler_1*/ ctx[7](/*index*/ ctx[12], ...args);
	}

	function input1_input_handler() {
		/*input1_input_handler*/ ctx[8].call(input1, /*index*/ ctx[12]);
	}

	function click_handler_2(...args) {
		return /*click_handler_2*/ ctx[9](/*index*/ ctx[12], ...args);
	}

	const block = {
		c: function create() {
			div2 = element("div");
			div0 = element("div");
			span0 = element("span");
			t0 = text(t0_value);
			t1 = text(":");
			t2 = space();
			input0 = element("input");
			t3 = space();
			button0 = element("button");
			t4 = text("Random");
			t5 = space();
			div1 = element("div");
			span1 = element("span");
			t6 = text(t6_value);
			t7 = text(":");
			t8 = space();
			input1 = element("input");
			t9 = space();
			button1 = element("button");
			t10 = text("Random");
			t11 = space();
			this.h();
		},
		l: function claim(nodes) {
			div2 = claim_element(nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			div0 = claim_element(div2_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			span0 = claim_element(div0_nodes, "SPAN", { class: true });
			var span0_nodes = children(span0);
			t0 = claim_text(span0_nodes, t0_value);
			t1 = claim_text(span0_nodes, ":");
			span0_nodes.forEach(detach_dev);
			t2 = claim_space(div0_nodes);
			input0 = claim_element(div0_nodes, "INPUT", { type: true, class: true });
			t3 = claim_space(div0_nodes);
			button0 = claim_element(div0_nodes, "BUTTON", { class: true });
			var button0_nodes = children(button0);
			t4 = claim_text(button0_nodes, "Random");
			button0_nodes.forEach(detach_dev);
			div0_nodes.forEach(detach_dev);
			t5 = claim_space(div2_nodes);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			span1 = claim_element(div1_nodes, "SPAN", { class: true });
			var span1_nodes = children(span1);
			t6 = claim_text(span1_nodes, t6_value);
			t7 = claim_text(span1_nodes, ":");
			span1_nodes.forEach(detach_dev);
			t8 = claim_space(div1_nodes);
			input1 = claim_element(div1_nodes, "INPUT", { type: true, class: true });
			t9 = claim_space(div1_nodes);
			button1 = claim_element(div1_nodes, "BUTTON", { class: true });
			var button1_nodes = children(button1);
			t10 = claim_text(button1_nodes, "Random");
			button1_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			t11 = claim_space(div2_nodes);
			div2_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span0, "class", "svelte-1gpx4d4");
			add_location(span0, file, 29, 5, 899);
			attr_dev(input0, "type", "text");
			attr_dev(input0, "class", "svelte-1gpx4d4");
			add_location(input0, file, 30, 5, 953);
			attr_dev(button0, "class", "svelte-1gpx4d4");
			add_location(button0, file, 32, 5, 1068);
			attr_dev(div0, "class", "item-container svelte-1gpx4d4");
			add_location(div0, file, 28, 4, 865);
			attr_dev(span1, "class", "svelte-1gpx4d4");
			add_location(span1, file, 35, 5, 1186);
			attr_dev(input1, "type", "text");
			attr_dev(input1, "class", "svelte-1gpx4d4");
			add_location(input1, file, 36, 5, 1240);
			attr_dev(button1, "class", "svelte-1gpx4d4");
			add_location(button1, file, 38, 5, 1355);
			attr_dev(div1, "class", "item-container svelte-1gpx4d4");
			add_location(div1, file, 34, 4, 1152);
			attr_dev(div2, "class", "item-block svelte-1gpx4d4");
			add_location(div2, file, 27, 3, 836);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div0);
			append_dev(div0, span0);
			append_dev(span0, t0);
			append_dev(span0, t1);
			append_dev(div0, t2);
			append_dev(div0, input0);
			set_input_value(input0, /*$character*/ ctx[0].desc[Description.list[/*index*/ ctx[12] + 2].name.toLowerCase()].value);
			append_dev(div0, t3);
			append_dev(div0, button0);
			append_dev(button0, t4);
			append_dev(div2, t5);
			append_dev(div2, div1);
			append_dev(div1, span1);
			append_dev(span1, t6);
			append_dev(span1, t7);
			append_dev(div1, t8);
			append_dev(div1, input1);
			set_input_value(input1, /*$character*/ ctx[0].desc[Description.list[/*index*/ ctx[12] + 3].name.toLowerCase()].value);
			append_dev(div1, t9);
			append_dev(div1, button1);
			append_dev(button1, t10);
			append_dev(div2, t11);

			if (!mounted) {
				dispose = [
					listen_dev(input0, "input", input0_input_handler),
					listen_dev(button0, "click", click_handler_1, false, false, false),
					listen_dev(input1, "input", input1_input_handler),
					listen_dev(button1, "click", click_handler_2, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*$character, Description*/ 1 && input0.value !== /*$character*/ ctx[0].desc[Description.list[/*index*/ ctx[12] + 2].name.toLowerCase()].value) {
				set_input_value(input0, /*$character*/ ctx[0].desc[Description.list[/*index*/ ctx[12] + 2].name.toLowerCase()].value);
			}

			if (dirty & /*$character, Description*/ 1 && input1.value !== /*$character*/ ctx[0].desc[Description.list[/*index*/ ctx[12] + 3].name.toLowerCase()].value) {
				set_input_value(input1, /*$character*/ ctx[0].desc[Description.list[/*index*/ ctx[12] + 3].name.toLowerCase()].value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(27:2) {#if index % 2 == 0 && index < Description.list.length - 2}",
		ctx
	});

	return block;
}

// (26:1) {#each Description.list as _, index}
function create_each_block(ctx) {
	let if_block_anchor;
	let if_block = /*index*/ ctx[12] % 2 == 0 && /*index*/ ctx[12] < Description.list.length - 2 && create_if_block(ctx);

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
			if (/*index*/ ctx[12] % 2 == 0 && /*index*/ ctx[12] < Description.list.length - 2) if_block.p(ctx, dirty);
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(26:1) {#each Description.list as _, index}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let t0;
	let h1;
	let t1;
	let t2;
	let div2;
	let div1;
	let div0;
	let span;
	let t3;
	let t4;
	let input;
	let t5;
	let button0;
	let t6;
	let t7;
	let t8;
	let div3;
	let button1;
	let t9;
	let t10;
	let button2;
	let t11;
	let mounted;
	let dispose;
	let each_value = Description.list;
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			t0 = space();
			h1 = element("h1");
			t1 = text("Description");
			t2 = space();
			div2 = element("div");
			div1 = element("div");
			div0 = element("div");
			span = element("span");
			t3 = text("Character:");
			t4 = space();
			input = element("input");
			t5 = space();
			button0 = element("button");
			t6 = text("Random");
			t7 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t8 = space();
			div3 = element("div");
			button1 = element("button");
			t9 = text("Reset");
			t10 = space();
			button2 = element("button");
			t11 = text("Random");
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-rcn65z\"]", document.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			h1 = claim_element(nodes, "H1", {});
			var h1_nodes = children(h1);
			t1 = claim_text(h1_nodes, "Description");
			h1_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			div2 = claim_element(nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			span = claim_element(div0_nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			t3 = claim_text(span_nodes, "Character:");
			span_nodes.forEach(detach_dev);
			t4 = claim_space(div0_nodes);
			input = claim_element(div0_nodes, "INPUT", { type: true, class: true });
			t5 = claim_space(div0_nodes);
			button0 = claim_element(div0_nodes, "BUTTON", { class: true });
			var button0_nodes = children(button0);
			t6 = claim_text(button0_nodes, "Random");
			button0_nodes.forEach(detach_dev);
			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			t7 = claim_space(div2_nodes);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(div2_nodes);
			}

			div2_nodes.forEach(detach_dev);
			t8 = claim_space(nodes);
			div3 = claim_element(nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			button1 = claim_element(div3_nodes, "BUTTON", { class: true });
			var button1_nodes = children(button1);
			t9 = claim_text(button1_nodes, "Reset");
			button1_nodes.forEach(detach_dev);
			t10 = claim_space(div3_nodes);
			button2 = claim_element(div3_nodes, "BUTTON", { class: true });
			var button2_nodes = children(button2);
			t11 = claim_text(button2_nodes, "Random");
			button2_nodes.forEach(detach_dev);
			div3_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			document.title = "Apocalyptia Online - Character Creator - Description";
			add_location(h1, file, 16, 0, 452);
			attr_dev(span, "class", "svelte-1gpx4d4");
			add_location(span, file, 20, 3, 565);
			attr_dev(input, "type", "text");
			attr_dev(input, "class", "svelte-1gpx4d4");
			add_location(input, file, 21, 3, 592);
			attr_dev(button0, "class", "svelte-1gpx4d4");
			add_location(button0, file, 22, 3, 655);
			attr_dev(div0, "class", "character-container svelte-1gpx4d4");
			add_location(div0, file, 19, 2, 528);
			attr_dev(div1, "class", "item-block svelte-1gpx4d4");
			add_location(div1, file, 18, 1, 501);
			attr_dev(div2, "class", "section-card");
			add_location(div2, file, 17, 0, 473);
			attr_dev(button1, "class", "small-cntr-btn");
			add_location(button1, file, 45, 1, 1492);
			attr_dev(button2, "class", "small-cntr-btn");
			add_location(button2, file, 46, 1, 1556);
			attr_dev(div3, "class", "btn-row");
			add_location(div3, file, 44, 0, 1469);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, h1, anchor);
			append_dev(h1, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, div2, anchor);
			append_dev(div2, div1);
			append_dev(div1, div0);
			append_dev(div0, span);
			append_dev(span, t3);
			append_dev(div0, t4);
			append_dev(div0, input);
			set_input_value(input, /*$character*/ ctx[0].desc.name.value);
			append_dev(div0, t5);
			append_dev(div0, button0);
			append_dev(button0, t6);
			append_dev(div2, t7);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div2, null);
			}

			insert_dev(target, t8, anchor);
			insert_dev(target, div3, anchor);
			append_dev(div3, button1);
			append_dev(button1, t9);
			append_dev(div3, t10);
			append_dev(div3, button2);
			append_dev(button2, t11);

			if (!mounted) {
				dispose = [
					listen_dev(input, "input", /*input_input_handler*/ ctx[4]),
					listen_dev(button0, "click", /*click_handler*/ ctx[5], false, false, false),
					listen_dev(button1, "click", /*reset*/ ctx[3], false, false, false),
					listen_dev(button2, "click", /*random*/ ctx[2], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*$character*/ 1 && input.value !== /*$character*/ ctx[0].desc.name.value) {
				set_input_value(input, /*$character*/ ctx[0].desc.name.value);
			}

			if (dirty & /*randomDescriptor, $character, Description*/ 3) {
				each_value = Description.list;
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div2, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(h1);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(div2);
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(t8);
			if (detaching) detach_dev(div3);
			mounted = false;
			run_all(dispose);
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
	let $character;
	validate_store(character, "character");
	component_subscribe($$self, character, $$value => $$invalidate(0, $character = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Description", slots, []);
	const randomDescriptor = i => set_store_value(character, $character = Description.list[i].random($character), $character);
	const random = () => set_store_value(character, $character = Description.random($character), $character);
	const reset = () => set_store_value(character, $character = Description.reset($character), $character);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Description> was created with unknown prop '${key}'`);
	});

	function input_input_handler() {
		$character.desc.name.value = this.value;
		character.set($character);
	}

	const click_handler = () => randomDescriptor(1);

	function input0_input_handler(index) {
		$character.desc[Description.list[index + 2].name.toLowerCase()].value = this.value;
		character.set($character);
	}

	const click_handler_1 = index => randomDescriptor(index + 2);

	function input1_input_handler(index) {
		$character.desc[Description.list[index + 3].name.toLowerCase()].value = this.value;
		character.set($character);
	}

	const click_handler_2 = index => randomDescriptor(index + 3);

	$$self.$capture_state = () => ({
		Description,
		character,
		randomDescriptor,
		random,
		reset,
		$character
	});

	return [
		$character,
		randomDescriptor,
		random,
		reset,
		input_input_handler,
		click_handler,
		input0_input_handler,
		click_handler_1,
		input1_input_handler,
		click_handler_2
	];
}

class Description_1 extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Description_1",
			options,
			id: create_fragment.name
		});
	}
}

export default Description_1;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzY3JpcHRpb24uN2QyYTVkN2UuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvY2hhcmFjdGVyL2NyZWF0b3IvZGVzY3JpcHRpb24uc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQ+XG5cdGltcG9ydCBEZXNjcmlwdGlvbiBmcm9tICdydWxlcy9kZXNjcmlwdGlvbi9EZXNjcmlwdGlvbi5qcydcblx0aW1wb3J0IHsgY2hhcmFjdGVyIH0gZnJvbSAnc3RvcmVzL2NoYXJhY3RlclN0b3JlLmpzJ1xuXG5cblx0Y29uc3QgcmFuZG9tRGVzY3JpcHRvciA9IChpKSA9PiAkY2hhcmFjdGVyID0gRGVzY3JpcHRpb24ubGlzdFtpXS5yYW5kb20oJGNoYXJhY3RlcilcblxuXHRjb25zdCByYW5kb20gPSAoKSA9PiAkY2hhcmFjdGVyID0gRGVzY3JpcHRpb24ucmFuZG9tKCRjaGFyYWN0ZXIpXG5cblx0Y29uc3QgcmVzZXQgPSAoKSA9PiAkY2hhcmFjdGVyID0gRGVzY3JpcHRpb24ucmVzZXQoJGNoYXJhY3Rlcilcbjwvc2NyaXB0PlxuXG5cbjxzdmVsdGU6aGVhZD5cblx0PHRpdGxlPkFwb2NhbHlwdGlhIE9ubGluZSAtIENoYXJhY3RlciBDcmVhdG9yIC0gRGVzY3JpcHRpb248L3RpdGxlPlxuPC9zdmVsdGU6aGVhZD5cbjxoMT5EZXNjcmlwdGlvbjwvaDE+XG48ZGl2IGNsYXNzPSdzZWN0aW9uLWNhcmQnPlxuXHQ8ZGl2IGNsYXNzPSdpdGVtLWJsb2NrJz5cblx0XHQ8ZGl2IGNsYXNzPSdjaGFyYWN0ZXItY29udGFpbmVyJz5cblx0XHRcdDxzcGFuPkNoYXJhY3Rlcjo8L3NwYW4+XG5cdFx0XHQ8aW5wdXQgdHlwZT0ndGV4dCcgYmluZDp2YWx1ZT17JGNoYXJhY3Rlci5kZXNjLm5hbWUudmFsdWV9PlxuXHRcdFx0PGJ1dHRvbiBvbjpjbGljaz17KCkgPT4gcmFuZG9tRGVzY3JpcHRvcigxKX0+UmFuZG9tPC9idXR0b24+XG5cdFx0PC9kaXY+XG5cdDwvZGl2PlxuXHR7I2VhY2ggRGVzY3JpcHRpb24ubGlzdCBhcyBfLCBpbmRleH1cblx0XHR7I2lmIGluZGV4ICUgMiA9PSAwICYmIGluZGV4IDwgRGVzY3JpcHRpb24ubGlzdC5sZW5ndGggLSAyfVxuXHRcdFx0PGRpdiBjbGFzcz0naXRlbS1ibG9jayc+XG5cdFx0XHRcdDxkaXYgY2xhc3M9J2l0ZW0tY29udGFpbmVyJz5cblx0XHRcdFx0XHQ8c3Bhbj57RGVzY3JpcHRpb24ubGlzdFtpbmRleCArIDJdLm5hbWV9Ojwvc3Bhbj5cblx0XHRcdFx0XHQ8aW5wdXQgdHlwZT0ndGV4dCcgYmluZDp2YWx1ZT17XG5cdFx0XHRcdFx0XHQkY2hhcmFjdGVyLmRlc2NbRGVzY3JpcHRpb24ubGlzdFtpbmRleCArIDJdLm5hbWUudG9Mb3dlckNhc2UoKV0udmFsdWV9PlxuXHRcdFx0XHRcdDxidXR0b24gb246Y2xpY2s9eygpID0+IHJhbmRvbURlc2NyaXB0b3IoaW5kZXggKyAyKX0+UmFuZG9tPC9idXR0b24+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPSdpdGVtLWNvbnRhaW5lcic+XG5cdFx0XHRcdFx0PHNwYW4+e0Rlc2NyaXB0aW9uLmxpc3RbaW5kZXggKyAzXS5uYW1lfTo8L3NwYW4+XG5cdFx0XHRcdFx0PGlucHV0IHR5cGU9J3RleHQnIGJpbmQ6dmFsdWU9e1xuXHRcdFx0XHRcdFx0JGNoYXJhY3Rlci5kZXNjW0Rlc2NyaXB0aW9uLmxpc3RbaW5kZXggKyAzXS5uYW1lLnRvTG93ZXJDYXNlKCldLnZhbHVlfT5cblx0XHRcdFx0XHQ8YnV0dG9uIG9uOmNsaWNrPXsoKSA9PiByYW5kb21EZXNjcmlwdG9yKGluZGV4ICsgMyl9PlJhbmRvbTwvYnV0dG9uPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdHsvaWZ9XG5cdHsvZWFjaH1cbjwvZGl2PlxuPGRpdiBjbGFzcz0nYnRuLXJvdyc+XG5cdDxidXR0b24gY2xhc3M9J3NtYWxsLWNudHItYnRuJyBvbjpjbGljaz17cmVzZXR9PlJlc2V0PC9idXR0b24+XG5cdDxidXR0b24gY2xhc3M9J3NtYWxsLWNudHItYnRuJyBvbjpjbGljaz17cmFuZG9tfT5SYW5kb208L2J1dHRvbj5cbjwvZGl2PlxuXG5cbjxzdHlsZT5cblx0ZGl2W2NsYXNzKj0nLWNvbnRhaW5lciddIHtcblx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRcdGRpc3BsYXk6IGZsZXg7XG5cdFx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG5cdFx0bWF4LXdpZHRoOiAxMDAlO1xuXHR9XG5cdGRpdltjbGFzcyo9Jy1jb250YWluZXInXSA+IHNwYW4ge1xuXHRcdHRleHQtYWxpZ246IHJpZ2h0O1xuXHR9XG5cdGRpdltjbGFzcyo9Jy1jb250YWluZXInXSA+IHNwYW4sXG5cdC5jaGFyYWN0ZXItY29udGFpbmVyID4gYnV0dG9uLFxuXHQuaXRlbS1jb250YWluZXIgPiBidXR0b24ge1xuXHRcdGZsZXg6IDE7XG5cdH1cblx0ZGl2W2NsYXNzKj0nLWNvbnRhaW5lciddID4gaW5wdXQge1xuXHRcdG1hcmdpbi1sZWZ0OiB2YXIoLS1zMzMpO1xuXHRcdG1hcmdpbi1yaWdodDogdmFyKC0tczMzKTtcblx0fVxuXHQvKiBNT0JJTEUgKi9cblx0QG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5MDBweCkge1xuXHRcdC5pdGVtLWJsb2NrIHtcblx0XHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdFx0d2lkdGg6IDEwMCU7XG5cdFx0XHRtYXgtd2lkdGg6IDEwMCU7XG5cdFx0fVxuXHRcdGRpdltjbGFzcyo9Jy1jb250YWluZXInXSB7XG5cdFx0XHRtYXJnaW46IHZhcigtLXM1MCkgMDtcblx0XHRcdHdpZHRoOiAxMDAlO1xuXHRcdH1cblx0XHQuY2hhcmFjdGVyLWNvbnRhaW5lciA+IGlucHV0W3R5cGU9J3RleHQnXSxcblx0XHQuaXRlbS1jb250YWluZXIgaW5wdXRbdHlwZT0ndGV4dCddIHtcblx0XHRcdGZsZXg6IDI7XG5cdFx0fVxuXHR9XG5cdC8qIERFU0tUT1AgKi9cblx0QG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA5MDBweCkge1xuXHRcdC5pdGVtLWJsb2NrIHtcblx0XHRcdGRpc3BsYXk6IGZsZXg7XG5cdFx0XHRtYXgtd2lkdGg6IDEwMCU7XG5cdFx0fVxuXHRcdGRpdltjbGFzcyo9Jy1jb250YWluZXInXSB7XG5cdFx0XHRtYXJnaW46IHZhcigtLXM1MCk7XG5cdFx0XHR3aWR0aDogMTAwJTtcblx0XHR9XG5cdFx0LmNoYXJhY3Rlci1jb250YWluZXIgPiBpbnB1dFt0eXBlPSd0ZXh0J10ge1xuXHRcdFx0ZmxleDogNlxuXHRcdH1cblx0XHQuaXRlbS1jb250YWluZXIgPiBpbnB1dFt0eXBlPSd0ZXh0J10ge1xuXHRcdFx0ZmxleDogMjtcblx0XHR9XG5cdH1cbjwvc3R5bGU+Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkE2QlksV0FBVyxDQUFDLElBQUksV0FBQyxHQUFLLE9BQUcsQ0FBQyxFQUFFLElBQUk7Ozs7Ozs7Ozs7O2dCQU1oQyxXQUFXLENBQUMsSUFBSSxXQUFDLEdBQUssT0FBRyxDQUFDLEVBQUUsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQ0FKdEMsR0FBVSxJQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxXQUFDLEdBQUssT0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxLQUFLOzs7Ozs7Ozs7OzswQ0FNckUsR0FBVSxJQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxXQUFDLEdBQUssT0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnRkFOckUsR0FBVSxJQUFDLElBQUksQ0FB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