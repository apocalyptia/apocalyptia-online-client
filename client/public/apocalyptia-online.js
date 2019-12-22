
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

    /* src/layout/ViewScreen.svelte generated by Svelte v3.16.5 */

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

    /* node_modules/svelte-routing/src/Router.svelte generated by Svelte v3.16.5 */

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

    /* node_modules/svelte-routing/src/Route.svelte generated by Svelte v3.16.5 */

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
    				score: 1,
    				max: 6
    			},
    			brains: {
    				name: `Brains`,
    				score: 1,
    				max: 6
    			},
    			constitution: {
    				name: `Constitution`,
    				score: 1,
    				max: 6
    			},
    			demeanor: {
    				name: `Demeanor`,
    				score: 1,
    				max: 6
    			},
    		},
    		this.skills = {
    			acrobatics: {
    				name: `Acrobatics`,
    				parent: `Agility`,
    				score: 0,
    				max: 1
    			},
    			athletics: {
    				name: `Athletics`,
    				parent: `Constitution`,
    				score: 0,
    				max: 1
    			},
    			build: {
    				name: `Build`,
    				parent: `Brains`,
    				score: 0,
    				max: 1
    			},
    			drive: {
    				name: `Drive`,
    				parent: `Constitution`,
    				score: 0,
    				max: 1
    			},
    			larceny: {
    				name: `Larceny`,
    				parent: `Agility`,
    				score: 0,
    				max: 1
    			},
    			leadership: {
    				name: `Leadership`,
    				parent: `Demeanor`,
    				score: 0,
    				max: 1
    			},
    			medicine: {
    				name: `Medicine`,
    				parent: `Brains`,
    				score: 0,
    				max: 1
    			},
    			melee: {
    				name: `Melee`,
    				parent: `Constitution`,
    				score: 0,
    				max: 1
    			},
    			perception: {
    				name: `Perception`,
    				parent: `Brains`,
    				score: 0,
    				max: 1
    			},
    			perform: {
    				name: `Perform`,
    				parent: `Demeanor`,
    				score: 0,
    				max: 1
    			},
    			ranged: {
    				name: `Ranged`,
    				parent: `Agility`,
    				score: 0,
    				max: 1
    			},
    			science: {
    				name: `Science`,
    				parent: `Brains`,
    				score: 0,
    				max: 1
    			},
    			socialize: {
    				name: `Socialize`,
    				parent: `Demeanor`,
    				score: 0,
    				max: 1
    			},
    			stealth: {
    				name: `Stealth`,
    				parent: `Agility`,
    				score: 0,
    				max: 1
    			},
    			survival: {
    				name: `Survival`,
    				parent: `Constitution`,
    				score: 0,
    				max: 1
    			},
    			tame: {
    				name: `Tame`,
    				parent: `Demeanor`,
    				score: 0,
    				max: 1
    			},
    		},
    		this.props = {
    			block: {
    				name: `Block`,
    				score: 0,
    				set: () => {
    					const block = this.skills.melee.score;
    					this.props.block.score = block;
    					return block
    				}
    			},
    			dodge: {
    				name: `Dodge`,
    				score: 0,
    				set: () => {
    					const dodge = this.skills.acrobatics.score;
    					this.props.dodge.score = dodge;
    					return dodge
    				}
    			},
    			health: {
    				name: `Health`,
    				score: 3,
    				set: () => {
    					const health = this.traits.constitution.score * 3;
    					this.props.health.score = health;
    					return health
    				}
    			},
    			init: {
    				name: `Initiative`,
    				score: 1,
    				set: () => {
    					const init = this.traits.agility.score;
    					this.props.init.score = init;
    					return init
    				}
    			},
    			luck: {
    				name: `Luck`,
    				score: 1,
    				set: () => {
    					const luck = this.traits[`demeanor`].score;
    					this.props.luck.score = luck;
    					return luck
    				}
    			},
    			psyche: {
    				name: `Psyche`,
    				score: 1,
    				set: () => {
    					const psyche = this.traits[`demeanor`].score * 3;
    					this.props.psyche.score = psyche;
    					return psyche
    				}
    			},
    			reflex: {
    				name: `Reflex`,
    				score: 0,
    				set: () => {
    					const reflex = Math.floor(this.skills[`perception`].score / 2);
    					this.props.reflex.score = reflex;
    					return reflex
    				}
    			},
    			speed: {
    				name: `Speed`,
    				score: 2,
    				set: () => {
    					const speed = this.traits[`agility`].score + this.traits[`constitution`].score;
    					this.props.speed.score = speed;
    					return speed
    				}
    			},
    			xp: {
    				name: `Experience`,
    				score: 6,
    				set: () => {
    					const xp = this.traits[`brains`].score * 6;
    					this.props.xp.score = xp;
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
    	updateProps() {
    		let props = Object.keys(this.props);
    		props.forEach((prop) => { this.props[prop].set(); });
    	}
    }

    let newCharacter = new Character();

    const CharacterStore = writable(newCharacter);

    /* src/components/creator/CreDescription.svelte generated by Svelte v3.16.5 */
    const file$1 = "src/components/creator/CreDescription.svelte";

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[17] = list[i].name;
    	child_ctx[18] = list[i].random;
    	return child_ctx;
    }

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[14] = list[i];
    	return child_ctx;
    }

    // (95:3) {#each pair as {name, random}}
    function create_each_block_1(ctx) {
    	let div1;
    	let div0;
    	let span;
    	let t0_value = /*name*/ ctx[17] + "";
    	let t0;
    	let t1;
    	let t2;
    	let input;
    	let t3;
    	let button;
    	let dispose;

    	function input_input_handler() {
    		/*input_input_handler*/ ctx[13].call(input, /*name*/ ctx[17]);
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
    			attr_dev(span, "class", "stat-label svelte-19jcicn");
    			add_location(span, file$1, 97, 6, 2651);
    			attr_dev(input, "class", "half-input svelte-19jcicn");
    			add_location(input, file$1, 98, 6, 2697);
    			attr_dev(button, "class", "svelte-19jcicn");
    			add_location(button, file$1, 99, 6, 2786);
    			attr_dev(div0, "class", "hs-container svelte-19jcicn");
    			add_location(div0, file$1, 96, 5, 2618);
    			attr_dev(div1, "class", "half-stat-block svelte-19jcicn");
    			add_location(div1, file$1, 95, 4, 2583);

    			dispose = [
    				listen_dev(input, "input", input_input_handler),
    				listen_dev(button, "click", /*random*/ ctx[18], false, false, false)
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
    			set_input_value(input, /*char*/ ctx[0].description[/*name*/ ctx[17].toLowerCase()].value);
    			append_dev(div0, t3);
    			append_dev(div0, button);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*char, descriptions*/ 9 && input.value !== /*char*/ ctx[0].description[/*name*/ ctx[17].toLowerCase()].value) {
    				set_input_value(input, /*char*/ ctx[0].description[/*name*/ ctx[17].toLowerCase()].value);
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
    		source: "(95:3) {#each pair as {name, random}}",
    		ctx
    	});

    	return block;
    }

    // (93:1) {#each descriptions as pair}
    function create_each_block(ctx) {
    	let div;
    	let each_value_1 = /*pair*/ ctx[14];
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
    			add_location(div, file$1, 93, 2, 2520);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*descriptions, char*/ 9) {
    				each_value_1 = /*pair*/ ctx[14];
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
    		source: "(93:1) {#each descriptions as pair}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div4;
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
    	let div3;
    	let button1;
    	let dispose;
    	let each_value = /*descriptions*/ ctx[3];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div4 = element("div");
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
    			div3 = element("div");
    			button1 = element("button");
    			button1.textContent = "Random Character";
    			add_location(h2, file$1, 73, 2, 2048);
    			attr_dev(div0, "class", "step-title");
    			add_location(div0, file$1, 72, 1, 2021);
    			attr_dev(span0, "class", "stat-label svelte-19jcicn");
    			add_location(span0, file$1, 76, 2, 2105);
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "class", "player-name svelte-19jcicn");
    			add_location(input0, file$1, 77, 2, 2147);
    			attr_dev(div1, "class", "stat-block");
    			add_location(div1, file$1, 75, 1, 2078);
    			attr_dev(span1, "class", "stat-label svelte-19jcicn");
    			add_location(span1, file$1, 84, 2, 2282);
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "class", "character-name svelte-19jcicn");
    			add_location(input1, file$1, 85, 2, 2327);
    			attr_dev(button0, "class", "svelte-19jcicn");
    			add_location(button0, file$1, 90, 2, 2434);
    			attr_dev(div2, "class", "stat-block");
    			add_location(div2, file$1, 83, 1, 2255);
    			attr_dev(button1, "class", "random-all svelte-19jcicn");
    			add_location(button1, file$1, 106, 2, 2908);
    			attr_dev(div3, "class", "stat-block");
    			add_location(div3, file$1, 105, 1, 2881);
    			attr_dev(div4, "class", "step");
    			add_location(div4, file$1, 71, 0, 2001);

    			dispose = [
    				listen_dev(input0, "input", /*input0_input_handler*/ ctx[11]),
    				listen_dev(input1, "input", /*input1_input_handler*/ ctx[12]),
    				listen_dev(button0, "click", /*randomName*/ ctx[1], false, false, false),
    				listen_dev(button1, "click", /*randomDescription*/ ctx[2], false, false, false)
    			];
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div0);
    			append_dev(div0, h2);
    			append_dev(div4, t1);
    			append_dev(div4, div1);
    			append_dev(div1, span0);
    			append_dev(div1, t3);
    			append_dev(div1, input0);
    			set_input_value(input0, /*char*/ ctx[0].description.playerName.value);
    			append_dev(div4, t4);
    			append_dev(div4, div2);
    			append_dev(div2, span1);
    			append_dev(div2, t6);
    			append_dev(div2, input1);
    			set_input_value(input1, /*char*/ ctx[0].description.characterName.value);
    			append_dev(div2, t7);
    			append_dev(div2, button0);
    			append_dev(div4, t9);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div4, null);
    			}

    			append_dev(div4, t10);
    			append_dev(div4, div3);
    			append_dev(div3, button1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*char*/ 1 && input0.value !== /*char*/ ctx[0].description.playerName.value) {
    				set_input_value(input0, /*char*/ ctx[0].description.playerName.value);
    			}

    			if (dirty & /*char*/ 1 && input1.value !== /*char*/ ctx[0].description.characterName.value) {
    				set_input_value(input1, /*char*/ ctx[0].description.characterName.value);
    			}

    			if (dirty & /*descriptions, char*/ 9) {
    				each_value = /*descriptions*/ ctx[3];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div4, t10);
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
    			run_all(dispose);
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

    function random(array) {
    	return array[Math.ceil(Math.random() * array.length) - 1];
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let char;

    	const unsubscribe = CharacterStore.subscribe(value => {
    		$$invalidate(0, char = value);
    	});

    	function randomName() {
    		if (char.description.gender.value == "Male") {
    			$$invalidate(0, char.description.characterName.value = random(maleNames), char);
    		} else if (char.description.gender.value == "Female") {
    			$$invalidate(0, char.description.characterName.value = random(femaleNames), char);
    		} else {
    			$$invalidate(0, char.description.characterName.value = random([...femaleNames, ...maleNames]), char);
    		}
    	}

    	function randomHeight() {
    		const totalInches = Math.ceil(Math.random() * 14 + 60);
    		const feet = Math.floor(totalInches / 12);
    		const inches = Math.floor(totalInches % 12);
    		$$invalidate(0, char.description.height.value = `${feet}' ${inches}"`, char);
    	}

    	function randomWeight() {
    		$$invalidate(0, char.description.weight.value = `${Math.ceil(Math.random() * 100) + 100}lbs`, char);
    	}

    	function randomHair() {
    		$$invalidate(0, char.description.hair.value = random(["Auburn", "Bald", "Black", "Blonde", "Brunette", "Gray", "Red", "White"]), char);
    	}

    	function randomSkin() {
    		$$invalidate(0, char.description.skin.value = random(["Black", "Brown", "Olive", "Pale", "Tan", "White"]), char);
    	}

    	function randomGender() {
    		$$invalidate(0, char.description.gender.value = random(["Female", "Male"]), char);
    	}

    	function randomAge() {
    		$$invalidate(0, char.description.age.value = Math.ceil(Math.random() * 33 + 17), char);
    	}

    	function randomDescription() {
    		randomAge();
    		randomGender();
    		randomSkin();
    		randomHair();
    		randomWeight();
    		randomHeight();
    		randomName();
    	}

    	const descriptions = [
    		[
    			{ name: "Height", random: randomHeight },
    			{ name: "Weight", random: randomWeight }
    		],
    		[{ name: "Skin", random: randomSkin }, { name: "Hair", random: randomHair }],
    		[{ name: "Gender", random: randomGender }, { name: "Age", random: randomAge }]
    	];

    	function input0_input_handler() {
    		char.description.playerName.value = this.value;
    		$$invalidate(0, char);
    	}

    	function input1_input_handler() {
    		char.description.characterName.value = this.value;
    		$$invalidate(0, char);
    	}

    	function input_input_handler(name) {
    		char.description[name.toLowerCase()].value = this.value;
    		$$invalidate(0, char);
    		$$invalidate(3, descriptions);
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("char" in $$props) $$invalidate(0, char = $$props.char);
    	};

    	return [
    		char,
    		randomName,
    		randomDescription,
    		descriptions,
    		unsubscribe,
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
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CreDescription",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    function capitalize(word) {
    	return word.charAt(0).toUpperCase() + word.slice(1)
    }

    /* src/components/creator/CreTraits.svelte generated by Svelte v3.16.5 */
    const file$2 = "src/components/creator/CreTraits.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    // (44:1) {#each traits as trait}
    function create_each_block$1(ctx) {
    	let div4;
    	let div0;
    	let span0;
    	let t0_value = /*char*/ ctx[0].traits[/*trait*/ ctx[8]].name + "";
    	let t0;
    	let t1;
    	let div3;
    	let div1;
    	let input;
    	let input_name_value;
    	let input_invalid_value;
    	let t2;
    	let div2;
    	let span1;
    	let t4;
    	let span2;
    	let t6;
    	let span3;
    	let t8;
    	let span4;
    	let t10;
    	let span5;
    	let t12;
    	let span6;
    	let t14;
    	let dispose;

    	function input_change_input_handler() {
    		/*input_change_input_handler*/ ctx[6].call(input, /*trait*/ ctx[8]);
    	}

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div0 = element("div");
    			span0 = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			div3 = element("div");
    			div1 = element("div");
    			input = element("input");
    			t2 = space();
    			div2 = element("div");
    			span1 = element("span");
    			span1.textContent = "1";
    			t4 = space();
    			span2 = element("span");
    			span2.textContent = "2";
    			t6 = space();
    			span3 = element("span");
    			span3.textContent = "3";
    			t8 = space();
    			span4 = element("span");
    			span4.textContent = "4";
    			t10 = space();
    			span5 = element("span");
    			span5.textContent = "5";
    			t12 = space();
    			span6 = element("span");
    			span6.textContent = "6";
    			t14 = space();
    			attr_dev(span0, "class", "stat-label svelte-13opdei");
    			add_location(span0, file$2, 46, 4, 1148);
    			attr_dev(div0, "class", "stat-column name-column svelte-13opdei");
    			add_location(div0, file$2, 45, 3, 1106);
    			attr_dev(input, "class", "slider-input");
    			attr_dev(input, "type", "range");
    			attr_dev(input, "name", input_name_value = /*char*/ ctx[0].traits[/*trait*/ ctx[8]].name.toLowerCase());
    			attr_dev(input, "min", "1");
    			attr_dev(input, "max", "6");
    			attr_dev(input, "invalid", input_invalid_value = /*remaining*/ ctx[1] < 0);
    			add_location(input, file$2, 50, 5, 1292);
    			attr_dev(div1, "class", "stat-input svelte-13opdei");
    			add_location(div1, file$2, 49, 4, 1262);
    			attr_dev(span1, "class", "svelte-13opdei");
    			add_location(span1, file$2, 62, 5, 1615);
    			attr_dev(span2, "class", "svelte-13opdei");
    			add_location(span2, file$2, 63, 5, 1635);
    			attr_dev(span3, "class", "svelte-13opdei");
    			add_location(span3, file$2, 64, 5, 1655);
    			attr_dev(span4, "class", "svelte-13opdei");
    			add_location(span4, file$2, 65, 5, 1675);
    			attr_dev(span5, "class", "svelte-13opdei");
    			add_location(span5, file$2, 66, 5, 1695);
    			attr_dev(span6, "class", "svelte-13opdei");
    			add_location(span6, file$2, 67, 5, 1715);
    			attr_dev(div2, "class", "stat-input svelte-13opdei");
    			add_location(div2, file$2, 61, 4, 1585);
    			attr_dev(div3, "class", "stat-column value-column svelte-13opdei");
    			add_location(div3, file$2, 48, 3, 1219);
    			attr_dev(div4, "class", "stat-block svelte-13opdei");
    			add_location(div4, file$2, 44, 2, 1078);

    			dispose = [
    				listen_dev(input, "change", input_change_input_handler),
    				listen_dev(input, "input", input_change_input_handler),
    				listen_dev(input, "input", prevent_default(/*input_handler*/ ctx[7]), false, true, false)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div0);
    			append_dev(div0, span0);
    			append_dev(span0, t0);
    			append_dev(div4, t1);
    			append_dev(div4, div3);
    			append_dev(div3, div1);
    			append_dev(div1, input);
    			set_input_value(input, /*char*/ ctx[0].traits[/*trait*/ ctx[8]].score);
    			append_dev(div3, t2);
    			append_dev(div3, div2);
    			append_dev(div2, span1);
    			append_dev(div2, t4);
    			append_dev(div2, span2);
    			append_dev(div2, t6);
    			append_dev(div2, span3);
    			append_dev(div2, t8);
    			append_dev(div2, span4);
    			append_dev(div2, t10);
    			append_dev(div2, span5);
    			append_dev(div2, t12);
    			append_dev(div2, span6);
    			append_dev(div4, t14);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*char*/ 1 && t0_value !== (t0_value = /*char*/ ctx[0].traits[/*trait*/ ctx[8]].name + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*char*/ 1 && input_name_value !== (input_name_value = /*char*/ ctx[0].traits[/*trait*/ ctx[8]].name.toLowerCase())) {
    				attr_dev(input, "name", input_name_value);
    			}

    			if (dirty & /*remaining*/ 2 && input_invalid_value !== (input_invalid_value = /*remaining*/ ctx[1] < 0)) {
    				attr_dev(input, "invalid", input_invalid_value);
    			}

    			if (dirty & /*char, traits*/ 5) {
    				set_input_value(input, /*char*/ ctx[0].traits[/*trait*/ ctx[8]].score);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(44:1) {#each traits as trait}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div2;
    	let div0;
    	let h2;
    	let t1;
    	let div1;
    	let h3;
    	let t2;
    	let t3;
    	let t4;
    	let each_value = /*traits*/ ctx[2];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
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
    			t3 = text(/*remaining*/ ctx[1]);
    			t4 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(h2, file$2, 38, 2, 953);
    			attr_dev(div0, "class", "step-title");
    			add_location(div0, file$2, 37, 1, 926);
    			add_location(h3, file$2, 41, 2, 1004);
    			attr_dev(div1, "class", "remaining svelte-13opdei");
    			add_location(div1, file$2, 40, 1, 978);
    			attr_dev(div2, "class", "step");
    			add_location(div2, file$2, 36, 0, 906);
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
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*remaining*/ 2) set_data_dev(t3, /*remaining*/ ctx[1]);

    			if (dirty & /*char, traits, remaining, countTraitPoints*/ 15) {
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
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
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

    const traitPoints = 12;

    function instance$4($$self, $$props, $$invalidate) {
    	let char;

    	const unsubscribe = CharacterStore.subscribe(value => {
    		$$invalidate(0, char = value);
    	});

    	const traits = Object.keys(char.traits);
    	let remaining = traitPoints - traits.length;

    	function countTraitPoints(event) {
    		let target = event.target;
    		let traitCount = 0;

    		traits.forEach(trait => {
    			traitCount += char.traits[trait].score;
    		});

    		$$invalidate(1, remaining = traitPoints - traitCount);

    		if (remaining < 0) {
    			$$invalidate(0, char.traits[target.name].score -= 1, char);
    			target.value -= 1;
    			countTraitPoints(event);
    		}

    		setSkillMax();
    		char.updateProps();
    	}

    	function setSkillMax() {
    		traits.forEach(trait => {
    			Object.keys(char.skills).forEach(skill => {
    				if (char.skills[skill].parent === capitalize(trait)) {
    					$$invalidate(0, char.skills[skill].max = char.traits[trait].score, char);
    				}
    			});
    		});
    	}

    	function input_change_input_handler(trait) {
    		char.traits[trait].score = to_number(this.value);
    		$$invalidate(0, char);
    		$$invalidate(2, traits);
    	}

    	const input_handler = event => countTraitPoints(event);

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("char" in $$props) $$invalidate(0, char = $$props.char);
    		if ("remaining" in $$props) $$invalidate(1, remaining = $$props.remaining);
    	};

    	return [
    		char,
    		remaining,
    		traits,
    		countTraitPoints,
    		unsubscribe,
    		setSkillMax,
    		input_change_input_handler,
    		input_handler
    	];
    }

    class CreTraits extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CreTraits",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    function HideShow(x, y) {
    	x.visible = !x.visible;
    	return y
    }

    /* src/components/creator/CreSkills.svelte generated by Svelte v3.16.5 */
    const file$3 = "src/components/creator/CreSkills.svelte";

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[13] = list[i];
    	return child_ctx;
    }

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i];
    	return child_ctx;
    }

    // (46:4) {#if group.visible}
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
    			if (dirty & /*char, skillGroups, skills, remaining, countSkillPoints*/ 31) {
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
    		source: "(46:4) {#if group.visible}",
    		ctx
    	});

    	return block;
    }

    // (48:6) {#if char.traits[group.name].name == char.skills[skill].parent}
    function create_if_block_1$1(ctx) {
    	let div4;
    	let div0;
    	let span0;
    	let t0_value = /*char*/ ctx[0].skills[/*skill*/ ctx[13]].name + "";
    	let t0;
    	let t1;
    	let div3;
    	let div1;
    	let input;
    	let input_name_value;
    	let input_invalid_value;
    	let t2;
    	let div2;
    	let span1;
    	let t4;
    	let span2;
    	let t6;
    	let span3;
    	let t8;
    	let span4;
    	let t10;
    	let span5;
    	let t12;
    	let span6;
    	let t14;
    	let span7;
    	let t16;
    	let dispose;

    	function input_change_input_handler() {
    		/*input_change_input_handler*/ ctx[8].call(input, /*skill*/ ctx[13]);
    	}

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div0 = element("div");
    			span0 = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			div3 = element("div");
    			div1 = element("div");
    			input = element("input");
    			t2 = space();
    			div2 = element("div");
    			span1 = element("span");
    			span1.textContent = "0";
    			t4 = space();
    			span2 = element("span");
    			span2.textContent = "1";
    			t6 = space();
    			span3 = element("span");
    			span3.textContent = "2";
    			t8 = space();
    			span4 = element("span");
    			span4.textContent = "3";
    			t10 = space();
    			span5 = element("span");
    			span5.textContent = "4";
    			t12 = space();
    			span6 = element("span");
    			span6.textContent = "5";
    			t14 = space();
    			span7 = element("span");
    			span7.textContent = "6";
    			t16 = space();
    			attr_dev(span0, "class", "stat-label svelte-eemy1w");
    			add_location(span0, file$3, 50, 9, 1435);
    			attr_dev(div0, "class", "stat-column name-column svelte-eemy1w");
    			add_location(div0, file$3, 49, 8, 1388);
    			attr_dev(input, "class", "slider-input");
    			attr_dev(input, "type", "range");
    			attr_dev(input, "name", input_name_value = /*char*/ ctx[0].skills[/*skill*/ ctx[13]].name.toLowerCase());
    			attr_dev(input, "min", "0");
    			attr_dev(input, "max", "6");
    			attr_dev(input, "invalid", input_invalid_value = /*remaining*/ ctx[2] < 0 || this.value > /*char*/ ctx[0].traits[/*group*/ ctx[10].name].score);
    			add_location(input, file$3, 54, 10, 1599);
    			attr_dev(div1, "class", "stat-input svelte-eemy1w");
    			add_location(div1, file$3, 53, 9, 1564);
    			attr_dev(span1, "class", "svelte-eemy1w");
    			add_location(span1, file$3, 66, 10, 2030);
    			attr_dev(span2, "class", "svelte-eemy1w");
    			add_location(span2, file$3, 67, 10, 2055);
    			attr_dev(span3, "class", "svelte-eemy1w");
    			add_location(span3, file$3, 68, 10, 2080);
    			attr_dev(span4, "class", "svelte-eemy1w");
    			add_location(span4, file$3, 69, 10, 2105);
    			attr_dev(span5, "class", "svelte-eemy1w");
    			add_location(span5, file$3, 70, 10, 2130);
    			attr_dev(span6, "class", "svelte-eemy1w");
    			add_location(span6, file$3, 71, 10, 2155);
    			attr_dev(span7, "class", "svelte-eemy1w");
    			add_location(span7, file$3, 72, 10, 2180);
    			attr_dev(div2, "class", "stat-input svelte-eemy1w");
    			add_location(div2, file$3, 65, 9, 1995);
    			attr_dev(div3, "class", "stat-column value-column svelte-eemy1w");
    			add_location(div3, file$3, 52, 8, 1516);
    			attr_dev(div4, "class", "stat-block svelte-eemy1w");
    			add_location(div4, file$3, 48, 7, 1355);

    			dispose = [
    				listen_dev(input, "change", input_change_input_handler),
    				listen_dev(input, "input", input_change_input_handler),
    				listen_dev(input, "input", prevent_default(/*input_handler*/ ctx[9]), false, true, false)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div0);
    			append_dev(div0, span0);
    			append_dev(span0, t0);
    			append_dev(div4, t1);
    			append_dev(div4, div3);
    			append_dev(div3, div1);
    			append_dev(div1, input);
    			set_input_value(input, /*char*/ ctx[0].skills[/*skill*/ ctx[13]].score);
    			append_dev(div3, t2);
    			append_dev(div3, div2);
    			append_dev(div2, span1);
    			append_dev(div2, t4);
    			append_dev(div2, span2);
    			append_dev(div2, t6);
    			append_dev(div2, span3);
    			append_dev(div2, t8);
    			append_dev(div2, span4);
    			append_dev(div2, t10);
    			append_dev(div2, span5);
    			append_dev(div2, t12);
    			append_dev(div2, span6);
    			append_dev(div2, t14);
    			append_dev(div2, span7);
    			append_dev(div4, t16);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*char*/ 1 && t0_value !== (t0_value = /*char*/ ctx[0].skills[/*skill*/ ctx[13]].name + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*char*/ 1 && input_name_value !== (input_name_value = /*char*/ ctx[0].skills[/*skill*/ ctx[13]].name.toLowerCase())) {
    				attr_dev(input, "name", input_name_value);
    			}

    			if (dirty & /*remaining, char, skillGroups*/ 7 && input_invalid_value !== (input_invalid_value = /*remaining*/ ctx[2] < 0 || this.value > /*char*/ ctx[0].traits[/*group*/ ctx[10].name].score)) {
    				attr_dev(input, "invalid", input_invalid_value);
    			}

    			if (dirty & /*char, skills*/ 9) {
    				set_input_value(input, /*char*/ ctx[0].skills[/*skill*/ ctx[13]].score);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(48:6) {#if char.traits[group.name].name == char.skills[skill].parent}",
    		ctx
    	});

    	return block;
    }

    // (47:5) {#each skills as skill}
    function create_each_block_1$1(ctx) {
    	let if_block_anchor;
    	let if_block = /*char*/ ctx[0].traits[/*group*/ ctx[10].name].name == /*char*/ ctx[0].skills[/*skill*/ ctx[13]].parent && create_if_block_1$1(ctx);

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
    			if (/*char*/ ctx[0].traits[/*group*/ ctx[10].name].name == /*char*/ ctx[0].skills[/*skill*/ ctx[13]].parent) {
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
    		source: "(47:5) {#each skills as skill}",
    		ctx
    	});

    	return block;
    }

    // (41:2) {#each skillGroups as group}
    function create_each_block$2(ctx) {
    	let div1;
    	let div0;
    	let h3;
    	let t0_value = /*char*/ ctx[0].traits[/*group*/ ctx[10].name].name + "";
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let dispose;

    	function click_handler(...args) {
    		return /*click_handler*/ ctx[7](/*group*/ ctx[10], ...args);
    	}

    	let if_block = /*group*/ ctx[10].visible && create_if_block$1(ctx);

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
    			add_location(h3, file$3, 43, 5, 1167);
    			attr_dev(div0, "class", "parent-trait-title svelte-eemy1w");
    			add_location(div0, file$3, 42, 4, 1069);
    			attr_dev(div1, "class", "trait-section svelte-eemy1w");
    			add_location(div1, file$3, 41, 3, 1037);
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
    			if (dirty & /*char, skillGroups*/ 3 && t0_value !== (t0_value = /*char*/ ctx[0].traits[/*group*/ ctx[10].name].name + "")) set_data_dev(t0, t0_value);

    			if (/*group*/ ctx[10].visible) {
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
    		source: "(41:2) {#each skillGroups as group}",
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
    	let h3;
    	let t2;
    	let t3;
    	let t4;
    	let div2;
    	let each_value = /*skillGroups*/ ctx[1];
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
    			t3 = text(/*remaining*/ ctx[2]);
    			t4 = space();
    			div2 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(h2, file$3, 34, 2, 879);
    			attr_dev(div0, "class", "step-title");
    			add_location(div0, file$3, 33, 1, 852);
    			add_location(h3, file$3, 37, 2, 930);
    			attr_dev(div1, "class", "remaining svelte-eemy1w");
    			add_location(div1, file$3, 36, 1, 904);
    			attr_dev(div2, "class", "skill-list svelte-eemy1w");
    			add_location(div2, file$3, 39, 1, 978);
    			attr_dev(div3, "class", "step svelte-eemy1w");
    			add_location(div3, file$3, 32, 0, 832);
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
    			if (dirty & /*remaining*/ 4) set_data_dev(t3, /*remaining*/ ctx[2]);

    			if (dirty & /*skillGroups, skills, char, remaining, countSkillPoints, HideShow*/ 31) {
    				each_value = /*skillGroups*/ ctx[1];
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
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			destroy_each(each_blocks, detaching);
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
    	let char;

    	const unsubscribe = CharacterStore.subscribe(value => {
    		$$invalidate(0, char = value);
    	});

    	const skills = Object.keys(char.skills);
    	let skillGroups = [];

    	Object.keys(char.traits).forEach(trait => {
    		skillGroups.push({ name: trait, visible: false });
    	});

    	let skillPoints = char.traits.brains.score * 3;
    	let remaining = skillPoints;

    	function countSkillPoints(event) {
    		let target = event.target;
    		let skillCount = 0;

    		skills.forEach(skill => {
    			skillCount += char.skills[skill].score;
    		});

    		$$invalidate(2, remaining = skillPoints - skillCount);

    		if (remaining < 0 || target.value > char.skills[target.name].max) {
    			$$invalidate(0, char.skills[target.name].score -= 1, char);
    			target.value -= 1;
    			countSkillPoints(event);
    		}

    		char.updateProps();
    	}

    	const click_handler = group => $$invalidate(1, skillGroups = HideShow(group, skillGroups));

    	function input_change_input_handler(skill) {
    		char.skills[skill].score = to_number(this.value);
    		$$invalidate(0, char);
    		$$invalidate(3, skills);
    	}

    	const input_handler = event => countSkillPoints(event);

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("char" in $$props) $$invalidate(0, char = $$props.char);
    		if ("skillGroups" in $$props) $$invalidate(1, skillGroups = $$props.skillGroups);
    		if ("skillPoints" in $$props) skillPoints = $$props.skillPoints;
    		if ("remaining" in $$props) $$invalidate(2, remaining = $$props.remaining);
    	};

    	return [
    		char,
    		skillGroups,
    		remaining,
    		skills,
    		countSkillPoints,
    		unsubscribe,
    		skillPoints,
    		click_handler,
    		input_change_input_handler,
    		input_handler
    	];
    }

    class CreSkills extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CreSkills",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/components/creator/CreProperties.svelte generated by Svelte v3.16.5 */
    const file$4 = "src/components/creator/CreProperties.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (13:1) {#each props as prop}
    function create_each_block$3(ctx) {
    	let div;
    	let span0;
    	let t0_value = /*char*/ ctx[0].props[/*prop*/ ctx[3]].name + "";
    	let t0;
    	let t1;
    	let span1;
    	let t2_value = /*char*/ ctx[0].props[/*prop*/ ctx[3]].score + "";
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			div = element("div");
    			span0 = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			span1 = element("span");
    			t2 = text(t2_value);
    			t3 = space();
    			add_location(span0, file$4, 14, 3, 318);
    			attr_dev(span1, "class", "three-column");
    			add_location(span1, file$4, 15, 3, 358);
    			attr_dev(div, "class", "stat-block");
    			add_location(div, file$4, 13, 2, 290);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span0);
    			append_dev(span0, t0);
    			append_dev(div, t1);
    			append_dev(div, span1);
    			append_dev(span1, t2);
    			append_dev(div, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*char*/ 1 && t0_value !== (t0_value = /*char*/ ctx[0].props[/*prop*/ ctx[3]].name + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*char*/ 1 && t2_value !== (t2_value = /*char*/ ctx[0].props[/*prop*/ ctx[3]].score + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(13:1) {#each props as prop}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let div1;
    	let div0;
    	let h2;
    	let t1;
    	let each_value = /*props*/ ctx[1];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Properties";
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(h2, file$4, 10, 2, 237);
    			attr_dev(div0, "class", "step-title");
    			add_location(div0, file$4, 9, 1, 210);
    			attr_dev(div1, "class", "step");
    			add_location(div1, file$4, 8, 0, 190);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h2);
    			append_dev(div1, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*char, props*/ 3) {
    				each_value = /*props*/ ctx[1];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
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
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let char;

    	const unsubscribe = CharacterStore.subscribe(value => {
    		$$invalidate(0, char = value);
    	});

    	const props = Object.keys(char.props);

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("char" in $$props) $$invalidate(0, char = $$props.char);
    	};

    	return [char, props];
    }

    class CreProperties extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CreProperties",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    class Rule {
    	constructor(name, description, subrules=[], table='', visible=false) {
    		this.name = name;
    		this.description = description;
    		this.subrules = subrules;
    		this.table = table;
    		this.visible = visible;
    	}
    }

    class Ability extends Rule {
    	constructor(name, description, max, xp, taken, notes) {
    		super(name, description);
    		this.max = max;
    		this.xp = xp;
    		this.taken = taken;
    		this.notes = notes;
    	}
    }

    const AbilityList = [
    	// 3 XP Abilities
    	new Ability(`Favorite Weapon`,		`Botch is only a Fail with this one weapon.`,	1, 3, 0, ``),
    	new Ability(`Hyper Immunity`,		`+1 to resist Diseases.`,						3, 3, 0, ``),
    	new Ability(`Pack Mentality`,		`+1 ATK at same target a Comrade ATKs.`,		1, 3, 0, ``),
    	new Ability(`Quick Reload`,			`Free Reload once per rnd.`,					1, 3, 0, ``),
    	new Ability(`Specialize*`,			`+1 to a Skill Specialty.`,						1, 3, 0, ``),
    	new Ability(`Weapon Training*`,		`+1 ATK for a specific weapon.`,				1, 3, 0, ``),
    	// 6 XP Abilities
    	new Ability(`Efficient Work*`,		`[Time / 2] for a Skill (minimum 1 action).`,   1, 6, 0, ``),
    	new Ability(`Fast Draw`,			`Free item draw once per rnd.`,					1, 6, 0, ``),
    	new Ability(`Fleet Footed`,			`+1 Speed.`,									3, 6, 0, ``),
    	new Ability(`Multilingual*`,		`Learn a different form of communication.`,		9, 6, 0, ``),
    	new Ability(`Practice*`,			`+1 to a Skill (up to the parent Trait).`,		1, 6, 0, ``),
    	// OPEN SLOT FOR NEW ABILITY
    	// 9 XP Abilities
    	new Ability(`Danger Sense`,			`+1 Reflex.`,									1, 9, 0, ``),
    	new Ability(`Discipline`,			`Ignore 1 Pain penalty.`,						3, 9, 0, ``),
    	new Ability(`Fortunate`,			`+1 Luck.`,										1, 9, 0, ``),
    	new Ability(`Free Running`,			`Acrobatics 9# to Climb as a Run action.`,		1, 9, 0, ``),
    	new Ability(`Unorthodox*`,			`Pick a new parent Trait for a Skill.`,			1, 9, 0, ``),
    	// OPEN SLOT FOR NEW ABILITY
    	// 12 XP Abilities
    	new Ability(`Fencing`,				`Free Block roll once per rnd.`,				1, 12, 0, ``),
    	new Ability(`Side-step`,			`Free Dodge roll once per rnd.`,				1, 12, 0, ``),
    	new Ability(`Wrestling`,			`Free Grab roll once per rnd.`,					1, 12, 0, ``),
    	// 15 XP Abilities
    	new Ability(`Firm Grip`,			`Use 2h weapons in 1h, up to Size 3.`,			1, 15, 0, ``),
    	new Ability(`Hard Headed`,			`Ignore Stun from Head DMG.`,					1, 15, 0, ``),
    	new Ability(`Powerful Strike*`,		`+1 DMG for a specific Melee weapon.`,			1, 15, 0, ``),
    	// 18 XP Abilities
    	new Ability(`Assassin`,				`+3 DMG to ATKs from Concealment.`,				1, 18, 0, ``),
    	new Ability(`Vehicle Operation*`,   `Proficiently operate a class of vehicle.`,		1, 18, 0, ``),
    	// 24 XP Abilities
    	new Ability(`Ambidextrous`,			`Off-hand penalty is -1 instead of -3.`,		1, 24, 0, ``),
    	new Ability(`Tough`,				`+1 Health.`,									3, 24, 0, ``),
    	// 30 XP Abilities
    	new Ability(`Self Improvement*`,	`+1 to a Trait (max 6).`,						3, 30, 0, ``),
    	new Ability(`Second Chance`,		`Spend this Ability to avoid Death once.`,		9, 30, 0, ``)
    ];

    /* src/components/creator/CreAbilities.svelte generated by Svelte v3.16.5 */
    const file$5 = "src/components/creator/CreAbilities.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	child_ctx[5] = list;
    	child_ctx[6] = i;
    	return child_ctx;
    }

    // (31:4) {#if AbilityList[index-1] != undefined && AbilityList[index].xp != AbilityList[index-1].xp}
    function create_if_block$2(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "separator svelte-xzr5io");
    			add_location(div, file$5, 31, 5, 880);
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
    		source: "(31:4) {#if AbilityList[index-1] != undefined && AbilityList[index].xp != AbilityList[index-1].xp}",
    		ctx
    	});

    	return block;
    }

    // (30:3) {#each AbilityList as ability, index}
    function create_each_block$4(ctx) {
    	let t0;
    	let div5;
    	let div0;
    	let t1_value = /*ability*/ ctx[4].name + "";
    	let t1;
    	let t2;
    	let div1;
    	let t3_value = /*ability*/ ctx[4].description + "";
    	let t3;
    	let t4;
    	let div2;
    	let t5_value = /*ability*/ ctx[4].max + "";
    	let t5;
    	let t6;
    	let div3;
    	let t7_value = /*ability*/ ctx[4].xp + "";
    	let t7;
    	let t8;
    	let div4;
    	let input;
    	let input_max_value;
    	let input_updating = false;
    	let t9;
    	let dispose;
    	let if_block = AbilityList[/*index*/ ctx[6] - 1] != undefined && AbilityList[/*index*/ ctx[6]].xp != AbilityList[/*index*/ ctx[6] - 1].xp && create_if_block$2(ctx);

    	function input_input_handler() {
    		input_updating = true;
    		/*input_input_handler*/ ctx[3].call(input, /*ability*/ ctx[4]);
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
    			attr_dev(div0, "class", "m-col svelte-xzr5io");
    			add_location(div0, file$5, 34, 5, 955);
    			attr_dev(div1, "class", "l-col svelte-xzr5io");
    			add_location(div1, file$5, 35, 5, 1000);
    			attr_dev(div2, "class", "s-col svelte-xzr5io");
    			add_location(div2, file$5, 36, 5, 1052);
    			attr_dev(div3, "class", "s-col svelte-xzr5io");
    			add_location(div3, file$5, 37, 5, 1096);
    			attr_dev(input, "type", "number");
    			attr_dev(input, "class", "taken-number");
    			attr_dev(input, "min", "0");
    			attr_dev(input, "max", input_max_value = /*ability*/ ctx[4].max);
    			add_location(input, file$5, 39, 6, 1165);
    			attr_dev(div4, "class", "s-col svelte-xzr5io");
    			add_location(div4, file$5, 38, 5, 1139);
    			attr_dev(div5, "class", "ability-row svelte-xzr5io");
    			add_location(div5, file$5, 33, 4, 924);

    			dispose = [
    				listen_dev(input, "input", input_input_handler),
    				listen_dev(input, "input", /*modifyAbilities*/ ctx[0], false, false, false)
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
    			set_input_value(input, /*ability*/ ctx[4].taken);
    			append_dev(div5, t9);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (AbilityList[/*index*/ ctx[6] - 1] != undefined && AbilityList[/*index*/ ctx[6]].xp != AbilityList[/*index*/ ctx[6] - 1].xp) {
    				if (!if_block) {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					if_block.m(t0.parentNode, t0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*AbilityList*/ 0 && t1_value !== (t1_value = /*ability*/ ctx[4].name + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*AbilityList*/ 0 && t3_value !== (t3_value = /*ability*/ ctx[4].description + "")) set_data_dev(t3, t3_value);
    			if (dirty & /*AbilityList*/ 0 && t5_value !== (t5_value = /*ability*/ ctx[4].max + "")) set_data_dev(t5, t5_value);
    			if (dirty & /*AbilityList*/ 0 && t7_value !== (t7_value = /*ability*/ ctx[4].xp + "")) set_data_dev(t7, t7_value);

    			if (dirty & /*AbilityList*/ 0 && input_max_value !== (input_max_value = /*ability*/ ctx[4].max)) {
    				attr_dev(input, "max", input_max_value);
    			}

    			if (!input_updating && dirty & /*AbilityList*/ 0) {
    				set_input_value(input, /*ability*/ ctx[4].taken);
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
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(30:3) {#each AbilityList as ability, index}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
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
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
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

    			add_location(h2, file$5, 18, 2, 418);
    			attr_dev(div0, "class", "step-title");
    			add_location(div0, file$5, 17, 1, 391);
    			attr_dev(div1, "class", "m-col svelte-xzr5io");
    			add_location(div1, file$5, 23, 4, 557);
    			attr_dev(div2, "class", "l-col svelte-xzr5io");
    			add_location(div2, file$5, 24, 4, 591);
    			attr_dev(div3, "class", "s-col svelte-xzr5io");
    			add_location(div3, file$5, 25, 4, 632);
    			attr_dev(div4, "class", "s-col svelte-xzr5io");
    			add_location(div4, file$5, 26, 4, 665);
    			attr_dev(div5, "class", "s-col svelte-xzr5io");
    			add_location(div5, file$5, 27, 4, 697);
    			attr_dev(div6, "class", "ability-row header-row separator svelte-xzr5io");
    			add_location(div6, file$5, 22, 3, 506);
    			attr_dev(div7, "class", "abilities-table svelte-xzr5io");
    			add_location(div7, file$5, 21, 2, 473);
    			attr_dev(div8, "class", "stat-block");
    			add_location(div8, file$5, 20, 1, 446);
    			attr_dev(div9, "class", "step");
    			add_location(div9, file$5, 16, 0, 371);
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
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*AbilityList, modifyAbilities, undefined*/ 1) {
    				each_value = AbilityList;
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
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
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
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

    	function input_input_handler(ability) {
    		ability.taken = to_number(this.value);
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("char" in $$props) char = $$props.char;
    	};

    	return [modifyAbilities, char, unsubscribe, input_input_handler];
    }

    class CreAbilities extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CreAbilities",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

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

    const AccessoryList = [
    	new Accessory(`Bayonet`,			`Knife. +1 DMG and Pierce for MATKs.`,				1),
    	new Accessory(`Bipod`,				`Ignore Size requirement. 1rnd setup.`,				1),
    	new Accessory(`Drum Magazine`,		`Gun specific. 3x Ammo magazine capacity.`,			1),
    	new Accessory(`Foregrip`,			`-1 Size requirement for 2h Gun.`,					0),
    	new Accessory(`Holosight`,			`+1 RATK.`,											0),
    	new Accessory(`Laser`,				`+1 RATK. -6 RATK to Blind for d6rnds.`,			0),
    	new Accessory(`Scope`,				`+3 Aimed RATKs and Perception(See).`,				1),
    	new Accessory(`Single-Point Sling`,	`Draw or stow a 2h Gun without using an Action.`,	0),
    	new Accessory(`Suppressor`,			`Firing a Gun does not break Concealment.`,			0)
    ];

    class Ammo extends Gear {
    	constructor(cal, name, description, sz) {
    		super(name, description, sz);
    		this.cal = cal;
    	}
    }

    const AmmoList = [
    	new Ammo(`Arrow`,	`Broadhead`,		`+1 DMG. Pierce.`,	.1),
    	new Ammo(`Arrow`,	`Standard`,			`Basic ammo.`,		.1),
    	new Ammo(`.22`,		`Standard`,			`Basic ammo.`,		.005),
    	new Ammo(`.22`,		`Hollow Point`,		`+1 DMG.`,			.005),
    	new Ammo(`.22`,		`Match`,			`+1 RATK.`,			.005),
    	new Ammo(`9mm`,		`Standard`,			`Basic ammo.`,		.01),
    	new Ammo(`9mm`,		`Hollow Point`,		`+1 DMG.`,			.01),
    	new Ammo(`9mm`,		`Match`,			`+1 RATK.`,			.01),
    	new Ammo(`.357`,	`Standard`,			`Basic ammo.`,		.01),
    	new Ammo(`.357`,	`Hollow Point`,		`+1 DMG.`,			.01),
    	new Ammo(`5.56`,	`Armor Piercing`,	`Pierce.`,			.02),
    	new Ammo(`5.56`,	`Standard`,			`Basic ammo.`,		.02),
    	new Ammo(`5.56`,	`Hollow Point`,		`+1 DMG.`,			.02),
    	new Ammo(`5.56`,	`Match`,			`+1 RATK.`,			.02),
    	new Ammo(`.308`,	`Armor Piercing`,   `Pierce.`,			.02),
    	new Ammo(`.308`,	`Standard`,		 	`Basic ammo.`,		.02),
    	new Ammo(`.308`,	`Hollow Point`,		`+1 DMG.`,			.02),
    	new Ammo(`.308`,	`Match`,			`+1 RATK.`,			.02),
    	new Ammo(`12g`,		`Buckshot`,			 `Scatter.`,		.05),
    	new Ammo(`12g`,		`Slug`,				 `RNG x2.`,			.05)
    ];

    // OLD AMMO
    // new Ammo(`.22`,	 `Tracer`,			`+1 Auto RATK.`,.005),
    // new Ammo(`12g`,	 `Birdshot`,		  `Basic ammo. Scatter.`,.05),
    // new Ammo(`12g`,	 `Flare`,			 `3FDMG/rnd for 3rnds. 50yd light radius.`,.05),
    // new Ammo(`12g`,	 `Rubber`,			`Blunt.`,.05),
    // new Ammo(`5.56`,	`Tracer`,			`+1 Auto RATK.`,.02),

    class Armor extends Gear {
    	constructor(name, dr, loc, description, sz) {
    		super(name, description, sz);
    		this.dr = dr;
    		this.loc = loc;
    	}
    }

    const ArmorList = [
    	new Armor(`Athletic Helmet`,	1, `Head`,			  [],						 2),
    	new Armor(`Athletic Pads`,	  1, `Torso`,			 [],						 2),
    	new Armor(`Combat Helmet`,	  3, `Head`,			  [`Camo`],				   2),
    	new Armor(`Coveralls`,		  1, `Arms, Torso, Legs`, [`Camo`, `CR`],			 3),
    	new Armor(`Firefighter Suit`,   2, `Full Body`,		 [`CR`, `FR`, `Mask`],	   5),
    	new Armor(`Flak Jacket`,		2, `Torso`,			 [`Camo`],				   4),
    	new Armor(`Ghillie Suit`,	   1, `Full Body`,		 [`Camo`, `CR`],			 4),
    	new Armor(`Hiking Boots`,	   1, `Legs`,			  [`CR`, `FR`],			   2),
    	new Armor(`Kevlar Vest`,		3, `Torso`,			 [`CR`, `FR`],			   4),
    	new Armor(`Leather Jacket`,	 1, `Arms, Torso`,	   [],						 2),
    	new Armor(`Motorcycle Helmet`,  1, `Head`,			  [`FR`, `Mask`],			 2),
    	new Armor(`Hazmat Suit`,		0, `Full Body`,		 [`Mask`, `Impermeable`],	2),
    	new Armor(`Plate Carrier`,	  4, `Torso`,			 [`Camo`, `CR`, `FR`],	   4),
    	new Armor(`Winter Coat`,		1, `Arms, Torso`,	   [`CR`],					 2),
    	new Armor(`Work Gloves`,		1, `Arms`,			  [`FR`],					 1)
    ];

    const RandomArmor = function() {
    	const randomRoll = Math.ceil(Math.random() * (ArmorList.length - 1));
    	console.log(randomRoll);
    	return ArmorList[randomRoll]
    };

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

    const ArmorAttributesList = [
    	new Attribute('Camo', '+1 Stealth per Location when in a given Biome.'),
    	new Attribute('CR', 'Delay Hypothermia for 1hr per Location.'),
    	new Attribute('FR', 'Armor DR reduces FDMG.'),
    	new Attribute('Impermeable', 'Automatic Success to resist exposure to Diseases and Toxins.'),
    	new Attribute('Mask', 'Obscures identity and protects face. -1 Perception.'),
    ];

    const WeaponAttributesList = [
    	new Attribute('1h', 'Used one-handed. +1 RATK if used with both hands.'),
    	new Attribute('2h', 'Used two-handed. Penalty = [Sz] if used one-handed.'),
    	new Attribute('Auto', '[+3 RATK vs one target] or 3yd Blast. Uses 10 bullets.'),
    	new Attribute('Blast', '[d6 vs Reflex] in radius. [DMG / 2] on a miss (mininum 1).'),
    	new Attribute('Blunt', 'Does not cause Bleeding.'),
    	new Attribute('Chop', '+1 DMG to Locations with no Armor.'),
    	new Attribute('FDMG', 'Fire DMG. FDMG can only be prevented with FR Armor.'),
    	new Attribute('Pierce', '+1 DMG to Locations with Armor.'),
    	new Attribute('Rapid', '2 ATKS for 1 Action.'),
    	new Attribute('Sawn-off', '[RNG / 2] and -1 Size.'),
    	new Attribute('Scatter', 'Ignore RNG penalties. -1 DMG per extended RNG.'),
    	new Attribute('Slow', 'Penalty to Initiative = Size.'),
    ];

    class AmmoAttribute extends Attribute {
    	constructor(name, notes, caliber) {
    		super(name, notes);
    		this.caliber = caliber;
    	}
    }

    const AmmoAttributesList = [
    	new AmmoAttribute('Armor Piercing', 'Pierce.', ['5.56', '.308']),
    	new AmmoAttribute('Broadhead', '+1 DMG. Pierce', ['Arrow']),
    	new AmmoAttribute('Buckshot', 'Scatter.', ['12g']),
    	new AmmoAttribute('Hollow Point', '+1 DMG.', ['.22', '9mm', '.357', '5.56', '.308', '12g']),
    	new AmmoAttribute('Match', '+1 RATK.', ['.22', '9mm', '.357', '5.56', '.308']),
    	new AmmoAttribute('Slug', 'RNG x2.', ['12g'])
    ];


    class Bomb extends Gear {
    	constructor(name, mix, dmg, blast, duration, description, sz) {
    		super(name, description, sz);
    		this.mix = mix;
    		this.dmg = dmg;
    		this.blast = blast;
    		this.duration = duration;
    	}
    }

    const BombList = [
    	new Bomb(`Flashbang`,   9,  `0`,		`6yd`,	  `d6rnds`,   `1rnd fuse. Blind. Stun.`,  1),
    	new Bomb(`Frag`,		9,  `d6x3`,	 `15yd`,	 `instant`,  `1rnd fuse. Pierce.`,	   1),
    	new Bomb(`Molotov`,	 1,  `d6`,	   `3yd`,	  `1min`,	 `1FDMG/rnd.`,			   2),
    	new Bomb(`Smoke`,	   3,  `0`,		`1yd/rnd`,  `d6mins`,   `Blind.`,				   1),
    	new Bomb(`Teargas`,	 15, `1`,		`1yd/rnd`,  `d6mins`,   `Blind. Suffocation`,	   1),
    	new Bomb(`Thermite`,	6,  `d6x6`,	 `1yd`,	  `6rnds`,	`1rnd fuse. FDMG.`,		 1),
    ];

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

    const DocumentList = [
    	new Document(`Body in Balance`,			 `+1 Athletics`,					 1),
    	new Document(`Book of Ninja`,			   `+1 Stealth`,					   1),
    	new Document(`Defensive Driving`,		   `+1 Drive`,						 1),
    	new Document(`Dog Tricks`,				  `+1 Tame`,						  1),
    	new Document(`Effective Habits`,			`+1 to any one Skill`,			  1),
    	new Document(`Engineering Concepts`,		`+1 Build`,						 1),
    	new Document(`General Science Knowledge`,   `+1 Science`,					   1),
    	new Document(`Gray\`s Anatomy`,			 `+1 Medicine`,					  1),
    	new Document(`Home Security`,			   `+1 Larceny`,					   1),
    	new Document(`How to Win Friends`,		  `+1 Socialize`,					 1),
    	new Document(`How Yoga Works`,			  `+1 Acrobatics`,					1),
    	new Document(`Leadership Basics`,		   `+1 Leadership`,					1),
    	new Document(`Personal Defense`,			`+1 Ranged`,						1),
    	new Document(`SAS Survival Guide`,		  `+1 Survival`,					  1),
    	new Document(`Stand-up Comedy`,			 `+1 Entertain`,					 1),
    	new Document(`Tao of Jeet Kune Do`,		 `+1 Melee`,						 1),
    	new Document(`Yellow Pages`,				`+1 Scavenging. Regional.`,		 1),
    	new Document(`Zen Mind`,					`+1 Perception`,					1),
    	new Document(`Bilingual Dictionary`,		`Multilingual Ability`,			 1),
    	new Document(`Classic Novel`,			   `+1 Psyche`,						1),
    	new Document(`Holy Book`,				   `-1 Psyche`,						1),
    	new Document(`Map (Atlas)`,				 `+1 Survival(Navigate)`,			1),
    	new Document(`Map (Local)`,				 `+1 Survival(Navigate). Regional.`, 0),
    	new Document(`Map (Topographic)`,		   `+3 Survival(Navigate). Regional.`, 0),
    ];

    class Drug extends Gear {
    	constructor (name, mix, overdose, description, sz) {
    		super(name, description, sz);
    		this.mix = mix;
    		this.overdose = overdose;
    	}
    }

    const DrugsList = [
    	new Drug(`Alcohol`,			 9,  true,   `Antibiotic or Fuel. C9# or Unstable.`,				 1),
    	new Drug(`Antibiotic`,		  12, false,  `Prevents infection in Recovery for 1 day.`,			0),
    	new Drug(`Hallucinogen`,		15, false,  `+1 Perform and Tame. -3 all other rolls. -1 Psyche.`,  0),
    	new Drug(`Painkiller`,		  9,  true,   `Ignore 1 Pain penalty.`,							   0),
    	new Drug(`Sedative`,			12, true,   `D#6/rnd to take any action.`,						  0),
    	new Drug(`Stimulant`,		   9,  true,   `Ignore Exhaustion penalties for 6hrs.`,				0)
    ];

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

    const ElectronicsList = [
    	new Electronic(`Cellphone`,			 3,	  `1yd light, camera, remote control.`,	   1),
    	new Electronic(`Emergency Radio`,	   6,	  `AM/FM/Shortwave. 1yd light.`,			  1),
    	new Electronic(`Flashlight`,			3,	  `10yd light. -3 RATK to Blind 1rnd.`,	   1),
    	new Electronic(`Geiger Counter`,		24,	 `Science 6# to detect Radiation in 1yd.`,   2),
    	new Electronic(`Hand Radio`,			9,	  `9-channel 2-way radio. 3 mile range.`,	 1),
    	new Electronic(`Headlamp`,			  3,	  `3yd light. Hands free.`,				   0),
    	new Electronic(`Lantern`,			   6,	  `3yd light radius.`,						2),
    	new Electronic(`Megaphone`,			 12,	 `+1 Leadership when speaking to a crowd.`,  2),
    	new Electronic(`Multimeter`,			48,	 `+3 Science(Technology). Detect voltage.`,  1),
    	new Electronic(`Nightvision Goggles`,   36,	 `Ignore Visibility penalties in darkness.`, 1),
    	new Electronic(`Quadcopter Drone`,	  .25,	`Science 6# to use. Camera. 90yd Speed.`,   2),
    	new Electronic(`RC Car`,				.5,	 `Science 3# to use. 45yd Speed.`,		   3),
    	new Electronic(`Solar Lamp`,			9,	  `1yd light radius. 1day charge.`,		   1),
    	new Electronic(`Stun Gun`,			  .25,	`MATK. C9# or Stun for 1rnd.`,			  1)
    ];

    // OLD ELECTRONICS
    //  new Electronic(`Radio Jammer`,		  3,	  `Blocks radio signal within 100yds.`,	   1)

    class Equipment extends Gear {
    	constructor(name, description, sz) {
    		super(name, description, sz);
    	}
    }

    const EquipmentList = [
    	new Equipment(`Air Horn`,		   `Emits a loud shriek up to a 1 mile radius.`,	   1),
    	new Equipment(`Balaclava`,		  `+1 Stealth. Mask. CR.`,							0),
    	new Equipment(`Bandanna`,		   `+1 C vs airborne toxins. Can use as Bandage.`,	 0),
    	new Equipment(`Baseball Cap`,	   `Reduce Visibility(Rain and Sun) penalty by 1.`,	0),
    	new Equipment(`Bicycle`,			`Athletics 3#. Speed x3yds (x.7mph). 2h.`,		  8),
    	new Equipment(`Binoculars`,		 `+3 Perception(See) at 50+yds.`,					1),
    	new Equipment(`Bobby Pin`,		  `Allows Larceny(Disable) roll on key locks.`,	   0),
    	new Equipment(`Bolt Cutters`,	   `C9# to cut metal (Handcuffs, Padlocks, etc).`,	 3),
    	new Equipment(`Cage Trap`,		  `+3 Survival(Forage). Takes 1day.`,				 6),
    	new Equipment(`Candle`,			 `1yd light radius for 6hrs.`,					   0),
    	new Equipment(`Candy`,			  `Restores 1 Luck point. 1/day.`,					0),
    	new Equipment(`Carabiner`,		  `+1 Athletics(Climb and Rappel). Holds 50Sz.`,	  0),
    	new Equipment(`Compass`,			`+3 Survival(Navigate). Always points North.`,	  0),
    	new Equipment(`Cowboy Hat`,		 `Reduce Visibility(Rain and Sun) penalty by 3.`,	0),
    	new Equipment(`Chalk`,			  `Used to temporarily write on any surface.`,		0),
    	new Equipment(`Chemical`,		   `Substances used for Science(Chemistry).`,		  1),
    	new Equipment(`Choker Leash`,	   `+3 Tame. Grabbed. C +3 vs C to control.`,		  1),
    	new Equipment(`Duct Tape`,		  `+1 Build/1yd or use 2yds as Handcuffs. 60yds.`,	1),
    	new Equipment(`Dust Mask`,		  `+3 C vs airborne toxins. Mask.`,				   1),
    	new Equipment(`Ear Plugs`,		  `No Deafness from noise. -3 Perception(Hear).`,	 9),
    	new Equipment(`Egg Timer`,		  `Set up to 60mins. Loud ringing for 1min.`,		 1),
    	new Equipment(`Fire-stick`,		 `+3 Survival(Camp). Magnesium rod and steel.`,	  0),
    	new Equipment(`Fishing Pole`,	   `+1 Survival(Forage) at river, lake, or ocean.`,	2),
    	new Equipment(`Flare Gun`,		  `Pistol. RNG:3. Ammo: 12g Flares or 1 use 12g.`,	1),
    	new Equipment(`Flippers`,		   `+3 Athletics(Swim). -6 walking Speed.`,			2),
    	new Equipment(`Food`,			   `Contains 1 Food to feed a person for a day.`,	  1),
    	new Equipment(`Gas Mask`,		   `+6 C vs airborne toxins. Mask. -1 Perception.`,	1),
    	new Equipment(`Glass Cutter`,	   `Cuts glass quietly.`,							  0),
    	new Equipment(`Goggles`,			`+3 C to resist toxins in eyes.`,				   1),
    	new Equipment(`Grappling Hook`,	 `+3 Athletics(Climb and Rappel). Holds 100Sz.`,	 2),
    	new Equipment(`Gun Cleaning Kit`,   `Gun gets +1 RATK for 1day. Takes 1hr/gun.`,		1),
    	new Equipment(`Hacksaw`,			`1DMG/rnd of sawing to almost any material.`,	   2),
    	new Equipment(`Hammock`,			`Suspended sleeping device for 1 person.`,		  1),
    	new Equipment(`Handcuffs`,		  `Grabbed. A15# to escape. Larceny(Disable) 12#.`,   1),
    	new Equipment(`Leather Belt`,	   `1yd strap. Stops Limb Bleeding. Holds 50Sz.`,	  1),
    	new Equipment(`Lifejacket`,		 `+6 Athletics(Swim). Prevents drowning.`,		   2),
    	new Equipment(`Lighter`,			`Makes a small fire. 1yd radius light.`,			0),
    	new Equipment(`Lockpicks`,		  `+3 Larceny(Disable) key locks. 6 picks.`,		  1),
    	new Equipment(`Luxury Item`,		`Toilet paper, cigarette, etc. +1 Psyche 1/wk.`,	0),
    	new Equipment(`Magnifying Glass`,   `+6 Perception(See) to inspect tiny details.`,	  1),
    	new Equipment(`Makeup`,			 `+1 Socialize and Entertain for 6hrs. 30 uses.`,	0),
    	new Equipment(`Marbles`,			`30/bag. 2sqyd area. A12# or fall Prone.`,		  1),
    	new Equipment(`Marker`,			 `Used to permanently write on any surface.`,		0),
    	new Equipment(`Matchbook`,		  `+1 Survival(Camp). 1yd light radius, 3rnds.`,	  0),
    	new Equipment(`Measuring Cup`,	  `+3 Science(Chemistry). Marked glass cup.`,		 1),
    	new Equipment(`Monocular`,		  `+1 Perception(See) at 25+yds.`,					1),
    	new Equipment(`Multi-Tool`,		 `+1 Larceny(Disable), Build, Science(Tech).`,	   1),
    	new Equipment(`Musical Instrument`, `+1 Entertain(Distract and Inspire).`,			  1),
    	new Equipment(`Mylar Blanket`,	  `CR. 1yd x 2yd reflective foil sheet.`,			 0),
    	new Equipment(`Notebook`,		   `100 pages of paper with a wire binding.`,		  1),
    	new Equipment(`Padlock`,			`10HP. 6DR. Larceny(Disable) 9#.`,				  1),
    	new Equipment(`Paracord`,		   `60yd coil. Holds 50Sz.`,						   1),
    	new Equipment(`Part`,			   `Scrap used for Build and Science(Tech).`,		  1),
    	new Equipment(`Pepper Spray`,	   `+1 Ranged(Gun). RNG:1. 3 Pain. 3 uses. Toxin.`,	0),
    	new Equipment(`Pocket Mirror`,	  `Perception(See) 6# to see from behind Cover.`,	 0),
    	new Equipment(`Poncho`,			 `CR. Waterproof.`,								  0),
    	new Equipment(`Rat Trap`,		   `+1 Survival(Forage). Takes 1day.`,				 1),
    	new Equipment(`Road Flare`,		 `3FDMG. 10yd light radius for 20mins.`,			 1),
    	new Equipment(`Rollerblades`,	   `Athletics 6#. Speed x3. 1rnd equip. Fail:Prone.`,  2),
    	new Equipment(`Rope`,			   `30yd nylon coil. Holds 100Sz.`,					2),
    	new Equipment(`Running Shoes`,	  `+1 mile of Jogging distance.`,					 2),
    	new Equipment(`Skateboard`,		 `Athletics 6#. Speed x3. Fail:Prone.`,			  3),
    	new Equipment(`Sleeping Bag`,	   `Insulated bag for up to 2 people. CR +3hrs.`,	  3),
    	new Equipment(`Snorkel`,			`Breathe while just beneath water's surface.`,	 1),
    	new Equipment(`Spotting Scope`,	 `+6 Perception(See) at 100+yds.`,				   2),
    	new Equipment(`Spray Paint`,		`RATK Called Shot:Head. Blind d6rnds. 10 uses.`,	1),
    	new Equipment(`Sunglasses`,		 `No Visibility(Sun) penalty. +1 C vs light.`,	   0),
    	new Equipment(`Swiss Army Knife`,   `+1 Build and Survival.`,						   1),
    	new Equipment(`Tape Measure`,	   `+1 Build. 10yd long wind-up metal tape.`,		  2),
    	new Equipment(`Tarp`,			   `3yd x 3yd plastic sheet. CR. Waterproof.`,		 1),
    	new Equipment(`Tent`,			   `4 person. 5min setup/take-down. CR +3hrs.`,		6),
    	new Equipment(`Thermal Underwear`,  `CR. Can use as 6 Bandages.`,					   1),
    	new Equipment(`Tool Bag`,		   `+3 Build. Pliers, wrenches, level, etc.`,		  3),
    	new Equipment(`Water Filter`,	   `Purifies 1 Water ration (.5gal) per minute.`,	  1),
    	new Equipment(`Whetstone`,		  `Blade gets +1 DMG for 1day. Takes 1hr/blade.`,	 1),
    	new Equipment(`Whistle`,			`+1 Tame(Train). Loud shriek 500yd radius.`,		0),
    	new Equipment(`Wire Saw`,		   `1DMG/rnd of sawing to wood or bone.`,			  1),
    	new Equipment(`Wristwatch`,		 `Tells time and +1 Survival(Navigate).`,			0),
    	new Equipment(`Zip Tie`,			`Grabbed. C9# to escape. Use for +1 Build.`,		0)
    ];

    class Medical extends Gear {
    	constructor(name, description, sz) {
    		super(name, description, sz);
    	}
    }

    const MedicalList = [
    	new Medical(`Bandage`,		  `+1 Medicine(First-Aid). 1 use.`,						   0),
    	new Medical(`Crutch`,		   `Halves Leg DMG Pain penalty to Speed.`,					3),
    	new Medical(`EMT Bag`,		  `+3 Medicine(First-Aid). 30 uses.`,						 5),
    	new Medical(`First-Aid Kit`,	`+1 Medicine(First-Aid). 5 uses.`,						  1),
    	new Medical(`Pressure Cuff`,	`+1 Medicine.`,											 1),
    	new Medical(`Stethoscope`,	  `+1 Medicine. Perception(Hear) 6# through doors.`,		  1),
    	new Medical(`Surgery Kit`,	  `+3 Medicine(Surgery).`,									3),
    	new Medical(`Thermometer`,	  `+1 Medicine. Accurately reads temperature.`,			   0),
    	new Medical(`Transfusion Kit`,  `Medicine 9#. Heal 1 Wound. Takes 1hr.`,					1),
    ];

    class MeleeWeapon extends Gear {
    	constructor(name, dmg, hands, rng, description, sz) {
    		super(name, description, sz);
    		this.dmg = dmg;
    		this.hands = hands;
    		this.rng = rng;
    	}
    }

    const MeleeList = [
    	new MeleeWeapon(`Ax`,			   5, 2, 2, [`Slow`, `Chop`],		  4),
    	new MeleeWeapon(`Baseball Bat`,	 3, 2, 2, [],						3),
    	new MeleeWeapon(`Brass Knuckles`,   2, 1, 1, [`Unarmed`],			   1),
    	new MeleeWeapon(`Crowbar`,		  3, 1, 2, [],						3),
    	new MeleeWeapon(`Hammer`,		   2, 1, 1, [],						2),
    	new MeleeWeapon(`Hatchet`,		  2, 1, 1, [`Chop`],				  2),
    	new MeleeWeapon(`Knife`,			2, 1, 1, [`Pierce`, `Rapid`],	   1),
    	new MeleeWeapon(`Machete`,		  3, 1, 2, [`Chop`],				  2),
    	new MeleeWeapon(`Shield`,		   1, 1, 1, [`Cover 3DR`, `+3 Block`], 4),
    	new MeleeWeapon(`Sledgehammer`,	 5, 2, 2, [`Slow`],				  5),
    	new MeleeWeapon(`Spear`,			4, 2, 3, [`Pierce`],				3),
    	new MeleeWeapon(`Staff`,			2, 2, 3, [],						3)
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

    const RangedList = [
    	new RangedWeapon(`Bolt-Action Rifle`,			   3, 2, 200,  5,  `.308`,	 `C`, [],					4),
    	new RangedWeapon(`Compound Bow`,					1, 2, 10,   1,  `Arrow`,	`C`, [],					4),
    	new RangedWeapon(`Crossbow`,						2, 2, 20,   1,  `Arrow`,	`C`, [],					4),
    	new RangedWeapon(`Double-Barrel Shotgun`,		   4, 2, 20,   2,  `12g`,	  `C`, [`Rapid`, `Scatter`],  4),
    	new RangedWeapon(`Lever-Action Rifle`,			  2, 2, 50,   10, `.357`,	 `C`, [],					3),
    	new RangedWeapon(`Pump Shotgun`,					4, 2, 20,   6,  `12g`,	  `C`, [`Scatter`],		   4),
    	new RangedWeapon(`Revolver`,						2, 1, 10,   6,  `.357`,	 `C`, [],					2),
    	new RangedWeapon(`Semi-Auto Carbine`,			   1, 2, 30,   30, `9mm`,	  `C`, [`Rapid`],			 3),
    	new RangedWeapon(`Semi-Auto Pistol`,				1, 1, 10,   15, `9mm`,	  `C`, [`Rapid`],			 1),
    	new RangedWeapon(`Semi-Auto Rifle`,				 2, 2, 100,  30, `5.56`,	 `C`, [`Rapid`],			 3),
    	new RangedWeapon(`Semi-Auto Shotgun`,			   4, 2, 20,   6,  `12g`,	  `C`, [`Rapid`, `Scatter`],  4),
    	new RangedWeapon(`Target Pistol`,				   1, 2, 30,   10, `.22`,	  `C`, [`Rapid`],			 1),
    	new RangedWeapon(`Target Rifle`,					1, 2, 50,   10, `.22`,	  `C`, [`Rapid`],			 3),
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

    class Storage extends Gear {
    	constructor(name, slots, description, sz) {
    		super(name, description, sz);
    		this.slots = slots;
    	}
    }

    const StorageList = [
    	new Storage(`Backpack`,			 30, `2rnds to access.`,								 1),
    	new Storage(`Bandoleer`,			1,  `Holds 50 bullets of any caliber.`,				 0),
    	new Storage(`BDU Jacket`,		   4,  `Camo.`,											0),
    	new Storage(`Cargo Pants`,		  6,  `Camo.`,											1),
    	new Storage(`Canteen`,			  1,  `Holds 1 unit (.5gal) of liquid. Metal.`,		   1),
    	new Storage(`Concealed Holster`,	1,  `Perception 12# to spot a Size 1 Gun.`,			 0),
    	new Storage(`Cooler`,			   30, `Hunted or Foraged Food lasts 6 days.`,			 4),
    	new Storage(`Duffel Bag`,		   40, `2rnds to access.`,								 3),
    	new Storage(`Fuel Can`,			 5,  `5gal Fuel. d6FDMG/gal, 1min, 1yd/gal Blast.`,	  2),
    	new Storage(`Hoody`,				2,  `CR.`,											  0),
    	new Storage(`Hydration Pack`,	   4,  `Holds 4 units (2gal) of liquid.`,				  1),
    	new Storage(`Lockbox`,			  1,  `10HP. 6DR. FR. Larceny(Disable) 9#.`,			  2),
    	new Storage(`Messenger Bag`,		4,  `1rnd to access.`,								  2),
    	new Storage(`Plastic Jug`,		  2,  `Holds 2 units (1gal) of liquid.`,				  1),
    	new Storage(`Purse`,				3,  `1rnd to access.`,								  1),
    	new Storage(`Speed-loader`,		 0,  `Reload a revolver cylinder as 1 action.`,		  0),
    	new Storage(`Tool Belt`,			6,  `6x 1 Slots. +1 Build. Miscellaneous small tools.`, 2),
    	new Storage(`Trench Coat`,		  4,  `CR. +1 Stealth.`,								  1),
    	new Storage(`Water Bottle`,		 1,  `Holds 1 unit (.5gal) of liquid.`,				  1),
    ];

    //VEHICLES
    	// function Vehicle(name,hp,dr,dmg,spd,mph,han,mpg,fuel,occ,car,area,sz){
    	//	 this.name = name;
    	//	 this.hp = hp;
    	//	 this.dr = dr;
    	//	 this.dmg = dmg;
    	//	 this.spd = spd;
    	//	 this.mph = mph;
    	//	 this.han = han;
    	//	 this.mpg = mpg;
    	//	 this.fuel = fuel;
    	//	 this.occ = occ;
    	//	 this.car = car;
    	//	 this.area = area;
    	//	 this.sz = sz;
    	// }

    	// const iAmbulance = new Vehicle(`Ambulance`,40,1,10,120,80,`-3`,10,35,4,200,`7x3`);
    	// const iBoxTruck = new Vehicle(`Box Truck`,40,1,10,90,60,`-3`,10,40,2,1600,`10x3`);
    	// const iBus = new Vehicle(`Bus`,50,3,12,90,60,`-6`,15,100,60,1200,`12x4`);
    	// const iMotorcycle = new Vehicle(`Motorcycle`,20,0,4,150,100,`+1`,40,5,2,30,`3x1`);
    	// const iMuscleCar = new Vehicle(`Muscle Car`,40,1,6,180,120,`+1`,10,20,4,80,`5x2`);
    	// const iPickupTruck = new Vehicle(`Pickup Truck`,40,1,8,150,100,`-1`,20,20,2,400,`6x2`);
    	// const iPoliceCruiser = new Vehicle(`Police Cruiser`,40,1,6,180,120,`+1`,10,20,4,100,`5x2`);
    	// const iSedan = new Vehicle(`Sedan`,30,1,6,150,100,`+0`,30,12,4,100,`5x2`);
    	// const iSemitruck = new Vehicle(`Semi-truck`,50,3,12,90,60,`-6`,5,120,2,16000,`25x4`);
    	// const iStreetBike = new Vehicle(`Street Bike`,20,0,4,180,120,`+3`,50,5,2,10,`3x1`);
    	// const iSUV = new Vehicle(`SUV`,40,1,8,150,100,`-1`,15,25,6,200,`6x2`);
    	// const iVan = new Vehicle(`Van`,40,1,10,120,80,`-3`,10,35,12,1200,`7x3`);
    	// const iLandVehiclesList = [iAmbulance,iBoxTruck,iBus,iMotorcycle,iMuscleCar,iPickupTruck,iPoliceCruiser,iSedan,iSemitruck,iStreetBike,iSUV,iVan];

    	// const iAirliner = new Vehicle(`Airliner`,150,3,``,900,600,`-6`,.5,5300,150,6000,`34x32`,14000);
    	// const iAirplane = new Vehicle(`Airplane`,40,0,``,240,160,`-3`,15,55,4,200,`9x13`,340);
    	// const iChinook = new Vehicle(`Chinook`,120,9,``,240,160,`-6`,.1,9000,40,1000,`33x22`);
    	// const iFighterJet = new Vehicle(`Fighter Jet`,80,6,``,1800,1200,`-6`,1,2200,1,5,`19x13`,4600);
    	// const iGyrocopter = new Vehicle(`Gyrocopter`,10,0,``,180,120,`+0`,16,20,1,30,`9x9`);
    	// const iHelicopter = new Vehicle(`Helicopter`,50,0,``,210,140,`+3`,5,30,8,500,`13x11`);
    	// const iAircraftList = [iAirliner,iAirplane,iChinook,iFighterJet,iGyrocopter,iHelicopter];

    	// const iAirboat = new Vehicle(`Airboat`,20,0,``,90,60,`+1`,5,50,6,500,`3x2`);
    	// const iCanoe = new Vehicle(`Canoe*`,10,0,``,`C x3`,`C x2`,`-6`,0,0,4,50,`3x1`);
    	// const iCatamaran = new Vehicle(`Catamaran`,40,1,``,90,60,`-3`,15,200,4,500,`6x4`);
    	// const iInflatableRaft = new Vehicle(`Inflatable Raft*`,4,0,``,`C x1.5`,`C `,`+0`,0,0,6,50,`4x2`);
    	// const iJetSki = new Vehicle(`Jet Ski`,20,0,``,90,60,`+3`,5,15,3,0,`3x1`);
    	// const iKayak = new Vehicle(`Kayak*`,6,0,``,`C x1.5`,`C `,`+1`,0,0,1,20,`1x2`);
    	// const iMotorboat = new Vehicle(`Motorboat`,20,0,``,60,40,`+1`,10,10,6,100,`6x2`);
    	// const iRowboat = new Vehicle(`Rowboat*`,12,0,``,`C x1.5`,`C `,`-1`,0,0,4,100,`3x1`);
    	// const iSloop = new Vehicle(`Sloop`,50,3,``,60,40,`-6`,0,0,10,1000,`20x4`);
    	// const iSpeedboat = new Vehicle(`Speedboat`,30,1,``,90,60,`+1`,5,100,4,200,`8x3`);
    	// const iTrawler = new Vehicle(`Trawler`,60,6,``,30,20,`-6`,1.5,1000,8,10000,`12x6`);
    	// const iYacht = new Vehicle(`Yacht`,100,3,``,60,40,`-6`,1,1500,25,5000,`30x8`);
    	// const iWatercraftList = [iAirboat,iCanoe,iCatamaran,iInflatableRaft,iJetSki,iKayak,iMotorboat,iRowboat,iSloop,iSpeedboat,iTrawler,iYacht];
    /*
    	const iArmyTruck = new Vehicle(``,,,,,,``,``,,,,);
    	const iAPC = new Vehicle(``,,,,,,``,``,,,,);
    	const iATV = new Vehicle(``,,,,,,``,``,,,,);
    	const iBankTruck = new Vehicle(``,,,,,,``,``,,,,);
    	const iBulldozer = new Vehicle(``,,,,,,``,``,,,,);
    	const iDirtBike = new Vehicle(``,,,,,,``,``,,,,);
    	const iDuneBuggy = new Vehicle(``,,,,,,``,``,,,,);
    	const iFireEngine = new Vehicle(``,,,,,,``,``,,,,);
    	const iHumvee = new Vehicle(``,,,,,,``,``,,,,);
    	const iRV = new Vehicle(``,,,,,,``,``,,,,);
    	const iTank = new Vehicle(``,,,,,,``,``,,,,);
    	const iWagon = new Vehicle(``,,,,,,``,``,,,,);
    	const iRareLandVehicleList = [iArmyTruck,iAPC,iATV,iBankTruck,iBulldozer,iDirtBike,iDuneBuggy,iFireEngine,iHumvee,iRV,iTank,iWagon];
    */

    	//VEHICLE CUSTOMIZATIONS
    	// const cAirBag = new Gear(`Air Bag**`,`Build 12#. -3 Wreck BDMG to the Head for 1 occupant.`,6);
    	// const cAirFilter = new Gear(`Air Filter`,`Build 9#. +6C vs airborne toxins for occupants.`,3);
    	// const cBackupFuelTank = new Gear(`Backup Fuel Tank`,`Build # varies. +1 Fuel per 2 Size, 1 Part and 1#.`,`varies`);
    	// const cBallisticGlass = new Gear(`Ballistic Glass`,`Build 9#. 3 DR for windows.`,6);
    	// const cBodySpines = new Gear(`Body Spines`,`Build 3#. Dodge 9# to jump on or take 6DMG (Pierce).`,9);
    	// const cBrushGuard = new Gear(`Brush Guard`,`Build 9#. +1 DR vs front collisions.`,12);
    	// const cCargoRack = new Gear(`Cargo Rack**`,`Build 9#. +25% Carry capacity (round down).`,6);
    	// const cCBRadio = new Gear(`CB Radio`,`Build 12#. 40-channel 2-way radio. 6 mile range.`,3);
    	// const cEjectorSeat = new Gear(`Ejector Seat**`,`Build 12#. Throw occupant out of vehicle. See Wreck.`,12);
    	// const cEnhancedBrakes = new Gear(`Enhanced Brakes`,`Build 6#. Brake at -20mph/rnd.`,3);
    	// const cExoCage = new Gear(`Exo-Cage`,`Build 15#. Get one extra Prestine Condition level.`,18);
    	// const cFireSuppression = new Gear(`Fire Suppression`,`Build 9#. Puts out any fires on/in vehicle.`,6);
    	// const cFixedGun = new Gear(`Fixed Gun**`,`Build 3#*. Driver uses Drive(Combat) for RATK rolls.`,3);
    	// const cFloodLights = new Gear(`Flood Lights`,`Build 9#. No Visibility penalty in darkness. 10yds.`,3);
    	// const cFrameJack = new Gear(`Frame Jack**`,`Build 9#. Tire change time is halved on one side.`,6);
    	// const cFuelCapLock = new Gear(`Fuel Cap Lock`,`Build 3#. 10HP. Larceny(Disable) 9# takes d6mins.`,0);
    	// const cHiddenCompartment = new Gear(`Hidden Compartment`,`Build 9#. Perception 12# to find. Holds 2Sz.`,0);
    	// const cHighFlowExhaust = new Gear(`High-Flow Exhaust`,`Build 6#. Accelerate at +20mph/rnd.`,3);
    	// const cHubcapBlades = new Gear(`Hubcap Blades`,`Build 6#. +1 DR for side collisions.`,9);
    	// const cIntakeSnorkel = new Gear(`Intake Snorkel`,`Build 6#. Drive through water up to the windows.`,3);
    	// const cKeypadIgnition = new Gear(`Keypad Ignition`,`Build 12#. Coded starter. Science(Tech) 12# to break.`,0);
    	// const cLuxurySuspension = new Gear(`Luxury Suspension`,`Build 18#. Reduces Unstable penalty to -1.`,12);
    	// const cNitrousBooster = new Gear(`Nitrous Booster**`,`Build 15#. +20mph Speed and -3 Han for 1rnd. 3 uses.`,3);
    	// const cParachute = new Gear(`Parachute`,`Build 12#. Stops vehicle in 1rnd. 10rnds to repack.`,6);
    	// const cPayloadDropper = new Gear(`Payload Dropper**`,`Build 6#. Bomb or Jacks (Drive 12# or d6 flats).`,3);
    	// const cRackAndPinion = new Gear(`Rack and Pinion`,`Build 12#. +1 Han. Requires driver Constitution 3+.`,6);
    	// const cRamPlow = new Gear(`Ram Plow`,`Build 12#. +3 DR for front collisions. -25% MPG.`,15);
    	// const cRunFlatTires = new Gear(`Run-Flat Tires`,`Build 6#. +3 HP for Tires. Sz = 1 per Tire.`,`varies`);
    	// const cSafetyHarness = new Gear(`Safety Harness**`,`Build 6#. -1 Wreck BDMG for 1 occupant. Takes 3rnds.`,1);
    	// const cSlickDispenser = new Gear(`Slick Dispenser**`,`Build 3#. 1 Fuel, Drive vs Drive to Wreck pursuer.`,6);
    	// const cSteelPlates = new Gear(`Steel Plates`,`Build 15#. +3 DR for entire Vehicle. Sz = [Carry /2].`,`varies`);
    	// const cStrutBraces = new Gear(`Strut Braces`,`Build 6#. +1 Drive(Stunt).`,6);
    	// const cSupercharger = new Gear(`Supercharger`,`Build 18#. +20mph (+30yd) maximum Speed.`,9);
    	// const cTireChains = new Gear(`Tire Chains`,`Build 3#. Ignore Terrain penalties. -25% Speed.`,9);
    	// const cTurretGun = new Gear(`Turret Gun**`,`Build 6#*. Passenger uses Ranged for RATK rolls.`,9);
    	// const cWinch = new Gear(`Winch**`,`Build 9#. 30yd cable. 1yd/min. Hauls 2000Sz.`,15);
    	// const iVehicleCustomizationsList = [cAirBag,cAirFilter,cBackupFuelTank,cBallisticGlass,cBodySpines,cBrushGuard,cCargoRack,cCBRadio,cEjectorSeat,cEnhancedBrakes,cExoCage,cFireSuppression,cFixedGun,cFloodLights,cFrameJack,cFuelCapLock,cHiddenCompartment,cHighFlowExhaust,cHubcapBlades,cIntakeSnorkel,cKeypadIgnition,cLuxurySuspension,cNitrousBooster,cParachute,cPayloadDropper,cRackAndPinion,cRamPlow,cRunFlatTires,cSafetyHarness,cSlickDispenser,cSteelPlates,cStrutBraces,cSupercharger,cTireChains,cTurretGun,cWinch];

    /* src/components/creator/CreGear.svelte generated by Svelte v3.16.5 */
    const file$6 = "src/components/creator/CreGear.svelte";

    function get_each_context$5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (30:1) {#each ArmorList as armor}
    function create_each_block$5(ctx) {
    	let div;
    	let t_value = /*armor*/ ctx[4].name + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			add_location(div, file$6, 30, 2, 538);
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
    		id: create_each_block$5.name,
    		type: "each",
    		source: "(30:1) {#each ArmorList as armor}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
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
    	let dispose;
    	let each_value = ArmorList;
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
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
    			add_location(button, file$6, 27, 0, 456);
    			add_location(div0, file$6, 28, 0, 502);
    			add_location(br, file$6, 33, 0, 578);
    			add_location(div1, file$6, 34, 0, 583);
    			dispose = listen_dev(button, "click", /*rollArmor*/ ctx[1], false, false, false);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div0, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			insert_dev(target, t2, anchor);
    			insert_dev(target, br, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t4);
    			append_dev(div1, t5);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*ArmorList*/ 0) {
    				each_value = ArmorList;
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$5(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$5(child_ctx);
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
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div0);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(br);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div1);
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
    	let char;

    	const unsubscribe = CharacterStore.subscribe(value => {
    		char = value;
    	});

    	let armorResult = "";

    	function rollArmor() {
    		$$invalidate(0, armorResult = RandomArmor());
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("char" in $$props) char = $$props.char;
    		if ("armorResult" in $$props) $$invalidate(0, armorResult = $$props.armorResult);
    	};

    	return [armorResult, rollArmor];
    }

    class CreGear extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CreGear",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/pages/Creator.svelte generated by Svelte v3.16.5 */
    const file$7 = "src/pages/Creator.svelte";

    function create_fragment$9(ctx) {
    	let div1;
    	let t0;
    	let div0;
    	let button0;
    	let t2;
    	let button1;
    	let t4;
    	let button2;
    	let current;
    	let dispose;
    	var switch_value = /*screen*/ ctx[0].selected;

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			button0 = element("button");
    			button0.textContent = "Back";
    			t2 = space();
    			button1 = element("button");
    			button1.textContent = "Home";
    			t4 = space();
    			button2 = element("button");
    			button2.textContent = "Next";
    			attr_dev(button0, "class", "nav-button svelte-18f9rx4");
    			add_location(button0, file$7, 35, 2, 1087);
    			attr_dev(button1, "class", "nav-button svelte-18f9rx4");
    			add_location(button1, file$7, 36, 2, 1146);
    			attr_dev(button2, "class", "nav-button svelte-18f9rx4");
    			add_location(button2, file$7, 37, 2, 1205);
    			attr_dev(div0, "class", "nav-buttons svelte-18f9rx4");
    			add_location(div0, file$7, 34, 1, 1059);
    			attr_dev(div1, "class", "creator-page svelte-18f9rx4");
    			add_location(div1, file$7, 32, 0, 987);

    			dispose = [
    				listen_dev(button0, "click", /*back*/ ctx[1], false, false, false),
    				listen_dev(button1, "click", home, false, false, false),
    				listen_dev(button2, "click", /*next*/ ctx[2], false, false, false)
    			];
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);

    			if (switch_instance) {
    				mount_component(switch_instance, div1, null);
    			}

    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, button0);
    			append_dev(div0, t2);
    			append_dev(div0, button1);
    			append_dev(div0, t4);
    			append_dev(div0, button2);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (switch_value !== (switch_value = /*screen*/ ctx[0].selected)) {
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
    					mount_component(switch_instance, div1, t0);
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
    			if (detaching) detach_dev(div1);
    			if (switch_instance) destroy_component(switch_instance);
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

    function home() {
    	router.Home();
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let screen = {
    		step: 0,
    		options: [CreDescription, CreTraits, CreSkills, CreProperties, CreAbilities, CreGear]
    	};

    	screen.selected = screen.options[screen.step];

    	function back() {
    		$$invalidate(0, --screen.step);

    		if (screen.step == screen.options.length || screen.step < 0) {
    			router.Home();
    		} else {
    			$$invalidate(0, screen.selected = screen.options[screen.step], screen);
    		}
    	}

    	function next() {
    		$$invalidate(0, ++screen.step);

    		if (screen.step == screen.options.length || screen.step < 0) {
    			router.Home();
    		} else {
    			$$invalidate(0, screen.selected = screen.options[screen.step], screen);
    		}
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("screen" in $$props) $$invalidate(0, screen = $$props.screen);
    	};

    	return [screen, back, next];
    }

    class Creator extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Creator",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src/pages/Reference.svelte generated by Svelte v3.16.5 */
    const file$8 = "src/pages/Reference.svelte";

    function create_fragment$a(ctx) {
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
    			button0.textContent = "Combat";
    			t1 = space();
    			button1 = element("button");
    			button1.textContent = "Maneuvers";
    			t3 = space();
    			button2 = element("button");
    			button2.textContent = "Situations";
    			add_location(button0, file$8, 10, 1, 412);
    			add_location(button1, file$8, 11, 1, 465);
    			add_location(button2, file$8, 12, 1, 524);
    			attr_dev(div, "class", "menu-page");
    			add_location(div, file$8, 9, 0, 387);

    			dispose = [
    				listen_dev(button0, "click", router.RefCombat, false, false, false),
    				listen_dev(button1, "click", router.RefManeuvers, false, false, false),
    				listen_dev(button2, "click", router.RefSituations, false, false, false)
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
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class Reference extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Reference",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src/pages/Home.svelte generated by Svelte v3.16.5 */
    const file$9 = "src/pages/Home.svelte";

    function create_fragment$b(ctx) {
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
    			add_location(button0, file$9, 7, 1, 165);
    			add_location(button1, file$9, 8, 1, 227);
    			attr_dev(div, "class", "menu-page");
    			add_location(div, file$9, 6, 0, 140);

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
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    // export const appRoutes = [
    // 	{ path: `/`, component: Home },
    // 	{ path: `/creator`, component: Creator },
    // 	{ path: `/reference`, component: Reference },
    // 	{ path: `/reference/combat`, component: RefCombat },
    // 	{ path: `/reference/maneuvers`, component: RefManeuvers },
    // 	{ path: `/reference/situations`, component: RefSituations },
    // ]

    // let newRouter = {}

    // appRoutes.forEach((r) => {
    // 	newRouter[r.component.name] = () => { navigate(`${r.path}`, { replace: true }) }
    // })

    // export const router = newRouter

    const router = {
    	Home: () => { navigate(`/`, { replace: true }); },
    	Creator: () => { navigate(`/creator`, { replace: true }); },
    	Traits: () => { navigate(`/`, { replace: true }); },
    	Reference: () => { navigate(`/reference`, { replace: true }); },
    	RefCombat: () => { navigate(`/reference/combat`, { replace: true }); },
    	RefManeuvers: () => { navigate(`/reference/maneuvers`, { replace: true }); },
    	RefSituations: () => { navigate(`/reference/situations`, { replace: true }); }
    };

    /* src/layout/TitleBar.svelte generated by Svelte v3.16.5 */
    const file$a = "src/layout/TitleBar.svelte";

    function create_fragment$c(ctx) {
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
    			attr_dev(span0, "class", "title svelte-390odh");
    			add_location(span0, file$a, 5, 1, 107);
    			attr_dev(span1, "class", "beta svelte-390odh");
    			add_location(span1, file$a, 6, 1, 154);
    			attr_dev(button, "class", "title-bar svelte-390odh");
    			add_location(button, file$a, 4, 0, 56);
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
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class TitleBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TitleBar",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src/layout/DisplayWindow.svelte generated by Svelte v3.16.5 */

    const file$b = "src/layout/DisplayWindow.svelte";

    function create_fragment$d(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "display-window svelte-1ilsnab");
    			add_location(div, file$b, 0, 0, 0);
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
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
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

    class DisplayWindow extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DisplayWindow",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.16.5 */

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
    		p: function update(ctx, dirty) {
    			const router_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				router_changes.$$scope = { dirty, ctx };
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
    		p: function update(ctx, dirty) {
    			const displaywindow_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				displaywindow_changes.$$scope = { dirty, ctx };
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

    function create_fragment$e(ctx) {
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
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$e, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$e.name
    		});
    	}
    }

    const app = new App({
    	target: document.body
    });

    return app;

}());
//# sourceMappingURL=apocalyptia-online.js.map
