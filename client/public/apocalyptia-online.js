
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function validate_store(store, name) {
        if (!store || typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, callback) {
        const unsub = store.subscribe(callback);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if (typeof $$scope.dirty === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function set_store_value(store, ret, value = ret) {
        store.set(value);
        return ret;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? undefined : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        if (value != null || input.value) {
            input.value = value;
        }
    }
    function select_option(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked') || select.options[0];
        return selected_option && selected_option.__value;
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let stylesheet;
    let active = 0;
    let current_rules = {};
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        if (!current_rules[name]) {
            if (!stylesheet) {
                const style = element('style');
                document.head.appendChild(style);
                stylesheet = style.sheet;
            }
            current_rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ``}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        node.style.animation = (node.style.animation || '')
            .split(', ')
            .filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        )
            .join(', ');
        if (name && !--active)
            clear_rules();
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            let i = stylesheet.cssRules.length;
            while (i--)
                stylesheet.deleteRule(i);
            current_rules = {};
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
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
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        let config = fn(node, params);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                delete_rule(node);
                if (is_function(config)) {
                    config = config();
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_bidirectional_transition(node, fn, params, intro) {
        let config = fn(node, params);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = program.b - t;
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config();
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, value = ret) => {
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, detail));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    /* src/layout/ViewScreen.svelte generated by Svelte v3.16.7 */

    const file = "src/layout/ViewScreen.svelte";

    function create_fragment(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "view-screen svelte-8mevh");
    			add_location(div, file, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 1) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[0], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
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
    	let { $$slots = {}, $$scope } = $$props;

    	$$self.$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		
    	};

    	return [$$scope, $$slots];
    }

    class ViewScreen extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ViewScreen",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe,
        };
    }
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
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => store.subscribe((value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    const LOCATION = {};
    const ROUTER = {};

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/history.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    function getLocation(source) {
      return {
        ...source.location,
        state: source.history.state,
        key: (source.history.state && source.history.state.key) || "initial"
      };
    }

    function createHistory(source, options) {
      const listeners = [];
      let location = getLocation(source);

      return {
        get location() {
          return location;
        },

        listen(listener) {
          listeners.push(listener);

          const popstateListener = () => {
            location = getLocation(source);
            listener({ location, action: "POP" });
          };

          source.addEventListener("popstate", popstateListener);

          return () => {
            source.removeEventListener("popstate", popstateListener);

            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
          };
        },

        navigate(to, { state, replace = false } = {}) {
          state = { ...state, key: Date.now() + "" };
          // try...catch iOS Safari limits to 100 pushState calls
          try {
            if (replace) {
              source.history.replaceState(state, null, to);
            } else {
              source.history.pushState(state, null, to);
            }
          } catch (e) {
            source.location[replace ? "replace" : "assign"](to);
          }

          location = getLocation(source);
          listeners.forEach(listener => listener({ location, action: "PUSH" }));
        }
      };
    }

    // Stores history entries in memory for testing or other platforms like Native
    function createMemorySource(initialPathname = "/") {
      let index = 0;
      const stack = [{ pathname: initialPathname, search: "" }];
      const states = [];

      return {
        get location() {
          return stack[index];
        },
        addEventListener(name, fn) {},
        removeEventListener(name, fn) {},
        history: {
          get entries() {
            return stack;
          },
          get index() {
            return index;
          },
          get state() {
            return states[index];
          },
          pushState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            index++;
            stack.push({ pathname, search });
            states.push(state);
          },
          replaceState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            stack[index] = { pathname, search };
            states[index] = state;
          }
        }
      };
    }

    // Global history uses window.history as the source if available,
    // otherwise a memory history
    const canUseDOM = Boolean(
      typeof window !== "undefined" &&
        window.document &&
        window.document.createElement
    );
    const globalHistory = createHistory(canUseDOM ? window : createMemorySource());
    const { navigate } = globalHistory;

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/utils.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    const paramRe = /^:(.+)/;

    const SEGMENT_POINTS = 4;
    const STATIC_POINTS = 3;
    const DYNAMIC_POINTS = 2;
    const SPLAT_PENALTY = 1;
    const ROOT_POINTS = 1;

    /**
     * Check if `segment` is a root segment
     * @param {string} segment
     * @return {boolean}
     */
    function isRootSegment(segment) {
      return segment === "";
    }

    /**
     * Check if `segment` is a dynamic segment
     * @param {string} segment
     * @return {boolean}
     */
    function isDynamic(segment) {
      return paramRe.test(segment);
    }

    /**
     * Check if `segment` is a splat
     * @param {string} segment
     * @return {boolean}
     */
    function isSplat(segment) {
      return segment[0] === "*";
    }

    /**
     * Split up the URI into segments delimited by `/`
     * @param {string} uri
     * @return {string[]}
     */
    function segmentize(uri) {
      return (
        uri
          // Strip starting/ending `/`
          .replace(/(^\/+|\/+$)/g, "")
          .split("/")
      );
    }

    /**
     * Strip `str` of potential start and end `/`
     * @param {string} str
     * @return {string}
     */
    function stripSlashes(str) {
      return str.replace(/(^\/+|\/+$)/g, "");
    }

    /**
     * Score a route depending on how its individual segments look
     * @param {object} route
     * @param {number} index
     * @return {object}
     */
    function rankRoute(route, index) {
      const score = route.default
        ? 0
        : segmentize(route.path).reduce((score, segment) => {
            score += SEGMENT_POINTS;

            if (isRootSegment(segment)) {
              score += ROOT_POINTS;
            } else if (isDynamic(segment)) {
              score += DYNAMIC_POINTS;
            } else if (isSplat(segment)) {
              score -= SEGMENT_POINTS + SPLAT_PENALTY;
            } else {
              score += STATIC_POINTS;
            }

            return score;
          }, 0);

      return { route, score, index };
    }

    /**
     * Give a score to all routes and sort them on that
     * @param {object[]} routes
     * @return {object[]}
     */
    function rankRoutes(routes) {
      return (
        routes
          .map(rankRoute)
          // If two routes have the exact same score, we go by index instead
          .sort((a, b) =>
            a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index
          )
      );
    }

    /**
     * Ranks and picks the best route to match. Each segment gets the highest
     * amount of points, then the type of segment gets an additional amount of
     * points where
     *
     *  static > dynamic > splat > root
     *
     * This way we don't have to worry about the order of our routes, let the
     * computers do it.
     *
     * A route looks like this
     *
     *  { path, default, value }
     *
     * And a returned match looks like:
     *
     *  { route, params, uri }
     *
     * @param {object[]} routes
     * @param {string} uri
     * @return {?object}
     */
    function pick(routes, uri) {
      let match;
      let default_;

      const [uriPathname] = uri.split("?");
      const uriSegments = segmentize(uriPathname);
      const isRootUri = uriSegments[0] === "";
      const ranked = rankRoutes(routes);

      for (let i = 0, l = ranked.length; i < l; i++) {
        const route = ranked[i].route;
        let missed = false;

        if (route.default) {
          default_ = {
            route,
            params: {},
            uri
          };
          continue;
        }

        const routeSegments = segmentize(route.path);
        const params = {};
        const max = Math.max(uriSegments.length, routeSegments.length);
        let index = 0;

        for (; index < max; index++) {
          const routeSegment = routeSegments[index];
          const uriSegment = uriSegments[index];

          if (routeSegment !== undefined && isSplat(routeSegment)) {
            // Hit a splat, just grab the rest, and return a match
            // uri:   /files/documents/work
            // route: /files/* or /files/*splatname
            const splatName = routeSegment === "*" ? "*" : routeSegment.slice(1);

            params[splatName] = uriSegments
              .slice(index)
              .map(decodeURIComponent)
              .join("/");
            break;
          }

          if (uriSegment === undefined) {
            // URI is shorter than the route, no match
            // uri:   /users
            // route: /users/:userId
            missed = true;
            break;
          }

          let dynamicMatch = paramRe.exec(routeSegment);

          if (dynamicMatch && !isRootUri) {
            const value = decodeURIComponent(uriSegment);
            params[dynamicMatch[1]] = value;
          } else if (routeSegment !== uriSegment) {
            // Current segments don't match, not dynamic, not splat, so no match
            // uri:   /users/123/settings
            // route: /users/:id/profile
            missed = true;
            break;
          }
        }

        if (!missed) {
          match = {
            route,
            params,
            uri: "/" + uriSegments.slice(0, index).join("/")
          };
          break;
        }
      }

      return match || default_ || null;
    }

    /**
     * Check if the `path` matches the `uri`.
     * @param {string} path
     * @param {string} uri
     * @return {?object}
     */
    function match(route, uri) {
      return pick([route], uri);
    }

    /**
     * Combines the `basepath` and the `path` into one path.
     * @param {string} basepath
     * @param {string} path
     */
    function combinePaths(basepath, path) {
      return `${stripSlashes(
    path === "/" ? basepath : `${stripSlashes(basepath)}/${stripSlashes(path)}`
  )}/`;
    }

    /* node_modules/svelte-routing/src/Router.svelte generated by Svelte v3.16.7 */

    function create_fragment$1(ctx) {
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[16].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 32768) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[15], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[15], dirty, null));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $base;
    	let $location;
    	let $routes;
    	let { basepath = "/" } = $$props;
    	let { url = null } = $$props;
    	const locationContext = getContext(LOCATION);
    	const routerContext = getContext(ROUTER);
    	const routes = writable([]);
    	validate_store(routes, "routes");
    	component_subscribe($$self, routes, value => $$invalidate(8, $routes = value));
    	const activeRoute = writable(null);
    	let hasActiveRoute = false;
    	const location = locationContext || writable(url ? { pathname: url } : globalHistory.location);
    	validate_store(location, "location");
    	component_subscribe($$self, location, value => $$invalidate(7, $location = value));

    	const base = routerContext
    	? routerContext.routerBase
    	: writable({ path: basepath, uri: basepath });

    	validate_store(base, "base");
    	component_subscribe($$self, base, value => $$invalidate(6, $base = value));

    	const routerBase = derived([base, activeRoute], ([base, activeRoute]) => {
    		if (activeRoute === null) {
    			return base;
    		}

    		const { path: basepath } = base;
    		const { route, uri } = activeRoute;

    		const path = route.default
    		? basepath
    		: route.path.replace(/\*.*$/, "");

    		return { path, uri };
    	});

    	function registerRoute(route) {
    		const { path: basepath } = $base;
    		let { path } = route;
    		route._path = path;
    		route.path = combinePaths(basepath, path);

    		if (typeof window === "undefined") {
    			if (hasActiveRoute) {
    				return;
    			}

    			const matchingRoute = match(route, $location.pathname);

    			if (matchingRoute) {
    				activeRoute.set(matchingRoute);
    				hasActiveRoute = true;
    			}
    		} else {
    			routes.update(rs => {
    				rs.push(route);
    				return rs;
    			});
    		}
    	}

    	function unregisterRoute(route) {
    		routes.update(rs => {
    			const index = rs.indexOf(route);
    			rs.splice(index, 1);
    			return rs;
    		});
    	}

    	if (!locationContext) {
    		onMount(() => {
    			const unlisten = globalHistory.listen(history => {
    				location.set(history.location);
    			});

    			return unlisten;
    		});

    		setContext(LOCATION, location);
    	}

    	setContext(ROUTER, {
    		activeRoute,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute
    	});

    	const writable_props = ["basepath", "url"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;

    	$$self.$set = $$props => {
    		if ("basepath" in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ("url" in $$props) $$invalidate(4, url = $$props.url);
    		if ("$$scope" in $$props) $$invalidate(15, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => {
    		return {
    			basepath,
    			url,
    			hasActiveRoute,
    			$base,
    			$location,
    			$routes
    		};
    	};

    	$$self.$inject_state = $$props => {
    		if ("basepath" in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ("url" in $$props) $$invalidate(4, url = $$props.url);
    		if ("hasActiveRoute" in $$props) hasActiveRoute = $$props.hasActiveRoute;
    		if ("$base" in $$props) base.set($base = $$props.$base);
    		if ("$location" in $$props) location.set($location = $$props.$location);
    		if ("$routes" in $$props) routes.set($routes = $$props.$routes);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$base*/ 64) {
    			 {
    				const { path: basepath } = $base;

    				routes.update(rs => {
    					rs.forEach(r => r.path = combinePaths(basepath, r._path));
    					return rs;
    				});
    			}
    		}

    		if ($$self.$$.dirty & /*$routes, $location*/ 384) {
    			 {
    				const bestMatch = pick($routes, $location.pathname);
    				activeRoute.set(bestMatch);
    			}
    		}
    	};

    	return [
    		routes,
    		location,
    		base,
    		basepath,
    		url,
    		hasActiveRoute,
    		$base,
    		$location,
    		$routes,
    		locationContext,
    		routerContext,
    		activeRoute,
    		routerBase,
    		registerRoute,
    		unregisterRoute,
    		$$scope,
    		$$slots
    	];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { basepath: 3, url: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get basepath() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set basepath(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get url() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-routing/src/Route.svelte generated by Svelte v3.16.7 */

    const get_default_slot_changes = dirty => ({
    	params: dirty & /*routeParams*/ 2,
    	location: dirty & /*$location*/ 16
    });

    const get_default_slot_context = ctx => ({
    	params: /*routeParams*/ ctx[1],
    	location: /*$location*/ ctx[4]
    });

    // (40:0) {#if $activeRoute !== null && $activeRoute.route === route}
    function create_if_block(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*component*/ ctx[0] !== null) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
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
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
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
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(40:0) {#if $activeRoute !== null && $activeRoute.route === route}",
    		ctx
    	});

    	return block;
    }

    // (43:2) {:else}
    function create_else_block(ctx) {
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[13].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[12], get_default_slot_context);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot && default_slot.p && dirty & /*$$scope, routeParams, $location*/ 4114) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[12], get_default_slot_context), get_slot_changes(default_slot_template, /*$$scope*/ ctx[12], dirty, get_default_slot_changes));
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(43:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (41:2) {#if component !== null}
    function create_if_block_1(ctx) {
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{ location: /*$location*/ ctx[4] },
    		/*routeParams*/ ctx[1],
    		/*routeProps*/ ctx[2]
    	];

    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
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
    			const switch_instance_changes = (dirty & /*$location, routeParams, routeProps*/ 22)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*$location*/ 16 && ({ location: /*$location*/ ctx[4] }),
    					dirty & /*routeParams*/ 2 && get_spread_object(/*routeParams*/ ctx[1]),
    					dirty & /*routeProps*/ 4 && get_spread_object(/*routeProps*/ ctx[2])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
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
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
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
    		source: "(41:2) {#if component !== null}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*$activeRoute*/ ctx[3] !== null && /*$activeRoute*/ ctx[3].route === /*route*/ ctx[7] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$activeRoute*/ ctx[3] !== null && /*$activeRoute*/ ctx[3].route === /*route*/ ctx[7]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    					transition_in(if_block, 1);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
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
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $activeRoute;
    	let $location;
    	let { path = "" } = $$props;
    	let { component = null } = $$props;
    	const { registerRoute, unregisterRoute, activeRoute } = getContext(ROUTER);
    	validate_store(activeRoute, "activeRoute");
    	component_subscribe($$self, activeRoute, value => $$invalidate(3, $activeRoute = value));
    	const location = getContext(LOCATION);
    	validate_store(location, "location");
    	component_subscribe($$self, location, value => $$invalidate(4, $location = value));
    	const route = { path, default: path === "" };
    	let routeParams = {};
    	let routeProps = {};
    	registerRoute(route);

    	if (typeof window !== "undefined") {
    		onDestroy(() => {
    			unregisterRoute(route);
    		});
    	}

    	let { $$slots = {}, $$scope } = $$props;

    	$$self.$set = $$new_props => {
    		$$invalidate(11, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("path" in $$new_props) $$invalidate(8, path = $$new_props.path);
    		if ("component" in $$new_props) $$invalidate(0, component = $$new_props.component);
    		if ("$$scope" in $$new_props) $$invalidate(12, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => {
    		return {
    			path,
    			component,
    			routeParams,
    			routeProps,
    			$activeRoute,
    			$location
    		};
    	};

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(11, $$props = assign(assign({}, $$props), $$new_props));
    		if ("path" in $$props) $$invalidate(8, path = $$new_props.path);
    		if ("component" in $$props) $$invalidate(0, component = $$new_props.component);
    		if ("routeParams" in $$props) $$invalidate(1, routeParams = $$new_props.routeParams);
    		if ("routeProps" in $$props) $$invalidate(2, routeProps = $$new_props.routeProps);
    		if ("$activeRoute" in $$props) activeRoute.set($activeRoute = $$new_props.$activeRoute);
    		if ("$location" in $$props) location.set($location = $$new_props.$location);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$activeRoute*/ 8) {
    			 if ($activeRoute && $activeRoute.route === route) {
    				$$invalidate(1, routeParams = $activeRoute.params);
    			}
    		}

    		 {
    			const { path, component, ...rest } = $$props;
    			$$invalidate(2, routeProps = rest);
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		component,
    		routeParams,
    		routeProps,
    		$activeRoute,
    		$location,
    		activeRoute,
    		location,
    		route,
    		path,
    		registerRoute,
    		unregisterRoute,
    		$$props,
    		$$scope,
    		$$slots
    	];
    }

    class Route extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { path: 8, component: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get path() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const router = {
    	Home: () => { navigate(`/`, { replace: true }); },
    	Creator: () => { navigate(`/creator`, { replace: true }); },
    	Reference: () => { navigate(`/reference`, { replace: true }); },
    	// RefDice: () => { navigate(`/reference/dice`, { replace: true })},
    	// RefTraits: () => { navigate(`/reference/traits`, { replace: true })},
    	// RefSkills: () => { navigate(`/reference/skills`, { replace: true })},
    	// RefCombat: () => { navigate(`/reference/combat`, { replace: true }) },
    	// RefManeuvers: () => { navigate(`/reference/maneuvers`, { replace: true }) },
    	// RefSituations: () => { navigate(`/reference/situations`, { replace: true }) },
    	// RefAbilities: () => { navigate(`/reference/abilities`, { replace: true })},
    	// RefGear: () => { navigate(`/reference/Gear`, { replace: true })},
    };

    /* src/layout/TitleBar.svelte generated by Svelte v3.16.7 */
    const file$1 = "src/layout/TitleBar.svelte";

    function create_fragment$3(ctx) {
    	let button;
    	let span0;
    	let t1;
    	let span1;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			span0 = element("span");
    			span0.textContent = "Apocalyptia Online";
    			t1 = space();
    			span1 = element("span");
    			span1.textContent = "beta";
    			attr_dev(span0, "class", "title svelte-1bvuldr");
    			add_location(span0, file$1, 13, 1, 433);
    			attr_dev(span1, "class", "beta svelte-1bvuldr");
    			add_location(span1, file$1, 14, 1, 480);
    			attr_dev(button, "id", "title-bar");
    			attr_dev(button, "class", "title-bar svelte-1bvuldr");
    			add_location(button, file$1, 12, 0, 367);
    			dispose = listen_dev(button, "click", router.Home, false, false, false);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, span0);
    			append_dev(button, t1);
    			append_dev(button, span1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self) {
    	let prevScrollpos = window.pageYOffset;

    	window.onscroll = () => {
    		let currentScrollPos = window.pageYOffset;
    		if (prevScrollpos > currentScrollPos) document.getElementById("title-bar").style.top = `0`; else document.getElementById("title-bar").style.top = `-3rem`;
    		prevScrollpos = currentScrollPos;
    	};

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("prevScrollpos" in $$props) prevScrollpos = $$props.prevScrollpos;
    	};

    	return [];
    }

    class TitleBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TitleBar",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function fade(node, { delay = 0, duration = 400, easing = identity }) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }
    function slide(node, { delay = 0, duration = 400, easing = cubicOut }) {
        const style = getComputedStyle(node);
        const opacity = +style.opacity;
        const height = parseFloat(style.height);
        const padding_top = parseFloat(style.paddingTop);
        const padding_bottom = parseFloat(style.paddingBottom);
        const margin_top = parseFloat(style.marginTop);
        const margin_bottom = parseFloat(style.marginBottom);
        const border_top_width = parseFloat(style.borderTopWidth);
        const border_bottom_width = parseFloat(style.borderBottomWidth);
        return {
            delay,
            duration,
            easing,
            css: t => `overflow: hidden;` +
                `opacity: ${Math.min(t * 20, 1) * opacity};` +
                `height: ${t * height}px;` +
                `padding-top: ${t * padding_top}px;` +
                `padding-bottom: ${t * padding_bottom}px;` +
                `margin-top: ${t * margin_top}px;` +
                `margin-bottom: ${t * margin_bottom}px;` +
                `border-top-width: ${t * border_top_width}px;` +
                `border-bottom-width: ${t * border_bottom_width}px;`
        };
    }

    /* src/layout/NavButtons.svelte generated by Svelte v3.16.7 */
    const file$2 = "src/layout/NavButtons.svelte";

    function create_fragment$4(ctx) {
    	let div;
    	let button0;
    	let t1;
    	let button1;
    	let t3;
    	let button2;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			button0 = element("button");
    			button0.textContent = "Back";
    			t1 = space();
    			button1 = element("button");
    			button1.textContent = "Menu";
    			t3 = space();
    			button2 = element("button");
    			button2.textContent = "Next";
    			attr_dev(button0, "class", "nav-button svelte-tfuapr");
    			add_location(button0, file$2, 42, 1, 706);
    			attr_dev(button1, "class", "nav-button svelte-tfuapr");
    			add_location(button1, file$2, 43, 1, 764);
    			attr_dev(button2, "class", "nav-button svelte-tfuapr");
    			add_location(button2, file$2, 44, 1, 822);
    			attr_dev(div, "class", "nav-buttons svelte-tfuapr");
    			add_location(div, file$2, 41, 0, 679);

    			dispose = [
    				listen_dev(button0, "click", /*back*/ ctx[0], false, false, false),
    				listen_dev(button1, "click", /*menu*/ ctx[1], false, false, false),
    				listen_dev(button2, "click", /*next*/ ctx[2], false, false, false)
    			];
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button0);
    			append_dev(div, t1);
    			append_dev(div, button1);
    			append_dev(div, t3);
    			append_dev(div, button2);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { options } = $$props;
    	let { selected } = $$props;
    	const dispatch = createEventDispatcher();
    	let screen = { step: 0, optionList: options };
    	selected = screen.optionList[screen.step];

    	const back = () => {
    		--screen.step;
    		navigate();
    	};

    	const menu = () => {
    		screen.step = 0;
    		navigate();
    	};

    	const next = () => {
    		++screen.step;
    		navigate();
    	};

    	const navigate = () => {
    		if (screen.step == screen.optionList.length || screen.step < 0) {
    			router.Home();
    		} else {
    			$$invalidate(3, selected = screen.optionList[screen.step]);
    			dispatch("nav", { selection: selected });
    		}
    	};

    	const writable_props = ["options", "selected"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<NavButtons> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("options" in $$props) $$invalidate(4, options = $$props.options);
    		if ("selected" in $$props) $$invalidate(3, selected = $$props.selected);
    	};

    	$$self.$capture_state = () => {
    		return { options, selected, screen };
    	};

    	$$self.$inject_state = $$props => {
    		if ("options" in $$props) $$invalidate(4, options = $$props.options);
    		if ("selected" in $$props) $$invalidate(3, selected = $$props.selected);
    		if ("screen" in $$props) screen = $$props.screen;
    	};

    	return [back, menu, next, selected, options];
    }

    class NavButtons extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { options: 4, selected: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavButtons",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || ({});

    		if (/*options*/ ctx[4] === undefined && !("options" in props)) {
    			console.warn("<NavButtons> was created without expected prop 'options'");
    		}

    		if (/*selected*/ ctx[3] === undefined && !("selected" in props)) {
    			console.warn("<NavButtons> was created without expected prop 'selected'");
    		}
    	}

    	get options() {
    		throw new Error("<NavButtons>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set options(value) {
    		throw new Error("<NavButtons>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get selected() {
    		throw new Error("<NavButtons>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set selected(value) {
    		throw new Error("<NavButtons>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const femaleNames = [
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

    const maleNames = [
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

    const random = (arr) => {
    	return arr[Math.floor(Math.random() * arr.length)]
    };

    class Character {
    	constructor() {
    		this.scenario = ``,
    		this.completed = false,
    		this.description = {
    			age: {
    				label: `Age`,
    				value: ``
    			},
    			characterName: {
    				label: `Character`,
    				value: ``
    			},
    			gender: {
    				label: `Gender`,
    				value: ``
    			},
    			hair: {
    				label: `Hair`,
    				value: ``
    			},
    			height: {
    				label: `Height`,
    				value: ``
    			},
    			playerName: {
    				label: `Player`,
    				value: ``
    			},
    			skin: {
    				label: `Skin`,
    				value: ``
    			},
    			weight: {
    				label: `Weight`,
    				value: ``
    			},
    		},
    		this.traits = {
    			agility: {
    				name: `Agility`,
    				base: 1,
    				max: 6,
    				mods: 0,
    				score: 1,
    				set: () => {
    					this.traits.agility.score = this.traits.agility.base + this.traits.agility.mods;
    					return this.traits.agility.score
    				},
    			},
    			brains: {
    				name: `Brains`,
    				base: 1,
    				max: 6,
    				mods: 0,
    				score: 1,
    				set: () => {
    					this.traits.brains.score =  this.traits.brains.base + this.traits.brains.mods;
    					return this.traits.brains.score
    				},
    			},
    			constitution: {
    				name: `Constitution`,
    				base: 1,
    				max: 6,
    				mods: 0,
    				score: 1,
    				set: () => {
    					this.traits.constitution.score = this.traits.constitution.base + this.traits.constitution.mods;
    					return this.traits.constitution.score
    				},
    			},
    			demeanor: {
    				name: `Demeanor`,
    				base: 1,
    				max: 6,
    				mods: 0,
    				score: 1,
    				set: () => {
    					this.traits.demeanor.score = this.traits.demeanor.base + this.traits.demeanor.mods;
    					return this.traits.demeanor.score
    				},
    			},
    		},
    		this.skills = {
    			acrobatics: {
    				name: `Acrobatics`,
    				parent: `Agility`,
    				base: 0,
    				max: 1,
    				mods: 0,
    				score: 0,
    				set: () => {
    					this.skills.acrobatics.score = this.skills.acrobatics.base + this.skills.acrobatics.mods;
    					return this.skills.acrobatics.score
    				},
    			},
    			athletics: {
    				name: `Athletics`,
    				parent: `Constitution`,
    				base: 0,
    				max: 1,
    				mods: 0,
    				score: 0,
    				set: () => {
    					this.skills.athletics.score = this.skills.athletics.base + this.skills.athletics.mods;
    					return this.skills.athletics.score
    				},
    			},
    			build: {
    				name: `Build`,
    				parent: `Brains`,
    				base: 0,
    				max: 1,
    				mods: 0,
    				score: 0,
    				set: () => {
    					this.skills.build.score = this.skills.build.base + this.skills.build.mods;
    					return this.skills.build.score
    				},
    			},
    			drive: {
    				name: `Drive`,
    				parent: `Constitution`,
    				base: 0,
    				max: 1,
    				mods: 0,
    				score: 0,
    				set: () => {
    					this.skills.drive.score = this.skills.drive.base + this.skills.drive.mods;
    					return this.skills.drive.score
    				},
    			},
    			larceny: {
    				name: `Larceny`,
    				parent: `Agility`,
    				base: 0,
    				max: 1,
    				mods: 0,
    				score: 0,
    				set: () => {
    					this.skills.larceny.score = this.skills.larceny.base + this.skills.larceny.mods;
    					return this.skills.larceny.score
    				},
    			},
    			leadership: {
    				name: `Leadership`,
    				parent: `Demeanor`,
    				base: 0,
    				max: 1,
    				mods: 0,
    				score: 0,
    				set: () => {
    					this.skills.leadership.score = this.skills.leadership.base + this.skills.leadership.mods;
    					return this.skills.leadership.score
    				},
    			},
    			medicine: {
    				name: `Medicine`,
    				parent: `Brains`,
    				base: 0,
    				max: 1,
    				mods: 0,
    				score: 0,
    				set: () => {
    					this.skills.medicine.score = this.skills.medicine.base + this.skills.medicine.mods;
    					return this.skills.medicine.score
    				},
    			},
    			melee: {
    				name: `Melee`,
    				parent: `Constitution`,
    				base: 0,
    				max: 1,
    				mods: 0,
    				score: 0,
    				set: () => {
    					this.skills.melee.score = this.skills.melee.base + this.skills.melee.mods;
    					return this.skills.melee.score
    				},
    			},
    			perception: {
    				name: `Perception`,
    				parent: `Brains`,
    				base: 0,
    				max: 1,
    				mods: 0,
    				score: 0,
    				set: () => {
    					this.skills.perception.score = this.skills.perception.base + this.skills.perception.mods;
    					return this.skills.perception.score
    				},
    			},
    			perform: {
    				name: `Perform`,
    				parent: `Demeanor`,
    				base: 0,
    				max: 1,
    				mods: 0,
    				score: 0,
    				set: () => {
    					this.skills.perform.score = this.skills.perform.base + this.skills.perform.mods;
    					return this.skills.perform.score
    				},
    			},
    			ranged: {
    				name: `Ranged`,
    				parent: `Agility`,
    				base: 0,
    				max: 1,
    				mods: 0,
    				score: 0,
    				set: () => {
    					this.skills.ranged.score = this.skills.ranged.base + this.skills.ranged.mods;
    					return this.skills.ranged.score
    				},
    			},
    			science: {
    				name: `Science`,
    				parent: `Brains`,
    				base: 0,
    				max: 1,
    				mods: 0,
    				score: 0,
    				set: () => {
    					this.skills.science.score = this.skills.science.base + this.skills.science.mods;
    					return this.skills.science.score
    				},
    			},
    			socialize: {
    				name: `Socialize`,
    				parent: `Demeanor`,
    				base: 0,
    				max: 1,
    				mods: 0,
    				score: 0,
    				set: () => {
    					this.skills.socialize.score = this.skills.socialize.base + this.skills.socialize.mods;
    					return this.skills.socialize.score
    				},
    			},
    			stealth: {
    				name: `Stealth`,
    				parent: `Agility`,
    				base: 0,
    				max: 1,
    				mods: 0,
    				score: 0,
    				set: () => {
    					this.skills.stealth.score = this.skills.stealth.base + this.skills.stealth.mods;
    					return this.skills.stealth.score
    				},
    			},
    			survival: {
    				name: `Survival`,
    				parent: `Constitution`,
    				base: 0,
    				max: 1,
    				mods: 0,
    				score: 0,
    				set: () => {
    					this.skills.survival.score = this.skills.survival.base + this.skills.survival.mods;
    					return this.skills.survival.score
    				},
    			},
    			tame: {
    				name: `Tame`,
    				parent: `Demeanor`,
    				base: 0,
    				max: 1,
    				mods: 0,
    				score: 0,
    				set: () => {
    					this.skills.tame.score = this.skills.tame.base + this.skills.tame.mods;
    					return this.skills.tame.score
    				},
    			},
    		},
    		this.props = {
    			block: {
    				name: `Block`,
    				base: 0,
    				mods: 0,
    				score: 0,
    				set: () => {
    					this.props.block.base = this.skills.melee.set();
    					this.props.block.score = this.props.block.base + this.props.block.mods;
    					return this.props.block.score
    				}
    			},
    			dodge: {
    				name: `Dodge`,
    				base: 0,
    				mods: 0,
    				score: 0,
    				set: () => {
    					this.props.dodge.base = this.skills.acrobatics.set();
    					this.props.dodge.score = this.props.dodge.base + this.props.dodge.mods;
    					return this.props.dodge.score
    				}
    			},
    			health: {
    				name: `Health`,
    				base: 2,
    				mods: 0,
    				score: 2,
    				set: () => {
    					this.props.health.base = this.traits.constitution.set() * 2;
    					this.props.health.score = this.props.health.base + this.props.health.mods;
    					return this.props.health.score
    				}
    			},
    			init: {
    				name: `Initiative`,
    				base: 1,
    				mods: 0,
    				score: 1,
    				set: () => {
    					this.props.init.base = this.traits.agility.set();
    					this.props.init.score = this.props.init.base + this.props.init.mods;
    					return this.props.init.score
    				}
    			},
    			luck: {
    				name: `Luck`,
    				base: 1,
    				mods: 0,
    				score: 1,
    				set: () => {
    					this.props.luck.base = this.traits.demeanor.set();
    					this.props.luck.score = this.props.luck.base + this.props.luck.mods;
    					return this.props.luck.score
    				}
    			},
    			psyche: {
    				name: `Psyche`,
    				base: 2,
    				mods: 0,
    				score: 2,
    				set: () => {
    					this.props.psyche.base = this.traits.demeanor.set() * 2;
    					this.props.psyche.score = this.props.psyche.base + this.props.psyche.mods;
    					return this.props.psyche.score
    				}
    			},
    			reflex: {
    				name: `Reflex`,
    				base: 0,
    				mods: 0,
    				score: 0,
    				set: () => {
    					this.props.reflex.base = Math.floor(this.skills.perception.set() / 2);
    					this.props.reflex.score = this.props.reflex.base + this.props.reflex.mods;
    					return this.props.reflex.score
    				}
    			},
    			speed: {
    				name: `Speed`,
    				base: 2,
    				mods: 0,
    				score: 2,
    				set: () => {
    					this.props.speed.base = this.traits.agility.set() + this.traits.constitution.set();
    					this.props.speed.score = this.props.speed.base + this.props.speed.mods;
    					return this.props.speed.score
    				}
    			},
    			xp: {
    				name: `Experience`,
    				base: 6,
    				mods: 0,
    				score: 6,
    				set: () => {
    					this.props.xp.base = this.traits.brains.set() * 6;
    					this.props.xp.score = this.props.xp.base + this.props.xp.mods;
    					return this.props.xp.score
    				}
    			},
    		},
    		this.abilities = [],
    		this.gear = {
    			armor: {
    				name: `Armor`,
    				inventory: []
    			},
    			weapons: {
    				name: `Weapons`,
    				inventory: []
    			},
    			backpack: {
    				name: `Backpack`,
    				inventory: []
    			},
    			ammo: {
    				name: `Ammo`,
    				inventory: []
    			},
    		};
    	}
    	updateProps() {
    		let props = Object.keys(this.props);
    		props.forEach((prop) => { this.props[prop].set(); });
    	}
    }

    const newCharacter = new Character();

    const character = writable(newCharacter);

    /* src/components/creator/CreDescription.svelte generated by Svelte v3.16.7 */
    const file$3 = "src/components/creator/CreDescription.svelte";

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[16] = list[i].name;
    	child_ctx[17] = list[i].random;
    	return child_ctx;
    }

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[13] = list[i];
    	return child_ctx;
    }

    // (93:3) {#each pair as {name, random}}
    function create_each_block_1(ctx) {
    	let div1;
    	let div0;
    	let span;
    	let t0_value = /*name*/ ctx[16] + "";
    	let t0;
    	let t1;
    	let t2;
    	let input;
    	let t3;
    	let button;
    	let dispose;

    	function input_input_handler() {
    		/*input_input_handler*/ ctx[12].call(input, /*name*/ ctx[16]);
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = text(":");
    			t2 = space();
    			input = element("input");
    			t3 = space();
    			button = element("button");
    			button.textContent = "Random";
    			attr_dev(span, "class", "stat-label");
    			add_location(span, file$3, 95, 6, 2681);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "class", "pair-input");
    			add_location(input, file$3, 96, 6, 2727);
    			add_location(button, file$3, 101, 6, 2862);
    			attr_dev(div0, "class", "pair-container");
    			add_location(div0, file$3, 94, 5, 2646);
    			attr_dev(div1, "class", "pair-block");
    			add_location(div1, file$3, 93, 4, 2616);

    			dispose = [
    				listen_dev(input, "input", input_input_handler),
    				listen_dev(button, "click", /*random*/ ctx[17], false, false, false)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, span);
    			append_dev(span, t0);
    			append_dev(span, t1);
    			append_dev(div0, t2);
    			append_dev(div0, input);
    			set_input_value(input, /*$character*/ ctx[0].description[/*name*/ ctx[16].toLowerCase()].value);
    			append_dev(div0, t3);
    			append_dev(div0, button);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*$character, descriptions*/ 9 && input.value !== /*$character*/ ctx[0].description[/*name*/ ctx[16].toLowerCase()].value) {
    				set_input_value(input, /*$character*/ ctx[0].description[/*name*/ ctx[16].toLowerCase()].value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(93:3) {#each pair as {name, random}}",
    		ctx
    	});

    	return block;
    }

    // (91:1) {#each descriptions as pair}
    function create_each_block(ctx) {
    	let div;
    	let each_value_1 = /*pair*/ ctx[13];
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "stat-block");
    			add_location(div, file$3, 91, 2, 2553);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*descriptions, $character*/ 9) {
    				each_value_1 = /*pair*/ ctx[13];
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(91:1) {#each descriptions as pair}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div3;
    	let div0;
    	let h2;
    	let t1;
    	let div1;
    	let span0;
    	let t3;
    	let input0;
    	let t4;
    	let div2;
    	let span1;
    	let t6;
    	let input1;
    	let t7;
    	let button0;
    	let t9;
    	let t10;
    	let button1;
    	let div3_intro;
    	let dispose;
    	let each_value = /*descriptions*/ ctx[3];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Description";
    			t1 = space();
    			div1 = element("div");
    			span0 = element("span");
    			span0.textContent = "Player:";
    			t3 = space();
    			input0 = element("input");
    			t4 = space();
    			div2 = element("div");
    			span1 = element("span");
    			span1.textContent = "Character:";
    			t6 = space();
    			input1 = element("input");
    			t7 = space();
    			button0 = element("button");
    			button0.textContent = "Random";
    			t9 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t10 = space();
    			button1 = element("button");
    			button1.textContent = "Random Character";
    			add_location(h2, file$3, 71, 2, 2074);
    			attr_dev(div0, "class", "step-title");
    			add_location(div0, file$3, 70, 1, 2047);
    			attr_dev(span0, "class", "stat-label");
    			add_location(span0, file$3, 74, 2, 2131);
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "class", "full-block");
    			add_location(input0, file$3, 75, 2, 2173);
    			attr_dev(div1, "class", "stat-block");
    			add_location(div1, file$3, 73, 1, 2104);
    			attr_dev(span1, "class", "stat-label");
    			add_location(span1, file$3, 82, 2, 2313);
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "class", "full-block");
    			add_location(input1, file$3, 83, 2, 2358);
    			add_location(button0, file$3, 88, 2, 2467);
    			attr_dev(div2, "class", "stat-block");
    			add_location(div2, file$3, 81, 1, 2286);
    			attr_dev(button1, "class", "center-button");
    			add_location(button1, file$3, 107, 1, 2957);
    			attr_dev(div3, "class", "description-step");
    			add_location(div3, file$3, 69, 0, 2007);

    			dispose = [
    				listen_dev(input0, "input", /*input0_input_handler*/ ctx[10]),
    				listen_dev(input1, "input", /*input1_input_handler*/ ctx[11]),
    				listen_dev(button0, "click", /*randomName*/ ctx[1], false, false, false),
    				listen_dev(button1, "click", /*randomDescription*/ ctx[2], false, false, false)
    			];
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);
    			append_dev(div0, h2);
    			append_dev(div3, t1);
    			append_dev(div3, div1);
    			append_dev(div1, span0);
    			append_dev(div1, t3);
    			append_dev(div1, input0);
    			set_input_value(input0, /*$character*/ ctx[0].description.playerName.value);
    			append_dev(div3, t4);
    			append_dev(div3, div2);
    			append_dev(div2, span1);
    			append_dev(div2, t6);
    			append_dev(div2, input1);
    			set_input_value(input1, /*$character*/ ctx[0].description.characterName.value);
    			append_dev(div2, t7);
    			append_dev(div2, button0);
    			append_dev(div3, t9);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div3, null);
    			}

    			append_dev(div3, t10);
    			append_dev(div3, button1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$character*/ 1 && input0.value !== /*$character*/ ctx[0].description.playerName.value) {
    				set_input_value(input0, /*$character*/ ctx[0].description.playerName.value);
    			}

    			if (dirty & /*$character*/ 1 && input1.value !== /*$character*/ ctx[0].description.characterName.value) {
    				set_input_value(input1, /*$character*/ ctx[0].description.characterName.value);
    			}

    			if (dirty & /*descriptions, $character*/ 9) {
    				each_value = /*descriptions*/ ctx[3];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div3, t10);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: function intro(local) {
    			if (!div3_intro) {
    				add_render_callback(() => {
    					div3_intro = create_in_transition(div3, fade, {});
    					div3_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			destroy_each(each_blocks, detaching);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let $character;
    	validate_store(character, "character");
    	component_subscribe($$self, character, $$value => $$invalidate(0, $character = $$value));

    	const randomName = () => {
    		if ($character.description.gender.value == "Male") {
    			set_store_value(character, $character.description.characterName.value = random(maleNames), $character);
    		} else if ($character.description.gender.value == "Female") {
    			set_store_value(character, $character.description.characterName.value = random(femaleNames), $character);
    		} else {
    			set_store_value(character, $character.description.characterName.value = random([...femaleNames, ...maleNames]), $character);
    		}
    	};

    	const randomHeight = () => {
    		const totalInches = Math.ceil(Math.random() * 14 + 60);
    		const feet = Math.floor(totalInches / 12);
    		const inches = Math.floor(totalInches % 12);
    		set_store_value(character, $character.description.height.value = `${feet}' ${inches}"`, $character);
    	};

    	const randomWeight = () => {
    		set_store_value(character, $character.description.weight.value = `${Math.ceil(Math.random() * 100) + 100}lbs`, $character);
    	};

    	const randomHair = () => {
    		set_store_value(character, $character.description.hair.value = random(["Auburn", "Bald", "Black", "Blonde", "Brunette", "Gray", "Red", "White"]), $character);
    	};

    	const randomSkin = () => {
    		set_store_value(character, $character.description.skin.value = random(["Black", "Brown", "Olive", "Pale", "Tan", "White"]), $character);
    	};

    	const randomGender = () => {
    		set_store_value(character, $character.description.gender.value = random(["Female", "Male"]), $character);
    	};

    	const randomAge = () => {
    		set_store_value(character, $character.description.age.value = Math.ceil(Math.random() * 33 + 17), $character);
    	};

    	const randomDescription = () => {
    		randomAge();
    		randomGender();
    		randomSkin();
    		randomHair();
    		randomWeight();
    		randomHeight();
    		randomName();
    	};

    	const descriptions = [
    		[
    			{ name: "Height", random: randomHeight },
    			{ name: "Weight", random: randomWeight }
    		],
    		[{ name: "Skin", random: randomSkin }, { name: "Hair", random: randomHair }],
    		[{ name: "Gender", random: randomGender }, { name: "Age", random: randomAge }]
    	];

    	function input0_input_handler() {
    		$character.description.playerName.value = this.value;
    		character.set($character);
    	}

    	function input1_input_handler() {
    		$character.description.characterName.value = this.value;
    		character.set($character);
    	}

    	function input_input_handler(name) {
    		$character.description[name.toLowerCase()].value = this.value;
    		character.set($character);
    		$$invalidate(3, descriptions);
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("$character" in $$props) character.set($character = $$props.$character);
    	};

    	return [
    		$character,
    		randomName,
    		randomDescription,
    		descriptions,
    		randomHeight,
    		randomWeight,
    		randomHair,
    		randomSkin,
    		randomGender,
    		randomAge,
    		input0_input_handler,
    		input1_input_handler,
    		input_input_handler
    	];
    }

    class CreDescription extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CreDescription",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    const capitalize = (word) => {
    	return word.charAt(0).toUpperCase() + word.slice(1)
    };

    /* src/components/creator/CreTraits.svelte generated by Svelte v3.16.7 */
    const file$4 = "src/components/creator/CreTraits.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i];
    	return child_ctx;
    }

    // (66:2) {#each traits as trait}
    function create_each_block$1(ctx) {
    	let div10;
    	let div0;
    	let span;
    	let t0_value = /*$character*/ ctx[1].traits[/*trait*/ ctx[10]].name + "";
    	let t0;
    	let t1;
    	let div9;
    	let div8;
    	let input;
    	let input_name_value;
    	let input_invalid_value;
    	let t2;
    	let div7;
    	let div1;
    	let t4;
    	let div2;
    	let t6;
    	let div3;
    	let t8;
    	let div4;
    	let t10;
    	let div5;
    	let t12;
    	let div6;
    	let t14;
    	let dispose;

    	function input_change_input_handler() {
    		/*input_change_input_handler*/ ctx[8].call(input, /*trait*/ ctx[10]);
    	}

    	const block = {
    		c: function create() {
    			div10 = element("div");
    			div0 = element("div");
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			div9 = element("div");
    			div8 = element("div");
    			input = element("input");
    			t2 = space();
    			div7 = element("div");
    			div1 = element("div");
    			div1.textContent = "1";
    			t4 = space();
    			div2 = element("div");
    			div2.textContent = "2";
    			t6 = space();
    			div3 = element("div");
    			div3.textContent = "3";
    			t8 = space();
    			div4 = element("div");
    			div4.textContent = "4";
    			t10 = space();
    			div5 = element("div");
    			div5.textContent = "5";
    			t12 = space();
    			div6 = element("div");
    			div6.textContent = "6";
    			t14 = space();
    			attr_dev(span, "class", "stat-label svelte-r3unta");
    			add_location(span, file$4, 68, 5, 1709);
    			add_location(div0, file$4, 67, 4, 1698);
    			attr_dev(input, "type", "range");
    			attr_dev(input, "name", input_name_value = /*$character*/ ctx[1].traits[/*trait*/ ctx[10]].name.toLowerCase());
    			attr_dev(input, "min", "1");
    			attr_dev(input, "max", "6");
    			attr_dev(input, "invalid", input_invalid_value = /*remaining*/ ctx[0] < 0);
    			add_location(input, file$4, 72, 6, 1851);
    			attr_dev(div1, "class", "range-number trait-1 svelte-r3unta");
    			add_location(div1, file$4, 82, 7, 2171);
    			attr_dev(div2, "class", "range-number trait-2 svelte-r3unta");
    			add_location(div2, file$4, 83, 7, 2220);
    			attr_dev(div3, "class", "range-number trait-3 svelte-r3unta");
    			add_location(div3, file$4, 84, 7, 2269);
    			attr_dev(div4, "class", "range-number trait-4 svelte-r3unta");
    			add_location(div4, file$4, 85, 7, 2318);
    			attr_dev(div5, "class", "range-number trait-5 svelte-r3unta");
    			add_location(div5, file$4, 86, 7, 2367);
    			attr_dev(div6, "class", "range-number trait-6 svelte-r3unta");
    			add_location(div6, file$4, 87, 7, 2416);
    			attr_dev(div7, "class", "range-indicator");
    			add_location(div7, file$4, 81, 6, 2134);
    			attr_dev(div8, "class", "range-block");
    			add_location(div8, file$4, 71, 5, 1819);
    			attr_dev(div9, "class", "stat-column svelte-r3unta");
    			add_location(div9, file$4, 70, 4, 1788);
    			attr_dev(div10, "class", "stat-block svelte-r3unta");
    			add_location(div10, file$4, 66, 3, 1669);

    			dispose = [
    				listen_dev(input, "change", input_change_input_handler),
    				listen_dev(input, "input", input_change_input_handler),
    				listen_dev(input, "click", prevent_default(/*click_handler*/ ctx[9]), false, true, false)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div10, anchor);
    			append_dev(div10, div0);
    			append_dev(div0, span);
    			append_dev(span, t0);
    			append_dev(div10, t1);
    			append_dev(div10, div9);
    			append_dev(div9, div8);
    			append_dev(div8, input);
    			set_input_value(input, /*$character*/ ctx[1].traits[/*trait*/ ctx[10]].base);
    			append_dev(div8, t2);
    			append_dev(div8, div7);
    			append_dev(div7, div1);
    			append_dev(div7, t4);
    			append_dev(div7, div2);
    			append_dev(div7, t6);
    			append_dev(div7, div3);
    			append_dev(div7, t8);
    			append_dev(div7, div4);
    			append_dev(div7, t10);
    			append_dev(div7, div5);
    			append_dev(div7, t12);
    			append_dev(div7, div6);
    			append_dev(div10, t14);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*$character*/ 2 && t0_value !== (t0_value = /*$character*/ ctx[1].traits[/*trait*/ ctx[10]].name + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*$character*/ 2 && input_name_value !== (input_name_value = /*$character*/ ctx[1].traits[/*trait*/ ctx[10]].name.toLowerCase())) {
    				attr_dev(input, "name", input_name_value);
    			}

    			if (dirty & /*remaining*/ 1 && input_invalid_value !== (input_invalid_value = /*remaining*/ ctx[0] < 0)) {
    				attr_dev(input, "invalid", input_invalid_value);
    			}

    			if (dirty & /*$character, traits*/ 6) {
    				set_input_value(input, /*$character*/ ctx[1].traits[/*trait*/ ctx[10]].base);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div10);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(66:2) {#each traits as trait}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let div3;
    	let div0;
    	let h2;
    	let t1;
    	let div1;
    	let h3;
    	let t2;
    	let t3;
    	let t4;
    	let div2;
    	let t5;
    	let button;
    	let div3_intro;
    	let dispose;
    	let each_value = /*traits*/ ctx[2];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Traits";
    			t1 = space();
    			div1 = element("div");
    			h3 = element("h3");
    			t2 = text("Points Remaining: ");
    			t3 = text(/*remaining*/ ctx[0]);
    			t4 = space();
    			div2 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t5 = space();
    			button = element("button");
    			button.textContent = "Random Traits";
    			add_location(h2, file$4, 59, 2, 1516);
    			attr_dev(div0, "class", "step-title");
    			add_location(div0, file$4, 58, 1, 1489);
    			add_location(h3, file$4, 62, 2, 1567);
    			attr_dev(div1, "class", "remaining svelte-r3unta");
    			add_location(div1, file$4, 61, 1, 1541);
    			attr_dev(div2, "class", "trait-list svelte-r3unta");
    			add_location(div2, file$4, 64, 1, 1615);
    			attr_dev(button, "class", "center-button");
    			add_location(button, file$4, 94, 1, 2523);
    			attr_dev(div3, "class", "traits-step");
    			add_location(div3, file$4, 57, 0, 1454);
    			dispose = listen_dev(button, "click", /*randomTraits*/ ctx[4], false, false, false);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);
    			append_dev(div0, h2);
    			append_dev(div3, t1);
    			append_dev(div3, div1);
    			append_dev(div1, h3);
    			append_dev(h3, t2);
    			append_dev(h3, t3);
    			append_dev(div3, t4);
    			append_dev(div3, div2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div2, null);
    			}

    			append_dev(div3, t5);
    			append_dev(div3, button);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*remaining*/ 1) set_data_dev(t3, /*remaining*/ ctx[0]);

    			if (dirty & /*$character, traits, remaining, countTraitPoints*/ 15) {
    				each_value = /*traits*/ ctx[2];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
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
    		i: function intro(local) {
    			if (!div3_intro) {
    				add_render_callback(() => {
    					div3_intro = create_in_transition(div3, fade, {});
    					div3_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			destroy_each(each_blocks, detaching);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const traitPoints = 12;

    function instance$6($$self, $$props, $$invalidate) {
    	let $character;
    	validate_store(character, "character");
    	component_subscribe($$self, character, $$value => $$invalidate(1, $character = $$value));
    	const traits = Object.keys($character.traits);
    	let remaining = traitPoints - traits.length;

    	const countTraitPoints = (trait = ``) => {
    		$$invalidate(0, remaining = traitPoints - totalTraits());
    		if (trait && remaining < 0) reduceTrait(trait);
    		setSkillMax();
    		$character.updateProps();
    	};

    	const totalTraits = () => {
    		let traitCount = 0;

    		traits.forEach(trait => {
    			traitCount += $character.traits[trait].base;
    		});

    		return traitCount;
    	};

    	const reduceTrait = trait => {
    		set_store_value(character, $character.traits[trait.name].base -= 1, $character);
    		$character.traits[trait.name].set();
    		trait.value -= 1;
    		countTraitPoints(trait);
    	};

    	const setSkillMax = () => {
    		traits.forEach(trait => {
    			Object.keys($character.skills).forEach(skill => {
    				if ($character.skills[skill].parent === capitalize(trait)) {
    					set_store_value(character, $character.skills[skill].max = $character.traits[trait].base, $character);
    				}
    			});
    		});
    	};

    	const randomTraits = () => {
    		traits.forEach(trait => {
    			set_store_value(character, $character.traits[trait].base = 1, $character);
    			$character.traits[trait].set();
    		});

    		$$invalidate(0, remaining = traitPoints - traits.length);

    		while (remaining > 0) {
    			const randTrait = random(traits);
    			set_store_value(character, $character.traits[randTrait].base += 1, $character);
    			$character.traits[randTrait].set();
    			$$invalidate(0, remaining -= 1);
    		}

    		countTraitPoints();
    	};

    	function input_change_input_handler(trait) {
    		$character.traits[trait].base = to_number(this.value);
    		character.set($character);
    		$$invalidate(2, traits);
    	}

    	const click_handler = event => countTraitPoints(event.target);

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("remaining" in $$props) $$invalidate(0, remaining = $$props.remaining);
    		if ("$character" in $$props) character.set($character = $$props.$character);
    	};

    	return [
    		remaining,
    		$character,
    		traits,
    		countTraitPoints,
    		randomTraits,
    		totalTraits,
    		reduceTrait,
    		setSkillMax,
    		input_change_input_handler,
    		click_handler
    	];
    }

    class CreTraits extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CreTraits",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    const HideShow = (x, y) => {
    	x.visible = !x.visible;
    	return y
    };

    /* src/components/creator/CreSkills.svelte generated by Svelte v3.16.7 */
    const file$5 = "src/components/creator/CreSkills.svelte";

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	return child_ctx;
    }

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	return child_ctx;
    }

    // (45:4) {#if group.visible}
    function create_if_block$1(ctx) {
    	let each_1_anchor;
    	let each_value_1 = /*skills*/ ctx[3];
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
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
    			if (dirty & /*$character, skillGroups, skills, remaining, countSkillPoints*/ 31) {
    				each_value_1 = /*skills*/ ctx[3];
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(45:4) {#if group.visible}",
    		ctx
    	});

    	return block;
    }

    // (47:6) {#if $character.traits[group.name].name == $character.skills[skill].parent}
    function create_if_block_1$1(ctx) {
    	let br;
    	let t0;
    	let div11;
    	let div0;
    	let span;
    	let t1_value = /*$character*/ ctx[2].skills[/*skill*/ ctx[12]].name + "";
    	let t1;
    	let t2;
    	let div10;
    	let div1;
    	let input;
    	let input_name_value;
    	let input_invalid_value;
    	let t3;
    	let div9;
    	let div2;
    	let t5;
    	let div3;
    	let t7;
    	let div4;
    	let t9;
    	let div5;
    	let t11;
    	let div6;
    	let t13;
    	let div7;
    	let t15;
    	let div8;
    	let t17;
    	let dispose;

    	function input_change_input_handler() {
    		/*input_change_input_handler*/ ctx[7].call(input, /*skill*/ ctx[12]);
    	}

    	const block = {
    		c: function create() {
    			br = element("br");
    			t0 = space();
    			div11 = element("div");
    			div0 = element("div");
    			span = element("span");
    			t1 = text(t1_value);
    			t2 = space();
    			div10 = element("div");
    			div1 = element("div");
    			input = element("input");
    			t3 = space();
    			div9 = element("div");
    			div2 = element("div");
    			div2.textContent = "0";
    			t5 = space();
    			div3 = element("div");
    			div3.textContent = "1";
    			t7 = space();
    			div4 = element("div");
    			div4.textContent = "2";
    			t9 = space();
    			div5 = element("div");
    			div5.textContent = "3";
    			t11 = space();
    			div6 = element("div");
    			div6.textContent = "4";
    			t13 = space();
    			div7 = element("div");
    			div7.textContent = "5";
    			t15 = space();
    			div8 = element("div");
    			div8.textContent = "6";
    			t17 = space();
    			add_location(br, file$5, 47, 7, 1388);
    			attr_dev(span, "class", "stat-label svelte-19jmiyj");
    			add_location(span, file$5, 50, 9, 1481);
    			attr_dev(div0, "class", "stat-column name-column svelte-19jmiyj");
    			add_location(div0, file$5, 49, 8, 1434);
    			attr_dev(input, "class", "slider-input");
    			attr_dev(input, "type", "range");
    			attr_dev(input, "name", input_name_value = /*$character*/ ctx[2].skills[/*skill*/ ctx[12]].name.toLowerCase());
    			attr_dev(input, "min", "0");
    			attr_dev(input, "max", "6");
    			attr_dev(input, "invalid", input_invalid_value = /*remaining*/ ctx[1] < 0 || this.value > /*$character*/ ctx[2].traits[/*group*/ ctx[9].name].base);
    			add_location(input, file$5, 54, 10, 1651);
    			attr_dev(div1, "class", "stat-input svelte-19jmiyj");
    			add_location(div1, file$5, 53, 9, 1616);
    			attr_dev(div2, "class", "svelte-19jmiyj");
    			add_location(div2, file$5, 66, 10, 2098);
    			attr_dev(div3, "class", "svelte-19jmiyj");
    			add_location(div3, file$5, 67, 10, 2121);
    			attr_dev(div4, "class", "svelte-19jmiyj");
    			add_location(div4, file$5, 68, 10, 2144);
    			attr_dev(div5, "class", "svelte-19jmiyj");
    			add_location(div5, file$5, 69, 10, 2167);
    			attr_dev(div6, "class", "svelte-19jmiyj");
    			add_location(div6, file$5, 70, 10, 2190);
    			attr_dev(div7, "class", "svelte-19jmiyj");
    			add_location(div7, file$5, 71, 10, 2213);
    			attr_dev(div8, "class", "svelte-19jmiyj");
    			add_location(div8, file$5, 72, 10, 2236);
    			attr_dev(div9, "class", "stat-input svelte-19jmiyj");
    			add_location(div9, file$5, 65, 9, 2063);
    			attr_dev(div10, "class", "stat-column value-column svelte-19jmiyj");
    			add_location(div10, file$5, 52, 8, 1568);
    			attr_dev(div11, "class", "skill-block svelte-19jmiyj");
    			add_location(div11, file$5, 48, 7, 1400);

    			dispose = [
    				listen_dev(input, "change", input_change_input_handler),
    				listen_dev(input, "input", input_change_input_handler),
    				listen_dev(input, "input", prevent_default(/*input_handler*/ ctx[8]), false, true, false)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, br, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div11, anchor);
    			append_dev(div11, div0);
    			append_dev(div0, span);
    			append_dev(span, t1);
    			append_dev(div11, t2);
    			append_dev(div11, div10);
    			append_dev(div10, div1);
    			append_dev(div1, input);
    			set_input_value(input, /*$character*/ ctx[2].skills[/*skill*/ ctx[12]].base);
    			append_dev(div10, t3);
    			append_dev(div10, div9);
    			append_dev(div9, div2);
    			append_dev(div9, t5);
    			append_dev(div9, div3);
    			append_dev(div9, t7);
    			append_dev(div9, div4);
    			append_dev(div9, t9);
    			append_dev(div9, div5);
    			append_dev(div9, t11);
    			append_dev(div9, div6);
    			append_dev(div9, t13);
    			append_dev(div9, div7);
    			append_dev(div9, t15);
    			append_dev(div9, div8);
    			append_dev(div11, t17);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*$character*/ 4 && t1_value !== (t1_value = /*$character*/ ctx[2].skills[/*skill*/ ctx[12]].name + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*$character*/ 4 && input_name_value !== (input_name_value = /*$character*/ ctx[2].skills[/*skill*/ ctx[12]].name.toLowerCase())) {
    				attr_dev(input, "name", input_name_value);
    			}

    			if (dirty & /*remaining, $character, skillGroups*/ 7 && input_invalid_value !== (input_invalid_value = /*remaining*/ ctx[1] < 0 || this.value > /*$character*/ ctx[2].traits[/*group*/ ctx[9].name].base)) {
    				attr_dev(input, "invalid", input_invalid_value);
    			}

    			if (dirty & /*$character, skills*/ 12) {
    				set_input_value(input, /*$character*/ ctx[2].skills[/*skill*/ ctx[12]].base);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(br);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div11);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(47:6) {#if $character.traits[group.name].name == $character.skills[skill].parent}",
    		ctx
    	});

    	return block;
    }

    // (46:5) {#each skills as skill}
    function create_each_block_1$1(ctx) {
    	let if_block_anchor;
    	let if_block = /*$character*/ ctx[2].traits[/*group*/ ctx[9].name].name == /*$character*/ ctx[2].skills[/*skill*/ ctx[12]].parent && create_if_block_1$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (/*$character*/ ctx[2].traits[/*group*/ ctx[9].name].name == /*$character*/ ctx[2].skills[/*skill*/ ctx[12]].parent) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_1$1(ctx);
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
    		id: create_each_block_1$1.name,
    		type: "each",
    		source: "(46:5) {#each skills as skill}",
    		ctx
    	});

    	return block;
    }

    // (40:2) {#each skillGroups as group}
    function create_each_block$2(ctx) {
    	let div1;
    	let div0;
    	let h3;
    	let t0_value = /*$character*/ ctx[2].traits[/*group*/ ctx[9].name].name + "";
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let dispose;

    	function click_handler(...args) {
    		return /*click_handler*/ ctx[6](/*group*/ ctx[9], ...args);
    	}

    	let if_block = /*group*/ ctx[9].visible && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h3 = element("h3");
    			t0 = text(t0_value);
    			t1 = text(" Skills");
    			t2 = space();
    			if (if_block) if_block.c();
    			t3 = space();
    			add_location(h3, file$5, 42, 5, 1182);
    			attr_dev(div0, "class", "parent-trait-title svelte-19jmiyj");
    			add_location(div0, file$5, 41, 4, 1084);
    			attr_dev(div1, "class", "trait-section svelte-19jmiyj");
    			add_location(div1, file$5, 40, 3, 1052);
    			dispose = listen_dev(div0, "click", click_handler, false, false, false);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h3);
    			append_dev(h3, t0);
    			append_dev(h3, t1);
    			append_dev(div1, t2);
    			if (if_block) if_block.m(div1, null);
    			append_dev(div1, t3);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*$character, skillGroups*/ 5 && t0_value !== (t0_value = /*$character*/ ctx[2].traits[/*group*/ ctx[9].name].name + "")) set_data_dev(t0, t0_value);

    			if (/*group*/ ctx[9].visible) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(div1, t3);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block) if_block.d();
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(40:2) {#each skillGroups as group}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let div3;
    	let div0;
    	let h2;
    	let t1;
    	let div1;
    	let h3;
    	let t2;
    	let t3;
    	let t4;
    	let div2;
    	let div3_intro;
    	let each_value = /*skillGroups*/ ctx[0];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Skills";
    			t1 = space();
    			div1 = element("div");
    			h3 = element("h3");
    			t2 = text("Points Remaining: ");
    			t3 = text(/*remaining*/ ctx[1]);
    			t4 = space();
    			div2 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(h2, file$5, 33, 2, 894);
    			attr_dev(div0, "class", "step-title");
    			add_location(div0, file$5, 32, 1, 867);
    			add_location(h3, file$5, 36, 2, 945);
    			attr_dev(div1, "class", "remaining svelte-19jmiyj");
    			add_location(div1, file$5, 35, 1, 919);
    			attr_dev(div2, "class", "skill-list svelte-19jmiyj");
    			add_location(div2, file$5, 38, 1, 993);
    			attr_dev(div3, "class", "skills-step");
    			add_location(div3, file$5, 31, 0, 832);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);
    			append_dev(div0, h2);
    			append_dev(div3, t1);
    			append_dev(div3, div1);
    			append_dev(div1, h3);
    			append_dev(h3, t2);
    			append_dev(h3, t3);
    			append_dev(div3, t4);
    			append_dev(div3, div2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div2, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*remaining*/ 2) set_data_dev(t3, /*remaining*/ ctx[1]);

    			if (dirty & /*skillGroups, skills, $character, remaining, countSkillPoints, HideShow*/ 31) {
    				each_value = /*skillGroups*/ ctx[0];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
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
    		i: function intro(local) {
    			if (!div3_intro) {
    				add_render_callback(() => {
    					div3_intro = create_in_transition(div3, fade, {});
    					div3_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let $character;
    	validate_store(character, "character");
    	component_subscribe($$self, character, $$value => $$invalidate(2, $character = $$value));
    	const skills = Object.keys($character.skills);
    	let skillGroups = [];

    	Object.keys($character.traits).forEach(trait => {
    		skillGroups.push({ name: trait, visible: false });
    	});

    	let skillPoints = $character.traits.brains.base * 3;
    	let remaining = skillPoints;

    	const countSkillPoints = event => {
    		let target = event.target;
    		let skillCount = 0;

    		skills.forEach(skill => {
    			skillCount += $character.skills[skill].base;
    		});

    		$$invalidate(1, remaining = skillPoints - skillCount);

    		if (remaining < 0 || target.value > $character.skills[target.name].max) {
    			set_store_value(character, $character.skills[target.name].base -= 1, $character);
    			target.value -= 1;
    			countSkillPoints(event);
    		}

    		$character.updateProps();
    	};

    	const click_handler = group => $$invalidate(0, skillGroups = HideShow(group, skillGroups));

    	function input_change_input_handler(skill) {
    		$character.skills[skill].base = to_number(this.value);
    		character.set($character);
    		$$invalidate(3, skills);
    	}

    	const input_handler = event => countSkillPoints(event);

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("skillGroups" in $$props) $$invalidate(0, skillGroups = $$props.skillGroups);
    		if ("skillPoints" in $$props) skillPoints = $$props.skillPoints;
    		if ("remaining" in $$props) $$invalidate(1, remaining = $$props.remaining);
    		if ("$character" in $$props) character.set($character = $$props.$character);
    	};

    	return [
    		skillGroups,
    		remaining,
    		$character,
    		skills,
    		countSkillPoints,
    		skillPoints,
    		click_handler,
    		input_change_input_handler,
    		input_handler
    	];
    }

    class CreSkills extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CreSkills",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/components/creator/CreProperties.svelte generated by Svelte v3.16.7 */
    const file$6 = "src/components/creator/CreProperties.svelte";

    function create_fragment$8(ctx) {
    	let div14;
    	let div0;
    	let h2;
    	let t1;
    	let div13;
    	let div7;
    	let span0;
    	let div1;
    	let t2_value = /*$character*/ ctx[0].props.health.name + "";
    	let t2;
    	let t3;
    	let t4_value = /*$character*/ ctx[0].props.health.score + "";
    	let t4;
    	let t5;
    	let div2;
    	let t6_value = /*$character*/ ctx[0].props.init.name + "";
    	let t6;
    	let t7;
    	let t8_value = /*$character*/ ctx[0].props.init.score + "";
    	let t8;
    	let t9;
    	let div3;
    	let t10_value = /*$character*/ ctx[0].props.speed.name + "";
    	let t10;
    	let t11;
    	let t12_value = /*$character*/ ctx[0].props.speed.score + "";
    	let t12;
    	let t13;
    	let span1;
    	let div4;
    	let t14_value = /*$character*/ ctx[0].props.psyche.name + "";
    	let t14;
    	let t15;
    	let t16_value = /*$character*/ ctx[0].props.psyche.score + "";
    	let t16;
    	let t17;
    	let div5;
    	let t18_value = /*$character*/ ctx[0].props.luck.name + "";
    	let t18;
    	let t19;
    	let t20_value = /*$character*/ ctx[0].props.luck.score + "";
    	let t20;
    	let t21;
    	let div6;
    	let t22_value = /*$character*/ ctx[0].props.xp.name + "";
    	let t22;
    	let t23;
    	let t24_value = /*$character*/ ctx[0].props.xp.score + "";
    	let t24;
    	let t25;
    	let div12;
    	let div8;
    	let t27;
    	let div9;
    	let t28_value = /*$character*/ ctx[0].props.block.name + "";
    	let t28;
    	let t29;
    	let t30_value = /*$character*/ ctx[0].props.block.score + "";
    	let t30;
    	let t31;
    	let div10;
    	let t32_value = /*$character*/ ctx[0].props.dodge.name + "";
    	let t32;
    	let t33;
    	let t34_value = /*$character*/ ctx[0].props.dodge.score + "";
    	let t34;
    	let t35;
    	let div11;
    	let t36_value = /*$character*/ ctx[0].props.reflex.name + "";
    	let t36;
    	let t37;
    	let t38_value = /*$character*/ ctx[0].props.reflex.score + "";
    	let t38;
    	let div14_intro;

    	const block = {
    		c: function create() {
    			div14 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Properties";
    			t1 = space();
    			div13 = element("div");
    			div7 = element("div");
    			span0 = element("span");
    			div1 = element("div");
    			t2 = text(t2_value);
    			t3 = text(": ");
    			t4 = text(t4_value);
    			t5 = space();
    			div2 = element("div");
    			t6 = text(t6_value);
    			t7 = text(": ");
    			t8 = text(t8_value);
    			t9 = space();
    			div3 = element("div");
    			t10 = text(t10_value);
    			t11 = text(": ");
    			t12 = text(t12_value);
    			t13 = space();
    			span1 = element("span");
    			div4 = element("div");
    			t14 = text(t14_value);
    			t15 = text(": ");
    			t16 = text(t16_value);
    			t17 = space();
    			div5 = element("div");
    			t18 = text(t18_value);
    			t19 = text(": ");
    			t20 = text(t20_value);
    			t21 = space();
    			div6 = element("div");
    			t22 = text(t22_value);
    			t23 = text(": ");
    			t24 = text(t24_value);
    			t25 = space();
    			div12 = element("div");
    			div8 = element("div");
    			div8.textContent = "Defenses";
    			t27 = space();
    			div9 = element("div");
    			t28 = text(t28_value);
    			t29 = text(": ");
    			t30 = text(t30_value);
    			t31 = space();
    			div10 = element("div");
    			t32 = text(t32_value);
    			t33 = text(": ");
    			t34 = text(t34_value);
    			t35 = space();
    			div11 = element("div");
    			t36 = text(t36_value);
    			t37 = text(": ");
    			t38 = text(t38_value);
    			add_location(h2, file$6, 9, 2, 216);
    			attr_dev(div0, "class", "step-title");
    			add_location(div0, file$6, 8, 1, 189);
    			attr_dev(div1, "class", "prop-item svelte-cx5roi");
    			add_location(div1, file$6, 14, 4, 326);
    			attr_dev(div2, "class", "prop-item svelte-cx5roi");
    			add_location(div2, file$6, 17, 4, 434);
    			attr_dev(div3, "class", "prop-item svelte-cx5roi");
    			add_location(div3, file$6, 20, 4, 538);
    			attr_dev(span0, "class", "left-col svelte-cx5roi");
    			add_location(span0, file$6, 13, 3, 298);
    			attr_dev(div4, "class", "prop-item svelte-cx5roi");
    			add_location(div4, file$6, 25, 4, 683);
    			attr_dev(div5, "class", "prop-item svelte-cx5roi");
    			add_location(div5, file$6, 28, 4, 791);
    			attr_dev(div6, "class", "prop-item svelte-cx5roi");
    			add_location(div6, file$6, 31, 4, 895);
    			attr_dev(span1, "class", "right-col svelte-cx5roi");
    			add_location(span1, file$6, 24, 3, 654);
    			attr_dev(div7, "class", "prop-col svelte-cx5roi");
    			add_location(div7, file$6, 12, 2, 272);
    			attr_dev(div8, "class", "def-header svelte-cx5roi");
    			add_location(div8, file$6, 37, 3, 1039);
    			attr_dev(div9, "class", "prop-item svelte-cx5roi");
    			add_location(div9, file$6, 38, 3, 1081);
    			attr_dev(div10, "class", "prop-item svelte-cx5roi");
    			add_location(div10, file$6, 41, 3, 1184);
    			attr_dev(div11, "class", "prop-item svelte-cx5roi");
    			add_location(div11, file$6, 44, 3, 1287);
    			attr_dev(div12, "class", "def-list svelte-cx5roi");
    			add_location(div12, file$6, 36, 2, 1013);
    			attr_dev(div13, "class", "props-list svelte-cx5roi");
    			add_location(div13, file$6, 11, 1, 245);
    			attr_dev(div14, "class", "properties-step");
    			add_location(div14, file$6, 7, 0, 150);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div14, anchor);
    			append_dev(div14, div0);
    			append_dev(div0, h2);
    			append_dev(div14, t1);
    			append_dev(div14, div13);
    			append_dev(div13, div7);
    			append_dev(div7, span0);
    			append_dev(span0, div1);
    			append_dev(div1, t2);
    			append_dev(div1, t3);
    			append_dev(div1, t4);
    			append_dev(span0, t5);
    			append_dev(span0, div2);
    			append_dev(div2, t6);
    			append_dev(div2, t7);
    			append_dev(div2, t8);
    			append_dev(span0, t9);
    			append_dev(span0, div3);
    			append_dev(div3, t10);
    			append_dev(div3, t11);
    			append_dev(div3, t12);
    			append_dev(div7, t13);
    			append_dev(div7, span1);
    			append_dev(span1, div4);
    			append_dev(div4, t14);
    			append_dev(div4, t15);
    			append_dev(div4, t16);
    			append_dev(span1, t17);
    			append_dev(span1, div5);
    			append_dev(div5, t18);
    			append_dev(div5, t19);
    			append_dev(div5, t20);
    			append_dev(span1, t21);
    			append_dev(span1, div6);
    			append_dev(div6, t22);
    			append_dev(div6, t23);
    			append_dev(div6, t24);
    			append_dev(div13, t25);
    			append_dev(div13, div12);
    			append_dev(div12, div8);
    			append_dev(div12, t27);
    			append_dev(div12, div9);
    			append_dev(div9, t28);
    			append_dev(div9, t29);
    			append_dev(div9, t30);
    			append_dev(div12, t31);
    			append_dev(div12, div10);
    			append_dev(div10, t32);
    			append_dev(div10, t33);
    			append_dev(div10, t34);
    			append_dev(div12, t35);
    			append_dev(div12, div11);
    			append_dev(div11, t36);
    			append_dev(div11, t37);
    			append_dev(div11, t38);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$character*/ 1 && t2_value !== (t2_value = /*$character*/ ctx[0].props.health.name + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*$character*/ 1 && t4_value !== (t4_value = /*$character*/ ctx[0].props.health.score + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*$character*/ 1 && t6_value !== (t6_value = /*$character*/ ctx[0].props.init.name + "")) set_data_dev(t6, t6_value);
    			if (dirty & /*$character*/ 1 && t8_value !== (t8_value = /*$character*/ ctx[0].props.init.score + "")) set_data_dev(t8, t8_value);
    			if (dirty & /*$character*/ 1 && t10_value !== (t10_value = /*$character*/ ctx[0].props.speed.name + "")) set_data_dev(t10, t10_value);
    			if (dirty & /*$character*/ 1 && t12_value !== (t12_value = /*$character*/ ctx[0].props.speed.score + "")) set_data_dev(t12, t12_value);
    			if (dirty & /*$character*/ 1 && t14_value !== (t14_value = /*$character*/ ctx[0].props.psyche.name + "")) set_data_dev(t14, t14_value);
    			if (dirty & /*$character*/ 1 && t16_value !== (t16_value = /*$character*/ ctx[0].props.psyche.score + "")) set_data_dev(t16, t16_value);
    			if (dirty & /*$character*/ 1 && t18_value !== (t18_value = /*$character*/ ctx[0].props.luck.name + "")) set_data_dev(t18, t18_value);
    			if (dirty & /*$character*/ 1 && t20_value !== (t20_value = /*$character*/ ctx[0].props.luck.score + "")) set_data_dev(t20, t20_value);
    			if (dirty & /*$character*/ 1 && t22_value !== (t22_value = /*$character*/ ctx[0].props.xp.name + "")) set_data_dev(t22, t22_value);
    			if (dirty & /*$character*/ 1 && t24_value !== (t24_value = /*$character*/ ctx[0].props.xp.score + "")) set_data_dev(t24, t24_value);
    			if (dirty & /*$character*/ 1 && t28_value !== (t28_value = /*$character*/ ctx[0].props.block.name + "")) set_data_dev(t28, t28_value);
    			if (dirty & /*$character*/ 1 && t30_value !== (t30_value = /*$character*/ ctx[0].props.block.score + "")) set_data_dev(t30, t30_value);
    			if (dirty & /*$character*/ 1 && t32_value !== (t32_value = /*$character*/ ctx[0].props.dodge.name + "")) set_data_dev(t32, t32_value);
    			if (dirty & /*$character*/ 1 && t34_value !== (t34_value = /*$character*/ ctx[0].props.dodge.score + "")) set_data_dev(t34, t34_value);
    			if (dirty & /*$character*/ 1 && t36_value !== (t36_value = /*$character*/ ctx[0].props.reflex.name + "")) set_data_dev(t36, t36_value);
    			if (dirty & /*$character*/ 1 && t38_value !== (t38_value = /*$character*/ ctx[0].props.reflex.score + "")) set_data_dev(t38, t38_value);
    		},
    		i: function intro(local) {
    			if (!div14_intro) {
    				add_render_callback(() => {
    					div14_intro = create_in_transition(div14, fade, {});
    					div14_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div14);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let $character;
    	validate_store(character, "character");
    	component_subscribe($$self, character, $$value => $$invalidate(0, $character = $$value));
    	const props = Object.keys($character.props);

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("$character" in $$props) character.set($character = $$props.$character);
    	};

    	return [$character];
    }

    class CreProperties extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CreProperties",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    class Rule {
    	constructor(name=``, description=[``], subrules=[], table=false, visible=false) {
    		this.name = name;
    		this.description = description;
    		this.subrules = subrules;
    		this.table = table;
    		this.visible = visible;
    	}
    }

    class Trait extends Rule {
    	constructor(name, description) {
    		super(name, description);
    	}
    }


    const Agility = new Trait(
    	`Agility`,
    	[`Agility is a Character’s talent for physical coordination. High Agility indicates balance, flexibility, and fine motor skill. This Trait determines Initiative and Speed. Agility is the parent Trait for Acrobatics, Larceny, Ranged, and Stealth.`]
    );

    const Brains = new Trait(
    	`Brains`,
    	[`Brains is a Character’s talent for cognitive performance and abstract thought. High Brains indicates sharp memory, keen awareness, and studiousness. This Trait determines Experience. Brains is the parent Trait for Build, Medicine, Perception, Science.`]
    );

    const Constitution = new Trait(
    	`Constitution`,
    	[`Constitution is a Character’s talent for physical strength and durability. High Constitution indicates good health and powerful muscles. This Trait determines Health, Pain, and Speed. Constitution is the parent Trait for Athletics, Drive, Melee, and Survival.`]
    );

    const Demeanor = new Trait(
    	`Demeanor`,
    	[`Demeanor is a Character’s talent for social exchanges and sheer force of will. High Demeanor indicates charisma, self-motivation, and confidence. This Trait determines Psyche and Luck. Demeanor is also the parent Trait for Leadership, Perform, Socialize, and Tame.`]
    );

    const TraitList = [
    		Agility,
    		Brains,
    		Constitution,
    		Demeanor
    ];

    class Skill extends Rule {
    	constructor(name, description, parent, difficulty, specialties=[]) {
    		super(name, description);
    		this.parent = parent;
    		this.difficulty = difficulty;
    		this.specialties = specialties;
    	}
    }

    class Specialty extends Rule {
    	constructor(name, description) {
    		super(name, description);
    	}
    }


    const Acrobatics = new Skill(
    	`Acrobatics`,
    	[`Gymnastic prowess.`],
    	`Agility`,
    	6,
    	[
    		new Specialty(
    			`Dodge`,
    			[`Roll vs [MATK or Ranged(Throw)].`]
    		),
    		new Specialty(
    			`Jump`,
    			[`Running Jump [Speed]. Vertical [Speed x 3"].`]
    		)
    	]
    );

    const Larceny = new Skill(
    	`Larceny`,
    	[`Delicate manual operations.`],
    	`Agility`,
    	'varies',
    	[
    		new Specialty(
    			`Mechanical`,
    			[`(d6rnds) Activate or deactivate Locks, Traps, Bombs, and similar mechanisms. # by item.`]
    		),
    		new Specialty(
    			`Trick`,
    			[`Roll vs [Perception] to pick pockets, hide items, or some other sleight-of-hand.`]
    		)
    	]
    );

    const Ranged = new Skill(
    	`Ranged`,
    	[`Projectile combat.`],
    	`Agility`,
    	'DEF',
    	[
    		new Specialty(
    			`Shoot`,
    			[`Roll vs [Reflex or Block (with a Shield)].`]
    		),
    		new Specialty(
    			`Throw`,
    			[`Roll vs [Dodge or Block (with a Shield)].`]
    		)
    	]
    );

    const Stealth = new Skill(
    	`Stealth`,
    	[`Conceal your presence.`],
    	`Agility`,
    	'Perception',
    	[
    		new Specialty(
    			`Hide`,
    			[`Stay motionless and Concealed. +3 if Prone.`]
    		),
    		new Specialty(
    			`Sneak`,
    			[`Move [Speed / 2] while Concealed.`]
    		)
    	]
    );

    const AgilitySkills = [
    	Acrobatics,
    	Larceny,
    	Ranged,
    	Stealth
    ];


    const Medicine = new Skill(
    	`Medicine`,
    	[`Diagnosing and treating wounds.`],
    	`Brains`,
    	'Wounds',
    	[
    		new Specialty(
    			`First-Aid`,
    			[`Stop Bleeding. Takes 1d6rnds.`]
    		),
    		new Specialty(
    			`Surgery`,
    			[`Heal 1 Wound. Cannot be performed again on the same patient until they are fully healed. d6DMG on a Botch.`]
    		)
    	]
    );

    const Perception = new Skill(
    	`Perception`,
    	[`Processing sensory input.`],
    	`Brains`,
    	'varies',
    	[
    		new Specialty(
    			`Search`,
    			[`Roll vs [Stealth (or Survival if tracking)].`]
    		),
    		new Specialty(
    			`Intuition`,
    			[`Roll vs [Socialize or Perform].`]
    		)
    	]
    );

    const Science = new Skill(
    	`Science`,
    	[`Knowledge of physical laws.`],
    	`Brains`,
    	'varies',
    	[
    		new Specialty(
    			`Chemistry`,
    			[`(# x 10mins) Use [d6 + # Chemicals].`]
    		),
    		new Specialty(
    			`Technology`,
    			[`(varies) Make or use electronic devices.`]
    		)
    	]
    );

    const Survival = new Skill(
    	`Survival`,
    	[`Primitive practices for living outdoors.`],
    	`Brains`,
    	'Biome',
    	[
    		new Specialty(
    			`Forage`,
    			[`(1hr) Provide 1 Need for 1 person.`]
    		),
    		new Specialty(
    			`Navigate`,
    			[`(1min) Plot course. Roll vs [Perception] if tracked.`]
    		)
    	]
    );

    const BrainsSkills = [
    	Medicine,
    	Perception,
    	Science,
    	Survival
    ];


    const Athletics = new Skill(
    	`Athletics`,
    	[`Physically difficult forms of motion.`],
    	`Constitution`,
    	'varies',
    	[
    		new Specialty(
    			`Climb`,
    			[`Move along vertical surfaces at [Speed / 2].`]
    		),
    		new Specialty(
    			`Swim`,
    			[`Move in water at [Speed / 4].`]
    		)
    	]
    );

    const Build = new Skill(
    	`Build`,
    	[`Make an item from [d6 + #] Parts.	`],
    	`Constitution`,
    	'varies',
    	[
    		new Specialty(
    			`Customize`,
    			[`(#hrs) 3 per item. Each must be unique. Weapons: +1 RATK, +1 Melee DMG, or a new Attribute. Armor: +1 DR or a new Attribute.`]
    		),
    		new Specialty(
    			`Repair`,
    			[`(#hrs) Fix broken item. +1 with same Parts.`]
    		)
    	]
    );

    const Drive = new Skill(
    	`Drive`,
    	[`Operate vehicles.`],
    	`Constitution`,
    	'varies',
    	[
    		new Specialty(
    			`Ram`,
    			[`Roll vs [Drive(Stunt)] to ATK with a vehicle.`]
    		),
    		new Specialty(
    			`Stunt`,
    			[`Roll vs [Drive(Ram)] for DEF with a vehicle.`]
    		)
    	]
    );

    const Melee = new Skill(
    	`Melee`,
    	[`Hand-to-hand combat.`],
    	`Constitution`,
    	'ATK or DEF',
    	[
    		new Specialty(
    			`Block`,
    			[`Roll vs [MATK or RATK (if you have a Shield)].`]
    		),
    		new Specialty(
    			`Strike`,
    			[`Roll vs [DEF]. DMG = [weapon DMG + Success].`]
    		)
    	]
    );

    const ConstitutionSkills = [
    	Athletics,
    	Build,
    	Drive,
    	Melee
    ];


    const Leadership = new Skill(
    	`Leadership`,
    	[`Directing the efforts of others. Modifiers from multiple uses of the same Leadership Specialty do not stack.`],
    	`Demeanor`,
    	'Demeanor',
    	[
    		new Specialty(
    			`Encourage`,
    			[`Roll vs [total target(s) Demeanor]. Target(s) get a bonus = [your Demeanor] to one roll you choose.`]
    		),
    		new Specialty(
    			`Intimidate`,
    			[`Roll vs [total target(s) Demeanor]. Target(s) take a penalty = [your Demeanor] to any roll except one you choose.`]
    		)
    	]
    );

    const Perform = new Skill(
    	`Perform`,
    	[`Captivating an audience.`],
    	`Demeanor`,
    	'Perception',
    	[
    		new Specialty(
    			`Distract`,
    			[`Target is Defenseless for 1rnd.`]
    		),
    		new Specialty(
    			`Deceive`,
    			[`Target believes your plausible falsehood.`]
    		)
    	]
    );

    const Socialize = new Skill(
    	`Socialize`,
    	[`Alter a person’s Attitude by one step.`],
    	`Demeanor`,
    	'Demeanor',
    	[
    		new Specialty(
    			`Gossip`,
    			[`(d6hrs) Gather or spread rumors.`]
    		),
    		new Specialty(
    			`Persuade`,
    			[`(d6mins) Target seriously considers your opinion.`]
    		)
    	]
    );

    const Tame = new Skill(
    	`Tame`,
    	[`Alter an animal’s Attitude by one step.`],
    	`Demeanor`,
    	'Demeanor',
    	[
    		new Specialty(
    			`Command`,
    			[`Animal obeys your command.`]
    		),
    		new Specialty(
    			`Train`,
    			[`(1wk) Animals learn commands = [its Brains x 2].`]
    		)
    	]
    );

    const DemeanorSkills = [
    	Leadership,
    	Perform,
    	Socialize,
    	Tame
    ];


    const SkillList = [
    	...AgilitySkills,
    	...BrainsSkills,
    	...ConstitutionSkills,
    	...DemeanorSkills
    ];

    const SpecialtyList = [];
    SkillList.forEach((skill) => {
    	skill.specialties.forEach((specialty) => {
    		SpecialtyList.push(specialty);
    	});
    });

    class Gear extends Rule {
    	constructor(name, description, sz) {
    		super(name, description);
    		this.sz = sz;
    	}
    }


    class Accessory extends Gear {
    	constructor(name, description, sz) {
    		super(name, description, sz);
    	}
    }

    const Bayonet = new Accessory(`Bayonet`, `Knife. +1 DMG and Pierce for MATKs.`, 1);
    const Bipod = new Accessory(`Bipod`, `Ignore Size requirement. 1rnd setup.`, 1);
    const DrumMagazine = new Accessory(`Drum Magazine`, `Gun specific. 3x Ammo magazine capacity.`, 1);
    const Foregrip = new Accessory(`Foregrip`, `-1 Size requirement for 2h Gun.`, 0);
    const Holosight = new Accessory(`Holosight`, `+1 RATK.`, 0);
    const Laser = new Accessory(`Laser`, `+1 RATK. -6 RATK to Blind for d6rnds.`, 0);
    const Scope = new Accessory(`Scope`, `+3 Aimed RATKs and Perception(See).`, 1);
    const SinglePointSling = new Accessory(`Single-Point Sling`, `Draw or stow a 2h Gun without using an Action.`, 0);
    const Suppressor = new Accessory(`Suppressor`, `Firing a Gun does not break Concealment.`, 0);


    class Ammo extends Gear {
    	constructor(description, sz, cal, type) {
    		super(name, description, sz);
    		this.cal = cal;
    		this.type = type;
    		this.name = `${cal} ${type}`;
    	}
    }

    const ArrowBroadhead = new Ammo(`+1 DMG. Pierce.`, .1, `Arrow`, `Broadhead`);
    const ArrowStandard = new Ammo(`Basic ammo.`, .1, `Arrow`, `Standard`);
    const Standard22 = new Ammo(`Basic ammo.`, .005, `.22`, `Standard`);
    const HollowPoint22 = new Ammo(`+1 DMG.`, .005, `.22`, `Hollow Point`);
    const Match22 = new Ammo(`+1 RATK.`, .005, `.22`, `Match`);
    const Standard9mm = new Ammo(`Basic ammo.`, .01, `9mm`, `Standard`);
    const HollowPoint9mm = new Ammo(`+1 DMG.`, .01, `9mm`, `Hollow Point`);
    const Match9mm = new Ammo(`+1 RATK.`, .01, `9mm`, `Match`);
    const Standard357 = new Ammo(`Basic ammo.`, .01, `.357`, `Standard`);
    const HollowPoint357 = new Ammo(`+1 DMG.`, .01, `.357`, `Hollow Point`);
    const ArmorPiercing556 = new Ammo(`Pierce.`, .02, `5.56`, `Armor Piercing`);
    const Standard556 = new Ammo(`Basic ammo.`, .02, `5.56`, `Standard`);
    const HollowPoint556 = new Ammo(`+1 DMG.`, .02, `5.56`, `Hollow Point`);
    const Match556 = new Ammo(`+1 RATK.`, .02, `5.56`, `Match`);
    const ArmorPiercing308 = new Ammo(`Pierce.`, .02, `.308`, `Armor Piercing`);
    const Standard308 = new Ammo(`Basic ammo.`, .02, `.308`, `Standard`);
    const HollowPoint308 = new Ammo(`+1 DMG.`, .02, `.308`, `Hollow Point`);
    const Match308 = new Ammo(`+1 RATK.`, .02, `.308`, `Match`);
    const Buckshot12g = new Ammo(`Scatter.`, .05, `12g`, `Buckshot`);
    const Slug12g = new Ammo(`RNG x2.`, .05, `12g`, `Slug`);

    // OLD AMMO
    // new Ammo(`.22`,	 `Tracer`,			`+1 Auto RATK.`,.005),
    // new Ammo(`12g`,	 `Birdshot`,		  `Basic ammo. Scatter.`,.05),
    // new Ammo(`12g`,	 `Flare`,			 `3FDMG/rnd for 3rnds. 50yd light radius.`,.05),
    // new Ammo(`12g`,	 `Rubber`,			`Blunt.`,.05),
    // new Ammo(`5.56`,	`Tracer`,			`+1 Auto RATK.`,.02),


    class Armor extends Gear {
    	constructor(name, description, sz, dr, loc) {
    		super(name, description, sz);
    		this.dr = dr;
    		this.loc = loc;
    	}
    }

    const AthleticHelmet = new Armor(`Athletic Helmet`, [], 2, 1, `Head`);
    const AthleticPads = new Armor(`Athletic Pads`, [], 2, 1, `Torso`);
    const CombatHelmet = new Armor(`Combat Helmet`, [`Camo`], 2, 3, `Head`);
    const Coveralls = new Armor(`Coveralls`, [`Camo`, `CR`], 3, 1, `Arms, Torso, Legs`);
    const FirefighterSuit = new Armor(`Firefighter Suit`, 2, `Full Body`, [`CR`, `FR`, `Mask`], 5);
    const FlakJacket = new Armor(`Flak Jacket`, [`Camo`], 4, 2, `Torso`);
    const GhillieSuit = new Armor(`Ghillie Suit`, [`Camo`, `CR`], 4, 1, `Full Body`);
    const HikingBoots = new Armor(`Hiking Boots`, [`CR`, `FR`], 2, 1, `Legs`);
    const KevlarVest = new Armor(`Kevlar Vest`, [`CR`, `FR`], 4, 3, `Torso`);
    const LeatherJacket = new Armor(`Leather Jacket`, [], 2, 1, `Arms, Torso`);
    const MotorcycleHelmet = new Armor(`Motorcycle Helmet`, [`FR`, `Mask`], 2, 1, `Head`);
    const HazmatSuit = new Armor(`Hazmat Suit`, [`Mask`, `Impermeable`], 2, 0, `Full Body`);
    const PlateCarrier = new Armor(`Plate Carrier`, [`Camo`, `CR`, `FR`], 4, 4, `Torso`);
    const WinterCoat = new Armor(`Winter Coat`, [`CR`], 2, 1, `Arms, Torso`);
    const WorkGloves = new Armor(`Work Gloves`, [`FR`], 1, 1, `Arms`);

    const ArmorList = [
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
    	WorkGloves
    ];

    // OLD ARMOR
    // new Armor(`Denim Jacket`, `1,1`, `Arms, Torso`, ``, 2)
    // new Armor(`Interceptor Armor`, `3,6`, `Arms, Torso`, `Camo. CR. FR.`, 5)
    // new Armor(`Kevlar Gloves`, `2`, `Arms`, `FR.`, 1)
    // new Armor(`Knee Pads`, `1`, `Legs`, ``, 1)
    // new Armor(`Paintball Mask`, `1`, `Head`, `Mask.`, 1)
    // new Armor(`Riot Helmet`, `4`, `Head`, `FR. Mask.`, 2)
    // new Armor(`Steel-Toe Boots`, `2`, `Legs`, `Blunt. FR. Kick 3BDMG`, 2)
    // new Armor(`Tactical Vest`, `1`, `Torso`, `6 Storage.`, 1)
    // new Armor(`Undercover Vest`, `3`, `Torso`, `FR.`, 3)

    // RARE ARMOR
    // new Armor(`Black Robe`, `1,1,1,1`, `Head, Torso, Arms, Legs`, `CR. +1 Stealth.`, 1)
    // new Armor(`Chainmail Shirt`, `3,3,3`, `Head, Torso, Arms`, `Ignore Chop.`, 6)
    // new Armor(`Dragonskin Vest`, `8`, `Torso`, `CR. FR.`, 3)
    // new Armor(`Knuckle Gloves`, `2`, `Arms`, `2DMG Punch. Blunt. FR.`, 1)
    // new Armor(`Land Warrior Helmet`, `4`, `Head`, `FR. Nightvision Goggles. Radio.`, 2)
    // new Armor(`Spiked Jacket`, `2, 2`, `Torso, Arms`, `+1 DMG Grab.`, 3)


    class Attribute extends Rule {
    	constructor(name, description) {
    		super(name, description);
    	}
    }

    class AmmoAttribute extends Attribute {
    	constructor(name, description, calibers) {
    		super(name, description);
    		this.calibers = calibers;
    	}
    }

    const ArmorPiercing = new AmmoAttribute('Armor Piercing', ['Pierce.'], ['5.56', '.308']);
    const Broadhead = new AmmoAttribute('Broadhead', ['+1 DMG. Pierce'], ['Arrow']);
    const Buckshot = new AmmoAttribute('Buckshot', ['Scatter.'], ['12g']);
    const HollowPoint = new AmmoAttribute('Hollow Point', ['+1 DMG.'], ['.22', '9mm', '.357', '5.56', '.308', '12g']);
    const Match = new AmmoAttribute('Match', ['+1 RATK.'], ['.22', '9mm', '.357', '5.56', '.308']);
    const Slug = new AmmoAttribute('Slug', ['RNG x2.'], ['12g']);

    class ArmorAttribute extends Attribute {
    	constructor(name, description) {
    		super(name, description);
    	}
    }

    const Camo = new ArmorAttribute('Camo', ['+1 Stealth per Location when in a given Biome.']);
    const CR = new ArmorAttribute('CR', ['Delay Hypothermia for 1hr per Location.']);
    const FR = new ArmorAttribute('FR', ['Armor DR reduces FDMG.']);
    const Impermeable = new ArmorAttribute('Impermeable', ['Automatic Success to resist exposure to Diseases and Toxins.']);
    const Mask = new ArmorAttribute('Mask', ['Obscures identity and protects face. -1 Perception.']);

    class WeaponAttribute extends Attribute {
    	constructor(name, description) {
    		super(name, description);
    	}
    }

    const OneHanded = new WeaponAttribute('1h', ['Used one-handed. +1 RATK if used with both hands.']);
    const TwoHanded = new WeaponAttribute('2h', ['Used two-handed. Penalty = [Sz] if used one-handed.']);
    const Auto = new WeaponAttribute('Auto', ['[+3 RATK vs one target] or 3yd Blast. Uses 10 bullets.']);
    const Blast = new WeaponAttribute('Blast', ['[d6 vs Reflex] in radius. [DMG / 2] on a miss (mininum 1).']);
    const Blunt = new WeaponAttribute('Blunt', ['Does not cause Bleeding.']);
    const Chop = new WeaponAttribute('Chop', ['+1 DMG to Locations with no Armor.']);
    const FDMG = new WeaponAttribute('FDMG', ['Fire DMG. FDMG can only be prevented with FR Armor.']);
    const Pierce = new WeaponAttribute('Pierce', ['+1 DMG to Locations with Armor.']);
    const Rapid = new WeaponAttribute('Rapid', ['2 ATKS for 1 Action.']);
    const Sawnoff = new WeaponAttribute('Sawn-off', ['[RNG / 2] and -1 Size.']);
    const Scatter = new WeaponAttribute('Scatter', ['Ignore RNG penalties. -1 DMG per extended RNG.']);
    const Slow = new WeaponAttribute('Slow', ['Penalty to Initiative = Size.']);


    class Bomb extends Gear {
    	constructor(name, description, sz, mix, dmg, blast, duration) {
    		super(name, description, sz);
    		this.mix = mix;
    		this.dmg = dmg;
    		this.blast = blast;
    		this.duration = duration;
    	}
    }

    const Flashbang = new Bomb(`Flashbang`, [`1rnd fuse. Blind. Stun.`], 1, 9, `0`, `6yd`, `d6rnds`);
    const Frag = new Bomb(`Frag`, [`1rnd fuse. Pierce.`], 1, 9, `d6x3`, `15yd`, `instant`);
    const Molotov = new Bomb(`Molotov`, [`1FDMG/rnd.`], 2, 1, `d6`, `3yd`, `1min`);
    const Smoke = new Bomb(`Smoke`, [`Blind.`], 1, 3, `0`, `1yd/rnd`, `d6mins`);
    const Teargas = new Bomb(`Teargas`, [`Blind. Suffocation`], 1, 15, `1`, `1yd/rnd`, `d6mins`);
    const Thermite = new Bomb(`Thermite`, [`1rnd fuse. FDMG.`], 1, 6, `d6x6`, `1yd`, `6rnds`);

    // OLD BOMBS
    // new Bomb(`Chlorine`,	18, `toxin`,	`1yd/rnd`,  `d6+3mins`, `Blind. Suffocation x2. Stun.`, 1)
    // new Bomb(`Claymore`,	18, `d6x9`,	 `30yd`,	 `instant`,  `30yd 90° Blast. Loud.`,		2)
    // new Bomb(`Dynamite`,	12, `d6x6`,	 `30yd`,	 `instant`,  `10rnd fuse.`,				  1)
    // new Bomb(`Firecracker`, 6,  `0`,		`0yd`,	  `d6+3rnds`, `Mimics sound of gunfire.`,	 0)
    // new Bomb(`Landmine`,	15, `d6x6`,	 `3yd`,	  `instant`,  ``,							 2)
    // new Bomb(`Sky Rocket`,  12, `d6x3`,	 `60yd`,	 `instant`,  `-1 RATK. RNG:50. Blind.`,	  1)


    class Document extends Gear {
    	constructor(name, description, sz) {
    		super(name, description, sz);
    	}
    }

    const BodyInBalance = new Document(`Body in Balance`, [`+1 Athletics`], 1);
    const BookOfNinja = new Document(`Book of Ninja`, [`+1 Stealth`], 1);
    const DefensiveDriving = new Document(`Defensive Driving`, [`+1 Drive`], 1);
    const DogTricks = new Document(`Dog Tricks`, [`+1 Tame`], 1);
    const EffectiveHabits = new Document(`Effective Habits`, [`+1 to any one Skill`], 1);
    const EngineeringConcepts = new Document(`Engineering Concepts`, [`+1 Build`], 1);
    const GeneralScienceKnowledge = new Document(`General Science Knowledge`, [`+1 Science`], 1);
    const GraysAnatomy = new Document(`Gray\`s Anatomy`, [`+1 Medicine`], 1);
    const HomeSecurity = new Document(`Home Security`, [`+1 Larceny`], 1);
    const HowToWinFriends = new Document(`How to Win Friends`, [`+1 Socialize`], 1);
    const HowYogaWorks = new Document(`How Yoga Works`, [`+1 Acrobatics`], 1);
    const LeadershipBasics = new Document(`Leadership Basics`, [`+1 Leadership`], 1);
    const PersonalDefense = new Document(`Personal Defense`, [`+1 Ranged`], 1);
    const SASSurvivalGuide = new Document(`SAS Survival Guide`, [`+1 Survival`], 1);
    const StandupComedy = new Document(`Stand-up Comedy`, [`+1 Entertain`], 1);
    const TaoOfJeetKuneDo = new Document(`Tao of Jeet Kune Do`, [`+1 Melee`], 1);
    const YellowPags = new Document(`Yellow Pages`, [`+1 Scavenging. Regional.`], 1);
    const ZenMind = new Document(`Zen Mind`, [`+1 Perception`], 1);
    const BilingualDictionary = new Document(`Bilingual Dictionary`, [`Multilingual Ability`], 1);
    const ClassicNovel = new Document(`Classic Novel`, [`+1 Psyche`], 1);
    const HolyBook = new Document(`Holy Book`, [`-1 Psyche`], 1);
    const MapAtlas = new Document(`Map (Atlas)`, [`+1 Survival(Navigate)`], 1);
    const MapLocal = new Document(`Map (Local)`, [`+1 Survival(Navigate). Regional.`], 0);
    const MapTopographic = new Document(`Map (Topographic)`, [`+3 Survival(Navigate). Regional.`], 0);


    class Drug extends Gear {
    	constructor (name, description, sz, mix, overdose) {
    		super(name, description, sz);
    		this.mix = mix;
    		this.overdose = overdose;
    	}
    }

    const Alcohol = new Drug(`Alcohol`, [`Antibiotic or Fuel. C9# or Unstable.`], 1, 9, true);
    const Antibiotic = new Drug(`Antibiotic`, [`Prevents infection in Recovery for 1 day.`], 0, 12, false);
    const Hallucinogen = new Drug(`Hallucinogen`, [`+1 Perform and Tame. -3 all other rolls. -1 Psyche.`], 0, 15, false);
    const Painkiller = new Drug(`Painkiller`, [`Ignore 1 Pain penalty.`], 0, 9, true);
    const Sedative = new Drug(`Sedative`, [`D#6/rnd to take any action.`], 0, 12, true);
    const Stimulant = new Drug(`Stimulant`, [`Ignore Exhaustion penalties for 6hrs.`], 0, 9, true);

    // OLD DRUGS
    // new Drug(`Chloroform`,		  15, true,   `Liquid. C#12 or Unconscious. Takes d6rnds.`,	   0)
    // new Drug(`Cyanide`,			 18, true,   `Pill. d6 Torso DMG/rnd for 5rnds.`,				0)
    // new Drug(`Epinephrine`,		 15, true,   `Injection. Rescuscitate within C+3mins.`,		  0)
    // new Drug(`Iodine`,			  6,  false,  `Purify 1gal of Water. Prevents Radiation.`,		0)
    // new Drug(`Potassium Chloride`,  18, true,   `Injection. d6 Torso DMG/min for 5mins.`,		   0)
    // new Drug(`Sodium Pentothal`,	15, true,   `Injection. -6 Entertain(Lie).`,					0)


    class Electronic extends Gear {
    	constructor (name, hours, description, sz) {
    		super(name, description, sz);
    		this.hours = hours;
    	}
    }

    const Cellphone = new Electronic(`Cellphone`, [`1yd light, camera, remote control.`], 1, 3);
    const EmergencyRadio = new Electronic(`Emergency Radio`, [`AM/FM/Shortwave. 1yd light.`], 1, 6);
    const Flashlight = new Electronic(`Flashlight`, [`10yd light. -3 RATK to Blind 1rnd.`], 1, 3);
    const GeigerCounter = new Electronic(`Geiger Counter`, [`Science 6# to detect Radiation in 1yd.`], 2, 24);
    const HandRadio = new Electronic(`Hand Radio`, [`9-channel 2-way radio. 3 mile range.`], 1, 9);
    const Headlamp = new Electronic(`Headlamp`, [`3yd light. Hands free.`], 0, 3);
    const Lantern = new Electronic(`Lantern`, [`3yd light radius.`], 2, 6);
    const Megaphone = new Electronic(`Megaphone`, [`+1 Leadership when speaking to a crowd.`], 2, 12);
    const Multimeter = new Electronic(`Multimeter`, [`+3 Science(Technology). Detect voltage.`], 1, 48);
    const NightvisionGoggles = new Electronic(`Nightvision Goggles`, [`Ignore Visibility penalties in darkness.`], 1, 36);
    const QuadcopterDrone = new Electronic(`Quadcopter Drone`, [`Science 6# to use. Camera. 90yd Speed.`], 2, .25);
    const RCCar = new Electronic(`RC Car`, [`Science 3# to use. 45yd Speed.`], 3, .5);
    const SolarLamp = new Electronic(`Solar Lamp`, [`1yd light radius. 1day charge.`], 1, 9);
    const StunGun = new Electronic(`Stun Gun`, [`MATK. C9# or Stun for 1rnd.`], 1, .25);

    // OLD ELECTRONICS
    //  new Electronic(`Radio Jammer`,		  3,	  `Blocks radio signal within 100yds.`,	   1)


    class Equipment extends Gear {
    	constructor(name, description, sz) {
    		super(name, description, sz);
    	}
    }

    const AirHorn = new Equipment(`Air Horn`, [`Emits a loud shriek up to a 1 mile radius.`], 1);
    const Balaclava = new Equipment(`Balaclava`, [`+1 Stealth. Mask. CR.`], 0);
    const Bandanna = new Equipment(`Bandanna`, [`+1 C vs airborne toxins. Can use as Bandage.`], 0);
    const BaseballCap = new Equipment(`Baseball Cap`, `Reduce Visibility(Rain and Sun) penalty by 1.`,	0);
    const Bicycle = new Equipment(`Bicycle`, [`Athletics 3#. Speed x3yds (x.7mph). 2h.`], 8);
    const Binoculars = new Equipment(`Binoculars`, [`+3 Perception(See) at 50+yds.`], 1);
    const BobbyPin = new Equipment(`Bobby Pin`, [`Allows Larceny(Disable) roll on key locks.`], 0);
    const BoltCutters = new Equipment(`Bolt Cutters`, [`C9# to cut metal (Handcuffs, Padlocks, etc).`], 3);
    const CageTrap = new Equipment(`Cage Trap`, [`+3 Survival(Forage). Takes 1day.`], 6);
    const Candle = new Equipment(`Candle`, [`1yd light radius for 6hrs.`], 0);
    const Candy = new Equipment(`Candy`, [`Restores 1 Luck point. 1/day.`], 0);
    const Carabiner = new Equipment(`Carabiner`, [`+1 Athletics(Climb and Rappel). Holds 50Sz.`], 0);
    const Compass = new Equipment(`Compass`, [`+3 Survival(Navigate). Always points North.`], 0);
    const CowboyHat = new Equipment(`Cowboy Hat`, [`Reduce Visibility(Rain and Sun) penalty by 3.`], 0);
    const Chalk = new Equipment(`Chalk`, [`Used to temporarily write on any surface.`], 0);
    const Chemical = new Equipment(`Chemical`, [`Substances used for Science(Chemistry).`], 1);
    const ChokerLeash = new Equipment(`Choker Leash`, [`+3 Tame. Grabbed. C +3 vs C to control.`], 1);
    const DuctTape = new Equipment(`Duct Tape`, [`+1 Build/1yd or use 2yds as Handcuffs. 60yds.`], 1);
    const DustMask = new Equipment(`Dust Mask`, [`+3 C vs airborne toxins. Mask.`], 1);
    const EarPlugs = new Equipment(`Ear Plugs`, [`No Deafness from noise. -3 Perception(Hear).`], 9);
    const EggTimer = new Equipment(`Egg Timer`, [`Set up to 60mins. Loud ringing for 1min.`], 1);
    const Firestick = new Equipment(`Fire-stick`, [`+3 Survival(Camp). Magnesium rod and steel.`], 0);
    const FishingPole = new Equipment(`Fishing Pole`, [`+1 Survival(Forage) at river, lake, or ocean.`], 2);
    const FlareGun = new Equipment(`Flare Gun`, [`Pistol. RNG:3. Ammo: 12g Flares or 1 use 12g.`], 1);
    const Flippers = new Equipment(`Flippers`, [`+3 Athletics(Swim). -6 walking Speed.`], 2);
    const Food = new Equipment(`Food`, [`Contains 1 Food to feed a person for a day.`], 1);
    const GasMask = new Equipment(`Gas Mask`, [`+6 C vs airborne toxins. Mask. -1 Perception.`], 1);
    const GlassCutter = new Equipment(`Glass Cutter`, [`Cuts glass quietly.`], 0);
    const Goggles = new Equipment(`Goggles`, [`+3 C to resist toxins in eyes.`], 1);
    const GrapplingHook = new Equipment(`Grappling Hook`, [`+3 Athletics(Climb and Rappel). Holds 100Sz.`], 2);
    const GunCleaningKit = new Equipment(`Gun Cleaning Kit`, [`Gun gets +1 RATK for 1day. Takes 1hr/gun.`], 1);
    const Hacksaw = new Equipment(`Hacksaw`, [`1DMG/rnd of sawing to almost any material.`], 2);
    const Hammock = new Equipment(`Hammock`, [`Suspended sleeping device for 1 person.`], 1);
    const Handcuffs = new Equipment(`Handcuffs`, [`Grabbed. A15# to escape. Larceny(Disable) 12#.`], 1);
    const LeatherBelt = new Equipment(`Leather Belt`, [`1yd strap. Stops Limb Bleeding. Holds 50Sz.`], 1);
    const Lifejacket = new Equipment(`Lifejacket`, [`+6 Athletics(Swim). Prevents drowning.`], 2);
    const Lighter = new Equipment(`Lighter`, [`Makes a small fire. 1yd radius light.`], 0);
    const Lockpicks = new Equipment(`Lockpicks`, [`+3 Larceny(Disable) key locks. 6 picks.`], 1);
    const LuxuryItem = new Equipment(`Luxury Item`, [`Toilet paper, cigarette, etc. +1 Psyche 1/wk.`], 0);
    const MagnifyingGlass = new Equipment(`Magnifying Glass`, [`+6 Perception(See) to inspect tiny details.`], 1);
    const Makeup = new Equipment(`Makeup`, [`+1 Socialize and Entertain for 6hrs. 30 uses.`], 0);
    const Marbles = new Equipment(`Marbles`, [`30/bag. 2sqyd area. A12# or fall Prone.`], 1);
    const Marker = new Equipment(`Marker`, [`Used to permanently write on any surface.`], 0);
    const Matchbook = new Equipment(`Matchbook`, [`+1 Survival(Camp). 1yd light radius, 3rnds.`], 0);
    const MeasuringCup = new Equipment(`Measuring Cup`, [`+3 Science(Chemistry). Marked glass cup.`], 1);
    const Monocular = new Equipment(`Monocular`, [`+1 Perception(See) at 25+yds.`], 1);
    const Multitool = new Equipment(`Multi-tool`, [`+1 Larceny(Disable), Build, Science(Tech).`], 1);
    const MusicalInstrument = new Equipment(`Musical Instrument`, [`+1 Entertain(Distract and Inspire).`], 1);
    const MylarBlanket = new Equipment(`Mylar Blanket`, [`CR. 1yd x 2yd reflective foil sheet.`], 0);
    const Notebook = new Equipment(`Notebook`, [`100 pages of paper with a wire binding.`], 1);
    const Padlock = new Equipment(`Padlock`, [`10HP. 6DR. Larceny(Disable) 9#.`], 1);
    const Paracord = new Equipment(`Paracord`, [`60yd coil. Holds 50Sz.`], 1);
    const Part = new Equipment(`Part`, [`Scrap used for Build and Science(Tech).`], 1);
    const PepperSpray = new Equipment(`Pepper Spray`, [`+1 Ranged(Gun). RNG:1. 3 Pain. 3 uses. Toxin.`], 0);
    const PocketMirror = new Equipment(`Pocket Mirror`, [`Perception(See) 6# to see from behind Cover.`], 0);
    const Poncho = new Equipment(`Poncho`, [`CR. Waterproof.`], 0);
    const RatTrap = new Equipment(`Rat Trap`, [`+1 Survival(Forage). Takes 1day.`], 1);
    const RoadFlare = new Equipment(`Road Flare`, [`3FDMG. 10yd light radius for 20mins.`], 1);
    const Rollerblades = new Equipment(`Rollerblades`, [`Athletics 6#. Speed x3. 1rnd equip. Fail:Prone.`], 2);
    const Rope = new Equipment(`Rope`, [`30yd nylon coil. Holds 100Sz.`], 2);
    const RunningShoes = new Equipment(`Running Shoes`, [`+1 mile of Jogging distance.`], 2);
    const Skateboard = new Equipment(`Skateboard`, [`Athletics 6#. Speed x3. Fail:Prone.`], 3);
    const SleepingBag = new Equipment(`Sleeping Bag`, [`Insulated bag for up to 2 people. CR +3hrs.`], 3);
    const Snorkel = new Equipment(`Snorkel`, [`Breathe while just beneath water's surface.`], 1);
    const SpottingScope = new Equipment(`Spotting Scope`, [`+6 Perception(See) at 100+yds.`], 2);
    const SprayPaint = new Equipment(`Spray Paint`, [`RATK Called Shot:Head. Blind d6rnds. 10 uses.`], 1);
    const Sunglasses = new Equipment(`Sunglasses`, [`No Visibility(Sun) penalty. +1 C vs light.`], 0);
    const SwissArmyKnife = new Equipment(`Swiss Army Knife`, [`+1 Build and Survival.`], 1);
    const TapeMeasure = new Equipment(`Tape Measure`, [`+1 Build. 10yd long wind-up metal tape.`], 2);
    const Tarp = new Equipment(`Tarp`, [`3yd x 3yd plastic sheet. CR. Waterproof.`], 1);
    const Tent = new Equipment(`Tent`, [`4 person. 5min setup/take-down. CR +3hrs.`], 6);
    const ThermalUnderwear = new Equipment(`Thermal Underwear`, [`CR. Can use as 6 Bandages.`], 1);
    const ToolBag = new Equipment(`Tool Bag`, [`+3 Build. Pliers, wrenches, level, etc.`], 3);
    const WaterFilter = new Equipment(`Water Filter`, [`Purifies 1 Water ration (.5gal) per minute.`], 1);
    const Whetstone = new Equipment(`Whetstone`, [`Blade gets +1 DMG for 1day. Takes 1hr/blade.`], 1);
    const Whistle = new Equipment(`Whistle`, [`+1 Tame(Train). Loud shriek 500yd radius.`], 0);
    const WireSaw = new Equipment(`Wire Saw`, [`1DMG/rnd of sawing to wood or bone.`], 1);
    const Wristwatch = new Equipment(`Wristwatch`, [`Tells time and +1 Survival(Navigate).`], 0);
    const ZipTie = new Equipment(`Zip Tie`, [`Grabbed. C9# to escape. Use for +1 Build.`], 0);


    class Medical extends Gear {
    	constructor(name, description, sz) {
    		super(name, description, sz);
    	}
    }

    const Bandage = new Medical(`Bandage`, [`+1 Medicine(First-Aid). 1 use.`], 0);
    const Crutch = new Medical(`Crutch`, [`Halves Leg DMG Pain penalty to Speed.`], 3);
    const EMTBag = new Medical(`EMT Bag`, [`+3 Medicine(First-Aid). 30 uses.`], 5);
    const FirstAidKit = new Medical(`First-Aid Kit`, [`+1 Medicine(First-Aid). 5 uses.`], 1);
    const PressureCuff = new Medical(`Pressure Cuff`, [`+1 Medicine.`], 1);
    const Stethoscope = new Medical(`Stethoscope`, [`+1 Medicine. Perception(Hear) 6# through doors.`], 1);
    const SurgeryKit = new Medical(`Surgery Kit`, [`+3 Medicine(Surgery).`], 3);
    const Thermometer = new Medical(`Thermometer`, [`+1 Medicine. Accurately reads temperature.`], 0);
    const TransfusionKit = new Medical(`Transfusion Kit`, [`Medicine 9#. Heal 1 Wound. Takes 1hr.`], 1);


    class MeleeWeapon extends Gear {
    	constructor(name, description, sz, dmg, hands, rng) {
    		super(name, description, sz);
    		this.dmg = dmg;
    		this.hands = hands;
    		this.rng = rng;
    	}
    }

    const Ax = new MeleeWeapon(`Ax`, [`Slow`, `Chop`], 4, 5, 2, 2);
    const BaseballBat = new MeleeWeapon(`Baseball Bat`, [], 3, 3, 2, 2);
    const BrassKnuckles = new MeleeWeapon(`Brass Knuckles`, [`Unarmed`], 1, 2, 1, 1);
    const Crowbar = new MeleeWeapon(`Crowbar`, [], 3, 3, 1, 2);
    const Hammer = new MeleeWeapon(`Hammer`, [], 2, 2, 1, 1);
    const Hatchet = new MeleeWeapon(`Hatchet`, [`Chop`], 2, 2, 1, 1);
    const Knife = new MeleeWeapon(`Knife`, [`Pierce`, `Rapid`], 1, 2, 1, 1);
    const Machete = new MeleeWeapon(`Machete`, [`Chop`], 2, 3, 1, 2);
    const Shield = new MeleeWeapon(`Shield`, [`Cover 3DR`, `+3 Block`], 4, 1, 1, 1);
    const Sledgehammer = new MeleeWeapon(`Sledgehammer`, [`Slow`], 5, 5, 2, 2);
    const Spear = new MeleeWeapon(`Spear`, [`Pierce`], 3, 4, 2, 3);
    const Staff = new MeleeWeapon(`Staff`, [], 3, 2, 2, 3);

    const MeleeList = [
    	Ax,
    	BaseballBat,
    	BrassKnuckles,
    	Crowbar,
    	Hammer,
    	Hatchet,
    	Knife,
    	Machete,
    	Shield,
    	Sledgehammer,
    	Spear,
    	Staff
    ];

    // RARE MELEE
    // new MeleeWeapon(`Barbwire Club`, 3, 1, ``, 2),
    // new MeleeWeapon(`Bowie Knife`, 2, 1, `Chop. Rapid.`, 1),
    // new MeleeWeapon(`Broadsword`, 4, 2, `Chop or Pierce.`, 4),
    // new MeleeWeapon(`Catch Pole`, 0, 2, `+1 Block. Blunt. +1 Grab.`, 3),
    // new MeleeWeapon(`Chainsaw`, 6, 2, `.5gal Fuel. d6rnd start. 1: Empty. Loud.`, 4),
    // new MeleeWeapon(`Ice Ax`, 3, 1, `Lever. Pierce.`, 2),
    // new MeleeWeapon(`Katana`, 5, 2, `Chop or Pierce. Rapid.`, 3),
    // new MeleeWeapon(`Kukri`, 3, 1, `Chop`, 2),
    // new MeleeWeapon(`Lasso`, 0, 2, `Blunt. +1 Grab. Throw (RNG:3)`, 2),
    // new MeleeWeapon(`Net`, 0, 2, `+6 Grab.`, 3),
    // new MeleeWeapon(`Rapier`, 3, 1, `Pierce. Rapid.`, 2),
    // new MeleeWeapon(`Scythe`, 6, 2, `Chop. Pierce.`, 4),
    // new MeleeWeapon(`Sign Shield`, 2, 1, `+3 Block. Cover 6DR.`, 4),
    // new MeleeWeapon(`Switchblade`, 1, 1, `Pierce. Rapid.`, 0),
    // new MeleeWeapon(`Trench Knife`, 2, 1, `Blunt Punch. Pierce. Rapid.`, 1),
    // new MeleeWeapon(`Whip`, 0, 1, `Blunt. +1 Disarm. +1 Grab. RNG:3.`, 1),

    // OLD MELEE
    // new MeleeWeapon(`Baton`, 2, 1, `Blunt. Rapid.`, 2),
    // new MeleeWeapon(`Cane`, 1, 1, `Blunt. +1 Trip. Can be used as a Crutch.`, 3),
    // new MeleeWeapon(`Cleaver`, 2, 1, `Chop.`, 1),
    // new MeleeWeapon(`Firepoker`, 3, 1, `Lever. Pierce.`, 3),
    // new MeleeWeapon(`Garrote`, 1, 2, `Blunt. +3 to Grab(Lock) Head.`, 1),
    // new MeleeWeapon(`Metal Club`, 3, 2, `Blunt.`, 3),
    // new MeleeWeapon(`Pickax`, 6, 2, `Lever. Pierce.`, 5),
    // new MeleeWeapon(`Pitchfork`, 3, 2, `+1 Block. Pierce.`, 4),
    // new MeleeWeapon(`Screwdriver`, 1, 1, `Lever. Pierce. Rapid.`, 1),
    // new MeleeWeapon(`Shovel`, 3, 2, `+1 Block`, 4),
    // new MeleeWeapon(`Tire Iron`, 2, 1, `Lever.`, 2),
    // new MeleeWeapon(`Torch`, 1, 1, `Blunt. +1 FDMG. 5yd light radius 1hr.`, 2),


    class RangedWeapon extends Gear {
    	constructor(name, dmg, hands, rng, cal, mag, reg, description, sz) {
    		super(name, description, sz);
    		this.dmg = dmg;
    		this.hands = hands;
    		this.rng = rng;
    		this.cal = cal;
    		this.mag = mag;
    		this.reg = reg;
    	}
    }

    const BoltActionRifle = new RangedWeapon(`Bolt-Action Rifle`, [], 4, 3, 2, 200, 5, `.308`, `C`);
    const CompoundBow = new RangedWeapon(`Compound Bow`, [], 4, 1, 2, 10, 1, `Arrow`, `C`);
    const Crossbow = new RangedWeapon(`Crossbow`, [], 4, 2, 2, 20, 1, `Arrow`, `C`);
    const DoubleBarrelShotgun = new RangedWeapon(`Double-Barrel Shotgun`, [`Rapid`, `Scatter`], 4, 4, 2, 20, 2, `12g`, `C`);
    const LeverActionRifle = new RangedWeapon(`Lever-Action Rifle`, [], 3, 2, 2, 50, 10, `.357`, `C`);
    const PumpShotgun = new RangedWeapon(`Pump Shotgun`, [`Scatter`], 4, 4, 2, 20, 6, `12g`, `C`);
    const Revolver = new RangedWeapon(`Revolver`, [], 2, 2, 1, 10, 6, `.357`, `C`);
    const SemiAutoCarbine = new RangedWeapon(`Semi-Auto Carbine`, [`Rapid`], 3, 1, 2, 30, 30, `9mm`, `C`);
    const SemiAutoPistol = new RangedWeapon(`Semi-Auto Pistol`, [`Rapid`], 1, 1, 1, 10, 15, `9mm`, `C`);
    const SemiAutoRifle = new RangedWeapon(`Semi-Auto Rifle`, [`Rapid`], 3, 2, 2, 100, 30, `5.56`, `C`);
    const SemiAutoShotgun = new RangedWeapon(`Semi-Auto Shotgun`, [`Rapid`, `Scatter`], 4, 4, 2, 20, 6, `12g`, `C`);
    const TargetPistol = new RangedWeapon(`Target Pistol`, [`Rapid`], 1, 1, 2, 30, 10, `.22`, `C`);
    const TargetRifle = new RangedWeapon(`Target Rifle`, [`Rapid`], 3, 1, 2, 50, 10, `.22`, `C`);

    const RangedList = [
    	BoltActionRifle,
    	CompoundBow,
    	Crossbow,
    	DoubleBarrelShotgun,
    	LeverActionRifle,
    	PumpShotgun,
    	Revolver,
    	SemiAutoCarbine,
    	SemiAutoPistol,
    	SemiAutoRifle,
    	SemiAutoShotgun,
    	TargetPistol,
    	TargetRifle
    ];

    // RARE RANGED
    // new RangedWeapon(`Blowgun`, 0, `Cx2`, `Dart`, 1, 2, `Pierce. DMG Mod.`, 1),
    // new RangedWeapon(`Bolas`, 0, `Cx2`, `-`, `-`, 1, `Blunt. DMG Mod. Trip. Throw.`, 1),	
    // new RangedWeapon(`Derringer`, 1, 3, `.22`, 2, 1, `-1 RATK.`, 0),
    // new RangedWeapon(`Flamethrower`, `d6x3`, 5, `Fuel`, 7, `Auto. 3yd Blast. FDMG.`, 6),
    // new RangedWeapon(`Longbow`, 1, 20, `Arrow`, 1, 2, `DMG Mod. -1 RATK.`, 3),
    // new RangedWeapon(`M2 Browning`, 12, 200, `.50BMG`, `belt`, 2, `Auto. Mounted.`, 16),
    // new RangedWeapon(`M4A1 Carbine`, 4, 50, `5.56`, `30mag`, 2, `Auto. Rapid.`, 3),
    // new RangedWeapon(`M32 Launcher`, `varies`, 25, `40mm`, 6, 2, `Rapid.`, 4),
    // new RangedWeapon(`M60 Machinegun`, 5, 100, `.308`, 300, 2, `Auto. Rapid. Bipod.`, 6),
    // new RangedWeapon(`M72 LAW`, `d6x9`, 50, `Rocket`, 1, 2, `12yd Blast. Pierce.`, 3),
    // new RangedWeapon(`M82 Barret`, 12, 200, `.50BMG`, `10mag`, 2, `Rapid. Bipod. Scope.`, 6),
    // new RangedWeapon(`M134 Minigun`, 5, 100, `.308`, 1000, 2, `Auto only. Rapid. Mounted.`, 8),
    // new RangedWeapon(`M203 Launcher`, `varies`, 25, `40mm`, 1, 2, `2h GUN ACCESSORY.`, 2),
    // new RangedWeapon(`M249 SAW`, 4, 100, `5.56`, 100, 2, `Auto. Rapid.`, 5),
    // new RangedWeapon(`Medusa 47`, `2, 3`, `9mm, .357`, `6cyl`, 1, `Revolver. Multi-Caliber.`, 2),
    // new RangedWeapon(`Saiga-12`, 6, 15, `12g`, `12mag`, 2, `Rapid. Scatter.`, 4),
    // new RangedWeapon(`Slingshot`, 1, 5, `Rocks`, 1, 2, `Blunt. DMG Mod.`, 1),
    // new RangedWeapon(`Speargun`, 4, 5, `Arrow + Rope`, 1, 2, `Pierce. 2rnd Reload.`, 4),
    // new RangedWeapon(`Uzi`, 2, 10, `9mm`, `30mag`, 2, `Auto. Rapid. -1 RATK.`, 3),
    // new RangedWeapon(`W. P. Grenade`, `d6x3`, 3, `Grenade`, 1, 1, `6yd Blast. Blind. d6rnds.`, 1),

    // OLD RANGED
    // new RangedWeapon(`AK-47`, 4, 50, `7.62`, `30mag`, 2, `Auto. Rapid.`, 4),
    // new RangedWeapon(`AR-15`, 4, 100, `5.56`, `30mag`, 2, `Rapid.`, 3),
    // new RangedWeapon(`Benelli M4`, 6, 15, `12g`, 7, 2, `Rapid. Scatter.`, 4),
    // new RangedWeapon(`Browning A-Bolt`, 4, 100, `5.56`, `5mag`, 2, `+1 RATK. Scope.`, 3),
    // new RangedWeapon(`Colt Python`, 3, 25, `.357`, `6cyl`, 1, `Revolver.`, 2),
    // new RangedWeapon(`Compound Bow`, 1, 25, `Arrow`, 1, 2, `DMG Mod. -1 RATK.`, 4),
    // new RangedWeapon(`Crossbow`, 6, 50, `Arrow`, 1, 2, `1rnd Reload.`, 4),
    // new RangedWeapon(`Glock 17`, 2, 25, `9mm`, `17mag`, 1, `Rapid.`, 1),
    // new RangedWeapon(`H&ampK MP5`, 2, 50, `9mm`, `30mag`, 2, `Auto. Rapid.`, 2),
    // new RangedWeapon(`Henry Golden Boy`, 1, 50, `.22`, 16, 2, `+1 RATK.`, 3),
    // new RangedWeapon(`Kimber 1911`, 2, 25, `.45`, 7, 1, `Rapid.`, 1),
    // new RangedWeapon(`MAC-10`, 2, 5, `.45`, 30, 2, `Auto. Rapid. -1 RATK`, 2),
    // new RangedWeapon(`Marlin 1894C`, 3, 50, `.357`, 9, 2, `+1 RATK.`, 3),
    // new RangedWeapon(`Mossberg 500`, 6, 10, `12g`, 5, 2, `Scatter.`, 2),
    // new RangedWeapon(`Norinco SKS`, 4, 50, `7.62`, 10, 2, `Rapid. Bayonet.`, 4),
    // new RangedWeapon(`Remington 700`, 5, 100, `.308`, 6, 2, `+1 RATK. Scope.`, 4),
    // new RangedWeapon(`Remington 870`, `var`, 15, `12g`, 7, 2, `Scatter.`, 4),
    // new RangedWeapon(`Ruger 10/22`, 1, 50, `.22`, `10mag`, 2, `Rapid.`, 3),
    // new RangedWeapon(`Ruger Mk.III`, 1, 25, `.22`, `10mag`, 1, `Rapid.`, 1),
    // new RangedWeapon(`SIG Sauer P290`, 2, 10, `9mm`, `6mag`, 1, `Rapid.`, 1),
    // new RangedWeapon(`Savage Mk.II`, 1, 50, `.22`, `10mag`, 2, `+1 RATK.`, 3),
    // new RangedWeapon(`Springfield M1A`, 5, 100, `.308`, `20mag`, 2, `Rapid.`, 4),
    // new RangedWeapon(`S&ampW Snubnose`, 3, 5, `.357`, `5cyl`, 1, `Revolver.`, 1),
    // new RangedWeapon(`Winchester Sawn-off`, 6, 5, `12g`, 2, 2, `Rapid. Scatter.`, 2)


    const WeaponList = [
    	...MeleeList,
    	...RangedList
    ];


    class Storage extends Gear {
    	constructor(name, description, sz, slots) {
    		super(name, description, sz);
    		this.slots = slots;
    	}
    }

    const Backpack = new Storage(`Backpack`, `2rnds to access.`, 1, 30);
    const Bandoleer = new Storage(`Bandoleer`, `Holds 50 bullets of any caliber.`, 0, 1);
    const BDUJacket = new Storage(`BDU Jacket`, `Camo.`, 0, 4);
    const CargoPants = new Storage(`Cargo Pants`, `Camo.`, 1, 6);
    const Canteen = new Storage(`Canteen`, `Holds 1 unit (.5gal) of liquid. Metal.`, 1, 1);
    const ConcealedHolster = new Storage(`Concealed Holster`, `Perception 12# to spot a Size 1 Gun.`, 0, 1);
    const Cooler = new Storage(`Cooler`, `Hunted or Foraged Food lasts 6 days.`, 4, 30);
    const DuffelBag = new Storage(`Duffel Bag`, `2rnds to access.`, 3, 40);
    const FuelCan = new Storage(`Fuel Can`, `5gal Fuel. d6FDMG/gal, 1min, 1yd/gal Blast.`, 2, 5);
    const Hoody = new Storage(`Hoody`, `CR.`, 0, 2);
    const HydrationPack = new Storage(`Hydration Pack`, `Holds 4 units (2gal) of liquid.`, 1, 4);
    const Lockbox = new Storage(`Lockbox`, `10HP. 6DR. FR. Larceny(Disable) 9#.`, 2, 1);
    const MessengerBag = new Storage(`Messenger Bag`, `1rnd to access.`, 2, 4);
    const PlasticJug = new Storage(`Plastic Jug`, `Holds 2 units (1gal) of liquid.`, 1, 2);
    const Purse = new Storage(`Purse`, `1rnd to access.`, 1, 3);
    const Speedloader = new Storage(`Speed-loader`, `Reload a revolver cylinder as 1 action.`, 0, 0);
    const ToolBelt = new Storage(`Tool Belt`, `6x 1 Slots. +1 Build. Miscellaneous small tools.`, 2, 6);
    const TrenchCoat = new Storage(`Trench Coat`, `CR. +1 Stealth.`, 1, 4);
    const WaterBottle = new Storage(`Water Bottle`, `Holds 1 unit (.5gal) of liquid.`, 1, 1);

    const Languages = [
        'Amharic',
        'Arabic',
        'Assamese',
        'Awadhi',
        'Azerbaijani',
        'Bengali',
        'Bhojpuri',
        'Burmese',
        'Cebuano',
        'Chhattisgarhi',
        'Chinese',
        'Chittagonian',
        'Czech',
        'Deccan',
        'Dutch',
        'English',
        'French',
        'German',
        'Greek',
        'Gujarati',
        'Hausa',
        'Hindi',
        'Hungarian',
        'Igbo',
        'Indonesian',
        'Italian',
        'Japanese',
        'Javanese',
        'Kannada',
        'Kazakh',
        'Khmer',
        'Kinyarwanda',
        'Korean',
        'Kurdish',
        'Latin',
        'Maithili',
        'Malay',
        'Malayalam',
        'Magahi',
        'Marathi',
        'Morse Code',
        'Nepali',
        'Odia',
        'Pashto',
        'Persian',
        'Polish',
        'Portuguese',
        'Punjabi',
        'Romanian',
        'Russian',
        'Saraiki',
        'Serbo-Croatian',
        'Sign Language',
        'Sindhi',
        'Sinhala',
        'Somali',
        'Spanish',
        'Sunda',
        'Sylheti',
        'Tagalog',
        'Tamil',
        'Telugu',
        'Thai',
        'Turkish',
        'Ukrainian',
        'Urdu',
        'Uyghur',
        'Vietnamese',
        'Yoruba',
        'Zulu',
    ];

    class Ability extends Rule {
    	constructor(
    		name,
    		description,
    		max,
    		xp,
    		taken=0,
    		options=[``],
    		selection=0,
    		notes=``,
    		visible=true
    	) {
    		super(name, description);
    		this.max = max;
    		this.xp = xp;
    		this.taken = taken;
    		this.options = options;
    		this.selection = selection,
    		this.notes = notes,
    		this.visible = visible;
    	}
    }

    // 3 XP Abilities

    const FavoriteWeapon = new Ability(
    	`Favorite Weapon`,
    	[`Botch is only a Fail with this weapon type.`],
    	1, 3, 0,
    	WeaponList
    );
    const HyperImmunity = new Ability(
    	`Hyper Immunity`,
    	[`+1 to resist Diseases.`],
    	3, 3, 0,
    );
    const PackMentality = new Ability(
    	`Pack Mentality`,
    	[`+1 ATK at a target a Comrade ATKs this rnd.`],
    	1, 3, 0
    );
    const QuickReload = new Ability(
    	`Quick Reload`,
    	[`Free Reload once per rnd.`],
    	1, 3, 0
    );
    const Specialize = new Ability(
    	`Specialize`,
    	[`+1 to a Skill Specialty.`],
    	1, 3, 0,
    	SpecialtyList
    );
    const WeaponTraining = new Ability(
    	`Weapon Training`,
    	[`+1 ATK with this weapon type.`],
    	1, 3, 0,
    	WeaponList
    );

    // 6 XP Abilities ---> TODO: Add 1 more

    const EfficientWork = new Ability(
    	`Efficient Work`,
    	[`[Time / 2] for a Skill (minimum 1 action).`],
    	1, 6, 0,
    	SkillList
    );
    const FastDraw = new Ability(
    	`Fast Draw`,
    	[`Free item draw once per rnd.`],
    	1, 6, 0
    );
    const FleetFooted = new Ability(
    	`Fleet Footed`,
    	[`+1 Speed.`],
    	3, 6, 0
    );
    let languageList = [];
    Languages.forEach((language) => {
    	languageList.push(
    		{
    			name: language
    		}
    	);
    });
    const Multilingual = new Ability(
    	`Multilingual`,
    	[`Learn a different form of communication.`],
    	1, 6, 0,
    	languageList
    );
    const Practice = new Ability(
    	`Practice`,
    	[`+1 to a Skill (up to the parent Trait).`],
    	1, 6, 0,
    	SkillList
    );

    // 9 XP Abilities ---> TODO: Add 1 more

    const DangerSense = new Ability(
    	`Danger Sense`,
    	[`+1 Reflex.`],
    	1, 9, 0
    );
    const Discipline = new Ability(
    	`Discipline`,
    	[`Ignore 1 Pain penalty.`],
    	3, 9, 0
    );
    const Fortunate = new Ability(
    	`Fortunate`,
    	[`+1 Luck.`],
    	1, 9, 0
    );
    const FreeRunning = new Ability(
    	`Free Running`,
    	[`Acrobatics 9# to Climb as a Run action.`],
    	1, 9, 0
    );
    let unorthodoxList = [];
    TraitList.forEach((trait) => {
    	SkillList.forEach((skill) => {
    		let tname = trait.name;
    		let sname = skill.name;
    		if (skill.parent != trait.name) {
    			unorthodoxList.push(
    				{
    					name: `${tname} - ${sname}`
    				}
    			);
    		}
    	});
    });
    const Unorthodox = new Ability(
    	`Unorthodox`,
    	[`Pick a new parent Trait for a Skill.`],
    	1, 9, 0,
    	unorthodoxList
    );

    // 12 XP Abilities

    const Fencing = new Ability(
    	`Fencing`,
    	[`Free Block roll once per rnd.`],
    	1, 12, 0
    );
    const Sidestep = new Ability(
    	`Side-step`,
    	[`Free Dodge roll once per rnd.`],
    	1, 12, 0
    );
    const Wrestling = new Ability(
    	`Wrestling`,
    	[`Free Grab roll once per rnd.`],
    	1, 12, 0
    );

    // 15 XP Abilities

    const FirmGrip = new Ability(
    	`Firm Grip`,
    	[`Use 2h weapons in 1h, up to Size 3.`],
    	1, 15, 0
    );
    const HardHeaded = new Ability(
    	`Hard Headed`,
    	[`Ignore Stun from Head DMG.`],
    	1, 15, 0
    );
    const PowerfulStrike = new Ability(
    	`Powerful Strike`,
    	[`+1 DMG with this Melee weapon type.`],
    	1, 15, 0,
    	MeleeList
    );

    // 18 XP Abilities

    const Assassin = new Ability(
    	`Assassin`,
    	[`+3 DMG to ATKs from Concealment.`],
    	1, 18, 0
    );
    const VehicleOperation = new Ability(
    	`Vehicle Operation`,
    	[`Proficiently operate a class of vehicle.`],
    	1, 18, 0
    ); // TODO: Need to add VehicleList when it is made

    // 24 XP Abilities

    const Ambidextrous = new Ability(
    	`Ambidextrous`,
    	[`Off-hand penalty is -1 instead of -3.`],
    	1, 24, 0
    );
    const Tough = new Ability(
    	`Tough`,
    	[`+1 Health.`],
    	3, 24, 0
    );

    // 30 XP Abilities

    const SelfImprovement = new Ability(
    	`Self Improvement`,
    	[`+1 to a Trait (max 6).`],
    	1, 30, 0,
    	TraitList
    );
    const CloseCall = new Ability(
    	`Close Call`,
    	[`Spend this Ability to avoid Death once.`],
    	1, 30, 0
    );

    const XP30Abilities = [
    	SelfImprovement,
    	CloseCall
    ];


    const AbilityList = [
    	// ...XP3Abilities,
    	// ...XP6Abilities,
    	// ...XP9Abilities,
    	// ...XP12Abilities,
    	// ...XP15Abilities,
    	// ...XP18Abilities,
    	// ...XP24Abilities,
    	...XP30Abilities
    ];



    const TempAbilityList = new Set([]);
    for (let a = 0; a < AbilityList.length; ++a) {
    	if (AbilityList[a].options.length > 1) {
    		for (let o = 0; o < AbilityList[a].options.length; ++o) {
    			let newAbility = new Ability(
    				AbilityList[a].name,
    				AbilityList[a].description,
    				AbilityList[a].max,
    				AbilityList[a].xp,
    				AbilityList[a].taken,
    				[AbilityList[a].options[o]],
    				o
    			);
    			TempAbilityList.add(newAbility);
    		}
    	}
    	else {
    		let newAbility = new Ability(
    			AbilityList[a].name,
    			AbilityList[a].description,
    			AbilityList[a].max,
    			AbilityList[a].xp,
    			AbilityList[a].taken
    		);
    		TempAbilityList.add(newAbility);
    	}
    }
    const MasterAbilityList = [...TempAbilityList];

    /* src/components/creator/CreAbilities.svelte generated by Svelte v3.16.7 */
    const file$7 = "src/components/creator/CreAbilities.svelte";

    function get_each_context_1$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	child_ctx[8] = i;
    	return child_ctx;
    }

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	child_ctx[7] = list;
    	child_ctx[8] = i;
    	return child_ctx;
    }

    // (71:4) {#if      DisplayList[index-1] != undefined &&       DisplayList[index].xp != DisplayList[index-1].xp     }
    function create_if_block_3(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "xp-separator svelte-1gqpsr5");
    			add_location(div, file$7, 74, 5, 2323);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(71:4) {#if      DisplayList[index-1] != undefined &&       DisplayList[index].xp != DisplayList[index-1].xp     }",
    		ctx
    	});

    	return block;
    }

    // (77:4) {#if      index == 0 ||      ability.xp != DisplayList[index-1].xp     }
    function create_if_block_2(ctx) {
    	let div;
    	let t0_value = /*ability*/ ctx[6].xp + "";
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = text("XP Abilities");
    			attr_dev(div, "class", "xp-header svelte-1gqpsr5");
    			add_location(div, file$7, 80, 5, 2444);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*DisplayList*/ 1 && t0_value !== (t0_value = /*ability*/ ctx[6].xp + "")) set_data_dev(t0, t0_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(77:4) {#if      index == 0 ||      ability.xp != DisplayList[index-1].xp     }",
    		ctx
    	});

    	return block;
    }

    // (92:6) {#if ability.options[0] != ''}
    function create_if_block_1$2(ctx) {
    	let span;
    	let select;
    	let select_name_value;
    	let dispose;
    	let each_value_1 = /*ability*/ ctx[6].options;
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
    	}

    	function select_change_handler() {
    		/*select_change_handler*/ ctx[4].call(select, /*ability*/ ctx[6]);
    	}

    	const block = {
    		c: function create() {
    			span = element("span");
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(select, "name", select_name_value = /*ability*/ ctx[6].name);
    			if (/*ability*/ ctx[6].selection === void 0) add_render_callback(select_change_handler);
    			add_location(select, file$7, 93, 8, 2889);
    			attr_dev(span, "class", "ability-options");
    			add_location(span, file$7, 92, 7, 2850);

    			dispose = [
    				listen_dev(select, "change", select_change_handler),
    				listen_dev(select, "change", /*modifyAbilities*/ ctx[2], false, false, false)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, select);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			select_option(select, /*ability*/ ctx[6].selection);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*DisplayList*/ 1) {
    				each_value_1 = /*ability*/ ctx[6].options;
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$2(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}

    			if (dirty & /*DisplayList*/ 1 && select_name_value !== (select_name_value = /*ability*/ ctx[6].name)) {
    				attr_dev(select, "name", select_name_value);
    			}

    			if (dirty & /*DisplayList*/ 1) {
    				select_option(select, /*ability*/ ctx[6].selection);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			destroy_each(each_blocks, detaching);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(92:6) {#if ability.options[0] != ''}",
    		ctx
    	});

    	return block;
    }

    // (99:9) {#each ability.options as option, index}
    function create_each_block_1$2(ctx) {
    	let option;
    	let t0_value = /*option*/ ctx[9].name + "";
    	let t0;
    	let t1;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t0 = text(t0_value);
    			t1 = space();
    			option.__value = option_value_value = /*index*/ ctx[8];
    			option.value = option.__value;
    			add_location(option, file$7, 99, 10, 3073);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t0);
    			append_dev(option, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*DisplayList*/ 1 && t0_value !== (t0_value = /*option*/ ctx[9].name + "")) set_data_dev(t0, t0_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$2.name,
    		type: "each",
    		source: "(99:9) {#each ability.options as option, index}",
    		ctx
    	});

    	return block;
    }

    // (130:4) {#if      DisplayList[index+1] != undefined &&      DisplayList[index].xp == DisplayList[index+1].xp     }
    function create_if_block$2(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "ab-separator svelte-1gqpsr5");
    			add_location(div, file$7, 133, 5, 3949);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(130:4) {#if      DisplayList[index+1] != undefined &&      DisplayList[index].xp == DisplayList[index+1].xp     }",
    		ctx
    	});

    	return block;
    }

    // (70:3) {#each DisplayList as ability, index}
    function create_each_block$3(ctx) {
    	let t0;
    	let t1;
    	let div5;
    	let div0;
    	let span0;
    	let t2_value = /*ability*/ ctx[6].name + "";
    	let t2;
    	let t3;
    	let div1;
    	let span1;
    	let t5;
    	let span2;
    	let t6_value = /*ability*/ ctx[6].description + "";
    	let t6;
    	let t7;
    	let t8;
    	let div2;
    	let span3;
    	let t10;
    	let span4;
    	let t11_value = /*ability*/ ctx[6].max + "";
    	let t11;
    	let t12;
    	let div3;
    	let span5;
    	let t14;
    	let span6;
    	let t15_value = /*ability*/ ctx[6].xp + "";
    	let t15;
    	let t16;
    	let div4;
    	let span7;
    	let t18;
    	let span8;
    	let input;
    	let input_max_value;
    	let input_updating = false;
    	let t19;
    	let if_block3_anchor;
    	let dispose;
    	let if_block0 = /*DisplayList*/ ctx[0][/*index*/ ctx[8] - 1] != undefined && /*DisplayList*/ ctx[0][/*index*/ ctx[8]].xp != /*DisplayList*/ ctx[0][/*index*/ ctx[8] - 1].xp && create_if_block_3(ctx);
    	let if_block1 = (/*index*/ ctx[8] == 0 || /*ability*/ ctx[6].xp != /*DisplayList*/ ctx[0][/*index*/ ctx[8] - 1].xp) && create_if_block_2(ctx);
    	let if_block2 = /*ability*/ ctx[6].options[0] != "" && create_if_block_1$2(ctx);

    	function input_input_handler() {
    		input_updating = true;
    		/*input_input_handler*/ ctx[5].call(input, /*ability*/ ctx[6]);
    	}

    	let if_block3 = /*DisplayList*/ ctx[0][/*index*/ ctx[8] + 1] != undefined && /*DisplayList*/ ctx[0][/*index*/ ctx[8]].xp == /*DisplayList*/ ctx[0][/*index*/ ctx[8] + 1].xp && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			div5 = element("div");
    			div0 = element("div");
    			span0 = element("span");
    			t2 = text(t2_value);
    			t3 = space();
    			div1 = element("div");
    			span1 = element("span");
    			span1.textContent = "Descripiton:";
    			t5 = space();
    			span2 = element("span");
    			t6 = text(t6_value);
    			t7 = space();
    			if (if_block2) if_block2.c();
    			t8 = space();
    			div2 = element("div");
    			span3 = element("span");
    			span3.textContent = "Max:";
    			t10 = space();
    			span4 = element("span");
    			t11 = text(t11_value);
    			t12 = space();
    			div3 = element("div");
    			span5 = element("span");
    			span5.textContent = "XP:";
    			t14 = space();
    			span6 = element("span");
    			t15 = text(t15_value);
    			t16 = space();
    			div4 = element("div");
    			span7 = element("span");
    			span7.textContent = "Taken:";
    			t18 = space();
    			span8 = element("span");
    			input = element("input");
    			t19 = space();
    			if (if_block3) if_block3.c();
    			if_block3_anchor = empty();
    			attr_dev(span0, "class", "ability-name svelte-1gqpsr5");
    			add_location(span0, file$7, 84, 6, 2573);
    			attr_dev(div0, "class", "col m-col svelte-1gqpsr5");
    			add_location(div0, file$7, 83, 5, 2543);
    			attr_dev(span1, "class", "description-label svelte-1gqpsr5");
    			add_location(span1, file$7, 87, 6, 2669);
    			attr_dev(span2, "class", "ability-description");
    			add_location(span2, file$7, 88, 6, 2728);
    			attr_dev(div1, "class", "col l-col svelte-1gqpsr5");
    			add_location(div1, file$7, 86, 5, 2639);
    			attr_dev(span3, "class", "max-label svelte-1gqpsr5");
    			add_location(span3, file$7, 108, 6, 3250);
    			attr_dev(span4, "class", "ability-max");
    			add_location(span4, file$7, 109, 6, 3293);
    			attr_dev(div2, "class", "col s-col svelte-1gqpsr5");
    			add_location(div2, file$7, 107, 5, 3220);
    			attr_dev(span5, "class", "xp-label svelte-1gqpsr5");
    			add_location(span5, file$7, 112, 6, 3387);
    			attr_dev(span6, "class", "ability-xp");
    			add_location(span6, file$7, 113, 6, 3428);
    			attr_dev(div3, "class", "col s-col svelte-1gqpsr5");
    			add_location(div3, file$7, 111, 5, 3357);
    			attr_dev(span7, "class", "taken-label svelte-1gqpsr5");
    			add_location(span7, file$7, 116, 6, 3520);
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", "0");
    			attr_dev(input, "max", input_max_value = /*ability*/ ctx[6].max);
    			attr_dev(input, "class", "taken-number svelte-1gqpsr5");
    			add_location(input, file$7, 118, 7, 3603);
    			attr_dev(span8, "class", "ability-taken");
    			add_location(span8, file$7, 117, 6, 3567);
    			attr_dev(div4, "class", "col s-col svelte-1gqpsr5");
    			add_location(div4, file$7, 115, 5, 3490);
    			attr_dev(div5, "class", "ability-row");
    			add_location(div5, file$7, 82, 4, 2512);

    			dispose = [
    				listen_dev(input, "input", input_input_handler),
    				listen_dev(input, "change", prevent_default(/*modifyAbilities*/ ctx[2]), false, true, false)
    			];
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t0, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div0);
    			append_dev(div0, span0);
    			append_dev(span0, t2);
    			append_dev(div5, t3);
    			append_dev(div5, div1);
    			append_dev(div1, span1);
    			append_dev(div1, t5);
    			append_dev(div1, span2);
    			append_dev(span2, t6);
    			append_dev(div1, t7);
    			if (if_block2) if_block2.m(div1, null);
    			append_dev(div5, t8);
    			append_dev(div5, div2);
    			append_dev(div2, span3);
    			append_dev(div2, t10);
    			append_dev(div2, span4);
    			append_dev(span4, t11);
    			append_dev(div5, t12);
    			append_dev(div5, div3);
    			append_dev(div3, span5);
    			append_dev(div3, t14);
    			append_dev(div3, span6);
    			append_dev(span6, t15);
    			append_dev(div5, t16);
    			append_dev(div5, div4);
    			append_dev(div4, span7);
    			append_dev(div4, t18);
    			append_dev(div4, span8);
    			append_dev(span8, input);
    			set_input_value(input, /*ability*/ ctx[6].taken);
    			insert_dev(target, t19, anchor);
    			if (if_block3) if_block3.m(target, anchor);
    			insert_dev(target, if_block3_anchor, anchor);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (/*DisplayList*/ ctx[0][/*index*/ ctx[8] - 1] != undefined && /*DisplayList*/ ctx[0][/*index*/ ctx[8]].xp != /*DisplayList*/ ctx[0][/*index*/ ctx[8] - 1].xp) {
    				if (!if_block0) {
    					if_block0 = create_if_block_3(ctx);
    					if_block0.c();
    					if_block0.m(t0.parentNode, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*index*/ ctx[8] == 0 || /*ability*/ ctx[6].xp != /*DisplayList*/ ctx[0][/*index*/ ctx[8] - 1].xp) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_2(ctx);
    					if_block1.c();
    					if_block1.m(t1.parentNode, t1);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (dirty & /*DisplayList*/ 1 && t2_value !== (t2_value = /*ability*/ ctx[6].name + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*DisplayList*/ 1 && t6_value !== (t6_value = /*ability*/ ctx[6].description + "")) set_data_dev(t6, t6_value);

    			if (/*ability*/ ctx[6].options[0] != "") {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    				} else {
    					if_block2 = create_if_block_1$2(ctx);
    					if_block2.c();
    					if_block2.m(div1, null);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}

    			if (dirty & /*DisplayList*/ 1 && t11_value !== (t11_value = /*ability*/ ctx[6].max + "")) set_data_dev(t11, t11_value);
    			if (dirty & /*DisplayList*/ 1 && t15_value !== (t15_value = /*ability*/ ctx[6].xp + "")) set_data_dev(t15, t15_value);

    			if (dirty & /*DisplayList*/ 1 && input_max_value !== (input_max_value = /*ability*/ ctx[6].max)) {
    				attr_dev(input, "max", input_max_value);
    			}

    			if (!input_updating && dirty & /*DisplayList*/ 1) {
    				set_input_value(input, /*ability*/ ctx[6].taken);
    			}

    			input_updating = false;

    			if (/*DisplayList*/ ctx[0][/*index*/ ctx[8] + 1] != undefined && /*DisplayList*/ ctx[0][/*index*/ ctx[8]].xp == /*DisplayList*/ ctx[0][/*index*/ ctx[8] + 1].xp) {
    				if (!if_block3) {
    					if_block3 = create_if_block$2(ctx);
    					if_block3.c();
    					if_block3.m(if_block3_anchor.parentNode, if_block3_anchor);
    				}
    			} else if (if_block3) {
    				if_block3.d(1);
    				if_block3 = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div5);
    			if (if_block2) if_block2.d();
    			if (detaching) detach_dev(t19);
    			if (if_block3) if_block3.d(detaching);
    			if (detaching) detach_dev(if_block3_anchor);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(70:3) {#each DisplayList as ability, index}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let div10;
    	let div0;
    	let h2;
    	let t1;
    	let div1;
    	let h3;
    	let t2;
    	let t3;
    	let t4;
    	let div9;
    	let div8;
    	let div7;
    	let div2;
    	let t6;
    	let div3;
    	let t8;
    	let div4;
    	let t10;
    	let div5;
    	let t12;
    	let div6;
    	let t14;
    	let div10_intro;
    	let each_value = /*DisplayList*/ ctx[0];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div10 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Abilities";
    			t1 = space();
    			div1 = element("div");
    			h3 = element("h3");
    			t2 = text("XP Remaining: ");
    			t3 = text(/*remaining*/ ctx[1]);
    			t4 = space();
    			div9 = element("div");
    			div8 = element("div");
    			div7 = element("div");
    			div2 = element("div");
    			div2.textContent = "Name";
    			t6 = space();
    			div3 = element("div");
    			div3.textContent = "Description";
    			t8 = space();
    			div4 = element("div");
    			div4.textContent = "Max";
    			t10 = space();
    			div5 = element("div");
    			div5.textContent = "XP";
    			t12 = space();
    			div6 = element("div");
    			div6.textContent = "Taken";
    			t14 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(h2, file$7, 55, 2, 1713);
    			attr_dev(div0, "class", "step-title");
    			add_location(div0, file$7, 54, 1, 1686);
    			add_location(h3, file$7, 58, 2, 1767);
    			attr_dev(div1, "class", "remaining svelte-1gqpsr5");
    			add_location(div1, file$7, 57, 1, 1741);
    			attr_dev(div2, "class", "col m-col name-header svelte-1gqpsr5");
    			add_location(div2, file$7, 63, 4, 1899);
    			attr_dev(div3, "class", "col l-col description-header svelte-1gqpsr5");
    			add_location(div3, file$7, 64, 4, 1949);
    			attr_dev(div4, "class", "col s-col max-header svelte-1gqpsr5");
    			add_location(div4, file$7, 65, 4, 2013);
    			attr_dev(div5, "class", "col s-col xp-header svelte-1gqpsr5");
    			add_location(div5, file$7, 66, 4, 2061);
    			attr_dev(div6, "class", "col s-col taken-header svelte-1gqpsr5");
    			add_location(div6, file$7, 67, 4, 2107);
    			attr_dev(div7, "class", "header-row svelte-1gqpsr5");
    			add_location(div7, file$7, 62, 3, 1870);
    			attr_dev(div8, "class", "abilities-list svelte-1gqpsr5");
    			add_location(div8, file$7, 61, 2, 1838);
    			attr_dev(div9, "class", "stat-block");
    			add_location(div9, file$7, 60, 1, 1811);
    			attr_dev(div10, "class", "abilities-step svelte-1gqpsr5");
    			add_location(div10, file$7, 53, 0, 1648);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div10, anchor);
    			append_dev(div10, div0);
    			append_dev(div0, h2);
    			append_dev(div10, t1);
    			append_dev(div10, div1);
    			append_dev(div1, h3);
    			append_dev(h3, t2);
    			append_dev(h3, t3);
    			append_dev(div10, t4);
    			append_dev(div10, div9);
    			append_dev(div9, div8);
    			append_dev(div8, div7);
    			append_dev(div7, div2);
    			append_dev(div7, t6);
    			append_dev(div7, div3);
    			append_dev(div7, t8);
    			append_dev(div7, div4);
    			append_dev(div7, t10);
    			append_dev(div7, div5);
    			append_dev(div7, t12);
    			append_dev(div7, div6);
    			append_dev(div8, t14);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div8, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*remaining*/ 2) set_data_dev(t3, /*remaining*/ ctx[1]);

    			if (dirty & /*DisplayList, undefined, modifyAbilities*/ 5) {
    				each_value = /*DisplayList*/ ctx[0];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div8, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: function intro(local) {
    			if (!div10_intro) {
    				add_render_callback(() => {
    					div10_intro = create_in_transition(div10, fade, {});
    					div10_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div10);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let $character;
    	validate_store(character, "character");
    	component_subscribe($$self, character, $$value => $$invalidate(3, $character = $$value));
    	let DisplayList = [...AbilityList];

    	const modifyAbilities = () => {
    		set_store_value(character, $character.abilities = [], $character);

    		aloop: for (let a = 0; a < MasterAbilityList.length; ++a) {
    			MasterAbilityList[a].taken = 0;

    			for (let d = 0; d < DisplayList.length; ++d) {
    				$$invalidate(0, DisplayList[d].taken = parseInt(DisplayList[d].taken), DisplayList);

    				if (DisplayList[d].name == MasterAbilityList[a].name) {
    					if (DisplayList[d].options.length == 1) {
    						MasterAbilityList[a].taken = DisplayList[d].taken;
    						if (DisplayList[d].taken) $character.abilities.push(DisplayList[d]);
    						continue aloop;
    					} else {
    						if (MasterAbilityList[a].options[0].name == DisplayList[d].options[DisplayList[d].selection].name) {
    							MasterAbilityList[a].taken = DisplayList[d].taken;
    							if (DisplayList[d].taken) $character.abilities.push(MasterAbilityList[a]);
    							continue aloop;
    						}
    					}
    				}
    			}
    		}

    		console.log(MasterAbilityList);
    		console.log($character.abilities);
    	};

    	function select_change_handler(ability) {
    		ability.selection = select_value(this);
    		$$invalidate(0, DisplayList);
    	}

    	function input_input_handler(ability) {
    		ability.taken = to_number(this.value);
    		$$invalidate(0, DisplayList);
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("DisplayList" in $$props) $$invalidate(0, DisplayList = $$props.DisplayList);
    		if ("remaining" in $$props) $$invalidate(1, remaining = $$props.remaining);
    		if ("$character" in $$props) character.set($character = $$props.$character);
    	};

    	let remaining;

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$character*/ 8) {
    			 $$invalidate(1, remaining = $character.props.xp.score - $character.abilities.reduce((t, n) => n.taken * n.xp, 0));
    		}
    	};

    	return [
    		DisplayList,
    		remaining,
    		modifyAbilities,
    		$character,
    		select_change_handler,
    		input_input_handler
    	];
    }

    class CreAbilities extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CreAbilities",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src/components/creator/CreGear.svelte generated by Svelte v3.16.7 */
    const file$8 = "src/components/creator/CreGear.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (31:2) {#each ArmorList as armor}
    function create_each_block$4(ctx) {
    	let div;
    	let t_value = /*armor*/ ctx[2].name + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			add_location(div, file$8, 31, 3, 586);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(31:2) {#each ArmorList as armor}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let div2;
    	let button;
    	let t1;
    	let div0;
    	let t2;
    	let br;
    	let t3;
    	let div1;
    	let t4;
    	let t5_value = /*armorResult*/ ctx[0].name + "";
    	let t5;
    	let div2_intro;
    	let dispose;
    	let each_value = ArmorList;
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			button = element("button");
    			button.textContent = "ROLL IT";
    			t1 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			br = element("br");
    			t3 = space();
    			div1 = element("div");
    			t4 = text("My Armor: ");
    			t5 = text(t5_value);
    			add_location(button, file$8, 28, 1, 501);
    			add_location(div0, file$8, 29, 1, 548);
    			add_location(br, file$8, 34, 1, 629);
    			add_location(div1, file$8, 35, 1, 635);
    			attr_dev(div2, "class", "gear-step");
    			add_location(div2, file$8, 27, 0, 468);
    			dispose = listen_dev(button, "click", /*rollArmor*/ ctx[1], false, false, false);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, button);
    			append_dev(div2, t1);
    			append_dev(div2, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			append_dev(div2, t2);
    			append_dev(div2, br);
    			append_dev(div2, t3);
    			append_dev(div2, div1);
    			append_dev(div1, t4);
    			append_dev(div1, t5);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*ArmorList*/ 0) {
    				each_value = ArmorList;
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*armorResult*/ 1 && t5_value !== (t5_value = /*armorResult*/ ctx[0].name + "")) set_data_dev(t5, t5_value);
    		},
    		i: function intro(local) {
    			if (!div2_intro) {
    				add_render_callback(() => {
    					div2_intro = create_in_transition(div2, fade, {});
    					div2_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let armorResult = "";

    	const rollArmor = () => {
    		$$invalidate(0, armorResult = random(ArmorList));
    	};

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("armorResult" in $$props) $$invalidate(0, armorResult = $$props.armorResult);
    	};

    	return [armorResult, rollArmor];
    }

    class CreGear extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CreGear",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src/pages/Creator.svelte generated by Svelte v3.16.7 */
    const file$9 = "src/pages/Creator.svelte";

    function create_fragment$b(ctx) {
    	let div;
    	let div_intro;
    	let t;
    	let current;
    	var switch_value = /*selected*/ ctx[0];

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props());
    	}

    	const navbuttons = new NavButtons({
    			props: { options: /*options*/ ctx[1] },
    			$$inline: true
    		});

    	navbuttons.$on("nav", /*handleNavigation*/ ctx[2]);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			t = space();
    			create_component(navbuttons.$$.fragment);
    			attr_dev(div, "class", "page-container");
    			add_location(div, file$9, 25, 0, 740);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (switch_instance) {
    				mount_component(switch_instance, div, null);
    			}

    			insert_dev(target, t, anchor);
    			mount_component(navbuttons, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (switch_value !== (switch_value = /*selected*/ ctx[0])) {
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
    					mount_component(switch_instance, div, null);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);

    			if (!div_intro) {
    				add_render_callback(() => {
    					div_intro = create_in_transition(div, fade, {});
    					div_intro.start();
    				});
    			}

    			transition_in(navbuttons.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			transition_out(navbuttons.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (switch_instance) destroy_component(switch_instance);
    			if (detaching) detach_dev(t);
    			destroy_component(navbuttons, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let options = [CreAbilities, CreDescription, CreTraits, CreSkills, CreProperties, CreAbilities, CreGear];
    	let selected = options[0];
    	const handleNavigation = event => $$invalidate(0, selected = event.detail.selection);

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("options" in $$props) $$invalidate(1, options = $$props.options);
    		if ("selected" in $$props) $$invalidate(0, selected = $$props.selected);
    	};

    	return [selected, options, handleNavigation];
    }

    class Creator extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Creator",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src/components/reference/RefMenu.svelte generated by Svelte v3.16.7 */

    const file$a = "src/components/reference/RefMenu.svelte";

    function get_each_context$5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (18:0) {#each chapters as chapter}
    function create_each_block$5(ctx) {
    	let button;
    	let t0_value = /*chapter*/ ctx[4] + "";
    	let t0;
    	let t1;
    	let dispose;

    	function click_handler(...args) {
    		return /*click_handler*/ ctx[3](/*chapter*/ ctx[4], ...args);
    	}

    	const block = {
    		c: function create() {
    			button = element("button");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(button, "class", "display-button");
    			add_location(button, file$a, 18, 4, 294);
    			dispose = listen_dev(button, "click", prevent_default(click_handler), false, true, false);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, t0);
    			append_dev(button, t1);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$5.name,
    		type: "each",
    		source: "(18:0) {#each chapters as chapter}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let each_1_anchor;
    	let each_value = /*chapters*/ ctx[0];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*change, chapters*/ 3) {
    				each_value = /*chapters*/ ctx[0];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$5(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$5(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
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
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	const chapters = [
    		`Dice`,
    		`Traits`,
    		`Skills`,
    		`Combat`,
    		`Maneuvers`,
    		`Situations`,
    		`Abilities`,
    		`Gear`
    	];

    	let { chap = `` } = $$props;
    	const change = ch => $$invalidate(2, chap = ch);
    	const writable_props = ["chap"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<RefMenu> was created with unknown prop '${key}'`);
    	});

    	const click_handler = chapter => change(chapter);

    	$$self.$set = $$props => {
    		if ("chap" in $$props) $$invalidate(2, chap = $$props.chap);
    	};

    	$$self.$capture_state = () => {
    		return { chap };
    	};

    	$$self.$inject_state = $$props => {
    		if ("chap" in $$props) $$invalidate(2, chap = $$props.chap);
    	};

    	return [chapters, change, chap, click_handler];
    }

    class RefMenu extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, { chap: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RefMenu",
    			options,
    			id: create_fragment$c.name
    		});
    	}

    	get chap() {
    		throw new Error("<RefMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set chap(value) {
    		throw new Error("<RefMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/rules/tables/DifficultyTable.svelte generated by Svelte v3.16.7 */

    const file$b = "src/components/rules/tables/DifficultyTable.svelte";

    function create_fragment$d(ctx) {
    	let table;
    	let tr;
    	let td0;
    	let t1;
    	let td1;
    	let t3;
    	let td2;
    	let t5;
    	let td3;
    	let t7;
    	let td4;
    	let t9;
    	let td5;
    	let t11;
    	let td6;
    	let t13;
    	let td7;

    	const block = {
    		c: function create() {
    			table = element("table");
    			tr = element("tr");
    			td0 = element("td");
    			td0.textContent = "3#";
    			t1 = space();
    			td1 = element("td");
    			td1.textContent = "Simple";
    			t3 = space();
    			td2 = element("td");
    			td2.textContent = "6#";
    			t5 = space();
    			td3 = element("td");
    			td3.textContent = "Typical";
    			t7 = space();
    			td4 = element("td");
    			td4.textContent = "9#";
    			t9 = space();
    			td5 = element("td");
    			td5.textContent = "Hard";
    			t11 = space();
    			td6 = element("td");
    			td6.textContent = "12#";
    			t13 = space();
    			td7 = element("td");
    			td7.textContent = "Extreme";
    			add_location(td0, file$b, 2, 2, 41);
    			add_location(td1, file$b, 3, 2, 55);
    			add_location(td2, file$b, 4, 2, 73);
    			add_location(td3, file$b, 5, 2, 87);
    			add_location(td4, file$b, 6, 2, 106);
    			add_location(td5, file$b, 7, 2, 120);
    			add_location(td6, file$b, 8, 2, 136);
    			add_location(td7, file$b, 9, 2, 151);
    			add_location(tr, file$b, 1, 1, 34);
    			attr_dev(table, "class", "difficulty-table");
    			add_location(table, file$b, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, table, anchor);
    			append_dev(table, tr);
    			append_dev(tr, td0);
    			append_dev(tr, t1);
    			append_dev(tr, td1);
    			append_dev(tr, t3);
    			append_dev(tr, td2);
    			append_dev(tr, t5);
    			append_dev(tr, td3);
    			append_dev(tr, t7);
    			append_dev(tr, td4);
    			append_dev(tr, t9);
    			append_dev(tr, td5);
    			append_dev(tr, t11);
    			append_dev(tr, td6);
    			append_dev(tr, t13);
    			append_dev(tr, td7);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(table);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class DifficultyTable extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DifficultyTable",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    const Difficulty = new Rule(
    	'Difficulty',
    	['The Result of your roll must be greater than or equal to the Difficulty number to be successful. Difficulties are indicated by the # symbol. The GN or an opposing roll set the # for your rolls.'],
    	[],
    	DifficultyTable
    );

    const RoteActions = new Rule(
    	'Rote Actions',
    	['If your [(Score + Modifiers) >= #] before the roll and you can take your time, you Succeed automatically.']
    );

    const Cooperation = new Rule(
    	'Cooperation',
    	['If Characters want to help each other perform a task, one of them makes the roll and the rest add their Scores together as a Modifier to the main Character’s Result. The GN should use their judgement to determine the time to completion.']
    );

    const Success = new Rule(
    	'Success',
    	['If [Result >= #], the attempted action worked. Re-roll ties on opposed rolls. The degree of Success is important for some rolls.'],
    	[RoteActions, Cooperation]
    );

    const Fail = new Rule(
    	'Fail',
    	['If [Result < #], the attempted action did not work.']
    );

    const Explode = new Rule(
    	'Explode',
    	[`If a 6 is rolled, re-roll it again and again as long as 6's continue. Add all of these d6 rolls together, then calculate your Result.`]
    );

    const Botch = new Rule(
    	'Botch',
    	[
    		'If you roll 1 on a die, re-roll to check for a Botch. If a 1 is rolled again, you Botch, meaning you fail very badly. For any other number, your d6 roll is just a 1. Bonus rolls from Exploding dice do not Botch.',
    		'The GN has a great deal of latitude to be creative when determining the effects of Botching under various circumstances, but they should always be fair.',
    		'Whenever a Character Botches, they get +1 Experience Point because we learn the most from our greatest failures.'
    	]
    );

    const Dice = [
    	Difficulty,
    	Success,
    	Fail,
    	Explode,
    	Botch
    ];

    /* src/components/reference/RefList.svelte generated by Svelte v3.16.7 */
    const file$c = "src/components/reference/RefList.svelte";

    function get_each_context_1$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    function get_each_context$6(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (13:3) {#if rule.visible}
    function create_if_block$3(ctx) {
    	let div;
    	let t0;
    	let t1;
    	let div_transition;
    	let current;
    	let each_value_2 = /*rule*/ ctx[2].description;
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	let if_block0 = /*rule*/ ctx[2].table && create_if_block_2$1(ctx);
    	let if_block1 = /*rule*/ ctx[2].subrules && create_if_block_1$3(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			if (if_block0) if_block0.c();
    			t1 = space();
    			if (if_block1) if_block1.c();
    			attr_dev(div, "class", "description svelte-1nfzoux");
    			add_location(div, file$c, 13, 4, 337);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			append_dev(div, t0);
    			if (if_block0) if_block0.m(div, null);
    			append_dev(div, t1);
    			if (if_block1) if_block1.m(div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*list*/ 1) {
    				each_value_2 = /*rule*/ ctx[2].description;
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, t0);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_2.length;
    			}

    			if (/*rule*/ ctx[2].table) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    					transition_in(if_block0, 1);
    				} else {
    					if_block0 = create_if_block_2$1(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div, t1);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*rule*/ ctx[2].subrules) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_1$3(ctx);
    					if_block1.c();
    					if_block1.m(div, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);

    			add_render_callback(() => {
    				if (!div_transition) div_transition = create_bidirectional_transition(div, slide, {}, true);
    				div_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			if (!div_transition) div_transition = create_bidirectional_transition(div, slide, {}, false);
    			div_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (detaching && div_transition) div_transition.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(13:3) {#if rule.visible}",
    		ctx
    	});

    	return block;
    }

    // (15:5) {#each rule.description as desc}
    function create_each_block_2(ctx) {
    	let p;
    	let raw_value = /*desc*/ ctx[8] + "";

    	const block = {
    		c: function create() {
    			p = element("p");
    			add_location(p, file$c, 15, 6, 424);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			p.innerHTML = raw_value;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*list*/ 1 && raw_value !== (raw_value = /*desc*/ ctx[8] + "")) p.innerHTML = raw_value;		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(15:5) {#each rule.description as desc}",
    		ctx
    	});

    	return block;
    }

    // (18:5) {#if rule.table}
    function create_if_block_2$1(ctx) {
    	let div0;
    	let t;
    	let div1;
    	let current;
    	var switch_value = /*rule*/ ctx[2].table;

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t = space();
    			div1 = element("div");
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			attr_dev(div0, "class", "separator svelte-1nfzoux");
    			add_location(div0, file$c, 18, 6, 485);
    			attr_dev(div1, "class", "table");
    			add_location(div1, file$c, 19, 6, 516);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t, anchor);
    			insert_dev(target, div1, anchor);

    			if (switch_instance) {
    				mount_component(switch_instance, div1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (switch_value !== (switch_value = /*rule*/ ctx[2].table)) {
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
    					mount_component(switch_instance, div1, null);
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
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(div1);
    			if (switch_instance) destroy_component(switch_instance);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(18:5) {#if rule.table}",
    		ctx
    	});

    	return block;
    }

    // (24:5) {#if rule.subrules}
    function create_if_block_1$3(ctx) {
    	let ul;
    	let each_value_1 = /*rule*/ ctx[2].subrules;
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$3(get_each_context_1$3(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(ul, "class", "sub-ul svelte-1nfzoux");
    			add_location(ul, file$c, 24, 6, 636);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*list*/ 1) {
    				each_value_1 = /*rule*/ ctx[2].subrules;
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$3(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(24:5) {#if rule.subrules}",
    		ctx
    	});

    	return block;
    }

    // (26:7) {#each rule.subrules as subrule}
    function create_each_block_1$3(ctx) {
    	let div0;
    	let t0;
    	let li;
    	let div2;
    	let span;
    	let t1_value = /*subrule*/ ctx[5].name + "";
    	let t1;
    	let t2;
    	let div1;
    	let raw_value = /*subrule*/ ctx[5].description + "";
    	let t3;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = space();
    			li = element("li");
    			div2 = element("div");
    			span = element("span");
    			t1 = text(t1_value);
    			t2 = space();
    			div1 = element("div");
    			t3 = space();
    			attr_dev(div0, "class", "separator svelte-1nfzoux");
    			add_location(div0, file$c, 26, 8, 704);
    			attr_dev(span, "class", "sub-name svelte-1nfzoux");
    			add_location(span, file$c, 29, 10, 798);
    			attr_dev(div1, "class", "sub-notes");
    			add_location(div1, file$c, 32, 10, 876);
    			attr_dev(div2, "class", "sub-box");
    			add_location(div2, file$c, 28, 9, 766);
    			attr_dev(li, "class", "sub-li");
    			add_location(li, file$c, 27, 8, 737);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, li, anchor);
    			append_dev(li, div2);
    			append_dev(div2, span);
    			append_dev(span, t1);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			div1.innerHTML = raw_value;
    			append_dev(li, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*list*/ 1 && t1_value !== (t1_value = /*subrule*/ ctx[5].name + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*list*/ 1 && raw_value !== (raw_value = /*subrule*/ ctx[5].description + "")) div1.innerHTML = raw_value;		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$3.name,
    		type: "each",
    		source: "(26:7) {#each rule.subrules as subrule}",
    		ctx
    	});

    	return block;
    }

    // (10:1) {#each list as rule}
    function create_each_block$6(ctx) {
    	let div0;
    	let span;
    	let t0_value = /*rule*/ ctx[2].name + "";
    	let t0;
    	let t1;
    	let t2;
    	let div1;
    	let current;
    	let dispose;
    	let if_block = /*rule*/ ctx[2].visible && create_if_block$3(ctx);

    	function click_handler(...args) {
    		return /*click_handler*/ ctx[1](/*rule*/ ctx[2], ...args);
    	}

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			if (if_block) if_block.c();
    			t2 = space();
    			div1 = element("div");
    			attr_dev(span, "class", "name svelte-1nfzoux");
    			add_location(span, file$c, 11, 3, 273);
    			attr_dev(div0, "class", "box svelte-1nfzoux");
    			add_location(div0, file$c, 10, 2, 207);
    			attr_dev(div1, "class", "separator svelte-1nfzoux");
    			add_location(div1, file$c, 43, 2, 1056);
    			dispose = listen_dev(div0, "click", click_handler, false, false, false);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, span);
    			append_dev(span, t0);
    			append_dev(div0, t1);
    			if (if_block) if_block.m(div0, null);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div1, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if ((!current || dirty & /*list*/ 1) && t0_value !== (t0_value = /*rule*/ ctx[2].name + "")) set_data_dev(t0, t0_value);

    			if (/*rule*/ ctx[2].visible) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    					transition_in(if_block, 1);
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div0, null);
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
    			if (detaching) detach_dev(div0);
    			if (if_block) if_block.d();
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div1);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$6.name,
    		type: "each",
    		source: "(10:1) {#each list as rule}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let div1;
    	let div0;
    	let t;
    	let current;
    	let each_value = /*list*/ ctx[0];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "separator svelte-1nfzoux");
    			add_location(div0, file$c, 8, 1, 158);
    			attr_dev(div1, "class", "ref-list");
    			add_location(div1, file$c, 7, 0, 134);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*list, HideShow*/ 1) {
    				each_value = /*list*/ ctx[0];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$6(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$6(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div1, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { list } = $$props;
    	const writable_props = ["list"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<RefList> was created with unknown prop '${key}'`);
    	});

    	const click_handler = rule => $$invalidate(0, list = HideShow(rule, list));

    	$$self.$set = $$props => {
    		if ("list" in $$props) $$invalidate(0, list = $$props.list);
    	};

    	$$self.$capture_state = () => {
    		return { list };
    	};

    	$$self.$inject_state = $$props => {
    		if ("list" in $$props) $$invalidate(0, list = $$props.list);
    	};

    	return [list, click_handler];
    }

    class RefList extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$e, safe_not_equal, { list: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RefList",
    			options,
    			id: create_fragment$e.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || ({});

    		if (/*list*/ ctx[0] === undefined && !("list" in props)) {
    			console.warn("<RefList> was created without expected prop 'list'");
    		}
    	}

    	get list() {
    		throw new Error("<RefList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set list(value) {
    		throw new Error("<RefList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/reference/RefDice.svelte generated by Svelte v3.16.7 */
    const file$d = "src/components/reference/RefDice.svelte";

    function create_fragment$f(ctx) {
    	let div1;
    	let div0;
    	let t1;
    	let div1_intro;
    	let current;
    	var switch_value = RefList;

    	function switch_props(ctx) {
    		return { props: { list: Dice }, $$inline: true };
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "Dice Rules";
    			t1 = space();
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			attr_dev(div0, "class", "ref-header");
    			add_location(div0, file$d, 7, 1, 172);
    			attr_dev(div1, "class", "ref-page");
    			add_location(div1, file$d, 6, 0, 140);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t1);

    			if (switch_instance) {
    				mount_component(switch_instance, div1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (switch_value !== (switch_value = RefList)) {
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
    					mount_component(switch_instance, div1, null);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);

    			if (!div1_intro) {
    				add_render_callback(() => {
    					div1_intro = create_in_transition(div1, fade, {});
    					div1_intro.start();
    				});
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (switch_instance) destroy_component(switch_instance);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class RefDice extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$f, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RefDice",
    			options,
    			id: create_fragment$f.name
    		});
    	}
    }

    /* src/components/reference/RefTraits.svelte generated by Svelte v3.16.7 */

    function create_fragment$g(ctx) {
    	const block = {
    		c: noop,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class RefTraits extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$g, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RefTraits",
    			options,
    			id: create_fragment$g.name
    		});
    	}
    }

    /* src/components/reference/RefSkills.svelte generated by Svelte v3.16.7 */

    function create_fragment$h(ctx) {
    	const block = {
    		c: noop,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class RefSkills extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$h, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RefSkills",
    			options,
    			id: create_fragment$h.name
    		});
    	}
    }

    /* src/components/rules/tables/CoverTable.svelte generated by Svelte v3.16.7 */

    const file$e = "src/components/rules/tables/CoverTable.svelte";

    function create_fragment$i(ctx) {
    	let table;
    	let tr0;
    	let th0;
    	let th1;
    	let t2;
    	let tr1;
    	let td0;
    	let td1;
    	let t5;
    	let tr2;
    	let td2;
    	let td3;
    	let t8;
    	let tr3;
    	let td4;
    	let td5;
    	let t11;
    	let tr4;
    	let td6;
    	let td7;
    	let t14;
    	let tr5;
    	let td8;
    	let td9;
    	let t17;
    	let tr6;
    	let td10;
    	let td11;
    	let t20;
    	let tr7;
    	let td12;
    	let td13;
    	let t23;
    	let tr8;
    	let td14;
    	let td15;

    	const block = {
    		c: function create() {
    			table = element("table");
    			tr0 = element("tr");
    			th0 = element("th");
    			th0.textContent = "Material";
    			th1 = element("th");
    			th1.textContent = "DR";
    			t2 = space();
    			tr1 = element("tr");
    			td0 = element("td");
    			td0.textContent = "Drywall";
    			td1 = element("td");
    			td1.textContent = "0";
    			t5 = space();
    			tr2 = element("tr");
    			td2 = element("td");
    			td2.textContent = "Glass";
    			td3 = element("td");
    			td3.textContent = "1";
    			t8 = space();
    			tr3 = element("tr");
    			td4 = element("td");
    			td4.textContent = "Plywood";
    			td5 = element("td");
    			td5.textContent = "1";
    			t11 = space();
    			tr4 = element("tr");
    			td6 = element("td");
    			td6.textContent = "Hardwood";
    			td7 = element("td");
    			td7.textContent = "2";
    			t14 = space();
    			tr5 = element("tr");
    			td8 = element("td");
    			td8.textContent = "Sheet Metal";
    			td9 = element("td");
    			td9.textContent = "2";
    			t17 = space();
    			tr6 = element("tr");
    			td10 = element("td");
    			td10.textContent = "Brick";
    			td11 = element("td");
    			td11.textContent = "3";
    			t20 = space();
    			tr7 = element("tr");
    			td12 = element("td");
    			td12.textContent = "Concrete";
    			td13 = element("td");
    			td13.textContent = "4";
    			t23 = space();
    			tr8 = element("tr");
    			td14 = element("td");
    			td14.textContent = "Steel";
    			td15 = element("td");
    			td15.textContent = "5";
    			add_location(th0, file$e, 1, 5, 34);
    			add_location(th1, file$e, 1, 22, 51);
    			add_location(tr0, file$e, 1, 1, 30);
    			add_location(td0, file$e, 2, 5, 73);
    			add_location(td1, file$e, 2, 21, 89);
    			add_location(tr1, file$e, 2, 1, 69);
    			add_location(td2, file$e, 3, 5, 110);
    			add_location(td3, file$e, 3, 19, 124);
    			add_location(tr2, file$e, 3, 1, 106);
    			add_location(td4, file$e, 4, 5, 145);
    			add_location(td5, file$e, 4, 21, 161);
    			add_location(tr3, file$e, 4, 1, 141);
    			add_location(td6, file$e, 5, 5, 182);
    			add_location(td7, file$e, 5, 22, 199);
    			add_location(tr4, file$e, 5, 1, 178);
    			add_location(td8, file$e, 6, 5, 220);
    			add_location(td9, file$e, 6, 25, 240);
    			add_location(tr5, file$e, 6, 1, 216);
    			add_location(td10, file$e, 7, 5, 261);
    			add_location(td11, file$e, 7, 19, 275);
    			add_location(tr6, file$e, 7, 1, 257);
    			add_location(td12, file$e, 8, 5, 296);
    			add_location(td13, file$e, 8, 22, 313);
    			add_location(tr7, file$e, 8, 1, 292);
    			add_location(td14, file$e, 9, 5, 334);
    			add_location(td15, file$e, 9, 19, 348);
    			add_location(tr8, file$e, 9, 1, 330);
    			attr_dev(table, "class", ".cover-table");
    			add_location(table, file$e, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, table, anchor);
    			append_dev(table, tr0);
    			append_dev(tr0, th0);
    			append_dev(tr0, th1);
    			append_dev(table, t2);
    			append_dev(table, tr1);
    			append_dev(tr1, td0);
    			append_dev(tr1, td1);
    			append_dev(table, t5);
    			append_dev(table, tr2);
    			append_dev(tr2, td2);
    			append_dev(tr2, td3);
    			append_dev(table, t8);
    			append_dev(table, tr3);
    			append_dev(tr3, td4);
    			append_dev(tr3, td5);
    			append_dev(table, t11);
    			append_dev(table, tr4);
    			append_dev(tr4, td6);
    			append_dev(tr4, td7);
    			append_dev(table, t14);
    			append_dev(table, tr5);
    			append_dev(tr5, td8);
    			append_dev(tr5, td9);
    			append_dev(table, t17);
    			append_dev(table, tr6);
    			append_dev(tr6, td10);
    			append_dev(tr6, td11);
    			append_dev(table, t20);
    			append_dev(table, tr7);
    			append_dev(tr7, td12);
    			append_dev(tr7, td13);
    			append_dev(table, t23);
    			append_dev(table, tr8);
    			append_dev(tr8, td14);
    			append_dev(tr8, td15);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(table);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class CoverTable extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$i, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CoverTable",
    			options,
    			id: create_fragment$i.name
    		});
    	}
    }

    const Bleeding = new Rule(
    	`Bleeding`, 
    	[`When you take Wounds = [Health / 2] or more, you begin taking an additional 1 Wound per minute. Roll Medicine(First-Aid) vs Wounds to stop Bleeding.`]
    );

    const Burning = new Rule(
    	`Burning`, 
    	[`1 FDMG per rnd. It takes a d6rnds to stop, drop Prone, and roll Survival 6# to put out the flames.`]
    );

    const Chase = new Rule(
    	`Chase`, 
    	[`Roll opposed [(Acrobatics, Athletics, Drive, or Tame) + Speed] each rnd. Chase ends when one side gets 3 Successes over the other.`]
    );

    const Concealed = new Rule(
    	`Concealed`, 
    	[`If an opponent knows your position but cannot see you, their ATK is at a -6 penalty. Blasts are unaffected. Targets are Defenseless against ATKs from Concealed opponents.`]
    );

    const Cover = new Rule(
    	`Cover`, 
    	[`You can lean in and out of Cover to ATK as part of an Action. All Cover except Glass makes you Concealed. If an opponent Waits until you lean out of Cover, they must make a Called Shot to hit an exposed Location. All DMG is negated against targets that are behind Cover if the Material DR is >= the weapon’s base DMG. If weapon DMG exceeds the Material DR, the Material DR acts as an Armor bonus for DMG reduction.`],
    	[],
    	CoverTable
    );

    const Defenseless = new Rule(
    	`Defenseless`, 
    	[`Use Reflex [Perception / 2] for DEF.`]
    );

    const Falling = new Rule(
    	`Falling`, 
    	[`1 Wound per 2yds. Roll [Acrobatics # = yds] as a Defense Action to halve Falling DMG.`]
    );

    const FriendlyFire = new Rule(
    	`Friendly Fire`, 
    	[`-3 RATK against targets within 1yd of your ally. If the RATK Fails, re-roll the RATK vs the ally’s Reflex.`]
    );

    const OffHand = new Rule(
    	`Off-Hand`, 
    	[`-3 penalty to ATK with your Off-Hand.`]
    );

    const Prone = new Rule(
    	`Prone`, 
    	[`You may drop Prone as part of your Movement. Standing up costs 1AP. +1 RATK. +3 Stealth. Speed 1yd.`]
    );

    const Range = new Rule(
    	`Range`, 
    	[`RATKs take a -1 penalty per additional RNG increment. MATKs take a modifier against Melee weapons that have a different RNG = [your weapon’s RNG - enemy weapon’s RNG].`]
    );

    const Stun = new Rule(
    	`Stun`, 
    	[`Defenseless and cannot take Actions. Prone if [Stunned > 1rnd].`]
    );

    const Suffocation = new Rule(
    	`Suffocation`, 
    	[`People need constant air supply. 1 Pain per minute without air. This penalty is reduced by 1 per minute with air. Going without air for a number of minutes = [C] is lethal.`]
    );

    const Unarmed = new Rule(
    	`Unarmed`, 
    	[`If the target is conscious, the target rolls C vs DMG to avoid being knocked Unconscious. If the target is Unconscious, the target takes DMG = Melee score. DR is not depleted.`]
    );

    const Unconscious = new Rule(
    	`Unconscious`, 
    	[`Unaware and unable to take Actions. 0 DEF. Prone.`]
    );

    const Unstable = new Rule(
    	`Unstable`, 
    	[`-3 penalty to physical rolls. -3 to RATKs at or from you.`]
    );

    const Visibility = new Rule(
    	`Visibility`, 
    	[`-1 to -6 (Blind) to sight-based rolls, including ATK and DEF.`]
    );


    const Needs = new Rule(
    	`Needs`, 
    	[`1 Pain for each lacking Need over a given period of time:`]
    	[Suffocation]
    );


    const Situations = [
    	Bleeding,
    	Burning,
    	Chase,
    	Concealed,
    	Cover,
    	Defenseless,
    	Falling,
    	FriendlyFire,
    	Needs,
    	OffHand,
    	Prone,
    	Range,
    	Stun,
    	Unarmed,
    	Unconscious,
    	Unstable,
    	Visibility
    ];

    // Single Rules

    const Attack = new Rule(
    	`Attack`, 
    	[`There are MATKs (Melee) and RATKs (Ranged). Roll [d6 + MATK or RATK] vs Defense (DEF). Rolling a 6 on the die is an Explosion, which is re-rolled and added cumulatively to the ATK total. Deal bonus DMG = [ATK - DEF] up to your Melee or Ranged score.`]
    );

    const Burning$1 = new Rule(
    	`Burning`, 
    	[`If the Vehicle is at 0DR, it bursts into flames doing 1FDMG per rnd to all Occupants. It continues to burn for 1 minute per gallon of Fuel.`]
    );

    const Communication = new Rule(
    	`Communication`, 
    	[`You can speak or shout up to 6 words per round.`]
    );

    const Conditions = new Rule(
    	`Conditions`, 
    	[`-1 DR and -1 Handling. Roll [Drive 9#] to maintain control upon getting a Condition, otherwise the vehicle Wrecks.`]
    );

    const DamageReduction = new Rule(
    	`Damage Reduction`, 
    	[`DR reduces DMG. Armor is reduced by -1 DR after taking DMG that exceeds its DR.`]
    );

    const FireDamage = new Rule(
    	`Fire Damage`, 
    	[`Whenever you take FDMG, 1 Wound is permanent. Only Fire-Resistant (FR) Armor reduces FDMG.`]
    );

    const Initiative = new Rule(
    	`Initiative`, 
    	[`Everyone in combat rolls [d6 + A] to determine the turn order at the start of each new rnd.`]
    );

    const Movement = new Rule(
    	`Movement`, 
    	[`Spend 1 Action to move up to your Speed [A + C], or 2 Actions to Run up to [Speed x 2]. Spend 1 Action to go Prone or stand.`]
    );

    const Occupants = new Rule(
    	`Occupants`, 
    	[`Passengers in a moving vehicle are Unstable. A vehicle provides Cover from RATKs with its DR.`]
    );

    const Pain = new Rule(
    	`Pain`, 
    	[`Wounds (and a few other effects) cause Pain which is a -1 penalty to all rolls and Speed. Pain fades as Wounds heal. You fall Prone if your Speed drops to 0 from Pain. You go unconscious if [Pain > D].`]
    );

    const Pedestrians = new Rule(
    	`Pedestrians`, 
    	[`Hitting a pedestrian does DMG = [vehicle DR]. -1 DR after hitting pedestrians = [vehicle DR].`]
    );

    const Prepare = new Rule(
    	`Prepare`, 
    	[`You may spend 1 Action on your turn to declare and hold a specific Action to occur on a later turn to preempt a triggering event that you describe. Prepared Actions resolve before other Actions in the order that they are triggered. You may choose to abandon a Prepared Action at any time. If you are still waiting with a Prepared Action on your next turn, you can continue holding that Prepared Action.`]
    );

    const Recovery = new Rule(
    	`Recovery`, 
    	[`After a day of rest, roll [C vs total Wounds] to heal 1HP. On a Fail, take 1 Wound from infection.`]
    );

    const Reflex = new Rule(
    	`Reflex`, 
    	[`[Perception / 2]. This is your default DEF. Reflex is never rolled. It is a static Difficulty for enemy ATKs.`]
    );

    const Rounds = new Rule(
    	`Rounds`, 
    	[`Combat time occurs in 3-second “rounds” (rnds). Each Player gets a turn each rnd.`]
    );

    const Tires = new Rule(
    	`Tires`, 
    	[`Roll [-3 ATK vs Drive(Stunt)] to destroy a tire. If the tire is destroyed, the driver must roll [Drive 9#] or Wreck. If a front tire gets destroyed, the vehicle Wrecks automatically.`]
    );

    const Wreck = new Rule(
    	`Wreck`, 
    	[`The vehicle comes to a violent stop suddenly this rnd. Occupants take [d6 DMG per 20mph or 30yds of Speed] and are ejected from the vehicle, unless they are wearing seat belts, in which case the DMG is halved and they remain in their seats.`]
    );


    // Compound Rules

    const Actions = new Rule(
    	`Actions`, 
    	[`On your turn, you can take up to 2 Actions. Unless otherwise noted, all Skills take 1 Action.`], 
    	[Prepare]
    );

    const Damage = new Rule(
    	`Damage`, 
    	[`Damage causes Wounds, which could eventually kill you. Successful ATKs do DMG = [(ATK - DEF) + Weapon DMG]. All Wounds cause Pain penalties.`],
    	[DamageReduction, FireDamage, Pain]
    );

    const Defense = new Rule(
    	`Defense`, 
    	[`You get 2 Defense Actions per round that you may spend to roll on your enemy's turn to Block [d6 + Melee] or Dodge [d6 + Acrobatics]. A Botch means you fall Prone if Dodging, or drop your weapon if Blocking. If you are unaware or unable to avoid the Attack, you are Defenseless and must use Reflex for DEF.`], 
    	[Reflex]
    );

    const Health = new Rule(
    	`Health`, 
    	[`[C x 2]. This is a measure of how many Wounds you can withstand. Damage causes Wounds. You start Bleeding when you take Wounds = [Health / 2] and you die when you take Wounds = Health.`],
    	[Bleeding, Recovery]
    );

    const Vehicles = new Rule(
    	`Vehicles`, 
    	[`Roll [Drive(Ram) vs Drive(Stunt)] to hit an enemy vehicle. If [loser’s DR <= winner’s DR], or if a vehicle takes [DMG > DR], the vehicle gets a Condition. 0 DR disables a vehicle. A Botch is a Wreck.`],
    	[Conditions, Occupants, Pedestrians, Tires, Wreck, Burning$1]
    );


    // Rule List

    const Combat = [
    	Rounds,
    	Initiative,
    	Actions,
    	Communication,
    	Movement,
    	Attack,
    	Defense,
    	Health,
    	Damage,
    	Vehicles
    ];

    /* src/components/reference/RefCombat.svelte generated by Svelte v3.16.7 */
    const file$f = "src/components/reference/RefCombat.svelte";

    function create_fragment$j(ctx) {
    	let div1;
    	let div0;
    	let t1;
    	let div1_intro;
    	let current;
    	var switch_value = RefList;

    	function switch_props(ctx) {
    		return { props: { list: Combat }, $$inline: true };
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "Combat Rules";
    			t1 = space();
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			attr_dev(div0, "class", "ref-header");
    			add_location(div0, file$f, 7, 1, 176);
    			attr_dev(div1, "class", "ref-page");
    			add_location(div1, file$f, 6, 0, 144);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t1);

    			if (switch_instance) {
    				mount_component(switch_instance, div1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (switch_value !== (switch_value = RefList)) {
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
    					mount_component(switch_instance, div1, null);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);

    			if (!div1_intro) {
    				add_render_callback(() => {
    					div1_intro = create_in_transition(div1, fade, {});
    					div1_intro.start();
    				});
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (switch_instance) destroy_component(switch_instance);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class RefCombat extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$j, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RefCombat",
    			options,
    			id: create_fragment$j.name
    		});
    	}
    }

    /* src/components/rules/tables/CalledShotTable.svelte generated by Svelte v3.16.7 */

    const file$g = "src/components/rules/tables/CalledShotTable.svelte";

    function create_fragment$k(ctx) {
    	let table;
    	let tr0;
    	let th0;
    	let t1;
    	let th1;
    	let t3;
    	let th2;
    	let t5;
    	let th3;
    	let t7;
    	let tr1;
    	let td0;
    	let t9;
    	let td1;
    	let t11;
    	let td2;
    	let t13;
    	let td3;
    	let t15;
    	let tr2;
    	let td4;
    	let t17;
    	let td5;
    	let t19;
    	let td6;
    	let t21;
    	let td7;
    	let t23;
    	let tr3;
    	let td8;
    	let t25;
    	let td9;
    	let t27;
    	let td10;
    	let t29;
    	let td11;

    	const block = {
    		c: function create() {
    			table = element("table");
    			tr0 = element("tr");
    			th0 = element("th");
    			th0.textContent = "Location";
    			t1 = space();
    			th1 = element("th");
    			th1.textContent = "ATK";
    			t3 = space();
    			th2 = element("th");
    			th2.textContent = "DMG";
    			t5 = space();
    			th3 = element("th");
    			th3.textContent = "Notes";
    			t7 = space();
    			tr1 = element("tr");
    			td0 = element("td");
    			td0.textContent = "Head";
    			t9 = space();
    			td1 = element("td");
    			td1.textContent = "-3";
    			t11 = space();
    			td2 = element("td");
    			td2.textContent = "x2";
    			t13 = space();
    			td3 = element("td");
    			td3.textContent = "Stun for 1rnd";
    			t15 = space();
    			tr2 = element("tr");
    			td4 = element("td");
    			td4.textContent = "Arm";
    			t17 = space();
    			td5 = element("td");
    			td5.textContent = "-1";
    			t19 = space();
    			td6 = element("td");
    			td6.textContent = "/2";
    			t21 = space();
    			td7 = element("td");
    			td7.textContent = "Target drops held item";
    			t23 = space();
    			tr3 = element("tr");
    			td8 = element("td");
    			td8.textContent = "Leg";
    			t25 = space();
    			td9 = element("td");
    			td9.textContent = "-1";
    			t27 = space();
    			td10 = element("td");
    			td10.textContent = "/2";
    			t29 = space();
    			td11 = element("td");
    			td11.textContent = "Target falls Prone";
    			add_location(th0, file$g, 5, 2, 62);
    			add_location(th1, file$g, 6, 2, 82);
    			add_location(th2, file$g, 7, 2, 97);
    			add_location(th3, file$g, 8, 2, 112);
    			add_location(tr0, file$g, 4, 1, 55);
    			add_location(td0, file$g, 11, 2, 142);
    			add_location(td1, file$g, 12, 2, 158);
    			add_location(td2, file$g, 13, 2, 172);
    			add_location(td3, file$g, 14, 2, 186);
    			add_location(tr1, file$g, 10, 1, 135);
    			add_location(td4, file$g, 17, 2, 224);
    			add_location(td5, file$g, 18, 2, 239);
    			add_location(td6, file$g, 19, 2, 253);
    			add_location(td7, file$g, 20, 2, 267);
    			add_location(tr2, file$g, 16, 1, 217);
    			add_location(td8, file$g, 23, 2, 314);
    			add_location(td9, file$g, 24, 2, 329);
    			add_location(td10, file$g, 25, 2, 343);
    			add_location(td11, file$g, 26, 2, 357);
    			add_location(tr3, file$g, 22, 1, 307);
    			attr_dev(table, "class", "called-shot-table");
    			add_location(table, file$g, 3, 0, 20);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, table, anchor);
    			append_dev(table, tr0);
    			append_dev(tr0, th0);
    			append_dev(tr0, t1);
    			append_dev(tr0, th1);
    			append_dev(tr0, t3);
    			append_dev(tr0, th2);
    			append_dev(tr0, t5);
    			append_dev(tr0, th3);
    			append_dev(table, t7);
    			append_dev(table, tr1);
    			append_dev(tr1, td0);
    			append_dev(tr1, t9);
    			append_dev(tr1, td1);
    			append_dev(tr1, t11);
    			append_dev(tr1, td2);
    			append_dev(tr1, t13);
    			append_dev(tr1, td3);
    			append_dev(table, t15);
    			append_dev(table, tr2);
    			append_dev(tr2, td4);
    			append_dev(tr2, t17);
    			append_dev(tr2, td5);
    			append_dev(tr2, t19);
    			append_dev(tr2, td6);
    			append_dev(tr2, t21);
    			append_dev(tr2, td7);
    			append_dev(table, t23);
    			append_dev(table, tr3);
    			append_dev(tr3, td8);
    			append_dev(tr3, t25);
    			append_dev(tr3, td9);
    			append_dev(tr3, t27);
    			append_dev(tr3, td10);
    			append_dev(tr3, t29);
    			append_dev(tr3, td11);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(table);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class CalledShotTable extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$k, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CalledShotTable",
    			options,
    			id: create_fragment$k.name
    		});
    	}
    }

    const AggressivePosture = new Rule(
    	`Aggressive Posture`, 
    	[`Get 1 extra Action (for a total of 3) at the cost of leaving yourself Defenseless until your next turn.`]
    );

    const Aim = new Rule(
    	`Aim`, 
    	[`Spend an Action to get +3 to your next ATK against a specific target.`]
    );

    const Block = new Rule(
    	`Block`, 
    	[`Roll [Melee vs MATK or RATK when using a Shield] for DEF.`]
    );

    const CalledShot = new Rule(
    	`Called Shot`, 
    	[`ATKs target the Torso by default. A Called Shot is an ATK targeting the Head, Arms, or Legs with added effects based on Location.`],
    	[],
    	CalledShotTable
    );

    const DefensivePosture = new Rule(
    	`Defensive Posture`, 
    	[`Skip your turn to get 1 extra Defense Action (for a total of 3) until your next turn.`]
    );

    const Disarm = new Rule(
    	`Disarm`, 
    	[`Roll [MATK vs Melee (+ C if the weapon is used two-handed)]. The weapon flies d6 yds away. Attacker gets the weapon if Unarmed.`]
    );

    const Distract = new Rule(
    	`Distract`,
    	[`Roll [Perform vs Perception]. Stun target for 1rnd.`]
    );

    const Dodge = new Rule(
    	`Dodge`, 
    	[`Roll [Acrobatics vs MATK or RATK (Throw)] for DEF.`]
    );

    const Duck = new Rule(
    	`Duck`, 
    	[`Roll [Dodge vs ATK] to move up to your Speed to get behind Cover. If the ATK still hits, the Cover Material’s DR reduces the DMG. You will keep the benefits of Cover as long as it remains between you and the opponent.`]
    );

    const Encourage = new Rule(
    	`Encourage`,
    	[`Roll [Leadership vs groups’ total D scores]. The group gets a bonus = [your D] for one specific roll each. A Botch is -1 to all rolls.`]
    );

    const Hide = new Rule(
    	`Hide`, 
    	[`Roll [Stealth vs Perception] to be Concealed. 0 Speed. +3 if Prone.`]
    );

    const Hold = new Rule(
    	`Hold`,
    	[`Block ATKs using a Grabbed enemy as a Shield.`]
    );

    const Interrogate = new Rule(
    	`Interrogate`,
    	[`Roll [Leadership vs D] to get information out of a subject who does not want to help, but without resorting to violence. Each roll takes d6 mins of conversation. If the interrogator Succeeds, the subject gives up a fact (wittingly or unwittingly). If the subject Succeeds, they become hardened against further questioning, imposing a -1 penalty on subsequent attempts. After Fails = [D], the interrogator gives up or the subject cracks and tells everything they know.`]
    );

    const Negotiate = new Rule(
    	`Negotiate`,
    	[`If opposed parties are willing to talk out their differences, each side start with a list of demands. Roll [Socialize vs Socialize] once per demand. Attitude and situational modifiers should be applied by the GN. Success means you get your demand and the opposed negotiator concedes. Either side can choose to concede a demand without rolling. Some desires may be non-negotiable.`]
    );

    const Protect = new Rule(
    	`Protect`, 
    	[`Become the new target of all ATKs targeting someone within 1yd of you for 1rnd. You may still Block, but you cannot Dodge the ATK.`]
    );

    const Push = new Rule(
    	`Push`,
    	[`Roll [C vs C] to push an enemy in front of you as you move up to [C] yds. 0DMG.`]
    );

    const Recruit = new Rule(
    	`Recruit`,
    	[`Roll [Socialize vs D] to convince someone to join your side. If they are someone’s follower, roll [Leadership vs Leadership]. Attitude and situational modifiers should be applied by the GN.`]
    );

    const Reload = new Rule(
    	`Reload`,
    	[`Replace a magazine or a single piece of ammunition (depending on the weapon) in a Ranged weapon.`]
    );

    const Shove = new Rule(
    	`Shove`,
    	[`Roll [MATK vs C] to shove an enemy up to [C/2] yds away from you, knocking them Prone. 0DMG.`]
    );

    const Sneak = new Rule(
    	`Sneak`, 
    	[`Roll [Stealth vs Perception] to move Concealed at [Speed / 2].`]
    );

    const Tackle = new Rule(
    	`Tackle`,
    	[`Roll [C vs C] to go Prone with Grabbed enemy.`]
    );

    const Taunt = new Rule(
    	`Taunt`,
    	[`Roll [Leadership vs D]. Provoke the enemy into exclusively attacking you. The degree of Success is a penalty to the loser’s next roll. The enemy is Stunned for 1rnd if [penalty > enemy’s D].`]
    );

    const Throw = new Rule(
    	`Throw`,
    	[`Throw a Grabbed enemy up to [C] yds and they take Falling DMG. Prone.`]
    );

    const Torture = new Rule(
    	`Torture`,
    	[`Roll [Medicine vs prisoner’s C] once per hour to cause a captive d6 Pain to soften their resolve without killing them. Failure does d6 DMG to the captive. Roll [D vs D] at the end of each hour (Pain penalty applies). Failure causes -1 Psyche loss. At 0 Psyche, either the torturer cannot do it anymore and gives up, or the captive is broken and can be controlled with Demeanor Skills automatically until freed.`]
    );

    const Trip = new Rule(
    	`Trip`,
    	[`Roll [MATK vs A] to knock an enemy Prone. 1DMG.`]
    );


    const Grab = new Rule(
    	`Grab`,
    	[`0DMG MATK to render an enemy Defenseless and unable to take actions except attempting escape [(Acrobatics or Melee) vs Grab]. You must have a free hand to Grab. Spend 1 Action per rnd to retain a Grab.`],
    	[Hold, Tackle, Throw]
    );


    const DefensiveManeuvers = [
    	Block,
    	DefensivePosture,
    	Dodge,
    	Duck,
    	Hide,
    	Protect,
    	Sneak
    ];

    const OffensiveManeuvers = [
    	AggressivePosture,
    	Aim,
    	CalledShot,
    	Disarm,
    	Grab,
    	Push,
    	Reload,
    	Shove,
    	Trip
    ];

    const SocialManeuvers = [
    	Distract,
    	Encourage,
    	Interrogate,
    	Negotiate,
    	Recruit,
    	Taunt,
    	Torture
    ];

    const Maneuvers = [...DefensiveManeuvers, ...OffensiveManeuvers, ...SocialManeuvers];

    /* src/components/reference/RefManeuvers.svelte generated by Svelte v3.16.7 */
    const file$h = "src/components/reference/RefManeuvers.svelte";

    function create_fragment$l(ctx) {
    	let div1;
    	let div0;
    	let t1;
    	let div1_intro;
    	let current;
    	var switch_value = RefList;

    	function switch_props(ctx) {
    		return {
    			props: { list: Maneuvers },
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "Maneuver Rules";
    			t1 = space();
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			attr_dev(div0, "class", "ref-header");
    			add_location(div0, file$h, 7, 1, 182);
    			attr_dev(div1, "class", "ref-page");
    			add_location(div1, file$h, 6, 0, 150);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t1);

    			if (switch_instance) {
    				mount_component(switch_instance, div1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (switch_value !== (switch_value = RefList)) {
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
    					mount_component(switch_instance, div1, null);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);

    			if (!div1_intro) {
    				add_render_callback(() => {
    					div1_intro = create_in_transition(div1, fade, {});
    					div1_intro.start();
    				});
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (switch_instance) destroy_component(switch_instance);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class RefManeuvers extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$l, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RefManeuvers",
    			options,
    			id: create_fragment$l.name
    		});
    	}
    }

    /* src/components/reference/RefSituations.svelte generated by Svelte v3.16.7 */
    const file$i = "src/components/reference/RefSituations.svelte";

    function create_fragment$m(ctx) {
    	let div1;
    	let div0;
    	let t1;
    	let div1_intro;
    	let current;
    	var switch_value = RefList;

    	function switch_props(ctx) {
    		return {
    			props: { list: Situations },
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "Situation Rules";
    			t1 = space();
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			attr_dev(div0, "class", "ref-header");
    			add_location(div0, file$i, 7, 1, 184);
    			attr_dev(div1, "class", "ref-page");
    			add_location(div1, file$i, 6, 0, 152);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t1);

    			if (switch_instance) {
    				mount_component(switch_instance, div1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (switch_value !== (switch_value = RefList)) {
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
    					mount_component(switch_instance, div1, null);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);

    			if (!div1_intro) {
    				add_render_callback(() => {
    					div1_intro = create_in_transition(div1, fade, {});
    					div1_intro.start();
    				});
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (switch_instance) destroy_component(switch_instance);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$m.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class RefSituations extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$m, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RefSituations",
    			options,
    			id: create_fragment$m.name
    		});
    	}
    }

    /* src/components/reference/RefAbilities.svelte generated by Svelte v3.16.7 */

    function create_fragment$n(ctx) {
    	const block = {
    		c: noop,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$n.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class RefAbilities extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$n, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RefAbilities",
    			options,
    			id: create_fragment$n.name
    		});
    	}
    }

    /* src/components/reference/RefGear.svelte generated by Svelte v3.16.7 */

    function create_fragment$o(ctx) {
    	const block = {
    		c: noop,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$o.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class RefGear extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$o, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RefGear",
    			options,
    			id: create_fragment$o.name
    		});
    	}
    }

    /* src/pages/Reference.svelte generated by Svelte v3.16.7 */
    const file$j = "src/pages/Reference.svelte";

    function create_fragment$p(ctx) {
    	let div;
    	let div_intro;
    	let t;
    	let current;
    	var switch_value = /*selected*/ ctx[0];

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props());
    	}

    	const navbuttons = new NavButtons({
    			props: { options: /*options*/ ctx[1] },
    			$$inline: true
    		});

    	navbuttons.$on("nav", /*handleNavigation*/ ctx[2]);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			t = space();
    			create_component(navbuttons.$$.fragment);
    			attr_dev(div, "class", "page-container");
    			add_location(div, file$j, 30, 0, 946);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (switch_instance) {
    				mount_component(switch_instance, div, null);
    			}

    			insert_dev(target, t, anchor);
    			mount_component(navbuttons, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (switch_value !== (switch_value = /*selected*/ ctx[0])) {
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
    					mount_component(switch_instance, div, null);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);

    			if (!div_intro) {
    				add_render_callback(() => {
    					div_intro = create_in_transition(div, fade, {});
    					div_intro.start();
    				});
    			}

    			transition_in(navbuttons.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			transition_out(navbuttons.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (switch_instance) destroy_component(switch_instance);
    			if (detaching) detach_dev(t);
    			destroy_component(navbuttons, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$p.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let options = [RefMenu, RefDice, RefTraits, RefSkills, RefCombat, RefManeuvers, RefSituations, RefAbilities, RefGear];
    	let selected = options[0];
    	const handleNavigation = event => $$invalidate(0, selected = event.detail.selection);

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("options" in $$props) $$invalidate(1, options = $$props.options);
    		if ("selected" in $$props) $$invalidate(0, selected = $$props.selected);
    	};

    	return [selected, options, handleNavigation];
    }

    class Reference extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$p, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Reference",
    			options,
    			id: create_fragment$p.name
    		});
    	}
    }

    /* src/pages/Home.svelte generated by Svelte v3.16.7 */
    const file$k = "src/pages/Home.svelte";

    function create_fragment$q(ctx) {
    	let div;
    	let button0;
    	let t1;
    	let button1;
    	let div_intro;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			button0 = element("button");
    			button0.textContent = "Character Creator";
    			t1 = space();
    			button1 = element("button");
    			button1.textContent = "Rules Reference";
    			attr_dev(button0, "class", "diplay-button");
    			add_location(button0, file$k, 8, 1, 218);
    			attr_dev(button1, "class", "diplay-button");
    			add_location(button1, file$k, 11, 1, 307);
    			attr_dev(div, "class", "display-page");
    			add_location(div, file$k, 7, 0, 182);

    			dispose = [
    				listen_dev(button0, "click", router.Creator, false, false, false),
    				listen_dev(button1, "click", router.Reference, false, false, false)
    			];
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button0);
    			append_dev(div, t1);
    			append_dev(div, button1);
    		},
    		p: noop,
    		i: function intro(local) {
    			if (!div_intro) {
    				add_render_callback(() => {
    					div_intro = create_in_transition(div, fade, {});
    					div_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$q.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$q, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$q.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.16.7 */
    const file$l = "src/App.svelte";

    // (21:2) <Router>
    function create_default_slot_1(ctx) {
    	let t0;
    	let t1;
    	let current;

    	const route0 = new Route({
    			props: { path: "/", component: Home },
    			$$inline: true
    		});

    	const route1 = new Route({
    			props: { path: "/creator", component: Creator },
    			$$inline: true
    		});

    	const route2 = new Route({
    			props: { path: "/reference", component: Reference },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(route0.$$.fragment);
    			t0 = space();
    			create_component(route1.$$.fragment);
    			t1 = space();
    			create_component(route2.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(route0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(route1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(route2, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(route0.$$.fragment, local);
    			transition_in(route1.$$.fragment, local);
    			transition_in(route2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(route0.$$.fragment, local);
    			transition_out(route1.$$.fragment, local);
    			transition_out(route2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(route0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(route1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(route2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(21:2) <Router>",
    		ctx
    	});

    	return block;
    }

    // (18:0) <ViewScreen>
    function create_default_slot(ctx) {
    	let t;
    	let div;
    	let current;
    	const titlebar = new TitleBar({ $$inline: true });

    	const router = new Router({
    			props: {
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(titlebar.$$.fragment);
    			t = space();
    			div = element("div");
    			create_component(router.$$.fragment);
    			attr_dev(div, "class", "display-window svelte-15azrf");
    			add_location(div, file$l, 19, 1, 890);
    		},
    		m: function mount(target, anchor) {
    			mount_component(titlebar, target, anchor);
    			insert_dev(target, t, anchor);
    			insert_dev(target, div, anchor);
    			mount_component(router, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const router_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(titlebar.$$.fragment, local);
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(titlebar.$$.fragment, local);
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(titlebar, detaching);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(div);
    			destroy_component(router);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(18:0) <ViewScreen>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$r(ctx) {
    	let current;

    	const viewscreen = new ViewScreen({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(viewscreen.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(viewscreen, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const viewscreen_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				viewscreen_changes.$$scope = { dirty, ctx };
    			}

    			viewscreen.$set(viewscreen_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(viewscreen.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(viewscreen.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(viewscreen, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$r.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$r, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$r.name
    		});
    	}
    }

    const app = new App({
    	target: document.body
    });

    return app;

}());
//# sourceMappingURL=apocalyptia-online.js.map
