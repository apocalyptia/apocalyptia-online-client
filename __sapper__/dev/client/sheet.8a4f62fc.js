import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, b as space, x as create_component, q as query_selector_all, h as detach_dev, j as claim_space, y as claim_component, p as insert_dev, z as mount_component, r as noop, C as transition_in, A as transition_out, D as destroy_component } from './client.47a70721.js';
import './characterStore.39c7bd5f.js';
import { C as CharacterSheet } from './CharacterSheet.38361db5.js';
import './SWBodyguard.54177d3a.js';
import './Thermite.a457c57f.js';
import './BombList.4927c2b7.js';
import './StorageList.71288974.js';
import './AppendToGUUID.176d1458.js';
import './Skills.35c4252b.js';
import './RangedWeaponList.4703ea51.js';
import './GearBlock.3671be90.js';
import './Specialty.adf26afb.js';
import './ConstitutionSkills.56e093ee.js';
import './RandomRoll.f18d347c.js';
import './Traits.2656d3ca.js';
import './Abilities.5f272c11.js';
import './Speed.66ad8113.js';

/* src/routes/character/creator/sheet.svelte generated by Svelte v3.29.0 */

function create_fragment(ctx) {
	let t;
	let charactersheet;
	let current;
	charactersheet = new CharacterSheet({ props: { mode: "edit" }, $$inline: true });

	const block = {
		c: function create() {
			t = space();
			create_component(charactersheet.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-6ghlxp\"]", document.head);
			head_nodes.forEach(detach_dev);
			t = claim_space(nodes);
			claim_component(charactersheet.$$.fragment, nodes);
			this.h();
		},
		h: function hydrate() {
			document.title = "Apocalyptia Online - Character Creator - Character Sheet";
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
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
			if (detaching) detach_dev(t);
			destroy_component(charactersheet, detaching);
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
	validate_slots("Sheet", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Sheet> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ CharacterSheet });
	return [];
}

class Sheet extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Sheet",
			options,
			id: create_fragment.name
		});
	}
}

export default Sheet;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hlZXQuOGE0ZjYyZmMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvY2hhcmFjdGVyL2NyZWF0b3Ivc2hlZXQuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQ+XG5cdGltcG9ydCBDaGFyYWN0ZXJTaGVldCBmcm9tICd2aWV3cy9jaGFyYWN0ZXIvQ2hhcmFjdGVyU2hlZXQuc3ZlbHRlJ1xuPC9zY3JpcHQ+XG5cblxuPHN2ZWx0ZTpoZWFkPlxuXHQ8dGl0bGU+QXBvY2FseXB0aWEgT25saW5lIC0gQ2hhcmFjdGVyIENyZWF0b3IgLSBDaGFyYWN0ZXIgU2hlZXQ8L3RpdGxlPlxuPC9zdmVsdGU6aGVhZD5cbjxDaGFyYWN0ZXJTaGVldCBtb2RlPXsnZWRpdCd9IC8+Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzREFRc0IsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
