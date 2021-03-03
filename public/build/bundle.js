
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
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
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
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
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
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
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
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
    class HtmlTag {
        constructor(anchor = null) {
            this.a = anchor;
            this.e = this.n = null;
        }
        m(html, target, anchor = null) {
            if (!this.e) {
                this.e = element(target.nodeName);
                this.t = target;
                this.h(html);
            }
            this.i(anchor);
        }
        h(html) {
            this.e.innerHTML = html;
            this.n = Array.from(this.e.childNodes);
        }
        i(anchor) {
            for (let i = 0; i < this.n.length; i += 1) {
                insert(this.t, this.n[i], anchor);
            }
        }
        p(html) {
            this.d();
            this.h(html);
            this.i(this.a);
        }
        d() {
            this.n.forEach(detach);
        }
    }

    const active_docs = new Set();
    let active = 0;
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
        const doc = node.ownerDocument;
        active_docs.add(doc);
        const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
        const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
        if (!current_rules[name]) {
            current_rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            active_docs.forEach(doc => {
                const stylesheet = doc.__svelte_stylesheet;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                doc.__svelte_rules = {};
            });
            active_docs.clear();
        });
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
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
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
            if (running_program || pending_program) {
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

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
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
        }
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
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
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
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
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
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.35.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/components/buttons/BackButton.svelte generated by Svelte v3.35.0 */

    const file$14 = "src/components/buttons/BackButton.svelte";

    function create_fragment$18(ctx) {
    	let a;
    	let button;

    	const block = {
    		c: function create() {
    			a = element("a");
    			button = element("button");
    			button.textContent = "<";
    			attr_dev(button, "class", "back-btn btn-icon square-btn svelte-12he0uz");
    			add_location(button, file$14, 6, 1, 93);
    			attr_dev(a, "href", /*path*/ ctx[0]);
    			attr_dev(a, "class", "back-btn btn-box green-btn svelte-12he0uz");
    			add_location(a, file$14, 5, 0, 41);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, button);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*path*/ 1) {
    				attr_dev(a, "href", /*path*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$18.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$18($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("BackButton", slots, []);
    	let { path } = $$props;
    	const writable_props = ["path"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<BackButton> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("path" in $$props) $$invalidate(0, path = $$props.path);
    	};

    	$$self.$capture_state = () => ({ path });

    	$$self.$inject_state = $$props => {
    		if ("path" in $$props) $$invalidate(0, path = $$props.path);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [path];
    }

    class BackButton extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$18, create_fragment$18, safe_not_equal, { path: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BackButton",
    			options,
    			id: create_fragment$18.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*path*/ ctx[0] === undefined && !("path" in props)) {
    			console.warn("<BackButton> was created without expected prop 'path'");
    		}
    	}

    	get path() {
    		throw new Error("<BackButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<BackButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/widgets/Error.svelte generated by Svelte v3.35.0 */

    const { Error: Error_1$1 } = globals;
    const file$13 = "src/components/widgets/Error.svelte";

    function create_fragment$17(ctx) {
    	let div;
    	let h1;
    	let t1;
    	let p;
    	let t3;
    	let backbutton;
    	let current;
    	backbutton = new BackButton({ props: { path: "../" }, $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "404";
    			t1 = space();
    			p = element("p");
    			p.textContent = "Page not found.";
    			t3 = space();
    			create_component(backbutton.$$.fragment);
    			add_location(h1, file$13, 5, 1, 103);
    			add_location(p, file$13, 6, 1, 117);
    			attr_dev(div, "class", "e404 svelte-1vqt350");
    			add_location(div, file$13, 4, 0, 83);
    		},
    		l: function claim(nodes) {
    			throw new Error_1$1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, p);
    			insert_dev(target, t3, anchor);
    			mount_component(backbutton, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(backbutton.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(backbutton.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t3);
    			destroy_component(backbutton, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$17.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$17($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Error", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Error> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ BackButton });
    	return [];
    }

    class Error$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$17, create_fragment$17, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Error",
    			options,
    			id: create_fragment$17.name
    		});
    	}
    }

    class Rule {
    	constructor({
    		desc=[],
    		formula=null,
    		id = null,
    		name=``,
    		type=`Rule`,
    		visible=false
    	}) {
    		this.id = id;
    		this.name = name;
    		this.desc = desc;
    		this.formula = formula;
    		this.type = type;
    		this.visible = visible;
    	}
    }

    class Ability extends Rule {
    	constructor({
    		desc,
    		formula,
    		id,
    		max,
    		name,
    		notes=``,
    		opts=[],
    		selection=0,
    		taken=0,
    		type=`Ability`,
    		visible,
    		experience
    	}) {
    		super({
    			id,
    			name,
    			desc,
    			visible,
    			formula,
    			type
    		});
    		this.max = max;
    		this.experience = experience;
    		this.taken = taken;
    		this.opts = opts;
    		this.selection = selection;
    		this.notes = notes;
    	}
    	static text = [
    		`Abilities are Character upgrades purchased with XP.`
    	]
    }

    var Alphabetize = (list) => {
    	return list.sort((a, b) => {
    		const nameA = a.name.toUpperCase();
    		const nameB = b.name.toUpperCase();
    		if (nameA < nameB) return -1
    		if (nameA > nameB) return 1
    		return 0
    	}).flat()
    };

    const Parry = new Ability({
    	id: ``,
    	name: `Parry`,
    	desc: [
    		`Free Block Action once per round.`,
    	],
    	max: 1,
    	experience: 12
    });

    const Sidestep = new Ability({
    	id: ``,
    	name: `Side-step`,
    	desc: [
    		`Free Dodge Action once per round.`,
    	],
    	max: 1,
    	experience: 12
    });

    const Wrestling = new Ability({
    	id: ``,
    	name: `Wrestling`,
    	desc: [
    		`Free Grapple Action once per round.`,
    	],
    	max: 1,
    	experience: 12
    });

    var XP12AbilitiesList = [
    	Parry,
    	Sidestep,
    	Wrestling,
    ];

    const Charge = new Ability({
    	id: ``,
    	name: `Charge`,
    	desc: [
    		`Ignore Unstable penalty to Melee Attacks when you Run.`,
    		`Ignore Prone effect from Leg Damage.`,
    	],
    	max: 1,
    	experience: 15
    });

    const FirmGrip = new Ability({
    	id: ``,
    	name: `Firm Grip`,
    	desc: [
    		`Ignore penalty to use 2h weapons in 1h, up to Size = Constitution.`,
    		`Ignore Drop effect from Arm Damage.`,
    	],
    	max: 1,
    	experience: 15
    });

    const HardHeaded = new Ability({
    	id: ``,
    	name: `Hard Headed`,
    	desc: [
    		`Ignore Stun effect from Head Damage.`,
    	],
    	max: 1,
    	experience: 15
    });

    var XP15AbilitiesList = [
    	Charge,
    	FirmGrip,
    	HardHeaded,
    ];

    const Ambidextrous = new Ability({
    	id: ``,
    	name: `Ambidextrous`,
    	desc: [
    		`Off-hand penalty is -1 instead of -3.`,
    	],
    	max: 1,
    	experience: 18
    });

    const Assassin = new Ability({
    	id: ``,
    	name: `Assassin`,
    	desc: [
    		`+3 Damage for Attacks made while Concealed.`,
    	],
    	max: 1,
    	experience: 18
    });

    var XP18AbilitiesList = [
    	Ambidextrous,
    	Assassin,
    ];

    const Focus = new Ability({
    	id: ``,
    	name: `Focus`,
    	desc: [
    		`+1 Psyche.`,
    	],
    	max: 3,
    	experience: 24
    });

    const Healthy = new Ability({
    	id: ``,
    	name: `Healthy`,
    	desc: [
    		`+1 Health for each Body Part.`,
    	],
    	max: 3,
    	experience: 24
    });

    var XP24AbilitiesList = [
    	Focus,
    	Healthy,
    ];

    const CloseCall = new Ability({
    	id: ``,
    	name: `Close Call`,
    	desc: [
    		`Spend this Ability to survive an otherwise lethal encounter.`,
    	],
    	max: 1,
    	experience: 30
    });

    const Acrobatics = new Rule({
    	name: `Acrobatics`,
    	desc: [
    		`Gymnastic prowess.`,
    	],
    	type: `Skill`
    });
    Acrobatics.parent = `Agility`;
    Acrobatics.diff = 6;
    Acrobatics.specs = {
    	dodge: new Rule({
    		id: `a7451f3a-9970-431a-8304-f36ae046e85b`,
    		name: `Dodge`,
    		desc: [
    			`Roll vs a Melee or Ranged Attack to spend one Action attempting to actively evade that Attack.`,
    		]
    	}),
    	jump: new Rule({
    		id: `7a5e0273-8d72-43c3-a826-0a927e2ee0e9`,
    		name: `Jump`,
    		desc: [
    			`Running Jump distance is [Agility] yards.`,
    			`Standing vertical Jump height is [Agility / 2] feet.`,
    		]
    	})
    };

    const Larceny = new Rule({
    	name: `Larceny`,
    	desc: [
    		`Delicate manual operations.`,
    	],
    	type: `Skill`
    });
    Larceny.parent = `Agility`;
    Larceny.diff = `varies`;
    Larceny.specs = {
    	mechanical: new Rule({
    		id: `44d2e074-3316-41f1-a3f9-5252e8e2c0c4`,
    		name: `Mechanical`,
    		desc: [
    			`(d6 rounds) Activate or deactivate Locks, Traps, Bombs, and similar mechanisms.`,
    		]
    	}),
    	trick: new Rule({
    		id: `959c5f50-d590-4064-bf23-65737cdafc61`,
    		name: `Trick`,
    		desc: [
    			`Roll vs [Perception] to pick pockets, hide items, or some other sleight-of-hand.`,
    		]
    	})
    };

    const Ranged = new Rule({
    	name: `Ranged`,
    	desc: [
    		`Projectile combat.`,
    	],
    	type: `Skill`
    });
    Ranged.parent = `Agility`;
    Ranged.diff = `Defense`;
    Ranged.specs = {
    	shoot: new Rule({
    		id: `f6a049f5-bc9e-48d2-b0d3-2df479cc7c6e`,
    		name: `Shoot`,
    		desc: [
    			`Roll vs target's Defense.`,
    		]
    	}),
    	throw: new Rule({
    		id: `c3e75b6f-c686-4c4f-91a8-ee10dfe66b07`,
    		name: `Throw`,
    		desc: [
    			`Roll vs target's Defense.`,
    			`Range is [Constitution x 3yds].`,
    		]
    	})
    };

    const Stealth = new Rule({
    	name: `Stealth`,
    	desc: [
    		`Conceal your presence.`,
    	],
    	type: `Skill`
    });
    Stealth.parent = `Agility`;
    Stealth.diff = `Perception`;
    Stealth.specs = {
    	hide: new Rule({
    		id: `bcec6762-9716-497d-894a-626f8e0d77d7`,
    		name: `Hide`,
    		desc: [
    			`Stay motionless and Concealed`,
    			`+3 if Prone.`,
    		]
    	}),
    	sneak: new Rule({
    		id: `7d49df11-ede2-4a18-bb20-711e44f2445b`,
    		name: `Sneak`,
    		desc: [
    			`Move Walk Speed while Concealed.`,
    		]
    	})
    };

    var AgilitySkillsList = [
    	Acrobatics,
    	Larceny,
    	Ranged,
    	Stealth,
    ];

    const Agility = new Rule({
    	name: `Agility`,
    	desc: [
    		`Agility is a Character’s talent for physical coordination.`,
    		`High Agility indicates balance, flexibility, and fine motor skill.`,
    		`This Trait is a factor in the Speed and Dodge Properties.`,
    		`Agility is the parent Trait for the following Skills: ${AgilitySkillsList.map(skill => skill.name).join(', ')}.`,
    	],
    	type: `Trait`
    });

    const Medicine = new Rule({
    	name: `Medicine`,
    	desc: [
    		`Diagnosing and treating wounds and Diseases.`,
    	],
    	type: `Skill`
    });
    Medicine.parent = `Brains`;
    Medicine.diff = `Damage`;
    Medicine.specs = {
    	firstaid: new Rule({
    		id: `d99dcfd7-e192-463f-941f-1487ec141793`,
    		name: `First-Aid`,
    		desc: [
    			`Stop a person from Bleeding for a number of hours equal to your roll.`,
    			`Inflict an additional 1 Damage on a Botch.`,
    			`Takes 1 round per Damage.`,
    		]
    	}),
    	surgery: new Rule({
    		id: `84136a49-7dd1-4462-af4d-a9c8e2390f80`,
    		name: `Surgery`,
    		desc: [
    			`Stop a person from Bleeding as long as they do not take any more Damage.`,
    			`Inflict an additional d6 Damage on a Botch.`,
    			`Takes [Damage x 20] minutes.`,
    		]
    	})
    };

    const Perception = new Rule({
    	name: `Perception`,
    	desc: [
    		`Processing sensory input.`,
    	],
    	type: `Skill`
    });
    Perception.parent = `Brains`;
    Perception.diff = `varies`;
    Perception.specs = {
    	search: new Rule({
    		id: `68ea4f9c-12dd-4bcd-b2a3-a6d70b48a16e`,
    		name: `Search`,
    		desc: [
    			`Roll vs [Stealth (or Survival if tracking)].`,
    		]
    	}),
    	intuition: new Rule({
    		id: `61372444-6825-4ad5-967e-a2b4ce991960`,
    		name: `Intuition`,
    		desc: [
    			`Roll vs [Socialize or Perform].`,
    		]
    	})
    };

    const Science = new Rule({
    	name: `Science`,
    	desc: [
    		`Knowledge of physical laws.`,
    	],
    	type: `Skill`
    });
    Science.parent = `Brains`;
    Science.diff = `varies`;
    Science.specs = {
    	chemistry: new Rule({
    		id: `4f241948-5289-43e5-bc1f-77a04420b6bf`,
    		name: `Chemistry`,
    		desc: [
    			`Mix Chemicals to make Bombs, Drugs, Medicine, etc.`,
    			`Time required is [Mix # x 10] minutes.`,
    			`Requires the use of [d6 + Mix #] Chemicals.`,
    		]
    	}),
    	technology: new Rule({
    		id: `bb45ae73-369d-420d-b949-aac209c9abc7`,
    		name: `Technology`,
    		desc: [
    			`(varies) Make or use electronic devices.`,
    		]
    	})
    };

    const Survival = new Rule({
    	name: `Survival`,
    	desc: [
    		`Primitive practices for living outdoors.`,
    	],
    	type: `Skill`
    });
    Survival.parent = `Brains`;
    Survival.diff = `Biome`;
    Survival.specs = {
    	forage: new Rule({
    		id: `cdb225a5-e82f-4be6-855c-bc78ef6f44fc`,
    		name: `Forage`,
    		desc: [
    			`(1hr) Provide 1 Need for 1 person.`,
    		]
    	}),
    	navigate: new Rule({
    		id: `9c1f6a61-bc28-4dde-b89f-0c9a34555f50`,
    		name: `Navigate`,
    		desc: [
    			`(1min) Plot course`,
    			`Roll vs [Perception] if tracked.`,
    		]
    	})
    };

    var BrainsSkillsList = [
    	Medicine,
    	Perception,
    	Science,
    	Survival,
    ];

    const Brains = new Rule({
    	name: `Brains`,
    	desc: [
    		`Brains is a Character’s talent for cognitive performance and abstract thought.`,
    		`High Brains indicates sharp memory, keen awareness, and studiousness.`,
    		`This Trait is a factor in the XP and Intellect Properties.`,
    		`Brains is the parent Trait for the following Skills: ${BrainsSkillsList.map(skill => skill.name).join(', ')}.`,
    	],
    	type: `Trait`
    });

    const Athletics = new Rule({
    	name: `Athletics`,
    	desc: [
    		`Physically difficult forms of motion.`,
    	],
    	type: `Skill`
    });
    Athletics.parent = `Constitution`;
    Athletics.diff = `varies`;
    Athletics.specs = {
    	climb: new Rule({
    		id: `fda9b21e-5ee1-448f-a7f5-3d358e9ad062`,
    		name: `Climb`,
    		desc: [
    			`Move along vertical surfaces at [Walk Speed / 2].`,
    		]
    	}),
    	swim: new Rule({
    		id: `f35bb291-4130-4cba-9841-dcc156eba70c`,
    		name: `Swim`,
    		desc: [
    			`Move in water at [Speed / 4].`,
    		]
    	})
    };

    const Build = new Rule({
    	name: `Build`,
    	desc: [
    		`Make an item from [d6 + #] Parts.`,
    	],
    	type: `Skill`
    });
    Build.parent = `Constitution`;
    Build.diff = `varies`;
    Build.specs = {
    	customize: new Rule({
    		id: `4d055bd5-9413-482f-aeef-ec64ced8d7a0`,
    		name: `Customize`,
    		desc: [
    			`Customizations take a number of hours to complete equal to the Difficulty.`,
    			`Each Customization can only be applied once on per item.`,
    			`Each item can have up to 3 unique Customizations.`,
    			`Weapons: +1 Ranged Attack, +1 Melee Damage, or a new Weapon Attribute.`,
    			`Armor: +1 Absorption or a new Armor Attribute.`,
    		]
    	}),
    	repair: new Rule({
    		id: `5dcd9938-820f-40b6-b1db-051c99295997`,
    		name: `Repair`,
    		desc: [
    			`Fixing a broken item takes a number of hours to complete equal to the Difficulty.`,
    			`+1 to the Build(Repair) roll when using Parts from the same kind of item.`,
    		]
    	})
    };

    const Drive = new Rule({
    	name: `Drive`,
    	desc: [
    		`Operate vehicles.`,
    	],
    	type: `Skill`
    });
    Drive.parent = `Constitution`;
    Drive.diff = `varies`;
    Drive.specs = {
    	ram: new Rule({
    		id: `9483457c-5e90-4225-932f-f010077fecad`,
    		name: `Ram`,
    		desc: [
    			`Roll vs [Drive(Stunt)] to Attack with a vehicle.`,
    		]
    	}),
    	stunt: new Rule({
    		id: `47a939cf-88ba-4773-bf52-4d383fb38695`,
    		name: `Stunt`,
    		desc: [
    			`Roll vs [Drive(Ram)] for Defense with a vehicle.`,
    		]
    	})
    };

    const Melee = new Rule({
    	name: `Melee`,
    	desc: [
    		`Hand-to-hand combat.`,
    	],
    	type: `Skill`
    });
    Melee.parent = `Constitution`;
    Melee.diff = `Attack or Defense`;
    Melee.specs = {
    	block: new Rule({
    		id: `ad9c0c5a-f399-4f81-ba33-6242b17fc5e6`,
    		name: `Block`,
    		desc: [
    			`Roll vs a Melee Attack to spend one Action attempting to actively deflect that Attack.`,
    			`You may roll against Ranged Attacks as well in the same way if you are holding a Shield.`,
    		]
    	}),
    	strike: new Rule({
    		id: `1842e006-c064-4994-9f03-27e54f1d7b9f`,
    		name: `Strike`,
    		desc: [
    			`Roll vs target's Defense.`,
    		]
    	})
    };

    var ConstitutionSkillsList = [
    	Athletics,
    	Build,
    	Drive,
    	Melee,
    ];

    const Constitution = new Rule({
    	name: `Constitution`,
    	desc: [
    		`Constitution is a Character’s talent for physical power and durability.`,
    		`High Constitution indicates good health, high stamina, and strong muscles.`,
    		`This Trait is a factor in the Health and Block Properties.`,
    		`Constitution is the parent Trait for the following Skills: ${ConstitutionSkillsList.map(skill => skill.name).join(', ')}.`,
    	],
    	type: `Trait`
    });

    const Demeanor = new Rule({
    	name: `Demeanor`,
    	desc: [
    		`Demeanor is a Character’s talent for social exchanges and sheer force of will.`,
    		`High Demeanor indicates charisma, self-motivation, and confidence.`,
    		`This Trait is a factor in the Psyche and Luck Properties.`,
    		`Demeanor is the parent Trait for the following Skills: ${ConstitutionSkillsList.map(skill => skill.name).join(', ')}.`,
    	],
    	type: `Trait`
    });

    var TraitsList = {
    	name: `Traits`,
    	list: [
    		Agility,
    		Brains,
    		Constitution,
    		Demeanor,
    	]
    };

    const SelfImprovement = new Ability({
    	id: ``,
    	name: `Self Improvement`,
    	desc: [
    		`+1 to a Trait (max 6).`,
    	],
    	max: 1,
    	experience: 30,
    	opts: TraitsList.list
    });

    var XP30AbilitiesList = [
    	CloseCall,
    	SelfImprovement,
    ];

    class Gear extends Rule {
    	constructor({
    		attr=[],
    		desc,
    		id,
    		name,
    		qty=0,
    		sz=0,
    		type=`Gear`
    	}) {
    		super({
    			desc,
    			id,
    			name,
    			type
    		});
    		this.attr = attr;
    		this.qty = qty;
    		this.sz = sz;
    	}
    }

    const TwoHanded = new Rule({
    	id: ``,
    	name: `2h`,
    	desc: [
    		`Normally used two-handed.`,
    		`Can be used one-handed at a penalty = Size.`,
    	]
    });

    const Chop = new Rule({
    	id: ``,
    	name: `Chop`,
    	desc: [
    		`+1 Damage to Body Parts with no Armor.`,
    	]
    });

    const Slow = new Rule({
    	id: ``,
    	name: `Slow`,
    	desc: [
    		`Penalty to Speed = Size.`,
    	]
    });

    const Ax = new Gear({
    	id: ``,
    	name: `Ax`,
    	type: `Melee Weapon`,
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
    	id: ``,
    	name: `Blunt`,
    	desc: [
    		`Does not cause Bleeding.`,
    	]
    });

    const BaseballBat = new Gear({
    	id: ``,
    	name: `Baseball Bat`,
    	type: `Melee Weapon`,
    	sz: 3,
    	attr: [
    		TwoHanded,
    		Blunt,
    	]
    });
    BaseballBat.dmg = 3;
    BaseballBat.rng = 2;

    const OneHanded = new Rule({
    	id: ``,
    	name: `1h`,
    	desc: [
    		`Normally used one-handed.`,
    	]
    });

    const BrassKnuckles = new Gear({
    	id: ``,
    	name: `Brass Knuckles`,
    	type: `Melee Weapon`,
    	sz: 1,
    	attr: [
    		OneHanded,
    		Blunt,
    	]
    });
    BrassKnuckles.dmg = 1;
    BrassKnuckles.rng = 1;

    const Club = new Gear({
    	id: ``,
    	name: `Club`,
    	type: `Melee Weapon`,
    	sz: 2,
    	attr: [
    		OneHanded,
    		Blunt,
    	]
    });
    Club.dmg = 2;
    Club.rng = 2;

    const Crowbar = new Gear({
    	id: ``,
    	name: `Crowbar`,
    	type: `Melee Weapon`,
    	sz: 3,
    	attr: [
    		OneHanded,
    	]
    });
    Crowbar.dmg = 3;
    Crowbar.rng = 2;

    const Hammer = new Gear({
    	id: ``,
    	name: `Hammer`,
    	type: `Melee Weapon`,
    	sz: 2,
    	attr: [
    		OneHanded,
    		Blunt,
    	]
    });
    Hammer.dmg = 2;
    Hammer.rng = 1;

    const Hatchet = new Gear({
    	id: ``,
    	name: `Hatchet`,
    	type: `Melee Weapon`,
    	sz: 2,
    	attr: [
    		OneHanded,
    		Chop,
    	]
    });
    Hatchet.dmg = 2;
    Hatchet.rng = 1;

    const Pierce = new Rule({
    	id: ``,
    	name: `Pierce`,
    	desc: [
    		`+1 Penetration`,
    	]
    });

    const Rapid = new Rule({
    	id: ``,
    	name: `Rapid`,
    	desc: [
    		`You can make 2 Attacks at the same target as 1 Action.`,
    	]
    });

    const Knife = new Gear({
    	id: ``,
    	name: `Knife`,
    	type: `Melee Weapon`,
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
    	id: ``,
    	name: `Machete`,
    	type: `Melee Weapon`,
    	sz: 2,
    	attr: [
    		OneHanded,
    		Chop,
    	]
    });
    Machete.dmg = 3;
    Machete.rng = 2;

    const Shield = new Rule({
    	id: ``,
    	name: `Shield`,
    	desc: [
    		`Absorption = Size when used as Cover.`,
    		`Bonus to Block = Size.`,
    	]
    });

    const RiotShield = new Gear({
    	id: ``,
    	name: `Riot Shield`,
    	type: `Melee Weapon`,
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
    	id: ``,
    	name: `Sledgehammer`,
    	type: `Melee Weapon`,
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
    	id: ``,
    	name: `Spear`,
    	type: `Melee Weapon`,
    	sz: 3,
    	attr: [
    		OneHanded,
    		Pierce,
    	]
    });
    Spear.dmg = 4;
    Spear.rng = 3;

    const Staff = new Gear({
    	id: ``,
    	name: `Staff`,
    	type: `Melee Weapon`,
    	sz: 3,
    	attr: [
    		TwoHanded,
    		Blunt,
    	]
    });
    Staff.dmg = 2;
    Staff.rng = 3;

    var MeleeWeaponsList = {
    	name: `Melee`,
    	list: [
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
    	]
    };


    // / RARE MELEE
    // / new Gear(`Barbwire Club`, 3, 1, ``, 2),
    // / new Gear(`Bowie Knife`, 2, 1, `Chop. Rapid.`, 1),
    // / new Gear(`Broadsword`, 4, 2, `Chop or Pierce.`, 4),
    // / new Gear(`Catch Pole`, 0, 2, `+1 Block. Blunt. +1 Grab.`, 3),
    // / new Gear(`Chainsaw`, 6, 2, `.5gal Fuel. d6 rounds to start. 1: Empty. Loud.`, 4),
    // / new Gear(`Ice Ax`, 3, 1, `Lever. Pierce.`, 2),
    // / new Gear(`Katana`, 5, 2, `Chop or Pierce. Rapid.`, 3),
    // / new Gear(`Kukri`, 3, 1, `Chop`, 2),
    // / new Gear(`Lasso`, 0, 2, `Blunt. +1 Grab. Throw (Range:3)`, 2),
    // / new Gear(`Net`, 0, 2, `+6 Grab.`, 3),
    // / new Gear(`Rapier`, 3, 1, `Pierce. Rapid.`, 2),
    // / new Gear(`Scythe`, 6, 2, `Chop. Pierce.`, 4),
    // / new Gear(`Sign Shield`, 2, 1, `+3 Block. Cover 6 Absorption.`, 4),
    // / new Gear(`Switchblade`, 1, 1, `Pierce. Rapid.`, 0),
    // / new Gear(`Trench Knife`, 2, 1, `Blunt Punch. Pierce. Rapid.`, 1),
    // / new Gear(`Whip`, 0, 1, `Blunt. +1 Disarm. +1 Grab. Range:3.`, 1),

    // / OLD MELEE
    // / new Gear(`Baton`, 2, 1, `Blunt. Rapid.`, 2),
    // / new Gear(`Cane`, 1, 1, `Blunt. +1 Trip. Can be used as a Crutch.`, 3),
    // / new Gear(`Cleaver`, 2, 1, `Chop.`, 1),
    // / new Gear(`Firepoker`, 3, 1, `Lever. Pierce.`, 3),
    // / new Gear(`Garrote`, 1, 2, `Blunt. +3 to Grab(Lock) Head.`, 1),
    // / new Gear(`Metal Club`, 3, 2, `Blunt.`, 3),
    // / new Gear(`Pickax`, 6, 2, `Lever. Pierce.`, 5),
    // / new Gear(`Pitchfork`, 3, 2, `+1 Block. Pierce.`, 4),
    // / new Gear(`Screwdriver`, 1, 1, `Lever. Pierce. Rapid.`, 1),
    // / new Gear(`Shovel`, 3, 2, `+1 Block`, 4),
    // / new Gear(`Tire Iron`, 2, 1, `Lever.`, 2),
    // / new Gear(`Torch`, 1, 1, `Blunt. +1 Fire Damage. 5yd light radius 1hr.`, 2),

    const ArmaliteAR15 = new Gear({
    	id: ``,
    	name: `Armalite AR-15 Rifle`,
    	type: `Ranged Weapon`,
    	sz: 3,
    	attr: [
    		TwoHanded,
    		Rapid,
    	]
    });
    ArmaliteAR15.dmg = 3;
    ArmaliteAR15.rng = 50;
    ArmaliteAR15.cap = 30;
    ArmaliteAR15.cal = `5.56`;

    const BarnettCrossbow = new Gear({
    	id: ``,
    	name: `Barnett Crossbow`,
    	type: `Ranged Weapon`,
    	sz: 3,
    	attr: [
    		TwoHanded,
    	]
    });
    BarnettCrossbow.dmg = 3;
    BarnettCrossbow.rng = 15;
    BarnettCrossbow.cap = 1;
    BarnettCrossbow.cal = `Arrow`;

    const Scatter = new Rule({
    	id: ``,
    	name: `Scatter`,
    	desc: [
    		`Ignore Range penalties.`,
    		`-1 Damage per extended Range.`,
    		`-1 Penetration.`
    	]
    });

    const BenelliM4 = new Gear({
    	id: ``,
    	name: `Benelli M4 Shotgun`,
    	type: `Ranged Weapon`,
    	sz: 4,
    	attr: [
    		TwoHanded,
    		Rapid,
    		Scatter,
    	]
    });
    BenelliM4.dmg = 5;
    BenelliM4.rng = 15;
    BenelliM4.cap = 6;
    BenelliM4.cal = `12g`;

    const BrowningABolt = new Gear({
    	id: ``,
    	name: `Browning A-Bolt Rifle`,
    	type: `Ranged Weapon`,
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
    	id: ``,
    	name: `Colt Python Revolver`,
    	type: `Ranged Weapon`,
    	sz: 1,
    	attr: [
    		TwoHanded,
    	]
    });
    ColtPython.dmg = 2;
    ColtPython.rng = 10;
    ColtPython.cap = 6;
    ColtPython.cal = `.357`;

    const CZUpland = new Gear({
    	id: ``,
    	name: `CZ Upland Shotgun`,
    	type: `Ranged Weapon`,
    	sz: 4,
    	attr: [
    		TwoHanded,
    		Rapid,
    		Scatter,
    	]
    });
    CZUpland.dmg = 5;
    CZUpland.rng = 20;
    CZUpland.cap = 2;
    CZUpland.cal = `12g`;

    const Glock19 = new Gear({
    	id: ``,
    	name: `Glock 19 Pistol`,
    	type: `Ranged Weapon`,
    	sz: 1,
    	attr: [
    		TwoHanded,
    		Rapid,
    	]
    });
    Glock19.dmg = 1;
    Glock19.rng = 10;
    Glock19.cap = 17;
    Glock19.cal = `9mm`;

    const Auto = new Rule({
    	id: ``,
    	name: `Auto`,
    	desc: [
    		`Choose either Burst or Spray.`,
    		`Burst: +3 Ranged Attack vs one target.`,
    		`Spray: 3yd Blast Attack.`,
    		`Uses 10 bullets.`,
    	]
    });

    const HKMP5 = new Gear({
    	id: ``,
    	name: `H&K MP5 SMG`,
    	type: `Ranged Weapon`,
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

    const HenryGoldenBoy = new Gear({
    	id: ``,
    	name: `Henry Golden Boy Rifle`,
    	type: `Ranged Weapon`,
    	sz: 3,
    	attr: [
    		TwoHanded,
    	]
    });
    HenryGoldenBoy.dmg = 0;
    HenryGoldenBoy.rng = 30;
    HenryGoldenBoy.cap = 16;
    HenryGoldenBoy.cal = `.22`;

    const HoytCompoundBow = new Gear({
    	id: ``,
    	name: `Hoyt Compound Bow`,
    	type: `Ranged Weapon`,
    	sz: 3,
    	attr: [
    		TwoHanded,
    	]
    });
    HoytCompoundBow.dmg = 2;
    HoytCompoundBow.rng = 15;
    HoytCompoundBow.cap = 1;
    HoytCompoundBow.cal = `Arrow`;

    const Kimber1911 = new Gear({
    	id: ``,
    	name: `Kimber 1911 Pistol`,
    	type: `Ranged Weapon`,
    	sz: 1,
    	attr: [
    		TwoHanded,
    		Rapid,
    	]
    });
    Kimber1911.dmg = 1;
    Kimber1911.rng = 15;
    Kimber1911.cap = 7;
    Kimber1911.cal = `.45`;

    const MAC10 = new Gear({
    	id: ``,
    	name: `MAC-10 SMG`,
    	type: `Ranged Weapon`,
    	sz: 2,
    	attr: [
    		TwoHanded,
    		Auto,
    		Rapid,
    	]
    });
    MAC10.dmg = 1;
    MAC10.rng = 20;
    MAC10.cap = 30;
    MAC10.cal = `.45`;

    const Marlin1894C = new Gear({
    	id: ``,
    	name: `Marlin 1894C Rifle`,
    	type: `Ranged Weapon`,
    	sz: 3,
    	dmg: 2,
    	rng: 30,
    	attr: [
    		TwoHanded,
    	],
    	cap: 9,
    	cal: `.357`
    });
    Marlin1894C.dmg = 2;
    Marlin1894C.rng = 30;
    Marlin1894C.cap = 9;
    Marlin1894C.cal = `.357`;

    const Mossberg500 = new Gear({
    	id: ``,
    	name: `Mossberg 500 Shotgun`,
    	type: `Ranged Weapon`,
    	sz: 2,
    	attr: [
    		TwoHanded,
    		Scatter,
    	]
    });
    Mossberg500.dmg = 5;
    Mossberg500.rng = 10;
    Mossberg500.cap = 5;
    Mossberg500.cal = `12g`;

    const NorincoSKS = new Gear({
    	id: ``,
    	name: `Norinco SKS Rifle`,
    	type: `Ranged Weapon`,
    	sz: 4,
    	attr: [
    		TwoHanded,
    		Rapid,
    	]
    });
    NorincoSKS.dmg = 4;
    NorincoSKS.rng = 50;
    NorincoSKS.cap = 10;
    NorincoSKS.cal = `7.62`;

    const RecurveBow = new Gear({
    	id: ``,
    	name: `Recurve Bow`,
    	type: `Ranged Weapon`,
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
    	id: ``,
    	name: `Remington 700 Rifle`,
    	type: `Ranged Weapon`,
    	sz: 4,
    	attr: [
    		TwoHanded,
    	]
    });
    Remington700.dmg = 6;
    Remington700.rng = 100;
    Remington700.cap = 5;
    Remington700.cal = `.308`;

    const Remington870 = new Gear({
    	id: ``,
    	name: `Remington 870 Shotgun`,
    	type: `Ranged Weapon`,
    	sz: 4,
    	attr: [
    		TwoHanded,
    		Scatter,
    	]
    });
    Remington870.dmg = 5;
    Remington870.rng = 15;
    Remington870.cap = 6;
    Remington870.cal = `12g`;

    const Ruger1022 = new Gear({
    	id: ``,
    	name: `Ruger 10/22 Rifle`,
    	type: `Ranged Weapon`,
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
    	id: ``,
    	name: `Ruger Mk.III Pistol`,
    	type: `Ranged Weapon`,
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

    const SW686Snubnose = new Gear({
    	id: ``,
    	name: `S&W 686 Snubnose Revolver`,
    	type: `Ranged Weapon`,
    	sz: 1,
    	attr: [
    		TwoHanded,
    	]
    });
    SW686Snubnose.dmg = 2;
    SW686Snubnose.rng = 5;
    SW686Snubnose.cap = 5;
    SW686Snubnose.cal = `.357`;

    const SWMPShield = new Gear({
    	id: ``,
    	name: `S&W M&P Shield Pistol`,
    	type: `Ranged Weapon`,
    	sz: 1,
    	attr: [
    		TwoHanded,
    		Rapid
    	]
    });
    SWMPShield.dmg = 1;
    SWMPShield.rng = 5;
    SWMPShield.cap = 7;
    SWMPShield.cal = `9mm`;

    const SavageMkII = new Gear({
    	id: ``,
    	name: `Savage Mk.II Rifle`,
    	type: `Ranged Weapon`,
    	sz: 3,
    	attr: [
    		TwoHanded,
    	]
    });
    SavageMkII.dmg = 1;
    SavageMkII.rng = 40;
    SavageMkII.cap = 10;
    SavageMkII.cal = `.22`;

    const SpringfieldM1A = new Gear({
    	id: ``,
    	name: `Springfield M1A Rifle`,
    	type: `Ranged Weapon`,
    	sz: 4,
    	attr: [
    		TwoHanded,
    		Rapid,
    	]
    });
    SpringfieldM1A.dmg = 6;
    SpringfieldM1A.rng = 80;
    SpringfieldM1A.cap = 20;
    SpringfieldM1A.cal = `.308`;

    const StoegerCoachgun = new Gear({
    	id: ``,
    	name: `Stoeger Coach Shotgun`,
    	type: `Ranged Weapon`,
    	sz: 3,
    	attr: [
    		TwoHanded,
    		Rapid,
    		Scatter,
    	]
    });
    StoegerCoachgun.dmg = 5;
    StoegerCoachgun.rng = 10;
    StoegerCoachgun.cap = 2;
    StoegerCoachgun.cal = `12g`;

    const WASRAK47 = new Gear({
    	id: ``,
    	name: `WASR AK-47 Rifle`,
    	type: `Ranged Weapon`,
    	sz: 3,
    	attr: [
    		TwoHanded,
    		Rapid,
    	]
    });
    WASRAK47.dmg = 4;
    WASRAK47.rng = 30;
    WASRAK47.cap = 30;
    WASRAK47.cal = `7.62`;

    var RangedWeaponsList = {
    	name: `Ranged`,
    	list: [
    		ArmaliteAR15,
    		BarnettCrossbow,
    		BenelliM4,
    		BrowningABolt,
    		ColtPython,
    		CZUpland,
    		Glock19,
    		HKMP5,
    		HenryGoldenBoy,
    		HoytCompoundBow,
    		Kimber1911,
    		MAC10,
    		Marlin1894C,
    		Mossberg500,
    		NorincoSKS,
    		RecurveBow,
    		Remington700,
    		Remington870,
    		Ruger1022,
    		RugerMkIII,
    		SW686Snubnose,
    		SWMPShield,
    		SavageMkII,
    		SpringfieldM1A,
    		StoegerCoachgun,
    		WASRAK47
    	]
    };


    // / RARE RANGED
    // / new Gear(`Blowgun`, 0, `Cx2`, `Dart`, 1, 2, `Pierce. DMG Mod.`, 1),
    // / new Gear(`Bolas`, 0, `Cx2`, `-`, `-`, 1, `Blunt. DMG Mod. Trip. Throw.`, 1),	
    // / new Gear(`Derringer`, 1, 3, `.22`, 2, 1, `-1 RATK.`, 0),
    // / new Gear(`Flamethrower`, `d6x3`, 5, `Fuel`, 7, `Auto. 3yd Blast. Fire Dacape.`, 6),
    // / new Gear(`Longbow`, 1, 20, `Arrow`, 1, 2, `DMG Mod. -1 RATK.`, 3),
    // / new Gear(`M2 Browning`, 12, 200, `.50BMG`, `belt`, 2, `Auto. Mounted.`, 16),
    // / new Gear(`M4A1 Carbine`, 4, 50, `5.56`, `30cap`, 2, `Auto. Rapid.`, 3),
    // / new Gear(`M32 Launcher`, `varies`, 25, `40mm`, 6, 2, `Rapid.`, 4),
    // / new Gear(`M60 Machinegun`, 5, 100, `.308`, 300, 2, `Auto. Rapid. Bipod.`, 6),
    // / new Gear(`M72 LAW`, `d6x9`, 50, `Rocket`, 1, 2, `12yd Blast. Pierce.`, 3),
    // / new Gear(`M82 Barret`, 12, 200, `.50BMG`, `10cap`, 2, `Rapid. Bipod. Scope.`, 6),
    // / new Gear(`M134 Minigun`, 5, 100, `.308`, 1000, 2, `Auto only. Rapid. Mounted.`, 8),
    // / new Gear(`M203 Launcher`, `varies`, 25, `40mm`, 1, 2, `2h GUN ACCESSORY.`, 2),
    // / new Gear(`M249 SAW`, 4, 100, `5.56`, 100, 2, `Auto. Rapid.`, 5),
    // / new Gear(`Medusa 47`, `2, 3`, `9mm, .357`, `6cyl`, 1, `Revolver. Multi-Caliber.`, 2),
    // / new Gear(`Saiga-12`, 6, 15, `12g`, `12cap`, 2, `Rapid. Scatter.`, 4),
    // / new Gear(`Slingshot`, 1, 5, `Rocks`, 1, 2, `Blunt. DMG Mod.`, 1),
    // / new Gear(`Speargun`, 4, 5, `Arrow + Rope`, 1, 2, `Pierce. 2 round Reload.`, 4),
    // / new Gear(`Uzi`, 2, 10, `9mm`, `30cap`, 2, `Auto. Rapid. -1 RATK.`, 3),
    // / new Gear(`W. P. Grenade`, `d6x3`, 3, `Grenade`, 1, 1, `6yd Blast. Blind. d6 rounds.`, 1),

    var WeaponsList = {
    	name: `Weapons`,
    	list: [
    		...MeleeWeaponsList.list,
    		...RangedWeaponsList.list,
    	]
    };

    const FavoriteWeapon = new Ability({
    	id: ``,
    	name: `Favorite Weapon`,
    	desc: [
    		`Any Botch with a specified weapon type is reduced in severity to a normal Fail.`,
    	],
    	max: 1,
    	experience: 3,
    	opts: WeaponsList
    });

    const HyperImmunity = new Ability({
    	id: ``,
    	name: `Hyper Immunity`,
    	desc: [
    		`+1 to resist Diseases.`,
    	],
    	max: 3,
    	experience: 3
    });

    const PackMentality = new Ability({
    	id: ``,
    	name: `Pack Mentality`,
    	desc: [
    		`+1 Attack at a target a Comrade Attacks this round.`,
    	],
    	max: 1,
    	experience: 3
    });

    const Leadership = new Rule({
    	name: `Leadership`,
    	desc: [
    		`Directing the efforts of others`,
    		`Modifiers from multiple uses of the same Leadership Specialty do not stack.`,
    	],
    	type: `Skill`
    });
    Leadership.parent = `Demeanor`;
    Leadership.diff = `Demeanor`;
    Leadership.specs = {
    	encourage: new Rule({
    		id: `95b70f3c-d67e-41ae-99ff-2d5864356a59`,
    		name: `Encourage`,
    		desc: [
    			`Roll vs [total target(s) Demeanor].`,
    			`Target(s) get a bonus = [your Demeanor] to one roll you choose.`,
    		]
    	}),
    	intimidate: new Rule({
    		id: `ff3e883c-2952-459e-8dbf-d3f666383ec9`,
    		name: `Intimidate`,
    		desc: [
    			`Roll vs [total target(s) Demeanor].`,
    			`Target(s) take a penalty = [your Demeanor] to any roll except one you choose.`
    		]
    	})
    };

    const Perform = new Rule({
    	name: `Perform`,
    	desc: [
    		`Captivating an audience.`,
    	],
    	type: `Skill`
    });
    Perform.parent = `Demeanor`;
    Perform.diff = `Perception`;
    Perform.specs = {
    	distract: new Rule({
    		id: `e0029c54-6812-4b0d-b143-f1f8dbc806b0`,
    		name: `Distract`,
    		desc: [
    			`Target is Defenseless for 1 round.`,
    		]
    	}),
    	deceive: new Rule({
    		id: `f6ded447-ec92-4720-8f68-812e8d3a02f5`,
    		name: `Deceive`,
    		desc: [
    			`Target believes your plausible falsehood.`,
    		]
    	})
    };

    const Socialize = new Rule({
    	name: `Socialize`,
    	desc: [
    		`Alter a person’s Attitude by one step.`,
    	],
    	type: `Skill`
    });
    Socialize.parent = `Demeanor`;
    Socialize.diff = `Demeanor`;
    Socialize.specs = {
    	persuade: new Rule({
    		id: `8ad47e9b-a223-455f-9499-72a012509577`,
    		name: `Persuade`,
    		desc: [
    			`(d6mins) Target seriously considers your opinion.`,
    		]
    	}),
    	therapy: new Rule({
    		id: `83398ae1-5fad-45ef-a523-09d2b403ac7c`,
    		name: `Therapy`,
    		desc: [
    			`Heal 1 Trauma`,
    			`Cannot be performed again on the same target for one week.`,
    			`d6 Trauma on a Botch.`,
    		]
    	})
    };

    const Tame = new Rule({
    	name: `Tame`,
    	desc: [
    		`Alter an animal’s Attitude by one step.`,
    	],
    	type: `Skill`
    });
    Tame.parent = `Demeanor`;
    Tame.diff = `Demeanor`;
    Tame.specs = {
    	command: new Rule({
    		id: `81e355cf-c841-4c88-802b-1d4c170ef741`,
    		name: `Command`,
    		desc: [
    			`Animal obeys your command.`,
    		]
    	}),
    	train: new Rule({
    		id: `ee8cc929-151e-4f6c-abff-293379d5ee53`,
    		name: `Train`,
    		desc: [
    			`(1wk) Animals learn commands = [its Brains x 2].`,
    		]
    	})
    };

    var DemeanorSkillsList = [
    	Leadership,
    	Perform,
    	Socialize,
    	Tame,
    ];

    var SkillsList = {
    	name: `Skills`,
    	list: [
    		...AgilitySkillsList,
    		...BrainsSkillsList,
    		...ConstitutionSkillsList,
    		...DemeanorSkillsList,
    	],
    	groups: [
    		{
    			name: `Agility`,
    			list: AgilitySkillsList
    		},
    		{
    			name: `Brains`,
    			list: BrainsSkillsList
    		},
    		{
    			name: `Constitution`,
    			list: ConstitutionSkillsList
    		},
    		{
    			name: `Demeanor`,
    			list: DemeanorSkillsList
    		},
    	]
    };

    let specs = Object.values(SkillsList.list)
    					.map((s) => Object.values(s.specs))
    					.reduce((a, b) => a.concat(b), []);

    specs = Alphabetize(specs);

    const startingPoints$1 = (c) => c.traits.brains.score * 6;

    const assign$1 = (c, target) => {
    	c.skills[target.name].score = parseInt(target.value);
    	return limit$1(c, target.name)
    };

    const limit$1 = (c, targetName) => {
    	const max = c.traits[c.skills[targetName].parent.toLowerCase()].score;
    	while(remaining$1(c) < 0 || c.skills[targetName].score > max) {
    		c.skills[targetName].score--;
    	}
    	return c
    };

    const remaining$1 = (c) => {
    	let spent = 0;
    	Object.keys(c.skills).forEach(s => spent += c.skills[s].score);
    	return startingPoints$1(c) - spent
    };

    var Skills = {
    	name: `Skills`,
    	text: [
    		`You get Brains x 6 Skill points.`,
    		`Skills range from 0 to 6.`,
    		`Skill rolls are [d6 + Skill].`,
    		`Trait scores set the limit for their Skills.`,
        ],
        specialtyExplanation: [
            `Specialties (listed below their Skills) equal their parent Skill by default.`,
            `Specialties can exceed the parent Skill by taking the Specialize Ability.`,
            `Unless otherwise noted, a Skill takes one Action.`,
        ],
        skillFlowExplanation: [
            `Once per month (in-game), transfer 1 point from a Skill you have not used to one that you have used.`
        ],
    	specs,
    	startingPoints: startingPoints$1,
    	assign: assign$1,
    	limit: limit$1,
    	remaining: remaining$1
    };

    const Specialize = new Ability({
    	id: ``,
    	name: `Specialize`,
    	desc: [
    		`+1 to a Skill Specialty.`,
    	],
    	max: 1,
    	experience: 3,
    	opts: Skills.specs
    });

    const TacticalReload = new Ability({
    	id: ``,
    	name: `Tactical Reload`,
    	desc: [
    		`Free Reload once per round.`,
    	],
    	max: 1,
    	experience: 3
    });

    const WeaponTraining = new Ability({
    	id: ``,
    	name: `Weapon Training`,
    	desc: [
    		`+1 Attack with a specified weapon type.`,
    	],
    	max: 1,
    	experience: 3,
    	opts: WeaponsList
    });

    var XP3AbilitiesList = [
    	FavoriteWeapon,
    	HyperImmunity,
    	PackMentality,
    	Specialize,
    	TacticalReload,
    	WeaponTraining,
    ];

    const EfficientWork = new Ability({
    	id: ``,
    	name: `Efficient Work`,
    	desc: [
    		`[Time / 2] for one of the following Skills (minimum 1 action): Build, Larceny, Medicine, Science, Survival, or Tame.`
    	],
    	max: 1,
    	experience: 6,
    	opts: [
    		Build,
    		Larceny,
    		Medicine,
    		Science,
    		Survival,
    		Tame
    	]
    });

    const FastDraw = new Ability({
    	id: ``,
    	name: `Fast Draw`,
    	desc: [
    		`Free item draw once per round.`,
    	],
    	max: 1,
    	experience: 6
    });

    const FleetFooted = new Ability({
    	id: ``,
    	name: `Fleet Footed`,
    	desc: [
    		`+1 Speed.`,
    	],
    	max: 3,
    	experience: 6
    });

    var LanguageList = [
    	'Arabic',
    	'Chinese',
    	'English',
    	'French',
    	'German',
    	'Hindi',
    	'Indonesian',
    	'Italian',
    	'Japanese',
    	'Korean',
    	'Latin',
    	'Morse Code',
    	'Persian',
    	'Portuguese',
    	'Russian',
    	'Sign Language',
    	'Spanish',
    	'Vietnamese'
    ];

    const Multilingual = new Ability({
    	id: ``,
    	name: `Multilingual`,
    	desc: [
    		`Learn a new form of communication.`,
    	],
    	max: 1,
    	experience: 6,
    	opts: LanguageList
    });

    const Practice = new Ability({
    	id: ``,
    	name: `Practice`,
    	desc: [
    		`+1 to a Skill (up to the parent Trait).`,
    	],
    	max: 1,
    	experience: 6,
    	opts: SkillsList.list
    });

    const VehicleOperation = new Ability({
    	id: ``,
    	name: `Vehicle Operation`,
    	desc: [
    		`Proficiently operate a class of vehicle.`,
    	],
    	max: 1,
    	experience: 6
    });

    var XP6AbilitiesList = [
    	EfficientWork,
    	FastDraw,
    	FleetFooted,
    	Multilingual,
    	Practice,
    	VehicleOperation,
    ];

    const Fortunate = new Ability({
    	id: ``,
    	name: `Fortunate`,
    	desc: [
    		`+1 Luck.`,
    	],
    	max: 1,
    	experience: 9
    });

    const FreeRunning = new Ability({
    	id: ``,
    	name: `Free Running`,
    	desc: [
    		`Acrobatics 9# to Climb your Speed as a Movement action.`,
    	],
    	max: 1,
    	experience: 9
    });

    const PainTolerance = new Ability({
    	id: ``,
    	name: `Pain Tolerance`,
    	desc: [
    		`Ignore 1 Pain penalty.`,
    	],
    	max: 3,
    	experience: 9
    });

    const SituationalAwareness = new Ability({
    	id: ``,
    	name: `Situational Awareness`,
    	desc: [
    		`+1 to Reflexive Defenses.`,
    	],
    	max: 1,
    	experience: 9
    });

    const Tenacity = new Ability({
    	id: ``,
    	name: `Tenacity`,
    	desc: [
    		`Reduce any Trauma by 1.`
    	],
    	max: 3,
    	experience: 9
    });

    const Unorthodox = new Ability({
    	id: ``,
    	name: `Unorthodox`,
    	desc: [
    		`Pick a new parent Trait for a Skill.`,
    	],
    	max: 1,
    	experience: 9,
    	opts: (function() {
    		const uList = [];
    		TraitsList.list.forEach((trait) => {
    			SkillsList.list.forEach((skill) => {
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

    var XP9AbilitiesList = [
    	Fortunate,
    	FreeRunning,
    	PainTolerance,
    	SituationalAwareness,
    	Tenacity,
    	Unorthodox,
    ];

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

    const listBuilder = (list) => {
    	const newList = [];
    	for (let i = 0; i < list.length; ++i) {
    		if (list[i].opts[0]) {
    			for (let o = 0; o < list[i].opts.length; ++o) {
    				const newAbility = new Ability({
    					name: list[i].name,
    					desc: list[i].desc,
    					max: list[i].max,
    					experience: list[i].XP,
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
    				name: list[i].name,
    				desc: list[i].desc,
    				max: list[i].max,
    				experience: list[i].XP,
    				taken: list[i].taken
    			});
    			newList.push(newAbility);
    		}
    	}
    	return Alphabetize(newList)
    };

    var AbilitiesList = {
    	name: `Abilities`,
    	list: Alphabetize(abilityArray),
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
    	masterList: listBuilder(abilityArray),
    	reset() {
    		for (let i = 0; i < this.masterList.length; i++) {
    			this.masterList[i].taken = 0;
    		}
    	}
    };

    const Bayonet = new Gear({
    	id: ``,
    	name: `Bayonet`,
    	type: `Accessory`,
    	desc: [
    		`Counts as a Knife.`,
    		`+1 Damage and Pierce for Melee Attacks.`,
    	],
    	sz: 1
    });

    const Bipod = new Gear({
    	id: ``,
    	name: `Bipod`,
    	type: `Accessory`,
    	desc: [
    		`Ignore Size requirement.`,
    		`1 round setup.`,
    	],
    	sz: 1
    });

    const DrumMagazine = new Gear({
    	id: ``,
    	name: `Drum Magazine`,
    	type: `Accessory`,
    	desc: [
    		`Gun specific.`,
    		`3x Ammo magazine capacity.`,
    	],
    	sz: 1
    });

    const Foregrip = new Gear({
    	id: ``,
    	name: `Foregrip`,
    	type: `Accessory`,
    	desc: [
    		`-1 Size requirement for 2h Gun.`,
    	],
    	sz: 0
    });

    const Holosight = new Gear({
    	id: ``,
    	name: `Holosight`,
    	type: `Accessory`,
    	desc: [
    		`+1 to Ranged Attacks.`,
    	],
    	sz: 0
    });
    Holosight.dur = 28800;

    const Laser = new Gear({
    	id: ``,
    	name: `Laser`,
    	type: `Accessory`,
    	desc: [
    		`+1 to Ranged Attacks.`,
    		`Make a Called Shot Ranged Attack at the Head to Blind for d6 rounds.`,
    	],
    	sz: 0
    });
    Laser.dur = 14400;

    const Scope = new Gear({
    	id: ``,
    	name: `Scope`,
    	type: `Accessory`,
    	desc: [
    		`+3 to Aimed Ranged Attacks and Perception(See).`,
    	],
    	sz: 1
    });

    const SinglePointSling = new Gear({
    	id: ``,
    	name: `Single-Point Sling`,
    	type: `Accessory`,
    	desc: [
    		`Draw or stow a 2h Gun without using an Action.`,
    	],
    	sz: 0
    });

    const Suppressor = new Gear({
    	id: ``,
    	name: `Suppressor`,
    	type: `Accessory`,
    	desc: [
    		`Firing a Gun does not break Concealment.`,
    	],
    	sz: 1
    });

    var AccessoriesList = {
    	name: `Accessories`,
    	list: [
    		Bayonet,
    		Bipod,
    		DrumMagazine,
    		Foregrip,
    		Holosight,
    		Laser,
    		Scope,
    		SinglePointSling,
    		Suppressor,
    	]
    };

    const Buckshot12g = new Gear({
    	id: ``,
    	name: `12g Buckshot`,
    	type: `Ammo`,
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
    	id: ``,
    	name: `Slug`,
    	desc: [
    		`Range x2.`,
    	]
    });

    const Slug12g = new Gear({
    	id: ``,
    	name: `12g Slug`,
    	type: `Ammo`,
    	desc: [
    		`Single-projectile ammunition.`,
    	],
    	sz: 0.05,
    	attr: [
    		Slug,
    	]
    });
    Slug12g.cal = `12g`;

    var Ammo12gList = {
    	name: `12g Ammo`,
    	list: [
    		Buckshot12g,
    		Slug12g,
    	]
    };

    const HollowPoint = new Rule({
    	id: ``,
    	name: `Hollow Point`,
    	desc: [
    		`+1 Damage.`,
    		`-1 Penetration.`
    	]
    });

    const HollowPoint22 = new Gear({
    	id: ``,
    	name: `.22 Hollow Point`,
    	type: `Ammo`,
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
    	id: ``,
    	name: `Match`,
    	desc: [
    		`+1 Ranged Attack.`,
    	]
    });

    const Match22 = new Gear({
    	id: ``,
    	name: `.22 Match`,
    	type: `Ammo`,
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
    	id: ``,
    	name: `.22 Standard`,
    	type: `Ammo`,
    	desc: [
    		`Basic ammunition.`,
    	],
    	sz: 0.005
    });
    Standard22.cal = `.22`;

    var Ammo22List = {
    	name: `.22 Ammo`,
    	list: [
    		HollowPoint22,
    		Match22,
    		Standard22,
    	]
    };

    const ArmorPiercing308 = new Gear({
    	id: ``,
    	name: `.308 Armor Piercing`,
    	type: `Ammo`,
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
    	id: ``,
    	name: `.308 Hollow Point`,
    	type: `Ammo`,
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
    	id: ``,
    	name: `.308 Match`,
    	type: `Ammo`,
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
    	id: ``,
    	name: `.308 Standard`,
    	type: `Ammo`,
    	desc: [
    		`Basic ammunition.`,
    	],
    	sz: 0.02
    });
    Standard308.cal = `.308`;

    var Ammo308List = {
    	name: `.308 Ammo`,
    	list: [
    		ArmorPiercing308,
    		HollowPoint308,
    		Match308,
    		Standard308,
    	]
    };

    const HollowPoint357 = new Gear({
    	id: ``,
    	name: `.357 Hollow Point`,
    	type: `Ammo`,
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
    	id: ``,
    	name: `.357 Standard`,
    	type: `Ammo`,
    	desc: [
    		`Basic ammunition.`,
    	],
    	sz: 0.01
    });
    Standard357.cal = `.357`;

    var Ammo357List = {
    	name: `.357 Ammo`,
    	list: [
    		HollowPoint357,
    		Standard357,
    	]
    };

    const HollowPoint45 = new Gear({
    	id: ``,
    	name: `.45 Hollow Point`,
    	type: `Ammo`,
    	desc: [
    		`Self-defense ammunition.`,
    	],
    	sz: 0.01,
    	attr: [
    		HollowPoint,
    	]
    });
    HollowPoint45.cal = `.45`;

    const Match45 = new Gear({
    	id: ``,
    	name: `.45 Match`,
    	type: `Ammo`,
    	desc: [
    		`Competition-grade ammunition.`,
    	],
    	sz: 0.01,
    	attr: [
    		Match,
    	]
    });
    Match45.cal = `.45`;

    const Standard45 = new Gear({
    	id: ``,
    	name: `.45 Standard`,
    	type: `Ammo`,
    	desc: [
    		`Basic ammunition.`,
    	],
    	sz: 0.01
    });
    Standard45.cal = `.45`;

    var Ammo45List = {
    	name: `.45 Ammo`,
    	list: [
    		HollowPoint45,
    		Match45,
    		Standard45,
    	]
    };

    const ArmorPiercing556 = new Gear({
    	id: ``,
    	name: `5.56mm Armor Piercing`,
    	type: `Ammo`,
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
    	id: ``,
    	name: `5.56mm Hollow Point`,
    	type: `Ammo`,
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
    	id: ``,
    	name: `5.56mm Match`,
    	type: `Ammo`,
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
    	id: ``,
    	name: `5.56mm Standard`,
    	type: `Ammo`,
    	desc: [
    		`Basic ammunition.`,
    	],
    	sz: 0.02
    });
    Standard556.cal = `5.56`;

    var Ammo556List = {
    	name: `5.56 Ammo`,
    	list: [
    		ArmorPiercing556,
    		HollowPoint556,
    		Match556,
    		Standard556,
    	]
    };

    const HollowPoint762 = new Gear({
    	id: ``,
    	name: `7.62mm Hollow Point`,
    	type: `Ammo`,
    	desc: [
    		`Self-defense ammunition.`,
    	],
    	sz: 0.02,
    	attr: [
    		HollowPoint,
    	]
    });
    HollowPoint762.cal = `7.62`;

    const Standard762 = new Gear({
    	id: ``,
    	name: `7.62mm Standard`,
    	type: `Ammo`,
    	desc: [
    		`Basic ammunition.`,
    	],
    	sz: 0.02
    });
    Standard762.cal = `7.62`;

    var Ammo762List = {
    	name: `7.62 Ammo`,
    	list: [
    		HollowPoint762,
    		Standard762,
    	]
    };

    const HollowPoint9mm = new Gear({
    	id: ``,
    	name: `9mm Hollow Point`,
    	type: `Ammo`,
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
    	id: ``,
    	name: `9mm Match`,
    	type: `Ammo`,
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
    	id: ``,
    	name: `9mm Standard`,
    	type: `Ammo`,
    	desc: [
    		`Basic ammunition.`,
    	],
    	sz: 0.01
    });
    Standard9mm.cal = `9mm`;

    var Ammo9mmList = {
    	name: `9mm Ammo`,
    	list: [
    		HollowPoint9mm,
    		Match9mm,
    		Standard9mm,
    	]
    };

    const Broadhead = new Rule({
    	id: ``,
    	name: `Broadhead`,
    	desc: [
    		`+1 Damage.`,
    	]
    });

    const ArrowBroadhead = new Gear({
    	id: ``,
    	name: `Broadhead Arrow`,
    	type: `Ammo`,
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
    	id: ``,
    	name: `Target Arrow`,
    	type: `Ammo`,
    	desc: [
    		`Practice arrow.`,
    	],
    	sz: 0.1
    });
    ArrowTarget.cal = `Arrow`;

    var AmmoArrowList = {
    	name: `Arrow List`,
    	list: [
    		ArrowBroadhead,
    		ArrowTarget,
    	]
    };

    var AmmoList = {
    	name: `Ammo`,
    	list: [
    		...Ammo12gList.list,
    		...Ammo22List.list,
    		...Ammo308List.list,
    		...Ammo357List.list,
    		...Ammo45List.list,
    		...Ammo556List.list,
    		...Ammo762List.list,
    		...Ammo9mmList.list,
    		...AmmoArrowList.list,
    	]
    };


    // OLD AMMO
    // new Gear(`.22`,	 `Tracer`,			`+1 Auto RAttack.`,.005),
    // new Gear(`12g`,	 `Birdshot`,		  `Basic ammo. Scatter.`,.05),
    // new Gear(`12g`,	 `Flare`,			 `3 Fire Damage/round for 3 rounds. 50yd light radius.`,.05),
    // new Gear(`12g`,	 `Rubber`,			`Blunt.`,.05),
    // new Gear(`5.56`,	 `Tracer`,			`+1 Auto RATK.`,.02),

    const AthleticHelmet = new Gear({
    	id: ``,
    	name: `Athletic Helmet`,
    	sz: 2,
    	type: `Armor`
    });
    AthleticHelmet.dr = 1;
    AthleticHelmet.loc = `Head`;

    const AthleticPads = new Gear({
    	id: ``,
    	name: `Athletic Pads`,
    	sz: 2,
    	type: `Armor`
    });
    AthleticPads.dr = 1;
    AthleticPads.loc = `Torso`;

    const Camo = new Rule({
    	id: ``,
    	name: `Camo`,
    	desc: [
    		`+1 Stealth per Body Part when in a given Biome.`,
    	]
    });

    const FireResistance = new Rule({
    	id: ``,
    	name: `Fire Resistance`,
    	desc: [
    		`Armor Absorption reduces Fire Damage.`,
    	]
    });

    const CombatHelmet = new Gear({
    	id: ``,
    	name: `Combat Helmet`,
    	sz: 2,
    	attr: [
    		Camo,
    		FireResistance,
    	],
    	type: `Armor`
    });
    CombatHelmet.dr = 2;
    CombatHelmet.loc = `Head`;

    const ColdResistance = new Rule({
    	id: ``,
    	name: `Cold Resistance`,
    	desc: [
    		`Delay Hypothermia for 1hr per Body Part.`,
    	]
    });

    const Coveralls = new Gear({
    	id: ``,
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
    	id: ``,
    	name: `Mask`,
    	desc: [
    		`Obscures identity and protects face. -1 Perception.`,
    	]
    });

    const FirefighterSuit = new Gear({
    	id: ``,
    	name: `Firefighter Suit`,
    	sz: 5,
    	attr: [
    		ColdResistance,
    		FireResistance,
    		Mask,
    	],
    	type: `Armor`
    });
    FirefighterSuit.dr = 1;
    FirefighterSuit.loc = `Full Body`;

    const FlakJacket = new Gear({
    	id: ``,
    	name: `Flak Jacket`,
    	sz: 3,
    	attr: [
    		Camo,
    	],
    	type: `Armor`
    });
    FlakJacket.dr = 2;
    FlakJacket.loc = `Torso`;

    const GhillieSuit = new Gear({
    	id: ``,
    	name: `Ghillie Suit`,
    	sz: 3,
    	attr: [
    		Camo,
    		ColdResistance,
    	],
    	type: `Armor`
    });
    GhillieSuit.dr = 1;
    GhillieSuit.loc = `Full Body`;

    const Impermeable = new Rule({
    	id: ``,
    	name: `Impermeable`,
    	desc: [
    		`Automatic Success to resist exposure to Diseases and Toxins.`,
    	]
    });

    const HazmatSuit = new Gear({
    	id: ``,
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
    	id: ``,
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
    	id: ``,
    	name: `Kevlar Vest`,
    	sz: 3,
    	attr: [
    		ColdResistance,
    		FireResistance,
    	],
    	type: `Armor`
    });
    KevlarVest.dr = 2;
    KevlarVest.loc = `Torso`;

    const LeatherJacket = new Gear({
    	id: ``,
    	name: `Leather Jacket`,
    	sz: 2,
    	type: `Armor`
    });
    LeatherJacket.dr = 1;
    LeatherJacket.loc = `Arms, Torso`;

    const MotorcycleHelmet = new Gear({
    	id: ``,
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
    	id: ``,
    	name: `Plate Carrier`,
    	sz: 3,
    	attr: [
    		Camo,
    		ColdResistance,
    		FireResistance,
    	],
    	type: `Armor`
    });
    PlateCarrier.dr = 3;
    PlateCarrier.loc = `Torso`;

    const WinterCoat = new Gear({
    	id: ``,
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
    	id: ``,
    	name: `Work Gloves`,
    	sz: 0,
    	attr: [
    		FireResistance,
    	],
    	type: `Armor`
    });
    WorkGloves.dr = 1;
    WorkGloves.loc = `Arms`;

    var ArmorList = {
    	name: `Armor`,
    	list: [
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
    	]
    };



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

    var AmmoAttributesList = {
    	name: `Ammo Attributes`,
    	list: [
    		Broadhead,
    		HollowPoint,
    		Match,
    		Slug,
    	]
    };

    var ArmorAttributesList = {
    	name: `Armor Attributes`,
    	list: [
    		Camo,
    		ColdResistance,
    		FireResistance,
    		Impermeable,
    		Mask,
    	]
    };

    const Blast = new Rule({
    	id: ``,
    	name: `Blast`,
    	desc: [
    		`Roll [d6 vs Reflexive Dodge] against everyone in the Blast radius.`,
    		`[Damage / 2] on a miss (minimum 1).`,
    	]
    });

    const FireDamage$1 = new Rule({
    	id: ``,
    	name: `Fire Damage`,
    	desc: [
    		`Fire Damage can only be prevented with Fire Resistant Armor.`,
    	]
    });

    const ShortBarrel = new Rule({
    	id: ``,
    	name: `Short-Barrel`,
    	desc: [
    		`[Range / 2] and [Size / 2].`,
    	]
    });

    var WeaponAttributesList = {
    	name: `Weapon Attributes`,
    	list: [
    		OneHanded,
    		TwoHanded,
    		Auto,
    		Blast,
    		Blunt,
    		Chop,
    		FireDamage$1,
    		Pierce,
    		Rapid,
    		Shield,
    		Scatter,
    		ShortBarrel,
    		Slow,
    	]
    };

    var AttributesList = {
    	name: `Attributes`,
    	list: Alphabetize([
    		...AmmoAttributesList.list,
    		...ArmorAttributesList.list,
    		...WeaponAttributesList.list,
    	])
    };

    const Blind = new Rule({
    	name: `Blind`,
    	desc: [
    		`You are considered to be Defenseless.`,
    		`You automatically Fail any Perception roll that involves seeing.`,
    		`You have a -6 penalty to all other rolls that involve seeing.`,
    		`This includes Attacks, in which case all opponents are considered to be Concealed from you.`,
    	],
    	type: `Status`
    });

    const Stun = new Rule({
    	name: `Stun`,
    	desc: [
    		`Defenseless, Harmless, and Immobilized.`,
    		`You fall Prone if Stunned for longer than 1 round.`,
    	],
    	type: `Status`
    });

    const FlashbangGrenade = new Gear({
    	id: ``,
    	name: `Flashbang Grenade`,
    	type: `Bomb`,
    	desc: [
    		`Stun grenade.`,
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

    const FragGrenade = new Gear({
    	id: ``,
    	name: `Frag Grenade`,
    	type: `Bomb`,
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

    const MolotovCocktail = new Gear({
    	id: ``,
    	name: `Molotov Cocktail`,
    	type: `Bomb`,
    	desc: [
    		`Glass bottle of fuel with rag wick.`,
    	],
    	sz: 1,
    	attr: [
    		Blast,
    		FireDamage$1,
    	]
    });
    MolotovCocktail.dmg = `1d6`;
    MolotovCocktail.rng = 3;
    MolotovCocktail.fuse = 10;
    MolotovCocktail.dur = 20;
    MolotovCocktail.mix = 3;

    const SmokeGrenade = new Gear({
    	id: ``,
    	name: `Smoke Grenade`,
    	type: `Bomb`,
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
    	name: `Asphyxiation`,
    	desc: [
    		`Constant air supply is required to avoid Asphyxiation.`,
    		`1 Pain per minute without air.`,
    		`This penalty is reduced by 1 per minute with air.`,
    		`Going without air for a number of minutes = [Constitution] is lethal.`,
    	]
    });

    const TeargasGrenade = new Gear({
    	id: ``,
    	name: `Teargas Grenade`,
    	type: `Bomb`,
    	desc: [
    		`Chemical irritant grenade.`,
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
    	id: ``,
    	name: `Thermite`,
    	type: `Bomb`,
    	desc: [
    		`High-temperature incendiary bomb.`,
    	],
    	sz: 1,
    	attr: [
    		Blast,
    		FireDamage$1,
    	]
    });
    Thermite.dmg = `6d6`;
    Thermite.rng = 1;
    Thermite.fuse = 2;
    Thermite.dur = 6;
    Thermite.mix = 6;

    var BombsList = {
    	name: `Bombs`,
    	list: [
    		FlashbangGrenade,
    		FragGrenade,
    		MolotovCocktail,
    		SmokeGrenade,
    		TeargasGrenade,
    		Thermite,
    	]
    };



    // OLD BOMBS
    // new Gear(`Chlorine`,	18, `toxin`,	`1yd/round`,  `d6+3mins`, `Blind. Asphyxiation x2. Stun.`, 1)
    // new Gear(`Claymore`,	18, `d6x9`,	 `30yd`,	 `instant`,  `30yd 90° Blast. Loud.`,		2)
    // new Gear(`Dynamite`,	12, `d6x6`,	 `30yd`,	 `instant`,  `10 round fuse.`,				  1)
    // new Gear(`Firecracker`, 6,  `0`,		`0yd`,	  `d6+3 rounds`, `Mimics sound of gunfire.`,	 0)
    // new Gear(`Landmine`,	15, `d6x6`,	 `3yd`,	  `instant`,  ``,							 2)
    // new Gear(`Sky Rocket`,  12, `d6x3`,	 `60yd`,	 `instant`,  `-1 RATK. Range:50. Blind.`,	  1)

    var DeleteCharacter = (name) => {
    	window.localStorage.removeItem(name);
    };

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
    		this.type = type;
    		this.value = value;
    	}
    }

    const Age = new Descriptor({
    	name: `Age`,
    	value: ``
    });

    const Hair = new Descriptor({
    	name: `Hair`,
    	value: ``
    });

    const Height = new Descriptor({
    	name: `Height`,
    	value: ``
    });

    const Name = new Descriptor({
    	name: `Name`,
    	value: ``
    });

    const Sex = new Descriptor({
    	name: `Sex`,
    	value: ``
    });

    var RandomRoll = (array) => array[Math.floor(Math.random() * array.length)];

    var RandomSkin = _ => RandomRoll([
    	`Dark`,
    	`Bronze`,
    	`Olive`,
    	`Tan`,
    	`Fair`,
    	`Pale`
    ]);

    const Skin = new Descriptor({
    	name: `Skin`,
    	value: ``
    });

    var RandomWeight = (c) => {
        let feet = parseInt(c.description.height.value.slice(
            0,
            c.description.height.value.indexOf('ft')
        ));

        let inches = parseInt(c.description.height.value.slice(
            c.description.height.value.indexOf(' '),
            c.description.height.value.indexOf('in')
        ));

        let totalInches = (feet * 12) + inches;

        let totalPounds;

    	if (c.description.sex.value == `Male`) {
    		totalPounds = Math.ceil((Math.random() * 30) + (totalInches * 2.25));
    	}
    	else if (c.description.sex.value == `Female`) {
    		totalPounds = Math.ceil((Math.random() * 20) + (totalInches * 2));
    	}
    	else {
    		totalPounds = Math.ceil((Math.random() * 25) + (totalInches * 2.125));
        }

    	return `${totalPounds}lbs`
    };

    const Weight = new Descriptor({
    	name: `Weight`,
    	value: ``,
    	random: (c) => {
    		c.description.weight.value = RandomWeight();
    		return c
    	}
    });

    var DescriptionList = {
    	name: `Description`,
    	list: [
    		Name,
    		Age,
    		Sex,
    		Height,
    		Weight,
    		Skin,
    		Hair,
    	]
    };

    const Deflection = new Rule({
    	name: `Deflection`,
    	desc: [
    		`Deflection = (Brains + Constitution) / 2.`,
    		`This is your default Defense against Melee Attacks when you do not spend and Action to make a Melee(Block) roll.`
    	],
    	formula: (c) => c.properties.deflection.score = Math.floor((c.traits.brains.score + c.traits.constitution.score) / 2),
    	type: `Property`
    });

    const Discipline = new Rule({
    	name: `Discipline`,
    	desc: [
    		`Discipline = (Constitution + Demeanor) / 2.`,
    		`This is the amount of Pain you can ignore before you start taking penalties.`
    	],
    	formula: (c) => c.properties.discipline.score = Math.floor((c.traits.constitution.score + c.traits.demeanor.score) / 2),
    	type: `Property`
    });

    const Endurance = new Rule({
    	name: `Endurance`,
    	desc: [
    		`Endurance = Constitution x 3`,
    		`Taking any number of Actions in a round (up to a maximum of 3 Actions) costs 1 Endurance for the round.`,
    		`For every round in which you do not take any Actions, you regain Endurance equal to your Fitness score.`,
    		`This is also the maximum amount of total Size you can move with comfortably.`,
    		`1 Pain per Size carried beyond your current Endurance.`,
    	],
    	formula: (c) => c.properties.endurance.score = c.traits.constitution.score * 3,
    	type: `Property`
    });

    const Evasion = new Rule({
    	name: `Evasion`,
    	desc: [
    		`Evasion = (Agility + Brains) / 2.`,
    		`This is your default Defense against Ranged Attacks when you do not spend and Action to make an Acrobatics(Dodge) roll.`
    	],
    	formula: (c) => c.properties.evasion.score = Math.floor((c.traits.agility.score + c.traits.brains.score) / 2),
    	type: `Property`
    });

    const Experience = new Rule({
    	name: `Experience`,
    	desc: [
    		`Experience Points (XP) = Brains x 3`,
    		`XP represents how much you have learned up to now.`,
    		`You get additional XP = Intellect for each game session you survive.`,
    		`You also get +1 XP every time you roll a Botch.`,
    		`The Narrator may choose to give bonus XP.`,
    		`You may spend XP to buy Abilities to improve your Character.`,
    		`You may also spend 1XP per round to regain 1 Luck Point.`,
    	],
    	formula: (c) => c.properties.experience.score = c.traits.brains.score * 3,
    	type: `Property`
    });

    const Fitness = new Rule({
    	name: `Fitness`,
    	desc: [
    		`Fitness = (Agility + Constitution) / 2`,
    		`This is the rate at which Endurance is regained during rounds where you do not take any Actions.`,
    	],
    	formula: (c) => c.properties.fitness.score = Math.floor((c.traits.agility.score + c.traits.constitution.score) / 2),
    	type: `Property`
    });

    const Intellect = new Rule({
    	name: `Intellect`,
    	desc: [
    		`Intellect = (Brains + Demeanor) / 2`,
    		`Intellect is the amount of XP that is earned automatically for each game session that you survive.`,
    	],
    	formula: (c) => c.properties.intellect.score = Math.floor((c.traits.brains.score + c.traits.demeanor.score) / 2),
    	type: `Property`
    });

    const Luck = new Rule({
    	name: `Luck`,
    	desc: [
    		`Luck = (Agility + Demeanor) / 2`,
    		`Luck rolls [d6 + current Luck points] are made to determine your fate in matters of pure chance.`,
    		`You may spend 1 Luck Point per round in a dramatic moment for one of the three effects listed below.`,
    		`You regain 1 spent Luck Point at dawn each day.`,
    		`• Re-roll the last die you rolled with a +6 bonus.`,
    		`• Take an extra Action on your turn.`,
    		`• Give a Luck point to a Comrade.`,
    	],
    	formula: (c) => c.properties.luck.score = Math.floor((c.traits.agility.score + c.traits.demeanor.score) / 2),
    	type: `Property`
    });

    const Psyche = new Rule({
    	name: `Psyche`,
    	desc: [
    		`Psyche = Demeanor x 3`,
    		`Psyche is a measure of how much Trauma your mind can withstand.`,
    	],
    	formula: (c) => c.properties.psyche.score = c.traits.demeanor.score * 3,
    	type: `Property`
    });

    const Speed = new Rule({
    	name: `Speed`,
    	desc: [
    		`Speed = Agility x 3`,
    		`This is also the number of yards you can Walk as 1 Action.`,
    		`When traveling long distances overland, you can March at [Speed / 2] mph for up to [Constitution x 3] hrs per day.`,
    	],
    	formula: (c) => c.properties.speed.score = c.traits.agility.score * 3,
    	type: `Property`
    });

    var PropertiesList = {
    	name: `Properties`,
    	list: [
    		Evasion,
    		Fitness,
    		Intellect,
    		Discipline,
    		Luck,
    		Deflection,
    		Endurance,
    		Experience,
    		Psyche,
    		Speed,
    	]
    };

    class Character$1 {
    	constructor() {
    		this.meta = {
    			id: ``,
    			user: ``,
    			created: ``,
    			modified: ``,
    			notes: ``,
    			status: [],
    			step: 0,
    			proceed: false,
    			coordinates: {
    				m: ``,
    				f: 0,
    				x: 0,
    				y: 0,
    				z: 0
    			}
    		};
    		this.description = {};
    		for (let desc of DescriptionList.list) {
    			this.description[desc.name.toLowerCase()] = {
    				name: desc.name,
    				value: ``
    			};
    		}
    		this.traits = {};
    		for (let trait of TraitsList.list) {
    			this.traits[trait.name.toLowerCase()] = {
    				name: trait.name,
    				score: 1
    			};
    		}
    		this.skills = {};
    		for (let skill of SkillsList.list) {
    			this.skills[skill.name.toLowerCase()] = {
    				name: skill.name,
    				parent: skill.parent,
    				score: 0,
    				specs: {}
    			};
    			for (let spec in skill.specs) {
    				this.skills[skill.name.toLowerCase()].specs[spec] = {
    					name: spec.name,
    					score: 0
    				};
    			}
    		}
    		this.properties = {};
    		for (let prop of PropertiesList.list) {
    			this.properties[prop.name.toLowerCase()] = {
    				name: prop.name,
    				score: 0,
    				current: 0
    			};
    		}
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
    		};
    		this.abilities = [];
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
    		this.resetDescription = _ => {
    			for (let d in this.description) {
    				if (this.description[d].name != `Player`) this.description[d].value = ``;
    			}
    			return this
    		};
    		this.resetTraits = _ => {
    			for (let t in this.traits) this.traits[t].score = 1;
    			return this
    		};
    		this.resetSkills = _ => {
    			for (let s in this.skills) this.skills[s].score = 0;
    			return this
    		};
    		this.resetAbilities = _ => {
    			AbilitiesList.masterList.forEach(a => a.taken = 0);
    			return this.updateAbilities()
    		};
    		this.resetGear = _ => {
    			for (let g in this.gear) this.gear[g].inventory = [];
    			return this
    		};
    		this.updateAbilities = _ => {
    			this.abilities = [...AbilitiesList.masterList.filter(a => a.taken)];
    			console.log(`Current XP Pre-Reduce = ${this.properties.experience.current}`);
    			this.properties.experience.current = this.abilities.reduce((sum, a) => {
    				console.log(`sum = ${sum}`);
    				console.log(`a.taken = ${a.taken}`);
    				console.log(`a.experience = ${a.experience}`);
    				console.log(`a.taken * a.experience = ${a.taken * a.experience}`);
    				console.log(`sum - (a.taken * a.experience) = ${sum - (a.taken * a.experience)}`);
    				return sum - (a.taken * a.experience)
    			}, this.properties.experience.score);
    			console.log(`Current XP Post-Reduce = ${this.properties.experience.current}`);
    			return this
    		};
    		this.applyAbilities = _ => {
    			for (let a in this.abilities) this.abilities[a].formula(this);
    		};
    		this.setProperties = _ => {
    			for (let p of PropertiesList.list) {
    				p.formula(this);
    			}
    			for (let prop in this.properties) {
    				this.properties[prop].current = this.properties[prop].score;
    			}
    			return this
    		};
    		this.finalize = (userId) => {
    			if (!this.created) this.created = new Date();
    			this.meta.user = userId;
    			this.meta.step = this.limit;
    			this.meta.modified = new Date();
    			return this
    		};
    	}
    }

    const startingPoints = 14;

    const maxPoints = 6;

    const assign = (c, t) => {
    	c.traits[t.name].score = parseInt(t.value);
    	return limit(c, t.name)
    };

    const limit = (c, t) => {
    	while(remaining(c) < 0) c.traits[t].score--;
    	return c
    };

    const remaining = (c) => {
    	let spent = 0;
    	Object.keys(c.traits).forEach(t => spent += c.traits[t].score);
    	return startingPoints - spent
    };

    var Traits = {
    	name: `Traits`,
    	text: [
    		`You get ${startingPoints} Trait points.`,
    		`Traits range from 1 to ${maxPoints}.`,
    		`Trait rolls are [d6 + Trait].`,
    		`Trait scores set the limit for their Skills.`,
    	],
    	startingPoints,
    	maxPoints,
    	assign,
    	limit,
    	remaining
    };

    var Creation = {
    	name: `Creation`,
    	startingGearExplanation: [
    		`You start with some random Gear:`,
    		`One piece of Armor`,
    		`One Melee weapon`,
    		`One Ranged weapon`,
    		`1d6 rounds of Ammo`,
    		`Random items = Luck`,
    	],
    	proceedCheck(c) {
    		return (
    			(c.meta.step == 0 && Object.values(c.description).every(d => d.value)) ||
    			(c.meta.step == 1 && Traits.remaining(c) == 0) ||
    			(c.meta.step == 2 && Skills.remaining(c) == 0) ||
    			(c.meta.step == 3) ||
    			(c.meta.step == 4 && c.properties.experience.current >= 0) ||
    			(c.meta.step == 5 && Object.values(c.gear).every(g => g.inventory.length)) ||
    			(c.meta.step == 6)
    		)
    	},
    };

    var DecompressCharacter = (c) => {

    	let char = new Character$1();

    	char.meta.id = c.Mi;
    	char.meta.user = c.Mu;
    	char.meta.created = c.Mc;
    	char.meta.modified = c.Mm;
    	char.meta.notes = c.Mn;
    	char.meta.status = c.St;
    	char.meta.step = c.Sp;
    	char.meta.coordinates.m = c.Cm;
    	char.meta.coordinates.f = c.Cf;
    	char.meta.coordinates.x = c.Cx;
    	char.meta.coordinates.y = c.Cy;
    	char.meta.coordinates.z = c.Cz;
    	char.description.age.value = c.Da;
    	char.description.name.value = c.Dn;
    	char.description.hair.value = c.Dh;
    	char.description.height.value = c.De;
    	char.description.sex.value = c.Ds;
    	char.description.skin.value = c.Dk;
    	char.description.weight.value = c.Dw;
    	char.traits.agility.score = c.Ta;
    	char.traits.brains.score = c.Tb;
    	char.traits.constitution.score = c.Tc;
    	char.traits.demeanor.score = c.Td;
    	char.skills.acrobatics.score = c.ac;
    	char.skills.larceny.score = c.la;
    	char.skills.ranged.score = c.ra;
    	char.skills.stealth.score = c.st;
    	char.skills.medicine.score = c.md;
    	char.skills.perception.score = c.pe;
    	char.skills.science.score = c.sc;
    	char.skills.survival.score = c.su;
    	char.skills.athletics.score = c.at;
    	char.skills.build.score = c.bu;
    	char.skills.drive.score = c.dr;
    	char.skills.melee.score = c.me;
    	char.skills.leadership.score = c.le;
    	char.skills.perform.score = c.pr;
    	char.skills.socialize.score = c.so;
    	char.skills.tame.score = c.ta;
    	char.properties.luck.current = c.Pl;
    	char.properties.psyche.current = c.Pp;
    	char.health.head.current = c.hD;
    	char.health.rightArm.current = c.rA;
    	char.health.leftArm.current = c.lA;
    	char.health.torso.current = c.tO;
    	char.health.leftLeg.current = c.lL;
    	char.health.rightLeg.current = c.rL;
    	char.abilities = [...c.Ab];
    	char.gear.armor.inventory = [...c.Ga];
    	char.gear.melee.inventory = [...c.Gm];
    	char.gear.ranged.inventory = [...c.Gr];
    	char.gear.ammo.inventory = [...c.Go];
    	char.gear.equipment.inventory = [...c.Ge];

    	char = Creation.setProperties(char);

    	return char

    };

    var ReadAllCharacters = _ => {
    	if (window.localStorage.length) {
    		return Object.keys(window.localStorage).map(c => {
    			const storedCharacter = window.localStorage.getItem(c);
    			const unzippedCharacter = DecompressCharacter(storedCharacter);
    			return unzippedCharacter
    		})
    	}
    	return []
    };

    var ReadCharacter = (name) => {
    	const locallyStoredCharacter = window.localStorage.getItem(name);
    	const jsonParsedCharacter = JSON.parse(locallyStoredCharacter);
    	const decompressedCharacter = DecompressCharacter(jsonParsedCharacter);
    	return decompressedCharacter
    };

    var CompressCharacter = (char) => {

    	let c = {};

    	c.Mi = char.meta.id;
    	c.Mu = char.meta.user;
    	c.Mc = char.meta.created;
    	c.Mm = char.meta.modified;
    	c.Mn = char.meta.notes;
    	c.St = char.meta.status;
    	c.Sp = char.meta.step;
    	c.Cm = char.meta.coordinates.m;
    	c.Cf = char.meta.coordinates.f;
    	c.Cx = char.meta.coordinates.x;
    	c.Cy = char.meta.coordinates.y;
    	c.Cz = char.meta.coordinates.z;
    	c.Da = char.description.age.value;
    	c.Dn = char.description.name.value;
    	c.Dh = char.description.hair.value;
    	c.De = char.description.height.value;
    	c.Ds = char.description.sex.value;
    	c.Dk = char.description.skin.value;
    	c.Dw = char.description.weight.value;
    	c.Ta = char.traits.agility.score;
    	c.Tb = char.traits.brains.score;
    	c.Tc = char.traits.constitution.score;
    	c.Td = char.traits.demeanor.score;
    	c.ac = char.skills.acrobatics.score;
    	c.la = char.skills.larceny.score;
    	c.ra = char.skills.ranged.score;
    	c.st = char.skills.stealth.score;
    	c.md = char.skills.medicine.score;
    	c.pe = char.skills.perception.score;
    	c.sc = char.skills.science.score;
    	c.su = char.skills.survival.score;
    	c.at = char.skills.athletics.score;
    	c.bu = char.skills.build.score;
    	c.dr = char.skills.drive.score;
    	c.me = char.skills.melee.score;
    	c.le = char.skills.leadership.score;
    	c.pr = char.skills.perform.score;
    	c.so = char.skills.socialize.score;
    	c.ta = char.skills.tame.score;
    	c.Pl = char.properties.luck.current;
    	c.Pp = char.properties.psyche.current;
    	c.hD = char.health.head.current;
    	c.rA = char.health.rightArm.current;
    	c.lA = char.health.leftArm.current;
    	c.tO = char.health.torso.current;
    	c.lL = char.health.leftLeg.current;
    	c.rL = char.health.rightLeg.current;
    	c.Ab = [...char.abilities];
    	c.Ga = [...char.gear.armor.inventory];
    	c.Gm = [...char.gear.melee.inventory];
    	c.Gr = [...char.gear.ranged.inventory];
    	c.Go = [...char.gear.ammo.inventory];
    	c.Ge = [...char.gear.equipment.inventory];

    	return JSON.stringify(c)
    };

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

    const character = new Character$1();

    var characterStore = writable(character);

    var SaveCharacter = _ => {
    	let character;
    	characterStore.subscribe(c => character = c);
    	window.localStorage.setItem(character.meta.id, CompressCharacter(character));
    };

    var UpdateCharacter = (character) => {
    	const compressedCharacter = CompressCharacter(character);
    	JSON.stringify(compressedCharacter);
    	SaveCharacter(character.description.name.value);
    };

    // import CreateCharacter from 'database/characters/CreateCharacter.js'

    class Player {
    	constructor() {
    		this.name = '';
    		this.email = '';
    		this.password = '';
    		this.loggedIn = false;
    		this.currentCharacter = false;
    		this.currentCharacterIndex = -1;
    		this.characterList = [];
    	}
    	newCharacter(character) {
    		// CreateCharacter(character)
    		this.characterList.push(character);
    		this.currentCharacterIndex = this.characterList.length - 1;
    		return this
    	}
    	deleteCharacter() {
    		DeleteCharacter(this.characterList[this.currentCharacterIndex]);
    		this.characterList = this.characterList.filter(c => c.description.name.value != characterName);
    		if (this.characterList.length) this.currentCharacterIndex = 0;
    		else this.currentCharacterIndex = null;
    		return this
    	}
    	loadCharacter(characterName) {
    		this.characterList.push(ReadCharacter(characterName));
    		this.currentCharacterIndex = this.characterList.length - 1;
    		return this
    	}
    	loadAllCharacters() {
    		this.characterList = ReadAllCharacters();
    		return this
    	}
    	updateCharacter(character) {
    		this.characterList.push(character);
    		this.currentCharacterIndex = this.characterList.length - 1;
    		UpdateCharacter(character);
    		return this
    	}
    }

    var playerStore = writable(new Player());

    /* src/routes/character.svelte generated by Svelte v3.35.0 */
    const file$12 = "src/routes/character.svelte";

    // (13:4) {:else}
    function create_else_block$a(ctx) {
    	let a;

    	const block = {
    		c: function create() {
    			a = element("a");
    			a.textContent = "New Character";
    			attr_dev(a, "href", "/new");
    			attr_dev(a, "class", "link-btn");
    			add_location(a, file$12, 13, 2, 355);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$a.name,
    		type: "else",
    		source: "(13:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (11:4) {#if $playerStore.currentCharacter}
    function create_if_block$q(ctx) {
    	let a;

    	const block = {
    		c: function create() {
    			a = element("a");
    			a.textContent = "Character Sheet";
    			attr_dev(a, "href", "/sheet");
    			attr_dev(a, "class", "link-btn");
    			add_location(a, file$12, 11, 8, 287);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$q.name,
    		type: "if",
    		source: "(11:4) {#if $playerStore.currentCharacter}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$16(ctx) {
    	let t0;
    	let div;
    	let t1;
    	let backbutton;
    	let current;

    	function select_block_type(ctx, dirty) {
    		if (/*$playerStore*/ ctx[0].currentCharacter) return create_if_block$q;
    		return create_else_block$a;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);
    	backbutton = new BackButton({ props: { path: "/" }, $$inline: true });

    	const block = {
    		c: function create() {
    			t0 = space();
    			div = element("div");
    			if_block.c();
    			t1 = space();
    			create_component(backbutton.$$.fragment);
    			document.title = "Apocalyptia Online - Character";
    			attr_dev(div, "class", "cntr-card");
    			add_location(div, file$12, 9, 0, 215);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);
    			if_block.m(div, null);
    			insert_dev(target, t1, anchor);
    			mount_component(backbutton, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(backbutton.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(backbutton.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div);
    			if_block.d();
    			if (detaching) detach_dev(t1);
    			destroy_component(backbutton, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$16.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$16($$self, $$props, $$invalidate) {
    	let $playerStore;
    	validate_store(playerStore, "playerStore");
    	component_subscribe($$self, playerStore, $$value => $$invalidate(0, $playerStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Character", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Character> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ BackButton, playerStore, $playerStore });
    	return [$playerStore];
    }

    class Character extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$16, create_fragment$16, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Character",
    			options,
    			id: create_fragment$16.name
    		});
    	}
    }

    const Rounds = new Rule({
    	name: `Rounds`, 
    	desc: [
    		`Combat time occurs in 3-second “rounds”.`,
    		`Players have 30 seconds to decide what their Character's Actions will be for the round.`,
    		`Any new Complication or Status modifiers that come into play during a round go into effect at the start of the next round.`,
    	]
    });

    const Actions = new Rule({
    	name: `Actions`, 
    	desc: [
    		`You get 3 Actions per round starting on your turn.`,
    		`Most things cost 1 Action unless otherwise noted.`,
    	]
    });

    const Communication = new Rule({
    	name: `Communication`, 
    	desc: [
    		`You can speak or shout up to 6 words per round.`,
    	]
    });

    const Chase = new Rule({
    	name: `Chase`, 
    	desc: [
    		`When a combatant attempts to flee and another chooses to pursue, they roll opposed [(Acrobatics, Athletics, Drive, or Tame) + Run Speed] each round, depending on the type of mobility in use.`,
    		`The chase ends when one side gets 3 Successes over the other.`,
    	]
    });

    const Movement = new Rule({
    	name: `Movement`, 
    	desc: [
    		`On your turn, you have an amount of Speed equal to your [Agility x3].`,
    		`You can spend Speed to move in any of the ways listed below in any combination.`,
    		`Other Actions can be performed while moving according to the Narrator's discretion.`,
    		` 1) Walk = 1yd / 1 Speed.`,
    		` 2) Run = 2yds / 1 Speed. Unstable.`,
    		` 3) Climb = 1yd / 3 Speed.`,
    		` 4) Swim = 1yd / 6 Speed. Unstable.`,
    		` 5) Stand up = 1 Speed.`,
    		` 6) Drop Prone = 0 Speed.`,
    	]
    });
    Movement.subrules = [
    	Chase,
    ];

    const Attack = new Rule({
    	name: `Attack`, 
    	desc: [
    		`There are two types of Attacks: Melee and Ranged.`,
    		`Spend an Action on your turn to roll [d6 + Melee or Ranged] vs the target's Defense.`,
    		`Rolling a 6 on the die is an Explosion, which is then re-rolled and added cumulatively to the Attack total.`,
    		`Melee Attacks can be Called Shots to any Location on the target's body at no penalty.`,
    		`Ranged Attacks must roll a random Location unless the Called Shot Maneuver is declared.`,
    	]
    });

    const ReflexiveDefense = new Rule({
    	name: `Reflexive Defense`,
    	desc: [
    		`Reflexive Defenses are your default Defenses when you do not spend an Action to actively roll Defense.`,
    		`Reflexive Defenses are equal to the Skill Specialty score they are based on.`,
    		`Use Reflexive Block against Melee Attacks.`,
    		`Use Reflexive Dodge against Ranged Attacks.`,
    	]
    });

    const Defense = new Rule({
    	name: `Defense`, 
    	desc: [
    		`Spend an Action on your enemy's turn to use either type of Defense: Block or Dodge.`,
    		`To Block, roll [d6 + Melee] vs Melee Attacks or Ranged Attacks if using a Shield.`,
    		`To Dodge, roll [d6 + Acrobatics] vs either Melee or Ranged Attacks.`,
    		`Botching a Defense roll makes you fall Prone.`,
    	]
    });
    Defense.subrules = [
    	ReflexiveDefense
    ];

    const Absorption = new Rule({
    	name: `Absorption`, 
    	desc: [
    		`Every piece of Armor offers some amount of Absorption.`,
    		`Absorption reduces the amount of Damage inflicted on any Body Part that piece of Armor is worn upon.`,
    		`Armor loses 1 point of Absorption each time it takes Damage that exceeds it's current Absorption rating.`,
    	]
    });

    const FireDamage = new Rule({
    	name: `Fire Damage`, 
    	desc: [
    		`Each round you take Fire Damage, 1 point is permanent and never heals.`,
    		`Only Fire-Resistant Armor reduces Fire Damage.`,
    	]
    });

    const Pain = new Rule({
    	name: `Pain`, 
    	desc: [
    		`Damage, Trauma, and a few other effects can cause Pain penalties.`,
    		`Each point of Pain is a -1 penalty to all rolls and Speed.`,
    		`Pain penalties fade away as you recover from whatever caused it.`,
    		`You fall Prone if your Speed drops to 0 due to Pain penalties.`,
    	]
    });

    const Recovery = new Rule({
    	name: `Recovery`,
    	desc: [
    		`After 3 days of rest, you have a chance to recover a little bit.`,
    		`Roll to recover both physically (Health) and mentally (Psyche) for this period of rest.`,
    		`Roll [Constitution vs total Damage] to heal 1 Health on a random Damaged Body Part.`,
    		`Roll [Demeanor vs total Trauma] to heal 1 Psyche.`,
    		`On a Failed roll you take 1 additional Damage or Trauma, depending on what you were rolling to Recover.`,
    	]
    });

    const Damage = new Rule({
    	name: `Damage`, 
    	desc: [
    		`Damage temporarily reduces Health.`,
    		`When Head or Torso Health drops to 0, you fall unconscious`,
    		`When an Arm or a Leg's Health drops to 0, you lose the use of that limb.`,
    		`Consciousness and limb functionality are restored once you have healed to at least 1 Health on that Body Part.`,
    		`You die when Head or Torso Health drops to the negative of their scores.`,
    		`You lose the limb when Arm or Leg Health drops to the negative of their scores.`,
    		`Successful Attacks do Damage = [(Attack total - target's Defense) + Weapon Damage] - Armor Absorption.`,
    		`Each point of Damage causes a -1 Pain penalty until healed.`,
    	]
    });
    Damage.subrules = [
    	Absorption,
    	FireDamage,
    	Pain,
    	Recovery,
    ];

    const Trauma = new Rule({
    	name: `Trauma`, 
    	desc: [
    		`Trauma temporarily reduces Psyche.`,
    		`When Psyche drops to 0, you lose all hope and seek out death at the earliest opportunity.`,
    		`Someone must protect you from yourself until you have Recovered at least 1 Psyche.`,
    		`Any number of horrible events could potentially cause Trauma.`,
    		`Minor Trauma generally occurs 1 point at a time.`,
    		`Major Trauma can occur 1d6 or more points at a time.`,
    		`Players and Narrators should talk together to determine how traumatic particular events may be to the character.`,
    		`Each point of Trauma causes a -1 Pain penalty until healed.`,
    	]
    });
    Trauma.subrules = [
    	Pain,
    	Recovery,
    ];

    var CombatList = {
    	name: `Combat`,
    	list: [
    		Rounds,
    		Actions,
    		Communication,
    		Movement,
    		Attack,
    		Defense,
    		Damage,
    		Trauma,
    		// Vehicles,
    	]
    };

    const Dice = new Rule({
    	name: `Dice`,
    	desc: [
    		`When you want your character to do something difficult, tell your Narrator what you would like to try.`,
    		`They will tell you which Trait or Skill is most important for the situation.`,
    		`You then roll one six-sided die ("1d6") and add the appropriate Trait or Skill score to the die result.`,
    		`Many factors may further modify the final Result, such as special equipment that grants a bonus or unfavorable circumstances which impose a penalty.`,
    		`It is the Narrator's job to decide which modifiers will affect your roll and what their magnitude will be.`,
    		`If you feel that your Narrator is not taking some relevant modifiers into consideration, you should make your case briefly before rolling and then defer to their judgment (at least until the session is over).`,
    		`[d6 Roll + Trait or Skill Score ± Modifiers] = Result`,
    	]
    });

    const Difficulty = new Rule({
    	name: `Difficulty`,
    	desc: [
    		`The Result of your roll must be greater than or equal to the Difficulty number to be a Success.`,
    		`If the roll is opposed, re-roll ties.`,
    		`Difficulties are indicated by the # symbol.`,
    		`The Narrator or an opposing roll sets the # for your rolls.`,
    		`3# = Trivial`,
    		`6# = Routine`,
    		`9# = Demanding`,
    		`12# = Strenuous`,
    		`15# = Grueling`,
    		`18# = Extreme`,
    	]
    });

    const Cooperation = new Rule({
    	name: `Cooperation`,
    	desc: [
    		`If Characters want to help each other perform a task, one of them makes the roll and the rest add their Scores together as a Modifier to the main Character’s Result.`,
    		`The Narrator should use their judgement to determine the time to completion.`,
    	]
    });

    const RoteActions = new Rule({
    	name: `Rote Actions`,
    	desc: [
    		`If the roll is unopposed and your [(Score + Modifiers) >= #] before the roll and you can take your time, you Succeed automatically.`,
    	]
    });

    const Success = new Rule({
    	name: `Success`,
    	desc: [
    		`Your roll is a Success when if the Result is greater than or equal to the Difficulty.`,
    		`Re-roll ties on opposed rolls.`,
    		`The degree of Success (the amount by which the Result exceeded the Difficulty) is important for some rolls, such as Attacks when calculating Damage.`,
    	]
    });
    Success.subrules = [
    	RoteActions,
    	Cooperation,
    ];

    const Fail = new Rule({
    	name: `Fail`,
    	desc: [
    		`Your roll is a Fail when the Result is less than the Difficulty.`,
    	]
    });

    const Explode = new Rule({
    	name: `Explode`,
    	desc: [
    		`An Exploding die offers the possibility of doing extraordinarily well at a Trait, Skill, or Property roll.`,
    		`If a 6 is rolled, roll it again and keep rolling as long as the die continues to roll a 6.`,
    		`When the die finally stops Exploding, add all of these rolls together, then add scores and modifiers as usual to get your Result.`,
    	]
    });

    const Botch = new Rule({
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

    var CoreList = {
    	name: `Core`,
    	list: [
    		Dice,
    		Difficulty,
    		Success,
    		Fail,
    		Explode,
    		Botch,
    	]
    };

    /* src/components/character/creator/abilities/AbilityModalItem.svelte generated by Svelte v3.35.0 */
    const file$11 = "src/components/character/creator/abilities/AbilityModalItem.svelte";

    function get_each_context$w(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	child_ctx[6] = i;
    	return child_ctx;
    }

    // (23:3) {#each Array(ability.max+1) as _, i}
    function create_each_block$w(ctx) {
    	let option;
    	let t;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(/*i*/ ctx[6]);
    			option.__value = /*i*/ ctx[6];
    			option.value = option.__value;
    			add_location(option, file$11, 23, 4, 578);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$w.name,
    		type: "each",
    		source: "(23:3) {#each Array(ability.max+1) as _, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$15(ctx) {
    	let div;
    	let span0;

    	let t0_value = (/*ability*/ ctx[0].opts[0]
    	? /*ability*/ ctx[0].opts[0].name
    	: /*ability*/ ctx[0].name) + "";

    	let t0;
    	let t1;
    	let span1;
    	let t2;
    	let select;
    	let select_name_value;
    	let mounted;
    	let dispose;
    	let each_value = Array(/*ability*/ ctx[0].max + 1);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$w(get_each_context$w(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			span0 = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			span1 = element("span");
    			t2 = text("Taken:\n\t\t");
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(span0, "class", "ability-name-label svelte-7mnekp");
    			add_location(span0, file$11, 13, 1, 303);
    			attr_dev(select, "name", select_name_value = /*ability*/ ctx[0].name);
    			attr_dev(select, "class", "svelte-7mnekp");
    			if (/*ability*/ ctx[0].taken === void 0) add_render_callback(() => /*select_change_handler*/ ctx[2].call(select));
    			add_location(select, file$11, 17, 2, 440);
    			attr_dev(span1, "class", "taken-label svelte-7mnekp");
    			add_location(span1, file$11, 16, 1, 405);
    			attr_dev(div, "class", "ability-selection svelte-7mnekp");
    			add_location(div, file$11, 12, 0, 270);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span0);
    			append_dev(span0, t0);
    			append_dev(div, t1);
    			append_dev(div, span1);
    			append_dev(span1, t2);
    			append_dev(span1, select);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			select_option(select, /*ability*/ ctx[0].taken);

    			if (!mounted) {
    				dispose = [
    					listen_dev(select, "change", /*select_change_handler*/ ctx[2]),
    					listen_dev(select, "blur", /*updateAbilities*/ ctx[1], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*ability*/ 1 && t0_value !== (t0_value = (/*ability*/ ctx[0].opts[0]
    			? /*ability*/ ctx[0].opts[0].name
    			: /*ability*/ ctx[0].name) + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*ability*/ 1) {
    				each_value = Array(/*ability*/ ctx[0].max + 1);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$w(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$w(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*ability*/ 1 && select_name_value !== (select_name_value = /*ability*/ ctx[0].name)) {
    				attr_dev(select, "name", select_name_value);
    			}

    			if (dirty & /*ability*/ 1) {
    				select_option(select, /*ability*/ ctx[0].taken);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$15.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$15($$self, $$props, $$invalidate) {
    	let $characterStore;
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(3, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("AbilityModalItem", slots, []);
    	let { ability } = $$props;

    	const updateAbilities = _ => {
    		set_store_value(characterStore, $characterStore = $characterStore.updateAbilities(), $characterStore);
    		SaveCharacter();
    	};

    	const writable_props = ["ability"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<AbilityModalItem> was created with unknown prop '${key}'`);
    	});

    	function select_change_handler() {
    		ability.taken = select_value(this);
    		$$invalidate(0, ability);
    	}

    	$$self.$$set = $$props => {
    		if ("ability" in $$props) $$invalidate(0, ability = $$props.ability);
    	};

    	$$self.$capture_state = () => ({
    		SaveCharacter,
    		characterStore,
    		ability,
    		updateAbilities,
    		$characterStore
    	});

    	$$self.$inject_state = $$props => {
    		if ("ability" in $$props) $$invalidate(0, ability = $$props.ability);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [ability, updateAbilities, select_change_handler];
    }

    class AbilityModalItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$15, create_fragment$15, safe_not_equal, { ability: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AbilityModalItem",
    			options,
    			id: create_fragment$15.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*ability*/ ctx[0] === undefined && !("ability" in props)) {
    			console.warn("<AbilityModalItem> was created without expected prop 'ability'");
    		}
    	}

    	get ability() {
    		throw new Error("<AbilityModalItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ability(value) {
    		throw new Error("<AbilityModalItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/character/creator/abilities/AbilityModalList.svelte generated by Svelte v3.35.0 */
    const file$10 = "src/components/character/creator/abilities/AbilityModalList.svelte";

    function get_each_context$v(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (17:1) {:else}
    function create_else_block$9(ctx) {
    	let abilitymodalitem;
    	let current;

    	abilitymodalitem = new AbilityModalItem({
    			props: { ability: /*ability*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(abilitymodalitem.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(abilitymodalitem, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const abilitymodalitem_changes = {};
    			if (dirty & /*ability*/ 1) abilitymodalitem_changes.ability = /*ability*/ ctx[0];
    			abilitymodalitem.$set(abilitymodalitem_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(abilitymodalitem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(abilitymodalitem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(abilitymodalitem, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$9.name,
    		type: "else",
    		source: "(17:1) {:else}",
    		ctx
    	});

    	return block;
    }

    // (13:1) {#if options}
    function create_if_block$p(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*optionList*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$v(get_each_context$v(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

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
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*optionList*/ 4) {
    				each_value = /*optionList*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$v(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$v(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
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
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$p.name,
    		type: "if",
    		source: "(13:1) {#if options}",
    		ctx
    	});

    	return block;
    }

    // (14:2) {#each optionList as option}
    function create_each_block$v(ctx) {
    	let abilitymodalitem;
    	let current;

    	abilitymodalitem = new AbilityModalItem({
    			props: { ability: /*option*/ ctx[4] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(abilitymodalitem.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(abilitymodalitem, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(abilitymodalitem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(abilitymodalitem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(abilitymodalitem, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$v.name,
    		type: "each",
    		source: "(14:2) {#each optionList as option}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$14(ctx) {
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block$p, create_else_block$9];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*options*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block.c();
    			attr_dev(div, "class", "options-section svelte-hkk310");
    			add_location(div, file$10, 11, 0, 307);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
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
    				} else {
    					if_block.p(ctx, dirty);
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
    			if (detaching) detach_dev(div);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$14.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$14($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("AbilityModalList", slots, []);
    	let { ability } = $$props, { MasterAbilityList } = $$props, { options } = $$props;
    	let optionList = MasterAbilityList.filter(a => a.name == ability.name);
    	ability = MasterAbilityList.filter(a => a.name == ability.name)[0];
    	const writable_props = ["ability", "MasterAbilityList", "options"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<AbilityModalList> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("ability" in $$props) $$invalidate(0, ability = $$props.ability);
    		if ("MasterAbilityList" in $$props) $$invalidate(3, MasterAbilityList = $$props.MasterAbilityList);
    		if ("options" in $$props) $$invalidate(1, options = $$props.options);
    	};

    	$$self.$capture_state = () => ({
    		AbilityModalItem,
    		ability,
    		MasterAbilityList,
    		options,
    		optionList
    	});

    	$$self.$inject_state = $$props => {
    		if ("ability" in $$props) $$invalidate(0, ability = $$props.ability);
    		if ("MasterAbilityList" in $$props) $$invalidate(3, MasterAbilityList = $$props.MasterAbilityList);
    		if ("options" in $$props) $$invalidate(1, options = $$props.options);
    		if ("optionList" in $$props) $$invalidate(2, optionList = $$props.optionList);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [ability, options, optionList, MasterAbilityList];
    }

    class AbilityModalList extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$14, create_fragment$14, safe_not_equal, {
    			ability: 0,
    			MasterAbilityList: 3,
    			options: 1
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AbilityModalList",
    			options,
    			id: create_fragment$14.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*ability*/ ctx[0] === undefined && !("ability" in props)) {
    			console.warn("<AbilityModalList> was created without expected prop 'ability'");
    		}

    		if (/*MasterAbilityList*/ ctx[3] === undefined && !("MasterAbilityList" in props)) {
    			console.warn("<AbilityModalList> was created without expected prop 'MasterAbilityList'");
    		}

    		if (/*options*/ ctx[1] === undefined && !("options" in props)) {
    			console.warn("<AbilityModalList> was created without expected prop 'options'");
    		}
    	}

    	get ability() {
    		throw new Error("<AbilityModalList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ability(value) {
    		throw new Error("<AbilityModalList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get MasterAbilityList() {
    		throw new Error("<AbilityModalList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set MasterAbilityList(value) {
    		throw new Error("<AbilityModalList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get options() {
    		throw new Error("<AbilityModalList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set options(value) {
    		throw new Error("<AbilityModalList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/character/creator/abilities/AbilityModal.svelte generated by Svelte v3.35.0 */
    const file$$ = "src/components/character/creator/abilities/AbilityModal.svelte";

    function create_fragment$13(ctx) {
    	let div0;
    	let t0;
    	let div6;
    	let div5;
    	let div1;
    	let h2;
    	let t1_value = /*ability*/ ctx[0].name + "";
    	let t1;
    	let t2;
    	let div2;
    	let span0;
    	let t4;
    	let span1;
    	let t5_value = /*ability*/ ctx[0].desc + "";
    	let t5;
    	let t6;
    	let div3;
    	let abilitymodallist;
    	let t7;
    	let div4;
    	let button;
    	let current;
    	let mounted;
    	let dispose;

    	abilitymodallist = new AbilityModalList({
    			props: {
    				ability: /*ability*/ ctx[0],
    				MasterAbilityList: /*MasterAbilityList*/ ctx[1],
    				options: /*ability*/ ctx[0].opts.length
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = space();
    			div6 = element("div");
    			div5 = element("div");
    			div1 = element("div");
    			h2 = element("h2");
    			t1 = text(t1_value);
    			t2 = space();
    			div2 = element("div");
    			span0 = element("span");
    			span0.textContent = "Description:";
    			t4 = space();
    			span1 = element("span");
    			t5 = text(t5_value);
    			t6 = space();
    			div3 = element("div");
    			create_component(abilitymodallist.$$.fragment);
    			t7 = space();
    			div4 = element("div");
    			button = element("button");
    			button.textContent = "Save";
    			attr_dev(div0, "class", "modal-background svelte-12vgryu");
    			add_location(div0, file$$, 17, 0, 530);
    			attr_dev(h2, "class", "svelte-12vgryu");
    			add_location(h2, file$$, 21, 3, 714);
    			attr_dev(div1, "class", "ability-name svelte-12vgryu");
    			add_location(div1, file$$, 20, 2, 684);
    			attr_dev(span0, "class", "description-label svelte-12vgryu");
    			add_location(span0, file$$, 24, 3, 786);
    			attr_dev(span1, "class", "ability-description svelte-12vgryu");
    			add_location(span1, file$$, 25, 3, 841);
    			attr_dev(div2, "class", "description-section svelte-12vgryu");
    			add_location(div2, file$$, 23, 2, 749);
    			attr_dev(div3, "class", "stats-section svelte-12vgryu");
    			add_location(div3, file$$, 27, 2, 908);
    			attr_dev(button, "class", "svelte-12vgryu");
    			add_location(button, file$$, 31, 3, 1055);
    			attr_dev(div4, "class", "btn-row svelte-12vgryu");
    			add_location(div4, file$$, 30, 2, 1030);
    			attr_dev(div5, "class", "modal-content svelte-12vgryu");
    			add_location(div5, file$$, 19, 1, 654);
    			attr_dev(div6, "class", "modal svelte-12vgryu");
    			attr_dev(div6, "role", "dialog");
    			attr_dev(div6, "aria-modal", "true");
    			add_location(div6, file$$, 18, 0, 601);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div5);
    			append_dev(div5, div1);
    			append_dev(div1, h2);
    			append_dev(h2, t1);
    			append_dev(div5, t2);
    			append_dev(div5, div2);
    			append_dev(div2, span0);
    			append_dev(div2, t4);
    			append_dev(div2, span1);
    			append_dev(span1, t5);
    			append_dev(div5, t6);
    			append_dev(div5, div3);
    			mount_component(abilitymodallist, div3, null);
    			append_dev(div5, t7);
    			append_dev(div5, div4);
    			append_dev(div4, button);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "keydown", /*handleKeydown*/ ctx[3], false, false, false),
    					listen_dev(div0, "click", /*click_handler*/ ctx[4], false, false, false),
    					listen_dev(button, "click", /*click_handler_1*/ ctx[5], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*ability*/ 1) && t1_value !== (t1_value = /*ability*/ ctx[0].name + "")) set_data_dev(t1, t1_value);
    			if ((!current || dirty & /*ability*/ 1) && t5_value !== (t5_value = /*ability*/ ctx[0].desc + "")) set_data_dev(t5, t5_value);
    			const abilitymodallist_changes = {};
    			if (dirty & /*ability*/ 1) abilitymodallist_changes.ability = /*ability*/ ctx[0];
    			if (dirty & /*MasterAbilityList*/ 2) abilitymodallist_changes.MasterAbilityList = /*MasterAbilityList*/ ctx[1];
    			if (dirty & /*ability*/ 1) abilitymodallist_changes.options = /*ability*/ ctx[0].opts.length;
    			abilitymodallist.$set(abilitymodallist_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(abilitymodallist.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(abilitymodallist.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div6);
    			destroy_component(abilitymodallist);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$13.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$13($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("AbilityModal", slots, []);
    	let { ability } = $$props, { MasterAbilityList } = $$props;
    	const dispatch = createEventDispatcher();

    	const handleKeydown = e => {
    		if (e.key === "Escape") dispatch("close");
    	};

    	const previouslyFocused = typeof document !== "undefined" && document.activeElement;
    	if (previouslyFocused) onDestroy(_ => previouslyFocused.focus());
    	const writable_props = ["ability", "MasterAbilityList"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<AbilityModal> was created with unknown prop '${key}'`);
    	});

    	const click_handler = _ => dispatch("close");
    	const click_handler_1 = _ => dispatch("close");

    	$$self.$$set = $$props => {
    		if ("ability" in $$props) $$invalidate(0, ability = $$props.ability);
    		if ("MasterAbilityList" in $$props) $$invalidate(1, MasterAbilityList = $$props.MasterAbilityList);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		onDestroy,
    		AbilityModalList,
    		ability,
    		MasterAbilityList,
    		dispatch,
    		handleKeydown,
    		previouslyFocused
    	});

    	$$self.$inject_state = $$props => {
    		if ("ability" in $$props) $$invalidate(0, ability = $$props.ability);
    		if ("MasterAbilityList" in $$props) $$invalidate(1, MasterAbilityList = $$props.MasterAbilityList);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		ability,
    		MasterAbilityList,
    		dispatch,
    		handleKeydown,
    		click_handler,
    		click_handler_1
    	];
    }

    class AbilityModal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$13, create_fragment$13, safe_not_equal, { ability: 0, MasterAbilityList: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AbilityModal",
    			options,
    			id: create_fragment$13.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*ability*/ ctx[0] === undefined && !("ability" in props)) {
    			console.warn("<AbilityModal> was created without expected prop 'ability'");
    		}

    		if (/*MasterAbilityList*/ ctx[1] === undefined && !("MasterAbilityList" in props)) {
    			console.warn("<AbilityModal> was created without expected prop 'MasterAbilityList'");
    		}
    	}

    	get ability() {
    		throw new Error("<AbilityModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ability(value) {
    		throw new Error("<AbilityModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get MasterAbilityList() {
    		throw new Error("<AbilityModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set MasterAbilityList(value) {
    		throw new Error("<AbilityModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var ToggleVisible = (x, y=null) => {
    	x.visible = !x.visible;
    	return y
    };

    /* src/components/character/creator/abilities/AbilityCard.svelte generated by Svelte v3.35.0 */
    const file$_ = "src/components/character/creator/abilities/AbilityCard.svelte";

    // (17:0) {#if ability.visible == true}
    function create_if_block$o(ctx) {
    	let abilitymodal;
    	let current;

    	abilitymodal = new AbilityModal({
    			props: {
    				ability: /*ability*/ ctx[1],
    				MasterAbilityList: /*MasterAbilityList*/ ctx[0]
    			},
    			$$inline: true
    		});

    	abilitymodal.$on("close", /*close_handler*/ ctx[3]);

    	const block = {
    		c: function create() {
    			create_component(abilitymodal.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(abilitymodal, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const abilitymodal_changes = {};
    			if (dirty & /*ability*/ 2) abilitymodal_changes.ability = /*ability*/ ctx[1];
    			if (dirty & /*MasterAbilityList*/ 1) abilitymodal_changes.MasterAbilityList = /*MasterAbilityList*/ ctx[0];
    			abilitymodal.$set(abilitymodal_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(abilitymodal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(abilitymodal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(abilitymodal, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$o.name,
    		type: "if",
    		source: "(17:0) {#if ability.visible == true}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$12(ctx) {
    	let button;
    	let div0;
    	let t0_value = /*ability*/ ctx[1].name + "";
    	let t0;
    	let t1;
    	let div1;
    	let t2_value = /*ability*/ ctx[1].desc + "";
    	let t2;
    	let t3;
    	let if_block_anchor;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*ability*/ ctx[1].visible == true && create_if_block$o(ctx);

    	const block = {
    		c: function create() {
    			button = element("button");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(t2_value);
    			t3 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			attr_dev(div0, "class", "ability-name svelte-13mpbsb");
    			add_location(div0, file$_, 9, 1, 312);
    			attr_dev(div1, "class", "ability-description svelte-13mpbsb");
    			add_location(div1, file$_, 12, 1, 365);
    			attr_dev(button, "class", "ability-card svelte-13mpbsb");
    			add_location(button, file$_, 8, 0, 203);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, div0);
    			append_dev(div0, t0);
    			append_dev(button, t1);
    			append_dev(button, div1);
    			append_dev(div1, t2);
    			insert_dev(target, t3, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*ability*/ 2) && t0_value !== (t0_value = /*ability*/ ctx[1].name + "")) set_data_dev(t0, t0_value);
    			if ((!current || dirty & /*ability*/ 2) && t2_value !== (t2_value = /*ability*/ ctx[1].desc + "")) set_data_dev(t2, t2_value);

    			if (/*ability*/ ctx[1].visible == true) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*ability*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$o(ctx);
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
    			if (detaching) detach_dev(button);
    			if (detaching) detach_dev(t3);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$12.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$12($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("AbilityCard", slots, []);
    	let { ability } = $$props, { MasterAbilityList } = $$props;
    	const writable_props = ["ability", "MasterAbilityList"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<AbilityCard> was created with unknown prop '${key}'`);
    	});

    	const click_handler = _ => $$invalidate(0, MasterAbilityList = ToggleVisible(ability, MasterAbilityList));
    	const close_handler = _ => $$invalidate(0, MasterAbilityList = ToggleVisible(ability, MasterAbilityList));

    	$$self.$$set = $$props => {
    		if ("ability" in $$props) $$invalidate(1, ability = $$props.ability);
    		if ("MasterAbilityList" in $$props) $$invalidate(0, MasterAbilityList = $$props.MasterAbilityList);
    	};

    	$$self.$capture_state = () => ({
    		AbilityModal,
    		ToggleVisible,
    		ability,
    		MasterAbilityList
    	});

    	$$self.$inject_state = $$props => {
    		if ("ability" in $$props) $$invalidate(1, ability = $$props.ability);
    		if ("MasterAbilityList" in $$props) $$invalidate(0, MasterAbilityList = $$props.MasterAbilityList);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [MasterAbilityList, ability, click_handler, close_handler];
    }

    class AbilityCard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$12, create_fragment$12, safe_not_equal, { ability: 1, MasterAbilityList: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AbilityCard",
    			options,
    			id: create_fragment$12.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*ability*/ ctx[1] === undefined && !("ability" in props)) {
    			console.warn("<AbilityCard> was created without expected prop 'ability'");
    		}

    		if (/*MasterAbilityList*/ ctx[0] === undefined && !("MasterAbilityList" in props)) {
    			console.warn("<AbilityCard> was created without expected prop 'MasterAbilityList'");
    		}
    	}

    	get ability() {
    		throw new Error("<AbilityCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ability(value) {
    		throw new Error("<AbilityCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get MasterAbilityList() {
    		throw new Error("<AbilityCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set MasterAbilityList(value) {
    		throw new Error("<AbilityCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/character/creator/abilities/AbilityGroup.svelte generated by Svelte v3.35.0 */
    const file$Z = "src/components/character/creator/abilities/AbilityGroup.svelte";

    function get_each_context$u(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (13:2) {#each group.list as ability}
    function create_each_block$u(ctx) {
    	let abilitycard;
    	let current;

    	abilitycard = new AbilityCard({
    			props: {
    				ability: /*ability*/ ctx[2],
    				MasterAbilityList: /*MasterAbilityList*/ ctx[1]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(abilitycard.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(abilitycard, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const abilitycard_changes = {};
    			if (dirty & /*group*/ 1) abilitycard_changes.ability = /*ability*/ ctx[2];
    			if (dirty & /*MasterAbilityList*/ 2) abilitycard_changes.MasterAbilityList = /*MasterAbilityList*/ ctx[1];
    			abilitycard.$set(abilitycard_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(abilitycard.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(abilitycard.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(abilitycard, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$u.name,
    		type: "each",
    		source: "(13:2) {#each group.list as ability}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$11(ctx) {
    	let details;
    	let summary;
    	let t0_value = /*group*/ ctx[0].name + "";
    	let t0;
    	let t1;
    	let t2;
    	let div;
    	let current;
    	let each_value = /*group*/ ctx[0].list;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$u(get_each_context$u(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			details = element("details");
    			summary = element("summary");
    			t0 = text(t0_value);
    			t1 = text("XP Abilities");
    			t2 = space();
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(summary, file$Z, 8, 1, 185);
    			attr_dev(div, "class", "ability-group-card");
    			add_location(div, file$Z, 11, 1, 235);
    			attr_dev(details, "class", "ability-group-details svelte-1ux4lpd");
    			add_location(details, file$Z, 7, 0, 144);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, details, anchor);
    			append_dev(details, summary);
    			append_dev(summary, t0);
    			append_dev(summary, t1);
    			append_dev(details, t2);
    			append_dev(details, div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*group*/ 1) && t0_value !== (t0_value = /*group*/ ctx[0].name + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*group, MasterAbilityList*/ 3) {
    				each_value = /*group*/ ctx[0].list;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$u(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$u(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
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
    			if (detaching) detach_dev(details);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$11.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$11($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("AbilityGroup", slots, []);
    	let { group } = $$props, { MasterAbilityList } = $$props;
    	const writable_props = ["group", "MasterAbilityList"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<AbilityGroup> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("group" in $$props) $$invalidate(0, group = $$props.group);
    		if ("MasterAbilityList" in $$props) $$invalidate(1, MasterAbilityList = $$props.MasterAbilityList);
    	};

    	$$self.$capture_state = () => ({ AbilityCard, group, MasterAbilityList });

    	$$self.$inject_state = $$props => {
    		if ("group" in $$props) $$invalidate(0, group = $$props.group);
    		if ("MasterAbilityList" in $$props) $$invalidate(1, MasterAbilityList = $$props.MasterAbilityList);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [group, MasterAbilityList];
    }

    class AbilityGroup extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$11, create_fragment$11, safe_not_equal, { group: 0, MasterAbilityList: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AbilityGroup",
    			options,
    			id: create_fragment$11.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*group*/ ctx[0] === undefined && !("group" in props)) {
    			console.warn("<AbilityGroup> was created without expected prop 'group'");
    		}

    		if (/*MasterAbilityList*/ ctx[1] === undefined && !("MasterAbilityList" in props)) {
    			console.warn("<AbilityGroup> was created without expected prop 'MasterAbilityList'");
    		}
    	}

    	get group() {
    		throw new Error("<AbilityGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set group(value) {
    		throw new Error("<AbilityGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get MasterAbilityList() {
    		throw new Error("<AbilityGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set MasterAbilityList(value) {
    		throw new Error("<AbilityGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/character/creator/abilities/CurrentAbilities.svelte generated by Svelte v3.35.0 */
    const file$Y = "src/components/character/creator/abilities/CurrentAbilities.svelte";

    function get_each_context$t(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	child_ctx[4] = list;
    	child_ctx[5] = i;
    	return child_ctx;
    }

    function get_each_context_1$b(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	child_ctx[8] = i;
    	return child_ctx;
    }

    // (26:6) {#if ability.opts[0]}
    function create_if_block$n(ctx) {
    	let html_tag;

    	let raw_value = (/*ability*/ ctx[3].opts[0].name
    	? `<br>(${/*ability*/ ctx[3].opts[0].name})`
    	: `<br>(${/*ability*/ ctx[3].opts[0]})`) + "";

    	let html_anchor;

    	const block = {
    		c: function create() {
    			html_anchor = empty();
    			html_tag = new HtmlTag(html_anchor);
    		},
    		m: function mount(target, anchor) {
    			html_tag.m(raw_value, target, anchor);
    			insert_dev(target, html_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 1 && raw_value !== (raw_value = (/*ability*/ ctx[3].opts[0].name
    			? `<br>(${/*ability*/ ctx[3].opts[0].name})`
    			: `<br>(${/*ability*/ ctx[3].opts[0]})`) + "")) html_tag.p(raw_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(html_anchor);
    			if (detaching) html_tag.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$n.name,
    		type: "if",
    		source: "(26:6) {#if ability.opts[0]}",
    		ctx
    	});

    	return block;
    }

    // (41:7) {#each Array(ability.max+1) as _, i}
    function create_each_block_1$b(ctx) {
    	let option;
    	let t;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(/*i*/ ctx[8]);
    			option.__value = /*i*/ ctx[8];
    			option.value = option.__value;
    			add_location(option, file$Y, 41, 8, 1215);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$b.name,
    		type: "each",
    		source: "(41:7) {#each Array(ability.max+1) as _, i}",
    		ctx
    	});

    	return block;
    }

    // (22:3) {#each $characterStore.abilities as ability}
    function create_each_block$t(ctx) {
    	let div;
    	let span0;
    	let t0_value = /*ability*/ ctx[3].name + "";
    	let t0;
    	let t1;
    	let t2;
    	let span1;
    	let t3_value = /*ability*/ ctx[3].experience + "";
    	let t3;
    	let t4;
    	let span2;
    	let t5_value = /*ability*/ ctx[3].max + "";
    	let t5;
    	let t6;
    	let span3;
    	let select;
    	let t7;
    	let mounted;
    	let dispose;
    	let if_block = /*ability*/ ctx[3].opts[0] && create_if_block$n(ctx);
    	let each_value_1 = Array(/*ability*/ ctx[3].max + 1);
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$b(get_each_context_1$b(ctx, each_value_1, i));
    	}

    	function select_change_handler() {
    		/*select_change_handler*/ ctx[2].call(select, /*each_value*/ ctx[4], /*ability_index*/ ctx[5]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			span0 = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			if (if_block) if_block.c();
    			t2 = space();
    			span1 = element("span");
    			t3 = text(t3_value);
    			t4 = space();
    			span2 = element("span");
    			t5 = text(t5_value);
    			t6 = space();
    			span3 = element("span");
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t7 = space();
    			attr_dev(span0, "class", "l-col svelte-hazq5t");
    			add_location(span0, file$Y, 23, 5, 703);
    			attr_dev(span1, "class", "s-col svelte-hazq5t");
    			add_location(span1, file$Y, 32, 5, 926);
    			attr_dev(span2, "class", "s-col svelte-hazq5t");
    			add_location(span2, file$Y, 33, 5, 979);
    			attr_dev(select, "class", "taken-number");
    			if (/*ability*/ ctx[3].taken === void 0) add_render_callback(select_change_handler);
    			add_location(select, file$Y, 35, 6, 1052);
    			attr_dev(span3, "class", "s-col svelte-hazq5t");
    			add_location(span3, file$Y, 34, 5, 1025);
    			attr_dev(div, "class", "current-ability-row svelte-hazq5t");
    			add_location(div, file$Y, 22, 4, 664);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span0);
    			append_dev(span0, t0);
    			append_dev(span0, t1);
    			if (if_block) if_block.m(span0, null);
    			append_dev(div, t2);
    			append_dev(div, span1);
    			append_dev(span1, t3);
    			append_dev(div, t4);
    			append_dev(div, span2);
    			append_dev(span2, t5);
    			append_dev(div, t6);
    			append_dev(div, span3);
    			append_dev(span3, select);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			select_option(select, /*ability*/ ctx[3].taken);
    			append_dev(div, t7);

    			if (!mounted) {
    				dispose = [
    					listen_dev(select, "change", select_change_handler),
    					listen_dev(select, "blur", /*updateAbilities*/ ctx[1], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*$characterStore*/ 1 && t0_value !== (t0_value = /*ability*/ ctx[3].name + "")) set_data_dev(t0, t0_value);

    			if (/*ability*/ ctx[3].opts[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$n(ctx);
    					if_block.c();
    					if_block.m(span0, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*$characterStore*/ 1 && t3_value !== (t3_value = /*ability*/ ctx[3].experience + "")) set_data_dev(t3, t3_value);
    			if (dirty & /*$characterStore*/ 1 && t5_value !== (t5_value = /*ability*/ ctx[3].max + "")) set_data_dev(t5, t5_value);

    			if (dirty & /*$characterStore*/ 1) {
    				each_value_1 = Array(/*ability*/ ctx[3].max + 1);
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$b(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$b(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}

    			if (dirty & /*$characterStore*/ 1) {
    				select_option(select, /*ability*/ ctx[3].taken);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$t.name,
    		type: "each",
    		source: "(22:3) {#each $characterStore.abilities as ability}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$10(ctx) {
    	let div4;
    	let div0;
    	let t1;
    	let div3;
    	let div1;
    	let span0;
    	let t3;
    	let span1;
    	let t5;
    	let span2;
    	let t7;
    	let span3;
    	let t9;
    	let div2;
    	let each_value = /*$characterStore*/ ctx[0].abilities;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$t(get_each_context$t(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div0 = element("div");
    			div0.textContent = "Current Abilities";
    			t1 = space();
    			div3 = element("div");
    			div1 = element("div");
    			span0 = element("span");
    			span0.textContent = "Name";
    			t3 = space();
    			span1 = element("span");
    			span1.textContent = "XP";
    			t5 = space();
    			span2 = element("span");
    			span2.textContent = "Max";
    			t7 = space();
    			span3 = element("span");
    			span3.textContent = "Taken";
    			t9 = space();
    			div2 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "current-abilities-title svelte-hazq5t");
    			add_location(div0, file$Y, 12, 1, 283);
    			attr_dev(span0, "class", "l-col svelte-hazq5t");
    			add_location(span0, file$Y, 15, 3, 429);
    			attr_dev(span1, "class", "s-col svelte-hazq5t");
    			add_location(span1, file$Y, 16, 3, 464);
    			attr_dev(span2, "class", "s-col svelte-hazq5t");
    			add_location(span2, file$Y, 17, 3, 497);
    			attr_dev(span3, "class", "s-col svelte-hazq5t");
    			add_location(span3, file$Y, 18, 3, 531);
    			attr_dev(div1, "class", "current-abilities-header svelte-hazq5t");
    			add_location(div1, file$Y, 14, 2, 387);
    			attr_dev(div2, "class", "current-abilities-list");
    			add_location(div2, file$Y, 20, 2, 575);
    			attr_dev(div3, "class", "current-abilities-section");
    			add_location(div3, file$Y, 13, 1, 345);
    			attr_dev(div4, "class", "current-abilities svelte-hazq5t");
    			add_location(div4, file$Y, 11, 0, 250);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div0);
    			append_dev(div4, t1);
    			append_dev(div4, div3);
    			append_dev(div3, div1);
    			append_dev(div1, span0);
    			append_dev(div1, t3);
    			append_dev(div1, span1);
    			append_dev(div1, t5);
    			append_dev(div1, span2);
    			append_dev(div1, t7);
    			append_dev(div1, span3);
    			append_dev(div3, t9);
    			append_dev(div3, div2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div2, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$characterStore, updateAbilities, Array*/ 3) {
    				each_value = /*$characterStore*/ ctx[0].abilities;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$t(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$t(child_ctx);
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
    			if (detaching) detach_dev(div4);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$10.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$10($$self, $$props, $$invalidate) {
    	let $characterStore;
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(0, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("CurrentAbilities", slots, []);

    	const updateAbilities = _ => {
    		set_store_value(characterStore, $characterStore = $characterStore.updateAbilities(), $characterStore);
    		SaveCharacter();
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<CurrentAbilities> was created with unknown prop '${key}'`);
    	});

    	function select_change_handler(each_value, ability_index) {
    		each_value[ability_index].taken = select_value(this);
    		characterStore.set($characterStore);
    	}

    	$$self.$capture_state = () => ({
    		SaveCharacter,
    		characterStore,
    		updateAbilities,
    		$characterStore
    	});

    	return [$characterStore, updateAbilities, select_change_handler];
    }

    class CurrentAbilities extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$10, create_fragment$10, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CurrentAbilities",
    			options,
    			id: create_fragment$10.name
    		});
    	}
    }

    /* src/components/character/creator/ExplanationBlock.svelte generated by Svelte v3.35.0 */

    const file$X = "src/components/character/creator/ExplanationBlock.svelte";

    function get_each_context$s(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (7:4) {#each rule.text as line}
    function create_each_block$s(ctx) {
    	let p;
    	let t_value = /*line*/ ctx[1] + "";
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			add_location(p, file$X, 7, 8, 105);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*rule*/ 1 && t_value !== (t_value = /*line*/ ctx[1] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$s.name,
    		type: "each",
    		source: "(7:4) {#each rule.text as line}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$$(ctx) {
    	let div;
    	let each_value = /*rule*/ ctx[0].text;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$s(get_each_context$s(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "explanation svelte-111geaz");
    			add_location(div, file$X, 5, 0, 41);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*rule*/ 1) {
    				each_value = /*rule*/ ctx[0].text;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$s(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$s(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
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
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$$.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$$($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ExplanationBlock", slots, []);
    	let { rule } = $$props;
    	const writable_props = ["rule"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ExplanationBlock> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("rule" in $$props) $$invalidate(0, rule = $$props.rule);
    	};

    	$$self.$capture_state = () => ({ rule });

    	$$self.$inject_state = $$props => {
    		if ("rule" in $$props) $$invalidate(0, rule = $$props.rule);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [rule];
    }

    class ExplanationBlock extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$$, create_fragment$$, safe_not_equal, { rule: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ExplanationBlock",
    			options,
    			id: create_fragment$$.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*rule*/ ctx[0] === undefined && !("rule" in props)) {
    			console.warn("<ExplanationBlock> was created without expected prop 'rule'");
    		}
    	}

    	get rule() {
    		throw new Error("<ExplanationBlock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rule(value) {
    		throw new Error("<ExplanationBlock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/character/creator/PageHeader.svelte generated by Svelte v3.35.0 */

    const file$W = "src/components/character/creator/PageHeader.svelte";

    // (11:1) {#if step < 6}
    function create_if_block$m(ctx) {
    	let h2;
    	let t0;
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			t0 = text("Step ");
    			t1 = text(/*step*/ ctx[1]);
    			t2 = text("/6");
    			add_location(h2, file$W, 11, 2, 190);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			append_dev(h2, t0);
    			append_dev(h2, t1);
    			append_dev(h2, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*step*/ 2) set_data_dev(t1, /*step*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$m.name,
    		type: "if",
    		source: "(11:1) {#if step < 6}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$_(ctx) {
    	let title_value;
    	let t0;
    	let hgroup;
    	let h1;
    	let t1;
    	let t2;
    	document.title = title_value = "Apocalyptia Online - Character Creator - " + /*chapter*/ ctx[0];
    	let if_block = /*step*/ ctx[1] < 6 && create_if_block$m(ctx);

    	const block = {
    		c: function create() {
    			t0 = space();
    			hgroup = element("hgroup");
    			h1 = element("h1");
    			t1 = text(/*chapter*/ ctx[0]);
    			t2 = space();
    			if (if_block) if_block.c();
    			add_location(h1, file$W, 9, 1, 153);
    			attr_dev(hgroup, "class", "svelte-1ncpyb2");
    			add_location(hgroup, file$W, 8, 0, 143);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, hgroup, anchor);
    			append_dev(hgroup, h1);
    			append_dev(h1, t1);
    			append_dev(hgroup, t2);
    			if (if_block) if_block.m(hgroup, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*chapter*/ 1 && title_value !== (title_value = "Apocalyptia Online - Character Creator - " + /*chapter*/ ctx[0])) {
    				document.title = title_value;
    			}

    			if (dirty & /*chapter*/ 1) set_data_dev(t1, /*chapter*/ ctx[0]);

    			if (/*step*/ ctx[1] < 6) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$m(ctx);
    					if_block.c();
    					if_block.m(hgroup, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(hgroup);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$_.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$_($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("PageHeader", slots, []);
    	let { chapter } = $$props, { step } = $$props;
    	const writable_props = ["chapter", "step"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<PageHeader> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("chapter" in $$props) $$invalidate(0, chapter = $$props.chapter);
    		if ("step" in $$props) $$invalidate(1, step = $$props.step);
    	};

    	$$self.$capture_state = () => ({ chapter, step });

    	$$self.$inject_state = $$props => {
    		if ("chapter" in $$props) $$invalidate(0, chapter = $$props.chapter);
    		if ("step" in $$props) $$invalidate(1, step = $$props.step);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [chapter, step];
    }

    class PageHeader extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$_, create_fragment$_, safe_not_equal, { chapter: 0, step: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PageHeader",
    			options,
    			id: create_fragment$_.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*chapter*/ ctx[0] === undefined && !("chapter" in props)) {
    			console.warn("<PageHeader> was created without expected prop 'chapter'");
    		}

    		if (/*step*/ ctx[1] === undefined && !("step" in props)) {
    			console.warn("<PageHeader> was created without expected prop 'step'");
    		}
    	}

    	get chapter() {
    		throw new Error("<PageHeader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set chapter(value) {
    		throw new Error("<PageHeader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get step() {
    		throw new Error("<PageHeader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set step(value) {
    		throw new Error("<PageHeader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/character/creator/PointsRemaining.svelte generated by Svelte v3.35.0 */

    const file$V = "src/components/character/creator/PointsRemaining.svelte";

    function create_fragment$Z(ctx) {
    	let div;
    	let h3;
    	let t0;
    	let t1;
    	let div_class_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h3 = element("h3");
    			t0 = text("Points Remaining: ");
    			t1 = text(/*points*/ ctx[0]);
    			add_location(h3, file$V, 6, 1, 93);
    			attr_dev(div, "class", div_class_value = "remaining " + (/*points*/ ctx[0] < 0 ? "error" : ""));
    			add_location(div, file$V, 5, 0, 40);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h3);
    			append_dev(h3, t0);
    			append_dev(h3, t1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*points*/ 1) set_data_dev(t1, /*points*/ ctx[0]);

    			if (dirty & /*points*/ 1 && div_class_value !== (div_class_value = "remaining " + (/*points*/ ctx[0] < 0 ? "error" : ""))) {
    				attr_dev(div, "class", div_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$Z.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$Z($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("PointsRemaining", slots, []);
    	let { points } = $$props;
    	const writable_props = ["points"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<PointsRemaining> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("points" in $$props) $$invalidate(0, points = $$props.points);
    	};

    	$$self.$capture_state = () => ({ points });

    	$$self.$inject_state = $$props => {
    		if ("points" in $$props) $$invalidate(0, points = $$props.points);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [points];
    }

    class PointsRemaining extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$Z, create_fragment$Z, safe_not_equal, { points: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PointsRemaining",
    			options,
    			id: create_fragment$Z.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*points*/ ctx[0] === undefined && !("points" in props)) {
    			console.warn("<PointsRemaining> was created without expected prop 'points'");
    		}
    	}

    	get points() {
    		throw new Error("<PointsRemaining>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set points(value) {
    		throw new Error("<PointsRemaining>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var RandomAbilities = (c) => {
    	console.log('Random Abilities');
    	console.log(AbilitiesList.masterList.filter(a => a.taken));
        AbilitiesList.reset();
        c = c.updateAbilities();
        while (c.properties.experience.current) {
    		console.log(c.properties.experience.current);
    		console.log(c.abilities);
            const remainingAbilities = AbilitiesList.masterList.filter(r => {
                return (
    				r.experience <= c.properties.experience.current &&
    				!c.abilities.some(a => a.name == r.name)
    			)
            });
            if (remainingAbilities.length) {
                const a = RandomRoll(remainingAbilities);
                a.taken++;
                c.abilities.push(a);
                c = c.updateAbilities();
            }
            else break
        }
    	console.log(c.properties.experience.current);
    	console.log(c.abilities);
        return c
    };

    /* src/components/buttons/ResetAndRandomButtonRow.svelte generated by Svelte v3.35.0 */

    const file$U = "src/components/buttons/ResetAndRandomButtonRow.svelte";

    // (7:4) {#if reset != ''}
    function create_if_block$l(ctx) {
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "Reset";
    			attr_dev(button, "class", "small-cntr-btn svelte-iy60g0");
    			add_location(button, file$U, 7, 8, 107);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (!mounted) {
    				dispose = listen_dev(
    					button,
    					"click",
    					function () {
    						if (is_function(/*reset*/ ctx[0])) /*reset*/ ctx[0].apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$l.name,
    		type: "if",
    		source: "(7:4) {#if reset != ''}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$Y(ctx) {
    	let div;
    	let t0;
    	let button;
    	let mounted;
    	let dispose;
    	let if_block = /*reset*/ ctx[0] != "" && create_if_block$l(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			t0 = space();
    			button = element("button");
    			button.textContent = "Random";
    			attr_dev(button, "class", "small-cntr-btn svelte-iy60g0");
    			add_location(button, file$U, 9, 1, 181);
    			attr_dev(div, "class", "btn-row");
    			add_location(div, file$U, 5, 0, 55);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    			append_dev(div, t0);
    			append_dev(div, button);

    			if (!mounted) {
    				dispose = listen_dev(
    					button,
    					"click",
    					function () {
    						if (is_function(/*random*/ ctx[1])) /*random*/ ctx[1].apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (/*reset*/ ctx[0] != "") {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$l(ctx);
    					if_block.c();
    					if_block.m(div, t0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$Y.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$Y($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ResetAndRandomButtonRow", slots, []);
    	let { reset = "" } = $$props, { random } = $$props;
    	const writable_props = ["reset", "random"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ResetAndRandomButtonRow> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("reset" in $$props) $$invalidate(0, reset = $$props.reset);
    		if ("random" in $$props) $$invalidate(1, random = $$props.random);
    	};

    	$$self.$capture_state = () => ({ reset, random });

    	$$self.$inject_state = $$props => {
    		if ("reset" in $$props) $$invalidate(0, reset = $$props.reset);
    		if ("random" in $$props) $$invalidate(1, random = $$props.random);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [reset, random];
    }

    class ResetAndRandomButtonRow extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$Y, create_fragment$Y, safe_not_equal, { reset: 0, random: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ResetAndRandomButtonRow",
    			options,
    			id: create_fragment$Y.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*random*/ ctx[1] === undefined && !("random" in props)) {
    			console.warn("<ResetAndRandomButtonRow> was created without expected prop 'random'");
    		}
    	}

    	get reset() {
    		throw new Error("<ResetAndRandomButtonRow>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set reset(value) {
    		throw new Error("<ResetAndRandomButtonRow>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get random() {
    		throw new Error("<ResetAndRandomButtonRow>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set random(value) {
    		throw new Error("<ResetAndRandomButtonRow>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/character/creator/steps/AbilitiesStep.svelte generated by Svelte v3.35.0 */
    const file$T = "src/components/character/creator/steps/AbilitiesStep.svelte";

    function get_each_context$r(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    // (32:1) {#if $characterStore.abilities.length}
    function create_if_block$k(ctx) {
    	let div;
    	let currentabilities;
    	let current;
    	currentabilities = new CurrentAbilities({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(currentabilities.$$.fragment);
    			attr_dev(div, "class", "section-card");
    			add_location(div, file$T, 32, 2, 1369);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(currentabilities, div, null);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(currentabilities.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(currentabilities.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(currentabilities);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$k.name,
    		type: "if",
    		source: "(32:1) {#if $characterStore.abilities.length}",
    		ctx
    	});

    	return block;
    }

    // (38:2) {#each AbilitiesList.groups as group}
    function create_each_block$r(ctx) {
    	let abilitygroup;
    	let current;

    	abilitygroup = new AbilityGroup({
    			props: {
    				group: /*group*/ ctx[5],
    				MasterAbilityList: /*MasterAbilityList*/ ctx[2]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(abilitygroup.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(abilitygroup, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(abilitygroup.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(abilitygroup.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(abilitygroup, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$r.name,
    		type: "each",
    		source: "(38:2) {#each AbilitiesList.groups as group}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$X(ctx) {
    	let div1;
    	let pageheader;
    	let t0;
    	let explanationblock;
    	let t1;
    	let pointsremaining;
    	let t2;
    	let t3;
    	let div0;
    	let t4;
    	let resetandrandombuttonrow;
    	let current;

    	pageheader = new PageHeader({
    			props: {
    				chapter: "Abilities",
    				step: /*$characterStore*/ ctx[0].meta.step
    			},
    			$$inline: true
    		});

    	explanationblock = new ExplanationBlock({ props: { rule: Ability }, $$inline: true });

    	pointsremaining = new PointsRemaining({
    			props: { points: /*remainingXP*/ ctx[1] },
    			$$inline: true
    		});

    	let if_block = /*$characterStore*/ ctx[0].abilities.length && create_if_block$k(ctx);
    	let each_value = AbilitiesList.groups;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$r(get_each_context$r(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	resetandrandombuttonrow = new ResetAndRandomButtonRow({
    			props: {
    				reset: /*func*/ ctx[3],
    				random: /*func_1*/ ctx[4]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(pageheader.$$.fragment);
    			t0 = space();
    			create_component(explanationblock.$$.fragment);
    			t1 = space();
    			create_component(pointsremaining.$$.fragment);
    			t2 = space();
    			if (if_block) if_block.c();
    			t3 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t4 = space();
    			create_component(resetandrandombuttonrow.$$.fragment);
    			attr_dev(div0, "class", "abilities-list svelte-1147wm9");
    			add_location(div0, file$T, 36, 1, 1437);
    			attr_dev(div1, "class", "abilities-step-page");
    			add_location(div1, file$T, 27, 0, 1143);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(pageheader, div1, null);
    			append_dev(div1, t0);
    			mount_component(explanationblock, div1, null);
    			append_dev(div1, t1);
    			mount_component(pointsremaining, div1, null);
    			append_dev(div1, t2);
    			if (if_block) if_block.m(div1, null);
    			append_dev(div1, t3);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			append_dev(div1, t4);
    			mount_component(resetandrandombuttonrow, div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const pageheader_changes = {};
    			if (dirty & /*$characterStore*/ 1) pageheader_changes.step = /*$characterStore*/ ctx[0].meta.step;
    			pageheader.$set(pageheader_changes);
    			const pointsremaining_changes = {};
    			if (dirty & /*remainingXP*/ 2) pointsremaining_changes.points = /*remainingXP*/ ctx[1];
    			pointsremaining.$set(pointsremaining_changes);

    			if (/*$characterStore*/ ctx[0].abilities.length) {
    				if (if_block) {
    					if (dirty & /*$characterStore*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$k(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div1, t3);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (dirty & /*AbilitiesList, MasterAbilityList*/ 4) {
    				each_value = AbilitiesList.groups;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$r(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$r(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			const resetandrandombuttonrow_changes = {};
    			if (dirty & /*$characterStore*/ 1) resetandrandombuttonrow_changes.reset = /*func*/ ctx[3];
    			if (dirty & /*$characterStore*/ 1) resetandrandombuttonrow_changes.random = /*func_1*/ ctx[4];
    			resetandrandombuttonrow.$set(resetandrandombuttonrow_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(pageheader.$$.fragment, local);
    			transition_in(explanationblock.$$.fragment, local);
    			transition_in(pointsremaining.$$.fragment, local);
    			transition_in(if_block);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(resetandrandombuttonrow.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(pageheader.$$.fragment, local);
    			transition_out(explanationblock.$$.fragment, local);
    			transition_out(pointsremaining.$$.fragment, local);
    			transition_out(if_block);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(resetandrandombuttonrow.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(pageheader);
    			destroy_component(explanationblock);
    			destroy_component(pointsremaining);
    			if (if_block) if_block.d();
    			destroy_each(each_blocks, detaching);
    			destroy_component(resetandrandombuttonrow);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$X.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$X($$self, $$props, $$invalidate) {
    	let remainingXP;
    	let $characterStore;
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(0, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("AbilitiesStep", slots, []);

    	afterUpdate(_ => {
    		Creation.proceedCheck($characterStore);
    		characterStore.set($characterStore);
    		SaveCharacter();
    	});

    	let MasterAbilityList = AbilitiesList.masterList;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<AbilitiesStep> was created with unknown prop '${key}'`);
    	});

    	const func = _ => set_store_value(characterStore, $characterStore = $characterStore.resetAbilities(), $characterStore);
    	const func_1 = _ => set_store_value(characterStore, $characterStore = RandomAbilities($characterStore), $characterStore);

    	$$self.$capture_state = () => ({
    		Ability,
    		AbilitiesList,
    		AbilityGroup,
    		Creation,
    		CurrentAbilities,
    		ExplanationBlock,
    		PageHeader,
    		PointsRemaining,
    		RandomAbilities,
    		ResetAndRandomButtonRow,
    		SaveCharacter,
    		characterStore,
    		afterUpdate,
    		MasterAbilityList,
    		$characterStore,
    		remainingXP
    	});

    	$$self.$inject_state = $$props => {
    		if ("MasterAbilityList" in $$props) $$invalidate(2, MasterAbilityList = $$props.MasterAbilityList);
    		if ("remainingXP" in $$props) $$invalidate(1, remainingXP = $$props.remainingXP);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$characterStore*/ 1) {
    			$$invalidate(1, remainingXP = $characterStore.properties.experience.current);
    		}
    	};

    	return [$characterStore, remainingXP, MasterAbilityList, func, func_1];
    }

    class AbilitiesStep extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$X, create_fragment$X, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AbilitiesStep",
    			options,
    			id: create_fragment$X.name
    		});
    	}
    }

    /* src/components/buttons/DiceButton.svelte generated by Svelte v3.35.0 */

    const file$S = "src/components/buttons/DiceButton.svelte";

    function create_fragment$W(ctx) {
    	let button;
    	let div;
    	let t_value = (/*face*/ ctx[1] || 6) + "";
    	let t;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			div = element("div");
    			t = text(t_value);
    			attr_dev(div, "class", "dice-icon-box svelte-bf3gon");
    			add_location(div, file$S, 6, 1, 97);
    			attr_dev(button, "class", "btn-box square-btn");
    			add_location(button, file$S, 5, 0, 44);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, div);
    			append_dev(div, t);

    			if (!mounted) {
    				dispose = listen_dev(
    					button,
    					"click",
    					function () {
    						if (is_function(/*func*/ ctx[0])) /*func*/ ctx[0].apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			if (dirty & /*face*/ 2 && t_value !== (t_value = (/*face*/ ctx[1] || 6) + "")) set_data_dev(t, t_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$W.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$W($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("DiceButton", slots, []);
    	let { func } = $$props, { face } = $$props;
    	const writable_props = ["func", "face"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<DiceButton> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("func" in $$props) $$invalidate(0, func = $$props.func);
    		if ("face" in $$props) $$invalidate(1, face = $$props.face);
    	};

    	$$self.$capture_state = () => ({ func, face });

    	$$self.$inject_state = $$props => {
    		if ("func" in $$props) $$invalidate(0, func = $$props.func);
    		if ("face" in $$props) $$invalidate(1, face = $$props.face);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [func, face];
    }

    class DiceButton extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$W, create_fragment$W, safe_not_equal, { func: 0, face: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DiceButton",
    			options,
    			id: create_fragment$W.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*func*/ ctx[0] === undefined && !("func" in props)) {
    			console.warn("<DiceButton> was created without expected prop 'func'");
    		}

    		if (/*face*/ ctx[1] === undefined && !("face" in props)) {
    			console.warn("<DiceButton> was created without expected prop 'face'");
    		}
    	}

    	get func() {
    		throw new Error("<DiceButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set func(value) {
    		throw new Error("<DiceButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get face() {
    		throw new Error("<DiceButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set face(value) {
    		throw new Error("<DiceButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var RandomAge = _ => Math.ceil((Math.random() * 33) + 17);
    // 17 to 50

    var RandomHair = (c) => {
    	let hair = [
    		`Black`,
    		`Brunette`,
    	];

    	if (c.description.sex.value == `Male`) {
    		hair.push(`Bald`);
    	}

    	if (
    		c.description.skin.value == `Tan` ||
    		c.description.skin.value == `Fair` ||
    		c.description.skin.value == `Pale`
    	) {
    		hair.push(...[
    			`Auburn`,
    			`Blonde`,
    			`Red`,
    		]);
    	}

    	if (c.description.age.value > 40) {
    		hair.push(`Gray`);
    	}
    	if (c.description.age.value > 60) {
    		hair.push(`White`);
    	}

    	return RandomRoll(hair)
    };

    var RandomHeight = (c) => {
    	let totalInches;
    	if (c.description.sex.value == `Male`) {
    		totalInches = Math.ceil((Math.random() * 12) + 64);
    		// 5'4" to 6'4"
    	}
    	else if (c.description.sex.value == `Female`) {
    		totalInches = Math.ceil((Math.random() * 12) + 59);
    		// 4'11" to 5'11"
    	}
    	else {
    		totalInches = Math.ceil((Math.random() * 12) + 61);
    		// 5'1" to 6'1"
    	}
    	return `${Math.floor(totalInches / 12)}ft ${totalInches % 12}in`
    };

    var FemaleNamesList = [
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
    	'Ada',
    	'Adalyn',
    	'Adalynn',
    	'Addison',
    	'Addisyn',
    	'Addyson',
    	'Adelaide',
    	'Adeline',
    	'Adelyn',
    	'Adison',
    	'Adriana',
    	'Adrianna',
    	'Adrienne',
    	'Adyson',
    	'Aileen',
    	'Aimee',
    	'Ainsley',
    	'Aisha',
    	'Aiyana',
    	'Akira',
    	'Alaina',
    	'Alana',
    	'Alani',
    	'Alanna',
    	'Alannah',
    	'Alayna',
    	'Aleah',
    	'Aleena',
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
    	'Ali',
    	'Alia',
    	'Aliana',
    	'Alice',
    	'Alicia',
    	'Alina',
    	'Alisa',
    	'Alisha',
    	'Alison',
    	'Alissa',
    	'Alisson',
    	'Alivia',
    	'Aliya',
    	'Aliyah',
    	'Aliza',
    	'Alize',
    	'Allie',
    	'Allison',
    	'Allisson',
    	'Ally',
    	'Allyson',
    	'Allyssa',
    	'Alma',
    	'Alondra',
    	'Alysa',
    	'Alyson',
    	'Alyssa',
    	'Alyvia',
    	'Amanda',
    	'Amani',
    	'Amara',
    	'Amari',
    	'Amaris',
    	'Amaya',
    	'Amber',
    	'Amelia',
    	'Amelie',
    	'America',
    	'Amiah',
    	'Amina',
    	'Amira',
    	'Amirah',
    	'Amiya',
    	'Amiyah',
    	'Amy',
    	'Amya',
    	'Ana',
    	'Anabel',
    	'Anabella',
    	'Anabelle',
    	'Anahi',
    	'Anastasia',
    	'Anaya',
    	'Andrea',
    	'Angel',
    	'Angela',
    	'Angelica',
    	'Angelina',
    	'Angeline',
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
    	'Arabella',
    	'Araceli',
    	'Aracely',
    	'Areli',
    	'Arely',
    	'Aria',
    	'Ariana',
    	'Arianna',
    	'Ariel',
    	'Ariella',
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
    	'Audrina',
    	'Aurora',
    	'Autumn',
    	'Ava',
    	'Avah',
    	'Averi',
    	'Averie',
    	'Avery',
    	'Ayana',
    	'Ayanna',
    	'Ayla',
    	'Aylin',
    	'Azaria',
    	'Azul',
    	'Bailee',
    	'Bailey',
    	'Barbara',
    	'Baylee',
    	'Beatrice',
    	'Beatriz',
    	'Belen',
    	'Belinda',
    	'Bella',
    	'Berenice',
    	'Bethany',
    	'Bianca',
    	'Blanca',
    	'Bonnie',
    	'Braelyn',
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
    	'Briley',
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
    	'Brylee',
    	'Brynlee',
    	'Brynn',
    	'Cadence',
    	'Cailyn',
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
    	'Campbell',
    	'Camryn',
    	'Candace',
    	'Candice',
    	'Cara',
    	'Carina',
    	'Carissa',
    	'Carla',
    	'Carlee',
    	'Carleigh',
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
    	'Caylee',
    	'Cecelia',
    	'Cecilia',
    	'Celeste',
    	'Celia',
    	'Celina',
    	'Celine',
    	'Chana',
    	'Chandler',
    	'Chanel',
    	'Charity',
    	'Charlee',
    	'Charlie',
    	'Charlize',
    	'Charlotte',
    	'Chasity',
    	'Chaya',
    	'Chelsea',
    	'Chelsey',
    	'Cherish',
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
    	'Cloe',
    	'Colleen',
    	'Cora',
    	'Corinne',
    	'Courtney',
    	'Cristal',
    	'Cristina',
    	'Crystal',
    	'Cynthia',
    	'Dahlia',
    	'Daisy',
    	'Dakota',
    	'Dalia',
    	'Damaris',
    	'Dana',
    	'Dania',
    	'Danica',
    	'Daniela',
    	'Daniella',
    	'Danielle',
    	'Danika',
    	'Danna',
    	'Daphne',
    	'Darby',
    	'Darlene',
    	'Dasia',
    	'Dayami',
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
    	'Denisse',
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
    	'Dixie',
    	'Diya',
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
    	'Elianna',
    	'Elisa',
    	'Elisabeth',
    	'Elise',
    	'Elissa',
    	'Eliza',
    	'Elizabeth',
    	'Ella',
    	'Elle',
    	'Ellen',
    	'Elliana',
    	'Ellie',
    	'Elsa',
    	'Elsie',
    	'Elyse',
    	'Elyssa',
    	'Emelia',
    	'Emely',
    	'Emerson',
    	'Emery',
    	'Emilee',
    	'Emilia',
    	'Emilie',
    	'Emily',
    	'Emma',
    	'Emmalee',
    	'Emmy',
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
    	'Evangeline',
    	'Eve',
    	'Evelin',
    	'Evelyn',
    	'Evie',
    	'Fabiola',
    	'Faith',
    	'Fatima',
    	'Felicia',
    	'Felicity',
    	'Fernanda',
    	'Finley',
    	'Fiona',
    	'Frances',
    	'Francesca',
    	'Frida',
    	'Gabriela',
    	'Gabriella',
    	'Gabrielle',
    	'Galilea',
    	'Gemma',
    	'Genesis',
    	'Genevieve',
    	'Georgia',
    	'Gia',
    	'Giada',
    	'Giana',
    	'Gianna',
    	'Gillian',
    	'Gina',
    	'Giovanna',
    	'Giselle',
    	'Gisselle',
    	'Giuliana',
    	'Gloria',
    	'Grace',
    	'Gracelyn',
    	'Gracie',
    	'Graciela',
    	'Greta',
    	'Gretchen',
    	'Guadalupe',
    	'Gwendolyn',
    	'Hadassah',
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
    	'Harper',
    	'Haven',
    	'Hayden',
    	'Haylee',
    	'Hayley',
    	'Haylie',
    	'Hazel',
    	'Heather',
    	'Heaven',
    	'Heidi',
    	'Heidy',
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
    	'Ireland',
    	'Irene',
    	'Iris',
    	'Isabel',
    	'Isabela',
    	'Isabell',
    	'Isabella',
    	'Isabelle',
    	'Isis',
    	'Isla',
    	'Itzel',
    	'Ivy',
    	'Iyana',
    	'Iyanna',
    	'Izabella',
    	'Izabelle',
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
    	'Jaelynn',
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
    	'Jamiya',
    	'Jamya',
    	'Jana',
    	'Janae',
    	'Jane',
    	'Janelle',
    	'Janessa',
    	'Janet',
    	'Janiah',
    	'Janice',
    	'Janiya',
    	'Janiyah',
    	'Jaquelin',
    	'Jaqueline',
    	'Jaslene',
    	'Jaslyn',
    	'Jasmin',
    	'Jasmine',
    	'Jasmyn',
    	'Jaycee',
    	'Jayda',
    	'Jayden',
    	'Jayla',
    	'Jaylah',
    	'Jaylee',
    	'Jayleen',
    	'Jaylen',
    	'Jaylene',
    	'Jaylin',
    	'Jaylyn',
    	'Jaylynn',
    	'Jazlene',
    	'Jazlyn',
    	'Jazlynn',
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
    	'Jocelynn',
    	'Joelle',
    	'Johana',
    	'Johanna',
    	'Jolie',
    	'Jordan',
    	'Jordin',
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
    	'June',
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
    	'Kamari',
    	'Kamila',
    	'Kamora',
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
    	'Karma',
    	'Karsyn',
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
    	'Kayden',
    	'Kaydence',
    	'Kayla',
    	'Kaylah',
    	'Kaylee',
    	'Kayleigh',
    	'Kaylen',
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
    	'Kenley',
    	'Kenna',
    	'Kennedi',
    	'Kennedy',
    	'Kenya',
    	'Kenzie',
    	'Keyla',
    	'Khloe',
    	'Kiana',
    	'Kianna',
    	'Kiara',
    	'Kiera',
    	'Kierra',
    	'Kiersten',
    	'Kiley',
    	'Kimberly',
    	'Kimora',
    	'Kinley',
    	'Kinsey',
    	'Kinsley',
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
    	'Lailah',
    	'Lainey',
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
    	'Laylah',
    	'Lea',
    	'Leah',
    	'Leanna',
    	'Leia',
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
    	'Leyla',
    	'Lia',
    	'Liana',
    	'Libby',
    	'Liberty',
    	'Lila',
    	'Lilah',
    	'Lilia',
    	'Lilian',
    	'Liliana',
    	'Lilianna',
    	'Lillian',
    	'Lilliana',
    	'Lillianna',
    	'Lillie',
    	'Lilly',
    	'Lily',
    	'Lilyana',
    	'Lina',
    	'Linda',
    	'Lindsay',
    	'Lindsey',
    	'Lisa',
    	'Lisbeth',
    	'Lisette',
    	'Litzy',
    	'Livia',
    	'Lizbeth',
    	'Lizeth',
    	'Lizette',
    	'Logan',
    	'Lola',
    	'London',
    	'Londyn',
    	'Lorelai',
    	'Lorelei',
    	'Loren',
    	'Lorena',
    	'Lucia',
    	'Luciana',
    	'Lucille',
    	'Lucy',
    	'Luna',
    	'Luz',
    	'Lydia',
    	'Lyla',
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
    	'Madilynn',
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
    	'Mareli',
    	'Marely',
    	'Maren',
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
    	'Marin',
    	'Marina',
    	'Marisa',
    	'Marisol',
    	'Marissa',
    	'Maritza',
    	'Mariyah',
    	'Marlee',
    	'Marlene',
    	'Marley',
    	'Marlie',
    	'Martha',
    	'Mary',
    	'Maryam',
    	'Maryjane',
    	'Matilda',
    	'Mattie',
    	'Maura',
    	'Maya',
    	'Mayra',
    	'Mckayla',
    	'Mckenna',
    	'Mckenzie',
    	'Mckinley',
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
    	'Mila',
    	'Milagros',
    	'Miley',
    	'Mina',
    	'Mira',
    	'Miracle',
    	'Miranda',
    	'Mireya',
    	'Miriam',
    	'Miya',
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
    	'Myla',
    	'Mylee',
    	'Mylie',
    	'Myra',
    	'Nadia',
    	'Naima',
    	'Nancy',
    	'Naomi',
    	'Natalia',
    	'Nataly',
    	'Natalya',
    	'Natasha',
    	'Nayeli',
    	'Nevaeh',
    	'Neveah',
    	'Nia',
    	'Nichole',
    	'Nicole',
    	'Nicolette',
    	'Nikki',
    	'Nina',
    	'Noelia',
    	'Noelle',
    	'Noemi',
    	'Nola',
    	'Nora',
    	'Norah',
    	'Norma',
    	'Nya',
    	'Nyah',
    	'Nyasia',
    	'Nyla',
    	'Nylah',
    	'Olive',
    	'Olivia',
    	'Paige',
    	'Paisley',
    	'Paityn',
    	'Paloma',
    	'Pamela',
    	'Paola',
    	'Paris',
    	'Parker',
    	'Patience',
    	'Patricia',
    	'Paula',
    	'Paulina',
    	'Payten',
    	'Payton',
    	'Penelope',
    	'Perla',
    	'Peyton',
    	'Phoebe',
    	'Phoenix',
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
    	'Raelynn',
    	'Raina',
    	'Raquel',
    	'Raven',
    	'Rayna',
    	'Rayne',
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
    	'Rhianna',
    	'Rhiannon',
    	'Rihanna',
    	'Riley',
    	'Rita',
    	'Riya',
    	'Robin',
    	'Robyn',
    	'Rocio',
    	'Rory',
    	'Rosa',
    	'Rose',
    	'Roselyn',
    	'Rosemary',
    	'Rowan',
    	'Roxana',
    	'Rubi',
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
    	'Sanaa',
    	'Sanai',
    	'Sandra',
    	'Sandy',
    	'Saniya',
    	'Saniyah',
    	'Sara',
    	'Sarah',
    	'Sarahi',
    	'Sarai',
    	'Sariah',
    	'Sarina',
    	'Sasha',
    	'Savana',
    	'Savanah',
    	'Savanna',
    	'Savannah',
    	'Scarlet',
    	'Scarlett',
    	'Selah',
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
    	'Shiloh',
    	'Shirley',
    	'Shreya',
    	'Shyann',
    	'Shyanne',
    	'Shyla',
    	'Sidney',
    	'Siena',
    	'Sienna',
    	'Sierra',
    	'Silvia',
    	'Simone',
    	'Sky',
    	'Skye',
    	'Skyla',
    	'Skylar',
    	'Skyler',
    	'Sloane',
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
    	'Taniyah',
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
    	'Valery',
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
    	'Xiomara',
    	'Yadira',
    	'Yamilet',
    	'Yareli',
    	'Yaretzi',
    	'Yaritza',
    	'Yasmin',
    	'Yasmine',
    	'Yazmin',
    	'Yesenia',
    	'Yessenia',
    	'Yolanda',
    	'Yoselin',
    	'Yuliana',
    	'Yvette',
    	'Zaniyah',
    	'Zara',
    	'Zaria',
    	'Zariah',
    	'Zion',
    	'Zoe',
    	'Zoey',
    	'Zoie',
    ];

    var MaleNamesList = [
    	'Aaden',
    	'Aarav',
    	'Aaron',
    	'Abdiel',
    	'Abdullah',
    	'Abel',
    	'Abraham',
    	'Abram',
    	'Ace',
    	'Adam',
    	'Adan',
    	'Addison',
    	'Aden',
    	'Aditya',
    	'Adonis',
    	'Adrian',
    	'Adriel',
    	'Adrien',
    	'Aedan',
    	'Agustin',
    	'Ahmad',
    	'Ahmed',
    	'Aidan',
    	'Aiden',
    	'Aidyn',
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
    	'Amare',
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
    	'Arnav',
    	'Arnold',
    	'Aron',
    	'Arthur',
    	'Arturo',
    	'Asa',
    	'Asher',
    	'Ashton',
    	'Atticus',
    	'Aubrey',
    	'August',
    	'Augustus',
    	'Austen',
    	'Austin',
    	'Austyn',
    	'Avery',
    	'Axel',
    	'Ayaan',
    	'Aydan',
    	'Ayden',
    	'Aydin',
    	'Bailey',
    	'Baron',
    	'Barrett',
    	'Barry',
    	'Beau',
    	'Beckett',
    	'Beckham',
    	'Ben',
    	'Benito',
    	'Benjamin',
    	'Bennett',
    	'Benny',
    	'Bentley',
    	'Bernard',
    	'Bernardo',
    	'Billy',
    	'Blaine',
    	'Blaise',
    	'Blake',
    	'Blaze',
    	'Bo',
    	'Bobby',
    	'Boston',
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
    	'Branson',
    	'Braxton',
    	'Brayan',
    	'Brayden',
    	'Braydon',
    	'Braylen',
    	'Braylon',
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
    	'Bridger',
    	'Brock',
    	'Broderick',
    	'Brodie',
    	'Brody',
    	'Brogan',
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
    	'Callum',
    	'Calvin',
    	'Camden',
    	'Cameron',
    	'Camren',
    	'Camron',
    	'Camryn',
    	'Cannon',
    	'Carl',
    	'Carlo',
    	'Carlos',
    	'Carlton',
    	'Carmelo',
    	'Carsen',
    	'Carson',
    	'Carter',
    	'Case',
    	'Casey',
    	'Cash',
    	'Cason',
    	'Cassius',
    	'Cayden',
    	'Cedric',
    	'Cesar',
    	'Chace',
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
    	'Cohen',
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
    	'Cristofer',
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
    	'Damari',
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
    	'Davian',
    	'David',
    	'Davin',
    	'Davion',
    	'Davis',
    	'Davon',
    	'Dawson',
    	'Dax',
    	'Dayton',
    	'Deacon',
    	'Dean',
    	'Deandre',
    	'Deangelo',
    	'Declan',
    	'Deegan',
    	'Demarcus',
    	'Demarion',
    	'Demetrius',
    	'Dennis',
    	'Denzel',
    	'Deon',
    	'Deonte',
    	'Derek',
    	'Dereon',
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
    	'Eden',
    	'Edgar',
    	'Eduardo',
    	'Edward',
    	'Edwin',
    	'Efrain',
    	'Efren',
    	'Eli',
    	'Elian',
    	'Elias',
    	'Eliezer',
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
    	'Emery',
    	'Emiliano',
    	'Emilio',
    	'Emmanuel',
    	'Emmett',
    	'Enrique',
    	'Enzo',
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
    	'Finley',
    	'Finn',
    	'Finnegan',
    	'Fisher',
    	'Fletcher',
    	'Forrest',
    	'Francis',
    	'Francisco',
    	'Franco',
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
    	'Gauge',
    	'Gaven',
    	'Gavin',
    	'Gavyn',
    	'Geoffrey',
    	'George',
    	'Geovanni',
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
    	'Haiden',
    	'Hamza',
    	'Harley',
    	'Harold',
    	'Harper',
    	'Harrison',
    	'Harry',
    	'Hassan',
    	'Hayden',
    	'Heath',
    	'Hector',
    	'Henry',
    	'Heriberto',
    	'Hezekiah',
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
    	'Ishaan',
    	'Isiah',
    	'Ismael',
    	'Israel',
    	'Issac',
    	'Ivan',
    	'Izaiah',
    	'Izayah',
    	'Jabari',
    	'Jace',
    	'Jack',
    	'Jackson',
    	'Jacob',
    	'Jacoby',
    	'Jaden',
    	'Jadiel',
    	'Jadon',
    	'Jadyn',
    	'Jaeden',
    	'Jagger',
    	'Jaheim',
    	'Jahiem',
    	'Jaiden',
    	'Jaidyn',
    	'Jaime',
    	'Jair',
    	'Jairo',
    	'Jake',
    	'Jakob',
    	'Jakobe',
    	'Jalen',
    	'Jamal',
    	'Jamar',
    	'Jamarcus',
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
    	'Jasiah',
    	'Jason',
    	'Jasper',
    	'Javen',
    	'Javier',
    	'Javion',
    	'Javon',
    	'Jax',
    	'Jaxon',
    	'Jaxson',
    	'Jay',
    	'Jayce',
    	'Jaydan',
    	'Jayden',
    	'Jaydin',
    	'Jaydon',
    	'Jaylan',
    	'Jaylen',
    	'Jaylin',
    	'Jaylon',
    	'Jayson',
    	'Jayvion',
    	'Jayvon',
    	'Jean',
    	'Jeff',
    	'Jefferson',
    	'Jeffery',
    	'Jeffrey',
    	'Jensen',
    	'Jeramiah',
    	'Jeremiah',
    	'Jeremy',
    	'Jerimiah',
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
    	'Kadyn',
    	'Kaeden',
    	'Kael',
    	'Kai',
    	'Kaiden',
    	'Kale',
    	'Kaleb',
    	'Kamari',
    	'Kamden',
    	'Kameron',
    	'Kamren',
    	'Kamron',
    	'Kane',
    	'Kanye',
    	'Kareem',
    	'Karl',
    	'Karson',
    	'Karter',
    	'Kasen',
    	'Kasey',
    	'Kash',
    	'Kason',
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
    	'Killian',
    	'King',
    	'Kingston',
    	'Kirk',
    	'Kobe',
    	'Koby',
    	'Kody',
    	'Koen',
    	'Kolby',
    	'Kole',
    	'Kolten',
    	'Kolton',
    	'Konner',
    	'Konnor',
    	'Korbin',
    	'Korey',
    	'Kory',
    	'Krish',
    	'Kristian',
    	'Kristofer',
    	'Kristopher',
    	'Kurt',
    	'Kurtis',
    	'Kyan',
    	'Kylan',
    	'Kyle',
    	'Kyler',
    	'Kymani',
    	'Kyree',
    	'Kyson',
    	'Lamar',
    	'Lamont',
    	'Lance',
    	'Landen',
    	'Landin',
    	'Landon',
    	'Landyn',
    	'Lane',
    	'Larry',
    	'Latrell',
    	'Lawrence',
    	'Lawson',
    	'Layne',
    	'Layton',
    	'Leandro',
    	'Lee',
    	'Leland',
    	'Lennon',
    	'Leo',
    	'Leon',
    	'Leonard',
    	'Leonardo',
    	'Leonel',
    	'Leonidas',
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
    	'Lucian',
    	'Luciano',
    	'Luis',
    	'Luka',
    	'Lukas',
    	'Luke',
    	'Lyric',
    	'Madden',
    	'Maddox',
    	'Makai',
    	'Makhi',
    	'Malachi',
    	'Malakai',
    	'Malaki',
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
    	'Marley',
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
    	'Mathias',
    	'Matias',
    	'Matteo',
    	'Matthew',
    	'Matthias',
    	'Maurice',
    	'Mauricio',
    	'Maverick',
    	'Max',
    	'Maxim',
    	'Maximilian',
    	'Maximillian',
    	'Maximo',
    	'Maximus',
    	'Maxwell',
    	'Mekhi',
    	'Melvin',
    	'Memphis',
    	'Messiah',
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
    	'Nikolai',
    	'Nikolas',
    	'Noah',
    	'Noe',
    	'Noel',
    	'Nolan',
    	'Norman',
    	'Octavio',
    	'Odin',
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
    	'Raiden',
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
    	'Rayan',
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
    	'Rex',
    	'Rey',
    	'Reynaldo',
    	'Rhett',
    	'Rhys',
    	'Ricardo',
    	'Richard',
    	'Rickey',
    	'Ricky',
    	'Rigoberto',
    	'Riley',
    	'Rishi',
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
    	'Ronin',
    	'Ronnie',
    	'Rory',
    	'Ross',
    	'Rowan',
    	'Roy',
    	'Royce',
    	'Ruben',
    	'Rudy',
    	'Russell',
    	'Ryan',
    	'Ryder',
    	'Ryker',
    	'Rylan',
    	'Ryland',
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
    	'Slade',
    	'Solomon',
    	'Sonny',
    	'Soren',
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
    	'Talan',
    	'Talon',
    	'Tanner',
    	'Tariq',
    	'Tate',
    	'Taylor',
    	'Teagan',
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
    	'Trevin',
    	'Trevion',
    	'Trevon',
    	'Trevor',
    	'Trey',
    	'Treyton',
    	'Tripp',
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
    	'Uriah',
    	'Uriel',
    	'Urijah',
    	'Valentin',
    	'Valentino',
    	'Van',
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
    	'Yadiel',
    	'Yael',
    	'Yahir',
    	'Yair',
    	'Yandel',
    	'Yosef',
    	'Yurem',
    	'Yusuf',
    	'Zachariah',
    	'Zachary',
    	'Zachery',
    	'Zack',
    	'Zackary',
    	'Zackery',
    	'Zaid',
    	'Zaiden',
    	'Zain',
    	'Zaire',
    	'Zakary',
    	'Zander',
    	'Zane',
    	'Zavier',
    	'Zayden',
    	'Zayne',
    	'Zechariah',
    ];

    var NamesList = [
    	...FemaleNamesList,
    	...MaleNamesList
    ];

    var RandomName = (c) => {
    	if (c.description.sex.value == `Male`) return RandomRoll(MaleNamesList)
    	else if (c.description.sex.value == `Female`) return RandomRoll(FemaleNamesList)
    	else return RandomRoll(NamesList)
    };

    var RandomSex = _ => RandomRoll([
    	`Female`,
    	`Male`
    ]);

    var RandomDescription = (c) => {
        c.description.age.value = RandomAge();
        c.description.sex.value = RandomSex();
        c.description.height.value = RandomHeight(c);
        c.description.weight.value = RandomWeight(c);
        c.description.skin.value = RandomSkin();
        c.description.hair.value = RandomHair(c);
        c.description.name.value = RandomName(c);
        return c
    };

    var RandomDescriptionSwitch = (desc) => {
    	switch (desc.name) {
    		case 'Name': return RandomName(get_store_value(characterStore))
    		case 'Age': return RandomAge(get_store_value(characterStore))
    		case 'Sex': return RandomSex(get_store_value(characterStore))
    		case 'Height': return RandomHeight(get_store_value(characterStore))
    		case 'Weight': return RandomWeight(get_store_value(characterStore))
    		case 'Skin': return RandomSkin(get_store_value(characterStore))
    		case 'Hair': return RandomHair(get_store_value(characterStore))
    	}
    };

    /* src/components/character/creator/steps/DescriptionStep.svelte generated by Svelte v3.35.0 */

    const { Object: Object_1$7 } = globals;
    const file$R = "src/components/character/creator/steps/DescriptionStep.svelte";

    function get_each_context$q(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	child_ctx[8] = list;
    	child_ctx[9] = i;
    	return child_ctx;
    }

    // (29:3) {#if desc.name != 'Player'}
    function create_if_block$j(ctx) {
    	let div1;
    	let span;
    	let t0_value = /*desc*/ ctx[7].name + "";
    	let t0;
    	let t1;
    	let t2;
    	let input;
    	let t3;
    	let div0;
    	let dicebutton;
    	let t4;
    	let current;
    	let mounted;
    	let dispose;

    	function input_input_handler() {
    		/*input_input_handler*/ ctx[3].call(input, /*each_value*/ ctx[8], /*desc_index*/ ctx[9]);
    	}

    	function func(...args) {
    		return /*func*/ ctx[4](/*desc*/ ctx[7], ...args);
    	}

    	dicebutton = new DiceButton({ props: { func }, $$inline: true });

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = text(":");
    			t2 = space();
    			input = element("input");
    			t3 = space();
    			div0 = element("div");
    			create_component(dicebutton.$$.fragment);
    			t4 = space();
    			attr_dev(span, "class", "desc-label svelte-12b4fub");
    			add_location(span, file$R, 30, 5, 1140);
    			attr_dev(input, "class", "desc-value svelte-12b4fub");
    			attr_dev(input, "type", "text");
    			add_location(input, file$R, 31, 5, 1190);
    			attr_dev(div0, "class", "dice-container svelte-12b4fub");
    			add_location(div0, file$R, 32, 5, 1280);
    			attr_dev(div1, "class", "desc-container svelte-12b4fub");
    			add_location(div1, file$R, 29, 4, 1106);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, span);
    			append_dev(span, t0);
    			append_dev(span, t1);
    			append_dev(div1, t2);
    			append_dev(div1, input);
    			set_input_value(input, /*desc*/ ctx[7].value);
    			append_dev(div1, t3);
    			append_dev(div1, div0);
    			mount_component(dicebutton, div0, null);
    			append_dev(div1, t4);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", input_input_handler),
    					listen_dev(input, "input", /*updateDesc*/ ctx[1], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if ((!current || dirty & /*$characterStore*/ 1) && t0_value !== (t0_value = /*desc*/ ctx[7].name + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*Object, $characterStore*/ 1 && input.value !== /*desc*/ ctx[7].value) {
    				set_input_value(input, /*desc*/ ctx[7].value);
    			}

    			const dicebutton_changes = {};
    			if (dirty & /*$characterStore*/ 1) dicebutton_changes.func = func;
    			dicebutton.$set(dicebutton_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(dicebutton.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(dicebutton.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(dicebutton);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$j.name,
    		type: "if",
    		source: "(29:3) {#if desc.name != 'Player'}",
    		ctx
    	});

    	return block;
    }

    // (28:2) {#each Object.values($characterStore.description) as desc}
    function create_each_block$q(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*desc*/ ctx[7].name != "Player" && create_if_block$j(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*desc*/ ctx[7].name != "Player") {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$characterStore*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$j(ctx);
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
    		id: create_each_block$q.name,
    		type: "each",
    		source: "(28:2) {#each Object.values($characterStore.description) as desc}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$V(ctx) {
    	let div1;
    	let pageheader;
    	let t0;
    	let div0;
    	let t1;
    	let resetandrandombuttonrow;
    	let current;

    	pageheader = new PageHeader({
    			props: {
    				chapter: "Description",
    				step: /*$characterStore*/ ctx[0].meta.step
    			},
    			$$inline: true
    		});

    	let each_value = Object.values(/*$characterStore*/ ctx[0].description);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$q(get_each_context$q(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	resetandrandombuttonrow = new ResetAndRandomButtonRow({
    			props: {
    				reset: /*func_1*/ ctx[5],
    				random: /*func_2*/ ctx[6]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(pageheader.$$.fragment);
    			t0 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t1 = space();
    			create_component(resetandrandombuttonrow.$$.fragment);
    			attr_dev(div0, "class", "section-card");
    			add_location(div0, file$R, 26, 1, 983);
    			attr_dev(div1, "class", "description-step-page");
    			add_location(div1, file$R, 24, 0, 873);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(pageheader, div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			append_dev(div1, t1);
    			mount_component(resetandrandombuttonrow, div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const pageheader_changes = {};
    			if (dirty & /*$characterStore*/ 1) pageheader_changes.step = /*$characterStore*/ ctx[0].meta.step;
    			pageheader.$set(pageheader_changes);

    			if (dirty & /*randomDescription, Object, $characterStore, updateDesc*/ 7) {
    				each_value = Object.values(/*$characterStore*/ ctx[0].description);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$q(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$q(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			const resetandrandombuttonrow_changes = {};
    			if (dirty & /*$characterStore*/ 1) resetandrandombuttonrow_changes.reset = /*func_1*/ ctx[5];
    			if (dirty & /*$characterStore*/ 1) resetandrandombuttonrow_changes.random = /*func_2*/ ctx[6];
    			resetandrandombuttonrow.$set(resetandrandombuttonrow_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(pageheader.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(resetandrandombuttonrow.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(pageheader.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(resetandrandombuttonrow.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(pageheader);
    			destroy_each(each_blocks, detaching);
    			destroy_component(resetandrandombuttonrow);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$V.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$V($$self, $$props, $$invalidate) {
    	let $characterStore;
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(0, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("DescriptionStep", slots, []);
    	afterUpdate(_ => SaveCharacter());

    	const updateDesc = _ => {
    		Creation.proceedCheck($characterStore);
    		characterStore.set($characterStore);
    	};

    	const randomDescription = desc => {
    		set_store_value(characterStore, $characterStore.description[desc.name.toLowerCase()].value = RandomDescriptionSwitch(desc), $characterStore);
    	};

    	const writable_props = [];

    	Object_1$7.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<DescriptionStep> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler(each_value, desc_index) {
    		each_value[desc_index].value = this.value;
    	}

    	const func = (desc, _) => randomDescription(desc);
    	const func_1 = _ => set_store_value(characterStore, $characterStore = $characterStore.resetDescription(), $characterStore);
    	const func_2 = _ => set_store_value(characterStore, $characterStore = RandomDescription($characterStore), $characterStore);

    	$$self.$capture_state = () => ({
    		Creation,
    		DiceButton,
    		PageHeader,
    		RandomDescription,
    		RandomDescriptionSwitch,
    		ResetAndRandomButtonRow,
    		SaveCharacter,
    		characterStore,
    		afterUpdate,
    		updateDesc,
    		randomDescription,
    		$characterStore
    	});

    	return [
    		$characterStore,
    		updateDesc,
    		randomDescription,
    		input_input_handler,
    		func,
    		func_1,
    		func_2
    	];
    }

    class DescriptionStep extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$V, create_fragment$V, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DescriptionStep",
    			options,
    			id: create_fragment$V.name
    		});
    	}
    }

    /* src/components/character/sheet/sections/AbilitiesSection.svelte generated by Svelte v3.35.0 */
    const file$Q = "src/components/character/sheet/sections/AbilitiesSection.svelte";

    function get_each_context$p(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (15:1) {#each $characterStore.abilities as ability}
    function create_each_block$p(ctx) {
    	let div;
    	let span0;
    	let t0_value = /*ability*/ ctx[2].name + "";
    	let t0;
    	let t1;

    	let t2_value = (/*ability*/ ctx[2].opts[0]
    	? ` (${/*ability*/ ctx[2].opts[0].name})`
    	: ``) + "";

    	let t2;
    	let t3;
    	let span1;
    	let t4_value = /*ability*/ ctx[2].experience + "";
    	let t4;
    	let t5;
    	let span2;
    	let t6_value = /*ability*/ ctx[2].max + "";
    	let t6;
    	let t7;
    	let span3;
    	let t8_value = /*ability*/ ctx[2].taken + "";
    	let t8;
    	let t9;

    	const block = {
    		c: function create() {
    			div = element("div");
    			span0 = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			t2 = text(t2_value);
    			t3 = space();
    			span1 = element("span");
    			t4 = text(t4_value);
    			t5 = space();
    			span2 = element("span");
    			t6 = text(t6_value);
    			t7 = space();
    			span3 = element("span");
    			t8 = text(t8_value);
    			t9 = space();
    			attr_dev(span0, "class", "l-col svelte-110m710");
    			add_location(span0, file$Q, 16, 3, 389);
    			attr_dev(span1, "class", "s-col svelte-110m710");
    			add_location(span1, file$Q, 20, 3, 501);
    			attr_dev(span2, "class", "s-col svelte-110m710");
    			add_location(span2, file$Q, 21, 3, 552);
    			attr_dev(span3, "class", "s-col svelte-110m710");
    			add_location(span3, file$Q, 22, 3, 596);
    			attr_dev(div, "class", "card-table-row svelte-110m710");
    			add_location(div, file$Q, 15, 2, 357);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span0);
    			append_dev(span0, t0);
    			append_dev(span0, t1);
    			append_dev(span0, t2);
    			append_dev(div, t3);
    			append_dev(div, span1);
    			append_dev(span1, t4);
    			append_dev(div, t5);
    			append_dev(div, span2);
    			append_dev(span2, t6);
    			append_dev(div, t7);
    			append_dev(div, span3);
    			append_dev(span3, t8);
    			append_dev(div, t9);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 1 && t0_value !== (t0_value = /*ability*/ ctx[2].name + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*$characterStore*/ 1 && t2_value !== (t2_value = (/*ability*/ ctx[2].opts[0]
    			? ` (${/*ability*/ ctx[2].opts[0].name})`
    			: ``) + "")) set_data_dev(t2, t2_value);

    			if (dirty & /*$characterStore*/ 1 && t4_value !== (t4_value = /*ability*/ ctx[2].experience + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*$characterStore*/ 1 && t6_value !== (t6_value = /*ability*/ ctx[2].max + "")) set_data_dev(t6, t6_value);
    			if (dirty & /*$characterStore*/ 1 && t8_value !== (t8_value = /*ability*/ ctx[2].taken + "")) set_data_dev(t8, t8_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$p.name,
    		type: "each",
    		source: "(15:1) {#each $characterStore.abilities as ability}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$U(ctx) {
    	let div1;
    	let div0;
    	let span0;
    	let t1;
    	let span1;
    	let t3;
    	let span2;
    	let t5;
    	let span3;
    	let t7;
    	let each_value = /*$characterStore*/ ctx[0].abilities;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$p(get_each_context$p(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			span0 = element("span");
    			span0.textContent = "Name";
    			t1 = space();
    			span1 = element("span");
    			span1.textContent = "XP";
    			t3 = space();
    			span2 = element("span");
    			span2.textContent = "Max";
    			t5 = space();
    			span3 = element("span");
    			span3.textContent = "Taken";
    			t7 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(span0, "class", "l-col svelte-110m710");
    			add_location(span0, file$Q, 9, 2, 169);
    			attr_dev(span1, "class", "s-col svelte-110m710");
    			add_location(span1, file$Q, 10, 2, 203);
    			attr_dev(span2, "class", "s-col svelte-110m710");
    			add_location(span2, file$Q, 11, 2, 235);
    			attr_dev(span3, "class", "s-col svelte-110m710");
    			add_location(span3, file$Q, 12, 2, 268);
    			attr_dev(div0, "class", "card-table-header svelte-110m710");
    			add_location(div0, file$Q, 8, 1, 135);
    			attr_dev(div1, "class", "card-table svelte-110m710");
    			add_location(div1, file$Q, 7, 0, 109);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, span0);
    			append_dev(div0, t1);
    			append_dev(div0, span1);
    			append_dev(div0, t3);
    			append_dev(div0, span2);
    			append_dev(div0, t5);
    			append_dev(div0, span3);
    			append_dev(div1, t7);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$characterStore*/ 1) {
    				each_value = /*$characterStore*/ ctx[0].abilities;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$p(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$p(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, null);
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
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$U.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$U($$self, $$props, $$invalidate) {
    	let $characterStore;
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(0, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("AbilitiesSection", slots, []);
    	const mode = "readonly";
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<AbilitiesSection> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ characterStore, mode, $characterStore });
    	return [$characterStore, mode];
    }

    class AbilitiesSection extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$U, create_fragment$U, safe_not_equal, { mode: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AbilitiesSection",
    			options,
    			id: create_fragment$U.name
    		});
    	}

    	get mode() {
    		return this.$$.ctx[1];
    	}

    	set mode(value) {
    		throw new Error("<AbilitiesSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/character/sheet/sections/DescriptionSection.svelte generated by Svelte v3.35.0 */
    const file$P = "src/components/character/sheet/sections/DescriptionSection.svelte";

    // (15:33) 
    function create_if_block_13(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "class", "sheet-value-long svelte-1h2jahu");
    			input.readOnly = true;
    			add_location(input, file$P, 15, 5, 426);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*$characterStore*/ ctx[1].description.name.value);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler_1*/ ctx[3]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && input.value !== /*$characterStore*/ ctx[1].description.name.value) {
    				set_input_value(input, /*$characterStore*/ ctx[1].description.name.value);
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
    		id: create_if_block_13.name,
    		type: "if",
    		source: "(15:33) ",
    		ctx
    	});

    	return block;
    }

    // (13:4) {#if mode == 'edit'}
    function create_if_block_12(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "class", "sheet-value-long svelte-1h2jahu");
    			add_location(input, file$P, 13, 5, 288);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*$characterStore*/ ctx[1].description.name.value);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler*/ ctx[2]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && input.value !== /*$characterStore*/ ctx[1].description.name.value) {
    				set_input_value(input, /*$characterStore*/ ctx[1].description.name.value);
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
    		id: create_if_block_12.name,
    		type: "if",
    		source: "(13:4) {#if mode == 'edit'}",
    		ctx
    	});

    	return block;
    }

    // (26:32) 
    function create_if_block_11(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "class", "sheet-value svelte-1h2jahu");
    			input.readOnly = true;
    			add_location(input, file$P, 26, 4, 821);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*$characterStore*/ ctx[1].description.age.value);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler_3*/ ctx[5]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && input.value !== /*$characterStore*/ ctx[1].description.age.value) {
    				set_input_value(input, /*$characterStore*/ ctx[1].description.age.value);
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
    		id: create_if_block_11.name,
    		type: "if",
    		source: "(26:32) ",
    		ctx
    	});

    	return block;
    }

    // (24:3) {#if mode == 'edit'}
    function create_if_block_10(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "class", "sheet-value svelte-1h2jahu");
    			add_location(input, file$P, 24, 4, 691);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*$characterStore*/ ctx[1].description.age.value);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler_2*/ ctx[4]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && input.value !== /*$characterStore*/ ctx[1].description.age.value) {
    				set_input_value(input, /*$characterStore*/ ctx[1].description.age.value);
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
    		id: create_if_block_10.name,
    		type: "if",
    		source: "(24:3) {#if mode == 'edit'}",
    		ctx
    	});

    	return block;
    }

    // (34:32) 
    function create_if_block_9(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "class", "sheet-value svelte-1h2jahu");
    			input.readOnly = true;
    			add_location(input, file$P, 34, 4, 1155);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*$characterStore*/ ctx[1].description.height.value);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler_5*/ ctx[7]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && input.value !== /*$characterStore*/ ctx[1].description.height.value) {
    				set_input_value(input, /*$characterStore*/ ctx[1].description.height.value);
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
    		id: create_if_block_9.name,
    		type: "if",
    		source: "(34:32) ",
    		ctx
    	});

    	return block;
    }

    // (32:3) {#if mode == 'edit'}
    function create_if_block_8$1(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "class", "sheet-value svelte-1h2jahu");
    			add_location(input, file$P, 32, 4, 1022);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*$characterStore*/ ctx[1].description.height.value);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler_4*/ ctx[6]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && input.value !== /*$characterStore*/ ctx[1].description.height.value) {
    				set_input_value(input, /*$characterStore*/ ctx[1].description.height.value);
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
    		id: create_if_block_8$1.name,
    		type: "if",
    		source: "(32:3) {#if mode == 'edit'}",
    		ctx
    	});

    	return block;
    }

    // (42:32) 
    function create_if_block_7$1(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "class", "sheet-value svelte-1h2jahu");
    			input.readOnly = true;
    			add_location(input, file$P, 42, 4, 1492);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*$characterStore*/ ctx[1].description.weight.value);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler_7*/ ctx[9]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && input.value !== /*$characterStore*/ ctx[1].description.weight.value) {
    				set_input_value(input, /*$characterStore*/ ctx[1].description.weight.value);
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
    		id: create_if_block_7$1.name,
    		type: "if",
    		source: "(42:32) ",
    		ctx
    	});

    	return block;
    }

    // (40:3) {#if mode == 'edit'}
    function create_if_block_6$1(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "class", "sheet-value svelte-1h2jahu");
    			add_location(input, file$P, 40, 4, 1359);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*$characterStore*/ ctx[1].description.weight.value);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler_6*/ ctx[8]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && input.value !== /*$characterStore*/ ctx[1].description.weight.value) {
    				set_input_value(input, /*$characterStore*/ ctx[1].description.weight.value);
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
    		id: create_if_block_6$1.name,
    		type: "if",
    		source: "(40:3) {#if mode == 'edit'}",
    		ctx
    	});

    	return block;
    }

    // (52:32) 
    function create_if_block_5$3(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "class", "sheet-value svelte-1h2jahu");
    			input.readOnly = true;
    			add_location(input, file$P, 52, 4, 1871);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*$characterStore*/ ctx[1].description.sex.value);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler_9*/ ctx[11]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && input.value !== /*$characterStore*/ ctx[1].description.sex.value) {
    				set_input_value(input, /*$characterStore*/ ctx[1].description.sex.value);
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
    		id: create_if_block_5$3.name,
    		type: "if",
    		source: "(52:32) ",
    		ctx
    	});

    	return block;
    }

    // (50:3) {#if mode == 'edit'}
    function create_if_block_4$3(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "class", "sheet-value svelte-1h2jahu");
    			add_location(input, file$P, 50, 4, 1741);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*$characterStore*/ ctx[1].description.sex.value);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler_8*/ ctx[10]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && input.value !== /*$characterStore*/ ctx[1].description.sex.value) {
    				set_input_value(input, /*$characterStore*/ ctx[1].description.sex.value);
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
    		id: create_if_block_4$3.name,
    		type: "if",
    		source: "(50:3) {#if mode == 'edit'}",
    		ctx
    	});

    	return block;
    }

    // (60:32) 
    function create_if_block_3$3(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "class", "sheet-value svelte-1h2jahu");
    			input.readOnly = true;
    			add_location(input, file$P, 60, 4, 2204);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*$characterStore*/ ctx[1].description.skin.value);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler_11*/ ctx[13]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && input.value !== /*$characterStore*/ ctx[1].description.skin.value) {
    				set_input_value(input, /*$characterStore*/ ctx[1].description.skin.value);
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
    		id: create_if_block_3$3.name,
    		type: "if",
    		source: "(60:32) ",
    		ctx
    	});

    	return block;
    }

    // (58:3) {#if mode == 'edit'}
    function create_if_block_2$4(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "class", "sheet-value svelte-1h2jahu");
    			add_location(input, file$P, 58, 4, 2073);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*$characterStore*/ ctx[1].description.skin.value);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler_10*/ ctx[12]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && input.value !== /*$characterStore*/ ctx[1].description.skin.value) {
    				set_input_value(input, /*$characterStore*/ ctx[1].description.skin.value);
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
    		id: create_if_block_2$4.name,
    		type: "if",
    		source: "(58:3) {#if mode == 'edit'}",
    		ctx
    	});

    	return block;
    }

    // (68:32) 
    function create_if_block_1$8(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "class", "sheet-value svelte-1h2jahu");
    			input.readOnly = true;
    			add_location(input, file$P, 68, 4, 2538);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*$characterStore*/ ctx[1].description.hair.value);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler_13*/ ctx[15]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && input.value !== /*$characterStore*/ ctx[1].description.hair.value) {
    				set_input_value(input, /*$characterStore*/ ctx[1].description.hair.value);
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
    		id: create_if_block_1$8.name,
    		type: "if",
    		source: "(68:32) ",
    		ctx
    	});

    	return block;
    }

    // (66:3) {#if mode == 'edit'}
    function create_if_block$i(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "class", "sheet-value svelte-1h2jahu");
    			add_location(input, file$P, 66, 4, 2407);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*$characterStore*/ ctx[1].description.hair.value);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler_12*/ ctx[14]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && input.value !== /*$characterStore*/ ctx[1].description.hair.value) {
    				set_input_value(input, /*$characterStore*/ ctx[1].description.hair.value);
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
    		id: create_if_block$i.name,
    		type: "if",
    		source: "(66:3) {#if mode == 'edit'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$T(ctx) {
    	let div10;
    	let div1;
    	let div0;
    	let span0;
    	let t1;
    	let span1;
    	let t2;
    	let div5;
    	let div2;
    	let span2;
    	let t4;
    	let t5;
    	let div3;
    	let span3;
    	let t7;
    	let t8;
    	let div4;
    	let span4;
    	let t10;
    	let t11;
    	let div9;
    	let div6;
    	let span5;
    	let t13;
    	let t14;
    	let div7;
    	let span6;
    	let t16;
    	let t17;
    	let div8;
    	let span7;
    	let t19;

    	function select_block_type(ctx, dirty) {
    		if (/*mode*/ ctx[0] == "edit") return create_if_block_12;
    		if (/*mode*/ ctx[0] == "readonly") return create_if_block_13;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type && current_block_type(ctx);

    	function select_block_type_1(ctx, dirty) {
    		if (/*mode*/ ctx[0] == "edit") return create_if_block_10;
    		if (/*mode*/ ctx[0] == "readonly") return create_if_block_11;
    	}

    	let current_block_type_1 = select_block_type_1(ctx);
    	let if_block1 = current_block_type_1 && current_block_type_1(ctx);

    	function select_block_type_2(ctx, dirty) {
    		if (/*mode*/ ctx[0] == "edit") return create_if_block_8$1;
    		if (/*mode*/ ctx[0] == "readonly") return create_if_block_9;
    	}

    	let current_block_type_2 = select_block_type_2(ctx);
    	let if_block2 = current_block_type_2 && current_block_type_2(ctx);

    	function select_block_type_3(ctx, dirty) {
    		if (/*mode*/ ctx[0] == "edit") return create_if_block_6$1;
    		if (/*mode*/ ctx[0] == "readonly") return create_if_block_7$1;
    	}

    	let current_block_type_3 = select_block_type_3(ctx);
    	let if_block3 = current_block_type_3 && current_block_type_3(ctx);

    	function select_block_type_4(ctx, dirty) {
    		if (/*mode*/ ctx[0] == "edit") return create_if_block_4$3;
    		if (/*mode*/ ctx[0] == "readonly") return create_if_block_5$3;
    	}

    	let current_block_type_4 = select_block_type_4(ctx);
    	let if_block4 = current_block_type_4 && current_block_type_4(ctx);

    	function select_block_type_5(ctx, dirty) {
    		if (/*mode*/ ctx[0] == "edit") return create_if_block_2$4;
    		if (/*mode*/ ctx[0] == "readonly") return create_if_block_3$3;
    	}

    	let current_block_type_5 = select_block_type_5(ctx);
    	let if_block5 = current_block_type_5 && current_block_type_5(ctx);

    	function select_block_type_6(ctx, dirty) {
    		if (/*mode*/ ctx[0] == "edit") return create_if_block$i;
    		if (/*mode*/ ctx[0] == "readonly") return create_if_block_1$8;
    	}

    	let current_block_type_6 = select_block_type_6(ctx);
    	let if_block6 = current_block_type_6 && current_block_type_6(ctx);

    	const block = {
    		c: function create() {
    			div10 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			span0 = element("span");
    			span0.textContent = "Name:";
    			t1 = space();
    			span1 = element("span");
    			if (if_block0) if_block0.c();
    			t2 = space();
    			div5 = element("div");
    			div2 = element("div");
    			span2 = element("span");
    			span2.textContent = "Age:";
    			t4 = space();
    			if (if_block1) if_block1.c();
    			t5 = space();
    			div3 = element("div");
    			span3 = element("span");
    			span3.textContent = "Ht:";
    			t7 = space();
    			if (if_block2) if_block2.c();
    			t8 = space();
    			div4 = element("div");
    			span4 = element("span");
    			span4.textContent = "Wt:";
    			t10 = space();
    			if (if_block3) if_block3.c();
    			t11 = space();
    			div9 = element("div");
    			div6 = element("div");
    			span5 = element("span");
    			span5.textContent = "Sex:";
    			t13 = space();
    			if (if_block4) if_block4.c();
    			t14 = space();
    			div7 = element("div");
    			span6 = element("span");
    			span6.textContent = "Skin:";
    			t16 = space();
    			if (if_block5) if_block5.c();
    			t17 = space();
    			div8 = element("div");
    			span7 = element("span");
    			span7.textContent = "Hair:";
    			t19 = space();
    			if (if_block6) if_block6.c();
    			add_location(span0, file$P, 10, 3, 209);
    			attr_dev(span1, "class", "name-field");
    			add_location(span1, file$P, 11, 3, 232);
    			attr_dev(div0, "class", "sheet-card-item svelte-1h2jahu");
    			add_location(div0, file$P, 9, 2, 176);
    			attr_dev(div1, "class", "sheet-card-full-block");
    			add_location(div1, file$P, 8, 1, 138);
    			add_location(span2, file$P, 22, 3, 644);
    			attr_dev(div2, "class", "sheet-card-item svelte-1h2jahu");
    			add_location(div2, file$P, 21, 2, 611);
    			add_location(span3, file$P, 30, 3, 976);
    			attr_dev(div3, "class", "sheet-card-item svelte-1h2jahu");
    			add_location(div3, file$P, 29, 2, 943);
    			add_location(span4, file$P, 38, 3, 1313);
    			attr_dev(div4, "class", "sheet-card-item svelte-1h2jahu");
    			add_location(div4, file$P, 37, 2, 1280);
    			attr_dev(div5, "class", "sheet-card-half-block");
    			add_location(div5, file$P, 20, 1, 573);
    			add_location(span5, file$P, 48, 3, 1695);
    			attr_dev(div6, "class", "sheet-card-item svelte-1h2jahu");
    			add_location(div6, file$P, 47, 2, 1662);
    			add_location(span6, file$P, 56, 3, 2026);
    			attr_dev(div7, "class", "sheet-card-item svelte-1h2jahu");
    			add_location(div7, file$P, 55, 2, 1993);
    			add_location(span7, file$P, 64, 3, 2360);
    			attr_dev(div8, "class", "sheet-card-item svelte-1h2jahu");
    			add_location(div8, file$P, 63, 2, 2327);
    			attr_dev(div9, "class", "sheet-card-half-block");
    			add_location(div9, file$P, 46, 1, 1624);
    			attr_dev(div10, "class", "sheet-card-body");
    			add_location(div10, file$P, 7, 0, 107);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div10, anchor);
    			append_dev(div10, div1);
    			append_dev(div1, div0);
    			append_dev(div0, span0);
    			append_dev(div0, t1);
    			append_dev(div0, span1);
    			if (if_block0) if_block0.m(span1, null);
    			append_dev(div10, t2);
    			append_dev(div10, div5);
    			append_dev(div5, div2);
    			append_dev(div2, span2);
    			append_dev(div2, t4);
    			if (if_block1) if_block1.m(div2, null);
    			append_dev(div5, t5);
    			append_dev(div5, div3);
    			append_dev(div3, span3);
    			append_dev(div3, t7);
    			if (if_block2) if_block2.m(div3, null);
    			append_dev(div5, t8);
    			append_dev(div5, div4);
    			append_dev(div4, span4);
    			append_dev(div4, t10);
    			if (if_block3) if_block3.m(div4, null);
    			append_dev(div10, t11);
    			append_dev(div10, div9);
    			append_dev(div9, div6);
    			append_dev(div6, span5);
    			append_dev(div6, t13);
    			if (if_block4) if_block4.m(div6, null);
    			append_dev(div9, t14);
    			append_dev(div9, div7);
    			append_dev(div7, span6);
    			append_dev(div7, t16);
    			if (if_block5) if_block5.m(div7, null);
    			append_dev(div9, t17);
    			append_dev(div9, div8);
    			append_dev(div8, span7);
    			append_dev(div8, t19);
    			if (if_block6) if_block6.m(div8, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
    				if_block0.p(ctx, dirty);
    			} else {
    				if (if_block0) if_block0.d(1);
    				if_block0 = current_block_type && current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(span1, null);
    				}
    			}

    			if (current_block_type_1 === (current_block_type_1 = select_block_type_1(ctx)) && if_block1) {
    				if_block1.p(ctx, dirty);
    			} else {
    				if (if_block1) if_block1.d(1);
    				if_block1 = current_block_type_1 && current_block_type_1(ctx);

    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(div2, null);
    				}
    			}

    			if (current_block_type_2 === (current_block_type_2 = select_block_type_2(ctx)) && if_block2) {
    				if_block2.p(ctx, dirty);
    			} else {
    				if (if_block2) if_block2.d(1);
    				if_block2 = current_block_type_2 && current_block_type_2(ctx);

    				if (if_block2) {
    					if_block2.c();
    					if_block2.m(div3, null);
    				}
    			}

    			if (current_block_type_3 === (current_block_type_3 = select_block_type_3(ctx)) && if_block3) {
    				if_block3.p(ctx, dirty);
    			} else {
    				if (if_block3) if_block3.d(1);
    				if_block3 = current_block_type_3 && current_block_type_3(ctx);

    				if (if_block3) {
    					if_block3.c();
    					if_block3.m(div4, null);
    				}
    			}

    			if (current_block_type_4 === (current_block_type_4 = select_block_type_4(ctx)) && if_block4) {
    				if_block4.p(ctx, dirty);
    			} else {
    				if (if_block4) if_block4.d(1);
    				if_block4 = current_block_type_4 && current_block_type_4(ctx);

    				if (if_block4) {
    					if_block4.c();
    					if_block4.m(div6, null);
    				}
    			}

    			if (current_block_type_5 === (current_block_type_5 = select_block_type_5(ctx)) && if_block5) {
    				if_block5.p(ctx, dirty);
    			} else {
    				if (if_block5) if_block5.d(1);
    				if_block5 = current_block_type_5 && current_block_type_5(ctx);

    				if (if_block5) {
    					if_block5.c();
    					if_block5.m(div7, null);
    				}
    			}

    			if (current_block_type_6 === (current_block_type_6 = select_block_type_6(ctx)) && if_block6) {
    				if_block6.p(ctx, dirty);
    			} else {
    				if (if_block6) if_block6.d(1);
    				if_block6 = current_block_type_6 && current_block_type_6(ctx);

    				if (if_block6) {
    					if_block6.c();
    					if_block6.m(div8, null);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div10);

    			if (if_block0) {
    				if_block0.d();
    			}

    			if (if_block1) {
    				if_block1.d();
    			}

    			if (if_block2) {
    				if_block2.d();
    			}

    			if (if_block3) {
    				if_block3.d();
    			}

    			if (if_block4) {
    				if_block4.d();
    			}

    			if (if_block5) {
    				if_block5.d();
    			}

    			if (if_block6) {
    				if_block6.d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$T.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$T($$self, $$props, $$invalidate) {
    	let $characterStore;
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(1, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("DescriptionSection", slots, []);
    	let { mode = "readonly" } = $$props;
    	const writable_props = ["mode"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<DescriptionSection> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		$characterStore.description.name.value = this.value;
    		characterStore.set($characterStore);
    	}

    	function input_input_handler_1() {
    		$characterStore.description.name.value = this.value;
    		characterStore.set($characterStore);
    	}

    	function input_input_handler_2() {
    		$characterStore.description.age.value = this.value;
    		characterStore.set($characterStore);
    	}

    	function input_input_handler_3() {
    		$characterStore.description.age.value = this.value;
    		characterStore.set($characterStore);
    	}

    	function input_input_handler_4() {
    		$characterStore.description.height.value = this.value;
    		characterStore.set($characterStore);
    	}

    	function input_input_handler_5() {
    		$characterStore.description.height.value = this.value;
    		characterStore.set($characterStore);
    	}

    	function input_input_handler_6() {
    		$characterStore.description.weight.value = this.value;
    		characterStore.set($characterStore);
    	}

    	function input_input_handler_7() {
    		$characterStore.description.weight.value = this.value;
    		characterStore.set($characterStore);
    	}

    	function input_input_handler_8() {
    		$characterStore.description.sex.value = this.value;
    		characterStore.set($characterStore);
    	}

    	function input_input_handler_9() {
    		$characterStore.description.sex.value = this.value;
    		characterStore.set($characterStore);
    	}

    	function input_input_handler_10() {
    		$characterStore.description.skin.value = this.value;
    		characterStore.set($characterStore);
    	}

    	function input_input_handler_11() {
    		$characterStore.description.skin.value = this.value;
    		characterStore.set($characterStore);
    	}

    	function input_input_handler_12() {
    		$characterStore.description.hair.value = this.value;
    		characterStore.set($characterStore);
    	}

    	function input_input_handler_13() {
    		$characterStore.description.hair.value = this.value;
    		characterStore.set($characterStore);
    	}

    	$$self.$$set = $$props => {
    		if ("mode" in $$props) $$invalidate(0, mode = $$props.mode);
    	};

    	$$self.$capture_state = () => ({ characterStore, mode, $characterStore });

    	$$self.$inject_state = $$props => {
    		if ("mode" in $$props) $$invalidate(0, mode = $$props.mode);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		mode,
    		$characterStore,
    		input_input_handler,
    		input_input_handler_1,
    		input_input_handler_2,
    		input_input_handler_3,
    		input_input_handler_4,
    		input_input_handler_5,
    		input_input_handler_6,
    		input_input_handler_7,
    		input_input_handler_8,
    		input_input_handler_9,
    		input_input_handler_10,
    		input_input_handler_11,
    		input_input_handler_12,
    		input_input_handler_13
    	];
    }

    class DescriptionSection extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$T, create_fragment$T, safe_not_equal, { mode: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DescriptionSection",
    			options,
    			id: create_fragment$T.name
    		});
    	}

    	get mode() {
    		throw new Error("<DescriptionSection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mode(value) {
    		throw new Error("<DescriptionSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/buttons/AddButton.svelte generated by Svelte v3.35.0 */

    const file$O = "src/components/buttons/AddButton.svelte";

    function create_fragment$S(ctx) {
    	let button;
    	let div;

    	const block = {
    		c: function create() {
    			button = element("button");
    			div = element("div");
    			div.textContent = "+";
    			attr_dev(div, "class", "btn-icon");
    			add_location(div, file$O, 1, 1, 55);
    			attr_dev(button, "class", "btn-box add-btn green-btn square-btn svelte-1pvn0pg");
    			add_location(button, file$O, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, div);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$S.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$S($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("AddButton", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<AddButton> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class AddButton extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$S, create_fragment$S, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AddButton",
    			options,
    			id: create_fragment$S.name
    		});
    	}
    }

    const BilingualDictionary = new Gear({
    	id: ``,
    	name: `Bilingual Dictionary`,
    	desc: [
    		`Multilingual Ability`,
    	],
    	sz: 1,
    	type: `Document`
    });

    const BodyInBalance = new Gear({
    	id: ``,
    	name: `Body in Balance`,
    	desc: [
    		`+1 Athletics`,
    	],
    	sz: 1,
    	type: `Document`
    });

    const BookOfFiveRings = new Gear({
    	id: ``,
    	name: `Tao of Jeet Kune Do`,
    	desc: [
    		`+1 Melee`,
    	],
    	sz: 1,
    	type: `Document`
    });

    const ClassicNovel = new Gear({
    	id: ``,
    	name: `Classic Novel`,
    	desc: [
    		`+1 Psyche`,
    	],
    	sz: 1,
    	type: `Document`
    });

    const BriefHistoryOfTime = new Gear({
    	id: ``,
    	name: `Brief History of Time`,
    	desc: [
    		`+1 Science`,
    	],
    	sz: 1,
    	type: `Document`
    });

    const DefensiveDriving = new Gear({
    	id: ``,
    	name: `Defensive Driving`,
    	desc: [
    		`+1 Drive`,
    	],
    	sz: 1,
    	type: `Document`
    });

    const DogTricks = new Gear({
    	id: ``,
    	name: `Dog Tricks`,
    	desc: [
    		`+1 Tame`,
    	],
    	sz: 1,
    	type: `Document`
    });

    const EffectiveHabits = new Gear({
    	id: ``,
    	name: `Effective Habits`,
    	desc: [
    		`+1 to any one Skill`,
    	],
    	sz: 1,
    	type: `Document`
    });

    const EngineeringConcepts = new Gear({
    	id: ``,
    	name: `Engineering Concepts`,
    	desc: [
    		`+1 Build`,
    	],
    	sz: 1,
    	type: `Document`
    });

    const GraysAnatomy = new Gear({
    	id: ``,
    	name: `Gray's Anatomy`,
    	desc: [
    		`+1 Medicine`,
    	],
    	sz: 1,
    	type: `Document`
    });

    const HolyBook = new Gear({
    	id: ``,
    	name: `Holy Book`,
    	desc: [
    		`-1 Psyche`,
    	],
    	sz: 1,
    	type: `Document`
    });

    const HomeSecurity = new Gear({
    	id: ``,
    	name: `Home Security`,
    	desc: [
    		`+1 Larceny`,
    	],
    	sz: 1,
    	type: `Document`
    });

    const HowToWinFriends = new Gear({
    	id: ``,
    	name: `How to Win Friends`,
    	desc: [
    		`+1 Socialize`,
    	],
    	sz: 1,
    	type: `Document`
    });

    const HowYogaWorks = new Gear({
    	id: ``,
    	name: `How Yoga Works`,
    	desc: [
    		`+1 Acrobatics`,
    	],
    	sz: 1,
    	type: `Document`
    });

    const LeadershipBasics = new Gear({
    	id: ``,
    	name: `Leadership Basics`,
    	desc: [
    		`+1 Leadership`,
    	],
    	sz: 1,
    	type: `Document`
    });

    const MapAtlas = new Gear({
    	id: ``,
    	name: `Map (Atlas)`,
    	desc: [
    		`+1 Survival(Navigate)`,
    	],
    	sz: 1,
    	type: `Document`
    });

    const MapLocal = new Gear({
    	id: ``,
    	name: `Map (Local)`,
    	desc: [
    		`+1 Survival(Navigate) in a given Region.`,
    	],
    	sz: 0,
    	type: `Document`
    });

    const MapTopographic = new Gear({
    	id: ``,
    	name: `Map (Topographic)`,
    	desc: [
    		`+3 Survival(Navigate) in a given Region.`,
    	],
    	sz: 0,
    	type: `Document`
    });

    const PersonalDefense = new Gear({
    	id: ``,
    	name: `Personal Defense`,
    	desc: [
    		`+1 Ranged`,
    	],
    	sz: 1,
    	type: `Document`
    });

    const SASSurvivalGuide = new Gear({
    	id: ``,
    	name: `SAS Survival Guide`,
    	desc: [
    		`+1 Survival`,
    	],
    	sz: 1,
    	type: `Document`
    });

    const StandupComedy = new Gear({
    	id: ``,
    	name: `Stand-up Comedy`,
    	desc: [
    		`+1 Entertain`,
    	],
    	sz: 1,
    	type: `Document`
    });

    const YellowPages = new Gear({
    	id: ``,
    	name: `Yellow Pages`,
    	desc: [
    		`+1 Scavenging in a given Region.`,
    	],
    	sz: 1,
    	type: `Document`
    });

    const ZenMind = new Gear({
    	id: ``,
    	name: `Zen Mind`,
    	desc: [
    		`+1 Perception`,
    	],
    	sz: 1,
    	type: `Document`
    });

    var DocumentsList = {
    	name: `Documents`,
    	list: [
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
    	]
    };

    const Alcohol = new Gear({
    	id: ``,
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
    	id: ``,
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
    	id: ``,
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
    	id: ``,
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
    	id: ``,
    	name: `Sedative`,
    	desc: [
    		`Demeanor #6 per round to take any action.`,
    	],
    	sz: 0,
    	type: `Drug`
    });
    Sedative.mix = 12;
    Sedative.od = true;

    const Stimulant = new Gear({
    	id: ``,
    	name: `Stimulant`,
    	desc: [
    		`Ignore Exhaustion penalties for 6hrs.`,
    	],
    	sz: 0,
    	type: `Drug`
    });
    Stimulant.mix = 9;
    Stimulant.od = true;

    var DrugsList = {
    	name: `Drugs`,
    	list: [
    		Alcohol,
    		Antibiotic,
    		Hallucinogen,
    		Painkiller,
    		Sedative,
    		Stimulant,
    	]
    };


    // OLD AbsorptionUGS
    // new Drug(`Chloroform`,		  15, true,   `Liquid. C#12 or Unconscious. Takes d6 rounds.`,	   0)
    // new Drug(`Cyanide`,			 18, true,   `Pill. d6 Torso DMG/round for 5 rounds.`,				0)
    // new Drug(`Epinephrine`,		 15, true,   `Injection. Resuscitate within C+3mins.`,		  0)
    // new Drug(`Iodine`,			  6,  false,  `Purify 1gal of Water. Prevents Radiation.`,		0)
    // new Drug(`Potassium Chloride`,  18, true,   `Injection. d6 Torso DMG/min for 5mins.`,		   0)
    // new Drug(`Sodium Pentothal`,	15, true,   `Injection. -6 Entertain(Lie).`,					0)

    const Cellphone = new Gear({
    	id: ``,
    	name: `Cellphone`,
    	type: `Electronics`,
    	desc: [
    		`1yd light, camera, remote control.`,
    	],
    	sz: 0
    });
    Cellphone.dur = 3600;

    const EmergencyRadio = new Gear({
    	id: ``,
    	name: `Emergency Radio`,
    	type: `Electronics`,
    	desc: [
    		`AM/FM/Shortwave.`,
    		`1yd light.`,
    	],
    	sz: 1
    });
    EmergencyRadio.dur = 7200;

    const Flashlight = new Gear({
    	id: ``,
    	name: `Flashlight`,
    	type: `Electronics`,
    	desc: [
    		`10yd light. -3 Ranged Attack to Blind 1 round.`,
    	],
    	sz: 1
    });
    Flashlight.dur = 3600;

    const GeigerCounter = new Gear({
    	id: ``,
    	name: `Geiger Counter`,
    	type: `Electronics`,
    	desc: [
    		`Science 6# to detect Radiation in 1yd.`,
    	],
    	sz: 1
    });
    GeigerCounter.dur = 28800;

    const HandRadio = new Gear({
    	id: ``,
    	name: `Hand Radio`,
    	type: `Electronics`,
    	desc: [
    		`9-channel 2-way radio.`,
    		`3 mile range.`,
    	],
    	sz: 1
    });
    HandRadio.dur = 10800;

    const Headlamp = new Gear({
    	id: ``,
    	name: `Headlamp`,
    	type: `Electronics`,
    	desc: [
    		`3yd light. Hands free.`,
    	],
    	sz: 0
    });
    Headlamp.dur = 3600;

    const Lantern = new Gear({
    	id: ``,
    	name: `Lantern`,
    	type: `Electronics`,
    	desc: [
    		`3yd light radius.`,
    	],
    	sz: 2
    });
    Lantern.dur = 7200;

    const Megaphone = new Gear({
    	id: ``,
    	name: `Megaphone`,
    	type: `Electronics`,
    	desc: [
    		`+1 Leadership when speaking to a crowd.`,
    	],
    	sz: 2
    });
    Megaphone.dur = 14400;

    const Multimeter = new Gear({
    	id: ``,
    	name: `Multimeter`,
    	type: `Electronics`,
    	desc: [
    		`+3 Science(Technology).`,
    		`Detects voltage, battery life, and closed circuits.`,
    	],
    	sz: 1
    });
    Multimeter.dur = 57600;

    const NightvisionGoggles = new Gear({
    	id: ``,
    	name: `Nightvision Goggles`,
    	type: `Electronics`,
    	desc: [
    		`Ignore Visibility penalties in darkness.`,
    	],
    	sz: 1
    });
    NightvisionGoggles.dur = 43200;

    const QuadcopterDrone = new Gear({
    	id: ``,
    	name: `Quadcopter Drone`,
    	type: `Electronics`,
    	desc: [
    		`Science 6# to use.`,
    		`Onboard camera.`,
    		`90yd Speed.`,
    	],
    	sz: 2
    });
    QuadcopterDrone.dur = 300;

    const RCCar = new Gear({
    	id: ``,
    	name: `RC Car`,
    	type: `Electronics`,
    	desc: [
    		`Science 3# to use.`,
    		`45yd Speed.`,
    	],
    	sz: 3
    });
    RCCar.dur = 600;

    const SolarLamp = new Gear({
    	id: ``,
    	name: `Solar Lamp`,
    	type: `Electronics`,
    	desc: [
    		`1yd light radius.`,
    		`1 day charge.`,
    	],
    	sz: 1
    });
    SolarLamp.dur = 10800;

    const StunGun = new Gear({
    	id: ``,
    	name: `Stun Gun`,
    	type: `Electronics`,
    	desc: [
    		`Melee Attack.`,
    		`C9# or Stun next round.`,
    	],
    	sz: 1
    });
    StunGun.dur = 120;

    var ElectronicsList = {
    	name: `Electronics`,
    	list: [
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
    	]
    };


    // OLD ELECTRONICS
    //  new Gear(`Radio Jammer`,		  3,	  `Blocks radio signal within 100yds.`,	   1)

    const Bandage = new Gear({
    	id: ``,
    	name: `Bandage`,
    	type: `Medical`,
    	desc: [
    		`+1 Medicine(First-Aid).`,
    		`1 use.`,
    	],
    	sz: 0
    });

    const Crutch = new Gear({
    	id: ``,
    	name: `Crutch`,
    	type: `Medical`,
    	desc: [
    		`Halves Leg Damage Pain penalty to Speed.`,
    	],
    	sz: 3
    });

    const EMTBag = new Gear({
    	id: ``,
    	name: `EMT Bag`,
    	type: `Medical`,
    	desc: [
    		`+3 Medicine(First-Aid).`,
    		`30 uses.`,
    	],
    	sz: 5
    });

    const FirstAidKit = new Gear({
    	id: ``,
    	name: `First-Aid Kit`,
    	type: `Medical`,
    	desc: [
    		`+1 Medicine(First-Aid).`,
    		`5 uses.`,
    	],
    	sz: 1
    });

    const PressureCuff = new Gear({
    	id: ``,
    	name: `Pressure Cuff`,
    	type: `Medical`,
    	desc: [
    		`+1 Medicine.`,
    	],
    	sz: 1
    });

    const Stethoscope = new Gear({
    	id: ``,
    	name: `Stethoscope`,
    	type: `Medical`,
    	desc: [
    		`+1 Medicine.`,
    		`Perception(Hear) 6# through doors.`,
    	],
    	sz: 0
    });

    const SurgeryKit = new Gear({
    	id: ``,
    	name: `Surgery Kit`,
    	type: `Medical`,
    	desc: [
    		`+3 Medicine(Surgery).`,
    	],
    	sz: 3
    });

    const Thermometer = new Gear({
    	id: ``,
    	name: `Thermometer`,
    	type: `Medical`,
    	desc: [
    		`+1 Medicine.`,
    		`Accurately reads temperature.`,
    	],
    	sz: 0
    });

    const TransfusionKit = new Gear({
    	id: ``,
    	name: `Transfusion Kit`,
    	type: `Medical`,
    	desc: [
    		`Medicine 9#.`,
    		`Inflict 1 Bleeding Damage on the donor to heal 1 Bleeding Damage on the recipient.`,
    		`Takes 1hr.`,
    	],
    	sz: 2
    });

    const WaterFilter = new Gear({
    	id: ``,
    	name: `Water Filter`,
    	type: `Medical`,
    	desc: [
    		`Purifies 1 Water ration (.5gal) per minute.`,
    	],
    	sz: 1
    });

    var MedicalList = {
    	name: `Medical`,
    	list: [
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
    	]
    };

    const AirHorn = new Gear({
    	id: ``,
    	name: `Air Horn`,
    	desc: [
    		`Emits a loud shriek up to a 1 mile radius.`,
    	],
    	sz: 1
    });

    const Bicycle = new Gear({
    	id: ``,
    	name: `Bicycle`,
    	desc: [
    		`Athletics 3#.`,
    		`Speed x3yds (x.7mph).`,
    		`2h.`,
    	],
    	sz: 8
    });

    const Binoculars = new Gear({
    	id: ``,
    	name: `Binoculars`,
    	desc: [
    		`+3 Perception(See) at 50+yds.`,
    	],
    	sz: 1
    });

    const CageTrap = new Gear({
    	id: ``,
    	name: `Cage Trap`,
    	desc: [
    		`+3 Survival(Forage).`,
    		`Takes 1day.`,
    	],
    	sz: 5
    });

    const Candle = new Gear({
    	id: ``,
    	name: `Candle`,
    	desc: [
    		`1yd light radius for 6hrs.`,
    	],
    	sz: 0
    });

    const Candy = new Gear({
    	id: ``,
    	name: `Candy`,
    	desc: [
    		`Restores 1 Luck point.`,
    		`1/day.`,
    	],
    	sz: 0
    });

    const Chalk = new Gear({
    	id: ``,
    	name: `Chalk`,
    	desc: [
    		`Used to temporarily write on any surface.`,
    	],
    	sz: 0
    });

    const Compass = new Gear({
    	id: ``,
    	name: `Compass`,
    	desc: [
    		`+3 Survival(Navigate).`,
    		`Always points North.`,
    	],
    	sz: 0
    });

    const EggTimer = new Gear({
    	id: ``,
    	name: `Egg Timer`,
    	desc: [
    		`Set up to 60mins.`,
    		`Loud ringing for 1min.`,
    	],
    	sz: 0
    });

    const Firestick = new Gear({
    	id: ``,
    	name: `Fire-stick`,
    	desc: [
    		`+3 Survival(Camp).`,
    		`Magnesium rod and steel.`,
    	],
    	sz: 0
    });

    const FishingPole = new Gear({
    	id: ``,
    	name: `Fishing Pole`,
    	desc: [
    		`+1 Survival(Forage) at river, lake, or ocean.`,
    	],
    	sz: 1
    });

    const FlareGun = new Gear({
    	id: ``,
    	name: `Flare Gun`,
    	desc: [
    		`Pistol.`,
    		`Range:3.`,
    		`Ammo: 12g Flares or 1 use 12g.`,
    	],
    	sz: 1
    });

    const GrapplingHook = new Gear({
    	id: ``,
    	name: `Grappling Hook`,
    	desc: [
    		`+3 Athletics(Climb and Rappel).`,
    		`Holds 100Sz.`,
    	],
    	sz: 2
    });

    const Hammock = new Gear({
    	id: ``,
    	name: `Hammock`,
    	desc: [
    		`Suspended sleeping device for 1 person.`,
    	],
    	sz: 1
    });

    const Lighter = new Gear({
    	id: ``,
    	name: `Lighter`,
    	desc: [
    		`Makes a small fire.`,
    		`1yd radius light.`,
    	],
    	sz: 0
    });

    const LuxuryItem = new Gear({
    	id: ``,
    	name: `Luxury Item`,
    	desc: [
    		`Toilet paper, toothpaste, cigarette, etc.`,
    		`+1 Psyche 1/wk.`,
    	],
    	sz: 0
    });

    const Marbles = new Gear({
    	id: ``,
    	name: `Marbles`,
    	desc: [
    		`30/bag.`,
    		`2sqyd area.`,
    		`A12# or fall Prone.`,
    	],
    	sz: 1
    });

    const Marker = new Gear({
    	id: ``,
    	name: `Marker`,
    	desc: [
    		`Used to permanently write on any surface.`,
    	],
    	sz: 0
    });

    const Matchbook = new Gear({
    	id: ``,
    	name: `Matchbook`,
    	desc: [
    		`+1 Survival(Camp).`,
    		`1yd light radius, 3 rounds.`,
    	],
    	sz: 0
    });

    const Monocular = new Gear({
    	id: ``,
    	name: `Monocular`,
    	desc: [
    		`+1 Perception(See) at 25+yds.`,
    	],
    	sz: 1
    });

    const MusicalInstrument = new Gear({
    	id: ``,
    	name: `Musical Instrument`,
    	desc: [
    		`+1 Entertain(Distract and Inspire).`,
    	],
    	sz: 1
    });

    const MylarBlanket = new Gear({
    	id: ``,
    	name: `Mylar Blanket`,
    	desc: [
    		`Cold Resistance.`,
    		`1yd x 2yd reflective foil sheet.`,
    	],
    	sz: 0
    });

    const Notebook = new Gear({
    	id: ``,
    	name: `Notebook`,
    	desc: [
    		`100 pages of paper with a wire binding.`,
    	],
    	sz: 1
    });

    const Padlock = new Gear({
    	id: ``,
    	name: `Padlock`,
    	desc: [
    		`2 Absorption.`,
    		`Larceny(Disable) 9#.`,
    	],
    	sz: 0
    });

    const Paracord = new Gear({
    	id: ``,
    	name: `Paracord`,
    	desc: [
    		`60yd coil.`,
    		`Holds 50Sz.`,
    	],
    	sz: 1
    });

    const PepperSpray = new Gear({
    	id: ``,
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
    	id: ``,
    	name: `Pocket Mirror`,
    	desc: [
    		`Perception(See) 6# to see from behind Cover.`,
    	],
    	sz: 0
    });

    const RatTrap = new Gear({
    	id: ``,
    	name: `Rat Trap`,
    	desc: [
    		`+1 Survival(Forage).`,
    		`Takes 1day.`,
    	],
    	sz: 0
    });

    const RoadFlare = new Gear({
    	id: ``,
    	name: `Road Flare`,
    	desc: [
    		`3 Fire Damage.`,
    		`10yd light radius for 20mins.`,
    	],
    	sz: 1
    });

    const Rope = new Gear({
    	id: ``,
    	name: `Rope`,
    	desc: [
    		`30yd nylon coil.`,
    		`Holds 100Sz.`,
    		`Survival 6# to use as Handcuffs.`,
    	],
    	sz: 2
    });

    const Skateboard = new Gear({
    	id: ``,
    	name: `Skateboard`,
    	desc: [
    		`Athletics 6#.`,
    		`Speed x3.`,
    		`Fail:Prone.`,
    	],
    	sz: 2
    });

    const SleepingBag = new Gear({
    	id: ``,
    	name: `Sleeping Bag`,
    	desc: [
    		`Insulated bag for up to 2 people.`,
    		`Cold Resistance +3hrs.`,
    	],
    	sz: 2
    });

    const SpottingScope = new Gear({
    	id: ``,
    	name: `Spotting Scope`,
    	desc: [
    		`+6 Perception(See) at 100+yds.`,
    	],
    	sz: 1
    });

    const Tarp = new Gear({
    	id: ``,
    	name: `Tarp`,
    	desc: [
    		`3yd x 3yd plastic sheet.`,
    		`Cold Resistance.`,
    		`Waterproof.`,
    	],
    	sz: 1
    });

    const Tent = new Gear({
    	id: ``,
    	name: `Tent`,
    	desc: [
    		`4 person.`,
    		`5min setup/take-down.`,
    		`Cold Resistance +3hrs.`,
    	],
    	sz: 4
    });

    const Whetstone = new Gear({
    	id: ``,
    	name: `Whetstone`,
    	desc: [
    		`Blade gets +1 Damage for 1day.`,
    		`Takes 1hr/blade.`,
    	],
    	sz: 0
    });

    const Whistle = new Gear({
    	id: ``,
    	name: `Whistle`,
    	desc: [
    		`+1 Tame(Train).`,
    		`Loud shriek 500yd radius.`,
    	],
    	sz: 0
    });

    const ZipTie = new Gear({
    	id: ``,
    	name: `Zip Tie`,
    	desc: [
    		`Place on Arms behind target's back to make them Harmless.`,
    		`Place on Legs to make target Immobilized.`,
    		`Constitution or Acrobatics 12# to escape.`,
    		`Use for +1 Build.`,
    	],
    	sz: 0
    });

    var MiscellaneousList = {
    	name: `Miscellaneous`,
    	list: [
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
    	]
    };

    const Chemical = new Gear({
    	id: ``,
    	name: `Chemical`,
    	type: `Resource`,
    	desc: [
    		`Substances used for Science(Chemistry).`,
    	],
    	sz: 1
    });

    const Food = new Gear({
    	id: ``,
    	name: `Food`,
    	type: `Resource`,
    	desc: [
    		`1 unit Needed per day to prevent Starvation.`,
    	],
    	sz: 1
    });

    const Fuel = new Gear({
    	id: ``,
    	name: `Fuel`,
    	type: `Resource`,
    	desc: [
    		`Flammable liquid. Used to power Vehicles and make explosives.`,
    	],
    	sz: 1
    });

    const Part = new Gear({
    	id: ``,
    	name: `Part`,
    	type: `Resource`,
    	desc: [
    		`Scrap used for Build and Science(Tech).`,
    	],
    	sz: 1
    });

    const Water = new Gear({
    	id: ``,
    	name: `Water`,
    	type: `Resource`,
    	desc: [
    		`1 unit Needed per day to prevent Dehydration.`,
    	],
    	sz: 1
    });

    var ResourcesList = {
    	name: `Resources`,
    	list: [
    		Chemical,
    		Food,
    		Fuel,
    		Part,
    		Water,
    	]
    };

    const Backpack = new Gear({
    	id: ``,
    	name: `Backpack`,
    	desc: [
    		`2 rounds to access.`,
    	],
    	sz: 1
    });
    Backpack.slots = 30;

    const Bandoleer = new Gear({
    	id: ``,
    	name: `Bandoleer`,
    	desc: [
    		`Holds 50 bullets of any caliber.`,
    	],
    	sz: 0
    });
    Bandoleer.slots = 1;

    const BDUJacket = new Gear({
    	id: ``,
    	name: `BDU Jacket`,
    	desc: [
    		`Camo.`,
    	],
    	sz: 0
    });
    BDUJacket.slots = 4;

    const CargoPants = new Gear({
    	id: ``,
    	name: `Cargo Pants`,
    	desc: [
    		`Camo.`,
    	],
    	sz: 1
    });
    CargoPants.slots = 6;

    const Canteen = new Gear({
    	id: ``,
    	name: `Canteen`,
    	desc: [
    		`Holds 1 unit (.5gal) of liquid.`,
    		`Metal.`,
    	],
    	sz: 1
    });
    Canteen.slots = 1;

    const ConcealedHolster = new Gear({
    	id: ``,
    	name: `Concealed Holster`,
    	desc: [
    		`Perception 12# to spot a Size 1 Gun.`,
    	],
    	sz: 0
    });
    ConcealedHolster.slots = 1;

    const Cooler = new Gear({
    	id: ``,
    	name: `Cooler`,
    	desc: [
    		`Preserves Hunted or Foraged Food for 6 days.`,
    	],
    	sz: 5
    });
    Cooler.slots = 30;

    const DuffelBag = new Gear({
    	id: ``,
    	name: `Duffel Bag`,
    	desc: [
    		`2 rounds to access.`,
    	],
    	sz: 3
    });
    DuffelBag.slots = 40;

    const FuelCan = new Gear({
    	id: ``,
    	name: `Fuel Can`,
    	desc: [
    		`5gal Fuel.`,
    		`d6 Fire Damage/gal, 1min, 1yd/gal Blast.`,
    	],
    	sz: 2
    });
    FuelCan.slots = 5;

    const Hoody = new Gear({
    	id: ``,
    	name: `Hoody`,
    	desc: [
    		`Cold Resistance.`,
    	],
    	sz: 0
    });
    Hoody.slots = 2;

    const HydrationPack = new Gear({
    	id: ``,
    	name: `Hydration Pack`,
    	desc: [
    		`Holds 4 units (2gal) of liquid.`,
    	],
    	sz: 0
    });
    HydrationPack.slots = 4;

    const Lockbox = new Gear({
    	id: ``,
    	name: `Lockbox`,
    	desc: [
    		`2 Absorption.`,
    		`Fire Resistance.`,
    		`Larceny(Disable) 9#.`,
    	],
    	sz: 2
    });
    Lockbox.slots = 1;

    const MessengerBag = new Gear({
    	id: ``,
    	name: `Messenger Bag`,
    	desc: [
    		`1 round to access.`,
    	],
    	sz: 1
    });
    MessengerBag.slots = 4;

    const PlasticJug = new Gear({
    	id: ``,
    	name: `Plastic Jug`,
    	desc: [
    		`Holds 2 units (1gal).`,
    	],
    	sz: 1
    });
    PlasticJug.slots = 2;

    const Purse = new Gear({
    	id: ``,
    	name: `Purse`,
    	desc: [
    		`1 round to access.`,
    	],
    	sz: 1
    });
    Purse.slots = 3;

    const Speedloader = new Gear({
    	id: ``,
    	name: `Speed-loader`,
    	desc: [
    		`Reload a revolver cylinder as 1 action.`,
    	],
    	sz: 0
    });
    Speedloader.slots = 0;

    const ToolBelt = new Gear({
    	id: ``,
    	name: `Tool Belt`,
    	desc: [
    		`6x 1 Slots.`,
    		`+1 Build.`,
    		`Miscellaneous small tools.`,
    	],
    	sz: 2
    });
    ToolBelt.slots = 6;

    const TrenchCoat = new Gear({
    	id: ``,
    	name: `Trench Coat`,
    	desc: [
    		`Cold Resistance.`,
    		`+1 Stealth.`,
    	],
    	sz: 1
    });
    TrenchCoat.slots = 4;

    const WaterBottle = new Gear({
    	id: ``,
    	name: `Water Bottle`,
    	desc: [
    		`Holds 1 unit (.5gal) of liquid.`,
    	],
    	sz: 1
    });
    WaterBottle.slots = 1;

    var StorageList = {
    	name: `Storage`,
    	list: [
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
    	]
    };

    const BobbyPin = new Gear({
    	id: ``,
    	name: `Bobby Pin`,
    	desc: [
    		`Allows Larceny(Disable) roll on key locks.`,
    	],
    	sz: 0
    });

    const BoltCutters = new Gear({
    	id: ``,
    	name: `Bolt Cutters`,
    	desc: [
    		`C9# to cut metal (Handcuffs, Padlocks, etc).`,
    	],
    	sz: 3
    });

    const DuctTape = new Gear({
    	id: ``,
    	name: `Duct Tape`,
    	desc: [
    		`+1 Build/1yd or use 2yds as Handcuffs.`,
    		`60yds.`,
    	],
    	sz: 1
    });

    const GlassCutter = new Gear({
    	id: ``,
    	name: `Glass Cutter`,
    	desc: [
    		`Cuts glass quietly.`,
    	],
    	sz: 0
    });

    const GunCleaningKit = new Gear({
    	id: ``,
    	name: `Gun Cleaning Kit`,
    	desc: [
    		`Gun gets +1 Ranged for 1 day.`,
    		`Takes 1hr/gun.`,
    	],
    	sz: 1
    });

    const Hacksaw = new Gear({
    	id: ``,
    	name: `Hacksaw`,
    	desc: [
    		`1 Damage/round of sawing to almost any material.`,
    	],
    	sz: 2
    });

    const Lockpicks = new Gear({
    	id: ``,
    	name: `Lockpicks`,
    	desc: [
    		`+3 Larceny(Disable) key locks.`,
    		`6 picks.`,
    	],
    	sz: 1
    });

    const MagnifyingGlass = new Gear({
    	id: ``,
    	name: `Magnifying Glass`,
    	desc: [
    		`+6 Perception(See) to inspect tiny details.`,
    	],
    	sz: 0
    });

    const MeasuringCup = new Gear({
    	id: ``,
    	name: `Measuring Cup`,
    	desc: [
    		`+3 Science(Chemistry).`,
    		`Marked glass cup.`,
    	],
    	sz: 1
    });

    const Multitool = new Gear({
    	id: ``,
    	name: `Multi-tool`,
    	desc: [
    		`+1 Larceny(Disable), Build, Science(Tech).`,
    	],
    	sz: 1
    });

    const SprayPaint = new Gear({
    	id: ``,
    	name: `Spray Paint`,
    	desc: [
    		`Ranged Attack, Called Shot: Head.`,
    		`Blind d6 rounds.`,
    		`10 uses.`,
    	],
    	sz: 1
    });

    const SwissArmyKnife = new Gear({
    	id: ``,
    	name: `Swiss Army Knife`,
    	desc: [
    		`+1 Build and Survival.`,
    	],
    	sz: 1
    });

    const TapeMeasure = new Gear({
    	id: ``,
    	name: `Tape Measure`,
    	desc: [
    		`+1 Build.`,
    		`10yd long wind-up metal tape.`,
    	],
    	sz: 1
    });

    const ToolBag = new Gear({
    	id: ``,
    	name: `Tool Bag`,
    	desc: [
    		`+3 Build.`,
    		`Pliers, wrenches, level, etc.`,
    	],
    	sz: 3
    });

    const WireSaw = new Gear({
    	id: ``,
    	name: `Wire Saw`,
    	desc: [
    		`1 Damage/round of sawing to wood or bone.`,
    	],
    	sz: 0
    });

    var ToolsList = {
    	name: `Tools`,
    	list: [
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
    	]
    };

    const Balaclava = new Gear({
    	id: ``,
    	name: `Balaclava`,
    	desc: [
    		`+1 Stealth.`,
    		`Mask.`,
    		`Cold Resistance.`,
    	],
    	sz: 0
    });

    const Bandanna = new Gear({
    	id: ``,
    	name: `Bandanna`,
    	desc: [
    		`+1 Constitution vs airborne toxins.`,
    		`Can use as Bandage.`,
    	],
    	sz: 0
    });

    const BaseballCap = new Gear({
    	id: ``,
    	name: `Baseball Cap`,
    	desc: [
    		`Reduce Visibility(Rain and Sun) penalty by 1.`,
    	],
    	sz: 0
    });

    const Carabiner = new Gear({
    	id: ``,
    	name: `Carabiner`,
    	desc: [
    		`+1 Athletics(Climb and Rappel).`,
    		`Holds 50Sz.`,
    	],
    	sz: 0
    });

    const ChokerLeash = new Gear({
    	id: ``,
    	name: `Choker Leash`,
    	desc: [
    		`+3 Tame.`,
    		`Grabbed.`,
    		`Constitution +3 vs Constitution to control.`,
    	],
    	sz: 1
    });

    const CowboyHat = new Gear({
    	id: ``,
    	name: `Cowboy Hat`,
    	desc: [
    		`Reduce Visibility(Rain and Sun) penalty by 3.`,
    	],
    	sz: 1
    });

    const DustMask = new Gear({
    	id: ``,
    	name: `Dust Mask`,
    	desc: [
    		`+3 Constitution vs airborne toxins.`,
    		`Mask.`,
    	],
    	sz: 1
    });

    const EarPlugs = new Gear({
    	id: ``,
    	name: `Ear Plugs`,
    	desc: [
    		`No Deafness from noise.`,
    		`-3 Perception(Hear).`,
    	],
    	sz: 0
    });

    const Flippers = new Gear({
    	id: ``,
    	name: `Flippers`,
    	desc: [
    		`+3 Athletics(Swim).`,
    		`-6 walking Speed.`,
    	],
    	sz: 2
    });

    const GasMask = new Gear({
    	id: ``,
    	name: `Gas Mask`,
    	desc: [
    		`+6 Constitution vs airborne toxins.`,
    		`Mask.`,
    		`-1 Perception.`,
    	],
    	sz: 2
    });

    const Goggles = new Gear({
    	id: ``,
    	name: `Goggles`,
    	desc: [
    		`+3 Constitution to resist toxins in eyes.`,
    	],
    	sz: 1
    });

    const Handcuffs = new Gear({
    	id: ``,
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
    	id: ``,
    	name: `Leather Belt`,
    	desc: [
    		`1yd strap.`,
    		`Stops Limb Bleeding.`,
    		`Holds 50Sz.`,
    	],
    	sz: 0
    });

    const Lifejacket = new Gear({
    	id: ``,
    	name: `Lifejacket`,
    	desc: [
    		`+6 Athletics(Swim).`,
    		`Prevents drowning.`,
    	],
    	sz: 3
    });

    const Makeup = new Gear({
    	id: ``,
    	name: `Makeup`,
    	desc: [
    		`+1 Socialize and Entertain for 6hrs.`,
    		`30 uses.`,
    	],
    	sz: 0
    });

    const Poncho = new Gear({
    	id: ``,
    	name: `Poncho`,
    	desc: [
    		`Cold Resistance.`,
    		`Waterproof.`,
    	],
    	sz: 0
    });

    const Rollerblades = new Gear({
    	id: ``,
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
    	id: ``,
    	name: `Running Shoes`,
    	desc: [
    		`+1 mile of Jogging distance.`,
    	],
    	sz: 1
    });

    const Snorkel = new Gear({
    	id: ``,
    	name: `Snorkel`,
    	desc: [
    		`Breathe while just beneath water's surface.`,
    	],
    	sz: 1
    });

    const Sunglasses = new Gear({
    	id: ``,
    	name: `Sunglasses`,
    	desc: [
    		`No Visibility(Sun) penalty.`,
    		`+1 Constitution vs light.`,
    	],
    	sz: 0
    });

    const SurgicalMask = new Gear({
    	id: ``,
    	name: `Surgical Mask`,
    	desc: [
    		`+1 Constitution vs airborne toxins.`,
    		`Mask.`
    	],
    	sz: 0
    });

    const ThermalUnderwear = new Gear({
    	id: ``,
    	name: `Thermal Underwear`,
    	desc: [
    		`Cold Resistance.`,
    		`Can use as 6 Bandages.`,
    	],
    	sz: 0
    });

    const Wristwatch = new Gear({
    	id: ``,
    	name: `Wristwatch`,
    	desc: [
    		`Tells time and +1 Survival(Navigate).`,
    	],
    	sz: 0
    });

    var WearablesList = {
    	name: `Wearables`,
    	list: [
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
    		SurgicalMask,
    		ThermalUnderwear,
    		Wristwatch,
    	]
    };

    var EquipmentList = {
    	name: `Equipment`,
    	list: [
    		...DocumentsList.list,
    		...DrugsList.list,
    		...ElectronicsList.list,
    		...MedicalList.list,
    		...MiscellaneousList.list,
    		...ResourcesList.list,
    		...StorageList.list,
    		...ToolsList.list,
    		...WearablesList.list,
    	]
    };

    var GetItemList = (category) => {
    	if (category == 'melee') return MeleeWeaponsList.list
    	else if (category == 'ranged') return RangedWeaponsList.list
    	else if (category == 'ammo') return AmmoList.list
    	else if (category == 'armor') return ArmorList.list
    	else if (category == 'equipment') return EquipmentList.list
    };

    /* src/components/character/sheet/gear/AddItemModal.svelte generated by Svelte v3.35.0 */
    const file$N = "src/components/character/sheet/gear/AddItemModal.svelte";

    function get_each_context$o(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	return child_ctx;
    }

    // (34:3) {#each itemList as item}
    function create_each_block$o(ctx) {
    	let option;
    	let t_value = /*item*/ ctx[12].name + "";
    	let t;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = /*item*/ ctx[12];
    			option.value = option.__value;
    			attr_dev(option, "class", "svelte-dgrner");
    			add_location(option, file$N, 34, 4, 1025);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$o.name,
    		type: "each",
    		source: "(34:3) {#each itemList as item}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$R(ctx) {
    	let div0;
    	let t0;
    	let div3;
    	let div1;
    	let select;
    	let t1;
    	let div2;
    	let button0;
    	let t3;
    	let button1;
    	let mounted;
    	let dispose;
    	let each_value = /*itemList*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$o(get_each_context$o(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = space();
    			div3 = element("div");
    			div1 = element("div");
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t1 = space();
    			div2 = element("div");
    			button0 = element("button");
    			button0.textContent = "Add";
    			t3 = space();
    			button1 = element("button");
    			button1.textContent = "Close";
    			attr_dev(div0, "class", "modal-background svelte-dgrner");
    			add_location(div0, file$N, 29, 0, 781);
    			attr_dev(select, "class", "item-selector svelte-dgrner");
    			if (/*selectedItem*/ ctx[0] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[7].call(select));
    			add_location(select, file$N, 32, 2, 936);
    			attr_dev(div1, "class", "item-selection svelte-dgrner");
    			add_location(div1, file$N, 31, 1, 905);
    			attr_dev(button0, "class", "small-cntr-btn svelte-dgrner");
    			add_location(button0, file$N, 39, 2, 1125);
    			attr_dev(button1, "class", "small-cntr-btn svelte-dgrner");
    			add_location(button1, file$N, 40, 2, 1193);
    			attr_dev(div2, "class", "btn-row svelte-dgrner");
    			add_location(div2, file$N, 38, 1, 1101);
    			attr_dev(div3, "class", "modal svelte-dgrner");
    			attr_dev(div3, "role", "dialog");
    			attr_dev(div3, "aria-modal", "true");
    			add_location(div3, file$N, 30, 0, 852);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div1);
    			append_dev(div1, select);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			select_option(select, /*selectedItem*/ ctx[0]);
    			append_dev(div3, t1);
    			append_dev(div3, div2);
    			append_dev(div2, button0);
    			append_dev(div2, t3);
    			append_dev(div2, button1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "keydown", /*handleKeydown*/ ctx[3], false, false, false),
    					listen_dev(div0, "click", /*click_handler*/ ctx[6], false, false, false),
    					listen_dev(select, "change", /*select_change_handler*/ ctx[7]),
    					listen_dev(button0, "click", /*click_handler_1*/ ctx[8], false, false, false),
    					listen_dev(button1, "click", /*click_handler_2*/ ctx[9], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*itemList*/ 2) {
    				each_value = /*itemList*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$o(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$o(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*selectedItem, itemList*/ 3) {
    				select_option(select, /*selectedItem*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div3);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$R.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$R($$self, $$props, $$invalidate) {
    	let $characterStore;
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(10, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("AddItemModal", slots, []);
    	let { category } = $$props;
    	let itemList = GetItemList(category);
    	let selectedItem = itemList[0];
    	const dispatch = createEventDispatcher();

    	const handleKeydown = e => {
    		if (e.key === "Escape") dispatch("close");
    	};

    	const previouslyFocused = typeof document !== "undefined" && document.activeElement;
    	if (previouslyFocused) onDestroy(_ => previouslyFocused.focus());

    	const add = _ => {
    		if (category == "ammo") $$invalidate(0, selectedItem.qty = 0, selectedItem);
    		$characterStore.gear[category].inventory.push(selectedItem);
    		characterStore.set($characterStore);
    		dispatch("close");
    	};

    	const writable_props = ["category"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<AddItemModal> was created with unknown prop '${key}'`);
    	});

    	const click_handler = _ => dispatch("close");

    	function select_change_handler() {
    		selectedItem = select_value(this);
    		$$invalidate(0, selectedItem);
    		$$invalidate(1, itemList);
    	}

    	const click_handler_1 = _ => add();
    	const click_handler_2 = _ => dispatch("close");

    	$$self.$$set = $$props => {
    		if ("category" in $$props) $$invalidate(5, category = $$props.category);
    	};

    	$$self.$capture_state = () => ({
    		GetItemList,
    		characterStore,
    		createEventDispatcher,
    		onDestroy,
    		category,
    		itemList,
    		selectedItem,
    		dispatch,
    		handleKeydown,
    		previouslyFocused,
    		add,
    		$characterStore
    	});

    	$$self.$inject_state = $$props => {
    		if ("category" in $$props) $$invalidate(5, category = $$props.category);
    		if ("itemList" in $$props) $$invalidate(1, itemList = $$props.itemList);
    		if ("selectedItem" in $$props) $$invalidate(0, selectedItem = $$props.selectedItem);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		selectedItem,
    		itemList,
    		dispatch,
    		handleKeydown,
    		add,
    		category,
    		click_handler,
    		select_change_handler,
    		click_handler_1,
    		click_handler_2
    	];
    }

    class AddItemModal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$R, create_fragment$R, safe_not_equal, { category: 5 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AddItemModal",
    			options,
    			id: create_fragment$R.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*category*/ ctx[5] === undefined && !("category" in props)) {
    			console.warn("<AddItemModal> was created without expected prop 'category'");
    		}
    	}

    	get category() {
    		throw new Error("<AddItemModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set category(value) {
    		throw new Error("<AddItemModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/widgets/GearBlock.svelte generated by Svelte v3.35.0 */

    const file$M = "src/components/widgets/GearBlock.svelte";

    function get_each_context$n(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$a(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    function get_each_context_2$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i];
    	return child_ctx;
    }

    function get_each_context_3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[13] = list[i];
    	return child_ctx;
    }

    // (70:1) {#if item}
    function create_if_block$h(ctx) {
    	let t0;
    	let div;
    	let t1;
    	let t2;
    	let show_if = /*item*/ ctx[0] && /*item*/ ctx[0].hasOwnProperty("attr") && /*item*/ ctx[0].attr.length > 0;
    	let t3;
    	let current;
    	let if_block0 = /*mode*/ ctx[1] != "manual" && create_if_block_8(ctx);
    	let if_block1 = /*item*/ ctx[0].desc && create_if_block_7(ctx);
    	let each_value_2 = /*itemProps*/ ctx[2];
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2$3(get_each_context_2$3(ctx, each_value_2, i));
    	}

    	let if_block2 = show_if && create_if_block_2$3(ctx);
    	let if_block3 = /*item*/ ctx[0].table && create_if_block_1$7(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t0 = space();
    			div = element("div");
    			if (if_block1) if_block1.c();
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			if (if_block2) if_block2.c();
    			t3 = space();
    			if (if_block3) if_block3.c();
    			attr_dev(div, "class", "item-details");
    			add_location(div, file$M, 73, 2, 836);
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);
    			if (if_block1) if_block1.m(div, null);
    			append_dev(div, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			append_dev(div, t2);
    			if (if_block2) if_block2.m(div, null);
    			append_dev(div, t3);
    			if (if_block3) if_block3.m(div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*mode*/ ctx[1] != "manual") {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_8(ctx);
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
    					if_block1 = create_if_block_7(ctx);
    					if_block1.c();
    					if_block1.m(div, t1);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (dirty & /*item, itemProps, mode, undefined*/ 7) {
    				each_value_2 = /*itemProps*/ ctx[2];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2$3(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_2$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, t2);
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
    					if_block2 = create_if_block_2$3(ctx);
    					if_block2.c();
    					if_block2.m(div, t3);
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
    					if_block3 = create_if_block_1$7(ctx);
    					if_block3.c();
    					transition_in(if_block3, 1);
    					if_block3.m(div, null);
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
    			if (detaching) detach_dev(div);
    			if (if_block1) if_block1.d();
    			destroy_each(each_blocks, detaching);
    			if (if_block2) if_block2.d();
    			if (if_block3) if_block3.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$h.name,
    		type: "if",
    		source: "(70:1) {#if item}",
    		ctx
    	});

    	return block;
    }

    // (71:2) {#if mode != 'manual'}
    function create_if_block_8(ctx) {
    	let p;
    	let t_value = /*item*/ ctx[0].name + "";
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			attr_dev(p, "class", "item-name svelte-8n0ws9");
    			add_location(p, file$M, 71, 3, 789);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
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
    		id: create_if_block_8.name,
    		type: "if",
    		source: "(71:2) {#if mode != 'manual'}",
    		ctx
    	});

    	return block;
    }

    // (75:3) {#if item.desc}
    function create_if_block_7(ctx) {
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
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(75:3) {#if item.desc}",
    		ctx
    	});

    	return block;
    }

    // (76:4) {#each item.desc as desc}
    function create_each_block_3(ctx) {
    	let p;
    	let t_value = /*desc*/ ctx[13] + "";
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			attr_dev(p, "class", "gear-desc svelte-8n0ws9");
    			add_location(p, file$M, 76, 5, 917);
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
    		source: "(76:4) {#each item.desc as desc}",
    		ctx
    	});

    	return block;
    }

    // (81:4) {#if item[prop.abv] != undefined && item[prop.abv].toString().length}
    function create_if_block_3$2(ctx) {
    	let p;

    	function select_block_type(ctx, dirty) {
    		if (/*prop*/ ctx[10].name == "Quantity") return create_if_block_4$2;
    		return create_else_block$8;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			p = element("p");
    			if_block.c();
    			attr_dev(p, "class", "gear-prop svelte-8n0ws9");
    			add_location(p, file$M, 81, 5, 1078);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			if_block.m(p, null);
    		},
    		p: function update(ctx, dirty) {
    			if_block.p(ctx, dirty);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$2.name,
    		type: "if",
    		source: "(81:4) {#if item[prop.abv] != undefined && item[prop.abv].toString().length}",
    		ctx
    	});

    	return block;
    }

    // (95:6) {:else}
    function create_else_block$8(ctx) {
    	let span;
    	let t0_value = /*prop*/ ctx[10].name + "";
    	let t0;
    	let t1;
    	let t2_value = /*item*/ ctx[0][/*prop*/ ctx[10].abv] + "";
    	let t2;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = text(": \n\t\t\t\t\t\t\t");
    			t2 = text(t2_value);
    			attr_dev(span, "class", "prop-name svelte-8n0ws9");
    			add_location(span, file$M, 95, 7, 1541);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, t2, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*item*/ 1 && t2_value !== (t2_value = /*item*/ ctx[0][/*prop*/ ctx[10].abv] + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(t2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$8.name,
    		type: "else",
    		source: "(95:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (83:6) {#if prop.name == 'Quantity'}
    function create_if_block_4$2(ctx) {
    	let if_block_anchor;

    	function select_block_type_1(ctx, dirty) {
    		if (/*mode*/ ctx[1] == "edit") return create_if_block_5$2;
    		if (/*mode*/ ctx[1] == "readonly" && /*item*/ ctx[0].type == "Ammo") return create_if_block_6;
    	}

    	let current_block_type = select_block_type_1(ctx);
    	let if_block = current_block_type && current_block_type(ctx);

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
    			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if (if_block) if_block.d(1);
    				if_block = current_block_type && current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if (if_block) {
    				if_block.d(detaching);
    			}

    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4$2.name,
    		type: "if",
    		source: "(83:6) {#if prop.name == 'Quantity'}",
    		ctx
    	});

    	return block;
    }

    // (91:59) 
    function create_if_block_6(ctx) {
    	let span0;
    	let t0_value = /*prop*/ ctx[10].name + "";
    	let t0;
    	let t1;
    	let span1;
    	let t2_value = /*item*/ ctx[0].qty + "";
    	let t2;

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			t0 = text(t0_value);
    			t1 = text(": \n\t\t\t\t\t\t\t\t");
    			span1 = element("span");
    			t2 = text(t2_value);
    			attr_dev(span0, "class", "prop-name svelte-8n0ws9");
    			add_location(span0, file$M, 91, 8, 1399);
    			attr_dev(span1, "type", "number");
    			attr_dev(span1, "class", "item-qty svelte-8n0ws9");
    			add_location(span1, file$M, 92, 8, 1452);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);
    			append_dev(span0, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, span1, anchor);
    			append_dev(span1, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*item*/ 1 && t2_value !== (t2_value = /*item*/ ctx[0].qty + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(span1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(91:59) ",
    		ctx
    	});

    	return block;
    }

    // (84:7) {#if mode == 'edit'}
    function create_if_block_5$2(ctx) {
    	let span;
    	let t0_value = /*prop*/ ctx[10].name + "";
    	let t0;
    	let t1;
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = text(": \n\t\t\t\t\t\t\t\t");
    			input = element("input");
    			attr_dev(span, "class", "prop-name svelte-8n0ws9");
    			add_location(span, file$M, 84, 8, 1172);
    			attr_dev(input, "type", "number");
    			attr_dev(input, "class", "item-qty svelte-8n0ws9");
    			attr_dev(input, "min", "0");
    			add_location(input, file$M, 85, 8, 1225);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t0);
    			insert_dev(target, t1, anchor);
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
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(input);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5$2.name,
    		type: "if",
    		source: "(84:7) {#if mode == 'edit'}",
    		ctx
    	});

    	return block;
    }

    // (80:3) {#each itemProps as prop}
    function create_each_block_2$3(ctx) {
    	let show_if = /*item*/ ctx[0][/*prop*/ ctx[10].abv] != undefined && /*item*/ ctx[0][/*prop*/ ctx[10].abv].toString().length;
    	let if_block_anchor;
    	let if_block = show_if && create_if_block_3$2(ctx);

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
    			if (dirty & /*item*/ 1) show_if = /*item*/ ctx[0][/*prop*/ ctx[10].abv] != undefined && /*item*/ ctx[0][/*prop*/ ctx[10].abv].toString().length;

    			if (show_if) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_3$2(ctx);
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
    		id: create_each_block_2$3.name,
    		type: "each",
    		source: "(80:3) {#each itemProps as prop}",
    		ctx
    	});

    	return block;
    }

    // (102:3) {#if item && item.hasOwnProperty('attr') && item.attr.length > 0}
    function create_if_block_2$3(ctx) {
    	let p;
    	let u;
    	let t1;
    	let t2;
    	let div;
    	let each_value = /*item*/ ctx[0].attr;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$n(get_each_context$n(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			p = element("p");
    			u = element("u");
    			u.textContent = "Attributes";
    			t1 = text(":");
    			t2 = space();
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(u, file$M, 102, 25, 1747);
    			attr_dev(p, "class", "gear-attr svelte-8n0ws9");
    			add_location(p, file$M, 102, 4, 1726);
    			attr_dev(div, "class", "attributes");
    			add_location(div, file$M, 103, 4, 1774);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, u);
    			append_dev(p, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*item*/ 1) {
    				each_value = /*item*/ ctx[0].attr;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$n(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$n(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
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
    		id: create_if_block_2$3.name,
    		type: "if",
    		source: "(102:3) {#if item && item.hasOwnProperty('attr') && item.attr.length > 0}",
    		ctx
    	});

    	return block;
    }

    // (108:7) {#each attr.desc as line}
    function create_each_block_1$a(ctx) {
    	let p;
    	let t_value = /*line*/ ctx[7] + "";
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			attr_dev(p, "class", "attr-desc svelte-8n0ws9");
    			add_location(p, file$M, 108, 8, 1921);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*item*/ 1 && t_value !== (t_value = /*line*/ ctx[7] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$a.name,
    		type: "each",
    		source: "(108:7) {#each attr.desc as line}",
    		ctx
    	});

    	return block;
    }

    // (105:5) {#each item.attr as attr}
    function create_each_block$n(ctx) {
    	let div;
    	let t0_value = /*attr*/ ctx[4].name + "";
    	let t0;
    	let t1;
    	let t2;
    	let each_value_1 = /*attr*/ ctx[4].desc;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$a(get_each_context_1$a(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = text(":\n\t\t\t\t\t\t\t");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			attr_dev(div, "class", "attr-type svelte-8n0ws9");
    			add_location(div, file$M, 105, 6, 1836);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			append_dev(div, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*item*/ 1 && t0_value !== (t0_value = /*attr*/ ctx[4].name + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*item*/ 1) {
    				each_value_1 = /*attr*/ ctx[4].desc;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$a(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$a(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, t2);
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
    		id: create_each_block$n.name,
    		type: "each",
    		source: "(105:5) {#each item.attr as attr}",
    		ctx
    	});

    	return block;
    }

    // (115:3) {#if item.table}
    function create_if_block_1$7(ctx) {
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
    		id: create_if_block_1$7.name,
    		type: "if",
    		source: "(115:3) {#if item.table}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$Q(ctx) {
    	let div;
    	let current;
    	let if_block = /*item*/ ctx[0] && create_if_block$h(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "gear-block");
    			add_location(div, file$M, 68, 0, 724);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
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
    					if_block = create_if_block$h(ctx);
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
    		id: create_fragment$Q.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$Q($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("GearBlock", slots, []);
    	let { mode } = $$props, { item } = $$props;

    	const itemProps = [
    		{ name: "Type", abv: "type" },
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
    		{ name: "Absorption", abv: "dr" },
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
    		init(this, options, instance$Q, create_fragment$Q, safe_not_equal, { mode: 1, item: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GearBlock",
    			options,
    			id: create_fragment$Q.name
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

    /* src/components/buttons/TrashButton.svelte generated by Svelte v3.35.0 */
    const file$L = "src/components/buttons/TrashButton.svelte";

    function create_fragment$P(ctx) {
    	let button;
    	let div;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			div = element("div");
    			div.textContent = "X";
    			attr_dev(div, "class", "btn-icon");
    			add_location(div, file$L, 13, 1, 330);
    			attr_dev(button, "class", "btn-box trash-btn crimson-btn square-btn");
    			add_location(button, file$L, 12, 0, 250);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, div);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*trashItem*/ ctx[0], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$P.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$P($$self, $$props, $$invalidate) {
    	let $characterStore;
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(3, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("TrashButton", slots, []);
    	let { category } = $$props, { index } = $$props;

    	const trashItem = _ => {
    		$characterStore.gear[category.name.toLowerCase()].inventory.splice(index, 1);
    		characterStore.set($characterStore);
    	};

    	const writable_props = ["category", "index"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<TrashButton> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("category" in $$props) $$invalidate(1, category = $$props.category);
    		if ("index" in $$props) $$invalidate(2, index = $$props.index);
    	};

    	$$self.$capture_state = () => ({
    		characterStore,
    		category,
    		index,
    		trashItem,
    		$characterStore
    	});

    	$$self.$inject_state = $$props => {
    		if ("category" in $$props) $$invalidate(1, category = $$props.category);
    		if ("index" in $$props) $$invalidate(2, index = $$props.index);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [trashItem, category, index];
    }

    class TrashButton extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$P, create_fragment$P, safe_not_equal, { category: 1, index: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TrashButton",
    			options,
    			id: create_fragment$P.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*category*/ ctx[1] === undefined && !("category" in props)) {
    			console.warn("<TrashButton> was created without expected prop 'category'");
    		}

    		if (/*index*/ ctx[2] === undefined && !("index" in props)) {
    			console.warn("<TrashButton> was created without expected prop 'index'");
    		}
    	}

    	get category() {
    		throw new Error("<TrashButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set category(value) {
    		throw new Error("<TrashButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get index() {
    		throw new Error("<TrashButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set index(value) {
    		throw new Error("<TrashButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/character/sheet/gear/GearItem.svelte generated by Svelte v3.35.0 */
    const file$K = "src/components/character/sheet/gear/GearItem.svelte";

    // (12:1) {#if mode != 'readonly'}
    function create_if_block$g(ctx) {
    	let trashbutton;
    	let current;

    	trashbutton = new TrashButton({
    			props: {
    				category: /*category*/ ctx[1],
    				index: /*index*/ ctx[3]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(trashbutton.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(trashbutton, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const trashbutton_changes = {};
    			if (dirty & /*category*/ 2) trashbutton_changes.category = /*category*/ ctx[1];
    			if (dirty & /*index*/ 8) trashbutton_changes.index = /*index*/ ctx[3];
    			trashbutton.$set(trashbutton_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(trashbutton.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(trashbutton.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(trashbutton, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$g.name,
    		type: "if",
    		source: "(12:1) {#if mode != 'readonly'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$O(ctx) {
    	let div;
    	let gearblock;
    	let t;
    	let current;

    	gearblock = new GearBlock({
    			props: {
    				item: /*item*/ ctx[2],
    				mode: /*mode*/ ctx[0]
    			},
    			$$inline: true
    		});

    	let if_block = /*mode*/ ctx[0] != "readonly" && create_if_block$g(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(gearblock.$$.fragment);
    			t = space();
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "gear-item svelte-1azcrhw");
    			add_location(div, file$K, 9, 0, 247);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(gearblock, div, null);
    			append_dev(div, t);
    			if (if_block) if_block.m(div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const gearblock_changes = {};
    			if (dirty & /*item*/ 4) gearblock_changes.item = /*item*/ ctx[2];
    			if (dirty & /*mode*/ 1) gearblock_changes.mode = /*mode*/ ctx[0];
    			gearblock.$set(gearblock_changes);

    			if (/*mode*/ ctx[0] != "readonly") {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*mode*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$g(ctx);
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
    			transition_in(gearblock.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(gearblock.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(gearblock);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$O.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$O($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("GearItem", slots, []);

    	let { mode } = $$props,
    		{ category } = $$props,
    		{ item } = $$props,
    		{ index = 0 } = $$props;

    	const writable_props = ["mode", "category", "item", "index"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<GearItem> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("mode" in $$props) $$invalidate(0, mode = $$props.mode);
    		if ("category" in $$props) $$invalidate(1, category = $$props.category);
    		if ("item" in $$props) $$invalidate(2, item = $$props.item);
    		if ("index" in $$props) $$invalidate(3, index = $$props.index);
    	};

    	$$self.$capture_state = () => ({
    		GearBlock,
    		TrashButton,
    		characterStore,
    		mode,
    		category,
    		item,
    		index
    	});

    	$$self.$inject_state = $$props => {
    		if ("mode" in $$props) $$invalidate(0, mode = $$props.mode);
    		if ("category" in $$props) $$invalidate(1, category = $$props.category);
    		if ("item" in $$props) $$invalidate(2, item = $$props.item);
    		if ("index" in $$props) $$invalidate(3, index = $$props.index);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [mode, category, item, index];
    }

    class GearItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$O, create_fragment$O, safe_not_equal, { mode: 0, category: 1, item: 2, index: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GearItem",
    			options,
    			id: create_fragment$O.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*mode*/ ctx[0] === undefined && !("mode" in props)) {
    			console.warn("<GearItem> was created without expected prop 'mode'");
    		}

    		if (/*category*/ ctx[1] === undefined && !("category" in props)) {
    			console.warn("<GearItem> was created without expected prop 'category'");
    		}

    		if (/*item*/ ctx[2] === undefined && !("item" in props)) {
    			console.warn("<GearItem> was created without expected prop 'item'");
    		}
    	}

    	get mode() {
    		throw new Error("<GearItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mode(value) {
    		throw new Error("<GearItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get category() {
    		throw new Error("<GearItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set category(value) {
    		throw new Error("<GearItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get item() {
    		throw new Error("<GearItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set item(value) {
    		throw new Error("<GearItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get index() {
    		throw new Error("<GearItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set index(value) {
    		throw new Error("<GearItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/character/sheet/gear/GearCategory.svelte generated by Svelte v3.35.0 */
    const file$J = "src/components/character/sheet/gear/GearCategory.svelte";

    function get_each_context$m(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	child_ctx[6] = i;
    	return child_ctx;
    }

    // (18:3) {#each category.inventory as item, index}
    function create_each_block$m(ctx) {
    	let gearitem;
    	let current;

    	gearitem = new GearItem({
    			props: {
    				mode: /*mode*/ ctx[0],
    				category: /*category*/ ctx[1],
    				item: /*item*/ ctx[4],
    				index: /*index*/ ctx[6]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(gearitem.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(gearitem, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const gearitem_changes = {};
    			if (dirty & /*mode*/ 1) gearitem_changes.mode = /*mode*/ ctx[0];
    			if (dirty & /*category*/ 2) gearitem_changes.category = /*category*/ ctx[1];
    			if (dirty & /*category*/ 2) gearitem_changes.item = /*item*/ ctx[4];
    			gearitem.$set(gearitem_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(gearitem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(gearitem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(gearitem, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$m.name,
    		type: "each",
    		source: "(18:3) {#each category.inventory as item, index}",
    		ctx
    	});

    	return block;
    }

    // (22:2) {#if mode == 'edit'}
    function create_if_block$f(ctx) {
    	let div;
    	let addbutton;
    	let t;
    	let current;
    	addbutton = new AddButton({ $$inline: true });
    	addbutton.$on("click", /*toggleAddItemModal*/ ctx[3]);
    	let if_block = /*modalVisible*/ ctx[2] && create_if_block_1$6(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(addbutton.$$.fragment);
    			t = space();
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "add-section");
    			add_location(div, file$J, 22, 3, 632);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(addbutton, div, null);
    			append_dev(div, t);
    			if (if_block) if_block.m(div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*modalVisible*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*modalVisible*/ 4) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_1$6(ctx);
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
    			transition_in(addbutton.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(addbutton.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(addbutton);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$f.name,
    		type: "if",
    		source: "(22:2) {#if mode == 'edit'}",
    		ctx
    	});

    	return block;
    }

    // (25:4) {#if modalVisible}
    function create_if_block_1$6(ctx) {
    	let additemmodal;
    	let current;

    	additemmodal = new AddItemModal({
    			props: { category: /*category*/ ctx[1] },
    			$$inline: true
    		});

    	additemmodal.$on("close", /*toggleAddItemModal*/ ctx[3]);

    	const block = {
    		c: function create() {
    			create_component(additemmodal.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(additemmodal, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const additemmodal_changes = {};
    			if (dirty & /*category*/ 2) additemmodal_changes.category = /*category*/ ctx[1];
    			additemmodal.$set(additemmodal_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(additemmodal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(additemmodal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(additemmodal, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$6.name,
    		type: "if",
    		source: "(25:4) {#if modalVisible}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$N(ctx) {
    	let details;
    	let summary;
    	let t0_value = /*category*/ ctx[1].name + "";
    	let t0;
    	let t1;
    	let div1;
    	let div0;
    	let t2;
    	let current;
    	let each_value = /*category*/ ctx[1].inventory;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$m(get_each_context$m(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	let if_block = /*mode*/ ctx[0] == "edit" && create_if_block$f(ctx);

    	const block = {
    		c: function create() {
    			details = element("details");
    			summary = element("summary");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			if (if_block) if_block.c();
    			add_location(summary, file$J, 14, 1, 391);
    			attr_dev(div0, "class", "gear-item-list");
    			add_location(div0, file$J, 16, 2, 462);
    			attr_dev(div1, "class", "gear-category-card svelte-hgoa6z");
    			add_location(div1, file$J, 15, 1, 427);
    			attr_dev(details, "class", "gear-category svelte-hgoa6z");
    			attr_dev(details, "close", "");
    			add_location(details, file$J, 13, 0, 352);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, details, anchor);
    			append_dev(details, summary);
    			append_dev(summary, t0);
    			append_dev(details, t1);
    			append_dev(details, div1);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			append_dev(div1, t2);
    			if (if_block) if_block.m(div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*category*/ 2) && t0_value !== (t0_value = /*category*/ ctx[1].name + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*mode, category*/ 3) {
    				each_value = /*category*/ ctx[1].inventory;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$m(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$m(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (/*mode*/ ctx[0] == "edit") {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*mode*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$f(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div1, null);
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

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(details);
    			destroy_each(each_blocks, detaching);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$N.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$N($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("GearCategory", slots, []);
    	let { mode } = $$props, { category } = $$props;
    	let modalVisible = false;
    	const toggleAddItemModal = _ => $$invalidate(2, modalVisible = !modalVisible);
    	const writable_props = ["mode", "category"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<GearCategory> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("mode" in $$props) $$invalidate(0, mode = $$props.mode);
    		if ("category" in $$props) $$invalidate(1, category = $$props.category);
    	};

    	$$self.$capture_state = () => ({
    		AddButton,
    		AddItemModal,
    		GearItem,
    		mode,
    		category,
    		modalVisible,
    		toggleAddItemModal
    	});

    	$$self.$inject_state = $$props => {
    		if ("mode" in $$props) $$invalidate(0, mode = $$props.mode);
    		if ("category" in $$props) $$invalidate(1, category = $$props.category);
    		if ("modalVisible" in $$props) $$invalidate(2, modalVisible = $$props.modalVisible);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [mode, category, modalVisible, toggleAddItemModal];
    }

    class GearCategory extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$N, create_fragment$N, safe_not_equal, { mode: 0, category: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GearCategory",
    			options,
    			id: create_fragment$N.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*mode*/ ctx[0] === undefined && !("mode" in props)) {
    			console.warn("<GearCategory> was created without expected prop 'mode'");
    		}

    		if (/*category*/ ctx[1] === undefined && !("category" in props)) {
    			console.warn("<GearCategory> was created without expected prop 'category'");
    		}
    	}

    	get mode() {
    		throw new Error("<GearCategory>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mode(value) {
    		throw new Error("<GearCategory>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get category() {
    		throw new Error("<GearCategory>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set category(value) {
    		throw new Error("<GearCategory>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/character/sheet/sections/GearSection.svelte generated by Svelte v3.35.0 */

    const { Object: Object_1$6 } = globals;

    function get_each_context$l(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (9:0) {#each Object.values($characterStore.gear) as category}
    function create_each_block$l(ctx) {
    	let gearcategory;
    	let current;

    	gearcategory = new GearCategory({
    			props: {
    				mode: /*mode*/ ctx[0],
    				category: /*category*/ ctx[2]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(gearcategory.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(gearcategory, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const gearcategory_changes = {};
    			if (dirty & /*mode*/ 1) gearcategory_changes.mode = /*mode*/ ctx[0];
    			if (dirty & /*$characterStore*/ 2) gearcategory_changes.category = /*category*/ ctx[2];
    			gearcategory.$set(gearcategory_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(gearcategory.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(gearcategory.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(gearcategory, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$l.name,
    		type: "each",
    		source: "(9:0) {#each Object.values($characterStore.gear) as category}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$M(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = Object.values(/*$characterStore*/ ctx[1].gear);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$l(get_each_context$l(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

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
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*mode, Object, $characterStore*/ 3) {
    				each_value = Object.values(/*$characterStore*/ ctx[1].gear);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$l(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$l(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
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
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$M.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$M($$self, $$props, $$invalidate) {
    	let $characterStore;
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(1, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("GearSection", slots, []);
    	let { mode = "readonly" } = $$props;
    	const writable_props = ["mode"];

    	Object_1$6.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<GearSection> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("mode" in $$props) $$invalidate(0, mode = $$props.mode);
    	};

    	$$self.$capture_state = () => ({
    		characterStore,
    		GearCategory,
    		mode,
    		$characterStore
    	});

    	$$self.$inject_state = $$props => {
    		if ("mode" in $$props) $$invalidate(0, mode = $$props.mode);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [mode, $characterStore];
    }

    class GearSection extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$M, create_fragment$M, safe_not_equal, { mode: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GearSection",
    			options,
    			id: create_fragment$M.name
    		});
    	}

    	get mode() {
    		throw new Error("<GearSection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mode(value) {
    		throw new Error("<GearSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var AdjustUIColor = (character) => {
    	const headCurrent = character.health.head.current;
    	const torsoCurrent = character.health.torso.current;
    	const current = headCurrent + torsoCurrent;

    	const headMax = character.health.head.score;
    	const torsoMax = character.health.torso.score;
    	const max = headMax + torsoMax;

    	const health = current / max;

    	let pR = (health < 1) ? (1.5 - health) * 255 : 0;
    	let pG = (health < 1) ? (1.5 * health) * 255 : 255;
    	let pB = 0;

    	let sR = (health < 1) ? (1.5 - health) * 30 : 15;
    	let sG = (health < 1) ? (1.5 * health) * 30 : 30;
    	let sB = 15;

    	if ((headCurrent < 1) || (torsoCurrent < 1)) {
    		pR = (health * 64) + 192;
    		pG = (health * 64) + 192;
    		pB = (health * 64) + 192;
    		sR = 0;
    		sG = 0;
    		sB = 0;
    	}

    	document.documentElement.style.setProperty(`--pri-color`, `rgba(${pR}, ${pG}, ${pB}, .9)`);
    	document.documentElement.style.setProperty(`--pri-color-trans`, `rgba(${pR}, ${pG}, ${pB}, .5)`);
    	document.documentElement.style.setProperty(`--sec-color`, `rgba(${sR}, ${sG}, ${sB}, .85)`);
    	document.documentElement.style.setProperty(`--sec-color-trans`, `rgba(${sR}, ${sG}, ${sB}, .5)`);
    };

    /* src/components/widgets/HumanBody.svelte generated by Svelte v3.35.0 */

    const file$I = "src/components/widgets/HumanBody.svelte";

    function create_fragment$L(ctx) {
    	let div1;
    	let div0;
    	let t0;
    	let div5;
    	let div2;
    	let t1;
    	let div3;
    	let t2;
    	let div4;
    	let t3;
    	let div8;
    	let div6;
    	let t4;
    	let div7;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div5 = element("div");
    			div2 = element("div");
    			t1 = space();
    			div3 = element("div");
    			t2 = space();
    			div4 = element("div");
    			t3 = space();
    			div8 = element("div");
    			div6 = element("div");
    			t4 = space();
    			div7 = element("div");
    			attr_dev(div0, "class", "head body-part svelte-1fnl0ig");
    			add_location(div0, file$I, 1, 1, 26);
    			attr_dev(div1, "class", "head-level svelte-1fnl0ig");
    			add_location(div1, file$I, 0, 0, 0);
    			attr_dev(div2, "class", "left-arm arm body-part svelte-1fnl0ig");
    			add_location(div2, file$I, 4, 1, 91);
    			attr_dev(div3, "class", "torso body-part svelte-1fnl0ig");
    			add_location(div3, file$I, 5, 1, 131);
    			attr_dev(div4, "class", "right-arm arm body-part svelte-1fnl0ig");
    			add_location(div4, file$I, 6, 1, 164);
    			attr_dev(div5, "class", "torso-level svelte-1fnl0ig");
    			add_location(div5, file$I, 3, 0, 64);
    			attr_dev(div6, "class", "left-leg leg body-part svelte-1fnl0ig");
    			add_location(div6, file$I, 9, 1, 237);
    			attr_dev(div7, "class", "right-leg leg body-part svelte-1fnl0ig");
    			add_location(div7, file$I, 10, 1, 277);
    			attr_dev(div8, "class", "legs-level svelte-1fnl0ig");
    			add_location(div8, file$I, 8, 0, 211);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div2);
    			append_dev(div5, t1);
    			append_dev(div5, div3);
    			append_dev(div5, t2);
    			append_dev(div5, div4);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div8, anchor);
    			append_dev(div8, div6);
    			append_dev(div8, t4);
    			append_dev(div8, div7);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div5);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div8);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$L.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$L($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("HumanBody", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<HumanBody> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class HumanBody extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$L, create_fragment$L, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "HumanBody",
    			options,
    			id: create_fragment$L.name
    		});
    	}
    }

    /* src/components/character/sheet/sections/HealthSection.svelte generated by Svelte v3.35.0 */
    const file$H = "src/components/character/sheet/sections/HealthSection.svelte";

    // (22:4) {:else}
    function create_else_block_5(ctx) {
    	let input;
    	let input_min_value;
    	let input_max_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", input_min_value = "-" + /*$characterStore*/ ctx[1].health.head.score);
    			attr_dev(input, "max", input_max_value = /*$characterStore*/ ctx[1].health.head.score);
    			attr_dev(input, "class", "svelte-1mueeyb");
    			add_location(input, file$H, 22, 5, 594);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*$characterStore*/ ctx[1].health.head.current);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[2]),
    					listen_dev(input, "change", /*change_handler*/ ctx[3], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && input_min_value !== (input_min_value = "-" + /*$characterStore*/ ctx[1].health.head.score)) {
    				attr_dev(input, "min", input_min_value);
    			}

    			if (dirty & /*$characterStore*/ 2 && input_max_value !== (input_max_value = /*$characterStore*/ ctx[1].health.head.score)) {
    				attr_dev(input, "max", input_max_value);
    			}

    			if (dirty & /*$characterStore*/ 2 && to_number(input.value) !== /*$characterStore*/ ctx[1].health.head.current) {
    				set_input_value(input, /*$characterStore*/ ctx[1].health.head.current);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_5.name,
    		type: "else",
    		source: "(22:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (20:4) {#if mode == 'readonly'}
    function create_if_block_5$1(ctx) {
    	let t_value = /*$characterStore*/ ctx[1].health.head.score + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && t_value !== (t_value = /*$characterStore*/ ctx[1].health.head.score + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5$1.name,
    		type: "if",
    		source: "(20:4) {#if mode == 'readonly'}",
    		ctx
    	});

    	return block;
    }

    // (39:4) {:else}
    function create_else_block_4(ctx) {
    	let input;
    	let input_min_value;
    	let input_max_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", input_min_value = "-" + /*$characterStore*/ ctx[1].health.leftArm.score);
    			attr_dev(input, "max", input_max_value = /*$characterStore*/ ctx[1].health.leftArm.score);
    			attr_dev(input, "class", "svelte-1mueeyb");
    			add_location(input, file$H, 39, 5, 1136);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*$characterStore*/ ctx[1].health.leftArm.current);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler_1*/ ctx[4]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && input_min_value !== (input_min_value = "-" + /*$characterStore*/ ctx[1].health.leftArm.score)) {
    				attr_dev(input, "min", input_min_value);
    			}

    			if (dirty & /*$characterStore*/ 2 && input_max_value !== (input_max_value = /*$characterStore*/ ctx[1].health.leftArm.score)) {
    				attr_dev(input, "max", input_max_value);
    			}

    			if (dirty & /*$characterStore*/ 2 && to_number(input.value) !== /*$characterStore*/ ctx[1].health.leftArm.current) {
    				set_input_value(input, /*$characterStore*/ ctx[1].health.leftArm.current);
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
    		id: create_else_block_4.name,
    		type: "else",
    		source: "(39:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (37:4) {#if mode == 'readonly'}
    function create_if_block_4$1(ctx) {
    	let t_value = /*$characterStore*/ ctx[1].health.leftArm.score + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && t_value !== (t_value = /*$characterStore*/ ctx[1].health.leftArm.score + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4$1.name,
    		type: "if",
    		source: "(37:4) {#if mode == 'readonly'}",
    		ctx
    	});

    	return block;
    }

    // (55:4) {:else}
    function create_else_block_3(ctx) {
    	let input;
    	let input_min_value;
    	let input_max_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", input_min_value = "-" + /*$characterStore*/ ctx[1].health.leftLeg.score);
    			attr_dev(input, "max", input_max_value = /*$characterStore*/ ctx[1].health.leftLeg.score);
    			attr_dev(input, "class", "svelte-1mueeyb");
    			add_location(input, file$H, 55, 5, 1638);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*$characterStore*/ ctx[1].health.leftLeg.current);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler_2*/ ctx[5]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && input_min_value !== (input_min_value = "-" + /*$characterStore*/ ctx[1].health.leftLeg.score)) {
    				attr_dev(input, "min", input_min_value);
    			}

    			if (dirty & /*$characterStore*/ 2 && input_max_value !== (input_max_value = /*$characterStore*/ ctx[1].health.leftLeg.score)) {
    				attr_dev(input, "max", input_max_value);
    			}

    			if (dirty & /*$characterStore*/ 2 && to_number(input.value) !== /*$characterStore*/ ctx[1].health.leftLeg.current) {
    				set_input_value(input, /*$characterStore*/ ctx[1].health.leftLeg.current);
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
    		id: create_else_block_3.name,
    		type: "else",
    		source: "(55:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (53:4) {#if mode == 'readonly'}
    function create_if_block_3$1(ctx) {
    	let t_value = /*$characterStore*/ ctx[1].health.leftLeg.score + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && t_value !== (t_value = /*$characterStore*/ ctx[1].health.leftLeg.score + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(53:4) {#if mode == 'readonly'}",
    		ctx
    	});

    	return block;
    }

    // (76:4) {:else}
    function create_else_block_2(ctx) {
    	let input;
    	let input_min_value;
    	let input_max_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", input_min_value = "-" + /*$characterStore*/ ctx[1].health.torso.score);
    			attr_dev(input, "max", input_max_value = /*$characterStore*/ ctx[1].health.torso.score);
    			attr_dev(input, "class", "svelte-1mueeyb");
    			add_location(input, file$H, 76, 5, 2222);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*$characterStore*/ ctx[1].health.torso.current);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler_3*/ ctx[6]),
    					listen_dev(input, "change", /*change_handler_1*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && input_min_value !== (input_min_value = "-" + /*$characterStore*/ ctx[1].health.torso.score)) {
    				attr_dev(input, "min", input_min_value);
    			}

    			if (dirty & /*$characterStore*/ 2 && input_max_value !== (input_max_value = /*$characterStore*/ ctx[1].health.torso.score)) {
    				attr_dev(input, "max", input_max_value);
    			}

    			if (dirty & /*$characterStore*/ 2 && to_number(input.value) !== /*$characterStore*/ ctx[1].health.torso.current) {
    				set_input_value(input, /*$characterStore*/ ctx[1].health.torso.current);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_2.name,
    		type: "else",
    		source: "(76:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (74:4) {#if mode == 'readonly'}
    function create_if_block_2$2(ctx) {
    	let t_value = /*$characterStore*/ ctx[1].health.torso.score + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && t_value !== (t_value = /*$characterStore*/ ctx[1].health.torso.score + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$2.name,
    		type: "if",
    		source: "(74:4) {#if mode == 'readonly'}",
    		ctx
    	});

    	return block;
    }

    // (93:4) {:else}
    function create_else_block_1$1(ctx) {
    	let input;
    	let input_min_value;
    	let input_max_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", input_min_value = "-" + /*$characterStore*/ ctx[1].health.rightArm.score);
    			attr_dev(input, "max", input_max_value = /*$characterStore*/ ctx[1].health.rightArm.score);
    			attr_dev(input, "class", "svelte-1mueeyb");
    			add_location(input, file$H, 93, 5, 2771);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*$characterStore*/ ctx[1].health.rightArm.current);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler_4*/ ctx[8]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && input_min_value !== (input_min_value = "-" + /*$characterStore*/ ctx[1].health.rightArm.score)) {
    				attr_dev(input, "min", input_min_value);
    			}

    			if (dirty & /*$characterStore*/ 2 && input_max_value !== (input_max_value = /*$characterStore*/ ctx[1].health.rightArm.score)) {
    				attr_dev(input, "max", input_max_value);
    			}

    			if (dirty & /*$characterStore*/ 2 && to_number(input.value) !== /*$characterStore*/ ctx[1].health.rightArm.current) {
    				set_input_value(input, /*$characterStore*/ ctx[1].health.rightArm.current);
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
    		id: create_else_block_1$1.name,
    		type: "else",
    		source: "(93:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (91:4) {#if mode == 'readonly'}
    function create_if_block_1$5(ctx) {
    	let t_value = /*$characterStore*/ ctx[1].health.rightArm.score + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && t_value !== (t_value = /*$characterStore*/ ctx[1].health.rightArm.score + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$5.name,
    		type: "if",
    		source: "(91:4) {#if mode == 'readonly'}",
    		ctx
    	});

    	return block;
    }

    // (109:4) {:else}
    function create_else_block$7(ctx) {
    	let input;
    	let input_min_value;
    	let input_max_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", input_min_value = "-" + /*$characterStore*/ ctx[1].health.rightLeg.score);
    			attr_dev(input, "max", input_max_value = /*$characterStore*/ ctx[1].health.rightLeg.score);
    			attr_dev(input, "class", "svelte-1mueeyb");
    			add_location(input, file$H, 109, 5, 3280);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*$characterStore*/ ctx[1].health.rightLeg.current);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler_5*/ ctx[9]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && input_min_value !== (input_min_value = "-" + /*$characterStore*/ ctx[1].health.rightLeg.score)) {
    				attr_dev(input, "min", input_min_value);
    			}

    			if (dirty & /*$characterStore*/ 2 && input_max_value !== (input_max_value = /*$characterStore*/ ctx[1].health.rightLeg.score)) {
    				attr_dev(input, "max", input_max_value);
    			}

    			if (dirty & /*$characterStore*/ 2 && to_number(input.value) !== /*$characterStore*/ ctx[1].health.rightLeg.current) {
    				set_input_value(input, /*$characterStore*/ ctx[1].health.rightLeg.current);
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
    		id: create_else_block$7.name,
    		type: "else",
    		source: "(109:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (107:4) {#if mode == 'readonly'}
    function create_if_block$e(ctx) {
    	let t_value = /*$characterStore*/ ctx[1].health.rightLeg.score + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && t_value !== (t_value = /*$characterStore*/ ctx[1].health.rightLeg.score + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$e.name,
    		type: "if",
    		source: "(107:4) {#if mode == 'readonly'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$K(ctx) {
    	let div21;
    	let div9;
    	let div2;
    	let div0;
    	let t0_value = /*$characterStore*/ ctx[1].health.head.name + "";
    	let t0;
    	let t1;
    	let div1;
    	let t2;
    	let t3_value = /*$characterStore*/ ctx[1].health.head.score + "";
    	let t3;
    	let t4;
    	let div5;
    	let div3;
    	let t5_value = /*$characterStore*/ ctx[1].health.leftArm.name + "";
    	let t5;
    	let t6;
    	let div4;
    	let t7;
    	let t8_value = /*$characterStore*/ ctx[1].health.leftArm.score + "";
    	let t8;
    	let t9;
    	let div8;
    	let div6;
    	let t10_value = /*$characterStore*/ ctx[1].health.leftLeg.name + "";
    	let t10;
    	let t11;
    	let div7;
    	let t12;
    	let t13_value = /*$characterStore*/ ctx[1].health.leftLeg.score + "";
    	let t13;
    	let t14;
    	let div10;
    	let humanbody;
    	let t15;
    	let div20;
    	let div13;
    	let div11;
    	let t16_value = /*$characterStore*/ ctx[1].health.torso.name + "";
    	let t16;
    	let t17;
    	let div12;
    	let t18;
    	let t19_value = /*$characterStore*/ ctx[1].health.torso.score + "";
    	let t19;
    	let t20;
    	let div16;
    	let div14;
    	let t21_value = /*$characterStore*/ ctx[1].health.rightArm.name + "";
    	let t21;
    	let t22;
    	let div15;
    	let t23;
    	let t24_value = /*$characterStore*/ ctx[1].health.rightArm.score + "";
    	let t24;
    	let t25;
    	let div19;
    	let div17;
    	let t26_value = /*$characterStore*/ ctx[1].health.rightLeg.name + "";
    	let t26;
    	let t27;
    	let div18;
    	let t28;
    	let t29_value = /*$characterStore*/ ctx[1].health.rightLeg.score + "";
    	let t29;
    	let current;

    	function select_block_type(ctx, dirty) {
    		if (/*mode*/ ctx[0] == "readonly") return create_if_block_5$1;
    		return create_else_block_5;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type(ctx);

    	function select_block_type_1(ctx, dirty) {
    		if (/*mode*/ ctx[0] == "readonly") return create_if_block_4$1;
    		return create_else_block_4;
    	}

    	let current_block_type_1 = select_block_type_1(ctx);
    	let if_block1 = current_block_type_1(ctx);

    	function select_block_type_2(ctx, dirty) {
    		if (/*mode*/ ctx[0] == "readonly") return create_if_block_3$1;
    		return create_else_block_3;
    	}

    	let current_block_type_2 = select_block_type_2(ctx);
    	let if_block2 = current_block_type_2(ctx);
    	humanbody = new HumanBody({ $$inline: true });

    	function select_block_type_3(ctx, dirty) {
    		if (/*mode*/ ctx[0] == "readonly") return create_if_block_2$2;
    		return create_else_block_2;
    	}

    	let current_block_type_3 = select_block_type_3(ctx);
    	let if_block3 = current_block_type_3(ctx);

    	function select_block_type_4(ctx, dirty) {
    		if (/*mode*/ ctx[0] == "readonly") return create_if_block_1$5;
    		return create_else_block_1$1;
    	}

    	let current_block_type_4 = select_block_type_4(ctx);
    	let if_block4 = current_block_type_4(ctx);

    	function select_block_type_5(ctx, dirty) {
    		if (/*mode*/ ctx[0] == "readonly") return create_if_block$e;
    		return create_else_block$7;
    	}

    	let current_block_type_5 = select_block_type_5(ctx);
    	let if_block5 = current_block_type_5(ctx);

    	const block = {
    		c: function create() {
    			div21 = element("div");
    			div9 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			if_block0.c();
    			t2 = text(" / ");
    			t3 = text(t3_value);
    			t4 = space();
    			div5 = element("div");
    			div3 = element("div");
    			t5 = text(t5_value);
    			t6 = space();
    			div4 = element("div");
    			if_block1.c();
    			t7 = text(" / ");
    			t8 = text(t8_value);
    			t9 = space();
    			div8 = element("div");
    			div6 = element("div");
    			t10 = text(t10_value);
    			t11 = space();
    			div7 = element("div");
    			if_block2.c();
    			t12 = text(" / ");
    			t13 = text(t13_value);
    			t14 = space();
    			div10 = element("div");
    			create_component(humanbody.$$.fragment);
    			t15 = space();
    			div20 = element("div");
    			div13 = element("div");
    			div11 = element("div");
    			t16 = text(t16_value);
    			t17 = space();
    			div12 = element("div");
    			if_block3.c();
    			t18 = text(" / ");
    			t19 = text(t19_value);
    			t20 = space();
    			div16 = element("div");
    			div14 = element("div");
    			t21 = text(t21_value);
    			t22 = space();
    			div15 = element("div");
    			if_block4.c();
    			t23 = text(" / ");
    			t24 = text(t24_value);
    			t25 = space();
    			div19 = element("div");
    			div17 = element("div");
    			t26 = text(t26_value);
    			t27 = space();
    			div18 = element("div");
    			if_block5.c();
    			t28 = text(" / ");
    			t29 = text(t29_value);
    			attr_dev(div0, "class", "body-part-name");
    			add_location(div0, file$H, 15, 3, 394);
    			attr_dev(div1, "class", "body-part-numbers svelte-1mueeyb");
    			add_location(div1, file$H, 18, 3, 475);
    			attr_dev(div2, "class", "head-label svelte-1mueeyb");
    			add_location(div2, file$H, 14, 2, 366);
    			attr_dev(div3, "class", "body-part-name");
    			add_location(div3, file$H, 32, 3, 930);
    			attr_dev(div4, "class", "body-part-numbers svelte-1mueeyb");
    			add_location(div4, file$H, 35, 3, 1014);
    			attr_dev(div5, "class", "left-arm-label svelte-1mueeyb");
    			add_location(div5, file$H, 31, 2, 898);
    			attr_dev(div6, "class", "body-part-name");
    			add_location(div6, file$H, 48, 3, 1432);
    			attr_dev(div7, "class", "body-part-numbers svelte-1mueeyb");
    			add_location(div7, file$H, 51, 3, 1516);
    			attr_dev(div8, "class", "left-leg-label svelte-1mueeyb");
    			add_location(div8, file$H, 47, 2, 1400);
    			attr_dev(div9, "class", "left-column svelte-1mueeyb");
    			add_location(div9, file$H, 13, 1, 338);
    			attr_dev(div10, "class", "center-column svelte-1mueeyb");
    			add_location(div10, file$H, 64, 1, 1909);
    			attr_dev(div11, "class", "body-part-name");
    			add_location(div11, file$H, 69, 3, 2020);
    			attr_dev(div12, "class", "body-part-numbers svelte-1mueeyb");
    			add_location(div12, file$H, 72, 3, 2102);
    			attr_dev(div13, "class", "torso-label svelte-1mueeyb");
    			add_location(div13, file$H, 68, 2, 1991);
    			attr_dev(div14, "class", "body-part-name");
    			add_location(div14, file$H, 86, 3, 2563);
    			attr_dev(div15, "class", "body-part-numbers svelte-1mueeyb");
    			add_location(div15, file$H, 89, 3, 2648);
    			attr_dev(div16, "class", "right-arm-label svelte-1mueeyb");
    			add_location(div16, file$H, 85, 2, 2530);
    			attr_dev(div17, "class", "body-part-name");
    			add_location(div17, file$H, 102, 3, 3072);
    			attr_dev(div18, "class", "body-part-numbers svelte-1mueeyb");
    			add_location(div18, file$H, 105, 3, 3157);
    			attr_dev(div19, "class", "right-leg-label svelte-1mueeyb");
    			add_location(div19, file$H, 101, 2, 3039);
    			attr_dev(div20, "class", "right-column svelte-1mueeyb");
    			add_location(div20, file$H, 67, 1, 1962);
    			attr_dev(div21, "class", "body-parts-section svelte-1mueeyb");
    			add_location(div21, file$H, 12, 0, 304);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div21, anchor);
    			append_dev(div21, div9);
    			append_dev(div9, div2);
    			append_dev(div2, div0);
    			append_dev(div0, t0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			if_block0.m(div1, null);
    			append_dev(div1, t2);
    			append_dev(div1, t3);
    			append_dev(div9, t4);
    			append_dev(div9, div5);
    			append_dev(div5, div3);
    			append_dev(div3, t5);
    			append_dev(div5, t6);
    			append_dev(div5, div4);
    			if_block1.m(div4, null);
    			append_dev(div4, t7);
    			append_dev(div4, t8);
    			append_dev(div9, t9);
    			append_dev(div9, div8);
    			append_dev(div8, div6);
    			append_dev(div6, t10);
    			append_dev(div8, t11);
    			append_dev(div8, div7);
    			if_block2.m(div7, null);
    			append_dev(div7, t12);
    			append_dev(div7, t13);
    			append_dev(div21, t14);
    			append_dev(div21, div10);
    			mount_component(humanbody, div10, null);
    			append_dev(div21, t15);
    			append_dev(div21, div20);
    			append_dev(div20, div13);
    			append_dev(div13, div11);
    			append_dev(div11, t16);
    			append_dev(div13, t17);
    			append_dev(div13, div12);
    			if_block3.m(div12, null);
    			append_dev(div12, t18);
    			append_dev(div12, t19);
    			append_dev(div20, t20);
    			append_dev(div20, div16);
    			append_dev(div16, div14);
    			append_dev(div14, t21);
    			append_dev(div16, t22);
    			append_dev(div16, div15);
    			if_block4.m(div15, null);
    			append_dev(div15, t23);
    			append_dev(div15, t24);
    			append_dev(div20, t25);
    			append_dev(div20, div19);
    			append_dev(div19, div17);
    			append_dev(div17, t26);
    			append_dev(div19, t27);
    			append_dev(div19, div18);
    			if_block5.m(div18, null);
    			append_dev(div18, t28);
    			append_dev(div18, t29);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*$characterStore*/ 2) && t0_value !== (t0_value = /*$characterStore*/ ctx[1].health.head.name + "")) set_data_dev(t0, t0_value);

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
    				if_block0.p(ctx, dirty);
    			} else {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(div1, t2);
    				}
    			}

    			if ((!current || dirty & /*$characterStore*/ 2) && t3_value !== (t3_value = /*$characterStore*/ ctx[1].health.head.score + "")) set_data_dev(t3, t3_value);
    			if ((!current || dirty & /*$characterStore*/ 2) && t5_value !== (t5_value = /*$characterStore*/ ctx[1].health.leftArm.name + "")) set_data_dev(t5, t5_value);

    			if (current_block_type_1 === (current_block_type_1 = select_block_type_1(ctx)) && if_block1) {
    				if_block1.p(ctx, dirty);
    			} else {
    				if_block1.d(1);
    				if_block1 = current_block_type_1(ctx);

    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(div4, t7);
    				}
    			}

    			if ((!current || dirty & /*$characterStore*/ 2) && t8_value !== (t8_value = /*$characterStore*/ ctx[1].health.leftArm.score + "")) set_data_dev(t8, t8_value);
    			if ((!current || dirty & /*$characterStore*/ 2) && t10_value !== (t10_value = /*$characterStore*/ ctx[1].health.leftLeg.name + "")) set_data_dev(t10, t10_value);

    			if (current_block_type_2 === (current_block_type_2 = select_block_type_2(ctx)) && if_block2) {
    				if_block2.p(ctx, dirty);
    			} else {
    				if_block2.d(1);
    				if_block2 = current_block_type_2(ctx);

    				if (if_block2) {
    					if_block2.c();
    					if_block2.m(div7, t12);
    				}
    			}

    			if ((!current || dirty & /*$characterStore*/ 2) && t13_value !== (t13_value = /*$characterStore*/ ctx[1].health.leftLeg.score + "")) set_data_dev(t13, t13_value);
    			if ((!current || dirty & /*$characterStore*/ 2) && t16_value !== (t16_value = /*$characterStore*/ ctx[1].health.torso.name + "")) set_data_dev(t16, t16_value);

    			if (current_block_type_3 === (current_block_type_3 = select_block_type_3(ctx)) && if_block3) {
    				if_block3.p(ctx, dirty);
    			} else {
    				if_block3.d(1);
    				if_block3 = current_block_type_3(ctx);

    				if (if_block3) {
    					if_block3.c();
    					if_block3.m(div12, t18);
    				}
    			}

    			if ((!current || dirty & /*$characterStore*/ 2) && t19_value !== (t19_value = /*$characterStore*/ ctx[1].health.torso.score + "")) set_data_dev(t19, t19_value);
    			if ((!current || dirty & /*$characterStore*/ 2) && t21_value !== (t21_value = /*$characterStore*/ ctx[1].health.rightArm.name + "")) set_data_dev(t21, t21_value);

    			if (current_block_type_4 === (current_block_type_4 = select_block_type_4(ctx)) && if_block4) {
    				if_block4.p(ctx, dirty);
    			} else {
    				if_block4.d(1);
    				if_block4 = current_block_type_4(ctx);

    				if (if_block4) {
    					if_block4.c();
    					if_block4.m(div15, t23);
    				}
    			}

    			if ((!current || dirty & /*$characterStore*/ 2) && t24_value !== (t24_value = /*$characterStore*/ ctx[1].health.rightArm.score + "")) set_data_dev(t24, t24_value);
    			if ((!current || dirty & /*$characterStore*/ 2) && t26_value !== (t26_value = /*$characterStore*/ ctx[1].health.rightLeg.name + "")) set_data_dev(t26, t26_value);

    			if (current_block_type_5 === (current_block_type_5 = select_block_type_5(ctx)) && if_block5) {
    				if_block5.p(ctx, dirty);
    			} else {
    				if_block5.d(1);
    				if_block5 = current_block_type_5(ctx);

    				if (if_block5) {
    					if_block5.c();
    					if_block5.m(div18, t28);
    				}
    			}

    			if ((!current || dirty & /*$characterStore*/ 2) && t29_value !== (t29_value = /*$characterStore*/ ctx[1].health.rightLeg.score + "")) set_data_dev(t29, t29_value);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(humanbody.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(humanbody.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div21);
    			if_block0.d();
    			if_block1.d();
    			if_block2.d();
    			destroy_component(humanbody);
    			if_block3.d();
    			if_block4.d();
    			if_block5.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$K.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$K($$self, $$props, $$invalidate) {
    	let $characterStore;
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(1, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("HealthSection", slots, []);
    	let { mode = "readonly" } = $$props;
    	onMount(_ => AdjustUIColor($characterStore));
    	const writable_props = ["mode"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<HealthSection> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		$characterStore.health.head.current = to_number(this.value);
    		characterStore.set($characterStore);
    	}

    	const change_handler = _ => AdjustUIColor($characterStore);

    	function input_input_handler_1() {
    		$characterStore.health.leftArm.current = to_number(this.value);
    		characterStore.set($characterStore);
    	}

    	function input_input_handler_2() {
    		$characterStore.health.leftLeg.current = to_number(this.value);
    		characterStore.set($characterStore);
    	}

    	function input_input_handler_3() {
    		$characterStore.health.torso.current = to_number(this.value);
    		characterStore.set($characterStore);
    	}

    	const change_handler_1 = _ => AdjustUIColor($characterStore);

    	function input_input_handler_4() {
    		$characterStore.health.rightArm.current = to_number(this.value);
    		characterStore.set($characterStore);
    	}

    	function input_input_handler_5() {
    		$characterStore.health.rightLeg.current = to_number(this.value);
    		characterStore.set($characterStore);
    	}

    	$$self.$$set = $$props => {
    		if ("mode" in $$props) $$invalidate(0, mode = $$props.mode);
    	};

    	$$self.$capture_state = () => ({
    		AdjustUIColor,
    		HumanBody,
    		characterStore,
    		onMount,
    		mode,
    		$characterStore
    	});

    	$$self.$inject_state = $$props => {
    		if ("mode" in $$props) $$invalidate(0, mode = $$props.mode);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		mode,
    		$characterStore,
    		input_input_handler,
    		change_handler,
    		input_input_handler_1,
    		input_input_handler_2,
    		input_input_handler_3,
    		change_handler_1,
    		input_input_handler_4,
    		input_input_handler_5
    	];
    }

    class HealthSection extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$K, create_fragment$K, safe_not_equal, { mode: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "HealthSection",
    			options,
    			id: create_fragment$K.name
    		});
    	}

    	get mode() {
    		throw new Error("<HealthSection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mode(value) {
    		throw new Error("<HealthSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/character/sheet/sections/NotesSection.svelte generated by Svelte v3.35.0 */
    const file$G = "src/components/character/sheet/sections/NotesSection.svelte";

    // (10:0) {:else}
    function create_else_block$6(ctx) {
    	let textarea;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			textarea = element("textarea");
    			attr_dev(textarea, "class", "sheet-notes-block svelte-lm55ix");
    			attr_dev(textarea, "wrap", "soft");
    			add_location(textarea, file$G, 10, 1, 204);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, textarea, anchor);
    			set_input_value(textarea, /*$characterStore*/ ctx[1].meta.notes);

    			if (!mounted) {
    				dispose = listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[2]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2) {
    				set_input_value(textarea, /*$characterStore*/ ctx[1].meta.notes);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(textarea);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$6.name,
    		type: "else",
    		source: "(10:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (8:0) {#if mode == 'readonly'}
    function create_if_block$d(ctx) {
    	let div;
    	let t_value = /*$characterStore*/ ctx[1].meta.notes + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			attr_dev(div, "class", "sheet-notes-block svelte-lm55ix");
    			add_location(div, file$G, 8, 1, 129);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && t_value !== (t_value = /*$characterStore*/ ctx[1].meta.notes + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$d.name,
    		type: "if",
    		source: "(8:0) {#if mode == 'readonly'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$J(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*mode*/ ctx[0] == "readonly") return create_if_block$d;
    		return create_else_block$6;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$J.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$J($$self, $$props, $$invalidate) {
    	let $characterStore;
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(1, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("NotesSection", slots, []);
    	let { mode = "edit" } = $$props;
    	const writable_props = ["mode"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<NotesSection> was created with unknown prop '${key}'`);
    	});

    	function textarea_input_handler() {
    		$characterStore.meta.notes = this.value;
    		characterStore.set($characterStore);
    	}

    	$$self.$$set = $$props => {
    		if ("mode" in $$props) $$invalidate(0, mode = $$props.mode);
    	};

    	$$self.$capture_state = () => ({ characterStore, mode, $characterStore });

    	$$self.$inject_state = $$props => {
    		if ("mode" in $$props) $$invalidate(0, mode = $$props.mode);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [mode, $characterStore, textarea_input_handler];
    }

    class NotesSection extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$J, create_fragment$J, safe_not_equal, { mode: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NotesSection",
    			options,
    			id: create_fragment$J.name
    		});
    	}

    	get mode() {
    		throw new Error("<NotesSection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mode(value) {
    		throw new Error("<NotesSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/character/sheet/sections/PropertiesSection.svelte generated by Svelte v3.35.0 */
    const file$F = "src/components/character/sheet/sections/PropertiesSection.svelte";

    function get_each_context$k(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$9(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	child_ctx[8] = list;
    	child_ctx[9] = i;
    	return child_ctx;
    }

    // (23:6) {#if $characterStore.properties[p.name.toLowerCase()].hasOwnProperty('current')}
    function create_if_block$c(ctx) {
    	let t;

    	function select_block_type(ctx, dirty) {
    		if (/*mode*/ ctx[0] == "readonly") return create_if_block_1$4;
    		return create_else_block$5;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			t = text(" /");
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(t.parentNode, t);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$c.name,
    		type: "if",
    		source: "(23:6) {#if $characterStore.properties[p.name.toLowerCase()].hasOwnProperty('current')}",
    		ctx
    	});

    	return block;
    }

    // (26:7) {:else}
    function create_else_block$5(ctx) {
    	let input;
    	let input_max_value;
    	let mounted;
    	let dispose;

    	function input_input_handler() {
    		/*input_input_handler*/ ctx[3].call(input, /*p*/ ctx[7]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "number");
    			attr_dev(input, "class", "current-value svelte-1l94ist");
    			attr_dev(input, "min", "0");
    			attr_dev(input, "max", input_max_value = /*$characterStore*/ ctx[1].properties[/*p*/ ctx[7].name.toLowerCase()].score);
    			add_location(input, file$F, 26, 8, 861);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*$characterStore*/ ctx[1].properties[/*p*/ ctx[7].name.toLowerCase()].current);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", input_input_handler);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*$characterStore*/ 2 && input_max_value !== (input_max_value = /*$characterStore*/ ctx[1].properties[/*p*/ ctx[7].name.toLowerCase()].score)) {
    				attr_dev(input, "max", input_max_value);
    			}

    			if (dirty & /*$characterStore, propertyListHalves*/ 6 && to_number(input.value) !== /*$characterStore*/ ctx[1].properties[/*p*/ ctx[7].name.toLowerCase()].current) {
    				set_input_value(input, /*$characterStore*/ ctx[1].properties[/*p*/ ctx[7].name.toLowerCase()].current);
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
    		id: create_else_block$5.name,
    		type: "else",
    		source: "(26:7) {:else}",
    		ctx
    	});

    	return block;
    }

    // (24:7) {#if mode == 'readonly'}
    function create_if_block_1$4(ctx) {
    	let t_value = /*$characterStore*/ ctx[1].properties[/*p*/ ctx[7].name.toLowerCase()].current + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && t_value !== (t_value = /*$characterStore*/ ctx[1].properties[/*p*/ ctx[7].name.toLowerCase()].current + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$4.name,
    		type: "if",
    		source: "(24:7) {#if mode == 'readonly'}",
    		ctx
    	});

    	return block;
    }

    // (17:3) {#each halfProp as p}
    function create_each_block_1$9(ctx) {
    	let div2;
    	let div0;
    	let t0_value = /*$characterStore*/ ctx[1].properties[/*p*/ ctx[7].name.toLowerCase()].name + "";
    	let t0;
    	let t1;
    	let t2;
    	let div1;
    	let show_if = /*$characterStore*/ ctx[1].properties[/*p*/ ctx[7].name.toLowerCase()].hasOwnProperty("current");
    	let t3;
    	let t4_value = /*$characterStore*/ ctx[1].properties[/*p*/ ctx[7].name.toLowerCase()].score + "";
    	let t4;
    	let if_block = show_if && create_if_block$c(ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = text(":");
    			t2 = space();
    			div1 = element("div");
    			if (if_block) if_block.c();
    			t3 = space();
    			t4 = text(t4_value);
    			attr_dev(div0, "class", "prop-label");
    			add_location(div0, file$F, 18, 5, 522);
    			attr_dev(div1, "class", "prop-score");
    			add_location(div1, file$F, 21, 5, 627);
    			attr_dev(div2, "class", "sheet-card-item svelte-1l94ist");
    			add_location(div2, file$F, 17, 4, 487);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, t0);
    			append_dev(div0, t1);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			if (if_block) if_block.m(div1, null);
    			append_dev(div1, t3);
    			append_dev(div1, t4);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 2 && t0_value !== (t0_value = /*$characterStore*/ ctx[1].properties[/*p*/ ctx[7].name.toLowerCase()].name + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*$characterStore*/ 2) show_if = /*$characterStore*/ ctx[1].properties[/*p*/ ctx[7].name.toLowerCase()].hasOwnProperty("current");

    			if (show_if) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$c(ctx);
    					if_block.c();
    					if_block.m(div1, t3);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*$characterStore*/ 2 && t4_value !== (t4_value = /*$characterStore*/ ctx[1].properties[/*p*/ ctx[7].name.toLowerCase()].score + "")) set_data_dev(t4, t4_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$9.name,
    		type: "each",
    		source: "(17:3) {#each halfProp as p}",
    		ctx
    	});

    	return block;
    }

    // (15:1) {#each propertyListHalves as halfProp}
    function create_each_block$k(ctx) {
    	let div;
    	let t;
    	let each_value_1 = /*halfProp*/ ctx[4];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$9(get_each_context_1$9(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			attr_dev(div, "class", "sheet-card-block");
    			add_location(div, file$F, 15, 2, 427);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore, propertyListHalves, mode*/ 7) {
    				each_value_1 = /*halfProp*/ ctx[4];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$9(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$9(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, t);
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
    		id: create_each_block$k.name,
    		type: "each",
    		source: "(15:1) {#each propertyListHalves as halfProp}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$I(ctx) {
    	let div;
    	let each_value = /*propertyListHalves*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$k(get_each_context$k(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "sheet-card-body svelte-1l94ist");
    			add_location(div, file$F, 13, 0, 355);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*propertyListHalves, $characterStore, mode*/ 7) {
    				each_value = /*propertyListHalves*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$k(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$k(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
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
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$I.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$I($$self, $$props, $$invalidate) {
    	let $characterStore;
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(1, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("PropertiesSection", slots, []);
    	let { mode = "readonly" } = $$props;

    	const propertyListHalves = [
    		PropertiesList.list.slice(0, PropertiesList.list.length / 2),
    		PropertiesList.list.slice(PropertiesList.list.length / 2, PropertiesList.list.length)
    	];

    	const writable_props = ["mode"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<PropertiesSection> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler(p) {
    		$characterStore.properties[p.name.toLowerCase()].current = to_number(this.value);
    		characterStore.set($characterStore);
    		$$invalidate(2, propertyListHalves);
    	}

    	$$self.$$set = $$props => {
    		if ("mode" in $$props) $$invalidate(0, mode = $$props.mode);
    	};

    	$$self.$capture_state = () => ({
    		PropertiesList,
    		characterStore,
    		mode,
    		propertyListHalves,
    		$characterStore
    	});

    	$$self.$inject_state = $$props => {
    		if ("mode" in $$props) $$invalidate(0, mode = $$props.mode);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [mode, $characterStore, propertyListHalves, input_input_handler];
    }

    class PropertiesSection extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$I, create_fragment$I, safe_not_equal, { mode: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PropertiesSection",
    			options,
    			id: create_fragment$I.name
    		});
    	}

    	get mode() {
    		throw new Error("<PropertiesSection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mode(value) {
    		throw new Error("<PropertiesSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/character/sheet/sections/SkillsSection.svelte generated by Svelte v3.35.0 */

    const { Object: Object_1$5 } = globals;
    const file$E = "src/components/character/sheet/sections/SkillsSection.svelte";

    function get_each_context$j(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$8(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    // (15:4) {#if trait.name == skill.parent}
    function create_if_block$b(ctx) {
    	let div;
    	let t0_value = /*skill*/ ctx[5].name + "";
    	let t0;
    	let t1;
    	let t2_value = /*skill*/ ctx[5].score + "";
    	let t2;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = text(": ");
    			t2 = text(t2_value);
    			attr_dev(div, "class", "sheet-card-item");
    			add_location(div, file$E, 15, 5, 385);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    			append_dev(div, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 1 && t0_value !== (t0_value = /*skill*/ ctx[5].name + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*$characterStore*/ 1 && t2_value !== (t2_value = /*skill*/ ctx[5].score + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$b.name,
    		type: "if",
    		source: "(15:4) {#if trait.name == skill.parent}",
    		ctx
    	});

    	return block;
    }

    // (14:3) {#each Object.values($characterStore.skills) as skill}
    function create_each_block_1$8(ctx) {
    	let if_block_anchor;
    	let if_block = /*trait*/ ctx[2].name == /*skill*/ ctx[5].parent && create_if_block$b(ctx);

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
    			if (/*trait*/ ctx[2].name == /*skill*/ ctx[5].parent) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$b(ctx);
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
    		id: create_each_block_1$8.name,
    		type: "each",
    		source: "(14:3) {#each Object.values($characterStore.skills) as skill}",
    		ctx
    	});

    	return block;
    }

    // (9:1) {#each Object.values($characterStore.traits) as trait}
    function create_each_block$j(ctx) {
    	let div1;
    	let div0;
    	let t0_value = /*trait*/ ctx[2].name + "";
    	let t0;
    	let t1;
    	let t2;
    	let each_value_1 = Object.values(/*$characterStore*/ ctx[0].skills);
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$8(get_each_context_1$8(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			attr_dev(div0, "class", "parent-trait svelte-ri98dl");
    			add_location(div0, file$E, 10, 3, 231);
    			attr_dev(div1, "class", "sheet-card-block svelte-ri98dl");
    			add_location(div1, file$E, 9, 2, 197);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, t0);
    			append_dev(div1, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			append_dev(div1, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 1 && t0_value !== (t0_value = /*trait*/ ctx[2].name + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*Object, $characterStore*/ 1) {
    				each_value_1 = Object.values(/*$characterStore*/ ctx[0].skills);
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$8(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$8(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, t2);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$j.name,
    		type: "each",
    		source: "(9:1) {#each Object.values($characterStore.traits) as trait}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$H(ctx) {
    	let div;
    	let each_value = Object.values(/*$characterStore*/ ctx[0].traits);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$j(get_each_context$j(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "sheet-card-body");
    			add_location(div, file$E, 7, 0, 109);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*Object, $characterStore*/ 1) {
    				each_value = Object.values(/*$characterStore*/ ctx[0].traits);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$j(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$j(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
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
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$H.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$H($$self, $$props, $$invalidate) {
    	let $characterStore;
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(0, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("SkillsSection", slots, []);
    	const mode = "readonly";
    	const writable_props = [];

    	Object_1$5.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<SkillsSection> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ characterStore, mode, $characterStore });
    	return [$characterStore, mode];
    }

    class SkillsSection extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$H, create_fragment$H, safe_not_equal, { mode: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SkillsSection",
    			options,
    			id: create_fragment$H.name
    		});
    	}

    	get mode() {
    		return this.$$.ctx[1];
    	}

    	set mode(value) {
    		throw new Error("<SkillsSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/character/sheet/sections/TraitsSection.svelte generated by Svelte v3.35.0 */

    const { Object: Object_1$4 } = globals;
    const file$D = "src/components/character/sheet/sections/TraitsSection.svelte";

    function get_each_context$i(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (9:1) {#each Object.values($characterStore.traits) as trait}
    function create_each_block$i(ctx) {
    	let div1;
    	let div0;
    	let span;
    	let t0_value = /*trait*/ ctx[2].name + "";
    	let t0;
    	let t1;
    	let t2_value = /*trait*/ ctx[2].score + "";
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = text(": ");
    			t2 = text(t2_value);
    			t3 = space();
    			attr_dev(span, "class", "trait-name svelte-o6s5tc");
    			add_location(span, file$D, 11, 4, 265);
    			attr_dev(div0, "class", "sheet-card-item");
    			add_location(div0, file$D, 10, 3, 231);
    			attr_dev(div1, "class", "sheet-card-block");
    			add_location(div1, file$D, 9, 2, 197);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, span);
    			append_dev(span, t0);
    			append_dev(span, t1);
    			append_dev(span, t2);
    			append_dev(div1, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 1 && t0_value !== (t0_value = /*trait*/ ctx[2].name + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*$characterStore*/ 1 && t2_value !== (t2_value = /*trait*/ ctx[2].score + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$i.name,
    		type: "each",
    		source: "(9:1) {#each Object.values($characterStore.traits) as trait}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$G(ctx) {
    	let div;
    	let each_value = Object.values(/*$characterStore*/ ctx[0].traits);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$i(get_each_context$i(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "sheet-card-body");
    			add_location(div, file$D, 7, 0, 109);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*Object, $characterStore*/ 1) {
    				each_value = Object.values(/*$characterStore*/ ctx[0].traits);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$i(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$i(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
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
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$G.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$G($$self, $$props, $$invalidate) {
    	let $characterStore;
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(0, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("TraitsSection", slots, []);
    	const mode = "readonly";
    	const writable_props = [];

    	Object_1$4.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<TraitsSection> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ characterStore, mode, $characterStore });
    	return [$characterStore, mode];
    }

    class TraitsSection extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$G, create_fragment$G, safe_not_equal, { mode: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TraitsSection",
    			options,
    			id: create_fragment$G.name
    		});
    	}

    	get mode() {
    		return this.$$.ctx[1];
    	}

    	set mode(value) {
    		throw new Error("<TraitsSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var SheetSectionsList = {
    	name: `Sheet Sections`,
    	list: [
    		{
    			name: `Description`,
    			content: DescriptionSection
    		},
    		{
    			name: `Traits`,
    			content: TraitsSection
    		},
    		{
    			name: `Skills`,
    			content: SkillsSection
    		},
    		{
    			name: `Properties`,
    			content: PropertiesSection
    		},
    		{
    			name: `Health`,
    			content: HealthSection
    		},
    		{
    			name: `Abilities`,
    			content: AbilitiesSection
    		},
    		{
    			name: `Gear`,
    			content: GearSection
    		},
    		{
    			name: `Notes`,
    			content: NotesSection
    		}
    	]
    };

    /* src/components/character/sheet/CharacterSheet.svelte generated by Svelte v3.35.0 */
    const file$C = "src/components/character/sheet/CharacterSheet.svelte";

    function get_each_context$h(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (9:1) {#each SheetSectionsList.list as sheetSection}
    function create_each_block$h(ctx) {
    	let section;
    	let h2;
    	let t0_value = /*sheetSection*/ ctx[1].name + "";
    	let t0;
    	let t1;
    	let div;
    	let switch_instance;
    	let t2;
    	let current;
    	var switch_value = /*sheetSection*/ ctx[1].content;

    	function switch_props(ctx) {
    		return {
    			props: { mode: /*mode*/ ctx[0] },
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			section = element("section");
    			h2 = element("h2");
    			t0 = text(t0_value);
    			t1 = space();
    			div = element("div");
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			t2 = space();
    			attr_dev(h2, "class", "svelte-16zwxby");
    			add_location(h2, file$C, 10, 3, 248);
    			attr_dev(div, "class", "sheet-card");
    			add_location(div, file$C, 11, 3, 280);
    			attr_dev(section, "class", "" + (/*sheetSection*/ ctx[1].name.toLowerCase() + "-section" + " svelte-16zwxby"));
    			add_location(section, file$C, 9, 2, 185);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, h2);
    			append_dev(h2, t0);
    			append_dev(section, t1);
    			append_dev(section, div);

    			if (switch_instance) {
    				mount_component(switch_instance, div, null);
    			}

    			append_dev(section, t2);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = {};
    			if (dirty & /*mode*/ 1) switch_instance_changes.mode = /*mode*/ ctx[0];

    			if (switch_value !== (switch_value = /*sheetSection*/ ctx[1].content)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, div, null);
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
    			if (detaching) detach_dev(section);
    			if (switch_instance) destroy_component(switch_instance);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$h.name,
    		type: "each",
    		source: "(9:1) {#each SheetSectionsList.list as sheetSection}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$F(ctx) {
    	let div;
    	let current;
    	let each_value = SheetSectionsList.list;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$h(get_each_context$h(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "character-sheet");
    			add_location(div, file$C, 7, 0, 105);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*SheetSectionsList, mode*/ 1) {
    				each_value = SheetSectionsList.list;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$h(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$h(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
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
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$F.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$F($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("CharacterSheet", slots, []);
    	let { mode } = $$props;
    	const writable_props = ["mode"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<CharacterSheet> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("mode" in $$props) $$invalidate(0, mode = $$props.mode);
    	};

    	$$self.$capture_state = () => ({ SheetSectionsList, mode });

    	$$self.$inject_state = $$props => {
    		if ("mode" in $$props) $$invalidate(0, mode = $$props.mode);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [mode];
    }

    class CharacterSheet extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$F, create_fragment$F, safe_not_equal, { mode: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CharacterSheet",
    			options,
    			id: create_fragment$F.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*mode*/ ctx[0] === undefined && !("mode" in props)) {
    			console.warn("<CharacterSheet> was created without expected prop 'mode'");
    		}
    	}

    	get mode() {
    		throw new Error("<CharacterSheet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mode(value) {
    		throw new Error("<CharacterSheet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/buttons/SaveAndDeleteButtonRow.svelte generated by Svelte v3.35.0 */

    const file$B = "src/components/buttons/SaveAndDeleteButtonRow.svelte";

    function create_fragment$E(ctx) {
    	let div;
    	let button0;
    	let a0;
    	let t1;
    	let button1;
    	let a1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			button0 = element("button");
    			a0 = element("a");
    			a0.textContent = "Save";
    			t1 = space();
    			button1 = element("button");
    			a1 = element("a");
    			a1.textContent = "Delete";
    			attr_dev(a0, "href", "/");
    			add_location(a0, file$B, 7, 2, 134);
    			attr_dev(button0, "class", "small-cntr-btn svelte-iy60g0");
    			add_location(button0, file$B, 6, 1, 80);
    			attr_dev(a1, "href", "/");
    			add_location(a1, file$B, 10, 2, 223);
    			attr_dev(button1, "class", "small-cntr-btn svelte-iy60g0");
    			add_location(button1, file$B, 9, 1, 167);
    			attr_dev(div, "class", "btn-row");
    			add_location(div, file$B, 5, 0, 57);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button0);
    			append_dev(button0, a0);
    			append_dev(div, t1);
    			append_dev(div, button1);
    			append_dev(button1, a1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(
    						button0,
    						"click",
    						function () {
    							if (is_function(/*saveFunc*/ ctx[0])) /*saveFunc*/ ctx[0].apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						button1,
    						"click",
    						function () {
    							if (is_function(/*deleteFunc*/ ctx[1])) /*deleteFunc*/ ctx[1].apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    		},
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
    		id: create_fragment$E.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$E($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("SaveAndDeleteButtonRow", slots, []);
    	let { saveFunc } = $$props, { deleteFunc } = $$props;
    	const writable_props = ["saveFunc", "deleteFunc"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<SaveAndDeleteButtonRow> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("saveFunc" in $$props) $$invalidate(0, saveFunc = $$props.saveFunc);
    		if ("deleteFunc" in $$props) $$invalidate(1, deleteFunc = $$props.deleteFunc);
    	};

    	$$self.$capture_state = () => ({ saveFunc, deleteFunc });

    	$$self.$inject_state = $$props => {
    		if ("saveFunc" in $$props) $$invalidate(0, saveFunc = $$props.saveFunc);
    		if ("deleteFunc" in $$props) $$invalidate(1, deleteFunc = $$props.deleteFunc);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [saveFunc, deleteFunc];
    }

    class SaveAndDeleteButtonRow extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$E, create_fragment$E, safe_not_equal, { saveFunc: 0, deleteFunc: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SaveAndDeleteButtonRow",
    			options,
    			id: create_fragment$E.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*saveFunc*/ ctx[0] === undefined && !("saveFunc" in props)) {
    			console.warn("<SaveAndDeleteButtonRow> was created without expected prop 'saveFunc'");
    		}

    		if (/*deleteFunc*/ ctx[1] === undefined && !("deleteFunc" in props)) {
    			console.warn("<SaveAndDeleteButtonRow> was created without expected prop 'deleteFunc'");
    		}
    	}

    	get saveFunc() {
    		throw new Error("<SaveAndDeleteButtonRow>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set saveFunc(value) {
    		throw new Error("<SaveAndDeleteButtonRow>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get deleteFunc() {
    		throw new Error("<SaveAndDeleteButtonRow>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set deleteFunc(value) {
    		throw new Error("<SaveAndDeleteButtonRow>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/character/creator/steps/FinalizeStep.svelte generated by Svelte v3.35.0 */
    const file$A = "src/components/character/creator/steps/FinalizeStep.svelte";

    function create_fragment$D(ctx) {
    	let div1;
    	let pageheader;
    	let t0;
    	let div0;
    	let charactersheet;
    	let t1;
    	let saveanddeletebuttonrow;
    	let current;

    	pageheader = new PageHeader({
    			props: {
    				chapter: "Finalize",
    				step: /*$characterStore*/ ctx[0].meta.step
    			},
    			$$inline: true
    		});

    	charactersheet = new CharacterSheet({ props: { mode: "edit" }, $$inline: true });

    	saveanddeletebuttonrow = new SaveAndDeleteButtonRow({
    			props: {
    				saveFunc: /*func*/ ctx[1],
    				deleteFunc: /*func_1*/ ctx[2]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(pageheader.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			create_component(charactersheet.$$.fragment);
    			t1 = space();
    			create_component(saveanddeletebuttonrow.$$.fragment);
    			attr_dev(div0, "class", "sheet-content svelte-zcv0gr");
    			add_location(div0, file$A, 26, 1, 863);
    			attr_dev(div1, "class", "finalize-page");
    			add_location(div1, file$A, 24, 0, 764);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(pageheader, div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			mount_component(charactersheet, div0, null);
    			append_dev(div1, t1);
    			mount_component(saveanddeletebuttonrow, div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const pageheader_changes = {};
    			if (dirty & /*$characterStore*/ 1) pageheader_changes.step = /*$characterStore*/ ctx[0].meta.step;
    			pageheader.$set(pageheader_changes);
    			const saveanddeletebuttonrow_changes = {};
    			if (dirty & /*$characterStore*/ 1) saveanddeletebuttonrow_changes.deleteFunc = /*func_1*/ ctx[2];
    			saveanddeletebuttonrow.$set(saveanddeletebuttonrow_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(pageheader.$$.fragment, local);
    			transition_in(charactersheet.$$.fragment, local);
    			transition_in(saveanddeletebuttonrow.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(pageheader.$$.fragment, local);
    			transition_out(charactersheet.$$.fragment, local);
    			transition_out(saveanddeletebuttonrow.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(pageheader);
    			destroy_component(charactersheet);
    			destroy_component(saveanddeletebuttonrow);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$D.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$D($$self, $$props, $$invalidate) {
    	let $characterStore;
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(0, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("FinalizeStep", slots, []);

    	afterUpdate(_ => {
    		Creation.proceedCheck($characterStore);
    		characterStore.set($characterStore);
    		SaveCharacter();
    	});

    	onMount(_ => {
    		set_store_value(characterStore, $characterStore.description.player = { "value": $characterStore.meta.user }, $characterStore);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<FinalizeStep> was created with unknown prop '${key}'`);
    	});

    	const func = _ => SaveCharacter();
    	const func_1 = _ => DeleteCharacter($characterStore.meta.id);

    	$$self.$capture_state = () => ({
    		Creation,
    		CharacterSheet,
    		DeleteCharacter,
    		PageHeader,
    		SaveAndDeleteButtonRow,
    		SaveCharacter,
    		characterStore,
    		afterUpdate,
    		onMount,
    		$characterStore
    	});

    	return [$characterStore, func, func_1];
    }

    class FinalizeStep extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$D, create_fragment$D, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FinalizeStep",
    			options,
    			id: create_fragment$D.name
    		});
    	}
    }

    var RandomMeleeWeapon = (c) => {
        let randomMeleeWeapon = RandomRoll(MeleeWeaponsList.list);
        randomMeleeWeapon.qty = 1;
        c.gear.melee.inventory.push(randomMeleeWeapon);
        return c
    };

    var RandomRangedWeapon = (c) => {
        let randomRangedWeapon = RandomRoll(RangedWeaponsList.list);
        randomRangedWeapon.qty = 1;
        c.gear.ranged.inventory.push(randomRangedWeapon);
        return c
    };

    var d6 = _ => Math.ceil(Math.random() * 6);

    var Nd6 = (n) => {
    	let total = 0;
    	for (let i = 0; i < n; i++) total += d6();
    	return total
    };

    var RandomWeaponAmmo = (c) => {
        const compatibleAmmo = AmmoList.list.filter(a => a.cal == c.gear.ranged.inventory[0].cal);
        const randomAmmo = RandomRoll(compatibleAmmo);
        randomAmmo.qty = Nd6(1);
        c.gear.ammo.inventory.push(randomAmmo);
        return c
    };

    var RandomArmor = (c) => {
        let randomArmor = RandomRoll(ArmorList.list);
        randomArmor.qty = 1;
        c.gear.armor.inventory.push(randomArmor);
        return c
    };

    var RandomEquipment = (c, n) => {
        let equipment = [];
        for (let i = 0; i < n; i++) { 
            let randomItem = RandomRoll(EquipmentList.list);
            let existingItemIndex = equipment.findIndex(item => item.name == randomItem.name);
            if (existingItemIndex > -1) {
                equipment[existingItemIndex].qty++;
            }
            else {
                randomItem.qty = 1;
                equipment.push(randomItem);
            }
    	}
    	c.gear.equipment.inventory = [...equipment];
        return c
    };

    var RandomStartingGear = (c, n) => {
        c = c.resetGear();
        c = RandomMeleeWeapon(c);
        c = RandomRangedWeapon(c);
        c = RandomWeaponAmmo(c);
        c = RandomArmor(c);
        c = RandomEquipment(c, n);
        return c
    };

    /* src/components/character/creator/steps/GearStep.svelte generated by Svelte v3.35.0 */

    const { Object: Object_1$3, console: console_1$1 } = globals;
    const file$z = "src/components/character/creator/steps/GearStep.svelte";

    function get_each_context$g(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$7(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    function get_each_context_2$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i];
    	return child_ctx;
    }

    // (30:2) {#each Creation.startingGearExplanation as gearLine}
    function create_each_block_2$2(ctx) {
    	let p;
    	let t_value = /*gearLine*/ ctx[10] + "";
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			add_location(p, file$z, 30, 3, 1120);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2$2.name,
    		type: "each",
    		source: "(30:2) {#each Creation.startingGearExplanation as gearLine}",
    		ctx
    	});

    	return block;
    }

    // (53:1) {:else}
    function create_else_block_1(ctx) {
    	let resetandrandombuttonrow;
    	let current;

    	resetandrandombuttonrow = new ResetAndRandomButtonRow({
    			props: {
    				reset: /*func*/ ctx[2],
    				random: /*func_1*/ ctx[3]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(resetandrandombuttonrow.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(resetandrandombuttonrow, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const resetandrandombuttonrow_changes = {};
    			if (dirty & /*$characterStore*/ 2) resetandrandombuttonrow_changes.reset = /*func*/ ctx[2];
    			if (dirty & /*$characterStore*/ 2) resetandrandombuttonrow_changes.random = /*func_1*/ ctx[3];
    			resetandrandombuttonrow.$set(resetandrandombuttonrow_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(resetandrandombuttonrow.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(resetandrandombuttonrow.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(resetandrandombuttonrow, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(53:1) {:else}",
    		ctx
    	});

    	return block;
    }

    // (34:1) {#if gearedUp}
    function create_if_block$a(ctx) {
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_1_anchor;
    	let current;
    	let each_value = Object.values(/*$characterStore*/ ctx[1].gear);
    	validate_each_argument(each_value);
    	const get_key = ctx => /*category*/ ctx[4].name;
    	validate_each_keys(ctx, each_value, get_each_context$g, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$g(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$g(key, child_ctx));
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
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*Object, $characterStore*/ 2) {
    				each_value = Object.values(/*$characterStore*/ ctx[1].gear);
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context$g, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block$g, each_1_anchor, get_each_context$g);
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
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d(detaching);
    			}

    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$a.name,
    		type: "if",
    		source: "(34:1) {#if gearedUp}",
    		ctx
    	});

    	return block;
    }

    // (45:5) {:else}
    function create_else_block$4(ctx) {
    	let div;
    	let gearblock;
    	let current;

    	gearblock = new GearBlock({
    			props: {
    				item: /*category*/ ctx[4].inventory[0],
    				mode: "readonly"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(gearblock.$$.fragment);
    			attr_dev(div, "class", "item svelte-1l68c9k");
    			add_location(div, file$z, 45, 6, 1565);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(gearblock, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const gearblock_changes = {};
    			if (dirty & /*$characterStore*/ 2) gearblock_changes.item = /*category*/ ctx[4].inventory[0];
    			gearblock.$set(gearblock_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(gearblock.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(gearblock.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(gearblock);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$4.name,
    		type: "else",
    		source: "(45:5) {:else}",
    		ctx
    	});

    	return block;
    }

    // (39:5) {#if category.name == 'Equipment'}
    function create_if_block_1$3(ctx) {
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_1_anchor;
    	let current;
    	let each_value_1 = /*category*/ ctx[4].inventory;
    	validate_each_argument(each_value_1);
    	const get_key = ctx => /*equipment*/ ctx[7].name;
    	validate_each_keys(ctx, each_value_1, get_each_context_1$7, get_key);

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		let child_ctx = get_each_context_1$7(ctx, each_value_1, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block_1$7(key, child_ctx));
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
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*Object, $characterStore*/ 2) {
    				each_value_1 = /*category*/ ctx[4].inventory;
    				validate_each_argument(each_value_1);
    				group_outros();
    				validate_each_keys(ctx, each_value_1, get_each_context_1$7, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value_1, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block_1$7, each_1_anchor, get_each_context_1$7);
    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d(detaching);
    			}

    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(39:5) {#if category.name == 'Equipment'}",
    		ctx
    	});

    	return block;
    }

    // (40:6) {#each category.inventory as equipment (equipment.name)}
    function create_each_block_1$7(key_1, ctx) {
    	let div;
    	let gearblock;
    	let t;
    	let current;

    	gearblock = new GearBlock({
    			props: {
    				item: /*equipment*/ ctx[7],
    				mode: "readonly"
    			},
    			$$inline: true
    		});

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			div = element("div");
    			create_component(gearblock.$$.fragment);
    			t = space();
    			attr_dev(div, "class", "item svelte-1l68c9k");
    			add_location(div, file$z, 40, 7, 1442);
    			this.first = div;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(gearblock, div, null);
    			append_dev(div, t);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const gearblock_changes = {};
    			if (dirty & /*$characterStore*/ 2) gearblock_changes.item = /*equipment*/ ctx[7];
    			gearblock.$set(gearblock_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(gearblock.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(gearblock.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(gearblock);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$7.name,
    		type: "each",
    		source: "(40:6) {#each category.inventory as equipment (equipment.name)}",
    		ctx
    	});

    	return block;
    }

    // (35:2) {#each Object.values($characterStore.gear) as category (category.name)}
    function create_each_block$g(key_1, ctx) {
    	let details;
    	let summary;
    	let t0_value = /*category*/ ctx[4].name + "";
    	let t0;
    	let t1;
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let t2;
    	let current;
    	const if_block_creators = [create_if_block_1$3, create_else_block$4];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*category*/ ctx[4].name == "Equipment") return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_1(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			details = element("details");
    			summary = element("summary");
    			t0 = text(t0_value);
    			t1 = space();
    			div = element("div");
    			if_block.c();
    			t2 = space();
    			add_location(summary, file$z, 36, 4, 1263);
    			attr_dev(div, "class", "details-content svelte-1l68c9k");
    			add_location(div, file$z, 37, 4, 1302);
    			attr_dev(details, "class", "svelte-1l68c9k");
    			add_location(details, file$z, 35, 3, 1249);
    			this.first = details;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, details, anchor);
    			append_dev(details, summary);
    			append_dev(summary, t0);
    			append_dev(details, t1);
    			append_dev(details, div);
    			if_blocks[current_block_type_index].m(div, null);
    			append_dev(details, t2);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if ((!current || dirty & /*$characterStore*/ 2) && t0_value !== (t0_value = /*category*/ ctx[4].name + "")) set_data_dev(t0, t0_value);
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

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
    				} else {
    					if_block.p(ctx, dirty);
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
    			if (detaching) detach_dev(details);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$g.name,
    		type: "each",
    		source: "(35:2) {#each Object.values($characterStore.gear) as category (category.name)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$C(ctx) {
    	let div1;
    	let pageheader;
    	let t0;
    	let div0;
    	let t1;
    	let current_block_type_index;
    	let if_block;
    	let current;

    	pageheader = new PageHeader({
    			props: {
    				chapter: "Gear",
    				step: /*$characterStore*/ ctx[1].meta.step
    			},
    			$$inline: true
    		});

    	let each_value_2 = Creation.startingGearExplanation;
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2$2(get_each_context_2$2(ctx, each_value_2, i));
    	}

    	const if_block_creators = [create_if_block$a, create_else_block_1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*gearedUp*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(pageheader.$$.fragment);
    			t0 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t1 = space();
    			if_block.c();
    			attr_dev(div0, "class", "explanation");
    			add_location(div0, file$z, 28, 1, 1036);
    			attr_dev(div1, "class", "gear-step-page");
    			add_location(div1, file$z, 26, 0, 940);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(pageheader, div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			append_dev(div1, t1);
    			if_blocks[current_block_type_index].m(div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const pageheader_changes = {};
    			if (dirty & /*$characterStore*/ 2) pageheader_changes.step = /*$characterStore*/ ctx[1].meta.step;
    			pageheader.$set(pageheader_changes);

    			if (dirty & /*Creation*/ 0) {
    				each_value_2 = Creation.startingGearExplanation;
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2$2(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_2$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_2.length;
    			}

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
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div1, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(pageheader.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(pageheader.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(pageheader);
    			destroy_each(each_blocks, detaching);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$C.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$C($$self, $$props, $$invalidate) {
    	let $characterStore;
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(1, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("GearStep", slots, []);
    	console.log("Gear Step Abilities List");
    	console.log(AbilitiesList.masterList.filter(a => a.taken));
    	let gearedUp = false;
    	beforeUpdate(_ => $$invalidate(0, gearedUp = Object.values($characterStore.gear).every(g => g.inventory.length)));

    	afterUpdate(_ => {
    		Creation.proceedCheck($characterStore);
    		characterStore.set($characterStore);
    		SaveCharacter();
    	});

    	const writable_props = [];

    	Object_1$3.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$1.warn(`<GearStep> was created with unknown prop '${key}'`);
    	});

    	const func = _ => set_store_value(characterStore, $characterStore = $characterStore.resetGear(), $characterStore);
    	const func_1 = _ => set_store_value(characterStore, $characterStore = RandomStartingGear($characterStore, $characterStore.properties.luck.score), $characterStore);

    	$$self.$capture_state = () => ({
    		AbilitiesList,
    		Creation,
    		GearBlock,
    		PageHeader,
    		RandomStartingGear,
    		ResetAndRandomButtonRow,
    		SaveCharacter,
    		characterStore,
    		afterUpdate,
    		beforeUpdate,
    		gearedUp,
    		$characterStore
    	});

    	$$self.$inject_state = $$props => {
    		if ("gearedUp" in $$props) $$invalidate(0, gearedUp = $$props.gearedUp);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [gearedUp, $characterStore, func, func_1];
    }

    class GearStep extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$C, create_fragment$C, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GearStep",
    			options,
    			id: create_fragment$C.name
    		});
    	}
    }

    var Properties = {
        name: `Properties`,
    	text: [
    		`Properties represent a variety of attributes that are derived from a Character's Trait scores.`
    	]
    };

    /* src/components/character/creator/properties/PropertiesBlock.svelte generated by Svelte v3.35.0 */
    const file$y = "src/components/character/creator/properties/PropertiesBlock.svelte";

    function get_each_context$f(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$6(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    // (15:3) {#each halfProp as p}
    function create_each_block_1$6(ctx) {
    	let div;
    	let t0_value = /*$characterStore*/ ctx[0].properties[/*p*/ ctx[5].name.toLowerCase()].name + "";
    	let t0;
    	let t1;
    	let t2_value = /*$characterStore*/ ctx[0].properties[/*p*/ ctx[5].name.toLowerCase()].score + "";
    	let t2;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = text(": \n\t\t\t\t\t");
    			t2 = text(t2_value);
    			attr_dev(div, "class", "prop-item");
    			add_location(div, file$y, 15, 4, 466);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    			append_dev(div, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore*/ 1 && t0_value !== (t0_value = /*$characterStore*/ ctx[0].properties[/*p*/ ctx[5].name.toLowerCase()].name + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*$characterStore*/ 1 && t2_value !== (t2_value = /*$characterStore*/ ctx[0].properties[/*p*/ ctx[5].name.toLowerCase()].score + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$6.name,
    		type: "each",
    		source: "(15:3) {#each halfProp as p}",
    		ctx
    	});

    	return block;
    }

    // (13:1) {#each propertyListHalves as halfProp}
    function create_each_block$f(ctx) {
    	let div;
    	let t;
    	let each_value_1 = /*halfProp*/ ctx[2];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$6(get_each_context_1$6(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			attr_dev(div, "class", "prop-block svelte-yuyu07");
    			add_location(div, file$y, 13, 2, 412);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$characterStore, propertyListHalves*/ 3) {
    				each_value_1 = /*halfProp*/ ctx[2];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$6(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$6(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, t);
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
    		id: create_each_block$f.name,
    		type: "each",
    		source: "(13:1) {#each propertyListHalves as halfProp}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$B(ctx) {
    	let div;
    	let each_value = /*propertyListHalves*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$f(get_each_context$f(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "section-card properties-list svelte-yuyu07");
    			add_location(div, file$y, 11, 0, 327);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*propertyListHalves, $characterStore*/ 3) {
    				each_value = /*propertyListHalves*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$f(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$f(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
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
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$B.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$B($$self, $$props, $$invalidate) {
    	let $characterStore;
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(0, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("PropertiesBlock", slots, []);

    	const propertyListHalves = [
    		PropertiesList.list.slice(0, PropertiesList.list.length / 2),
    		PropertiesList.list.slice(PropertiesList.list.length / 2, PropertiesList.list.length)
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<PropertiesBlock> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		PropertiesList,
    		characterStore,
    		propertyListHalves,
    		$characterStore
    	});

    	return [$characterStore, propertyListHalves];
    }

    class PropertiesBlock extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$B, create_fragment$B, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PropertiesBlock",
    			options,
    			id: create_fragment$B.name
    		});
    	}
    }

    /* src/components/character/creator/properties/PropertiesFormulae.svelte generated by Svelte v3.35.0 */
    const file$x = "src/components/character/creator/properties/PropertiesFormulae.svelte";

    function get_each_context$e(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[0] = list[i];
    	return child_ctx;
    }

    // (14:4) {:else}
    function create_else_block$3(ctx) {
    	let li;
    	let t_value = /*property*/ ctx[0].desc[0] + "";
    	let t;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t = text(t_value);
    			attr_dev(li, "class", "svelte-cbtwzk");
    			add_location(li, file$x, 14, 5, 354);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(14:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (11:4) {#if property.name == 'Health'}
    function create_if_block$9(ctx) {
    	let li0;
    	let t0_value = /*property*/ ctx[0].desc[0] + "";
    	let t0;
    	let t1;
    	let li1;
    	let t2_value = /*property*/ ctx[0].desc[1] + "";
    	let t2;

    	const block = {
    		c: function create() {
    			li0 = element("li");
    			t0 = text(t0_value);
    			t1 = space();
    			li1 = element("li");
    			t2 = text(t2_value);
    			attr_dev(li0, "class", "svelte-cbtwzk");
    			add_location(li0, file$x, 11, 5, 276);
    			attr_dev(li1, "class", "svelte-cbtwzk");
    			add_location(li1, file$x, 12, 5, 309);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li0, anchor);
    			append_dev(li0, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, li1, anchor);
    			append_dev(li1, t2);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(li1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$9.name,
    		type: "if",
    		source: "(11:4) {#if property.name == 'Health'}",
    		ctx
    	});

    	return block;
    }

    // (10:3) {#each PropertiesList.list as property}
    function create_each_block$e(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*property*/ ctx[0].name == "Health") return create_if_block$9;
    		return create_else_block$3;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if_block.p(ctx, dirty);
    		},
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$e.name,
    		type: "each",
    		source: "(10:3) {#each PropertiesList.list as property}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$A(ctx) {
    	let details;
    	let summary;
    	let t1;
    	let div;
    	let ul;
    	let each_value = PropertiesList.list;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$e(get_each_context$e(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			details = element("details");
    			summary = element("summary");
    			summary.textContent = "Properties Formulae";
    			t1 = space();
    			div = element("div");
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(summary, file$x, 6, 1, 117);
    			add_location(ul, file$x, 8, 2, 187);
    			attr_dev(div, "class", "formulae-card");
    			add_location(div, file$x, 7, 1, 157);
    			attr_dev(details, "class", "formulae-details svelte-cbtwzk");
    			add_location(details, file$x, 5, 0, 81);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, details, anchor);
    			append_dev(details, summary);
    			append_dev(details, t1);
    			append_dev(details, div);
    			append_dev(div, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*PropertiesList*/ 0) {
    				each_value = PropertiesList.list;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$e(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$e(child_ctx);
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
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(details);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$A.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$A($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("PropertiesFormulae", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<PropertiesFormulae> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ PropertiesList });
    	return [];
    }

    class PropertiesFormulae extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$A, create_fragment$A, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PropertiesFormulae",
    			options,
    			id: create_fragment$A.name
    		});
    	}
    }

    /* src/components/character/creator/steps/PropertiesStep.svelte generated by Svelte v3.35.0 */
    const file$w = "src/components/character/creator/steps/PropertiesStep.svelte";

    function create_fragment$z(ctx) {
    	let div1;
    	let pageheader;
    	let t0;
    	let explanationblock;
    	let t1;
    	let propertiesformulae;
    	let t2;
    	let propertiesblock;
    	let t3;
    	let div0;
    	let healthsection;
    	let current;

    	pageheader = new PageHeader({
    			props: {
    				chapter: "Properties",
    				step: /*$characterStore*/ ctx[0].meta.step
    			},
    			$$inline: true
    		});

    	explanationblock = new ExplanationBlock({
    			props: { rule: Properties },
    			$$inline: true
    		});

    	propertiesformulae = new PropertiesFormulae({ $$inline: true });
    	propertiesblock = new PropertiesBlock({ $$inline: true });

    	healthsection = new HealthSection({
    			props: { mode: "readonly" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(pageheader.$$.fragment);
    			t0 = space();
    			create_component(explanationblock.$$.fragment);
    			t1 = space();
    			create_component(propertiesformulae.$$.fragment);
    			t2 = space();
    			create_component(propertiesblock.$$.fragment);
    			t3 = space();
    			div0 = element("div");
    			create_component(healthsection.$$.fragment);
    			attr_dev(div0, "class", "section-card");
    			add_location(div0, file$w, 23, 1, 952);
    			attr_dev(div1, "class", "properties-step-page");
    			add_location(div1, file$w, 18, 0, 759);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(pageheader, div1, null);
    			append_dev(div1, t0);
    			mount_component(explanationblock, div1, null);
    			append_dev(div1, t1);
    			mount_component(propertiesformulae, div1, null);
    			append_dev(div1, t2);
    			mount_component(propertiesblock, div1, null);
    			append_dev(div1, t3);
    			append_dev(div1, div0);
    			mount_component(healthsection, div0, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const pageheader_changes = {};
    			if (dirty & /*$characterStore*/ 1) pageheader_changes.step = /*$characterStore*/ ctx[0].meta.step;
    			pageheader.$set(pageheader_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(pageheader.$$.fragment, local);
    			transition_in(explanationblock.$$.fragment, local);
    			transition_in(propertiesformulae.$$.fragment, local);
    			transition_in(propertiesblock.$$.fragment, local);
    			transition_in(healthsection.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(pageheader.$$.fragment, local);
    			transition_out(explanationblock.$$.fragment, local);
    			transition_out(propertiesformulae.$$.fragment, local);
    			transition_out(propertiesblock.$$.fragment, local);
    			transition_out(healthsection.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(pageheader);
    			destroy_component(explanationblock);
    			destroy_component(propertiesformulae);
    			destroy_component(propertiesblock);
    			destroy_component(healthsection);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$z.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$z($$self, $$props, $$invalidate) {
    	let $characterStore;
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(0, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("PropertiesStep", slots, []);

    	afterUpdate(_ => {
    		set_store_value(characterStore, $characterStore = $characterStore.setProperties(), $characterStore);
    		SaveCharacter();
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<PropertiesStep> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		HealthSection,
    		ExplanationBlock,
    		PageHeader,
    		Properties,
    		PropertiesBlock,
    		PropertiesFormulae,
    		SaveCharacter,
    		characterStore,
    		afterUpdate,
    		$characterStore
    	});

    	return [$characterStore];
    }

    class PropertiesStep extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$z, create_fragment$z, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PropertiesStep",
    			options,
    			id: create_fragment$z.name
    		});
    	}
    }

    var RandomSkills = (c) => {
        c.resetSkills();
        while(Skills.remaining(c) > 0) {
            const t = RandomRoll(Object.keys(c.skills));
            const parentScore = c.traits[c.skills[t].parent.toLowerCase()].score;
            if (c.skills[t].score < parentScore) c.skills[t].score++;
        }
        return c
    };

    /* src/components/widgets/Slider.svelte generated by Svelte v3.35.0 */

    const file$v = "src/components/widgets/Slider.svelte";

    function get_each_context_1$5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	child_ctx[10] = i;
    	return child_ctx;
    }

    function get_each_context$d(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	child_ctx[10] = i;
    	return child_ctx;
    }

    // (19:1) {#if indicator}
    function create_if_block$8(ctx) {
    	let div;

    	function select_block_type(ctx, dirty) {
    		if (/*min*/ ctx[2]) return create_if_block_1$2;
    		return create_else_block$2;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block.c();
    			attr_dev(div, "class", "range-indicator svelte-1ukcf00");
    			add_location(div, file$v, 19, 2, 273);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_block.m(div, null);
    		},
    		p: function update(ctx, dirty) {
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
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$8.name,
    		type: "if",
    		source: "(19:1) {#if indicator}",
    		ctx
    	});

    	return block;
    }

    // (25:3) {:else}
    function create_else_block$2(ctx) {
    	let each_1_anchor;
    	let each_value_1 = Array(/*max*/ ctx[3] + 1);
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$5(get_each_context_1$5(ctx, each_value_1, i));
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
    			if (dirty & /*max*/ 8) {
    				each_value_1 = Array(/*max*/ ctx[3] + 1);
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$5(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$5(child_ctx);
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
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(25:3) {:else}",
    		ctx
    	});

    	return block;
    }

    // (21:3) {#if min}
    function create_if_block_1$2(ctx) {
    	let each_1_anchor;
    	let each_value = Array(/*max*/ ctx[3]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$d(get_each_context$d(ctx, each_value, i));
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
    			if (dirty & /*max*/ 8) {
    				each_value = Array(/*max*/ ctx[3]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$d(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$d(child_ctx);
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
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(21:3) {#if min}",
    		ctx
    	});

    	return block;
    }

    // (26:4) {#each Array(max+1) as _, i}
    function create_each_block_1$5(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*i*/ ctx[10]);
    			attr_dev(span, "class", "range-number");
    			add_location(span, file$v, 26, 5, 453);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$5.name,
    		type: "each",
    		source: "(26:4) {#each Array(max+1) as _, i}",
    		ctx
    	});

    	return block;
    }

    // (22:4) {#each Array(max) as _, i}
    function create_each_block$d(ctx) {
    	let span;
    	let t_value = /*i*/ ctx[10] + 1 + "";
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(t_value);
    			attr_dev(span, "class", "range-number");
    			add_location(span, file$v, 22, 5, 352);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$d.name,
    		type: "each",
    		source: "(22:4) {#each Array(max) as _, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$y(ctx) {
    	let div;
    	let input;
    	let t;
    	let mounted;
    	let dispose;
    	let if_block = /*indicator*/ ctx[5] && create_if_block$8(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			input = element("input");
    			t = space();
    			if (if_block) if_block.c();
    			attr_dev(input, "type", "range");
    			attr_dev(input, "name", /*name*/ ctx[1]);
    			attr_dev(input, "min", /*min*/ ctx[2]);
    			attr_dev(input, "max", /*max*/ ctx[3]);
    			attr_dev(input, "step", /*step*/ ctx[4]);
    			attr_dev(input, "class", "svelte-1ukcf00");
    			add_location(input, file$v, 12, 1, 148);
    			attr_dev(div, "class", "range-block svelte-1ukcf00");
    			add_location(div, file$v, 11, 0, 121);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, input);
    			set_input_value(input, /*value*/ ctx[0]);
    			append_dev(div, t);
    			if (if_block) if_block.m(div, null);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*input_change_input_handler*/ ctx[7]),
    					listen_dev(input, "input", /*input_change_input_handler*/ ctx[7]),
    					listen_dev(
    						input,
    						"input",
    						function () {
    							if (is_function(/*func*/ ctx[6] ? /*func*/ ctx[6]() : "")) (/*func*/ ctx[6] ? /*func*/ ctx[6]() : "").apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (dirty & /*name*/ 2) {
    				attr_dev(input, "name", /*name*/ ctx[1]);
    			}

    			if (dirty & /*min*/ 4) {
    				attr_dev(input, "min", /*min*/ ctx[2]);
    			}

    			if (dirty & /*max*/ 8) {
    				attr_dev(input, "max", /*max*/ ctx[3]);
    			}

    			if (dirty & /*step*/ 16) {
    				attr_dev(input, "step", /*step*/ ctx[4]);
    			}

    			if (dirty & /*value*/ 1) {
    				set_input_value(input, /*value*/ ctx[0]);
    			}

    			if (/*indicator*/ ctx[5]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$8(ctx);
    					if_block.c();
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$y.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$y($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Slider", slots, []);

    	let { name } = $$props,
    		{ value } = $$props,
    		{ min = 0 } = $$props,
    		{ max = 100 } = $$props,
    		{ step = 1 } = $$props,
    		{ indicator = false } = $$props,
    		{ func = null } = $$props;

    	const writable_props = ["name", "value", "min", "max", "step", "indicator", "func"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Slider> was created with unknown prop '${key}'`);
    	});

    	function input_change_input_handler() {
    		value = to_number(this.value);
    		$$invalidate(0, value);
    	}

    	$$self.$$set = $$props => {
    		if ("name" in $$props) $$invalidate(1, name = $$props.name);
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    		if ("min" in $$props) $$invalidate(2, min = $$props.min);
    		if ("max" in $$props) $$invalidate(3, max = $$props.max);
    		if ("step" in $$props) $$invalidate(4, step = $$props.step);
    		if ("indicator" in $$props) $$invalidate(5, indicator = $$props.indicator);
    		if ("func" in $$props) $$invalidate(6, func = $$props.func);
    	};

    	$$self.$capture_state = () => ({
    		name,
    		value,
    		min,
    		max,
    		step,
    		indicator,
    		func
    	});

    	$$self.$inject_state = $$props => {
    		if ("name" in $$props) $$invalidate(1, name = $$props.name);
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    		if ("min" in $$props) $$invalidate(2, min = $$props.min);
    		if ("max" in $$props) $$invalidate(3, max = $$props.max);
    		if ("step" in $$props) $$invalidate(4, step = $$props.step);
    		if ("indicator" in $$props) $$invalidate(5, indicator = $$props.indicator);
    		if ("func" in $$props) $$invalidate(6, func = $$props.func);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [value, name, min, max, step, indicator, func, input_change_input_handler];
    }

    class Slider extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$y, create_fragment$y, safe_not_equal, {
    			name: 1,
    			value: 0,
    			min: 2,
    			max: 3,
    			step: 4,
    			indicator: 5,
    			func: 6
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slider",
    			options,
    			id: create_fragment$y.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*name*/ ctx[1] === undefined && !("name" in props)) {
    			console.warn("<Slider> was created without expected prop 'name'");
    		}

    		if (/*value*/ ctx[0] === undefined && !("value" in props)) {
    			console.warn("<Slider> was created without expected prop 'value'");
    		}
    	}

    	get name() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get min() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set min(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get max() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set max(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get step() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set step(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get indicator() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set indicator(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get func() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set func(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/character/creator/steps/SkillsStep.svelte generated by Svelte v3.35.0 */
    const file$u = "src/components/character/creator/steps/SkillsStep.svelte";

    function get_each_context$c(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i];
    	child_ctx[11] = list;
    	child_ctx[12] = i;
    	return child_ctx;
    }

    // (42:6) {#each group.list as skill}
    function create_each_block_1$4(ctx) {
    	let div1;
    	let div0;
    	let t0_value = /*skill*/ ctx[10].name + "";
    	let t0;
    	let t1;
    	let slider;
    	let updating_value;
    	let current;

    	function slider_value_binding(value) {
    		/*slider_value_binding*/ ctx[3](value, /*skill*/ ctx[10]);
    	}

    	let slider_props = {
    		name: /*skill*/ ctx[10].name.toLowerCase(),
    		min: parseInt(0),
    		max: parseInt(6),
    		indicator: "true"
    	};

    	if (/*$characterStore*/ ctx[0].skills[/*skill*/ ctx[10].name.toLowerCase()].score !== void 0) {
    		slider_props.value = /*$characterStore*/ ctx[0].skills[/*skill*/ ctx[10].name.toLowerCase()].score;
    	}

    	slider = new Slider({ props: slider_props, $$inline: true });
    	binding_callbacks.push(() => bind(slider, "value", slider_value_binding));
    	slider.$on("input", /*input_handler*/ ctx[4]);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			create_component(slider.$$.fragment);
    			attr_dev(div0, "class", "stat-label");
    			add_location(div0, file$u, 43, 8, 1594);
    			attr_dev(div1, "class", "stat-range svelte-5yjlyb");
    			add_location(div1, file$u, 42, 7, 1561);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, t0);
    			append_dev(div1, t1);
    			mount_component(slider, div1, null);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const slider_changes = {};

    			if (!updating_value && dirty & /*$characterStore, SkillsList*/ 1) {
    				updating_value = true;
    				slider_changes.value = /*$characterStore*/ ctx[0].skills[/*skill*/ ctx[10].name.toLowerCase()].score;
    				add_flush_callback(() => updating_value = false);
    			}

    			slider.$set(slider_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(slider.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(slider.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(slider);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$4.name,
    		type: "each",
    		source: "(42:6) {#each group.list as skill}",
    		ctx
    	});

    	return block;
    }

    // (30:2) {#each SkillsList.groups as group}
    function create_each_block$c(ctx) {
    	let div2;
    	let details;
    	let summary;
    	let span;
    	let t0_value = /*group*/ ctx[7].name + "";
    	let t0;
    	let t1;
    	let t2;
    	let div1;
    	let div0;
    	let t3;
    	let t4_value = /*$characterStore*/ ctx[0].traits[/*group*/ ctx[7].name.toLowerCase()].score + "";
    	let t4;
    	let t5;
    	let current;
    	let each_value_1 = /*group*/ ctx[7].list;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$4(get_each_context_1$4(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			details = element("details");
    			summary = element("summary");
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = text(" Skills");
    			t2 = space();
    			div1 = element("div");
    			div0 = element("div");
    			t3 = text("Max Score: ");
    			t4 = text(t4_value);
    			t5 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(span, "class", "group-label svelte-5yjlyb");
    			add_location(span, file$u, 33, 6, 1283);
    			add_location(summary, file$u, 32, 5, 1267);
    			attr_dev(div0, "class", "max-score svelte-5yjlyb");
    			add_location(div0, file$u, 38, 6, 1408);
    			attr_dev(div1, "class", "details-content");
    			add_location(div1, file$u, 37, 5, 1372);
    			attr_dev(details, "class", "skills-details");
    			add_location(details, file$u, 31, 4, 1229);
    			attr_dev(div2, "class", "item-block svelte-5yjlyb");
    			add_location(div2, file$u, 30, 3, 1200);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, details);
    			append_dev(details, summary);
    			append_dev(summary, span);
    			append_dev(span, t0);
    			append_dev(span, t1);
    			append_dev(details, t2);
    			append_dev(details, div1);
    			append_dev(div1, div0);
    			append_dev(div0, t3);
    			append_dev(div0, t4);
    			append_dev(div1, t5);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*$characterStore*/ 1) && t4_value !== (t4_value = /*$characterStore*/ ctx[0].traits[/*group*/ ctx[7].name.toLowerCase()].score + "")) set_data_dev(t4, t4_value);

    			if (dirty & /*SkillsList, parseInt, $characterStore, updateSkill*/ 5) {
    				each_value_1 = /*group*/ ctx[7].list;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$4(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1$4(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div1, null);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
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
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$c.name,
    		type: "each",
    		source: "(30:2) {#each SkillsList.groups as group}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$x(ctx) {
    	let div;
    	let pageheader;
    	let t0;
    	let explanationblock;
    	let t1;
    	let pointsremaining;
    	let t2;
    	let t3;
    	let resetandrandombuttonrow;
    	let current;

    	pageheader = new PageHeader({
    			props: {
    				chapter: "Skills",
    				step: /*$characterStore*/ ctx[0].meta.step
    			},
    			$$inline: true
    		});

    	explanationblock = new ExplanationBlock({ props: { rule: Skills }, $$inline: true });

    	pointsremaining = new PointsRemaining({
    			props: { points: /*remaining*/ ctx[1] },
    			$$inline: true
    		});

    	let each_value = SkillsList.groups;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$c(get_each_context$c(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	resetandrandombuttonrow = new ResetAndRandomButtonRow({
    			props: {
    				reset: /*func*/ ctx[5],
    				random: /*func_1*/ ctx[6]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(pageheader.$$.fragment);
    			t0 = space();
    			create_component(explanationblock.$$.fragment);
    			t1 = space();
    			create_component(pointsremaining.$$.fragment);
    			t2 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t3 = space();
    			create_component(resetandrandombuttonrow.$$.fragment);
    			attr_dev(div, "class", "skills-step-page");
    			add_location(div, file$u, 25, 0, 985);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(pageheader, div, null);
    			append_dev(div, t0);
    			mount_component(explanationblock, div, null);
    			append_dev(div, t1);
    			mount_component(pointsremaining, div, null);
    			append_dev(div, t2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			append_dev(div, t3);
    			mount_component(resetandrandombuttonrow, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const pageheader_changes = {};
    			if (dirty & /*$characterStore*/ 1) pageheader_changes.step = /*$characterStore*/ ctx[0].meta.step;
    			pageheader.$set(pageheader_changes);
    			const pointsremaining_changes = {};
    			if (dirty & /*remaining*/ 2) pointsremaining_changes.points = /*remaining*/ ctx[1];
    			pointsremaining.$set(pointsremaining_changes);

    			if (dirty & /*SkillsList, parseInt, $characterStore, updateSkill*/ 5) {
    				each_value = SkillsList.groups;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$c(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$c(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, t3);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			const resetandrandombuttonrow_changes = {};
    			if (dirty & /*$characterStore*/ 1) resetandrandombuttonrow_changes.reset = /*func*/ ctx[5];
    			if (dirty & /*$characterStore*/ 1) resetandrandombuttonrow_changes.random = /*func_1*/ ctx[6];
    			resetandrandombuttonrow.$set(resetandrandombuttonrow_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(pageheader.$$.fragment, local);
    			transition_in(explanationblock.$$.fragment, local);
    			transition_in(pointsremaining.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(resetandrandombuttonrow.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(pageheader.$$.fragment, local);
    			transition_out(explanationblock.$$.fragment, local);
    			transition_out(pointsremaining.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(resetandrandombuttonrow.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(pageheader);
    			destroy_component(explanationblock);
    			destroy_component(pointsremaining);
    			destroy_each(each_blocks, detaching);
    			destroy_component(resetandrandombuttonrow);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$x.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$x($$self, $$props, $$invalidate) {
    	let remaining;
    	let $characterStore;
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(0, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("SkillsStep", slots, []);
    	afterUpdate(_ => SaveCharacter());

    	const updateSkill = event => {
    		set_store_value(characterStore, $characterStore = Skills.assign($characterStore, event.target), $characterStore);
    		Creation.proceedCheck($characterStore);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<SkillsStep> was created with unknown prop '${key}'`);
    	});

    	function slider_value_binding(value, skill) {
    		if ($$self.$$.not_equal($characterStore.skills[skill.name.toLowerCase()].score, value)) {
    			$characterStore.skills[skill.name.toLowerCase()].score = value;
    			characterStore.set($characterStore);
    		}
    	}

    	const input_handler = event => updateSkill(event);
    	const func = _ => set_store_value(characterStore, $characterStore = $characterStore.resetSkills($characterStore), $characterStore);
    	const func_1 = _ => set_store_value(characterStore, $characterStore = RandomSkills($characterStore), $characterStore);

    	$$self.$capture_state = () => ({
    		Creation,
    		ExplanationBlock,
    		PageHeader,
    		PointsRemaining,
    		RandomSkills,
    		ResetAndRandomButtonRow,
    		SaveCharacter,
    		Skills,
    		SkillsList,
    		Slider,
    		characterStore,
    		afterUpdate,
    		updateSkill,
    		remaining,
    		$characterStore
    	});

    	$$self.$inject_state = $$props => {
    		if ("remaining" in $$props) $$invalidate(1, remaining = $$props.remaining);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$characterStore*/ 1) {
    			$$invalidate(1, remaining = Skills.remaining($characterStore));
    		}
    	};

    	return [
    		$characterStore,
    		remaining,
    		updateSkill,
    		slider_value_binding,
    		input_handler,
    		func,
    		func_1
    	];
    }

    class SkillsStep extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$x, create_fragment$x, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SkillsStep",
    			options,
    			id: create_fragment$x.name
    		});
    	}
    }

    var RandomTraits = (c) => {
        c.resetTraits();
        while(Traits.remaining(c)) {
            const t = RandomRoll(Object.keys(c.traits));
            if (c.traits[t].score < Traits.maxPoints) c.traits[t].score++;
        }
        return c
    };

    /* src/components/character/creator/steps/TraitsStep.svelte generated by Svelte v3.35.0 */
    const file$t = "src/components/character/creator/steps/TraitsStep.svelte";

    function get_each_context$b(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	child_ctx[8] = list;
    	child_ctx[9] = i;
    	return child_ctx;
    }

    // (31:2) {#each TraitsList.list as trait}
    function create_each_block$b(ctx) {
    	let div3;
    	let div2;
    	let div0;
    	let t0_value = /*trait*/ ctx[7].name + "";
    	let t0;
    	let t1;
    	let div1;
    	let slider;
    	let updating_value;
    	let t2;
    	let current;

    	function slider_value_binding(value) {
    		/*slider_value_binding*/ ctx[3](value, /*trait*/ ctx[7]);
    	}

    	let slider_props = {
    		name: /*trait*/ ctx[7].name.toLowerCase(),
    		min: parseInt(1),
    		max: parseInt(Traits.maxPoints),
    		indicator: "true"
    	};

    	if (/*$characterStore*/ ctx[0].traits[/*trait*/ ctx[7].name.toLowerCase()].score !== void 0) {
    		slider_props.value = /*$characterStore*/ ctx[0].traits[/*trait*/ ctx[7].name.toLowerCase()].score;
    	}

    	slider = new Slider({ props: slider_props, $$inline: true });
    	binding_callbacks.push(() => bind(slider, "value", slider_value_binding));
    	slider.$on("input", /*input_handler*/ ctx[4]);

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			create_component(slider.$$.fragment);
    			t2 = space();
    			attr_dev(div0, "class", "stat-label");
    			add_location(div0, file$t, 33, 5, 1290);
    			attr_dev(div1, "class", "stat-column");
    			add_location(div1, file$t, 34, 5, 1338);
    			attr_dev(div2, "class", "trait-selection svelte-1tw289x");
    			add_location(div2, file$t, 32, 4, 1255);
    			attr_dev(div3, "class", "item-block");
    			add_location(div3, file$t, 31, 3, 1226);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			append_dev(div0, t0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			mount_component(slider, div1, null);
    			append_dev(div3, t2);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const slider_changes = {};

    			if (!updating_value && dirty & /*$characterStore, TraitsList*/ 1) {
    				updating_value = true;
    				slider_changes.value = /*$characterStore*/ ctx[0].traits[/*trait*/ ctx[7].name.toLowerCase()].score;
    				add_flush_callback(() => updating_value = false);
    			}

    			slider.$set(slider_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(slider.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(slider.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			destroy_component(slider);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$b.name,
    		type: "each",
    		source: "(31:2) {#each TraitsList.list as trait}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$w(ctx) {
    	let div1;
    	let pageheader;
    	let t0;
    	let explanationblock;
    	let t1;
    	let pointsremaining;
    	let t2;
    	let div0;
    	let t3;
    	let resetandrandombuttonrow;
    	let current;

    	pageheader = new PageHeader({
    			props: {
    				chapter: "Traits",
    				step: /*$characterStore*/ ctx[0].meta.step
    			},
    			$$inline: true
    		});

    	explanationblock = new ExplanationBlock({ props: { rule: Traits }, $$inline: true });

    	pointsremaining = new PointsRemaining({
    			props: { points: /*remaining*/ ctx[1] },
    			$$inline: true
    		});

    	let each_value = TraitsList.list;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$b(get_each_context$b(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	resetandrandombuttonrow = new ResetAndRandomButtonRow({
    			props: {
    				reset: /*func*/ ctx[5],
    				random: /*func_1*/ ctx[6]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(pageheader.$$.fragment);
    			t0 = space();
    			create_component(explanationblock.$$.fragment);
    			t1 = space();
    			create_component(pointsremaining.$$.fragment);
    			t2 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t3 = space();
    			create_component(resetandrandombuttonrow.$$.fragment);
    			attr_dev(div0, "class", "section-card");
    			add_location(div0, file$t, 29, 1, 1161);
    			attr_dev(div1, "class", "traits-step-page");
    			add_location(div1, file$t, 25, 0, 985);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(pageheader, div1, null);
    			append_dev(div1, t0);
    			mount_component(explanationblock, div1, null);
    			append_dev(div1, t1);
    			mount_component(pointsremaining, div1, null);
    			append_dev(div1, t2);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			append_dev(div1, t3);
    			mount_component(resetandrandombuttonrow, div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const pageheader_changes = {};
    			if (dirty & /*$characterStore*/ 1) pageheader_changes.step = /*$characterStore*/ ctx[0].meta.step;
    			pageheader.$set(pageheader_changes);
    			const pointsremaining_changes = {};
    			if (dirty & /*remaining*/ 2) pointsremaining_changes.points = /*remaining*/ ctx[1];
    			pointsremaining.$set(pointsremaining_changes);

    			if (dirty & /*TraitsList, parseInt, Traits, $characterStore, updateTrait*/ 5) {
    				each_value = TraitsList.list;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$b(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$b(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			const resetandrandombuttonrow_changes = {};
    			if (dirty & /*$characterStore*/ 1) resetandrandombuttonrow_changes.reset = /*func*/ ctx[5];
    			if (dirty & /*$characterStore*/ 1) resetandrandombuttonrow_changes.random = /*func_1*/ ctx[6];
    			resetandrandombuttonrow.$set(resetandrandombuttonrow_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(pageheader.$$.fragment, local);
    			transition_in(explanationblock.$$.fragment, local);
    			transition_in(pointsremaining.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(resetandrandombuttonrow.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(pageheader.$$.fragment, local);
    			transition_out(explanationblock.$$.fragment, local);
    			transition_out(pointsremaining.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(resetandrandombuttonrow.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(pageheader);
    			destroy_component(explanationblock);
    			destroy_component(pointsremaining);
    			destroy_each(each_blocks, detaching);
    			destroy_component(resetandrandombuttonrow);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$w.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$w($$self, $$props, $$invalidate) {
    	let remaining;
    	let $characterStore;
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(0, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("TraitsStep", slots, []);
    	afterUpdate(_ => SaveCharacter());

    	const updateTrait = event => {
    		set_store_value(characterStore, $characterStore = Traits.assign($characterStore, event.target), $characterStore);
    		Creation.proceedCheck($characterStore);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<TraitsStep> was created with unknown prop '${key}'`);
    	});

    	function slider_value_binding(value, trait) {
    		if ($$self.$$.not_equal($characterStore.traits[trait.name.toLowerCase()].score, value)) {
    			$characterStore.traits[trait.name.toLowerCase()].score = value;
    			characterStore.set($characterStore);
    		}
    	}

    	const input_handler = event => updateTrait(event);
    	const func = _ => set_store_value(characterStore, $characterStore = $characterStore.resetTraits(), $characterStore);
    	const func_1 = _ => set_store_value(characterStore, $characterStore = RandomTraits($characterStore), $characterStore);

    	$$self.$capture_state = () => ({
    		Creation,
    		ExplanationBlock,
    		PageHeader,
    		PointsRemaining,
    		RandomTraits,
    		ResetAndRandomButtonRow,
    		SaveCharacter,
    		Slider,
    		Traits,
    		TraitsList,
    		characterStore,
    		afterUpdate,
    		updateTrait,
    		remaining,
    		$characterStore
    	});

    	$$self.$inject_state = $$props => {
    		if ("remaining" in $$props) $$invalidate(1, remaining = $$props.remaining);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$characterStore*/ 1) {
    			$$invalidate(1, remaining = Traits.remaining($characterStore));
    		}
    	};

    	return [
    		$characterStore,
    		remaining,
    		updateTrait,
    		slider_value_binding,
    		input_handler,
    		func,
    		func_1
    	];
    }

    class TraitsStep extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$w, create_fragment$w, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TraitsStep",
    			options,
    			id: create_fragment$w.name
    		});
    	}
    }

    var CreationStepsList = [
    	DescriptionStep,
    	TraitsStep,
    	SkillsStep,
    	PropertiesStep,
    	AbilitiesStep,
    	GearStep,
    	FinalizeStep,
    ];

    /* src/components/buttons/NavButtonHome.svelte generated by Svelte v3.35.0 */

    const file$s = "src/components/buttons/NavButtonHome.svelte";

    function create_fragment$v(ctx) {
    	let button;
    	let div;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			div = element("div");
    			div.textContent = "Home";
    			attr_dev(div, "class", "home-icon-box svelte-5x1ex6");
    			add_location(div, file$s, 8, 1, 125);
    			attr_dev(button, "class", "home-btn btn-box svelte-5x1ex6");
    			add_location(button, file$s, 7, 0, 74);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, div);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*home*/ ctx[0], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$v.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$v($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("NavButtonHome", slots, []);

    	const home = _ => {
    		window.location.href = "/";
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<NavButtonHome> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ home });
    	return [home];
    }

    class NavButtonHome extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$v, create_fragment$v, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavButtonHome",
    			options,
    			id: create_fragment$v.name
    		});
    	}
    }

    /* src/components/buttons/NavButtonNext.svelte generated by Svelte v3.35.0 */
    const file$r = "src/components/buttons/NavButtonNext.svelte";

    function create_fragment$u(ctx) {
    	let button;
    	let div;
    	let raw_value = (/*$characterStore*/ ctx[0].meta.proceed ? `&gt;` : `X`) + "";
    	let button_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			div = element("div");
    			attr_dev(div, "class", "btn-icon");
    			add_location(div, file$r, 19, 1, 663);

    			attr_dev(button, "class", button_class_value = "next-btn btn-box " + (/*$characterStore*/ ctx[0].meta.proceed
    			? ""
    			: "crimson-btn") + " svelte-jyvl8v");

    			add_location(button, file$r, 18, 0, 559);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, div);
    			div.innerHTML = raw_value;

    			if (!mounted) {
    				dispose = listen_dev(
    					button,
    					"click",
    					function () {
    						if (is_function(/*next*/ ctx[1])) /*next*/ ctx[1].apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			if (dirty & /*$characterStore*/ 1 && raw_value !== (raw_value = (/*$characterStore*/ ctx[0].meta.proceed ? `&gt;` : `X`) + "")) div.innerHTML = raw_value;
    			if (dirty & /*$characterStore*/ 1 && button_class_value !== (button_class_value = "next-btn btn-box " + (/*$characterStore*/ ctx[0].meta.proceed
    			? ""
    			: "crimson-btn") + " svelte-jyvl8v")) {
    				attr_dev(button, "class", button_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$u.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$u($$self, $$props, $$invalidate) {
    	let next;
    	let $characterStore;
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(0, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("NavButtonNext", slots, []);
    	beforeUpdate(_ => set_store_value(characterStore, $characterStore.meta.proceed = Creation.proceedCheck($characterStore), $characterStore));
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<NavButtonNext> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Creation,
    		CreationStepsList,
    		characterStore,
    		beforeUpdate,
    		$characterStore,
    		next
    	});

    	$$self.$inject_state = $$props => {
    		if ("next" in $$props) $$invalidate(1, next = $$props.next);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$characterStore*/ 1) {
    			$$invalidate(1, next = _ => {
    				document.getElementById("character-creator").scrollTo(0, 0);
    				if ($characterStore.meta.proceed) set_store_value(characterStore, $characterStore.meta.step++, $characterStore);

    				if ($characterStore.meta.step == CreationStepsList.length) {
    					window.location.href = "/";
    				}
    			});
    		}
    	};

    	return [$characterStore, next];
    }

    class NavButtonNext extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$u, create_fragment$u, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavButtonNext",
    			options,
    			id: create_fragment$u.name
    		});
    	}
    }

    /* src/components/buttons/NavButtonPrevious.svelte generated by Svelte v3.35.0 */
    const file$q = "src/components/buttons/NavButtonPrevious.svelte";

    function create_fragment$t(ctx) {
    	let button;
    	let div;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			div = element("div");
    			attr_dev(div, "class", "btn-icon");
    			add_location(div, file$q, 16, 1, 362);
    			attr_dev(button, "class", "previous-btn btn-box svelte-jyvl8v");
    			add_location(button, file$q, 15, 0, 303);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, div);
    			div.innerHTML = /*previousButton*/ ctx[1];

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*previous*/ ctx[0], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$t.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$t($$self, $$props, $$invalidate) {
    	let $characterStore;
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(2, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("NavButtonPrevious", slots, []);

    	const previous = _ => {
    		document.getElementById("character-creator").scrollTo(0, 0);
    		set_store_value(characterStore, $characterStore.meta.step--, $characterStore);

    		if ($characterStore.meta.step < 0) {
    			window.location.href = "/new";
    		}
    	};

    	let previousButton = `&lt;`;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<NavButtonPrevious> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		characterStore,
    		previous,
    		previousButton,
    		$characterStore
    	});

    	$$self.$inject_state = $$props => {
    		if ("previousButton" in $$props) $$invalidate(1, previousButton = $$props.previousButton);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [previous, previousButton];
    }

    class NavButtonPrevious extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$t, create_fragment$t, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavButtonPrevious",
    			options,
    			id: create_fragment$t.name
    		});
    	}
    }

    /* src/components/character/creator/NavBar.svelte generated by Svelte v3.35.0 */
    const file$p = "src/components/character/creator/NavBar.svelte";

    function create_fragment$s(ctx) {
    	let div;
    	let navbuttonprevious;
    	let t0;
    	let navbuttonhome;
    	let t1;
    	let navbuttonnext;
    	let current;
    	navbuttonprevious = new NavButtonPrevious({ $$inline: true });
    	navbuttonhome = new NavButtonHome({ $$inline: true });
    	navbuttonnext = new NavButtonNext({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(navbuttonprevious.$$.fragment);
    			t0 = space();
    			create_component(navbuttonhome.$$.fragment);
    			t1 = space();
    			create_component(navbuttonnext.$$.fragment);
    			attr_dev(div, "class", "nav-bar svelte-1yur55s");
    			add_location(div, file$p, 7, 0, 236);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(navbuttonprevious, div, null);
    			append_dev(div, t0);
    			mount_component(navbuttonhome, div, null);
    			append_dev(div, t1);
    			mount_component(navbuttonnext, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navbuttonprevious.$$.fragment, local);
    			transition_in(navbuttonhome.$$.fragment, local);
    			transition_in(navbuttonnext.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navbuttonprevious.$$.fragment, local);
    			transition_out(navbuttonhome.$$.fragment, local);
    			transition_out(navbuttonnext.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(navbuttonprevious);
    			destroy_component(navbuttonhome);
    			destroy_component(navbuttonnext);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$s.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$s($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("NavBar", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<NavBar> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		NavButtonHome,
    		NavButtonNext,
    		NavButtonPrevious
    	});

    	return [];
    }

    class NavBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$s, create_fragment$s, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavBar",
    			options,
    			id: create_fragment$s.name
    		});
    	}
    }

    /* src/routes/creator.svelte generated by Svelte v3.35.0 */
    const file$o = "src/routes/creator.svelte";

    function create_fragment$r(ctx) {
    	let div;
    	let switch_instance;
    	let t;
    	let navbar;
    	let current;
    	var switch_value = CreationStepsList[/*$characterStore*/ ctx[0].meta.step];

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	navbar = new NavBar({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			t = space();
    			create_component(navbar.$$.fragment);
    			attr_dev(div, "id", "character-creator");
    			attr_dev(div, "class", "page-body svelte-8m0ayx");
    			add_location(div, file$o, 7, 0, 207);
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
    			mount_component(navbar, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (switch_value !== (switch_value = CreationStepsList[/*$characterStore*/ ctx[0].meta.step])) {
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
    			transition_in(navbar.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			transition_out(navbar.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (switch_instance) destroy_component(switch_instance);
    			if (detaching) detach_dev(t);
    			destroy_component(navbar, detaching);
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

    function instance$r($$self, $$props, $$invalidate) {
    	let $characterStore;
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(0, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Creator", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Creator> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		CreationStepsList,
    		NavBar,
    		characterStore,
    		$characterStore
    	});

    	return [$characterStore];
    }

    class Creator extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$r, create_fragment$r, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Creator",
    			options,
    			id: create_fragment$r.name
    		});
    	}
    }

    var GearList = {
    	name: `Gear`,
    	list: Alphabetize([
    		AccessoriesList,
    		AmmoList,
    		ArmorList,
    		AttributesList,
    		BombsList,
    		DocumentsList,
    		DrugsList,
    		ElectronicsList,
    		MedicalList,
    		MeleeWeaponsList,
    		MiscellaneousList,
    		RangedWeaponsList,
    		ResourcesList,
    		StorageList,
    		ToolsList,
    		WearablesList,
    	])
    };

    const Burning = new Rule({
    	name: `Burning`,
    	desc: [
    		`1 Fire Damage per round.`,
    		`It takes a d6 rounds to stop, drop Prone, and roll Survival 6# to put out the flames.`,
    	],
    	type: `Hazard`
    });

    class Disease extends Rule {
    	constructor({
    		desc,
    		id,
    		name,
    		type=`Disease`,
    		transmission,
    		virulence,
    		diagnose,
    		onset,
    		duration,
    		symptoms=[],
    		effects=[],
    		treatment=[]
    	}) {
    		super({
    			desc,
    			id,
    			name,
    			type
    		});
    		this.transmission = transmission;
    		this.virulence = virulence;
    		this.diagnose = diagnose;
    		this.onset = onset;
    		this.duration = duration;
    		this.symptoms = symptoms;
    		this.effects = effects;
    		this.treatment = treatment;
    	}
    	static text = [
    		`Transmission is the method by which the disease spreads. Roll Constitution vs Virulence to avoid infection when exposed.`,
    		`An attendant caring for a patient must roll Medicine vs the disease’s Diagnose to figure out if there is an effective Treatment and how to apply it. Attendants must roll Luck vs Contagion to avoid exposing themselves to some Diseases while Treating their patients. If their Luck roll Fails, they have been exposed and must roll Constitution vs Virulence to avoid infection. Diseases are considered “toxins” for the purposes of GEAR bonuses.`	
    	]
    }

    const Cholera = new Disease({
    	name: `Cholera`,
    	transmission: `Food/Water`,
    	virulence: `Constitution 9#`,
    	diagnose: `Medicine 9#`,
    	onset: `d6 hours`,
    	duration: `d6x3 days`,
    	symptoms: [
    		`Abdominal pain`,
    		`Nausea`,
    		`Vomiting`,
    		`Diarrhea`,
    		`Dehydration`
    	],
    	effects: `Dehydration requires 6 rations of Water/day. 1 Pain/day.`,
    	treatment: `Dehydration requires 6 rations of purified Water/day to avoid death. Antibiotics reduces Duration by 1 day per dose.`
    });

    const HemorrhagicFever = new Disease({
    	name: `Hemorrhagic Fever`,
    	transmission: `Body Fluids`,
    	virulence: `Constitution 12#`,
    	diagnose: `Medicine 12#`,
    	onset: `d6x3 days`,
    	duration: `d6 weeks`,
    	symptoms: [
    		`Fever`,
    		`Fatigue`,
    		`Aches`,
    		`Sore throat`,
    		`Vomiting`,
    		`Diarrhea`,
    		`Rash`,
    		`Impaired kidney/liver function`,
    		`Internal/external bleeding`
    	],
    	effects: `1 Pain/day. Roll C6# 1/day to avoid 1 Torso DMG. Natural Recovery is halted during infection.`,
    	treatment: `Medicine 9# 1/day to grant +1C to resist DMG. Contagion: Luck 6# 1/day.`
    });

    const Influenza = new Disease({
    	name: `Influenza`,
    	transmission: `Air, 10yds`,
    	virulence: `Constitution 12#`,
    	diagnose: `Medicine 3#`,
    	onset: `d6x2 days`,
    	duration: `d6x3 days`,
    	symptoms: [
    		`Headache`,
    		`Fever`,
    		`Fatigue`,
    		`Nausea`,
    		`Muscle pain`,
    		`Lesions in mouth, face, and body`,
    		`Vomiting`,
    		`Rash`,
    		`Blackened skin`
    	],
    	effects: `Smallpox can live for d6x3 days in infected linens. Roll C9# 1/day to avoid 1 Torso DMG while infection lasts. Natural Recovery is halted during infection.`,
    	treatment: `Medicine 6# 1/day to grant +1C to resist DMG. Contagion: Luck 12# 1/day.`
    });

    const MRSA = new Disease({
    	name: `MRSA`,
    	transmission: `Touch`,
    	virulence: `Constitution 12#`,
    	diagnose: `Medicine 18#`,
    	onset: `d6 weeks`,
    	duration: `d6 days`,
    	symptoms: [
    		`Small red bumps on skin`,
    		`Fever`,
    		`Rash`,
    		`Puss-filled boils`
    	],
    	effects: `MRSA can live on surfaces for d6 days after contact. Roll C9# every 12hrs to avoid 1 Torso DMG while infection lasts. Natural Recovery is halted during infection.`,
    	treatment: `No effective Treatment. No response to Antibiotics. Contagion: Luck 9# 1/day.`
    });

    const Rabies = new Disease({
    	name: `Rabies`,
    	transmission: `Body fluids`,
    	virulence: `Constitution 15#`,
    	diagnose: `Medicine 6#`,
    	onset: `d6 weeks`,
    	duration: `d6x4 days`,
    	symptoms: [
    		`Fever`,
    		`Aches`,
    		`Hydrophobia`,
    		`Low blood pressue`,
    		`Sweating`,
    		`Vomiting`,
    		`Drooling foam`,
    		`Convulsions`,
    		`Photophobia`,
    		`Pupil dilation`,
    		`Agitation`,
    		`Dehydration`,
    		`Fatigue`,
    		`Delirium`,
    		`Paralysis`,
    		`Stupor`,
    		`Coma`
    	],
    	effects: `Take 1 Head DMG every day while infection lasts. Natural Recovery is halted during infection.`,
    	treatment: `Amputation of exposed Body Part within d6 minutes prevents infection of the entire body. No further Treatment. Contagion: Luck 3# 1/day.`
    });

    const Smallpox = new Disease({
    	name: `Smallpox`,
    	transmission: `Air, 3yds`,
    	virulence: `Constitution 15#`,
    	diagnose: `Medicine 6#`,
    	onset: `d6 weeks`,
    	duration: `d6x4 days`,
    	symptoms: [
    		`Fever`,
    		`Aches`,
    		`Hydrophobia`,
    		`Low blood pressue`,
    		`Sweating`,
    		`Vomiting`,
    		`Drooling foam`
    	],
    	effects: `Take 1 Head DMG every day while infection lasts. Natural Recovery is halted during infection.`,
    	treatment: `Amputation of exposed Body Part within d6 minutes prevents infection of the entire body. No further Treatment. Contagion: Luck 3# 1/day.`
    });

    var DiseasesList = {
    	name: `Diseases`,
    	list: [
    		Cholera,
    		HemorrhagicFever,
    		Influenza,
    		MRSA,
    		Rabies,
    		Smallpox
    	]
    };

    const Falling = new Rule({
    	name: `Falling`,
    	desc: [
    		`1 Blunt Damage per 2yds.`,
    		`Each point of Falling Damage is inflicted on a random Body Part.`,
    		`Excess Damage left over after that Body Part is destroyed must be applied to another random Body Part until either no Damage remains or all Body Parts are destroyed.`,
    		`Roll [Acrobatics # = yds] to halve Falling Damage.`,
    		`On a Botch, you go Prone and get Stunned for d6 rounds.`,
    		`Falling objects deal BDMG equal to their Size.`,
    	],
    	type: `Hazard`
    });

    const FriendlyFire = new Rule({
    	name: `Friendly Fire`, 
    	desc: [
    		`-3 Ranged against targets within 1yd of your ally.`,
    		`If the Ranged Attack Fails, re-roll the Ranged Attack vs the ally’s Reflexive Dodge.`,
    	],
    	type: `Hazard`
    });

    var HazardsList = {
    	name: `Hazards`,
    	list: Alphabetize([
    		Burning,
    		...DiseasesList.list,
    		Falling,
    		FriendlyFire,
    	])
    };

    var menuStore = writable({
    	open: false,
    	links: [
    		{
    			'name': 'Character',
    			'url': '/character'
    		},
    		{
    			'name': 'Manual',
    			'url': '/manual'
    		},
    		{
    			'name': 'Roller',
    			'url': '/roller'
    		},
    		// {
    		// 	'name': 'Campaign',
    		// 	'url': '/campaign'
    		// }
    	],
        toggle() {
            this.open = !this.open;
            return this
        }
    });

    /* src/components/landing/MainMenu.svelte generated by Svelte v3.35.0 */
    const file$n = "src/components/landing/MainMenu.svelte";

    function get_each_context$a(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (7:1) {#each $menuStore.links as link}
    function create_each_block$a(ctx) {
    	let a;
    	let t_value = /*link*/ ctx[1].name + "";
    	let t;
    	let a_href_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			t = text(t_value);
    			attr_dev(a, "href", a_href_value = /*link*/ ctx[1].url);
    			attr_dev(a, "class", "link-btn");
    			add_location(a, file$n, 7, 2, 126);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$menuStore*/ 1 && t_value !== (t_value = /*link*/ ctx[1].name + "")) set_data_dev(t, t_value);

    			if (dirty & /*$menuStore*/ 1 && a_href_value !== (a_href_value = /*link*/ ctx[1].url)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$a.name,
    		type: "each",
    		source: "(7:1) {#each $menuStore.links as link}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$q(ctx) {
    	let div;
    	let each_value = /*$menuStore*/ ctx[0].links;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$a(get_each_context$a(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "cntr-card");
    			add_location(div, file$n, 5, 0, 66);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$menuStore*/ 1) {
    				each_value = /*$menuStore*/ ctx[0].links;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$a(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$a(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
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
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
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

    function instance$q($$self, $$props, $$invalidate) {
    	let $menuStore;
    	validate_store(menuStore, "menuStore");
    	component_subscribe($$self, menuStore, $$value => $$invalidate(0, $menuStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("MainMenu", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<MainMenu> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ menuStore, $menuStore });
    	return [$menuStore];
    }

    class MainMenu extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$q, create_fragment$q, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MainMenu",
    			options,
    			id: create_fragment$q.name
    		});
    	}
    }

    /* src/routes/home.svelte generated by Svelte v3.35.0 */

    function create_fragment$p(ctx) {
    	let mainmenu;
    	let current;
    	mainmenu = new MainMenu({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(mainmenu.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(mainmenu, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(mainmenu.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(mainmenu.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(mainmenu, detaching);
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

    function instance$p($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Home", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ MainMenu });
    	return [];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$p, create_fragment$p, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$p.name
    		});
    	}
    }

    var Login = (playerStore, email, password) => {
    	if (email && password) {
    		playerStore.loggedIn = true;
    	}
    	else {
    		alert('Error: Incorrect email and/or password.');
    	}
    	return playerStore
    };

    /* src/routes/join.svelte generated by Svelte v3.35.0 */
    const file$m = "src/routes/join.svelte";

    // (41:1) {#if error}
    function create_if_block$7(ctx) {
    	let div;
    	let h1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "Somethin's done fucked up!";
    			add_location(h1, file$m, 42, 3, 1166);
    			add_location(div, file$m, 41, 2, 1157);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$7.name,
    		type: "if",
    		source: "(41:1) {#if error}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$o(ctx) {
    	let div5;
    	let form;
    	let div0;
    	let label0;
    	let t1;
    	let input0;
    	let t2;
    	let div1;
    	let label1;
    	let t4;
    	let input1;
    	let t5;
    	let div2;
    	let label2;
    	let t7;
    	let input2;
    	let t8;
    	let div3;
    	let label3;
    	let t10;
    	let input3;
    	let t11;
    	let div4;
    	let button;
    	let a;
    	let t13;
    	let mounted;
    	let dispose;
    	let if_block = /*error*/ ctx[5] && create_if_block$7(ctx);

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			form = element("form");
    			div0 = element("div");
    			label0 = element("label");
    			label0.textContent = "Username";
    			t1 = space();
    			input0 = element("input");
    			t2 = space();
    			div1 = element("div");
    			label1 = element("label");
    			label1.textContent = "Email";
    			t4 = space();
    			input1 = element("input");
    			t5 = space();
    			div2 = element("div");
    			label2 = element("label");
    			label2.textContent = "Password";
    			t7 = space();
    			input2 = element("input");
    			t8 = space();
    			div3 = element("div");
    			label3 = element("label");
    			label3.textContent = "Confirm Password";
    			t10 = space();
    			input3 = element("input");
    			t11 = space();
    			div4 = element("div");
    			button = element("button");
    			a = element("a");
    			a.textContent = "Join";
    			t13 = space();
    			if (if_block) if_block.c();
    			attr_dev(label0, "for", "username");
    			add_location(label0, file$m, 19, 3, 426);
    			attr_dev(input0, "id", "username");
    			attr_dev(input0, "type", "text");
    			input0.required = true;
    			add_location(input0, file$m, 20, 3, 468);
    			attr_dev(div0, "class", "username svelte-1tqen22");
    			add_location(div0, file$m, 18, 2, 400);
    			attr_dev(label1, "for", "email");
    			add_location(label1, file$m, 23, 3, 569);
    			attr_dev(input1, "id", "email");
    			attr_dev(input1, "type", "text");
    			input1.required = true;
    			add_location(input1, file$m, 24, 3, 605);
    			attr_dev(div1, "class", "email svelte-1tqen22");
    			add_location(div1, file$m, 22, 2, 546);
    			attr_dev(label2, "for", "password");
    			add_location(label2, file$m, 27, 3, 703);
    			attr_dev(input2, "id", "password");
    			attr_dev(input2, "type", "text");
    			input2.required = true;
    			add_location(input2, file$m, 28, 3, 745);
    			attr_dev(div2, "class", "password svelte-1tqen22");
    			add_location(div2, file$m, 26, 2, 677);
    			attr_dev(label3, "for", "confirm");
    			add_location(label3, file$m, 31, 3, 848);
    			attr_dev(input3, "id", "confirm");
    			attr_dev(input3, "type", "text");
    			input3.required = true;
    			add_location(input3, file$m, 32, 3, 897);
    			attr_dev(div3, "class", "confirm svelte-1tqen22");
    			add_location(div3, file$m, 30, 2, 823);
    			attr_dev(a, "href", "/");
    			add_location(a, file$m, 36, 4, 1090);
    			attr_dev(button, "type", "button");
    			add_location(button, file$m, 35, 3, 995);
    			attr_dev(div4, "class", "join");
    			add_location(div4, file$m, 34, 2, 973);
    			add_location(form, file$m, 17, 1, 391);
    			attr_dev(div5, "class", "cntr-card");
    			add_location(div5, file$m, 16, 0, 366);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, form);
    			append_dev(form, div0);
    			append_dev(div0, label0);
    			append_dev(div0, t1);
    			append_dev(div0, input0);
    			set_input_value(input0, /*username*/ ctx[0]);
    			append_dev(form, t2);
    			append_dev(form, div1);
    			append_dev(div1, label1);
    			append_dev(div1, t4);
    			append_dev(div1, input1);
    			set_input_value(input1, /*email*/ ctx[1]);
    			append_dev(form, t5);
    			append_dev(form, div2);
    			append_dev(div2, label2);
    			append_dev(div2, t7);
    			append_dev(div2, input2);
    			set_input_value(input2, /*password*/ ctx[2]);
    			append_dev(form, t8);
    			append_dev(form, div3);
    			append_dev(div3, label3);
    			append_dev(div3, t10);
    			append_dev(div3, input3);
    			set_input_value(input3, /*confirm*/ ctx[3]);
    			append_dev(form, t11);
    			append_dev(form, div4);
    			append_dev(div4, button);
    			append_dev(button, a);
    			append_dev(div5, t13);
    			if (if_block) if_block.m(div5, null);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[6]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[7]),
    					listen_dev(input2, "input", /*input2_input_handler*/ ctx[8]),
    					listen_dev(input3, "input", /*input3_input_handler*/ ctx[9]),
    					listen_dev(button, "click", /*click_handler*/ ctx[10], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*username*/ 1 && input0.value !== /*username*/ ctx[0]) {
    				set_input_value(input0, /*username*/ ctx[0]);
    			}

    			if (dirty & /*email*/ 2 && input1.value !== /*email*/ ctx[1]) {
    				set_input_value(input1, /*email*/ ctx[1]);
    			}

    			if (dirty & /*password*/ 4 && input2.value !== /*password*/ ctx[2]) {
    				set_input_value(input2, /*password*/ ctx[2]);
    			}

    			if (dirty & /*confirm*/ 8 && input3.value !== /*confirm*/ ctx[3]) {
    				set_input_value(input3, /*confirm*/ ctx[3]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			if (if_block) if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
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

    function instance$o($$self, $$props, $$invalidate) {
    	let $playerStore;
    	validate_store(playerStore, "playerStore");
    	component_subscribe($$self, playerStore, $$value => $$invalidate(4, $playerStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Join", slots, []);
    	let username, email, password, confirm, error = false;

    	const handleSignUp = e => {
    		e.preventDefault();
    	}; // userbase.signUp({ username, password, rememberMe: 'none' })
    	// 	.then(user => alert('You signed up!'))
    	// 	.catch(e => error = true)

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Join> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		username = this.value;
    		$$invalidate(0, username);
    	}

    	function input1_input_handler() {
    		email = this.value;
    		$$invalidate(1, email);
    	}

    	function input2_input_handler() {
    		password = this.value;
    		$$invalidate(2, password);
    	}

    	function input3_input_handler() {
    		confirm = this.value;
    		$$invalidate(3, confirm);
    	}

    	const click_handler = _ => set_store_value(playerStore, $playerStore = Login($playerStore, email, password), $playerStore);

    	$$self.$capture_state = () => ({
    		Login,
    		playerStore,
    		username,
    		email,
    		password,
    		confirm,
    		error,
    		handleSignUp,
    		$playerStore
    	});

    	$$self.$inject_state = $$props => {
    		if ("username" in $$props) $$invalidate(0, username = $$props.username);
    		if ("email" in $$props) $$invalidate(1, email = $$props.email);
    		if ("password" in $$props) $$invalidate(2, password = $$props.password);
    		if ("confirm" in $$props) $$invalidate(3, confirm = $$props.confirm);
    		if ("error" in $$props) $$invalidate(5, error = $$props.error);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		username,
    		email,
    		password,
    		confirm,
    		$playerStore,
    		error,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler,
    		input3_input_handler,
    		click_handler
    	];
    }

    class Join extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$o, create_fragment$o, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Join",
    			options,
    			id: create_fragment$o.name
    		});
    	}
    }

    var BackupCharacter = (character) => {
    	const compressedCharacter = CompressCharacter(character);
    	const jsonStringifiedCharacter = JSON.stringify(compressedCharacter);
    	const characterBlob = new Blob(
    		[ jsonStringifiedCharacter ],
    		{ type: 'text/plain' }
    	);
    	const url = window.URL.createObjectURL(characterBlob);
    	const a = document.createElement("a");
    	a.href = url;
    	a.download = character.description.name.value;
    	a.click();
    	window.URL.revokeObjectURL(url);
    };

    /* src/components/character/load/CharacterControls.svelte generated by Svelte v3.35.0 */
    const file$l = "src/components/character/load/CharacterControls.svelte";

    function create_fragment$n(ctx) {
    	let div;
    	let button0;
    	let t1;
    	let button1;
    	let t3;
    	let button2;
    	let t5;
    	let button3;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			button0 = element("button");
    			button0.textContent = "Load";
    			t1 = space();
    			button1 = element("button");
    			button1.textContent = "Backup";
    			t3 = space();
    			button2 = element("button");
    			button2.textContent = "New";
    			t5 = space();
    			button3 = element("button");
    			button3.textContent = "Delete";
    			attr_dev(button0, "class", "small-cntr-btn svelte-tsgp1n");
    			add_location(button0, file$l, 24, 1, 846);
    			attr_dev(button1, "class", "small-cntr-btn svelte-tsgp1n");
    			add_location(button1, file$l, 25, 1, 917);
    			attr_dev(button2, "class", "small-cntr-btn svelte-tsgp1n");
    			add_location(button2, file$l, 28, 1, 996);
    			attr_dev(button3, "class", "small-cntr-btn svelte-tsgp1n");
    			add_location(button3, file$l, 29, 1, 1065);
    			attr_dev(div, "class", "controls svelte-tsgp1n");
    			add_location(div, file$l, 23, 0, 822);
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
    			append_dev(div, t5);
    			append_dev(div, button3);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*loadCharacter*/ ctx[1], false, false, false),
    					listen_dev(button1, "click", /*backupCharacter*/ ctx[2], false, false, false),
    					listen_dev(button2, "click", /*newCharacter*/ ctx[3], false, false, false),
    					listen_dev(button3, "click", /*deleteCharacter*/ ctx[0], false, false, false)
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
    		id: create_fragment$n.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$n($$self, $$props, $$invalidate) {
    	let $playerStore;
    	let $characterStore;
    	validate_store(playerStore, "playerStore");
    	component_subscribe($$self, playerStore, $$value => $$invalidate(4, $playerStore = $$value));
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(5, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("CharacterControls", slots, []);

    	const deleteCharacter = _ => {
    		set_store_value(playerStore, $playerStore = $playerStore.deleteCharacter(selectedCharacter), $playerStore);
    		set_store_value(playerStore, $playerStore.characterList = $playerStore.characterList.filter(c => c.description.name.value != selectedCharacter), $playerStore);
    		set_store_value(characterStore, $characterStore = $playerStore.characterList[$playerStore.currentCharacter], $characterStore);
    	};

    	const loadCharacter = _ => {
    		set_store_value(playerStore, $playerStore = $playerStore.loadCharacter(selectedCharacter), $playerStore);
    		set_store_value(characterStore, $characterStore = $playerStore.characterList[$playerStore.currentCharacter], $characterStore);
    		window.location.href = "/sheet";
    	};

    	const backupCharacter = _ => BackupCharacter($characterStore);
    	const newCharacter = _ => window.location.href = "/new";
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<CharacterControls> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		BackupCharacter,
    		characterStore,
    		playerStore,
    		deleteCharacter,
    		loadCharacter,
    		backupCharacter,
    		newCharacter,
    		$playerStore,
    		$characterStore
    	});

    	return [deleteCharacter, loadCharacter, backupCharacter, newCharacter];
    }

    class CharacterControls extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$n, create_fragment$n, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CharacterControls",
    			options,
    			id: create_fragment$n.name
    		});
    	}
    }

    /* src/components/character/load/CharacterList.svelte generated by Svelte v3.35.0 */
    const file$k = "src/components/character/load/CharacterList.svelte";

    function get_each_context$9(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    // (17:1) {#if $playerStore.characterList}
    function create_if_block$6(ctx) {
    	let div;
    	let current;
    	let each_value = /*$playerStore*/ ctx[0].characterList;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$9(get_each_context$9(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "character-storage-list");
    			add_location(div, file$k, 17, 2, 638);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*deleteCharacter, selectCharacter, $playerStore*/ 7) {
    				each_value = /*$playerStore*/ ctx[0].characterList;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$9(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$9(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
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
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(17:1) {#if $playerStore.characterList}",
    		ctx
    	});

    	return block;
    }

    // (19:3) {#each $playerStore.characterList as c}
    function create_each_block$9(ctx) {
    	let div;
    	let button;
    	let t0_value = /*c*/ ctx[5].description.name.value + "";
    	let t0;
    	let t1;
    	let trashbutton;
    	let t2;
    	let current;
    	let mounted;
    	let dispose;
    	trashbutton = new TrashButton({ $$inline: true });
    	trashbutton.$on("click", /*deleteCharacter*/ ctx[1]);

    	const block = {
    		c: function create() {
    			div = element("div");
    			button = element("button");
    			t0 = text(t0_value);
    			t1 = space();
    			create_component(trashbutton.$$.fragment);
    			t2 = space();
    			attr_dev(button, "class", "character-name svelte-1s2ixau");
    			add_location(button, file$k, 20, 5, 758);
    			attr_dev(div, "class", "stored-character svelte-1s2ixau");
    			add_location(div, file$k, 19, 4, 722);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button);
    			append_dev(button, t0);
    			append_dev(div, t1);
    			mount_component(trashbutton, div, null);
    			append_dev(div, t2);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[3], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*$playerStore*/ 1) && t0_value !== (t0_value = /*c*/ ctx[5].description.name.value + "")) set_data_dev(t0, t0_value);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(trashbutton.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(trashbutton.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(trashbutton);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$9.name,
    		type: "each",
    		source: "(19:3) {#each $playerStore.characterList as c}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$m(ctx) {
    	let div;
    	let current;
    	let if_block = /*$playerStore*/ ctx[0].characterList && create_if_block$6(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "character-storage-list-window svelte-1s2ixau");
    			add_location(div, file$k, 15, 0, 558);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$playerStore*/ ctx[0].characterList) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$playerStore*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$6(ctx);
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
    		id: create_fragment$m.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$m($$self, $$props, $$invalidate) {
    	let $playerStore;
    	let $characterStore;
    	validate_store(playerStore, "playerStore");
    	component_subscribe($$self, playerStore, $$value => $$invalidate(0, $playerStore = $$value));
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(4, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("CharacterList", slots, []);

    	const deleteCharacter = _ => {
    		set_store_value(playerStore, $playerStore = $playerStore.deleteCharacter(selectedCharacter), $playerStore);
    		set_store_value(playerStore, $playerStore.characterList = $playerStore.characterList.filter(c => c.description.name.value != selectedCharacter), $playerStore);
    		set_store_value(characterStore, $characterStore = $playerStore.characterList[$playerStore.currentCharacter], $characterStore);
    	};

    	const selectCharacter = e => selectedCharacter = e.target.textContent;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<CharacterList> was created with unknown prop '${key}'`);
    	});

    	const click_handler = event => selectCharacter(event);

    	$$self.$capture_state = () => ({
    		TrashButton,
    		characterStore,
    		playerStore,
    		deleteCharacter,
    		selectCharacter,
    		$playerStore,
    		$characterStore
    	});

    	return [$playerStore, deleteCharacter, selectCharacter, click_handler];
    }

    class CharacterList extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$m, create_fragment$m, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CharacterList",
    			options,
    			id: create_fragment$m.name
    		});
    	}
    }

    var ResetUIColor = _ => {
    	document.documentElement.style.setProperty(`--pri-color`, `rgba(0,255,0,1)`);
    	document.documentElement.style.setProperty(`--pri-color-trans`, `rgba(0,255,0,.25)`);
    	document.documentElement.style.setProperty(`--sec-color`, `rgba(15,30,15,1)`);
    	document.documentElement.style.setProperty(`--sec-color-trans`, `rgba(15,30,15,.25)`);
    };

    /* src/routes/load.svelte generated by Svelte v3.35.0 */
    const file$j = "src/routes/load.svelte";

    function create_fragment$l(ctx) {
    	let t0;
    	let div;
    	let characterlist;
    	let t1;
    	let charactercontrols;
    	let t2;
    	let backbutton;
    	let current;
    	characterlist = new CharacterList({ $$inline: true });
    	charactercontrols = new CharacterControls({ $$inline: true });

    	backbutton = new BackButton({
    			props: { path: "character" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			t0 = space();
    			div = element("div");
    			create_component(characterlist.$$.fragment);
    			t1 = space();
    			create_component(charactercontrols.$$.fragment);
    			t2 = space();
    			create_component(backbutton.$$.fragment);
    			document.title = "Apocalyptia Online - Load Character";
    			attr_dev(div, "class", "cntr-card");
    			add_location(div, file$j, 21, 0, 746);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);
    			mount_component(characterlist, div, null);
    			append_dev(div, t1);
    			mount_component(charactercontrols, div, null);
    			insert_dev(target, t2, anchor);
    			mount_component(backbutton, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(characterlist.$$.fragment, local);
    			transition_in(charactercontrols.$$.fragment, local);
    			transition_in(backbutton.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(characterlist.$$.fragment, local);
    			transition_out(charactercontrols.$$.fragment, local);
    			transition_out(backbutton.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div);
    			destroy_component(characterlist);
    			destroy_component(charactercontrols);
    			if (detaching) detach_dev(t2);
    			destroy_component(backbutton, detaching);
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

    function instance$l($$self, $$props, $$invalidate) {
    	let $playerStore;
    	let $characterStore;
    	validate_store(playerStore, "playerStore");
    	component_subscribe($$self, playerStore, $$value => $$invalidate(0, $playerStore = $$value));
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(1, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Load", slots, []);

    	beforeUpdate(_ => {
    		set_store_value(playerStore, $playerStore = $playerStore.loadAllCharacters(), $playerStore);
    		if ($playerStore.characterList.length) AdjustUIColor($characterStore); else ResetUIColor();
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Load> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		AdjustUIColor,
    		BackButton,
    		CharacterControls,
    		CharacterList,
    		ResetUIColor,
    		beforeUpdate,
    		characterStore,
    		playerStore,
    		$playerStore,
    		$characterStore
    	});

    	return [];
    }

    class Load extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$l, create_fragment$l, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Load",
    			options,
    			id: create_fragment$l.name
    		});
    	}
    }

    /* src/routes/login.svelte generated by Svelte v3.35.0 */
    const file$i = "src/routes/login.svelte";

    function create_fragment$k(ctx) {
    	let div3;
    	let form;
    	let div0;
    	let label0;
    	let t1;
    	let input0;
    	let t2;
    	let div1;
    	let label1;
    	let t4;
    	let input1;
    	let t5;
    	let div2;
    	let button;
    	let a;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			form = element("form");
    			div0 = element("div");
    			label0 = element("label");
    			label0.textContent = "Email";
    			t1 = space();
    			input0 = element("input");
    			t2 = space();
    			div1 = element("div");
    			label1 = element("label");
    			label1.textContent = "Password";
    			t4 = space();
    			input1 = element("input");
    			t5 = space();
    			div2 = element("div");
    			button = element("button");
    			a = element("a");
    			a.textContent = "Login";
    			attr_dev(label0, "for", "email");
    			add_location(label0, file$i, 11, 3, 190);
    			attr_dev(input0, "id", "email");
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "class", "svelte-6pba5d");
    			add_location(input0, file$i, 12, 3, 226);
    			attr_dev(div0, "class", "email svelte-6pba5d");
    			add_location(div0, file$i, 10, 2, 167);
    			attr_dev(label1, "for", "password");
    			add_location(label1, file$i, 15, 3, 315);
    			attr_dev(input1, "id", "password");
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "class", "svelte-6pba5d");
    			add_location(input1, file$i, 16, 3, 357);
    			attr_dev(div1, "class", "password svelte-6pba5d");
    			add_location(div1, file$i, 14, 2, 289);
    			attr_dev(a, "href", "/");
    			add_location(a, file$i, 20, 4, 544);
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", "svelte-6pba5d");
    			add_location(button, file$i, 19, 3, 449);
    			attr_dev(div2, "class", "login");
    			add_location(div2, file$i, 18, 2, 426);
    			add_location(form, file$i, 9, 1, 158);
    			attr_dev(div3, "class", "cntr-card");
    			add_location(div3, file$i, 8, 0, 133);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, form);
    			append_dev(form, div0);
    			append_dev(div0, label0);
    			append_dev(div0, t1);
    			append_dev(div0, input0);
    			set_input_value(input0, /*email*/ ctx[0]);
    			append_dev(form, t2);
    			append_dev(form, div1);
    			append_dev(div1, label1);
    			append_dev(div1, t4);
    			append_dev(div1, input1);
    			set_input_value(input1, /*password*/ ctx[1]);
    			append_dev(form, t5);
    			append_dev(form, div2);
    			append_dev(div2, button);
    			append_dev(button, a);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[3]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[4]),
    					listen_dev(button, "click", /*click_handler*/ ctx[5], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*email*/ 1 && input0.value !== /*email*/ ctx[0]) {
    				set_input_value(input0, /*email*/ ctx[0]);
    			}

    			if (dirty & /*password*/ 2 && input1.value !== /*password*/ ctx[1]) {
    				set_input_value(input1, /*password*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			mounted = false;
    			run_all(dispose);
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

    function instance$k($$self, $$props, $$invalidate) {
    	let $playerStore;
    	validate_store(playerStore, "playerStore");
    	component_subscribe($$self, playerStore, $$value => $$invalidate(2, $playerStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Login", slots, []);
    	let email, password;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Login> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		email = this.value;
    		$$invalidate(0, email);
    	}

    	function input1_input_handler() {
    		password = this.value;
    		$$invalidate(1, password);
    	}

    	const click_handler = _ => set_store_value(playerStore, $playerStore = Login($playerStore, email, password), $playerStore);

    	$$self.$capture_state = () => ({
    		Login,
    		playerStore,
    		email,
    		password,
    		$playerStore
    	});

    	$$self.$inject_state = $$props => {
    		if ("email" in $$props) $$invalidate(0, email = $$props.email);
    		if ("password" in $$props) $$invalidate(1, password = $$props.password);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		email,
    		password,
    		$playerStore,
    		input0_input_handler,
    		input1_input_handler,
    		click_handler
    	];
    }

    class Login_1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$k, create_fragment$k, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Login_1",
    			options,
    			id: create_fragment$k.name
    		});
    	}
    }

    var Capitalize = (string) => {
    	return string
    		.split(' ')
    		.map(word => word.charAt(0).toUpperCase() + word.substring(1))
    		.join(' ')
    };

    /* src/components/manual/ManualDiseaseRule.svelte generated by Svelte v3.35.0 */

    const { Object: Object_1$2 } = globals;
    const file$h = "src/components/manual/ManualDiseaseRule.svelte";

    function get_each_context$8(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    // (32:2) {:else}
    function create_else_block$1(ctx) {
    	let p;
    	let span;
    	let t0_value = Capitalize(/*prop*/ ctx[2]) + "";
    	let t0;
    	let t1;
    	let t2_value = /*rule*/ ctx[0][/*prop*/ ctx[2]] + "";
    	let t2;

    	const block = {
    		c: function create() {
    			p = element("p");
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = text(": ");
    			t2 = text(t2_value);
    			attr_dev(span, "class", "prop-name svelte-etkyiw");
    			add_location(span, file$h, 32, 6, 590);
    			attr_dev(p, "class", "svelte-etkyiw");
    			add_location(p, file$h, 32, 3, 587);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, span);
    			append_dev(span, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*diseaseProps*/ 2 && t0_value !== (t0_value = Capitalize(/*prop*/ ctx[2]) + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*rule, diseaseProps*/ 3 && t2_value !== (t2_value = /*rule*/ ctx[0][/*prop*/ ctx[2]] + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(32:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (25:2) {#if prop == 'symptoms'}
    function create_if_block$5(ctx) {
    	let p;
    	let span;
    	let t1;
    	let t2;
    	let ul;
    	let t3;
    	let each_value_1 = /*rule*/ ctx[0].symptoms;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$3(get_each_context_1$3(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			p = element("p");
    			span = element("span");
    			span.textContent = "Symptoms";
    			t1 = text(":");
    			t2 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t3 = space();
    			attr_dev(span, "class", "prop-name svelte-etkyiw");
    			add_location(span, file$h, 25, 6, 442);
    			attr_dev(p, "class", "svelte-etkyiw");
    			add_location(p, file$h, 25, 3, 439);
    			add_location(ul, file$h, 26, 3, 490);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, span);
    			append_dev(p, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			append_dev(ul, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*rule*/ 1) {
    				each_value_1 = /*rule*/ ctx[0].symptoms;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$3(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, t3);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(ul);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(25:2) {#if prop == 'symptoms'}",
    		ctx
    	});

    	return block;
    }

    // (28:3) {#each rule.symptoms as symptom}
    function create_each_block_1$3(ctx) {
    	let li;
    	let t_value = /*symptom*/ ctx[5] + "";
    	let t;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t = text(t_value);
    			attr_dev(li, "class", "svelte-etkyiw");
    			add_location(li, file$h, 28, 4, 535);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*rule*/ 1 && t_value !== (t_value = /*symptom*/ ctx[5] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$3.name,
    		type: "each",
    		source: "(28:3) {#each rule.symptoms as symptom}",
    		ctx
    	});

    	return block;
    }

    // (24:1) {#each diseaseProps as prop}
    function create_each_block$8(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*prop*/ ctx[2] == "symptoms") return create_if_block$5;
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$8.name,
    		type: "each",
    		source: "(24:1) {#each diseaseProps as prop}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$j(ctx) {
    	let div;
    	let each_value = /*diseaseProps*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$8(get_each_context$8(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "disease-section");
    			add_location(div, file$h, 22, 0, 349);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*rule, diseaseProps, Capitalize*/ 3) {
    				each_value = /*diseaseProps*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$8(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$8(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
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
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
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

    function instance$j($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ManualDiseaseRule", slots, []);
    	let { rule } = $$props;
    	let diseaseProps = [];

    	onMount(_ => {
    		const skippedProps = [`desc`, `formula`, `id`, `name`, `type`, `visible`];
    		$$invalidate(1, diseaseProps = Object.keys(rule).filter(prop => !skippedProps.includes(prop)));
    	});

    	const writable_props = ["rule"];

    	Object_1$2.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ManualDiseaseRule> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("rule" in $$props) $$invalidate(0, rule = $$props.rule);
    	};

    	$$self.$capture_state = () => ({ Capitalize, onMount, rule, diseaseProps });

    	$$self.$inject_state = $$props => {
    		if ("rule" in $$props) $$invalidate(0, rule = $$props.rule);
    		if ("diseaseProps" in $$props) $$invalidate(1, diseaseProps = $$props.diseaseProps);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [rule, diseaseProps];
    }

    class ManualDiseaseRule extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$j, create_fragment$j, safe_not_equal, { rule: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ManualDiseaseRule",
    			options,
    			id: create_fragment$j.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*rule*/ ctx[0] === undefined && !("rule" in props)) {
    			console.warn("<ManualDiseaseRule> was created without expected prop 'rule'");
    		}
    	}

    	get rule() {
    		throw new Error("<ManualDiseaseRule>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rule(value) {
    		throw new Error("<ManualDiseaseRule>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/manual/ManualRuleDescription.svelte generated by Svelte v3.35.0 */

    const file$g = "src/components/manual/ManualRuleDescription.svelte";

    function get_each_context$7(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (7:4) {#each rule.desc as desc}
    function create_each_block$7(ctx) {
    	let p;
    	let t_value = /*desc*/ ctx[1] + "";
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			attr_dev(p, "class", "svelte-1v2m6gn");
    			add_location(p, file$g, 7, 8, 106);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*rule*/ 1 && t_value !== (t_value = /*desc*/ ctx[1] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$7.name,
    		type: "each",
    		source: "(7:4) {#each rule.desc as desc}",
    		ctx
    	});

    	return block;
    }

    // (10:4) {#if rule.type == 'Ability'}
    function create_if_block$4(ctx) {
    	let p0;
    	let span0;
    	let t1;
    	let t2_value = /*rule*/ ctx[0].max + "";
    	let t2;
    	let t3;
    	let p1;
    	let span1;
    	let t5;
    	let t6_value = /*rule*/ ctx[0].experience + "";
    	let t6;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			span0 = element("span");
    			span0.textContent = "Max:";
    			t1 = space();
    			t2 = text(t2_value);
    			t3 = space();
    			p1 = element("p");
    			span1 = element("span");
    			span1.textContent = "XP:";
    			t5 = space();
    			t6 = text(t6_value);
    			attr_dev(span0, "class", "bold svelte-1v2m6gn");
    			add_location(span0, file$g, 10, 11, 176);
    			attr_dev(p0, "class", "svelte-1v2m6gn");
    			add_location(p0, file$g, 10, 8, 173);
    			attr_dev(span1, "class", "bold svelte-1v2m6gn");
    			add_location(span1, file$g, 11, 11, 233);
    			attr_dev(p1, "class", "svelte-1v2m6gn");
    			add_location(p1, file$g, 11, 8, 230);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			append_dev(p0, span0);
    			append_dev(p0, t1);
    			append_dev(p0, t2);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, span1);
    			append_dev(p1, t5);
    			append_dev(p1, t6);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*rule*/ 1 && t2_value !== (t2_value = /*rule*/ ctx[0].max + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*rule*/ 1 && t6_value !== (t6_value = /*rule*/ ctx[0].experience + "")) set_data_dev(t6, t6_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(p1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(10:4) {#if rule.type == 'Ability'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$i(ctx) {
    	let div;
    	let t;
    	let each_value = /*rule*/ ctx[0].desc;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$7(get_each_context$7(ctx, each_value, i));
    	}

    	let if_block = /*rule*/ ctx[0].type == "Ability" && create_if_block$4(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "desc-section");
    			add_location(div, file$g, 5, 0, 41);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			append_dev(div, t);
    			if (if_block) if_block.m(div, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*rule*/ 1) {
    				each_value = /*rule*/ ctx[0].desc;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$7(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$7(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, t);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (/*rule*/ ctx[0].type == "Ability") {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$4(ctx);
    					if_block.c();
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    			if (if_block) if_block.d();
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

    function instance$i($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ManualRuleDescription", slots, []);
    	let { rule } = $$props;
    	const writable_props = ["rule"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ManualRuleDescription> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("rule" in $$props) $$invalidate(0, rule = $$props.rule);
    	};

    	$$self.$capture_state = () => ({ rule });

    	$$self.$inject_state = $$props => {
    		if ("rule" in $$props) $$invalidate(0, rule = $$props.rule);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [rule];
    }

    class ManualRuleDescription extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, { rule: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ManualRuleDescription",
    			options,
    			id: create_fragment$i.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*rule*/ ctx[0] === undefined && !("rule" in props)) {
    			console.warn("<ManualRuleDescription> was created without expected prop 'rule'");
    		}
    	}

    	get rule() {
    		throw new Error("<ManualRuleDescription>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rule(value) {
    		throw new Error("<ManualRuleDescription>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/manual/ManualRuleSpecialization.svelte generated by Svelte v3.35.0 */

    const { Object: Object_1$1 } = globals;
    const file$f = "src/components/manual/ManualRuleSpecialization.svelte";

    function get_each_context$6(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (11:2) {#each spec.desc as desc}
    function create_each_block_1$2(ctx) {
    	let p;
    	let t0_value = /*desc*/ ctx[4] + "";
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(p, "class", "spec-desc svelte-elgqg2");
    			add_location(p, file$f, 11, 3, 191);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*rule*/ 1 && t0_value !== (t0_value = /*desc*/ ctx[4] + "")) set_data_dev(t0, t0_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$2.name,
    		type: "each",
    		source: "(11:2) {#each spec.desc as desc}",
    		ctx
    	});

    	return block;
    }

    // (7:1) {#each Object.values(rule.specs) as spec}
    function create_each_block$6(ctx) {
    	let div;
    	let t0_value = /*spec*/ ctx[1].name + "";
    	let t0;
    	let t1;
    	let each_1_anchor;
    	let each_value_1 = /*spec*/ ctx[1].desc;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    			attr_dev(div, "class", "sub-name svelte-elgqg2");
    			add_location(div, file$f, 7, 2, 113);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			insert_dev(target, t1, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*rule*/ 1 && t0_value !== (t0_value = /*spec*/ ctx[1].name + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*Object, rule*/ 1) {
    				each_value_1 = /*spec*/ ctx[1].desc;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$2(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$2(child_ctx);
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
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t1);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$6.name,
    		type: "each",
    		source: "(7:1) {#each Object.values(rule.specs) as spec}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$h(ctx) {
    	let div;
    	let each_value = Object.values(/*rule*/ ctx[0].specs);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "spec-section");
    			add_location(div, file$f, 5, 0, 41);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*Object, rule*/ 1) {
    				each_value = Object.values(/*rule*/ ctx[0].specs);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$6(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$6(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
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
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
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

    function instance$h($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ManualRuleSpecialization", slots, []);
    	let { rule } = $$props;
    	const writable_props = ["rule"];

    	Object_1$1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ManualRuleSpecialization> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("rule" in $$props) $$invalidate(0, rule = $$props.rule);
    	};

    	$$self.$capture_state = () => ({ rule });

    	$$self.$inject_state = $$props => {
    		if ("rule" in $$props) $$invalidate(0, rule = $$props.rule);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [rule];
    }

    class ManualRuleSpecialization extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, { rule: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ManualRuleSpecialization",
    			options,
    			id: create_fragment$h.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*rule*/ ctx[0] === undefined && !("rule" in props)) {
    			console.warn("<ManualRuleSpecialization> was created without expected prop 'rule'");
    		}
    	}

    	get rule() {
    		throw new Error("<ManualRuleSpecialization>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rule(value) {
    		throw new Error("<ManualRuleSpecialization>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/manual/ManualRuleTable.svelte generated by Svelte v3.35.0 */

    const { Object: Object_1 } = globals;
    const file$e = "src/components/manual/ManualRuleTable.svelte";

    function get_each_context$5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	child_ctx[3] = i;
    	return child_ctx;
    }

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	child_ctx[3] = i;
    	return child_ctx;
    }

    function get_each_context_2$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	child_ctx[3] = i;
    	return child_ctx;
    }

    // (9:12) {#each rule.table.headers as h, i}
    function create_each_block_2$1(ctx) {
    	let td;
    	let t_value = /*h*/ ctx[5] + "";
    	let t;

    	const block = {
    		c: function create() {
    			td = element("td");
    			t = text(t_value);
    			set_style(td, "max-width", /*rule*/ ctx[0].table.widths[/*i*/ ctx[3]] + "%");
    			set_style(td, "width", /*rule*/ ctx[0].table.widths[/*i*/ ctx[3]] + "%");
    			add_location(td, file$e, 9, 16, 175);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, td, anchor);
    			append_dev(td, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*rule*/ 1 && t_value !== (t_value = /*h*/ ctx[5] + "")) set_data_dev(t, t_value);

    			if (dirty & /*rule*/ 1) {
    				set_style(td, "max-width", /*rule*/ ctx[0].table.widths[/*i*/ ctx[3]] + "%");
    			}

    			if (dirty & /*rule*/ 1) {
    				set_style(td, "width", /*rule*/ ctx[0].table.widths[/*i*/ ctx[3]] + "%");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(td);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2$1.name,
    		type: "each",
    		source: "(9:12) {#each rule.table.headers as h, i}",
    		ctx
    	});

    	return block;
    }

    // (15:12) {#each Object.values(c) as c, i}
    function create_each_block_1$1(ctx) {
    	let td;
    	let t_value = /*c*/ ctx[1] + "";
    	let t;

    	const block = {
    		c: function create() {
    			td = element("td");
    			t = text(t_value);
    			set_style(td, "max-width", /*rule*/ ctx[0].table.widths[/*i*/ ctx[3]] + "%");
    			set_style(td, "width", /*rule*/ ctx[0].table.widths[/*i*/ ctx[3]] + "%");
    			add_location(td, file$e, 15, 16, 420);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, td, anchor);
    			append_dev(td, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*rule*/ 1 && t_value !== (t_value = /*c*/ ctx[1] + "")) set_data_dev(t, t_value);

    			if (dirty & /*rule*/ 1) {
    				set_style(td, "max-width", /*rule*/ ctx[0].table.widths[/*i*/ ctx[3]] + "%");
    			}

    			if (dirty & /*rule*/ 1) {
    				set_style(td, "width", /*rule*/ ctx[0].table.widths[/*i*/ ctx[3]] + "%");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(td);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$1.name,
    		type: "each",
    		source: "(15:12) {#each Object.values(c) as c, i}",
    		ctx
    	});

    	return block;
    }

    // (13:8) {#each rule.table.contents as c, i}
    function create_each_block$5(ctx) {
    	let tr;
    	let t;
    	let each_value_1 = Object.values(/*c*/ ctx[1]);
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			tr = element("tr");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			attr_dev(tr, "class", "svelte-4p9c23");
    			add_location(tr, file$e, 13, 12, 354);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(tr, null);
    			}

    			append_dev(tr, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*rule, Object*/ 1) {
    				each_value_1 = Object.values(/*c*/ ctx[1]);
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(tr, t);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$5.name,
    		type: "each",
    		source: "(13:8) {#each rule.table.contents as c, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$g(ctx) {
    	let div;
    	let table;
    	let tr;
    	let t;
    	let each_value_2 = /*rule*/ ctx[0].table.headers;
    	validate_each_argument(each_value_2);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_1[i] = create_each_block_2$1(get_each_context_2$1(ctx, each_value_2, i));
    	}

    	let each_value = /*rule*/ ctx[0].table.contents;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			table = element("table");
    			tr = element("tr");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(tr, "class", "table-header svelte-4p9c23");
    			add_location(tr, file$e, 7, 8, 86);
    			attr_dev(table, "class", "svelte-4p9c23");
    			add_location(table, file$e, 6, 4, 70);
    			attr_dev(div, "class", "rule-table svelte-4p9c23");
    			add_location(div, file$e, 5, 0, 41);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, table);
    			append_dev(table, tr);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(tr, null);
    			}

    			append_dev(table, t);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(table, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*rule*/ 1) {
    				each_value_2 = /*rule*/ ctx[0].table.headers;
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2$1(ctx, each_value_2, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_2$1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(tr, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_2.length;
    			}

    			if (dirty & /*Object, rule*/ 1) {
    				each_value = /*rule*/ ctx[0].table.contents;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$5(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$5(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(table, null);
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
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    		}
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

    function instance$g($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ManualRuleTable", slots, []);
    	let { rule } = $$props;
    	const writable_props = ["rule"];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ManualRuleTable> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("rule" in $$props) $$invalidate(0, rule = $$props.rule);
    	};

    	$$self.$capture_state = () => ({ rule });

    	$$self.$inject_state = $$props => {
    		if ("rule" in $$props) $$invalidate(0, rule = $$props.rule);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [rule];
    }

    class ManualRuleTable extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, { rule: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ManualRuleTable",
    			options,
    			id: create_fragment$g.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*rule*/ ctx[0] === undefined && !("rule" in props)) {
    			console.warn("<ManualRuleTable> was created without expected prop 'rule'");
    		}
    	}

    	get rule() {
    		throw new Error("<ManualRuleTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rule(value) {
    		throw new Error("<ManualRuleTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/manual/ManualSubRule.svelte generated by Svelte v3.35.0 */

    const file$d = "src/components/manual/ManualSubRule.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (9:2) {#each subrule.desc as sub_desc}
    function create_each_block$4(ctx) {
    	let p;
    	let t_value = /*sub_desc*/ ctx[1] + "";
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			add_location(p, file$d, 9, 3, 196);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*subrule*/ 1 && t_value !== (t_value = /*sub_desc*/ ctx[1] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(9:2) {#each subrule.desc as sub_desc}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
    	let details;
    	let summary;
    	let t0_value = /*subrule*/ ctx[0].name + "";
    	let t0;
    	let t1;
    	let div;
    	let each_value = /*subrule*/ ctx[0].desc;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			details = element("details");
    			summary = element("summary");
    			t0 = text(t0_value);
    			t1 = space();
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(summary, "class", "sub-name svelte-1yln192");
    			add_location(summary, file$d, 6, 1, 79);
    			attr_dev(div, "class", "subrule-body svelte-1yln192");
    			add_location(div, file$d, 7, 1, 131);
    			attr_dev(details, "class", "subrule-details svelte-1yln192");
    			add_location(details, file$d, 5, 0, 44);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, details, anchor);
    			append_dev(details, summary);
    			append_dev(summary, t0);
    			append_dev(details, t1);
    			append_dev(details, div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*subrule*/ 1 && t0_value !== (t0_value = /*subrule*/ ctx[0].name + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*subrule*/ 1) {
    				each_value = /*subrule*/ ctx[0].desc;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
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
    			if (detaching) detach_dev(details);
    			destroy_each(each_blocks, detaching);
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

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ManualSubRule", slots, []);
    	let { subrule } = $$props;
    	const writable_props = ["subrule"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ManualSubRule> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("subrule" in $$props) $$invalidate(0, subrule = $$props.subrule);
    	};

    	$$self.$capture_state = () => ({ subrule });

    	$$self.$inject_state = $$props => {
    		if ("subrule" in $$props) $$invalidate(0, subrule = $$props.subrule);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [subrule];
    }

    class ManualSubRule extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, { subrule: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ManualSubRule",
    			options,
    			id: create_fragment$f.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*subrule*/ ctx[0] === undefined && !("subrule" in props)) {
    			console.warn("<ManualSubRule> was created without expected prop 'subrule'");
    		}
    	}

    	get subrule() {
    		throw new Error("<ManualSubRule>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set subrule(value) {
    		throw new Error("<ManualSubRule>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/manual/ManualRule.svelte generated by Svelte v3.35.0 */
    const file$c = "src/components/manual/ManualRule.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (26:41) 
    function create_if_block_2$1(ctx) {
    	let manualruledescription;
    	let t0;
    	let t1;
    	let t2;
    	let if_block2_anchor;
    	let current;

    	manualruledescription = new ManualRuleDescription({
    			props: { rule: /*rule*/ ctx[0] },
    			$$inline: true
    		});

    	let if_block0 = /*rule*/ ctx[0].subrules && create_if_block_5(ctx);
    	let if_block1 = /*rule*/ ctx[0].table != undefined && create_if_block_4(ctx);
    	let if_block2 = /*rule*/ ctx[0].specs && create_if_block_3(ctx);

    	const block = {
    		c: function create() {
    			create_component(manualruledescription.$$.fragment);
    			t0 = space();
    			if (if_block0) if_block0.c();
    			t1 = space();
    			if (if_block1) if_block1.c();
    			t2 = space();
    			if (if_block2) if_block2.c();
    			if_block2_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			mount_component(manualruledescription, target, anchor);
    			insert_dev(target, t0, anchor);
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, t2, anchor);
    			if (if_block2) if_block2.m(target, anchor);
    			insert_dev(target, if_block2_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const manualruledescription_changes = {};
    			if (dirty & /*rule*/ 1) manualruledescription_changes.rule = /*rule*/ ctx[0];
    			manualruledescription.$set(manualruledescription_changes);

    			if (/*rule*/ ctx[0].subrules) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*rule*/ 1) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_5(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t1.parentNode, t1);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*rule*/ ctx[0].table != undefined) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*rule*/ 1) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_4(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(t2.parentNode, t2);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (/*rule*/ ctx[0].specs) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);

    					if (dirty & /*rule*/ 1) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block_3(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(manualruledescription.$$.fragment, local);
    			transition_in(if_block0);
    			transition_in(if_block1);
    			transition_in(if_block2);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(manualruledescription.$$.fragment, local);
    			transition_out(if_block0);
    			transition_out(if_block1);
    			transition_out(if_block2);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(manualruledescription, detaching);
    			if (detaching) detach_dev(t0);
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(t2);
    			if (if_block2) if_block2.d(detaching);
    			if (detaching) detach_dev(if_block2_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(26:41) ",
    		ctx
    	});

    	return block;
    }

    // (24:36) 
    function create_if_block_1$1(ctx) {
    	let manualdiseaserule;
    	let current;

    	manualdiseaserule = new ManualDiseaseRule({
    			props: { rule: /*rule*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(manualdiseaserule.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(manualdiseaserule, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const manualdiseaserule_changes = {};
    			if (dirty & /*rule*/ 1) manualdiseaserule_changes.rule = /*rule*/ ctx[0];
    			manualdiseaserule.$set(manualdiseaserule_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(manualdiseaserule.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(manualdiseaserule.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(manualdiseaserule, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(24:36) ",
    		ctx
    	});

    	return block;
    }

    // (20:8) {#if rule instanceof Gear }
    function create_if_block$3(ctx) {
    	let div;
    	let gearblock;
    	let current;

    	gearblock = new GearBlock({
    			props: { item: /*rule*/ ctx[0], mode: "manual" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(gearblock.$$.fragment);
    			attr_dev(div, "class", "gear-rule");
    			add_location(div, file$c, 20, 12, 788);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(gearblock, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const gearblock_changes = {};
    			if (dirty & /*rule*/ 1) gearblock_changes.item = /*rule*/ ctx[0];
    			gearblock.$set(gearblock_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(gearblock.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(gearblock.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(gearblock);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(20:8) {#if rule instanceof Gear }",
    		ctx
    	});

    	return block;
    }

    // (28:12) {#if rule.subrules}
    function create_if_block_5(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*rule*/ ctx[0].subrules;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

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
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*rule*/ 1) {
    				each_value = /*rule*/ ctx[0].subrules;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
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
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(28:12) {#if rule.subrules}",
    		ctx
    	});

    	return block;
    }

    // (29:16) {#each rule.subrules as subrule}
    function create_each_block$3(ctx) {
    	let manualsubrule;
    	let current;

    	manualsubrule = new ManualSubRule({
    			props: { subrule: /*subrule*/ ctx[2] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(manualsubrule.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(manualsubrule, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const manualsubrule_changes = {};
    			if (dirty & /*rule*/ 1) manualsubrule_changes.subrule = /*subrule*/ ctx[2];
    			manualsubrule.$set(manualsubrule_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(manualsubrule.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(manualsubrule.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(manualsubrule, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(29:16) {#each rule.subrules as subrule}",
    		ctx
    	});

    	return block;
    }

    // (33:12) {#if rule.table != undefined}
    function create_if_block_4(ctx) {
    	let manualruletable;
    	let current;

    	manualruletable = new ManualRuleTable({
    			props: { rule: /*rule*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(manualruletable.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(manualruletable, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const manualruletable_changes = {};
    			if (dirty & /*rule*/ 1) manualruletable_changes.rule = /*rule*/ ctx[0];
    			manualruletable.$set(manualruletable_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(manualruletable.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(manualruletable.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(manualruletable, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(33:12) {#if rule.table != undefined}",
    		ctx
    	});

    	return block;
    }

    // (36:12) {#if rule.specs}
    function create_if_block_3(ctx) {
    	let manualrulespecialization;
    	let current;

    	manualrulespecialization = new ManualRuleSpecialization({
    			props: { rule: /*rule*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(manualrulespecialization.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(manualrulespecialization, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const manualrulespecialization_changes = {};
    			if (dirty & /*rule*/ 1) manualrulespecialization_changes.rule = /*rule*/ ctx[0];
    			manualrulespecialization.$set(manualrulespecialization_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(manualrulespecialization.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(manualrulespecialization.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(manualrulespecialization, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(36:12) {#if rule.specs}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let details;
    	let summary;
    	let t0_value = /*rule*/ ctx[0].name + "";
    	let t0;
    	let t1_value = (typeof /*rule*/ ctx[0] == "Skill" ? " Skill" : "") + "";
    	let t1;
    	let t2;
    	let article;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	let mounted;
    	let dispose;
    	const if_block_creators = [create_if_block$3, create_if_block_1$1, create_if_block_2$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*rule*/ ctx[0] instanceof Gear) return 0;
    		if (/*rule*/ ctx[0] instanceof Disease) return 1;
    		if (/*rule*/ ctx[0].desc != undefined) return 2;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			details = element("details");
    			summary = element("summary");
    			t0 = text(t0_value);
    			t1 = text(t1_value);
    			t2 = space();
    			article = element("article");
    			if (if_block) if_block.c();
    			add_location(summary, file$c, 15, 4, 622);
    			attr_dev(article, "class", "rule-body");
    			add_location(article, file$c, 18, 4, 712);
    			add_location(details, file$c, 14, 0, 583);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, details, anchor);
    			append_dev(details, summary);
    			append_dev(summary, t0);
    			append_dev(summary, t1);
    			append_dev(details, t2);
    			append_dev(details, article);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(article, null);
    			}

    			details.open = /*rule*/ ctx[0].visible;
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(details, "toggle", /*details_toggle_handler*/ ctx[1]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*rule*/ 1) && t0_value !== (t0_value = /*rule*/ ctx[0].name + "")) set_data_dev(t0, t0_value);
    			if ((!current || dirty & /*rule*/ 1) && t1_value !== (t1_value = (typeof /*rule*/ ctx[0] == "Skill" ? " Skill" : "") + "")) set_data_dev(t1, t1_value);
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					} else {
    						if_block.p(ctx, dirty);
    					}

    					transition_in(if_block, 1);
    					if_block.m(article, null);
    				} else {
    					if_block = null;
    				}
    			}

    			if (dirty & /*rule*/ 1) {
    				details.open = /*rule*/ ctx[0].visible;
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
    			if (detaching) detach_dev(details);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d();
    			}

    			mounted = false;
    			dispose();
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

    function instance$e($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ManualRule", slots, []);
    	let { rule } = $$props;
    	const writable_props = ["rule"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ManualRule> was created with unknown prop '${key}'`);
    	});

    	function details_toggle_handler() {
    		rule.visible = this.open;
    		$$invalidate(0, rule);
    	}

    	$$self.$$set = $$props => {
    		if ("rule" in $$props) $$invalidate(0, rule = $$props.rule);
    	};

    	$$self.$capture_state = () => ({
    		Gear,
    		GearBlock,
    		Disease,
    		ManualDiseaseRule,
    		ManualRuleDescription,
    		ManualRuleSpecialization,
    		ManualRuleTable,
    		ManualSubRule,
    		rule
    	});

    	$$self.$inject_state = $$props => {
    		if ("rule" in $$props) $$invalidate(0, rule = $$props.rule);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [rule, details_toggle_handler];
    }

    class ManualRule extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, { rule: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ManualRule",
    			options,
    			id: create_fragment$e.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*rule*/ ctx[0] === undefined && !("rule" in props)) {
    			console.warn("<ManualRule> was created without expected prop 'rule'");
    		}
    	}

    	get rule() {
    		throw new Error("<ManualRule>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rule(value) {
    		throw new Error("<ManualRule>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/manual/ManualBody.svelte generated by Svelte v3.35.0 */
    const file$b = "src/components/manual/ManualBody.svelte";

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (27:1) {:else}
    function create_else_block(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "No results.";
    			attr_dev(p, "class", "svelte-1t016na");
    			add_location(p, file$b, 27, 2, 695);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
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

    // (21:27) 
    function create_if_block_2(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value_2 = /*ruleList*/ ctx[1];
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

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
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*ruleList*/ 2) {
    				each_value_2 = /*ruleList*/ ctx[1];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value_2.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_2.length; i += 1) {
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
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(21:27) ",
    		ctx
    	});

    	return block;
    }

    // (15:48) 
    function create_if_block_1(ctx) {
    	let each_1_anchor;
    	let each_value_1 = /*ruleList*/ ctx[1];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
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
    			if (dirty & /*ruleList*/ 2) {
    				each_value_1 = /*ruleList*/ ctx[1];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
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
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(15:48) ",
    		ctx
    	});

    	return block;
    }

    // (9:1) {#if chapter == 'Manual' && ruleList.length}
    function create_if_block$2(ctx) {
    	let each_1_anchor;
    	let each_value = /*ruleList*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
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
    			if (dirty & /*ruleList*/ 2) {
    				each_value = /*ruleList*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
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
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(9:1) {#if chapter == 'Manual' && ruleList.length}",
    		ctx
    	});

    	return block;
    }

    // (22:2) {#each ruleList as r}
    function create_each_block_2(ctx) {
    	let div;
    	let manualrule;
    	let t;
    	let current;

    	manualrule = new ManualRule({
    			props: { rule: /*r*/ ctx[8] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(manualrule.$$.fragment);
    			t = space();
    			attr_dev(div, "class", "manual-btn svelte-1t016na");
    			add_location(div, file$b, 22, 3, 611);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(manualrule, div, null);
    			append_dev(div, t);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const manualrule_changes = {};
    			if (dirty & /*ruleList*/ 2) manualrule_changes.rule = /*r*/ ctx[8];
    			manualrule.$set(manualrule_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(manualrule.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(manualrule.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(manualrule);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(22:2) {#each ruleList as r}",
    		ctx
    	});

    	return block;
    }

    // (16:2) {#each ruleList as g}
    function create_each_block_1(ctx) {
    	let div;
    	let a;
    	let t0_value = /*g*/ ctx[5].name + "";
    	let t0;
    	let a_href_value;
    	let t1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			a = element("a");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(a, "href", a_href_value = `/manual/gear/${/*g*/ ctx[5].name.toLowerCase()}`);
    			attr_dev(a, "class", "link-btn");
    			add_location(a, file$b, 17, 4, 457);
    			attr_dev(div, "class", "manual-btn svelte-1t016na");
    			add_location(div, file$b, 16, 3, 428);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, a);
    			append_dev(a, t0);
    			append_dev(div, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*ruleList*/ 2 && t0_value !== (t0_value = /*g*/ ctx[5].name + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*ruleList*/ 2 && a_href_value !== (a_href_value = `/manual/gear/${/*g*/ ctx[5].name.toLowerCase()}`)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(16:2) {#each ruleList as g}",
    		ctx
    	});

    	return block;
    }

    // (10:2) {#each ruleList as c}
    function create_each_block$2(ctx) {
    	let div;
    	let a;
    	let t0_value = /*c*/ ctx[2].name + "";
    	let t0;
    	let a_href_value;
    	let t1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			a = element("a");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(a, "href", a_href_value = `/manual/${/*c*/ ctx[2].name.toLowerCase()}`);
    			attr_dev(a, "class", "link-btn");
    			add_location(a, file$b, 11, 4, 258);
    			attr_dev(div, "class", "manual-btn svelte-1t016na");
    			add_location(div, file$b, 10, 3, 229);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, a);
    			append_dev(a, t0);
    			append_dev(div, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*ruleList*/ 2 && t0_value !== (t0_value = /*c*/ ctx[2].name + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*ruleList*/ 2 && a_href_value !== (a_href_value = `/manual/${/*c*/ ctx[2].name.toLowerCase()}`)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(10:2) {#each ruleList as c}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block$2, create_if_block_1, create_if_block_2, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*chapter*/ ctx[0] == "Manual" && /*ruleList*/ ctx[1].length) return 0;
    		if (/*chapter*/ ctx[0] == "Gear" && /*ruleList*/ ctx[1].length) return 1;
    		if (/*ruleList*/ ctx[1].length) return 2;
    		return 3;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block.c();
    			attr_dev(div, "class", "manual-page page-body svelte-1t016na");
    			add_location(div, file$b, 7, 0, 120);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
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
    				} else {
    					if_block.p(ctx, dirty);
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
    			if (detaching) detach_dev(div);
    			if_blocks[current_block_type_index].d();
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

    function instance$d($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ManualBody", slots, []);
    	let { chapter = "" } = $$props, { ruleList = [] } = $$props;
    	const writable_props = ["chapter", "ruleList"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ManualBody> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("chapter" in $$props) $$invalidate(0, chapter = $$props.chapter);
    		if ("ruleList" in $$props) $$invalidate(1, ruleList = $$props.ruleList);
    	};

    	$$self.$capture_state = () => ({ ManualRule, chapter, ruleList });

    	$$self.$inject_state = $$props => {
    		if ("chapter" in $$props) $$invalidate(0, chapter = $$props.chapter);
    		if ("ruleList" in $$props) $$invalidate(1, ruleList = $$props.ruleList);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [chapter, ruleList];
    }

    class ManualBody extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, { chapter: 0, ruleList: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ManualBody",
    			options,
    			id: create_fragment$d.name
    		});
    	}

    	get chapter() {
    		throw new Error("<ManualBody>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set chapter(value) {
    		throw new Error("<ManualBody>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ruleList() {
    		throw new Error("<ManualBody>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ruleList(value) {
    		throw new Error("<ManualBody>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/manual/ManualHeader.svelte generated by Svelte v3.35.0 */
    const file$a = "src/components/manual/ManualHeader.svelte";

    function create_fragment$c(ctx) {
    	let div1;
    	let div0;
    	let t0;
    	let t1;
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = text(/*chapter*/ ctx[0]);
    			t1 = space();
    			input = element("input");
    			attr_dev(div0, "class", "rules-name svelte-18969yl");
    			add_location(div0, file$a, 14, 1, 248);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "class", "search-bar svelte-18969yl");
    			attr_dev(input, "placeholder", "Search");
    			add_location(input, file$a, 15, 1, 289);
    			attr_dev(div1, "class", "manual-header-section svelte-18969yl");
    			add_location(div1, file$a, 13, 0, 211);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, t0);
    			append_dev(div1, t1);
    			append_dev(div1, input);
    			set_input_value(input, /*searchTerm*/ ctx[1]);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[3]),
    					listen_dev(input, "keyup", /*keyup_handler*/ ctx[4], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*chapter*/ 1) set_data_dev(t0, /*chapter*/ ctx[0]);

    			if (dirty & /*searchTerm*/ 2 && input.value !== /*searchTerm*/ ctx[1]) {
    				set_input_value(input, /*searchTerm*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			run_all(dispose);
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ManualHeader", slots, []);
    	let { chapter } = $$props;
    	let searchTerm = "";
    	const dispatch = createEventDispatcher();
    	const sendEvent = _ => dispatch("search", searchTerm);
    	const writable_props = ["chapter"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ManualHeader> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		searchTerm = this.value;
    		$$invalidate(1, searchTerm);
    	}

    	const keyup_handler = _ => sendEvent();

    	$$self.$$set = $$props => {
    		if ("chapter" in $$props) $$invalidate(0, chapter = $$props.chapter);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		chapter,
    		searchTerm,
    		dispatch,
    		sendEvent
    	});

    	$$self.$inject_state = $$props => {
    		if ("chapter" in $$props) $$invalidate(0, chapter = $$props.chapter);
    		if ("searchTerm" in $$props) $$invalidate(1, searchTerm = $$props.searchTerm);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [chapter, searchTerm, sendEvent, input_input_handler, keyup_handler];
    }

    class ManualHeader extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, { chapter: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ManualHeader",
    			options,
    			id: create_fragment$c.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*chapter*/ ctx[0] === undefined && !("chapter" in props)) {
    			console.warn("<ManualHeader> was created without expected prop 'chapter'");
    		}
    	}

    	get chapter() {
    		throw new Error("<ManualHeader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set chapter(value) {
    		throw new Error("<ManualHeader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var SearchEngine = (searchTerm, searchList) => {

    	const mappedList = [];

    	const addSublists = (rule) => {
    		if (rule.hasOwnProperty('list')) addSublists(rule.list);
    		else mappedList.push(rule);
    	};

    	addSublists(searchList);

    	const sortedRulesList = Alphabetize(mappedList);

    	let ruleList = sortedRulesList;

    	if (searchTerm.length) {
    		ruleList = ruleList.filter(r => !r.hasOwnProperty('list'));
    		ruleList = sortedRulesList.filter(r => {
    			return r.name.toLocaleLowerCase()
    						.startsWith(searchTerm.toLocaleLowerCase())
    		});
    		if (!ruleList.length) {
    			ruleList = sortedRulesList.filter(r => {
    				return r.name.toLocaleLowerCase()
    							.includes(searchTerm.toLocaleLowerCase())
    			});
    		}
    	}

    	return ruleList
    };

    /* src/components/manual/ManualPage.svelte generated by Svelte v3.35.0 */

    function create_fragment$b(ctx) {
    	let title_value;
    	let t0;
    	let manualheader;
    	let t1;
    	let manualbody;
    	let t2;
    	let backbutton;
    	let current;
    	document.title = title_value = "Apocalyptia Online - " + /*page*/ ctx[0].name;

    	manualheader = new ManualHeader({
    			props: { chapter: /*page*/ ctx[0].name },
    			$$inline: true
    		});

    	manualheader.$on("search", /*search_handler*/ ctx[4]);

    	manualbody = new ManualBody({
    			props: {
    				chapter: /*page*/ ctx[0].name,
    				ruleList: /*searchTerm*/ ctx[1].length
    				? /*ruleList*/ ctx[2]
    				: /*page*/ ctx[0].list
    			},
    			$$inline: true
    		});

    	backbutton = new BackButton({
    			props: {
    				path: /*page*/ ctx[0].path.slice(0, /*page*/ ctx[0].path.length - /*page*/ ctx[0].name.length)
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			t0 = space();
    			create_component(manualheader.$$.fragment);
    			t1 = space();
    			create_component(manualbody.$$.fragment);
    			t2 = space();
    			create_component(backbutton.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			mount_component(manualheader, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(manualbody, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(backbutton, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*page*/ 1) && title_value !== (title_value = "Apocalyptia Online - " + /*page*/ ctx[0].name)) {
    				document.title = title_value;
    			}

    			const manualheader_changes = {};
    			if (dirty & /*page*/ 1) manualheader_changes.chapter = /*page*/ ctx[0].name;
    			manualheader.$set(manualheader_changes);
    			const manualbody_changes = {};
    			if (dirty & /*page*/ 1) manualbody_changes.chapter = /*page*/ ctx[0].name;

    			if (dirty & /*searchTerm, ruleList, page*/ 7) manualbody_changes.ruleList = /*searchTerm*/ ctx[1].length
    			? /*ruleList*/ ctx[2]
    			: /*page*/ ctx[0].list;

    			manualbody.$set(manualbody_changes);
    			const backbutton_changes = {};
    			if (dirty & /*page*/ 1) backbutton_changes.path = /*page*/ ctx[0].path.slice(0, /*page*/ ctx[0].path.length - /*page*/ ctx[0].name.length);
    			backbutton.$set(backbutton_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(manualheader.$$.fragment, local);
    			transition_in(manualbody.$$.fragment, local);
    			transition_in(backbutton.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(manualheader.$$.fragment, local);
    			transition_out(manualbody.$$.fragment, local);
    			transition_out(backbutton.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			destroy_component(manualheader, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(manualbody, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(backbutton, detaching);
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ManualPage", slots, []);
    	let { page } = $$props;
    	let searchTerm = "";
    	let ruleList = Alphabetize(page.list);

    	const handleSearch = event => {
    		$$invalidate(1, searchTerm = event.detail);
    		$$invalidate(2, ruleList = SearchEngine(searchTerm, Alphabetize(page.list)));
    	};

    	const writable_props = ["page"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ManualPage> was created with unknown prop '${key}'`);
    	});

    	const search_handler = e => handleSearch(e);

    	$$self.$$set = $$props => {
    		if ("page" in $$props) $$invalidate(0, page = $$props.page);
    	};

    	$$self.$capture_state = () => ({
    		Alphabetize,
    		BackButton,
    		ManualBody,
    		ManualHeader,
    		SearchEngine,
    		page,
    		searchTerm,
    		ruleList,
    		handleSearch
    	});

    	$$self.$inject_state = $$props => {
    		if ("page" in $$props) $$invalidate(0, page = $$props.page);
    		if ("searchTerm" in $$props) $$invalidate(1, searchTerm = $$props.searchTerm);
    		if ("ruleList" in $$props) $$invalidate(2, ruleList = $$props.ruleList);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [page, searchTerm, ruleList, handleSearch, search_handler];
    }

    class ManualPage extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, { page: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ManualPage",
    			options,
    			id: create_fragment$b.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*page*/ ctx[0] === undefined && !("page" in props)) {
    			console.warn("<ManualPage> was created without expected prop 'page'");
    		}
    	}

    	get page() {
    		throw new Error("<ManualPage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set page(value) {
    		throw new Error("<ManualPage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/routes/manual.svelte generated by Svelte v3.35.0 */

    function create_fragment$a(ctx) {
    	let manualpage;
    	let current;

    	manualpage = new ManualPage({
    			props: { page: /*page*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(manualpage.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(manualpage, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const manualpage_changes = {};
    			if (dirty & /*page*/ 1) manualpage_changes.page = /*page*/ ctx[0];
    			manualpage.$set(manualpage_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(manualpage.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(manualpage.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(manualpage, detaching);
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Manual", slots, []);
    	let { page } = $$props;
    	const writable_props = ["page"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Manual> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("page" in $$props) $$invalidate(0, page = $$props.page);
    	};

    	$$self.$capture_state = () => ({ ManualPage, page });

    	$$self.$inject_state = $$props => {
    		if ("page" in $$props) $$invalidate(0, page = $$props.page);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [page];
    }

    class Manual extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { page: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Manual",
    			options,
    			id: create_fragment$a.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*page*/ ctx[0] === undefined && !("page" in props)) {
    			console.warn("<Manual> was created without expected prop 'page'");
    		}
    	}

    	get page() {
    		throw new Error("<Manual>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set page(value) {
    		throw new Error("<Manual>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const Duck = new Rule({
    	name: `Duck`, 
    	desc: [
    		`You may roll [Dodge vs Attack] to move up to your Speed to get behind Cover.`,
    		`This is the only way to Dodge a Ranged(Shoot) Attack.`,
    		`As part of this Dodge, you may elect to go Prone.`,
    		`If the Attack still hits, the Cover Material’s Absorption reduces the Damage.`,
    		`You will keep the benefits of Cover as long as it remains between you and the opponent.`,
    	]
    });

    const Hide = new Rule({
    	name: `Hide`, 
    	desc: [
    		`Roll [Stealth vs Perception] to be Concealed.`,
    		`Your Speed is 0.`,
    		`+3 Stealth if Prone.`,
    	]
    });

    const Protect = new Rule({
    	name: `Protect`, 
    	desc: [
    		`You become the new target of all Attacks targeting someone you choose within 1yd of you for 1 round.`,
    		`This does not take an Action to declare, but any Defense rolls you make take Actions as usual.`,
    	]
    });

    const Sneak = new Rule({
    	name: `Sneak`, 
    	desc: [
    		`Roll [Stealth vs Perception] to move Concealed at [Speed / 2].`,
    	]
    });

    var DefensiveManeuversList = [
    	Duck,
    	Hide,
    	Protect,
    	Sneak
    ];

    const Aim = new Rule({
    	name: `Aim`, 
    	desc: [
    		`Spend an Action to get +3 to your next Attack against a specific target.`,
    	],
    });

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

    const CalledShot = new Rule({
    	name: `Called Shot`, 
    	desc: [
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
    			penalty: `-6 Ranged`,
    			health: `Constitution`,
    			effect: `Stun 1 round.`
    		}),
    		new CalledShotTarget({
    			roll: 5,
    			name: `R Arm`,
    			penalty: `-3 Ranged`,
    			effect: `Let go of anything held with this hand.`
    		}),
    		new CalledShotTarget({
    			roll: 4,
    			name: `L Arm`,
    			penalty: `-3 Ranged`,
    			effect: `Let go of anything held with this hand.`
    		}),
    		new CalledShotTarget({
    			roll: 3,
    			name: `Torso`,
    			penalty: `No penalty.`,
    			effect: `None.`
    		}),
    		new CalledShotTarget({
    			roll: 2,
    			name: `L Leg`,
    			penalty: `-1 Ranged`,
    			effect: `Fall Prone.`
    		}),
    		new CalledShotTarget({
    			roll: 1,
    			name: `R Leg`,
    			penalty: `-1 Ranged`,
    			effect: `Fall Prone.`
    		}),
    	],
    	widths: [5, 15, 20, 50]
    });

    const Disarm = new Rule({
    	name: `Disarm`, 
    	desc: [
    		`Roll [Melee vs Melee (+ Constitution if the weapon is used two-handed)].`,
    		`The weapon flies d6 yds away in a random direction or the Attacker may choose to grab the weapon if they are Unarmed.`,
    	]
    });

    const Grab = new Rule({
    	name: `Grab`,
    	desc: [
    		`Roll [Melee(Unarmed) vs DEF] to impose the 'Grabbed' Status.`,
    	]
    });

    const Hostage = new Rule({
    	name: `Hostage`,
    	desc: [
    		`Use a Grabbed or Restrained enemy as Cover.`,
    		`The Grappled enemy's Absorption acts as the Material Absorption and any excess Damage is applied to the Grappled enemy instead of you.`,
    		`If the Damage is enough to kill the Grappled enemy, any excess Damage passes through to you.`,
    		`This does not make you Concealed.`,
    	]
    });

    const Tackle = new Rule({
    	name: `Tackle`,
    	desc: [
    		`Spend 2 Actions and make a Grapple Attack roll to move up to your Speed and Pin an enemy.`,
    		`If you Fail, you go Prone in front of them.`,
    	]
    });

    const Throw = new Rule({
    	name: `Throw`,
    	desc: [
    		`Throw a Grabbed or Restrained enemy up to [Constitution] yds.`,
    		`The target takes 1 point of Blunt Damage to a random Body Part and land Prone.`,
    	]
    });

    const Grapple = new Rule({
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
    	name: `Non-Lethal Force`,
    	desc: [
    		`Declare that you are using this Maneuver before rolling a Melee Attack.`,
    		`On a Success, you do half Damage.`,
    	]
    });

    const Push = new Rule({
    	name: `Push`,
    	desc: [
    		`Roll [Constitution vs Constitution] to push an enemy in front of you.`,
    		`While Pushing, your Speed is equal to the lesser of your normal Speed or your Constitution. No Damage.`,
    	]
    });

    const Reload = new Rule({
    	name: `Reload`,
    	desc: [
    		`Replace a magazine or a single piece of ammunition (depending on the weapon) in a Ranged weapon.`,
    	]
    });

    const Shove = new Rule({
    	name: `Shove`,
    	desc: [
    		`Roll [Melee vs Constitution] to shove an enemy up to [Constitution / 2] yds away from you, knocking them Prone. No Damage.`,
    	]
    });

    const Trip = new Rule({
    	name: `Trip`,
    	desc: [
    		`Roll [Melee vs Agility] to knock an enemy Prone. 1 Damage.`,
    	]
    });

    var OffensiveManeuversList = [
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
    	name: `Distract`,
    	desc: [
    		`Roll [Perform vs Perception].`,
    		`Stun target for 1 round.`,
    	]
    });

    const Encourage = new Rule({
    	name: `Encourage`,
    	desc: [
    		`Roll [Leadership vs groups’ total Demeanor scores].`,
    		`The group gets a bonus = [your Demeanor] for one specific roll each.`,
    		`A Botch is -1 to all rolls.`,
    	]
    });

    const Interrogate = new Rule({
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
    	name: `Recruit`,
    	desc: [
    		`Roll [Socialize vs Demeanor] to convince someone to join your side.`,
    		`If they are someone’s follower, roll [Leadership vs Leadership].`,
    		`Attitude and other contextual modifiers should be applied at the Narrator's discretion.`,
    	]
    });

    const Taunt = new Rule({
    	name: `Taunt`,
    	desc: [
    		`Roll [Leadership vs Demeanor].`,
    		`Provoke the enemy into exclusively attacking you.`,
    		`The degree of Success is a penalty to the loser’s next roll.`,
    		`The enemy is Stunned for 1 round if [penalty > enemy’s Demeanor].`,
    	]
    });

    const Torture = new Rule({
    	name: `Torture`,
    	desc: [
    		`Torture sessions can last as long as the torturer wants them to.`,
    		`Roll [Medicine vs the captive's Constitution] and select one or more Body Parts on the captive.`,
    		`Success means the captive takes 1d6 Trauma and 1 Damage for each selected Body Part.`,
    		`Failure means the captive takes 1d6 Trauma and 1d6 Damage for each selected Body Part.`,
    		`Roll [Demeanor vs Demeanor] at the end of each torture session.`,
    		`Success means you take 1 Trauma and the captive's spirit is broken, meaning that they will do or say whatever they think will stop further torture until they are freed.`,
    		`Failure means you take 1d6 Trauma from inflicting torture on another human being and the captive continues to resist.`,
    	]
    });

    var SocialManeuversList = [
    	Distract,
    	Encourage,
    	Interrogate,
    	Negotiate,
    	Recruit,
    	Taunt,
    	Torture
    ];

    var ManeuversList = {
    	name: `Maneuvers`,
    	list: [
    		...DefensiveManeuversList,
    		...OffensiveManeuversList,
    		...SocialManeuversList,
    	]
    };

    const Dehydration = new Rule({
    	name: `Dehydration`,
    	desc: [
    		`1 Water per day is required.`,
    		`1 Pain per day without Water.`,
    		`This penalty is reduced by 1 per day with Water.`,
    		`Going without Water for a number of days = [Constitution] is lethal.`,
    		`Climate Humidity modifies Water requirements as follows: Desert, 3/day. Mountain, 2/day. Tundra, 2/day.`,
    	]
    });

    const Exhaustion = new Rule({
    	name: `Exhaustion`,
    	desc: [
    		`8 hours of sleep per day is required.`,
    		`1 Pain per day without sufficient sleep.`,
    		`Go unconscious for 8 hours after days = [Constitution] without sleep.`,
    		`Penalties go away after 8 hours of sleep.`,
    	]
    });

    const Hypothermia = new Rule({
    	name: `Hypothermia`,
    	desc: [
    		`Body temperature must be maintained to avoid Hypothermia.`,
    		`1 Pain per hour of Hypothermia.`,
    		`Reduce penalty by 1 per hour of warmth.`,
    		`Hypothermia for hours = [Constitution] is lethal.`,
    	]
    });

    const Starvation = new Rule({
    	name: `Starvation`,
    	desc: [
    		`1 Food per day is normally optimal.`,
    		`1 Pain per day for the first 3 days without Food.`,
    		`After that, the Pain reduces to 1 until you eat.`,
    		`The Pain goes away when you eat Food.`,
    		`Going without Food for a number of months = [Constitution] is lethal.`,
    	]
    });

    var NeedsList = {
    	name: `Needs`,
    	text: [
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
    	name: `Bleeding`,
    	desc: [
    		`You begin Bleeding whenever you take Damage that isn't Blunt.`,
    		`Bleeding Damage is dealt to the Torso, regardless of which Body Part took the initial Damage.`,
    		`If your Torso has positive Health, the rate of Bleeding is 1 Damage per minute.`,
    		`If any Body Part drops to 0 or negative Health, the rate of Bleeding is 1 Damage per round.`,
    		`A Bleeding person with positive Torso Health can roll Constitution vs total Damage once per minute to stop Bleeding on their own, otherwise the Medicine Skill is required.`,
    	],
    	type: `Status`
    });

    const Concealed = new Rule({
    	name: `Concealed`,
    	desc: [
    		`If an opponent cannot see you, they are considered to be Blind to you.`,
    		`Any Attack they make targeting you is at a -6 penalty.`,
    		`Blasts are unaffected by this penalty, though Blast Damage may be negated or reduced if the Concealment is due to Cover.`,
    		`Targets are Defenseless against Attacks from Concealed opponents.`,
    	],
    	type: `Status`
    });

    const Cover = new Rule({
    	name: `Cover`, 
    	desc: [
    		`All Damage is negated against targets that are behind Cover unless the weapon's base Damage exceeds the Material Absorption.`,
    		`If the weapon's base Damage is greater than the Material's Absorption, then the Material Absorption acts as Damage Reduction.`,
    		`All standard types of Cover except Glass make you Concealed while behind Cover.`,
    		`You can lean in and out of Cover to Attack as part of an Action.`,
    		`Doing so opens you up to a Called Shot against an exposed Body Part if an opponent is waiting for you to lean out of Cover.`,
    	],
    	type: `Status`
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
    	headers: [`Material`, `Absorption`],
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

    const Deaf = new Rule({
    	name: `Deaf`,
    	desc: [
    		`You automatically Fail any roll that involves hearing.`
    	],
    	type: `Status`
    });

    const Defenseless = new Rule({
    	name: `Defenseless`,
    	desc: [
    		`You must use a Reflexive Defense.`,
    		`Use your Block score against Melee Attacks and you Dodge score against Ranged Attacks.`,
    	],
    	type: `Status`
    });

    const Grabbed = new Rule({
    	name: `Grabbed`,
    	desc: [
    		`A Grabbed opponent is considered to be Immobilized.`,
    	],
    	type: `Status`
    });

    const Harmless = new Rule({
    	name: `Harmless`,
    	desc: [
    		`You cannot Attack.`,
    	],
    	type: `Status`
    });

    const Immobilized = new Rule({
    	name: `Immobilized`,
    	desc: [
    		`Your Speed is temporarily considered to be 0.`
    	],
    	type: `Status`
    });

    const OffHand = new Rule({
    	name: `Off-Hand`,
    	desc: [
    		`-3 penalty to Attack with your Off-Hand.`,
    	],
    	type: `Status`
    });

    const Pinned = new Rule({
    	name: `Pinned`,
    	desc: [
    		`Pinned is the third and final step of Grappling.`,
    		`While Pinned, you are considered to be Defenseless, Harmless, Immobilized, and Prone.`,
    		`The Attacker is also considered to be Immobilized and Prone.`,
    	],
    	type: `Status`
    });

    const Prone = new Rule({
    	name: `Prone`,
    	desc: [
    		`You may drop Prone at any time for free on your turn or as part of a Dodge action.`,
    		`The benefits are that you get a +3 bonus to Ranged and Stealth, and enemies beyond 10yrds take a -3 Ranged Attack penalty to hit you.`,
    		`The drawbacks are that your Speed is 1yrd and you take a -3 penalty to Dodge.`,
    		`Standing up takes 1 Action.`,
    	],
    	type: `Status`
    });

    const Range = new Rule({
    	name: `Range`, 
    	desc: [
    		`Ranged Attacks made at Point-Blank Range (3yrds or less) get a +3 bonus.`,
    		`Ranged Attacks made beyond the weapon's ideal range take a -1 penalty per additional Range increment.`,
    		`A weapon's maximum effective Range is 10 Range increments.`,
    		`Melee Attacks take a modifier against Melee weapons that have a different Range = [your weapon’s Range - enemy weapon’s Range].`,
    	],
    	type: `Status`
    });

    const Restrained = new Rule({
    	name: `Restrained`,
    	desc: [
    		`Restrained is the second step of Grappling.`,
    		`While Restrained, you are considered to be Harmless and Immobilized.`,
    	],
    	type: `Status`
    });

    const Unarmed = new Rule({
    	name: `Unarmed`,
    	desc: [
    		`Successful Unarmed Attacks do Damage = [(Attack - Defense) / 2] (always round down).`,
    		`Absorption is not depleted.`,
    	],
    	type: `Status`
    });

    const Unconscious = new Rule({
    	name: `Unconscious`,
    	desc: [
    		`Unaware and unable to do anything.`,
    		`You are considered to be Blind, Harmless, Immobilized, Prone, and have a Reflexive Defense of 0.`,
    	],
    	type: `Status`
    });

    const Unstable = new Rule({
    	name: `Unstable`,
    	desc: [
    		`-3 penalty to Agility or Constitution Skill rolls.`,
    		`Ranged Attacks targeting you take a -3 penalty.`,
    	],
    	type: `Status`
    });

    const Visibility = new Rule({
    	name: `Visibility`, 
    	desc: [
    		`-1 to -6 to all rolls involving seeing, including Attack and Defense.`,
    		`A Visibility penalty of -6 imposes the effect of being temporarily Blind.`,
    	],
    	type: `Status`
    });

    var StatusList = {
    	name: `Status`,
    	list: [
    		Bleeding,
    		Blind,
    		Concealed,
    		Cover,
    		Deaf,
    		Defenseless,
    		Grabbed,
    		Harmless,
    		Immobilized,
    		OffHand,
    		Pinned,
    		Prone,
    		Range,
    		Restrained,
    		Stun,
    		Unarmed,
    		Unconscious,
    		Unstable,
    		Visibility,
    	]
    };

    var ManualList = {
    	name: `Manual`,
    	list: [
    		AbilitiesList,
    		CombatList,
    		CoreList,
    		GearList,
    		HazardsList,
    		ManeuversList,
    		NeedsList,
    		PropertiesList,
    		SkillsList,
    		StatusList,
    		TraitsList,
    	]
    };

    var RandomCharacter = (c) => {
        c = RandomDescription(c);
        c = RandomTraits(c);
        c = RandomSkills(c);
        c = c.setProperties();
        c = RandomAbilities(c);
        c = RandomStartingGear(c, c.properties.luck.score);
    	c.meta.step = CreationStepsList.length - 1;
        return c
    };

    /* src/routes/new.svelte generated by Svelte v3.35.0 */

    const { console: console_1 } = globals;
    const file$9 = "src/routes/new.svelte";

    function create_fragment$9(ctx) {
    	let t0;
    	let div;
    	let a0;
    	let t2;
    	let a1;
    	let t4;
    	let backbutton;
    	let current;
    	let mounted;
    	let dispose;

    	backbutton = new BackButton({
    			props: { path: "character" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			t0 = space();
    			div = element("div");
    			a0 = element("a");
    			a0.textContent = "Build";
    			t2 = space();
    			a1 = element("a");
    			a1.textContent = "Random";
    			t4 = space();
    			create_component(backbutton.$$.fragment);
    			document.title = "Apocalyptia Online - New Character";
    			attr_dev(a0, "href", "/creator");
    			attr_dev(a0, "class", "link-btn");
    			add_location(a0, file$9, 24, 4, 708);
    			attr_dev(a1, "href", "/creator");
    			attr_dev(a1, "class", "link-btn");
    			add_location(a1, file$9, 25, 4, 782);
    			attr_dev(div, "class", "cntr-card");
    			add_location(div, file$9, 23, 0, 680);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, a0);
    			append_dev(div, t2);
    			append_dev(div, a1);
    			insert_dev(target, t4, anchor);
    			mount_component(backbutton, target, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(a0, "click", /*newCharacter*/ ctx[0], false, false, false),
    					listen_dev(a1, "click", /*randomCharacter*/ ctx[1], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(backbutton.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(backbutton.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t4);
    			destroy_component(backbutton, detaching);
    			mounted = false;
    			run_all(dispose);
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
    	let $characterStore;
    	let $playerStore;
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(2, $characterStore = $$value));
    	validate_store(playerStore, "playerStore");
    	component_subscribe($$self, playerStore, $$value => $$invalidate(3, $playerStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("New", slots, []);

    	const newCharacter = _ => {
    		set_store_value(characterStore, $characterStore = new Character$1(), $characterStore);
    	};

    	const randomCharacter = _ => {
    		set_store_value(characterStore, $characterStore = RandomCharacter(new Character$1()), $characterStore);
    		console.log("new character!");
    		console.log($characterStore.meta.step);
    		set_store_value(playerStore, $playerStore = $playerStore.newCharacter($characterStore), $playerStore);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<New> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		BackButton,
    		Character: Character$1,
    		RandomCharacter,
    		characterStore,
    		playerStore,
    		newCharacter,
    		randomCharacter,
    		$characterStore,
    		$playerStore
    	});

    	return [newCharacter, randomCharacter];
    }

    class New extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "New",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    var d6Roll = () => {
    	const rolls = [d6()];
    	if (rolls[0] == 1 && d6() == 1) rolls.push(1); // Botch
    	else if (rolls[0] == 6) { // Explode
    		while (rolls[rolls.length - 1] == 6) rolls.push(d6());
    	}
    	return rolls
    };

    /* src/components/roller/DiceRoller.svelte generated by Svelte v3.35.0 */
    const file$8 = "src/components/roller/DiceRoller.svelte";

    function create_fragment$8(ctx) {
    	let div3;
    	let div1;
    	let div0;
    	let t1;
    	let dicebutton;
    	let t2;
    	let div2;
    	let p0;
    	let t3;
    	let t4;
    	let t5;
    	let p1;
    	let t6;
    	let input;
    	let t7;
    	let p2;
    	let t8;
    	let span;
    	let t9;
    	let current;
    	let mounted;
    	let dispose;

    	dicebutton = new DiceButton({
    			props: {
    				func: /*rollResult*/ ctx[3],
    				face: /*roll*/ ctx[0][/*roll*/ ctx[0].length - 1]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "d6 Roll";
    			t1 = space();
    			create_component(dicebutton.$$.fragment);
    			t2 = space();
    			div2 = element("div");
    			p0 = element("p");
    			t3 = text("Dice Roll: ");
    			t4 = text(/*roll*/ ctx[0]);
    			t5 = space();
    			p1 = element("p");
    			t6 = text("Modifier: ");
    			input = element("input");
    			t7 = space();
    			p2 = element("p");
    			t8 = text("Result: ");
    			span = element("span");
    			t9 = text(/*total*/ ctx[2]);
    			attr_dev(div0, "class", "category-name svelte-1xhqjnc");
    			add_location(div0, file$8, 21, 2, 604);
    			attr_dev(div1, "class", "category-header svelte-1xhqjnc");
    			add_location(div1, file$8, 20, 1, 572);
    			attr_dev(p0, "class", "roll");
    			add_location(p0, file$8, 25, 2, 747);
    			attr_dev(input, "type", "number");
    			attr_dev(input, "class", "mod svelte-1xhqjnc");
    			add_location(input, file$8, 26, 15, 800);
    			add_location(p1, file$8, 26, 2, 787);
    			attr_dev(span, "class", "total");
    			add_location(span, file$8, 27, 28, 885);
    			attr_dev(p2, "class", "result svelte-1xhqjnc");
    			add_location(p2, file$8, 27, 2, 859);
    			attr_dev(div2, "class", "item-content svelte-1xhqjnc");
    			add_location(div2, file$8, 24, 1, 718);
    			attr_dev(div3, "class", "item-category svelte-1xhqjnc");
    			add_location(div3, file$8, 19, 0, 543);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div1);
    			append_dev(div1, div0);
    			append_dev(div1, t1);
    			mount_component(dicebutton, div1, null);
    			append_dev(div3, t2);
    			append_dev(div3, div2);
    			append_dev(div2, p0);
    			append_dev(p0, t3);
    			append_dev(p0, t4);
    			append_dev(div2, t5);
    			append_dev(div2, p1);
    			append_dev(p1, t6);
    			append_dev(p1, input);
    			set_input_value(input, /*mod*/ ctx[1]);
    			append_dev(div2, t7);
    			append_dev(div2, p2);
    			append_dev(p2, t8);
    			append_dev(p2, span);
    			append_dev(span, t9);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler*/ ctx[4]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const dicebutton_changes = {};
    			if (dirty & /*roll*/ 1) dicebutton_changes.face = /*roll*/ ctx[0][/*roll*/ ctx[0].length - 1];
    			dicebutton.$set(dicebutton_changes);
    			if (!current || dirty & /*roll*/ 1) set_data_dev(t4, /*roll*/ ctx[0]);

    			if (dirty & /*mod*/ 2 && to_number(input.value) !== /*mod*/ ctx[1]) {
    				set_input_value(input, /*mod*/ ctx[1]);
    			}

    			if (!current || dirty & /*total*/ 4) set_data_dev(t9, /*total*/ ctx[2]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(dicebutton.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(dicebutton.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			destroy_component(dicebutton);
    			mounted = false;
    			dispose();
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("DiceRoller", slots, []);
    	let roll = [6], mod = 0, total = 0;

    	const rollResult = _ => {
    		let rollCount = Math.ceil(Math.random() * 12) + 12;

    		const setIntervalId = setInterval(
    			_ => {
    				$$invalidate(0, roll = d6Roll());
    				if (roll[0] == 1 && roll[1] == 1) $$invalidate(2, total = "Botched!"); else $$invalidate(2, total = roll.reduce((acc, num) => acc + num, 0) + mod);
    				if (roll[0] == 6) $$invalidate(2, total = `Exploded! ${total}`);
    				if (rollCount-- == 0) clearInterval(setIntervalId);
    			},
    			50
    		);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<DiceRoller> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		mod = to_number(this.value);
    		$$invalidate(1, mod);
    	}

    	$$self.$capture_state = () => ({
    		d6Roll,
    		DiceButton,
    		roll,
    		mod,
    		total,
    		rollResult
    	});

    	$$self.$inject_state = $$props => {
    		if ("roll" in $$props) $$invalidate(0, roll = $$props.roll);
    		if ("mod" in $$props) $$invalidate(1, mod = $$props.mod);
    		if ("total" in $$props) $$invalidate(2, total = $$props.total);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [roll, mod, total, rollResult, input_input_handler];
    }

    class DiceRoller extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DiceRoller",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/components/roller/ItemGenerator.svelte generated by Svelte v3.35.0 */
    const file$7 = "src/components/roller/ItemGenerator.svelte";

    // (19:1) {#if item}
    function create_if_block$1(ctx) {
    	let div;
    	let gearblock;
    	let current;

    	gearblock = new GearBlock({
    			props: { item: /*item*/ ctx[1], mode: "roller" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(gearblock.$$.fragment);
    			attr_dev(div, "class", "item-content svelte-nbpybi");
    			add_location(div, file$7, 19, 2, 483);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(gearblock, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const gearblock_changes = {};
    			if (dirty & /*item*/ 2) gearblock_changes.item = /*item*/ ctx[1];
    			gearblock.$set(gearblock_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(gearblock.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(gearblock.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(gearblock);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(19:1) {#if item}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let div2;
    	let div1;
    	let div0;
    	let t0_value = /*category*/ ctx[0].name + "";
    	let t0;
    	let t1;
    	let dicebutton;
    	let t2;
    	let current;

    	dicebutton = new DiceButton({
    			props: {
    				func: /*randomItem*/ ctx[2],
    				type: /*category*/ ctx[0].name
    			},
    			$$inline: true
    		});

    	let if_block = /*item*/ ctx[1] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			create_component(dicebutton.$$.fragment);
    			t2 = space();
    			if (if_block) if_block.c();
    			attr_dev(div0, "class", "category-name svelte-nbpybi");
    			add_location(div0, file$7, 15, 2, 356);
    			attr_dev(div1, "class", "category-header svelte-nbpybi");
    			add_location(div1, file$7, 14, 1, 324);
    			attr_dev(div2, "class", "item-category svelte-nbpybi");
    			add_location(div2, file$7, 13, 0, 295);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, t0);
    			append_dev(div1, t1);
    			mount_component(dicebutton, div1, null);
    			append_dev(div2, t2);
    			if (if_block) if_block.m(div2, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*category*/ 1) && t0_value !== (t0_value = /*category*/ ctx[0].name + "")) set_data_dev(t0, t0_value);
    			const dicebutton_changes = {};
    			if (dirty & /*category*/ 1) dicebutton_changes.type = /*category*/ ctx[0].name;
    			dicebutton.$set(dicebutton_changes);

    			if (/*item*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*item*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div2, null);
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
    			transition_in(dicebutton.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(dicebutton.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_component(dicebutton);
    			if (if_block) if_block.d();
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ItemGenerator", slots, []);
    	let { category } = $$props;
    	let item = "";
    	const randomItem = _ => $$invalidate(1, item = RandomRoll(category.list));
    	const writable_props = ["category"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ItemGenerator> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("category" in $$props) $$invalidate(0, category = $$props.category);
    	};

    	$$self.$capture_state = () => ({
    		DiceButton,
    		GearBlock,
    		RandomRoll,
    		category,
    		item,
    		randomItem
    	});

    	$$self.$inject_state = $$props => {
    		if ("category" in $$props) $$invalidate(0, category = $$props.category);
    		if ("item" in $$props) $$invalidate(1, item = $$props.item);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [category, item, randomItem];
    }

    class ItemGenerator extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { category: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ItemGenerator",
    			options,
    			id: create_fragment$7.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*category*/ ctx[0] === undefined && !("category" in props)) {
    			console.warn("<ItemGenerator> was created without expected prop 'category'");
    		}
    	}

    	get category() {
    		throw new Error("<ItemGenerator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set category(value) {
    		throw new Error("<ItemGenerator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var MasterGearList = [
    	{
    		name: `Master Gear List`,
    		value: undefined,
    		list: [
    			...AccessoriesList.list,
    			...AmmoList.list,
    			...ArmorList.list,
    			...BombsList.list,
    			...DocumentsList.list,
    			...DrugsList.list,
    			...ElectronicsList.list,
    			...EquipmentList.list,
    			...MedicalList.list,
    			...MeleeWeaponsList.list,
    			...MiscellaneousList.list,
    			...RangedWeaponsList.list,
    			...StorageList.list,
    			...ToolsList.list,
    			...WearablesList.list,
    		]
    	},
    	{
    		name: `Accessory`,
    		value: undefined,
    		list: AccessoriesList.list
    	},
    	{
    		name: `Ammo`,
    		value: undefined,
    		list: AmmoList.list
    	},
    	{
    		name: `Armor`,
    		value: undefined,
    		list: ArmorList.list
    	},
    	{
    		name: `Bomb`,
    		value: undefined,
    		list: BombsList.list
    	},
    	{
    		name: `Document`,
    		value: undefined,
    		list: DocumentsList.list
    	},
    	{
    		name: `Drug`,
    		value: undefined,
    		list: DrugsList.list
    	},
    	{
    		name: `Electronics`,
    		value: undefined,
    		list: ElectronicsList.list
    	},
    	{
    		name: `Equipment`,
    		value: undefined,
    		list: EquipmentList.list
    	},
    	{
    		name: `Medical`,
    		value: undefined,
    		list: MedicalList.list
    	},
    	{
    		name: `Melee`,
    		value: undefined,
    		list: MeleeWeaponsList.list
    	},
    	{
    		name: `Miscellaneous`,
    		value: undefined,
    		list: MiscellaneousList.list
    	},
    	{
    		name: `Ranged`,
    		value: undefined,
    		list: RangedWeaponsList.list
    	},
    	{
    		name: `Storage`,
    		value: undefined,
    		list: StorageList.list
    	},
    	{
    		name: `Tools`,
    		value: undefined,
    		list: ToolsList.list
    	},
    	{
    		name: `Wearables`,
    		value: undefined,
    		list: WearablesList.list
    	}
    ];

    /* src/routes/roller.svelte generated by Svelte v3.35.0 */
    const file$6 = "src/routes/roller.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[0] = list[i];
    	return child_ctx;
    }

    // (15:1) {#each MasterGearList as category}
    function create_each_block$1(ctx) {
    	let itemgenerator;
    	let current;

    	itemgenerator = new ItemGenerator({
    			props: { category: /*category*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(itemgenerator.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(itemgenerator, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(itemgenerator.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(itemgenerator.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(itemgenerator, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(15:1) {#each MasterGearList as category}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let t0;
    	let div;
    	let h1;
    	let t2;
    	let diceroller;
    	let t3;
    	let t4;
    	let backbutton;
    	let current;
    	diceroller = new DiceRoller({ $$inline: true });
    	let each_value = MasterGearList;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	backbutton = new BackButton({ props: { path: "/" }, $$inline: true });

    	const block = {
    		c: function create() {
    			t0 = space();
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "Roller";
    			t2 = space();
    			create_component(diceroller.$$.fragment);
    			t3 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t4 = space();
    			create_component(backbutton.$$.fragment);
    			document.title = "Apocalyptia Online - Roller";
    			attr_dev(h1, "class", "svelte-t9peez");
    			add_location(h1, file$6, 12, 1, 389);
    			attr_dev(div, "class", "roller-body page-body");
    			add_location(div, file$6, 11, 0, 352);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t2);
    			mount_component(diceroller, div, null);
    			append_dev(div, t3);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			insert_dev(target, t4, anchor);
    			mount_component(backbutton, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*MasterGearList*/ 0) {
    				each_value = MasterGearList;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
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
    			transition_in(diceroller.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(backbutton.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(diceroller.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(backbutton.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div);
    			destroy_component(diceroller);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(backbutton, detaching);
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

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Roller", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Roller> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		BackButton,
    		DiceRoller,
    		ItemGenerator,
    		MasterGearList
    	});

    	return [];
    }

    class Roller extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Roller",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/routes/sheet.svelte generated by Svelte v3.35.0 */
    const file$5 = "src/routes/sheet.svelte";

    function create_fragment$5(ctx) {
    	let t0;
    	let div;
    	let charactersheet;
    	let t1;
    	let saveanddeletebuttonrow;
    	let t2;
    	let backbutton;
    	let current;
    	charactersheet = new CharacterSheet({ props: { mode: "edit" }, $$inline: true });

    	saveanddeletebuttonrow = new SaveAndDeleteButtonRow({
    			props: {
    				saveFunc: SaveCharacter,
    				deleteFunc: /*func*/ ctx[1]
    			},
    			$$inline: true
    		});

    	backbutton = new BackButton({
    			props: { path: "character" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			t0 = space();
    			div = element("div");
    			create_component(charactersheet.$$.fragment);
    			t1 = space();
    			create_component(saveanddeletebuttonrow.$$.fragment);
    			t2 = space();
    			create_component(backbutton.$$.fragment);
    			document.title = "Apocalyptia Online - Character Sheet";
    			attr_dev(div, "class", "sheet page-body");
    			add_location(div, file$5, 16, 0, 593);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);
    			mount_component(charactersheet, div, null);
    			append_dev(div, t1);
    			mount_component(saveanddeletebuttonrow, div, null);
    			insert_dev(target, t2, anchor);
    			mount_component(backbutton, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const saveanddeletebuttonrow_changes = {};
    			if (dirty & /*$characterStore*/ 1) saveanddeletebuttonrow_changes.deleteFunc = /*func*/ ctx[1];
    			saveanddeletebuttonrow.$set(saveanddeletebuttonrow_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(charactersheet.$$.fragment, local);
    			transition_in(saveanddeletebuttonrow.$$.fragment, local);
    			transition_in(backbutton.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(charactersheet.$$.fragment, local);
    			transition_out(saveanddeletebuttonrow.$$.fragment, local);
    			transition_out(backbutton.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div);
    			destroy_component(charactersheet);
    			destroy_component(saveanddeletebuttonrow);
    			if (detaching) detach_dev(t2);
    			destroy_component(backbutton, detaching);
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
    	let $characterStore;
    	validate_store(characterStore, "characterStore");
    	component_subscribe($$self, characterStore, $$value => $$invalidate(0, $characterStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Sheet", slots, []);
    	onDestroy(_ => SaveCharacter());
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Sheet> was created with unknown prop '${key}'`);
    	});

    	const func = _ => DeleteCharacter($characterStore.id);

    	$$self.$capture_state = () => ({
    		BackButton,
    		CharacterSheet,
    		DeleteCharacter,
    		SaveAndDeleteButtonRow,
    		SaveCharacter,
    		characterStore,
    		onDestroy,
    		$characterStore
    	});

    	return [$characterStore, func];
    }

    class Sheet extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Sheet",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    var Pages = [
    	{ name: 'Home',				path: '/',							component: Home },
    	{ name: 'Character',		path: '/character',					component: Character },
    	{ name: 'Creator',			path: '/creator',					component: Creator },
    	{ name: 'Load',				path: '/load',						component: Load },
    	{ name: 'New',				path: '/new',						component: New },
    	{ name: 'Sheet',			path: '/sheet',						component: Sheet },
    	{ name: 'Join',				path: '/join',						component: Join },
    	{ name: 'Login',			path: '/login',						component: Login_1 },
    	{ name: 'Manual',			path: '/manual',					component: Manual,			list: [...ManualList.list] },
    		{ name: 'Abilities',		path: '/manual/abilities',			component: Manual,			list: [...AbilitiesList.list] },
    		{ name: 'Combat',			path: '/manual/combat',				component: Manual,			list: [...CombatList.list] },
    		{ name: 'Core',				path: '/manual/core',				component: Manual,			list: [...CoreList.list] },
    		{ name: 'Gear',				path: '/manual/gear',				component: Manual,			list: [...GearList.list] },
    			{ name: 'Accessories',		path: '/manual/gear/accessories',	component: Manual,			list: [...AccessoriesList.list] },
    			{ name: 'Ammo',				path: '/manual/gear/ammo',			component: Manual,			list: [...AmmoList.list] },
    			{ name: 'Armor',			path: '/manual/gear/armor',			component: Manual,			list: [...ArmorList.list] },
    			{ name: 'Attributes',		path: '/manual/gear/attributes',	component: Manual,			list: [...AttributesList.list] },
    			{ name: 'Bombs',			path: '/manual/gear/bombs',			component: Manual,			list: [...BombsList.list] },
    			{ name: 'Documents',		path: '/manual/gear/documents',		component: Manual,			list: [...DocumentsList.list] },
    			{ name: 'Drugs',			path: '/manual/gear/drugs',			component: Manual,			list: [...DrugsList.list] },
    			{ name: 'Electronics',		path: '/manual/gear/electronics',	component: Manual,			list: [...ElectronicsList.list] },
    			{ name: 'Equipment',		path: '/manual/gear/equipment',		component: Manual,			list: [...EquipmentList.list] },
    			{ name: 'Medical',			path: '/manual/gear/medical',		component: Manual,			list: [...MedicalList.list] },
    			{ name: 'Melee',			path: '/manual/gear/melee',			component: Manual,			list: [...MeleeWeaponsList.list] },
    			{ name: 'Miscellaneous',	path: '/manual/gear/miscellaneous',	component: Manual,			list: [...MiscellaneousList.list] },
    			{ name: 'Ranged',			path: '/manual/gear/ranged',		component: Manual,			list: [...RangedWeaponsList.list] },
    			{ name: 'Storage',			path: '/manual/gear/storage',		component: Manual,			list: [...StorageList.list] },
    			{ name: 'Tools',			path: '/manual/gear/tools',			component: Manual,			list: [...ToolsList.list] },
    			{ name: 'Wearables',		path: '/manual/gear/wearables',		component: Manual,			list: [...WearablesList.list] },
    		{ name: 'Hazards',			path: '/manual/hazards',			component: Manual,			list: [...HazardsList.list] },
    		{ name: 'Maneuvers',		path: '/manual/maneuvers',			component: Manual,			list: [...ManeuversList.list] },
    		{ name: 'Needs',			path: '/manual/needs',				component: Manual,			list: [...NeedsList.list] },
    		{ name: 'Properties',		path: '/manual/properties',			component: Manual,			list: [...PropertiesList.list] },
    		{ name: 'Skills',			path: '/manual/skills',				component: Manual,			list: [...SkillsList.list] },
    		{ name: 'Status',			path: '/manual/status',				component: Manual,			list: [...StatusList.list] },
    		{ name: 'Traits',			path: '/manual/traits',				component: Manual,			list: [...TraitsList.list] },
    	{ name: 'Roller',			path: '/roller',					component: Roller },
    ];

    /* src/components/buttons/MenuButton.svelte generated by Svelte v3.35.0 */
    const file$4 = "src/components/buttons/MenuButton.svelte";

    function create_fragment$4(ctx) {
    	let button;
    	let div;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			div = element("div");
    			div.textContent = "-";
    			attr_dev(div, "class", "menu-icon-box svelte-f6tmsb");
    			add_location(div, file$4, 8, 1, 160);
    			attr_dev(button, "class", "btn-box square-btn svelte-f6tmsb");
    			add_location(button, file$4, 5, 0, 69);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, div);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
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
    	let $menuStore;
    	validate_store(menuStore, "menuStore");
    	component_subscribe($$self, menuStore, $$value => $$invalidate(0, $menuStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("MenuButton", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<MenuButton> was created with unknown prop '${key}'`);
    	});

    	const click_handler = _ => set_store_value(menuStore, $menuStore = $menuStore.toggle(), $menuStore);
    	$$self.$capture_state = () => ({ menuStore, $menuStore });
    	return [$menuStore, click_handler];
    }

    class MenuButton extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MenuButton",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }

    /* src/components/widgets/ShadowBackground.svelte generated by Svelte v3.35.0 */
    const file$3 = "src/components/widgets/ShadowBackground.svelte";

    function create_fragment$3(ctx) {
    	let div;
    	let div_class_value;
    	let div_transition;
    	let current;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", div_class_value = "" + (null_to_empty(/*active*/ ctx[0] ? "shadow" : "invisible") + " svelte-jymghf"));
    			add_location(div, file$3, 9, 0, 136);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*toggleActive*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*active*/ 1 && div_class_value !== (div_class_value = "" + (null_to_empty(/*active*/ ctx[0] ? "shadow" : "invisible") + " svelte-jymghf"))) {
    				attr_dev(div, "class", div_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!div_transition) div_transition = create_bidirectional_transition(div, fade, {}, true);
    				div_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!div_transition) div_transition = create_bidirectional_transition(div, fade, {}, false);
    			div_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching && div_transition) div_transition.end();
    			mounted = false;
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

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ShadowBackground", slots, []);
    	let { active = false } = $$props;
    	const toggleActive = _ => $$invalidate(0, active = !active);
    	const writable_props = ["active"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ShadowBackground> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("active" in $$props) $$invalidate(0, active = $$props.active);
    	};

    	$$self.$capture_state = () => ({ fade, active, toggleActive });

    	$$self.$inject_state = $$props => {
    		if ("active" in $$props) $$invalidate(0, active = $$props.active);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [active, toggleActive];
    }

    class ShadowBackground extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { active: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ShadowBackground",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get active() {
    		throw new Error("<ShadowBackground>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set active(value) {
    		throw new Error("<ShadowBackground>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/widgets/UserMenu.svelte generated by Svelte v3.35.0 */
    const file$2 = "src/components/widgets/UserMenu.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (9:1) {#if $menuStore.open}
    function create_if_block(ctx) {
    	let nav;
    	let nav_transition;
    	let current;
    	let each_value = /*$menuStore*/ ctx[0].links;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			nav = element("nav");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(nav, "class", "user-menu svelte-176s2v8");
    			add_location(nav, file$2, 9, 2, 263);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(nav, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$menuStore*/ 1) {
    				each_value = /*$menuStore*/ ctx[0].links;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(nav, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!nav_transition) nav_transition = create_bidirectional_transition(nav, fade, {}, true);
    				nav_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!nav_transition) nav_transition = create_bidirectional_transition(nav, fade, {}, false);
    			nav_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			destroy_each(each_blocks, detaching);
    			if (detaching && nav_transition) nav_transition.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(9:1) {#if $menuStore.open}",
    		ctx
    	});

    	return block;
    }

    // (11:3) {#each $menuStore.links as link}
    function create_each_block(ctx) {
    	let a;
    	let t_value = /*link*/ ctx[2].name + "";
    	let t;
    	let a_href_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			t = text(t_value);
    			attr_dev(a, "href", a_href_value = /*link*/ ctx[2].url);
    			attr_dev(a, "class", "link-btn svelte-176s2v8");
    			add_location(a, file$2, 11, 4, 343);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$menuStore*/ 1 && t_value !== (t_value = /*link*/ ctx[2].name + "")) set_data_dev(t, t_value);

    			if (dirty & /*$menuStore*/ 1 && a_href_value !== (a_href_value = /*link*/ ctx[2].url)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(11:3) {#each $menuStore.links as link}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div;
    	let t;
    	let shadowbackground;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*$menuStore*/ ctx[0].open && create_if_block(ctx);

    	shadowbackground = new ShadowBackground({
    			props: { active: /*$menuStore*/ ctx[0].open },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			t = space();
    			create_component(shadowbackground.$$.fragment);
    			add_location(div, file$2, 7, 0, 183);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    			append_dev(div, t);
    			mount_component(shadowbackground, div, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*click_handler*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$menuStore*/ ctx[0].open) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$menuStore*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div, t);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			const shadowbackground_changes = {};
    			if (dirty & /*$menuStore*/ 1) shadowbackground_changes.active = /*$menuStore*/ ctx[0].open;
    			shadowbackground.$set(shadowbackground_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(shadowbackground.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(shadowbackground.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    			destroy_component(shadowbackground);
    			mounted = false;
    			dispose();
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
    	let $menuStore;
    	validate_store(menuStore, "menuStore");
    	component_subscribe($$self, menuStore, $$value => $$invalidate(0, $menuStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("UserMenu", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<UserMenu> was created with unknown prop '${key}'`);
    	});

    	const click_handler = _ => set_store_value(menuStore, $menuStore = $menuStore.toggle(), $menuStore);

    	$$self.$capture_state = () => ({
    		fade,
    		menuStore,
    		ShadowBackground,
    		$menuStore
    	});

    	return [$menuStore, click_handler];
    }

    class UserMenu extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "UserMenu",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/components/widgets/TitleBar.svelte generated by Svelte v3.35.0 */
    const file$1 = "src/components/widgets/TitleBar.svelte";

    function create_fragment$1(ctx) {
    	let header;
    	let a;
    	let h1;
    	let t1;
    	let menubutton;
    	let t2;
    	let usermenu;
    	let current;
    	menubutton = new MenuButton({ $$inline: true });
    	usermenu = new UserMenu({ $$inline: true });

    	const block = {
    		c: function create() {
    			header = element("header");
    			a = element("a");
    			h1 = element("h1");
    			h1.textContent = "Apocalyptia Online";
    			t1 = space();
    			create_component(menubutton.$$.fragment);
    			t2 = space();
    			create_component(usermenu.$$.fragment);
    			add_location(h1, file$1, 8, 2, 185);
    			attr_dev(a, "href", "/");
    			attr_dev(a, "class", "link-btn svelte-12wxos8");
    			add_location(a, file$1, 7, 1, 153);
    			attr_dev(header, "class", "svelte-12wxos8");
    			add_location(header, file$1, 6, 0, 143);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, a);
    			append_dev(a, h1);
    			append_dev(header, t1);
    			mount_component(menubutton, header, null);
    			append_dev(header, t2);
    			mount_component(usermenu, header, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(menubutton.$$.fragment, local);
    			transition_in(usermenu.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(menubutton.$$.fragment, local);
    			transition_out(usermenu.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			destroy_component(menubutton);
    			destroy_component(usermenu);
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("TitleBar", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<TitleBar> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ MenuButton, UserMenu });
    	return [];
    }

    class TitleBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TitleBar",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

    var page = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
    	module.exports = factory() ;
    }(commonjsGlobal, (function () {
    var isarray = Array.isArray || function (arr) {
      return Object.prototype.toString.call(arr) == '[object Array]';
    };

    /**
     * Expose `pathToRegexp`.
     */
    var pathToRegexp_1 = pathToRegexp;
    var parse_1 = parse;
    var compile_1 = compile;
    var tokensToFunction_1 = tokensToFunction;
    var tokensToRegExp_1 = tokensToRegExp;

    /**
     * The main path matching regexp utility.
     *
     * @type {RegExp}
     */
    var PATH_REGEXP = new RegExp([
      // Match escaped characters that would otherwise appear in future matches.
      // This allows the user to escape special characters that won't transform.
      '(\\\\.)',
      // Match Express-style parameters and un-named parameters with a prefix
      // and optional suffixes. Matches appear as:
      //
      // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
      // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
      // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
      '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
    ].join('|'), 'g');

    /**
     * Parse a string for the raw tokens.
     *
     * @param  {String} str
     * @return {Array}
     */
    function parse (str) {
      var tokens = [];
      var key = 0;
      var index = 0;
      var path = '';
      var res;

      while ((res = PATH_REGEXP.exec(str)) != null) {
        var m = res[0];
        var escaped = res[1];
        var offset = res.index;
        path += str.slice(index, offset);
        index = offset + m.length;

        // Ignore already escaped sequences.
        if (escaped) {
          path += escaped[1];
          continue
        }

        // Push the current path onto the tokens.
        if (path) {
          tokens.push(path);
          path = '';
        }

        var prefix = res[2];
        var name = res[3];
        var capture = res[4];
        var group = res[5];
        var suffix = res[6];
        var asterisk = res[7];

        var repeat = suffix === '+' || suffix === '*';
        var optional = suffix === '?' || suffix === '*';
        var delimiter = prefix || '/';
        var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?');

        tokens.push({
          name: name || key++,
          prefix: prefix || '',
          delimiter: delimiter,
          optional: optional,
          repeat: repeat,
          pattern: escapeGroup(pattern)
        });
      }

      // Match any characters still remaining.
      if (index < str.length) {
        path += str.substr(index);
      }

      // If the path exists, push it onto the end.
      if (path) {
        tokens.push(path);
      }

      return tokens
    }

    /**
     * Compile a string to a template function for the path.
     *
     * @param  {String}   str
     * @return {Function}
     */
    function compile (str) {
      return tokensToFunction(parse(str))
    }

    /**
     * Expose a method for transforming tokens into the path function.
     */
    function tokensToFunction (tokens) {
      // Compile all the tokens into regexps.
      var matches = new Array(tokens.length);

      // Compile all the patterns before compilation.
      for (var i = 0; i < tokens.length; i++) {
        if (typeof tokens[i] === 'object') {
          matches[i] = new RegExp('^' + tokens[i].pattern + '$');
        }
      }

      return function (obj) {
        var path = '';
        var data = obj || {};

        for (var i = 0; i < tokens.length; i++) {
          var token = tokens[i];

          if (typeof token === 'string') {
            path += token;

            continue
          }

          var value = data[token.name];
          var segment;

          if (value == null) {
            if (token.optional) {
              continue
            } else {
              throw new TypeError('Expected "' + token.name + '" to be defined')
            }
          }

          if (isarray(value)) {
            if (!token.repeat) {
              throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"')
            }

            if (value.length === 0) {
              if (token.optional) {
                continue
              } else {
                throw new TypeError('Expected "' + token.name + '" to not be empty')
              }
            }

            for (var j = 0; j < value.length; j++) {
              segment = encodeURIComponent(value[j]);

              if (!matches[i].test(segment)) {
                throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
              }

              path += (j === 0 ? token.prefix : token.delimiter) + segment;
            }

            continue
          }

          segment = encodeURIComponent(value);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
          }

          path += token.prefix + segment;
        }

        return path
      }
    }

    /**
     * Escape a regular expression string.
     *
     * @param  {String} str
     * @return {String}
     */
    function escapeString (str) {
      return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
    }

    /**
     * Escape the capturing group by escaping special characters and meaning.
     *
     * @param  {String} group
     * @return {String}
     */
    function escapeGroup (group) {
      return group.replace(/([=!:$\/()])/g, '\\$1')
    }

    /**
     * Attach the keys as a property of the regexp.
     *
     * @param  {RegExp} re
     * @param  {Array}  keys
     * @return {RegExp}
     */
    function attachKeys (re, keys) {
      re.keys = keys;
      return re
    }

    /**
     * Get the flags for a regexp from the options.
     *
     * @param  {Object} options
     * @return {String}
     */
    function flags (options) {
      return options.sensitive ? '' : 'i'
    }

    /**
     * Pull out keys from a regexp.
     *
     * @param  {RegExp} path
     * @param  {Array}  keys
     * @return {RegExp}
     */
    function regexpToRegexp (path, keys) {
      // Use a negative lookahead to match only capturing groups.
      var groups = path.source.match(/\((?!\?)/g);

      if (groups) {
        for (var i = 0; i < groups.length; i++) {
          keys.push({
            name: i,
            prefix: null,
            delimiter: null,
            optional: false,
            repeat: false,
            pattern: null
          });
        }
      }

      return attachKeys(path, keys)
    }

    /**
     * Transform an array into a regexp.
     *
     * @param  {Array}  path
     * @param  {Array}  keys
     * @param  {Object} options
     * @return {RegExp}
     */
    function arrayToRegexp (path, keys, options) {
      var parts = [];

      for (var i = 0; i < path.length; i++) {
        parts.push(pathToRegexp(path[i], keys, options).source);
      }

      var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

      return attachKeys(regexp, keys)
    }

    /**
     * Create a path regexp from string input.
     *
     * @param  {String} path
     * @param  {Array}  keys
     * @param  {Object} options
     * @return {RegExp}
     */
    function stringToRegexp (path, keys, options) {
      var tokens = parse(path);
      var re = tokensToRegExp(tokens, options);

      // Attach keys back to the regexp.
      for (var i = 0; i < tokens.length; i++) {
        if (typeof tokens[i] !== 'string') {
          keys.push(tokens[i]);
        }
      }

      return attachKeys(re, keys)
    }

    /**
     * Expose a function for taking tokens and returning a RegExp.
     *
     * @param  {Array}  tokens
     * @param  {Array}  keys
     * @param  {Object} options
     * @return {RegExp}
     */
    function tokensToRegExp (tokens, options) {
      options = options || {};

      var strict = options.strict;
      var end = options.end !== false;
      var route = '';
      var lastToken = tokens[tokens.length - 1];
      var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken);

      // Iterate over the tokens and create our regexp string.
      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];

        if (typeof token === 'string') {
          route += escapeString(token);
        } else {
          var prefix = escapeString(token.prefix);
          var capture = token.pattern;

          if (token.repeat) {
            capture += '(?:' + prefix + capture + ')*';
          }

          if (token.optional) {
            if (prefix) {
              capture = '(?:' + prefix + '(' + capture + '))?';
            } else {
              capture = '(' + capture + ')?';
            }
          } else {
            capture = prefix + '(' + capture + ')';
          }

          route += capture;
        }
      }

      // In non-strict mode we allow a slash at the end of match. If the path to
      // match already ends with a slash, we remove it for consistency. The slash
      // is valid at the end of a path match, not in the middle. This is important
      // in non-ending mode, where "/test/" shouldn't match "/test//route".
      if (!strict) {
        route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?';
      }

      if (end) {
        route += '$';
      } else {
        // In non-ending mode, we need the capturing groups to match as much as
        // possible by using a positive lookahead to the end or next path segment.
        route += strict && endsWithSlash ? '' : '(?=\\/|$)';
      }

      return new RegExp('^' + route, flags(options))
    }

    /**
     * Normalize the given path string, returning a regular expression.
     *
     * An empty array can be passed in for the keys, which will hold the
     * placeholder key descriptions. For example, using `/user/:id`, `keys` will
     * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
     *
     * @param  {(String|RegExp|Array)} path
     * @param  {Array}                 [keys]
     * @param  {Object}                [options]
     * @return {RegExp}
     */
    function pathToRegexp (path, keys, options) {
      keys = keys || [];

      if (!isarray(keys)) {
        options = keys;
        keys = [];
      } else if (!options) {
        options = {};
      }

      if (path instanceof RegExp) {
        return regexpToRegexp(path, keys)
      }

      if (isarray(path)) {
        return arrayToRegexp(path, keys, options)
      }

      return stringToRegexp(path, keys, options)
    }

    pathToRegexp_1.parse = parse_1;
    pathToRegexp_1.compile = compile_1;
    pathToRegexp_1.tokensToFunction = tokensToFunction_1;
    pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

    /**
       * Module dependencies.
       */

      

      /**
       * Short-cuts for global-object checks
       */

      var hasDocument = ('undefined' !== typeof document);
      var hasWindow = ('undefined' !== typeof window);
      var hasHistory = ('undefined' !== typeof history);
      var hasProcess = typeof process !== 'undefined';

      /**
       * Detect click event
       */
      var clickEvent = hasDocument && document.ontouchstart ? 'touchstart' : 'click';

      /**
       * To work properly with the URL
       * history.location generated polyfill in https://github.com/devote/HTML5-History-API
       */

      var isLocation = hasWindow && !!(window.history.location || window.location);

      /**
       * The page instance
       * @api private
       */
      function Page() {
        // public things
        this.callbacks = [];
        this.exits = [];
        this.current = '';
        this.len = 0;

        // private things
        this._decodeURLComponents = true;
        this._base = '';
        this._strict = false;
        this._running = false;
        this._hashbang = false;

        // bound functions
        this.clickHandler = this.clickHandler.bind(this);
        this._onpopstate = this._onpopstate.bind(this);
      }

      /**
       * Configure the instance of page. This can be called multiple times.
       *
       * @param {Object} options
       * @api public
       */

      Page.prototype.configure = function(options) {
        var opts = options || {};

        this._window = opts.window || (hasWindow && window);
        this._decodeURLComponents = opts.decodeURLComponents !== false;
        this._popstate = opts.popstate !== false && hasWindow;
        this._click = opts.click !== false && hasDocument;
        this._hashbang = !!opts.hashbang;

        var _window = this._window;
        if(this._popstate) {
          _window.addEventListener('popstate', this._onpopstate, false);
        } else if(hasWindow) {
          _window.removeEventListener('popstate', this._onpopstate, false);
        }

        if (this._click) {
          _window.document.addEventListener(clickEvent, this.clickHandler, false);
        } else if(hasDocument) {
          _window.document.removeEventListener(clickEvent, this.clickHandler, false);
        }

        if(this._hashbang && hasWindow && !hasHistory) {
          _window.addEventListener('hashchange', this._onpopstate, false);
        } else if(hasWindow) {
          _window.removeEventListener('hashchange', this._onpopstate, false);
        }
      };

      /**
       * Get or set basepath to `path`.
       *
       * @param {string} path
       * @api public
       */

      Page.prototype.base = function(path) {
        if (0 === arguments.length) return this._base;
        this._base = path;
      };

      /**
       * Gets the `base`, which depends on whether we are using History or
       * hashbang routing.

       * @api private
       */
      Page.prototype._getBase = function() {
        var base = this._base;
        if(!!base) return base;
        var loc = hasWindow && this._window && this._window.location;

        if(hasWindow && this._hashbang && loc && loc.protocol === 'file:') {
          base = loc.pathname;
        }

        return base;
      };

      /**
       * Get or set strict path matching to `enable`
       *
       * @param {boolean} enable
       * @api public
       */

      Page.prototype.strict = function(enable) {
        if (0 === arguments.length) return this._strict;
        this._strict = enable;
      };


      /**
       * Bind with the given `options`.
       *
       * Options:
       *
       *    - `click` bind to click events [true]
       *    - `popstate` bind to popstate [true]
       *    - `dispatch` perform initial dispatch [true]
       *
       * @param {Object} options
       * @api public
       */

      Page.prototype.start = function(options) {
        var opts = options || {};
        this.configure(opts);

        if (false === opts.dispatch) return;
        this._running = true;

        var url;
        if(isLocation) {
          var window = this._window;
          var loc = window.location;

          if(this._hashbang && ~loc.hash.indexOf('#!')) {
            url = loc.hash.substr(2) + loc.search;
          } else if (this._hashbang) {
            url = loc.search + loc.hash;
          } else {
            url = loc.pathname + loc.search + loc.hash;
          }
        }

        this.replace(url, null, true, opts.dispatch);
      };

      /**
       * Unbind click and popstate event handlers.
       *
       * @api public
       */

      Page.prototype.stop = function() {
        if (!this._running) return;
        this.current = '';
        this.len = 0;
        this._running = false;

        var window = this._window;
        this._click && window.document.removeEventListener(clickEvent, this.clickHandler, false);
        hasWindow && window.removeEventListener('popstate', this._onpopstate, false);
        hasWindow && window.removeEventListener('hashchange', this._onpopstate, false);
      };

      /**
       * Show `path` with optional `state` object.
       *
       * @param {string} path
       * @param {Object=} state
       * @param {boolean=} dispatch
       * @param {boolean=} push
       * @return {!Context}
       * @api public
       */

      Page.prototype.show = function(path, state, dispatch, push) {
        var ctx = new Context(path, state, this),
          prev = this.prevContext;
        this.prevContext = ctx;
        this.current = ctx.path;
        if (false !== dispatch) this.dispatch(ctx, prev);
        if (false !== ctx.handled && false !== push) ctx.pushState();
        return ctx;
      };

      /**
       * Goes back in the history
       * Back should always let the current route push state and then go back.
       *
       * @param {string} path - fallback path to go back if no more history exists, if undefined defaults to page.base
       * @param {Object=} state
       * @api public
       */

      Page.prototype.back = function(path, state) {
        var page = this;
        if (this.len > 0) {
          var window = this._window;
          // this may need more testing to see if all browsers
          // wait for the next tick to go back in history
          hasHistory && window.history.back();
          this.len--;
        } else if (path) {
          setTimeout(function() {
            page.show(path, state);
          });
        } else {
          setTimeout(function() {
            page.show(page._getBase(), state);
          });
        }
      };

      /**
       * Register route to redirect from one path to other
       * or just redirect to another route
       *
       * @param {string} from - if param 'to' is undefined redirects to 'from'
       * @param {string=} to
       * @api public
       */
      Page.prototype.redirect = function(from, to) {
        var inst = this;

        // Define route from a path to another
        if ('string' === typeof from && 'string' === typeof to) {
          page.call(this, from, function(e) {
            setTimeout(function() {
              inst.replace(/** @type {!string} */ (to));
            }, 0);
          });
        }

        // Wait for the push state and replace it with another
        if ('string' === typeof from && 'undefined' === typeof to) {
          setTimeout(function() {
            inst.replace(from);
          }, 0);
        }
      };

      /**
       * Replace `path` with optional `state` object.
       *
       * @param {string} path
       * @param {Object=} state
       * @param {boolean=} init
       * @param {boolean=} dispatch
       * @return {!Context}
       * @api public
       */


      Page.prototype.replace = function(path, state, init, dispatch) {
        var ctx = new Context(path, state, this),
          prev = this.prevContext;
        this.prevContext = ctx;
        this.current = ctx.path;
        ctx.init = init;
        ctx.save(); // save before dispatching, which may redirect
        if (false !== dispatch) this.dispatch(ctx, prev);
        return ctx;
      };

      /**
       * Dispatch the given `ctx`.
       *
       * @param {Context} ctx
       * @api private
       */

      Page.prototype.dispatch = function(ctx, prev) {
        var i = 0, j = 0, page = this;

        function nextExit() {
          var fn = page.exits[j++];
          if (!fn) return nextEnter();
          fn(prev, nextExit);
        }

        function nextEnter() {
          var fn = page.callbacks[i++];

          if (ctx.path !== page.current) {
            ctx.handled = false;
            return;
          }
          if (!fn) return unhandled.call(page, ctx);
          fn(ctx, nextEnter);
        }

        if (prev) {
          nextExit();
        } else {
          nextEnter();
        }
      };

      /**
       * Register an exit route on `path` with
       * callback `fn()`, which will be called
       * on the previous context when a new
       * page is visited.
       */
      Page.prototype.exit = function(path, fn) {
        if (typeof path === 'function') {
          return this.exit('*', path);
        }

        var route = new Route(path, null, this);
        for (var i = 1; i < arguments.length; ++i) {
          this.exits.push(route.middleware(arguments[i]));
        }
      };

      /**
       * Handle "click" events.
       */

      /* jshint +W054 */
      Page.prototype.clickHandler = function(e) {
        if (1 !== this._which(e)) return;

        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        if (e.defaultPrevented) return;

        // ensure link
        // use shadow dom when available if not, fall back to composedPath()
        // for browsers that only have shady
        var el = e.target;
        var eventPath = e.path || (e.composedPath ? e.composedPath() : null);

        if(eventPath) {
          for (var i = 0; i < eventPath.length; i++) {
            if (!eventPath[i].nodeName) continue;
            if (eventPath[i].nodeName.toUpperCase() !== 'A') continue;
            if (!eventPath[i].href) continue;

            el = eventPath[i];
            break;
          }
        }

        // continue ensure link
        // el.nodeName for svg links are 'a' instead of 'A'
        while (el && 'A' !== el.nodeName.toUpperCase()) el = el.parentNode;
        if (!el || 'A' !== el.nodeName.toUpperCase()) return;

        // check if link is inside an svg
        // in this case, both href and target are always inside an object
        var svg = (typeof el.href === 'object') && el.href.constructor.name === 'SVGAnimatedString';

        // Ignore if tag has
        // 1. "download" attribute
        // 2. rel="external" attribute
        if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return;

        // ensure non-hash for the same path
        var link = el.getAttribute('href');
        if(!this._hashbang && this._samePath(el) && (el.hash || '#' === link)) return;

        // Check for mailto: in the href
        if (link && link.indexOf('mailto:') > -1) return;

        // check target
        // svg target is an object and its desired value is in .baseVal property
        if (svg ? el.target.baseVal : el.target) return;

        // x-origin
        // note: svg links that are not relative don't call click events (and skip page.js)
        // consequently, all svg links tested inside page.js are relative and in the same origin
        if (!svg && !this.sameOrigin(el.href)) return;

        // rebuild path
        // There aren't .pathname and .search properties in svg links, so we use href
        // Also, svg href is an object and its desired value is in .baseVal property
        var path = svg ? el.href.baseVal : (el.pathname + el.search + (el.hash || ''));

        path = path[0] !== '/' ? '/' + path : path;

        // strip leading "/[drive letter]:" on NW.js on Windows
        if (hasProcess && path.match(/^\/[a-zA-Z]:\//)) {
          path = path.replace(/^\/[a-zA-Z]:\//, '/');
        }

        // same page
        var orig = path;
        var pageBase = this._getBase();

        if (path.indexOf(pageBase) === 0) {
          path = path.substr(pageBase.length);
        }

        if (this._hashbang) path = path.replace('#!', '');

        if (pageBase && orig === path && (!isLocation || this._window.location.protocol !== 'file:')) {
          return;
        }

        e.preventDefault();
        this.show(orig);
      };

      /**
       * Handle "populate" events.
       * @api private
       */

      Page.prototype._onpopstate = (function () {
        var loaded = false;
        if ( ! hasWindow ) {
          return function () {};
        }
        if (hasDocument && document.readyState === 'complete') {
          loaded = true;
        } else {
          window.addEventListener('load', function() {
            setTimeout(function() {
              loaded = true;
            }, 0);
          });
        }
        return function onpopstate(e) {
          if (!loaded) return;
          var page = this;
          if (e.state) {
            var path = e.state.path;
            page.replace(path, e.state);
          } else if (isLocation) {
            var loc = page._window.location;
            page.show(loc.pathname + loc.search + loc.hash, undefined, undefined, false);
          }
        };
      })();

      /**
       * Event button.
       */
      Page.prototype._which = function(e) {
        e = e || (hasWindow && this._window.event);
        return null == e.which ? e.button : e.which;
      };

      /**
       * Convert to a URL object
       * @api private
       */
      Page.prototype._toURL = function(href) {
        var window = this._window;
        if(typeof URL === 'function' && isLocation) {
          return new URL(href, window.location.toString());
        } else if (hasDocument) {
          var anc = window.document.createElement('a');
          anc.href = href;
          return anc;
        }
      };

      /**
       * Check if `href` is the same origin.
       * @param {string} href
       * @api public
       */
      Page.prototype.sameOrigin = function(href) {
        if(!href || !isLocation) return false;

        var url = this._toURL(href);
        var window = this._window;

        var loc = window.location;

        /*
           When the port is the default http port 80 for http, or 443 for
           https, internet explorer 11 returns an empty string for loc.port,
           so we need to compare loc.port with an empty string if url.port
           is the default port 80 or 443.
           Also the comparition with `port` is changed from `===` to `==` because
           `port` can be a string sometimes. This only applies to ie11.
        */
        return loc.protocol === url.protocol &&
          loc.hostname === url.hostname &&
          (loc.port === url.port || loc.port === '' && (url.port == 80 || url.port == 443)); // jshint ignore:line
      };

      /**
       * @api private
       */
      Page.prototype._samePath = function(url) {
        if(!isLocation) return false;
        var window = this._window;
        var loc = window.location;
        return url.pathname === loc.pathname &&
          url.search === loc.search;
      };

      /**
       * Remove URL encoding from the given `str`.
       * Accommodates whitespace in both x-www-form-urlencoded
       * and regular percent-encoded form.
       *
       * @param {string} val - URL component to decode
       * @api private
       */
      Page.prototype._decodeURLEncodedURIComponent = function(val) {
        if (typeof val !== 'string') { return val; }
        return this._decodeURLComponents ? decodeURIComponent(val.replace(/\+/g, ' ')) : val;
      };

      /**
       * Create a new `page` instance and function
       */
      function createPage() {
        var pageInstance = new Page();

        function pageFn(/* args */) {
          return page.apply(pageInstance, arguments);
        }

        // Copy all of the things over. In 2.0 maybe we use setPrototypeOf
        pageFn.callbacks = pageInstance.callbacks;
        pageFn.exits = pageInstance.exits;
        pageFn.base = pageInstance.base.bind(pageInstance);
        pageFn.strict = pageInstance.strict.bind(pageInstance);
        pageFn.start = pageInstance.start.bind(pageInstance);
        pageFn.stop = pageInstance.stop.bind(pageInstance);
        pageFn.show = pageInstance.show.bind(pageInstance);
        pageFn.back = pageInstance.back.bind(pageInstance);
        pageFn.redirect = pageInstance.redirect.bind(pageInstance);
        pageFn.replace = pageInstance.replace.bind(pageInstance);
        pageFn.dispatch = pageInstance.dispatch.bind(pageInstance);
        pageFn.exit = pageInstance.exit.bind(pageInstance);
        pageFn.configure = pageInstance.configure.bind(pageInstance);
        pageFn.sameOrigin = pageInstance.sameOrigin.bind(pageInstance);
        pageFn.clickHandler = pageInstance.clickHandler.bind(pageInstance);

        pageFn.create = createPage;

        Object.defineProperty(pageFn, 'len', {
          get: function(){
            return pageInstance.len;
          },
          set: function(val) {
            pageInstance.len = val;
          }
        });

        Object.defineProperty(pageFn, 'current', {
          get: function(){
            return pageInstance.current;
          },
          set: function(val) {
            pageInstance.current = val;
          }
        });

        // In 2.0 these can be named exports
        pageFn.Context = Context;
        pageFn.Route = Route;

        return pageFn;
      }

      /**
       * Register `path` with callback `fn()`,
       * or route `path`, or redirection,
       * or `page.start()`.
       *
       *   page(fn);
       *   page('*', fn);
       *   page('/user/:id', load, user);
       *   page('/user/' + user.id, { some: 'thing' });
       *   page('/user/' + user.id);
       *   page('/from', '/to')
       *   page();
       *
       * @param {string|!Function|!Object} path
       * @param {Function=} fn
       * @api public
       */

      function page(path, fn) {
        // <callback>
        if ('function' === typeof path) {
          return page.call(this, '*', path);
        }

        // route <path> to <callback ...>
        if ('function' === typeof fn) {
          var route = new Route(/** @type {string} */ (path), null, this);
          for (var i = 1; i < arguments.length; ++i) {
            this.callbacks.push(route.middleware(arguments[i]));
          }
          // show <path> with [state]
        } else if ('string' === typeof path) {
          this['string' === typeof fn ? 'redirect' : 'show'](path, fn);
          // start [options]
        } else {
          this.start(path);
        }
      }

      /**
       * Unhandled `ctx`. When it's not the initial
       * popstate then redirect. If you wish to handle
       * 404s on your own use `page('*', callback)`.
       *
       * @param {Context} ctx
       * @api private
       */
      function unhandled(ctx) {
        if (ctx.handled) return;
        var current;
        var page = this;
        var window = page._window;

        if (page._hashbang) {
          current = isLocation && this._getBase() + window.location.hash.replace('#!', '');
        } else {
          current = isLocation && window.location.pathname + window.location.search;
        }

        if (current === ctx.canonicalPath) return;
        page.stop();
        ctx.handled = false;
        isLocation && (window.location.href = ctx.canonicalPath);
      }

      /**
       * Escapes RegExp characters in the given string.
       *
       * @param {string} s
       * @api private
       */
      function escapeRegExp(s) {
        return s.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');
      }

      /**
       * Initialize a new "request" `Context`
       * with the given `path` and optional initial `state`.
       *
       * @constructor
       * @param {string} path
       * @param {Object=} state
       * @api public
       */

      function Context(path, state, pageInstance) {
        var _page = this.page = pageInstance || page;
        var window = _page._window;
        var hashbang = _page._hashbang;

        var pageBase = _page._getBase();
        if ('/' === path[0] && 0 !== path.indexOf(pageBase)) path = pageBase + (hashbang ? '#!' : '') + path;
        var i = path.indexOf('?');

        this.canonicalPath = path;
        var re = new RegExp('^' + escapeRegExp(pageBase));
        this.path = path.replace(re, '') || '/';
        if (hashbang) this.path = this.path.replace('#!', '') || '/';

        this.title = (hasDocument && window.document.title);
        this.state = state || {};
        this.state.path = path;
        this.querystring = ~i ? _page._decodeURLEncodedURIComponent(path.slice(i + 1)) : '';
        this.pathname = _page._decodeURLEncodedURIComponent(~i ? path.slice(0, i) : path);
        this.params = {};

        // fragment
        this.hash = '';
        if (!hashbang) {
          if (!~this.path.indexOf('#')) return;
          var parts = this.path.split('#');
          this.path = this.pathname = parts[0];
          this.hash = _page._decodeURLEncodedURIComponent(parts[1]) || '';
          this.querystring = this.querystring.split('#')[0];
        }
      }

      /**
       * Push state.
       *
       * @api private
       */

      Context.prototype.pushState = function() {
        var page = this.page;
        var window = page._window;
        var hashbang = page._hashbang;

        page.len++;
        if (hasHistory) {
            window.history.pushState(this.state, this.title,
              hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
        }
      };

      /**
       * Save the context state.
       *
       * @api public
       */

      Context.prototype.save = function() {
        var page = this.page;
        if (hasHistory) {
            page._window.history.replaceState(this.state, this.title,
              page._hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
        }
      };

      /**
       * Initialize `Route` with the given HTTP `path`,
       * and an array of `callbacks` and `options`.
       *
       * Options:
       *
       *   - `sensitive`    enable case-sensitive routes
       *   - `strict`       enable strict matching for trailing slashes
       *
       * @constructor
       * @param {string} path
       * @param {Object=} options
       * @api private
       */

      function Route(path, options, page) {
        var _page = this.page = page || globalPage;
        var opts = options || {};
        opts.strict = opts.strict || _page._strict;
        this.path = (path === '*') ? '(.*)' : path;
        this.method = 'GET';
        this.regexp = pathToRegexp_1(this.path, this.keys = [], opts);
      }

      /**
       * Return route middleware with
       * the given callback `fn()`.
       *
       * @param {Function} fn
       * @return {Function}
       * @api public
       */

      Route.prototype.middleware = function(fn) {
        var self = this;
        return function(ctx, next) {
          if (self.match(ctx.path, ctx.params)) {
            ctx.routePath = self.path;
            return fn(ctx, next);
          }
          next();
        };
      };

      /**
       * Check if this route matches `path`, if so
       * populate `params`.
       *
       * @param {string} path
       * @param {Object} params
       * @return {boolean}
       * @api private
       */

      Route.prototype.match = function(path, params) {
        var keys = this.keys,
          qsIndex = path.indexOf('?'),
          pathname = ~qsIndex ? path.slice(0, qsIndex) : path,
          m = this.regexp.exec(decodeURIComponent(pathname));

        if (!m) return false;

        delete params[0];

        for (var i = 1, len = m.length; i < len; ++i) {
          var key = keys[i - 1];
          var val = this.page._decodeURLEncodedURIComponent(m[i]);
          if (val !== undefined || !(hasOwnProperty.call(params, key.name))) {
            params[key.name] = val;
          }
        }

        return true;
      };


      /**
       * Module exports.
       */

      var globalPage = createPage();
      var page_js = globalPage;
      var default_1 = globalPage;

    page_js.default = default_1;

    return page_js;

    })));
    });

    /* src/App.svelte generated by Svelte v3.35.0 */

    const { Error: Error_1 } = globals;
    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let div4;
    	let div3;
    	let div2;
    	let div1;
    	let div0;
    	let header;
    	let titlebar;
    	let t;
    	let main;
    	let switch_instance;
    	let current;
    	titlebar = new TitleBar({ $$inline: true });
    	var switch_value = /*page*/ ctx[0].component;

    	function switch_props(ctx) {
    		return {
    			props: { page: /*page*/ ctx[0] },
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div3 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			header = element("header");
    			create_component(titlebar.$$.fragment);
    			t = space();
    			main = element("main");
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			attr_dev(header, "class", "svelte-j49knn");
    			add_location(header, file, 34, 5, 868);
    			attr_dev(main, "class", "svelte-j49knn");
    			add_location(main, file, 37, 5, 916);
    			attr_dev(div0, "class", "program svelte-j49knn");
    			add_location(div0, file, 33, 4, 841);
    			attr_dev(div1, "class", "console svelte-j49knn");
    			add_location(div1, file, 32, 3, 815);
    			attr_dev(div2, "class", "scanline svelte-j49knn");
    			add_location(div2, file, 31, 2, 789);
    			attr_dev(div3, "class", "lines svelte-j49knn");
    			add_location(div3, file, 30, 1, 767);
    			attr_dev(div4, "class", "screen svelte-j49knn");
    			add_location(div4, file, 29, 0, 745);
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, header);
    			mount_component(titlebar, header, null);
    			append_dev(div0, t);
    			append_dev(div0, main);

    			if (switch_instance) {
    				mount_component(switch_instance, main, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const switch_instance_changes = {};
    			if (dirty & /*page*/ 1) switch_instance_changes.page = /*page*/ ctx[0];

    			if (switch_value !== (switch_value = /*page*/ ctx[0].component)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, main, null);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(titlebar.$$.fragment, local);
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(titlebar.$$.fragment, local);
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			destroy_component(titlebar);
    			if (switch_instance) destroy_component(switch_instance);
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
    	validate_slots("App", slots, []);
    	let page$1;

    	for (let i = 0; i < Pages.length; i++) {
    		page(Pages[i].path, _ => $$invalidate(0, page$1 = Pages[i]));
    	}

    	page("*", _ => $$invalidate(0, page$1 = { component: Error$1 }));
    	page.start();
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Error: Error$1, Pages, TitleBar, router: page, page: page$1 });

    	$$self.$inject_state = $$props => {
    		if ("page" in $$props) $$invalidate(0, page$1 = $$props.page);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [page$1];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
