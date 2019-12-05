
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
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
    function create_slot(definition, ctx, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, fn) {
        return definition[1]
            ? assign({}, assign(ctx.$$scope.ctx, definition[1](fn ? fn(ctx) : {})))
            : ctx.$$scope.ctx;
    }
    function get_slot_changes(definition, ctx, changed, fn) {
        return definition[1]
            ? assign({}, assign(ctx.$$scope.changed || {}, definition[1](fn ? fn(changed) : {})))
            : ctx.$$scope.changed || {};
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
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
            $$.update($$.dirty);
            run_all($$.before_update);
            $$.fragment && $$.fragment.p($$.dirty, $$.ctx);
            $$.dirty = null;
            $$.after_update.forEach(add_render_callback);
        }
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

    const globals = (typeof window !== 'undefined' ? window : global);

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
            $$.ctx = {};
        }
    }
    function make_dirty(component, key) {
        if (!component.$$.dirty) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty = blank_object();
        }
        component.$$.dirty[key] = true;
    }
    function init(component, options, instance, create_fragment, not_equal, props) {
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
            dirty: null
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (key, ret, value = ret) => {
                if ($$.ctx && not_equal($$.ctx[key], $$.ctx[key] = value)) {
                    if ($$.bound[key])
                        $$.bound[key](value);
                    if (ready)
                        make_dirty(component, key);
                }
                return ret;
            })
            : prop_values;
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
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev("SvelteDOMSetProperty", { node, property, value });
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

    /* src/layout/ViewScreen.svelte generated by Svelte v3.15.0 */

    const file = "src/layout/ViewScreen.svelte";

    function create_fragment(ctx) {
    	let div;
    	let current;
    	const default_slot_template = ctx.$$slots.default;
    	const default_slot = create_slot(default_slot_template, ctx, null);

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
    		p: function update(changed, ctx) {
    			if (default_slot && default_slot.p && changed.$$scope) {
    				default_slot.p(get_slot_changes(default_slot_template, ctx, changed, null), get_slot_context(default_slot_template, ctx, null));
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
    		if ("$$scope" in $$props) $$invalidate("$$scope", $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		
    	};

    	return { $$slots, $$scope };
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

    /* node_modules/svelte-routing/src/Router.svelte generated by Svelte v3.15.0 */

    function create_fragment$1(ctx) {
    	let current;
    	const default_slot_template = ctx.$$slots.default;
    	const default_slot = create_slot(default_slot_template, ctx, null);

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
    		p: function update(changed, ctx) {
    			if (default_slot && default_slot.p && changed.$$scope) {
    				default_slot.p(get_slot_changes(default_slot_template, ctx, changed, null), get_slot_context(default_slot_template, ctx, null));
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
    	component_subscribe($$self, routes, value => $$invalidate("$routes", $routes = value));
    	const activeRoute = writable(null);
    	let hasActiveRoute = false;
    	const location = locationContext || writable(url ? { pathname: url } : globalHistory.location);
    	validate_store(location, "location");
    	component_subscribe($$self, location, value => $$invalidate("$location", $location = value));

    	const base = routerContext
    	? routerContext.routerBase
    	: writable({ path: basepath, uri: basepath });

    	validate_store(base, "base");
    	component_subscribe($$self, base, value => $$invalidate("$base", $base = value));

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
    		if ("basepath" in $$props) $$invalidate("basepath", basepath = $$props.basepath);
    		if ("url" in $$props) $$invalidate("url", url = $$props.url);
    		if ("$$scope" in $$props) $$invalidate("$$scope", $$scope = $$props.$$scope);
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
    		if ("basepath" in $$props) $$invalidate("basepath", basepath = $$props.basepath);
    		if ("url" in $$props) $$invalidate("url", url = $$props.url);
    		if ("hasActiveRoute" in $$props) hasActiveRoute = $$props.hasActiveRoute;
    		if ("$base" in $$props) base.set($base = $$props.$base);
    		if ("$location" in $$props) location.set($location = $$props.$location);
    		if ("$routes" in $$props) routes.set($routes = $$props.$routes);
    	};

    	$$self.$$.update = (changed = { $base: 1, $routes: 1, $location: 1 }) => {
    		if (changed.$base) {
    			 {
    				const { path: basepath } = $base;

    				routes.update(rs => {
    					rs.forEach(r => r.path = combinePaths(basepath, r._path));
    					return rs;
    				});
    			}
    		}

    		if (changed.$routes || changed.$location) {
    			 {
    				const bestMatch = pick($routes, $location.pathname);
    				activeRoute.set(bestMatch);
    			}
    		}
    	};

    	return {
    		basepath,
    		url,
    		routes,
    		location,
    		base,
    		$$slots,
    		$$scope
    	};
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { basepath: 0, url: 0 });

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

    /* node_modules/svelte-routing/src/Route.svelte generated by Svelte v3.15.0 */
    const get_default_slot_changes = ({ routeParams, $location }) => ({ params: routeParams, location: $location });
    const get_default_slot_context = ({ routeParams, $location }) => ({ params: routeParams, location: $location });

    // (40:0) {#if $activeRoute !== null && $activeRoute.route === route}
    function create_if_block(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(changed, ctx) {
    		if (ctx.component !== null) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(null, ctx);
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
    		p: function update(changed, ctx) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(changed, ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(changed, ctx);
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
    	const default_slot_template = ctx.$$slots.default;
    	const default_slot = create_slot(default_slot_template, ctx, get_default_slot_context);

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
    		p: function update(changed, ctx) {
    			if (default_slot && default_slot.p && (changed.$$scope || changed.routeParams || changed.$location)) {
    				default_slot.p(get_slot_changes(default_slot_template, ctx, changed, get_default_slot_changes), get_slot_context(default_slot_template, ctx, get_default_slot_context));
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
    	const switch_instance_spread_levels = [{ location: ctx.$location }, ctx.routeParams, ctx.routeProps];
    	var switch_value = ctx.component;

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
    		p: function update(changed, ctx) {
    			const switch_instance_changes = changed.$location || changed.routeParams || changed.routeProps
    			? get_spread_update(switch_instance_spread_levels, [
    					changed.$location && ({ location: ctx.$location }),
    					changed.routeParams && get_spread_object(ctx.routeParams),
    					changed.routeProps && get_spread_object(ctx.routeProps)
    				])
    			: {};

    			if (switch_value !== (switch_value = ctx.component)) {
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
    	let if_block = ctx.$activeRoute !== null && ctx.$activeRoute.route === ctx.route && create_if_block(ctx);

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
    		p: function update(changed, ctx) {
    			if (ctx.$activeRoute !== null && ctx.$activeRoute.route === ctx.route) {
    				if (if_block) {
    					if_block.p(changed, ctx);
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
    	component_subscribe($$self, activeRoute, value => $$invalidate("$activeRoute", $activeRoute = value));
    	const location = getContext(LOCATION);
    	validate_store(location, "location");
    	component_subscribe($$self, location, value => $$invalidate("$location", $location = value));
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
    		$$invalidate("$$props", $$props = assign(assign({}, $$props), $$new_props));
    		if ("path" in $$new_props) $$invalidate("path", path = $$new_props.path);
    		if ("component" in $$new_props) $$invalidate("component", component = $$new_props.component);
    		if ("$$scope" in $$new_props) $$invalidate("$$scope", $$scope = $$new_props.$$scope);
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
    		$$invalidate("$$props", $$props = assign(assign({}, $$props), $$new_props));
    		if ("path" in $$props) $$invalidate("path", path = $$new_props.path);
    		if ("component" in $$props) $$invalidate("component", component = $$new_props.component);
    		if ("routeParams" in $$props) $$invalidate("routeParams", routeParams = $$new_props.routeParams);
    		if ("routeProps" in $$props) $$invalidate("routeProps", routeProps = $$new_props.routeProps);
    		if ("$activeRoute" in $$props) activeRoute.set($activeRoute = $$new_props.$activeRoute);
    		if ("$location" in $$props) location.set($location = $$new_props.$location);
    	};

    	$$self.$$.update = (changed = { $activeRoute: 1, $$props: 1 }) => {
    		if (changed.$activeRoute) {
    			 if ($activeRoute && $activeRoute.route === route) {
    				$$invalidate("routeParams", routeParams = $activeRoute.params);
    			}
    		}

    		 {
    			const { path, component, ...rest } = $$props;
    			$$invalidate("routeProps", routeProps = rest);
    		}
    	};

    	return {
    		path,
    		component,
    		activeRoute,
    		location,
    		route,
    		routeParams,
    		routeProps,
    		$activeRoute,
    		$location,
    		$$props: $$props = exclude_internal_props($$props),
    		$$slots,
    		$$scope
    	};
    }

    class Route extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { path: 0, component: 0 });

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
        Reference: () => { navigate(`/reference`, { replace: true }); }
    };

    /* src/layout/TitleBar.svelte generated by Svelte v3.15.0 */
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
    			attr_dev(span0, "class", "title svelte-11p9k5r");
    			add_location(span0, file$1, 5, 4, 109);
    			attr_dev(span1, "class", "beta svelte-11p9k5r");
    			add_location(span1, file$1, 6, 4, 159);
    			attr_dev(button, "class", "title-bar svelte-11p9k5r");
    			add_location(button, file$1, 4, 0, 55);
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

    class TitleBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TitleBar",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/layout/DisplayWindow.svelte generated by Svelte v3.15.0 */

    const file$2 = "src/layout/DisplayWindow.svelte";

    function create_fragment$4(ctx) {
    	let div;
    	let current;
    	const default_slot_template = ctx.$$slots.default;
    	const default_slot = create_slot(default_slot_template, ctx, null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "display-window svelte-1rpze5");
    			add_location(div, file$2, 0, 0, 0);
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
    		p: function update(changed, ctx) {
    			if (default_slot && default_slot.p && changed.$$scope) {
    				default_slot.p(get_slot_changes(default_slot_template, ctx, changed, null), get_slot_context(default_slot_template, ctx, null));
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
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots = {}, $$scope } = $$props;

    	$$self.$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate("$$scope", $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		
    	};

    	return { $$slots, $$scope };
    }

    class DisplayWindow extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DisplayWindow",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/layout/BackNextButtons.svelte generated by Svelte v3.15.0 */
    const file$3 = "src/layout/BackNextButtons.svelte";

    function create_fragment$5(ctx) {
    	let div;
    	let button0;
    	let t1;
    	let button1;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			button0 = element("button");
    			button0.textContent = "Back";
    			t1 = space();
    			button1 = element("button");
    			button1.textContent = "Next";
    			attr_dev(button0, "class", "svelte-1gidaka");
    			add_location(button0, file$3, 12, 4, 257);
    			attr_dev(button1, "class", "svelte-1gidaka");
    			add_location(button1, file$3, 13, 4, 299);
    			attr_dev(div, "class", "svelte-1gidaka");
    			add_location(div, file$3, 11, 0, 247);

    			dispose = [
    				listen_dev(button0, "click", ctx.back, false, false, false),
    				listen_dev(button1, "click", ctx.next, false, false, false)
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
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
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

    function instance$4($$self, $$props, $$invalidate) {
    	let { step } = $$props;
    	const d = createEventDispatcher();

    	function back() {
    		d("message", { number: $$invalidate("step", --step) });
    	}

    	function next() {
    		d("message", { number: $$invalidate("step", ++step) });
    	}

    	const writable_props = ["step"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<BackNextButtons> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("step" in $$props) $$invalidate("step", step = $$props.step);
    	};

    	$$self.$capture_state = () => {
    		return { step };
    	};

    	$$self.$inject_state = $$props => {
    		if ("step" in $$props) $$invalidate("step", step = $$props.step);
    	};

    	return { step, back, next };
    }

    class BackNextButtons extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$5, safe_not_equal, { step: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BackNextButtons",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || ({});

    		if (ctx.step === undefined && !("step" in props)) {
    			console.warn("<BackNextButtons> was created without expected prop 'step'");
    		}
    	}

    	get step() {
    		throw new Error("<BackNextButtons>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set step(value) {
    		throw new Error("<BackNextButtons>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    class Trait {
        constructor (name) {
            this.name = name,
            this.score = 1,
            this.max = 6;
        }
    }

    let traitsList = {
        'agility': new Trait(`Agility`),
        'brains': new Trait(`Brains`),
        'constitution': new Trait(`Constitution`),
        'demeanor': new Trait(`Demeanor`),
    };

    const traitPoints = 12;

    class Skill {
        constructor(name, parent) {
            this.name = name,
            this.parent = parent,
            this.score = 0;
        }
    }

    let skillsList = {
        'acrobatics': new Skill(`Acrobatics`, `Agility`),
        'athletics': new Skill(`Athletics`, `Constitution`),
        'build': new Skill(`Build`, `Brains`),
        'drive': new Skill(`Drive`, `Constitution`),
        'larceny': new Skill(`Larceny`, `Agility`),
        'leadership': new Skill(`Leadership`, `Demeanor`),
        'medicine': new Skill(`Medicine`, `Brains`),
        'melee': new Skill(`Melee`, `Constitution`),
        'perception': new Skill(`Perception`, `Brains`),
        'perform': new Skill(`Perform`, `Demeanor`),
        'ranged': new Skill(`Ranged`, `Agility`),
        'science': new Skill(`Science`, `Brains`),
        'socialize': new Skill(`Socialize`, `Demeanor`),
        'stealth': new Skill(`Stealth`, `Agility`),
        'survival': new Skill(`Survival`, `Constitution`),
        'tame': new Skill(`Tame`, `Demeanor`),
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
                this.traits = traitsList,
                this.skills = skillsList,
                this.props = {
                    actions: {
                        name: `Actions`,
                        base: 1,
                        score: 1,
                        setActions: () => {
                            let actions = Math.floor((this.traits[`agility`].score + this.traits[`brains`].score) / 2);
                            this.props.actions.base = actions;
                            return actions
                        }
                    },
                    block: {
                        name: `Block`,
                        base: 0,
                        score: 0,
                        setBlock: () => {
                            let block = this.skills[`melee`].score;
                            this.props.block.base = block;
                            return block
                        }
                    },
                    dodge: {
                        name: `Dodge`,
                        base: 0,
                        score: 0,
                        setDodge: () => {
                            let dodge = this.skills[`acrobatics`].score;
                            this.props.dodge.base = dodge;
                            return dodge
                        }
                    },
                    health: {
                        name: `Health`,
                        base: 3,
                        score: 3,
                        setHealth: () => {
                            let health = this.traits[`constitution`].score * 3;
                            this.props.health.base = health;
                            return health
                        }
                    },
                    luck: {
                        name: `Luck`,
                        base: 1,
                        score: 1,
                        setLuck: () => {
                            let luck = this.traits[`demeanor`].score;
                            this.props.luck.base = luck;
                            return luck
                        }
                    },
                    psyche: {
                        name: `Psyche`,
                        base: 1,
                        score: 1,
                        setPsyche: () => {
                            let psyche = this.traits[`demeanor`].score * 3;
                            this.props.psyche.base = psyche;
                            return psyche
                        }
                    },
                    reflex: {
                        name: `Reflex`,
                        base: 0,
                        score: 0,
                        setReflex: () => {
                            let reflex = Math.floor(this.skills[`perception`].score / 2);
                            this.props.reflex.base = reflex;
                            return reflex
                        }
                    },
                    speed: {
                        name: `Speed`,
                        base: 2,
                        score: 2,
                        setSpeed: () => {
                            let speed = this.traits[`agility`].score + this.traits[`constitution`].score;
                            this.props.speed.base = speed;
                            return speed
                        }
                    },
                    xp: {
                        name: `Experience`,
                        base: 6,
                        score: 6,
                        setXP: () => {
                            let xp = this.traits[`brains`].score * 6;
                            this.props.xp.base = xp;
                            return xp
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
    }

    let newCharacter = new Character();

    const CharacterStore = writable(newCharacter);

    /* src/components/creator/Description.svelte generated by Svelte v3.15.0 */
    const file$4 = "src/components/creator/Description.svelte";

    function create_fragment$6(ctx) {
    	let div12;
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
    	let div5;
    	let div3;
    	let span2;
    	let t9;
    	let input2;
    	let t10;
    	let div4;
    	let span3;
    	let t12;
    	let input3;
    	let t13;
    	let div8;
    	let div6;
    	let span4;
    	let t15;
    	let input4;
    	let t16;
    	let div7;
    	let span5;
    	let t18;
    	let input5;
    	let t19;
    	let div11;
    	let div9;
    	let span6;
    	let t21;
    	let input6;
    	let t22;
    	let div10;
    	let span7;
    	let t24;
    	let input7;
    	let dispose;

    	const block = {
    		c: function create() {
    			div12 = element("div");
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
    			div5 = element("div");
    			div3 = element("div");
    			span2 = element("span");
    			span2.textContent = "Height:";
    			t9 = space();
    			input2 = element("input");
    			t10 = space();
    			div4 = element("div");
    			span3 = element("span");
    			span3.textContent = "Weight:";
    			t12 = space();
    			input3 = element("input");
    			t13 = space();
    			div8 = element("div");
    			div6 = element("div");
    			span4 = element("span");
    			span4.textContent = "Hair:";
    			t15 = space();
    			input4 = element("input");
    			t16 = space();
    			div7 = element("div");
    			span5 = element("span");
    			span5.textContent = "Skin:";
    			t18 = space();
    			input5 = element("input");
    			t19 = space();
    			div11 = element("div");
    			div9 = element("div");
    			span6 = element("span");
    			span6.textContent = "Gender:";
    			t21 = space();
    			input6 = element("input");
    			t22 = space();
    			div10 = element("div");
    			span7 = element("span");
    			span7.textContent = "Age:";
    			t24 = space();
    			input7 = element("input");
    			add_location(h2, file$4, 8, 8, 221);
    			attr_dev(div0, "class", "step-title");
    			add_location(div0, file$4, 7, 4, 188);
    			attr_dev(span0, "class", "stat-label");
    			add_location(span0, file$4, 11, 8, 290);
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "class", "full-input");
    			add_location(input0, file$4, 12, 8, 338);
    			attr_dev(div1, "class", "stat-block");
    			add_location(div1, file$4, 10, 4, 257);
    			attr_dev(span1, "class", "stat-label");
    			add_location(span1, file$4, 19, 8, 517);
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "class", "full-input");
    			add_location(input1, file$4, 20, 8, 568);
    			attr_dev(div2, "class", "stat-block");
    			add_location(div2, file$4, 18, 4, 484);
    			attr_dev(span2, "class", "stat-label");
    			add_location(span2, file$4, 28, 12, 792);
    			attr_dev(input2, "type", "text");
    			attr_dev(input2, "class", "half-input");
    			add_location(input2, file$4, 29, 12, 844);
    			attr_dev(div3, "class", "half-stat-block");
    			add_location(div3, file$4, 27, 8, 750);
    			attr_dev(span3, "class", "stat-label");
    			add_location(span3, file$4, 36, 12, 1052);
    			attr_dev(input3, "type", "text");
    			attr_dev(input3, "class", "half-input");
    			add_location(input3, file$4, 37, 12, 1104);
    			attr_dev(div4, "class", "half-stat-block");
    			add_location(div4, file$4, 35, 8, 1010);
    			attr_dev(div5, "class", "stat-block");
    			add_location(div5, file$4, 26, 4, 717);
    			attr_dev(span4, "class", "stat-label");
    			add_location(span4, file$4, 46, 12, 1352);
    			attr_dev(input4, "type", "text");
    			attr_dev(input4, "class", "half-input");
    			add_location(input4, file$4, 47, 12, 1402);
    			attr_dev(div6, "class", "half-stat-block");
    			add_location(div6, file$4, 45, 8, 1310);
    			attr_dev(span5, "class", "stat-label");
    			add_location(span5, file$4, 54, 12, 1608);
    			attr_dev(input5, "type", "text");
    			attr_dev(input5, "class", "half-input");
    			add_location(input5, file$4, 55, 12, 1658);
    			attr_dev(div7, "class", "half-stat-block");
    			add_location(div7, file$4, 53, 8, 1566);
    			attr_dev(div8, "class", "stat-block");
    			add_location(div8, file$4, 44, 4, 1277);
    			attr_dev(span6, "class", "stat-label");
    			add_location(span6, file$4, 64, 12, 1904);
    			attr_dev(input6, "type", "text");
    			attr_dev(input6, "class", "half-input");
    			add_location(input6, file$4, 65, 12, 1956);
    			attr_dev(div9, "class", "half-stat-block");
    			add_location(div9, file$4, 63, 8, 1862);
    			attr_dev(span7, "class", "stat-label");
    			add_location(span7, file$4, 72, 12, 2164);
    			attr_dev(input7, "type", "text");
    			attr_dev(input7, "class", "half-input");
    			add_location(input7, file$4, 73, 12, 2213);
    			attr_dev(div10, "class", "half-stat-block");
    			add_location(div10, file$4, 71, 8, 2122);
    			attr_dev(div11, "class", "stat-block");
    			add_location(div11, file$4, 62, 4, 1829);
    			attr_dev(div12, "class", "step");
    			add_location(div12, file$4, 6, 0, 165);

    			dispose = [
    				listen_dev(input0, "input", ctx.input0_input_handler),
    				listen_dev(input1, "input", ctx.input1_input_handler),
    				listen_dev(input2, "input", ctx.input2_input_handler),
    				listen_dev(input3, "input", ctx.input3_input_handler),
    				listen_dev(input4, "input", ctx.input4_input_handler),
    				listen_dev(input5, "input", ctx.input5_input_handler),
    				listen_dev(input6, "input", ctx.input6_input_handler),
    				listen_dev(input7, "input", ctx.input7_input_handler)
    			];
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div12, anchor);
    			append_dev(div12, div0);
    			append_dev(div0, h2);
    			append_dev(div12, t1);
    			append_dev(div12, div1);
    			append_dev(div1, span0);
    			append_dev(div1, t3);
    			append_dev(div1, input0);
    			set_input_value(input0, ctx.char.description.playerName.value);
    			append_dev(div12, t4);
    			append_dev(div12, div2);
    			append_dev(div2, span1);
    			append_dev(div2, t6);
    			append_dev(div2, input1);
    			set_input_value(input1, ctx.char.description.characterName.value);
    			append_dev(div12, t7);
    			append_dev(div12, div5);
    			append_dev(div5, div3);
    			append_dev(div3, span2);
    			append_dev(div3, t9);
    			append_dev(div3, input2);
    			set_input_value(input2, ctx.char.description.height.value);
    			append_dev(div5, t10);
    			append_dev(div5, div4);
    			append_dev(div4, span3);
    			append_dev(div4, t12);
    			append_dev(div4, input3);
    			set_input_value(input3, ctx.char.description.weight.value);
    			append_dev(div12, t13);
    			append_dev(div12, div8);
    			append_dev(div8, div6);
    			append_dev(div6, span4);
    			append_dev(div6, t15);
    			append_dev(div6, input4);
    			set_input_value(input4, ctx.char.description.hair.value);
    			append_dev(div8, t16);
    			append_dev(div8, div7);
    			append_dev(div7, span5);
    			append_dev(div7, t18);
    			append_dev(div7, input5);
    			set_input_value(input5, ctx.char.description.skin.value);
    			append_dev(div12, t19);
    			append_dev(div12, div11);
    			append_dev(div11, div9);
    			append_dev(div9, span6);
    			append_dev(div9, t21);
    			append_dev(div9, input6);
    			set_input_value(input6, ctx.char.description.gender.value);
    			append_dev(div11, t22);
    			append_dev(div11, div10);
    			append_dev(div10, span7);
    			append_dev(div10, t24);
    			append_dev(div10, input7);
    			set_input_value(input7, ctx.char.description.age.value);
    		},
    		p: function update(changed, ctx) {
    			if (changed.char && input0.value !== ctx.char.description.playerName.value) {
    				set_input_value(input0, ctx.char.description.playerName.value);
    			}

    			if (changed.char && input1.value !== ctx.char.description.characterName.value) {
    				set_input_value(input1, ctx.char.description.characterName.value);
    			}

    			if (changed.char && input2.value !== ctx.char.description.height.value) {
    				set_input_value(input2, ctx.char.description.height.value);
    			}

    			if (changed.char && input3.value !== ctx.char.description.weight.value) {
    				set_input_value(input3, ctx.char.description.weight.value);
    			}

    			if (changed.char && input4.value !== ctx.char.description.hair.value) {
    				set_input_value(input4, ctx.char.description.hair.value);
    			}

    			if (changed.char && input5.value !== ctx.char.description.skin.value) {
    				set_input_value(input5, ctx.char.description.skin.value);
    			}

    			if (changed.char && input6.value !== ctx.char.description.gender.value) {
    				set_input_value(input6, ctx.char.description.gender.value);
    			}

    			if (changed.char && input7.value !== ctx.char.description.age.value) {
    				set_input_value(input7, ctx.char.description.age.value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div12);
    			run_all(dispose);
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

    function instance$5($$self, $$props, $$invalidate) {
    	let char;

    	const unsubscribe = CharacterStore.subscribe(value => {
    		$$invalidate("char", char = value);
    	});

    	function input0_input_handler() {
    		char.description.playerName.value = this.value;
    		$$invalidate("char", char);
    	}

    	function input1_input_handler() {
    		char.description.characterName.value = this.value;
    		$$invalidate("char", char);
    	}

    	function input2_input_handler() {
    		char.description.height.value = this.value;
    		$$invalidate("char", char);
    	}

    	function input3_input_handler() {
    		char.description.weight.value = this.value;
    		$$invalidate("char", char);
    	}

    	function input4_input_handler() {
    		char.description.hair.value = this.value;
    		$$invalidate("char", char);
    	}

    	function input5_input_handler() {
    		char.description.skin.value = this.value;
    		$$invalidate("char", char);
    	}

    	function input6_input_handler() {
    		char.description.gender.value = this.value;
    		$$invalidate("char", char);
    	}

    	function input7_input_handler() {
    		char.description.age.value = this.value;
    		$$invalidate("char", char);
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("char" in $$props) $$invalidate("char", char = $$props.char);
    	};

    	return {
    		char,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler,
    		input3_input_handler,
    		input4_input_handler,
    		input5_input_handler,
    		input6_input_handler,
    		input7_input_handler
    	};
    }

    class Description extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Description",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/components/creator/Traits.svelte generated by Svelte v3.15.0 */

    const { Object: Object_1 } = globals;
    const file$5 = "src/components/creator/Traits.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = Object_1.create(ctx);
    	child_ctx.trait = list[i];
    	return child_ctx;
    }

    // (27:4) {#each traits as trait}
    function create_each_block(ctx) {
    	let div;
    	let span;
    	let t0_value = ctx.char.traits[ctx.trait].name + "";
    	let t0;
    	let t1;
    	let input;
    	let input_max_value;
    	let input_updating = false;
    	let t2;
    	let dispose;

    	function input_input_handler() {
    		input_updating = true;
    		ctx.input_input_handler.call(input, ctx);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			input = element("input");
    			t2 = space();
    			attr_dev(span, "class", "stat-label");
    			add_location(span, file$5, 28, 12, 755);
    			attr_dev(input, "class", "stat-input");
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", "1");
    			attr_dev(input, "max", input_max_value = Math.min(ctx.char.traits[ctx.trait].max, ctx.char.traits[ctx.trait].score + ctx.remaining));
    			add_location(input, file$5, 29, 12, 825);
    			attr_dev(div, "class", "stat-block");
    			add_location(div, file$5, 27, 8, 718);

    			dispose = [
    				listen_dev(input, "input", input_input_handler),
    				listen_dev(input, "input", ctx.updateTraits, false, false, false)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span);
    			append_dev(span, t0);
    			append_dev(div, t1);
    			append_dev(div, input);
    			set_input_value(input, ctx.char.traits[ctx.trait].score);
    			append_dev(div, t2);
    		},
    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;
    			if (changed.char && t0_value !== (t0_value = ctx.char.traits[ctx.trait].name + "")) set_data_dev(t0, t0_value);

    			if ((changed.char || changed.remaining) && input_max_value !== (input_max_value = Math.min(ctx.char.traits[ctx.trait].max, ctx.char.traits[ctx.trait].score + ctx.remaining))) {
    				attr_dev(input, "max", input_max_value);
    			}

    			if (!input_updating && (changed.char || changed.traits)) {
    				set_input_value(input, ctx.char.traits[ctx.trait].score);
    			}

    			input_updating = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(27:4) {#each traits as trait}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let div2;
    	let div0;
    	let h2;
    	let t1;
    	let div1;
    	let h3;
    	let t2;
    	let t3;
    	let t4;
    	let each_value = ctx.traits;
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Traits";
    			t1 = space();
    			div1 = element("div");
    			h3 = element("h3");
    			t2 = text("Points Remaining: ");
    			t3 = text(ctx.remaining);
    			t4 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(h2, file$5, 21, 8, 569);
    			attr_dev(div0, "class", "step-title");
    			add_location(div0, file$5, 20, 4, 536);
    			add_location(h3, file$5, 24, 8, 632);
    			attr_dev(div1, "class", "remaining svelte-slj60w");
    			add_location(div1, file$5, 23, 4, 600);
    			attr_dev(div2, "class", "step");
    			add_location(div2, file$5, 19, 0, 513);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, h2);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, h3);
    			append_dev(h3, t2);
    			append_dev(h3, t3);
    			append_dev(div2, t4);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div2, null);
    			}
    		},
    		p: function update(changed, ctx) {
    			if (changed.remaining) set_data_dev(t3, ctx.remaining);

    			if (changed.Math || changed.char || changed.traits || changed.remaining || changed.updateTraits) {
    				each_value = ctx.traits;
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
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
    			if (detaching) detach_dev(div2);
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

    function instance$6($$self, $$props, $$invalidate) {
    	let char;

    	const unsubscribe = CharacterStore.subscribe(value => {
    		$$invalidate("char", char = value);
    	});

    	const traits = Object.keys(char.traits);
    	let remaining = traitPoints - traits.length;

    	function updateTraits() {
    		let r = 0;
    		for (const trait of traits) r += char.traits[trait].score;
    		$$invalidate("remaining", remaining = traitPoints - r);
    		console.log(char.traits);
    	}

    	function input_input_handler({ trait }) {
    		char.traits[trait].score = to_number(this.value);
    		$$invalidate("char", char);
    		$$invalidate("traits", traits);
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("char" in $$props) $$invalidate("char", char = $$props.char);
    		if ("remaining" in $$props) $$invalidate("remaining", remaining = $$props.remaining);
    	};

    	return {
    		char,
    		traits,
    		remaining,
    		updateTraits,
    		input_input_handler
    	};
    }

    class Traits extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Traits",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/components/creator/Skills.svelte generated by Svelte v3.15.0 */

    const { Object: Object_1$1 } = globals;
    const file$6 = "src/components/creator/Skills.svelte";

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = Object_1$1.create(ctx);
    	child_ctx.skill = list[i];
    	return child_ctx;
    }

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = Object_1$1.create(ctx);
    	child_ctx.trait = list[i];
    	return child_ctx;
    }

    // (33:16) {#if char.traits[trait].name == char.skills[skill].parent}
    function create_if_block$1(ctx) {
    	let div;
    	let span;
    	let t0_value = ctx.char.skills[ctx.skill].name + "";
    	let t0;
    	let t1;
    	let input;
    	let input_max_value;
    	let input_updating = false;
    	let dispose;

    	function input_input_handler() {
    		input_updating = true;
    		ctx.input_input_handler.call(input, ctx);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			input = element("input");
    			attr_dev(span, "class", "stat-label");
    			add_location(span, file$6, 34, 24, 1064);
    			attr_dev(input, "class", "stat-input");
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", "0");
    			attr_dev(input, "max", input_max_value = Math.min(ctx.char.traits[ctx.trait].score, ctx.char.skills[ctx.skill].score + ctx.remaining));
    			add_location(input, file$6, 35, 24, 1146);
    			attr_dev(div, "class", "stat-block");
    			add_location(div, file$6, 33, 20, 1015);

    			dispose = [
    				listen_dev(input, "input", input_input_handler),
    				listen_dev(input, "input", ctx.updateSkills, false, false, false)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span);
    			append_dev(span, t0);
    			append_dev(div, t1);
    			append_dev(div, input);
    			set_input_value(input, ctx.char.skills[ctx.skill].score);
    		},
    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;
    			if (changed.char && t0_value !== (t0_value = ctx.char.skills[ctx.skill].name + "")) set_data_dev(t0, t0_value);

    			if ((changed.char || changed.remaining) && input_max_value !== (input_max_value = Math.min(ctx.char.traits[ctx.trait].score, ctx.char.skills[ctx.skill].score + ctx.remaining))) {
    				attr_dev(input, "max", input_max_value);
    			}

    			if (!input_updating && (changed.char || changed.skills)) {
    				set_input_value(input, ctx.char.skills[ctx.skill].score);
    			}

    			input_updating = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(33:16) {#if char.traits[trait].name == char.skills[skill].parent}",
    		ctx
    	});

    	return block;
    }

    // (32:12) {#each skills as skill}
    function create_each_block_1(ctx) {
    	let if_block_anchor;
    	let if_block = ctx.char.traits[ctx.trait].name == ctx.char.skills[ctx.skill].parent && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(changed, ctx) {
    			if (ctx.char.traits[ctx.trait].name == ctx.char.skills[ctx.skill].parent) {
    				if (if_block) {
    					if_block.p(changed, ctx);
    				} else {
    					if_block = create_if_block$1(ctx);
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
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(32:12) {#each skills as skill}",
    		ctx
    	});

    	return block;
    }

    // (27:4) {#each traits as trait}
    function create_each_block$1(ctx) {
    	let div1;
    	let div0;
    	let t0_value = ctx.char.traits[ctx.trait].name + "";
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let each_value_1 = ctx.skills;
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = text(" Skills");
    			t2 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t3 = space();
    			attr_dev(div0, "class", "parent-trait-title svelte-wj9h86");
    			add_location(div0, file$6, 28, 12, 783);
    			attr_dev(div1, "class", "skill-section svelte-wj9h86");
    			add_location(div1, file$6, 27, 8, 743);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, t0);
    			append_dev(div0, t1);
    			append_dev(div1, t2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			append_dev(div1, t3);
    		},
    		p: function update(changed, ctx) {
    			if (changed.char && t0_value !== (t0_value = ctx.char.traits[ctx.trait].name + "")) set_data_dev(t0, t0_value);

    			if (changed.char || changed.traits || changed.skills || changed.Math || changed.remaining || changed.updateSkills) {
    				each_value_1 = ctx.skills;
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, t3);
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
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(27:4) {#each traits as trait}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let div2;
    	let div0;
    	let h2;
    	let t1;
    	let div1;
    	let h3;
    	let t2;
    	let t3;
    	let t4;
    	let each_value = ctx.traits;
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Skills";
    			t1 = space();
    			div1 = element("div");
    			h3 = element("h3");
    			t2 = text("Points Remaining: ");
    			t3 = text(ctx.remaining);
    			t4 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(h2, file$6, 21, 8, 594);
    			attr_dev(div0, "class", "step-title");
    			add_location(div0, file$6, 20, 4, 561);
    			add_location(h3, file$6, 24, 8, 657);
    			attr_dev(div1, "class", "remaining svelte-wj9h86");
    			add_location(div1, file$6, 23, 4, 625);
    			attr_dev(div2, "class", "step");
    			add_location(div2, file$6, 19, 0, 538);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, h2);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, h3);
    			append_dev(h3, t2);
    			append_dev(h3, t3);
    			append_dev(div2, t4);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div2, null);
    			}
    		},
    		p: function update(changed, ctx) {
    			if (changed.remaining) set_data_dev(t3, ctx.remaining);

    			if (changed.skills || changed.char || changed.traits || changed.Math || changed.remaining || changed.updateSkills) {
    				each_value = ctx.traits;
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
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
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
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

    function instance$7($$self, $$props, $$invalidate) {
    	let char;

    	const unsubscribe = CharacterStore.subscribe(value => {
    		$$invalidate("char", char = value);
    	});

    	const traits = Object.keys(char.traits);
    	const skills = Object.keys(char.skills);
    	let startingSkillPoints = char.traits.brains.score * 3;
    	let remaining = startingSkillPoints;
    	updateSkills();

    	function updateSkills() {
    		let r = 0;
    		for (const skill of skills) r += char.skills[skill].score;
    		$$invalidate("remaining", remaining = startingSkillPoints - r);
    	}

    	function input_input_handler({ skill }) {
    		char.skills[skill].score = to_number(this.value);
    		$$invalidate("char", char);
    		$$invalidate("skills", skills);
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("char" in $$props) $$invalidate("char", char = $$props.char);
    		if ("startingSkillPoints" in $$props) startingSkillPoints = $$props.startingSkillPoints;
    		if ("remaining" in $$props) $$invalidate("remaining", remaining = $$props.remaining);
    	};

    	return {
    		char,
    		traits,
    		skills,
    		remaining,
    		updateSkills,
    		input_input_handler
    	};
    }

    class Skills extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Skills",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/components/creator/Properties.svelte generated by Svelte v3.15.0 */
    const file$7 = "src/components/creator/Properties.svelte";

    function create_fragment$9(ctx) {
    	let div9;
    	let div0;
    	let h2;
    	let t1;
    	let div1;
    	let span0;
    	let t3;
    	let input0;
    	let input0_value_value;
    	let input0_max_value;
    	let t4;
    	let span1;
    	let t5_value = ctx.char.props.health.score + "";
    	let t5;
    	let t6;
    	let div2;
    	let span2;
    	let t8;
    	let input1;
    	let input1_max_value;
    	let t9;
    	let span3;
    	let t10_value = Math.floor(ctx.char.props.health.base / 2) + "";
    	let t10;
    	let t11;
    	let div3;
    	let span4;
    	let t13;
    	let input2;
    	let input2_value_value;
    	let input2_max_value;
    	let t14;
    	let span5;
    	let t15_value = ctx.char.props.psyche.score + "";
    	let t15;
    	let t16;
    	let div4;
    	let span8;
    	let span6;
    	let t18;
    	let span7;
    	let t19_value = ctx.char.props.reflex.setReflex() + "";
    	let t19;
    	let t20;
    	let span11;
    	let span9;
    	let t22;
    	let span10;
    	let t23_value = ctx.char.props.block.setBlock() + "";
    	let t23;
    	let t24;
    	let span14;
    	let span12;
    	let t26;
    	let span13;
    	let t27_value = ctx.char.props.dodge.setDodge() + "";
    	let t27;
    	let t28;
    	let div5;
    	let span15;
    	let t30;
    	let span16;
    	let t31_value = ctx.char.props.actions.setActions() + "";
    	let t31;
    	let t32;
    	let div6;
    	let span17;
    	let t34;
    	let span18;
    	let t35_value = ctx.char.props.speed.setSpeed() + "";
    	let t35;
    	let t36;
    	let div7;
    	let span19;
    	let t38;
    	let span20;
    	let t39_value = ctx.char.props.luck.setLuck() + "";
    	let t39;
    	let t40;
    	let div8;
    	let span21;
    	let t42;
    	let span22;
    	let t43_value = ctx.char.props.xp.setXP() + "";
    	let t43;

    	const block = {
    		c: function create() {
    			div9 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Properties";
    			t1 = space();
    			div1 = element("div");
    			span0 = element("span");
    			span0.textContent = "Health:";
    			t3 = space();
    			input0 = element("input");
    			t4 = space();
    			span1 = element("span");
    			t5 = text(t5_value);
    			t6 = space();
    			div2 = element("div");
    			span2 = element("span");
    			span2.textContent = "Pain:";
    			t8 = space();
    			input1 = element("input");
    			t9 = space();
    			span3 = element("span");
    			t10 = text(t10_value);
    			t11 = space();
    			div3 = element("div");
    			span4 = element("span");
    			span4.textContent = "Psyche:";
    			t13 = space();
    			input2 = element("input");
    			t14 = space();
    			span5 = element("span");
    			t15 = text(t15_value);
    			t16 = space();
    			div4 = element("div");
    			span8 = element("span");
    			span6 = element("span");
    			span6.textContent = "Reflex:";
    			t18 = space();
    			span7 = element("span");
    			t19 = text(t19_value);
    			t20 = space();
    			span11 = element("span");
    			span9 = element("span");
    			span9.textContent = "Block:";
    			t22 = space();
    			span10 = element("span");
    			t23 = text(t23_value);
    			t24 = space();
    			span14 = element("span");
    			span12 = element("span");
    			span12.textContent = "Dodge:";
    			t26 = space();
    			span13 = element("span");
    			t27 = text(t27_value);
    			t28 = space();
    			div5 = element("div");
    			span15 = element("span");
    			span15.textContent = "Actions:";
    			t30 = space();
    			span16 = element("span");
    			t31 = text(t31_value);
    			t32 = space();
    			div6 = element("div");
    			span17 = element("span");
    			span17.textContent = "Speed:";
    			t34 = space();
    			span18 = element("span");
    			t35 = text(t35_value);
    			t36 = space();
    			div7 = element("div");
    			span19 = element("span");
    			span19.textContent = "Luck:";
    			t38 = space();
    			span20 = element("span");
    			t39 = text(t39_value);
    			t40 = space();
    			div8 = element("div");
    			span21 = element("span");
    			span21.textContent = "Experience:";
    			t42 = space();
    			span22 = element("span");
    			t43 = text(t43_value);
    			add_location(h2, file$7, 8, 8, 221);
    			attr_dev(div0, "class", "step-title");
    			add_location(div0, file$7, 7, 4, 188);
    			attr_dev(span0, "class", "three-column");
    			add_location(span0, file$7, 11, 8, 289);
    			attr_dev(input0, "type", "number");
    			attr_dev(input0, "class", "three-column");
    			input0.value = input0_value_value = ctx.char.props.health.setHealth();
    			attr_dev(input0, "min", "0");
    			attr_dev(input0, "max", input0_max_value = ctx.char.props.health.score);
    			add_location(input0, file$7, 12, 8, 339);
    			attr_dev(span1, "class", "three-column");
    			add_location(span1, file$7, 19, 8, 533);
    			attr_dev(div1, "class", "stat-block");
    			add_location(div1, file$7, 10, 4, 256);
    			attr_dev(span2, "class", "three-column");
    			add_location(span2, file$7, 22, 8, 641);
    			attr_dev(input1, "type", "number");
    			attr_dev(input1, "class", "three-column");
    			input1.value = "0";
    			attr_dev(input1, "min", "0");
    			attr_dev(input1, "max", input1_max_value = ctx.char.props.health.score);
    			add_location(input1, file$7, 23, 8, 689);
    			attr_dev(span3, "class", "three-column");
    			add_location(span3, file$7, 30, 8, 853);
    			attr_dev(div2, "class", "stat-block");
    			add_location(div2, file$7, 21, 4, 608);
    			attr_dev(span4, "class", "three-column");
    			add_location(span4, file$7, 33, 8, 974);
    			attr_dev(input2, "type", "number");
    			attr_dev(input2, "class", "three-column");
    			input2.value = input2_value_value = ctx.char.props.psyche.setPsyche();
    			attr_dev(input2, "min", "0");
    			attr_dev(input2, "max", input2_max_value = ctx.char.props.psyche.score);
    			add_location(input2, file$7, 34, 8, 1024);
    			attr_dev(span5, "class", "three-column");
    			add_location(span5, file$7, 41, 8, 1218);
    			attr_dev(div3, "class", "stat-block");
    			add_location(div3, file$7, 32, 4, 941);
    			attr_dev(span6, "class", "stat-label");
    			add_location(span6, file$7, 46, 12, 1367);
    			attr_dev(span7, "class", "stat-input");
    			add_location(span7, file$7, 47, 12, 1419);
    			attr_dev(span8, "class", "three-column");
    			add_location(span8, file$7, 45, 8, 1327);
    			attr_dev(span9, "class", "stat-label");
    			add_location(span9, file$7, 50, 12, 1547);
    			attr_dev(span10, "class", "stat-input");
    			add_location(span10, file$7, 51, 12, 1598);
    			attr_dev(span11, "class", "three-column");
    			add_location(span11, file$7, 49, 8, 1507);
    			attr_dev(span12, "class", "stat-label");
    			add_location(span12, file$7, 54, 12, 1724);
    			attr_dev(span13, "class", "stat-input");
    			add_location(span13, file$7, 55, 12, 1775);
    			attr_dev(span14, "class", "three-column");
    			add_location(span14, file$7, 53, 8, 1684);
    			attr_dev(div4, "class", "stat-block");
    			add_location(div4, file$7, 44, 4, 1294);
    			attr_dev(span15, "class", "stat-label");
    			add_location(span15, file$7, 60, 8, 1902);
    			attr_dev(span16, "class", "stat-input");
    			add_location(span16, file$7, 61, 8, 1951);
    			attr_dev(div5, "class", "stat-block");
    			add_location(div5, file$7, 59, 4, 1869);
    			attr_dev(span17, "class", "stat-label");
    			add_location(span17, file$7, 64, 8, 2065);
    			attr_dev(span18, "class", "stat-input");
    			add_location(span18, file$7, 65, 8, 2112);
    			attr_dev(div6, "class", "stat-block");
    			add_location(div6, file$7, 63, 4, 2032);
    			attr_dev(span19, "class", "stat-label");
    			add_location(span19, file$7, 68, 8, 2222);
    			attr_dev(span20, "class", "stat-input");
    			add_location(span20, file$7, 69, 8, 2268);
    			attr_dev(div7, "class", "stat-block");
    			add_location(div7, file$7, 67, 4, 2189);
    			attr_dev(span21, "class", "stat-label");
    			add_location(span21, file$7, 72, 8, 2376);
    			attr_dev(span22, "class", "stat-input");
    			add_location(span22, file$7, 73, 8, 2428);
    			attr_dev(div8, "class", "stat-block");
    			add_location(div8, file$7, 71, 4, 2343);
    			attr_dev(div9, "class", "step");
    			add_location(div9, file$7, 6, 0, 165);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div9, anchor);
    			append_dev(div9, div0);
    			append_dev(div0, h2);
    			append_dev(div9, t1);
    			append_dev(div9, div1);
    			append_dev(div1, span0);
    			append_dev(div1, t3);
    			append_dev(div1, input0);
    			append_dev(div1, t4);
    			append_dev(div1, span1);
    			append_dev(span1, t5);
    			append_dev(div9, t6);
    			append_dev(div9, div2);
    			append_dev(div2, span2);
    			append_dev(div2, t8);
    			append_dev(div2, input1);
    			append_dev(div2, t9);
    			append_dev(div2, span3);
    			append_dev(span3, t10);
    			append_dev(div9, t11);
    			append_dev(div9, div3);
    			append_dev(div3, span4);
    			append_dev(div3, t13);
    			append_dev(div3, input2);
    			append_dev(div3, t14);
    			append_dev(div3, span5);
    			append_dev(span5, t15);
    			append_dev(div9, t16);
    			append_dev(div9, div4);
    			append_dev(div4, span8);
    			append_dev(span8, span6);
    			append_dev(span8, t18);
    			append_dev(span8, span7);
    			append_dev(span7, t19);
    			append_dev(div4, t20);
    			append_dev(div4, span11);
    			append_dev(span11, span9);
    			append_dev(span11, t22);
    			append_dev(span11, span10);
    			append_dev(span10, t23);
    			append_dev(div4, t24);
    			append_dev(div4, span14);
    			append_dev(span14, span12);
    			append_dev(span14, t26);
    			append_dev(span14, span13);
    			append_dev(span13, t27);
    			append_dev(div9, t28);
    			append_dev(div9, div5);
    			append_dev(div5, span15);
    			append_dev(div5, t30);
    			append_dev(div5, span16);
    			append_dev(span16, t31);
    			append_dev(div9, t32);
    			append_dev(div9, div6);
    			append_dev(div6, span17);
    			append_dev(div6, t34);
    			append_dev(div6, span18);
    			append_dev(span18, t35);
    			append_dev(div9, t36);
    			append_dev(div9, div7);
    			append_dev(div7, span19);
    			append_dev(div7, t38);
    			append_dev(div7, span20);
    			append_dev(span20, t39);
    			append_dev(div9, t40);
    			append_dev(div9, div8);
    			append_dev(div8, span21);
    			append_dev(div8, t42);
    			append_dev(div8, span22);
    			append_dev(span22, t43);
    		},
    		p: function update(changed, ctx) {
    			if (changed.char && input0_value_value !== (input0_value_value = ctx.char.props.health.setHealth())) {
    				prop_dev(input0, "value", input0_value_value);
    			}

    			if (changed.char && input0_max_value !== (input0_max_value = ctx.char.props.health.score)) {
    				attr_dev(input0, "max", input0_max_value);
    			}

    			if (changed.char && t5_value !== (t5_value = ctx.char.props.health.score + "")) set_data_dev(t5, t5_value);

    			if (changed.char && input1_max_value !== (input1_max_value = ctx.char.props.health.score)) {
    				attr_dev(input1, "max", input1_max_value);
    			}

    			if (changed.char && t10_value !== (t10_value = Math.floor(ctx.char.props.health.base / 2) + "")) set_data_dev(t10, t10_value);

    			if (changed.char && input2_value_value !== (input2_value_value = ctx.char.props.psyche.setPsyche())) {
    				prop_dev(input2, "value", input2_value_value);
    			}

    			if (changed.char && input2_max_value !== (input2_max_value = ctx.char.props.psyche.score)) {
    				attr_dev(input2, "max", input2_max_value);
    			}

    			if (changed.char && t15_value !== (t15_value = ctx.char.props.psyche.score + "")) set_data_dev(t15, t15_value);
    			if (changed.char && t19_value !== (t19_value = ctx.char.props.reflex.setReflex() + "")) set_data_dev(t19, t19_value);
    			if (changed.char && t23_value !== (t23_value = ctx.char.props.block.setBlock() + "")) set_data_dev(t23, t23_value);
    			if (changed.char && t27_value !== (t27_value = ctx.char.props.dodge.setDodge() + "")) set_data_dev(t27, t27_value);
    			if (changed.char && t31_value !== (t31_value = ctx.char.props.actions.setActions() + "")) set_data_dev(t31, t31_value);
    			if (changed.char && t35_value !== (t35_value = ctx.char.props.speed.setSpeed() + "")) set_data_dev(t35, t35_value);
    			if (changed.char && t39_value !== (t39_value = ctx.char.props.luck.setLuck() + "")) set_data_dev(t39, t39_value);
    			if (changed.char && t43_value !== (t43_value = ctx.char.props.xp.setXP() + "")) set_data_dev(t43, t43_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div9);
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

    function instance$8($$self, $$props, $$invalidate) {
    	let char;

    	const unsubscribe = CharacterStore.subscribe(value => {
    		$$invalidate("char", char = value);
    	});

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("char" in $$props) $$invalidate("char", char = $$props.char);
    	};

    	return { char };
    }

    class Properties extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Properties",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    class Ability {
        constructor(name, description, max, xp, taken, notes) {
            this.name = name;
            this.description = description;
            this.max = max;
            this.xp = xp;
            this.taken = taken;
            this.notes = notes;
        }
    }

    const AbilityList = [
        // 3 XP Abilities
        new Ability(`Favorite Weapon`,      `Botch is only a Fail with this one weapon.`,   1, 3, 0, ``),
        new Ability(`Hyper Immunity`,       `+1 to resist Diseases.`,                       3, 3, 0, ``),
        new Ability(`Pack Mentality`,       `+1 ATK at same target a Comrade ATKs.`,        1, 3, 0, ``),
        new Ability(`Quick Reload`,         `Free Reload once per rnd.`,                    1, 3, 0, ``),
        new Ability(`Specialize*`,          `+1 to a Skill Specialty.`,                     1, 3, 0, ``),
        new Ability(`Weapon Training*`,     `+1 ATK for a specific weapon.`,                1, 3, 0, ``),
        // 6 XP Abilities
        new Ability(`Efficient Work*`,      `[Time / 2] for a Skill (minimum 1 action).`,   1, 6, 0, ``),
        new Ability(`Fast Draw`,            `Free item draw once per rnd.`,                 1, 6, 0, ``),
        new Ability(`Fleet Footed`,         `+1 Speed.`,                                    3, 6, 0, ``),
        new Ability(`Multilingual*`,        `Learn a different form of communication.`,     9, 6, 0, ``),
        new Ability(`Practice*`,            `+1 to a Skill (up to the parent Trait).`,      1, 6, 0, ``),
        // OPEN SLOT FOR NEW ABILITY
        // 9 XP Abilities
        new Ability(`Danger Sense`,         `+1 Reflex.`,                                   1, 9, 0, ``),
        new Ability(`Discipline`,           `Ignore 1 Pain penalty.`,                       3, 9, 0, ``),
        new Ability(`Fortunate`,            `+1 Luck.`,                                     1, 9, 0, ``),
        new Ability(`Free Running`,         `Climb at [Speed] for 2AP.`,                    1, 9, 0, ``),
        new Ability(`Unorthodox*`,          `Pick a new parent Trait for a Skill.`,         1, 9, 0, ``),
        // OPEN SLOT FOR NEW ABILITY
        // 12 XP Abilities
        new Ability(`Fencing`,              `Free Block roll once per rnd.`,                1, 12, 0, ``),
        new Ability(`Side-step`,            `Free Dodge roll once per rnd.`,                1, 12, 0, ``),
        new Ability(`Wrestling`,            `Free Grab roll once per rnd.`,                 1, 12, 0, ``),
        // 15 XP Abilities
        new Ability(`Firm Grip`,            `Use 2h weapons in 1h, up to Size 3.`,          1, 15, 0, ``),
        new Ability(`Hard Headed`,          `Ignore Stun from Head DMG.`,                   1, 15, 0, ``),
        new Ability(`Powerful Strike*`,     `+1 DMG for a specific Melee weapon.`,          1, 15, 0, ``),
        // 18 XP Abilities
        new Ability(`Assassin`,             `+3 DMG to ATKs from Concealment.`,             1, 18, 0, ``),
        new Ability(`Vehicle Operation*`,   `Proficiently operate a class of vehicle.`,     1, 18, 0, ``),
        // 24 XP Abilities
        new Ability(`Ambidextrous`,         `Off-hand penalty is -1 instead of -3.`,        1, 24, 0, ``),
        new Ability(`Tough`,                `+1 Health.`,                                   3, 24, 0, ``),
        // 30 XP Abilities
        new Ability(`Self Improvement*`,    `+1 to a Trait (max 6).`,                       3, 30, 0, ``),
        new Ability(`Second Chance`,        `Spend this Ability to avoid Death once.`,      9, 30, 0, ``)
    ];

    /* src/components/creator/Abilities.svelte generated by Svelte v3.15.0 */
    const file$8 = "src/components/creator/Abilities.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.ability = list[i];
    	child_ctx.each_value = list;
    	child_ctx.index = i;
    	return child_ctx;
    }

    // (32:16) {#if AbilityList[index-1] != undefined && AbilityList[index].xp != AbilityList[index-1].xp}
    function create_if_block$2(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "separator svelte-maszxs");
    			add_location(div, file$8, 32, 20, 1100);
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
    		source: "(32:16) {#if AbilityList[index-1] != undefined && AbilityList[index].xp != AbilityList[index-1].xp}",
    		ctx
    	});

    	return block;
    }

    // (31:12) {#each AbilityList as ability, index}
    function create_each_block$2(ctx) {
    	let t0;
    	let div5;
    	let div0;
    	let t1_value = ctx.ability.name + "";
    	let t1;
    	let t2;
    	let div1;
    	let t3_value = ctx.ability.description + "";
    	let t3;
    	let t4;
    	let div2;
    	let t5_value = ctx.ability.max + "";
    	let t5;
    	let t6;
    	let div3;
    	let t7_value = ctx.ability.xp + "";
    	let t7;
    	let t8;
    	let div4;
    	let input;
    	let input_max_value;
    	let input_updating = false;
    	let t9;
    	let dispose;
    	let if_block = AbilityList[ctx.index - 1] != undefined && AbilityList[ctx.index].xp != AbilityList[ctx.index - 1].xp && create_if_block$2(ctx);

    	function input_input_handler() {
    		input_updating = true;
    		ctx.input_input_handler.call(input, ctx);
    	}

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			t0 = space();
    			div5 = element("div");
    			div0 = element("div");
    			t1 = text(t1_value);
    			t2 = space();
    			div1 = element("div");
    			t3 = text(t3_value);
    			t4 = space();
    			div2 = element("div");
    			t5 = text(t5_value);
    			t6 = space();
    			div3 = element("div");
    			t7 = text(t7_value);
    			t8 = space();
    			div4 = element("div");
    			input = element("input");
    			t9 = space();
    			attr_dev(div0, "class", "m-col svelte-maszxs");
    			add_location(div0, file$8, 35, 20, 1214);
    			attr_dev(div1, "class", "l-col svelte-maszxs");
    			add_location(div1, file$8, 36, 20, 1274);
    			attr_dev(div2, "class", "s-col svelte-maszxs");
    			add_location(div2, file$8, 37, 20, 1341);
    			attr_dev(div3, "class", "s-col svelte-maszxs");
    			add_location(div3, file$8, 38, 20, 1400);
    			attr_dev(input, "type", "number");
    			attr_dev(input, "class", "taken-number");
    			attr_dev(input, "min", "0");
    			attr_dev(input, "max", input_max_value = ctx.ability.max);
    			add_location(input, file$8, 40, 24, 1502);
    			attr_dev(div4, "class", "s-col svelte-maszxs");
    			add_location(div4, file$8, 39, 20, 1458);
    			attr_dev(div5, "class", "ability-row svelte-maszxs");
    			add_location(div5, file$8, 34, 16, 1168);

    			dispose = [
    				listen_dev(input, "input", input_input_handler),
    				listen_dev(input, "input", ctx.modifyAbilities, false, false, false)
    			];
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div0);
    			append_dev(div0, t1);
    			append_dev(div5, t2);
    			append_dev(div5, div1);
    			append_dev(div1, t3);
    			append_dev(div5, t4);
    			append_dev(div5, div2);
    			append_dev(div2, t5);
    			append_dev(div5, t6);
    			append_dev(div5, div3);
    			append_dev(div3, t7);
    			append_dev(div5, t8);
    			append_dev(div5, div4);
    			append_dev(div4, input);
    			set_input_value(input, ctx.ability.taken);
    			append_dev(div5, t9);
    		},
    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;

    			if (AbilityList[ctx.index - 1] != undefined && AbilityList[ctx.index].xp != AbilityList[ctx.index - 1].xp) {
    				if (!if_block) {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					if_block.m(t0.parentNode, t0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (changed.AbilityList && t1_value !== (t1_value = ctx.ability.name + "")) set_data_dev(t1, t1_value);
    			if (changed.AbilityList && t3_value !== (t3_value = ctx.ability.description + "")) set_data_dev(t3, t3_value);
    			if (changed.AbilityList && t5_value !== (t5_value = ctx.ability.max + "")) set_data_dev(t5, t5_value);
    			if (changed.AbilityList && t7_value !== (t7_value = ctx.ability.xp + "")) set_data_dev(t7, t7_value);

    			if (changed.AbilityList && input_max_value !== (input_max_value = ctx.ability.max)) {
    				attr_dev(input, "max", input_max_value);
    			}

    			if (!input_updating && changed.AbilityList) {
    				set_input_value(input, ctx.ability.taken);
    			}

    			input_updating = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div5);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(31:12) {#each AbilityList as ability, index}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let div9;
    	let div0;
    	let h2;
    	let t1;
    	let div8;
    	let div7;
    	let div6;
    	let div1;
    	let t3;
    	let div2;
    	let t5;
    	let div3;
    	let t7;
    	let div4;
    	let t9;
    	let div5;
    	let t11;
    	let each_value = AbilityList;
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div9 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Abilities";
    			t1 = space();
    			div8 = element("div");
    			div7 = element("div");
    			div6 = element("div");
    			div1 = element("div");
    			div1.textContent = "Name";
    			t3 = space();
    			div2 = element("div");
    			div2.textContent = "Description";
    			t5 = space();
    			div3 = element("div");
    			div3.textContent = "Max";
    			t7 = space();
    			div4 = element("div");
    			div4.textContent = "XP";
    			t9 = space();
    			div5 = element("div");
    			div5.textContent = "Taken";
    			t11 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(h2, file$8, 19, 8, 512);
    			attr_dev(div0, "class", "step-title");
    			add_location(div0, file$8, 18, 4, 479);
    			attr_dev(div1, "class", "m-col svelte-maszxs");
    			add_location(div1, file$8, 24, 16, 684);
    			attr_dev(div2, "class", "l-col svelte-maszxs");
    			add_location(div2, file$8, 25, 16, 730);
    			attr_dev(div3, "class", "s-col svelte-maszxs");
    			add_location(div3, file$8, 26, 16, 783);
    			attr_dev(div4, "class", "s-col svelte-maszxs");
    			add_location(div4, file$8, 27, 16, 828);
    			attr_dev(div5, "class", "s-col svelte-maszxs");
    			add_location(div5, file$8, 28, 16, 872);
    			attr_dev(div6, "class", "ability-row header-row separator svelte-maszxs");
    			add_location(div6, file$8, 23, 12, 621);
    			attr_dev(div7, "class", "abilities-table svelte-maszxs");
    			add_location(div7, file$8, 22, 8, 579);
    			attr_dev(div8, "class", "stat-block");
    			add_location(div8, file$8, 21, 4, 546);
    			attr_dev(div9, "class", "step");
    			add_location(div9, file$8, 17, 0, 456);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div9, anchor);
    			append_dev(div9, div0);
    			append_dev(div0, h2);
    			append_dev(div9, t1);
    			append_dev(div9, div8);
    			append_dev(div8, div7);
    			append_dev(div7, div6);
    			append_dev(div6, div1);
    			append_dev(div6, t3);
    			append_dev(div6, div2);
    			append_dev(div6, t5);
    			append_dev(div6, div3);
    			append_dev(div6, t7);
    			append_dev(div6, div4);
    			append_dev(div6, t9);
    			append_dev(div6, div5);
    			append_dev(div7, t11);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div7, null);
    			}
    		},
    		p: function update(changed, ctx) {
    			if (changed.AbilityList || changed.modifyAbilities || changed.undefined) {
    				each_value = AbilityList;
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div7, null);
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
    			if (detaching) detach_dev(div9);
    			destroy_each(each_blocks, detaching);
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

    function instance$9($$self, $$props, $$invalidate) {
    	let char;

    	const unsubscribe = CharacterStore.subscribe(value => {
    		char = value;
    	});

    	function modifyAbilities() {
    		char.abilities = [];

    		AbilityList.forEach(function (ability) {
    			if (ability.taken > 0) {
    				char.abilities.push(ability);
    			}
    		});
    	}

    	function input_input_handler({ ability }) {
    		ability.taken = to_number(this.value);
    		$$invalidate("AbilityList", AbilityList);
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("char" in $$props) char = $$props.char;
    	};

    	return { modifyAbilities, input_input_handler };
    }

    class Abilities extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Abilities",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    const d6 = () => { return Math.ceil(Math.random()*6) };

    const d6Roll = () => {
        let roll = d6();
        let result = roll;
        if (roll == 6) {
            while (roll == 6) {
                console.log('EXPLODE!');
                roll = d6();
                result += roll;
            }
        }
        if (roll == 1) {
            roll = d6();
            if (roll == 1) {
                console.log('BOTCH!');
                return -666
            }
        }
        return result
    };

    class Armor {
        constructor(name, dr, loc, notes, sz) {
            this.name = name;
            this.dr = dr;
            this.loc = loc;
            this.notes = notes;
            this.sz = sz;
        }
    }

    const ArmorList = [
        new Armor(`Athletic Helmet`,    1, `Head`,              [],                         2),
        new Armor(`Athletic Pads`,      1, `Torso`,             [],                         2),
        new Armor(`Combat Helmet`,      3, `Head`,              [`Camo`],                   2),
        new Armor(`Coveralls`,          1, `Arms, Torso, Legs`, [`Camo`, `CR`],             3),
        new Armor(`Firefighter Suit`,   2, `Full Body`,         [`CR`, `FR`, `Mask`],       5),
        new Armor(`Flak Jacket`,        2, `Torso`,             [`Camo`],                   4),
        new Armor(`Ghillie Suit`,       1, `Full Body`,         [`Camo`, `CR`],             4),
        new Armor(`Hiking Boots`,       1, `Legs`,              [`CR`, `FR`],               2),
        new Armor(`Kevlar Vest`,        3, `Torso`,             [`CR`, `FR`],               4),
        new Armor(`Leather Jacket`,     1, `Arms, Torso`,       [],                         2),
        new Armor(`Motorcycle Helmet`,  1, `Head`,              [`FR`, `Mask`],             2),
        new Armor(`Hazmat Suit`,        0, `Full Body`,         [`Mask`, `Impermeable`],    2),
        new Armor(`Plate Carrier`,      4, `Torso`,             [`Camo`, `CR`, `FR`],       4),
        new Armor(`Winter Coat`,        1, `Arms, Torso`,       [`CR`],                     2),
        new Armor(`Work Gloves`,        1, `Arms`,              [`FR`],                     1)
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

    /* src/components/creator/Gear.svelte generated by Svelte v3.15.0 */
    const file$9 = "src/components/creator/Gear.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.armor = list[i];
    	return child_ctx;
    }

    // (28:4) {#each ArmorList as armor}
    function create_each_block$3(ctx) {
    	let div;
    	let t_value = ctx.armor.type + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			add_location(div, file$9, 28, 8, 1064);
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
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(28:4) {#each ArmorList as armor}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let button;
    	let t1;
    	let div;
    	let dispose;
    	let each_value = ArmorList;
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "ROLL IT";
    			t1 = space();
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(button, file$9, 25, 0, 978);
    			add_location(div, file$9, 26, 0, 1019);
    			dispose = listen_dev(button, "click", roll, false, false, false);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(changed, ctx) {
    			if (changed.ArmorList) {
    				each_value = ArmorList;
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
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
    			if (detaching) detach_dev(button);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    			dispose();
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

    function roll() {
    	console.log(d6Roll());
    }

    function instance$a($$self) {
    	let char;

    	const unsubscribe = CharacterStore.subscribe(value => {
    		char = value;
    	});

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("char" in $$props) char = $$props.char;
    	};

    	return {};
    }

    class Gear extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Gear",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src/pages/Creator.svelte generated by Svelte v3.15.0 */
    const file$a = "src/pages/Creator.svelte";

    function create_fragment$c(ctx) {
    	let div;
    	let t;
    	let current;
    	var switch_value = ctx.selected;

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props());
    	}

    	const backnextbuttons = new BackNextButtons({
    			props: { step: ctx.step },
    			$$inline: true
    		});

    	backnextbuttons.$on("message", ctx.nav);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			t = space();
    			create_component(backnextbuttons.$$.fragment);
    			attr_dev(div, "class", "svelte-1sye5nq");
    			add_location(div, file$a, 22, 0, 817);
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
    			mount_component(backnextbuttons, target, anchor);
    			current = true;
    		},
    		p: function update(changed, ctx) {
    			if (switch_value !== (switch_value = ctx.selected)) {
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

    			const backnextbuttons_changes = {};
    			if (changed.step) backnextbuttons_changes.step = ctx.step;
    			backnextbuttons.$set(backnextbuttons_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			transition_in(backnextbuttons.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			transition_out(backnextbuttons.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (switch_instance) destroy_component(switch_instance);
    			if (detaching) detach_dev(t);
    			destroy_component(backnextbuttons, detaching);
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

    function instance$b($$self, $$props, $$invalidate) {
    	let step = 0;
    	const options = [Description, Traits, Skills, Properties, Abilities, Gear];
    	let selected = options[step];

    	function nav(event) {
    		$$invalidate("step", step = event.detail.number);

    		if (step == options.length || step < 0) {
    			router.Home();
    		} else {
    			$$invalidate("selected", selected = options[step]);
    		}
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("step" in $$props) $$invalidate("step", step = $$props.step);
    		if ("selected" in $$props) $$invalidate("selected", selected = $$props.selected);
    	};

    	return { step, selected, nav };
    }

    class Creator extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Creator",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    function HideShow(x, y) {
        x.visible = !x.visible;
        return y
    }

    /* src/layout/RefList.svelte generated by Svelte v3.15.0 */
    const file$b = "src/layout/RefList.svelte";

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.s = list[i];
    	return child_ctx;
    }

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.r = list[i];
    	return child_ctx;
    }

    // (13:12) {#if r.visible}
    function create_if_block$3(ctx) {
    	let div;
    	let raw_value = ctx.r.notes + "";
    	let t0;
    	let t1;
    	let if_block1_anchor;
    	let current;
    	let if_block0 = ctx.r.table && create_if_block_2(ctx);
    	let if_block1 = ctx.r.subrules && create_if_block_1$1(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = space();
    			if (if_block0) if_block0.c();
    			t1 = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    			attr_dev(div, "class", "notes svelte-1v05fh1");
    			add_location(div, file$b, 13, 16, 339);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			div.innerHTML = raw_value;
    			insert_dev(target, t0, anchor);
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;
    		},
    		p: function update(changed, ctx) {
    			if ((!current || changed.list) && raw_value !== (raw_value = ctx.r.notes + "")) div.innerHTML = raw_value;
    			if (ctx.r.table) {
    				if (if_block0) {
    					if_block0.p(changed, ctx);
    					transition_in(if_block0, 1);
    				} else {
    					if_block0 = create_if_block_2(ctx);
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

    			if (ctx.r.subrules) {
    				if (if_block1) {
    					if_block1.p(changed, ctx);
    				} else {
    					if_block1 = create_if_block_1$1(ctx);
    					if_block1.c();
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t0);
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(13:12) {#if r.visible}",
    		ctx
    	});

    	return block;
    }

    // (15:16) {#if r.table}
    function create_if_block_2(ctx) {
    	let div0;
    	let t;
    	let div1;
    	let current;
    	var switch_value = ctx.r.table;

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
    			attr_dev(div0, "class", "separator svelte-1v05fh1");
    			add_location(div0, file$b, 15, 20, 430);
    			attr_dev(div1, "class", "table");
    			add_location(div1, file$b, 16, 20, 475);
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
    		p: function update(changed, ctx) {
    			if (switch_value !== (switch_value = ctx.r.table)) {
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
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(15:16) {#if r.table}",
    		ctx
    	});

    	return block;
    }

    // (19:16) {#if r.subrules}
    function create_if_block_1$1(ctx) {
    	let ul;
    	let each_value_1 = ctx.r.subrules;
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(ul, "class", "sub-ul svelte-1v05fh1");
    			add_location(ul, file$b, 19, 20, 610);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}
    		},
    		p: function update(changed, ctx) {
    			if (changed.list) {
    				each_value_1 = ctx.r.subrules;
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block_1$1(child_ctx);
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
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(19:16) {#if r.subrules}",
    		ctx
    	});

    	return block;
    }

    // (21:24) {#each r.subrules as s}
    function create_each_block_1$1(ctx) {
    	let div0;
    	let t0;
    	let li;
    	let div2;
    	let span;
    	let t1_value = ctx.s.name + "";
    	let t1;
    	let t2;
    	let div1;
    	let raw_value = ctx.s.notes + "";
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
    			attr_dev(div0, "class", "separator svelte-1v05fh1");
    			add_location(div0, file$b, 21, 28, 706);
    			attr_dev(span, "class", "sub-name svelte-1v05fh1");
    			add_location(span, file$b, 24, 36, 869);
    			attr_dev(div1, "class", "sub-notes");
    			add_location(div1, file$b, 25, 36, 944);
    			attr_dev(div2, "class", "sub-box");
    			add_location(div2, file$b, 23, 32, 811);
    			attr_dev(li, "class", "sub-li");
    			add_location(li, file$b, 22, 28, 759);
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
    		p: function update(changed, ctx) {
    			if (changed.list && t1_value !== (t1_value = ctx.s.name + "")) set_data_dev(t1, t1_value);
    			if (changed.list && raw_value !== (raw_value = ctx.s.notes + "")) div1.innerHTML = raw_value;		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$1.name,
    		type: "each",
    		source: "(21:24) {#each r.subrules as s}",
    		ctx
    	});

    	return block;
    }

    // (10:4) {#each list.rules as r}
    function create_each_block$4(ctx) {
    	let div0;
    	let span;
    	let t0_value = ctx.r.name + "";
    	let t0;
    	let t1;
    	let t2;
    	let div1;
    	let current;
    	let dispose;
    	let if_block = ctx.r.visible && create_if_block$3(ctx);

    	function click_handler(...args) {
    		return ctx.click_handler(ctx, ...args);
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
    			attr_dev(span, "class", "name svelte-1v05fh1");
    			add_location(span, file$b, 11, 12, 260);
    			attr_dev(div0, "class", "box svelte-1v05fh1");
    			add_location(div0, file$b, 10, 8, 188);
    			attr_dev(div1, "class", "separator svelte-1v05fh1");
    			add_location(div1, file$b, 33, 8, 1187);
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
    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;
    			if ((!current || changed.list) && t0_value !== (t0_value = ctx.r.name + "")) set_data_dev(t0, t0_value);

    			if (ctx.r.visible) {
    				if (if_block) {
    					if_block.p(changed, ctx);
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
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(10:4) {#each list.rules as r}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let div1;
    	let h2;
    	let t0_value = ctx.list.name + "";
    	let t0;
    	let t1;
    	let div0;
    	let t2;
    	let current;
    	let each_value = ctx.list.rules;
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			h2 = element("h2");
    			t0 = text(t0_value);
    			t1 = space();
    			div0 = element("div");
    			t2 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(h2, file$b, 7, 4, 102);
    			attr_dev(div0, "class", "separator svelte-1v05fh1");
    			add_location(div0, file$b, 8, 4, 127);
    			attr_dev(div1, "class", "page");
    			add_location(div1, file$b, 6, 0, 79);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, h2);
    			append_dev(h2, t0);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			append_dev(div1, t2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			current = true;
    		},
    		p: function update(changed, ctx) {
    			if ((!current || changed.list) && t0_value !== (t0_value = ctx.list.name + "")) set_data_dev(t0, t0_value);

    			if (changed.list || changed.HideShow) {
    				each_value = ctx.list.rules;
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
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
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { list } = $$props;
    	const writable_props = ["list"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<RefList> was created with unknown prop '${key}'`);
    	});

    	const click_handler = ({ r }) => $$invalidate("list", list = HideShow(r, list));

    	$$self.$set = $$props => {
    		if ("list" in $$props) $$invalidate("list", list = $$props.list);
    	};

    	$$self.$capture_state = () => {
    		return { list };
    	};

    	$$self.$inject_state = $$props => {
    		if ("list" in $$props) $$invalidate("list", list = $$props.list);
    	};

    	return { list, click_handler };
    }

    class RefList extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$d, safe_not_equal, { list: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RefList",
    			options,
    			id: create_fragment$d.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || ({});

    		if (ctx.list === undefined && !("list" in props)) {
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

    class Rule {
        constructor(name, notes, subrules=[], table='', visible=false) {
            this.name = name;
            this.notes = notes;
            this.subrules = subrules;
            this.table = table;
            this.visible = visible;
        }
    }

    const Prepare = new Rule(
        `Prepare`, 
        `You may spend AP on your turn to declare and hold a specific Action to occur on a later turn to preempt a triggering event that you describe. Prepared Actions resolve before other Actions in the order that they are triggered. You may choose to abandon a Prepared Action at any time prior to the turn on which it triggers, at which point you are committed to taking the Prepared Action. If you are still waiting with a Prepared Action on your next turn, the AP you already spent on the Prepared Action does not refresh, but you can continue holding that Prepared Action.`
    );

    const Actions = new Rule(
        `Actions`, 
        `Perform Actions by spending Action Points. Your maximum AP is your [(A + B) / 2]. AP refills at the start of your turn. Unless otherwise noted, all Actions cost 1AP. The only Actions you can take outside of your turn are Prepared Actions or Defense rolls.`, 
        [Prepare]
    );

    const Attack = new Rule(
        `Attack`, 
        `There are MATKs (Melee) and RATKs (Ranged). Roll [d6 + MATK or RATK] vs Defense (DEF). Rolling a 6 on the die is an Explosion, which is re-rolled and added cumulatively to the ATK total. Deal bonus DMG = [ATK - DEF] up to your Melee or Ranged score.`
    );

    const Communication = new Rule(
        `Communication`, 
        `You can speak or shout up to 6 words per round.`
    );

    const DamageReduction = new Rule(
        `Damage Reduction`, 
        `DR reduces DMG. Armor is reduced by -1 DR after taking DMG that exceeds its DR.`
    );

    const FireDamage = new Rule(
        `Fire Damage`, 
        `Whenever you take FDMG, 1 Wound is permanent. Only Fire-Resistant (FR) Armor reduces FDMG.`
    );

    const Pain = new Rule(
        `Pain`, 
        `Wounds (and a few other effects) cause Pain which is a -1 penalty to all rolls and Speed. Pain fades as Wounds heal. You fall Prone if your Speed drops to 0 from Pain. You go unconscious if Pain = [C + D].`
    );

    const Damage = new Rule(
        `Damage`, 
        `Damage causes Wounds, which could eventually kill you. Successful ATKs do DMG = [(ATK - DEF) + Weapon DMG]. All Wounds cause Pain penalties.`, 
        [DamageReduction, FireDamage, Pain]
    );

    const Reflex = new Rule(
        `Reflex`, 
        `[Perception / 2]. Default DEF if you are rendered Defenseless or get Attacked when you are out of AP. Reflex is never rolled. It is a static Difficulty for enemy ATKs.`
    );

    const Defense = new Rule(
        `Defense`, 
        `1AP to defend against an ATK with Block [d6 + Melee] or Dodge [d6 + Acrobatics]. A Botch means you fall Prone if Dodging or drop your weapon if Blocking. If you are unaware or unable to avoid the Attack, you are Defenseless and must use Reflex for DEF.`, 
        [Reflex]
    );

    const Bleeding = new Rule(
        `Bleeding`, 
        `1 DMG per min caused by your HP dropping to half or some other effect. Roll [(Medicine or C) vs DMG] to stop.`
    );

    const Recovery = new Rule(
        `Recovery`, 
        `After a day of rest, roll [C vs total Wounds] to heal 1HP. On a Fail, take 1 DMG from infection.`
    );

    const Health = new Rule(
        `Health`, 
        `[C x 3]. This is a measure of how many Wounds you can withstand. Damage causes Wounds. You start Bleeding when you take Wounds = [Health / 2] and you die when you take Wounds = Health.`, 
        [Bleeding, Recovery]
    );

    const Movement = new Rule(
        `Movement`, 
        `Move once per rnd up to your Speed [A + C], or spend 2AP to Run at [Speed x 2]. You may drop Prone as part of your Movement. Standing up costs 1AP.`
    );

    const Time = new Rule(
        `Time`, 
        `Combat time occurs in 3-second “rounds” (rnds). Each Player gets a turn each rnd. Either the GN decides or rolls [A vs A] to determine who goes first. At the end of each turn, the Player chooses who will go next among those who have not had a turn yet this rnd. At the end of the rnd the last Player to act decides who will start the next round.`
    );

    const Burning = new Rule(
        `Burning`, 
        `If the Vehicle is at 0DR, it bursts into flames doing 1FDMG per rnd to all Occupants. It continues to burn for 1 minute per gallon of Fuel.`
    );

    const Conditions = new Rule(
        `Conditions`, 
        `-1 DR and -1 Handling. Roll [Drive 9#] to maintain control upon getting a Condition, otherwise the vehicle Wrecks.`
    );

    const Occupants = new Rule(
        `Occupants`, 
        `Passengers in a moving vehicle are Unstable. A vehicle provides Cover from RATKs with its DR.`
    );

    const Pedestrians = new Rule(
        `Pedestrians`, 
        `Hitting a pedestrian does DMG = [vehicle DR]. -1 DR after hitting pedestrians = [vehicle DR].`
    );

    const Tires = new Rule(
        `Tires`, 
        `Roll [-3 ATK vs Drive(Stunt)] to destroy a tire. If the tire is destroyed, the driver must roll [Drive 9#] or Wreck. If a front tire gets destroyed, the vehicle Wrecks automatically.`
    );

    const Wreck = new Rule(
        `Wreck`, 
        `The vehicle comes to a violent stop suddenly this rnd. Occupants take [d6 DMG per 30yds of Speed] and are ejected from the vehicle, unless they are wearing seat belts, in which case the DMG is halved and they remain in their seats.`
    );

    const Vehicles = new Rule(
        `Vehicles`, 
        `Roll [Drive(Ram) vs Drive(Stunt)] to hit an enemy vehicle. If [loser’s DR <= winner’s DR], or if a vehicle takes [DMG > DR], the vehicle gets a Condition. 0 DR disables a vehicle. A Botch is a Wreck.`, 
        [Conditions, Occupants, Pedestrians, Tires, Wreck, Burning]
    );

    const Combat = [
        Time,
        Communication,
        Actions,
        Movement,
        Attack,
        Defense,
        Health,
        Damage,
        Vehicles
    ];

    const Block = new Rule(
        `Block`, 
        `Roll [Melee vs MATK or RATK when using a Shield] for DEF.`
    );

    const Dodge = new Rule(
        `Dodge`, 
        `Roll [Acrobatics vs MATK or RATK (Throw)] for DEF.`
    );

    const Duck = new Rule(
        `Duck`, 
        `Roll [Dodge vs ATK] to move up to your Speed to get behind Cover. If the ATK still hits, the Cover Material’s DR reduces the DMG. You will keep the benefits of Cover as long as it remains between you and the opponent.`
    );

    const FullDefense = new Rule(
        `Full Defense`, 
        `Declare Full Defense on your turn and forego all ATKs to get a bonus = [Reflex] to all Block and Dodge rolls until your next turn.`
    );

    const Hide = new Rule(
        `Hide`, 
        `Roll [Stealth vs Perception] to be Concealed. 0 Speed. +3 if Prone.`
    );

    const Protect = new Rule(
        `Protect`, 
        `Become the new target of all ATKs targeting someone within 1yd of you for 1rnd. You may still Block, but you cannot Dodge the ATK.`
    );

    const Sneak = new Rule(
        `Sneak`, 
        `Roll [Stealth vs Perception] to move Concealed at [Speed / 2].`
    );

    const DefensiveManeuvers = [
        Block,
        Dodge,
        Duck,
        FullDefense,
        Hide,
        Protect,
        Sneak
    ];

    const Aim = new Rule(
        `Aim`, 
        `Spend AP to get an equal bonus to one ATK.`
    );

    /* src/rules/maneuvers/CalledShotTable.svelte generated by Svelte v3.15.0 */

    const file$c = "src/rules/maneuvers/CalledShotTable.svelte";

    function create_fragment$e(ctx) {
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
    			add_location(th0, file$c, 2, 8, 25);
    			add_location(th1, file$c, 3, 8, 51);
    			add_location(th2, file$c, 4, 8, 72);
    			add_location(th3, file$c, 5, 8, 93);
    			add_location(tr0, file$c, 1, 4, 12);
    			add_location(td0, file$c, 8, 8, 135);
    			add_location(td1, file$c, 9, 8, 157);
    			add_location(td2, file$c, 10, 8, 177);
    			add_location(td3, file$c, 11, 8, 197);
    			add_location(tr1, file$c, 7, 4, 122);
    			add_location(td4, file$c, 14, 8, 247);
    			add_location(td5, file$c, 15, 8, 268);
    			add_location(td6, file$c, 16, 8, 288);
    			add_location(td7, file$c, 17, 8, 308);
    			add_location(tr2, file$c, 13, 4, 234);
    			add_location(td8, file$c, 20, 8, 367);
    			add_location(td9, file$c, 21, 8, 388);
    			add_location(td10, file$c, 22, 8, 408);
    			add_location(td11, file$c, 23, 8, 428);
    			add_location(tr3, file$c, 19, 4, 354);
    			add_location(table, file$c, 0, 0, 0);
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
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class CalledShotTable extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$e, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CalledShotTable",
    			options,
    			id: create_fragment$e.name
    		});
    	}
    }

    const CalledShot = new Rule(
        `Called Shot`, 
        `ATKs target the Torso by default. A Called Shot is an ATK targeting the Head, Arms, or Legs with added effects based on Location.`,
        [],
        CalledShotTable
    );

    const Disarm = new Rule(
        `Disarm`, 
        `Roll [MATK vs Melee (+ C if the weapon is used two-handed)]. The weapon flies d6 yds away. Attacker gets the weapon if Unarmed.`
    );

    const Hold = new Rule(
        `Hold`,
        `Block ATKs using a Grabbed enemy as a Shield.`
    );

    const Tackle = new Rule(
        `Tackle`,
        `Roll [C vs C] to go Prone with Grabbed enemy.`
    );

    const Throw = new Rule(
        `Throw`,
        `Throw a Grabbed enemy up to [C] yds and takes Falling DMG. Prone.`
    );

    const Grab = new Rule(
        `Grab`, 
        `0DMG MATK to render an enemy Defenseless. You must have a free hand to Grab. Spend 1AP per rnd to retain Grab. Roll [(Acrobatics or Melee) vs Grab] to escape.`,
        [Hold, Tackle, Throw]
    );

    const Push = new Rule(
        `Push`,
        `Roll [C vs C] to push an enemy up to [C] yds. 0DMG.`
    );

    const Reload = new Rule(
        `Reload`,
        `Replace a magazine or a single piece of ammunition (depending on the weapon) in a Ranged weapon.`
    );

    const Shove = new Rule(
        `Shove`,
        `Roll [MATK vs C] to shove an enemy up to [C] yds away. 0DMG.`
    );

    const Trip = new Rule(
        `Trip`,
        `Roll [MATK vs A] to knock an enemy Prone. 1DMG.`
    );

    const OffensiveManeuvers = [
        Aim,
        CalledShot,
        Disarm,
        Grab,
        Push,
        Reload,
        Shove,
        Trip
    ];

    const Distract = new Rule(
        `Distract`,
        `Roll [Perform vs Perception]. Stun target for 1rnd.`
    );

    const Encourage = new Rule(
        `Encourage`,
        `Roll [Leadership vs groups’ total D scores]. The group gets a bonus = [your D] for one specific roll each. A Botch is -1 to all rolls.`
    );

    const Interrogate = new Rule(
        `Interrogate`,
        `Roll [Leadership vs D] to get information out of a subject who does not want to help, but without resorting to violence. Each roll takes d6 mins of conversation. If the interrogator Succeeds, the subject gives up a fact (wittingly or unwittingly). If the subject Succeeds, they become hardened against further questioning, imposing a -1 penalty on subsequent attempts. After Fails = [D], the interrogator gives up or the subject cracks and tells everything they know.`
    );

    const Negotiate = new Rule(
        `Negotiate`,
        `If opposed parties are willing to talk out their differences, each side start with a list of demands. Roll [Socialize vs Socialize] once per demand. Attitude and situational modifiers should be applied by the GN. Success means you get your demand and the opposed negotiator concedes. Either side can choose to concede a demand without rolling. Some desires may be non-negotiable.`
    );

    const Recruit = new Rule(
        `Recruit`,
        `Roll [Socialize vs D] to convince someone to join your side. If they are someone’s follower, roll [Leadership vs Leadership]. Attitude and situational modifiers should be applied by the GN.`
    );

    const Taunt = new Rule(
        `Taunt`,
        `Roll [Leadership vs D]. Provoke the enemy into exclusively attacking you. The degree of Success is a penalty to the loser’s next roll. The enemy is Stunned for 1rnd if [penalty > enemy’s D].`
    );

    const Torture = new Rule(
        `Torture`,
        `Roll [Medicine vs prisoner’s C] once per hour to cause a captive d6 Pain to soften their resolve without killing them. Failure does d6 DMG to the captive. Roll [D vs D] at the end of each hour (Pain penalty applies). Failure causes -1 Psyche loss. At 0 Psyche, either the torturer cannot do it anymore and gives up, or the captive is broken and can be controlled with Demeanor Skills automatically until freed.`
    );

    const SocialManeuvers = [
        Distract,
        Encourage,
        Interrogate,
        Negotiate,
        Recruit,
        Taunt,
        Torture
    ];

    const Maneuvers = DefensiveManeuvers.concat(OffensiveManeuvers).concat(SocialManeuvers);

    const Burning$1 = new Rule(
        `Burning`, 
        `1 FDMG per rnd. Spend 1AP to stop, drop Prone, and roll Survival 9# to put out the flames.`
    );

    const Chase = new Rule(
        `Chase`, 
        `Roll opposed [(Acrobatics, Athletics, Drive, or Tame) + Speed] each rnd. Chase ends when one side gets 3 Successes over the other.`
    );

    const Concealed = new Rule(
        `Concealed`, 
        `If an opponent knows your position but cannot see you, their ATK is at a -6 penalty. Blasts are unaffected. Targets are Defenseless against ATKs from Concealed opponents.`
    );

    /* src/rules/situations/CoverTable.svelte generated by Svelte v3.15.0 */

    const file$d = "src/rules/situations/CoverTable.svelte";

    function create_fragment$f(ctx) {
    	let table;
    	let tr0;
    	let th0;
    	let t1;
    	let th1;
    	let t3;
    	let tr1;
    	let td0;
    	let t5;
    	let td1;
    	let t7;
    	let tr2;
    	let td2;
    	let t9;
    	let td3;
    	let t11;
    	let tr3;
    	let td4;
    	let t13;
    	let td5;
    	let t15;
    	let tr4;
    	let td6;
    	let t17;
    	let td7;
    	let t19;
    	let tr5;
    	let td8;
    	let t21;
    	let td9;
    	let t23;
    	let tr6;
    	let td10;
    	let t25;
    	let td11;
    	let t27;
    	let tr7;
    	let td12;
    	let t29;
    	let td13;
    	let t31;
    	let tr8;
    	let td14;
    	let t33;
    	let td15;

    	const block = {
    		c: function create() {
    			table = element("table");
    			tr0 = element("tr");
    			th0 = element("th");
    			th0.textContent = "Material";
    			t1 = space();
    			th1 = element("th");
    			th1.textContent = "DR";
    			t3 = space();
    			tr1 = element("tr");
    			td0 = element("td");
    			td0.textContent = "Drywall";
    			t5 = space();
    			td1 = element("td");
    			td1.textContent = "0";
    			t7 = space();
    			tr2 = element("tr");
    			td2 = element("td");
    			td2.textContent = "Glass";
    			t9 = space();
    			td3 = element("td");
    			td3.textContent = "1";
    			t11 = space();
    			tr3 = element("tr");
    			td4 = element("td");
    			td4.textContent = "Plywood";
    			t13 = space();
    			td5 = element("td");
    			td5.textContent = "1";
    			t15 = space();
    			tr4 = element("tr");
    			td6 = element("td");
    			td6.textContent = "Hardwood";
    			t17 = space();
    			td7 = element("td");
    			td7.textContent = "2";
    			t19 = space();
    			tr5 = element("tr");
    			td8 = element("td");
    			td8.textContent = "Sheet Metal";
    			t21 = space();
    			td9 = element("td");
    			td9.textContent = "2";
    			t23 = space();
    			tr6 = element("tr");
    			td10 = element("td");
    			td10.textContent = "Brick";
    			t25 = space();
    			td11 = element("td");
    			td11.textContent = "3";
    			t27 = space();
    			tr7 = element("tr");
    			td12 = element("td");
    			td12.textContent = "Concrete";
    			t29 = space();
    			td13 = element("td");
    			td13.textContent = "4";
    			t31 = space();
    			tr8 = element("tr");
    			td14 = element("td");
    			td14.textContent = "Steel";
    			t33 = space();
    			td15 = element("td");
    			td15.textContent = "5";
    			add_location(th0, file$d, 2, 8, 25);
    			add_location(th1, file$d, 3, 8, 51);
    			add_location(tr0, file$d, 1, 4, 12);
    			add_location(td0, file$d, 6, 8, 90);
    			add_location(td1, file$d, 7, 8, 115);
    			add_location(tr1, file$d, 5, 4, 77);
    			add_location(td2, file$d, 10, 8, 153);
    			add_location(td3, file$d, 11, 8, 176);
    			add_location(tr2, file$d, 9, 4, 140);
    			add_location(td4, file$d, 14, 8, 214);
    			add_location(td5, file$d, 15, 8, 239);
    			add_location(tr3, file$d, 13, 4, 201);
    			add_location(td6, file$d, 18, 8, 277);
    			add_location(td7, file$d, 19, 8, 303);
    			add_location(tr4, file$d, 17, 4, 264);
    			add_location(td8, file$d, 22, 8, 341);
    			add_location(td9, file$d, 23, 8, 370);
    			add_location(tr5, file$d, 21, 4, 328);
    			add_location(td10, file$d, 26, 8, 408);
    			add_location(td11, file$d, 27, 8, 431);
    			add_location(tr6, file$d, 25, 4, 395);
    			add_location(td12, file$d, 30, 8, 469);
    			add_location(td13, file$d, 31, 8, 495);
    			add_location(tr7, file$d, 29, 4, 456);
    			add_location(td14, file$d, 34, 8, 533);
    			add_location(td15, file$d, 35, 8, 556);
    			add_location(tr8, file$d, 33, 4, 520);
    			add_location(table, file$d, 0, 0, 0);
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
    			append_dev(table, t3);
    			append_dev(table, tr1);
    			append_dev(tr1, td0);
    			append_dev(tr1, t5);
    			append_dev(tr1, td1);
    			append_dev(table, t7);
    			append_dev(table, tr2);
    			append_dev(tr2, td2);
    			append_dev(tr2, t9);
    			append_dev(tr2, td3);
    			append_dev(table, t11);
    			append_dev(table, tr3);
    			append_dev(tr3, td4);
    			append_dev(tr3, t13);
    			append_dev(tr3, td5);
    			append_dev(table, t15);
    			append_dev(table, tr4);
    			append_dev(tr4, td6);
    			append_dev(tr4, t17);
    			append_dev(tr4, td7);
    			append_dev(table, t19);
    			append_dev(table, tr5);
    			append_dev(tr5, td8);
    			append_dev(tr5, t21);
    			append_dev(tr5, td9);
    			append_dev(table, t23);
    			append_dev(table, tr6);
    			append_dev(tr6, td10);
    			append_dev(tr6, t25);
    			append_dev(tr6, td11);
    			append_dev(table, t27);
    			append_dev(table, tr7);
    			append_dev(tr7, td12);
    			append_dev(tr7, t29);
    			append_dev(tr7, td13);
    			append_dev(table, t31);
    			append_dev(table, tr8);
    			append_dev(tr8, td14);
    			append_dev(tr8, t33);
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
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class CoverTable extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$f, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CoverTable",
    			options,
    			id: create_fragment$f.name
    		});
    	}
    }

    const Cover = new Rule(
        `Cover`, 
        `You can lean in and out of Cover to ATK as part of your action. All Cover except Glass makes you Concealed. If an opponent Waits until you lean out of Cover, they must make a Called Shot to hit an exposed Location. All DMG is negated against targets that are behind Cover if the Material DR is >= the weapon’s base DMG. If weapon DMG exceeds the Material DR, the Material DR acts as an Armor bonus for DMG reduction.`,
        [],
        CoverTable
    );

    const Defenseless = new Rule(
        `Defenseless`, 
        `Use Reflex [Perception / 2] for DEF.`
    );

    const Falling = new Rule(
        `Falling`, 
        `1DMG per 2yds. Roll [Acrobatics # = yds] to halve Falling DMG.`
    );

    const FriendlyFire = new Rule(
        `Friendly Fire`, 
        `-3 RATK against targets within 1yd of your ally. If the RATK Fails, re-roll the RATK vs the ally’s Reflex.`
    );

    const Dehydration = new Rule(
        `Dehydration`, 
        `People need 1 Water per day. 1 Pain per day without Water. This penalty is reduced by 1 per day with Water. Going without Water for a number of days = C is lethal.`
    );

    const Exhaustion = new Rule(
        `Exhaustion`, 
        `People need 8 hours of sleep per day. 1 Pain per day without sufficient sleep. Go unconscious for 8 hours after days = C without sleep. Penalties go away after 8 hours of sleep.`
    );

    const Hypothermia = new Rule(
        `Hypothermia`, 
        `People need warmth to stay alive. 1 Pain per hour of Hypothermia.  Reduce penalty by 1 per hour of warmth. Hypothermia for hours = C is lethal.`
    );

    const Starvation = new Rule(
        `Starvation`, 
        `People need 1 Food per day. 1 Pain per week without Food. This penalty is reduced by 1 per day with Food. Going without Food for a number of weeks = C is lethal.`
    );

    const Suffocation = new Rule(
        `Suffocation`, 
        `People need constant air supply. 1 Pain per minute without air. This penalty is reduced by 1 per minute with air. Going without air for a number of minutes = C is lethal.`
    );

    const Needs = new Rule(
        `Needs`, 
        `1 Pain for each lacking Need over a given period of time:`,
        [Dehydration, Exhaustion, Hypothermia, Starvation, Suffocation]
    );

    const OffHand = new Rule(
        `Off-Hand`, 
        `-3 penalty to ATK with your Off-Hand.`
    );

    const Prone = new Rule(
        `Prone`, 
        `You may drop Prone as part of your Movement. Standing up costs 1AP. +1 RATK. +3 Stealth. Speed 1yd.`
    );

    const Range = new Rule(
        `Range`, 
        `RATKs take a -1 penalty per additional RNG increment. MATKs take a modifier against Melee weapons that have a different RNG = [your weapon’s RNG - enemy weapon’s RNG].`
    );

    const Stun = new Rule(
        `Stun`, 
        `Defenseless and cannot take actions. Prone if [Stunned > 1rnd].`
    );

    const Unarmed = new Rule(
        `Unarmed`, 
        `If the target is conscious, the target rolls C vs DMG to avoid being knocked Unconscious. If the target is Unconscious, the target takes DMG = Melee score. DR is not depleted.`
    );

    const Unconscious = new Rule(
        `Unconscious`, 
        `Unaware and unable to take actions. 0 DEF. Prone.`
    );

    const Unstable = new Rule(
        `Unstable`, 
        `-3 penalty to physical rolls. -3 to RATKs at or from you.`
    );

    const Visibility = new Rule(
        `Visibility`, 
        `-1 to -6 (Blind) to sight-based rolls, including ATK and DEF.`
    );

    const Situations = [
        Bleeding,
        Burning$1,
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

    /* src/pages/Reference.svelte generated by Svelte v3.15.0 */
    const file$e = "src/pages/Reference.svelte";

    function create_fragment$g(ctx) {
    	let div;
    	let t;
    	let current;
    	var switch_value = RefList;

    	function switch_props(ctx) {
    		return {
    			props: { list: ctx.selected },
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props(ctx));
    	}

    	const backnextbuttons = new BackNextButtons({
    			props: { step: ctx.step },
    			$$inline: true
    		});

    	backnextbuttons.$on("message", ctx.nav);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			t = space();
    			create_component(backnextbuttons.$$.fragment);
    			attr_dev(div, "class", "ref-page svelte-ttj5zk");
    			add_location(div, file$e, 23, 0, 744);
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
    			mount_component(backnextbuttons, target, anchor);
    			current = true;
    		},
    		p: function update(changed, ctx) {
    			const switch_instance_changes = {};
    			if (changed.selected) switch_instance_changes.list = ctx.selected;

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

    			const backnextbuttons_changes = {};
    			if (changed.step) backnextbuttons_changes.step = ctx.step;
    			backnextbuttons.$set(backnextbuttons_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			transition_in(backnextbuttons.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			transition_out(backnextbuttons.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (switch_instance) destroy_component(switch_instance);
    			if (detaching) detach_dev(t);
    			destroy_component(backnextbuttons, detaching);
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

    function instance$d($$self, $$props, $$invalidate) {
    	let step = 0;

    	const pages = [
    		{ name: "Combat", rules: Combat },
    		{ name: "Maneuvers", rules: Maneuvers },
    		{ name: "Situations", rules: Situations }
    	];

    	let selected = pages[step];

    	function nav(event) {
    		$$invalidate("step", step = event.detail.number);

    		if (step == pages.length || step < 0) {
    			router.Home();
    		} else {
    			$$invalidate("selected", selected = pages[step]);
    		}
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("step" in $$props) $$invalidate("step", step = $$props.step);
    		if ("selected" in $$props) $$invalidate("selected", selected = $$props.selected);
    	};

    	return { step, selected, nav };
    }

    class Reference extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$g, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Reference",
    			options,
    			id: create_fragment$g.name
    		});
    	}
    }

    /* src/pages/Home.svelte generated by Svelte v3.15.0 */
    const file$f = "src/pages/Home.svelte";

    function create_fragment$h(ctx) {
    	let div;
    	let button0;
    	let t1;
    	let button1;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			button0 = element("button");
    			button0.textContent = "Character Creator";
    			t1 = space();
    			button1 = element("button");
    			button1.textContent = "Rules Reference";
    			attr_dev(button0, "class", "svelte-1oytnow");
    			add_location(button0, file$f, 7, 4, 167);
    			attr_dev(button1, "class", "svelte-1oytnow");
    			add_location(button1, file$f, 8, 4, 232);
    			attr_dev(div, "class", "home-page svelte-1oytnow");
    			add_location(div, file$f, 6, 0, 139);

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
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			run_all(dispose);
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

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$h, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$h.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.15.0 */

    // (14:2) <Router>
    function create_default_slot_2(ctx) {
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
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(14:2) <Router>",
    		ctx
    	});

    	return block;
    }

    // (13:1) <DisplayWindow>
    function create_default_slot_1(ctx) {
    	let current;

    	const router = new Router({
    			props: {
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(router.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(router, target, anchor);
    			current = true;
    		},
    		p: function update(changed, ctx) {
    			const router_changes = {};

    			if (changed.$$scope) {
    				router_changes.$$scope = { changed, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(router, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(13:1) <DisplayWindow>",
    		ctx
    	});

    	return block;
    }

    // (11:0) <ViewScreen>
    function create_default_slot(ctx) {
    	let t;
    	let current;
    	const titlebar = new TitleBar({ $$inline: true });

    	const displaywindow = new DisplayWindow({
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
    			create_component(displaywindow.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(titlebar, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(displaywindow, target, anchor);
    			current = true;
    		},
    		p: function update(changed, ctx) {
    			const displaywindow_changes = {};

    			if (changed.$$scope) {
    				displaywindow_changes.$$scope = { changed, ctx };
    			}

    			displaywindow.$set(displaywindow_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(titlebar.$$.fragment, local);
    			transition_in(displaywindow.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(titlebar.$$.fragment, local);
    			transition_out(displaywindow.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(titlebar, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(displaywindow, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(11:0) <ViewScreen>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$i(ctx) {
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
    		p: function update(changed, ctx) {
    			const viewscreen_changes = {};

    			if (changed.$$scope) {
    				viewscreen_changes.$$scope = { changed, ctx };
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
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$i, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$i.name
    		});
    	}
    }

    const app = new App({
    	target: document.body
    });

    return app;

}());
//# sourceMappingURL=apocalyptia-online.js.map
