import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_store, c as component_subscribe, a as validate_slots, q as space, y as create_component, z as query_selector_all, k as detach_dev, u as claim_space, A as claim_component, n as insert_dev, B as mount_component, C as transition_out, D as check_outros, E as transition_in, F as destroy_component, G as set_store_value, H as group_outros, p as noop, f as element, t as text, h as claim_element, j as children, r as claim_text, l as attr_dev, m as add_location, w as append_dev, I as listen_dev, J as run_all } from './client.132f4c13.js';
import { B as BackButton } from './BackButton.3e771c53.js';
import { C as Character, c as character } from './characterStore.6e65ffa1.js';
import { C as CharacterSheet } from './CharacterSheet.68e37bce.js';
import './SWBodyguard.54177d3a.js';
import './Thermite.a457c57f.js';
import './BombList.4927c2b7.js';
import './StorageList.71288974.js';
import './AppendToGUUID.176d1458.js';
import './Skills.35c4252b.js';
import './RangedWeaponList.4703ea51.js';
import './GearBlock.42b46b15.js';
import './Specialty.adf26afb.js';
import './ConstitutionSkills.56e093ee.js';
import './RandomRoll.f18d347c.js';
import './Traits.2656d3ca.js';
import './Abilities.5f272c11.js';
import './Speed.66ad8113.js';

/* src/routes/character/index.svelte generated by Svelte v3.29.0 */
const file = "src/routes/character/index.svelte";

// (25:0) {:else}
function create_else_block(ctx) {
	let charactersheet;
	let current;
	charactersheet = new CharacterSheet({ props: { mode: "edit" }, $$inline: true });

	const block = {
		c: function create() {
			create_component(charactersheet.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(charactersheet.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(charactersheet, target, anchor);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(charactersheet.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(charactersheet.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(charactersheet, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(25:0) {:else}",
		ctx
	});

	return block;
}

// (20:0) {#if !$character.meta.user}
function create_if_block(ctx) {
	let div;
	let button0;
	let t0;
	let t1;
	let button1;
	let t2;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div = element("div");
			button0 = element("button");
			t0 = text("New Character");
			t1 = space();
			button1 = element("button");
			t2 = text("Load Character");
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			button0 = claim_element(div_nodes, "BUTTON", { class: true });
			var button0_nodes = children(button0);
			t0 = claim_text(button0_nodes, "New Character");
			button0_nodes.forEach(detach_dev);
			t1 = claim_space(div_nodes);
			button1 = claim_element(div_nodes, "BUTTON", { class: true });
			var button1_nodes = children(button1);
			t2 = claim_text(button1_nodes, "Load Character");
			button1_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(button0, "class", "link-btn");
			add_location(button0, file, 21, 8, 669);
			attr_dev(button1, "class", "link-btn");
			add_location(button1, file, 22, 8, 749);
			attr_dev(div, "class", "cntr-card");
			add_location(div, file, 20, 4, 637);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, button0);
			append_dev(button0, t0);
			append_dev(div, t1);
			append_dev(div, button1);
			append_dev(button1, t2);

			if (!mounted) {
				dispose = [
					listen_dev(button0, "click", /*newCharacter*/ ctx[1], false, false, false),
					listen_dev(button1, "click", /*loadCharacter*/ ctx[2], false, false, false)
				];

				mounted = true;
			}
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(20:0) {#if !$character.meta.user}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let t0;
	let current_block_type_index;
	let if_block;
	let t1;
	let backbutton;
	let current;
	const if_block_creators = [create_if_block, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (!/*$character*/ ctx[0].meta.user) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	backbutton = new BackButton({ props: { path: "/" }, $$inline: true });

	const block = {
		c: function create() {
			t0 = space();
			if_block.c();
			t1 = space();
			create_component(backbutton.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-1jfafm2\"]", document.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			if_block.l(nodes);
			t1 = claim_space(nodes);
			claim_component(backbutton.$$.fragment, nodes);
			this.h();
		},
		h: function hydrate() {
			document.title = "Apocalyptia Online - Character";
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, t1, anchor);
			mount_component(backbutton, target, anchor);
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
				if_block.m(t1.parentNode, t1);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			transition_in(backbutton.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			transition_out(backbutton.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(t1);
			destroy_component(backbutton, detaching);
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
	validate_slots("Character", slots, []);

	const newCharacter = () => {
		set_store_value(character, $character = new Character(), $character);
	}; // window.location.assign(`www.apocalyptiaonline.com/character/new`)

	const loadCharacter = () => {
		
	}; // window.location.assign(`www.apocalyptiaonline.com/character/load`)

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Character> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({
		BackButton,
		Character,
		CharacterSheet,
		character,
		newCharacter,
		loadCharacter,
		$character
	});

	return [$character, newCharacter, loadCharacter];
}

class Character_1 extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Character_1",
			options,
			id: create_fragment.name
		});
	}
}

export default Character_1;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYWIwMzczZDkuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvY2hhcmFjdGVyL2luZGV4LnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxuICAgIGltcG9ydCBCYWNrQnV0dG9uIGZyb20gJ3ZpZXdzL3dpZGdldHMvQmFja0J1dHRvbi5zdmVsdGUnXG4gICAgaW1wb3J0IENoYXJhY3RlciBmcm9tICdydWxlcy9DaGFyYWN0ZXIuanMnXG4gICAgaW1wb3J0IENoYXJhY3RlclNoZWV0IGZyb20gJ3ZpZXdzL2NoYXJhY3Rlci9DaGFyYWN0ZXJTaGVldC5zdmVsdGUnXG4gICAgaW1wb3J0IHsgY2hhcmFjdGVyIH0gZnJvbSAnc3RvcmVzL2NoYXJhY3RlclN0b3JlLmpzJ1xuXG4gICAgY29uc3QgbmV3Q2hhcmFjdGVyID0gKCkgPT4ge1xuICAgICAgICAkY2hhcmFjdGVyID0gbmV3IENoYXJhY3RlcigpXG4gICAgICAgIC8vIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24oYHd3dy5hcG9jYWx5cHRpYW9ubGluZS5jb20vY2hhcmFjdGVyL25ld2ApXG4gICAgfVxuXG4gICAgY29uc3QgbG9hZENoYXJhY3RlciA9ICgpID0+IHtcbiAgICAgICAgLy8gd2luZG93LmxvY2F0aW9uLmFzc2lnbihgd3d3LmFwb2NhbHlwdGlhb25saW5lLmNvbS9jaGFyYWN0ZXIvbG9hZGApXG4gICAgfVxuPC9zY3JpcHQ+XG5cbjxzdmVsdGU6aGVhZD5cblx0PHRpdGxlPkFwb2NhbHlwdGlhIE9ubGluZSAtIENoYXJhY3RlcjwvdGl0bGU+XG48L3N2ZWx0ZTpoZWFkPlxueyNpZiAhJGNoYXJhY3Rlci5tZXRhLnVzZXJ9XG4gICAgPGRpdiBjbGFzcz0nY250ci1jYXJkJz5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz0nbGluay1idG4nIG9uOmNsaWNrPXtuZXdDaGFyYWN0ZXJ9Pk5ldyBDaGFyYWN0ZXI8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz0nbGluay1idG4nIG9uOmNsaWNrPXtsb2FkQ2hhcmFjdGVyfT5Mb2FkIENoYXJhY3RlcjwvYnV0dG9uPlxuICAgIDwvZGl2PlxuezplbHNlfVxuICAgIDxDaGFyYWN0ZXJTaGVldCBtb2RlPXsnZWRpdCd9IC8+XG57L2lmfVxuPEJhY2tCdXR0b24gcGF0aD17Jy8nfSAvPiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzREF5QjBCLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttREFKVyxHQUFZO29EQUNaLEdBQWE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NCQUhsRCxHQUFVLElBQUMsSUFBSSxDQUFDLElBQUk7Ozs7Ozs4Q0FRUixHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BckJYLFlBQVk7NkJBQ2QsVUFBVSxPQUFPLFNBQVM7OztPQUl4QixhQUFhOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=