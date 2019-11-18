
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

    /* node_modules/svelte-routing/src/Router.svelte generated by Svelte v3.14.1 */

    function create_fragment(ctx) {
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
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
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
    		init(this, options, instance, create_fragment, safe_not_equal, { basepath: 0, url: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment.name
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

    /* node_modules/svelte-routing/src/Route.svelte generated by Svelte v3.14.1 */
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

    function create_fragment$1(ctx) {
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
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { path: 0, component: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment$1.name
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

    /* src/layout/TitleBar.svelte generated by Svelte v3.14.1 */

    const file = "src/layout/TitleBar.svelte";

    function create_fragment$2(ctx) {
    	let a;
    	let div;
    	let span0;
    	let t1;
    	let span1;

    	const block = {
    		c: function create() {
    			a = element("a");
    			div = element("div");
    			span0 = element("span");
    			span0.textContent = "APOCALYPTIA ONLINE";
    			t1 = space();
    			span1 = element("span");
    			span1.textContent = "beta";
    			attr_dev(span0, "class", "title svelte-r73pl3");
    			add_location(span0, file, 2, 8, 77);
    			attr_dev(span1, "class", "beta svelte-r73pl3");
    			add_location(span1, file, 3, 8, 131);
    			attr_dev(div, "class", "title-bar svelte-r73pl3");
    			add_location(div, file, 1, 4, 45);
    			attr_dev(a, "href", "http://www.apocalyptiarpg.com");
    			add_location(a, file, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, div);
    			append_dev(div, span0);
    			append_dev(div, t1);
    			append_dev(div, span1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
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

    class TitleBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TitleBar",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/layout/NavBar.svelte generated by Svelte v3.14.1 */

    function create_fragment$3(ctx) {
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
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class NavBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavBar",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    const router = {
        goHome: function() { navigate("/", {replace: true}); },
        goCharacter: function() { navigate("/character", {replace: true});},
        goRules: function() { navigate("/rules", {replace: true});},
        goDonate: function() { navigate("/donate", {replace: true});},
        goLanding: function() { navigate("/landing", {replace: true});}
    };

    class Character {
        constructor() {
            this.scenario = '',
            this.completed = false,
            this.description = {
                playerName: {
                    label: "Player",
                    value: ""
                },
                characterName: {
                    label: "Character",
                    value: ""
                },
                height: {
                    label: "Height",
                    value: ""
                },
                weight: {
                    label: "Weight",
                    value: ""
                },
                hair: {
                    label: "Hair",
                    value: ""
                },
                skin: {
                    label: "Skin",
                    value: ""
                },
                gender: {
                    label: "Gender",
                    value: ""
                },
                age: {
                    label: "Age",
                    value: ""
                }
            },
            this.traits = {
                agility: { name: "Agility", base: 1, score: 1 },
                brains: { name: "Brains", base: 1, score: 1 },
                constitution: { name: "Constitution", base: 1, score: 1 },
                demeanor: { name: "Demeanor", base: 1, score: 1 }
            },
            this.skills = {
                build: { name: "Build", parent: "Constitution", base: 0, score: 0, max: 1},
                drive: { name: "Drive", parent: "Constitution", base: 0, score: 0, max: 1 },
                leadership: { name: "Leadership", parent: "Demeanor", base: 0, score: 0, max: 1 },
                manipulate: { name: "Manipulate", parent: "Agility", base: 0, score: 0, max: 1 },
                medicine: { name: "Medicine", parent: "Brains", base: 0, score: 0, max: 1 },
                melee: { name: "Melee", parent: "Constitution", base: 0, score: 0, max: 1 },
                perform: { name: "Perform", parent: "Demeanor", base: 0, score: 0, max: 1 },
                ranged: { name: "Ranged", parent: "Agility", base: 0, score: 0, max: 1 },
                science: { name: "Science", parent: "Brains", base: 0, score: 0, max: 1 },
                stealth: { name: "Stealth", parent: "Agility", base: 0, score: 0, max: 1 },
                survival: { name: "Survival", parent: "Brains", base: 0, score: 0, max: 1 },
                tame: { name: "Tame", parent: "Demeanor", base: 0, score: 0, max: 1 }
            },
            this.properties = {
                actions: { name: "Actions", base: 2, score: 2 },
                perception: { name: "Perception", base: 1, score: 1 },
                luck: { name: "Luck", base: 1, score: 1 },
                xp: { name: "Experience", base: 6, score: 6 },
                speed: { name: "Speed", base: 2, score: 2 }
            },
            this.defenses = {
                block: { name: "Block", base: 0, score: 0 },
                dodge: { name: "Dodge", base: 0, score: 0 },
                reflex: { name: "Reflex", base: 0, score: 0 }
            },
            this.abilities = [],
            this.gear = {
                armor: {
                    name: "Armor",
                    inventory: []
                },
                weapons: {
                    name: "Weapons",
                    inventory: []
                },
                backpack: {
                    name: "Backpack",
                    inventory: []
                },
                ammo: {
                    name: "Ammo",
                    inventory: []
                }
            },
            this.traits_remaining = () => {
                return 12 -
                this.traits.agility.score -
                this.traits.brains.score -
                this.traits.constitution.score -
                this.traits.demeanor.score
            },
            this.skills_remaining = () => {
                return (this.traits.brains.score * 6) -
                this.skills.manipulate.score -
                this.skills.ranged.score -
                this.skills.stealth.score -
                this.skills.medicine.score -
                this.skills.science.score -
                this.skills.survival.score -
                this.skills.build.score -
                this.skills.drive.score -
                this.skills.melee.score -
                this.skills.leadership.score -
                this.skills.perform.score -
                this.skills.tame.score
            },
            this.set_health = () => {
                return this.traits.constitution.score * 3;
            };
            this.set_psyche = () => {
                return this.traits.demeanor.score * 3;
            };
            this.action_points = () => {
                return Math.floor(
                    (
                        this.traits.agility.score +
                        this.traits.brains.score
                    ) / 2
                );
            },
            this.perception_score = () => {
                return this.traits.brains.score
            },
            this.luck_points = () => {
                return this.traits.demeanor.score
            },
            this.experience_points = () => {
                return this.traits.brains.score * 6
            },
            this.speed_points = () => {
                return this.traits.agility.score + this.traits.constitution.score
            },
            this.reflex_score = () => {
                return Math.round(this.traits.brains.score / 2)
            },
            this.dodge_score = () => {
                return this.traits.agility.score
            },
            this.block_score = () => {
                return this.skills.melee.score
            };
        }
    }

    const NewCharacter = new Character();

    const CharacterStore = writable(NewCharacter);

    /* src/components/creator/Description.svelte generated by Svelte v3.14.1 */
    const file$1 = "src/components/creator/Description.svelte";

    function create_fragment$4(ctx) {
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
    			add_location(h2, file$1, 12, 8, 331);
    			attr_dev(div0, "class", "section-title");
    			add_location(div0, file$1, 11, 4, 295);
    			attr_dev(span0, "class", "stat-label");
    			add_location(span0, file$1, 15, 8, 400);
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "class", "full-input");
    			add_location(input0, file$1, 16, 8, 448);
    			attr_dev(div1, "class", "stat-block");
    			add_location(div1, file$1, 14, 4, 367);
    			attr_dev(span1, "class", "stat-label");
    			add_location(span1, file$1, 24, 8, 657);
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "class", "full-input");
    			add_location(input1, file$1, 25, 8, 708);
    			attr_dev(div2, "class", "stat-block");
    			add_location(div2, file$1, 23, 4, 624);
    			attr_dev(span2, "class", "stat-label");
    			add_location(span2, file$1, 34, 12, 962);
    			attr_dev(input2, "type", "text");
    			attr_dev(input2, "class", "half-input svelte-19d9kui");
    			add_location(input2, file$1, 35, 12, 1014);
    			attr_dev(div3, "class", "half-stat-block svelte-19d9kui");
    			add_location(div3, file$1, 33, 8, 920);
    			attr_dev(span3, "class", "stat-label");
    			add_location(span3, file$1, 43, 12, 1256);
    			attr_dev(input3, "type", "text");
    			attr_dev(input3, "class", "half-input svelte-19d9kui");
    			add_location(input3, file$1, 44, 12, 1308);
    			attr_dev(div4, "class", "half-stat-block svelte-19d9kui");
    			add_location(div4, file$1, 42, 8, 1214);
    			attr_dev(div5, "class", "stat-block");
    			add_location(div5, file$1, 32, 4, 887);
    			attr_dev(span4, "class", "stat-label");
    			add_location(span4, file$1, 54, 12, 1590);
    			attr_dev(input4, "type", "text");
    			attr_dev(input4, "class", "half-input svelte-19d9kui");
    			add_location(input4, file$1, 55, 12, 1640);
    			attr_dev(div6, "class", "half-stat-block svelte-19d9kui");
    			add_location(div6, file$1, 53, 8, 1548);
    			attr_dev(span5, "class", "stat-label");
    			add_location(span5, file$1, 63, 12, 1880);
    			attr_dev(input5, "type", "text");
    			attr_dev(input5, "class", "half-input svelte-19d9kui");
    			add_location(input5, file$1, 64, 12, 1930);
    			attr_dev(div7, "class", "half-stat-block svelte-19d9kui");
    			add_location(div7, file$1, 62, 8, 1838);
    			attr_dev(div8, "class", "stat-block");
    			add_location(div8, file$1, 52, 4, 1515);
    			attr_dev(span6, "class", "stat-label");
    			add_location(span6, file$1, 74, 12, 2210);
    			attr_dev(input6, "type", "text");
    			attr_dev(input6, "class", "half-input svelte-19d9kui");
    			add_location(input6, file$1, 75, 12, 2262);
    			attr_dev(div9, "class", "half-stat-block svelte-19d9kui");
    			add_location(div9, file$1, 73, 8, 2168);
    			attr_dev(span7, "class", "stat-label");
    			add_location(span7, file$1, 83, 12, 2504);
    			attr_dev(input7, "type", "text");
    			attr_dev(input7, "class", "half-input svelte-19d9kui");
    			add_location(input7, file$1, 84, 12, 2553);
    			attr_dev(div10, "class", "half-stat-block svelte-19d9kui");
    			add_location(div10, file$1, 82, 8, 2462);
    			attr_dev(div11, "class", "stat-block");
    			add_location(div11, file$1, 72, 4, 2135);
    			attr_dev(div12, "id", "description-section");
    			attr_dev(div12, "class", "sheet-section");
    			add_location(div12, file$1, 10, 0, 238);

    			dispose = [
    				listen_dev(input0, "input", ctx.input0_input_handler),
    				listen_dev(input0, "input", change, false, false, false),
    				listen_dev(input1, "input", ctx.input1_input_handler),
    				listen_dev(input1, "input", change, false, false, false),
    				listen_dev(input2, "input", ctx.input2_input_handler),
    				listen_dev(input2, "input", change, false, false, false),
    				listen_dev(input3, "input", ctx.input3_input_handler),
    				listen_dev(input3, "input", change, false, false, false),
    				listen_dev(input4, "input", ctx.input4_input_handler),
    				listen_dev(input4, "input", change, false, false, false),
    				listen_dev(input5, "input", ctx.input5_input_handler),
    				listen_dev(input5, "input", change, false, false, false),
    				listen_dev(input6, "input", ctx.input6_input_handler),
    				listen_dev(input6, "input", change, false, false, false),
    				listen_dev(input7, "input", ctx.input7_input_handler),
    				listen_dev(input7, "input", change, false, false, false)
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
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function change() {
    	CharacterStore.update(char => {
    		return char;
    	});
    }

    function instance$2($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$2, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Description",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/components/creator/Traits.svelte generated by Svelte v3.14.1 */

    const { Object: Object_1 } = globals;
    const file$2 = "src/components/creator/Traits.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = Object_1.create(ctx);
    	child_ctx.key = list[i][0];
    	return child_ctx;
    }

    // (18:4) {#each Object.entries(char.traits) as [key]}
    function create_each_block(ctx) {
    	let div;
    	let span;
    	let t0_value = ctx.char.traits[ctx.key].name + "";
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
    			add_location(span, file$2, 19, 12, 547);
    			attr_dev(input, "class", "stat-input");
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", "1");
    			attr_dev(input, "max", input_max_value = Math.min(6, ctx.char.traits[ctx.key].score + ctx.char.traits_remaining()));
    			add_location(input, file$2, 20, 12, 615);
    			attr_dev(div, "class", "stat-block");
    			add_location(div, file$2, 18, 8, 510);

    			dispose = [
    				listen_dev(input, "input", input_input_handler),
    				listen_dev(input, "input", change$1, false, false, false)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span);
    			append_dev(span, t0);
    			append_dev(div, t1);
    			append_dev(div, input);
    			set_input_value(input, ctx.char.traits[ctx.key].score);
    			append_dev(div, t2);
    		},
    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;
    			if (changed.char && t0_value !== (t0_value = ctx.char.traits[ctx.key].name + "")) set_data_dev(t0, t0_value);

    			if (changed.char && input_max_value !== (input_max_value = Math.min(6, ctx.char.traits[ctx.key].score + ctx.char.traits_remaining()))) {
    				attr_dev(input, "max", input_max_value);
    			}

    			if (!input_updating && (changed.char || changed.Object)) {
    				set_input_value(input, ctx.char.traits[ctx.key].score);
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
    		source: "(18:4) {#each Object.entries(char.traits) as [key]}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div2;
    	let div0;
    	let h2;
    	let t1;
    	let div1;
    	let h3;
    	let t2;
    	let t3_value = ctx.char.traits_remaining() + "";
    	let t3;
    	let t4;
    	let each_value = Object.entries(ctx.char.traits);
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
    			t3 = text(t3_value);
    			t4 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(h2, file$2, 12, 8, 326);
    			attr_dev(div0, "class", "section-title");
    			add_location(div0, file$2, 11, 4, 290);
    			add_location(h3, file$2, 15, 8, 389);
    			attr_dev(div1, "class", "remaining");
    			add_location(div1, file$2, 14, 4, 357);
    			attr_dev(div2, "id", "traits-section");
    			attr_dev(div2, "class", "sheet-section");
    			add_location(div2, file$2, 10, 0, 238);
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
    			if (changed.char && t3_value !== (t3_value = ctx.char.traits_remaining() + "")) set_data_dev(t3, t3_value);

    			if (changed.Math || changed.char || changed.Object || changed.change) {
    				each_value = Object.entries(ctx.char.traits);
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
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function change$1() {
    	CharacterStore.update(char => {
    		return char;
    	});
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let char;

    	const unsubscribe = CharacterStore.subscribe(value => {
    		$$invalidate("char", char = value);
    	});

    	function input_input_handler({ key }) {
    		char.traits[key].score = to_number(this.value);
    		$$invalidate("char", char);
    		$$invalidate("Object", Object);
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("char" in $$props) $$invalidate("char", char = $$props.char);
    	};

    	return { char, input_input_handler };
    }

    class Traits extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Traits",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/components/creator/Skills.svelte generated by Svelte v3.14.1 */

    const { Object: Object_1$1 } = globals;
    const file$3 = "src/components/creator/Skills.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = Object_1$1.create(ctx);
    	child_ctx.key = list[i][0];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = Object_1$1.create(ctx);
    	child_ctx.key = list[i][0];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = Object_1$1.create(ctx);
    	child_ctx.key = list[i][0];
    	return child_ctx;
    }

    function get_each_context_3(ctx, list, i) {
    	const child_ctx = Object_1$1.create(ctx);
    	child_ctx.key = list[i][0];
    	return child_ctx;
    }

    // (30:20) {:else}
    function create_else_block_3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("[+]");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_3.name,
    		type: "else",
    		source: "(30:20) {:else}",
    		ctx
    	});

    	return block;
    }

    // (28:20) {#if agility_visible}
    function create_if_block_11(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("[-]");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_11.name,
    		type: "if",
    		source: "(28:20) {#if agility_visible}",
    		ctx
    	});

    	return block;
    }

    // (37:8) {#if agility_visible}
    function create_if_block_9(ctx) {
    	let each_1_anchor;
    	let each_value_3 = Object.entries(ctx.char.skills);
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
    		p: function update(changed, ctx) {
    			if (changed.char || changed.Object || changed.Math || changed.change) {
    				each_value_3 = Object.entries(ctx.char.skills);
    				let i;

    				for (i = 0; i < each_value_3.length; i += 1) {
    					const child_ctx = get_each_context_3(ctx, each_value_3, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
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
    		id: create_if_block_9.name,
    		type: "if",
    		source: "(37:8) {#if agility_visible}",
    		ctx
    	});

    	return block;
    }

    // (39:16) {#if char.traits.agility.name === char.skills[key].parent}
    function create_if_block_10(ctx) {
    	let div;
    	let span;
    	let t0_value = ctx.char.skills[ctx.key].name + "";
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
    			add_location(span, file$3, 40, 24, 1297);
    			attr_dev(input, "class", "stat-input");
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", "0");
    			attr_dev(input, "max", input_max_value = Math.min(ctx.char.traits.agility.score, ctx.char.skills[ctx.key].score + ctx.char.skills_remaining()));
    			add_location(input, file$3, 41, 24, 1377);
    			attr_dev(div, "class", "stat-block");
    			add_location(div, file$3, 39, 20, 1248);

    			dispose = [
    				listen_dev(input, "input", input_input_handler),
    				listen_dev(input, "input", change$2, false, false, false)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span);
    			append_dev(span, t0);
    			append_dev(div, t1);
    			append_dev(div, input);
    			set_input_value(input, ctx.char.skills[ctx.key].score);
    			append_dev(div, t2);
    		},
    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;
    			if (changed.char && t0_value !== (t0_value = ctx.char.skills[ctx.key].name + "")) set_data_dev(t0, t0_value);

    			if (changed.char && input_max_value !== (input_max_value = Math.min(ctx.char.traits.agility.score, ctx.char.skills[ctx.key].score + ctx.char.skills_remaining()))) {
    				attr_dev(input, "max", input_max_value);
    			}

    			if (!input_updating && (changed.char || changed.Object)) {
    				set_input_value(input, ctx.char.skills[ctx.key].score);
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
    		id: create_if_block_10.name,
    		type: "if",
    		source: "(39:16) {#if char.traits.agility.name === char.skills[key].parent}",
    		ctx
    	});

    	return block;
    }

    // (38:12) {#each Object.entries(char.skills) as [key]}
    function create_each_block_3(ctx) {
    	let if_block_anchor;
    	let if_block = ctx.char.traits.agility.name === ctx.char.skills[ctx.key].parent && create_if_block_10(ctx);

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
    			if (ctx.char.traits.agility.name === ctx.char.skills[ctx.key].parent) {
    				if (if_block) {
    					if_block.p(changed, ctx);
    				} else {
    					if_block = create_if_block_10(ctx);
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
    		id: create_each_block_3.name,
    		type: "each",
    		source: "(38:12) {#each Object.entries(char.skills) as [key]}",
    		ctx
    	});

    	return block;
    }

    // (63:20) {:else}
    function create_else_block_2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("[+]");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_2.name,
    		type: "else",
    		source: "(63:20) {:else}",
    		ctx
    	});

    	return block;
    }

    // (61:20) {#if brains_visible}
    function create_if_block_8(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("[-]");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_8.name,
    		type: "if",
    		source: "(61:20) {#if brains_visible}",
    		ctx
    	});

    	return block;
    }

    // (70:8) {#if brains_visible}
    function create_if_block_6(ctx) {
    	let each_1_anchor;
    	let each_value_2 = Object.entries(ctx.char.skills);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
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
    		p: function update(changed, ctx) {
    			if (changed.char || changed.Object || changed.Math || changed.change) {
    				each_value_2 = Object.entries(ctx.char.skills);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block_2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_2.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(70:8) {#if brains_visible}",
    		ctx
    	});

    	return block;
    }

    // (72:16) {#if char.traits.brains.name === char.skills[key].parent}
    function create_if_block_7(ctx) {
    	let div;
    	let span;
    	let t0_value = ctx.char.skills[ctx.key].name + "";
    	let t0;
    	let t1;
    	let input;
    	let input_max_value;
    	let input_updating = false;
    	let t2;
    	let dispose;

    	function input_input_handler_1() {
    		input_updating = true;
    		ctx.input_input_handler_1.call(input, ctx);
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
    			add_location(span, file$3, 73, 24, 2567);
    			attr_dev(input, "class", "stat-input");
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", "0");
    			attr_dev(input, "max", input_max_value = Math.min(ctx.char.traits.brains.score, ctx.char.skills[ctx.key].score + ctx.char.skills_remaining()));
    			add_location(input, file$3, 74, 24, 2647);
    			attr_dev(div, "class", "stat-block");
    			add_location(div, file$3, 72, 20, 2518);

    			dispose = [
    				listen_dev(input, "input", input_input_handler_1),
    				listen_dev(input, "input", change$2, false, false, false)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span);
    			append_dev(span, t0);
    			append_dev(div, t1);
    			append_dev(div, input);
    			set_input_value(input, ctx.char.skills[ctx.key].score);
    			append_dev(div, t2);
    		},
    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;
    			if (changed.char && t0_value !== (t0_value = ctx.char.skills[ctx.key].name + "")) set_data_dev(t0, t0_value);

    			if (changed.char && input_max_value !== (input_max_value = Math.min(ctx.char.traits.brains.score, ctx.char.skills[ctx.key].score + ctx.char.skills_remaining()))) {
    				attr_dev(input, "max", input_max_value);
    			}

    			if (!input_updating && (changed.char || changed.Object)) {
    				set_input_value(input, ctx.char.skills[ctx.key].score);
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
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(72:16) {#if char.traits.brains.name === char.skills[key].parent}",
    		ctx
    	});

    	return block;
    }

    // (71:12) {#each Object.entries(char.skills) as [key]}
    function create_each_block_2(ctx) {
    	let if_block_anchor;
    	let if_block = ctx.char.traits.brains.name === ctx.char.skills[ctx.key].parent && create_if_block_7(ctx);

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
    			if (ctx.char.traits.brains.name === ctx.char.skills[ctx.key].parent) {
    				if (if_block) {
    					if_block.p(changed, ctx);
    				} else {
    					if_block = create_if_block_7(ctx);
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
    		source: "(71:12) {#each Object.entries(char.skills) as [key]}",
    		ctx
    	});

    	return block;
    }

    // (96:20) {:else}
    function create_else_block_1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("[+]");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(96:20) {:else}",
    		ctx
    	});

    	return block;
    }

    // (94:20) {#if constitution_visible}
    function create_if_block_5(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("[-]");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(94:20) {#if constitution_visible}",
    		ctx
    	});

    	return block;
    }

    // (103:8) {#if constitution_visible}
    function create_if_block_3(ctx) {
    	let each_1_anchor;
    	let each_value_1 = Object.entries(ctx.char.skills);
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
    		p: function update(changed, ctx) {
    			if (changed.char || changed.Object || changed.Math || changed.change) {
    				each_value_1 = Object.entries(ctx.char.skills);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
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
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(103:8) {#if constitution_visible}",
    		ctx
    	});

    	return block;
    }

    // (105:16) {#if char.traits.constitution.name === char.skills[key].parent}
    function create_if_block_4(ctx) {
    	let div;
    	let span;
    	let t0_value = ctx.char.skills[ctx.key].name + "";
    	let t0;
    	let t1;
    	let input;
    	let input_max_value;
    	let input_updating = false;
    	let t2;
    	let dispose;

    	function input_input_handler_2() {
    		input_updating = true;
    		ctx.input_input_handler_2.call(input, ctx);
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
    			add_location(span, file$3, 106, 24, 3866);
    			attr_dev(input, "class", "stat-input");
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", "0");
    			attr_dev(input, "max", input_max_value = Math.min(ctx.char.traits.constitution.score, ctx.char.skills[ctx.key].score + ctx.char.skills_remaining()));
    			add_location(input, file$3, 107, 24, 3946);
    			attr_dev(div, "class", "stat-block");
    			add_location(div, file$3, 105, 20, 3817);

    			dispose = [
    				listen_dev(input, "input", input_input_handler_2),
    				listen_dev(input, "input", change$2, false, false, false)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span);
    			append_dev(span, t0);
    			append_dev(div, t1);
    			append_dev(div, input);
    			set_input_value(input, ctx.char.skills[ctx.key].score);
    			append_dev(div, t2);
    		},
    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;
    			if (changed.char && t0_value !== (t0_value = ctx.char.skills[ctx.key].name + "")) set_data_dev(t0, t0_value);

    			if (changed.char && input_max_value !== (input_max_value = Math.min(ctx.char.traits.constitution.score, ctx.char.skills[ctx.key].score + ctx.char.skills_remaining()))) {
    				attr_dev(input, "max", input_max_value);
    			}

    			if (!input_updating && (changed.char || changed.Object)) {
    				set_input_value(input, ctx.char.skills[ctx.key].score);
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
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(105:16) {#if char.traits.constitution.name === char.skills[key].parent}",
    		ctx
    	});

    	return block;
    }

    // (104:12) {#each Object.entries(char.skills) as [key]}
    function create_each_block_1(ctx) {
    	let if_block_anchor;
    	let if_block = ctx.char.traits.constitution.name === ctx.char.skills[ctx.key].parent && create_if_block_4(ctx);

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
    			if (ctx.char.traits.constitution.name === ctx.char.skills[ctx.key].parent) {
    				if (if_block) {
    					if_block.p(changed, ctx);
    				} else {
    					if_block = create_if_block_4(ctx);
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
    		source: "(104:12) {#each Object.entries(char.skills) as [key]}",
    		ctx
    	});

    	return block;
    }

    // (129:20) {:else}
    function create_else_block$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("[+]");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(129:20) {:else}",
    		ctx
    	});

    	return block;
    }

    // (127:20) {#if demeanor_visible}
    function create_if_block_2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("[-]");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(127:20) {#if demeanor_visible}",
    		ctx
    	});

    	return block;
    }

    // (136:8) {#if demeanor_visible}
    function create_if_block$1(ctx) {
    	let each_1_anchor;
    	let each_value = Object.entries(ctx.char.skills);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
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
    		p: function update(changed, ctx) {
    			if (changed.char || changed.Object || changed.Math || changed.change) {
    				each_value = Object.entries(ctx.char.skills);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
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
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(136:8) {#if demeanor_visible}",
    		ctx
    	});

    	return block;
    }

    // (138:16) {#if char.traits.demeanor.name === char.skills[key].parent}
    function create_if_block_1$1(ctx) {
    	let div;
    	let span;
    	let t0_value = ctx.char.skills[ctx.key].name + "";
    	let t0;
    	let t1;
    	let input;
    	let input_max_value;
    	let input_updating = false;
    	let t2;
    	let dispose;

    	function input_input_handler_3() {
    		input_updating = true;
    		ctx.input_input_handler_3.call(input, ctx);
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
    			add_location(span, file$3, 139, 24, 5151);
    			attr_dev(input, "class", "stat-input");
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", "0");
    			attr_dev(input, "max", input_max_value = Math.min(ctx.char.traits.demeanor.score, ctx.char.skills[ctx.key].score + ctx.char.skills_remaining()));
    			add_location(input, file$3, 140, 24, 5231);
    			attr_dev(div, "class", "stat-block");
    			add_location(div, file$3, 138, 20, 5102);

    			dispose = [
    				listen_dev(input, "input", input_input_handler_3),
    				listen_dev(input, "input", change$2, false, false, false)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span);
    			append_dev(span, t0);
    			append_dev(div, t1);
    			append_dev(div, input);
    			set_input_value(input, ctx.char.skills[ctx.key].score);
    			append_dev(div, t2);
    		},
    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;
    			if (changed.char && t0_value !== (t0_value = ctx.char.skills[ctx.key].name + "")) set_data_dev(t0, t0_value);

    			if (changed.char && input_max_value !== (input_max_value = Math.min(ctx.char.traits.demeanor.score, ctx.char.skills[ctx.key].score + ctx.char.skills_remaining()))) {
    				attr_dev(input, "max", input_max_value);
    			}

    			if (!input_updating && (changed.char || changed.Object)) {
    				set_input_value(input, ctx.char.skills[ctx.key].score);
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
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(138:16) {#if char.traits.demeanor.name === char.skills[key].parent}",
    		ctx
    	});

    	return block;
    }

    // (137:12) {#each Object.entries(char.skills) as [key]}
    function create_each_block$1(ctx) {
    	let if_block_anchor;
    	let if_block = ctx.char.traits.demeanor.name === ctx.char.skills[ctx.key].parent && create_if_block_1$1(ctx);

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
    			if (ctx.char.traits.demeanor.name === ctx.char.skills[ctx.key].parent) {
    				if (if_block) {
    					if_block.p(changed, ctx);
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
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(137:12) {#each Object.entries(char.skills) as [key]}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let div10;
    	let div0;
    	let h2;
    	let t1;
    	let div1;
    	let h3;
    	let t2;
    	let t3_value = ctx.char.skills_remaining() + "";
    	let t3;
    	let t4;
    	let div3;
    	let label0;
    	let input0;
    	let t5;
    	let div2;
    	let span0;
    	let t6;
    	let t7_value = ctx.char.traits.agility.name + "";
    	let t7;
    	let t8;
    	let t9;
    	let t10;
    	let div5;
    	let label1;
    	let input1;
    	let t11;
    	let div4;
    	let span1;
    	let t12;
    	let t13_value = ctx.char.traits.brains.name + "";
    	let t13;
    	let t14;
    	let t15;
    	let t16;
    	let div7;
    	let label2;
    	let input2;
    	let t17;
    	let div6;
    	let span2;
    	let t18;
    	let t19_value = ctx.char.traits.constitution.name + "";
    	let t19;
    	let t20;
    	let t21;
    	let t22;
    	let div9;
    	let label3;
    	let input3;
    	let t23;
    	let div8;
    	let span3;
    	let t24;
    	let t25_value = ctx.char.traits.demeanor.name + "";
    	let t25;
    	let t26;
    	let t27;
    	let dispose;

    	function select_block_type(changed, ctx) {
    		if (ctx.agility_visible) return create_if_block_11;
    		return create_else_block_3;
    	}

    	let current_block_type = select_block_type(null, ctx);
    	let if_block0 = current_block_type(ctx);
    	let if_block1 = ctx.agility_visible && create_if_block_9(ctx);

    	function select_block_type_1(changed, ctx) {
    		if (ctx.brains_visible) return create_if_block_8;
    		return create_else_block_2;
    	}

    	let current_block_type_1 = select_block_type_1(null, ctx);
    	let if_block2 = current_block_type_1(ctx);
    	let if_block3 = ctx.brains_visible && create_if_block_6(ctx);

    	function select_block_type_2(changed, ctx) {
    		if (ctx.constitution_visible) return create_if_block_5;
    		return create_else_block_1;
    	}

    	let current_block_type_2 = select_block_type_2(null, ctx);
    	let if_block4 = current_block_type_2(ctx);
    	let if_block5 = ctx.constitution_visible && create_if_block_3(ctx);

    	function select_block_type_3(changed, ctx) {
    		if (ctx.demeanor_visible) return create_if_block_2;
    		return create_else_block$1;
    	}

    	let current_block_type_3 = select_block_type_3(null, ctx);
    	let if_block6 = current_block_type_3(ctx);
    	let if_block7 = ctx.demeanor_visible && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			div10 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Skills";
    			t1 = space();
    			div1 = element("div");
    			h3 = element("h3");
    			t2 = text("Points Remaining: ");
    			t3 = text(t3_value);
    			t4 = space();
    			div3 = element("div");
    			label0 = element("label");
    			input0 = element("input");
    			t5 = space();
    			div2 = element("div");
    			span0 = element("span");
    			if_block0.c();
    			t6 = space();
    			t7 = text(t7_value);
    			t8 = text(" Skills");
    			t9 = space();
    			if (if_block1) if_block1.c();
    			t10 = space();
    			div5 = element("div");
    			label1 = element("label");
    			input1 = element("input");
    			t11 = space();
    			div4 = element("div");
    			span1 = element("span");
    			if_block2.c();
    			t12 = space();
    			t13 = text(t13_value);
    			t14 = text(" Skills");
    			t15 = space();
    			if (if_block3) if_block3.c();
    			t16 = space();
    			div7 = element("div");
    			label2 = element("label");
    			input2 = element("input");
    			t17 = space();
    			div6 = element("div");
    			span2 = element("span");
    			if_block4.c();
    			t18 = space();
    			t19 = text(t19_value);
    			t20 = text(" Skills");
    			t21 = space();
    			if (if_block5) if_block5.c();
    			t22 = space();
    			div9 = element("div");
    			label3 = element("label");
    			input3 = element("input");
    			t23 = space();
    			div8 = element("div");
    			span3 = element("span");
    			if_block6.c();
    			t24 = space();
    			t25 = text(t25_value);
    			t26 = text(" Skills");
    			t27 = space();
    			if (if_block7) if_block7.c();
    			add_location(h2, file$3, 16, 8, 459);
    			attr_dev(div0, "class", "section-title");
    			add_location(div0, file$3, 15, 4, 423);
    			add_location(h3, file$3, 19, 8, 522);
    			attr_dev(div1, "class", "remaining");
    			add_location(div1, file$3, 18, 4, 490);
    			attr_dev(input0, "type", "checkbox");
    			add_location(input0, file$3, 24, 12, 664);
    			attr_dev(span0, "class", "checkbox");
    			add_location(span0, file$3, 26, 16, 780);
    			attr_dev(div2, "class", "parent-trait-title svelte-12z4ygp");
    			add_location(div2, file$3, 25, 12, 731);
    			attr_dev(label0, "class", "checkbar");
    			add_location(label0, file$3, 23, 8, 627);
    			attr_dev(div3, "class", "skill-section svelte-12z4ygp");
    			add_location(div3, file$3, 22, 4, 591);
    			attr_dev(input1, "type", "checkbox");
    			add_location(input1, file$3, 57, 12, 1939);
    			attr_dev(span1, "class", "checkbox");
    			add_location(span1, file$3, 59, 16, 2054);
    			attr_dev(div4, "class", "parent-trait-title svelte-12z4ygp");
    			add_location(div4, file$3, 58, 12, 2005);
    			attr_dev(label1, "class", "checkbar");
    			add_location(label1, file$3, 56, 8, 1902);
    			attr_dev(div5, "class", "skill-section svelte-12z4ygp");
    			add_location(div5, file$3, 55, 4, 1866);
    			attr_dev(input2, "type", "checkbox");
    			add_location(input2, file$3, 90, 12, 3208);
    			attr_dev(span2, "class", "checkbox");
    			add_location(span2, file$3, 92, 16, 3329);
    			attr_dev(div6, "class", "parent-trait-title svelte-12z4ygp");
    			add_location(div6, file$3, 91, 12, 3280);
    			attr_dev(label2, "class", "checkbar");
    			add_location(label2, file$3, 89, 8, 3171);
    			attr_dev(div7, "class", "skill-section svelte-12z4ygp");
    			add_location(div7, file$3, 88, 4, 3135);
    			attr_dev(input3, "type", "checkbox");
    			add_location(input3, file$3, 123, 12, 4513);
    			attr_dev(span3, "class", "checkbox");
    			add_location(span3, file$3, 125, 16, 4630);
    			attr_dev(div8, "class", "parent-trait-title svelte-12z4ygp");
    			add_location(div8, file$3, 124, 12, 4581);
    			attr_dev(label3, "class", "checkbar");
    			add_location(label3, file$3, 122, 8, 4476);
    			attr_dev(div9, "class", "skill-section svelte-12z4ygp");
    			add_location(div9, file$3, 121, 4, 4440);
    			attr_dev(div10, "id", "skills-section");
    			attr_dev(div10, "class", "sheet-section");
    			add_location(div10, file$3, 14, 0, 371);

    			dispose = [
    				listen_dev(input0, "change", ctx.input0_change_handler),
    				listen_dev(input1, "change", ctx.input1_change_handler),
    				listen_dev(input2, "change", ctx.input2_change_handler),
    				listen_dev(input3, "change", ctx.input3_change_handler)
    			];
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
    			append_dev(div10, div3);
    			append_dev(div3, label0);
    			append_dev(label0, input0);
    			input0.checked = ctx.agility_visible;
    			append_dev(label0, t5);
    			append_dev(label0, div2);
    			append_dev(div2, span0);
    			if_block0.m(span0, null);
    			append_dev(div2, t6);
    			append_dev(div2, t7);
    			append_dev(div2, t8);
    			append_dev(div3, t9);
    			if (if_block1) if_block1.m(div3, null);
    			append_dev(div10, t10);
    			append_dev(div10, div5);
    			append_dev(div5, label1);
    			append_dev(label1, input1);
    			input1.checked = ctx.brains_visible;
    			append_dev(label1, t11);
    			append_dev(label1, div4);
    			append_dev(div4, span1);
    			if_block2.m(span1, null);
    			append_dev(div4, t12);
    			append_dev(div4, t13);
    			append_dev(div4, t14);
    			append_dev(div5, t15);
    			if (if_block3) if_block3.m(div5, null);
    			append_dev(div10, t16);
    			append_dev(div10, div7);
    			append_dev(div7, label2);
    			append_dev(label2, input2);
    			input2.checked = ctx.constitution_visible;
    			append_dev(label2, t17);
    			append_dev(label2, div6);
    			append_dev(div6, span2);
    			if_block4.m(span2, null);
    			append_dev(div6, t18);
    			append_dev(div6, t19);
    			append_dev(div6, t20);
    			append_dev(div7, t21);
    			if (if_block5) if_block5.m(div7, null);
    			append_dev(div10, t22);
    			append_dev(div10, div9);
    			append_dev(div9, label3);
    			append_dev(label3, input3);
    			input3.checked = ctx.demeanor_visible;
    			append_dev(label3, t23);
    			append_dev(label3, div8);
    			append_dev(div8, span3);
    			if_block6.m(span3, null);
    			append_dev(div8, t24);
    			append_dev(div8, t25);
    			append_dev(div8, t26);
    			append_dev(div9, t27);
    			if (if_block7) if_block7.m(div9, null);
    		},
    		p: function update(changed, ctx) {
    			if (changed.char && t3_value !== (t3_value = ctx.char.skills_remaining() + "")) set_data_dev(t3, t3_value);

    			if (changed.agility_visible) {
    				input0.checked = ctx.agility_visible;
    			}

    			if (current_block_type !== (current_block_type = select_block_type(changed, ctx))) {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(span0, null);
    				}
    			}

    			if (changed.char && t7_value !== (t7_value = ctx.char.traits.agility.name + "")) set_data_dev(t7, t7_value);

    			if (ctx.agility_visible) {
    				if (if_block1) {
    					if_block1.p(changed, ctx);
    				} else {
    					if_block1 = create_if_block_9(ctx);
    					if_block1.c();
    					if_block1.m(div3, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (changed.brains_visible) {
    				input1.checked = ctx.brains_visible;
    			}

    			if (current_block_type_1 !== (current_block_type_1 = select_block_type_1(changed, ctx))) {
    				if_block2.d(1);
    				if_block2 = current_block_type_1(ctx);

    				if (if_block2) {
    					if_block2.c();
    					if_block2.m(span1, null);
    				}
    			}

    			if (changed.char && t13_value !== (t13_value = ctx.char.traits.brains.name + "")) set_data_dev(t13, t13_value);

    			if (ctx.brains_visible) {
    				if (if_block3) {
    					if_block3.p(changed, ctx);
    				} else {
    					if_block3 = create_if_block_6(ctx);
    					if_block3.c();
    					if_block3.m(div5, null);
    				}
    			} else if (if_block3) {
    				if_block3.d(1);
    				if_block3 = null;
    			}

    			if (changed.constitution_visible) {
    				input2.checked = ctx.constitution_visible;
    			}

    			if (current_block_type_2 !== (current_block_type_2 = select_block_type_2(changed, ctx))) {
    				if_block4.d(1);
    				if_block4 = current_block_type_2(ctx);

    				if (if_block4) {
    					if_block4.c();
    					if_block4.m(span2, null);
    				}
    			}

    			if (changed.char && t19_value !== (t19_value = ctx.char.traits.constitution.name + "")) set_data_dev(t19, t19_value);

    			if (ctx.constitution_visible) {
    				if (if_block5) {
    					if_block5.p(changed, ctx);
    				} else {
    					if_block5 = create_if_block_3(ctx);
    					if_block5.c();
    					if_block5.m(div7, null);
    				}
    			} else if (if_block5) {
    				if_block5.d(1);
    				if_block5 = null;
    			}

    			if (changed.demeanor_visible) {
    				input3.checked = ctx.demeanor_visible;
    			}

    			if (current_block_type_3 !== (current_block_type_3 = select_block_type_3(changed, ctx))) {
    				if_block6.d(1);
    				if_block6 = current_block_type_3(ctx);

    				if (if_block6) {
    					if_block6.c();
    					if_block6.m(span3, null);
    				}
    			}

    			if (changed.char && t25_value !== (t25_value = ctx.char.traits.demeanor.name + "")) set_data_dev(t25, t25_value);

    			if (ctx.demeanor_visible) {
    				if (if_block7) {
    					if_block7.p(changed, ctx);
    				} else {
    					if_block7 = create_if_block$1(ctx);
    					if_block7.c();
    					if_block7.m(div9, null);
    				}
    			} else if (if_block7) {
    				if_block7.d(1);
    				if_block7 = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div10);
    			if_block0.d();
    			if (if_block1) if_block1.d();
    			if_block2.d();
    			if (if_block3) if_block3.d();
    			if_block4.d();
    			if (if_block5) if_block5.d();
    			if_block6.d();
    			if (if_block7) if_block7.d();
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

    function change$2() {
    	CharacterStore.update(char => {
    		return char;
    	});
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let char;
    	let agility_visible = false;
    	let brains_visible = false;
    	let constitution_visible = false;
    	let demeanor_visible = false;

    	const unsubscribe = CharacterStore.subscribe(value => {
    		$$invalidate("char", char = value);
    	});

    	function input0_change_handler() {
    		agility_visible = this.checked;
    		$$invalidate("agility_visible", agility_visible);
    	}

    	function input_input_handler({ key }) {
    		char.skills[key].score = to_number(this.value);
    		$$invalidate("char", char);
    		$$invalidate("Object", Object);
    	}

    	function input1_change_handler() {
    		brains_visible = this.checked;
    		$$invalidate("brains_visible", brains_visible);
    	}

    	function input_input_handler_1({ key }) {
    		char.skills[key].score = to_number(this.value);
    		$$invalidate("char", char);
    		$$invalidate("Object", Object);
    	}

    	function input2_change_handler() {
    		constitution_visible = this.checked;
    		$$invalidate("constitution_visible", constitution_visible);
    	}

    	function input_input_handler_2({ key }) {
    		char.skills[key].score = to_number(this.value);
    		$$invalidate("char", char);
    		$$invalidate("Object", Object);
    	}

    	function input3_change_handler() {
    		demeanor_visible = this.checked;
    		$$invalidate("demeanor_visible", demeanor_visible);
    	}

    	function input_input_handler_3({ key }) {
    		char.skills[key].score = to_number(this.value);
    		$$invalidate("char", char);
    		$$invalidate("Object", Object);
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("char" in $$props) $$invalidate("char", char = $$props.char);
    		if ("agility_visible" in $$props) $$invalidate("agility_visible", agility_visible = $$props.agility_visible);
    		if ("brains_visible" in $$props) $$invalidate("brains_visible", brains_visible = $$props.brains_visible);
    		if ("constitution_visible" in $$props) $$invalidate("constitution_visible", constitution_visible = $$props.constitution_visible);
    		if ("demeanor_visible" in $$props) $$invalidate("demeanor_visible", demeanor_visible = $$props.demeanor_visible);
    	};

    	return {
    		char,
    		agility_visible,
    		brains_visible,
    		constitution_visible,
    		demeanor_visible,
    		input0_change_handler,
    		input_input_handler,
    		input1_change_handler,
    		input_input_handler_1,
    		input2_change_handler,
    		input_input_handler_2,
    		input3_change_handler,
    		input_input_handler_3
    	};
    }

    class Skills extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Skills",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/components/creator/Properties.svelte generated by Svelte v3.14.1 */
    const file$4 = "src/components/creator/Properties.svelte";

    function create_fragment$7(ctx) {
    	let div5;
    	let div0;
    	let h2;
    	let t1;
    	let div1;
    	let span0;
    	let t3;
    	let span1;
    	let t4_value = ctx.char.action_points() + "";
    	let t4;
    	let t5;
    	let div2;
    	let span2;
    	let t7;
    	let span3;
    	let t8_value = ctx.char.speed_points() + "";
    	let t8;
    	let t9;
    	let div3;
    	let span4;
    	let t11;
    	let span5;
    	let t12_value = ctx.char.luck_points() + "";
    	let t12;
    	let t13;
    	let div4;
    	let span6;
    	let t15;
    	let span7;
    	let t16_value = ctx.char.experience_points() + "";
    	let t16;

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Properties";
    			t1 = space();
    			div1 = element("div");
    			span0 = element("span");
    			span0.textContent = "Actions";
    			t3 = space();
    			span1 = element("span");
    			t4 = text(t4_value);
    			t5 = space();
    			div2 = element("div");
    			span2 = element("span");
    			span2.textContent = "Speed";
    			t7 = space();
    			span3 = element("span");
    			t8 = text(t8_value);
    			t9 = space();
    			div3 = element("div");
    			span4 = element("span");
    			span4.textContent = "Luck";
    			t11 = space();
    			span5 = element("span");
    			t12 = text(t12_value);
    			t13 = space();
    			div4 = element("div");
    			span6 = element("span");
    			span6.textContent = "Experience";
    			t15 = space();
    			span7 = element("span");
    			t16 = text(t16_value);
    			add_location(h2, file$4, 12, 8, 330);
    			attr_dev(div0, "class", "section-title");
    			add_location(div0, file$4, 11, 4, 294);
    			attr_dev(span0, "class", "stat-label");
    			add_location(span0, file$4, 15, 8, 398);
    			attr_dev(span1, "class", "stat-input");
    			add_location(span1, file$4, 16, 8, 446);
    			attr_dev(div1, "class", "stat-block");
    			add_location(div1, file$4, 14, 4, 365);
    			attr_dev(span2, "class", "stat-label");
    			add_location(span2, file$4, 19, 8, 549);
    			attr_dev(span3, "class", "stat-input");
    			add_location(span3, file$4, 20, 8, 595);
    			attr_dev(div2, "class", "stat-block");
    			add_location(div2, file$4, 18, 4, 516);
    			attr_dev(span4, "class", "stat-label");
    			add_location(span4, file$4, 23, 8, 697);
    			attr_dev(span5, "class", "stat-input");
    			add_location(span5, file$4, 24, 8, 742);
    			attr_dev(div3, "class", "stat-block");
    			add_location(div3, file$4, 22, 4, 664);
    			attr_dev(span6, "class", "stat-label");
    			add_location(span6, file$4, 27, 8, 843);
    			attr_dev(span7, "class", "stat-input");
    			add_location(span7, file$4, 28, 8, 894);
    			attr_dev(div4, "class", "stat-block");
    			add_location(div4, file$4, 26, 4, 810);
    			attr_dev(div5, "id", "properties-section");
    			attr_dev(div5, "class", "sheet-section");
    			add_location(div5, file$4, 10, 0, 238);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div0);
    			append_dev(div0, h2);
    			append_dev(div5, t1);
    			append_dev(div5, div1);
    			append_dev(div1, span0);
    			append_dev(div1, t3);
    			append_dev(div1, span1);
    			append_dev(span1, t4);
    			append_dev(div5, t5);
    			append_dev(div5, div2);
    			append_dev(div2, span2);
    			append_dev(div2, t7);
    			append_dev(div2, span3);
    			append_dev(span3, t8);
    			append_dev(div5, t9);
    			append_dev(div5, div3);
    			append_dev(div3, span4);
    			append_dev(div3, t11);
    			append_dev(div3, span5);
    			append_dev(span5, t12);
    			append_dev(div5, t13);
    			append_dev(div5, div4);
    			append_dev(div4, span6);
    			append_dev(div4, t15);
    			append_dev(div4, span7);
    			append_dev(span7, t16);
    		},
    		p: function update(changed, ctx) {
    			if (changed.char && t4_value !== (t4_value = ctx.char.action_points() + "")) set_data_dev(t4, t4_value);
    			if (changed.char && t8_value !== (t8_value = ctx.char.speed_points() + "")) set_data_dev(t8, t8_value);
    			if (changed.char && t12_value !== (t12_value = ctx.char.luck_points() + "")) set_data_dev(t12, t12_value);
    			if (changed.char && t16_value !== (t16_value = ctx.char.experience_points() + "")) set_data_dev(t16, t16_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
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

    function instance$5($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$5, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Properties",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/components/creator/Health.svelte generated by Svelte v3.14.1 */
    const file$5 = "src/components/creator/Health.svelte";

    function create_fragment$8(ctx) {
    	let div4;
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
    	let t5_value = ctx.char.traits.constitution.score * 3 + "";
    	let t5;
    	let t6;
    	let div2;
    	let span2;
    	let t8;
    	let span3;
    	let t9_value = ctx.char.traits.constitution.score * 3 + "";
    	let t9;
    	let t10;
    	let span4;
    	let t11_value = ctx.char.traits.constitution.score * 3 + "";
    	let t11;
    	let t12;
    	let div3;
    	let span5;
    	let t14;
    	let input1;
    	let input1_value_value;
    	let input1_max_value;
    	let t15;
    	let span6;
    	let t16_value = ctx.char.traits.demeanor.score * 3 + "";
    	let t16;

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Health";
    			t1 = space();
    			div1 = element("div");
    			span0 = element("span");
    			span0.textContent = "Current:";
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
    			span3 = element("span");
    			t9 = text(t9_value);
    			t10 = space();
    			span4 = element("span");
    			t11 = text(t11_value);
    			t12 = space();
    			div3 = element("div");
    			span5 = element("span");
    			span5.textContent = "Psyche:";
    			t14 = space();
    			input1 = element("input");
    			t15 = space();
    			span6 = element("span");
    			t16 = text(t16_value);
    			add_location(h2, file$5, 12, 8, 326);
    			attr_dev(div0, "class", "section-title");
    			add_location(div0, file$5, 11, 4, 290);
    			attr_dev(span0, "class", "three-column");
    			add_location(span0, file$5, 15, 8, 390);
    			attr_dev(input0, "type", "number");
    			attr_dev(input0, "class", "stat-input three-column");
    			input0.value = input0_value_value = ctx.char.set_health();
    			attr_dev(input0, "min", "0");
    			attr_dev(input0, "max", input0_max_value = ctx.char.set_health());
    			add_location(input0, file$5, 16, 8, 441);
    			attr_dev(span1, "class", "stat-input three-column");
    			add_location(span1, file$5, 23, 8, 628);
    			attr_dev(div1, "class", "stat-block");
    			add_location(div1, file$5, 14, 4, 357);
    			attr_dev(span2, "class", "three-column");
    			add_location(span2, file$5, 26, 8, 756);
    			attr_dev(span3, "class", "stat-input three-column");
    			add_location(span3, file$5, 27, 8, 804);
    			attr_dev(span4, "class", "stat-input three-column");
    			add_location(span4, file$5, 28, 8, 892);
    			attr_dev(div2, "class", "stat-block");
    			add_location(div2, file$5, 25, 4, 723);
    			attr_dev(span5, "class", "three-column");
    			add_location(span5, file$5, 31, 8, 1020);
    			attr_dev(input1, "type", "number");
    			attr_dev(input1, "class", "stat-input three-column");
    			input1.value = input1_value_value = ctx.char.set_psyche();
    			attr_dev(input1, "min", "0");
    			attr_dev(input1, "max", input1_max_value = ctx.char.set_psyche());
    			add_location(input1, file$5, 32, 8, 1070);
    			attr_dev(span6, "class", "stat-input three-column");
    			add_location(span6, file$5, 39, 8, 1257);
    			attr_dev(div3, "class", "stat-block");
    			add_location(div3, file$5, 30, 4, 987);
    			attr_dev(div4, "id", "health-section");
    			attr_dev(div4, "class", "sheet-section");
    			add_location(div4, file$5, 10, 0, 238);
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
    			append_dev(div1, t4);
    			append_dev(div1, span1);
    			append_dev(span1, t5);
    			append_dev(div4, t6);
    			append_dev(div4, div2);
    			append_dev(div2, span2);
    			append_dev(div2, t8);
    			append_dev(div2, span3);
    			append_dev(span3, t9);
    			append_dev(div2, t10);
    			append_dev(div2, span4);
    			append_dev(span4, t11);
    			append_dev(div4, t12);
    			append_dev(div4, div3);
    			append_dev(div3, span5);
    			append_dev(div3, t14);
    			append_dev(div3, input1);
    			append_dev(div3, t15);
    			append_dev(div3, span6);
    			append_dev(span6, t16);
    		},
    		p: function update(changed, ctx) {
    			if (changed.char && input0_value_value !== (input0_value_value = ctx.char.set_health())) {
    				prop_dev(input0, "value", input0_value_value);
    			}

    			if (changed.char && input0_max_value !== (input0_max_value = ctx.char.set_health())) {
    				attr_dev(input0, "max", input0_max_value);
    			}

    			if (changed.char && t5_value !== (t5_value = ctx.char.traits.constitution.score * 3 + "")) set_data_dev(t5, t5_value);
    			if (changed.char && t9_value !== (t9_value = ctx.char.traits.constitution.score * 3 + "")) set_data_dev(t9, t9_value);
    			if (changed.char && t11_value !== (t11_value = ctx.char.traits.constitution.score * 3 + "")) set_data_dev(t11, t11_value);

    			if (changed.char && input1_value_value !== (input1_value_value = ctx.char.set_psyche())) {
    				prop_dev(input1, "value", input1_value_value);
    			}

    			if (changed.char && input1_max_value !== (input1_max_value = ctx.char.set_psyche())) {
    				attr_dev(input1, "max", input1_max_value);
    			}

    			if (changed.char && t16_value !== (t16_value = ctx.char.traits.demeanor.score * 3 + "")) set_data_dev(t16, t16_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
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

    function instance$6($$self, $$props, $$invalidate) {
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

    class Health extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Health",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/components/creator/Defenses.svelte generated by Svelte v3.14.1 */
    const file$6 = "src/components/creator/Defenses.svelte";

    function create_fragment$9(ctx) {
    	let div4;
    	let div0;
    	let h2;
    	let t1;
    	let div1;
    	let span0;
    	let t3;
    	let span1;
    	let t4_value = ctx.char.reflex_score() + "";
    	let t4;
    	let t5;
    	let div2;
    	let span2;
    	let t7;
    	let span3;
    	let t8_value = ctx.char.block_score() + "";
    	let t8;
    	let t9;
    	let div3;
    	let span4;
    	let t11;
    	let span5;
    	let t12_value = ctx.char.dodge_score() + "";
    	let t12;

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Defenses";
    			t1 = space();
    			div1 = element("div");
    			span0 = element("span");
    			span0.textContent = "Reflex";
    			t3 = space();
    			span1 = element("span");
    			t4 = text(t4_value);
    			t5 = space();
    			div2 = element("div");
    			span2 = element("span");
    			span2.textContent = "Block";
    			t7 = space();
    			span3 = element("span");
    			t8 = text(t8_value);
    			t9 = space();
    			div3 = element("div");
    			span4 = element("span");
    			span4.textContent = "Dodge";
    			t11 = space();
    			span5 = element("span");
    			t12 = text(t12_value);
    			add_location(h2, file$6, 12, 8, 328);
    			attr_dev(div0, "class", "section-title");
    			add_location(div0, file$6, 11, 4, 292);
    			attr_dev(span0, "class", "stat-label");
    			add_location(span0, file$6, 15, 8, 394);
    			attr_dev(span1, "class", "stat-input");
    			add_location(span1, file$6, 16, 8, 441);
    			attr_dev(div1, "class", "stat-block");
    			add_location(div1, file$6, 14, 4, 361);
    			attr_dev(span2, "class", "stat-label");
    			add_location(span2, file$6, 19, 8, 543);
    			attr_dev(span3, "class", "stat-input");
    			add_location(span3, file$6, 20, 8, 589);
    			attr_dev(div2, "class", "stat-block");
    			add_location(div2, file$6, 18, 4, 510);
    			attr_dev(span4, "class", "stat-label");
    			add_location(span4, file$6, 23, 8, 690);
    			attr_dev(span5, "class", "stat-input");
    			add_location(span5, file$6, 24, 8, 736);
    			attr_dev(div3, "class", "stat-block");
    			add_location(div3, file$6, 22, 4, 657);
    			attr_dev(div4, "id", "defenses-section");
    			attr_dev(div4, "class", "sheet-section");
    			add_location(div4, file$6, 10, 0, 238);
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
    			append_dev(div1, span1);
    			append_dev(span1, t4);
    			append_dev(div4, t5);
    			append_dev(div4, div2);
    			append_dev(div2, span2);
    			append_dev(div2, t7);
    			append_dev(div2, span3);
    			append_dev(span3, t8);
    			append_dev(div4, t9);
    			append_dev(div4, div3);
    			append_dev(div3, span4);
    			append_dev(div3, t11);
    			append_dev(div3, span5);
    			append_dev(span5, t12);
    		},
    		p: function update(changed, ctx) {
    			if (changed.char && t4_value !== (t4_value = ctx.char.reflex_score() + "")) set_data_dev(t4, t4_value);
    			if (changed.char && t8_value !== (t8_value = ctx.char.block_score() + "")) set_data_dev(t8, t8_value);
    			if (changed.char && t12_value !== (t12_value = ctx.char.dodge_score() + "")) set_data_dev(t12, t12_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
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

    function instance$7($$self, $$props, $$invalidate) {
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

    class Defenses extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Defenses",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src/components/creator/Abilities.svelte generated by Svelte v3.14.1 */
    const file$7 = "src/components/creator/Abilities.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.ability = list[i];
    	child_ctx.each_value = list;
    	child_ctx.ability_index = i;
    	return child_ctx;
    }

    // (84:8) {#each AbilityList as ability}
    function create_each_block$2(ctx) {
    	let tr;
    	let td0;
    	let t0_value = ctx.ability.name + "";
    	let t0;
    	let t1;
    	let td1;
    	let t2_value = ctx.ability.description + "";
    	let t2;
    	let t3;
    	let td2;
    	let t4_value = ctx.ability.max + "";
    	let t4;
    	let t5;
    	let td3;
    	let t6_value = ctx.ability.xp + "";
    	let t6;
    	let t7;
    	let td4;
    	let input;
    	let input_max_value;
    	let input_updating = false;
    	let t8;
    	let dispose;

    	function input_input_handler() {
    		input_updating = true;
    		ctx.input_input_handler.call(input, ctx);
    	}

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			td0 = element("td");
    			t0 = text(t0_value);
    			t1 = space();
    			td1 = element("td");
    			t2 = text(t2_value);
    			t3 = space();
    			td2 = element("td");
    			t4 = text(t4_value);
    			t5 = space();
    			td3 = element("td");
    			t6 = text(t6_value);
    			t7 = space();
    			td4 = element("td");
    			input = element("input");
    			t8 = space();
    			add_location(td0, file$7, 85, 12, 3778);
    			add_location(td1, file$7, 86, 12, 3814);
    			add_location(td2, file$7, 87, 12, 3857);
    			add_location(td3, file$7, 88, 12, 3892);
    			attr_dev(input, "type", "number");
    			attr_dev(input, "max", input_max_value = ctx.ability.max);
    			attr_dev(input, "class", "svelte-1xk121g");
    			add_location(input, file$7, 90, 16, 3968);
    			attr_dev(td4, "class", "taken-column");
    			add_location(td4, file$7, 89, 12, 3926);
    			add_location(tr, file$7, 84, 8, 3761);

    			dispose = [
    				listen_dev(input, "input", input_input_handler),
    				listen_dev(input, "input", ctx.modifyAbilities, false, false, false)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td0);
    			append_dev(td0, t0);
    			append_dev(tr, t1);
    			append_dev(tr, td1);
    			append_dev(td1, t2);
    			append_dev(tr, t3);
    			append_dev(tr, td2);
    			append_dev(td2, t4);
    			append_dev(tr, t5);
    			append_dev(tr, td3);
    			append_dev(td3, t6);
    			append_dev(tr, t7);
    			append_dev(tr, td4);
    			append_dev(td4, input);
    			set_input_value(input, ctx.ability.taken);
    			append_dev(tr, t8);
    		},
    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;
    			if (changed.AbilityList && t0_value !== (t0_value = ctx.ability.name + "")) set_data_dev(t0, t0_value);
    			if (changed.AbilityList && t2_value !== (t2_value = ctx.ability.description + "")) set_data_dev(t2, t2_value);
    			if (changed.AbilityList && t4_value !== (t4_value = ctx.ability.max + "")) set_data_dev(t4, t4_value);
    			if (changed.AbilityList && t6_value !== (t6_value = ctx.ability.xp + "")) set_data_dev(t6, t6_value);

    			if (changed.AbilityList && input_max_value !== (input_max_value = ctx.ability.max)) {
    				attr_dev(input, "max", input_max_value);
    			}

    			if (!input_updating && changed.AbilityList) {
    				set_input_value(input, ctx.ability.taken);
    			}

    			input_updating = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(84:8) {#each AbilityList as ability}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let div1;
    	let div0;
    	let h2;
    	let t1;
    	let table;
    	let tr;
    	let td0;
    	let t3;
    	let td1;
    	let t5;
    	let td2;
    	let t7;
    	let td3;
    	let t9;
    	let td4;
    	let t11;
    	let each_value = ctx.AbilityList;
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Abilities";
    			t1 = space();
    			table = element("table");
    			tr = element("tr");
    			td0 = element("td");
    			td0.textContent = "Name";
    			t3 = space();
    			td1 = element("td");
    			td1.textContent = "Description";
    			t5 = space();
    			td2 = element("td");
    			td2.textContent = "Max";
    			t7 = space();
    			td3 = element("td");
    			td3.textContent = "XP";
    			t9 = space();
    			td4 = element("td");
    			td4.textContent = "Taken";
    			t11 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(h2, file$7, 73, 8, 3405);
    			attr_dev(div0, "class", "section-title");
    			add_location(div0, file$7, 72, 4, 3369);
    			attr_dev(td0, "class", "large-column svelte-1xk121g");
    			add_location(td0, file$7, 77, 12, 3472);
    			attr_dev(td1, "class", "huge-column svelte-1xk121g");
    			add_location(td1, file$7, 78, 12, 3519);
    			attr_dev(td2, "class", "small-column svelte-1xk121g");
    			add_location(td2, file$7, 79, 12, 3572);
    			attr_dev(td3, "class", "small-column svelte-1xk121g");
    			add_location(td3, file$7, 80, 12, 3618);
    			attr_dev(td4, "class", "medium-column svelte-1xk121g");
    			add_location(td4, file$7, 81, 12, 3663);
    			add_location(tr, file$7, 76, 8, 3455);
    			add_location(table, file$7, 75, 4, 3439);
    			attr_dev(div1, "class", "sheet-section");
    			add_location(div1, file$7, 71, 0, 3337);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h2);
    			append_dev(div1, t1);
    			append_dev(div1, table);
    			append_dev(table, tr);
    			append_dev(tr, td0);
    			append_dev(tr, t3);
    			append_dev(tr, td1);
    			append_dev(tr, t5);
    			append_dev(tr, td2);
    			append_dev(tr, t7);
    			append_dev(tr, td3);
    			append_dev(tr, t9);
    			append_dev(tr, td4);
    			append_dev(table, t11);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(table, null);
    			}
    		},
    		p: function update(changed, ctx) {
    			if (changed.AbilityList || changed.modifyAbilities) {
    				each_value = ctx.AbilityList;
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
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
    			if (detaching) detach_dev(div1);
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

    function instance$8($$self, $$props, $$invalidate) {
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
    		new Ability("Favorite Weapon", "Botch is only a Fail with this one weapon.", 1, 3, 0, ""),
    		new Ability("Hyper Immunity", "+1 to resist Diseases.", 3, 3, 0, ""),
    		new Ability("Pack Mentality", "+1 ATK at same target a Comrade ATKs.", 1, 3, 0, ""),
    		new Ability("Quick Reload", "Free Reload once per rnd.", 1, 3, 0, ""),
    		new Ability("Specialize*", "+1 to a Skill Specialty.", 1, 3, 0, ""),
    		new Ability("Weapon Training*", "+1 ATK for a specific weapon.", 1, 3, 0, ""),
    		new Ability("Efficient Work*", "[Time / 2] for a Skill (minimum 1 action).", 1, 6, 0, ""),
    		new Ability("Fast Draw", "Free item draw once per rnd.", 1, 6, 0, ""),
    		new Ability("Fleet Footed", "+1 Speed.", 3, 6, 0, ""),
    		new Ability("Multilingual*", "Learn a different form of communication.", char.traits.brains * 3, 6, 0, ""),
    		new Ability("Practice*", "+1 to a Skill (up to the parent Trait).", 1, 6, 0, ""),
    		new Ability("Danger Sense", "+1 Reflex.", 1, 9, 0, ""),
    		new Ability("Discipline", "Ignore 1 Pain penalty.", 3, 9, 0, ""),
    		new Ability("Fortunate", "+1 Luck.", 1, 9, 0, ""),
    		new Ability("Free Running", "Climb at [Speed] for 2AP.", 1, 9, 0, ""),
    		new Ability("Unorthodox*", "Pick a new parent Trait for a Skill.", 1, 9, 0, ""),
    		new Ability("Fencing", "Free Block roll once per rnd.", 1, 12, 0, ""),
    		new Ability("Side-step", "Free Dodge roll once per rnd.", 1, 12, 0, ""),
    		new Ability("Wrestling", "Free Grab roll once per rnd.", 1, 12, 0, ""),
    		new Ability("Firm Grip", "Use 2h weapons in 1h, up to Size 3.", 1, 15, 0, ""),
    		new Ability("Hard Headed", "Ignore Stun from Head DMG.", 1, 15, 0, ""),
    		new Ability("Powerful Strike*", "+1 DMG for a specific Melee weapon.", 1, 15, 0, ""),
    		new Ability("Assassin", "+3 DMG to ATKs from Concealment.", 1, 18, 0, ""),
    		new Ability("Vehicle Operation*", "Proficiently operate a class of vehicle.", 1, 18, 0, ""),
    		new Ability("Ambidextrous", "Off-hand penalty is -1 instead of -3.", 1, 24, 0, ""),
    		new Ability("Tough", "+1 HP.", 3, 24, 0, ""),
    		new Ability("Self Improvement*", "+1 to a Trait (max 6).", 3, 30, 0, ""),
    		new Ability("Second Chance", "Spend this Ability to avoid Death once.", 9, 30, 0, "")
    	];

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

    	return {
    		modifyAbilities,
    		AbilityList,
    		input_input_handler
    	};
    }

    class Abilities extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Abilities",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src/pages/Character.svelte generated by Svelte v3.14.1 */
    const file$8 = "src/pages/Character.svelte";

    // (30:32) 
    function create_if_block_4$1(ctx) {
    	let current;
    	const abilities = new Abilities({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(abilities.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(abilities, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(abilities.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(abilities.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(abilities, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4$1.name,
    		type: "if",
    		source: "(30:32) ",
    		ctx
    	});

    	return block;
    }

    // (26:32) 
    function create_if_block_3$1(ctx) {
    	let t0;
    	let t1;
    	let current;
    	const properties = new Properties({ $$inline: true });
    	const health = new Health({ $$inline: true });
    	const defenses = new Defenses({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(properties.$$.fragment);
    			t0 = space();
    			create_component(health.$$.fragment);
    			t1 = space();
    			create_component(defenses.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(properties, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(health, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(defenses, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(properties.$$.fragment, local);
    			transition_in(health.$$.fragment, local);
    			transition_in(defenses.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(properties.$$.fragment, local);
    			transition_out(health.$$.fragment, local);
    			transition_out(defenses.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(properties, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(health, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(defenses, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(26:32) ",
    		ctx
    	});

    	return block;
    }

    // (24:32) 
    function create_if_block_2$1(ctx) {
    	let current;
    	const skills = new Skills({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(skills.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(skills, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(skills.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(skills.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(skills, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(24:32) ",
    		ctx
    	});

    	return block;
    }

    // (22:32) 
    function create_if_block_1$2(ctx) {
    	let current;
    	const traits = new Traits({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(traits.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(traits, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(traits.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(traits.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(traits, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(22:32) ",
    		ctx
    	});

    	return block;
    }

    // (20:4) {#if page_number === 0}
    function create_if_block$2(ctx) {
    	let current;
    	const description = new Description({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(description.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(description, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(description.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(description.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(description, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(20:4) {#if page_number === 0}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let div1;
    	let current_block_type_index;
    	let if_block;
    	let t0;
    	let div0;
    	let button0;
    	let t2;
    	let button1;
    	let current;
    	let dispose;

    	const if_block_creators = [
    		create_if_block$2,
    		create_if_block_1$2,
    		create_if_block_2$1,
    		create_if_block_3$1,
    		create_if_block_4$1
    	];

    	const if_blocks = [];

    	function select_block_type(changed, ctx) {
    		if (ctx.page_number === 0) return 0;
    		if (ctx.page_number === 1) return 1;
    		if (ctx.page_number === 2) return 2;
    		if (ctx.page_number === 3) return 3;
    		if (ctx.page_number === 4) return 4;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(null, ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			if (if_block) if_block.c();
    			t0 = space();
    			div0 = element("div");
    			button0 = element("button");
    			button0.textContent = "Back";
    			t2 = space();
    			button1 = element("button");
    			button1.textContent = "Next";
    			attr_dev(button0, "class", "nav-button svelte-1iowpdn");
    			add_location(button0, file$8, 33, 8, 1132);
    			attr_dev(button1, "class", "nav-button svelte-1iowpdn");
    			add_location(button1, file$8, 34, 8, 1197);
    			attr_dev(div0, "class", "nav-bar svelte-1iowpdn");
    			add_location(div0, file$8, 32, 4, 1102);
    			attr_dev(div1, "class", "page creator-page");
    			add_location(div1, file$8, 18, 0, 749);

    			dispose = [
    				listen_dev(button0, "click", ctx.back, false, false, false),
    				listen_dev(button1, "click", ctx.next, false, false, false)
    			];
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(div1, null);
    			}

    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, button0);
    			append_dev(div0, t2);
    			append_dev(div0, button1);
    			current = true;
    		},
    		p: function update(changed, ctx) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(changed, ctx);

    			if (current_block_type_index !== previous_block_index) {
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
    					}

    					transition_in(if_block, 1);
    					if_block.m(div1, t0);
    				} else {
    					if_block = null;
    				}
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
    			if (detaching) detach_dev(div1);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d();
    			}

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

    function instance$9($$self, $$props, $$invalidate) {
    	let page_number = 0;

    	let next = function () {
    		page_number < 4
    		? $$invalidate("page_number", page_number++, page_number)
    		: router.goHome();
    	};

    	let back = function () {
    		page_number > 0
    		? $$invalidate("page_number", page_number--, page_number)
    		: router.goHome();
    	};

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("page_number" in $$props) $$invalidate("page_number", page_number = $$props.page_number);
    		if ("next" in $$props) $$invalidate("next", next = $$props.next);
    		if ("back" in $$props) $$invalidate("back", back = $$props.back);
    	};

    	return { page_number, next, back };
    }

    class Character$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Character",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src/components/rules/Combat.svelte generated by Svelte v3.14.1 */

    const file$9 = "src/components/rules/Combat.svelte";

    // (13:16) {:else}
    function create_else_block$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("[+]");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(13:16) {:else}",
    		ctx
    	});

    	return block;
    }

    // (11:16) {#if visible}
    function create_if_block_1$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("[-]");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(11:16) {#if visible}",
    		ctx
    	});

    	return block;
    }

    // (20:4) {#if visible}
    function create_if_block$3(ctx) {
    	let div23;
    	let p0;
    	let t1;
    	let p1;
    	let t3;
    	let button0;
    	let t5;
    	let div1;
    	let p2;
    	let t7;
    	let button1;
    	let t9;
    	let div0;
    	let p3;
    	let t11;
    	let button2;
    	let t13;
    	let div3;
    	let p4;
    	let t15;
    	let button3;
    	let t17;
    	let div2;
    	let p5;
    	let t19;
    	let button4;
    	let t21;
    	let div11;
    	let p6;
    	let t23;
    	let p7;
    	let t25;
    	let button5;
    	let t27;
    	let div10;
    	let p8;
    	let t29;
    	let button6;
    	let t31;
    	let div4;
    	let p9;
    	let t33;
    	let p10;
    	let t35;
    	let p11;
    	let t37;
    	let button7;
    	let t39;
    	let div5;
    	let p12;
    	let t41;
    	let p13;
    	let t43;
    	let p14;
    	let t45;
    	let button8;
    	let t47;
    	let div6;
    	let p15;
    	let t49;
    	let p16;
    	let t51;
    	let p17;
    	let t53;
    	let button9;
    	let t55;
    	let div7;
    	let p18;
    	let t57;
    	let p19;
    	let t59;
    	let p20;
    	let t61;
    	let button10;
    	let t63;
    	let div8;
    	let p21;
    	let t65;
    	let p22;
    	let t67;
    	let p23;
    	let t69;
    	let button11;
    	let t71;
    	let div9;
    	let p24;
    	let t73;
    	let p25;
    	let t75;
    	let p26;
    	let t77;
    	let button12;
    	let t79;
    	let div13;
    	let p27;
    	let t81;
    	let p28;
    	let t83;
    	let button13;
    	let t85;
    	let div12;
    	let p29;
    	let t87;
    	let button14;
    	let t89;
    	let div16;
    	let p30;
    	let t91;
    	let p31;
    	let t93;
    	let button15;
    	let t95;
    	let div14;
    	let p32;
    	let t97;
    	let button16;
    	let t99;
    	let div15;
    	let p33;
    	let t101;
    	let button17;
    	let t103;
    	let div20;
    	let p34;
    	let t105;
    	let p35;
    	let t107;
    	let p36;
    	let t109;
    	let p37;
    	let t111;
    	let button18;
    	let t113;
    	let div17;
    	let p38;
    	let t115;
    	let button19;
    	let t117;
    	let div18;
    	let p39;
    	let t119;
    	let button20;
    	let t121;
    	let div19;
    	let p40;
    	let t123;
    	let button21;
    	let t125;
    	let div21;
    	let p41;
    	let t127;
    	let p42;
    	let t129;
    	let button22;
    	let t131;
    	let div22;
    	let p43;

    	const block = {
    		c: function create() {
    			div23 = element("div");
    			p0 = element("p");
    			p0.textContent = "Combat time occurs in 3-second “rounds” (rnds). Each Player gets a turn to act in a combat round. Either the GN decides or roll A vs A to determine who goes first. At the end of each turn, the player gets to choose who will go next among those who have not had a turn yet in this round. At the end of the rnd, DMG is applied and the last player to act decides who will start the next round.";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "Most Extras are controlled by the GN on the GN’s turn. Pets, employees, etc. are controlled by their owners/bosses, but the GN has final say. The GN may give a brief recap at the end of each rnd, or skip it to leave inattentive Players in a “fog of war”.";
    			t3 = space();
    			button0 = element("button");
    			button0.textContent = "ACTIONS";
    			t5 = space();
    			div1 = element("div");
    			p2 = element("p");
    			p2.textContent = "You get 1 action/rnd. As your 1 action, you may: make a Trait or Skill roll, perform a Maneuver, draw or stow an item, use an item, interact with the environment, or hold for next rnd.";
    			t7 = space();
    			button1 = element("button");
    			button1.textContent = "FAST ACTIONS";
    			t9 = space();
    			div0 = element("div");
    			p3 = element("p");
    			p3.textContent = "You can take a number of Fast actions equal to your Agility in a round, in addition to your movement and regular action. Examples include: Block, Dodge, Rapid ATKs, pick up an item, go Prone, or speak a sentence.";
    			t11 = space();
    			button2 = element("button");
    			button2.textContent = "MOVEMENT";
    			t13 = space();
    			div3 = element("div");
    			p4 = element("p");
    			p4.textContent = "On your turn, you may walk up to your Speed [A + C] and perform 1 action. You may divide up your Speed before or after your action. You may fall Prone or stand as a Fast action.";
    			t15 = space();
    			button3 = element("button");
    			button3.textContent = "JOG or SPRINT";
    			t17 = space();
    			div2 = element("div");
    			p5 = element("p");
    			p5.textContent = "Jog is [Speed x2] up to C miles. Sprint is [Speed x2 + d6yds] up to C minutes. Roll C# = miles or minutes for each additional mile or minute. On a Fail, stop for 1 minute. Jog and Sprint take your entire turn. Use Reflex for DEF. You are Unstable (-3 to any RATK targeting you).";
    			t19 = space();
    			button4 = element("button");
    			button4.textContent = "ATTACK (ATK)";
    			t21 = space();
    			div11 = element("div");
    			p6 = element("p");
    			p6.textContent = "There are two kinds of attack (ATK) actions: Melee attacks (MATK) and Ranged attacks (RATK).";
    			t23 = space();
    			p7 = element("p");
    			p7.textContent = "Roll [d6 + Melee or Ranged] vs a target's Defense (DEF) to attack a target. Re-roll ties. Explosions (6) let you roll a d6 again and add it to ATK. Botches (1) usually result in broken or jammed weapons. The amount an ATK exceeds DEF is bonus DMG.";
    			t25 = space();
    			button5 = element("button");
    			button5.textContent = "LOCATIONS";
    			t27 = space();
    			div10 = element("div");
    			p8 = element("p");
    			p8.textContent = "A Called Shot or random Location roll are optional for any RATK. MATKs and RATKs within 1yd can be Called Shots without penalty. RATKs within the weapon’s first Range increment target Torso by default, but farther RATKs are randomly rolled by default. Blast DMG Locations are always randomly rolled.";
    			t29 = space();
    			button6 = element("button");
    			button6.textContent = "6 HEAD";
    			t31 = space();
    			div4 = element("div");
    			p9 = element("p");
    			p9.textContent = "Called Shot Penalty: -3 RATK";
    			t33 = space();
    			p10 = element("p");
    			p10.textContent = "DMG Effects: Stun 1rnd";
    			t35 = space();
    			p11 = element("p");
    			p11.textContent = "0HP Effects: Knockout";
    			t37 = space();
    			button7 = element("button");
    			button7.textContent = "5 LEFT ARM";
    			t39 = space();
    			div5 = element("div");
    			p12 = element("p");
    			p12.textContent = "Called Shot Penalty: -1 RATK";
    			t41 = space();
    			p13 = element("p");
    			p13.textContent = "DMG Effects: Drop Item";
    			t43 = space();
    			p14 = element("p");
    			p14.textContent = "0HP Effects: Limb Disabled";
    			t45 = space();
    			button8 = element("button");
    			button8.textContent = "4 RIGHT ARM";
    			t47 = space();
    			div6 = element("div");
    			p15 = element("p");
    			p15.textContent = "Called Shot Penalty: -1 RATK";
    			t49 = space();
    			p16 = element("p");
    			p16.textContent = "DMG Effects: Drop Item";
    			t51 = space();
    			p17 = element("p");
    			p17.textContent = "0HP Effects: Limb Disabled";
    			t53 = space();
    			button9 = element("button");
    			button9.textContent = "3 TORSO";
    			t55 = space();
    			div7 = element("div");
    			p18 = element("p");
    			p18.textContent = "Called Shot Penalty: -0 RATK";
    			t57 = space();
    			p19 = element("p");
    			p19.textContent = "DMG Effects: None";
    			t59 = space();
    			p20 = element("p");
    			p20.textContent = "0HP Effects: Knockout";
    			t61 = space();
    			button10 = element("button");
    			button10.textContent = "2 RIGHT LEG";
    			t63 = space();
    			div8 = element("div");
    			p21 = element("p");
    			p21.textContent = "Called Shot Penalty: -1 RATK";
    			t65 = space();
    			p22 = element("p");
    			p22.textContent = "DMG Effects: -1 Speed/DMG";
    			t67 = space();
    			p23 = element("p");
    			p23.textContent = "0HP Effects: Limb Disabled";
    			t69 = space();
    			button11 = element("button");
    			button11.textContent = "1 LEFT LEG";
    			t71 = space();
    			div9 = element("div");
    			p24 = element("p");
    			p24.textContent = "Called Shot Penalty: -1 RATK";
    			t73 = space();
    			p25 = element("p");
    			p25.textContent = "DMG Effects: -1 Speed/DMG";
    			t75 = space();
    			p26 = element("p");
    			p26.textContent = "0HP Effects: Limb Disabled";
    			t77 = space();
    			button12 = element("button");
    			button12.textContent = "DEFENSE (DEF)";
    			t79 = space();
    			div13 = element("div");
    			p27 = element("p");
    			p27.textContent = "To actively defend from an ATK, you must spend a Fast action to Block [d6 + Melee] or Dodge [d6 + Acrobatics]. You must be aware of an ATK to roll DEF. Otherwise, use Reflex.";
    			t81 = space();
    			p28 = element("p");
    			p28.textContent = "A Botched DEF roll means you fall Prone (if using Dodge) or break your weapon (if using Block).";
    			t83 = space();
    			button13 = element("button");
    			button13.textContent = "REFLEX (REF)";
    			t85 = space();
    			div12 = element("div");
    			p29 = element("p");
    			p29.textContent = "[Reflex = Perception] This is the default passive DEF score. No roll is made and no Fast action is required.";
    			t87 = space();
    			button14 = element("button");
    			button14.textContent = "HEALTH (HP)";
    			t89 = space();
    			div16 = element("div");
    			p30 = element("p");
    			p30.textContent = "[Torso HP = C x2. Head, Arm, and Leg HP = C.]";
    			t91 = space();
    			p31 = element("p");
    			p31.textContent = "Limbs are disabled at 0 HP and destroyed at -C HP. At 0 Head or Torso HP, you fall unconscious. Head or Torso HP at -C is fatal.";
    			t93 = space();
    			button15 = element("button");
    			button15.textContent = "BLEEDING";
    			t95 = space();
    			div14 = element("div");
    			p32 = element("p");
    			p32.textContent = "1DMG/min to Torso. Started by DMG or a Botched Medicine(Surgery). Roll C# = DMG 1/min to stop Bleeding. Pain penalty applies. Use Medicine(First-Aid) to stop Bleeding with MEDICAL Gear or 1FDMG to cauterize a wound.";
    			t97 = space();
    			button16 = element("button");
    			button16.textContent = "ARMOR (AR)";
    			t99 = space();
    			div15 = element("div");
    			p33 = element("p");
    			p33.textContent = "Armor converts DMG up to its AR into BDMG. If the ATK is BDMG, BDMG is reduced by AR. Any DMG that exceeds AR is dealt to HP, and the Armor’s AR is reduced by 1.";
    			t101 = space();
    			button17 = element("button");
    			button17.textContent = "DAMAGE (DMG)";
    			t103 = space();
    			div20 = element("div");
    			p34 = element("p");
    			p34.textContent = "ATKs do DMG to HP = Weapon DMG + (ATK - DEF). All DMG adds Pain. Any DMG that is not Blunt causes Bleeding. If DMG from one ATK exceeds the target’s C, the target falls Prone.";
    			t105 = space();
    			p35 = element("p");
    			p35.textContent = "Melee and Ranged(Throw) DMG are modified by C:";
    			t107 = space();
    			p36 = element("p");
    			p36.textContent = "C 1 and 2 = -1 DMG, C 3 and 4 = +0 DMG, C 5 and 6 = +1 DMG.";
    			t109 = space();
    			p37 = element("p");
    			p37.textContent = "Head DMG Stuns 1rnd. Arm DMG makes you drop anything you are holding. Leg DMG inflicts a -1 Speed penalty per DMG.";
    			t111 = space();
    			button18 = element("button");
    			button18.textContent = "BLUNT (BDMG)";
    			t113 = space();
    			div17 = element("div");
    			p38 = element("p");
    			p38.textContent = "BDMG is only Pain until it exceeds the Threshold [C + D], then it is lethal. Any MATK can be Blunt.";
    			t115 = space();
    			button19 = element("button");
    			button19.textContent = "FIRE (FDMG)";
    			t117 = space();
    			div18 = element("div");
    			p39 = element("p");
    			p39.textContent = "If FDMG drops a Location to 0HP, 1FDMG is permanent. Fire-Resistant (FR) ARMOR reduces FDMG by its AR, and does not lose AR from FDMG.";
    			t119 = space();
    			button20 = element("button");
    			button20.textContent = "PAIN";
    			t121 = space();
    			div19 = element("div");
    			p40 = element("p");
    			p40.textContent = "-1 to all rolls. Non-lethal Pain fades by 1 per 10mins. Go unconscious if Pain exceeds Threshold [C + D].";
    			t123 = space();
    			button21 = element("button");
    			button21.textContent = "RECOVERY";
    			t125 = space();
    			div21 = element("div");
    			p41 = element("p");
    			p41.textContent = "Non-lethal Pain fades away at 1 point per 10mins. After a full day’s rest, roll C# = total DMG (Pain penalty applies) to heal 1HP naturally on a random wounded Location. On a Fail, take 1 Torso DMG from infection. Amputating a limb prevents infection.";
    			t127 = space();
    			p42 = element("p");
    			p42.textContent = "If your Head or Torso is at 0HP or less, you are unconscious until both heal back to 1HP. When any Location drops to 0HP, it is disabled and you must get Surgery before you can heal all DMG naturally, otherwise it loses 1HP permanently.";
    			t129 = space();
    			button22 = element("button");
    			button22.textContent = "DEATH";
    			t131 = space();
    			div22 = element("div");
    			p43 = element("p");
    			p43.textContent = "You drop unconscious and start Bleeding (if not already) when your Head or Torso goes to 0HP. You die when your Head or Torso HP drops to -C. When you die, your Comrades take -1 Psyche from grief. You can make a new Character with bonus starting XP = half of your old Character's Total XP (round down).";
    			add_location(p0, file$9, 21, 12, 543);
    			add_location(p1, file$9, 22, 12, 953);
    			attr_dev(button0, "id", "ActionsBtn");
    			attr_dev(button0, "class", "Btn");
    			add_location(button0, file$9, 23, 12, 1227);
    			add_location(p2, file$9, 25, 16, 1349);
    			attr_dev(button1, "id", "FastActionsBtn");
    			attr_dev(button1, "class", "Btn");
    			add_location(button1, file$9, 26, 16, 1557);
    			add_location(p3, file$9, 28, 20, 1700);
    			attr_dev(div0, "id", "FastActionsSec");
    			attr_dev(div0, "class", "stat-block");
    			add_location(div0, file$9, 27, 16, 1635);
    			attr_dev(div1, "id", "ActionsSec");
    			attr_dev(div1, "class", "stat-block");
    			add_location(div1, file$9, 24, 12, 1292);
    			attr_dev(button2, "id", "MovementBtn");
    			attr_dev(button2, "class", "Btn");
    			add_location(button2, file$9, 31, 12, 1974);
    			add_location(p4, file$9, 33, 16, 2099);
    			attr_dev(button3, "id", "JogSprintBtn");
    			attr_dev(button3, "class", "Btn");
    			add_location(button3, file$9, 34, 16, 2300);
    			add_location(p5, file$9, 36, 20, 2440);
    			attr_dev(div2, "id", "JogSprintSec");
    			attr_dev(div2, "class", "stat-block");
    			add_location(div2, file$9, 35, 16, 2377);
    			attr_dev(div3, "id", "MovementSec");
    			attr_dev(div3, "class", "stat-block");
    			add_location(div3, file$9, 32, 12, 2041);
    			attr_dev(button4, "id", "AttackBtn");
    			attr_dev(button4, "class", "Btn");
    			add_location(button4, file$9, 39, 12, 2780);
    			add_location(p6, file$9, 41, 16, 2905);
    			add_location(p7, file$9, 42, 16, 3021);
    			attr_dev(button5, "id", "LocationsBtn");
    			attr_dev(button5, "class", "Btn");
    			add_location(button5, file$9, 43, 16, 3292);
    			add_location(p8, file$9, 45, 20, 3428);
    			attr_dev(button6, "id", "HeadLocationBtn");
    			attr_dev(button6, "class", "Btn");
    			add_location(button6, file$9, 46, 20, 3755);
    			add_location(p9, file$9, 48, 24, 3902);
    			add_location(p10, file$9, 49, 24, 3962);
    			add_location(p11, file$9, 50, 24, 4016);
    			attr_dev(div4, "id", "HeadLocationSec");
    			attr_dev(div4, "class", "stat-block");
    			add_location(div4, file$9, 47, 20, 3832);
    			attr_dev(button7, "id", "LeftArmLocationBtn");
    			attr_dev(button7, "class", "Btn");
    			add_location(button7, file$9, 52, 20, 4092);
    			add_location(p12, file$9, 54, 24, 4249);
    			add_location(p13, file$9, 55, 24, 4309);
    			add_location(p14, file$9, 56, 24, 4363);
    			attr_dev(div5, "id", "LeftArmLocationSec");
    			attr_dev(div5, "class", "stat-block");
    			add_location(div5, file$9, 53, 20, 4176);
    			attr_dev(button8, "id", "RightArmLocationBtn");
    			attr_dev(button8, "class", "Btn");
    			add_location(button8, file$9, 58, 20, 4444);
    			add_location(p15, file$9, 60, 24, 4604);
    			add_location(p16, file$9, 61, 24, 4664);
    			add_location(p17, file$9, 62, 24, 4718);
    			attr_dev(div6, "id", "RightArmLocationSec");
    			attr_dev(div6, "class", "stat-block");
    			add_location(div6, file$9, 59, 20, 4530);
    			attr_dev(button9, "id", "TorsoLocationBtn");
    			attr_dev(button9, "class", "Btn");
    			add_location(button9, file$9, 64, 20, 4799);
    			add_location(p18, file$9, 66, 24, 4949);
    			add_location(p19, file$9, 67, 24, 5009);
    			add_location(p20, file$9, 68, 24, 5058);
    			attr_dev(div7, "id", "TorsoLocationSec");
    			attr_dev(div7, "class", "stat-block");
    			add_location(div7, file$9, 65, 20, 4878);
    			attr_dev(button10, "id", "RightLegLocationBtn");
    			attr_dev(button10, "class", "Btn");
    			add_location(button10, file$9, 70, 20, 5134);
    			add_location(p21, file$9, 72, 24, 5294);
    			add_location(p22, file$9, 73, 24, 5354);
    			add_location(p23, file$9, 74, 24, 5411);
    			attr_dev(div8, "id", "RightLegLocationSec");
    			attr_dev(div8, "class", "stat-block");
    			add_location(div8, file$9, 71, 20, 5220);
    			attr_dev(button11, "id", "LeftLegLocationBtn");
    			attr_dev(button11, "class", "Btn");
    			add_location(button11, file$9, 76, 20, 5492);
    			add_location(p24, file$9, 78, 24, 5649);
    			add_location(p25, file$9, 79, 24, 5709);
    			add_location(p26, file$9, 80, 24, 5766);
    			attr_dev(div9, "id", "LeftLegLocationSec");
    			attr_dev(div9, "class", "stat-block");
    			add_location(div9, file$9, 77, 20, 5576);
    			attr_dev(div10, "id", "LocationsSec");
    			attr_dev(div10, "class", "stat-block");
    			add_location(div10, file$9, 44, 16, 3365);
    			attr_dev(div11, "id", "AttackSec");
    			attr_dev(div11, "class", "stat-block");
    			add_location(div11, file$9, 40, 12, 2849);
    			attr_dev(button12, "id", "DefenseBtn");
    			attr_dev(button12, "class", "Btn");
    			add_location(button12, file$9, 84, 12, 5881);
    			add_location(p27, file$9, 86, 16, 6009);
    			add_location(p28, file$9, 87, 16, 6207);
    			attr_dev(button13, "id", "ReflexBtn");
    			attr_dev(button13, "class", "Btn");
    			add_location(button13, file$9, 88, 16, 6326);
    			add_location(p29, file$9, 90, 20, 6459);
    			attr_dev(div12, "id", "ReflexSec");
    			attr_dev(div12, "class", "stat-block");
    			add_location(div12, file$9, 89, 16, 6399);
    			attr_dev(div13, "id", "DefenseSec");
    			attr_dev(div13, "class", "stat-block");
    			add_location(div13, file$9, 85, 12, 5952);
    			attr_dev(button14, "id", "HealthBtn");
    			attr_dev(button14, "class", "Btn");
    			add_location(button14, file$9, 93, 12, 6629);
    			add_location(p30, file$9, 95, 16, 6753);
    			add_location(p31, file$9, 96, 16, 6822);
    			attr_dev(button15, "id", "BleedingBtn");
    			attr_dev(button15, "class", "Btn");
    			add_location(button15, file$9, 97, 16, 6974);
    			add_location(p32, file$9, 99, 20, 7107);
    			attr_dev(div14, "id", "BleedingSec");
    			attr_dev(div14, "class", "stat-block");
    			add_location(div14, file$9, 98, 16, 7045);
    			attr_dev(button16, "id", "ArmorBtn");
    			attr_dev(button16, "class", "Btn");
    			add_location(button16, file$9, 101, 16, 7369);
    			add_location(p33, file$9, 103, 20, 7498);
    			attr_dev(div15, "id", "ArmorSec");
    			attr_dev(div15, "class", "stat-block");
    			add_location(div15, file$9, 102, 16, 7439);
    			attr_dev(div16, "id", "HealthSec");
    			attr_dev(div16, "class", "stat-block");
    			add_location(div16, file$9, 94, 12, 6697);
    			attr_dev(button17, "id", "DamageBtn");
    			attr_dev(button17, "class", "Btn");
    			add_location(button17, file$9, 106, 12, 7721);
    			add_location(p34, file$9, 108, 16, 7846);
    			add_location(p35, file$9, 109, 16, 8045);
    			add_location(p36, file$9, 110, 16, 8115);
    			add_location(p37, file$9, 111, 16, 8198);
    			attr_dev(button18, "id", "BluntBtn");
    			attr_dev(button18, "class", "Btn");
    			add_location(button18, file$9, 112, 16, 8336);
    			add_location(p38, file$9, 114, 20, 8467);
    			attr_dev(div17, "id", "BluntSec");
    			attr_dev(div17, "class", "stat-block");
    			add_location(div17, file$9, 113, 16, 8408);
    			attr_dev(button19, "id", "FireBtn");
    			attr_dev(button19, "class", "Btn");
    			add_location(button19, file$9, 116, 16, 8613);
    			add_location(p39, file$9, 118, 20, 8741);
    			attr_dev(div18, "id", "FireSec");
    			attr_dev(div18, "class", "stat-block");
    			add_location(div18, file$9, 117, 16, 8683);
    			attr_dev(button20, "id", "PainBtn");
    			attr_dev(button20, "class", "Btn");
    			add_location(button20, file$9, 120, 16, 8922);
    			add_location(p40, file$9, 122, 20, 9043);
    			attr_dev(div19, "id", "PainSec");
    			attr_dev(div19, "class", "stat-block");
    			add_location(div19, file$9, 121, 16, 8985);
    			attr_dev(div20, "id", "DamageSec");
    			attr_dev(div20, "class", "stat-block");
    			add_location(div20, file$9, 107, 12, 7790);
    			attr_dev(button21, "id", "RecoveryBtn");
    			attr_dev(button21, "class", "Btn");
    			add_location(button21, file$9, 125, 12, 9210);
    			add_location(p41, file$9, 127, 16, 9335);
    			add_location(p42, file$9, 128, 16, 9610);
    			attr_dev(div21, "id", "RecoverySec");
    			attr_dev(div21, "class", "stat-block");
    			add_location(div21, file$9, 126, 12, 9277);
    			attr_dev(button22, "id", "DeathBtn");
    			attr_dev(button22, "class", "Btn");
    			add_location(button22, file$9, 130, 12, 9885);
    			add_location(p43, file$9, 132, 16, 10001);
    			attr_dev(div22, "id", "DeathSec");
    			attr_dev(div22, "class", "stat-block");
    			add_location(div22, file$9, 131, 12, 9946);
    			attr_dev(div23, "id", "CombatSec");
    			attr_dev(div23, "class", "sheet-section");
    			add_location(div23, file$9, 20, 8, 488);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div23, anchor);
    			append_dev(div23, p0);
    			append_dev(div23, t1);
    			append_dev(div23, p1);
    			append_dev(div23, t3);
    			append_dev(div23, button0);
    			append_dev(div23, t5);
    			append_dev(div23, div1);
    			append_dev(div1, p2);
    			append_dev(div1, t7);
    			append_dev(div1, button1);
    			append_dev(div1, t9);
    			append_dev(div1, div0);
    			append_dev(div0, p3);
    			append_dev(div23, t11);
    			append_dev(div23, button2);
    			append_dev(div23, t13);
    			append_dev(div23, div3);
    			append_dev(div3, p4);
    			append_dev(div3, t15);
    			append_dev(div3, button3);
    			append_dev(div3, t17);
    			append_dev(div3, div2);
    			append_dev(div2, p5);
    			append_dev(div23, t19);
    			append_dev(div23, button4);
    			append_dev(div23, t21);
    			append_dev(div23, div11);
    			append_dev(div11, p6);
    			append_dev(div11, t23);
    			append_dev(div11, p7);
    			append_dev(div11, t25);
    			append_dev(div11, button5);
    			append_dev(div11, t27);
    			append_dev(div11, div10);
    			append_dev(div10, p8);
    			append_dev(div10, t29);
    			append_dev(div10, button6);
    			append_dev(div10, t31);
    			append_dev(div10, div4);
    			append_dev(div4, p9);
    			append_dev(div4, t33);
    			append_dev(div4, p10);
    			append_dev(div4, t35);
    			append_dev(div4, p11);
    			append_dev(div10, t37);
    			append_dev(div10, button7);
    			append_dev(div10, t39);
    			append_dev(div10, div5);
    			append_dev(div5, p12);
    			append_dev(div5, t41);
    			append_dev(div5, p13);
    			append_dev(div5, t43);
    			append_dev(div5, p14);
    			append_dev(div10, t45);
    			append_dev(div10, button8);
    			append_dev(div10, t47);
    			append_dev(div10, div6);
    			append_dev(div6, p15);
    			append_dev(div6, t49);
    			append_dev(div6, p16);
    			append_dev(div6, t51);
    			append_dev(div6, p17);
    			append_dev(div10, t53);
    			append_dev(div10, button9);
    			append_dev(div10, t55);
    			append_dev(div10, div7);
    			append_dev(div7, p18);
    			append_dev(div7, t57);
    			append_dev(div7, p19);
    			append_dev(div7, t59);
    			append_dev(div7, p20);
    			append_dev(div10, t61);
    			append_dev(div10, button10);
    			append_dev(div10, t63);
    			append_dev(div10, div8);
    			append_dev(div8, p21);
    			append_dev(div8, t65);
    			append_dev(div8, p22);
    			append_dev(div8, t67);
    			append_dev(div8, p23);
    			append_dev(div10, t69);
    			append_dev(div10, button11);
    			append_dev(div10, t71);
    			append_dev(div10, div9);
    			append_dev(div9, p24);
    			append_dev(div9, t73);
    			append_dev(div9, p25);
    			append_dev(div9, t75);
    			append_dev(div9, p26);
    			append_dev(div23, t77);
    			append_dev(div23, button12);
    			append_dev(div23, t79);
    			append_dev(div23, div13);
    			append_dev(div13, p27);
    			append_dev(div13, t81);
    			append_dev(div13, p28);
    			append_dev(div13, t83);
    			append_dev(div13, button13);
    			append_dev(div13, t85);
    			append_dev(div13, div12);
    			append_dev(div12, p29);
    			append_dev(div23, t87);
    			append_dev(div23, button14);
    			append_dev(div23, t89);
    			append_dev(div23, div16);
    			append_dev(div16, p30);
    			append_dev(div16, t91);
    			append_dev(div16, p31);
    			append_dev(div16, t93);
    			append_dev(div16, button15);
    			append_dev(div16, t95);
    			append_dev(div16, div14);
    			append_dev(div14, p32);
    			append_dev(div16, t97);
    			append_dev(div16, button16);
    			append_dev(div16, t99);
    			append_dev(div16, div15);
    			append_dev(div15, p33);
    			append_dev(div23, t101);
    			append_dev(div23, button17);
    			append_dev(div23, t103);
    			append_dev(div23, div20);
    			append_dev(div20, p34);
    			append_dev(div20, t105);
    			append_dev(div20, p35);
    			append_dev(div20, t107);
    			append_dev(div20, p36);
    			append_dev(div20, t109);
    			append_dev(div20, p37);
    			append_dev(div20, t111);
    			append_dev(div20, button18);
    			append_dev(div20, t113);
    			append_dev(div20, div17);
    			append_dev(div17, p38);
    			append_dev(div20, t115);
    			append_dev(div20, button19);
    			append_dev(div20, t117);
    			append_dev(div20, div18);
    			append_dev(div18, p39);
    			append_dev(div20, t119);
    			append_dev(div20, button20);
    			append_dev(div20, t121);
    			append_dev(div20, div19);
    			append_dev(div19, p40);
    			append_dev(div23, t123);
    			append_dev(div23, button21);
    			append_dev(div23, t125);
    			append_dev(div23, div21);
    			append_dev(div21, p41);
    			append_dev(div21, t127);
    			append_dev(div21, p42);
    			append_dev(div23, t129);
    			append_dev(div23, button22);
    			append_dev(div23, t131);
    			append_dev(div23, div22);
    			append_dev(div22, p43);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div23);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(20:4) {#if visible}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let div1;
    	let label;
    	let input;
    	let t0;
    	let div0;
    	let span;
    	let t1;
    	let h2;
    	let t3;
    	let dispose;

    	function select_block_type(changed, ctx) {
    		if (ctx.visible) return create_if_block_1$3;
    		return create_else_block$2;
    	}

    	let current_block_type = select_block_type(null, ctx);
    	let if_block0 = current_block_type(ctx);
    	let if_block1 = ctx.visible && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			label = element("label");
    			input = element("input");
    			t0 = space();
    			div0 = element("div");
    			span = element("span");
    			if_block0.c();
    			t1 = space();
    			h2 = element("h2");
    			h2.textContent = "Combat";
    			t3 = space();
    			if (if_block1) if_block1.c();
    			attr_dev(input, "type", "checkbox");
    			add_location(input, file$9, 7, 8, 143);
    			attr_dev(span, "class", "checkbox");
    			add_location(span, file$9, 9, 12, 238);
    			add_location(h2, file$9, 16, 12, 418);
    			attr_dev(div0, "class", "section-title");
    			add_location(div0, file$9, 8, 8, 198);
    			attr_dev(label, "class", "checkbar");
    			add_location(label, file$9, 6, 4, 110);
    			attr_dev(div1, "class", "combat-rules");
    			add_location(div1, file$9, 5, 0, 79);
    			dispose = listen_dev(input, "change", ctx.input_change_handler);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, label);
    			append_dev(label, input);
    			input.checked = ctx.visible;
    			append_dev(label, t0);
    			append_dev(label, div0);
    			append_dev(div0, span);
    			if_block0.m(span, null);
    			append_dev(div0, t1);
    			append_dev(div0, h2);
    			append_dev(div1, t3);
    			if (if_block1) if_block1.m(div1, null);
    		},
    		p: function update(changed, ctx) {
    			if (changed.visible) {
    				input.checked = ctx.visible;
    			}

    			if (current_block_type !== (current_block_type = select_block_type(changed, ctx))) {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(span, null);
    				}
    			}

    			if (ctx.visible) {
    				if (!if_block1) {
    					if_block1 = create_if_block$3(ctx);
    					if_block1.c();
    					if_block1.m(div1, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if_block0.d();
    			if (if_block1) if_block1.d();
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

    let action_visible = false;

    function instance$a($$self, $$props, $$invalidate) {
    	let visible = false;

    	function input_change_handler() {
    		visible = this.checked;
    		$$invalidate("visible", visible);
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("visible" in $$props) $$invalidate("visible", visible = $$props.visible);
    		if ("action_visible" in $$props) action_visible = $$props.action_visible;
    	};

    	return { visible, input_change_handler };
    }

    class Combat extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Combat",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src/pages/Rules.svelte generated by Svelte v3.14.1 */
    const file$a = "src/pages/Rules.svelte";

    function create_fragment$d(ctx) {
    	let div1;
    	let t0;
    	let div0;
    	let button;
    	let current;
    	let dispose;
    	const combat = new Combat({ $$inline: true });

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(combat.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			button = element("button");
    			button.textContent = "Home";
    			attr_dev(button, "class", "nav-button svelte-18puduf");
    			add_location(button, file$a, 15, 8, 621);
    			attr_dev(div0, "class", "nav-bar svelte-18puduf");
    			add_location(div0, file$a, 14, 4, 591);
    			attr_dev(div1, "class", "page rules-page");
    			add_location(div1, file$a, 12, 0, 542);
    			dispose = listen_dev(button, "click", router.goHome, false, false, false);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(combat, div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, button);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(combat.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(combat.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(combat);
    			dispose();
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

    class Rules extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Rules",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* src/pages/Home.svelte generated by Svelte v3.14.1 */
    const file$b = "src/pages/Home.svelte";

    function create_fragment$e(ctx) {
    	let div;
    	let button0;
    	let t1;
    	let button1;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			button0 = element("button");
    			button0.textContent = "Character";
    			t1 = space();
    			button1 = element("button");
    			button1.textContent = "Rules";
    			attr_dev(button0, "class", "svelte-hz0e23");
    			add_location(button0, file$b, 7, 4, 171);
    			attr_dev(button1, "class", "svelte-hz0e23");
    			add_location(button1, file$b, 8, 4, 232);
    			attr_dev(div, "class", "page home-page svelte-hz0e23");
    			add_location(div, file$b, 6, 0, 138);

    			dispose = [
    				listen_dev(button0, "click", router.goCharacter, false, false, false),
    				listen_dev(button1, "click", router.goRules, false, false, false)
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
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$e, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$e.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.14.1 */
    const file$c = "src/App.svelte";

    // (15:4) <Router>
    function create_default_slot(ctx) {
    	let t0;
    	let t1;
    	let current;

    	const route0 = new Route({
    			props: { path: "/", component: Home },
    			$$inline: true
    		});

    	const route1 = new Route({
    			props: { path: "/character", component: Character$1 },
    			$$inline: true
    		});

    	const route2 = new Route({
    			props: { path: "/rules", component: Rules },
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
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(15:4) <Router>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
    	let main;
    	let div2;
    	let div1;
    	let div0;
    	let t0;
    	let t1;
    	let current;
    	const titlebar = new TitleBar({ $$inline: true });

    	const router = new Router({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const navbar = new NavBar({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			create_component(titlebar.$$.fragment);
    			t0 = space();
    			create_component(router.$$.fragment);
    			t1 = space();
    			create_component(navbar.$$.fragment);
    			attr_dev(div0, "class", "display svelte-hzqt0l");
    			add_location(div0, file$c, 12, 3, 350);
    			attr_dev(div1, "class", "screen svelte-hzqt0l");
    			add_location(div1, file$c, 11, 2, 326);
    			attr_dev(div2, "class", "console svelte-hzqt0l");
    			add_location(div2, file$c, 10, 1, 302);
    			attr_dev(main, "class", "svelte-hzqt0l");
    			add_location(main, file$c, 9, 0, 294);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div2);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			mount_component(titlebar, div0, null);
    			append_dev(div0, t0);
    			mount_component(router, div0, null);
    			append_dev(div0, t1);
    			mount_component(navbar, div0, null);
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
    			transition_in(titlebar.$$.fragment, local);
    			transition_in(router.$$.fragment, local);
    			transition_in(navbar.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(titlebar.$$.fragment, local);
    			transition_out(router.$$.fragment, local);
    			transition_out(navbar.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(titlebar);
    			destroy_component(router);
    			destroy_component(navbar);
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

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$f, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$f.name
    		});
    	}
    }

    const app = new App({
    	target: document.body
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
