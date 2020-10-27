'use strict';

var sirv = require('sirv');
var polka = require('polka');
var compression = require('compression');
var fs = require('fs');
var path = require('path');
var Stream = require('stream');
var http = require('http');
var Url = require('url');
var https = require('https');
var zlib = require('zlib');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var sirv__default = /*#__PURE__*/_interopDefaultLegacy(sirv);
var polka__default = /*#__PURE__*/_interopDefaultLegacy(polka);
var compression__default = /*#__PURE__*/_interopDefaultLegacy(compression);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var Stream__default = /*#__PURE__*/_interopDefaultLegacy(Stream);
var http__default = /*#__PURE__*/_interopDefaultLegacy(http);
var Url__default = /*#__PURE__*/_interopDefaultLegacy(Url);
var https__default = /*#__PURE__*/_interopDefaultLegacy(https);
var zlib__default = /*#__PURE__*/_interopDefaultLegacy(zlib);

function noop() { }
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
}
function null_to_empty(value) {
    return value == null ? '' : value;
}
function custom_event(type, detail) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function beforeUpdate(fn) {
    get_current_component().$$.before_update.push(fn);
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail);
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
        }
    };
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
const escaped = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escape(html) {
    return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(parent_component ? parent_component.$$.context : []),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, options = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, options);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    return ` ${name}${value === true ? '' : `=${typeof value === 'string' ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}

/* src/routes/index.svelte generated by Svelte v3.29.4 */

const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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

		if (result.confirmation_token) ; // confirm(result.confirmation_token)
	});

	return `<div class="${"cntr-card"}">
		<a href="${"/character"}" class="${"link-btn"}">Character</a>
		<a href="${"/manual"}" class="${"link-btn"}">Manual</a>
		<a href="${"/generator"}" class="${"link-btn"}">Generator</a>
	</div>`;
});

var component_0 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Routes
});

/* src/components/views/widgets/BackButton.svelte generated by Svelte v3.29.4 */

const css = {
	code: ".back-btn.svelte-1n6knm8{align-items:center;background-color:rgb(15, 30, 15);border:2px solid lime;bottom:0;display:flex;font-size:var(--s150);height:var(--s300);justify-content:center;left:0;position:fixed;text-align:center;width:var(--s300);z-index:1}.back-btn.svelte-1n6knm8:active,.back-btn.svelte-1n6knm8:focus,.back-btn.svelte-1n6knm8:hover{background-color:lime;color:rgba(15, 30, 15, 1)}",
	map: "{\"version\":3,\"file\":\"BackButton.svelte\",\"sources\":[\"BackButton.svelte\"],\"sourcesContent\":[\"<script>\\n    export let path\\n</script>\\n\\n\\n<a href={ path } class='back-btn'>\\n\\t<div class='back-btn'>&#9668;</div>\\n</a>\\n\\n\\n<style>\\n    .back-btn {\\n\\t\\talign-items: center;\\n\\t\\tbackground-color: rgb(15, 30, 15);\\n\\t\\tborder: 2px solid lime;\\n\\t\\tbottom: 0;\\n\\t\\tdisplay: flex;\\n\\t\\tfont-size: var(--s150);\\n\\t\\theight: var(--s300);\\n\\t\\tjustify-content: center;\\n\\t\\tleft: 0;\\n\\t\\tposition: fixed;\\n\\t\\ttext-align: center;\\n\\t\\twidth: var(--s300);\\n\\t\\tz-index: 1;\\n\\t}\\n\\t.back-btn:active,\\n\\t.back-btn:focus,\\n\\t.back-btn:hover {\\n\\t\\tbackground-color: lime;\\n\\t\\tcolor: rgba(15, 30, 15, 1);\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AAWI,SAAS,eAAC,CAAC,AACb,WAAW,CAAE,MAAM,CACnB,gBAAgB,CAAE,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CACjC,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CACtB,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,MAAM,CAAC,CACtB,MAAM,CAAE,IAAI,MAAM,CAAC,CACnB,eAAe,CAAE,MAAM,CACvB,IAAI,CAAE,CAAC,CACP,QAAQ,CAAE,KAAK,CACf,UAAU,CAAE,MAAM,CAClB,KAAK,CAAE,IAAI,MAAM,CAAC,CAClB,OAAO,CAAE,CAAC,AACX,CAAC,AACD,wBAAS,OAAO,CAChB,wBAAS,MAAM,CACf,wBAAS,MAAM,AAAC,CAAC,AAChB,gBAAgB,CAAE,IAAI,CACtB,KAAK,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,AAC3B,CAAC\"}"
};

const BackButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { path } = $$props;
	if ($$props.path === void 0 && $$bindings.path && path !== void 0) $$bindings.path(path);
	$$result.css.add(css);

	return `<a${add_attribute("href", path, 0)} class="${"back-btn svelte-1n6knm8"}"><div class="${"back-btn svelte-1n6knm8"}">◄</div>
</a>`;
});

const chars = [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `a`, `b`, `c`, `d`, `e`, `f`];

const randomChar = (num) => {
	let result = ``;
	for (let i = 0; i < num; i++) {
		result += chars[Math.floor(Math.random() * chars.length)];
	}
	return result
};

var GUUIDGenerator = _ => `${randomChar(8)}-${randomChar(4)}-${randomChar(4)}-${randomChar(4)}-${randomChar(12)}`;

class Character {
	constructor() {
		this.meta = {
			id: GUUIDGenerator(),
			user: ``,
			created: ``,
			modified: ``,
			notes: ``,
			coordinates: {
				map: ``,
				x: 0,
				y: 0
			},
			status: {
				completed: false,
				open: false,
				step: 1,
			}
		},
		this.desc = {
			age: {
				name: `Age`,
				value: ``
			},
			name: {
				name: `Name`,
				value: ``
			},
			hair: {
				name: `Hair`,
				value: ``
			},
			height: {
				name: `Height`,
				value: ``
			},
			sex: {
				name: `Sex`,
				value: ``
			},
			skin: {
				name: `Skin`,
				value: ``
			},
			weight: {
				name: `Weight`,
				value: ``
			}
		},
		this.traits = {
			agility: {
				name: `Agility`,
				score: 1
			},
			brains: {
				name: `Brains`,
				score: 1
			},
			constitution: {
				name: `Constitution`,
				score: 1
			},
			demeanor: {
				name: `Demeanor`,
				score: 1
			}
		},
		this.skills = {
			acrobatics: {
				name: `Acrobatics`,
				score: 0,
				parent: 'Agility'
			},
			larceny: {
				name: `Larceny`,
				score: 0,
				parent: 'Agility'
			},
			ranged: {
				name: `Ranged`,
				score: 0,
				parent: 'Agility'
			},
			stealth: {
				name: `Stealth`,
				score: 0,
				parent: 'Agility'
			},
			medicine: {
				name: `Medicine`,
				score: 0,
				parent: 'Brains'
			},
			perception: {
				name: `Perception`,
				score: 0,
				parent: 'Brains'
			},
			science: {
				name: `Science`,
				score: 0,
				parent: 'Brains'
			},
			survival: {
				name: `Survival`,
				score: 0,
				parent: 'Brains'
			},
			athletics: {
				name: `Athletics`,
				score: 0,
				parent: 'Constitution'
			},
			build: {
				name: `Build`,
				score: 0,
				parent: 'Constitution'
			},
			drive: {
				name: `Drive`,
				score: 0,
				parent: 'Constitution'
			},
			melee: {
				name: `Melee`,
				score: 0,
				parent: 'Constitution'
			},
			leadership: {
				name: `Leadership`,
				score: 0,
				parent: 'Demeanor'
			},
			perform: {
				name: `Perform`,
				score: 0,
				parent: 'Demeanor'
			},
			socialize: {
				name: `Socialize`,
				score: 0,
				parent: 'Demeanor'
			},
			tame: {
				name: `Tame`,
				score: 0,
				parent: 'Demeanor'
			}
		},
		this.props = {
			block: {
				name: `Block`,
				score: 0
			},
			carry: {
				name: `Carry`,
				score: 6,
				current: 0
			},
			dodge: {
				name: `Dodge`,
				score: 0
			},
			experience: {
				name: `Experience`,
				score: 3,
				spent: 0,
				remaining: 3
			},
			intellect: {
				name: `Intellect`,
				score: 1
			},
			luck: {
				name: `Luck`,
				score: 1,
				current: 1
			},
			psyche: {
				name: `Psyche`,
				score: 3,
				current: 3
			},
			speed: {
				name: `Speed`,
				score: 3
			}
		},
		this.health = {
			head: {
				name: `Head`,
				score: 3,
				current: 3
			},
			rightArm: {
				name: `Right Arm`,
				score: 3,
				current: 3
			},
			leftArm: {
				name: `Left Arm`,
				score: 3,
				current: 3
			},
			torso: {
				name: `Torso`,
				score: 6,
				current: 6
			},
			leftLeg: {
				name: `Left Leg`,
				score: 3,
				current: 3
			},
			rightLeg: {
				name: `Right Leg`,
				score: 3,
				current: 3
			},
		},
		this.abilities = [],
		this.gear = {
			armor: {
				name: `Armor`,
				inventory: []
			},
			melee: {
				name: `Melee Weapons`,
				inventory: []
			},
			ranged: {
				name: `Ranged Weapons`,
				inventory: []
			},
			ammo: {
				name: `Ammo`,
				inventory: []
			},
			equipment: {
				name: `Equipment`,
				inventory: []
			},
		};
	}
	finalize(userId) {
		if (!this.created) this.created = new Date();
		this.meta.user = userId;
		this.meta.status.step = 7;
		this.meta.status.completed = true;
		this.meta.modified = new Date();
	}
}

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

const newCharacter = new Character();

const character = writable(newCharacter);

/* src/components/views/character/Abilities.svelte generated by Svelte v3.29.4 */

const Abilities = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $character = get_store_value(character);

	return `<details class="${"sheet-details"}" close><summary class="${"sheet-card-title"}">Abilities
	</summary>
	<div class="${"sheet-card"}"><div class="${"sheet-card-table"}"><div class="${"sheet-card-table-header"}"><span class="${"sheet-item-long-column"}">Name</span>
				<span class="${"sheet-item-short-column"}">XP</span>
				<span class="${"sheet-item-short-column"}">Max</span>
				<span class="${"sheet-item-short-column"}">Taken</span></div>
			${each($character.abilities, ability => `<div class="${"sheet-card-table-row"}"><span class="${"sheet-item-long-column"}">${escape(ability.name)}${escape(ability.opts[0] ? ` (${ability.opts[0].name})` : ``)}</span>
					<span class="${"sheet-item-short-column"}">${escape(ability.xp)}</span>
					<span class="${"sheet-item-short-column"}">${escape(ability.max)}</span>
					<span class="${"sheet-item-short-column"}">${escape(ability.taken)}</span>
				</div>`)}</div></div></details>`;
});

/* src/components/views/character/DeleteCharacterButton.svelte generated by Svelte v3.29.4 */

const DeleteCharacterButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `<button class="${"small-cntr-btn"}">Delete
</button>`;
});

/* src/components/views/character/Description.svelte generated by Svelte v3.29.4 */

const css$1 = {
	code: ".name-block.svelte-w4qo79{align-items:center;display:flex;margin-bottom:var(--s100);padding-bottom:0}.sheet-card-item.svelte-w4qo79{margin-bottom:var(--s50);text-align:right}.sheet-value-long.svelte-w4qo79{width:100%}.sheet-value.svelte-w4qo79{width:45%}",
	map: "{\"version\":3,\"file\":\"Description.svelte\",\"sources\":[\"Description.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport { character } from 'stores/characterStore.js'\\n\\n\\texport let mode\\n</script>\\n\\n\\n<details class='sheet-details' close>\\n\\t<summary class='sheet-card-title'>\\n\\t\\tDescription\\n\\t</summary>\\n\\t<div class='sheet-card'>\\n\\t\\t<div class='name-block'>\\n\\t\\t\\t<span>Character:</span> \\n\\t\\t\\t{#if mode == 'edit'}\\n\\t\\t\\t\\t<input type='text' class='sheet-value-long' bind:value={$character.desc.name.value} />\\n\\t\\t\\t{:else if mode == 'readonly'}\\n\\t\\t\\t\\t<input type='text' class='sheet-value-long' bind:value={$character.desc.name.value} readonly />\\n\\t\\t\\t{/if}\\n\\t\\t</div>\\n\\t\\t<div class='sheet-card-body'>\\n\\t\\t\\t<div class='sheet-card-block'>\\n\\t\\t\\t\\t<div class='sheet-card-item'>\\n\\t\\t\\t\\t\\t<span>Age:</span> \\n\\t\\t\\t\\t\\t{#if mode == 'edit'}\\n\\t\\t\\t\\t\\t\\t<input type='text' class='sheet-value' bind:value={$character.desc.age.value} />\\n\\t\\t\\t\\t\\t{:else if mode == 'readonly'}\\n\\t\\t\\t\\t\\t\\t<input type='text' class='sheet-value' bind:value={$character.desc.age.value} readonly />\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class='sheet-card-item'>\\n\\t\\t\\t\\t\\t<span>Height:</span> \\n\\t\\t\\t\\t\\t{#if mode == 'edit'}\\n\\t\\t\\t\\t\\t\\t<input type='text' class='sheet-value' bind:value={$character.desc.height.value} />\\n\\t\\t\\t\\t\\t{:else if mode == 'readonly'}\\n\\t\\t\\t\\t\\t\\t<input type='text' class='sheet-value' bind:value={$character.desc.height.value} readonly />\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class='sheet-card-item'>\\n\\t\\t\\t\\t\\t<span>Weight:</span> \\n\\t\\t\\t\\t\\t{#if mode == 'edit'}\\n\\t\\t\\t\\t\\t\\t<input type='text' class='sheet-value' bind:value={$character.desc.weight.value} />\\n\\t\\t\\t\\t\\t{:else if mode == 'readonly'}\\n\\t\\t\\t\\t\\t\\t<input type='text' class='sheet-value' bind:value={$character.desc.weight.value} readonly />\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class='sheet-card-block'>\\n\\t\\t\\t\\t<div class='sheet-card-item'>\\n\\t\\t\\t\\t\\t<span>Sex:</span>\\n\\t\\t\\t\\t\\t{#if mode == 'edit'}\\n\\t\\t\\t\\t\\t\\t<input type='text' class='sheet-value' bind:value={$character.desc.sex.value} />\\n\\t\\t\\t\\t\\t{:else if mode == 'readonly'}\\n\\t\\t\\t\\t\\t\\t<input type='text' class='sheet-value' bind:value={$character.desc.sex.value} readonly />\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class='sheet-card-item'>\\n\\t\\t\\t\\t\\t<span>Skin:</span>\\n\\t\\t\\t\\t\\t{#if mode == 'edit'}\\n\\t\\t\\t\\t\\t\\t<input type='text' class='sheet-value' bind:value={$character.desc.skin.value} />\\n\\t\\t\\t\\t\\t{:else if mode == 'readonly'}\\n\\t\\t\\t\\t\\t\\t<input type='text' class='sheet-value' bind:value={$character.desc.skin.value} readonly />\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class='sheet-card-item'>\\n\\t\\t\\t\\t\\t<span>Hair:</span>\\n\\t\\t\\t\\t\\t{#if mode == 'edit'}\\n\\t\\t\\t\\t\\t\\t<input type='text' class='sheet-value' bind:value={$character.desc.hair.value} />\\n\\t\\t\\t\\t\\t{:else if mode == 'readonly'}\\n\\t\\t\\t\\t\\t\\t<input type='text' class='sheet-value' bind:value={$character.desc.hair.value} readonly />\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t</div>\\n</details>\\n\\n\\n<style>\\n\\t.name-block {\\n\\t\\talign-items: center;\\n\\t\\tdisplay: flex;\\n\\t\\tmargin-bottom: var(--s100);\\n\\t\\tpadding-bottom: 0;\\n\\t}\\n\\t.sheet-card-item {\\n\\t\\tmargin-bottom: var(--s50);\\n\\t\\ttext-align: right;\\n\\t}\\n\\t.sheet-value-long {\\n\\t\\twidth: 100%;\\n\\t}\\n\\t.sheet-value {\\n\\t\\twidth: 45%;\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AA+EC,WAAW,cAAC,CAAC,AACZ,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,IAAI,MAAM,CAAC,CAC1B,cAAc,CAAE,CAAC,AAClB,CAAC,AACD,gBAAgB,cAAC,CAAC,AACjB,aAAa,CAAE,IAAI,KAAK,CAAC,CACzB,UAAU,CAAE,KAAK,AAClB,CAAC,AACD,iBAAiB,cAAC,CAAC,AAClB,KAAK,CAAE,IAAI,AACZ,CAAC,AACD,YAAY,cAAC,CAAC,AACb,KAAK,CAAE,GAAG,AACX,CAAC\"}"
};

const Description = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $character = get_store_value(character);
	let { mode } = $$props;
	if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0) $$bindings.mode(mode);
	$$result.css.add(css$1);

	return `<details class="${"sheet-details"}" close><summary class="${"sheet-card-title"}">Description
	</summary>
	<div class="${"sheet-card"}"><div class="${"name-block svelte-w4qo79"}"><span>Character:</span> 
			${mode == "edit"
	? `<input type="${"text"}" class="${"sheet-value-long svelte-w4qo79"}"${add_attribute("value", $character.desc.name.value, 1)}>`
	: `${mode == "readonly"
		? `<input type="${"text"}" class="${"sheet-value-long svelte-w4qo79"}" readonly${add_attribute("value", $character.desc.name.value, 1)}>`
		: ``}`}</div>
		<div class="${"sheet-card-body"}"><div class="${"sheet-card-block"}"><div class="${"sheet-card-item svelte-w4qo79"}"><span>Age:</span> 
					${mode == "edit"
	? `<input type="${"text"}" class="${"sheet-value svelte-w4qo79"}"${add_attribute("value", $character.desc.age.value, 1)}>`
	: `${mode == "readonly"
		? `<input type="${"text"}" class="${"sheet-value svelte-w4qo79"}" readonly${add_attribute("value", $character.desc.age.value, 1)}>`
		: ``}`}</div>
				<div class="${"sheet-card-item svelte-w4qo79"}"><span>Height:</span> 
					${mode == "edit"
	? `<input type="${"text"}" class="${"sheet-value svelte-w4qo79"}"${add_attribute("value", $character.desc.height.value, 1)}>`
	: `${mode == "readonly"
		? `<input type="${"text"}" class="${"sheet-value svelte-w4qo79"}" readonly${add_attribute("value", $character.desc.height.value, 1)}>`
		: ``}`}</div>
				<div class="${"sheet-card-item svelte-w4qo79"}"><span>Weight:</span> 
					${mode == "edit"
	? `<input type="${"text"}" class="${"sheet-value svelte-w4qo79"}"${add_attribute("value", $character.desc.weight.value, 1)}>`
	: `${mode == "readonly"
		? `<input type="${"text"}" class="${"sheet-value svelte-w4qo79"}" readonly${add_attribute("value", $character.desc.weight.value, 1)}>`
		: ``}`}</div></div>
			<div class="${"sheet-card-block"}"><div class="${"sheet-card-item svelte-w4qo79"}"><span>Sex:</span>
					${mode == "edit"
	? `<input type="${"text"}" class="${"sheet-value svelte-w4qo79"}"${add_attribute("value", $character.desc.sex.value, 1)}>`
	: `${mode == "readonly"
		? `<input type="${"text"}" class="${"sheet-value svelte-w4qo79"}" readonly${add_attribute("value", $character.desc.sex.value, 1)}>`
		: ``}`}</div>
				<div class="${"sheet-card-item svelte-w4qo79"}"><span>Skin:</span>
					${mode == "edit"
	? `<input type="${"text"}" class="${"sheet-value svelte-w4qo79"}"${add_attribute("value", $character.desc.skin.value, 1)}>`
	: `${mode == "readonly"
		? `<input type="${"text"}" class="${"sheet-value svelte-w4qo79"}" readonly${add_attribute("value", $character.desc.skin.value, 1)}>`
		: ``}`}</div>
				<div class="${"sheet-card-item svelte-w4qo79"}"><span>Hair:</span>
					${mode == "edit"
	? `<input type="${"text"}" class="${"sheet-value svelte-w4qo79"}"${add_attribute("value", $character.desc.hair.value, 1)}>`
	: `${mode == "readonly"
		? `<input type="${"text"}" class="${"sheet-value svelte-w4qo79"}" readonly${add_attribute("value", $character.desc.hair.value, 1)}>`
		: ``}`}</div></div></div></div>
</details>`;
});

class Rule {
	constructor({
		id = null,
		name=``,
		desc=[],
		formula,
		visible=false
	}) {
		this.id = id;
		this.name = name;
		this.desc = desc;
		this.formula = formula;
		this.visible = visible;
	}
}

class Gear extends Rule {
	constructor({
		id,
		name,
		desc,
		attr=[],
		qty=0,
		sz=0,
		type='Gear'
	}) {
		super({
			id,
			name,
			desc
		});
		this.attr = attr;
		this.qty = qty;
		this.sz = sz;
		this.type = type;
	}
}

const Bayonet = new Gear({
	id: `4e4e24f4-8b09-4a85-9170-df4e5125cec2`,
	name: `Bayonet`,
	desc: [
		`Counts as a Knife.`,
		`+1 Damage and Pierce for Melee Attacks.`,
	],
	sz: 1
});

const Bipod = new Gear({
	id: `aa0725d4-1da0-43f9-aa0f-37c85bb1ec22`,
	name: `Bipod`,
	desc: [
		`Ignore Size requirement.`,
		`1 round setup.`,
	],
	sz: 1
});

const DrumMagazine = new Gear({
	id: `2b2d6588-dd7b-47ec-a3f0-c574ae063bda`,
	name: `Drum Magazine`,
	desc: [
		`Gun specific.`,
		`3x Ammo magazine capacity.`,
	],
	sz: 1
});

const Foregrip = new Gear({
	id: `9e794d01-39c2-4c64-b6aa-6afef904ae08`,
	name: `Foregrip`,
	desc: [
		`-1 Size requirement for 2h Gun.`,
	],
	sz: 0
});

const Holosight = new Gear({
	id: `a0309955-3f7d-4f93-9b5e-8239dd1371db`,
	name: `Holosight`,
	desc: [
		`+1 Ranged Attack.`,
	],
	sz: 0
});
Holosight.dur = 28800;

const Laser = new Gear({
	id: `03f0ef12-bcc9-43de-aa5a-3e9cfaa51025`,
	name: `Laser`,
	desc: [
		`+1 Ranged Attack.`,
		`-6 Ranged Attack to Blind for d6 rounds.`,
	],
	sz: 0
});
Laser.dur = 14400;

const Scope = new Gear({
	id: `a17b2aba-5933-4de3-b351-176d5c54ed2b`,
	name: `Scope`,
	desc: [
		`+3 Aimed Ranged Attacks and Perception(See).`,
	],
	sz: 1
});

const SinglePointSling = new Gear({
	id: `2baca903-28be-44a0-bfcc-5a78ab4ebf40`,
	name: `Single-Point Sling`,
	desc: [
		`Draw or stow a 2h Gun without using an Action.`,
	],
	sz: 0
});

const Suppressor = new Gear({
	id: `1b1419c3-48fd-40a5-9ad7-4279f9b6d1dc`,
	name: `Suppressor`,
	desc: [
		`Firing a Gun does not break Concealment.`,
	],
	sz: 0
});

var AccessoryList = [
	Bayonet,
	Bipod,
	DrumMagazine,
	Foregrip,
	Holosight,
	Laser,
	Scope,
	SinglePointSling,
	Suppressor,
];

const Broadhead = new Rule({
	id: `f505bab5-8584-461d-067a-ac0f45cc4eb3`,
	name: `Broadhead`,
	desc: [
		`+1 Damage.`,
	]
});

const Pierce = new Rule({
	id: `f6f168a6-d4cc-4780-19b8-0da4803bcc14`,
	name: `Pierce`,
	desc: [
		`+1 Damage to Body Parts with Armor.`,
	]
});

const ArrowBroadhead = new Gear({
	id: `b157becd-2144-4e55-9e3b-be88089ec6fe`,
	name: `Broadhead Arrow`,
	desc: [
		`Hunting arrow.`,
	],
	sz: 0.1,
	attr: [
		Broadhead,
		Pierce,
	],
});
ArrowBroadhead.cal = `Arrow`;

const ArrowTarget = new Gear({
	id: `f05595e3-0e2c-42fb-82b0-2e46dd2fd43f`,
	name: `Target Arrow`,
	desc: [
		`Practice arrow.`,
	],
	sz: 0.1
});
ArrowTarget.cal = `Arrow`;

var AmmoArrowList = [
	ArrowBroadhead,
	ArrowTarget,
];

const HollowPoint = new Rule({
	id: `993005af-9d1a-440a-6b22-501ba1eafb28`,
	name: `Hollow Point`,
	desc: [
		`+1 Damage.`,
	]
});

const HollowPoint22 = new Gear({
	id: `af1d4448-b795-4340-b1d6-2eeb601eeea7`,
	name: `.22 Hollow Point`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: .005,
	attr: [
		HollowPoint,
	],
});
HollowPoint22.cal = `.22`;

const Match = new Rule({
	id: `b45dcd31-3da4-45a9-1bbf-f9132373bcf8`,
	name: `Match`,
	desc: [
		`+1 Ranged Attack.`,
	]
});

const Match22 = new Gear({
	id: `abcff657-e505-4981-ad07-8a4d5ff0fcee`,
	name: `.22 Match`,
	desc: [
		`Competition-grade ammunition.`,
	],
	sz: 0.005,
	attr: [
		Match,
	],
});
Match22.cal = `.22`;

const Standard22 = new Gear({
	id: `4c09000b-23fd-4085-a49f-d16f14367ea0`,
	name: `.22 Standard`,
	desc: [
		`Basic ammunition.`,
	],
	sz: 0.005
});
Standard22.cal = `.22`;

var Ammo22List = [
	HollowPoint22,
	Match22,
	Standard22,
];

const HollowPoint9mm = new Gear({
	id: `2ae93589-3bd7-4abf-a6a1-153bd1b4e7ed`,
	name: `9mm Hollow Point`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: 0.01,
	attr: [
		HollowPoint,
	]
});
HollowPoint9mm.cal = `9mm`;

const Match9mm = new Gear({
	id: `dcfa9f26-6c02-4646-b369-ff8ba26246da`,
	name: `9mm Match`,
	desc: [
		`Competition-grade ammunition.`,
	],
	sz: 0.01,
	attr: [
		Match,
	]
});
Match9mm.cal = `9mm`;

const Standard9mm = new Gear({
	id: `552009c4-d6a9-4287-ac4f-598014adbbba`,
	name: `9mm Standard`,
	desc: [
		`Basic ammunition.`,
	],
	sz: 0.01
});
Standard9mm.cal = `9mm`;

var Ammo9mmList = [
	HollowPoint9mm,
	Match9mm,
	Standard9mm,
];

const HollowPoint357 = new Gear({
	id: `798c6783-f44b-447f-9f9b-8332bd4ab74e`,
	name: `.357 Hollow Point`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: 0.01,
	attr: [
		HollowPoint,
	]
});
HollowPoint357.cal = `.357`;

const Standard357 = new Gear({
	id: `4266c19a-2978-4d12-88b9-d05ef59c9620`,
	name: `.357 Standard`,
	desc: [
		`Basic ammunition.`,
	],
	sz: 0.01
});
Standard357.cal = `.357`;

var Ammo357List = [
	HollowPoint357,
	Standard357,
];

const ArmorPiercing556 = new Gear({
	id: `c911b821-137b-4e08-8685-84d82c854b69`,
	name: `5.56mm Armor Piercing`,
	desc: [
		`Battlefield ammunition.`,
	],
	sz: 0.02,
	attr: [
		Pierce,
	]
});
ArmorPiercing556.cal = `5.56`;

const HollowPoint556 = new Gear({
	id: `f6f0b22f-df8c-4604-ae1e-1f381ea60e4a`,
	name: `5.56mm Hollow Point`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: 0.02,
	attr: [
		HollowPoint,
	]
});
HollowPoint556.cal = `5.56`;

const Match556 = new Gear({
	id: `5bd2b42f-78bb-4b7a-a4c1-86ba01caddd0`,
	name: `5.56mm Match`,
	desc: [
		`Competition-grade ammunition.`,
	],
	sz: 0.02,
	attr: [
		Match,
	]
});
Match556.cal = `5.56`;

const Standard556 = new Gear({
	id: `2e3ef39f-b6f8-4d79-b2f6-a73186f0fa6c`,
	name: `5.56mm Standard`,
	desc: [
		`Basic ammunition.`,
	],
	sz: 0.02
});
Standard556.cal = `5.56`;

var Ammo556List = [
	ArmorPiercing556,
	HollowPoint556,
	Match556,
	Standard556,
];

const ArmorPiercing308 = new Gear({
	id: `08f1864b-66cf-4d61-be54-4139b4242c02`,
	name: `.308 Armor Piercing`,
	desc: [
		`Battlefield ammunition.`,
	],
	sz: 0.02,
	attr: [
		Pierce,
	]
});
ArmorPiercing308.cal = `.308`;

const HollowPoint308 = new Gear({
	id: `d9ef6e71-5f4c-4372-a1fb-70ad48637276`,
	name: `.308 Hollow Point`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: 0.02,
	attr: [
		HollowPoint,
	]
});
HollowPoint308.cal = `.308`;

const Match308 = new Gear({
	id: `fd9887fc-ffa3-4d7d-9984-f9d18eeaa0bf`,
	name: `.308 Match`,
	desc: [
		`Competition-grade ammunition.`,
	],
	sz: 0.02,
	attr: [
		Match,
	]
});
Match308.cal = `.308`;

const Standard308 = new Gear({
	id: `ee9e5c28-98bd-4dcd-b531-a0dc2086f551`,
	name: `.308 Standard`,
	desc: [
		`Basic ammunition.`,
	],
	sz: 0.02
});
Standard308.cal = `.308`;

var Ammo308List = [
	ArmorPiercing308,
	HollowPoint308,
	Match308,
	Standard308,
];

const Scatter = new Rule({
	id: `b59d0456-6b50-466d-1a78-d5446739da0b`,
	name: `Scatter`,
	desc: [
		`Ignore Range penalties.`,
		`-1 Damage per extended Range.`,
	]
});

const Buckshot12g = new Gear({
	id: `facd4679-38bc-4a4d-9da9-8dda5d569094`,
	name: `12g Buckshot`,
	desc: [
		`Scatter-shot ammunition.`,
	],
	sz: 0.05,
	attr: [
		Scatter,
	]
});
Buckshot12g.cal = `12g`;

const Slug = new Rule({
	id: `0563870a-9302-4825-579c-c28cfb478c90`,
	name: `Slug`,
	desc: [
		`Range x2.`,
	]
});

const Slug12g = new Gear({
	id: `3d42c43d-4507-4c35-9bcf-88fee3cdb943`,
	name: `12g Slug`,
	desc: [
		`Single-projectile ammunition.`,
	],
	sz: 0.05,
	attr: [
		Slug,
	]
});
Slug12g.cal = `12g`;

var Ammo12gList = [
	Buckshot12g,
	Slug12g,
];

var AmmoList = [
	...AmmoArrowList,
	...Ammo22List,
	...Ammo9mmList,
	...Ammo357List,
	...Ammo556List,
	...Ammo308List,
	...Ammo12gList,
];


// OLD AMMO
// new Gear(`.22`,	 `Tracer`,			`+1 Auto RAttack.`,.005),
// new Gear(`12g`,	 `Birdshot`,		  `Basic ammo. Scatter.`,.05),
// new Gear(`12g`,	 `Flare`,			 `3 Fire Damage/round for 3 rounds. 50yd light radius.`,.05),
// new Gear(`12g`,	 `Rubber`,			`Blunt.`,.05),
// new Gear(`5.56`,	`Tracer`,			`+1 Auto RATK.`,.02),

const AthleticHelmet = new Gear({
	id: `d6861b08-b92a-468d-a929-410c130b2a2d`,
	name: `Athletic Helmet`,
	sz: 2,
	type: `Armor`
});
AthleticHelmet.dr = 1;
AthleticHelmet.loc = `Head`;

const AthleticPads = new Gear({
	id: `799b9afa-d54b-4c9e-9cf8-f498be18b1c0`,
	name: `Athletic Pads`,
	sz: 2,
	type: `Armor`
});
AthleticPads.dr = 1;
AthleticPads.loc = `Torso`;

const Camo = new Rule({
	id: `e492e043-fcc0-49ed-262f-01b4c60208ad`,
	name: `Camo`,
	desc: [
		`+1 Stealth per Body Part when in a given Biome.`,
	]
});

const FireResistance = new Rule({
	id: `a9c9954a-2803-45d0-4a65-257a521db481`,
	name: `Fire Resistance`,
	desc: [
		`Armor Damage Resistance reduces Fire Damage.`,
	]
});

const CombatHelmet = new Gear({
	id: `6b26c241-5fef-463f-bfc6-cadab2281711`,
	name: `Combat Helmet`,
	sz: 2,
	attr: [
		Camo,
		FireResistance,
	],
	type: `Armor`
});
CombatHelmet.dr = 3;
CombatHelmet.loc = `Head`;

const ColdResistance = new Rule({
	id: `f2fa3f07-b7ac-4c7b-fb22-2baf6f39f8cb`,
	name: `Cold Resistance`,
	desc: [
		`Delay Hypothermia for 1hr per Body Part.`,
	]
});

const Coveralls = new Gear({
	id: `71ede3ad-c8a7-4556-86f1-c4037244757e`,
	name: `Coveralls`,
	sz: 3,
	attr: [
		Camo,
		ColdResistance,
	],
	type: `Armor`
});
Coveralls.dr = 1;
Coveralls.loc = `Arms, Torso, Legs`;

const Mask = new Rule({
	id: `5bd4ae85-eeaf-4031-8a8c-e0e712f6a236`,
	name: `Mask`,
	desc: [
		`Obscures identity and protects face. -1 Perception.`,
	]
});

const FirefighterSuit = new Gear({
	id: `eefc5c02-3139-42cd-b5f9-fe055a915098`,
	name: `Firefighter Suit`,
	sz: 5,
	attr: [
		ColdResistance,
		FireResistance,
		Mask,
	],
	type: `Armor`
});
FirefighterSuit.dr = 2;
FirefighterSuit.loc = `Full Body`;

const FlakJacket = new Gear({
	id: `31e3f366-1adf-4141-912d-0664c5644430`,
	name: `Flak Jacket`,
	sz: 4,
	attr: [
		Camo,
	],
	type: `Armor`
});
FlakJacket.dr = 2;
FlakJacket.loc = `Torso`;

const GhillieSuit = new Gear({
	id: `6ec3af0b-27c8-4dde-b8b5-05a51633241b`,
	name: `Ghillie Suit`,
	sz: 4,
	attr: [
		Camo,
		ColdResistance,
	],
	type: `Armor`
});
GhillieSuit.dr = 1;
GhillieSuit.loc = `Full Body`;

const Impermeable = new Rule({
	id: `cc89a67e-746f-48db-2466-c5f2d6bf5378`,
	name: `Impermeable`,
	desc: [
		`Automatic Success to resist exposure to Diseases and Toxins.`,
	]
});

const HazmatSuit = new Gear({
	id: `6f6e31ff-67fa-4d25-9652-8541c3fabc0c`,
	name: `Hazmat Suit`,
	sz: 2,
	attr: [
		Impermeable,
		Mask,
	],
	type: `Armor`
});
HazmatSuit.dr = 0;
HazmatSuit.loc = `Full Body`;

const HikingBoots = new Gear({
	id: `5cd1e496-431f-4eff-bd34-5e2b74ef06e9`,
	name: `Hiking Boots`,
	sz: 2,
	attr: [
		ColdResistance,
		FireResistance,
	],
	type: `Armor`
});
HikingBoots.dr = 1;
HikingBoots.loc = `Legs`;

const KevlarVest = new Gear({
	id: `a4d0d99a-3546-4805-912c-4ffb2fbe0c85`,
	name: `Kevlar Vest`,
	sz: 4,
	attr: [
		ColdResistance,
		FireResistance,
	],
	type: `Armor`
});
KevlarVest.dr = 3;
KevlarVest.loc = `Torso`;

const LeatherJacket = new Gear({
	id: `cf560d38-9a41-40c8-9f14-f7839a3ecf82`,
	name: `Leather Jacket`,
	sz: 2,
	type: `Armor`
});
LeatherJacket.dr = 1;
LeatherJacket.loc = `Arms, Torso`;

const MotorcycleHelmet = new Gear({
	id: `9b54d7fd-c70c-4b97-b471-eff6477622d3`,
	name: `Motorcycle Helmet`,
	sz: 2,
	attr: [
		FireResistance,
		Mask,
	],
	type: `Armor`
});
MotorcycleHelmet.dr = 1;
MotorcycleHelmet.loc = `Head`;

const PlateCarrier = new Gear({
	id: `6734c9c6-d9b0-4e3d-b455-6db395645014`,
	name: `Plate Carrier`,
	sz: 4,
	attr: [
		Camo,
		ColdResistance,
		FireResistance,
	],
	type: `Armor`
});
PlateCarrier.dr = 4;
PlateCarrier.loc = `Torso`;

const WinterCoat = new Gear({
	id: `102e1133-3242-4a89-9658-e58aa5636e45`,
	name: `Winter Coat`,
	sz: 2,
	attr: [
		ColdResistance,
	],
	type: `Armor`
});
WinterCoat.dr = 1;
WinterCoat.loc = `Arms, Torso`;

const WorkGloves = new Gear({
	id: `05dbfaf0-40aa-498e-a19e-d57bcdd1d6b7`,
	name: `Work Gloves`,
	sz: 1,
	attr: [
		FireResistance,
	],
	type: `Armor`
});
WorkGloves.dr = 1;
WorkGloves.loc = `Arms`;

var ArmorList = [
	AthleticHelmet,
	AthleticPads,
	CombatHelmet,
	Coveralls,
	FirefighterSuit,
	FlakJacket,
	GhillieSuit,
	HikingBoots,
	KevlarVest,
	LeatherJacket,
	MotorcycleHelmet,
	HazmatSuit,
	PlateCarrier,
	WinterCoat,
	WorkGloves,
];



// OLD ARMOR
// new Armor(`Denim Jacket`, `1,1`, `Arms, Torso`, ``, 2)
// new Armor(`Interceptor Armor`, `3,6`, `Arms, Torso`, `Camo. Cold Resistance. Fire Resistance.`, 5)
// new Armor(`Kevlar Gloves`, `2`, `Arms`, `Fire Resistance.`, 1)
// new Armor(`Knee Pads`, `1`, `Legs`, ``, 1)
// new Armor(`Paintball Mask`, `1`, `Head`, `Mask.`, 1)
// new Armor(`Riot Helmet`, `4`, `Head`, `Fire Resistance. Mask.`, 2)
// new Armor(`Steel-Toe Boots`, `2`, `Legs`, `Blunt. Fire Resistance. Kick 3BDMG`, 2)
// new Armor(`Tactical Vest`, `1`, `Torso`, `6 Storage.`, 1)
// new Armor(`Undercover Vest`, `3`, `Torso`, `Fire Resistance.`, 3)

// RARE ARMOR
// new Armor(`Black Robe`, `1,1,1,1`, `Head, Torso, Arms, Legs`, `Cold Resistance. +1 Stealth.`, 1)
// new Armor(`Chainmail Shirt`, `3,3,3`, `Head, Torso, Arms`, `Ignore Chop.`, 6)
// new Armor(`Dragonskin Vest`, `8`, `Torso`, `Cold Resistance. Fire Resistance.`, 3)
// new Armor(`Knuckle Gloves`, `2`, `Arms`, `2DMG Punch. Blunt. Fire Resistance.`, 1)
// new Armor(`Land Warrior Helmet`, `4`, `Head`, `Fire Resistance. Nightvision Goggles. Radio.`, 2)
// new Armor(`Spiked Jacket`, `2, 2`, `Torso, Arms`, `+1 DMG Grab.`, 3)

const Blind = new Rule({
	id: `5fb3123f-b7f0-4e09-acfb-10ed93b675a8`,
	name: `Blind`,
	desc: [
		`You are considered to be Defenseless.`,
		`You automatically Fail any Perception roll that involves seeing.`,
		`You have a -6 penalty to all other rolls that involve seeing.`,
		`This includes Attacks, in which case all opponents are considered to be Concealed from you.`,
	]
});

const Stun = new Rule({
	id: `ba6cf397-b434-442f-a725-73ee00cf23ca`,
	name: `Stun`,
	desc: [
		`Defenseless, Harmless, and Immobilized.`,
		`You fall Prone if Stunned for longer than 1 round.`,
	]
});

const FlashbangGrenade = new Gear({
	id: `f158de9a-ef27-4c24-9d38-6a2f665c941e`,
	name: `Flashbang Grenade`,
	desc: [
		`Non-lethal stun grenade.`,
	],
	sz: 1,
	attr: [
		Blind,
		Stun,
	]
});
FlashbangGrenade.dmg = 0;
FlashbangGrenade.rng = 6;
FlashbangGrenade.fuse = 2;
FlashbangGrenade.dur = `1d6`;
FlashbangGrenade.mix = 9;

const Blast = new Rule({
	id: `e0084114-b6d8-49fa-7b0f-d550d69e0590`,
	name: `Blast`,
	desc: [
		`Roll [d6 vs Reflexive Dodge] against everyone in the Blast radius.`,
		`[Damage / 2] on a miss (minimum 1).`,
	]
});

const FragGrenade = new Gear({
	id: `e3a9114f-49c8-4984-89ff-54872d56ccda`,
	name: `Frag Grenade`,
	desc: [
		`Explosive fragmentation grenade.`,
	],
	sz: 1,
	attr: [
		Blast,
		Pierce,
	]
});
FragGrenade.dmg = `3d6`;
FragGrenade.rng = 15;
FragGrenade.fuse = 2;
FragGrenade.dur = 1;
FragGrenade.mix = 9;

const FireDamage = new Rule({
	id: `62050739-7de6-4a45-6336-fcca96340629`,
	name: `Fire Damage`,
	desc: [
		`Fire Damage can only be prevented with Fire Resistant Armor.`,
	]
});

const MolotovCocktail = new Gear({
	id: `1b954e5d-fed1-4df7-905a-aed3fa9d2eec`,
	name: `Molotov Cocktail`,
	desc: [
		`Glass bottle of fuel with rag wick.`,
	],
	sz: 1,
	attr: [
		Blast,
		FireDamage,
	]
});
MolotovCocktail.dmg = `1d6`;
MolotovCocktail.rng = 3;
MolotovCocktail.fuse = 10;
MolotovCocktail.dur = 20;
MolotovCocktail.mix = 3;

const SmokeGrenade = new Gear({
	id: `aacd8692-39c0-4be9-b0cf-342d9ea24761`,
	name: `Smoke Grenade`, 
	desc: [
		`Visibility denial grenade.`,
	],
	sz: 1,
	attr: [
		Blind,
	]
});
SmokeGrenade.dmg = 0;
SmokeGrenade.rng = `1yd/rnd`;
SmokeGrenade.fuse = 2;
SmokeGrenade.dur = `1d6mins`;
SmokeGrenade.mix = 6;

const Asphyxiation = new Rule({
	id: `b3c3fa84-e24d-4112-82ff-7c346a207e47`,
	name: `Asphyxiation`,
	desc: [
		`Constant air supply is required.`,
		`1 Pain per minute without air.`,
		`This penalty is reduced by 1 per minute with air.`,
		`Going without air for a number of minutes = [Constitution] is lethal.`,
	]
});

const TeargasGrenade = new Gear({
	id: `892817b8-625f-4ef8-a6be-08716a6267c5`,
	name: `Teargas Grenade`,
	desc: [
		`Non-lethal chemical irritant grenade.`,
	],
	sz: 1,
	attr: [
		Blind,
		Stun,
		Asphyxiation,
	]
});
TeargasGrenade.dmg = 1;
TeargasGrenade.rng = `1yd/rnd`;
TeargasGrenade.fuse = 2;
TeargasGrenade.dur = `1d6mins`;
TeargasGrenade.mix = 15;

const Thermite = new Gear({
	id: `8d6aec56-bb21-4c12-a760-1dbb8d41e8cd`,
	name: `Thermite`,
	desc: [
		`High-temperature incendiary bomb.`,
	],
	sz: 1,
	attr: [
		Blast,
		FireDamage,
	]
});
Thermite.dmg = `6d6`;
Thermite.rng = 1;
Thermite.fuse = 2;
Thermite.dur = 6;
Thermite.mix = 6;

var BombList = [
	FlashbangGrenade,
	FragGrenade,
	MolotovCocktail,
	SmokeGrenade,
	TeargasGrenade,
	Thermite,
];



// OLD BOMBS
// new Gear(`Chlorine`,	18, `toxin`,	`1yd/round`,  `d6+3mins`, `Blind. Asphyxiation x2. Stun.`, 1)
// new Gear(`Claymore`,	18, `d6x9`,	 `30yd`,	 `instant`,  `30yd 90° Blast. Loud.`,		2)
// new Gear(`Dynamite`,	12, `d6x6`,	 `30yd`,	 `instant`,  `10 round fuse.`,				  1)
// new Gear(`Firecracker`, 6,  `0`,		`0yd`,	  `d6+3 rounds`, `Mimics sound of gunfire.`,	 0)
// new Gear(`Landmine`,	15, `d6x6`,	 `3yd`,	  `instant`,  ``,							 2)
// new Gear(`Sky Rocket`,  12, `d6x3`,	 `60yd`,	 `instant`,  `-1 RATK. Range:50. Blind.`,	  1)

const BilingualDictionary = new Gear({
	id: `0bd4e81f-184a-4022-ca40-ffb1b8ecc59f`,
	name: `Bilingual Dictionary`,
	desc: [
		`Multilingual Ability`,
	],
	sz: 1,
	type: `Document`
});

const BodyInBalance = new Gear({
	id: `3355f314-57f5-4875-4496-d1e80a89bec2`,
	name: `Body in Balance`,
	desc: [
		`+1 Athletics`,
	],
	sz: 1,
	type: `Document`
});

const BookOfFiveRings = new Gear({
	id: `b8734117-d386-4a48-4547-d64733cabcd7`,
	name: `Tao of Jeet Kune Do`,
	desc: [
		`+1 Melee`,
	],
	sz: 1,
	type: `Document`
});

const ClassicNovel = new Gear({
	id: `a6c2892a-0afb-483a-83af-0d42856070dc`,
	name: `Classic Novel`,
	desc: [
		`+1 Psyche`,
	],
	sz: 1,
	type: `Document`
});

const BriefHistoryOfTime = new Gear({
	id: `0e75fc4b-6a94-4126-01ef-98de7833bbd9`,
	name: `Brief History of Time`,
	desc: [
		`+1 Science`,
	],
	sz: 1,
	type: `Document`
});

const DefensiveDriving = new Gear({
	id: `a6c2892a-0afb-483a-83af-0d42856070dc`,
	name: `Defensive Driving`,
	desc: [
		`+1 Drive`,
	],
	sz: 1,
	type: `Document`
});

const DogTricks = new Gear({
	id: `a6c2892a-0afb-483a-83af-0d42856070dc`,
	name: `Dog Tricks`,
	desc: [
		`+1 Tame`,
	],
	sz: 1,
	type: `Document`
});

const EffectiveHabits = new Gear({
	id: `a6c2892a-0afb-483a-83af-0d42856070dc`,
	name: `Effective Habits`,
	desc: [
		`+1 to any one Skill`,
	],
	sz: 1,
	type: `Document`
});

const EngineeringConcepts = new Gear({
	id: `1473e9cc-aa60-432d-c963-706f6027ec3a`,
	name: `Engineering Concepts`,
	desc: [
		`+1 Build`,
	],
	sz: 1,
	type: `Document`
});

const GraysAnatomy = new Gear({
	id: `631c4ab8-e6ed-4b03-58f2-5a18e367f0a2`,
	name: `Gray's Anatomy`,
	desc: [
		`+1 Medicine`,
	],
	sz: 1,
	type: `Document`
});

const HolyBook = new Gear({
	id: `0d34f869-b076-48d0-39f3-9d7d01949df7`,
	name: `Holy Book`,
	desc: [
		`-1 Psyche`,
	],
	sz: 1,
	type: `Document`
});

const HomeSecurity = new Gear({
	id: `53f6c3b9-8df8-4374-057c-3a38973a49fc`,
	name: `Home Security`,
	desc: [
		`+1 Larceny`,
	],
	sz: 1,
	type: `Document`
});

const HowToWinFriends = new Gear({
	id: `4f22c946-4376-4006-9f07-6a9294b89bcf`,
	name: `How to Win Friends`,
	desc: [
		`+1 Socialize`,
	],
	sz: 1,
	type: `Document`
});

const HowYogaWorks = new Gear({
	id: `c2e1dfd4-d5dd-4149-a6fc-d696179ae9d2`,
	name: `How Yoga Works`,
	desc: [
		`+1 Acrobatics`,
	],
	sz: 1,
	type: `Document`
});

const LeadershipBasics = new Gear({
	id: `aae544a7-01c8-4f98-bc38-34b6332b1868`,
	name: `Leadership Basics`,
	desc: [
		`+1 Leadership`,
	],
	sz: 1,
	type: `Document`
});

const MapAtlas = new Gear({
	id: `aada7d2a-381d-4988-d915-81ce5f595d2d`,
	name: `Map (Atlas)`,
	desc: [
		`+1 Survival(Navigate)`,
	],
	sz: 1,
	type: `Document`
});

const MapLocal = new Gear({
	id: `b3c55045-16de-4193-4196-5681db54e755`,
	name: `Map (Local)`,
	desc: [
		`+1 Survival(Navigate) in a given Region.`,
	],
	sz: 0,
	type: `Document`
});

const MapTopographic = new Gear({
	id: `5e0e17b4-8771-44e2-607d-d16754fce17d`,
	name: `Map (Topographic)`,
	desc: [
		`+3 Survival(Navigate) in a given Region.`,
	],
	sz: 0,
	type: `Document`
});

const PersonalDefense = new Gear({
	id: `8bce5059-df27-43be-aacd-94e5685fe537`,
	name: `Personal Defense`,
	desc: [
		`+1 Ranged`,
	],
	sz: 1,
	type: `Document`
});

const SASSurvivalGuide = new Gear({
	id: `1bad72d4-a758-473e-d1bf-f52a200a5f5a`,
	name: `SAS Survival Guide`,
	desc: [
		`+1 Survival`,
	],
	sz: 1,
	type: `Document`
});

const StandupComedy = new Gear({
	id: `d6b2ddeb-7033-4530-4c57-0d71b099785a`,
	name: `Stand-up Comedy`,
	desc: [
		`+1 Entertain`,
	],
	sz: 1,
	type: `Document`
});

const YellowPages = new Gear({
	id: `ac4656eb-0903-4f60-f323-83a1c63f84e6`,
	name: `Yellow Pages`,
	desc: [
		`+1 Scavenging in a given Region.`,
	],
	sz: 1,
	type: `Document`
});

const ZenMind = new Gear({
	id: `2c017ecd-b770-4704-4a16-7a3037a82d49`,
	name: `Zen Mind`,
	desc: [
		`+1 Perception`,
	],
	sz: 1,
	type: `Document`
});

var DocumentList = [
	BilingualDictionary,
	BodyInBalance,
	BookOfFiveRings,
	ClassicNovel,
	BriefHistoryOfTime,
	ClassicNovel,
	DefensiveDriving,
	DogTricks,
	EffectiveHabits,
	EngineeringConcepts,
	GraysAnatomy,
	HolyBook,
	HomeSecurity,
	HowToWinFriends,
	HowYogaWorks,
	LeadershipBasics,
	MapAtlas,
	MapLocal,
	MapTopographic,
	PersonalDefense,
	SASSurvivalGuide,
	StandupComedy,
	YellowPages,
	ZenMind,
];

const Alcohol = new Gear({
	id: `de0dd5f5-8630-4827-121d-e39fc099a9ab`,
	name: `Alcohol`,
	desc: [
		`Can be used as an Antibiotic or Fuel.`,
		`C9# or Unstable.`,
	],
	sz: 1,
	type: `Drug`
});
Alcohol.mix = 9;
Alcohol.od = true;

const Antibiotic = new Gear({
	id: `5d0b08ad-11c0-490d-00ca-6a8bbeb3b4fa`,
	name: `Antibiotic`,
	desc: [
		`Prevents infection in Recovery for 1 day.`,
	],
	sz: 0,
	type: `Drug`
});
Antibiotic.mix = 12;
Antibiotic.od = false;

const Hallucinogen = new Gear({
	id: `462f38ee-ef66-4f76-9110-95802de92a6b`,
	name: `Hallucinogen`,
	desc: [
		`+1 Perform and Tame, -3 to all other rolls, and -1 Psyche.`,
	],
	sz: 0,
	type: `Drug`
});
Hallucinogen.mix = 15;
Hallucinogen.od = false;

const Painkiller = new Gear({
	id: `c9be0c61-4165-45eb-5460-995a546e1e6f`,
	name: `Painkiller`,
	desc: [
		`Ignore 1 Pain penalty.`,
	],
	sz: 0,
	type: `Drug`
});
Painkiller.mix = 9;
Painkiller.od = true;

const Sedative = new Gear({
	id: `4fb51505-52ff-45a1-5b73-129aabc09b83`,
	name: `Sedative`,
	desc: [
		`Demeanor#6/round to take any action.`,
	],
	sz: 0,
	type: `Drug`
});
Sedative.mix = 12;
Sedative.od = true;

const Stimulant = new Gear({
	id: `e124e538-8a31-4ed3-442e-06c040e353ce`,
	name: `Stimulant`,
	desc: [
		`Ignore Exhaustion penalties for 6hrs.`,
	],
	sz: 0,
	type: `Drug`
});
Stimulant.mix = 9;
Stimulant.od = true;

var DrugsList = [
	Alcohol,
	Antibiotic,
	Hallucinogen,
	Painkiller,
	Sedative,
	Stimulant,
];


// OLD Damage ResistanceUGS
// new Drug(`Chloroform`,		  15, true,   `Liquid. C#12 or Unconscious. Takes d6 rounds.`,	   0)
// new Drug(`Cyanide`,			 18, true,   `Pill. d6 Torso DMG/round for 5 rounds.`,				0)
// new Drug(`Epinephrine`,		 15, true,   `Injection. Resuscitate within C+3mins.`,		  0)
// new Drug(`Iodine`,			  6,  false,  `Purify 1gal of Water. Prevents Radiation.`,		0)
// new Drug(`Potassium Chloride`,  18, true,   `Injection. d6 Torso DMG/min for 5mins.`,		   0)
// new Drug(`Sodium Pentothal`,	15, true,   `Injection. -6 Entertain(Lie).`,					0)

const Cellphone = new Gear({
	id: `fdf4711d-ccc0-4a37-3808-f3334c827c30`,
	name: `Cellphone`,
	desc: [
		`1yd light, camera, remote control.`,
	],
	sz: 1
});
Cellphone.dur = 3600;

const EmergencyRadio = new Gear({
	id: `6914f941-5c30-48b4-f4ca-131e39075fb3`,
	name: `Emergency Radio`,
	desc: [
		`AM/FM/Shortwave.`,
		`1yd light.`,
	],
	sz: 1
});
EmergencyRadio.dur = 7200;

const Flashlight = new Gear({
	id: `100f3da0-5b60-4a73-b828-0009c2702bf0`,
	name: `Flashlight`,
	desc: [
		`10yd light. -3 Ranged Attack to Blind 1 round.`,
	],
	sz: 1
});
Flashlight.dur = 3600;

const GeigerCounter = new Gear({
	id: `0b857eb3-3aea-44b4-34a2-93f578870af4`,
	name: `Geiger Counter`,
	desc: [
		`Science 6# to detect Radiation in 1yd.`,
	],
	sz: 2
});
GeigerCounter.dur = 28800;

const HandRadio = new Gear({
	id: `6aa47c61-a2f3-472a-f9c6-d6fedc08aefc`,
	name: `Hand Radio`,
	desc: [
		`9-channel 2-way radio.`,
		`3 mile range.`,
	],
	sz: 1
});
HandRadio.dur = 10800;

const Headlamp = new Gear({
	id: `7374fe66-3389-407c-20cc-3b8c53fd8a7a`,
	name: `Headlamp`,
	desc: [
		`3yd light. Hands free.`,
	],
	sz: 0
});
Headlamp.dur = 3600;

const Lantern = new Gear({
	id: `c25dadce-1873-4bd0-4da5-a5675504fe46`,
	name: `Lantern`,
	desc: [
		`3yd light radius.`,
	],
	sz: 2
});
Lantern.dur = 7200;

const Megaphone = new Gear({
	id: `5e242eff-66c8-41d6-1350-28071590b956`,
	name: `Megaphone`,
	desc: [
		`+1 Leadership when speaking to a crowd.`,
	],
	sz: 2
});
Megaphone.dur = 14400;

const Multimeter = new Gear({
	id: `53ffeb0d-4324-437f-e06e-19b84ca2acc0`,
	name: `Multimeter`,
	desc: [
		`+3 Science(Technology).`,
		`Detects voltage, battery life, and closed circuits.`,
	],
	sz: 1
});
Multimeter.dur = 57600;

const NightvisionGoggles = new Gear({
	id: `c2506a47-bbf1-45e0-daa9-297af21a11ea`,
	name: `Nightvision Goggles`,
	desc: [
		`Ignore Visibility penalties in darkness.`,
	],
	sz: 1
});
NightvisionGoggles.dur = 43200;

const QuadcopterDrone = new Gear({
	id: `b8de49bf-83d7-4d99-554a-bdf378b0672e`,
	name: `Quadcopter Drone`,
	desc: [
		`Science 6# to use.`,
		`Onboard camera.`,
		`90yd Speed.`,
	],
	sz: 2
});
QuadcopterDrone.dur = 300;

const RCCar = new Gear({
	id: `d7cb8c39-edbf-4dba-180f-f5a90c8a3c2c`,
	name: `RC Car`,
	desc: [
		`Science 3# to use.`,
		`45yd Speed.`,
	],
	sz: 3
});
RCCar.dur = 600;

const SolarLamp = new Gear({
	id: `aa480ec7-9df9-4011-ff78-d4b34567c144`,
	name: `Solar Lamp`,
	desc: [
		`1yd light radius.`,
		`1 day charge.`,
	],
	sz: 1
});
SolarLamp.dur = 10800;

const StunGun = new Gear({
	id: `addf59b3-5134-4a92-770c-564f831ac30b`,
	name: `Stun Gun`,
	desc: [
		`Melee Attack.`,
		`C9# or Stun next round.`,
	],
	sz: 1
});
StunGun.dur = 120;

var ElectronicsList = [
	Cellphone,
	EmergencyRadio,
	Flashlight,
	GeigerCounter,
	HandRadio,
	Headlamp,
	Lantern,
	Megaphone,
	Multimeter,
	NightvisionGoggles,
	QuadcopterDrone,
	RCCar,
	SolarLamp,
	StunGun,
];


// OLD ELECTRONICS
//  new Gear(`Radio Jammer`,		  3,	  `Blocks radio signal within 100yds.`,	   1)

const AirHorn = new Gear({
	id: `3227f45d-6091-4d3f-c6b3-9ad65810be80`,
	name: `Air Horn`,
	desc: [
		`Emits a loud shriek up to a 1 mile radius.`,
	],
	sz: 1
});

const Bicycle = new Gear({
	id: `b368d8c5-e9f7-4c65-efba-60146a39be78`,
	name: `Bicycle`,
	desc: [
		`Athletics 3#.`,
		`Speed x3yds (x.7mph).`,
		`2h.`,
	],
	sz: 8
});

const Binoculars = new Gear({
	id: `20b85479-d079-4fc0-44e1-dd3fd989850d`,
	name: `Binoculars`,
	desc: [
		`+3 Perception(See) at 50+yds.`,
	],
	sz: 1
});

const CageTrap = new Gear({
	id: `888116f7-35ad-4822-7a05-2ec1607a27a1`,
	name: `Cage Trap`,
	desc: [
		`+3 Survival(Forage).`,
		`Takes 1day.`,
	],
	sz: 6
});

const Candle = new Gear({
	id: `3c1ae77d-8b52-452a-01a1-68aa5a6be931`,
	name: `Candle`,
	desc: [
		`1yd light radius for 6hrs.`,
	],
	sz: 0
});

const Candy = new Gear({
	id: `57d01f7d-b16c-4e1a-2628-8b0d63b030cd`,
	name: `Candy`,
	desc: [
		`Restores 1 Luck point.`,
		`1/day.`,
	],
	sz: 0
});

const Chalk = new Gear({
	id: `cb6ca246-f672-499c-ac06-64f36b70d559`,
	name: `Chalk`,
	desc: [
		`Used to temporarily write on any surface.`,
	],
	sz: 0
});

const Compass = new Gear({
	id: `af94f8fc-afed-489c-dafd-3e342c06a2af`,
	name: `Compass`,
	desc: [
		`+3 Survival(Navigate).`,
		`Always points North.`,
	],
	sz: 0
});

const EggTimer = new Gear({
	id: `286804f0-6e15-4522-f705-228d37aefb2e`,
	name: `Egg Timer`,
	desc: [
		`Set up to 60mins.`,
		`Loud ringing for 1min.`,
	],
	sz: 1
});

const Firestick = new Gear({
	id: `97ab1837-f6ba-447f-e527-9390cea6b780`,
	name: `Fire-stick`,
	desc: [
		`+3 Survival(Camp).`,
		`Magnesium rod and steel.`,
	],
	sz: 0
});

const FishingPole = new Gear({
	id: `b3d467fc-fb21-43ff-8c28-036596dee4dc`,
	name: `Fishing Pole`,
	desc: [
		`+1 Survival(Forage) at river, lake, or ocean.`,
	],
	sz: 2
});

const FlareGun = new Gear({
	id: `5821a2de-279f-483d-876c-b3635e4d4df3`,
	name: `Flare Gun`,
	desc: [
		`Pistol.`,
		`Range:3.`,
		`Ammo: 12g Flares or 1 use 12g.`,
	],
	sz: 1
});

const GrapplingHook = new Gear({
	id: `d12c1c96-ac98-4208-f602-0867e5e3bb23`,
	name: `Grappling Hook`,
	desc: [
		`+3 Athletics(Climb and Rappel).`,
		`Holds 100Sz.`,
	],
	sz: 2
});

const Hammock = new Gear({
	id: `4486f872-8456-4d18-95d5-629dcbff3f40`,
	name: `Hammock`,
	desc: [
		`Suspended sleeping device for 1 person.`,
	],
	sz: 1
});

const Lighter = new Gear({
	id: `f5393228-3433-4ba1-6aee-4e0a17b276d7`,
	name: `Lighter`,
	desc: [
		`Makes a small fire.`,
		`1yd radius light.`,
	],
	sz: 0
});

const LuxuryItem = new Gear({
	id: `c62ac23d-b60d-4bbc-7b1e-cb7de1db5f9c`,
	name: `Luxury Item`,
	desc: [
		`Toilet paper, cigarette, etc.`,
		`+1 Psyche 1/wk.`,
	],
	sz: 0
});

const Marbles = new Gear({
	id: `a1933da2-1353-41ff-a303-67239f26c39e`,
	name: `Marbles`,
	desc: [
		`30/bag.`,
		`2sqyd area.`,
		`A12# or fall Prone.`,
	],
	sz: 1
});

const Marker = new Gear({
	id: `20ba8a90-aae0-480d-588c-c42e73ad07c3`,
	name: `Marker`,
	desc: [
		`Used to permanently write on any surface.`,
	],
	sz: 0
});

const Matchbook = new Gear({
	id: `3c615dc7-8c73-4384-4ad3-07fa991cb899`,
	name: `Matchbook`,
	desc: [
		`+1 Survival(Camp).`,
		`1yd light radius, 3 rounds.`,
	],
	sz: 0
});

const Monocular = new Gear({
	id: `9a1ed4f3-3845-43a1-e114-c19fd37e7085`,
	name: `Monocular`,
	desc: [
		`+1 Perception(See) at 25+yds.`,
	],
	sz: 1
});

const MusicalInstrument = new Gear({
	id: `901a5d7e-8731-46d1-5597-7511b52118ab`,
	name: `Musical Instrument`,
	desc: [
		`+1 Entertain(Distract and Inspire).`,
	],
	sz: 1
});

const MylarBlanket = new Gear({
	id: `a3ec02d2-f62b-4854-7122-af87d17303aa`,
	name: `Mylar Blanket`,
	desc: [
		`Cold Resistance.`,
		`1yd x 2yd reflective foil sheet.`,
	],
	sz: 0
});

const Notebook = new Gear({
	id: `edcd3449-6b01-4e47-fef5-2e65359176ec`,
	name: `Notebook`,
	desc: [
		`100 pages of paper with a wire binding.`,
	],
	sz: 1
});

const Padlock = new Gear({
	id: `3036a514-0773-4bbe-99ab-37e73ae37adb`,
	name: `Padlock`,
	desc: [
		`2 Damage Resistance.`,
		`Larceny(Disable) 9#.`,
	],
	sz: 1
});

const Paracord = new Gear({
	id: `db7dc950-2272-4619-d84c-0794e4ab6181`,
	name: `Paracord`,
	desc: [
		`60yd coil.`,
		`Holds 50Sz.`,
	],
	sz: 1
});

const PepperSpray = new Gear({
	id: `bc0af616-f2b7-46fe-7c40-c248950c436a`,
	name: `Pepper Spray`,
	desc: [
		`+3 Ranged(Shoot) with this weapon.`,
		`Range:1.`,
		`Successful Called Shot: Head causes 6 Pain.`,
		`Takes 1 round for Pain to start.`,
		`Pain lasts for d6x5 minutes.`,
		`3 uses.`,
		`Toxin.`,
	],
	sz: 0
});

const PocketMirror = new Gear({
	id: `b61d42d4-cce8-4da4-6eae-930f7a7da673`,
	name: `Pocket Mirror`,
	desc: [
		`Perception(See) 6# to see from behind Cover.`,
	],
	sz: 0
});

const RatTrap = new Gear({
	id: `7f17fc95-3e41-4720-78e7-43caff07d751`,
	name: `Rat Trap`,
	desc: [
		`+1 Survival(Forage).`,
		`Takes 1day.`,
	],
	sz: 1
});

const RoadFlare = new Gear({
	id: `0d1618d3-a749-453a-7142-8ad0baada784`,
	name: `Road Flare`,
	desc: [
		`3 Fire Damage.`,
		`10yd light radius for 20mins.`,
	],
	sz: 1
});

const Rope = new Gear({
	id: `48af2ad2-8313-454e-866e-21ddd60e6c42`,
	name: `Rope`,
	desc: [
		`30yd nylon coil.`,
		`Holds 100Sz.`,
		`Survival 6# to use as Handcuffs.`,
	],
	sz: 2
});

const Skateboard = new Gear({
	id: `eda75200-b159-42b6-4029-6dba3d392127`,
	name: `Skateboard`,
	desc: [
		`Athletics 6#.`,
		`Speed x3.`,
		`Fail:Prone.`,
	],
	sz: 3
});

const SleepingBag = new Gear({
	id: `1d32992c-02d3-4739-4a92-0714018ff743`,
	name: `Sleeping Bag`,
	desc: [
		`Insulated bag for up to 2 people.`,
		`Cold Resistance +3hrs.`,
	],
	sz: 3
});

const SpottingScope = new Gear({
	id: `6f65efe9-f547-4ee4-2fea-1f1c5be8ad69`,
	name: `Spotting Scope`,
	desc: [
		`+6 Perception(See) at 100+yds.`,
	],
	sz: 2
});

const Tarp = new Gear({
	id: `2d517256-6dea-42ed-1040-48247b6f4b4d`,
	name: `Tarp`,
	desc: [
		`3yd x 3yd plastic sheet.`,
		`Cold Resistance.`,
		`Waterproof.`,
	],
	sz: 1
});

const Tent = new Gear({
	id: `68073937-9618-405f-b4c5-5b80a08bde6f`,
	name: `Tent`,
	desc: [
		`4 person.`,
		`5min setup/take-down.`,
		`Cold Resistance +3hrs.`,
	],
	sz: 6
});

const Whetstone = new Gear({
	id: `1935e1a4-76d6-4de0-02bc-9583cf974c1a`,
	name: `Whetstone`,
	desc: [
		`Blade gets +1 Damage for 1day.`,
		`Takes 1hr/blade.`,
	],
	sz: 1
});

const Whistle = new Gear({
	id: `18888c68-ef39-4613-9e2d-f600cc7d000b`,
	name: `Whistle`,
	desc: [
		`+1 Tame(Train).`,
		`Loud shriek 500yd radius.`,
	],
	sz: 0
});

const ZipTie = new Gear({
	id: `3d9a0750-5858-41da-b103-99f5a31130bb`,
	name: `Zip Tie`,
	desc: [
		`Place on Arms behind target's back to make them Harmless.`,
		`Place on Legs to make target Immobilized.`,
		`Constitution or Acrobatics 12# to escape.`,
		`Use for +1 Build.`,
	],
	sz: 0
});

var MiscList = [
	AirHorn,
	Bicycle,
	Binoculars,
	CageTrap,
	Candle,
	Candy,
	Chalk,
	Compass,
	EggTimer,
	Firestick,
	FishingPole,
	FlareGun,
	GrapplingHook,
	Hammock,
	Lighter,
	LuxuryItem,
	Marbles,
	Marker,
	Matchbook,
	Monocular,
	MusicalInstrument,
	MylarBlanket,
	Notebook,
	Padlock,
	Paracord,
	PepperSpray,
	PocketMirror,
	RatTrap,
	RoadFlare,
	Rope,
	Skateboard,
	SleepingBag,
	SpottingScope,
	Tarp,
	Tent,
	Whetstone,
	Whistle,
	ZipTie,
];

const Bandage = new Gear({
	id: `d886320f-a3b9-4576-9ad9-aa882e5544e3`,
	name: `Bandage`,
	desc: [
		`+1 Medicine(First-Aid).`,
		`1 use.`,
	],
	sz: 0
});

const Crutch = new Gear({
	id: `9d4b5d7f-59fd-4a9f-a7f1-59c60f4a8dc3`,
	name: `Crutch`,
	desc: [
		`Halves Leg Damage Pain penalty to Speed.`,
	],
	sz: 3
});

const EMTBag = new Gear({
	id: `a2fa2383-c6fe-4569-961e-09fc9f537403`,
	name: `EMT Bag`,
	desc: [
		`+3 Medicine(First-Aid).`,
		`30 uses.`,
	],
	sz: 5
});

const FirstAidKit = new Gear({
	id: `a6a66459-d98c-4d2a-cd5d-a76a83b229d2`,
	name: `First-Aid Kit`,
	desc: [
		`+1 Medicine(First-Aid).`,
		`5 uses.`,
	],
	sz: 1
});

const PressureCuff = new Gear({
	id: `7a5e1d36-e88e-4c93-4d1c-537ba80119bb`,
	name: `Pressure Cuff`,
	desc: [
		`+1 Medicine.`,
	],
	sz: 1
});

const Stethoscope = new Gear({
	id: `a76f880c-da27-401f-4463-5a16f58a0799`,
	name: `Stethoscope`,
	desc: [
		`+1 Medicine.`,
		`Perception(Hear) 6# through doors.`,
	],
	sz: 1
});

const SurgeryKit = new Gear({
	id: `5c63537c-9b70-44cb-9244-911da739b03d`,
	name: `Surgery Kit`,
	desc: [
		`+3 Medicine(Surgery).`,
	],
	sz: 3
});

const Thermometer = new Gear({
	id: `5c84cf80-cb41-40da-0d0d-f0ea70566ee0`,
	name: `Thermometer`,
	desc: [
		`+1 Medicine.`,
		`Accurately reads temperature.`,
	],
	sz: 0
});

const TransfusionKit = new Gear({
	id: `4cccec0d-4732-4421-dec9-12fd84a54611`,
	name: `Transfusion Kit`,
	desc: [
		`Medicine 9#.`,
		`Inflict 1 Bleeding Damage on the donor to heal 1 Bleeding Damage on the recipient.`,
		`Takes 1hr.`,
	],
	sz: 1
});

const WaterFilter = new Gear({
	id: `d055db56-81db-4cfe-f709-85f8de83586a`,
	name: `Water Filter`,
	desc: [
		`Purifies 1 Water ration (.5gal) per minute.`,
	],
	sz: 1
});

var MedicalList = [
	Bandage,
	Crutch,
	EMTBag,
	FirstAidKit,
	PressureCuff,
	Stethoscope,
	SurgeryKit,
	Thermometer,
	TransfusionKit,
	WaterFilter,
];

const TwoHanded = new Rule({
	id: `ff319545-04eb-431d-c344-cd8c6a38ef6a`,
	name: `2h`,
	desc: [
		`Normally used two-handed.`,
		`Can be used one-handed at a penalty = Size.`,
	]
});

const Chop = new Rule({
	id: `6468d427-de5b-4395-a7a8-19faa2b1be6d`,
	name: `Chop`,
	desc: [
		`+1 Damage to Body Parts with no Armor.`,
	]
});

const Slow = new Rule({
	id: `68f3481c-6392-4959-9e90-afe0a6e6a2c1`,
	name: `Slow`,
	desc: [
		`Penalty to Speed = Size.`,
	]
});

const Ax = new Gear({
	id: `a9aead5f-27f8-4727-84b0-6fdd536d52f8`,
	name: `Ax`,
	sz: 4,
	attr: [
		TwoHanded,
		Chop,
		Slow,
	]
});
Ax.dmg = 4;
Ax.rng = 2;

const Blunt = new Rule({
	id: `2da79249-615a-4b20-2970-4164da947fd9`,
	name: `Blunt`,
	desc: [
		`Does not cause Bleeding.`,
	]
});

const BaseballBat = new Gear({
	id: `16a7ae03-024b-450b-9ce9-082b225f3021`,
	name: `Baseball Bat`,
	sz: 3,
	attr: [
		TwoHanded,
		Blunt,
	]
});
BaseballBat.dmg = 3;
BaseballBat.rng = 2;

const OneHanded = new Rule({
	id: `4f631ce3-848f-43e6-b8ca-7f273b0b7da4`,
	name: `1h`,
	desc: [
		`Normally used one-handed.`,
	]
});

const BrassKnuckles = new Gear({
	id: `eaf2a5df-a818-4ec7-bace-25a303895fd8`,
	name: `Brass Knuckles`,
	sz: 1,
	attr: [
		OneHanded,
		Blunt,
	]
});
BrassKnuckles.dmg = 1;
BrassKnuckles.rng = 1;

const Club = new Gear({
	id: `5f8b0bd9-1b1c-4c44-9c31-e76db4f4a663`,
	name: `Club`,
	sz: 2,
	attr: [
		OneHanded,
		Blunt,
	]
});
Club.dmg = 2;
Club.rng = 2;

const Crowbar = new Gear({
	id: `328afbe9-a374-486f-b41b-2f4e4e7f8958`,
	name: `Crowbar`,
	sz: 3,
	attr: [
		OneHanded,
	]
});
Crowbar.dmg = 3;
Crowbar.rng = 2;

const Hammer = new Gear({
	id: `76f801f0-72e6-4b92-ab5a-61d8728da9dc`,
	name: `Hammer`,
	sz: 2,
	attr: [
		OneHanded,
		Blunt,
	]
});
Hammer.dmg = 2;
Hammer.rng = 1;

const Hatchet = new Gear({
	id: `fcb3667d-44e2-4faf-b404-1aa9e0c0af09`,
	name: `Hatchet`,
	sz: 2,
	attr: [
		OneHanded,
		Chop,
	]
});
Hatchet.dmg = 2;
Hatchet.rng = 1;

const Rapid = new Rule({
	id: `45150ffe-a64e-4a0b-073a-2fc873a551a7`,
	name: `Rapid`,
	desc: [
		`You can make 2 Attacks at the same target for 1 Action.`,
	]
});

const Knife = new Gear({
	id: `077adc37-a0e4-4282-8641-74c648c8f5cd`,
	name: `Knife`,
	sz: 1,
	attr: [
		OneHanded,
		Pierce,
		Rapid,
	]
});
Knife.dmg = 1;
Knife.rng = 1;

const Machete = new Gear({
	id: `3e6a26a1-df4c-45db-acf0-a33f0948dc5f`,
	name: `Machete`,
	sz: 2,
	attr: [
		OneHanded,
		Chop,
	]
});
Machete.dmg = 3;
Machete.rng = 2;

const Shield = new Rule({
	id: `041726f9-6f64-42d4-ca8b-613fabd40bf4`,
	name: `Shield`,
	desc: [
		`Provides 3 Damage Resistance Cover.`,
		`+3 to Block.`,
	]
});

const RiotShield = new Gear({
	id: `0e48721b-f535-483a-8bba-1d9e167c38fa`,
	name: `Riot Shield`,
	sz: 4,
	attr: [
		OneHanded,
		Blunt,
		Shield,
	]
});
RiotShield.dmg = 0;
RiotShield.rng = 1;

const Sledgehammer = new Gear({
	id: `746da84b-263b-4b41-90c4-a512014e86d7`,
	name: `Sledgehammer`,
	sz: 5,
	attr: [
		TwoHanded,
		Blunt,
		Slow,
	]
});
Sledgehammer.dmg = 4;
Sledgehammer.rng = 2;

const Spear = new Gear({
	id: `d6b2d895-68be-4489-86bb-a80a13997e1d`,
	name: `Spear`,
	sz: 3,
	attr: [
		OneHanded,
		Pierce,
	]
});
Spear.dmg = 4;
Spear.rng = 3;

const Staff = new Gear({
	id: `1fab5144-0cd7-440c-93ab-2a9c849941e7`,
	name: `Staff`,
	sz: 3,
	attr: [
		TwoHanded,
		Blunt,
	]
});
Staff.dmg = 2;
Staff.rng = 3;

var MeleeWeaponList = [
	Ax,
	BaseballBat,
	BrassKnuckles,
	Club,
	Crowbar,
	Hammer,
	Hatchet,
	Knife,
	Machete,
	RiotShield,
	Sledgehammer,
	Spear,
	Staff,
];


// RARE MELEE
// new Gear(`Barbwire Club`, 3, 1, ``, 2),
// new Gear(`Bowie Knife`, 2, 1, `Chop. Rapid.`, 1),
// new Gear(`Broadsword`, 4, 2, `Chop or Pierce.`, 4),
// new Gear(`Catch Pole`, 0, 2, `+1 Block. Blunt. +1 Grab.`, 3),
// new Gear(`Chainsaw`, 6, 2, `.5gal Fuel. d6 rounds to start. 1: Empty. Loud.`, 4),
// new Gear(`Ice Ax`, 3, 1, `Lever. Pierce.`, 2),
// new Gear(`Katana`, 5, 2, `Chop or Pierce. Rapid.`, 3),
// new Gear(`Kukri`, 3, 1, `Chop`, 2),
// new Gear(`Lasso`, 0, 2, `Blunt. +1 Grab. Throw (Range:3)`, 2),
// new Gear(`Net`, 0, 2, `+6 Grab.`, 3),
// new Gear(`Rapier`, 3, 1, `Pierce. Rapid.`, 2),
// new Gear(`Scythe`, 6, 2, `Chop. Pierce.`, 4),
// new Gear(`Sign Shield`, 2, 1, `+3 Block. Cover 6 Damage Resistance.`, 4),
// new Gear(`Switchblade`, 1, 1, `Pierce. Rapid.`, 0),
// new Gear(`Trench Knife`, 2, 1, `Blunt Punch. Pierce. Rapid.`, 1),
// new Gear(`Whip`, 0, 1, `Blunt. +1 Disarm. +1 Grab. Range:3.`, 1),

// OLD MELEE
// new Gear(`Baton`, 2, 1, `Blunt. Rapid.`, 2),
// new Gear(`Cane`, 1, 1, `Blunt. +1 Trip. Can be used as a Crutch.`, 3),
// new Gear(`Cleaver`, 2, 1, `Chop.`, 1),
// new Gear(`Firepoker`, 3, 1, `Lever. Pierce.`, 3),
// new Gear(`Garrote`, 1, 2, `Blunt. +3 to Grab(Lock) Head.`, 1),
// new Gear(`Metal Club`, 3, 2, `Blunt.`, 3),
// new Gear(`Pickax`, 6, 2, `Lever. Pierce.`, 5),
// new Gear(`Pitchfork`, 3, 2, `+1 Block. Pierce.`, 4),
// new Gear(`Screwdriver`, 1, 1, `Lever. Pierce. Rapid.`, 1),
// new Gear(`Shovel`, 3, 2, `+1 Block`, 4),
// new Gear(`Tire Iron`, 2, 1, `Lever.`, 2),
// new Gear(`Torch`, 1, 1, `Blunt. +1 Fire Damage. 5yd light radius 1hr.`, 2),

const AR15 = new Gear({
	id: `69cd0033-60ad-4d4c-aac2-d9584e5766a1`,
	name: `AR-15`,
	sz: 3,
	attr: [
		TwoHanded,
		Rapid,
	]
});
AR15.dmg = 2;
AR15.rng = 30;
AR15.cap = 30;
AR15.cal = `5.56`;

const BenelliM4 = new Gear({
	id: `00b5ce6e-ce91-4a68-856e-f72538af0261`,
	name: `Benelli M4`,
	sz: 4,
	attr: [
		TwoHanded,
		Rapid,
		Scatter,
	]
});
BenelliM4.dmg = 4;
BenelliM4.rng = 15;
BenelliM4.cap = 6;
BenelliM4.cal = `12g`;

const BrowningABolt = new Gear({
	id: `dc61759b-4432-456b-91c5-981c3b34fc65`,
	name: `Browning A-Bolt`,
	sz: 4,
	attr: [
		TwoHanded,
	]
});
BrowningABolt.dmg = 3;
BrowningABolt.rng = 60;
BrowningABolt.cap = 5;
BrowningABolt.cal = `5.56`;

const ColtPython = new Gear({
	id: `8c4ba934-2850-4025-a9bf-188cc08a1c9c`,
	name: `Colt Python`,
	sz: 1,
	attr: [
		TwoHanded,
	]
});
ColtPython.dmg = 2;
ColtPython.rng = 10;
ColtPython.cap = 6;
ColtPython.cal = `.357`;

const CompoundBow = new Gear({
	id: `8c4ba934-2850-4025-a9bf-188cc08a1c9c`,
	name: `Compound Bow`,
	sz: 3,
	attr: [
		TwoHanded,
	]
});
CompoundBow.dmg = 1;
CompoundBow.rng = 15;
CompoundBow.cap = 1;
CompoundBow.cal = `Arrow`;

const Crossbow = new Gear({
	id: `5f42d732-9acb-40b6-b74d-fc2e42e107c6`,
	name: `Crossbow`,
	sz: 3,
	attr: [
		TwoHanded,
	]
});
Crossbow.dmg = 2;
Crossbow.rng = 15;
Crossbow.cap = 1;
Crossbow.cal = `Arrow`;

const Glock17 = new Gear({
	id: `5f42d732-9acb-40b6-b74d-fc2e42e107c6`,
	name: `Glock 17`,
	sz: 1,
	attr: [
		TwoHanded,
		Rapid,
	]
});
Glock17.dmg = 1;
Glock17.rng = 10;
Glock17.cap = 17;
Glock17.cal = `9mm`;

const HenryGoldenBoy = new Gear({
	id: `a0cf85b3-ead3-4460-889a-83e4938c8598`,
	name: `Henry Golden Boy`,
	sz: 3,
	attr: [
		TwoHanded,
	]
});
HenryGoldenBoy.dmg = 1;
HenryGoldenBoy.rng = 30;
HenryGoldenBoy.cap = 16;
HenryGoldenBoy.cal = `.22`;

const Auto = new Rule({
	id: `5a0a12f5-55ab-474e-936a-13926dcbe470`,
	name: `Auto`,
	desc: [
		`Choose either Burst or Spray.`,
		`Burst: +3 Ranged Attack vs one target.`,
		`Spray: 3yd Blast Attack.`,
		`Uses 10 bullets.`,
	]
});

const HKMP5 = new Gear({
	id: `e9381665-1e1f-48ff-b07f-80bba3f81773`,
	name: `H&K MP5`,
	sz: 3,
	attr: [
		TwoHanded,
		Auto,
		Rapid,
	]
});
HKMP5.dmg = 1;
HKMP5.rng = 20;
HKMP5.cap = 30;
HKMP5.cal = `9mm`;

const Marlin1894 = new Gear({
	id: `19c418dd-d00d-4a43-bc71-7c373d8aefe9`,
	name: `Marlin 1894`,
	sz: 3,
	dmg: 2,
	rng: 30,
	attr: [
		TwoHanded,
	],
	cap: 9,
	cal: `.357`
});
Marlin1894.dmg = 2;
Marlin1894.rng = 30;
Marlin1894.cap = 9;
Marlin1894.cal = `.357`;

const Mossberg500 = new Gear({
	id: `6f193dc4-5a9e-4eb5-bdf6-59e0ca24c56a`,
	name: `Mossberg 500`,
	sz: 2,
	attr: [
		TwoHanded,
		Scatter,
	]
});
Mossberg500.dmg = 4;
Mossberg500.rng = 10;
Mossberg500.cap = 5;
Mossberg500.cal = `12g`;

const RecurveBow = new Gear({
	id: `6852a491-fb8d-4fc3-a35e-2986ee70cd3f`,
	name: `Recurve Bow`,
	sz: 2,
	attr: [
		TwoHanded,
	]
});
RecurveBow.dmg = 1;
RecurveBow.rng = 10;
RecurveBow.cap = 1;
RecurveBow.cal = `Arrow`;

const Remington700 = new Gear({
	id: `6398a22b-e4a9-4c9f-a984-3bf6aaa09146`,
	name: `Remington 700`,
	sz: 4,
	attr: [
		TwoHanded,
	]
});
Remington700.dmg = 3;
Remington700.rng = 100;
Remington700.cap = 5;
Remington700.cal = `.308`;

const Remington870 = new Gear({
	id: `6398a22b-e4a9-4c9f-a984-3bf6aaa09146`,
	name: `Remington 870`,
	sz: 4,
	attr: [
		TwoHanded,
		Scatter,
	]
});
Remington870.dmg = 4;
Remington870.rng = 15;
Remington870.cap = 6;
Remington870.cal = `12g`;

const Ruger1022 = new Gear({
	id: `94dc2629-a460-4bdc-a90f-0ade229af021`,
	name: `Ruger 10/22`,
	sz: 3,
	attr: [
		TwoHanded,
		Rapid,
	]
});
Ruger1022.dmg = 1;
Ruger1022.rng = 30;
Ruger1022.cap = 10;
Ruger1022.cal = `.22`;

const RugerMkIII = new Gear({
	id: `739a925f-6d37-4e3f-a15d-af15248fbe1e`,
	name: `Ruger Mk.III`,
	sz: 1,
	attr: [
		TwoHanded,
		Rapid,
	]
});
RugerMkIII.dmg = 1;
RugerMkIII.rng = 15;
RugerMkIII.cap = 10;
RugerMkIII.cal = `.22`;

const SavageMkII = new Gear({
	id: `8465b895-4bd0-4c54-b1bb-f411a962ddbb`,
	name: `Savage Mk.II`,
	sz: 3,
	attr: [
		TwoHanded,
	]
});
SavageMkII.dmg = 1;
SavageMkII.rng = 40;
SavageMkII.cap = 10;
SavageMkII.cal = `.22`;

const SIGSauerP290 = new Gear({
	id: `16cffbd6-54af-49d2-a531-2d950435250b`,
	name: `SIG Sauer P290`,
	sz: 1,
	attr: [
		TwoHanded,
	]
});
SIGSauerP290.dmg = 1;
SIGSauerP290.rng = 5;
SIGSauerP290.cap = 6;
SIGSauerP290.cal = `9mm`;

const SpringfieldM1A = new Gear({
	id: `ea8867ac-4563-425f-b999-1195cd6f350e`,
	name: `Springfield M1A`,
	sz: 4,
	attr: [
		TwoHanded,
		Rapid,
	]
});
SpringfieldM1A.dmg = 3;
SpringfieldM1A.rng = 80;
SpringfieldM1A.cap = 20;
SpringfieldM1A.cal = `.308`;

const StoegerCoachgun = new Gear({
	id: `045bf20f-49ff-4fb5-b300-6088553c066d`,
	name: `Stoeger Coach Gun`,
	sz: 3,
	attr: [
		TwoHanded,
		Rapid,
		Scatter,
	]
});
StoegerCoachgun.dmg = 4;
StoegerCoachgun.rng = 15;
StoegerCoachgun.cap = 2;
StoegerCoachgun.cal = `12g`;

const SWBodyguard = new Gear({
	id: `2b58cb89-7b72-42cf-9ec0-d524e5e886a6`,
	name: `S&W Bodyguard`,
	sz: 1,
	attr: [
		TwoHanded,
	]
});
SWBodyguard.dmg = 2;
SWBodyguard.rng = 5;
SWBodyguard.cap = 5;
SWBodyguard.cal = `.357`;

var RangedWeaponList = [
	AR15,
	BenelliM4,
	BrowningABolt,
	ColtPython,
	CompoundBow,
	Crossbow,
	Glock17,
	HenryGoldenBoy,
	HKMP5,
	Marlin1894,
	Mossberg500,
	RecurveBow,
	Remington700,
	Remington870,
	Ruger1022,
	RugerMkIII,
	SavageMkII,
	SIGSauerP290,
	SpringfieldM1A,
	StoegerCoachgun,
	SWBodyguard,
];



// RARE RANGED
// new Gear(`Blowgun`, 0, `Cx2`, `Dart`, 1, 2, `Pierce. DMG Mod.`, 1),
// new Gear(`Bolas`, 0, `Cx2`, `-`, `-`, 1, `Blunt. DMG Mod. Trip. Throw.`, 1),	
// new Gear(`Derringer`, 1, 3, `.22`, 2, 1, `-1 RATK.`, 0),
// new Gear(`Flamethrower`, `d6x3`, 5, `Fuel`, 7, `Auto. 3yd Blast. Fire Dacape.`, 6),
// new Gear(`Longbow`, 1, 20, `Arrow`, 1, 2, `DMG Mod. -1 RATK.`, 3),
// new Gear(`M2 Browning`, 12, 200, `.50BMG`, `belt`, 2, `Auto. Mounted.`, 16),
// new Gear(`M4A1 Carbine`, 4, 50, `5.56`, `30cap`, 2, `Auto. Rapid.`, 3),
// new Gear(`M32 Launcher`, `varies`, 25, `40mm`, 6, 2, `Rapid.`, 4),
// new Gear(`M60 Machinegun`, 5, 100, `.308`, 300, 2, `Auto. Rapid. Bipod.`, 6),
// new Gear(`M72 LAW`, `d6x9`, 50, `Rocket`, 1, 2, `12yd Blast. Pierce.`, 3),
// new Gear(`M82 Barret`, 12, 200, `.50BMG`, `10cap`, 2, `Rapid. Bipod. Scope.`, 6),
// new Gear(`M134 Minigun`, 5, 100, `.308`, 1000, 2, `Auto only. Rapid. Mounted.`, 8),
// new Gear(`M203 Launcher`, `varies`, 25, `40mm`, 1, 2, `2h GUN ACCESSORY.`, 2),
// new Gear(`M249 SAW`, 4, 100, `5.56`, 100, 2, `Auto. Rapid.`, 5),
// new Gear(`Medusa 47`, `2, 3`, `9mm, .357`, `6cyl`, 1, `Revolver. Multi-Caliber.`, 2),
// new Gear(`Saiga-12`, 6, 15, `12g`, `12cap`, 2, `Rapid. Scatter.`, 4),
// new Gear(`Slingshot`, 1, 5, `Rocks`, 1, 2, `Blunt. DMG Mod.`, 1),
// new Gear(`Speargun`, 4, 5, `Arrow + Rope`, 1, 2, `Pierce. 2 round Reload.`, 4),
// new Gear(`Uzi`, 2, 10, `9mm`, `30cap`, 2, `Auto. Rapid. -1 RATK.`, 3),
// new Gear(`W. P. Grenade`, `d6x3`, 3, `Grenade`, 1, 1, `6yd Blast. Blind. d6 rounds.`, 1),

// OLD RANGED
// new Gear(`AK-47`, 4, 50, `7.62`, `30cap`, 2, `Auto. Rapid.`, 4),
// new Gear(`Norinco SKS`, 4, 50, `7.62`, 10, 2, `Rapid. Bayonet.`, 4),
// new Gear(`Kimber 1911`, 2, 25, `.45`, 7, 1, `Rapid.`, 1),
// new Gear(`MAC-10`, 2, 5, `.45`, 30, 2, `Auto. Rapid. -1 RATK`, 2),

const Backpack = new Gear({
	id: `7caea7f9-2dd6-4a98-8d6c-899d66e734e7`,
	name: `Backpack`,
	desc: [
		`2 rounds to access.`,
	],
	sz: 1
});
Backpack.slots = 30;

const Bandoleer = new Gear({
	id: `ddb41f64-a0fa-43e8-a4cc-60eb2932e82b`,
	name: `Bandoleer`,
	desc: [
		`Holds 50 bullets of any caliber.`,
	],
	sz: 0,
	slots: 1
});

const BDUJacket = new Gear({
	id: `4288e7a8-01c0-49aa-8093-0bfaad3f9011`,
	name: `BDU Jacket`,
	desc: [
		`Camo.`,
	],
	sz: 0,
	slots: 4
});

const CargoPants = new Gear({
	id: `5120d13e-d85d-4f58-a74e-e9a1d2d5c4c2`,
	name: `Cargo Pants`,
	desc: [
		`Camo.`,
	],
	sz: 1,
	slots: 6
});

const Canteen = new Gear({
	id: `a61e20a4-89c8-438e-b483-9da4de93d112`,
	name: `Canteen`,
	desc: [
		`Holds 1 unit (.5gal) of liquid.`,
		`Metal.`,
	],
	sz: 1,
	slots: 1
});

const ConcealedHolster = new Gear({
	id: `4796d7d9-15ad-4d4f-9e5c-f85944a9de41`,
	name: `Concealed Holster`,
	desc: [
		`Perception 12# to spot a Size 1 Gun.`,
	],
	sz: 0,
	slots: 1
});

const Cooler = new Gear({
	id: `3305d4c0-1049-48fd-a478-76f487280f71`,
	name: `Cooler`,
	desc: [
		`Hunted or Foraged Food lasts 6 days.`,
	],
	sz: 4,
	slots: 30
});

const DuffelBag = new Gear({
	id: `8b2feee5-b9c9-4a0e-9e9b-c4971de669c3`,
	name: `Duffel Bag`,
	desc: [
		`2 rounds to access.`,
	],
	sz: 3,
	slots: 40
});

const FuelCan = new Gear({
	id: `42db67a0-e9a1-44fe-99ba-e5c62a986bec`,
	name: `Fuel Can`,
	desc: [
		`5gal Fuel.`,
		`d6 Fire Damage/gal, 1min, 1yd/gal Blast.`,
	],
	sz: 2,
	slots: 5
});

const Hoody = new Gear({
	id: `cf65b23b-706d-438b-b89d-31e4eb8e6329`,
	name: `Hoody`,
	desc: [
		`Cold Resistance.`,
	],
	sz: 0,
	slots: 2
});

const HydrationPack = new Gear({
	id: `5287fe67-386f-43e1-9e65-5be527769990`,
	name: `Hydration Pack`,
	desc: [
		`Holds 4 units (2gal) of liquid.`,
	],
	sz: 1,
	slots: 4
});

const Lockbox = new Gear({
	id: `84a145e0-51b4-423b-bb39-2ef9672a1768`,
	name: `Lockbox`,
	desc: [
		`2 Damage Resistance.`,
		`Fire Resistance.`,
		`Larceny(Disable) 9#.`,
	],
	sz: 2,
	slots: 1
});

const MessengerBag = new Gear({
	id: `6002e120-8d3c-448a-a6cf-e96a53e9cd5d`,
	name: `Messenger Bag`,
	desc: [
		`1 round to access.`,
	],
	sz: 2,
	slots: 4
});

const PlasticJug = new Gear({
	id: `84943a54-249d-4a6e-b374-c4f4b853003c`,
	name: `Plastic Jug`,
	desc: [
		`Holds 2 units (1gal) of liquid.`,
	],
	sz: 1,
	slots: 2
});

const Purse = new Gear({
	id: `7abdf601-5d37-4d04-9187-6c145f64aa72`,
	name: `Purse`,
	desc: [
		`1 round to access.`,
	],
	sz: 1,
	slots: 3
});

const Speedloader = new Gear({
	id: `11224942-3b02-412a-a8f5-294ccedd8d15`,
	name: `Speed-loader`,
	desc: [
		`Reload a revolver cylinder as 1 action.`,
	],
	sz: 0,
	slots: 0
});

const ToolBelt = new Gear({
	id: `f82fec74-827a-4ce7-988e-d3f7c4da2aec`,
	name: `Tool Belt`,
	desc: [
		`6x 1 Slots.`,
		`+1 Build.`,
		`Miscellaneous small tools.`,
	],
	sz: 2,
	slots: 6
});

const TrenchCoat = new Gear({
	id: `fbcf0beb-01c5-443d-b86f-69e0a89078e4`,
	name: `Trench Coat`,
	desc: [
		`Cold Resistance.`,
		`+1 Stealth.`,
	],
	sz: 1,
	slots: 4
});

const WaterBottle = new Gear({
	id: `ce28fa26-8497-4234-b2df-2b0560f8d76b`,
	name: `Water Bottle`,
	desc: [
		`Holds 1 unit (.5gal) of liquid.`,
	],
	sz: 1,
	slots: 1
});

var StorageList = [
	Backpack,
	Bandoleer,
	BDUJacket,
	CargoPants,
	Canteen,
	ConcealedHolster,
	Cooler,
	DuffelBag,
	FuelCan,
	Hoody,
	HydrationPack,
	Lockbox,
	MessengerBag,
	PlasticJug,
	Purse,
	Speedloader,
	ToolBelt,
	TrenchCoat,
	WaterBottle,
];

var PropSort = (a, b, prop) => {
	if (a[prop] > b[prop]) return 1
	if (a[prop] < b[prop]) return -1
	return 0
};

var GearList = {
	name: `Gear`,
	list: [
		...AccessoryList,
		...AmmoList,
		...ArmorList,
		...BombList,
		...DocumentList,
		...DrugsList,
		...ElectronicsList,
		...MiscList,
		...MedicalList,
		...MeleeWeaponList,
		...RangedWeaponList,
		...StorageList,
		// ...VehicleList,
	].sort((a, b) => PropSort(a, b, `name`)),
	categories: [
		'melee',
		'ranged',
		'ammo',
		'armor',
		'equipment.js'
	]
};

const Chemical = new Gear({
	id: `0b4cf104-79ba-454b-bc37-845b18da0935`,
	name: `Chemical`,
	desc: [
		`Substances used for Science(Chemistry).`,
	],
	sz: 1
});

const Food = new Gear({
	id: `7da8fdf2-1af2-4aea-b246-c49ac8d6493d`,
	name: `Food`,
	desc: [
		`1 unit Needed per day to prevent Starvation.`,
	],
	sz: 1
});

const Fuel = new Gear({
	id: `e4f52ef5-c264-4383-8a1d-b48c9790b11b`,
	name: `Fuel`,
	desc: [
		`Flammable liquid. Used to power Vehicles and make explosives.`,
	],
	sz: 1
});

const Part = new Gear({
	id: `787c1545-e2c8-466e-bd5f-7d72907dde21`,
	name: `Part`,
	desc: [
		`Scrap used for Build and Science(Tech).`,
	],
	sz: 1
});

const Water = new Gear({
	id: `046c84cf-e2dd-4738-93b7-862c300ccd8d`,
	name: `Water`,
	desc: [
		`1 unit Needed per day to prevent Dehydration.`,
	],
	sz: 1
});

var ResourcesList = [
	Chemical,
	Food,
	Fuel,
	Part,
	Water,
];

const BobbyPin = new Gear({
	id: `e0b1000c-1ee7-470e-937a-230282a2cca5`,
	name: `Bobby Pin`,
	desc: [
		`Allows Larceny(Disable) roll on key locks.`,
	],
	sz: 0
});

const BoltCutters = new Gear({
	id: `0532c870-afbb-419c-9030-c447616d7845`,
	name: `Bolt Cutters`,
	desc: [
		`C9# to cut metal (Handcuffs, Padlocks, etc).`,
	],
	sz: 3
});

const DuctTape = new Gear({
	id: `7926ac87-740e-4b46-9f87-1d85abbd90b6`,
	name: `Duct Tape`,
	desc: [
		`+1 Build/1yd or use 2yds as Handcuffs.`,
		`60yds.`,
	],
	sz: 1
});

const GlassCutter = new Gear({
	id: `41312b6f-d4c8-4d56-af43-dbe196799b6a`,
	name: `Glass Cutter`,
	desc: [
		`Cuts glass quietly.`,
	],
	sz: 0
});

const GunCleaningKit = new Gear({
	id: `ea495af3-a158-490c-84d4-bbebe3b6fb2b`,
	name: `Gun Cleaning Kit`,
	desc: [
		`Gun gets +1 Ranged for 1 day.`,
		`Takes 1hr/gun.`,
	],
	sz: 1
});

const Hacksaw = new Gear({
	id: `382854d4-c562-49b7-89c5-866a6d9daeea`,
	name: `Hacksaw`,
	desc: [
		`1 Damage/round of sawing to almost any material.`,
	],
	sz: 2
});

const Lockpicks = new Gear({
	id: `e0aba732-0986-4f8c-8192-da1f6ea378c7`,
	name: `Lockpicks`,
	desc: [
		`+3 Larceny(Disable) key locks.`,
		`6 picks.`,
	],
	sz: 1
});

const MagnifyingGlass = new Gear({
	id: `f2c04b01-fdef-4be6-8283-904d8fffe8b0`,
	name: `Magnifying Glass`,
	desc: [
		`+6 Perception(See) to inspect tiny details.`,
	],
	sz: 1
});

const MeasuringCup = new Gear({
	id: `1a46681d-2163-4c43-aaa2-c6b9efe75196`,
	name: `Measuring Cup`,
	desc: [
		`+3 Science(Chemistry).`,
		`Marked glass cup.`,
	],
	sz: 1
});

const Multitool = new Gear({
	id: `c17183d6-527d-482f-a83b-a2410b5e05bb`,
	name: `Multi-tool`,
	desc: [
		`+1 Larceny(Disable), Build, Science(Tech).`,
	],
	sz: 1
});

const SprayPaint = new Gear({
	id: `9dd8ffb9-9e74-4aec-b355-0dc1d13eab54`,
	name: `Spray Paint`,
	desc: [
		`Ranged Attack, Called Shot: Head.`,
		`Blind d6 rounds.`,
		`10 uses.`,
	],
	sz: 1
});

const SwissArmyKnife = new Gear({
	id: `8f69d1cb-d480-460f-8dd5-fc438910965f`,
	name: `Swiss Army Knife`,
	desc: [
		`+1 Build and Survival.`,
	],
	sz: 1
});

const TapeMeasure = new Gear({
	id: `eccf841d-227d-4b1c-9c53-5de6756e2916`,
	name: `Tape Measure`,
	desc: [
		`+1 Build.`,
		`10yd long wind-up metal tape.`,
	],
	sz: 2
});

const ToolBag = new Gear({
	id: `9b65e724-79b7-48f2-9dc7-54340f606b32`,
	name: `Tool Bag`,
	desc: [
		`+3 Build.`,
		`Pliers, wrenches, level, etc.`,
	],
	sz: 3
});

const WireSaw = new Gear({
	id: `e4d0ff31-be07-4604-bc20-2bb870d62202`,
	name: `Wire Saw`,
	desc: [
		`1 Damage/round of sawing to wood or bone.`,
	],
	sz: 1
});

var ToolsList = [
	BobbyPin,
	BoltCutters,
	DuctTape,
	GlassCutter,
	GunCleaningKit,
	Hacksaw,
	Lockpicks,
	MagnifyingGlass,
	MeasuringCup,
	Multitool,
	SprayPaint,
	SwissArmyKnife,
	TapeMeasure,
	ToolBag,
	WireSaw,
];

const Balaclava = new Gear({
	id: `9e007b95-d9d8-4ce4-996c-67ab0e8780d7`,
	name: `Balaclava`,
	desc: [
		`+1 Stealth.`,
		`Mask.`,
		`Cold Resistance.`,
	],
	sz: 0
});

const Bandanna = new Gear({
	id: `2654de72-2021-419d-bff8-2905acea9f19`,
	name: `Bandanna`,
	desc: [
		`+1 Constitution vs airborne toxins.`,
		`Can use as Bandage.`,
	],
	sz: 0
});

const BaseballCap = new Gear({
	id: `aafd9c89-2232-46ff-b4e9-9fb0ad5c5785`,
	name: `Baseball Cap`,
	desc: [
		`Reduce Visibility(Rain and Sun) penalty by 1.`,
	],
	sz: 0
});

const Carabiner = new Gear({
	id: `08b38da4-9a62-4392-b0a4-2f385170faa6`,
	name: `Carabiner`,
	desc: [
		`+1 Athletics(Climb and Rappel).`,
		`Holds 50Sz.`,
	],
	sz: 0
});

const ChokerLeash = new Gear({
	id: `e384ba68-ba77-41b4-87bc-3cb557e756d7`,
	name: `Choker Leash`,
	desc: [
		`+3 Tame.`,
		`Grabbed.`,
		`Constitution +3 vs Constitution to control.`,
	],
	sz: 1
});

const CowboyHat = new Gear({
	id: `f6b35c1e-c93b-46ca-8929-2cc471f04ce2`,
	name: `Cowboy Hat`,
	desc: [
		`Reduce Visibility(Rain and Sun) penalty by 3.`,
	],
	sz: 0
});

const DustMask = new Gear({
	id: `29fde8e8-bca7-4561-b366-8fde6e4ab727`,
	name: `Dust Mask`,
	desc: [
		`+1 Constitution vs airborne toxins.`,
		`Mask.`,
	],
	sz: 1
});

const EarPlugs = new Gear({
	id: `2ae22454-3213-4596-95ba-ed2c45148900`,
	name: `Ear Plugs`,
	desc: [
		`No Deafness from noise.`,
		`-3 Perception(Hear).`,
	],
	sz: 9
});

const Flippers = new Gear({
	id: `0b819838-ab50-41c0-864f-918dda1ab43d`,
	name: `Flippers`,
	desc: [
		`+3 Athletics(Swim).`,
		`-6 walking Speed.`,
	],
	sz: 2
});

const GasMask = new Gear({
	id: `55589bfd-03b7-4773-9f3b-5ecfbd358295`,
	name: `Gas Mask`,
	desc: [
		`+6 Constitution vs airborne toxins.`,
		`Mask.`,
		`-1 Perception.`,
	],
	sz: 1
});

const Goggles = new Gear({
	id: `f9a6ee27-e2e7-4737-a33f-6275b625a175`,
	name: `Goggles`,
	desc: [
		`+3 Constitution to resist toxins in eyes.`,
	],
	sz: 1
});

const Handcuffs = new Gear({
	id: `e8da5e5c-f467-4ff0-88c1-6159b6be4f8a`,
	name: `Handcuffs`,
	desc: [
		`Restrained if placed on Arms.`,
		`Speed = 1 if placed on Legs.`,
		`A15# to escape.`,
		`Larceny(Disable) 12#.`,
	],
	sz: 1
});

const LeatherBelt = new Gear({
	id: `7441d79f-2a41-49ff-a494-4c7b960e4652`,
	name: `Leather Belt`,
	desc: [
		`1yd strap.`,
		`Stops Limb Bleeding.`,
		`Holds 50Sz.`,
	],
	sz: 1
});

const Lifejacket = new Gear({
	id: `d0c4d02c-d3cb-43a2-ae8d-f7d49b2039e1`,
	name: `Lifejacket`,
	desc: [
		`+6 Athletics(Swim).`,
		`Prevents drowning.`,
	],
	sz: 2
});

const Makeup = new Gear({
	id: `86b19d29-0416-4582-9caf-492189f4c374`,
	name: `Makeup`,
	desc: [
		`+1 Socialize and Entertain for 6hrs.`,
		`30 uses.`,
	],
	sz: 0
});

const Poncho = new Gear({
	id: `f8696907-f9b0-40ba-852c-cdd4db1b1b0a`,
	name: `Poncho`,
	desc: [
		`Cold Resistance.`,
		`Waterproof.`,
	],
	sz: 0
});

const Rollerblades = new Gear({
	id: `9c8a233d-ad46-4061-bccb-83d0c8d3675d`,
	name: `Rollerblades`,
	desc: [
		`Athletics 6#.`,
		`Speed x3.`,
		`1 round equip.`,
		`Fail:Prone.`,
	],
	sz: 2
});

const RunningShoes = new Gear({
	id: `0e2fd35b-7ad8-48e2-9ce0-d3c75d4fbc96`,
	name: `Running Shoes`,
	desc: [
		`+1 mile of Jogging distance.`,
	],
	sz: 2
});

const Snorkel = new Gear({
	id: `363caa92-34f5-4170-940f-9c908f5d513b`,
	name: `Snorkel`,
	desc: [
		`Breathe while just beneath water's surface.`,
	],
	sz: 1
});

const Sunglasses = new Gear({
	id: `896a7b9a-f6bc-4275-84d9-f4d6d06fb5b5`,
	name: `Sunglasses`,
	desc: [
		`No Visibility(Sun) penalty.`,
		`+1 Constitution vs light.`,
	],
	sz: 0
});

const ThermalUnderwear = new Gear({
	id: `0c9b6cba-f1e2-4538-96c4-15340ab5e5e3`,
	name: `Thermal Underwear`,
	desc: [
		`Cold Resistance.`,
		`Can use as 6 Bandages.`,
	],
	sz: 1
});

const Wristwatch = new Gear({
	id: `d29b3e8f-de0d-4c5e-8b23-f6d131baf014`,
	name: `Wristwatch`,
	desc: [
		`Tells time and +1 Survival(Navigate).`,
	],
	sz: 0
});

var WearableList = [
	Balaclava,
	Bandanna,
	BaseballCap,
	Carabiner,
	ChokerLeash,
	CowboyHat,
	DustMask,
	EarPlugs,
	Flippers,
	GasMask,
	Goggles,
	Handcuffs,
	LeatherBelt,
	Lifejacket,
	Makeup,
	Poncho,
	Rollerblades,
	RunningShoes,
	Snorkel,
	Sunglasses,
	ThermalUnderwear,
	Wristwatch,
];

var EquipmentList = [
	...DocumentList,
	...DrugsList,
	...ElectronicsList,
	...MedicalList,
	...MiscList,
	...ResourcesList,
	...StorageList,
	...ToolsList,
	...WearableList,
];

var Capitalize = (string) => {
	return string
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.substring(1))
		.join(' ')
};

/* src/components/views/widgets/GearBlock.svelte generated by Svelte v3.29.4 */

const css$2 = {
	code: "strong.svelte-ifz1xi{font-weight:bold}ul.svelte-ifz1xi{list-style:disc;margin-left:var(--s100)}.item-qty.svelte-ifz1xi{width:20%}",
	map: "{\"version\":3,\"file\":\"GearBlock.svelte\",\"sources\":[\"GearBlock.svelte\"],\"sourcesContent\":[\"<script>\\n\\texport let mode, item\\n\\n\\tconst itemProps = [\\n\\t\\t{\\n\\t\\t\\tname: 'Damage',\\n\\t\\t\\tabv: 'dmg'\\n\\t\\t},\\n\\t\\t{\\n\\t\\t\\tname: 'Range',\\n\\t\\t\\tabv: 'rng'\\n\\t\\t},\\n\\t\\t{\\n\\t\\t\\tname: 'Magazine',\\n\\t\\t\\tabv: 'cap'\\n\\t\\t},\\n\\t\\t{\\n\\t\\t\\tname: 'Caliber',\\n\\t\\t\\tabv: 'cal'\\n\\t\\t},\\n\\t\\t{\\n\\t\\t\\tname: 'Quantity',\\n\\t\\t\\tabv: 'qty'\\n\\t\\t},\\n\\t\\t{\\n\\t\\t\\tname: 'Fuse',\\n\\t\\t\\tabv: 'fuse'\\n\\t\\t},\\n\\t\\t{\\n\\t\\t\\tname: 'Duration',\\n\\t\\t\\tabv: 'dur'\\n\\t\\t},\\n\\t\\t{\\n\\t\\t\\tname: 'Mix Difficulty',\\n\\t\\t\\tabv: 'mix'\\n\\t\\t},\\n\\t\\t{\\n\\t\\t\\tname: 'Overdose Possible',\\n\\t\\t\\tabv: 'od'\\n\\t\\t},\\n\\t\\t{\\n\\t\\t\\tname: 'Hours',\\n\\t\\t\\tabv: 'hrs'\\n\\t\\t},\\n\\t\\t{\\n\\t\\t\\tname: 'Slots',\\n\\t\\t\\tabv: 'slots'\\n\\t\\t},\\n\\t\\t{\\n\\t\\t\\tname: 'Damage Resistance',\\n\\t\\t\\tabv: 'dr'\\n\\t\\t},\\n\\t\\t{\\n\\t\\t\\tname: 'Body Part',\\n\\t\\t\\tabv: 'loc'\\n\\t\\t},\\n\\t\\t{\\n\\t\\t\\tname: 'Size',\\n\\t\\t\\tabv: 'sz'\\n\\t\\t},\\n\\t]\\n</script>\\n\\n\\n<div class='gear-block'>\\n\\t{#if item}\\n\\t\\t{#if item.name}\\n\\t\\t\\t<p><strong>{item.name}</strong></p>\\n\\t\\t{/if}\\n\\t\\t{#if item.desc}\\n\\t\\t\\t{#each item.desc as desc}\\n\\t\\t\\t\\t<p>{desc}</p>\\n\\t\\t\\t{/each}\\n\\t\\t{/if}\\n\\t\\t{#each itemProps as prop}\\n\\t\\t\\t{#if item[prop.abv]}\\n\\t\\t\\t\\t<p>\\n\\t\\t\\t\\t\\t<u>{prop.name}</u>: \\n\\t\\t\\t\\t\\t{#if prop.name == 'Quantity' && mode == 'edit'}\\n\\t\\t\\t\\t\\t\\t<input type='number' class='item-qty' min='0' bind:value={item.qty} />\\n\\t\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t\\t{item[prop.abv]}\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t</p>\\n\\t\\t\\t{/if}\\n\\t\\t{/each}\\n\\t\\t{#if item && item.hasOwnProperty('attr') && item.attr.length > 0}\\n\\t\\t\\t<p><u>Attributes</u>:</p>\\n\\t\\t\\t<div class='attributes'>\\n\\t\\t\\t\\t<ul>\\n\\t\\t\\t\\t\\t{#each item.attr as attr}\\n\\t\\t\\t\\t\\t\\t<li>{attr.name}:{#each attr.desc as line}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t&nbsp;{line}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t\\t\\t</li>\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t</ul>\\n\\t\\t\\t</div>\\n\\t\\t{/if}\\n\\t\\t{#if item.table}\\n\\t\\t\\t<svelte:component this={item.table}/>\\n\\t\\t{/if}\\n\\t{/if}\\n</div>\\n\\n\\n<style>\\n\\tstrong {\\n\\t\\tfont-weight: bold;\\n\\t}\\n\\tul {\\n\\t\\tlist-style: disc;\\n\\t\\tmargin-left: var(--s100);\\n\\t}\\n\\t.item-qty {\\n\\t\\twidth: 20%;\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AA2GC,MAAM,cAAC,CAAC,AACP,WAAW,CAAE,IAAI,AAClB,CAAC,AACD,EAAE,cAAC,CAAC,AACH,UAAU,CAAE,IAAI,CAChB,WAAW,CAAE,IAAI,MAAM,CAAC,AACzB,CAAC,AACD,SAAS,cAAC,CAAC,AACV,KAAK,CAAE,GAAG,AACX,CAAC\"}"
};

const GearBlock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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

	if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0) $$bindings.mode(mode);
	if ($$props.item === void 0 && $$bindings.item && item !== void 0) $$bindings.item(item);
	$$result.css.add(css$2);

	return `<div class="${"gear-block"}">${item
	? `${item.name
		? `<p><strong class="${"svelte-ifz1xi"}">${escape(item.name)}</strong></p>`
		: ``}
		${item.desc
		? `${each(item.desc, desc => `<p>${escape(desc)}</p>`)}`
		: ``}
		${each(itemProps, prop => `${item[prop.abv]
		? `<p><u>${escape(prop.name)}</u>: 
					${prop.name == "Quantity" && mode == "edit"
			? `<input type="${"number"}" class="${"item-qty svelte-ifz1xi"}" min="${"0"}"${add_attribute("value", item.qty, 1)}>`
			: `${escape(item[prop.abv])}`}
				</p>`
		: ``}`)}
		${item && item.hasOwnProperty("attr") && item.attr.length > 0
		? `<p><u>Attributes</u>:</p>
			<div class="${"attributes"}"><ul class="${"svelte-ifz1xi"}">${each(item.attr, attr => `<li>${escape(attr.name)}:${each(attr.desc, line => `
											 ${escape(line)}`)}
						</li>`)}</ul></div>`
		: ``}
		${item.table
		? `${validate_component(item.table || missing_component, "svelte:component").$$render($$result, {}, {}, {})}`
		: ``}`
	: ``}
</div>`;
});

/* src/components/views/character/GearItem.svelte generated by Svelte v3.29.4 */

const css$3 = {
	code: ".gear-item.svelte-1k79j59{border:1px solid lime;box-sizing:border-box;display:flex;justify-content:space-between;margin-bottom:var(--s100);padding:var(--s100);width:100%}.trash.svelte-1k79j59{text-align:right}",
	map: "{\"version\":3,\"file\":\"GearItem.svelte\",\"sources\":[\"GearItem.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport GearBlock from 'views/widgets/GearBlock.svelte'\\n\\timport { character } from 'stores/characterStore.js'\\n\\n\\texport let mode, category, item, index\\n\\n\\tconst trashItem = (category, index=0) => {\\n\\t\\t$character.gear[category].inventory.splice(index, 1)\\n\\t\\t$character = $character\\n\\t}\\n</script>\\n\\n\\n<div class='gear-item'>\\n\\t<GearBlock {item} {mode} />\\n\\t{#if mode != 'readonly'}\\n\\t\\t<div class='trash'>\\n\\t\\t\\t<button class='btn-box trash-btn' on:click={_ => trashItem(category, index)}>\\n\\t\\t\\t\\t<div class='btn-icon'>&#10006;</div>\\n\\t\\t\\t</button>\\n\\t\\t</div>\\n\\t{/if}\\n</div>\\n\\n\\n<style>\\n\\t.gear-item {\\n\\t\\tborder: 1px solid lime;\\n\\t\\tbox-sizing: border-box;\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: space-between;\\n\\t\\tmargin-bottom: var(--s100);\\n\\t\\tpadding: var(--s100);\\n\\t\\twidth: 100%;\\n\\t}\\n\\t.trash {\\n\\t\\ttext-align: right;\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AA0BC,UAAU,eAAC,CAAC,AACX,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CACtB,UAAU,CAAE,UAAU,CACtB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,aAAa,CAAE,IAAI,MAAM,CAAC,CAC1B,OAAO,CAAE,IAAI,MAAM,CAAC,CACpB,KAAK,CAAE,IAAI,AACZ,CAAC,AACD,MAAM,eAAC,CAAC,AACP,UAAU,CAAE,KAAK,AAClB,CAAC\"}"
};

const GearItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $character = get_store_value(character);

	let { mode } = $$props,
		{ category } = $$props,
		{ item } = $$props,
		{ index } = $$props;

	if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0) $$bindings.mode(mode);
	if ($$props.category === void 0 && $$bindings.category && category !== void 0) $$bindings.category(category);
	if ($$props.item === void 0 && $$bindings.item && item !== void 0) $$bindings.item(item);
	if ($$props.index === void 0 && $$bindings.index && index !== void 0) $$bindings.index(index);
	$$result.css.add(css$3);

	return `<div class="${"gear-item svelte-1k79j59"}">${validate_component(GearBlock, "GearBlock").$$render($$result, { item, mode }, {}, {})}
	${mode != "readonly"
	? `<div class="${"trash svelte-1k79j59"}"><button class="${"btn-box trash-btn"}"><div class="${"btn-icon"}">✖</div></button></div>`
	: ``}
</div>`;
});

/* src/components/views/character/GearCategory.svelte generated by Svelte v3.29.4 */

const css$4 = {
	code: ".gear-category.svelte-14kbeq3{border:1px solid lime;box-sizing:border-box;display:block;margin-bottom:var(--s100)}.gear-category-card.svelte-14kbeq3{margin:var(--s100)}",
	map: "{\"version\":3,\"file\":\"GearCategory.svelte\",\"sources\":[\"GearCategory.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport AddItemModal from 'views/character/AddItemModal.svelte'\\n\\timport Capitalize from 'utils/Capitalize.js'\\n\\timport GearItem from 'views/character/GearItem.svelte'\\n\\timport { character } from 'stores/characterStore.js'\\n\\n\\texport let mode, category\\n\\n\\tlet modalVisible = false\\n\\n\\tconst toggleAddItemModal = _ => modalVisible = !modalVisible\\n</script>\\n\\n\\n<details class='gear-category' close>\\n\\t<summary>{Capitalize(category)}</summary>\\n\\t<div class='gear-category-card'>\\n\\t\\t<div class='gear-item-list'>\\n\\t\\t\\t{#each $character.gear[category].inventory as item, index}\\n\\t\\t\\t\\t<GearItem {mode} {category} {item} {index} />\\n\\t\\t\\t{/each}\\n\\t\\t</div>\\n\\t\\t{#if mode != 'readonly'}\\n\\t\\t\\t<div class='add-section'>\\n\\t\\t\\t\\t<button class='btn-box add-btn' on:click={toggleAddItemModal}>\\n\\t\\t\\t\\t\\t<div class='btn-icon'>&#10010;</div>\\n\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t{#if modalVisible}\\n\\t\\t\\t\\t\\t<AddItemModal on:close={toggleAddItemModal} {category} />\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t</div>\\n\\t\\t{/if}\\n\\t</div>\\n</details>\\n\\n\\n<style>\\n\\t.gear-category {\\n\\t\\tborder: 1px solid lime;\\n\\t\\tbox-sizing: border-box;\\n\\t\\tdisplay: block;\\n\\t\\tmargin-bottom: var(--s100);\\n\\t}\\n\\t.gear-category-card {\\n\\t\\tmargin: var(--s100);\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AAqCC,cAAc,eAAC,CAAC,AACf,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CACtB,UAAU,CAAE,UAAU,CACtB,OAAO,CAAE,KAAK,CACd,aAAa,CAAE,IAAI,MAAM,CAAC,AAC3B,CAAC,AACD,mBAAmB,eAAC,CAAC,AACpB,MAAM,CAAE,IAAI,MAAM,CAAC,AACpB,CAAC\"}"
};

const GearCategory = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $character = get_store_value(character);
	let { mode } = $$props, { category } = $$props;
	if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0) $$bindings.mode(mode);
	if ($$props.category === void 0 && $$bindings.category && category !== void 0) $$bindings.category(category);
	$$result.css.add(css$4);

	return `<details class="${"gear-category svelte-14kbeq3"}" close><summary>${escape(Capitalize(category))}</summary>
	<div class="${"gear-category-card svelte-14kbeq3"}"><div class="${"gear-item-list"}">${each($character.gear[category].inventory, (item, index) => `${validate_component(GearItem, "GearItem").$$render($$result, { mode, category, item, index }, {}, {})}`)}</div>
		${mode != "readonly"
	? `<div class="${"add-section"}"><button class="${"btn-box add-btn"}"><div class="${"btn-icon"}">✚</div></button>
				${ ``}</div>`
	: ``}</div>
</details>`;
});

/* src/components/views/character/Gear.svelte generated by Svelte v3.29.4 */

const Gear_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { mode = "readonly" } = $$props;
	if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0) $$bindings.mode(mode);

	return `<details class="${"sheet-details"}" close><summary class="${"sheet-card-title"}">Gear</summary>
	<div class="${"sheet-card"}"><div class="${"gear-category-list"}">${each(GearList.categories, category => `${validate_component(GearCategory, "GearCategory").$$render($$result, { mode, category }, {}, {})}`)}</div></div></details>`;
});

/* src/components/views/character/BodyParts.svelte generated by Svelte v3.29.4 */

const css$5 = {
	code: "input[type='number'].svelte-eczy0o{width:var(--s200)}.body-parts-section.svelte-eczy0o{display:flex;justify-content:center;max-width:100%}div[class*=column].svelte-eczy0o{display:block;height:100%;width:auto}.center-column.svelte-eczy0o{margin-top:10px;text-align:center;width:100%}div[class*=-label].svelte-eczy0o{display:inline-block;height:10px;position:relative;text-align:center;width:100%}.head-label.svelte-eczy0o,.torso-label.svelte-eczy0o{top:30px}.left-arm-label.svelte-eczy0o,.right-arm-label.svelte-eczy0o{top:120px}.left-leg-label.svelte-eczy0o,.right-leg-label.svelte-eczy0o{top:210px}.body-part.svelte-eczy0o{background-color:lime}.body-part-numbers.svelte-eczy0o{margin:5px}div[class*=level].svelte-eczy0o{display:flex;justify-content:center}.head.svelte-eczy0o{border-radius:50%;border:1px;height:50px;margin-bottom:5px;width:50px}.arm.svelte-eczy0o{border-bottom-left-radius:15px;border-bottom-right-radius:15px;height:140px;width:20px}.left-arm.svelte-eczy0o{border-top-left-radius:30px}.right-arm.svelte-eczy0o{border-top-right-radius:30px}.torso.svelte-eczy0o{color:rgba(15, 30, 15, 1);height:150px;margin:0 5px;text-align:center;width:70px}.leg.svelte-eczy0o{border-bottom-right-radius:15px;border-bottom-left-radius:15px;height:160px;width:28px}.left-leg.svelte-eczy0o{margin-right:14px}",
	map: "{\"version\":3,\"file\":\"BodyParts.svelte\",\"sources\":[\"BodyParts.svelte\"],\"sourcesContent\":[\"<script>\\n\\texport let character, mode\\n</script>\\n\\n\\n<div class='body-parts-section'>\\n\\t<div class='left-column'>\\n\\t\\t<div class='head-label'>\\n\\t\\t\\t<div class='body-part-name'>\\n\\t\\t\\t\\t{$character.health.head.name}\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class='body-part-numbers'>\\n\\t\\t\\t\\t{#if mode == 'readonly'}\\n\\t\\t\\t\\t\\t{$character.health.head.score}\\n\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t<input type='number'\\n\\t\\t\\t\\t\\t\\tbind:value='{$character.health.head.current}'\\n\\t\\t\\t\\t\\t\\tmin='-{$character.health.head.score}'\\n\\t\\t\\t\\t\\t\\tmax='{$character.health.head.score}'\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t{/if} / {$character.health.head.score}\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t\\t<div class='left-arm-label'>\\n\\t\\t\\t<div class='body-part-name'>\\n\\t\\t\\t\\t{$character.health.leftArm.name}\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class='body-part-numbers'>\\n\\t\\t\\t\\t{#if mode == 'readonly'}\\n\\t\\t\\t\\t\\t{$character.health.leftArm.score}\\n\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t<input type='number'\\n\\t\\t\\t\\t\\t\\tbind:value='{$character.health.leftArm.current}'\\n\\t\\t\\t\\t\\t\\tmin='-{$character.health.leftArm.score}'\\n\\t\\t\\t\\t\\t\\tmax='{$character.health.leftArm.score}'\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t{/if} / {$character.health.leftArm.score}\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t\\t<div class='left-leg-label'>\\n\\t\\t\\t<div class='body-part-name'>\\n\\t\\t\\t\\t{$character.health.leftLeg.name}\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class='body-part-numbers'>\\n\\t\\t\\t\\t{#if mode == 'readonly'}\\n\\t\\t\\t\\t\\t{$character.health.leftLeg.score}\\n\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t<input type='number'\\n\\t\\t\\t\\t\\t\\tbind:value='{$character.health.leftLeg.current}'\\n\\t\\t\\t\\t\\t\\tmin='-{$character.health.leftLeg.score}'\\n\\t\\t\\t\\t\\t\\tmax='{$character.health.leftLeg.score}'\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t{/if} / {$character.health.leftLeg.score}\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t</div>\\n\\t<div class='center-column'>\\n\\t\\t<div class='head-level'>\\n\\t\\t\\t<div class='head body-part' />\\n\\t\\t</div>\\n\\t\\t<div class='torso-level'>\\n\\t\\t\\t<div class='left-arm arm body-part' />\\n\\t\\t\\t<div class='torso body-part' />\\n\\t\\t\\t<div class='right-arm arm body-part' />\\n\\t\\t</div>\\n\\t\\t<div class='legs-level'>\\n\\t\\t\\t<div class='left-leg leg body-part' />\\n\\t\\t\\t<div class='right-leg leg body-part' />\\n\\t\\t</div>\\n\\t</div>\\n\\t<div class='right-column'>\\n\\t\\t<div class='torso-label'>\\n\\t\\t\\t<div class='body-part-name'>\\n\\t\\t\\t\\t{$character.health.torso.name}\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class='body-part-numbers'>\\n\\t\\t\\t\\t{#if mode == 'readonly'}\\n\\t\\t\\t\\t\\t{$character.health.torso.score}\\n\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t<input type='number'\\n\\t\\t\\t\\t\\t\\tbind:value='{$character.health.torso.current}'\\n\\t\\t\\t\\t\\t\\tmin='-{$character.health.torso.score}'\\n\\t\\t\\t\\t\\t\\tmax='{$character.health.torso.score}'\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t{/if} / {$character.health.torso.score}\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t\\t<div class='right-arm-label'>\\n\\t\\t\\t<div class='body-part-name'>\\n\\t\\t\\t\\t{$character.health.rightArm.name}\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class='body-part-numbers'>\\n\\t\\t\\t\\t{#if mode == 'readonly'}\\n\\t\\t\\t\\t\\t{$character.health.rightArm.score}\\n\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t<input type='number'\\n\\t\\t\\t\\t\\t\\tbind:value='{$character.health.rightArm.current}'\\n\\t\\t\\t\\t\\t\\tmin='-{$character.health.rightArm.score}'\\n\\t\\t\\t\\t\\t\\tmax='{$character.health.rightArm.score}'\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t{/if} / {$character.health.rightArm.score}\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t\\t<div class='right-leg-label'>\\n\\t\\t\\t<div class='body-part-name'>\\n\\t\\t\\t\\t{$character.health.rightLeg.name}\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class='body-part-numbers'>\\n\\t\\t\\t\\t{#if mode == 'readonly'}\\n\\t\\t\\t\\t\\t{$character.health.rightLeg.score}\\n\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t<input type='number'\\n\\t\\t\\t\\t\\t\\tbind:value='{$character.health.rightLeg.current}'\\n\\t\\t\\t\\t\\t\\tmin='-{$character.health.rightLeg.score}'\\n\\t\\t\\t\\t\\t\\tmax='{$character.health.rightLeg.score}'\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t{/if} / {$character.health.rightLeg.score}\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n\\n\\n<style>\\n\\tinput[type='number'] {\\n\\t\\twidth: var(--s200);\\n\\t}\\n\\t.body-parts-section {\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: center;\\n\\t\\tmax-width: 100%;\\n\\t}\\n\\tdiv[class*=column] {\\n\\t\\tdisplay: block;\\n\\t\\theight: 100%;\\n\\t\\twidth: auto;\\n\\t}\\n\\t.center-column {\\n\\t\\tmargin-top: 10px;\\n\\t\\ttext-align: center;\\n\\t\\twidth: 100%;\\n\\t}\\n\\tdiv[class*=-label] {\\n\\t\\tdisplay: inline-block;\\n\\t\\theight: 10px;\\n\\t\\tposition: relative;\\n\\t\\ttext-align: center;\\n\\t\\twidth: 100%;\\n\\t}\\n\\t.head-label, .torso-label {\\n\\t\\ttop: 30px;\\n\\t}\\n\\t.left-arm-label, .right-arm-label {\\n\\t\\ttop: 120px;\\n\\t}\\n\\t.left-leg-label, .right-leg-label {\\n\\t\\ttop: 210px;\\n\\t}\\n\\t.body-part {\\n\\t\\tbackground-color: lime;\\n\\t}\\n\\t.body-part-numbers {\\n\\t\\tmargin: 5px;\\n\\t}\\n\\tdiv[class*=level] {\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: center;\\n\\t}\\n\\t.head {\\n\\t\\tborder-radius: 50%;\\n\\t\\tborder: 1px;\\n\\t\\theight: 50px;\\n\\t\\tmargin-bottom: 5px;\\n\\t\\twidth: 50px;\\n\\t}\\n\\t.arm {\\n\\t\\tborder-bottom-left-radius: 15px;\\n\\t\\tborder-bottom-right-radius: 15px;\\n\\t\\theight: 140px;\\n\\t\\twidth: 20px;\\n\\t}\\n\\t.left-arm {\\n\\t\\tborder-top-left-radius: 30px;\\n\\t}\\n\\t.right-arm {\\n\\t\\tborder-top-right-radius: 30px;\\n\\t}\\n\\t.torso {\\n\\t\\tcolor: rgba(15, 30, 15, 1);\\n\\t\\theight: 150px;\\n\\t\\tmargin: 0 5px;\\n\\t\\ttext-align: center;\\n\\t\\twidth: 70px;\\n\\t}\\n\\t.leg {\\n\\t\\tborder-bottom-right-radius: 15px;\\n\\t\\tborder-bottom-left-radius: 15px;\\n\\t\\theight: 160px;\\n\\t\\twidth: 28px;\\n\\t}\\n\\t.left-leg {\\n\\t\\tmargin-right: 14px;\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AA4HC,KAAK,CAAC,IAAI,CAAC,QAAQ,CAAC,cAAC,CAAC,AACrB,KAAK,CAAE,IAAI,MAAM,CAAC,AACnB,CAAC,AACD,mBAAmB,cAAC,CAAC,AACpB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,SAAS,CAAE,IAAI,AAChB,CAAC,AACD,GAAG,CAAC,KAAK,EAAE,MAAM,CAAC,cAAC,CAAC,AACnB,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,AACZ,CAAC,AACD,cAAc,cAAC,CAAC,AACf,UAAU,CAAE,IAAI,CAChB,UAAU,CAAE,MAAM,CAClB,KAAK,CAAE,IAAI,AACZ,CAAC,AACD,GAAG,CAAC,KAAK,EAAE,MAAM,CAAC,cAAC,CAAC,AACnB,OAAO,CAAE,YAAY,CACrB,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,MAAM,CAClB,KAAK,CAAE,IAAI,AACZ,CAAC,AACD,yBAAW,CAAE,YAAY,cAAC,CAAC,AAC1B,GAAG,CAAE,IAAI,AACV,CAAC,AACD,6BAAe,CAAE,gBAAgB,cAAC,CAAC,AAClC,GAAG,CAAE,KAAK,AACX,CAAC,AACD,6BAAe,CAAE,gBAAgB,cAAC,CAAC,AAClC,GAAG,CAAE,KAAK,AACX,CAAC,AACD,UAAU,cAAC,CAAC,AACX,gBAAgB,CAAE,IAAI,AACvB,CAAC,AACD,kBAAkB,cAAC,CAAC,AACnB,MAAM,CAAE,GAAG,AACZ,CAAC,AACD,GAAG,CAAC,KAAK,EAAE,KAAK,CAAC,cAAC,CAAC,AAClB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,AACxB,CAAC,AACD,KAAK,cAAC,CAAC,AACN,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,GAAG,CACX,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,IAAI,AACZ,CAAC,AACD,IAAI,cAAC,CAAC,AACL,yBAAyB,CAAE,IAAI,CAC/B,0BAA0B,CAAE,IAAI,CAChC,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,IAAI,AACZ,CAAC,AACD,SAAS,cAAC,CAAC,AACV,sBAAsB,CAAE,IAAI,AAC7B,CAAC,AACD,UAAU,cAAC,CAAC,AACX,uBAAuB,CAAE,IAAI,AAC9B,CAAC,AACD,MAAM,cAAC,CAAC,AACP,KAAK,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAC1B,MAAM,CAAE,KAAK,CACb,MAAM,CAAE,CAAC,CAAC,GAAG,CACb,UAAU,CAAE,MAAM,CAClB,KAAK,CAAE,IAAI,AACZ,CAAC,AACD,IAAI,cAAC,CAAC,AACL,0BAA0B,CAAE,IAAI,CAChC,yBAAyB,CAAE,IAAI,CAC/B,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,IAAI,AACZ,CAAC,AACD,SAAS,cAAC,CAAC,AACV,YAAY,CAAE,IAAI,AACnB,CAAC\"}"
};

const BodyParts = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $character;
	let { character } = $$props, { mode } = $$props;
	$character = get_store_value(character);
	if ($$props.character === void 0 && $$bindings.character && character !== void 0) $$bindings.character(character);
	if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0) $$bindings.mode(mode);
	$$result.css.add(css$5);
	$character = get_store_value(character);

	return `<div class="${"body-parts-section svelte-eczy0o"}"><div class="${"left-column svelte-eczy0o"}"><div class="${"head-label svelte-eczy0o"}"><div class="${"body-part-name"}">${escape($character.health.head.name)}</div>
			<div class="${"body-part-numbers svelte-eczy0o"}">${mode == "readonly"
	? `${escape($character.health.head.score)}`
	: `<input type="${"number"}" min="${"-" + escape($character.health.head.score)}"${add_attribute("max", $character.health.head.score, 0)} class="${"svelte-eczy0o"}"${add_attribute("value", $character.health.head.current, 1)}>`} / ${escape($character.health.head.score)}</div></div>
		<div class="${"left-arm-label svelte-eczy0o"}"><div class="${"body-part-name"}">${escape($character.health.leftArm.name)}</div>
			<div class="${"body-part-numbers svelte-eczy0o"}">${mode == "readonly"
	? `${escape($character.health.leftArm.score)}`
	: `<input type="${"number"}" min="${"-" + escape($character.health.leftArm.score)}"${add_attribute("max", $character.health.leftArm.score, 0)} class="${"svelte-eczy0o"}"${add_attribute("value", $character.health.leftArm.current, 1)}>`} / ${escape($character.health.leftArm.score)}</div></div>
		<div class="${"left-leg-label svelte-eczy0o"}"><div class="${"body-part-name"}">${escape($character.health.leftLeg.name)}</div>
			<div class="${"body-part-numbers svelte-eczy0o"}">${mode == "readonly"
	? `${escape($character.health.leftLeg.score)}`
	: `<input type="${"number"}" min="${"-" + escape($character.health.leftLeg.score)}"${add_attribute("max", $character.health.leftLeg.score, 0)} class="${"svelte-eczy0o"}"${add_attribute("value", $character.health.leftLeg.current, 1)}>`} / ${escape($character.health.leftLeg.score)}</div></div></div>
	<div class="${"center-column svelte-eczy0o"}"><div class="${"head-level svelte-eczy0o"}"><div class="${"head body-part svelte-eczy0o"}"></div></div>
		<div class="${"torso-level svelte-eczy0o"}"><div class="${"left-arm arm body-part svelte-eczy0o"}"></div>
			<div class="${"torso body-part svelte-eczy0o"}"></div>
			<div class="${"right-arm arm body-part svelte-eczy0o"}"></div></div>
		<div class="${"legs-level svelte-eczy0o"}"><div class="${"left-leg leg body-part svelte-eczy0o"}"></div>
			<div class="${"right-leg leg body-part svelte-eczy0o"}"></div></div></div>
	<div class="${"right-column svelte-eczy0o"}"><div class="${"torso-label svelte-eczy0o"}"><div class="${"body-part-name"}">${escape($character.health.torso.name)}</div>
			<div class="${"body-part-numbers svelte-eczy0o"}">${mode == "readonly"
	? `${escape($character.health.torso.score)}`
	: `<input type="${"number"}" min="${"-" + escape($character.health.torso.score)}"${add_attribute("max", $character.health.torso.score, 0)} class="${"svelte-eczy0o"}"${add_attribute("value", $character.health.torso.current, 1)}>`} / ${escape($character.health.torso.score)}</div></div>
		<div class="${"right-arm-label svelte-eczy0o"}"><div class="${"body-part-name"}">${escape($character.health.rightArm.name)}</div>
			<div class="${"body-part-numbers svelte-eczy0o"}">${mode == "readonly"
	? `${escape($character.health.rightArm.score)}`
	: `<input type="${"number"}" min="${"-" + escape($character.health.rightArm.score)}"${add_attribute("max", $character.health.rightArm.score, 0)} class="${"svelte-eczy0o"}"${add_attribute("value", $character.health.rightArm.current, 1)}>`} / ${escape($character.health.rightArm.score)}</div></div>
		<div class="${"right-leg-label svelte-eczy0o"}"><div class="${"body-part-name"}">${escape($character.health.rightLeg.name)}</div>
			<div class="${"body-part-numbers svelte-eczy0o"}">${mode == "readonly"
	? `${escape($character.health.rightLeg.score)}`
	: `<input type="${"number"}" min="${"-" + escape($character.health.rightLeg.score)}"${add_attribute("max", $character.health.rightLeg.score, 0)} class="${"svelte-eczy0o"}"${add_attribute("value", $character.health.rightLeg.current, 1)}>`} / ${escape($character.health.rightLeg.score)}</div></div></div>
</div>`;
});

/* src/components/views/character/Health.svelte generated by Svelte v3.29.4 */

const Health = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { mode } = $$props;
	if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0) $$bindings.mode(mode);

	return `<details class="${"sheet-details"}" close><summary class="${"sheet-card-title"}">Health
	</summary>
	<div class="${"sheet-card"}">${validate_component(BodyParts, "BodyParts").$$render($$result, { character, mode }, {}, {})}</div></details>`;
});

class Ability extends Rule {
	constructor({
		id,
		name,
		desc,
		formula,
		visible,
		max,
		xp,
		taken=0,
		opts=[],
		selection=0,
		notes=``,
	}) {
		super({
			id,
			name,
			desc,
			visible,
			formula,
		});
		this.max = max;
		this.xp = xp;
		this.taken = taken;
		this.opts = opts;
		this.selection = selection,
		this.notes = notes;
	}
}

var WeaponList = [
	...MeleeWeaponList,
	...RangedWeaponList,
];

const FavoriteWeapon = new Ability({
	id: `4ccca696-fbf0-4144-8874-011b2ab1f567`,
	name: `Favorite Weapon`,
	desc: [
		`Any Botch with a specified weapon type is reduced in severity to a normal Fail.`,
	],
	max: 1,
	xp: 3,
	opts: WeaponList
});

const HyperImmunity = new Ability({
	id: `fd940b7e-8502-4aed-8630-bcdc1054216e`,
	name: `Hyper Immunity`,
	desc: [
		`+1 to resist Diseases.`,
	],
	max: 3,
	xp: 3
});

const PackMentality = new Ability({
	id: `7b3b9ab6-157e-4395-ae68-3815c78ae2d4`,
	name: `Pack Mentality`,
	desc: [
		`+1 Attack at a target a Comrade Attacks this round.`,
	],
	max: 1,
	xp: 3
});

const QuickReload = new Ability({
	id: `5ec7eba9-31dc-49a5-88dc-75f1d1b22490`,
	name: `Quick Reload`,
	desc: [
		`Free Reload once per round.`,
	],
	max: 1,
	xp: 3
});

class Stat extends Rule {
	constructor({
		id,
		name,
		desc,
		formula,
		score=0
	}) {
		super({
			id,
			name,
			desc,
			formula
		});
		this.score = score;
	}
}

class Skill extends Stat {
	constructor({
		id,
		name,
		desc,
		base,
		mods,
		score,
		diff,
		specs={},
		parent=``
	}) {
		super({
			id,
			name,
			desc,
			base,
			mods,
			score
		});
		this.diff = diff;
		this.specs = specs;
		this.parent = parent;
	}
}

const Acrobatics = new Skill({
	id: `f19c07a2-1371-48db-b0bc-a88e5bc4e53b`,
	name: `Acrobatics`,
	desc: [
		`Gymnastic prowess.`,
	],
	parent: `Agility`,
	diff: 6,
	specs: {
		dodge: new Stat({
			id: `a7451f3a-9970-431a-8304-f36ae046e85b`,
			name: `Dodge`,
			desc: [
				`Roll Acrobatics(Dodge) vs [Melee or Ranged].`,
				`As part of a Dodge, you may drop Prone for free if you wish.`,
				`Reflexive Dodge is your Dodge score with no roll.`,
			]
		}),
		jump: new Stat({
			id: `7a5e0273-8d72-43c3-a826-0a927e2ee0e9`,
			name: `Jump`,
			desc: [
				`Running Jump distance is yards = [Agility].`,
				`Vertical Jump distance is [Agility x 6] inches.`,
			]
		})
	}
});

const Larceny = new Skill({
	id: `f8725bd3-a40a-43b6-9b1b-4a9bcd1c957e`,
	name: `Larceny`,
	desc: [
		`Delicate manual operations.`,
	],
	parent: `agility`,
	diff: `varies`,
	specs: {
		mechanical: new Stat({
			id: `44d2e074-3316-41f1-a3f9-5252e8e2c0c4`,
			name: `Mechanical`,
			desc: [
				`(d6 rounds) Activate or deactivate Locks, Traps, Bombs, and similar mechanisms`,
				`# by item.`,
			]
		}),
		trick: new Stat({
			id: `959c5f50-d590-4064-bf23-65737cdafc61`,
			name: `Trick`,
			desc: [
				`Roll vs [Perception] to pick pockets, hide items, or some other sleight-of-hand.`,
			]
		})
	}
});

const Ranged = new Skill({
	id: `da193540-c5fc-408d-bf3a-a69aa046fa84`,
	name: `Ranged`,
	desc: [
		`Projectile combat.`,
	],
	parent: `Agility`,
	diff: `Defense`,
	specs: {
		shoot: new Stat({
			id: `f6a049f5-bc9e-48d2-b0d3-2df479cc7c6e`,
			name: `Shoot`,
			desc: [
				`Roll vs [Dodge or Block (with a Shield)].`,
			]
		}),
		throw: new Stat({
			id: `c3e75b6f-c686-4c4f-91a8-ee10dfe66b07`,
			name: `Throw`,
			desc: [
				`Roll vs [Dodge or Block]`,
				`Range is [Constitution x 3yds]`,
			]
		})
	}
});

const Stealth = new Skill({
	id: `8acb7f56-c5c5-4918-97b9-15260024fb15`,
	name: `Stealth`,
	desc: [
		`Conceal your presence.`,
	],
	parent: `Agility`,
	diff: `Perception`,
	specs: {
		hide: new Stat({
			id: `bcec6762-9716-497d-894a-626f8e0d77d7`,
			name: `Hide`,
			desc: [`Stay motionless and Concealed`,
				`+3 if Prone.`,]
		}),
		sneak: new Stat({
			id: `7d49df11-ede2-4a18-bb20-711e44f2445b`,
			name: `Sneak`,
			desc: [
				`Move Walk Speed while Concealed.`,
			]
		})
	}
});

var AgilitySkills = [
	Acrobatics,
	Larceny,
	Ranged,
	Stealth,
];

const Medicine = new Skill({
	id: `8ebabc07-057f-4568-b6ed-cdb6941d14a6`,
	name: `Medicine`,
	desc: [
		`Diagnosing and treating wounds and Diseases.`,
	],
	parent: `Brains`,
	diff: `Damage`,
	specs: {
		firstaid: new Stat({
			id: `d99dcfd7-e192-463f-941f-1487ec141793`,
			name: `First-Aid`,
			desc: [
				`Stop a person from Bleeding for a number of hours equal to your roll.`,
				`Inflict an additional 1 Damage on a Botch.`,
				`Takes 1 round per Damage.`,
			]
		}),
		surgery: new Stat({
			id: `84136a49-7dd1-4462-af4d-a9c8e2390f80`,
			name: `Surgery`,
			desc: [
				`Stop a person from Bleeding as long as they do not take any more Damage.`,
				`Inflict an additional d6 Damage on a Botch.`,
				`Takes [Damage x 20] minutes.`,
			]
		})
	}
});

const Perception = new Skill({
	id: `1dd3402d-a974-49d1-ae43-bcc63c4925bc`,
	name: `Perception`,
	desc: [
		`Processing sensory input.`,
	],
	parent: `Brains`,
	diff: `varies`,
	specs: {
		search: new Stat({
			id: `68ea4f9c-12dd-4bcd-b2a3-a6d70b48a16e`,
			name: `Search`,
			desc: [
				`Roll vs [Stealth (or Survival if tracking)].`,
			]
		}),
		intuition: new Stat({
			id: `61372444-6825-4ad5-967e-a2b4ce991960`,
			name: `Intuition`,
			desc: [
				`Roll vs [Socialize or Perform].`,
			]
		})
	}
});

const Science = new Skill({
	id: `5da150b7-8643-4f9d-b9ad-470fa37510ae`,
	name: `Science`,
	desc: [
		`Knowledge of physical laws.`,
	],
	parent: `Brains`,
	diff: `varies`,
	specs: {
		chemistry: new Stat({
			id: `4f241948-5289-43e5-bc1f-77a04420b6bf`,
			name: `Chemistry`,
			desc: [
				`(# x 10mins) Use [d6 + # Chemicals].`,
			]
		}),
		technology: new Stat({
			id: `bb45ae73-369d-420d-b949-aac209c9abc7`,
			name: `Technology`,
			desc: [
				`(varies) Make or use electronic devices.`,
			]
		})
	}
});

const Survival = new Skill({
	id: `2d2322ff-8376-4e04-a00b-be803a9b9f02`,
	name: `Survival`,
	desc: [
		`Primitive practices for living outdoors.`,
	],
	parent: `Brains`,
	diff: `Biome`,
	specs: {
		forage: new Stat({
			id: `cdb225a5-e82f-4be6-855c-bc78ef6f44fc`,
			name: `Forage`,
			desc: [
				`(1hr) Provide 1 Need for 1 person.`,
			]
		}),
		navigate: new Stat({
			id: `9c1f6a61-bc28-4dde-b89f-0c9a34555f50`,
			name: `Navigate`,
			desc: [
				`(1min) Plot course`,
				`Roll vs [Perception] if tracked.`,
			]
		})
	}
});

var BrainsSkills = [
	Medicine,
	Perception,
	Science,
	Survival,
];

const Athletics = new Skill({
	id: `b13484a3-9340-47a2-9fe4-079a886beb56`,
	name: `Athletics`,
	desc: [
		`Physically difficult forms of motion.`,
	],
	parent: `Constitution`,
	diff: `varies`,
	specs: {
		climb: new Stat({
			id: `fda9b21e-5ee1-448f-a7f5-3d358e9ad062`,
			name: `Climb`,
			desc: [
				`Move along vertical surfaces at [Walk Speed / 2].`,
			]
		}),
		swim: new Stat({
			id: `f35bb291-4130-4cba-9841-dcc156eba70c`,
			name: `Swim`,
			desc: [
				`Move in water at [Speed / 4].`,
			]
		})
	}
});

const Build = new Skill({
	id: `20af75d7-79ef-4b7d-b408-1721a7ae11c6`,
	name: `Build`,
	desc: [
		`Make an item from [d6 + #] Parts.`,
	],
	parent: `Constitution`,
	diff: `varies`,
	specs: {
		customize: new Stat({
			id: `4d055bd5-9413-482f-aeef-ec64ced8d7a0`,
			name: `Customize`,
			desc: [
				`(#hrs) 3 per item`,
				`Each must be unique`,
				`Weapons: +1 Ranged Attack, +1 Melee Damage, or a new Rule`,
				`Armor: +1 Damage Resistance or a new Rule.`,
			]
		}),
		repair: new Stat({
			id: `5dcd9938-820f-40b6-b1db-051c99295997`,
			name: `Repair`,
			desc: [
				`(#hrs) Fix broken item`,
				`+1 with same Parts.`,
			]
		})
	}
});

const Drive = new Skill({
	id: `19aeb7ad-c940-4c7c-b238-cc77c05d1fc4`,
	name: `Drive`,
	desc: [
		`Operate vehicles.`,
	],
	parent: `Constitution`,
	diff: `varies`,
	specs: {
		ram: new Stat({
			id: `9483457c-5e90-4225-932f-f010077fecad`,
			name: `Ram`,
			desc: [
				`Roll vs [Drive(Stunt)] to Attack with a vehicle.`,
			]
		}),
		stunt: new Stat({
			id: `47a939cf-88ba-4773-bf52-4d383fb38695`,
			name: `Stunt`,
			desc: [
				`Roll vs [Drive(Ram)] for Defense with a vehicle.`,
			]
		})
	}
});

const Melee = new Skill({
	id: `1f84042e-c02b-477f-8662-41d3a0ccc4d5`,
	name: `Melee`,
	desc: [
		`Hand-to-hand combat.`,
	],
	parent: `Constitution`,
	diff: `Attack or Defense`,
	specs: {
		block: new Stat({
			id: `ad9c0c5a-f399-4f81-ba33-6242b17fc5e6`,
			name: `Block`,
			desc: [
				`Roll vs [Melee or Ranged (if you have a Shield)].`,
				`Reflexive Block is your Block score with no roll.`,
			]
		}),
		strike: new Stat({
			id: `1842e006-c064-4994-9f03-27e54f1d7b9f`,
			name: `Strike`,
			desc: [
				`Roll vs [Defense].`,
				`Damage = [weapon Damage + Success].`,
			]
		})
	}
});

var DemeanorSkills = [
	Athletics,
	Build,
	Drive,
	Melee,
];

const Leadership = new Skill({
	id: `7596f84f-d625-409d-a7b0-4e0775d96719`,
	name: `Leadership`,
	desc: [
		`Directing the efforts of others`,
		`Modifiers from multiple uses of the same Leadership Specialty do not stack.`,
	],
	parent: `Demeanor`,
	diff: `Demeanor`,
	specs: {
		encourage: new Stat({
			id: `95b70f3c-d67e-41ae-99ff-2d5864356a59`,
			name: `Encourage`,
			desc: [
				`Roll vs [total target(s) Demeanor]`,
				`Target(s) get a bonus = [your Demeanor] to one roll you choose.`,
			]
		}),
		intimidate: new Stat({
			id: `ff3e883c-2952-459e-8dbf-d3f666383ec9`,
			name: `Intimidate`,
			desc: [
				`Roll vs [total target(s) Demeanor]`,
				`Target(s) take a penalty = [your Demeanor] to any roll except one you choose.`
			]
		})
	}
});

const Perform = new Skill({
	id: `4507c9b3-3b2e-4c05-be79-89785735180d`,
	name: `Perform`,
	desc: [
		`Captivating an audience.`,
	],
	parent: `Demeanor`,
	diff: `Perception`,
	specs: {
		distract: new Stat({
			id: `e0029c54-6812-4b0d-b143-f1f8dbc806b0`,
			name: `Distract`,
			desc: [
				`Target is Defenseless for 1 round.`,
			]
		}),
		deceive: new Stat({
			id: `f6ded447-ec92-4720-8f68-812e8d3a02f5`,
			name: `Deceive`,
			desc: [
				`Target believes your plausible falsehood.`,
			]
		})
	}
});

const Socialize = new Skill({
	id: `aa5d33c4-d9ec-4974-8064-55aba4e75d88`,
	name: `Socialize`,
	desc: [
		`Alter a person’s Attitude by one step.`,
	],
	parent: `Demeanor`,
	diff: `Demeanor`,
	specs: {
		persuade: new Stat({
			id: `8ad47e9b-a223-455f-9499-72a012509577`,
			name: `Persuade`,
			desc: [
				`(d6mins) Target seriously considers your opinion.`,
			]
		}),
		therapy: new Stat({
			id: `83398ae1-5fad-45ef-a523-09d2b403ac7c`,
			name: `Therapy`,
			desc: [
				`Heal 1 Trauma`,
				`Cannot be performed again on the same day.`,
				`d6 Trauma on a Botch.`,
			]
		})
	}
});

const Tame = new Skill({
	id: `1e616ba5-99fb-4f11-853f-fe938eed016b`,
	name: `Tame`,
	desc: [
		`Alter an animal’s Attitude by one step.`,
	],
	parent: `Demeanor`,
	diff: `Demeanor`,
	specs: {
		command: new Stat({
			id: `81e355cf-c841-4c88-802b-1d4c170ef741`,
			name: `Command`,
			desc: [
				`Animal obeys your command.`,
			]
		}),
		train: new Stat({
			id: `ee8cc929-151e-4f6c-abff-293379d5ee53`,
			name: `Train`,
			desc: [
				`(1wk) Animals learn commands = [its Brains x 2].`,
			]
		})
	}
});

var DemeanorSkills$1 = [
	Leadership,
	Perform,
	Socialize,
	Tame,
];

const RandomRoll = (a) => {
	return a[Math.floor(Math.random() * a.length)]
};

const SkillList = [
	...AgilitySkills,
	...BrainsSkills,
	...DemeanorSkills,
	...DemeanorSkills$1,
];

var Skills = {
	name: `Skills`,
	explanation: [
		`You get Brains x 6 Skill points to assign.`,
		`Skills range from 0 to 6.`,
		`Skill rolls are [d6 + Skill].`,
		`Trait scores set the limit for their Skills.`,
	],
	list: SkillList,
	groups: [
		{
			name: `Agility`,
			list: AgilitySkills
		},
		{
			name: `Brains`,
			list: BrainsSkills
		},
		{
			name: `Constitution`,
			list: DemeanorSkills
		},
		{
			name: `Demeanor`,
			list: DemeanorSkills$1
		},
	],
	specs: Object.values(SkillList)
				.map((s) => Object.values(s.specs))
				.reduce((a, b) => a.concat(b), [])
				.sort((a, b) => PropSort(a, b, `name`)),
	startingPoints: (c) => c.traits.brains.score * 6,
	assign: function(c, target) {
		c.skills[target.name].score = parseInt(target.value);
		return this.limit(c, target.name)
	},
	limit: function(c, targetName) {
		const max = c.traits[c.skills[targetName].parent.toLowerCase()].score;
		while(this.remaining(c) < 0 || c.skills[targetName].score > max) {
			c.skills[targetName].score--;
		}
		return c
	},
	random: function(c) {
		c = this.reset(c);
		while(this.remaining(c) > 0) {
			const t = RandomRoll(Object.keys(c.skills));
			const parentScore = c.traits[c.skills[t].parent.toLowerCase()].score;
			if (c.skills[t].score < parentScore) c.skills[t].score++;
		}
		return c
	},
	remaining: function(c) {
		const spent = Object.values(c.skills).reduce((t, { score }) => t += score, 0);
		return this.startingPoints(c) - spent
	},
	reset: function(c) {
		Object.keys(c.skills).forEach(t => c.skills[t].score = 0);
		return c
	},
};

const Specialize = new Ability({
	id: `12c0ab2c-ffc9-40de-9368-b8bf34301515`,
	name: `Specialize`,
	desc: [
		`+1 to a Skill Specialty.`,
	],
	max: 1,
	xp: 3,
	opts: Skills.specs
});

const WeaponTraining = new Ability({
	id: `dd2f76e5-3f6b-46b9-bdc1-9c7d09768017`,
	name: `Weapon Training`,
	desc: [
		`+1 Attack with a specified weapon type.`,
	],
	max: 1,
	xp: 3,
	opts: WeaponList
});

var XP3AbilitiesList = [
	FavoriteWeapon,
	HyperImmunity,
	PackMentality,
	QuickReload,
	Specialize,
	WeaponTraining,
];

const EfficientWork = new Ability({
	id: `bc5ad182-ca69-46c9-b013-b92d90d48b07`,
	name: `Efficient Work`,
	desc: [
		`[Time / 2] for a Skill (minimum 1 action).`,
	],
	max: 1,
	xp: 6,
	opts: Skills.list
});

const FastDraw = new Ability({
	id: `09783c40-3370-4371-b6e2-b00c088d0fa5`,
	name: `Fast Draw`,
	desc: [
		`Free item draw once per round.`,
	],
	max: 1,
	xp: 6
});

const FleetFooted = new Ability({
	id: `2781978f-df68-49cb-be43-e96dbfafe199`,
	name: `Fleet Footed`,
	desc: [
		`+1 Speed.`,
	],
	max: 3,
	xp: 6
});

var Languages = [
	{ name: 'Amharic' },
	{ name: 'Arabic' },
	{ name: 'Assamese' },
	{ name: 'Awadhi' },
	{ name: 'Azerbaijani' },
	{ name: 'Bengali' },
	{ name: 'Bhojpuri' },
	{ name: 'Burmese' },
	{ name: 'Cebuano' },
	{ name: 'Chhattisgarhi' },
	{ name: 'Chinese' },
	{ name: 'Chittagonian' },
	{ name: 'Czech' },
	{ name: 'Deccan' },
	{ name: 'Dutch' },
	{ name: 'English' },
	{ name: 'French' },
	{ name: 'German' },
	{ name: 'Greek' },
	{ name: 'Gujarati' },
	{ name: 'Hausa' },
	{ name: 'Hindi' },
	{ name: 'Hungarian' },
	{ name: 'Igbo' },
	{ name: 'Indonesian' },
	{ name: 'Italian' },
	{ name: 'Japanese' },
	{ name: 'Javanese' },
	{ name: 'Kannada' },
	{ name: 'Kazakh' },
	{ name: 'Khmer' },
	{ name: 'Kinyarwanda' },
	{ name: 'Korean' },
	{ name: 'Kurdish' },
	{ name: 'Latin' },
	{ name: 'Maithili' },
	{ name: 'Malay' },
	{ name: 'Malayalam' },
	{ name: 'Magahi' },
	{ name: 'Marathi' },
	{ name: 'Morse Code' },
	{ name: 'Nepali' },
	{ name: 'Odia' },
	{ name: 'Pashto' },
	{ name: 'Persian' },
	{ name: 'Polish' },
	{ name: 'Portuguese' },
	{ name: 'Punjabi' },
	{ name: 'Romanian' },
	{ name: 'Russian' },
	{ name: 'Saraiki' },
	{ name: 'Serbo-Croatian' },
	{ name: 'Sign Language' },
	{ name: 'Sindhi' },
	{ name: 'Sinhala' },
	{ name: 'Somali' },
	{ name: 'Spanish' },
	{ name: 'Sunda' },
	{ name: 'Sylheti' },
	{ name: 'Tagalog' },
	{ name: 'Tamil' },
	{ name: 'Telugu' },
	{ name: 'Thai' },
	{ name: 'Turkish' },
	{ name: 'Ukrainian' },
	{ name: 'Urdu' },
	{ name: 'Uyghur' },
	{ name: 'Vietnamese' },
	{ name: 'Yoruba' },
	{ name: 'Zulu' },
];

const Multilingual = new Ability({
	id: `bb6a0fb9-a5d7-4930-a782-9742763037b5`,
	name: `Multilingual`,
	desc: [
		`Learn a different form of communication.`,
	],
	max: 1,
	xp: 6,
	opts: Languages
});

const Practice = new Ability({
	id: `2e27c3fd-aaf3-4c95-9d3a-9a0ad27abdff`,
	name: `Practice`,
	desc: [
		`+1 to a Skill (up to the parent Trait).`,
	],
	max: 1,
	xp: 6,
	opts: Skills.list
});

const VehicleOperation = new Ability({
	id: `e69f8784-1323-4468-8761-7a9f1ef9e21d`,
	name: `Vehicle Operation`,
	desc: [
		`Proficiently operate a class of vehicle.`,
	],
	max: 1,
	xp: 6
});

var XP6AbilitiesList = [
	EfficientWork,
	FastDraw,
	FleetFooted,
	Multilingual,
	Practice,
	VehicleOperation,
];

const DangerSense = new Ability({
	id: `08da6fd9-59ca-434c-b081-f58fc19c9def`,
	name: `Danger Sense`,
	desc: [
		`+1 to Reflexive Defenses.`,
	],
	max: 1,
	xp: 9
});

const Discipline = new Ability({
	id: `de3d6bc9-d188-4936-a62c-f19d2f731dad`,
	name: `Discipline`,
	desc: [
		`Ignore 1 Pain penalty.`,
	],
	max: 3,
	xp: 9
});

const Fortunate = new Ability({
	id: `0957c2e9-a743-4eca-b429-b9840f8ea931`,
	name: `Fortunate`,
	desc: [
		`+1 Luck.`,
	],
	max: 1,
	xp: 9
});

const FreeRunning = new Ability({
	id: `6a93067f-ffd4-40dc-9dea-74fdc2a56d7e`,
	name: `Free Running`,
	desc: [
		`Acrobatics 9# to Climb your Speed as a Movement action.`,
	],
	max: 1,
	xp: 9
});

const Agility = new Stat({
	id: `c84ca95a-9f01-476f-897c-e6ad07231551`,
	name: `Agility`,
	desc: [
		`Agility is a Character’s talent for physical coordination.`,
		`High Agility indicates balance, flexibility, and fine motor skill.`,
		`This Trait is a factor in the Speed and Dodge Properties.`,
		`Agility is the parent Trait for the following Skills: ${AgilitySkills.map(skill => skill.name).join(', ')}.`,
	]
});

const Brains = new Stat({
	id: `ac0d45e3-221c-4cf3-ab70-a19908b86bd7`,
	name: `Brains`,
	desc: [
		`Brains is a Character’s talent for cognitive performance and abstract thought.`,
		`High Brains indicates sharp memory, keen awareness, and studiousness.`,
		`This Trait is a factor in the Experience and Intellect Properties.`,
		`Brains is the parent Trait for the following Skills: ${BrainsSkills.map(skill => skill.name).join(', ')}.`,
	]
});

const Constitution = new Stat({
	id: `da48b9f5-de7d-44b3-bb24-392e69bebe90`,
	name: `Constitution`,
	desc: [
		`Constitution is a Character’s talent for physical power and durability.`,
		`High Constitution indicates good health, high stamina, and strong muscles.`,
		`This Trait is a factor in the Health and Block Properties.`,
		`Constitution is the parent Trait for the following Skills: ${DemeanorSkills.map(skill => skill.name).join(', ')}.`,
	]
});

const Demeanor = new Stat({
	id: `2f73a727-6149-482e-9c36-70cccbfd03d4`,
	name: `Demeanor`,
	desc: [
		`Demeanor is a Character’s talent for social exchanges and sheer force of will.`,
		`High Demeanor indicates charisma, self-motivation, and confidence.`,
		`This Trait is a factor in the Psyche and Luck Properties.`,
		`Demeanor is the parent Trait for the following Skills: ${DemeanorSkills.map(skill => skill.name).join(', ')}.`,
	]
});

const traitMax = 6;

const traitPoints = 14;

var Traits = {
	name: `Traits`,
	explanation: [
		`You get ${traitPoints} Trait points to assign.`,
		`Traits range from 1 to ${traitMax}.`,
		`Trait rolls are [d6 + Trait].`,
		`Trait scores set the limit for their Skills.`,
	],
	list: [
		Agility,
		Brains,
		Constitution,
		Demeanor,
	],
	max: traitMax,
	startingPoints: _ => traitPoints,
	assign: function(c, target) {
		c.traits[target.name].score = parseInt(target.value);
		return this.limit(c, target.name)
	},
	limit: function(c, targetName) {
		while(this.remaining(c) < 0) c.traits[targetName].score--;
		return c
	},
	random: function(c) {
		c = this.reset(c);
		while(this.remaining(c) > 0) {
			const t = RandomRoll(Object.keys(c.traits));
			if (c.traits[t].score < this.max) c.traits[t].score++;
		}
		return c
	},
	remaining: function(c) {
		const spent = Object.values(c.traits).reduce((t, { score }) => t += score, 0);
		return this.startingPoints() - spent
	},
	reset: function(c) {
		Object.keys(c.traits).forEach(t => c.traits[t].score = 1);
		return c
	}
};

const Unorthodox = new Ability({
	id: `9fb108fd-b6ba-4f9a-b225-da7ef4994e80`,
	name: `Unorthodox`,
	desc: [
		`Pick a new parent Trait for a Skill.`,
	],
	max: 1,
	xp: 9,
	opts: (function() {
		const uList = [];
		Traits.list.forEach((trait) => {
			Skills.list.forEach((skill) => {
				const tname = trait.name;
				const sname = skill.name;
				if (skill.parent != trait.name) {
					uList.push({ name: `${tname} - ${sname}` });
				}
			});
		});
		return [...uList]
	})()
});

const Resilient = new Ability({
	id: `975e122b-2e35-4c8e-a1ed-16abc91e32fe`,
	name: `Resilient`,
	desc: [
		`Reduce any Trauma by 1.`
	],
	max: 3,
	xp: 9
});

var XP9AbilitiesList = [
	DangerSense,
	Discipline,
	Fortunate,
	FreeRunning,
	Unorthodox,
	Resilient,
];

const Parry = new Ability({
	id: `4b617dee-aed3-4187-ae5a-25eb83245c20`,
	name: `Parry`,
	desc: [
		`Free Block Action once per round.`,
	],
	max: 1,
	xp: 12
});

const Sidestep = new Ability({
	id: `e052bd60-6e03-4d90-9bd8-8b6950a24393`,
	name: `Side-step`,
	desc: [
		`Free Dodge Action once per round.`,
	],
	max: 1,
	xp: 12
});

const Wrestling = new Ability({
	id: `c565d573-c281-4849-b935-f3388bcd1b1d`,
	name: `Wrestling`,
	desc: [
		`Free Grapple Action once per round.`,
	],
	max: 1,
	xp: 12
});

var XP12AbilitiesList = [
	Parry,
	Sidestep,
	Wrestling,
];

const Charge = new Ability({
	id: `c44580dd-3a0a-41d5-b97f-ec1f9f4bea0d`,
	name: `Charge`,
	desc: [
		`Ignore Unstable penalty to Melee Attacks when you Run.`,
		`Ignore Prone effect from Leg Damage.`,
	],
	max: 1,
	xp: 15
});

const FirmGrip = new Ability({
	id: `c55b0940-8e72-4c5a-a7bc-0b9b27353ae7`,
	name: `Firm Grip`,
	desc: [
		`Ignore penalty to use 2h weapons in 1h, up to Size = Constitution.`,
		`Ignore Drop effect from Arm Damage.`,
	],
	max: 1,
	xp: 15
});

const HardHeaded = new Ability({
	id: `b02bccad-64ce-477b-9cb3-3883fc2c59f5`,
	name: `Hard Headed`,
	desc: [
		`Ignore Stun effect from Head Damage.`,
	],
	max: 1,
	xp: 15
});

var XP15AbilitiesList = [
	Charge,
	FirmGrip,
	HardHeaded,
];

const Ambidextrous = new Ability({
	id: `1460e48d-10fc-4469-a183-74f6060d0bb4`,
	name: `Ambidextrous`,
	desc: [
		`Off-hand penalty is -1 instead of -3.`,
	],
	max: 1,
	xp: 18
});

const Assassin = new Ability({
	id: `742279a1-7749-49c5-b6da-d57eaaa511e4`,
	name: `Assassin`,
	desc: [
		`+3 Damage for Attacks made while Concealed.`,
	],
	max: 1,
	xp: 18
});

var XP18AbilitiesList = [
	Ambidextrous,
	Assassin,
];

const Rational = new Ability({
	id: `0eb90ec1-e3ac-4e70-a8c1-e6299f1c3abf`,
	name: `Rational`,
	desc: [
		`+1 Psyche.`,
	],
	max: 3,
	xp: 24
});

const Tough = new Ability({
	id: `4567f11a-5ee0-4e8d-ae19-b2ebb816397e`,
	name: `Tough`,
	desc: [
		`+1 Health for each Body Part.`,
	],
	max: 3,
	xp: 24
});

var XP24AbilitiesList = [
	Rational,
	Tough,
];

const CloseCall = new Ability({
	id: `6d724fe0-89d1-48ad-b8a0-98bb70b1008c`,
	name: `Close Call`,
	desc: [
		`Spend this Ability to survive an otherwise lethal encounter.`,
	],
	max: 1,
	xp: 30
});

const SelfImprovement = new Ability({
	id: `34bdd675-5a1c-4fe1-96d4-bac61572cf74`,
	name: `Self Improvement`,
	desc: [
		`+1 to a Trait (max 6).`,
	],
	max: 1,
	xp: 30,
	opts: Traits.list
});

var XP30AbilitiesList = [
	CloseCall,
	SelfImprovement,
];

var AppendToGUUID = (guuid, mod) => {
	let hash = mod.split('')
					.map(m => m = m.charCodeAt(0))
					.reduce((a, b) => a + b + parseInt(guuid.split(`-`)[4], 16))
					.toString(16);

	if (hash.length > 12) hash = hash.substr(hash.length - 12, hash.length);

	return guuid.substr(0, guuid.lastIndexOf('-') + 1) + hash
};

const abilityArray = [
	...XP3AbilitiesList,
	...XP6AbilitiesList,
	...XP9AbilitiesList,
	...XP12AbilitiesList,
	...XP15AbilitiesList,
	...XP18AbilitiesList,
	...XP24AbilitiesList,
	...XP30AbilitiesList
];

const completeAbilityListBuilder = (list) => {
	const newList = [];
	for (let i = 0; i < list.length; ++i) {
		if (list[i].opts[0]) {
			for (let o = 0; o < list[i].opts.length; ++o) {
				let newGUUID = AppendToGUUID(list[i].id, list[i].opts[o].name);
				const newAbility = new Ability({
					id: newGUUID,
					name: list[i].name,
					desc: list[i].desc,
					max: list[i].max,
					xp: list[i].xp,
					taken: list[i].taken,
					opts: [
						list[i].opts[o],
					],
					selection: o
				});
				newList.push(newAbility);
			}
		} else {
			const newAbility = new Ability({
				id: list[i].id,
				name: list[i].name,
				desc: list[i].desc,
				max: list[i].max,
				xp: list[i].xp,
				taken: list[i].taken
			});
			newList.push(newAbility);
		}
	}
	return newList
};

const Abilities$1 = {
	name: `Abilities`,
	explanation: [
		`Abilities are Character upgrades purchased with XP.`
	],
	groups: [
		{
			name: 3,
			visible: false,
			list: XP3AbilitiesList
		},
		{
			name: 6,
			visible: false,
			list: XP6AbilitiesList
		},
		{
			name: 9,
			visible: false,
			list: XP9AbilitiesList
		},
		{
			name: 12,
			visible: false,
			list: XP12AbilitiesList
		},
		{
			name: 15,
			visible: false,
			list: XP15AbilitiesList
		},
		{
			name: 18,
			visible: false,
			list: XP18AbilitiesList
		},
		{
			name: 24,
			visible: false,
			list: XP24AbilitiesList
		},
		{
			name: 30,
			visible: false,
			list: XP30AbilitiesList
		},
	],
	list: abilityArray.sort((a, b) => PropSort(a, b, 'name')),
	masterList: completeAbilityListBuilder(abilityArray).sort((a, b) => PropSort(a, b, 'name')),
	remainingXP: (c) => {
		if (c.abilities.length) {
			c.props.experience.spent = c.abilities.reduce((t, n) => t += (n.taken * n.xp), 0);
		}
		c.props.experience.remaining = c.props.experience.score - c.props.experience.spent;
		return c
	},
	random: function(c) {
		c = this.reset(c);
		while(c.props.experience.remaining > 0) {
			const remainingAbilities = this.masterList.filter(m => {
				return m.xp <= c.props.experience.remaining &&
					!c.abilities.includes(m)
			});
			if (remainingAbilities.length) {
				const a = RandomRoll(remainingAbilities);
				a.taken++;
				c.abilities.push(a);
				c.props.experience.remaining -= a.xp;
			}
			else break
		}
		return c
	},
	reset: function(c) {
		for (let a = 0; a < c.abilities.length; ++a) {
			c.abilities[a].taken = 0;
		}
		c.abilities = [];
		return c
	}
};

const AbilitiesList = completeAbilityListBuilder(Abilities$1);

class Property extends Stat {
	constructor({
		id,
		name,
		desc,
		formula,
		score,
		parent=``
	}) {
		super({
			id,
			name,
			desc,
			formula,
		});
		this.score = score;
		this.parent = parent;
	}
}

const Block = new Property({
	id: `ceb4a52f-8e47-4892-8d34-4ff4de12a486`,
	name: Melee.specs.block.name,
	desc: [
		`Block = Melee`,
		...Melee.specs.block.desc,
	],
	formula: (c) => {
		c.props.block.score = c.skills.melee.score;
	},
	base: 0,
	score: 0
});

const Carry = new Property({
	id: `c35b76a8-9912-46fc-b1d3-b0b23b71ef3d`,
	name: `Carry`,
	desc: [
		`Carry = Constitution x 3`,
		`1 Pain per Size above Carry.`
	],
	formula: (c) => {
		c.props.carry.current = 0;
		c.props.carry.score = c.traits.constitution.score * 3;
	},
	base: 3,
	score: 3
});

const Dodge = new Property({
	id: `c83be9cc-03c9-4b19-85d2-8a2e89475848`,
	name: Acrobatics.specs.dodge.name,
	desc: [
		`Dodge = Acrobatics`,
		...Acrobatics.specs.dodge.desc,
	],
	formula: (c) => {
		c.props.dodge.score = c.skills.acrobatics.score;
	}
});

const Experience = new Property({
	id: `3bee3f4e-dce9-4943-a2d0-1d3a4edc5920`,
	name: `Experience`,
	desc: [
		`Experience (XP) = Brains x 3`,
		`Experience represents how much you have learned up to now.`,
		`You get additional XP = Intellect for each game session you survive.`,
		`You also get +1 XP every time you roll a Botch.`,
		`The Narrator may choose to give bonus XP.`,
		`You may spend XP to buy Abilities to improve your Character.`,
		`You may also spend 1XP per round to regain 1 Luck Point.`,
	],
	formula: (c) => {
		c.props.experience.score = c.traits.brains.score * 3;
		c.props.experience.current = c.traits.brains.score * 3;
	}
});

const Health$1 = new Property({
	id: `7f6c7b57-75c1-48e8-b5b8-9b5c14ec8d85`,
	name: `Health`,
	desc: [
		`Head, Arm, and Leg Health = Constitution`,
		`Torso Health = Constitution x 2`,
		`Health is a measure of how much Damage you can withstand.`,
	],
	formula: (c) => {
		Object.values(c.health).forEach((h) => {
			if (h.name == `Torso`) {
				h.score = c.traits.constitution.score * 2;
				h.current = c.traits.constitution.score * 2;
			}
			else {
				h.score = c.traits.constitution.score;
				h.current = c.traits.constitution.score;
			}
		});
	}
});

const Intellect = new Property({
	id: `99433632-a504-4529-8e11-e9b9d56ec532`,
	name: `Intellect`,
	desc: [
		`Intellect = Brains`,
		`Intellect is the amount of Experience that is earned automatically for each game session that you survive.`,
	],
	formula: (c) => {
		c.props.intellect.score = c.traits.brains.score;
	}
});

const Luck = new Property({
	id: `58641270-0e30-4ca9-9986-7c9da1cc4d28`,
	name: `Luck`,
	desc: [
		`Luck = Demeanor`,
		`Luck rolls [d6 + current Luck points] are made to determine your fate in matters of pure chance.`,
		`You may spend 1 Luck Point per round in a dramatic moment for one of the three effects listed below.`,
		`You regain 1 spent Luck Point at dawn each day.`,
		`• Re-roll the last die you rolled with a +6 bonus.`,
		`• Take an extra Action on your turn.`,
		`• Give a Luck point to a Comrade.`,
	],
	formula: (c) => {
		c.props.luck.score = c.traits.demeanor.score;
		c.props.luck.current = c.traits.demeanor.score;
	}
});

const Psyche = new Property({
	id: `59f47468-200a-45ab-b8ca-a3cfa78ab1f8`,
	name: `Psyche`,
	desc: [
		`Psyche = Demeanor x 3`,
		`This is a measure of how much Trauma you can withstand.`,
		`Any number of horrible events can cause Trauma.`,
		`When Trauma = [Demeanor x 3] you lose all hope and seek out death at the earliest opportunity.`,
		`Someone must protect you from yourself until you have Recovered from at least 1 Trauma.`,
	],
	formula: (c) => {
		c.props.psyche.score = c.traits.demeanor.score * 3;
		c.props.psyche.current = c.traits.demeanor.score * 3;
	}
});

const Speed = new Property({
	id: `c7081a3e-1fed-41ee-81a4-2b2fab4942e8`,
	name: `Speed`,
	desc: [
		`Speed = Agility x 3`,
		`Roll this Property against all other participants at the beginning of each round of combat to determine the order in which turns are resolved.`,
		`This is also the number of yards you can Walk as 1 Action.`,
		`When traveling long distances overland, you can March at [Speed / 2] mph for up to [Constitution x 3] hrs per day.`,
	],
	formula: (c) => {
		c.props.speed.score = c.traits.agility.score * 3;
	}
});

var Properties = {
	name: `Properties`,
	explanation: [
		`Properties represent a variety of attributes that are derived from a Character's Traits and Skills.`
	],
	list: [
		Block,
		Carry,
		Dodge,
		Experience,
		Health$1,
		Intellect,
		Luck,
		Psyche,
		Speed,
	],
	setScores: function(c) {
		this.list.forEach(p => p.formula(c));
		return c
	}
};

/* src/components/views/character/LoadCharacterButton.svelte generated by Svelte v3.29.4 */

const LoadCharacterButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {

	return `<button class="${"small-cntr-btn"}">Load
</button>`;
});

/* src/components/views/character/Notes.svelte generated by Svelte v3.29.4 */

const css$6 = {
	code: ".sheet-notes-block.svelte-56u4ze{color:lime;font-family:var(--global-font);height:100%;height:var(--s1000);overflow:auto;padding:var(--s100);resize:none;text-align:left;width:calc(100% - var(--s200))}",
	map: "{\"version\":3,\"file\":\"Notes.svelte\",\"sources\":[\"Notes.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport { character } from 'stores/characterStore.js'\\n\\n\\texport let mode\\n</script>\\n\\n\\n<details class='sheet-details' close>\\n\\t<summary class='sheet-card-title'>\\n\\t\\tNotes\\n\\t</summary>\\n\\t<div class='sheet-card'>\\n\\t\\t{#if mode == 'edit'}\\n\\t\\t\\t<textarea class='sheet-notes-block' wrap='soft' bind:value={$character.meta.notes} />\\n\\t\\t{:else}\\n\\t\\t\\t<div class='sheet-notes-block'>{$character.meta.notes}</div>\\n\\t\\t{/if}\\n\\t</div>\\n</details>\\n\\n\\n<style>\\n\\t.sheet-notes-block {\\n\\t\\tcolor: lime;\\n\\t\\tfont-family: var(--global-font);\\n\\t\\theight: 100%;\\n\\t\\theight: var(--s1000);\\n\\t\\toverflow: auto;\\n\\t\\tpadding: var(--s100);\\n\\t\\tresize: none;\\n\\t\\ttext-align: left;\\n\\t\\twidth: calc(100% - var(--s200));\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AAsBC,kBAAkB,cAAC,CAAC,AACnB,KAAK,CAAE,IAAI,CACX,WAAW,CAAE,IAAI,aAAa,CAAC,CAC/B,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,IAAI,OAAO,CAAC,CACpB,QAAQ,CAAE,IAAI,CACd,OAAO,CAAE,IAAI,MAAM,CAAC,CACpB,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,MAAM,CAAC,CAAC,AAChC,CAAC\"}"
};

const Notes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $character = get_store_value(character);
	let { mode } = $$props;
	if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0) $$bindings.mode(mode);
	$$result.css.add(css$6);

	return `<details class="${"sheet-details"}" close><summary class="${"sheet-card-title"}">Notes
	</summary>
	<div class="${"sheet-card"}">${mode == "edit"
	? `<textarea class="${"sheet-notes-block svelte-56u4ze"}" wrap="${"soft"}">${$character.meta.notes || ""}</textarea>`
	: `<div class="${"sheet-notes-block svelte-56u4ze"}">${escape($character.meta.notes)}</div>`}</div>
</details>`;
});

/* src/components/views/character/Properties.svelte generated by Svelte v3.29.4 */

const css$7 = {
	code: ".current-value.svelte-1oda2k{width:20%}",
	map: "{\"version\":3,\"file\":\"Properties.svelte\",\"sources\":[\"Properties.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport { character } from 'stores/characterStore.js'\\n\\n\\texport let mode\\n</script>\\n\\n\\n<details class='sheet-details' close>\\n\\t<summary class='sheet-card-title'>\\n\\t\\tProperties\\n\\t</summary>\\n\\t<div class='sheet-card'>\\n\\t\\t<div class='sheet-card-body'>\\n\\t\\t\\t<div class='sheet-card-block'>\\n\\t\\t\\t\\t<div class='sheet-card-item'>\\n\\t\\t\\t\\t\\t{$character.props.speed.name}: {$character.props.speed.score}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class='sheet-card-item'>\\n\\t\\t\\t\\t\\t{$character.props.carry.name}: {$character.props.carry.current} / {$character.props.carry.score}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class='sheet-card-item'>\\n\\t\\t\\t\\t\\tXP: {$character.props.experience.remaining} / {$character.props.experience.score}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class='sheet-card-item'>\\n\\t\\t\\t\\t\\t{$character.props.psyche.name}: \\n\\t\\t\\t\\t\\t{#if mode == 'edit'}\\n\\t\\t\\t\\t\\t\\t<input type='number'\\n\\t\\t\\t\\t\\t\\t\\tclass='current-value'\\n\\t\\t\\t\\t\\t\\t\\tbind:value={$character.props.psyche.current}\\n\\t\\t\\t\\t\\t\\t\\tmin=0 max={$character.props.psyche.score}\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t{:else if mode == 'readonly'}\\n\\t\\t\\t\\t\\t\\t{$character.props.psyche.current}\\n\\t\\t\\t\\t\\t{/if} / {$character.props.psyche.score}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class='sheet-card-block'>\\n\\t\\t\\t\\t<div class='sheet-card-item'>\\n\\t\\t\\t\\t\\t{$character.props.dodge.name}: \\n\\t\\t\\t\\t\\t{$character.props.dodge.score}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class='sheet-card-item'>\\n\\t\\t\\t\\t\\t{$character.props.block.name}: \\n\\t\\t\\t\\t\\t{$character.props.block.score}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class='sheet-card-item'>\\n\\t\\t\\t\\t\\t{$character.props.intellect.name}: \\n\\t\\t\\t\\t\\t{$character.props.intellect.score}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class='sheet-card-item'>\\n\\t\\t\\t\\t\\t{$character.props.luck.name}: \\n\\t\\t\\t\\t\\t{#if mode == 'edit'}\\n\\t\\t\\t\\t\\t\\t<input type='number'\\n\\t\\t\\t\\t\\t\\t\\tclass='current-value'\\n\\t\\t\\t\\t\\t\\t\\tbind:value={$character.props.luck.current}\\n\\t\\t\\t\\t\\t\\t\\tmin=0 max={$character.props.luck.score}\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t{:else if mode == 'readonly'}\\n\\t\\t\\t\\t\\t\\t{$character.props.luck.current}\\n\\t\\t\\t\\t\\t{/if} / {$character.props.luck.score}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t</div>\\n</details>\\n\\n\\n<style>\\n\\t.current-value {\\n\\t\\twidth: 20%;\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AAoEC,cAAc,cAAC,CAAC,AACf,KAAK,CAAE,GAAG,AACX,CAAC\"}"
};

const Properties$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $character = get_store_value(character);
	let { mode } = $$props;
	if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0) $$bindings.mode(mode);
	$$result.css.add(css$7);

	return `<details class="${"sheet-details"}" close><summary class="${"sheet-card-title"}">Properties
	</summary>
	<div class="${"sheet-card"}"><div class="${"sheet-card-body"}"><div class="${"sheet-card-block"}"><div class="${"sheet-card-item"}">${escape($character.props.speed.name)}: ${escape($character.props.speed.score)}</div>
				<div class="${"sheet-card-item"}">${escape($character.props.carry.name)}: ${escape($character.props.carry.current)} / ${escape($character.props.carry.score)}</div>
				<div class="${"sheet-card-item"}">XP: ${escape($character.props.experience.remaining)} / ${escape($character.props.experience.score)}</div>
				<div class="${"sheet-card-item"}">${escape($character.props.psyche.name)}: 
					${mode == "edit"
	? `<input type="${"number"}" class="${"current-value svelte-1oda2k"}" min="${"0"}"${add_attribute("max", $character.props.psyche.score, 0)}${add_attribute("value", $character.props.psyche.current, 1)}>`
	: `${mode == "readonly"
		? `${escape($character.props.psyche.current)}`
		: ``}`} / ${escape($character.props.psyche.score)}</div></div>
			<div class="${"sheet-card-block"}"><div class="${"sheet-card-item"}">${escape($character.props.dodge.name)}: 
					${escape($character.props.dodge.score)}</div>
				<div class="${"sheet-card-item"}">${escape($character.props.block.name)}: 
					${escape($character.props.block.score)}</div>
				<div class="${"sheet-card-item"}">${escape($character.props.intellect.name)}: 
					${escape($character.props.intellect.score)}</div>
				<div class="${"sheet-card-item"}">${escape($character.props.luck.name)}: 
					${mode == "edit"
	? `<input type="${"number"}" class="${"current-value svelte-1oda2k"}" min="${"0"}"${add_attribute("max", $character.props.luck.score, 0)}${add_attribute("value", $character.props.luck.current, 1)}>`
	: `${mode == "readonly"
		? `${escape($character.props.luck.current)}`
		: ``}`} / ${escape($character.props.luck.score)}</div></div></div></div>
</details>`;
});

/* src/components/views/character/SaveCharacterButton.svelte generated by Svelte v3.29.4 */

const SaveCharacterButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {

	return `<button class="${"small-cntr-btn"}">Save
</button>`;
});

/* src/components/views/character/Skills.svelte generated by Svelte v3.29.4 */

const css$8 = {
	code: ".sheet-card-block.svelte-bm8oqp{border:1px dotted lime;width:100%}.parent-trait.svelte-bm8oqp{font-size:var(--s110);font-weight:bold;margin:var(--s100);text-align:center}",
	map: "{\"version\":3,\"file\":\"Skills.svelte\",\"sources\":[\"Skills.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport { character } from 'stores/characterStore.js'\\n</script>\\n\\n\\n<details class='sheet-details' close>\\n\\t<summary class='sheet-card-title'>\\n\\t\\tSkills\\n\\t</summary>\\n\\t<div class='sheet-card'>\\n\\t\\t<div class='sheet-card-body'>\\n\\t\\t\\t{#each Object.values($character.traits) as trait}\\n\\t\\t\\t\\t<div class='sheet-card-block'>\\n\\t\\t\\t\\t\\t<div class='parent-trait'>\\n\\t\\t\\t\\t\\t\\t{trait.name}\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t{#each Object.values($character.skills) as skill}\\n\\t\\t\\t\\t\\t\\t{#if trait.name == skill.parent}\\n\\t\\t\\t\\t\\t\\t\\t<div class='sheet-card-item'>\\n\\t\\t\\t\\t\\t\\t\\t\\t{skill.name}: {skill.score}\\n\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t{/each}\\n\\t\\t</div>\\n\\t</div>\\n</details>\\n\\n\\n<style>\\n\\t.sheet-card-block {\\n\\t\\tborder: 1px dotted lime;\\n\\t\\twidth: 100%;\\n\\t}\\n\\t.parent-trait {\\n\\t\\tfont-size: var(--s110);\\n\\t\\tfont-weight: bold;\\n\\t\\tmargin: var(--s100);\\n\\t\\ttext-align: center;\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AA+BC,iBAAiB,cAAC,CAAC,AAClB,MAAM,CAAE,GAAG,CAAC,MAAM,CAAC,IAAI,CACvB,KAAK,CAAE,IAAI,AACZ,CAAC,AACD,aAAa,cAAC,CAAC,AACd,SAAS,CAAE,IAAI,MAAM,CAAC,CACtB,WAAW,CAAE,IAAI,CACjB,MAAM,CAAE,IAAI,MAAM,CAAC,CACnB,UAAU,CAAE,MAAM,AACnB,CAAC\"}"
};

const Skills$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $character = get_store_value(character);
	$$result.css.add(css$8);

	return `<details class="${"sheet-details"}" close><summary class="${"sheet-card-title"}">Skills
	</summary>
	<div class="${"sheet-card"}"><div class="${"sheet-card-body"}">${each(Object.values($character.traits), trait => `<div class="${"sheet-card-block svelte-bm8oqp"}"><div class="${"parent-trait svelte-bm8oqp"}">${escape(trait.name)}</div>
					${each(Object.values($character.skills), skill => `${trait.name == skill.parent
	? `<div class="${"sheet-card-item"}">${escape(skill.name)}: ${escape(skill.score)}
							</div>`
	: ``}`)}
				</div>`)}</div></div>
</details>`;
});

/* src/components/views/character/Traits.svelte generated by Svelte v3.29.4 */

const css$9 = {
	code: ".trait-name.svelte-o6s5tc{font-size:var(--s110);font-weight:bold}",
	map: "{\"version\":3,\"file\":\"Traits.svelte\",\"sources\":[\"Traits.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport { character } from 'stores/characterStore.js'\\n</script>\\n\\n\\n<details class='sheet-details' close>\\n\\t<summary class='sheet-card-title'>\\n\\t\\tTraits\\n\\t</summary>\\n\\t<div class='sheet-card'>\\n\\t\\t<div class='sheet-card-body'>\\n\\t\\t\\t{#each Object.values($character.traits) as trait}\\n\\t\\t\\t\\t<div class='sheet-card-block'>\\n\\t\\t\\t\\t\\t<div class='sheet-card-item'>\\n\\t\\t\\t\\t\\t\\t<span class='trait-name'>\\n\\t\\t\\t\\t\\t\\t\\t{trait.name}: {trait.score}\\n\\t\\t\\t\\t\\t\\t</span>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t{/each}\\n\\t\\t</div>\\n\\t</div>\\n</details>\\n\\n\\n<style>\\n\\t.trait-name {\\n\\t\\tfont-size: var(--s110);\\n\\t\\tfont-weight: bold;\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AA0BC,WAAW,cAAC,CAAC,AACZ,SAAS,CAAE,IAAI,MAAM,CAAC,CACtB,WAAW,CAAE,IAAI,AAClB,CAAC\"}"
};

const Traits$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $character = get_store_value(character);
	$$result.css.add(css$9);

	return `<details class="${"sheet-details"}" close><summary class="${"sheet-card-title"}">Traits
	</summary>
	<div class="${"sheet-card"}"><div class="${"sheet-card-body"}">${each(Object.values($character.traits), trait => `<div class="${"sheet-card-block"}"><div class="${"sheet-card-item"}"><span class="${"trait-name svelte-o6s5tc"}">${escape(trait.name)}: ${escape(trait.score)}
						</span></div>
				</div>`)}</div></div>
</details>`;
});

/* src/components/views/character/CharacterSheet.svelte generated by Svelte v3.29.4 */

const css$a = {
	code: ".character-sheet.svelte-dkz0m{padding:var(--s100)}",
	map: "{\"version\":3,\"file\":\"CharacterSheet.svelte\",\"sources\":[\"CharacterSheet.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport Abilities from 'views/character/Abilities.svelte'\\n\\timport DeleteCharacterButton from 'views/character/DeleteCharacterButton.svelte'\\n\\timport Description from 'views/character/Description.svelte'\\n\\timport Gear from 'views/character/Gear.svelte'\\n\\timport Health from 'views/character/Health.svelte'\\n\\timport LoadCharacterButton from 'views/character/LoadCharacterButton.svelte'\\n\\timport Notes from 'views/character/Notes.svelte'\\n\\timport Properties from 'views/character/Properties.svelte'\\n\\timport SaveCharacterButton from 'views/character/SaveCharacterButton.svelte'\\n\\timport Skills from 'views/character/Skills.svelte'\\n\\timport Traits from 'views/character/Traits.svelte'\\n\\n\\texport let mode\\n</script>\\n\\n\\n<div class=\\\"character-sheet\\\">\\n\\t<Description {mode} />\\n\\t<Traits />\\n\\t<Skills />\\n\\t<Properties {mode} />\\n\\t<Health {mode} />\\n\\t<Abilities />\\n\\t<Gear {mode} />\\n\\t<Notes {mode} />\\n</div>\\n<div class='btn-row'>\\n\\t<DeleteCharacterButton />\\n\\t<LoadCharacterButton />\\n\\t<SaveCharacterButton />\\n</div>\\n\\n\\n<style>\\n\\t.character-sheet {\\n\\t\\tpadding: var(--s100);\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AAmCC,gBAAgB,aAAC,CAAC,AACjB,OAAO,CAAE,IAAI,MAAM,CAAC,AACrB,CAAC\"}"
};

const CharacterSheet = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { mode } = $$props;
	if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0) $$bindings.mode(mode);
	$$result.css.add(css$a);

	return `<div class="${"character-sheet svelte-dkz0m"}">${validate_component(Description, "Description").$$render($$result, { mode }, {}, {})}
	${validate_component(Traits$1, "Traits").$$render($$result, {}, {}, {})}
	${validate_component(Skills$1, "Skills").$$render($$result, {}, {}, {})}
	${validate_component(Properties$1, "Properties").$$render($$result, { mode }, {}, {})}
	${validate_component(Health, "Health").$$render($$result, { mode }, {}, {})}
	${validate_component(Abilities, "Abilities").$$render($$result, {}, {}, {})}
	${validate_component(Gear_1, "Gear").$$render($$result, { mode }, {}, {})}
	${validate_component(Notes, "Notes").$$render($$result, { mode }, {}, {})}</div>
<div class="${"btn-row"}">${validate_component(DeleteCharacterButton, "DeleteCharacterButton").$$render($$result, {}, {}, {})}
	${validate_component(LoadCharacterButton, "LoadCharacterButton").$$render($$result, {}, {}, {})}
	${validate_component(SaveCharacterButton, "SaveCharacterButton").$$render($$result, {}, {}, {})}
</div>`;
});

const CONTEXT_KEY = {};

/* src/components/views/widgets/ClickOutside.svelte generated by Svelte v3.29.4 */

const ClickOutside_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { exclude = [] } = $$props;
	let child;
	const dispatch = createEventDispatcher();

	if ($$props.exclude === void 0 && $$bindings.exclude && exclude !== void 0) $$bindings.exclude(exclude);

	return `
<div${add_attribute("this", child, 1)}>${slots.default ? slots.default({}) : ``}</div>`;
});

/* src/components/views/widgets/UserMenu.svelte generated by Svelte v3.29.4 */

const css$b = {
	code: ".user-btn.svelte-1fvsods{height:var(--s300);position:fixed;right:0;width:var(--s300);z-index:3}.user-btn.svelte-1fvsods:active,.user-btn.svelte-1fvsods:focus,.user-btn.svelte-1fvsods:hover{background-color:lime;color:rgba(15, 30, 15, 1)}.user-menu.svelte-1fvsods{background:rgba(15, 30, 15, 1);border:var(--s1) solid lime;position:absolute;right:0;top:var(--s300);width:30vw;min-width:200px;z-index:4}a.svelte-1fvsods{border:none;display:block;font-weight:normal;padding:var(--s100)}a.svelte-1fvsods:active,a.svelte-1fvsods:focus,a.svelte-1fvsods:hover{background-color:lime;color:rgba(15, 30, 15, 1)}.shadow.svelte-1fvsods{background:rgba(0, 0, 0, .5);position:absolute;top:0;left:0;height:100vh;width:100vw;z-index:2}.invisible.svelte-1fvsods{display:none}",
	map: "{\"version\":3,\"file\":\"UserMenu.svelte\",\"sources\":[\"UserMenu.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport ClickOutside from 'views/widgets/ClickOutside.svelte'\\n\\t// import { logout, userStore } from 'stores/userStore.js'\\n\\n\\tlet showMenu = false\\n\\tlet trigger\\n\\n\\tconst toggle = _ => showMenu = !showMenu\\n\\n\\tconst hide = _ => showMenu = false\\n\\n\\tconst logOut = _ => {\\n\\t\\t// hide()\\n\\t\\t// try {\\n\\t\\t// \\tlogout()\\n\\t\\t// }\\n\\t\\t// catch {\\n\\t\\t// \\tshowMenu = false\\n\\t\\t// \\twindow.location.assign(`/`)\\n\\t\\t// }\\n\\t}\\n</script>\\n\\n\\n<!-- {#if userStore} -->\\n\\t<button class='btn-box user-btn' bind:this={trigger} on:click={toggle}>\\n\\t\\t<div class='btn-icon'>&#9776;</div>\\n\\t</button>\\n\\t<ClickOutside on:clickoutside={hide} exclude={[trigger]}>\\n\\t\\t<div hidden={!showMenu} class='user-menu'>\\n\\t\\t\\t<a href='/character' class='link-btn first-link' on:click={hide}>Character</a>\\n\\t\\t\\t<a href='/manual' class='link-btn' on:click={hide}>Manual</a>\\n\\t\\t\\t<a href='/generator' class='link-btn' on:click={hide}>Generator</a>\\n\\t\\t\\t<a href='/' class='link-btn last-link' on:click={logOut}>Logout</a>\\n\\t\\t</div>\\n\\t</ClickOutside>\\n\\t<div class='{showMenu ? \\\"shadow\\\" : \\\"invisible\\\"}'></div>\\n<!-- {/if} -->\\n\\n\\n<style>\\n\\t.user-btn {\\n\\t\\theight: var(--s300);\\n\\t\\tposition: fixed;\\n\\t\\tright: 0;\\n\\t\\twidth: var(--s300);\\n\\t\\tz-index: 3;\\n\\t}\\n\\t.user-btn:active,\\n\\t.user-btn:focus,\\n\\t.user-btn:hover {\\n\\t\\tbackground-color: lime;\\n\\t\\tcolor: rgba(15, 30, 15, 1);\\n\\t}\\n\\t.user-menu {\\n\\t\\tbackground: rgba(15, 30, 15, 1);\\n\\t\\tborder: var(--s1) solid lime;\\n\\t\\tposition: absolute;\\n\\t\\tright: 0;\\n\\t\\ttop: var(--s300);\\n\\t\\twidth: 30vw;\\n\\t\\tmin-width: 200px;\\n\\t\\tz-index: 4;\\n\\t}\\n\\ta {\\n\\t\\tborder: none;\\n\\t\\tdisplay: block;\\n\\t\\tfont-weight: normal;\\n\\t\\tpadding: var(--s100);\\n\\t}\\n\\ta:active,\\n\\ta:focus,\\n\\ta:hover {\\n\\t\\tbackground-color: lime;\\n\\t\\tcolor: rgba(15, 30, 15, 1);\\n\\t}\\n\\t.shadow {\\n\\t\\tbackground: rgba(0, 0, 0, .5);\\n\\t\\tposition: absolute;\\n\\t\\ttop: 0;\\n\\t\\tleft: 0;\\n\\t\\theight: 100vh;\\n\\t\\twidth: 100vw;\\n\\t\\tz-index: 2;\\n\\t}\\n\\t.invisible {\\n\\t\\tdisplay: none;\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AAyCC,SAAS,eAAC,CAAC,AACV,MAAM,CAAE,IAAI,MAAM,CAAC,CACnB,QAAQ,CAAE,KAAK,CACf,KAAK,CAAE,CAAC,CACR,KAAK,CAAE,IAAI,MAAM,CAAC,CAClB,OAAO,CAAE,CAAC,AACX,CAAC,AACD,wBAAS,OAAO,CAChB,wBAAS,MAAM,CACf,wBAAS,MAAM,AAAC,CAAC,AAChB,gBAAgB,CAAE,IAAI,CACtB,KAAK,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,AAC3B,CAAC,AACD,UAAU,eAAC,CAAC,AACX,UAAU,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAC/B,MAAM,CAAE,IAAI,IAAI,CAAC,CAAC,KAAK,CAAC,IAAI,CAC5B,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,CAAC,CACR,GAAG,CAAE,IAAI,MAAM,CAAC,CAChB,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,KAAK,CAChB,OAAO,CAAE,CAAC,AACX,CAAC,AACD,CAAC,eAAC,CAAC,AACF,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,KAAK,CACd,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,IAAI,MAAM,CAAC,AACrB,CAAC,AACD,gBAAC,OAAO,CACR,gBAAC,MAAM,CACP,gBAAC,MAAM,AAAC,CAAC,AACR,gBAAgB,CAAE,IAAI,CACtB,KAAK,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,AAC3B,CAAC,AACD,OAAO,eAAC,CAAC,AACR,UAAU,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAC7B,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,CAAC,AACX,CAAC,AACD,UAAU,eAAC,CAAC,AACX,OAAO,CAAE,IAAI,AACd,CAAC\"}"
};

const UserMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let trigger;
	// try {
	// 	logout()
	// }

	$$result.css.add(css$b);

	return `
	<button class="${"btn-box user-btn svelte-1fvsods"}"${add_attribute("this", trigger, 1)}><div class="${"btn-icon"}">☰</div></button>
	${validate_component(ClickOutside_1, "ClickOutside").$$render($$result, { exclude: [trigger] }, {}, {
		default: () => `<div ${ "hidden" } class="${"user-menu svelte-1fvsods"}"><a href="${"/character"}" class="${"link-btn first-link svelte-1fvsods"}">Character</a>
			<a href="${"/manual"}" class="${"link-btn svelte-1fvsods"}">Manual</a>
			<a href="${"/generator"}" class="${"link-btn svelte-1fvsods"}">Generator</a>
			<a href="${"/"}" class="${"link-btn last-link svelte-1fvsods"}">Logout</a></div>`
	})}
	<div class="${escape(null_to_empty( "invisible")) + " svelte-1fvsods"}"></div>
`;
});

/* src/components/views/widgets/TitleBar.svelte generated by Svelte v3.29.4 */

const css$c = {
	code: ".title-bar.svelte-oosnsl{display:flex;max-height:var(--s300);position:fixed;top:0;transition:top 0.3s linear;width:100%;z-index:2}.title-link.svelte-oosnsl{padding:var(--s100);width:100%}",
	map: "{\"version\":3,\"file\":\"TitleBar.svelte\",\"sources\":[\"TitleBar.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport UserMenu from 'views/widgets/UserMenu.svelte'\\n</script>\\n\\n\\n<div class='title-bar'>\\n\\t<a href='/' class='link-btn title-link'>\\n\\t\\t<span class='app-title'>Apocalyptia Online</span>\\n\\t</a>\\n\\t<UserMenu/>\\n</div>\\n\\n\\n<style>\\n\\t.title-bar {\\n\\t\\tdisplay: flex;\\n\\t\\tmax-height: var(--s300);\\n\\t\\tposition: fixed;\\n\\t\\ttop: 0;\\n\\t\\ttransition: top 0.3s linear;\\n\\t\\twidth: 100%;\\n\\t\\tz-index: 2;\\n\\t}\\n\\t.title-link {\\n\\t\\tpadding: var(--s100);\\n\\t\\twidth: 100%;\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AAcC,UAAU,cAAC,CAAC,AACX,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,IAAI,MAAM,CAAC,CACvB,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,CAAC,CACN,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,MAAM,CAC3B,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,CAAC,AACX,CAAC,AACD,WAAW,cAAC,CAAC,AACZ,OAAO,CAAE,IAAI,MAAM,CAAC,CACpB,KAAK,CAAE,IAAI,AACZ,CAAC\"}"
};

const TitleBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css$c);

	return `<div class="${"title-bar svelte-oosnsl"}"><a href="${"/"}" class="${"link-btn title-link svelte-oosnsl"}"><span class="${"app-title"}">Apocalyptia Online</span></a>
	${validate_component(UserMenu, "UserMenu").$$render($$result, {}, {}, {})}
</div>`;
});

/* src/routes/_layout.svelte generated by Svelte v3.29.4 */

const css$d = {
	code: ".svelte-kxnr99::-webkit-scrollbar{display:none}.display-window.svelte-kxnr99{height:calc(100vh - var(--s300));overflow:scroll;position:absolute;scrollbar-width:none;top:var(--s300);width:100vw}",
	map: "{\"version\":3,\"file\":\"_layout.svelte\",\"sources\":[\"_layout.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport TitleBar from 'views/widgets/TitleBar.svelte'\\n</script>\\n\\n\\n<main>\\n\\t<TitleBar />\\n\\t<div class='display-window'>\\n\\t\\t<slot/>\\n\\t</div>\\n</main>\\n\\n\\n<style>\\n\\t::-webkit-scrollbar {\\n\\t\\tdisplay: none;\\n\\t}\\n\\t.display-window {\\n\\t\\theight: calc(100vh - var(--s300));\\n\\t\\toverflow: scroll;\\n\\t\\tposition: absolute;\\n\\t\\tscrollbar-width: none;\\n\\t\\ttop: var(--s300);\\n\\t\\twidth: 100vw;\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"cAcC,mBAAmB,AAAC,CAAC,AACpB,OAAO,CAAE,IAAI,AACd,CAAC,AACD,eAAe,cAAC,CAAC,AAChB,MAAM,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,MAAM,CAAC,CAAC,CACjC,QAAQ,CAAE,MAAM,CAChB,QAAQ,CAAE,QAAQ,CAClB,eAAe,CAAE,IAAI,CACrB,GAAG,CAAE,IAAI,MAAM,CAAC,CAChB,KAAK,CAAE,KAAK,AACb,CAAC\"}"
};

const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css$d);

	return `<main class="${"svelte-kxnr99"}">${validate_component(TitleBar, "TitleBar").$$render($$result, {}, {}, {})}
	<div class="${"display-window svelte-kxnr99"}">${slots.default ? slots.default({}) : ``}</div>
</main>`;
});

var root_comp = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Layout
});

/* src/node_modules/@sapper/internal/error.svelte generated by Svelte v3.29.4 */

const Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { error } = $$props;
	let { status } = $$props;
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);

	return `<h1>${escape(status)}</h1>

<p>${escape(error.message)}</p>

${ ``}`;
});

/* src/node_modules/@sapper/internal/App.svelte generated by Svelte v3.29.4 */

const App = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { stores } = $$props;
	let { error } = $$props;
	let { status } = $$props;
	let { segments } = $$props;
	let { level0 } = $$props;
	let { level1 = null } = $$props;
	let { notify } = $$props;
	afterUpdate(notify);
	setContext(CONTEXT_KEY, stores);
	if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.segments === void 0 && $$bindings.segments && segments !== void 0) $$bindings.segments(segments);
	if ($$props.level0 === void 0 && $$bindings.level0 && level0 !== void 0) $$bindings.level0(level0);
	if ($$props.level1 === void 0 && $$bindings.level1 && level1 !== void 0) $$bindings.level1(level1);
	if ($$props.notify === void 0 && $$bindings.notify && notify !== void 0) $$bindings.notify(notify);

	return `


${validate_component(Layout, "Layout").$$render($$result, Object.assign({ segment: segments[0] }, level0.props), {}, {
		default: () => `${error
		? `${validate_component(Error$1, "Error").$$render($$result, { error, status }, {}, {})}`
		: `${validate_component(level1.component || missing_component, "svelte:component").$$render($$result, Object.assign(level1.props), {}, {})}`}`
	})}`;
});

// This file is generated by Sapper — do not edit it!

const ignore = [];

const routes = (d => [
	{
		// index.svelte
		pattern: /^\/$/,
		parts: [
			{ i: 0 }
		]
	},

	{
		// character/index.svelte
		pattern: /^\/character\/?$/,
		parts: [
			{ i: 1 }
		]
	},

	{
		// character/load_character.svelte
		pattern: /^\/character\/load_character\/?$/,
		parts: [
			null,
			{ i: 2 }
		]
	},

	{
		// character/new_character.svelte
		pattern: /^\/character\/new_character\/?$/,
		parts: [
			null,
			{ i: 3 }
		]
	},

	{
		// character/creator/description.svelte
		pattern: /^\/character\/creator\/description\/?$/,
		parts: [
			null,
			null,
			{ i: 4 }
		]
	},

	{
		// character/creator/properties.svelte
		pattern: /^\/character\/creator\/properties\/?$/,
		parts: [
			null,
			null,
			{ i: 5 }
		]
	},

	{
		// character/creator/abilities.svelte
		pattern: /^\/character\/creator\/abilities\/?$/,
		parts: [
			null,
			null,
			{ i: 6 }
		]
	},

	{
		// character/creator/creator.svelte
		pattern: /^\/character\/creator\/creator\/?$/,
		parts: [
			null,
			null,
			{ i: 7 }
		]
	},

	{
		// character/creator/skills.svelte
		pattern: /^\/character\/creator\/skills\/?$/,
		parts: [
			null,
			null,
			{ i: 8 }
		]
	},

	{
		// character/creator/traits.svelte
		pattern: /^\/character\/creator\/traits\/?$/,
		parts: [
			null,
			null,
			{ i: 9 }
		]
	},

	{
		// character/creator/sheet.svelte
		pattern: /^\/character\/creator\/sheet\/?$/,
		parts: [
			null,
			null,
			{ i: 10 }
		]
	},

	{
		// character/creator/gear.svelte
		pattern: /^\/character\/creator\/gear\/?$/,
		parts: [
			null,
			null,
			{ i: 11 }
		]
	},

	{
		// generator.svelte
		pattern: /^\/generator\/?$/,
		parts: [
			{ i: 12 }
		]
	},

	{
		// manual/manual.svelte
		pattern: /^\/manual\/manual\/?$/,
		parts: [
			null,
			{ i: 13 }
		]
	},

	{
		// manual/[chapter].svelte
		pattern: /^\/manual\/([^\/]+?)\/?$/,
		parts: [
			null,
			{ i: 14, params: match => ({ chapter: d(match[1]) }) }
		]
	},

	{
		// signup/index.svelte
		pattern: /^\/signup\/?$/,
		parts: [
			{ i: 15 }
		]
	},

	{
		// login/index.svelte
		pattern: /^\/login\/?$/,
		parts: [
			{ i: 16 }
		]
	},

	{
		// login/recover.svelte
		pattern: /^\/login\/recover\/?$/,
		parts: [
			null,
			{ i: 17 }
		]
	}
])(decodeURIComponent);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

let uid = 1;
let cid;
const _history = typeof history !== 'undefined' ? history : {
    pushState: () => { },
    replaceState: () => { },
    scrollRestoration: 'auto'
};
const scroll_history = {};
let base_url;
let handle_target;
function extract_query(search) {
    const query = Object.create(null);
    if (search.length > 0) {
        search.slice(1).split('&').forEach(searchParam => {
            const [, key, value = ''] = /([^=]*)(?:=(.*))?/.exec(decodeURIComponent(searchParam.replace(/\+/g, ' ')));
            if (typeof query[key] === 'string')
                query[key] = [query[key]];
            if (typeof query[key] === 'object')
                query[key].push(value);
            else
                query[key] = value;
        });
    }
    return query;
}
function select_target(url) {
    if (url.origin !== location.origin)
        return null;
    if (!url.pathname.startsWith(base_url))
        return null;
    let path = url.pathname.slice(base_url.length);
    if (path === '') {
        path = '/';
    }
    // avoid accidental clashes between server routes and page routes
    if (ignore.some(pattern => pattern.test(path)))
        return;
    for (let i = 0; i < routes.length; i += 1) {
        const route = routes[i];
        const match = route.pattern.exec(path);
        if (match) {
            const query = extract_query(url.search);
            const part = route.parts[route.parts.length - 1];
            const params = part.params ? part.params(match) : {};
            const page = { host: location.host, path, query, params };
            return { href: url.href, route, match, page };
        }
    }
}
function scroll_state() {
    return {
        x: pageXOffset,
        y: pageYOffset
    };
}
function navigate(dest, id, noscroll, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        const popstate = !!id;
        if (popstate) {
            cid = id;
        }
        else {
            const current_scroll = scroll_state();
            // clicked on a link. preserve scroll state
            scroll_history[cid] = current_scroll;
            cid = id = ++uid;
            scroll_history[cid] = noscroll ? current_scroll : { x: 0, y: 0 };
        }
        yield handle_target();
        if (document.activeElement && (document.activeElement instanceof HTMLElement))
            document.activeElement.blur();
        if (!noscroll) {
            let scroll = scroll_history[id];
            let deep_linked;
            if (hash) {
                // scroll is an element id (from a hash), we need to compute y.
                deep_linked = document.getElementById(hash.slice(1));
                if (deep_linked) {
                    scroll = {
                        x: 0,
                        y: deep_linked.getBoundingClientRect().top + scrollY
                    };
                }
            }
            scroll_history[cid] = scroll;
            if (popstate || deep_linked) {
                scrollTo(scroll.x, scroll.y);
            }
            else {
                scrollTo(0, 0);
            }
        }
    });
}

function get_base_uri(window_document) {
    let baseURI = window_document.baseURI;
    if (!baseURI) {
        const baseTags = window_document.getElementsByTagName('base');
        baseURI = baseTags.length ? baseTags[0].href : window_document.URL;
    }
    return baseURI;
}

function goto(href, opts = { noscroll: false, replaceState: false }) {
    const target = select_target(new URL(href, get_base_uri(document)));
    if (target) {
        _history[opts.replaceState ? 'replaceState' : 'pushState']({ id: cid }, '', href);
        return navigate(target, null, opts.noscroll);
    }
    location.href = href;
    return new Promise(() => {
        /* never resolves */
    });
}

function page_store(value) {
    const store = writable(value);
    let ready = true;
    function notify() {
        ready = true;
        store.update(val => val);
    }
    function set(new_value) {
        ready = false;
        store.set(new_value);
    }
    function subscribe(run) {
        let old_value;
        return store.subscribe((new_value) => {
            if (old_value === undefined || (ready && new_value !== old_value)) {
                run(old_value = new_value);
            }
        });
    }
    return { notify, set, subscribe };
}

const initial_data = typeof __SAPPER__ !== 'undefined' && __SAPPER__;
const stores = {
    page: page_store({}),
    preloading: writable(null),
    session: writable(initial_data && initial_data.session)
};
stores.session.subscribe((value) => __awaiter(void 0, void 0, void 0, function* () {
    return;
}));

/* src/routes/character/index.svelte generated by Svelte v3.29.4 */

const Character_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $character = get_store_value(character);

	return `${($$result.head += `${($$result.title = `<title>Apocalyptia Online - Character</title>`, "")}`, "")}
${!$character.meta.user
	? `<div class="${"cntr-card"}"><button class="${"link-btn"}">New Character</button>
        <button class="${"link-btn"}">Load Character</button></div>`
	: `${validate_component(CharacterSheet, "CharacterSheet").$$render($$result, { mode: "edit" }, {}, {})}`}
${validate_component(BackButton, "BackButton").$$render($$result, { path: "/" }, {}, {})}`;
});

var component_1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Character_1
});

/* src/routes/character/load_character.svelte generated by Svelte v3.29.4 */

const Load_character = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return ``;
});

var component_2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Load_character
});

class Descriptor {
	constructor({
		id,
		name,
		random,
		type,
		value
	}) {
		this.id = id;
		this.name = name;
		this.random = random;
		this.type = type;
		this.value = value;
	}
}

const RandomAge = _ => {
	return Math.ceil((Math.random() * 33) + 17)
}; // 17 to 50

const Age = new Descriptor({
	id: `e0c4af2f-7735-4a18-4e14-60065d24740a`,
	name: `Age`,
	value: ``,
	random: (c) => {
		c.desc.age.value = RandomAge();
		return c
	}
});

const RandomHair = _ => {
	return RandomRoll(
		[
			`Auburn`,
			`Bald`,
			`Black`,
			`Blonde`,
			`Brunette`,
			`Gray`,
			`Red`,
			`White`,
		]
	)
};

const Hair = new Descriptor({
	id: `ac814cf2-690a-4cc5-0c0b-6a442523f50a`,
	name: `Hair`,
	value: ``,
	random: (c) => {
		c.desc.hair.value = RandomHair();
		return c
	}
});

const RandomHeight = _ => {
	const totalInches = Math.ceil((Math.random() * 14) + 60); // 5ft low, 5ft7in median, 6ft2in high
	const feet = Math.floor(totalInches / 12);
	const inches = Math.floor(totalInches % 12);
	return `${feet}ft ${inches}in`
};

const Height = new Descriptor({
	id: `2b4a18f1-1916-4bc8-8037-3ef4c7937b0e`,
	name: `Height`,
	value: ``,
	random: (c) => {
		c.desc.height.value = RandomHeight();
		return c
	}
});

const FemaleNames = [
	'Aaliyah',
	'Abagail',
	'Abbey',
	'Abbie',
	'Abbigail',
	'Abby',
	'Abigail',
	'Abigale',
	'Abigayle',
	'Abril',
	'Addison',
	'Adeline',
	'Adriana',
	'Adrianna',
	'Adrienne',
	'Aileen',
	'Aimee',
	'Ainsley',
	'Aisha',
	'Aiyana',
	'Alaina',
	'Alana',
	'Alanna',
	'Alayna',
	'Aleah',
	'Alejandra',
	'Alena',
	'Alessandra',
	'Alex',
	'Alexa',
	'Alexandra',
	'Alexandrea',
	'Alexandria',
	'Alexia',
	'Alexis',
	'Alexus',
	'Alexys',
	'Alia',
	'Alice',
	'Alicia',
	'Alina',
	'Alisa',
	'Alisha',
	'Alison',
	'Alissa',
	'Alivia',
	'Aliya',
	'Aliyah',
	'Aliza',
	'Alize',
	'Allie',
	'Allison',
	'Ally',
	'Allyson',
	'Allyssa',
	'Alma',
	'Alondra',
	'Alysa',
	'Alyson',
	'Alyssa',
	'Amanda',
	'Amani',
	'Amara',
	'Amari',
	'Amaya',
	'Amber',
	'Amelia',
	'America',
	'Amina',
	'Amira',
	'Amiya',
	'Amy',
	'Amya',
	'Ana',
	'Anahi',
	'Anastasia',
	'Anaya',
	'Andrea',
	'Angel',
	'Angela',
	'Angelica',
	'Angelina',
	'Angelique',
	'Angie',
	'Anika',
	'Anissa',
	'Anita',
	'Aniya',
	'Aniyah',
	'Anjali',
	'Ann',
	'Anna',
	'Annabel',
	'Annabella',
	'Annabelle',
	'Annalise',
	'Anne',
	'Annette',
	'Annie',
	'Annika',
	'Ansley',
	'Antonia',
	'Anya',
	'April',
	'Araceli',
	'Aracely',
	'Areli',
	'Arely',
	'Aria',
	'Ariana',
	'Arianna',
	'Ariel',
	'Arielle',
	'Arlene',
	'Armani',
	'Aryana',
	'Aryanna',
	'Ashanti',
	'Ashlee',
	'Ashleigh',
	'Ashley',
	'Ashly',
	'Ashlyn',
	'Ashlynn',
	'Ashton',
	'Ashtyn',
	'Asia',
	'Aspen',
	'Athena',
	'Aubree',
	'Aubrey',
	'Aubrie',
	'Audrey',
	'Aurora',
	'Autumn',
	'Ava',
	'Avery',
	'Ayana',
	'Ayanna',
	'Ayla',
	'Aylin',
	'Baby',
	'Bailee',
	'Bailey',
	'Barbara',
	'Baylee',
	'Beatriz',
	'Belen',
	'Bella',
	'Berenice',
	'Bethany',
	'Bianca',
	'Blanca',
	'Bonnie',
	'Brandi',
	'Brandy',
	'Breana',
	'Breanna',
	'Brenda',
	'Brenna',
	'Bria',
	'Briana',
	'Brianna',
	'Brianne',
	'Bridget',
	'Bridgette',
	'Brielle',
	'Brionna',
	'Brisa',
	'Britney',
	'Brittany',
	'Brittney',
	'Brook',
	'Brooke',
	'Brooklyn',
	'Brooklynn',
	'Bryana',
	'Bryanna',
	'Brynn',
	'Cadence',
	'Caitlin',
	'Caitlyn',
	'Caitlynn',
	'Caleigh',
	'Cali',
	'Calista',
	'Callie',
	'Cameron',
	'Camila',
	'Camilla',
	'Camille',
	'Camryn',
	'Candace',
	'Candice',
	'Cara',
	'Carina',
	'Carissa',
	'Carla',
	'Carlee',
	'Carley',
	'Carli',
	'Carlie',
	'Carly',
	'Carmen',
	'Carol',
	'Carolina',
	'Caroline',
	'Carolyn',
	'Carrie',
	'Carson',
	'Casandra',
	'Casey',
	'Cassandra',
	'Cassidy',
	'Cassie',
	'Catalina',
	'Catherine',
	'Cayla',
	'Cecelia',
	'Cecilia',
	'Celeste',
	'Celia',
	'Celina',
	'Celine',
	'Chandler',
	'Chanel',
	'Charity',
	'Charlotte',
	'Chasity',
	'Chaya',
	'Chelsea',
	'Chelsey',
	'Cheyanne',
	'Cheyenne',
	'Chloe',
	'Christa',
	'Christian',
	'Christiana',
	'Christina',
	'Christine',
	'Christy',
	'Chyna',
	'Ciara',
	'Ciera',
	'Cierra',
	'Cindy',
	'Citlali',
	'Claire',
	'Clara',
	'Clare',
	'Clarissa',
	'Claudia',
	'Colleen',
	'Cora',
	'Corinne',
	'Courtney',
	'Cristal',
	'Cristina',
	'Crystal',
	'Cynthia',
	'Daisy',
	'Dakota',
	'Dalia',
	'Damaris',
	'Dana',
	'Daniela',
	'Daniella',
	'Danielle',
	'Danna',
	'Daphne',
	'Darby',
	'Darlene',
	'Dasia',
	'Dayana',
	'Dayanara',
	'Deanna',
	'Deasia',
	'Deborah',
	'Deja',
	'Delaney',
	'Delia',
	'Delilah',
	'Denise',
	'Desirae',
	'Desiree',
	'Destinee',
	'Destiney',
	'Destini',
	'Destiny',
	'Devin',
	'Devon',
	'Devyn',
	'Diamond',
	'Diana',
	'Diane',
	'Dianna',
	'Dominique',
	'Donna',
	'Dorothy',
	'Drew',
	'Dulce',
	'Dylan',
	'Ebony',
	'Eden',
	'Edith',
	'Eileen',
	'Elaina',
	'Elaine',
	'Eleanor',
	'Elena',
	'Eliana',
	'Elisa',
	'Elisabeth',
	'Elise',
	'Elissa',
	'Eliza',
	'Elizabeth',
	'Ella',
	'Elle',
	'Ellen',
	'Ellie',
	'Elsa',
	'Elyse',
	'Elyssa',
	'Emely',
	'Emerson',
	'Emilee',
	'Emilia',
	'Emilie',
	'Emily',
	'Emma',
	'Emmalee',
	'Erica',
	'Ericka',
	'Erika',
	'Erin',
	'Esmeralda',
	'Esperanza',
	'Essence',
	'Estefania',
	'Esther',
	'Estrella',
	'Eva',
	'Eve',
	'Evelin',
	'Evelyn',
	'Fabiola',
	'Faith',
	'Fatima',
	'Felicia',
	'Felicity',
	'Fernanda',
	'Fiona',
	'Frances',
	'Francesca',
	'Frida',
	'Gabriela',
	'Gabriella',
	'Gabrielle',
	'Galilea',
	'Genesis',
	'Genevieve',
	'Georgia',
	'Gia',
	'Giana',
	'Gianna',
	'Gillian',
	'Gina',
	'Giovanna',
	'Giselle',
	'Gisselle',
	'Gloria',
	'Grace',
	'Gracie',
	'Graciela',
	'Greta',
	'Gretchen',
	'Guadalupe',
	'Gwendolyn',
	'Hadley',
	'Hailee',
	'Hailey',
	'Hailie',
	'Haleigh',
	'Haley',
	'Halie',
	'Halle',
	'Hallie',
	'Hana',
	'Hanna',
	'Hannah',
	'Harley',
	'Harmony',
	'Haven',
	'Hayden',
	'Haylee',
	'Hayley',
	'Haylie',
	'Hazel',
	'Heather',
	'Heaven',
	'Heidi',
	'Helen',
	'Helena',
	'Hillary',
	'Holly',
	'Hope',
	'Hunter',
	'Iliana',
	'Imani',
	'India',
	'Ingrid',
	'Irene',
	'Iris',
	'Isabel',
	'Isabela',
	'Isabell',
	'Isabella',
	'Isabelle',
	'Isis',
	'Itzel',
	'Ivy',
	'Iyana',
	'Iyanna',
	'Izabella',
	'Jacey',
	'Jackeline',
	'Jacklyn',
	'Jaclyn',
	'Jacqueline',
	'Jacquelyn',
	'Jada',
	'Jade',
	'Jaden',
	'Jadyn',
	'Jaelyn',
	'Jaida',
	'Jaiden',
	'Jaidyn',
	'Jailyn',
	'Jaime',
	'Jakayla',
	'Jaliyah',
	'Jalyn',
	'Jalynn',
	'Jamie',
	'Jamya',
	'Jana',
	'Janae',
	'Jane',
	'Janelle',
	'Janessa',
	'Janet',
	'Janice',
	'Janiya',
	'Janiyah',
	'Jaquelin',
	'Jaqueline',
	'Jasmin',
	'Jasmine',
	'Jasmyn',
	'Jaycee',
	'Jayda',
	'Jayden',
	'Jayla',
	'Jaylene',
	'Jaylin',
	'Jaylyn',
	'Jaylynn',
	'Jazlyn',
	'Jazmin',
	'Jazmine',
	'Jazmyn',
	'Jazmyne',
	'Jeanette',
	'Jenifer',
	'Jenna',
	'Jennifer',
	'Jenny',
	'Jessica',
	'Jessie',
	'Jewel',
	'Jillian',
	'Jimena',
	'Joana',
	'Joanna',
	'Jocelyn',
	'Joelle',
	'Johana',
	'Johanna',
	'Jolie',
	'Jordan',
	'Jordyn',
	'Joselyn',
	'Josephine',
	'Josie',
	'Joslyn',
	'Journey',
	'Joy',
	'Joyce',
	'Judith',
	'Julia',
	'Juliana',
	'Julianna',
	'Julianne',
	'Julie',
	'Juliet',
	'Juliette',
	'Julissa',
	'Justice',
	'Justine',
	'Kacey',
	'Kaci',
	'Kacie',
	'Kadence',
	'Kaela',
	'Kaelyn',
	'Kaia',
	'Kaila',
	'Kailee',
	'Kailey',
	'Kailyn',
	'Kaitlin',
	'Kaitlyn',
	'Kaitlynn',
	'Kaiya',
	'Kaleigh',
	'Kaley',
	'Kali',
	'Kaliyah',
	'Kallie',
	'Kalyn',
	'Kamryn',
	'Kara',
	'Karen',
	'Kari',
	'Karina',
	'Karissa',
	'Karla',
	'Karlee',
	'Karley',
	'Karli',
	'Karlie',
	'Karly',
	'Kasandra',
	'Kasey',
	'Kassandra',
	'Kassidy',
	'Katarina',
	'Kate',
	'Katelin',
	'Katelyn',
	'Katelynn',
	'Katharine',
	'Katherine',
	'Kathleen',
	'Kathryn',
	'Kathy',
	'Katie',
	'Katlyn',
	'Katrina',
	'Katy',
	'Kaya',
	'Kaydence',
	'Kayla',
	'Kaylah',
	'Kaylee',
	'Kayleigh',
	'Kayley',
	'Kayli',
	'Kaylie',
	'Kaylin',
	'Kaylyn',
	'Kaylynn',
	'Keely',
	'Keira',
	'Kelli',
	'Kellie',
	'Kelly',
	'Kelsey',
	'Kelsi',
	'Kelsie',
	'Kendal',
	'Kendall',
	'Kendra',
	'Kenia',
	'Kenna',
	'Kennedi',
	'Kennedy',
	'Kenya',
	'Kenzie',
	'Keyla',
	'Kiana',
	'Kianna',
	'Kiara',
	'Kiera',
	'Kierra',
	'Kiersten',
	'Kiley',
	'Kimberly',
	'Kinsey',
	'Kira',
	'Kirsten',
	'Kourtney',
	'Krista',
	'Kristen',
	'Kristin',
	'Kristina',
	'Kristine',
	'Krystal',
	'Kya',
	'Kyla',
	'Kylee',
	'Kyleigh',
	'Kylie',
	'Kyra',
	'Lacey',
	'Laci',
	'Laila',
	'Laisha',
	'Lana',
	'Laney',
	'Lara',
	'Larissa',
	'Laura',
	'Laurel',
	'Lauren',
	'Lauryn',
	'Layla',
	'Lea',
	'Leah',
	'Leanna',
	'Leila',
	'Leilani',
	'Lena',
	'Lesley',
	'Leslie',
	'Lesly',
	'Leticia',
	'Lexi',
	'Lexie',
	'Lexus',
	'Lia',
	'Liana',
	'Libby',
	'Liberty',
	'Lila',
	'Lilian',
	'Liliana',
	'Lillian',
	'Lilliana',
	'Lillie',
	'Lilly',
	'Lily',
	'Lina',
	'Linda',
	'Lindsay',
	'Lindsey',
	'Lisa',
	'Lisbeth',
	'Lisette',
	'Litzy',
	'Lizbeth',
	'Lizeth',
	'Lizette',
	'Logan',
	'Lola',
	'London',
	'Loren',
	'Lorena',
	'Lucia',
	'Lucy',
	'Luz',
	'Lydia',
	'Lyndsey',
	'Lyric',
	'Macey',
	'Maci',
	'Macie',
	'Mackenzie',
	'Macy',
	'Madalyn',
	'Madalynn',
	'Maddison',
	'Madeleine',
	'Madeline',
	'Madelyn',
	'Madelynn',
	'Madilyn',
	'Madisen',
	'Madison',
	'Madisyn',
	'Madyson',
	'Maegan',
	'Maeve',
	'Magdalena',
	'Maggie',
	'Maia',
	'Makaila',
	'Makayla',
	'Makena',
	'Makenna',
	'Makenzie',
	'Maleah',
	'Malia',
	'Maliyah',
	'Mallory',
	'Mandy',
	'Mara',
	'Margaret',
	'Margarita',
	'Maria',
	'Mariah',
	'Mariam',
	'Mariana',
	'Marianna',
	'Maribel',
	'Marie',
	'Mariela',
	'Marilyn',
	'Marina',
	'Marisa',
	'Marisol',
	'Marissa',
	'Maritza',
	'Marlee',
	'Marlene',
	'Marley',
	'Martha',
	'Mary',
	'Maryam',
	'Mattie',
	'Maura',
	'Maya',
	'Mayra',
	'Mckayla',
	'Mckenna',
	'Mckenzie',
	'Meadow',
	'Meagan',
	'Meaghan',
	'Megan',
	'Meghan',
	'Melanie',
	'Melany',
	'Melina',
	'Melinda',
	'Melissa',
	'Melody',
	'Mercedes',
	'Meredith',
	'Mia',
	'Miah',
	'Micaela',
	'Micah',
	'Michaela',
	'Michelle',
	'Mikaela',
	'Mikayla',
	'Mira',
	'Miracle',
	'Miranda',
	'Mireya',
	'Miriam',
	'Mollie',
	'Molly',
	'Monica',
	'Monique',
	'Monserrat',
	'Montana',
	'Morgan',
	'Moriah',
	'Mya',
	'Myah',
	'Myra',
	'Nadia',
	'Nancy',
	'Naomi',
	'Natalia',
	'Natalie',
	'Nataly',
	'Natasha',
	'Nathalie',
	'Nayeli',
	'Nevaeh',
	'Nia',
	'Nichole',
	'Nicole',
	'Nicolette',
	'Nikki',
	'Nina',
	'Noelia',
	'Noelle',
	'Noemi',
	'Nora',
	'Norah',
	'Norma',
	'Nya',
	'Nyah',
	'Nyasia',
	'Nyla',
	'Olivia',
	'Paige',
	'Paloma',
	'Pamela',
	'Paola',
	'Paris',
	'Parker',
	'Patience',
	'Patricia',
	'Paula',
	'Paulina',
	'Payton',
	'Penelope',
	'Perla',
	'Peyton',
	'Phoebe',
	'Piper',
	'Precious',
	'Presley',
	'Princess',
	'Priscila',
	'Priscilla',
	'Quinn',
	'Rachael',
	'Rachel',
	'Rachelle',
	'Raegan',
	'Raina',
	'Raquel',
	'Raven',
	'Rayna',
	'Reagan',
	'Reanna',
	'Rebeca',
	'Rebecca',
	'Rebekah',
	'Reese',
	'Regan',
	'Regina',
	'Reilly',
	'Reina',
	'Renee',
	'Reyna',
	'Rhiannon',
	'Riley',
	'Rita',
	'Robin',
	'Robyn',
	'Rocio',
	'Rosa',
	'Rose',
	'Rosemary',
	'Roxana',
	'Ruby',
	'Ruth',
	'Ryan',
	'Ryann',
	'Rylee',
	'Ryleigh',
	'Rylie',
	'Sabrina',
	'Sadie',
	'Sage',
	'Saige',
	'Sally',
	'Salma',
	'Samantha',
	'Samara',
	'Samira',
	'Sandra',
	'Sandy',
	'Sara',
	'Sarah',
	'Sarahi',
	'Sarai',
	'Sarina',
	'Sasha',
	'Savana',
	'Savanah',
	'Savanna',
	'Savannah',
	'Scarlett',
	'Selena',
	'Selina',
	'Serena',
	'Serenity',
	'Shakira',
	'Shania',
	'Shaniya',
	'Shannon',
	'Sharon',
	'Shawna',
	'Shayla',
	'Shaylee',
	'Shayna',
	'Shea',
	'Sheila',
	'Shelby',
	'Sheridan',
	'Sherlyn',
	'Shirley',
	'Shreya',
	'Shyann',
	'Shyanne',
	'Sidney',
	'Sienna',
	'Sierra',
	'Silvia',
	'Simone',
	'Sky',
	'Skye',
	'Skyla',
	'Skylar',
	'Skyler',
	'Sofia',
	'Sonia',
	'Sonya',
	'Sophia',
	'Sophie',
	'Stacey',
	'Stacy',
	'Stella',
	'Stephanie',
	'Stephany',
	'Summer',
	'Susan',
	'Susana',
	'Sydnee',
	'Sydney',
	'Sydni',
	'Sydnie',
	'Sylvia',
	'Tabitha',
	'Talia',
	'Taliyah',
	'Tamara',
	'Tamia',
	'Tania',
	'Taniya',
	'Tanya',
	'Tara',
	'Taryn',
	'Tatiana',
	'Tatum',
	'Tatyana',
	'Taya',
	'Tayler',
	'Taylor',
	'Teagan',
	'Teresa',
	'Tess',
	'Tessa',
	'Thalia',
	'Theresa',
	'Tia',
	'Tiana',
	'Tianna',
	'Tiara',
	'Tierra',
	'Tiffany',
	'Tina',
	'Toni',
	'Tori',
	'Tracy',
	'Trinity',
	'Trista',
	'Tyler',
	'Tyra',
	'Unique',
	'Valentina',
	'Valeria',
	'Valerie',
	'Vanesa',
	'Vanessa',
	'Veronica',
	'Victoria',
	'Violet',
	'Virginia',
	'Vivian',
	'Viviana',
	'Wendy',
	'Whitney',
	'Willow',
	'Ximena',
	'Yadira',
	'Yareli',
	'Yasmin',
	'Yasmine',
	'Yazmin',
	'Yesenia',
	'Yessenia',
	'Yolanda',
	'Yoselin',
	'Yuliana',
	'Yvette',
	'Zaria',
	'Zoe',
	'Zoey',
	'Zoie',
];

const MaleNames = [
	'Aaron',
	'Abdullah',
	'Abel',
	'Abraham',
	'Abram',
	'Adam',
	'Adan',
	'Addison',
	'Aden',
	'Aditya',
	'Adolfo',
	'Adonis',
	'Adrian',
	'Adriel',
	'Adrien',
	'Agustin',
	'Ahmad',
	'Ahmed',
	'Aidan',
	'Aiden',
	'Alan',
	'Albert',
	'Alberto',
	'Alden',
	'Aldo',
	'Alec',
	'Alejandro',
	'Alessandro',
	'Alex',
	'Alexander',
	'Alexandro',
	'Alexis',
	'Alexzander',
	'Alfonso',
	'Alfred',
	'Alfredo',
	'Ali',
	'Alijah',
	'Allan',
	'Allen',
	'Alonso',
	'Alonzo',
	'Alvaro',
	'Alvin',
	'Amari',
	'Amarion',
	'Amir',
	'Anderson',
	'Andre',
	'Andreas',
	'Andres',
	'Andrew',
	'Andy',
	'Angel',
	'Angelo',
	'Anthony',
	'Antoine',
	'Anton',
	'Antonio',
	'Antony',
	'Antwan',
	'Ari',
	'Ariel',
	'Arjun',
	'Armando',
	'Armani',
	'Arnold',
	'Aron',
	'Arthur',
	'Arturo',
	'Aryan',
	'Asa',
	'Asher',
	'Ashton',
	'Aubrey',
	'August',
	'Augustus',
	'Austen',
	'Austin',
	'Austyn',
	'Avery',
	'Axel',
	'Aydan',
	'Ayden',
	'Baby',
	'Bailey',
	'Barrett',
	'Barry',
	'Beau',
	'Ben',
	'Benito',
	'Benjamin',
	'Bennett',
	'Benny',
	'Bernard',
	'Bernardo',
	'Billy',
	'Blaine',
	'Blaise',
	'Blake',
	'Blaze',
	'Bo',
	'Bobby',
	'Brad',
	'Braden',
	'Bradley',
	'Brady',
	'Bradyn',
	'Braeden',
	'Braedon',
	'Braiden',
	'Branden',
	'Brandon',
	'Braxton',
	'Brayan',
	'Brayden',
	'Braydon',
	'Brendan',
	'Brenden',
	'Brendon',
	'Brennan',
	'Brennen',
	'Brent',
	'Brenton',
	'Bret',
	'Brett',
	'Brian',
	'Brice',
	'Brock',
	'Brodie',
	'Brody',
	'Bronson',
	'Brooks',
	'Bruce',
	'Bruno',
	'Bryan',
	'Bryant',
	'Bryce',
	'Brycen',
	'Bryson',
	'Byron',
	'Cade',
	'Caden',
	'Cael',
	'Caiden',
	'Cale',
	'Caleb',
	'Calvin',
	'Camden',
	'Cameron',
	'Camren',
	'Camron',
	'Carl',
	'Carlo',
	'Carlos',
	'Carlton',
	'Carson',
	'Carter',
	'Casey',
	'Cason',
	'Cayden',
	'Cedric',
	'Cesar',
	'Chad',
	'Chaim',
	'Chance',
	'Chandler',
	'Charles',
	'Charlie',
	'Chase',
	'Chaz',
	'Chris',
	'Christian',
	'Christopher',
	'Clarence',
	'Clark',
	'Clay',
	'Clayton',
	'Clifford',
	'Clifton',
	'Clinton',
	'Coby',
	'Cody',
	'Colby',
	'Cole',
	'Coleman',
	'Colin',
	'Collin',
	'Colt',
	'Colten',
	'Colton',
	'Conner',
	'Connor',
	'Conor',
	'Conrad',
	'Cooper',
	'Corbin',
	'Cordell',
	'Corey',
	'Cornelius',
	'Cortez',
	'Cory',
	'Craig',
	'Cristian',
	'Cristobal',
	'Cristopher',
	'Cruz',
	'Cullen',
	'Curtis',
	'Cyrus',
	'Dakota',
	'Dale',
	'Dallas',
	'Dallin',
	'Dalton',
	'Damarion',
	'Damian',
	'Damien',
	'Damion',
	'Damon',
	'Dandre',
	'Dane',
	'Dangelo',
	'Daniel',
	'Danny',
	'Dante',
	'Daquan',
	'Darian',
	'Darien',
	'Darin',
	'Dario',
	'Darion',
	'Darius',
	'Darnell',
	'Darrell',
	'Darren',
	'Darrin',
	'Darrion',
	'Darrius',
	'Darryl',
	'Darwin',
	'Daryl',
	'Dashawn',
	'David',
	'Davin',
	'Davion',
	'Davis',
	'Davon',
	'Dawson',
	'Dayton',
	'Dean',
	'Deandre',
	'Deangelo',
	'Declan',
	'Demarcus',
	'Demetrius',
	'Dennis',
	'Denzel',
	'Deon',
	'Deonte',
	'Derek',
	'Derick',
	'Derrick',
	'Deshaun',
	'Deshawn',
	'Desmond',
	'Destin',
	'Devan',
	'Devante',
	'Deven',
	'Devin',
	'Devon',
	'Devonte',
	'Devyn',
	'Dexter',
	'Diego',
	'Dillan',
	'Dillon',
	'Dimitri',
	'Dion',
	'Domenic',
	'Dominic',
	'Dominick',
	'Dominik',
	'Dominique',
	'Don',
	'Donald',
	'Donavan',
	'Donovan',
	'Donte',
	'Dorian',
	'Douglas',
	'Drake',
	'Draven',
	'Drew',
	'Duane',
	'Duncan',
	'Dustin',
	'Dwayne',
	'Dwight',
	'Dylan',
	'Dylon',
	'Ean',
	'Earl',
	'Easton',
	'Eddie',
	'Edgar',
	'Eduardo',
	'Edward',
	'Edwin',
	'Efrain',
	'Efren',
	'Eli',
	'Elian',
	'Elias',
	'Elijah',
	'Eliseo',
	'Elisha',
	'Elliot',
	'Elliott',
	'Ellis',
	'Elmer',
	'Elvis',
	'Emanuel',
	'Emerson',
	'Emiliano',
	'Emilio',
	'Emmanuel',
	'Emmett',
	'Enrique',
	'Eric',
	'Erick',
	'Erik',
	'Ernest',
	'Ernesto',
	'Esteban',
	'Estevan',
	'Ethan',
	'Ethen',
	'Eugene',
	'Evan',
	'Everett',
	'Ezekiel',
	'Ezequiel',
	'Ezra',
	'Fabian',
	'Felipe',
	'Felix',
	'Fernando',
	'Fidel',
	'Finn',
	'Fletcher',
	'Forrest',
	'Francis',
	'Francisco',
	'Frank',
	'Frankie',
	'Franklin',
	'Fred',
	'Freddie',
	'Freddy',
	'Frederick',
	'Fredrick',
	'Gabriel',
	'Gael',
	'Gage',
	'Gaige',
	'Gannon',
	'Garett',
	'Garret',
	'Garrett',
	'Garrison',
	'Gary',
	'Gaven',
	'Gavin',
	'Gavyn',
	'Geoffrey',
	'George',
	'Gerald',
	'Gerardo',
	'German',
	'Giancarlo',
	'Gianni',
	'Gideon',
	'Gilbert',
	'Gilberto',
	'Gino',
	'Giovani',
	'Giovanni',
	'Giovanny',
	'Glen',
	'Glenn',
	'Gonzalo',
	'Gordon',
	'Grady',
	'Graham',
	'Grant',
	'Grayson',
	'Gregory',
	'Greyson',
	'Griffin',
	'Guadalupe',
	'Guillermo',
	'Gunnar',
	'Gunner',
	'Gustavo',
	'Guy',
	'Haden',
	'Hamza',
	'Harley',
	'Harold',
	'Harrison',
	'Harry',
	'Hassan',
	'Hayden',
	'Heath',
	'Hector',
	'Henry',
	'Heriberto',
	'Holden',
	'Houston',
	'Howard',
	'Hudson',
	'Hugh',
	'Hugo',
	'Humberto',
	'Hunter',
	'Ian',
	'Ibrahim',
	'Ignacio',
	'Immanuel',
	'Irvin',
	'Irving',
	'Isaac',
	'Isaak',
	'Isai',
	'Isaiah',
	'Isaias',
	'Isiah',
	'Ismael',
	'Israel',
	'Issac',
	'Ivan',
	'Izaiah',
	'Jabari',
	'Jace',
	'Jack',
	'Jackson',
	'Jacob',
	'Jacoby',
	'Jaden',
	'Jadon',
	'Jadyn',
	'Jaeden',
	'Jagger',
	'Jaheim',
	'Jahiem',
	'Jaiden',
	'Jaime',
	'Jair',
	'Jairo',
	'Jake',
	'Jakob',
	'Jakobe',
	'Jalen',
	'Jamal',
	'Jamar',
	'Jamari',
	'Jamarion',
	'Jamel',
	'James',
	'Jameson',
	'Jamie',
	'Jamil',
	'Jamir',
	'Jamison',
	'Jan',
	'Jaquan',
	'Jared',
	'Jaren',
	'Jarod',
	'Jaron',
	'Jarred',
	'Jarrett',
	'Jarrod',
	'Jarvis',
	'Jase',
	'Jason',
	'Jasper',
	'Javen',
	'Javier',
	'Javion',
	'Javon',
	'Jaxon',
	'Jaxson',
	'Jay',
	'Jayce',
	'Jayden',
	'Jaydon',
	'Jaylan',
	'Jaylen',
	'Jaylin',
	'Jaylon',
	'Jayson',
	'Jean',
	'Jeff',
	'Jefferson',
	'Jeffery',
	'Jeffrey',
	'Jeremiah',
	'Jeremy',
	'Jermaine',
	'Jerome',
	'Jerry',
	'Jesse',
	'Jessie',
	'Jesus',
	'Jett',
	'Jevon',
	'Jimmy',
	'Joan',
	'Joaquin',
	'Joe',
	'Joel',
	'Joey',
	'Johan',
	'John',
	'Johnathan',
	'Johnathon',
	'Johnny',
	'Jon',
	'Jonah',
	'Jonas',
	'Jonathan',
	'Jonathon',
	'Jordan',
	'Jorden',
	'Jordon',
	'Jordy',
	'Jordyn',
	'Jorge',
	'Jose',
	'Josef',
	'Joseph',
	'Josh',
	'Joshua',
	'Josiah',
	'Josue',
	'Jovan',
	'Jovani',
	'Jovanni',
	'Jovanny',
	'Jovany',
	'Juan',
	'Judah',
	'Jude',
	'Julian',
	'Julien',
	'Julio',
	'Julius',
	'Junior',
	'Justice',
	'Justin',
	'Justus',
	'Justyn',
	'Kade',
	'Kaden',
	'Kadin',
	'Kai',
	'Kaiden',
	'Kale',
	'Kaleb',
	'Kameron',
	'Kamron',
	'Kane',
	'Kanye',
	'Kareem',
	'Karl',
	'Karson',
	'Kasey',
	'Kayden',
	'Keagan',
	'Keanu',
	'Keaton',
	'Keegan',
	'Keenan',
	'Keith',
	'Kellen',
	'Kelly',
	'Kelton',
	'Kelvin',
	'Kendall',
	'Kendrick',
	'Kennedy',
	'Kenneth',
	'Kenny',
	'Kent',
	'Kenyon',
	'Keon',
	'Keshawn',
	'Keven',
	'Kevin',
	'Kevon',
	'Keyon',
	'Keyshawn',
	'Khalid',
	'Khalil',
	'Kian',
	'Kieran',
	'Kirk',
	'Kobe',
	'Koby',
	'Kody',
	'Kolby',
	'Kole',
	'Kolton',
	'Korbin',
	'Korey',
	'Kory',
	'Kristian',
	'Kristofer',
	'Kristopher',
	'Kurt',
	'Kurtis',
	'Kylan',
	'Kyle',
	'Kyler',
	'Kyree',
	'Lamar',
	'Lamont',
	'Lance',
	'Landen',
	'Landon',
	'Lane',
	'Larry',
	'Latrell',
	'Lawrence',
	'Lawson',
	'Layne',
	'Layton',
	'Lee',
	'Leo',
	'Leon',
	'Leonard',
	'Leonardo',
	'Leonel',
	'Leroy',
	'Levi',
	'Lewis',
	'Liam',
	'Lincoln',
	'Lloyd',
	'Logan',
	'London',
	'Lonnie',
	'Lorenzo',
	'Louis',
	'Luca',
	'Lucas',
	'Luciano',
	'Luis',
	'Lukas',
	'Luke',
	'Maddox',
	'Malachi',
	'Malakai',
	'Malcolm',
	'Malik',
	'Manuel',
	'Marc',
	'Marcel',
	'Marcelo',
	'Marco',
	'Marcos',
	'Marcus',
	'Mariano',
	'Mario',
	'Mark',
	'Markus',
	'Marlon',
	'Marques',
	'Marquez',
	'Marquis',
	'Marquise',
	'Marshall',
	'Martin',
	'Marvin',
	'Mason',
	'Mateo',
	'Mathew',
	'Matteo',
	'Matthew',
	'Maurice',
	'Mauricio',
	'Maverick',
	'Max',
	'Maxim',
	'Maximilian',
	'Maximillian',
	'Maximus',
	'Maxwell',
	'Mekhi',
	'Melvin',
	'Micah',
	'Michael',
	'Micheal',
	'Miguel',
	'Mike',
	'Mikel',
	'Miles',
	'Milo',
	'Milton',
	'Misael',
	'Mitchel',
	'Mitchell',
	'Mohamed',
	'Mohammad',
	'Mohammed',
	'Moises',
	'Morgan',
	'Moses',
	'Moshe',
	'Muhammad',
	'Myles',
	'Nash',
	'Nasir',
	'Nathan',
	'Nathanael',
	'Nathanial',
	'Nathaniel',
	'Nathen',
	'Neal',
	'Nehemiah',
	'Neil',
	'Nelson',
	'Nestor',
	'Nicholas',
	'Nick',
	'Nickolas',
	'Nico',
	'Nicolas',
	'Nigel',
	'Nikhil',
	'Niko',
	'Nikolas',
	'Noah',
	'Noe',
	'Noel',
	'Nolan',
	'Norman',
	'Octavio',
	'Oliver',
	'Omar',
	'Omari',
	'Omarion',
	'Orion',
	'Orlando',
	'Oscar',
	'Osvaldo',
	'Oswaldo',
	'Owen',
	'Pablo',
	'Parker',
	'Patrick',
	'Paul',
	'Paxton',
	'Payton',
	'Pedro',
	'Perry',
	'Peter',
	'Peyton',
	'Philip',
	'Phillip',
	'Phoenix',
	'Pierce',
	'Pierre',
	'Porter',
	'Pranav',
	'Preston',
	'Prince',
	'Quentin',
	'Quincy',
	'Quinn',
	'Quinten',
	'Quintin',
	'Quinton',
	'Rafael',
	'Rahul',
	'Ralph',
	'Ramiro',
	'Ramon',
	'Randall',
	'Randy',
	'Raphael',
	'Rashad',
	'Raul',
	'Raven',
	'Ray',
	'Raymond',
	'Raymundo',
	'Reagan',
	'Reece',
	'Reed',
	'Reese',
	'Reginald',
	'Reid',
	'Reilly',
	'Remington',
	'Rene',
	'Reuben',
	'Rey',
	'Reynaldo',
	'Rhett',
	'Ricardo',
	'Richard',
	'Rickey',
	'Ricky',
	'Rigoberto',
	'Riley',
	'River',
	'Robert',
	'Roberto',
	'Rocco',
	'Rocky',
	'Roderick',
	'Rodney',
	'Rodolfo',
	'Rodrigo',
	'Rogelio',
	'Roger',
	'Rohan',
	'Roland',
	'Rolando',
	'Roman',
	'Romeo',
	'Ronald',
	'Ronaldo',
	'Ronan',
	'Ronnie',
	'Rory',
	'Ross',
	'Rowan',
	'Roy',
	'Ruben',
	'Rudy',
	'Russell',
	'Ryan',
	'Ryder',
	'Rylan',
	'Rylee',
	'Ryley',
	'Sabastian',
	'Sage',
	'Salvador',
	'Salvatore',
	'Sam',
	'Samir',
	'Sammy',
	'Samson',
	'Samuel',
	'Santiago',
	'Santino',
	'Santos',
	'Saul',
	'Savion',
	'Sawyer',
	'Scott',
	'Seamus',
	'Sean',
	'Sebastian',
	'Semaj',
	'Sergio',
	'Seth',
	'Shamar',
	'Shane',
	'Shannon',
	'Shaun',
	'Shawn',
	'Shayne',
	'Shea',
	'Sheldon',
	'Shemar',
	'Sidney',
	'Silas',
	'Simeon',
	'Simon',
	'Sincere',
	'Skylar',
	'Skyler',
	'Solomon',
	'Sonny',
	'Spencer',
	'Stanley',
	'Stefan',
	'Stephan',
	'Stephen',
	'Stephon',
	'Sterling',
	'Steve',
	'Steven',
	'Stone',
	'Stuart',
	'Sullivan',
	'Syed',
	'Talon',
	'Tanner',
	'Tariq',
	'Tate',
	'Taylor',
	'Terence',
	'Terrance',
	'Terrell',
	'Terrence',
	'Terry',
	'Thaddeus',
	'Theodore',
	'Thomas',
	'Timothy',
	'Titus',
	'Tobias',
	'Toby',
	'Todd',
	'Tomas',
	'Tommy',
	'Tony',
	'Trace',
	'Travis',
	'Travon',
	'Tre',
	'Trent',
	'Trenton',
	'Trever',
	'Trevion',
	'Trevon',
	'Trevor',
	'Trey',
	'Treyton',
	'Tristan',
	'Tristen',
	'Tristian',
	'Tristin',
	'Triston',
	'Troy',
	'Trystan',
	'Tucker',
	'Turner',
	'Ty',
	'Tyler',
	'Tylor',
	'Tyree',
	'Tyrell',
	'Tyrese',
	'Tyrone',
	'Tyshawn',
	'Tyson',
	'Ulises',
	'Ulysses',
	'Uriel',
	'Valentin',
	'Vance',
	'Vaughn',
	'Vernon',
	'Vicente',
	'Victor',
	'Vincent',
	'Wade',
	'Walker',
	'Walter',
	'Warren',
	'Waylon',
	'Wayne',
	'Wesley',
	'Weston',
	'Will',
	'William',
	'Willie',
	'Wilson',
	'Winston',
	'Wyatt',
	'Xander',
	'Xavier',
	'Xzavier',
	'Yahir',
	'Yair',
	'Yosef',
	'Yusuf',
	'Zachariah',
	'Zachary',
	'Zachery',
	'Zack',
	'Zackary',
	'Zackery',
	'Zain',
	'Zaire',
	'Zakary',
	'Zander',
	'Zane',
	'Zavier',
	'Zechariah',
	'Zion',
];

var Names = [...FemaleNames, ...MaleNames];

const RandomName = (c) => {
	if (c.desc.sex.value == `Male`) return RandomRoll(MaleNames)
	if (c.desc.sex.value == `Female`) return RandomRoll(FemaleNames)
	return RandomRoll(Names)
};

const Identity = new Descriptor({
	id: `3d40718f-b0f1-4679-f208-a1a8ee404d5a`,
	name: `Name`,
	value: ``,
	random: (c) => {
		c.desc.name.value = RandomName(c);
		return c
	}
});

const Player = new Descriptor({
	id: `a4ceb2b9-4201-47ae-344a-07c9e2038dae`,
	name: `Player`,
	value: ``
});

const RandomSex = _ => {
	return RandomRoll([`Female`, `Male`])
};

const Sex = new Descriptor({
	id: `d1b5c705-4bf0-4c17-a5c0-b6860abd2d36`,
	name: `Sex`,
	value: ``,
	random: (c) => {
		c.desc.sex.value = RandomSex();
		return c
	}
});

const RandomSkin = _ => {
	return RandomRoll(
		[
			`Black`,
			`Brown`,
			`Olive`,
			`Pale`,
			`Tan`,
			`White`,
		]
	) 
};

const Skin = new Descriptor({
	id: `e8515d9e-3acb-4038-9a63-714c62dbfd3a`,
	name: `Skin`,
	value: ``,
	random: (c) => {
		c.desc.skin.value = RandomSkin();
		return c
	}
});

const RandomWeight = _ => {
	return `${Math.ceil(Math.random() * 100) + 100}lbs`
}; // 101 to 200 lbs

const Weight = new Descriptor({
	id: `57ddc83f-3a36-4472-028e-dd7797344f82`,
	name: `Weight`,
	value: ``,
	random: (c) => {
		c.desc.weight.value = RandomWeight();
		return c
	}
});

var Description$1 = {
	name: `Description`,
	list: [
		Player,
		Identity,
		Age,
		Sex,
		Height,
		Weight,
		Skin,
		Hair,
	],
	random: function(c){
		Age.random(c);
		Sex.random(c);
		Height.random(c);
		Weight.random(c);
		Skin.random(c);
		Hair.random(c);
		Identity.random(c);
		return c
	},
	reset: function(c){
		Object.keys(c.desc).forEach((d) => {
			c.desc[d].value = ``;
		});
		return c
	}
};

/* src/routes/character/new_character.svelte generated by Svelte v3.29.4 */

const New_character = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $character = get_store_value(character);

	return `${($$result.head += `${($$result.title = `<title>Apocalyptia Online - New Character</title>`, "")}`, "")}
<div class="${"cntr-card"}"><button class="${"link-btn"}">Build</button>
    <button class="${"link-btn"}">Random</button></div>
${validate_component(BackButton, "BackButton").$$render($$result, { path: "/character" }, {}, {})}`;
});

var component_3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': New_character
});

/* src/routes/character/creator/description.svelte generated by Svelte v3.29.4 */

const css$e = {
	code: "div[class*='-container'].svelte-1gpx4d4.svelte-1gpx4d4{align-items:center;display:flex;justify-content:space-evenly;max-width:100%}div[class*='-container'].svelte-1gpx4d4>span.svelte-1gpx4d4{text-align:right}div[class*='-container'].svelte-1gpx4d4>span.svelte-1gpx4d4,.character-container.svelte-1gpx4d4>button.svelte-1gpx4d4,.item-container.svelte-1gpx4d4>button.svelte-1gpx4d4{flex:1}div[class*='-container'].svelte-1gpx4d4>input.svelte-1gpx4d4{margin-left:var(--s33);margin-right:var(--s33)}@media only screen and (max-width: 900px){.item-block.svelte-1gpx4d4.svelte-1gpx4d4{display:block;width:100%;max-width:100%}div[class*='-container'].svelte-1gpx4d4.svelte-1gpx4d4{margin:var(--s50) 0;width:100%}.character-container.svelte-1gpx4d4>input[type='text'].svelte-1gpx4d4,.item-container.svelte-1gpx4d4 input[type='text'].svelte-1gpx4d4{flex:2}}@media only screen and (min-width: 900px){.item-block.svelte-1gpx4d4.svelte-1gpx4d4{display:flex;max-width:100%}div[class*='-container'].svelte-1gpx4d4.svelte-1gpx4d4{margin:var(--s50);width:100%}.character-container.svelte-1gpx4d4>input[type='text'].svelte-1gpx4d4{flex:6\n\t\t}.item-container.svelte-1gpx4d4>input[type='text'].svelte-1gpx4d4{flex:2}}",
	map: "{\"version\":3,\"file\":\"description.svelte\",\"sources\":[\"description.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport Description from 'lists/Description.js'\\n\\timport { character } from 'stores/characterStore.js'\\n\\n\\tconst randomDescriptor = (i) => $character = Description.list[i].random($character)\\n\\n\\tconst random = _ => $character = Description.random($character)\\n\\n\\tconst reset = _ => $character = Description.reset($character)\\n</script>\\n\\n\\n<svelte:head>\\n\\t<title>Apocalyptia Online - Character Creator - Description</title>\\n</svelte:head>\\n<div class='creator-page'>\\n\\t<h1>Description</h1>\\n\\t<div class='section-card'>\\n\\t\\t<div class='item-block'>\\n\\t\\t\\t<div class='character-container'>\\n\\t\\t\\t\\t<span>Character:</span>\\n\\t\\t\\t\\t<input type='text' bind:value={$character.desc.name.value}>\\n\\t\\t\\t\\t<button on:click={_ => randomDescriptor(1)}>Random</button>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t\\t{#each Description.list as _, index}\\n\\t\\t\\t{#if index % 2 == 0 && index < Description.list.length - 2}\\n\\t\\t\\t\\t<div class='item-block'>\\n\\t\\t\\t\\t\\t<div class='item-container'>\\n\\t\\t\\t\\t\\t\\t<span>{Description.list[index + 2].name}:</span>\\n\\t\\t\\t\\t\\t\\t<input type='text' bind:value={\\n\\t\\t\\t\\t\\t\\t\\t$character.desc[Description.list[index + 2].name.toLowerCase()].value}>\\n\\t\\t\\t\\t\\t\\t<button on:click={_ => randomDescriptor(index + 2)}>Random</button>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t<div class='item-container'>\\n\\t\\t\\t\\t\\t\\t<span>{Description.list[index + 3].name}:</span>\\n\\t\\t\\t\\t\\t\\t<input type='text' bind:value={\\n\\t\\t\\t\\t\\t\\t\\t$character.desc[Description.list[index + 3].name.toLowerCase()].value}>\\n\\t\\t\\t\\t\\t\\t<button on:click={_ => randomDescriptor(index + 3)}>Random</button>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t{/if}\\n\\t\\t{/each}\\n\\t</div>\\n\\t<div class='btn-row'>\\n\\t\\t<button class='small-cntr-btn' on:click={reset}>Reset</button>\\n\\t\\t<button class='small-cntr-btn' on:click={random}>Random</button>\\n\\t</div>\\n</div>\\n\\n\\n<style>\\n\\tdiv[class*='-container'] {\\n\\t\\talign-items: center;\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: space-evenly;\\n\\t\\tmax-width: 100%;\\n\\t}\\n\\tdiv[class*='-container'] > span {\\n\\t\\ttext-align: right;\\n\\t}\\n\\tdiv[class*='-container'] > span,\\n\\t.character-container > button,\\n\\t.item-container > button {\\n\\t\\tflex: 1;\\n\\t}\\n\\tdiv[class*='-container'] > input {\\n\\t\\tmargin-left: var(--s33);\\n\\t\\tmargin-right: var(--s33);\\n\\t}\\n\\t/* MOBILE */\\n\\t@media only screen and (max-width: 900px) {\\n\\t\\t.item-block {\\n\\t\\t\\tdisplay: block;\\n\\t\\t\\twidth: 100%;\\n\\t\\t\\tmax-width: 100%;\\n\\t\\t}\\n\\t\\tdiv[class*='-container'] {\\n\\t\\t\\tmargin: var(--s50) 0;\\n\\t\\t\\twidth: 100%;\\n\\t\\t}\\n\\t\\t.character-container > input[type='text'],\\n\\t\\t.item-container input[type='text'] {\\n\\t\\t\\tflex: 2;\\n\\t\\t}\\n\\t}\\n\\t/* DESKTOP */\\n\\t@media only screen and (min-width: 900px) {\\n\\t\\t.item-block {\\n\\t\\t\\tdisplay: flex;\\n\\t\\t\\tmax-width: 100%;\\n\\t\\t}\\n\\t\\tdiv[class*='-container'] {\\n\\t\\t\\tmargin: var(--s50);\\n\\t\\t\\twidth: 100%;\\n\\t\\t}\\n\\t\\t.character-container > input[type='text'] {\\n\\t\\t\\tflex: 6\\n\\t\\t}\\n\\t\\t.item-container > input[type='text'] {\\n\\t\\t\\tflex: 2;\\n\\t\\t}\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AAoDC,GAAG,CAAC,KAAK,EAAE,YAAY,CAAC,8BAAC,CAAC,AACzB,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,YAAY,CAC7B,SAAS,CAAE,IAAI,AAChB,CAAC,AACD,GAAG,CAAC,KAAK,EAAE,YAAY,gBAAC,CAAG,IAAI,eAAC,CAAC,AAChC,UAAU,CAAE,KAAK,AAClB,CAAC,AACD,GAAG,CAAC,KAAK,EAAE,YAAY,gBAAC,CAAG,mBAAI,CAC/B,mCAAoB,CAAG,qBAAM,CAC7B,8BAAe,CAAG,MAAM,eAAC,CAAC,AACzB,IAAI,CAAE,CAAC,AACR,CAAC,AACD,GAAG,CAAC,KAAK,EAAE,YAAY,gBAAC,CAAG,KAAK,eAAC,CAAC,AACjC,WAAW,CAAE,IAAI,KAAK,CAAC,CACvB,YAAY,CAAE,IAAI,KAAK,CAAC,AACzB,CAAC,AAED,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1C,WAAW,8BAAC,CAAC,AACZ,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,IAAI,AAChB,CAAC,AACD,GAAG,CAAC,KAAK,EAAE,YAAY,CAAC,8BAAC,CAAC,AACzB,MAAM,CAAE,IAAI,KAAK,CAAC,CAAC,CAAC,CACpB,KAAK,CAAE,IAAI,AACZ,CAAC,AACD,mCAAoB,CAAG,KAAK,CAAC,IAAI,CAAC,MAAM,gBAAC,CACzC,8BAAe,CAAC,KAAK,CAAC,IAAI,CAAC,MAAM,CAAC,eAAC,CAAC,AACnC,IAAI,CAAE,CAAC,AACR,CAAC,AACF,CAAC,AAED,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1C,WAAW,8BAAC,CAAC,AACZ,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,AAChB,CAAC,AACD,GAAG,CAAC,KAAK,EAAE,YAAY,CAAC,8BAAC,CAAC,AACzB,MAAM,CAAE,IAAI,KAAK,CAAC,CAClB,KAAK,CAAE,IAAI,AACZ,CAAC,AACD,mCAAoB,CAAG,KAAK,CAAC,IAAI,CAAC,MAAM,CAAC,eAAC,CAAC,AAC1C,IAAI,CAAE,CAAC;EACR,CAAC,AACD,8BAAe,CAAG,KAAK,CAAC,IAAI,CAAC,MAAM,CAAC,eAAC,CAAC,AACrC,IAAI,CAAE,CAAC,AACR,CAAC,AACF,CAAC\"}"
};

const Description_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $character = get_store_value(character);
	$$result.css.add(css$e);

	return `${($$result.head += `${($$result.title = `<title>Apocalyptia Online - Character Creator - Description</title>`, "")}`, "")}
<div class="${"creator-page"}"><h1>Description</h1>
	<div class="${"section-card"}"><div class="${"item-block svelte-1gpx4d4"}"><div class="${"character-container svelte-1gpx4d4"}"><span class="${"svelte-1gpx4d4"}">Character:</span>
				<input type="${"text"}" class="${"svelte-1gpx4d4"}"${add_attribute("value", $character.desc.name.value, 1)}>
				<button class="${"svelte-1gpx4d4"}">Random</button></div></div>
		${each(Description$1.list, (_, index) => `${index % 2 == 0 && index < Description$1.list.length - 2
	? `<div class="${"item-block svelte-1gpx4d4"}"><div class="${"item-container svelte-1gpx4d4"}"><span class="${"svelte-1gpx4d4"}">${escape(Description$1.list[index + 2].name)}:</span>
						<input type="${"text"}" class="${"svelte-1gpx4d4"}"${add_attribute("value", $character.desc[Description$1.list[index + 2].name.toLowerCase()].value, 1)}>
						<button class="${"svelte-1gpx4d4"}">Random</button></div>
					<div class="${"item-container svelte-1gpx4d4"}"><span class="${"svelte-1gpx4d4"}">${escape(Description$1.list[index + 3].name)}:</span>
						<input type="${"text"}" class="${"svelte-1gpx4d4"}"${add_attribute("value", $character.desc[Description$1.list[index + 3].name.toLowerCase()].value, 1)}>
						<button class="${"svelte-1gpx4d4"}">Random</button></div>
				</div>`
	: ``}`)}</div>
	<div class="${"btn-row"}"><button class="${"small-cntr-btn"}">Reset</button>
		<button class="${"small-cntr-btn"}">Random</button></div>
</div>`;
});

var component_4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Description_1
});

/* src/routes/character/creator/properties.svelte generated by Svelte v3.29.4 */

const css$f = {
	code: ".formulae-details.svelte-1q6k0ne{margin:var(--s100)}.formulae-card.svelte-1q6k0ne{padding:var(--s100)}.properties-list.svelte-1q6k0ne{display:flex;justify-content:space-around;text-align:left}.prop-item.svelte-1q6k0ne{margin:var(--s10)}",
	map: "{\"version\":3,\"file\":\"properties.svelte\",\"sources\":[\"properties.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport BodyParts from 'views/character/BodyParts.svelte'\\n\\timport Properties from 'lists/Properties.js'\\n\\timport { beforeUpdate } from 'svelte'\\n\\timport { character } from 'stores/characterStore.js'\\n\\n\\tbeforeUpdate(_ => $character = Properties.setScores($character))\\n</script>\\n\\n\\n<svelte:head>\\n\\t<title>Apocalyptia Online - Character Creator - Properties</title>\\n</svelte:head>\\n<div class='creator-page'>\\n\\t<h1>Properties</h1>\\n\\t<div class='explanation'>\\n\\t\\t{#each Properties.explanation as line}\\n\\t\\t\\t<p>{line}</p>\\n\\t\\t{/each}\\n\\t\\t<p>Your Character's Properties are calculated automatically:</p>\\n\\t</div>\\n\\t<details class='formulae-details'>\\n\\t\\t<summary>Properties Formulae</summary>\\n\\t\\t<div class='formulae-card'>\\n\\t\\t\\t<ul>\\n\\t\\t\\t\\t{#each Properties.list as property}\\n\\t\\t\\t\\t\\t{#if property.name == 'Health'}\\n\\t\\t\\t\\t\\t\\t<li>{property.desc[0]}</li>\\n\\t\\t\\t\\t\\t\\t<li>{property.desc[1]}</li>\\n\\t\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t\\t<li>{property.desc[0]}</li>\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t{/each}\\n\\t\\t\\t</ul>\\n\\t\\t</div>\\n\\t</details>\\n\\t<div class='section-card properties-list'>\\n\\t\\t<div class='section-block'>\\n\\t\\t\\t<div class='prop-item'>\\n\\t\\t\\t\\t{$character.props.speed.name}: \\n\\t\\t\\t\\t{$character.props.speed.score}\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class='prop-item'>\\n\\t\\t\\t\\t{$character.props.experience.name}: \\n\\t\\t\\t\\t{$character.props.experience.score}\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class='prop-item'>\\n\\t\\t\\t\\t{$character.props.carry.name}:\\n\\t\\t\\t\\t{$character.props.carry.score}\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class='prop-item'>\\n\\t\\t\\t\\t{$character.props.psyche.name}: \\n\\t\\t\\t\\t{$character.props.psyche.score}\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t\\t<div class='section-block'>\\n\\t\\t\\t<div class='prop-item'>\\n\\t\\t\\t\\t{$character.props.dodge.name}: \\n\\t\\t\\t\\t{$character.props.dodge.score}\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class='prop-item'>\\n\\t\\t\\t\\t{$character.props.intellect.name}: \\n\\t\\t\\t\\t{$character.props.intellect.score}\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class='prop-item'>\\n\\t\\t\\t\\t{$character.props.block.name}: \\n\\t\\t\\t\\t{$character.props.block.score}\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class='prop-item'>\\n\\t\\t\\t\\t{$character.props.luck.name}: \\n\\t\\t\\t\\t{$character.props.luck.score}\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t</div>\\n\\t<div class='section-card'>\\n\\t\\t<BodyParts {character} readonly={true}/>\\n\\t</div>\\n</div>\\n\\n\\n<style>\\n\\t.formulae-details {\\n\\t\\tmargin: var(--s100);\\n\\t}\\n\\t.formulae-card {\\n\\t\\tpadding: var(--s100);\\n\\t}\\n\\t.properties-list {\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: space-around;\\n\\t\\ttext-align: left;\\n\\t}\\n\\t.prop-item {\\n\\t\\tmargin: var(--s10);\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AAiFC,iBAAiB,eAAC,CAAC,AAClB,MAAM,CAAE,IAAI,MAAM,CAAC,AACpB,CAAC,AACD,cAAc,eAAC,CAAC,AACf,OAAO,CAAE,IAAI,MAAM,CAAC,AACrB,CAAC,AACD,gBAAgB,eAAC,CAAC,AACjB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,YAAY,CAC7B,UAAU,CAAE,IAAI,AACjB,CAAC,AACD,UAAU,eAAC,CAAC,AACX,MAAM,CAAE,IAAI,KAAK,CAAC,AACnB,CAAC\"}"
};

const Properties_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $character = get_store_value(character);
	beforeUpdate(_ => $character = Properties.setScores($character));
	$$result.css.add(css$f);

	return `${($$result.head += `${($$result.title = `<title>Apocalyptia Online - Character Creator - Properties</title>`, "")}`, "")}
<div class="${"creator-page"}"><h1>Properties</h1>
	<div class="${"explanation"}">${each(Properties.explanation, line => `<p>${escape(line)}</p>`)}
		<p>Your Character&#39;s Properties are calculated automatically:</p></div>
	<details class="${"formulae-details svelte-1q6k0ne"}"><summary>Properties Formulae</summary>
		<div class="${"formulae-card svelte-1q6k0ne"}"><ul>${each(Properties.list, property => `${property.name == "Health"
	? `<li>${escape(property.desc[0])}</li>
						<li>${escape(property.desc[1])}</li>`
	: `<li>${escape(property.desc[0])}</li>`}`)}</ul></div></details>
	<div class="${"section-card properties-list svelte-1q6k0ne"}"><div class="${"section-block"}"><div class="${"prop-item svelte-1q6k0ne"}">${escape($character.props.speed.name)}: 
				${escape($character.props.speed.score)}</div>
			<div class="${"prop-item svelte-1q6k0ne"}">${escape($character.props.experience.name)}: 
				${escape($character.props.experience.score)}</div>
			<div class="${"prop-item svelte-1q6k0ne"}">${escape($character.props.carry.name)}:
				${escape($character.props.carry.score)}</div>
			<div class="${"prop-item svelte-1q6k0ne"}">${escape($character.props.psyche.name)}: 
				${escape($character.props.psyche.score)}</div></div>
		<div class="${"section-block"}"><div class="${"prop-item svelte-1q6k0ne"}">${escape($character.props.dodge.name)}: 
				${escape($character.props.dodge.score)}</div>
			<div class="${"prop-item svelte-1q6k0ne"}">${escape($character.props.intellect.name)}: 
				${escape($character.props.intellect.score)}</div>
			<div class="${"prop-item svelte-1q6k0ne"}">${escape($character.props.block.name)}: 
				${escape($character.props.block.score)}</div>
			<div class="${"prop-item svelte-1q6k0ne"}">${escape($character.props.luck.name)}: 
				${escape($character.props.luck.score)}</div></div></div>
	<div class="${"section-card"}">${validate_component(BodyParts, "BodyParts").$$render($$result, { character, readonly: true }, {}, {})}</div>
</div>`;
});

var component_5 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Properties_1
});

/* src/components/views/character/AbilityCurrent.svelte generated by Svelte v3.29.4 */

const css$g = {
	code: ".current-abilities.svelte-35kn9a{width:100%}.current-abilities-title.svelte-35kn9a{font-size:var(--s125);text-align:center;width:100%}.current-abilities-header.svelte-35kn9a,.current-ability-row.svelte-35kn9a{align-items:baseline;display:flex;justify-content:space-between;margin:var(--s100) 0}.current-abilities-header.svelte-35kn9a{font-weight:bold;text-decoration:underline}.l-col.svelte-35kn9a{flex:3}.s-col.svelte-35kn9a{flex:1;text-align:center}",
	map: "{\"version\":3,\"file\":\"AbilityCurrent.svelte\",\"sources\":[\"AbilityCurrent.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport { character } from 'stores/characterStore.js'\\n\\n\\texport let MasterAbilityList\\n</script>\\n\\n\\n<div class='current-abilities'>\\n\\t<div class='current-abilities-title'>Current Abilities</div>\\n\\t<div class='current-abilities-section'>\\n\\t\\t<div class='current-abilities-header'>\\n\\t\\t\\t<span class='l-col'>Name</span>\\n\\t\\t\\t<span class='s-col'>XP</span>\\n\\t\\t\\t<span class='s-col'>Max</span>\\n\\t\\t\\t<span class='s-col'>Taken</span>\\n\\t\\t</div>\\n\\t\\t<div class='current-abilities-list'>\\n\\t\\t\\t{#each $character.abilities as ability}\\n\\t\\t\\t\\t<div class='current-ability-row'>\\n\\t\\t\\t\\t\\t<span class='l-col'>\\n\\t\\t\\t\\t\\t\\t{ability.name}\\n\\t\\t\\t\\t\\t\\t{#if ability.opts[0]}\\n\\t\\t\\t\\t\\t\\t\\t&nbsp;({ability.opts[0].name})\\n\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t</span>\\n\\t\\t\\t\\t\\t<span class='s-col'>{ability.xp}</span>\\n\\t\\t\\t\\t\\t<span class='s-col'>{ability.max}</span>\\n\\t\\t\\t\\t\\t<span class='s-col'>\\n\\t\\t\\t\\t\\t\\t<select\\n\\t\\t\\t\\t\\t\\t\\tclass='taken-number'\\n\\t\\t\\t\\t\\t\\t\\tbind:value={ability.taken}\\n\\t\\t\\t\\t\\t\\t\\ton:blur={_ => $character.abilities = MasterAbilityList.filter(ability => ability.taken)}\\n\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t{#each Array(ability.max+1) as _, i}\\n\\t\\t\\t\\t\\t\\t\\t\\t<option value={i}>{i}</option>\\n\\t\\t\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t\\t\\t</select>\\n\\t\\t\\t\\t\\t</span>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t{/each}\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n\\n\\n<style>\\n\\t.current-abilities {\\n\\t\\twidth: 100%;\\n\\t}\\n\\t.current-abilities-title {\\n\\t\\tfont-size: var(--s125);\\n\\t\\ttext-align: center;\\n\\t\\twidth: 100%;\\n\\t}\\n\\t.current-abilities-header,\\n\\t.current-ability-row {\\n\\t\\talign-items: baseline;\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: space-between;\\n\\t\\tmargin: var(--s100) 0;\\n\\t}\\n\\t.current-abilities-header {\\n\\t\\tfont-weight: bold;\\n\\t\\ttext-decoration: underline;\\n\\t}\\n\\t.l-col {\\n\\t\\tflex: 3;\\n\\t}\\n\\t.s-col {\\n\\t\\tflex: 1;\\n\\t\\ttext-align: center;\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AA8CC,kBAAkB,cAAC,CAAC,AACnB,KAAK,CAAE,IAAI,AACZ,CAAC,AACD,wBAAwB,cAAC,CAAC,AACzB,SAAS,CAAE,IAAI,MAAM,CAAC,CACtB,UAAU,CAAE,MAAM,CAClB,KAAK,CAAE,IAAI,AACZ,CAAC,AACD,uCAAyB,CACzB,oBAAoB,cAAC,CAAC,AACrB,WAAW,CAAE,QAAQ,CACrB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,MAAM,CAAE,IAAI,MAAM,CAAC,CAAC,CAAC,AACtB,CAAC,AACD,yBAAyB,cAAC,CAAC,AAC1B,WAAW,CAAE,IAAI,CACjB,eAAe,CAAE,SAAS,AAC3B,CAAC,AACD,MAAM,cAAC,CAAC,AACP,IAAI,CAAE,CAAC,AACR,CAAC,AACD,MAAM,cAAC,CAAC,AACP,IAAI,CAAE,CAAC,CACP,UAAU,CAAE,MAAM,AACnB,CAAC\"}"
};

const AbilityCurrent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $character = get_store_value(character);
	let { MasterAbilityList } = $$props;
	if ($$props.MasterAbilityList === void 0 && $$bindings.MasterAbilityList && MasterAbilityList !== void 0) $$bindings.MasterAbilityList(MasterAbilityList);
	$$result.css.add(css$g);

	return `<div class="${"current-abilities svelte-35kn9a"}"><div class="${"current-abilities-title svelte-35kn9a"}">Current Abilities</div>
	<div class="${"current-abilities-section"}"><div class="${"current-abilities-header svelte-35kn9a"}"><span class="${"l-col svelte-35kn9a"}">Name</span>
			<span class="${"s-col svelte-35kn9a"}">XP</span>
			<span class="${"s-col svelte-35kn9a"}">Max</span>
			<span class="${"s-col svelte-35kn9a"}">Taken</span></div>
		<div class="${"current-abilities-list"}">${each($character.abilities, ability => `<div class="${"current-ability-row svelte-35kn9a"}"><span class="${"l-col svelte-35kn9a"}">${escape(ability.name)}
						${ability.opts[0]
	? ` (${escape(ability.opts[0].name)})`
	: ``}</span>
					<span class="${"s-col svelte-35kn9a"}">${escape(ability.xp)}</span>
					<span class="${"s-col svelte-35kn9a"}">${escape(ability.max)}</span>
					<span class="${"s-col svelte-35kn9a"}"><select class="${"taken-number"}"${add_attribute("value", ability.taken, 1)}>${each(Array(ability.max + 1), (_, i) => `<option${add_attribute("value", i, 0)}>${escape(i)}</option>`)}</select></span>
				</div>`)}</div></div>
</div>`;
});

/* src/components/views/character/AbilityModalSingle.svelte generated by Svelte v3.29.4 */

const css$h = {
	code: ".options-section.svelte-1sfjlhz{width:100%}.ability-section.svelte-1sfjlhz{align-items:center;border:var(--s1) dashed;display:flex;justify-content:space-between;margin:var(--s100) auto;padding:var(--s50)}select.svelte-1sfjlhz{width:var(--s300)}",
	map: "{\"version\":3,\"file\":\"AbilityModalSingle.svelte\",\"sources\":[\"AbilityModalSingle.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport { character } from 'stores/characterStore.js'\\n\\n\\texport let ability, MasterAbilityList\\n\\n\\tability = MasterAbilityList.filter(a => a.name == ability.name)[0]\\n</script>\\n\\n\\n<div class='options-section'>\\n\\t<div class='ability-section'>\\n\\t\\t<div class='ability-name-label'>\\n\\t\\t\\t{ability.name}\\n\\t\\t</div>\\n\\t\\t<div class='taken-label'>Taken:\\n\\t\\t\\t<select\\n\\t\\t\\t\\tname={ability.name}\\n\\t\\t\\t\\tbind:value={ability.taken}\\n\\t\\t\\t\\ton:blur={_ => $character.abilities = MasterAbilityList.filter(a => a.taken)}\\n\\t\\t\\t>\\n\\t\\t\\t\\t{#each Array(ability.max+1) as _, i}\\n\\t\\t\\t\\t\\t<option value={i}>{i}</option>\\n\\t\\t\\t\\t{/each}\\n\\t\\t\\t</select>\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n\\n\\n<style>\\n\\t.options-section {\\n\\t\\twidth: 100%;\\n\\t}\\n\\t.ability-section {\\n\\t\\talign-items: center;\\n\\t\\tborder: var(--s1) dashed;\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: space-between;\\n\\t\\tmargin: var(--s100) auto;\\n\\t\\tpadding: var(--s50);\\n\\t}\\n\\tselect {\\n\\t\\twidth: var(--s300);\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AA8BC,gBAAgB,eAAC,CAAC,AACjB,KAAK,CAAE,IAAI,AACZ,CAAC,AACD,gBAAgB,eAAC,CAAC,AACjB,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,IAAI,IAAI,CAAC,CAAC,MAAM,CACxB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,MAAM,CAAE,IAAI,MAAM,CAAC,CAAC,IAAI,CACxB,OAAO,CAAE,IAAI,KAAK,CAAC,AACpB,CAAC,AACD,MAAM,eAAC,CAAC,AACP,KAAK,CAAE,IAAI,MAAM,CAAC,AACnB,CAAC\"}"
};

const AbilityModalSingle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $character = get_store_value(character);
	let { ability } = $$props, { MasterAbilityList } = $$props;
	ability = MasterAbilityList.filter(a => a.name == ability.name)[0];
	if ($$props.ability === void 0 && $$bindings.ability && ability !== void 0) $$bindings.ability(ability);
	if ($$props.MasterAbilityList === void 0 && $$bindings.MasterAbilityList && MasterAbilityList !== void 0) $$bindings.MasterAbilityList(MasterAbilityList);
	$$result.css.add(css$h);

	return `<div class="${"options-section svelte-1sfjlhz"}"><div class="${"ability-section svelte-1sfjlhz"}"><div class="${"ability-name-label"}">${escape(ability.name)}</div>
		<div class="${"taken-label"}">Taken:
			<select${add_attribute("name", ability.name, 0)} class="${"svelte-1sfjlhz"}"${add_attribute("value", ability.taken, 1)}>${each(Array(ability.max + 1), (_, i) => `<option${add_attribute("value", i, 0)}>${escape(i)}</option>`)}</select></div></div>
</div>`;
});

/* src/components/views/character/AbilityModalOptions.svelte generated by Svelte v3.29.4 */

const css$i = {
	code: ".options-section.svelte-1sfjlhz{width:100%}.ability-section.svelte-1sfjlhz{align-items:center;border:var(--s1) dashed;display:flex;justify-content:space-between;margin:var(--s100) auto;padding:var(--s50)}select.svelte-1sfjlhz{width:var(--s300)}",
	map: "{\"version\":3,\"file\":\"AbilityModalOptions.svelte\",\"sources\":[\"AbilityModalOptions.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport { character } from 'stores/characterStore.js'\\n\\n\\texport let ability, MasterAbilityList\\n\\n\\tlet OptionList = MasterAbilityList.filter(a => a.name == ability.name)\\n</script>\\n\\n\\n<div class='options-section'>\\n\\t{#each OptionList as ability}\\n\\t\\t<div class='ability-section'>\\n\\t\\t\\t<div class='ability-name-label'>\\n\\t\\t\\t\\t{ability.opts[0].name}\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class='taken-label'>Taken:\\n\\t\\t\\t\\t<select\\n\\t\\t\\t\\t\\tname={ability.name}\\n\\t\\t\\t\\t\\tbind:value={ability.taken}\\n\\t\\t\\t\\t\\ton:blur={_ => $character.abilities = MasterAbilityList.filter(a => a.taken)}\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t{#each Array(ability.max+1) as _, i}\\n\\t\\t\\t\\t\\t\\t<option value={i}>{i}</option>\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t</select>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t{/each}\\n</div>\\n\\n\\n<style>\\n\\t.options-section {\\n\\t\\twidth: 100%;\\n\\t}\\n\\t.ability-section {\\n\\t\\talign-items: center;\\n\\t\\tborder: var(--s1) dashed;\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: space-between;\\n\\t\\tmargin: var(--s100) auto;\\n\\t\\tpadding: var(--s50);\\n\\t}\\n\\tselect {\\n\\t\\twidth: var(--s300);\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AAgCC,gBAAgB,eAAC,CAAC,AACjB,KAAK,CAAE,IAAI,AACZ,CAAC,AACD,gBAAgB,eAAC,CAAC,AACjB,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,IAAI,IAAI,CAAC,CAAC,MAAM,CACxB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,MAAM,CAAE,IAAI,MAAM,CAAC,CAAC,IAAI,CACxB,OAAO,CAAE,IAAI,KAAK,CAAC,AACpB,CAAC,AACD,MAAM,eAAC,CAAC,AACP,KAAK,CAAE,IAAI,MAAM,CAAC,AACnB,CAAC\"}"
};

const AbilityModalOptions = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $character = get_store_value(character);
	let { ability } = $$props, { MasterAbilityList } = $$props;
	let OptionList = MasterAbilityList.filter(a => a.name == ability.name);
	if ($$props.ability === void 0 && $$bindings.ability && ability !== void 0) $$bindings.ability(ability);
	if ($$props.MasterAbilityList === void 0 && $$bindings.MasterAbilityList && MasterAbilityList !== void 0) $$bindings.MasterAbilityList(MasterAbilityList);
	$$result.css.add(css$i);

	return `<div class="${"options-section svelte-1sfjlhz"}">${each(OptionList, ability => `<div class="${"ability-section svelte-1sfjlhz"}"><div class="${"ability-name-label"}">${escape(ability.opts[0].name)}</div>
			<div class="${"taken-label"}">Taken:
				<select${add_attribute("name", ability.name, 0)} class="${"svelte-1sfjlhz"}"${add_attribute("value", ability.taken, 1)}>${each(Array(ability.max + 1), (_, i) => `<option${add_attribute("value", i, 0)}>${escape(i)}</option>`)}</select></div>
		</div>`)}
</div>`;
});

/* src/components/views/character/AbilityModal.svelte generated by Svelte v3.29.4 */

const css$j = {
	code: ".modal-background.svelte-1l8191m{background-color:rgba(0,0,0,0.7);height:100vh;left:0;position:fixed;top:0;width:100vw}.modal.svelte-1l8191m{background-color:rgba(0,0,0,.5);border-radius:var(--radius);border:var(--s1) solid;color:lime;height:fit-content;left:50vw;max-height:75vh;overflow:scroll;position:fixed;scrollbar-width:none;top:50vh;transform:translate(-50%, -50%);width:80vw}.modal-content.svelte-1l8191m{margin:var(--s100)}.btn-row.svelte-1l8191m{text-align:center}.stats-section.svelte-1l8191m{align-items:baseline;display:flex;justify-content:space-between}.description-section.svelte-1l8191m{margin-top:var(--s100)}.description-label.svelte-1l8191m{font-weight:bold}.svelte-1l8191m::-webkit-scrollbar{display:none}",
	map: "{\"version\":3,\"file\":\"AbilityModal.svelte\",\"sources\":[\"AbilityModal.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport { createEventDispatcher, onDestroy } from 'svelte'\\n\\timport AbilityModalSingle from 'views/character/AbilityModalSingle.svelte'\\n\\timport AbilityModalOptions from 'views/character/AbilityModalOptions.svelte'\\n\\n\\texport let ability, MasterAbilityList\\n\\n\\tconst dispatch = createEventDispatcher()\\n\\n\\tconst handle_keydown = e => { if (e.key === 'Escape') dispatch('close') }\\n\\n\\tconst previously_focused = typeof document !== 'undefined' && document.activeElement\\n\\n\\tif (previously_focused) onDestroy(_ => previously_focused.focus())\\n</script>\\n\\n\\n<svelte:window on:keydown={handle_keydown}/>\\n<div class=\\\"modal-background\\\" on:click={_ => dispatch('close')}></div>\\n<div class=\\\"modal\\\" role=\\\"dialog\\\" aria-modal=\\\"true\\\">\\n\\t<div class='modal-content'>\\n\\t\\t<div class='ability-name'><h2>{ability.name}</h2></div>\\n\\t\\t<div class='description-section'>\\n\\t\\t\\t<span class='description-label'>Description:</span>\\n\\t\\t\\t<span class='ability-description'>{ability.desc}</span>\\n\\t\\t</div>\\n\\t\\t<div class='stats-section'>\\n\\t\\t\\t{#if ability.opts.length}\\n\\t\\t\\t\\t<AbilityModalOptions {ability} {MasterAbilityList}/>\\n\\t\\t\\t{:else}\\n\\t\\t\\t\\t<AbilityModalSingle {ability} {MasterAbilityList}/>\\n\\t\\t\\t{/if}\\n\\t\\t</div>\\n\\t\\t<div class='btn-row'>\\n\\t\\t\\t<button on:click={_ => dispatch('close')}>Close</button>\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n\\n\\n<style>\\n\\t.modal-background {\\n\\t\\tbackground-color: rgba(0,0,0,0.7);\\n\\t\\theight: 100vh;\\n\\t\\tleft: 0;\\n\\t\\tposition: fixed;\\n\\t\\ttop: 0;\\n\\t\\twidth: 100vw;\\n\\t}\\n\\t.modal {\\n\\t\\tbackground-color: rgba(0,0,0,.5);\\n\\t\\tborder-radius: var(--radius);\\n\\t\\tborder: var(--s1) solid;\\n\\t\\tcolor: lime;\\n\\t\\theight: fit-content;\\n\\t\\tleft: 50vw;\\n\\t\\tmax-height: 75vh;\\n\\t\\toverflow: scroll;\\n\\t\\tposition: fixed;\\n\\t\\tscrollbar-width: none;\\n\\t\\ttop: 50vh;\\n\\t\\ttransform: translate(-50%, -50%);\\n\\t\\twidth: 80vw;\\n\\t}\\n\\t.modal-content {\\n\\t\\tmargin: var(--s100);\\n\\t}\\n\\t.btn-row {\\n\\t\\ttext-align: center;\\n\\t}\\n\\t.stats-section {\\n\\t\\talign-items: baseline;\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: space-between;\\n\\t}\\n\\t.description-section {\\n\\t\\tmargin-top: var(--s100);\\n\\t}\\n\\t.description-label {\\n\\t\\tfont-weight: bold;\\n\\t}\\n\\t::-webkit-scrollbar {\\n\\t\\tdisplay: none;\\n\\t}\\n</style>\\n\"],\"names\":[],\"mappings\":\"AAyCC,iBAAiB,eAAC,CAAC,AAClB,gBAAgB,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACjC,MAAM,CAAE,KAAK,CACb,IAAI,CAAE,CAAC,CACP,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,KAAK,AACb,CAAC,AACD,MAAM,eAAC,CAAC,AACP,gBAAgB,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAChC,aAAa,CAAE,IAAI,QAAQ,CAAC,CAC5B,MAAM,CAAE,IAAI,IAAI,CAAC,CAAC,KAAK,CACvB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,WAAW,CACnB,IAAI,CAAE,IAAI,CACV,UAAU,CAAE,IAAI,CAChB,QAAQ,CAAE,MAAM,CAChB,QAAQ,CAAE,KAAK,CACf,eAAe,CAAE,IAAI,CACrB,GAAG,CAAE,IAAI,CACT,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CAChC,KAAK,CAAE,IAAI,AACZ,CAAC,AACD,cAAc,eAAC,CAAC,AACf,MAAM,CAAE,IAAI,MAAM,CAAC,AACpB,CAAC,AACD,QAAQ,eAAC,CAAC,AACT,UAAU,CAAE,MAAM,AACnB,CAAC,AACD,cAAc,eAAC,CAAC,AACf,WAAW,CAAE,QAAQ,CACrB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,AAC/B,CAAC,AACD,oBAAoB,eAAC,CAAC,AACrB,UAAU,CAAE,IAAI,MAAM,CAAC,AACxB,CAAC,AACD,kBAAkB,eAAC,CAAC,AACnB,WAAW,CAAE,IAAI,AAClB,CAAC,eACD,mBAAmB,AAAC,CAAC,AACpB,OAAO,CAAE,IAAI,AACd,CAAC\"}"
};

const AbilityModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { ability } = $$props, { MasterAbilityList } = $$props;
	const dispatch = createEventDispatcher();

	const previously_focused = typeof document !== "undefined" && document.activeElement;
	if (previously_focused) onDestroy(_ => previously_focused.focus());
	if ($$props.ability === void 0 && $$bindings.ability && ability !== void 0) $$bindings.ability(ability);
	if ($$props.MasterAbilityList === void 0 && $$bindings.MasterAbilityList && MasterAbilityList !== void 0) $$bindings.MasterAbilityList(MasterAbilityList);
	$$result.css.add(css$j);

	return `
<div class="${"modal-background svelte-1l8191m"}"></div>
<div class="${"modal svelte-1l8191m"}" role="${"dialog"}" aria-modal="${"true"}"><div class="${"modal-content svelte-1l8191m"}"><div class="${"ability-name svelte-1l8191m"}"><h2 class="${"svelte-1l8191m"}">${escape(ability.name)}</h2></div>
		<div class="${"description-section svelte-1l8191m"}"><span class="${"description-label svelte-1l8191m"}">Description:</span>
			<span class="${"ability-description svelte-1l8191m"}">${escape(ability.desc)}</span></div>
		<div class="${"stats-section svelte-1l8191m"}">${ability.opts.length
	? `${validate_component(AbilityModalOptions, "AbilityModalOptions").$$render($$result, { ability, MasterAbilityList }, {}, {})}`
	: `${validate_component(AbilityModalSingle, "AbilityModalSingle").$$render($$result, { ability, MasterAbilityList }, {}, {})}`}</div>
		<div class="${"btn-row svelte-1l8191m"}"><button class="${"svelte-1l8191m"}">Close</button></div></div>
</div>`;
});

/* src/components/views/character/AbilityCard.svelte generated by Svelte v3.29.4 */

const css$k = {
	code: ".ability-card.svelte-kyd8dq{border:var(--s1) solid;margin:var(--s100);padding:var(--s100)}.ability-card.svelte-kyd8dq:hover{background-color:lime;color:rgba(15, 30, 15, 1);cursor:pointer}.card-row.svelte-kyd8dq{display:flex;justify-content:space-between;margin:var(--s50) auto}.ability-name.svelte-kyd8dq{flex:2;font-weight:bold;text-decoration:underline;text-align:center}",
	map: "{\"version\":3,\"file\":\"AbilityCard.svelte\",\"sources\":[\"AbilityCard.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport AbilityModal from 'views/character/AbilityModal.svelte'\\n\\timport ToggleVisible from 'utils/ToggleVisible.js'\\n\\n\\texport let ability, MasterAbilityList\\n</script>\\n\\n\\n<div class='ability-card' on:click={_ => MasterAbilityList = ToggleVisible(ability, MasterAbilityList)}>\\n\\t<div class='card-row'>\\n\\t\\t<span class='ability-name'>{ability.name}</span>\\n\\t</div>\\n\\t<div class='card-row'>\\n\\t\\t<span class='ability-description'>{ability.desc}</span>\\n\\t</div>\\n</div>\\n{#if ability.visible == true}\\n\\t<AbilityModal on:close='{_ => MasterAbilityList = ToggleVisible(ability, MasterAbilityList)}'\\n\\t\\t{ability}\\n\\t\\t{MasterAbilityList}\\n\\t/>\\n{/if}\\n\\n\\n<style>\\n\\t.ability-card {\\n\\t\\tborder: var(--s1) solid;\\n\\t\\tmargin: var(--s100);\\n\\t\\tpadding: var(--s100);\\n\\t}\\n\\t.ability-card:hover {\\n\\t\\tbackground-color: lime;\\n\\t\\tcolor: rgba(15, 30, 15, 1);\\n\\t\\tcursor: pointer;\\n\\t}\\n\\t.card-row {\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: space-between;\\n\\t\\tmargin: var(--s50) auto;\\n\\t}\\n\\t.ability-name{\\n\\t\\tflex: 2;\\n\\t\\tfont-weight: bold;\\n\\t\\ttext-decoration: underline;\\n\\t\\ttext-align: center;\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AAyBC,aAAa,cAAC,CAAC,AACd,MAAM,CAAE,IAAI,IAAI,CAAC,CAAC,KAAK,CACvB,MAAM,CAAE,IAAI,MAAM,CAAC,CACnB,OAAO,CAAE,IAAI,MAAM,CAAC,AACrB,CAAC,AACD,2BAAa,MAAM,AAAC,CAAC,AACpB,gBAAgB,CAAE,IAAI,CACtB,KAAK,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAC1B,MAAM,CAAE,OAAO,AAChB,CAAC,AACD,SAAS,cAAC,CAAC,AACV,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,MAAM,CAAE,IAAI,KAAK,CAAC,CAAC,IAAI,AACxB,CAAC,AACD,2BAAa,CAAC,AACb,IAAI,CAAE,CAAC,CACP,WAAW,CAAE,IAAI,CACjB,eAAe,CAAE,SAAS,CAC1B,UAAU,CAAE,MAAM,AACnB,CAAC\"}"
};

const AbilityCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { ability } = $$props, { MasterAbilityList } = $$props;
	if ($$props.ability === void 0 && $$bindings.ability && ability !== void 0) $$bindings.ability(ability);
	if ($$props.MasterAbilityList === void 0 && $$bindings.MasterAbilityList && MasterAbilityList !== void 0) $$bindings.MasterAbilityList(MasterAbilityList);
	$$result.css.add(css$k);

	return `<div class="${"ability-card svelte-kyd8dq"}"><div class="${"card-row svelte-kyd8dq"}"><span class="${"ability-name svelte-kyd8dq"}">${escape(ability.name)}</span></div>
	<div class="${"card-row svelte-kyd8dq"}"><span class="${"ability-description"}">${escape(ability.desc)}</span></div></div>
${ability.visible == true
	? `${validate_component(AbilityModal, "AbilityModal").$$render($$result, { ability, MasterAbilityList }, {}, {})}`
	: ``}`;
});

/* src/components/views/character/AbilityGroup.svelte generated by Svelte v3.29.4 */

const css$l = {
	code: ".ability-group-details.svelte-ial7of{margin:var(--s100)}",
	map: "{\"version\":3,\"file\":\"AbilityGroup.svelte\",\"sources\":[\"AbilityGroup.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport AbilityCard from 'views/character/AbilityCard.svelte'\\n\\n\\texport let group, MasterAbilityList\\n</script>\\n\\n\\n<details class='ability-group-details'>\\n\\t<summary>\\n\\t\\t{group.name}XP Abilities\\n\\t</summary>\\n\\t<div class='ability-group-card'>\\n\\t\\t{#each group.list as ability}\\n\\t\\t\\t<AbilityCard {ability} {MasterAbilityList}/>\\n\\t\\t{/each}\\n\\t</div>\\n</details>\\n\\n\\n<style>\\n\\t.ability-group-details {\\n\\t\\tmargin: var(--s100);\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AAoBC,sBAAsB,cAAC,CAAC,AACvB,MAAM,CAAE,IAAI,MAAM,CAAC,AACpB,CAAC\"}"
};

const AbilityGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { group } = $$props, { MasterAbilityList } = $$props;
	if ($$props.group === void 0 && $$bindings.group && group !== void 0) $$bindings.group(group);
	if ($$props.MasterAbilityList === void 0 && $$bindings.MasterAbilityList && MasterAbilityList !== void 0) $$bindings.MasterAbilityList(MasterAbilityList);
	$$result.css.add(css$l);

	return `<details class="${"ability-group-details svelte-ial7of"}"><summary>${escape(group.name)}XP Abilities
	</summary>
	<div class="${"ability-group-card"}">${each(group.list, ability => `${validate_component(AbilityCard, "AbilityCard").$$render($$result, { ability, MasterAbilityList }, {}, {})}`)}</div>
</details>`;
});

/* src/routes/character/creator/abilities.svelte generated by Svelte v3.29.4 */

const css$m = {
	code: ".abilities-list.svelte-1147wm9{width:100%}",
	map: "{\"version\":3,\"file\":\"abilities.svelte\",\"sources\":[\"abilities.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport Abilities from 'lists/abilities/Abilities.js'\\n\\timport AbilityCurrent from 'views/character/AbilityCurrent.svelte'\\n\\timport AbilityGroup from 'views/character/AbilityGroup.svelte'\\n\\timport { beforeUpdate } from 'svelte'\\n\\timport { character } from 'stores/characterStore.js'\\n\\n\\tlet MasterAbilityList = Abilities.masterList\\n\\n\\tconst random = _ => $character = Abilities.random($character)\\n\\n\\tconst reset = _ => $character = Abilities.reset($character)\\n\\n\\tbeforeUpdate(_ => {\\n\\t\\t$character.abilities = MasterAbilityList.filter(ability => ability.taken)\\n\\t\\t$character = Abilities.remainingXP($character)\\n\\t})\\n</script>\\n\\n\\n<svelte:head>\\n\\t<title>Apocalyptia Online - Character Creator - Abilities</title>\\n</svelte:head>\\n<div class='creator-page'>\\n\\t<h1>Abilities</h1>\\n\\t<div class='explanation'>\\n\\t\\t{#each Abilities.explanation as line}\\n\\t\\t\\t<p>{line}</p>\\n\\t\\t{/each}\\n\\t\\t<p>Buy Abilities for your Character using XP, or save some or all of your starting XP for later.</p>\\n\\t</div>\\n\\t<div class='remaining'>\\n\\t\\t<h3>Remaining: {$character.props.experience.remaining}</h3>\\n\\t</div>\\n\\t{#if $character.abilities.length}\\n\\t\\t<div class='section-card'>\\n\\t\\t\\t<AbilityCurrent {MasterAbilityList}/>\\n\\t\\t</div>\\n\\t{/if}\\n\\t<div class='abilities-list'>\\n\\t\\t{#each Abilities.groups as group, index}\\n\\t\\t\\t<AbilityGroup {group} {MasterAbilityList}/>\\n\\t\\t{/each}\\n\\t</div>\\n\\t<div class='btn-row'>\\n\\t\\t<button class='small-cntr-btn' on:click={reset}>\\n\\t\\t\\tReset\\n\\t\\t</button>\\n\\t\\t<button class='small-cntr-btn' on:click={random}>\\n\\t\\t\\tRandom\\n\\t\\t</button>\\n\\t</div>\\n</div>\\n\\n\\n<style>\\n\\t.abilities-list {\\n\\t\\twidth: 100%;\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AAwDC,eAAe,eAAC,CAAC,AAChB,KAAK,CAAE,IAAI,AACZ,CAAC\"}"
};

const Abilities_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $character = get_store_value(character);
	let MasterAbilityList = Abilities$1.masterList;

	beforeUpdate(_ => {
		$character.abilities = MasterAbilityList.filter(ability => ability.taken);
		$character = Abilities$1.remainingXP($character);
	});

	$$result.css.add(css$m);

	return `${($$result.head += `${($$result.title = `<title>Apocalyptia Online - Character Creator - Abilities</title>`, "")}`, "")}
<div class="${"creator-page"}"><h1>Abilities</h1>
	<div class="${"explanation"}">${each(Abilities$1.explanation, line => `<p>${escape(line)}</p>`)}
		<p>Buy Abilities for your Character using XP, or save some or all of your starting XP for later.</p></div>
	<div class="${"remaining"}"><h3>Remaining: ${escape($character.props.experience.remaining)}</h3></div>
	${$character.abilities.length
	? `<div class="${"section-card"}">${validate_component(AbilityCurrent, "AbilityCurrent").$$render($$result, { MasterAbilityList }, {}, {})}</div>`
	: ``}
	<div class="${"abilities-list svelte-1147wm9"}">${each(Abilities$1.groups, (group, index) => `${validate_component(AbilityGroup, "AbilityGroup").$$render($$result, { group, MasterAbilityList }, {}, {})}`)}</div>
	<div class="${"btn-row"}"><button class="${"small-cntr-btn"}">Reset
		</button>
		<button class="${"small-cntr-btn"}">Random
		</button></div>
</div>`;
});

var component_6 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Abilities_1
});

/* src/components/views/character/Navbar.svelte generated by Svelte v3.29.4 */

const css$n = {
	code: ".nav-bar.svelte-lvfy6h{bottom:0;display:flex;height:var(--s300);left:0;position:fixed;width:100%;z-index:2}.nav-button.svelte-lvfy6h{flex:1}.home-button.svelte-lvfy6h{font-size:var(--s125)}",
	map: "{\"version\":3,\"file\":\"Navbar.svelte\",\"sources\":[\"Navbar.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport { character } from 'stores/characterStore.js'\\n\\timport { beforeUpdate, createEventDispatcher, onMount } from 'svelte'\\n\\timport Traits from 'lists/Traits.js'\\n\\timport Skills from 'lists/skills/Skills.js'\\n\\n\\tconst dispatch = createEventDispatcher()\\n\\n\\tlet proceed\\n\\n\\t$: current = $character.meta.status.step\\n\\n\\t$: nextButton = 'X'\\n\\n\\tconst back = _ => {\\n\\t\\t$character.meta.status.step -= 1\\n\\t\\t$character = $character\\n\\t\\tdispatch('message', { step: $character.meta.status.step })\\n\\t}\\n\\n\\tconst home = _ => {\\n\\t\\twindow.location.assign('www.apocalyptiaonline.com')\\n\\t}\\n\\n\\tconst next = _ => {\\n\\t\\tproceedStatus()\\n\\t\\tif (proceed) {\\n\\t\\t\\t$character.meta.status.step += 1\\n\\t\\t\\t$character = $character\\n\\t\\t\\tdispatch('message', { step: $character.meta.status.step })\\n\\t\\t}\\n\\t}\\n\\n\\tconst proceedStatus = _ => {\\n\\t\\tproceed = true\\n\\t\\tif (\\n\\t\\t\\t(current == 1 && Object.values($character.desc).some(d => d.value == ``)) ||\\n\\t\\t\\t(current == 2 && Traits.remaining($character) > 0) ||\\n\\t\\t\\t(current == 3 && Skills.remaining($character) > 0) ||\\n\\t\\t\\t(current == 6 && Object.values($character.gear).some(g => g.inventory.length == 0))\\n\\t\\t) proceed = false\\n\\t\\tif (proceed) nextButton = '&rtrif;'\\n\\t\\telse nextButton = '&#10006;'\\n\\t}\\n\\n\\tbeforeUpdate(_ => proceedStatus())\\n\\tonMount(_ => proceedStatus())\\n</script>\\n\\n\\n<div class='nav-bar'>\\n\\t<button on:click={back} class='link-btn nav-button'>&ltrif;</button>\\n\\t<button on:click={home} class='link-btn nav-button home-button'>Home</button>\\n\\t<button on:click={next} class='link-btn nav-button'>{@html nextButton}</button>\\n</div>\\n\\n\\n<style>\\n\\t.nav-bar {\\n\\t\\tbottom: 0;\\n\\t\\tdisplay: flex;\\n\\t\\theight: var(--s300);\\n\\t\\tleft: 0;\\n\\t\\tposition: fixed;\\n\\t\\twidth: 100%;\\n\\t\\tz-index: 2;\\n\\t}\\n\\t.nav-button {\\n\\t\\tflex: 1;\\n\\t}\\n\\t.home-button {\\n\\t\\tfont-size: var(--s125);\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AA0DC,QAAQ,cAAC,CAAC,AACT,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,MAAM,CAAC,CACnB,IAAI,CAAE,CAAC,CACP,QAAQ,CAAE,KAAK,CACf,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,CAAC,AACX,CAAC,AACD,WAAW,cAAC,CAAC,AACZ,IAAI,CAAE,CAAC,AACR,CAAC,AACD,YAAY,cAAC,CAAC,AACb,SAAS,CAAE,IAAI,MAAM,CAAC,AACvB,CAAC\"}"
};

const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $character = get_store_value(character);
	const dispatch = createEventDispatcher();
	let proceed;

	const proceedStatus = _ => {
		proceed = true;
		if (current == 1 && Object.values($character.desc).some(d => d.value == ``) || current == 2 && Traits.remaining($character) > 0 || current == 3 && Skills.remaining($character) > 0 || current == 6 && Object.values($character.gear).some(g => g.inventory.length == 0)) proceed = false;
		if (proceed) nextButton = "&rtrif;"; else nextButton = "&#10006;";
	};

	beforeUpdate(_ => proceedStatus());
	onMount(_ => proceedStatus());
	$$result.css.add(css$n);
	let current;
	let nextButton;
	current = $character.meta.status.step;
	nextButton = "X";

	return `<div class="${"nav-bar svelte-lvfy6h"}"><button class="${"link-btn nav-button svelte-lvfy6h"}">◂</button>
	<button class="${"link-btn nav-button home-button svelte-lvfy6h"}">Home</button>
	<button class="${"link-btn nav-button svelte-lvfy6h"}">${nextButton}</button>
</div>`;
});

/* src/components/views/widgets/Slider.svelte generated by Svelte v3.29.4 */

const css$o = {
	code: ".range-block.svelte-ip4ym{display:block;margin:auto;width:95%}input[type=\"range\"].svelte-ip4ym{-moz-appearance:none;-webkit-appearance:none;margin:var(--s100) auto;height:var(--s100);width:100%}input[type=\"range\"].svelte-ip4ym::-moz-range-thumb{-moz-appearance:none;background-color:lime;border-radius:var(--radius);border:var(--s1) solid rgba(15, 30, 15, 1);height:var(--s200);width:var(--s200)}input[type=\"range\"].svelte-ip4ym::-webkit-slider-thumb{-webkit-appearance:none;background-color:lime;border-radius:var(--radius);border:var(--s1) solid rgba(15, 30, 15, 1);height:var(--s200);width:var(--s200)}input[type=\"range\"].svelte-ip4ym:hover::-moz-range-thumb{-moz-appearance:none;background:rgba(15, 30, 15, 1);border:var(--s1) solid lime}input[type=\"range\"].svelte-ip4ym:hover::-webkit-slider-thumb{-webkit-appearance:none;background:rgba(15, 30, 15, 1);border:var(--s1) solid lime}.range-indicator.svelte-ip4ym{display:flex;flex-wrap:nowrap;justify-content:space-between;margin:auto;text-align:center;width:100%}",
	map: "{\"version\":3,\"file\":\"Slider.svelte\",\"sources\":[\"Slider.svelte\"],\"sourcesContent\":[\"<script>\\n\\texport let name, value, min, max\\n</script>\\n\\n\\n<div class='range-block'>\\n\\t<input type='range' {name} {min} {max} bind:value={value} on:input>\\n\\t<div class='range-indicator'>\\n\\t\\t{#if min}\\n\\t\\t\\t{#each Array(max) as _, i}\\n\\t\\t\\t\\t<span class='range-number'>{i+1}</span>\\n\\t\\t\\t{/each}\\n\\t\\t{:else}\\n\\t\\t\\t{#each Array(max+1) as _, i}\\n\\t\\t\\t\\t<span class='range-number'>{i}</span>\\n\\t\\t\\t{/each}\\n\\t\\t{/if}\\n\\t</div>\\n</div>\\n\\n\\n<style>\\n\\t.range-block {\\n\\t\\tdisplay: block;\\n\\t\\tmargin: auto;\\n\\t\\twidth: 95%;\\n\\t}\\n\\tinput[type=\\\"range\\\"] {\\n\\t\\t-moz-appearance: none;\\n\\t\\t-webkit-appearance: none;\\n\\t\\tmargin: var(--s100) auto;\\n\\t\\theight: var(--s100);\\n\\t\\twidth: 100%;\\n\\t}\\n\\tinput[type=\\\"range\\\"]::-moz-range-thumb {\\n\\t\\t-moz-appearance: none;\\n\\t\\tbackground-color: lime;\\n\\t\\tborder-radius: var(--radius);\\n\\t\\tborder: var(--s1) solid rgba(15, 30, 15, 1);\\n\\t\\theight: var(--s200);\\n\\t\\twidth: var(--s200);\\n\\t}\\n\\tinput[type=\\\"range\\\"]::-webkit-slider-thumb {\\n\\t\\t-webkit-appearance: none;\\n\\t\\tbackground-color: lime;\\n\\t\\tborder-radius: var(--radius);\\n\\t\\tborder: var(--s1) solid rgba(15, 30, 15, 1);\\n\\t\\theight: var(--s200);\\n\\t\\twidth: var(--s200);\\n\\t}\\n\\tinput[type=\\\"range\\\"]:hover::-moz-range-thumb {\\n\\t\\t-moz-appearance: none;\\n\\t\\tbackground: rgba(15, 30, 15, 1);\\n\\t\\tborder: var(--s1) solid lime;\\n\\t}\\n\\tinput[type=\\\"range\\\"]:hover::-webkit-slider-thumb {\\n\\t\\t-webkit-appearance: none;\\n\\t\\tbackground: rgba(15, 30, 15, 1);\\n\\t\\tborder: var(--s1) solid lime;\\n\\t}\\n\\t.range-indicator {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-wrap: nowrap;\\n\\t\\tjustify-content: space-between;\\n\\t\\tmargin: auto;\\n\\t\\ttext-align: center;\\n\\t\\twidth: 100%;\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AAsBC,YAAY,aAAC,CAAC,AACb,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,GAAG,AACX,CAAC,AACD,KAAK,CAAC,IAAI,CAAC,OAAO,CAAC,aAAC,CAAC,AACpB,eAAe,CAAE,IAAI,CACrB,kBAAkB,CAAE,IAAI,CACxB,MAAM,CAAE,IAAI,MAAM,CAAC,CAAC,IAAI,CACxB,MAAM,CAAE,IAAI,MAAM,CAAC,CACnB,KAAK,CAAE,IAAI,AACZ,CAAC,AACD,KAAK,CAAC,IAAI,CAAC,OAAO,cAAC,kBAAkB,AAAC,CAAC,AACtC,eAAe,CAAE,IAAI,CACrB,gBAAgB,CAAE,IAAI,CACtB,aAAa,CAAE,IAAI,QAAQ,CAAC,CAC5B,MAAM,CAAE,IAAI,IAAI,CAAC,CAAC,KAAK,CAAC,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAC3C,MAAM,CAAE,IAAI,MAAM,CAAC,CACnB,KAAK,CAAE,IAAI,MAAM,CAAC,AACnB,CAAC,AACD,KAAK,CAAC,IAAI,CAAC,OAAO,cAAC,sBAAsB,AAAC,CAAC,AAC1C,kBAAkB,CAAE,IAAI,CACxB,gBAAgB,CAAE,IAAI,CACtB,aAAa,CAAE,IAAI,QAAQ,CAAC,CAC5B,MAAM,CAAE,IAAI,IAAI,CAAC,CAAC,KAAK,CAAC,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAC3C,MAAM,CAAE,IAAI,MAAM,CAAC,CACnB,KAAK,CAAE,IAAI,MAAM,CAAC,AACnB,CAAC,AACD,KAAK,CAAC,IAAI,CAAC,OAAO,cAAC,MAAM,kBAAkB,AAAC,CAAC,AAC5C,eAAe,CAAE,IAAI,CACrB,UAAU,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAC/B,MAAM,CAAE,IAAI,IAAI,CAAC,CAAC,KAAK,CAAC,IAAI,AAC7B,CAAC,AACD,KAAK,CAAC,IAAI,CAAC,OAAO,cAAC,MAAM,sBAAsB,AAAC,CAAC,AAChD,kBAAkB,CAAE,IAAI,CACxB,UAAU,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAC/B,MAAM,CAAE,IAAI,IAAI,CAAC,CAAC,KAAK,CAAC,IAAI,AAC7B,CAAC,AACD,gBAAgB,aAAC,CAAC,AACjB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,MAAM,CACjB,eAAe,CAAE,aAAa,CAC9B,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,MAAM,CAClB,KAAK,CAAE,IAAI,AACZ,CAAC\"}"
};

const Slider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { name } = $$props, { value } = $$props, { min } = $$props, { max } = $$props;
	if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
	if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
	if ($$props.min === void 0 && $$bindings.min && min !== void 0) $$bindings.min(min);
	if ($$props.max === void 0 && $$bindings.max && max !== void 0) $$bindings.max(max);
	$$result.css.add(css$o);

	return `<div class="${"range-block svelte-ip4ym"}"><input type="${"range"}"${add_attribute("name", name, 0)}${add_attribute("min", min, 0)}${add_attribute("max", max, 0)} class="${"svelte-ip4ym"}"${add_attribute("value", value, 1)}>
	<div class="${"range-indicator svelte-ip4ym"}">${min
	? `${each(Array(max), (_, i) => `<span class="${"range-number"}">${escape(i + 1)}</span>`)}`
	: `${each(Array(max + 1), (_, i) => `<span class="${"range-number"}">${escape(i)}</span>`)}`}</div>
</div>`;
});

/* src/routes/character/creator/creator.svelte generated by Svelte v3.29.4 */

const css$p = {
	code: ".creator-page.svelte-s9i01e{padding:var(--s100);padding-bottom:var(--s400)}",
	map: "{\"version\":3,\"file\":\"creator.svelte\",\"sources\":[\"creator.svelte\"],\"sourcesContent\":[\"<script>\\n    import NavBar from 'views/character/Navbar.svelte'\\n\\timport abilities from 'creator/abilities.svelte'\\n\\timport description from 'creator/description.svelte'\\n\\timport gear from 'creator/gear.svelte'\\n\\timport properties from 'creator/properties.svelte'\\n\\timport sheet from 'creator/sheet.svelte'\\n\\timport skills from 'creator/skills.svelte'\\n    import traits from 'creator/traits.svelte'\\n\\n    let page\\n\\n    let step = 0\\n\\n    const pages = [\\n        description,\\n        traits,\\n        skills,\\n        properties,\\n        abilities,\\n        gear,\\n        sheet\\n    ]\\n\\n    const navigate = (event) => {\\n        console.log(event)\\n        step = event.detail.message.step\\n        page = pages[step]\\n    }\\n</script>\\n\\n\\n<div class='creator-page'>\\n    <svelte:component this={page} />\\n</div>\\n<NavBar on:step={navigate} />\\n\\n\\n<style>\\n    .creator-page {\\n        padding: var(--s100);\\n        padding-bottom: var(--s400);\\n    }\\n</style>\"],\"names\":[],\"mappings\":\"AAuCI,aAAa,cAAC,CAAC,AACX,OAAO,CAAE,IAAI,MAAM,CAAC,CACpB,cAAc,CAAE,IAAI,MAAM,CAAC,AAC/B,CAAC\"}"
};

const Creator = create_ssr_component(($$result, $$props, $$bindings, slots) => {

	$$result.css.add(css$p);

	return `<div class="${"creator-page svelte-s9i01e"}">${validate_component( missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div>
${validate_component(Navbar, "NavBar").$$render($$result, {}, {}, {})}`;
});

var component_7 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Creator
});

/* src/routes/character/creator/skills.svelte generated by Svelte v3.29.4 */

const css$q = {
	code: ".skills-details.svelte-16c7r26{margin-bottom:var(--s100)}.group-label.svelte-16c7r26{font-weight:bold}.max-score.svelte-16c7r26{font-weight:bold;margin-top:var(--s150);text-align:center}.stat-range.svelte-16c7r26{margin:var(--s100)}",
	map: "{\"version\":3,\"file\":\"skills.svelte\",\"sources\":[\"skills.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport Skills from 'lists/skills/Skills.js'\\n\\timport Slider from 'views/widgets/Slider.svelte'\\n\\timport { character } from 'stores/characterStore.js'\\n\\n\\t$: remaining = Skills.remaining($character)\\n\\n\\tconst assign = (event) => $character = Skills.assign($character, event.target)\\n\\n\\tconst random = _ => $character = Skills.random($character)\\n\\n\\tconst reset = _ => $character = Skills.reset($character)\\n</script>\\n\\n\\n<svelte:head>\\n\\t<title>Apocalyptia Online - Character Creator - Skills</title>\\n</svelte:head>\\n<div class='creator-page'>\\n\\t<h1>Skills</h1>\\n\\t<div class='explanation'>\\n\\t\\t{#each Skills.explanation as line}\\n\\t\\t\\t<p>{line}</p>\\n\\t\\t{/each}\\n\\t</div>\\n\\t<div class='remaining'>\\n\\t\\t<h3>Points Remaining: {remaining}</h3>\\n\\t</div>\\n\\t<div class='list'>\\n\\t\\t{#each Skills.groups as group}\\n\\t\\t\\t<details class='skills-details'>\\n\\t\\t\\t\\t<summary>\\n\\t\\t\\t\\t\\t<span class='group-label'>\\n\\t\\t\\t\\t\\t\\t{group.name} Skills\\n\\t\\t\\t\\t\\t</span>\\n\\t\\t\\t\\t</summary>\\n\\t\\t\\t\\t<div class='details-content'>\\n\\t\\t\\t\\t\\t<div class='max-score'>\\n\\t\\t\\t\\t\\t\\tMax Score: {$character.traits[group.name.toLowerCase()].score}\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t{#each group.list as skill}\\n\\t\\t\\t\\t\\t\\t<div class='stat-range'>\\n\\t\\t\\t\\t\\t\\t\\t<div class='stat-label'>{skill.name}</div>\\n\\t\\t\\t\\t\\t\\t\\t<Slider\\n\\t\\t\\t\\t\\t\\t\\t\\tname='{skill.name.toLowerCase()}'\\n\\t\\t\\t\\t\\t\\t\\t\\tmin={parseInt(0)}\\n\\t\\t\\t\\t\\t\\t\\t\\tmax={parseInt(6)}\\n\\t\\t\\t\\t\\t\\t\\t\\tbind:value={$character.skills[skill.name.toLowerCase()].score}\\n\\t\\t\\t\\t\\t\\t\\t\\ton:input={event => assign(event)}\\n\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</details>\\n\\t\\t{/each}\\n\\t</div>\\n\\t<div class='btn-row'>\\n\\t\\t<button class='small-cntr-btn' on:click={reset}>\\n\\t\\t\\tReset\\n\\t\\t</button>\\n\\t\\t<button class='small-cntr-btn' on:click={random}>\\n\\t\\t\\tRandom\\n\\t\\t</button>\\n\\t</div>\\n</div>\\n\\n\\n<style>\\n\\t.skills-details {\\n\\t\\tmargin-bottom: var(--s100);\\n\\t}\\n\\t.group-label {\\n\\t\\tfont-weight: bold;\\n\\t}\\n\\t.max-score {\\n\\t\\tfont-weight: bold;\\n\\t\\tmargin-top: var(--s150);\\n\\t\\ttext-align: center;\\n\\t}\\n\\t.stat-range {\\n\\t\\tmargin: var(--s100);\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AAoEC,eAAe,eAAC,CAAC,AAChB,aAAa,CAAE,IAAI,MAAM,CAAC,AAC3B,CAAC,AACD,YAAY,eAAC,CAAC,AACb,WAAW,CAAE,IAAI,AAClB,CAAC,AACD,UAAU,eAAC,CAAC,AACX,WAAW,CAAE,IAAI,CACjB,UAAU,CAAE,IAAI,MAAM,CAAC,CACvB,UAAU,CAAE,MAAM,AACnB,CAAC,AACD,WAAW,eAAC,CAAC,AACZ,MAAM,CAAE,IAAI,MAAM,CAAC,AACpB,CAAC\"}"
};

const Skills_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $character = get_store_value(character);
	$$result.css.add(css$q);
	let $$settled;
	let $$rendered;

	do {
		$$settled = true;
		let remaining;
		remaining = Skills.remaining($character);

		$$rendered = `${($$result.head += `${($$result.title = `<title>Apocalyptia Online - Character Creator - Skills</title>`, "")}`, "")}
<div class="${"creator-page"}"><h1>Skills</h1>
	<div class="${"explanation"}">${each(Skills.explanation, line => `<p>${escape(line)}</p>`)}</div>
	<div class="${"remaining"}"><h3>Points Remaining: ${escape(remaining)}</h3></div>
	<div class="${"list"}">${each(Skills.groups, group => `<details class="${"skills-details svelte-16c7r26"}"><summary><span class="${"group-label svelte-16c7r26"}">${escape(group.name)} Skills
					</span></summary>
				<div class="${"details-content"}"><div class="${"max-score svelte-16c7r26"}">Max Score: ${escape($character.traits[group.name.toLowerCase()].score)}</div>
					${each(group.list, skill => `<div class="${"stat-range svelte-16c7r26"}"><div class="${"stat-label"}">${escape(skill.name)}</div>
							${validate_component(Slider, "Slider").$$render(
			$$result,
			{
				name: skill.name.toLowerCase(),
				min: parseInt(0),
				max: parseInt(6),
				value: $character.skills[skill.name.toLowerCase()].score
			},
			{
				value: $$value => {
					$character.skills[skill.name.toLowerCase()].score = $$value;
					$$settled = false;
				}
			},
			{}
		)}
						</div>`)}</div>
			</details>`)}</div>
	<div class="${"btn-row"}"><button class="${"small-cntr-btn"}">Reset
		</button>
		<button class="${"small-cntr-btn"}">Random
		</button></div>
</div>`;
	} while (!$$settled);

	return $$rendered;
});

var component_8 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Skills_1
});

/* src/routes/character/creator/traits.svelte generated by Svelte v3.29.4 */

const Traits_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $character = get_store_value(character);
	let $$settled;
	let $$rendered;

	do {
		$$settled = true;
		let remaining;
		remaining = Traits.remaining($character);

		$$rendered = `${($$result.head += `${($$result.title = `<title>Apocalyptia Online - Character Creator - Traits</title>`, "")}`, "")}
<div class="${"creator-page"}"><h1>Traits</h1>
	<div class="${"explanation"}">${each(Traits.explanation, line => `<p>${escape(line)}</p>`)}</div>
	<div class="${"remaining"}"><h3>Points Remaining: ${escape(remaining)}</h3></div>
	<div class="${"list"}">${each(Traits.list, trait => `<div class="${"section-card"}"><div class="${"stat-label"}">${escape(trait.name)}</div>
				<div class="${"stat-column"}">${validate_component(Slider, "Slider").$$render(
			$$result,
			{
				name: trait.name.toLowerCase(),
				min: parseInt(1),
				max: parseInt(Traits.max),
				value: $character.traits[trait.name.toLowerCase()].score
			},
			{
				value: $$value => {
					$character.traits[trait.name.toLowerCase()].score = $$value;
					$$settled = false;
				}
			},
			{}
		)}</div>
			</div>`)}</div>
	<div class="${"btn-row"}"><button class="${"small-cntr-btn"}">Reset
		</button>
		<button class="${"small-cntr-btn"}">Random
		</button></div></div>`;
	} while (!$$settled);

	return $$rendered;
});

var component_9 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Traits_1
});

/* src/routes/character/creator/sheet.svelte generated by Svelte v3.29.4 */

const Sheet = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `${($$result.head += `${($$result.title = `<title>Apocalyptia Online - Character Creator - Character Sheet</title>`, "")}`, "")}
${validate_component(CharacterSheet, "CharacterSheet").$$render($$result, { mode: "edit" }, {}, {})}`;
});

var component_10 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Sheet
});

/* src/routes/character/creator/gear.svelte generated by Svelte v3.29.4 */

const css$r = {
	code: ".item-category.svelte-b70j1n{margin-bottom:var(--s100)}.ammo-heading.svelte-b70j1n{margin-top:var(--s100)}.item.svelte-b70j1n{border:1px dotted lime;margin-bottom:var(--s100);padding:var(--s100)}",
	map: "{\"version\":3,\"file\":\"gear.svelte\",\"sources\":[\"gear.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport GearBlock from 'views/widgets/GearBlock.svelte'\\n\\timport RandomStartingGear from 'random/RandomStartingGear.js'\\n\\timport { character } from 'stores/characterStore.js'\\n\\timport { beforeUpdate } from 'svelte'\\n\\n\\tlet gearedUp = false\\n\\n\\tconst randomStartingGear = _ => {\\n\\t\\t$character = RandomStartingGear($character, $character.props.luck.score)\\n\\t}\\n\\n\\tbeforeUpdate(_ => {\\n\\t\\tgearedUp = Object.values($character.gear).every(g => g.inventory.length)\\n\\t})\\n</script>\\n\\n\\n<svelte:head>\\n\\t<title>Apocalyptia Online - Character Creator - Gear</title>\\n</svelte:head>\\n<div class='creator-page'>\\n\\t<h1>Gear</h1>\\n\\t<div class='explanation'>\\n\\t\\t<p>You start with some random Gear: A Melee weapon, a Ranged weapon (with a little Ammo), and Armor.</p>\\n\\t</div>\\n\\t{#if gearedUp}\\n\\t\\t<div class='section-card'>\\n\\t\\t\\t<div class='item-category'>\\n\\t\\t\\t\\t<h2>Melee Weapon</h2>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class='item'>\\n\\t\\t\\t\\t<GearBlock item={$character.gear.melee.inventory[0]} mode={'edit'} />\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t\\t<div class='section-card'>\\n\\t\\t\\t<div class='item-category'>\\n\\t\\t\\t\\t<h2>Ranged Weapon</h2>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class='item'>\\n\\t\\t\\t\\t<GearBlock item={$character.gear.ranged.inventory[0]} mode={'edit'} />\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t\\t<div class='section-card'>\\n\\t\\t\\t<div class='item-category ammo-heading'>\\n\\t\\t\\t\\t<h2>Ammo</h2>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class='item'>\\n\\t\\t\\t\\t<GearBlock item={$character.gear.ammo.inventory[0]} mode={'edit'} />\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t\\t<div class='section-card'>\\n\\t\\t\\t<div class='item-category'>\\n\\t\\t\\t\\t<h2>Armor</h2>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class='item'>\\n\\t\\t\\t\\t<GearBlock item={$character.gear.armor.inventory[0]} mode={'edit'} />\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t\\t<div class='section-card'>\\n\\t\\t\\t<div class='item-category'>\\n\\t\\t\\t\\t<h2>Equipment</h2>\\n\\t\\t\\t</div>\\n\\t\\t\\t{#each $character.gear.equipment.inventory as equipment}\\n\\t\\t\\t\\t<div class='item'>\\n\\t\\t\\t\\t\\t<GearBlock item={equipment} mode={'edit'} />\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t{/each}\\n\\t\\t</div>\\n\\t{:else}\\n\\t\\t<div class='btn-row'>\\n\\t\\t\\t<button class='small-cntr-btn' on:click={randomStartingGear}>Random</button>\\n\\t\\t</div>\\n\\t{/if}\\n</div>\\n\\n\\n<style>\\n\\t.item-category {\\n\\t\\tmargin-bottom: var(--s100);\\n\\t}\\n\\t.ammo-heading {\\n\\t\\tmargin-top: var(--s100);\\n\\t}\\n\\t.item {\\n\\t\\tborder: 1px dotted lime;\\n\\t\\tmargin-bottom: var(--s100);\\n\\t\\tpadding: var(--s100);\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AA8EC,cAAc,cAAC,CAAC,AACf,aAAa,CAAE,IAAI,MAAM,CAAC,AAC3B,CAAC,AACD,aAAa,cAAC,CAAC,AACd,UAAU,CAAE,IAAI,MAAM,CAAC,AACxB,CAAC,AACD,KAAK,cAAC,CAAC,AACN,MAAM,CAAE,GAAG,CAAC,MAAM,CAAC,IAAI,CACvB,aAAa,CAAE,IAAI,MAAM,CAAC,CAC1B,OAAO,CAAE,IAAI,MAAM,CAAC,AACrB,CAAC\"}"
};

const Gear$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $character = get_store_value(character);
	let gearedUp = false;

	beforeUpdate(_ => {
		gearedUp = Object.values($character.gear).every(g => g.inventory.length);
	});

	$$result.css.add(css$r);

	return `${($$result.head += `${($$result.title = `<title>Apocalyptia Online - Character Creator - Gear</title>`, "")}`, "")}
<div class="${"creator-page"}"><h1>Gear</h1>
	<div class="${"explanation"}"><p>You start with some random Gear: A Melee weapon, a Ranged weapon (with a little Ammo), and Armor.</p></div>
	${gearedUp
	? `<div class="${"section-card"}"><div class="${"item-category svelte-b70j1n"}"><h2>Melee Weapon</h2></div>
			<div class="${"item svelte-b70j1n"}">${validate_component(GearBlock, "GearBlock").$$render(
			$$result,
			{
				item: $character.gear.melee.inventory[0],
				mode: "edit"
			},
			{},
			{}
		)}</div></div>
		<div class="${"section-card"}"><div class="${"item-category svelte-b70j1n"}"><h2>Ranged Weapon</h2></div>
			<div class="${"item svelte-b70j1n"}">${validate_component(GearBlock, "GearBlock").$$render(
			$$result,
			{
				item: $character.gear.ranged.inventory[0],
				mode: "edit"
			},
			{},
			{}
		)}</div></div>
		<div class="${"section-card"}"><div class="${"item-category ammo-heading svelte-b70j1n"}"><h2>Ammo</h2></div>
			<div class="${"item svelte-b70j1n"}">${validate_component(GearBlock, "GearBlock").$$render(
			$$result,
			{
				item: $character.gear.ammo.inventory[0],
				mode: "edit"
			},
			{},
			{}
		)}</div></div>
		<div class="${"section-card"}"><div class="${"item-category svelte-b70j1n"}"><h2>Armor</h2></div>
			<div class="${"item svelte-b70j1n"}">${validate_component(GearBlock, "GearBlock").$$render(
			$$result,
			{
				item: $character.gear.armor.inventory[0],
				mode: "edit"
			},
			{},
			{}
		)}</div></div>
		<div class="${"section-card"}"><div class="${"item-category svelte-b70j1n"}"><h2>Equipment</h2></div>
			${each($character.gear.equipment.inventory, equipment => `<div class="${"item svelte-b70j1n"}">${validate_component(GearBlock, "GearBlock").$$render($$result, { item: equipment, mode: "edit" }, {}, {})}
				</div>`)}</div>`
	: `<div class="${"btn-row"}"><button class="${"small-cntr-btn"}">Random</button></div>`}
</div>`;
});

var component_11 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Gear$1
});

var MasterGearList = [
    {
        name: 'Master Gear List',
        value: undefined,
        list: [
            ...AccessoryList,
            ...AmmoList,
            ...ArmorList,
            ...BombList,
            ...DocumentList,
            ...DrugsList,
            ...ElectronicsList,
            ...EquipmentList,
            ...MedicalList,
            ...MeleeWeaponList,
            ...RangedWeaponList,
            ...StorageList
        ]
    },
    {
        name: 'Accessory',
        value: undefined,
        list: AccessoryList
    },
    {
        name: 'Ammo',
        value: undefined,
        list: AmmoList
    },
    {
        name: 'Armor',
        value: undefined,
        list: ArmorList
    },
    {
        name: 'Bomb',
        value: undefined,
        list: BombList
    },
    {
        name: 'Document',
        value: undefined,
        list: DocumentList
    },
    {
        name: 'Drug',
        value: undefined,
        list: DrugsList
    },
    {
        name: 'Electronics',
        value: undefined,
        list: ElectronicsList
    },
    {
        name: 'Equipment',
        value: undefined,
        list: EquipmentList
    },
    {
        name: 'Medical',
        value: undefined,
        list: MedicalList
    },
    {
        name: 'Melee',
        value: undefined,
        list: MeleeWeaponList
    },
    {
        name: 'Ranged',
        value: undefined,
        list: RangedWeaponList
    },
    {
        name: 'Storage',
        value: undefined,
        list: StorageList
    },
];

/* src/routes/generator.svelte generated by Svelte v3.29.4 */

const css$s = {
	code: ".item-category.svelte-oz8j6y{display:flex;justify-content:space-between}.gear-category.svelte-oz8j6y{font-size:var(--s125);margin:auto}",
	map: "{\"version\":3,\"file\":\"generator.svelte\",\"sources\":[\"generator.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport BackButton from 'views/widgets/BackButton.svelte'\\n\\timport MasterGearList from 'lists/gear/MasterGearList.js'\\n\\timport GearBlock from 'views/widgets/GearBlock.svelte'\\n\\timport RandomRoll from 'random/RandomRoll.js'\\n\\timport d6Roll from 'random/d6Roll.js'\\n\\n\\tlet roll = 0, mod = 0, result = 0\\n\\n\\tconst randomItem = (item) => {\\n\\t\\titem.value = RandomRoll(item.list)\\n\\t\\treturn item\\n\\t}\\n\\n\\tconst rolld6 = _ => {\\n\\t\\troll = d6Roll()\\n\\t\\tresult = roll + mod\\n\\t}\\n</script>\\n\\n\\n<svelte:head>\\n\\t<title>Apocalyptia Online Random Generator</title>\\n</svelte:head>\\n<h1>Random Generator</h1>\\n<div class='section-card'>\\n\\t<p><span class='gear-category'>d6 Roll</span></p>\\n\\t<p>Modifier: <input type='number' bind:value='{mod}'></p>\\n\\t<p>Roll: {#if result == -666}1, 1{:else}{roll}{/if}</p>\\n\\t<div class='item-category'>\\n\\t\\t<h3>Result:</h3> {#if result == -666}Botch!{:else}{result}{/if}\\n\\t\\t<button on:click={rolld6}>Random</button>\\n\\t</div>\\n</div>\\n{#each MasterGearList as gear, i}\\n\\t<div class='section-card'>\\n\\t\\t<div class='item-category'>\\n\\t\\t\\t<span class='gear-category'>\\n\\t\\t\\t\\t{gear.name}\\n\\t\\t\\t</span>\\n\\t\\t\\t<button on:click={_ => {\\n\\t\\t\\t\\tMasterGearList[i] = randomItem(gear)\\n\\t\\t\\t\\tMasterGearList = MasterGearList\\n\\t\\t\\t}}>\\n\\t\\t\\t\\tRandom\\n\\t\\t\\t</button>\\n\\t\\t</div>\\n\\t\\t{#if gear.value != undefined}\\n\\t\\t\\t<GearBlock item={gear.value} mode={'manual'}/>\\n\\t\\t{/if}\\n\\t</div>\\n{/each}\\n<BackButton path={'/'} />\\n\\n\\n<style>\\n\\t.item-category {\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: space-between;\\n\\t}\\n\\t.gear-category {\\n\\t\\tfont-size: var(--s125);\\n\\t\\tmargin: auto;\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AAwDC,cAAc,cAAC,CAAC,AACf,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,AAC/B,CAAC,AACD,cAAc,cAAC,CAAC,AACf,SAAS,CAAE,IAAI,MAAM,CAAC,CACtB,MAAM,CAAE,IAAI,AACb,CAAC\"}"
};

const Generator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let roll = 0, mod = 0, result = 0;

	$$result.css.add(css$s);

	return `${($$result.head += `${($$result.title = `<title>Apocalyptia Online Random Generator</title>`, "")}`, "")}
<h1>Random Generator</h1>
<div class="${"section-card"}"><p><span class="${"gear-category svelte-oz8j6y"}">d6 Roll</span></p>
	<p>Modifier: <input type="${"number"}"${add_attribute("value", mod, 1)}></p>
	<p>Roll: ${ `${escape(roll)}`}</p>
	<div class="${"item-category svelte-oz8j6y"}"><h3>Result:</h3> ${ `${escape(result)}`}
		<button>Random</button></div></div>
${each(MasterGearList, (gear, i) => `<div class="${"section-card"}"><div class="${"item-category svelte-oz8j6y"}"><span class="${"gear-category svelte-oz8j6y"}">${escape(gear.name)}</span>
			<button>Random
			</button></div>
		${gear.value != undefined
	? `${validate_component(GearBlock, "GearBlock").$$render($$result, { item: gear.value, mode: "manual" }, {}, {})}`
	: ``}
	</div>`)}
${validate_component(BackButton, "BackButton").$$render($$result, { path: "/" }, {}, {})}`;
});

var component_12 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Generator
});

const Rounds = new Rule({
	id: `43080069-4044-4882-0b54-ca9229f09f23`,
	name: `Rounds`, 
	desc: [
		`Combat time occurs in 3-second “rounds”.`,
		`Players have 30 seconds to decide what their Character's Actions will be for the round.`,
		`Any new Complication or Status modifiers that come into play during a round go into effect at the start of the next round.`,
	]
});

const Actions = new Rule({
	id: `6073380c-7def-4d74-889b-ddbd5865fe69`,
	name: `Actions`, 
	desc: [
		`You get 3 Actions per round starting on your turn.`,
		`Most things cost 1 Action unless otherwise noted.`,
	]
});

const Communication = new Rule({
	id: `2bd8d14c-6965-4319-c64b-1ebe590b93ac`,
	name: `Communication`, 
	desc: [
		`You can speak or shout up to 6 words per round.`,
	]
});

const Chase = new Rule({
	id: `aa44bbe5-d0e1-4bed-0125-19a3c88c587a`,
	name: `Chase`, 
	desc: [
		`When a combatant attempts to flee and another chooses to pursue, they roll opposed [(Acrobatics, Athletics, Drive, or Tame) + Run Speed] each round, depending on the type of mobility in use.`,
		`The chase ends when one side gets 3 Successes over the other.`,
	]
});

const Movement = new Rule({
	id: `66094467-f795-4c02-49e9-0bf193dacaa6`,
	name: `Movement`, 
	desc: [
		`You may make one Movement Action per turn.`,
		`This Movement always costs 1 Action, no matter what type of Movement it is.`,
		`Your Movement Action may be any one of the following:`,
		` 1) Walk Speed = [Agility x 3] yards`,
		` 2) Run Speed = [Agility x 6] yards`,
		` 3) Climb Speed = [Agility] yards`,
		` 4) Swim Speed = [Agility / 2] yards`,
		` 5) Stand up from Prone = 1 yard`,
		`When you take a Movement Action, you may go Prone at any time for free.`,
		`Running imposes the Unstable Status effect until your next turn.`,
		`You may divide up your Movement around other Actions on your turn however you wish.`,
	]
});
Movement.subrules = [
	Chase,
];

const Attack = new Rule({
	id: `d253e0e1-36bf-4434-a78b-032196be0e73`,
	name: `Attack`, 
	desc: [
		`There are two types of Attacks: Melee and Ranged.`,
		`Spend an Action on your turn to roll [d6 + Melee or Ranged] vs Defense.`,
		`Rolling a 6 on the die is an Explosion, which is re-rolled and added cumulatively to the Attack total.`,
		`On a Successful Attack, in addition to the Weapon Damage, you do bonus Damage = [Attack - Defense] up to your attacking Skill score.`,
	]
});

const ReflexiveDefense = new Rule({
	id: `feae7482-800b-47d1-f17c-3a103d83b70b`,
	name: `Reflexive Defense`,
	desc: [
		`Reflexive Defenses = the Skill Specialty they are based on.`,
		`These are your default Defenses when not actively rolling.`,
		`Use Reflexive Block against Melee Attacks.`,
		`Use Reflexive Dodge against either Melee or Ranged Attacks.`,
	]
});

const Defense = new Rule({
	id: `69987b3f-518a-4f96-643c-c82cbd1c1a98`,
	name: `Defense`, 
	desc: [
		`Spend an Action on your enemy's turn to use either type of Defense: Block or Dodge.`,
		`To Block, roll [d6 + Melee] vs Melee Attacks.`,
		`To Dodge, roll [d6 + Acrobatics] vs either Melee or Ranged Attacks.`,
		`Botching a Defense roll makes you fall Prone.`,
	]
});
Defense.subrules = [
	ReflexiveDefense
];

const DamageResistance = new Rule({
	id: `c5d2503f-cc78-45c6-3b23-02f4f37d54b9`,
	name: `Damage Resistance`, 
	desc: [
		`Armor's Damage Resistance reduces the Damage inflicted by any individual Attack on that Body Part.`,
		`Reduce a piece of Armor's Damage Resistance by 1 after taking Damage that exceeds its Damage Resistance.`,
	]
});

const FireDamage$1 = new Rule({
	id: `0de26712-9508-40af-262e-b368e9550fa1`,
	name: `Fire Damage`, 
	desc: [
		`Each round you take Fire Damage, 1 point is permanent and never heals.`,
		`Only Fire-Resistant Armor reduces Fire Damage.`,
	]
});

const Pain = new Rule({
	id: `bff6e8fd-de70-4ad6-dd4b-b852400ab3ca`,
	name: `Pain`, 
	desc: [
		`Damage (and a few other effects) cause Pain penalties.`,
		`Each point of Pain is a -1 penalty to all rolls and Speed.`,
		`Pain fades away as Damage heal.`,
		`You fall Prone if your Speed drops to 0 from Pain.`,
	]
});

const Recovery = new Rule({
	id: `a61981e8-36cb-466e-7b3a-0173b19a4c06`,
	name: `Recovery`,
	desc: [
		`After 3 days of rest, you have a chance to recover a little bit, both physically and mentally.`,
		`Roll [Constitution vs total Damage] to heal 1 Health on a random Damaged Body Part.`,
		`Roll [Demeanor vs total Trauma] to heal 1 Trauma.`,
		`On a Fail, you take 1 additional Damage or Trauma, depending on what you were rolling to Recover.`,
	]
});

const Damage = new Rule({
	id: `8fbad46e-af91-424a-28c5-2e8b7ff802bd`,
	name: `Damage`, 
	desc: [
		`Damage temporarily reduces Health.`,
		`When Head or Torso Health drops to 0, you fall unconscious`,
		`When an Arm or a Leg's Health drops to 0, you lose the use of that limb.`,
		`Consciousness and limb functionality are restored once you have healed to at least 1 Health on that Body Part.`,
		`You die when Head or Torso Health drops to the negative of their scores.`,
		`You lose the limb when Arm or Leg Health drops to the negative of their scores.`,
		`Successful Attacks do Damage = [(Attack - Defense) + Weapon Damage].`,
		`Each point of Damage cause a -1 Pain penalty until healed.`,
	]
});
Damage.subrules = [
	DamageResistance,
	FireDamage$1,
	Pain,
	Recovery,
];

var Combat = {
	name: `Combat`,
	list: [
		Rounds,
		Actions,
		Communication,
		Movement,
		Attack,
		Defense,
		Damage,
		// Vehicles,
	]
};

class Table {
	constructor({
		name=``,
		headers=[],
		contents=[],
		widths=[]
	}) {
		this.name = name;
		this.headers = headers;
		this.contents = contents;
		this.widths = widths;
	}
}

const Cover = new Rule({
	id: `9fd0a556-f4c0-4aba-6814-c371f0a8ead0`,
	name: `Cover`, 
	desc: [
		`All Damage is negated against targets that are behind Cover unless the weapon's base Damage exceeds the Material Damage Resistance.`,
		`If the weapon's base Damage is greater than the Material's Damage Resistance, then the Material Damage Resistance acts as Damage Reduction.`,
		`All standard types of Cover except Glass make you Concealed while behind Cover.`,
		`You can lean in and out of Cover to Attack as part of an Action.`,
		`Doing so opens you up to a Called Shot against an exposed Body Part if an opponent is waiting for you to lean out of Cover.`,
	]
});

class CoverType {
	constructor({
		material,
		dr
	}) {
		this.material = material;
		this.dr = dr;
	}
}

Cover.table = new Table({
	name: `Cover Table`,
	headers: [`Material`, `Damage Resistance`],
	contents: [
		new CoverType({ material: 'Drywall', dr: 1 }),
		new CoverType({ material: 'Glass', dr: 1 }),
		new CoverType({ material: 'Plywood', dr: 1 }),
		new CoverType({ material: 'Hardwood', dr: 2 }),
		new CoverType({ material: 'Sheet Metal', dr: 2 }),
		new CoverType({ material: 'Brick', dr: 3 }),
		new CoverType({ material: 'Concrete', dr: 4 }),
		new CoverType({ material: 'Steel', dr: 5 }),
	],
	widths: [50, 50]
});

const FriendlyFire = new Rule({
	id: `63808ef6-3fc3-411c-54c9-edcc41ba8a7b`,
	name: `Friendly Fire`, 
	desc: [
		`-3 Ranged against targets within 1yd of your ally.`,
		`If the Ranged Attack Fails, re-roll the Ranged Attack vs the ally’s Reflexive Dodge.`,
	]
});

const Range = new Rule({
	id: `3bca9734-b437-424e-a1e0-16b4a012af50`,
	name: `Range`, 
	desc: [
		`Ranged Attacks take a -1 penalty per additional Range increment.`,
		`Maximum Range is 10 Range increments.`,
		`Melee Attacks take a modifier against Melee weapons that have a different Range = [your weapon’s Range - enemy weapon’s Range].`,
	]
});

const Visibility = new Rule({
	id: `1ce64fb7-256c-4f7c-1750-81ded2f514e4`,
	name: `Visibility`, 
	desc: [
		`-1 to -6 to all rolls involving seeing, including Attack and Defense.`,
		`A Visibility penalty of -6 imposes the effect of being temporarily Blind.`,
	]
});

var Complications = {
	name: `Complications`,
	list: [
		Cover,
		FriendlyFire,
		Range,
		Visibility,
	]
};

const Difficulty = new Rule({
	id: `cacf928a-d180-4428-c809-233b8776473e`,
	name: `Difficulty`,
	desc: [
		`The Result of your roll must be greater than or equal to the Difficulty number to be a Success.`,
		`If the roll is opposed, re-roll ties.`,
		`Difficulties are indicated by the # symbol.`,
		`The Narrator or an opposing roll sets the # for your rolls.`,
		`3# = Trivial`,
		`6# = Routine`,
		`9# = Challenging`,
		`12# = Really Hard`,
		`15# = Very Unlikely`,
		`18# = Nearly Impossible`,
	]
});

const Cooperation = new Rule({
	id: `d54e8b0e-8f14-4426-a34e-8c889fe15413`,
	name: `Cooperation`,
	desc: [
		`If Characters want to help each other perform a task, one of them makes the roll and the rest add their Scores together as a Modifier to the main Character’s Result.`,
		`The Narrator should use their judgement to determine the time to completion.`,
	]
});

const RoteActions = new Rule({
	id: `b1362980-b2b2-4c4f-870d-d7b2aeda8b47`,
	name: `Rote Actions`,
	desc: [
		`If the roll is unopposed and your [(Score + Modifiers) >= #] before the roll and you can take your time, you Succeed automatically.`,
	]
});

const Success = new Rule({
	id: `2fdf085b-6ec7-4b82-7442-9ecf516664aa`,
	name: `Success`,
	desc: [
		`Your roll is a Success when if the Result is greater than or equal to the Difficulty.`,
		`Re-roll ties on opposed rolls.`,
		`The degree of Success (the amount by which the Result exceeded the Difficulty) is important for some rolls, such as Attacks.`,
	]
});
Success.subrules = [
	RoteActions,
	Cooperation,
];

const Fail = new Rule({
	id: `4e7f6142-a2d0-43ac-cdd9-c1d3147dac69`,
	name: `Fail`,
	desc: [
		`Your roll is a Fail when the Result is less than the Difficulty.`,
	]
});

const Explode = new Rule({
	id: `6da8a818-56c8-417a-2c98-c2f9bbde7aa5`,
	name: `Explode`,
	desc: [
		`An Exploding die offers the possibility of doing extraordinarily well at a Trait, Skill, or Property roll.`,
		`If a 6 is rolled, roll it again and keep rolling as long as the die continues to roll a 6.`,
		`When the die finally stops Exploding, add all of these rolls together, then add scores and modifiers as usual to get your Result.`,
	]
});

const Botch = new Rule({
	id: `9d933f25-f236-4674-7c40-d34764f96f72`,
	name: `Botch`,
	desc: [
		`A Botch is when you have failed very very badly at a Trait, Skill, or Property roll.`,
		`If you roll 1 on a die and that die is not Exploding, re-roll to check for a Botch.`,
		`If a 1 is rolled again, you Botch.`,
		`If any other number is rolled, your d6 roll is counted as a normal 1.`,
		`The Narrator has a great deal of latitude to be creative when determining the effects of Botching under various circumstances, but they should always be fair.`,
		`Whenever a Character Botches, they get +1 XP because we learn the most from our greatest failures.`,
	]
});

var Core = {
	name: `Core`,
	explanation: [
		`To attempt a difficult action, roll one six-sided die (“d6”) to see how well your efforts worked out for you.`,
		`Your Character’s score in a relevant Trait or Skill is added to the d6 roll to improve your chances of succeeding.`,
		`There are many other modifiers that may add or subtract from your result.`,
		`Modifiers are applied by the Narrator.`,
		`The formula for a roll is shown in [brackets].`,
		`Calculate the Result of a d6 roll as follows:`,
		`[d6 Roll + Score ± Modifiers] = Result`,
	],
	list: [
		Difficulty,
		Success,
		Fail,
		Explode,
		Botch,
	]
};

const Block$1 = new Rule({
	id: `af99f6bc-7db2-41ec-b35e-e709bd29d8a1`,
	name: Melee.specs.block.name, 
	desc: Melee.specs.block.desc
});

const Dodge$1 = new Rule({
	id: `dcc3220d-72cd-46b2-991d-a6568f5ccdf9`,
	name: Acrobatics.specs.dodge.name, 
	desc: Acrobatics.specs.dodge.desc
});

const Duck = new Rule({
	id: `cac81a46-c688-4b29-a680-502f827987ed`,
	name: `Duck`, 
	desc: [
		`You may roll [Dodge vs Attack] to move up to your Speed to get behind Cover.`,
		`This is the only way to Dodge a Ranged(Shoot) Attack.`,
		`As part of this Dodge, you may elect to go Prone.`,
		`If the Attack still hits, the Cover Material’s Damage Resistance reduces the Damage.`,
		`You will keep the benefits of Cover as long as it remains between you and the opponent.`,
	]
});

const Hide = new Rule({
	id: `f334f2c5-cc52-4296-b22d-d978f07944d4`,
	name: `Hide`, 
	desc: [
		`Roll [Stealth vs Perception] to be Concealed.`,
		`Your Speed is 0.`,
		`+3 Stealth if Prone.`,
	]
});

const Protect = new Rule({
	id: `a484d274-5d64-46a8-99be-08dda62e541a`,
	name: `Protect`, 
	desc: [
		`You become the new target of all Attacks targeting someone you choose within 1yd of you for 1 round.`,
		`This does not take an Action to declare, but any Defense rolls you make take Actions as usual.`,
	]
});

const Sneak = new Rule({
	id: `30425d94-d8b5-452f-a884-b145f4f4533b`,
	name: `Sneak`, 
	desc: [
		`Roll [Stealth vs Perception] to move Concealed at [Speed / 2].`,
	]
});

var DefensiveManeuvers = [
	Block$1,
	Dodge$1,
	Duck,
	Hide,
	Protect,
	Sneak
];

const Aim = new Rule({
	id: `b203ca75-1dd4-4700-ac94-b2a02bf2988b`,
	name: `Aim`, 
	desc: [
		`Spend an Action to get +3 to your next Attack against a specific target.`,
	],
});

const CalledShot = new Rule({
	id: `7b5ac4ec-c58a-48bd-aaed-c0fbf6716874`,
	name: `Called Shot`, 
	desc: [
		`Attacks target the Torso by default.`,
		`A Called Shot is an Attack targeting the Head, Arms, or Legs with added effects depending on the Body Part.`,
	]
});

class CalledShotTarget {
	constructor({
		roll,
		name,
		penalty,
		effect
	}) {
		this.roll = roll;
		this.name = name;
		this.penalty = penalty;
		this.effect = effect;
	}
}

CalledShot.table = new Table({
	name: `Called Shot Table`,
	headers: [
		`d6`,
		`Part`,
		`Penalty`,
		`Effect`,
	],
	contents: [
		new CalledShotTarget({
			roll: 6,
			name: `Head`,
			penalty: -3,
			health: `Constitution`,
			effect: `Stun 1 round`
		}),
		new CalledShotTarget({
			roll: 5,
			name: `R Arm`,
			penalty: -1,
			effect: `Drop item`
		}),
		new CalledShotTarget({
			roll: 4,
			name: `L Arm`,
			penalty: -1,
			effect: `Drop item`
		}),
		new CalledShotTarget({
			roll: 3,
			name: `Torso`,
			penalty: 0,
			effect: `None`
		}),
		new CalledShotTarget({
			roll: 2,
			name: `L Leg`,
			penalty: -1,
			effect: `Fall Prone`
		}),
		new CalledShotTarget({
			roll: 1,
			name: `R Leg`,
			penalty: -1,
			effect: `Fall Prone`
		}),
	],
	widths: [5, 15, 20, 50]
});

const Disarm = new Rule({
	id: `b4812d24-3b7e-43aa-a2d6-7b734520c5e7`,
	name: `Disarm`, 
	desc: [
		`Roll [Melee vs Melee (+ Constitution if the weapon is used two-handed)].`,
		`The weapon flies d6 yds away in a random direction or the Attacker may choose to grab the weapon if they are Unarmed.`,
	]
});

const Grab = new Rule({
	id: `3b68967f-c8c2-42b1-929f-3796cf7d1cf7`,
	name: `Grab`,
	desc: [
		`Roll [Melee(Unarmed) vs DEF] to impose the 'Grabbed' Status.`,
	]
});

const Hostage = new Rule({
	id: `43e2df6c-320a-404a-9381-52b6a441df44`,
	name: `Hostage`,
	desc: [
		`Use a Grabbed or Restrained enemy as Cover.`,
		`The Grappled enemy's Damage Resistance acts as the Material Damage Resistance and any excess Damage is applied to the Grappled enemy instead of you.`,
		`If the Damage is enough to kill the Grappled enemy, any excess Damage passes through to you.`,
		`This does not make you Concealed.`,
	]
});

const Tackle = new Rule({
	id: `cbc7ab2c-3122-4ab9-b990-c7296e7c66ef`,
	name: `Tackle`,
	desc: [
		`Spend 2 Actions and make a Grapple Attack roll to move up to your Speed and Pin an enemy.`,
		`If you Fail, you go Prone in front of them.`,
	]
});

const Throw = new Rule({
	id: `cd4abf3b-f40f-401e-8824-9a10cce729c9`,
	name: `Throw`,
	desc: [
		`Throw a Grabbed or Restrained enemy up to [Constitution] yds.`,
		`The target takes 1 point of Blunt Damage to a random Body Part and land Prone.`,
	]
});

const Grapple = new Rule({
	id: `974d2b5c-67e0-4e5d-8dd8-883d98a5926e`,
	name: `Grapple`,
	desc: [
		`There are three steps to Grappling:`,
		`1) Grab`,
		`2) Restrain`,
		`3) Pin`,
		`To Grapple an opponent, you must have at least one free hand and make a Melee(Unarmed) Attack roll, which does no Damage.`,
		`With a Successful Grapple roll, that combatant may alter the current Grapple step by 1.`,
		`With each new Grapple roll, the difference between the combatants' results is a modifier to the Attacker's next Grapple roll.`,
		`Each round the Attacker must choose to either spend 1 Action just to retain the Grapple, make another Grapple roll, or let go.`,
		`When the Defender reduces the Grapple step to 0 they escape.`,
	]
});

Grapple.subrules = [
	Grab,
	Hostage, 
	Tackle, 
	Throw
];

const NonLethalForce = new Rule({
	id: `76fb1603-4c1d-4b07-a128-c73927f2f036`,
	name: `Non-Lethal Force`,
	desc: [
		`Declare that you are using this Maneuver before rolling a Melee Attack.`,
		`On a Success, you do half Damage.`,
	]
});

const Push = new Rule({
	id: `d12992e8-2616-45ad-b909-e8315de8d0a9`,
	name: `Push`,
	desc: [
		`Roll [Constitution vs Constitution] to push an enemy in front of you.`,
		`While Pushing, your Speed is equal to the lesser of your normal Speed or your Constitution. No Damage.`,
	]
});

const Reload = new Rule({
	id: `a5e75193-65f5-45ac-92a2-3efac4ab264e`,
	name: `Reload`,
	desc: [
		`Replace a magazine or a single piece of ammunition (depending on the weapon) in a Ranged weapon.`,
	]
});

const Shove = new Rule({
	id: `0c791227-b8d2-42a6-b5c1-b2aedcab0aad`,
	name: `Shove`,
	desc: [
		`Roll [Melee vs Constitution] to shove an enemy up to [Constitution / 2] yds away from you, knocking them Prone. No Damage.`,
	]
});

const Trip = new Rule({
	id: `0f4236ef-ce76-4942-bbb0-f0f6ca5e840e`,
	name: `Trip`,
	desc: [
		`Roll [Melee vs Agility] to knock an enemy Prone. 1 Damage.`,
	]
});

var OffensiveManeuvers = [
	Aim,
	CalledShot,
	Disarm,
	Grapple,
	NonLethalForce,
	Push,
	Reload,
	Shove,
	Trip
];

const Distract = new Rule({
	id: `6fe1552c-4cb6-416f-8691-0cfc0ac39af5`,
	name: `Distract`,
	desc: [
		`Roll [Perform vs Perception].`,
		`Stun target for 1 round.`,
	]
});

const Encourage = new Rule({
	id: `46b57ab5-e31d-4d60-902b-b9f56d95168d`,
	name: `Encourage`,
	desc: [
		`Roll [Leadership vs groups’ total Demeanor scores].`,
		`The group gets a bonus = [your Demeanor] for one specific roll each.`,
		`A Botch is -1 to all rolls.`,
	]
});

const Interrogate = new Rule({
	id: `28849e94-5c31-4b49-a84b-63a1b8cec363`,
	name: `Interrogate`,
	desc: [
		`Roll [Leadership vs Demeanor] to get information out of a subject who does not want to help, but without resorting to violence.`,
		`Each roll takes d6 mins of conversation.`,
		`If the interrogator Succeeds, the subject gives up a fact (wittingly or unwittingly).`,
		`If the subject Succeeds, they become hardened against further questioning, imposing a -1 penalty on subsequent attempts.`,
		`After Fails = [Demeanor], the interrogator gives up or the subject cracks and tells everything they know.`,
	]
});

const Negotiate = new Rule({
	id: `5d88546a-77df-402d-a9b5-bcab8a62fa6c`,
	name: `Negotiate`,
	desc: [
		`If opposed parties are willing to talk out their differences, each side start with a list of demands.`,
		`Roll [Socialize vs Socialize] once per demand.`,
		`Attitude and situational modifiers should be applied by the Narrator.`,
		`Success means you get your demand and the opposed negotiator concedes.`,
		`Either side can choose to concede a demand without rolling. Some desires may be non-negotiable.`,
	]
});

const Recruit = new Rule({
	id: `9599dc01-9940-44d8-ae36-e4623810fe5d`,
	name: `Recruit`,
	desc: [
		`Roll [Socialize vs Demeanor] to convince someone to join your side.`,
		`If they are someone’s follower, roll [Leadership vs Leadership].`,
		`Attitude and other contextual modifiers should be applied at the Narrator's discretion.`,
	]
});

const Taunt = new Rule({
	id: `a00cbcf0-3593-493b-9fd8-575846d182bb`,
	name: `Taunt`,
	desc: [
		`Roll [Leadership vs Demeanor].`,
		`Provoke the enemy into exclusively attacking you.`,
		`The degree of Success is a penalty to the loser’s next roll.`,
		`The enemy is Stunned for 1 round if [penalty > enemy’s Demeanor].`,
	]
});

const Torture = new Rule({
	id: `9da029d0-9c58-4407-812c-396fb59c764b`,
	name: `Torture`,
	desc: [
		`Roll [Medicine vs prisoner’s Constitution] once per hour to cause a captive d6 Pain to soften their resolve without killing them.`,
		`Failure does d6 Damage to the captive.`,
		`Roll [Demeanor vs Demeanor] at the end of each hour (Pain penalty applies).`,
		`Failure causes -1 Psyche loss.`,
		`At 0 Psyche, either the torturer cannot do it anymore and gives up, or the captive is broken and can be controlled with Demeanor Skills automatically until freed.`,
	]
});

var SocialManeuvers = [
	Distract,
	Encourage,
	Interrogate,
	Negotiate,
	Recruit,
	Taunt,
	Torture
];

var Maneuvers = {
	name: `Maneuvers`,
	list: [
		...DefensiveManeuvers,
		...OffensiveManeuvers,
		...SocialManeuvers,
	]
};

const Dehydration = new Rule({
	id: `34974574-6455-4c07-8456-8f7bdc78ec9b`,
	name: `Dehydration`,
	desc: [
		`1 Water per day is required.`,
		`1 Pain per day without Water.`,
		`This penalty is reduced by 1 per day with Water.`,
		`Going without Water for a number of days = [Constitution] is lethal.`,
	]
});

const Exhaustion = new Rule({
	id: `0494a41e-f8f8-45f5-a1ef-5660900e37db`,
	name: `Exhaustion`,
	desc: [
		`8 hours of sleep per day is required.`,
		`1 Pain per day without sufficient sleep.`,
		`Go unconscious for 8 hours after days = [Constitution] without sleep.`,
		`Penalties go away after 8 hours of sleep.`,
	]
});

const Hypothermia = new Rule({
	id: `1625c80c-5630-4f20-b909-ed91dbce371b`,
	name: `Hypothermia`,
	desc: [
		`Warmth is required.`,
		`1 Pain per hour of Hypothermia.`,
		`Reduce penalty by 1 per hour of warmth.`,
		`Hypothermia for hours = [Constitution] is lethal.`,
	]
});

const Starvation = new Rule({
	id: `93f70ef3-b00f-4e52-9e11-5225262b27e4`,
	name: `Starvation`,
	desc: [
		`1 Food per day is required.`,
		`1 Pain per week without Food.`,
		`This penalty is reduced by 1 per day with Food.`,
		`Going without Food for a number of weeks = [Constitution] is lethal.`,
	]
});

var Needs = {
	name: `Needs`,
	explanation: [
		`Take 1 Pain for each unmet requirement over a given period of time.`,
	],
	list: [
		Asphyxiation,
		Dehydration,
		Exhaustion,
		Hypothermia,
		Starvation,
	]
};

const Bleeding = new Rule({
	id: `1a2a047c-128c-4136-ad65-0afd81c9362d`,
	name: `Bleeding`,
	desc: [
		`You begin Bleeding whenever you take Damage that isn't Blunt.`,
		`Bleeding Damage is dealt to the Torso, regardless of which Body Part took the initial Damage.`,
		`If your Torso has positive Health, the rate of Bleeding is 1 Damage per minute.`,
		`If any Body Part drops to 0 or negative Health, the rate of Bleeding is 1 Damage per round.`,
		`A Bleeding person with positive Torso Health can roll Constitution vs total Damage once per minute to stop Bleeding on their own, otherwise the Medicine Skill is required.`,
	]
});

const Burning = new Rule({
	id: `fdd9257e-9937-4786-a6b0-eb77c39ba7f4`,
	name: `Burning`,
	desc: [
		`1 Fire Damage per round.`,
		`It takes a d6 rounds to stop, drop Prone, and roll Survival 6# to put out the flames.`,
	]
});

const Concealed = new Rule({
	id: `56037ac2-9ad0-4097-9cef-621ea8d171e7`,
	name: `Concealed`,
	desc: [
		`If an opponent cannot see you, they are considered to be Blind to you.`,
		`Any Attack they make targeting you is at a -6 penalty.`,
		`Blasts are unaffected by this penalty, though Blast Damage may be negated or reduced if the Concealment is due to Cover.`,
		`Targets are Defenseless against Attacks from Concealed opponents.`,
	]
});

const Deaf = new Rule({
	id: `0a8842eb-6a28-4216-853b-11d6930a9edc`,
	name: `Deaf`,
	desc: [
		`You automatically Fail any roll that involves hearing.`
	]
});

const Defenseless = new Rule({
	id: `62f3017d-c64a-4647-aed4-da944bf52449`,
	name: `Defenseless`,
	desc: [
		`You must use a Reflexive Defense.`,
		`Use your Block score against Melee Attacks and you Dodge score against Ranged Attacks.`,
	]
});

const Falling = new Rule({
	id: `064cb25d-caff-4c33-944a-849604861561`,
	name: `Falling`,
	desc: [
		`1 Blunt Damage per 2yds.`,
		`Each point of Falling Damage is inflicted on a random Body Part.`,
		`Roll [Acrobatics # = yds] as a Defense Action to halve Falling Damage.`,
	]
});

const Grabbed = new Rule({
	id: `fcf2148a-1825-4962-8e88-866e9fbdced4`,
	name: `Grabbed`,
	desc: [
		`A Grabbed opponent is considered to be Immobilized.`,
	]
});

const Harmless = new Rule({
	id: `25b1eaa6-4cfb-46c1-9d69-142209a7a3b0`,
	name: `Harmless`,
	desc: [
		`You cannot Attack.`,
	]
});

const Immobilized = new Rule({
	id: `2e7634cc-4b65-483d-8011-b12d6bee9bd5`,
	name: `Immobilized`,
	desc: [
		`Your Speed is temporarily considered to be 0.`
	]
});

const OffHand = new Rule({
	id: `c3aba659-dd96-4f42-8281-0d13b9c6de2e`,
	name: `Off-Hand`,
	desc: [
		`-3 penalty to Attack with your Off-Hand.`,
	]
});

const Pinned = new Rule({
	id: `d2e8c636-d853-4fa2-a0dd-2dad409ba5fc`,
	name: `Pinned`,
	desc: [
		`Pinned is the third and final step of Grappling.`,
		`While Pinned, you are considered to be Defenseless, Harmless, Immobilized, and Prone.`,
		`The Attacker is also considered to be Immobilized and Prone.`,
	]
});

const Prone = new Rule({
	id: `687fbf28-8198-4363-bea5-61d56f878c23`,
	name: `Prone`,
	desc: [
		`You may drop Prone at any time for free on your turn or as part of a Dodge action.`,
		`Standing up takes 1 Action.`,
		`The benefits of being Prone are that you get +3 Ranged and +3 Stealth, and attackers take a -3 Ranged penalty to hit you.`,
		`The drawbacks of being Prone are that your Speed drops to 1yrd and attackers get a +3 Melee bonus to hit you.`,
	]
});

const Restrained = new Rule({
	id: `a836f410-b9ef-4b32-a753-8b732b8e4b11`,
	name: `Restrained`,
	desc: [
		`Restrained is the second step of Grappling.`,
		`While Restrained, you are considered to be Harmless and Immobilized.`,
	]
});

const Unarmed = new Rule({
	id: `f37ac524-e26b-49b0-a3e7-5d01a50c5693`,
	name: `Unarmed`,
	desc: [
		`Successful Unarmed Attacks do Damage = [(Attack - Defense) / 2] (always round down).`,
		`Damage Resistance is not depleted.`,
	]
});

const Unconscious = new Rule({
	id: `0f336152-640e-40b9-bd40-5a717ba9b61c`,
	name: `Unconscious`,
	desc: [
		`Unaware and unable to do anything.`,
		`You are considered to be Blind, Harmless, Immobilized, Prone, and have a Reflexive Defense of 0.`,
	]
});

const Unstable = new Rule({
	id: `c1da7d28-31a8-468c-a454-157fe3addb62`,
	name: `Unstable`,
	desc: [
		`-3 penalty to Agility or Constitution Skill rolls.`,
		`Ranged Attacks targeting you take a -3 penalty.`,
	]
});

var Status = {
	name: `Status`,
	list: [
		Bleeding,
		Blind,
		Burning,
		Concealed,
		Deaf,
		Defenseless,
		Falling,
		Grabbed,
		Harmless,
		Immobilized,
		OffHand,
		Pinned,
		Prone,
		Restrained,
		Stun,
		Unarmed,
		Unconscious,
		Unstable,
	]
};

var Manual = [
    Abilities$1,
    Combat,
    Complications,
    Core,
    GearList,
    Maneuvers,
    Needs,
    Properties,
    Skills,
    Status,
    Traits
];

/* src/components/views/manual/ManualRuleDescription.svelte generated by Svelte v3.29.4 */

const css$t = {
	code: "p.svelte-14srqf2{padding-bottom:var(--s100)}.bold.svelte-14srqf2{font-weight:bold}",
	map: "{\"version\":3,\"file\":\"ManualRuleDescription.svelte\",\"sources\":[\"ManualRuleDescription.svelte\"],\"sourcesContent\":[\"<script>\\n    import Ability from 'abilities/Ability.js'\\n\\n    export let rule\\n</script>\\n\\n\\n<div class='desc-section'>\\n    {#each rule.desc as desc}\\n        <p>{desc}</p>\\n    {/each}\\n    {#if rule instanceof Ability}\\n        <p><span class='bold'>Max:</span> {rule.max}</p>\\n        <p><span class='bold'>XP:</span> {rule.xp}</p>\\n    {/if}\\n</div>\\n\\n\\n<style>\\n    p {\\n\\t\\tpadding-bottom: var(--s100);\\n\\t}\\n    .bold {\\n\\t\\tfont-weight: bold;\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AAmBI,CAAC,eAAC,CAAC,AACL,cAAc,CAAE,IAAI,MAAM,CAAC,AAC5B,CAAC,AACE,KAAK,eAAC,CAAC,AACT,WAAW,CAAE,IAAI,AAClB,CAAC\"}"
};

const ManualRuleDescription = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { rule } = $$props;
	if ($$props.rule === void 0 && $$bindings.rule && rule !== void 0) $$bindings.rule(rule);
	$$result.css.add(css$t);

	return `<div class="${"desc-section"}">${each(rule.desc, desc => `<p class="${"svelte-14srqf2"}">${escape(desc)}</p>`)}
    ${rule instanceof Ability
	? `<p class="${"svelte-14srqf2"}"><span class="${"bold svelte-14srqf2"}">Max:</span> ${escape(rule.max)}</p>
        <p class="${"svelte-14srqf2"}"><span class="${"bold svelte-14srqf2"}">XP:</span> ${escape(rule.xp)}</p>`
	: ``}
</div>`;
});

/* src/components/views/manual/ManualRuleSpecialization.svelte generated by Svelte v3.29.4 */

const css$u = {
	code: ".spec-desc.svelte-14xk3cs{margin-bottom:var(--s100)}",
	map: "{\"version\":3,\"file\":\"ManualRuleSpecialization.svelte\",\"sources\":[\"ManualRuleSpecialization.svelte\"],\"sourcesContent\":[\"<script>\\n    export let rule\\n</script>\\n\\n\\n<ul>\\n    {#each Object.values(rule.specs) as spec}\\n        <li>\\n            <div class='sub-name'>{spec.name}</div>\\n            {#each spec.desc as spec_desc}\\n                <p class='spec-desc'>{spec_desc}</p>\\n            {/each}\\n        </li>\\n    {/each}\\n</ul>\\n\\n\\n<style>\\n    .spec-desc {\\n\\t\\tmargin-bottom: var(--s100);\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AAkBI,UAAU,eAAC,CAAC,AACd,aAAa,CAAE,IAAI,MAAM,CAAC,AAC3B,CAAC\"}"
};

const ManualRuleSpecialization = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { rule } = $$props;
	if ($$props.rule === void 0 && $$bindings.rule && rule !== void 0) $$bindings.rule(rule);
	$$result.css.add(css$u);

	return `<ul>${each(Object.values(rule.specs), spec => `<li><div class="${"sub-name"}">${escape(spec.name)}</div>
            ${each(spec.desc, spec_desc => `<p class="${"spec-desc svelte-14xk3cs"}">${escape(spec_desc)}</p>`)}
        </li>`)}
</ul>`;
});

/* src/components/views/manual/ManualRuleTable.svelte generated by Svelte v3.29.4 */

const css$v = {
	code: ".rule-table.svelte-1vpg0vt{margin:var(--s100)}.table-header.svelte-1vpg0vt{font-weight:bold;text-align:center}tr.svelte-1vpg0vt{display:flex;width:100%}table.svelte-1vpg0vt{width:100%}",
	map: "{\"version\":3,\"file\":\"ManualRuleTable.svelte\",\"sources\":[\"ManualRuleTable.svelte\"],\"sourcesContent\":[\"<script>\\n    export let rule\\n</script>\\n\\n\\n<div class='rule-table'>\\n    <table>\\n        <tr class='table-header'>\\n            {#each rule.table.headers as h, i}\\n                <td style='max-width: {rule.table.widths[i]}%; width: {rule.table.widths[i]}%;'>{h}</td>\\n            {/each}\\n        </tr>\\n        {#each rule.table.contents as c, i}\\n            <tr>\\n            {#each Object.values(c) as c, i}\\n                <td style='max-width: {rule.table.widths[i]}%; width: {rule.table.widths[i]}%;'>{c}</td>\\n            {/each}\\n            </tr>\\n        {/each}\\n    </table>\\n</div>\\n\\n\\n<style>\\n    .rule-table {\\n\\t\\tmargin: var(--s100);\\n\\t}\\n\\t.table-header {\\n\\t\\tfont-weight: bold;\\n\\t\\ttext-align: center;\\n\\t}\\n\\ttr {\\n\\t\\tdisplay: flex;\\n\\t\\twidth: 100%;\\n\\t}\\n\\ttable {\\n\\t\\twidth: 100%;\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AAwBI,WAAW,eAAC,CAAC,AACf,MAAM,CAAE,IAAI,MAAM,CAAC,AACpB,CAAC,AACD,aAAa,eAAC,CAAC,AACd,WAAW,CAAE,IAAI,CACjB,UAAU,CAAE,MAAM,AACnB,CAAC,AACD,EAAE,eAAC,CAAC,AACH,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IAAI,AACZ,CAAC,AACD,KAAK,eAAC,CAAC,AACN,KAAK,CAAE,IAAI,AACZ,CAAC\"}"
};

const ManualRuleTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { rule } = $$props;
	if ($$props.rule === void 0 && $$bindings.rule && rule !== void 0) $$bindings.rule(rule);
	$$result.css.add(css$v);

	return `<div class="${"rule-table svelte-1vpg0vt"}"><table class="${"svelte-1vpg0vt"}"><tr class="${"table-header svelte-1vpg0vt"}">${each(rule.table.headers, (h, i) => `<td style="${"max-width: " + escape(rule.table.widths[i]) + "%; width: " + escape(rule.table.widths[i]) + "%;"}">${escape(h)}</td>`)}</tr>
        ${each(rule.table.contents, (c, i) => `<tr class="${"svelte-1vpg0vt"}">${each(Object.values(c), (c, i) => `<td style="${"max-width: " + escape(rule.table.widths[i]) + "%; width: " + escape(rule.table.widths[i]) + "%;"}">${escape(c)}</td>`)}
            </tr>`)}</table>
</div>`;
});

/* src/components/views/manual/ManualSubRule.svelte generated by Svelte v3.29.4 */

const css$w = {
	code: ".subrule-details.svelte-jjci4r{margin-bottom:var(--s100)}.sub-name.svelte-jjci4r{font-weight:bold}.subrule-body.svelte-jjci4r{padding:var(--s100)}",
	map: "{\"version\":3,\"file\":\"ManualSubRule.svelte\",\"sources\":[\"ManualSubRule.svelte\"],\"sourcesContent\":[\"<script>\\n    export let subrule\\n</script>\\n\\n\\n<details class='subrule-details'>\\n\\t<summary class='sub-name'>{subrule.name}</summary>\\n\\t<div class='subrule-body'>\\n\\t\\t{#each subrule.desc as sub_desc}\\n\\t\\t\\t<p>{sub_desc}</p>\\n\\t\\t{/each}\\n\\t</div>\\n</details>\\n\\n\\n<style>\\n    .subrule-details {\\n\\t\\tmargin-bottom: var(--s100);\\n\\t}\\n\\t.sub-name {\\n\\t\\tfont-weight: bold;\\n\\t}\\n\\t.subrule-body {\\n\\t\\tpadding: var(--s100);\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AAgBI,gBAAgB,cAAC,CAAC,AACpB,aAAa,CAAE,IAAI,MAAM,CAAC,AAC3B,CAAC,AACD,SAAS,cAAC,CAAC,AACV,WAAW,CAAE,IAAI,AAClB,CAAC,AACD,aAAa,cAAC,CAAC,AACd,OAAO,CAAE,IAAI,MAAM,CAAC,AACrB,CAAC\"}"
};

const ManualSubRule = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { subrule } = $$props;
	if ($$props.subrule === void 0 && $$bindings.subrule && subrule !== void 0) $$bindings.subrule(subrule);
	$$result.css.add(css$w);

	return `<details class="${"subrule-details svelte-jjci4r"}"><summary class="${"sub-name svelte-jjci4r"}">${escape(subrule.name)}</summary>
	<div class="${"subrule-body svelte-jjci4r"}">${each(subrule.desc, sub_desc => `<p>${escape(sub_desc)}</p>`)}</div>
</details>`;
});

/* src/components/views/manual/ManualRule.svelte generated by Svelte v3.29.4 */

const css$x = {
	code: ".rule-ref.svelte-x1sr8f{margin-bottom:var(--s200);width:100%}@media only screen and (min-width: 650px){.rule-ref.svelte-x1sr8f{margin-left:auto;margin-right:auto;max-width:80%}}.rule-body.svelte-x1sr8f{padding:var(--s100)}.gear-rule.svelte-x1sr8f{margin:var(--s100)}",
	map: "{\"version\":3,\"file\":\"ManualRule.svelte\",\"sources\":[\"ManualRule.svelte\"],\"sourcesContent\":[\"<script>\\n    import Gear from 'gear/Gear.js'\\n    import GearBlock from 'views/widgets/GearBlock.svelte'\\n    import ManualRuleDescription from 'views/manual/ManualRuleDescription.svelte'\\n    import ManualRuleSpecialization from 'views/manual/ManualRuleSpecialization.svelte'\\n    import ManualRuleTable from 'views/manual/ManualRuleTable.svelte'\\n    import ManualSubRule from 'views/manual/ManualSubRule.svelte'\\n\\n    export let rule\\n</script>\\n\\n\\n<details class='rule-ref' bind:open={rule.visible}>\\n    <summary>\\n        {rule.name}\\n    </summary>\\n    <div class='rule-body'>\\n        {#if rule instanceof Gear }\\n            <div class='gear-rule'>\\n                <GearBlock item={rule} mode={'manual'} />\\n            </div>\\n        {/if}\\n        {#if rule.desc != undefined}\\n            <ManualRuleDescription {rule} />\\n        {/if}\\n        {#if rule.subrules}\\n            {#each rule.subrules as subrule}\\n                <ManualSubRule {subrule} />\\n            {/each}\\n        {/if}\\n        {#if rule.table != undefined}\\n            <ManualRuleTable {rule} />\\n        {/if}\\n        {#if rule.specs}\\n            <ManualRuleSpecialization {rule} />\\n        {/if}\\n    </div>\\n</details>\\n\\n\\n<style>\\n    .rule-ref {\\n\\t\\tmargin-bottom: var(--s200);\\n\\t\\twidth: 100%;\\n\\t}\\n\\t@media only screen and (min-width: 650px) {\\n\\t\\t.rule-ref {\\n\\t\\t\\tmargin-left: auto;\\n\\t\\t\\tmargin-right: auto;\\n\\t\\t\\tmax-width: 80%;\\n\\t\\t}\\n\\t}\\n\\t\\t.rule-body {\\n\\t\\t\\tpadding: var(--s100);\\n\\t\\t}\\n\\t\\t\\t.gear-rule {\\n\\t\\t\\t\\tmargin: var(--s100);\\n\\t\\t\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AAyCI,SAAS,cAAC,CAAC,AACb,aAAa,CAAE,IAAI,MAAM,CAAC,CAC1B,KAAK,CAAE,IAAI,AACZ,CAAC,AACD,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1C,SAAS,cAAC,CAAC,AACV,WAAW,CAAE,IAAI,CACjB,YAAY,CAAE,IAAI,CAClB,SAAS,CAAE,GAAG,AACf,CAAC,AACF,CAAC,AACA,UAAU,cAAC,CAAC,AACX,OAAO,CAAE,IAAI,MAAM,CAAC,AACrB,CAAC,AACA,UAAU,cAAC,CAAC,AACX,MAAM,CAAE,IAAI,MAAM,CAAC,AACpB,CAAC\"}"
};

const ManualRule = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { rule } = $$props;
	if ($$props.rule === void 0 && $$bindings.rule && rule !== void 0) $$bindings.rule(rule);
	$$result.css.add(css$x);

	return `<details class="${"rule-ref svelte-x1sr8f"}"${add_attribute("open", rule.visible, 1)}><summary>${escape(rule.name)}</summary>
    <div class="${"rule-body svelte-x1sr8f"}">${rule instanceof Gear
	? `<div class="${"gear-rule svelte-x1sr8f"}">${validate_component(GearBlock, "GearBlock").$$render($$result, { item: rule, mode: "manual" }, {}, {})}</div>`
	: ``}
        ${rule.desc != undefined
	? `${validate_component(ManualRuleDescription, "ManualRuleDescription").$$render($$result, { rule }, {}, {})}`
	: ``}
        ${rule.subrules
	? `${each(rule.subrules, subrule => `${validate_component(ManualSubRule, "ManualSubRule").$$render($$result, { subrule }, {}, {})}`)}`
	: ``}
        ${rule.table != undefined
	? `${validate_component(ManualRuleTable, "ManualRuleTable").$$render($$result, { rule }, {}, {})}`
	: ``}
        ${rule.specs
	? `${validate_component(ManualRuleSpecialization, "ManualRuleSpecialization").$$render($$result, { rule }, {}, {})}`
	: ``}</div>
</details>`;
});

/* src/routes/manual/manual.svelte generated by Svelte v3.29.4 */

const css$y = {
	code: ".manual-header-section.svelte-ay58r9{align-items:center;background-color:rgb(15, 30, 15);border:1px solid lime;display:flex;height:var(--s300);justify-content:space-around;left:0;position:fixed;right:0;top:var(--s350);z-index:1}.rules-name.svelte-ay58r9{font-size:var(--s150);font-weight:bold}.search-bar.svelte-ay58r9{min-width:100px;padding:var(--s25) var(--s100);text-align:left;width:45%}.manual-page-body.svelte-ay58r9{position:absolute;top:var(--s300);left:0;right:0;padding:var(--s200);margin-bottom:var(--s150);margin-top:var(--s50)}.rule-body-section.svelte-ay58r9{align-items:center;display:flex;flex-direction:column;justify-content:space-around}.no-results.svelte-ay58r9{padding-left:10vw;padding-top:2vh}",
	map: "{\"version\":3,\"file\":\"manual.svelte\",\"sources\":[\"manual.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport BackButton from 'views/widgets/BackButton.svelte'\\n\\timport Manual from 'rules/lists/Manual.js'\\n\\timport ManualRule from 'views/manual/ManualRule.svelte'\\n\\n\\tlet masterRulesList = []\\n\\n\\tmasterRulesList = Manual.map(r => [...r.list]).flat()\\n\\n\\tlet ruleList = masterRulesList\\n\\n\\t$: searchTerm = ''\\n\\n\\t$: if (searchTerm.length) {\\n\\t\\truleList = masterRulesList.filter(r => {\\n\\t\\t\\treturn r.name.toLocaleLowerCase()\\n\\t\\t\\t\\t\\t\\t.startsWith(searchTerm.toLocaleLowerCase())\\n\\t\\t})\\n\\t\\tif (!ruleList.length) {\\n\\t\\t\\truleList = masterRulesList.filter(r => {\\n\\t\\t\\t\\treturn r.name.toLocaleLowerCase()\\n\\t\\t\\t\\t\\t\\t\\t.includes(searchTerm.toLocaleLowerCase())\\n\\t\\t\\t})\\n\\t\\t}\\n\\t} else {\\n\\t\\truleList = masterRulesList\\n\\t}\\n</script>\\n\\n\\n<svelte:head>\\n\\t<title>Apocalyptia Online - Manual</title>\\n</svelte:head>\\n<div class='manual-header-section'>\\n\\t<div class='rules-name'>Manual</div>\\n\\t<input type='text'\\n\\t\\tclass='search-bar'\\n\\t\\tplaceholder='Search'\\n\\t\\tbind:value='{searchTerm}'\\n\\t/>\\n</div>\\n<div class='manual-page-body'>\\n\\t{#if searchTerm === ''}\\n\\t\\t{#each Manual as chapter}\\n\\t\\t\\t<a href={`/manual/${chapter.name.toLowerCase()}`}\\n\\t\\t\\t\\tclass='link-btn menu-btn'\\n\\t\\t\\t>\\n\\t\\t\\t\\t{chapter.name}\\n\\t\\t\\t</a>\\n\\t\\t{/each}\\n\\t{:else}\\n\\t\\t{#if ruleList.length}\\n\\t\\t\\t<div class='rule-body-section'>\\n\\t\\t\\t\\t{#each ruleList as rule}\\n\\t\\t\\t\\t\\t<ManualRule {rule} />\\n\\t\\t\\t\\t{/each}\\n\\t\\t\\t</div>\\n\\t\\t{:else}\\n\\t\\t\\t<div class='no-results'>\\n\\t\\t\\t\\t<p>No results.</p>\\n\\t\\t\\t</div>\\n\\t\\t{/if}\\n\\t{/if}\\n</div>\\n<BackButton path={'/'} />\\n\\n\\n<style>\\n\\t.manual-header-section {\\n\\t\\talign-items: center;\\n\\t\\tbackground-color: rgb(15, 30, 15);\\n\\t\\tborder: 1px solid lime;\\n\\t\\tdisplay: flex;\\n\\t\\theight: var(--s300);\\n\\t\\tjustify-content: space-around;\\n\\t\\tleft: 0;\\n\\t\\tposition: fixed;\\n\\t\\tright: 0;\\n\\t\\ttop: var(--s350);\\n\\t\\tz-index: 1;\\n\\t}\\n\\t\\t.rules-name {\\n\\t\\t\\tfont-size: var(--s150);\\n\\t\\t\\tfont-weight: bold;\\n\\t\\t}\\n\\t\\t.search-bar {\\n\\t\\t\\tmin-width: 100px;\\n\\t\\t\\tpadding: var(--s25) var(--s100);\\n\\t\\t\\ttext-align: left;\\n\\t\\t\\twidth: 45%;\\n\\t\\t}\\n\\n\\t.manual-page-body {\\n\\t\\tposition: absolute;\\n\\t\\ttop: var(--s300);\\n\\t\\tleft: 0;\\n\\t\\tright: 0;\\n\\t\\tpadding: var(--s200);\\n\\t\\tmargin-bottom: var(--s150);\\n\\t\\tmargin-top: var(--s50);\\n\\t}\\n\\t\\t.rule-body-section {\\n\\t\\t\\talign-items: center;\\n\\t\\t\\tdisplay: flex;\\n\\t\\t\\tflex-direction: column;\\n\\t\\t\\tjustify-content: space-around;\\n\\t\\t}\\n\\t\\t.no-results {\\n\\t\\t\\tpadding-left: 10vw;\\n\\t\\t\\tpadding-top: 2vh;\\n\\t\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AAoEC,sBAAsB,cAAC,CAAC,AACvB,WAAW,CAAE,MAAM,CACnB,gBAAgB,CAAE,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CACjC,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CACtB,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,MAAM,CAAC,CACnB,eAAe,CAAE,YAAY,CAC7B,IAAI,CAAE,CAAC,CACP,QAAQ,CAAE,KAAK,CACf,KAAK,CAAE,CAAC,CACR,GAAG,CAAE,IAAI,MAAM,CAAC,CAChB,OAAO,CAAE,CAAC,AACX,CAAC,AACA,WAAW,cAAC,CAAC,AACZ,SAAS,CAAE,IAAI,MAAM,CAAC,CACtB,WAAW,CAAE,IAAI,AAClB,CAAC,AACD,WAAW,cAAC,CAAC,AACZ,SAAS,CAAE,KAAK,CAChB,OAAO,CAAE,IAAI,KAAK,CAAC,CAAC,IAAI,MAAM,CAAC,CAC/B,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,GAAG,AACX,CAAC,AAEF,iBAAiB,cAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,IAAI,MAAM,CAAC,CAChB,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,CACR,OAAO,CAAE,IAAI,MAAM,CAAC,CACpB,aAAa,CAAE,IAAI,MAAM,CAAC,CAC1B,UAAU,CAAE,IAAI,KAAK,CAAC,AACvB,CAAC,AACA,kBAAkB,cAAC,CAAC,AACnB,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,YAAY,AAC9B,CAAC,AACD,WAAW,cAAC,CAAC,AACZ,YAAY,CAAE,IAAI,CAClB,WAAW,CAAE,GAAG,AACjB,CAAC\"}"
};

const Manual_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let masterRulesList = [];
	masterRulesList = Manual.map(r => [...r.list]).flat();
	let ruleList = masterRulesList;
	$$result.css.add(css$y);
	let searchTerm;
	searchTerm = "";

	 {
		if (searchTerm.length) {
			ruleList = masterRulesList.filter(r => {
				return r.name.toLocaleLowerCase().startsWith(searchTerm.toLocaleLowerCase());
			});

			if (!ruleList.length) {
				ruleList = masterRulesList.filter(r => {
					return r.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
				});
			}
		} else {
			ruleList = masterRulesList;
		}
	}

	return `${($$result.head += `${($$result.title = `<title>Apocalyptia Online - Manual</title>`, "")}`, "")}
<div class="${"manual-header-section svelte-ay58r9"}"><div class="${"rules-name svelte-ay58r9"}">Manual</div>
	<input type="${"text"}" class="${"search-bar svelte-ay58r9"}" placeholder="${"Search"}"${add_attribute("value", searchTerm, 1)}></div>
<div class="${"manual-page-body svelte-ay58r9"}">${searchTerm === ""
	? `${each(Manual, chapter => `<a${add_attribute("href", `/manual/${chapter.name.toLowerCase()}`, 0)} class="${"link-btn menu-btn"}">${escape(chapter.name)}
			</a>`)}`
	: `${ruleList.length
		? `<div class="${"rule-body-section svelte-ay58r9"}">${each(ruleList, rule => `${validate_component(ManualRule, "ManualRule").$$render($$result, { rule }, {}, {})}`)}</div>`
		: `<div class="${"no-results svelte-ay58r9"}"><p>No results.</p></div>`}`}</div>
${validate_component(BackButton, "BackButton").$$render($$result, { path: "/" }, {}, {})}`;
});

var component_13 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Manual_1
});

/* src/routes/manual/[chapter].svelte generated by Svelte v3.29.4 */

const css$z = {
	code: ".manual-header-section.svelte-ay58r9{align-items:center;background-color:rgb(15, 30, 15);border:1px solid lime;display:flex;height:var(--s300);justify-content:space-around;left:0;position:fixed;right:0;top:var(--s350);z-index:1}.rules-name.svelte-ay58r9{font-size:var(--s150);font-weight:bold}.search-bar.svelte-ay58r9{min-width:100px;padding:var(--s25) var(--s100);text-align:left;width:45%}.manual-page-body.svelte-ay58r9{position:absolute;top:var(--s300);left:0;right:0;padding:var(--s200);margin-bottom:var(--s150);margin-top:var(--s50)}.rule-body-section.svelte-ay58r9{align-items:center;display:flex;flex-direction:column;justify-content:space-around}.no-results.svelte-ay58r9{padding-left:10vw;padding-top:2vh}",
	map: "{\"version\":3,\"file\":\"[chapter].svelte\",\"sources\":[\"[chapter].svelte\"],\"sourcesContent\":[\"<script>\\n\\timport BackButton from 'views/widgets/BackButton.svelte'\\n\\timport Manual from 'rules/lists/Manual.js'\\n\\timport ManualRule from 'views/manual/ManualRule.svelte'\\n\\n\\texport let params\\n\\n\\tconst chapterObject = Manual.filter(r => r.name.toLocaleLowerCase() == params)[0]\\n\\n\\tconst chapterRulesList = chapterObject.list.sort((a, b) => (a.name > b.name)).flat()\\n\\n\\tconst chapter = chapterObject.name\\n\\n\\tlet ruleList = chapterRulesList\\n\\n\\t$: searchTerm = ''\\n\\n\\t$: if (searchTerm.length) {\\n\\t\\truleList = chapterRulesList.filter(r => {\\n\\t\\t\\treturn r.name.toLocaleLowerCase()\\n\\t\\t\\t\\t\\t\\t.startsWith(searchTerm.toLocaleLowerCase())\\n\\t\\t})\\n\\t\\tif (!ruleList.length) {\\n\\t\\t\\truleList = chapterRulesList.filter(r => {\\n\\t\\t\\t\\treturn r.name.toLocaleLowerCase()\\n\\t\\t\\t\\t\\t\\t\\t.includes(searchTerm.toLocaleLowerCase())\\n\\t\\t\\t})\\n\\t\\t}\\n\\t} else {\\n\\t\\truleList = chapterRulesList\\n\\t}\\n</script>\\n\\n\\n<svelte:head>\\n\\t<title>Apocalyptia Online - Manual - {chapter}</title>\\n</svelte:head>\\n<div class='manual-header-section'>\\n\\t<div class='rules-name'>{chapter}</div>\\n\\t<input type='text'\\n\\t\\tclass='search-bar'\\n\\t\\tplaceholder='Search'\\n\\t\\tbind:value='{searchTerm}'\\n\\t/>\\n</div>\\n<div class='manual-page-body'>\\n\\t{#if ruleList.length}\\n\\t\\t<div class='rule-body-section'>\\n\\t\\t\\t{#each ruleList as rule}\\n\\t\\t\\t\\t<ManualRule {rule} />\\n\\t\\t\\t{/each}\\n\\t\\t</div>\\n\\t{:else}\\n\\t\\t<div class='no-results'>\\n\\t\\t\\t<p>No results.</p>\\n\\t\\t</div>\\n\\t{/if}\\n</div>\\n<BackButton path={'/manual'} />\\n\\n\\n<style>\\n\\t.manual-header-section {\\n\\t\\talign-items: center;\\n\\t\\tbackground-color: rgb(15, 30, 15);\\n\\t\\tborder: 1px solid lime;\\n\\t\\tdisplay: flex;\\n\\t\\theight: var(--s300);\\n\\t\\tjustify-content: space-around;\\n\\t\\tleft: 0;\\n\\t\\tposition: fixed;\\n\\t\\tright: 0;\\n\\t\\ttop: var(--s350);\\n\\t\\tz-index: 1;\\n\\t}\\n\\t\\t.rules-name {\\n\\t\\t\\tfont-size: var(--s150);\\n\\t\\t\\tfont-weight: bold;\\n\\t\\t}\\n\\t\\t.search-bar {\\n\\t\\t\\tmin-width: 100px;\\n\\t\\t\\tpadding: var(--s25) var(--s100);\\n\\t\\t\\ttext-align: left;\\n\\t\\t\\twidth: 45%;\\n\\t\\t}\\n\\n\\t.manual-page-body {\\n\\t\\tposition: absolute;\\n\\t\\ttop: var(--s300);\\n\\t\\tleft: 0;\\n\\t\\tright: 0;\\n\\t\\tpadding: var(--s200);\\n\\t\\tmargin-bottom: var(--s150);\\n\\t\\tmargin-top: var(--s50);\\n\\t}\\n\\t\\t.rule-body-section {\\n\\t\\t\\talign-items: center;\\n\\t\\t\\tdisplay: flex;\\n\\t\\t\\tflex-direction: column;\\n\\t\\t\\tjustify-content: space-around;\\n\\t\\t}\\n\\t\\t.no-results {\\n\\t\\t\\tpadding-left: 10vw;\\n\\t\\t\\tpadding-top: 2vh;\\n\\t\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AA8DC,sBAAsB,cAAC,CAAC,AACvB,WAAW,CAAE,MAAM,CACnB,gBAAgB,CAAE,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CACjC,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CACtB,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,MAAM,CAAC,CACnB,eAAe,CAAE,YAAY,CAC7B,IAAI,CAAE,CAAC,CACP,QAAQ,CAAE,KAAK,CACf,KAAK,CAAE,CAAC,CACR,GAAG,CAAE,IAAI,MAAM,CAAC,CAChB,OAAO,CAAE,CAAC,AACX,CAAC,AACA,WAAW,cAAC,CAAC,AACZ,SAAS,CAAE,IAAI,MAAM,CAAC,CACtB,WAAW,CAAE,IAAI,AAClB,CAAC,AACD,WAAW,cAAC,CAAC,AACZ,SAAS,CAAE,KAAK,CAChB,OAAO,CAAE,IAAI,KAAK,CAAC,CAAC,IAAI,MAAM,CAAC,CAC/B,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,GAAG,AACX,CAAC,AAEF,iBAAiB,cAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,IAAI,MAAM,CAAC,CAChB,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,CACR,OAAO,CAAE,IAAI,MAAM,CAAC,CACpB,aAAa,CAAE,IAAI,MAAM,CAAC,CAC1B,UAAU,CAAE,IAAI,KAAK,CAAC,AACvB,CAAC,AACA,kBAAkB,cAAC,CAAC,AACnB,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,YAAY,AAC9B,CAAC,AACD,WAAW,cAAC,CAAC,AACZ,YAAY,CAAE,IAAI,CAClB,WAAW,CAAE,GAAG,AACjB,CAAC\"}"
};

const U5Bchapteru5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { params } = $$props;
	const chapterObject = Manual.filter(r => r.name.toLocaleLowerCase() == params)[0];
	const chapterRulesList = chapterObject.list.sort((a, b) => a.name > b.name).flat();
	const chapter = chapterObject.name;
	let ruleList = chapterRulesList;
	if ($$props.params === void 0 && $$bindings.params && params !== void 0) $$bindings.params(params);
	$$result.css.add(css$z);
	let searchTerm;
	searchTerm = "";

	 {
		if (searchTerm.length) {
			ruleList = chapterRulesList.filter(r => {
				return r.name.toLocaleLowerCase().startsWith(searchTerm.toLocaleLowerCase());
			});

			if (!ruleList.length) {
				ruleList = chapterRulesList.filter(r => {
					return r.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
				});
			}
		} else {
			ruleList = chapterRulesList;
		}
	}

	return `${($$result.head += `${($$result.title = `<title>Apocalyptia Online - Manual - ${escape(chapter)}</title>`, "")}`, "")}
<div class="${"manual-header-section svelte-ay58r9"}"><div class="${"rules-name svelte-ay58r9"}">${escape(chapter)}</div>
	<input type="${"text"}" class="${"search-bar svelte-ay58r9"}" placeholder="${"Search"}"${add_attribute("value", searchTerm, 1)}></div>
<div class="${"manual-page-body svelte-ay58r9"}">${ruleList.length
	? `<div class="${"rule-body-section svelte-ay58r9"}">${each(ruleList, rule => `${validate_component(ManualRule, "ManualRule").$$render($$result, { rule }, {}, {})}`)}</div>`
	: `<div class="${"no-results svelte-ay58r9"}"><p>No results.</p></div>`}</div>
${validate_component(BackButton, "BackButton").$$render($$result, { path: "/manual" }, {}, {})}`;
});

var component_14 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': U5Bchapteru5D
});

/* src/routes/signup/index.svelte generated by Svelte v3.29.4 */

const Signup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	const user = { email: ``, password: ``, confirm: `` };
	// 	.catch(e => {
	// 		pendingApiCall = false
	// 		alert(e)

	return `${($$result.head += `${($$result.title = `<title>Apocalyptia Online - Signup</title>`, "")}`, "")}
<div class="${"cntr-card"}">${ `<form><input type="${"email"}" required autocomplete="${"email"}" placeholder="${"Email"}"${add_attribute("value", user.email, 1)}>
			<input type="${"password"}" required placeholder="${"Password"}"${add_attribute("value", user.password, 1)}>
			<input type="${"password"}" required placeholder="${"Confirm Password"}"${add_attribute("value", user.confirm, 1)}>
			${ ``}
			${ `<input type="${"submit"}" class="${"link-btn"}" value="${"Creat Account"}" ${ ""}>`
		}</form>`}</div>`;
});

var component_15 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Signup
});

/* src/routes/login/index.svelte generated by Svelte v3.29.4 */

const Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	if (userStore) goto(`/`);
	const user = { email: ``, password: `` };
	// 	.catch(_ => {
	// 		pendingApiCall = false
	// 		forgotPassword = true

	return `${($$result.head += `${($$result.title = `<title>Apocalyptia Online - Login</title>`, "")}`, "")}
<div class="${"cntr-card"}">${ `<form><input type="${"email"}" required autocomplete="${"email"}" placeholder="${"Email"}"${add_attribute("value", user.email, 1)}>
			<input type="${"password"}" required autocomplete="${"current-password"}" placeholder="${"Password"}"${add_attribute("value", user.password, 1)}>
			<input type="${"submit"}" class="${"link-btn"}" value="${"Login"}">
			${ ``}</form>`}</div>`;
});

var component_16 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Login
});

/* src/routes/login/recover.svelte generated by Svelte v3.29.4 */

const Recover = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let email = ``;
	// recover(email)
	// 	.then(_ => {
	// 		showSuccessMessage = true

	return `<div class="${"cntr-card"}"><div class="${"card-title"}">Request Account Recovery
	</div>
	${ `<form><input type="${"email"}" required autocomplete="${"email"}" placeholder="${"Email"}"${add_attribute("value", email, 1)}>
			<input type="${"submit"}" class="${"link-btn"}" value="${"Recover"}"></form>`}
	${ ``}</div>`;
});

var component_17 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Recover
});

// This file is generated by Sapper — do not edit it!

const d = decodeURIComponent;

const manifest = {
	server_routes: [
		
	],

	pages: [
		{
			// index.svelte
			pattern: /^\/$/,
			parts: [
				{ name: "index", file: "index.svelte", component: component_0 }
			]
		},

		{
			// character/index.svelte
			pattern: /^\/character\/?$/,
			parts: [
				{ name: "character", file: "character/index.svelte", component: component_1 }
			]
		},

		{
			// character/load_character.svelte
			pattern: /^\/character\/load_character\/?$/,
			parts: [
				null,
				{ name: "character_load_character", file: "character/load_character.svelte", component: component_2 }
			]
		},

		{
			// character/new_character.svelte
			pattern: /^\/character\/new_character\/?$/,
			parts: [
				null,
				{ name: "character_new_character", file: "character/new_character.svelte", component: component_3 }
			]
		},

		{
			// character/creator/description.svelte
			pattern: /^\/character\/creator\/description\/?$/,
			parts: [
				null,
				null,
				{ name: "character_creator_description", file: "character/creator/description.svelte", component: component_4 }
			]
		},

		{
			// character/creator/properties.svelte
			pattern: /^\/character\/creator\/properties\/?$/,
			parts: [
				null,
				null,
				{ name: "character_creator_properties", file: "character/creator/properties.svelte", component: component_5 }
			]
		},

		{
			// character/creator/abilities.svelte
			pattern: /^\/character\/creator\/abilities\/?$/,
			parts: [
				null,
				null,
				{ name: "character_creator_abilities", file: "character/creator/abilities.svelte", component: component_6 }
			]
		},

		{
			// character/creator/creator.svelte
			pattern: /^\/character\/creator\/creator\/?$/,
			parts: [
				null,
				null,
				{ name: "character_creator_creator", file: "character/creator/creator.svelte", component: component_7 }
			]
		},

		{
			// character/creator/skills.svelte
			pattern: /^\/character\/creator\/skills\/?$/,
			parts: [
				null,
				null,
				{ name: "character_creator_skills", file: "character/creator/skills.svelte", component: component_8 }
			]
		},

		{
			// character/creator/traits.svelte
			pattern: /^\/character\/creator\/traits\/?$/,
			parts: [
				null,
				null,
				{ name: "character_creator_traits", file: "character/creator/traits.svelte", component: component_9 }
			]
		},

		{
			// character/creator/sheet.svelte
			pattern: /^\/character\/creator\/sheet\/?$/,
			parts: [
				null,
				null,
				{ name: "character_creator_sheet", file: "character/creator/sheet.svelte", component: component_10 }
			]
		},

		{
			// character/creator/gear.svelte
			pattern: /^\/character\/creator\/gear\/?$/,
			parts: [
				null,
				null,
				{ name: "character_creator_gear", file: "character/creator/gear.svelte", component: component_11 }
			]
		},

		{
			// generator.svelte
			pattern: /^\/generator\/?$/,
			parts: [
				{ name: "generator", file: "generator.svelte", component: component_12 }
			]
		},

		{
			// manual/manual.svelte
			pattern: /^\/manual\/manual\/?$/,
			parts: [
				null,
				{ name: "manual_manual", file: "manual/manual.svelte", component: component_13 }
			]
		},

		{
			// manual/[chapter].svelte
			pattern: /^\/manual\/([^\/]+?)\/?$/,
			parts: [
				null,
				{ name: "manual_$chapter", file: "manual/[chapter].svelte", component: component_14, params: match => ({ chapter: d(match[1]) }) }
			]
		},

		{
			// signup/index.svelte
			pattern: /^\/signup\/?$/,
			parts: [
				{ name: "signup", file: "signup/index.svelte", component: component_15 }
			]
		},

		{
			// login/index.svelte
			pattern: /^\/login\/?$/,
			parts: [
				{ name: "login", file: "login/index.svelte", component: component_16 }
			]
		},

		{
			// login/recover.svelte
			pattern: /^\/login\/recover\/?$/,
			parts: [
				null,
				{ name: "login_recover", file: "login/recover.svelte", component: component_17 }
			]
		}
	],

	root_comp,
	error: Error$1
};

const build_dir = "__sapper__/build";

/**
 * @param typeMap [Object] Map of MIME type -> Array[extensions]
 * @param ...
 */
function Mime() {
  this._types = Object.create(null);
  this._extensions = Object.create(null);

  for (var i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }

  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}

/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * If a type declares an extension that has already been defined, an error will
 * be thrown.  To suppress this error and force the extension to be associated
 * with the new type, pass `force`=true.  Alternatively, you may prefix the
 * extension with "*" to map the type to extension, without mapping the
 * extension to the type.
 *
 * e.g. mime.define({'audio/wav', ['wav']}, {'audio/x-wav', ['*wav']});
 *
 *
 * @param map (Object) type definitions
 * @param force (Boolean) if true, force overriding of existing definitions
 */
Mime.prototype.define = function(typeMap, force) {
  for (var type in typeMap) {
    var extensions = typeMap[type].map(function(t) {return t.toLowerCase()});
    type = type.toLowerCase();

    for (var i = 0; i < extensions.length; i++) {
      var ext = extensions[i];

      // '*' prefix = not the preferred type for this extension.  So fixup the
      // extension, and skip it.
      if (ext[0] == '*') {
        continue;
      }

      if (!force && (ext in this._types)) {
        throw new Error(
          'Attempt to change mapping for "' + ext +
          '" extension from "' + this._types[ext] + '" to "' + type +
          '". Pass `force=true` to allow this, otherwise remove "' + ext +
          '" from the list of extensions for "' + type + '".'
        );
      }

      this._types[ext] = type;
    }

    // Use first extension as default
    if (force || !this._extensions[type]) {
      var ext = extensions[0];
      this._extensions[type] = (ext[0] != '*') ? ext : ext.substr(1);
    }
  }
};

/**
 * Lookup a mime type based on extension
 */
Mime.prototype.getType = function(path) {
  path = String(path);
  var last = path.replace(/^.*[/\\]/, '').toLowerCase();
  var ext = last.replace(/^.*\./, '').toLowerCase();

  var hasPath = last.length < path.length;
  var hasDot = ext.length < last.length - 1;

  return (hasDot || !hasPath) && this._types[ext] || null;
};

/**
 * Return file extension associated with a mime type
 */
Mime.prototype.getExtension = function(type) {
  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
  return type && this._extensions[type.toLowerCase()] || null;
};

var Mime_1 = Mime;

var standard = {"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomdeleted+xml":["atomdeleted"],"application/atomsvc+xml":["atomsvc"],"application/atsc-dwd+xml":["dwd"],"application/atsc-held+xml":["held"],"application/atsc-rsat+xml":["rsat"],"application/bdoc":["bdoc"],"application/calendar+xml":["xcs"],"application/ccxml+xml":["ccxml"],"application/cdfx+xml":["cdfx"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mpd"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma","es"],"application/emma+xml":["emma"],"application/emotionml+xml":["emotionml"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/fdt+xml":["fdt"],"application/font-tdpfr":["pfr"],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hjson":["hjson"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/its+xml":["its"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js","mjs"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lgr+xml":["lgr"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mmt-aei+xml":["maei"],"application/mmt-usd+xml":["musd"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/mrb-consumer+xml":["*xdf"],"application/mrb-publish+xml":["*xdf"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/n-quads":["nq"],"application/n-triples":["nt"],"application/node":["cjs"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/p2p-overlay+xml":["relo"],"application/patch-ops-error+xml":["*xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/provenance+xml":["provx"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf","owl"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/route-apd+xml":["rapd"],"application/route-s-tsid+xml":["sls"],"application/route-usd+xml":["rusd"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/senml+xml":["senmlx"],"application/sensml+xml":["sensmlx"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/sieve":["siv","sieve"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/swid+xml":["swidtag"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/toml":["toml"],"application/ttml+xml":["ttml"],"application/urc-ressheet+xml":["rsheet"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/xaml+xml":["xaml"],"application/xcap-att+xml":["xav"],"application/xcap-caps+xml":["xca"],"application/xcap-diff+xml":["xdf"],"application/xcap-el+xml":["xel"],"application/xcap-error+xml":["xer"],"application/xcap-ns+xml":["xns"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xliff+xml":["xlf"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":["*3gpp"],"audio/adpcm":["adp"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mobile-xmf":["mxmf"],"audio/mp3":["*mp3"],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/wav":["wav"],"audio/wave":["*wav"],"audio/webm":["weba"],"audio/xm":["xm"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/aces":["exr"],"image/apng":["apng"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/dicom-rle":["drle"],"image/emf":["emf"],"image/fits":["fits"],"image/g3fax":["g3"],"image/gif":["gif"],"image/heic":["heic"],"image/heic-sequence":["heics"],"image/heif":["heif"],"image/heif-sequence":["heifs"],"image/hej2k":["hej2"],"image/hsj2":["hsj2"],"image/ief":["ief"],"image/jls":["jls"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jph":["jph"],"image/jphc":["jhc"],"image/jpm":["jpm"],"image/jpx":["jpx","jpf"],"image/jxr":["jxr"],"image/jxra":["jxra"],"image/jxrs":["jxrs"],"image/jxs":["jxs"],"image/jxsc":["jxsc"],"image/jxsi":["jxsi"],"image/jxss":["jxss"],"image/ktx":["ktx"],"image/png":["png"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/t38":["t38"],"image/tiff":["tif","tiff"],"image/tiff-fx":["tfx"],"image/webp":["webp"],"image/wmf":["wmf"],"message/disposition-notification":["disposition-notification"],"message/global":["u8msg"],"message/global-delivery-status":["u8dsn"],"message/global-disposition-notification":["u8mdn"],"message/global-headers":["u8hdr"],"message/rfc822":["eml","mime"],"model/3mf":["3mf"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/mtl":["mtl"],"model/obj":["obj"],"model/stl":["stl"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["*x3db","x3dbz"],"model/x3d+fastinfoset":["x3db"],"model/x3d+vrml":["*x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"model/x3d-vrml":["x3dv"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["markdown","md"],"text/mathml":["mml"],"text/mdx":["mdx"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/richtext":["rtx"],"text/rtf":["*rtf"],"text/sgml":["sgml","sgm"],"text/shex":["shex"],"text/slim":["slim","slm"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vtt":["vtt"],"text/xml":["*xml"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/jpeg":["jpgv"],"video/jpm":["*jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"]};

var lite = new Mime_1(standard);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter$1(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function get_server_route_handler(routes) {
    function handle_route(route, req, res, next) {
        return __awaiter$1(this, void 0, void 0, function* () {
            req.params = route.params(route.pattern.exec(req.path));
            const method = req.method.toLowerCase();
            // 'delete' cannot be exported from a module because it is a keyword,
            // so check for 'del' instead
            const method_export = method === 'delete' ? 'del' : method;
            const handle_method = route.handlers[method_export];
            if (handle_method) {
                if (process.env.SAPPER_EXPORT) {
                    const { write, end, setHeader } = res;
                    const chunks = [];
                    const headers = {};
                    // intercept data so that it can be exported
                    res.write = function (chunk) {
                        chunks.push(Buffer.from(chunk));
                        return write.apply(res, [chunk]);
                    };
                    res.setHeader = function (name, value) {
                        headers[name.toLowerCase()] = value;
                        setHeader.apply(res, [name, value]);
                    };
                    res.end = function (chunk) {
                        if (chunk)
                            chunks.push(Buffer.from(chunk));
                        end.apply(res, [chunk]);
                        process.send({
                            __sapper__: true,
                            event: 'file',
                            url: req.url,
                            method: req.method,
                            status: res.statusCode,
                            type: headers['content-type'],
                            body: Buffer.concat(chunks)
                        });
                    };
                }
                const handle_next = (err) => {
                    if (err) {
                        res.statusCode = 500;
                        res.end(err.message);
                    }
                    else {
                        process.nextTick(next);
                    }
                };
                try {
                    yield handle_method(req, res, handle_next);
                }
                catch (err) {
                    console.error(err);
                    handle_next(err);
                }
            }
            else {
                // no matching handler for method
                process.nextTick(next);
            }
        });
    }
    return function find_route(req, res, next) {
        for (const route of routes) {
            if (route.pattern.test(req.path)) {
                handle_route(route, req, res, next);
                return;
            }
        }
        next();
    };
}

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

var parse_1 = parse;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var pairSplitRegExp = /; */;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim();
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}

var chars$1 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
    '<': '\\u003C',
    '>': '\\u003E',
    '/': '\\u002F',
    '\\': '\\\\',
    '\b': '\\b',
    '\f': '\\f',
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t',
    '\0': '\\0',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029'
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function devalue(value) {
    var counts = new Map();
    function walk(thing) {
        if (typeof thing === 'function') {
            throw new Error("Cannot stringify a function");
        }
        if (counts.has(thing)) {
            counts.set(thing, counts.get(thing) + 1);
            return;
        }
        counts.set(thing, 1);
        if (!isPrimitive(thing)) {
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                case 'Date':
                case 'RegExp':
                    return;
                case 'Array':
                    thing.forEach(walk);
                    break;
                case 'Set':
                case 'Map':
                    Array.from(thing).forEach(walk);
                    break;
                default:
                    var proto = Object.getPrototypeOf(thing);
                    if (proto !== Object.prototype &&
                        proto !== null &&
                        Object.getOwnPropertyNames(proto).sort().join('\0') !== objectProtoOwnPropertyNames) {
                        throw new Error("Cannot stringify arbitrary non-POJOs");
                    }
                    if (Object.getOwnPropertySymbols(thing).length > 0) {
                        throw new Error("Cannot stringify POJOs with symbolic keys");
                    }
                    Object.keys(thing).forEach(function (key) { return walk(thing[key]); });
            }
        }
    }
    walk(value);
    var names = new Map();
    Array.from(counts)
        .filter(function (entry) { return entry[1] > 1; })
        .sort(function (a, b) { return b[1] - a[1]; })
        .forEach(function (entry, i) {
        names.set(entry[0], getName(i));
    });
    function stringify(thing) {
        if (names.has(thing)) {
            return names.get(thing);
        }
        if (isPrimitive(thing)) {
            return stringifyPrimitive(thing);
        }
        var type = getType(thing);
        switch (type) {
            case 'Number':
            case 'String':
            case 'Boolean':
                return "Object(" + stringify(thing.valueOf()) + ")";
            case 'RegExp':
                return "new RegExp(" + stringifyString(thing.source) + ", \"" + thing.flags + "\")";
            case 'Date':
                return "new Date(" + thing.getTime() + ")";
            case 'Array':
                var members = thing.map(function (v, i) { return i in thing ? stringify(v) : ''; });
                var tail = thing.length === 0 || (thing.length - 1 in thing) ? '' : ',';
                return "[" + members.join(',') + tail + "]";
            case 'Set':
            case 'Map':
                return "new " + type + "([" + Array.from(thing).map(stringify).join(',') + "])";
            default:
                var obj = "{" + Object.keys(thing).map(function (key) { return safeKey(key) + ":" + stringify(thing[key]); }).join(',') + "}";
                var proto = Object.getPrototypeOf(thing);
                if (proto === null) {
                    return Object.keys(thing).length > 0
                        ? "Object.assign(Object.create(null)," + obj + ")"
                        : "Object.create(null)";
                }
                return obj;
        }
    }
    var str = stringify(value);
    if (names.size) {
        var params_1 = [];
        var statements_1 = [];
        var values_1 = [];
        names.forEach(function (name, thing) {
            params_1.push(name);
            if (isPrimitive(thing)) {
                values_1.push(stringifyPrimitive(thing));
                return;
            }
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                    values_1.push("Object(" + stringify(thing.valueOf()) + ")");
                    break;
                case 'RegExp':
                    values_1.push(thing.toString());
                    break;
                case 'Date':
                    values_1.push("new Date(" + thing.getTime() + ")");
                    break;
                case 'Array':
                    values_1.push("Array(" + thing.length + ")");
                    thing.forEach(function (v, i) {
                        statements_1.push(name + "[" + i + "]=" + stringify(v));
                    });
                    break;
                case 'Set':
                    values_1.push("new Set");
                    statements_1.push(name + "." + Array.from(thing).map(function (v) { return "add(" + stringify(v) + ")"; }).join('.'));
                    break;
                case 'Map':
                    values_1.push("new Map");
                    statements_1.push(name + "." + Array.from(thing).map(function (_a) {
                        var k = _a[0], v = _a[1];
                        return "set(" + stringify(k) + ", " + stringify(v) + ")";
                    }).join('.'));
                    break;
                default:
                    values_1.push(Object.getPrototypeOf(thing) === null ? 'Object.create(null)' : '{}');
                    Object.keys(thing).forEach(function (key) {
                        statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
                    });
            }
        });
        statements_1.push("return " + str);
        return "(function(" + params_1.join(',') + "){" + statements_1.join(';') + "}(" + values_1.join(',') + "))";
    }
    else {
        return str;
    }
}
function getName(num) {
    var name = '';
    do {
        name = chars$1[num % chars$1.length] + name;
        num = ~~(num / chars$1.length) - 1;
    } while (num >= 0);
    return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
    return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
    if (typeof thing === 'string')
        return stringifyString(thing);
    if (thing === void 0)
        return 'void 0';
    if (thing === 0 && 1 / thing < 0)
        return '-0';
    var str = String(thing);
    if (typeof thing === 'number')
        return str.replace(/^(-)?0\./, '$1.');
    return str;
}
function getType(thing) {
    return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
    return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
    return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
    var result = '"';
    for (var i = 0; i < str.length; i += 1) {
        var char = str.charAt(i);
        var code = char.charCodeAt(0);
        if (char === '"') {
            result += '\\"';
        }
        else if (char in escaped$1) {
            result += escaped$1[char];
        }
        else if (code >= 0xd800 && code <= 0xdfff) {
            var next = str.charCodeAt(i + 1);
            // If this is the beginning of a [high, low] surrogate pair,
            // add the next two characters, otherwise escape
            if (code <= 0xdbff && (next >= 0xdc00 && next <= 0xdfff)) {
                result += char + str[++i];
            }
            else {
                result += "\\u" + code.toString(16).toUpperCase();
            }
        }
        else {
            result += char;
        }
    }
    result += '"';
    return result;
}

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream__default['default'].Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = require('encoding').convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream__default['default'].PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream__default['default']) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream__default['default']) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream__default['default'])) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
		if (!res) {
			res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
			if (res) {
				res.pop(); // drop last quote
			}
		}

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream__default['default'] && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream__default['default']) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http__default['default'].STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url__default['default'].parse;
const format_url = Url__default['default'].format;

const streamDestructionSupported = 'destroy' in Stream__default['default'].Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream__default['default'].Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream__default['default'].PassThrough;
const resolve_url = Url__default['default'].resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https__default['default'] : http__default['default']).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream__default['default'].Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout,
							size: request.size
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib__default['default'].Z_SYNC_FLUSH,
				finishFlush: zlib__default['default'].Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib__default['default'].createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib__default['default'].createInflate());
					} else {
						body = body.pipe(zlib__default['default'].createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib__default['default'].createBrotliDecompress === 'function') {
				body = body.pipe(zlib__default['default'].createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
var encode = function (number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};

/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */
var decode$1 = function (charCode) {
  var bigA = 65;     // 'A'
  var bigZ = 90;     // 'Z'

  var littleA = 97;  // 'a'
  var littleZ = 122; // 'z'

  var zero = 48;     // '0'
  var nine = 57;     // '9'

  var plus = 43;     // '+'
  var slash = 47;    // '/'

  var littleOffset = 26;
  var numberOffset = 52;

  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
  if (bigA <= charCode && charCode <= bigZ) {
    return (charCode - bigA);
  }

  // 26 - 51: abcdefghijklmnopqrstuvwxyz
  if (littleA <= charCode && charCode <= littleZ) {
    return (charCode - littleA + littleOffset);
  }

  // 52 - 61: 0123456789
  if (zero <= charCode && charCode <= nine) {
    return (charCode - zero + numberOffset);
  }

  // 62: +
  if (charCode == plus) {
    return 62;
  }

  // 63: /
  if (charCode == slash) {
    return 63;
  }

  // Invalid base64 digit.
  return -1;
};

var base64 = {
	encode: encode,
	decode: decode$1
};

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011

var VLQ_BASE_SHIFT = 5;

// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;

// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue) {
  return aValue < 0
    ? ((-aValue) << 1) + 1
    : (aValue << 1) + 0;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative
    ? -shifted
    : shifted;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
var encode$1 = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;

  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};

/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */
var decode$2 = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }

    digit = base64.decode(aStr.charCodeAt(aIndex++));
    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }

    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};

var base64Vlq = {
	encode: encode$1,
	decode: decode$2
};

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var util = createCommonjsModule(function (module, exports) {
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

/**
 * This is a helper function for getting values from parameter/options
 * objects.
 *
 * @param args The object we are extracting values from
 * @param name The name of the property we are getting.
 * @param defaultValue An optional value to return if the property is missing
 * from the object. If this is not specified and the property is missing, an
 * error will be thrown.
 */
function getArg(aArgs, aName, aDefaultValue) {
  if (aName in aArgs) {
    return aArgs[aName];
  } else if (arguments.length === 3) {
    return aDefaultValue;
  } else {
    throw new Error('"' + aName + '" is a required argument.');
  }
}
exports.getArg = getArg;

var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
var dataUrlRegexp = /^data:.+\,.+$/;

function urlParse(aUrl) {
  var match = aUrl.match(urlRegexp);
  if (!match) {
    return null;
  }
  return {
    scheme: match[1],
    auth: match[2],
    host: match[3],
    port: match[4],
    path: match[5]
  };
}
exports.urlParse = urlParse;

function urlGenerate(aParsedUrl) {
  var url = '';
  if (aParsedUrl.scheme) {
    url += aParsedUrl.scheme + ':';
  }
  url += '//';
  if (aParsedUrl.auth) {
    url += aParsedUrl.auth + '@';
  }
  if (aParsedUrl.host) {
    url += aParsedUrl.host;
  }
  if (aParsedUrl.port) {
    url += ":" + aParsedUrl.port;
  }
  if (aParsedUrl.path) {
    url += aParsedUrl.path;
  }
  return url;
}
exports.urlGenerate = urlGenerate;

/**
 * Normalizes a path, or the path portion of a URL:
 *
 * - Replaces consecutive slashes with one slash.
 * - Removes unnecessary '.' parts.
 * - Removes unnecessary '<dir>/..' parts.
 *
 * Based on code in the Node.js 'path' core module.
 *
 * @param aPath The path or url to normalize.
 */
function normalize(aPath) {
  var path = aPath;
  var url = urlParse(aPath);
  if (url) {
    if (!url.path) {
      return aPath;
    }
    path = url.path;
  }
  var isAbsolute = exports.isAbsolute(path);

  var parts = path.split(/\/+/);
  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
    part = parts[i];
    if (part === '.') {
      parts.splice(i, 1);
    } else if (part === '..') {
      up++;
    } else if (up > 0) {
      if (part === '') {
        // The first part is blank if the path is absolute. Trying to go
        // above the root is a no-op. Therefore we can remove all '..' parts
        // directly after the root.
        parts.splice(i + 1, up);
        up = 0;
      } else {
        parts.splice(i, 2);
        up--;
      }
    }
  }
  path = parts.join('/');

  if (path === '') {
    path = isAbsolute ? '/' : '.';
  }

  if (url) {
    url.path = path;
    return urlGenerate(url);
  }
  return path;
}
exports.normalize = normalize;

/**
 * Joins two paths/URLs.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be joined with the root.
 *
 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
 *   first.
 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
 *   is updated with the result and aRoot is returned. Otherwise the result
 *   is returned.
 *   - If aPath is absolute, the result is aPath.
 *   - Otherwise the two paths are joined with a slash.
 * - Joining for example 'http://' and 'www.example.com' is also supported.
 */
function join(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }
  if (aPath === "") {
    aPath = ".";
  }
  var aPathUrl = urlParse(aPath);
  var aRootUrl = urlParse(aRoot);
  if (aRootUrl) {
    aRoot = aRootUrl.path || '/';
  }

  // `join(foo, '//www.example.org')`
  if (aPathUrl && !aPathUrl.scheme) {
    if (aRootUrl) {
      aPathUrl.scheme = aRootUrl.scheme;
    }
    return urlGenerate(aPathUrl);
  }

  if (aPathUrl || aPath.match(dataUrlRegexp)) {
    return aPath;
  }

  // `join('http://', 'www.example.com')`
  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
    aRootUrl.host = aPath;
    return urlGenerate(aRootUrl);
  }

  var joined = aPath.charAt(0) === '/'
    ? aPath
    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

  if (aRootUrl) {
    aRootUrl.path = joined;
    return urlGenerate(aRootUrl);
  }
  return joined;
}
exports.join = join;

exports.isAbsolute = function (aPath) {
  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
};

/**
 * Make a path relative to a URL or another path.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be made relative to aRoot.
 */
function relative(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }

  aRoot = aRoot.replace(/\/$/, '');

  // It is possible for the path to be above the root. In this case, simply
  // checking whether the root is a prefix of the path won't work. Instead, we
  // need to remove components from the root one by one, until either we find
  // a prefix that fits, or we run out of components to remove.
  var level = 0;
  while (aPath.indexOf(aRoot + '/') !== 0) {
    var index = aRoot.lastIndexOf("/");
    if (index < 0) {
      return aPath;
    }

    // If the only part of the root that is left is the scheme (i.e. http://,
    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
    // have exhausted all components, so the path is not relative to the root.
    aRoot = aRoot.slice(0, index);
    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
      return aPath;
    }

    ++level;
  }

  // Make sure we add a "../" for each component we removed from the root.
  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
}
exports.relative = relative;

var supportsNullProto = (function () {
  var obj = Object.create(null);
  return !('__proto__' in obj);
}());

function identity (s) {
  return s;
}

/**
 * Because behavior goes wacky when you set `__proto__` on objects, we
 * have to prefix all the strings in our set with an arbitrary character.
 *
 * See https://github.com/mozilla/source-map/pull/31 and
 * https://github.com/mozilla/source-map/issues/30
 *
 * @param String aStr
 */
function toSetString(aStr) {
  if (isProtoString(aStr)) {
    return '$' + aStr;
  }

  return aStr;
}
exports.toSetString = supportsNullProto ? identity : toSetString;

function fromSetString(aStr) {
  if (isProtoString(aStr)) {
    return aStr.slice(1);
  }

  return aStr;
}
exports.fromSetString = supportsNullProto ? identity : fromSetString;

function isProtoString(s) {
  if (!s) {
    return false;
  }

  var length = s.length;

  if (length < 9 /* "__proto__".length */) {
    return false;
  }

  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
      s.charCodeAt(length - 9) !== 95  /* '_' */) {
    return false;
  }

  for (var i = length - 10; i >= 0; i--) {
    if (s.charCodeAt(i) !== 36 /* '$' */) {
      return false;
    }
  }

  return true;
}

/**
 * Comparator between two mappings where the original positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same original source/line/column, but different generated
 * line and column the same. Useful when searching for a mapping with a
 * stubbed out mapping.
 */
function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
  var cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0 || onlyCompareOriginal) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByOriginalPositions = compareByOriginalPositions;

/**
 * Comparator between two mappings with deflated source and name indices where
 * the generated positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same generated line and column, but different
 * source/name/original line and column the same. Useful when searching for a
 * mapping with a stubbed out mapping.
 */
function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0 || onlyCompareGenerated) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

function strcmp(aStr1, aStr2) {
  if (aStr1 === aStr2) {
    return 0;
  }

  if (aStr1 === null) {
    return 1; // aStr2 !== null
  }

  if (aStr2 === null) {
    return -1; // aStr1 !== null
  }

  if (aStr1 > aStr2) {
    return 1;
  }

  return -1;
}

/**
 * Comparator between two mappings with inflated source and name strings where
 * the generated positions are compared.
 */
function compareByGeneratedPositionsInflated(mappingA, mappingB) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

/**
 * Strip any JSON XSSI avoidance prefix from the string (as documented
 * in the source maps specification), and then parse the string as
 * JSON.
 */
function parseSourceMapInput(str) {
  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
}
exports.parseSourceMapInput = parseSourceMapInput;

/**
 * Compute the URL of a source given the the source root, the source's
 * URL, and the source map's URL.
 */
function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
  sourceURL = sourceURL || '';

  if (sourceRoot) {
    // This follows what Chrome does.
    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
      sourceRoot += '/';
    }
    // The spec says:
    //   Line 4: An optional source root, useful for relocating source
    //   files on a server or removing repeated values in the
    //   “sources” entry.  This value is prepended to the individual
    //   entries in the “source” field.
    sourceURL = sourceRoot + sourceURL;
  }

  // Historically, SourceMapConsumer did not take the sourceMapURL as
  // a parameter.  This mode is still somewhat supported, which is why
  // this code block is conditional.  However, it's preferable to pass
  // the source map URL to SourceMapConsumer, so that this function
  // can implement the source URL resolution algorithm as outlined in
  // the spec.  This block is basically the equivalent of:
  //    new URL(sourceURL, sourceMapURL).toString()
  // ... except it avoids using URL, which wasn't available in the
  // older releases of node still supported by this library.
  //
  // The spec says:
  //   If the sources are not absolute URLs after prepending of the
  //   “sourceRoot”, the sources are resolved relative to the
  //   SourceMap (like resolving script src in a html document).
  if (sourceMapURL) {
    var parsed = urlParse(sourceMapURL);
    if (!parsed) {
      throw new Error("sourceMapURL could not be parsed");
    }
    if (parsed.path) {
      // Strip the last path component, but keep the "/".
      var index = parsed.path.lastIndexOf('/');
      if (index >= 0) {
        parsed.path = parsed.path.substring(0, index + 1);
      }
    }
    sourceURL = join(urlGenerate(parsed), sourceURL);
  }

  return normalize(sourceURL);
}
exports.computeSourceURL = computeSourceURL;
});

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */


var has = Object.prototype.hasOwnProperty;
var hasNativeMap = typeof Map !== "undefined";

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
function ArraySet() {
  this._array = [];
  this._set = hasNativeMap ? new Map() : Object.create(null);
}

/**
 * Static method for creating ArraySet instances from an existing array.
 */
ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet();
  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }
  return set;
};

/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */
ArraySet.prototype.size = function ArraySet_size() {
  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};

/**
 * Add the given string to this set.
 *
 * @param String aStr
 */
ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
  var idx = this._array.length;
  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }
  if (!isDuplicate) {
    if (hasNativeMap) {
      this._set.set(aStr, idx);
    } else {
      this._set[sStr] = idx;
    }
  }
};

/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */
ArraySet.prototype.has = function ArraySet_has(aStr) {
  if (hasNativeMap) {
    return this._set.has(aStr);
  } else {
    var sStr = util.toSetString(aStr);
    return has.call(this._set, sStr);
  }
};

/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */
ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
  if (hasNativeMap) {
    var idx = this._set.get(aStr);
    if (idx >= 0) {
        return idx;
    }
  } else {
    var sStr = util.toSetString(aStr);
    if (has.call(this._set, sStr)) {
      return this._set[sStr];
    }
  }

  throw new Error('"' + aStr + '" is not in the set.');
};

/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */
ArraySet.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }
  throw new Error('No element indexed by ' + aIdx);
};

/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */
ArraySet.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};

var ArraySet_1 = ArraySet;

var arraySet = {
	ArraySet: ArraySet_1
};

var binarySearch = createCommonjsModule(function (module, exports) {
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

exports.GREATEST_LOWER_BOUND = 1;
exports.LEAST_UPPER_BOUND = 2;

/**
 * Recursive implementation of binary search.
 *
 * @param aLow Indices here and lower do not contain the needle.
 * @param aHigh Indices here and higher do not contain the needle.
 * @param aNeedle The element being searched for.
 * @param aHaystack The non-empty array being searched.
 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 */
function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
  // This function terminates when one of the following is true:
  //
  //   1. We find the exact element we are looking for.
  //
  //   2. We did not find the exact element, but we can return the index of
  //      the next-closest element.
  //
  //   3. We did not find the exact element, and there is no next-closest
  //      element than the one we are searching for, so we return -1.
  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
  var cmp = aCompare(aNeedle, aHaystack[mid], true);
  if (cmp === 0) {
    // Found the element we are looking for.
    return mid;
  }
  else if (cmp > 0) {
    // Our needle is greater than aHaystack[mid].
    if (aHigh - mid > 1) {
      // The element is in the upper half.
      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
    }

    // The exact needle element was not found in this haystack. Determine if
    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return aHigh < aHaystack.length ? aHigh : -1;
    } else {
      return mid;
    }
  }
  else {
    // Our needle is less than aHaystack[mid].
    if (mid - aLow > 1) {
      // The element is in the lower half.
      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
    }

    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return mid;
    } else {
      return aLow < 0 ? -1 : aLow;
    }
  }
}

/**
 * This is an implementation of binary search which will always try and return
 * the index of the closest element if there is no exact hit. This is because
 * mappings between original and generated line/col pairs are single points,
 * and there is an implicit region between each of them, so a miss just means
 * that you aren't on the very start of a region.
 *
 * @param aNeedle The element you are looking for.
 * @param aHaystack The array that is being searched.
 * @param aCompare A function which takes the needle and an element in the
 *     array and returns -1, 0, or 1 depending on whether the needle is less
 *     than, equal to, or greater than the element, respectively.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
 */
exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
  if (aHaystack.length === 0) {
    return -1;
  }

  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
  if (index < 0) {
    return -1;
  }

  // We have found either the exact element, or the next-closest element than
  // the one we are searching for. However, there may be more than one such
  // element. Make sure we always return the smallest of these.
  while (index - 1 >= 0) {
    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
      break;
    }
    --index;
  }

  return index;
};
});

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

// It turns out that some (most?) JavaScript engines don't self-host
// `Array.prototype.sort`. This makes sense because C++ will likely remain
// faster than JS when doing raw CPU-intensive sorting. However, when using a
// custom comparator function, calling back and forth between the VM's C++ and
// JIT'd JS is rather slow *and* loses JIT type information, resulting in
// worse generated code for the comparator function than would be optimal. In
// fact, when sorting with a comparator, these costs outweigh the benefits of
// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
// a ~3500ms mean speed-up in `bench/bench.html`.

/**
 * Swap the elements indexed by `x` and `y` in the array `ary`.
 *
 * @param {Array} ary
 *        The array.
 * @param {Number} x
 *        The index of the first item.
 * @param {Number} y
 *        The index of the second item.
 */
function swap(ary, x, y) {
  var temp = ary[x];
  ary[x] = ary[y];
  ary[y] = temp;
}

/**
 * Returns a random integer within the range `low .. high` inclusive.
 *
 * @param {Number} low
 *        The lower bound on the range.
 * @param {Number} high
 *        The upper bound on the range.
 */
function randomIntInRange(low, high) {
  return Math.round(low + (Math.random() * (high - low)));
}

/**
 * The Quick Sort algorithm.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 * @param {Number} p
 *        Start index of the array
 * @param {Number} r
 *        End index of the array
 */
function doQuickSort(ary, comparator, p, r) {
  // If our lower bound is less than our upper bound, we (1) partition the
  // array into two pieces and (2) recurse on each half. If it is not, this is
  // the empty array and our base case.

  if (p < r) {
    // (1) Partitioning.
    //
    // The partitioning chooses a pivot between `p` and `r` and moves all
    // elements that are less than or equal to the pivot to the before it, and
    // all the elements that are greater than it after it. The effect is that
    // once partition is done, the pivot is in the exact place it will be when
    // the array is put in sorted order, and it will not need to be moved
    // again. This runs in O(n) time.

    // Always choose a random pivot so that an input array which is reverse
    // sorted does not cause O(n^2) running time.
    var pivotIndex = randomIntInRange(p, r);
    var i = p - 1;

    swap(ary, pivotIndex, r);
    var pivot = ary[r];

    // Immediately after `j` is incremented in this loop, the following hold
    // true:
    //
    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
    //
    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
    for (var j = p; j < r; j++) {
      if (comparator(ary[j], pivot) <= 0) {
        i += 1;
        swap(ary, i, j);
      }
    }

    swap(ary, i + 1, j);
    var q = i + 1;

    // (2) Recurse on each half.

    doQuickSort(ary, comparator, p, q - 1);
    doQuickSort(ary, comparator, q + 1, r);
  }
}

/**
 * Sort the given array in-place with the given comparator function.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 */
var quickSort_1 = function (ary, comparator) {
  doQuickSort(ary, comparator, 0, ary.length - 1);
};

var quickSort = {
	quickSort: quickSort_1
};

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */



var ArraySet$1 = arraySet.ArraySet;

var quickSort$1 = quickSort.quickSort;

function SourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  return sourceMap.sections != null
    ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
    : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
}

SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
};

/**
 * The version of the source mapping spec that we are consuming.
 */
SourceMapConsumer.prototype._version = 3;

// `__generatedMappings` and `__originalMappings` are arrays that hold the
// parsed mapping coordinates from the source map's "mappings" attribute. They
// are lazily instantiated, accessed via the `_generatedMappings` and
// `_originalMappings` getters respectively, and we only parse the mappings
// and create these arrays once queried for a source location. We jump through
// these hoops because there can be many thousands of mappings, and parsing
// them is expensive, so we only want to do it if we must.
//
// Each object in the arrays is of the form:
//
//     {
//       generatedLine: The line number in the generated code,
//       generatedColumn: The column number in the generated code,
//       source: The path to the original source file that generated this
//               chunk of code,
//       originalLine: The line number in the original source that
//                     corresponds to this chunk of generated code,
//       originalColumn: The column number in the original source that
//                       corresponds to this chunk of generated code,
//       name: The name of the original symbol which generated this chunk of
//             code.
//     }
//
// All properties except for `generatedLine` and `generatedColumn` can be
// `null`.
//
// `_generatedMappings` is ordered by the generated positions.
//
// `_originalMappings` is ordered by the original positions.

SourceMapConsumer.prototype.__generatedMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__generatedMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__generatedMappings;
  }
});

SourceMapConsumer.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__originalMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__originalMappings;
  }
});

SourceMapConsumer.prototype._charIsMappingSeparator =
  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
    var c = aStr.charAt(index);
    return c === ";" || c === ",";
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
SourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
  };

SourceMapConsumer.GENERATED_ORDER = 1;
SourceMapConsumer.ORIGINAL_ORDER = 2;

SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
SourceMapConsumer.LEAST_UPPER_BOUND = 2;

/**
 * Iterate over each mapping between an original source/line/column and a
 * generated line/column in this source map.
 *
 * @param Function aCallback
 *        The function that is called with each mapping.
 * @param Object aContext
 *        Optional. If specified, this object will be the value of `this` every
 *        time that `aCallback` is called.
 * @param aOrder
 *        Either `SourceMapConsumer.GENERATED_ORDER` or
 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
 *        iterate over the mappings sorted by the generated file's line/column
 *        order or the original's source/line/column order, respectively. Defaults to
 *        `SourceMapConsumer.GENERATED_ORDER`.
 */
SourceMapConsumer.prototype.eachMapping =
  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    var context = aContext || null;
    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

    var mappings;
    switch (order) {
    case SourceMapConsumer.GENERATED_ORDER:
      mappings = this._generatedMappings;
      break;
    case SourceMapConsumer.ORIGINAL_ORDER:
      mappings = this._originalMappings;
      break;
    default:
      throw new Error("Unknown order of iteration.");
    }

    var sourceRoot = this.sourceRoot;
    mappings.map(function (mapping) {
      var source = mapping.source === null ? null : this._sources.at(mapping.source);
      source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
      return {
        source: source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: mapping.name === null ? null : this._names.at(mapping.name)
      };
    }, this).forEach(aCallback, context);
  };

/**
 * Returns all generated line and column information for the original source,
 * line, and column provided. If no column is provided, returns all mappings
 * corresponding to a either the line we are searching for or the next
 * closest line that has any mappings. Otherwise, returns all mappings
 * corresponding to the given line and either the column we are searching for
 * or the next closest column that has any offsets.
 *
 * The only argument is an object with the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number is 1-based.
 *   - column: Optional. the column number in the original source.
 *    The column number is 0-based.
 *
 * and an array of objects is returned, each with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *    line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *    The column number is 0-based.
 */
SourceMapConsumer.prototype.allGeneratedPositionsFor =
  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    var line = util.getArg(aArgs, 'line');

    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
    // returns the index of the closest mapping less than the needle. By
    // setting needle.originalColumn to 0, we thus find the last mapping for
    // the given line, provided such a mapping exists.
    var needle = {
      source: util.getArg(aArgs, 'source'),
      originalLine: line,
      originalColumn: util.getArg(aArgs, 'column', 0)
    };

    needle.source = this._findSourceIndex(needle.source);
    if (needle.source < 0) {
      return [];
    }

    var mappings = [];

    var index = this._findMapping(needle,
                                  this._originalMappings,
                                  "originalLine",
                                  "originalColumn",
                                  util.compareByOriginalPositions,
                                  binarySearch.LEAST_UPPER_BOUND);
    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (aArgs.column === undefined) {
        var originalLine = mapping.originalLine;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we found. Since
        // mappings are sorted, this is guaranteed to find all mappings for
        // the line we found.
        while (mapping && mapping.originalLine === originalLine) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      } else {
        var originalColumn = mapping.originalColumn;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we were searching for.
        // Since mappings are sorted, this is guaranteed to find all mappings for
        // the line we are searching for.
        while (mapping &&
               mapping.originalLine === line &&
               mapping.originalColumn == originalColumn) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      }
    }

    return mappings;
  };

var SourceMapConsumer_1 = SourceMapConsumer;

/**
 * A BasicSourceMapConsumer instance represents a parsed source map which we can
 * query for information about the original file positions by giving it a file
 * position in the generated source.
 *
 * The first parameter is the raw source map (either as a JSON string, or
 * already parsed to an object). According to the spec, source maps have the
 * following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - sources: An array of URLs to the original source files.
 *   - names: An array of identifiers which can be referrenced by individual mappings.
 *   - sourceRoot: Optional. The URL root from which all sources are relative.
 *   - sourcesContent: Optional. An array of contents of the original source files.
 *   - mappings: A string of base64 VLQs which contain the actual mappings.
 *   - file: Optional. The generated file this source map is associated with.
 *
 * Here is an example source map, taken from the source map spec[0]:
 *
 *     {
 *       version : 3,
 *       file: "out.js",
 *       sourceRoot : "",
 *       sources: ["foo.js", "bar.js"],
 *       names: ["src", "maps", "are", "fun"],
 *       mappings: "AA,AB;;ABCDE;"
 *     }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */
function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, 'version');
  var sources = util.getArg(sourceMap, 'sources');
  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
  // requires the array) to play nice here.
  var names = util.getArg(sourceMap, 'names', []);
  var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
  var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
  var mappings = util.getArg(sourceMap, 'mappings');
  var file = util.getArg(sourceMap, 'file', null);

  // Once again, Sass deviates from the spec and supplies the version as a
  // string rather than a number, so we use loose equality checking here.
  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  if (sourceRoot) {
    sourceRoot = util.normalize(sourceRoot);
  }

  sources = sources
    .map(String)
    // Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
    .map(util.normalize)
    // Always ensure that absolute sources are internally stored relative to
    // the source root, if the source root is absolute. Not doing this would
    // be particularly problematic when the source root is a prefix of the
    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
    .map(function (source) {
      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
        ? util.relative(sourceRoot, source)
        : source;
    });

  // Pass `true` below to allow duplicate names and sources. While source maps
  // are intended to be compressed and deduplicated, the TypeScript compiler
  // sometimes generates source maps with duplicates in them. See Github issue
  // #72 and bugzil.la/889492.
  this._names = ArraySet$1.fromArray(names.map(String), true);
  this._sources = ArraySet$1.fromArray(sources, true);

  this._absoluteSources = this._sources.toArray().map(function (s) {
    return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
  });

  this.sourceRoot = sourceRoot;
  this.sourcesContent = sourcesContent;
  this._mappings = mappings;
  this._sourceMapURL = aSourceMapURL;
  this.file = file;
}

BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

/**
 * Utility function to find the index of a source.  Returns -1 if not
 * found.
 */
BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
  var relativeSource = aSource;
  if (this.sourceRoot != null) {
    relativeSource = util.relative(this.sourceRoot, relativeSource);
  }

  if (this._sources.has(relativeSource)) {
    return this._sources.indexOf(relativeSource);
  }

  // Maybe aSource is an absolute URL as returned by |sources|.  In
  // this case we can't simply undo the transform.
  var i;
  for (i = 0; i < this._absoluteSources.length; ++i) {
    if (this._absoluteSources[i] == aSource) {
      return i;
    }
  }

  return -1;
};

/**
 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
 *
 * @param SourceMapGenerator aSourceMap
 *        The source map that will be consumed.
 * @param String aSourceMapURL
 *        The URL at which the source map can be found (optional)
 * @returns BasicSourceMapConsumer
 */
BasicSourceMapConsumer.fromSourceMap =
  function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
    var smc = Object.create(BasicSourceMapConsumer.prototype);

    var names = smc._names = ArraySet$1.fromArray(aSourceMap._names.toArray(), true);
    var sources = smc._sources = ArraySet$1.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                            smc.sourceRoot);
    smc.file = aSourceMap._file;
    smc._sourceMapURL = aSourceMapURL;
    smc._absoluteSources = smc._sources.toArray().map(function (s) {
      return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
    });

    // Because we are modifying the entries (by converting string sources and
    // names to indices into the sources and names ArraySets), we have to make
    // a copy of the entry or else bad things happen. Shared mutable state
    // strikes again! See github issue #191.

    var generatedMappings = aSourceMap._mappings.toArray().slice();
    var destGeneratedMappings = smc.__generatedMappings = [];
    var destOriginalMappings = smc.__originalMappings = [];

    for (var i = 0, length = generatedMappings.length; i < length; i++) {
      var srcMapping = generatedMappings[i];
      var destMapping = new Mapping;
      destMapping.generatedLine = srcMapping.generatedLine;
      destMapping.generatedColumn = srcMapping.generatedColumn;

      if (srcMapping.source) {
        destMapping.source = sources.indexOf(srcMapping.source);
        destMapping.originalLine = srcMapping.originalLine;
        destMapping.originalColumn = srcMapping.originalColumn;

        if (srcMapping.name) {
          destMapping.name = names.indexOf(srcMapping.name);
        }

        destOriginalMappings.push(destMapping);
      }

      destGeneratedMappings.push(destMapping);
    }

    quickSort$1(smc.__originalMappings, util.compareByOriginalPositions);

    return smc;
  };

/**
 * The version of the source mapping spec that we are consuming.
 */
BasicSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
  get: function () {
    return this._absoluteSources.slice();
  }
});

/**
 * Provide the JIT with a nice shape / hidden class.
 */
function Mapping() {
  this.generatedLine = 0;
  this.generatedColumn = 0;
  this.source = null;
  this.originalLine = null;
  this.originalColumn = null;
  this.name = null;
}

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
BasicSourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    var generatedLine = 1;
    var previousGeneratedColumn = 0;
    var previousOriginalLine = 0;
    var previousOriginalColumn = 0;
    var previousSource = 0;
    var previousName = 0;
    var length = aStr.length;
    var index = 0;
    var cachedSegments = {};
    var temp = {};
    var originalMappings = [];
    var generatedMappings = [];
    var mapping, str, segment, end, value;

    while (index < length) {
      if (aStr.charAt(index) === ';') {
        generatedLine++;
        index++;
        previousGeneratedColumn = 0;
      }
      else if (aStr.charAt(index) === ',') {
        index++;
      }
      else {
        mapping = new Mapping();
        mapping.generatedLine = generatedLine;

        // Because each offset is encoded relative to the previous one,
        // many segments often have the same encoding. We can exploit this
        // fact by caching the parsed variable length fields of each segment,
        // allowing us to avoid a second parse if we encounter the same
        // segment again.
        for (end = index; end < length; end++) {
          if (this._charIsMappingSeparator(aStr, end)) {
            break;
          }
        }
        str = aStr.slice(index, end);

        segment = cachedSegments[str];
        if (segment) {
          index += str.length;
        } else {
          segment = [];
          while (index < end) {
            base64Vlq.decode(aStr, index, temp);
            value = temp.value;
            index = temp.rest;
            segment.push(value);
          }

          if (segment.length === 2) {
            throw new Error('Found a source, but no line and column');
          }

          if (segment.length === 3) {
            throw new Error('Found a source and line, but no column');
          }

          cachedSegments[str] = segment;
        }

        // Generated column.
        mapping.generatedColumn = previousGeneratedColumn + segment[0];
        previousGeneratedColumn = mapping.generatedColumn;

        if (segment.length > 1) {
          // Original source.
          mapping.source = previousSource + segment[1];
          previousSource += segment[1];

          // Original line.
          mapping.originalLine = previousOriginalLine + segment[2];
          previousOriginalLine = mapping.originalLine;
          // Lines are stored 0-based
          mapping.originalLine += 1;

          // Original column.
          mapping.originalColumn = previousOriginalColumn + segment[3];
          previousOriginalColumn = mapping.originalColumn;

          if (segment.length > 4) {
            // Original name.
            mapping.name = previousName + segment[4];
            previousName += segment[4];
          }
        }

        generatedMappings.push(mapping);
        if (typeof mapping.originalLine === 'number') {
          originalMappings.push(mapping);
        }
      }
    }

    quickSort$1(generatedMappings, util.compareByGeneratedPositionsDeflated);
    this.__generatedMappings = generatedMappings;

    quickSort$1(originalMappings, util.compareByOriginalPositions);
    this.__originalMappings = originalMappings;
  };

/**
 * Find the mapping that best matches the hypothetical "needle" mapping that
 * we are searching for in the given "haystack" of mappings.
 */
BasicSourceMapConsumer.prototype._findMapping =
  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                         aColumnName, aComparator, aBias) {
    // To return the position we are searching for, we must first find the
    // mapping for the given position and then return the opposite position it
    // points to. Because the mappings are sorted, we can use binary search to
    // find the best mapping.

    if (aNeedle[aLineName] <= 0) {
      throw new TypeError('Line must be greater than or equal to 1, got '
                          + aNeedle[aLineName]);
    }
    if (aNeedle[aColumnName] < 0) {
      throw new TypeError('Column must be greater than or equal to 0, got '
                          + aNeedle[aColumnName]);
    }

    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
  };

/**
 * Compute the last column for each generated mapping. The last column is
 * inclusive.
 */
BasicSourceMapConsumer.prototype.computeColumnSpans =
  function SourceMapConsumer_computeColumnSpans() {
    for (var index = 0; index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];

      // Mappings do not contain a field for the last generated columnt. We
      // can come up with an optimistic estimate, however, by assuming that
      // mappings are contiguous (i.e. given two consecutive mappings, the
      // first mapping ends where the second one starts).
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];

        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }

      // The last mapping for each line spans the entire line.
      mapping.lastGeneratedColumn = Infinity;
    }
  };

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
BasicSourceMapConsumer.prototype.originalPositionFor =
  function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      util.compareByGeneratedPositionsDeflated,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._generatedMappings[index];

      if (mapping.generatedLine === needle.generatedLine) {
        var source = util.getArg(mapping, 'source', null);
        if (source !== null) {
          source = this._sources.at(source);
          source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
        }
        var name = util.getArg(mapping, 'name', null);
        if (name !== null) {
          name = this._names.at(name);
        }
        return {
          source: source,
          line: util.getArg(mapping, 'originalLine', null),
          column: util.getArg(mapping, 'originalColumn', null),
          name: name
        };
      }
    }

    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
  function BasicSourceMapConsumer_hasContentsOfAllSources() {
    if (!this.sourcesContent) {
      return false;
    }
    return this.sourcesContent.length >= this._sources.size() &&
      !this.sourcesContent.some(function (sc) { return sc == null; });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
BasicSourceMapConsumer.prototype.sourceContentFor =
  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    if (!this.sourcesContent) {
      return null;
    }

    var index = this._findSourceIndex(aSource);
    if (index >= 0) {
      return this.sourcesContent[index];
    }

    var relativeSource = aSource;
    if (this.sourceRoot != null) {
      relativeSource = util.relative(this.sourceRoot, relativeSource);
    }

    var url;
    if (this.sourceRoot != null
        && (url = util.urlParse(this.sourceRoot))) {
      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
      // many users. We can help them out when they expect file:// URIs to
      // behave like it would if they were running a local HTTP server. See
      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
      if (url.scheme == "file"
          && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
      }

      if ((!url.path || url.path == "/")
          && this._sources.has("/" + relativeSource)) {
        return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
      }
    }

    // This function is used recursively from
    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
    // don't want to throw if we can't find the source - we just want to
    // return null, so we provide a flag to exit gracefully.
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + relativeSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
BasicSourceMapConsumer.prototype.generatedPositionFor =
  function SourceMapConsumer_generatedPositionFor(aArgs) {
    var source = util.getArg(aArgs, 'source');
    source = this._findSourceIndex(source);
    if (source < 0) {
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }

    var needle = {
      source: source,
      originalLine: util.getArg(aArgs, 'line'),
      originalColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      util.compareByOriginalPositions,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (mapping.source === needle.source) {
        return {
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
        };
      }
    }

    return {
      line: null,
      column: null,
      lastColumn: null
    };
  };

var BasicSourceMapConsumer_1 = BasicSourceMapConsumer;

/**
 * An IndexedSourceMapConsumer instance represents a parsed source map which
 * we can query for information. It differs from BasicSourceMapConsumer in
 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
 * input.
 *
 * The first parameter is a raw source map (either as a JSON string, or already
 * parsed to an object). According to the spec for indexed source maps, they
 * have the following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - file: Optional. The generated file this source map is associated with.
 *   - sections: A list of section definitions.
 *
 * Each value under the "sections" field has two fields:
 *   - offset: The offset into the original specified at which this section
 *       begins to apply, defined as an object with a "line" and "column"
 *       field.
 *   - map: A source map definition. This source map could also be indexed,
 *       but doesn't have to be.
 *
 * Instead of the "map" field, it's also possible to have a "url" field
 * specifying a URL to retrieve a source map from, but that's currently
 * unsupported.
 *
 * Here's an example source map, taken from the source map spec[0], but
 * modified to omit a section which uses the "url" field.
 *
 *  {
 *    version : 3,
 *    file: "app.js",
 *    sections: [{
 *      offset: {line:100, column:10},
 *      map: {
 *        version : 3,
 *        file: "section.js",
 *        sources: ["foo.js", "bar.js"],
 *        names: ["src", "maps", "are", "fun"],
 *        mappings: "AAAA,E;;ABCDE;"
 *      }
 *    }],
 *  }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */
function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, 'version');
  var sections = util.getArg(sourceMap, 'sections');

  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  this._sources = new ArraySet$1();
  this._names = new ArraySet$1();

  var lastOffset = {
    line: -1,
    column: 0
  };
  this._sections = sections.map(function (s) {
    if (s.url) {
      // The url field will require support for asynchronicity.
      // See https://github.com/mozilla/source-map/issues/16
      throw new Error('Support for url field in sections not implemented.');
    }
    var offset = util.getArg(s, 'offset');
    var offsetLine = util.getArg(offset, 'line');
    var offsetColumn = util.getArg(offset, 'column');

    if (offsetLine < lastOffset.line ||
        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
      throw new Error('Section offsets must be ordered and non-overlapping.');
    }
    lastOffset = offset;

    return {
      generatedOffset: {
        // The offset fields are 0-based, but we use 1-based indices when
        // encoding/decoding from VLQ.
        generatedLine: offsetLine + 1,
        generatedColumn: offsetColumn + 1
      },
      consumer: new SourceMapConsumer(util.getArg(s, 'map'), aSourceMapURL)
    }
  });
}

IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

/**
 * The version of the source mapping spec that we are consuming.
 */
IndexedSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
  get: function () {
    var sources = [];
    for (var i = 0; i < this._sections.length; i++) {
      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
        sources.push(this._sections[i].consumer.sources[j]);
      }
    }
    return sources;
  }
});

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
IndexedSourceMapConsumer.prototype.originalPositionFor =
  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    // Find the section containing the generated position we're trying to map
    // to an original position.
    var sectionIndex = binarySearch.search(needle, this._sections,
      function(needle, section) {
        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
        if (cmp) {
          return cmp;
        }

        return (needle.generatedColumn -
                section.generatedOffset.generatedColumn);
      });
    var section = this._sections[sectionIndex];

    if (!section) {
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }

    return section.consumer.originalPositionFor({
      line: needle.generatedLine -
        (section.generatedOffset.generatedLine - 1),
      column: needle.generatedColumn -
        (section.generatedOffset.generatedLine === needle.generatedLine
         ? section.generatedOffset.generatedColumn - 1
         : 0),
      bias: aArgs.bias
    });
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
    return this._sections.every(function (s) {
      return s.consumer.hasContentsOfAllSources();
    });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
IndexedSourceMapConsumer.prototype.sourceContentFor =
  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      var content = section.consumer.sourceContentFor(aSource, true);
      if (content) {
        return content;
      }
    }
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based. 
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
IndexedSourceMapConsumer.prototype.generatedPositionFor =
  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      // Only consider this section if the requested source is in the list of
      // sources of the consumer.
      if (section.consumer._findSourceIndex(util.getArg(aArgs, 'source')) === -1) {
        continue;
      }
      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
      if (generatedPosition) {
        var ret = {
          line: generatedPosition.line +
            (section.generatedOffset.generatedLine - 1),
          column: generatedPosition.column +
            (section.generatedOffset.generatedLine === generatedPosition.line
             ? section.generatedOffset.generatedColumn - 1
             : 0)
        };
        return ret;
      }
    }

    return {
      line: null,
      column: null
    };
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
IndexedSourceMapConsumer.prototype._parseMappings =
  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    this.__generatedMappings = [];
    this.__originalMappings = [];
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      var sectionMappings = section.consumer._generatedMappings;
      for (var j = 0; j < sectionMappings.length; j++) {
        var mapping = sectionMappings[j];

        var source = section.consumer._sources.at(mapping.source);
        source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
        this._sources.add(source);
        source = this._sources.indexOf(source);

        var name = null;
        if (mapping.name) {
          name = section.consumer._names.at(mapping.name);
          this._names.add(name);
          name = this._names.indexOf(name);
        }

        // The mappings coming from the consumer for the section have
        // generated positions relative to the start of the section, so we
        // need to offset them to be relative to the start of the concatenated
        // generated file.
        var adjustedMapping = {
          source: source,
          generatedLine: mapping.generatedLine +
            (section.generatedOffset.generatedLine - 1),
          generatedColumn: mapping.generatedColumn +
            (section.generatedOffset.generatedLine === mapping.generatedLine
            ? section.generatedOffset.generatedColumn - 1
            : 0),
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: name
        };

        this.__generatedMappings.push(adjustedMapping);
        if (typeof adjustedMapping.originalLine === 'number') {
          this.__originalMappings.push(adjustedMapping);
        }
      }
    }

    quickSort$1(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
    quickSort$1(this.__originalMappings, util.compareByOriginalPositions);
  };

var IndexedSourceMapConsumer_1 = IndexedSourceMapConsumer;

var sourceMapConsumer = {
	SourceMapConsumer: SourceMapConsumer_1,
	BasicSourceMapConsumer: BasicSourceMapConsumer_1,
	IndexedSourceMapConsumer: IndexedSourceMapConsumer_1
};

var SourceMapConsumer$1 = sourceMapConsumer.SourceMapConsumer;

function get_sourcemap_url(contents) {
    const reversed = contents
        .split('\n')
        .reverse()
        .join('\n');
    const match = /\/[/*]#[ \t]+sourceMappingURL=([^\s'"]+?)(?:[ \t]+|$)/gm.exec(reversed);
    if (match)
        return match[1];
    return undefined;
}
const file_cache = new Map();
function get_file_contents(file_path) {
    if (file_cache.has(file_path)) {
        return file_cache.get(file_path);
    }
    try {
        const data = fs__default['default'].readFileSync(file_path, 'utf8');
        file_cache.set(file_path, data);
        return data;
    }
    catch (_a) {
        return undefined;
    }
}
function sourcemap_stacktrace(stack) {
    const replace = (line) => line.replace(/^ {4}at (?:(.+?)\s+\()?(?:(.+?):(\d+)(?::(\d+))?)\)?/, (input, var_name, file_path, line_num, column) => {
        if (!file_path)
            return input;
        const contents = get_file_contents(file_path);
        if (!contents)
            return input;
        const sourcemap_url = get_sourcemap_url(contents);
        if (!sourcemap_url)
            return input;
        let dir = path__default['default'].dirname(file_path);
        let sourcemap_data;
        if (/^data:application\/json[^,]+base64,/.test(sourcemap_url)) {
            const raw_data = sourcemap_url.slice(sourcemap_url.indexOf(',') + 1);
            try {
                sourcemap_data = Buffer.from(raw_data, 'base64').toString();
            }
            catch (_a) {
                return input;
            }
        }
        else {
            const sourcemap_path = path__default['default'].resolve(dir, sourcemap_url);
            const data = get_file_contents(sourcemap_path);
            if (!data)
                return input;
            sourcemap_data = data;
            dir = path__default['default'].dirname(sourcemap_path);
        }
        let raw_sourcemap;
        try {
            raw_sourcemap = JSON.parse(sourcemap_data);
        }
        catch (_b) {
            return input;
        }
        const consumer = new SourceMapConsumer$1(raw_sourcemap);
        const pos = consumer.originalPositionFor({
            line: Number(line_num),
            column: Number(column),
            bias: SourceMapConsumer$1.LEAST_UPPER_BOUND
        });
        if (!pos.source)
            return input;
        const source_path = path__default['default'].resolve(dir, pos.source);
        const source = `${source_path}:${pos.line || 0}:${pos.column || 0}`;
        if (!var_name)
            return `    at ${source}`;
        return `    at ${var_name} (${source})`;
    });
    file_cache.clear();
    return stack
        .split('\n')
        .map(replace)
        .join('\n');
}

function get_page_handler(manifest, session_getter) {
    const get_build_info =  (assets => () => assets)(JSON.parse(fs__default['default'].readFileSync(path__default['default'].join(build_dir, 'build.json'), 'utf-8')));
    const template =  (str => () => str)(read_template(build_dir));
    const has_service_worker = fs__default['default'].existsSync(path__default['default'].join(build_dir, 'service-worker.js'));
    const { pages, error: error_route } = manifest;
    function bail(res, err) {
        console.error(err);
        const message =  'Internal server error';
        res.statusCode = 500;
        res.end(`<pre>${message}</pre>`);
    }
    function handle_error(req, res, statusCode, error) {
        handle_page({
            pattern: null,
            parts: [
                { name: null, component: { default: error_route } }
            ]
        }, req, res, statusCode, error || 'Unknown error');
    }
    function handle_page(page, req, res, status = 200, error = null) {
        var _a, _b;
        return __awaiter$1(this, void 0, void 0, function* () {
            const is_service_worker_index = req.path === '/service-worker-index.html';
            const build_info = get_build_info();
            res.setHeader('Content-Type', 'text/html');
            // preload main js and css
            // TODO detect other stuff we can preload like fonts?
            let preload_files = Array.isArray(build_info.assets.main) ? build_info.assets.main : [build_info.assets.main];
            if ((_a = build_info === null || build_info === void 0 ? void 0 : build_info.css) === null || _a === void 0 ? void 0 : _a.main) {
                preload_files = preload_files.concat((_b = build_info === null || build_info === void 0 ? void 0 : build_info.css) === null || _b === void 0 ? void 0 : _b.main);
            }
            let es6_preload = false;
            if (build_info.bundler === 'rollup') {
                es6_preload = true;
                const route = page.parts[page.parts.length - 1].file;
                const deps = build_info.dependencies[route];
                if (deps) {
                    preload_files = preload_files.concat(deps);
                }
            }
            else if (!error && !is_service_worker_index) {
                page.parts.forEach(part => {
                    if (!part)
                        return;
                    // using concat because it could be a string or an array. thanks webpack!
                    preload_files = preload_files.concat(build_info.assets[part.name]);
                });
            }
            const link = preload_files
                .filter((v, i, a) => a.indexOf(v) === i) // remove any duplicates
                .filter(file => file && !file.match(/\.map$/)) // exclude source maps
                .map((file) => {
                const as = /\.css$/.test(file) ? 'style' : 'script';
                const rel = es6_preload && as === 'script' ? 'modulepreload' : 'preload';
                return `<${req.baseUrl}/client/${file}>;rel="${rel}";as="${as}"`;
            })
                .join(', ');
            res.setHeader('Link', link);
            let session;
            try {
                session = yield session_getter(req, res);
            }
            catch (err) {
                return bail(res, err);
            }
            let redirect;
            let preload_error;
            const preload_context = {
                redirect: (statusCode, location) => {
                    if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
                        throw new Error('Conflicting redirects');
                    }
                    location = location.replace(/^\//g, ''); // leading slash (only)
                    redirect = { statusCode, location };
                },
                error: (statusCode, message) => {
                    preload_error = { statusCode, message };
                },
                fetch: (url, opts) => {
                    const protocol = req.socket.encrypted ? 'https' : 'http';
                    const parsed = new Url__default['default'].URL(url, `${protocol}://127.0.0.1:${process.env.PORT}${req.baseUrl ? req.baseUrl + '/' : ''}`);
                    opts = Object.assign({}, opts);
                    const include_credentials = (opts.credentials === 'include' ||
                        opts.credentials !== 'omit' && parsed.origin === `${protocol}://127.0.0.1:${process.env.PORT}`);
                    if (include_credentials) {
                        opts.headers = Object.assign({}, opts.headers);
                        const cookies = Object.assign({}, parse_1(req.headers.cookie || ''), parse_1(opts.headers.cookie || ''));
                        const set_cookie = res.getHeader('Set-Cookie');
                        (Array.isArray(set_cookie) ? set_cookie : [set_cookie]).forEach((s) => {
                            const m = /([^=]+)=([^;]+)/.exec(s);
                            if (m)
                                cookies[m[1]] = m[2];
                        });
                        const str = Object.keys(cookies)
                            .map(key => `${key}=${cookies[key]}`)
                            .join('; ');
                        opts.headers.cookie = str;
                        if (!opts.headers.authorization && req.headers.authorization) {
                            opts.headers.authorization = req.headers.authorization;
                        }
                    }
                    return fetch(parsed.href, opts);
                }
            };
            let preloaded;
            let match;
            let params;
            try {
                const root_preload = manifest.root_comp.preload || (() => { });
                const root_preloaded = root_preload.call(preload_context, {
                    host: req.headers.host,
                    path: req.path,
                    query: req.query,
                    params: {}
                }, session);
                match = error ? null : page.pattern.exec(req.path);
                let toPreload = [root_preloaded];
                if (!is_service_worker_index) {
                    toPreload = toPreload.concat(page.parts.map(part => {
                        if (!part)
                            return null;
                        // the deepest level is used below, to initialise the store
                        params = part.params ? part.params(match) : {};
                        return part.component.preload
                            ? part.component.preload.call(preload_context, {
                                host: req.headers.host,
                                path: req.path,
                                query: req.query,
                                params
                            }, session)
                            : {};
                    }));
                }
                preloaded = yield Promise.all(toPreload);
            }
            catch (err) {
                if (error) {
                    return bail(res, err);
                }
                preload_error = { statusCode: 500, message: err };
                preloaded = []; // appease TypeScript
            }
            try {
                if (redirect) {
                    const location = Url__default['default'].resolve((req.baseUrl || '') + '/', redirect.location);
                    res.statusCode = redirect.statusCode;
                    res.setHeader('Location', location);
                    res.end();
                    return;
                }
                if (preload_error) {
                    if (!error) {
                        handle_error(req, res, preload_error.statusCode, preload_error.message);
                    }
                    else {
                        bail(res, preload_error.message);
                    }
                    return;
                }
                const segments = req.path.split('/').filter(Boolean);
                // TODO make this less confusing
                const layout_segments = [segments[0]];
                let l = 1;
                page.parts.forEach((part, i) => {
                    layout_segments[l] = segments[i + 1];
                    if (!part)
                        return null;
                    l++;
                });
                if (error instanceof Error && error.stack) {
                    error.stack = sourcemap_stacktrace(error.stack);
                }
                const pageContext = {
                    host: req.headers.host,
                    path: req.path,
                    query: req.query,
                    params,
                    error: error
                        ? error instanceof Error
                            ? error
                            : { message: error, name: 'PreloadError' }
                        : null
                };
                const props = {
                    stores: {
                        page: {
                            subscribe: writable(pageContext).subscribe
                        },
                        preloading: {
                            subscribe: writable(null).subscribe
                        },
                        session: writable(session)
                    },
                    segments: layout_segments,
                    status: error ? status : 200,
                    error: pageContext.error,
                    level0: {
                        props: preloaded[0]
                    },
                    level1: {
                        segment: segments[0],
                        props: {}
                    }
                };
                if (!is_service_worker_index) {
                    let level_index = 1;
                    for (let i = 0; i < page.parts.length; i += 1) {
                        const part = page.parts[i];
                        if (!part)
                            continue;
                        props[`level${level_index++}`] = {
                            component: part.component.default,
                            props: preloaded[i + 1] || {},
                            segment: segments[i]
                        };
                    }
                }
                const { html, head, css } = App.render(props);
                const serialized = {
                    preloaded: `[${preloaded.map(data => try_serialize(data, err => {
                        console.error(`Failed to serialize preloaded data to transmit to the client at the /${segments.join('/')} route: ${err.message}`);
                        console.warn('The client will re-render over the server-rendered page fresh instead of continuing where it left off. See https://sapper.svelte.dev/docs#Return_value for more information');
                    })).join(',')}]`,
                    session: session && try_serialize(session, err => {
                        throw new Error(`Failed to serialize session data: ${err.message}`);
                    }),
                    error: error && serialize_error(props.error)
                };
                let script = `__SAPPER__={${[
                    error && `error:${serialized.error},status:${status}`,
                    `baseUrl:"${req.baseUrl}"`,
                    serialized.preloaded && `preloaded:${serialized.preloaded}`,
                    serialized.session && `session:${serialized.session}`
                ].filter(Boolean).join(',')}};`;
                if (has_service_worker) {
                    script += `if('serviceWorker' in navigator)navigator.serviceWorker.register('${req.baseUrl}/service-worker.js');`;
                }
                const file = [].concat(build_info.assets.main).filter(f => f && /\.js$/.test(f))[0];
                const main = `${req.baseUrl}/client/${file}`;
                // users can set a CSP nonce using res.locals.nonce
                const nonce_value = (res.locals && res.locals.nonce) ? res.locals.nonce : '';
                const nonce_attr = nonce_value ? ` nonce="${nonce_value}"` : '';
                if (build_info.bundler === 'rollup') {
                    if (build_info.legacy_assets) {
                        const legacy_main = `${req.baseUrl}/client/legacy/${build_info.legacy_assets.main}`;
                        script += `(function(){try{eval("async function x(){}");var main="${main}"}catch(e){main="${legacy_main}"};var s=document.createElement("script");try{new Function("if(0)import('')")();s.src=main;s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main",main);}document.head.appendChild(s);}());`;
                    }
                    else {
                        script += `var s=document.createElement("script");try{new Function("if(0)import('')")();s.src="${main}";s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main","${main}")}document.head.appendChild(s)`;
                    }
                }
                else {
                    script += `</script><script${nonce_attr} src="${main}" defer>`;
                }
                let styles;
                // TODO make this consistent across apps
                // TODO embed build_info in placeholder.ts
                if (build_info.css && build_info.css.main) {
                    const css_chunks = new Set(build_info.css.main);
                    page.parts.forEach(part => {
                        if (!part || !build_info.dependencies)
                            return;
                        const deps_for_part = build_info.dependencies[part.file];
                        if (deps_for_part) {
                            deps_for_part.filter(d => d.endsWith('.css')).forEach(chunk => {
                                css_chunks.add(chunk);
                            });
                        }
                    });
                    styles = Array.from(css_chunks)
                        .map(href => `<link rel="stylesheet" href="client/${href}">`)
                        .join('');
                }
                else {
                    styles = (css && css.code ? `<style${nonce_attr}>${css.code}</style>` : '');
                }
                const body = template()
                    .replace('%sapper.base%', () => `<base href="${req.baseUrl}/">`)
                    .replace('%sapper.scripts%', () => `<script${nonce_attr}>${script}</script>`)
                    .replace('%sapper.html%', () => html)
                    .replace('%sapper.head%', () => head)
                    .replace('%sapper.styles%', () => styles)
                    .replace(/%sapper\.cspnonce%/g, () => nonce_value);
                res.statusCode = status;
                res.end(body);
            }
            catch (err) {
                if (error) {
                    bail(res, err);
                }
                else {
                    handle_error(req, res, 500, err);
                }
            }
        });
    }
    return function find_route(req, res, next) {
        const path = req.path === '/service-worker-index.html' ? '/' : req.path;
        const page = pages.find(page => page.pattern.test(path));
        if (page) {
            handle_page(page, req, res);
        }
        else {
            handle_error(req, res, 404, 'Not found');
        }
    };
}
function read_template(dir = build_dir) {
    return fs__default['default'].readFileSync(`${dir}/template.html`, 'utf-8');
}
function try_serialize(data, fail) {
    try {
        return devalue(data);
    }
    catch (err) {
        if (fail)
            fail(err);
        return null;
    }
}
// Ensure we return something truthy so the client will not re-render the page over the error
function serialize_error(error) {
    if (!error)
        return null;
    let serialized = try_serialize(error);
    if (!serialized) {
        const { name, message, stack } = error;
        serialized = try_serialize({ name, message, stack });
    }
    if (!serialized) {
        serialized = '{}';
    }
    return serialized;
}

function middleware(opts = {}) {
    const { session, ignore } = opts;
    let emitted_basepath = false;
    return compose_handlers(ignore, [
        (req, res, next) => {
            if (req.baseUrl === undefined) {
                let originalUrl = req.originalUrl || req.url;
                if (req.url === '/' && originalUrl[originalUrl.length - 1] !== '/') {
                    originalUrl += '/';
                }
                req.baseUrl = originalUrl
                    ? originalUrl.slice(0, -req.url.length)
                    : '';
            }
            if (!emitted_basepath && process.send) {
                process.send({
                    __sapper__: true,
                    event: 'basepath',
                    basepath: req.baseUrl
                });
                emitted_basepath = true;
            }
            if (req.path === undefined) {
                req.path = req.url.replace(/\?.*/, '');
            }
            next();
        },
        fs__default['default'].existsSync(path__default['default'].join(build_dir, 'service-worker.js')) && serve({
            pathname: '/service-worker.js',
            cache_control: 'no-cache, no-store, must-revalidate'
        }),
        fs__default['default'].existsSync(path__default['default'].join(build_dir, 'service-worker.js.map')) && serve({
            pathname: '/service-worker.js.map',
            cache_control: 'no-cache, no-store, must-revalidate'
        }),
        serve({
            prefix: '/client/',
            cache_control:  'max-age=31536000, immutable'
        }),
        get_server_route_handler(manifest.server_routes),
        get_page_handler(manifest, session || noop$1)
    ].filter(Boolean));
}
function compose_handlers(ignore, handlers) {
    const total = handlers.length;
    function nth_handler(n, req, res, next) {
        if (n >= total) {
            return next();
        }
        handlers[n](req, res, () => nth_handler(n + 1, req, res, next));
    }
    return !ignore
        ? (req, res, next) => nth_handler(0, req, res, next)
        : (req, res, next) => {
            if (should_ignore(req.path, ignore)) {
                next();
            }
            else {
                nth_handler(0, req, res, next);
            }
        };
}
function should_ignore(uri, val) {
    if (Array.isArray(val))
        return val.some(x => should_ignore(uri, x));
    if (val instanceof RegExp)
        return val.test(uri);
    if (typeof val === 'function')
        return val(uri);
    return uri.startsWith(val.charCodeAt(0) === 47 ? val : `/${val}`);
}
function serve({ prefix, pathname, cache_control }) {
    const filter = pathname
        ? (req) => req.path === pathname
        : (req) => req.path.startsWith(prefix);
    const cache = new Map();
    const read =  (file) => (cache.has(file) ? cache : cache.set(file, fs__default['default'].readFileSync(path__default['default'].join(build_dir, file)))).get(file);
    return (req, res, next) => {
        if (filter(req)) {
            const type = lite.getType(req.path);
            try {
                const file = path__default['default'].posix.normalize(decodeURIComponent(req.path));
                const data = read(file);
                res.setHeader('Content-Type', type);
                res.setHeader('Cache-Control', cache_control);
                res.end(data);
            }
            catch (err) {
                if (err.code === 'ENOENT') {
                    next();
                }
                else {
                    console.error(err);
                    res.statusCode = 500;
                    res.end('an error occurred while reading a static file from disk');
                }
            }
        }
        else {
            next();
        }
    };
}
function noop$1() { }

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka__default['default']() // You can also use Express
	.use(
		compression__default['default']({ threshold: 0 }),
		sirv__default['default']('static', { dev }),
		middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
