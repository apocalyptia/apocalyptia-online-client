
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

    /* src/layout/ViewScreen.svelte generated by Svelte v3.15.0 */

    const file = "src/layout/ViewScreen.svelte";

    function create_fragment$2(ctx) {
    	let div1;
    	let div0;
    	let current;
    	const default_slot_template = ctx.$$slots.default;
    	const default_slot = create_slot(default_slot_template, ctx, null);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div0, "class", "display svelte-138r0ca");
    			add_location(div0, file, 1, 1, 22);
    			attr_dev(div1, "class", "screen svelte-138r0ca");
    			add_location(div1, file, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			if (default_slot) {
    				default_slot.m(div0, null);
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
    			if (detaching) detach_dev(div1);
    			if (default_slot) default_slot.d(detaching);
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
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ViewScreen",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    const router = {
        Home: () => { navigate("/", { replace: true }); },
        Creator: () => { navigate("/creator", { replace: true }); },
        Rules: () => { navigate("/rules", { replace: true }); }
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
    			attr_dev(span0, "class", "title svelte-8t0adb");
    			add_location(span0, file$1, 5, 4, 109);
    			attr_dev(span1, "class", "beta svelte-8t0adb");
    			add_location(span1, file$1, 6, 4, 159);
    			attr_dev(button, "class", "title-bar svelte-8t0adb");
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

    /* src/layout/BackNextButtons.svelte generated by Svelte v3.15.0 */
    const file$2 = "src/layout/BackNextButtons.svelte";

    function create_fragment$4(ctx) {
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
    			attr_dev(button0, "class", "svelte-mz0ikb");
    			add_location(button0, file$2, 12, 4, 257);
    			attr_dev(button1, "class", "svelte-mz0ikb");
    			add_location(button1, file$2, 13, 4, 299);
    			attr_dev(div, "class", "svelte-mz0ikb");
    			add_location(div, file$2, 11, 0, 247);

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
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$3, create_fragment$4, safe_not_equal, { step: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BackNextButtons",
    			options,
    			id: create_fragment$4.name
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
        "agility": new Trait("Agility"),
        "brains": new Trait("Brains"),
        "constitution": new Trait("Constitution"),
        "demeanor": new Trait("Demeanor"),
    };

    const traitPoints = 12;

    class Skill {
        constructor (name, parent) {
            this.name = name,
            this.parent = parent,
            this.score = 0;
        }
    }

    let skillsList = {
        "acrobatics": new Skill("Acrobatics", "Agility"),
        "athletics": new Skill("Athletics", "Constitution"),
        "build": new Skill("Build", "Brains"),
        "drive": new Skill("Drive", "Constitution"),
        "larceny": new Skill("Larceny", "Agility"),
        "leadership": new Skill("Leadership", "Demeanor"),
        "medicine": new Skill("Medicine", "Brains"),
        "melee": new Skill("Melee", "Constitution"),
        "perception": new Skill("Perception", "Brains"),
        "perform": new Skill("Perform", "Demeanor"),
        "ranged": new Skill("Ranged", "Agility"),
        "science": new Skill("Science", "Brains"),
        "socialize": new Skill("Socialize", "Demeanor"),
        "stealth": new Skill("Stealth", "Agility"),
        "survival": new Skill("Survival", "Constitution"),
        "tame": new Skill("Tame", "Demeanor"),
    };

    class Character {
        constructor() {
            this.scenario = "",
            this.completed = false,
            this.description = {
                age: {           label: "Age",       value: "" },
                characterName: { label: "Character", value: "" },
                gender: {        label: "Gender",    value: "" },
                hair: {          label: "Hair",      value: "" },
                height: {        label: "Height",    value: "" },
                playerName: {    label: "Player",    value: "" },
                skin: {          label: "Skin",      value: "" },
                weight: {        label: "Weight",    value: "" },
            },
            this.traits = traitsList,
            this.skills = skillsList,
            this.props = {
                actions: { name: "Actions",    base: 1, score: 1, setActions: () => {
                    let actions = Math.floor((this.traits["agility"].score + this.traits["brains"].score) / 2);
                    this.props.actions.base = actions;
                    return actions
                } },
                block: {   name: "Block",      base: 0, score: 0, setBlock: () => {
                    let block = this.skills["melee"].score;
                    this.props.block.base = block;
                    return block
                } },
                dodge: {   name: "Dodge",      base: 0, score: 0, setDodge: () => {
                    let dodge = this.skills["acrobatics"].score;
                    this.props.dodge.base = dodge;
                    return dodge
                } },
                health: {  name: "Health",     base: 3, score: 3, setHealth: () => {
                    let health = this.traits["constitution"].score * 3;
                    this.props.health.base = health;
                    return health
                } },
                luck: {    name: "Luck",       base: 1, score: 1, setLuck: () => {
                    let luck = this.traits["demeanor"].score;
                    this.props.luck.base = luck;
                    return luck
                } },
                psyche: {  name: "Psyche",     base: 1, score: 1, setPsyche: () => {
                    let psyche = this.traits["demeanor"].score * 3;
                    this.props.psyche.base = psyche;
                    return psyche
                }},
                reflex: {  name: "Reflex",     base: 0, score: 0, setReflex: () => {
                    let reflex = Math.floor(this.traits["brains"].score / 2);
                    this.props.reflex.base = reflex;
                    return reflex
                } },
                speed: {   name: "Speed",      base: 2, score: 2, setSpeed: () => {
                    let speed = this.traits["agility"].score + this.traits["constitution"].score;
                    this.props.speed.base = speed;
                    return speed
                } },
                xp: {      name: "Experience", base: 6, score: 6, setXP: () => {
                    let xp = this.traits["brains"].score * 6;
                    this.props.xp.base = xp;
                    return xp
                } },
            },
            this.abilities = [],
            this.gear = {
                armor: {    name: "Armor",    inventory: [] },
                weapons: {  name: "Weapons",  inventory: [] },
                backpack: { name: "Backpack", inventory: [] },
                ammo: {     name: "Ammo",     inventory: [] },
            },
            this.reflex_score = () => {
                return Math.round(this.traits["brains"].score / 2)
            },
            this.dodge_score = () => {
                return this.traits["agility"].score
            },
            this.block_score = () => {
                return this.skills.melee.score
            };
        }
    }

    let newCharacter = new Character();

    const CharacterStore = writable(newCharacter);

    /* src/components/creator/Description.svelte generated by Svelte v3.15.0 */
    const file$3 = "src/components/creator/Description.svelte";

    function create_fragment$5(ctx) {
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
    			add_location(h2, file$3, 8, 8, 220);
    			attr_dev(div0, "class", "step-title");
    			add_location(div0, file$3, 7, 4, 187);
    			attr_dev(span0, "class", "stat-label");
    			add_location(span0, file$3, 11, 8, 289);
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "class", "full-input");
    			add_location(input0, file$3, 12, 8, 337);
    			attr_dev(div1, "class", "stat-block");
    			add_location(div1, file$3, 10, 4, 256);
    			attr_dev(span1, "class", "stat-label");
    			add_location(span1, file$3, 19, 8, 516);
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "class", "full-input");
    			add_location(input1, file$3, 20, 8, 567);
    			attr_dev(div2, "class", "stat-block");
    			add_location(div2, file$3, 18, 4, 483);
    			attr_dev(span2, "class", "stat-label");
    			add_location(span2, file$3, 28, 12, 791);
    			attr_dev(input2, "type", "text");
    			attr_dev(input2, "class", "half-input");
    			add_location(input2, file$3, 29, 12, 843);
    			attr_dev(div3, "class", "half-stat-block");
    			add_location(div3, file$3, 27, 8, 749);
    			attr_dev(span3, "class", "stat-label");
    			add_location(span3, file$3, 36, 12, 1051);
    			attr_dev(input3, "type", "text");
    			attr_dev(input3, "class", "half-input");
    			add_location(input3, file$3, 37, 12, 1103);
    			attr_dev(div4, "class", "half-stat-block");
    			add_location(div4, file$3, 35, 8, 1009);
    			attr_dev(div5, "class", "stat-block");
    			add_location(div5, file$3, 26, 4, 716);
    			attr_dev(span4, "class", "stat-label");
    			add_location(span4, file$3, 46, 12, 1351);
    			attr_dev(input4, "type", "text");
    			attr_dev(input4, "class", "half-input");
    			add_location(input4, file$3, 47, 12, 1401);
    			attr_dev(div6, "class", "half-stat-block");
    			add_location(div6, file$3, 45, 8, 1309);
    			attr_dev(span5, "class", "stat-label");
    			add_location(span5, file$3, 54, 12, 1607);
    			attr_dev(input5, "type", "text");
    			attr_dev(input5, "class", "half-input");
    			add_location(input5, file$3, 55, 12, 1657);
    			attr_dev(div7, "class", "half-stat-block");
    			add_location(div7, file$3, 53, 8, 1565);
    			attr_dev(div8, "class", "stat-block");
    			add_location(div8, file$3, 44, 4, 1276);
    			attr_dev(span6, "class", "stat-label");
    			add_location(span6, file$3, 64, 12, 1903);
    			attr_dev(input6, "type", "text");
    			attr_dev(input6, "class", "half-input");
    			add_location(input6, file$3, 65, 12, 1955);
    			attr_dev(div9, "class", "half-stat-block");
    			add_location(div9, file$3, 63, 8, 1861);
    			attr_dev(span7, "class", "stat-label");
    			add_location(span7, file$3, 72, 12, 2163);
    			attr_dev(input7, "type", "text");
    			attr_dev(input7, "class", "half-input");
    			add_location(input7, file$3, 73, 12, 2212);
    			attr_dev(div10, "class", "half-stat-block");
    			add_location(div10, file$3, 71, 8, 2121);
    			attr_dev(div11, "class", "stat-block");
    			add_location(div11, file$3, 62, 4, 1828);
    			attr_dev(div12, "class", "step");
    			add_location(div12, file$3, 6, 0, 164);

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
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$4, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Description",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/components/creator/Traits.svelte generated by Svelte v3.15.0 */

    const { Object: Object_1 } = globals;
    const file$4 = "src/components/creator/Traits.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = Object_1.create(ctx);
    	child_ctx.trait = list[i];
    	return child_ctx;
    }

    // (26:4) {#each traits as trait}
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
    			add_location(span, file$4, 27, 12, 720);
    			attr_dev(input, "class", "stat-input");
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", "1");
    			attr_dev(input, "max", input_max_value = Math.min(ctx.char.traits[ctx.trait].max, ctx.char.traits[ctx.trait].score + ctx.remaining));
    			add_location(input, file$4, 28, 12, 790);
    			attr_dev(div, "class", "stat-block");
    			add_location(div, file$4, 26, 8, 683);

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
    		source: "(26:4) {#each traits as trait}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
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

    			add_location(h2, file$4, 20, 8, 534);
    			attr_dev(div0, "class", "step-title");
    			add_location(div0, file$4, 19, 4, 501);
    			add_location(h3, file$4, 23, 8, 597);
    			attr_dev(div1, "class", "remaining svelte-slj60w");
    			add_location(div1, file$4, 22, 4, 565);
    			attr_dev(div2, "class", "step");
    			add_location(div2, file$4, 18, 0, 478);
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

    	const traits = Object.keys(char.traits);
    	let remaining = traitPoints - traits.length;

    	function updateTraits() {
    		let r = 0;
    		for (const trait of traits) r += char.traits[trait].score;
    		$$invalidate("remaining", remaining = traitPoints - r);
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
    		init(this, options, instance$5, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Traits",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/components/creator/Skills.svelte generated by Svelte v3.15.0 */

    const { Object: Object_1$1 } = globals;
    const file$5 = "src/components/creator/Skills.svelte";

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
    			add_location(span, file$5, 34, 24, 1063);
    			attr_dev(input, "class", "stat-input");
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", "0");
    			attr_dev(input, "max", input_max_value = Math.min(ctx.char.traits[ctx.trait].score, ctx.char.skills[ctx.skill].score + ctx.remaining));
    			add_location(input, file$5, 35, 24, 1145);
    			attr_dev(div, "class", "stat-block");
    			add_location(div, file$5, 33, 20, 1014);

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
    			add_location(div0, file$5, 28, 12, 782);
    			attr_dev(div1, "class", "skill-section svelte-wj9h86");
    			add_location(div1, file$5, 27, 8, 742);
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

    			add_location(h2, file$5, 21, 8, 593);
    			attr_dev(div0, "class", "step-title");
    			add_location(div0, file$5, 20, 4, 560);
    			add_location(h3, file$5, 24, 8, 656);
    			attr_dev(div1, "class", "remaining svelte-wj9h86");
    			add_location(div1, file$5, 23, 4, 624);
    			attr_dev(div2, "class", "step");
    			add_location(div2, file$5, 19, 0, 537);
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
    		init(this, options, instance$6, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Skills",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/components/creator/Properties.svelte generated by Svelte v3.15.0 */
    const file$6 = "src/components/creator/Properties.svelte";

    function create_fragment$8(ctx) {
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
    			add_location(h2, file$6, 8, 8, 220);
    			attr_dev(div0, "class", "step-title");
    			add_location(div0, file$6, 7, 4, 187);
    			attr_dev(span0, "class", "three-column");
    			add_location(span0, file$6, 11, 8, 288);
    			attr_dev(input0, "type", "number");
    			attr_dev(input0, "class", "three-column");
    			input0.value = input0_value_value = ctx.char.props.health.setHealth();
    			attr_dev(input0, "min", "0");
    			attr_dev(input0, "max", input0_max_value = ctx.char.props.health.score);
    			add_location(input0, file$6, 12, 8, 338);
    			attr_dev(span1, "class", "three-column");
    			add_location(span1, file$6, 19, 8, 532);
    			attr_dev(div1, "class", "stat-block");
    			add_location(div1, file$6, 10, 4, 255);
    			attr_dev(span2, "class", "three-column");
    			add_location(span2, file$6, 22, 8, 640);
    			attr_dev(input1, "type", "number");
    			attr_dev(input1, "class", "three-column");
    			input1.value = "0";
    			attr_dev(input1, "min", "0");
    			attr_dev(input1, "max", input1_max_value = ctx.char.props.health.score);
    			add_location(input1, file$6, 23, 8, 688);
    			attr_dev(span3, "class", "three-column");
    			add_location(span3, file$6, 30, 8, 852);
    			attr_dev(div2, "class", "stat-block");
    			add_location(div2, file$6, 21, 4, 607);
    			attr_dev(span4, "class", "three-column");
    			add_location(span4, file$6, 33, 8, 973);
    			attr_dev(input2, "type", "number");
    			attr_dev(input2, "class", "three-column");
    			input2.value = input2_value_value = ctx.char.props.psyche.setPsyche();
    			attr_dev(input2, "min", "0");
    			attr_dev(input2, "max", input2_max_value = ctx.char.props.psyche.score);
    			add_location(input2, file$6, 34, 8, 1023);
    			attr_dev(span5, "class", "three-column");
    			add_location(span5, file$6, 41, 8, 1217);
    			attr_dev(div3, "class", "stat-block");
    			add_location(div3, file$6, 32, 4, 940);
    			attr_dev(span6, "class", "stat-label");
    			add_location(span6, file$6, 46, 12, 1366);
    			attr_dev(span7, "class", "stat-input");
    			add_location(span7, file$6, 47, 12, 1418);
    			attr_dev(span8, "class", "three-column");
    			add_location(span8, file$6, 45, 8, 1326);
    			attr_dev(span9, "class", "stat-label");
    			add_location(span9, file$6, 50, 12, 1546);
    			attr_dev(span10, "class", "stat-input");
    			add_location(span10, file$6, 51, 12, 1597);
    			attr_dev(span11, "class", "three-column");
    			add_location(span11, file$6, 49, 8, 1506);
    			attr_dev(span12, "class", "stat-label");
    			add_location(span12, file$6, 54, 12, 1723);
    			attr_dev(span13, "class", "stat-input");
    			add_location(span13, file$6, 55, 12, 1774);
    			attr_dev(span14, "class", "three-column");
    			add_location(span14, file$6, 53, 8, 1683);
    			attr_dev(div4, "class", "stat-block");
    			add_location(div4, file$6, 44, 4, 1293);
    			attr_dev(span15, "class", "stat-label");
    			add_location(span15, file$6, 60, 8, 1901);
    			attr_dev(span16, "class", "stat-input");
    			add_location(span16, file$6, 61, 8, 1950);
    			attr_dev(div5, "class", "stat-block");
    			add_location(div5, file$6, 59, 4, 1868);
    			attr_dev(span17, "class", "stat-label");
    			add_location(span17, file$6, 64, 8, 2064);
    			attr_dev(span18, "class", "stat-input");
    			add_location(span18, file$6, 65, 8, 2111);
    			attr_dev(div6, "class", "stat-block");
    			add_location(div6, file$6, 63, 4, 2031);
    			attr_dev(span19, "class", "stat-label");
    			add_location(span19, file$6, 68, 8, 2221);
    			attr_dev(span20, "class", "stat-input");
    			add_location(span20, file$6, 69, 8, 2267);
    			attr_dev(div7, "class", "stat-block");
    			add_location(div7, file$6, 67, 4, 2188);
    			attr_dev(span21, "class", "stat-label");
    			add_location(span21, file$6, 72, 8, 2375);
    			attr_dev(span22, "class", "stat-input");
    			add_location(span22, file$6, 73, 8, 2427);
    			attr_dev(div8, "class", "stat-block");
    			add_location(div8, file$6, 71, 4, 2342);
    			attr_dev(div9, "class", "step");
    			add_location(div9, file$6, 6, 0, 164);
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
    		init(this, options, instance$7, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Properties",
    			options,
    			id: create_fragment$8.name
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
        new Ability('Favorite Weapon',      'Botch is only a Fail with this one weapon.',   1, 3, 0, ""),
        new Ability('Hyper Immunity',       '+1 to resist Diseases.',                       3, 3, 0, ""),
        new Ability('Pack Mentality',       '+1 ATK at same target a Comrade ATKs.',        1, 3, 0, ""),
        new Ability('Quick Reload',         'Free Reload once per rnd.',                    1, 3, 0, ""),
        new Ability('Specialize*',          '+1 to a Skill Specialty.',                     1, 3, 0, ""),
        new Ability('Weapon Training*',     '+1 ATK for a specific weapon.',                1, 3, 0, ""),
        // 6 XP Abilities
        new Ability('Efficient Work*',      '[Time / 2] for a Skill (minimum 1 action).',   1, 6, 0, ""),
        new Ability('Fast Draw',            'Free item draw once per rnd.',                 1, 6, 0, ""),
        new Ability('Fleet Footed',         '+1 Speed.',                                    3, 6, 0, ""),
        new Ability('Multilingual*',        'Learn a different form of communication.',     9, 6, 0, ""),
        new Ability('Practice*',            '+1 to a Skill (up to the parent Trait).',      1, 6, 0, ""),
        // OPEN SLOT FOR NEW ABILITY
        // 9 XP Abilities
        new Ability('Danger Sense',         '+1 Reflex.',                                   1, 9, 0, ""),
        new Ability('Discipline',           'Ignore 1 Pain penalty.',                       3, 9, 0, ""),
        new Ability('Fortunate',            '+1 Luck.',                                     1, 9, 0, ""),
        new Ability('Free Running',         'Climb at [Speed] for 2AP.',                    1, 9, 0, ""),
        new Ability('Unorthodox*',          'Pick a new parent Trait for a Skill.',         1, 9, 0, ""),
        // OPEN SLOT FOR NEW ABILITY
        // 12 XP Abilities
        new Ability('Fencing',              'Free Block roll once per rnd.',                1, 12, 0, ""),
        new Ability('Side-step',            'Free Dodge roll once per rnd.',                1, 12, 0, ""),
        new Ability('Wrestling',            'Free Grab roll once per rnd.',                 1, 12, 0, ""),
        // 15 XP Abilities
        new Ability('Firm Grip',            'Use 2h weapons in 1h, up to Size 3.',          1, 15, 0, ""),
        new Ability('Hard Headed',          'Ignore Stun from Head DMG.',                   1, 15, 0, ""),
        new Ability('Powerful Strike*',     '+1 DMG for a specific Melee weapon.',          1, 15, 0, ""),
        // 18 XP Abilities
        new Ability('Assassin',             '+3 DMG to ATKs from Concealment.',             1, 18, 0, ""),
        new Ability('Vehicle Operation*',   'Proficiently operate a class of vehicle.',     1, 18, 0, ""),
        // 24 XP Abilities
        new Ability('Ambidextrous',         'Off-hand penalty is -1 instead of -3.',        1, 24, 0, ""),
        new Ability('Tough',                '+1 Health.',                                   3, 24, 0, ""),
        // 30 XP Abilities
        new Ability('Self Improvement*',    '+1 to a Trait (max 6).',                       3, 30, 0, ""),
        new Ability('Second Chance',        'Spend this Ability to avoid Death once.',      9, 30, 0, "")
    ];

    /* src/components/creator/Abilities.svelte generated by Svelte v3.15.0 */
    const file$7 = "src/components/creator/Abilities.svelte";

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
    			add_location(div, file$7, 32, 20, 1098);
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
    			add_location(div0, file$7, 35, 20, 1212);
    			attr_dev(div1, "class", "l-col svelte-maszxs");
    			add_location(div1, file$7, 36, 20, 1272);
    			attr_dev(div2, "class", "s-col svelte-maszxs");
    			add_location(div2, file$7, 37, 20, 1339);
    			attr_dev(div3, "class", "s-col svelte-maszxs");
    			add_location(div3, file$7, 38, 20, 1398);
    			attr_dev(input, "type", "number");
    			attr_dev(input, "class", "taken-number");
    			attr_dev(input, "min", "0");
    			attr_dev(input, "max", input_max_value = ctx.ability.max);
    			add_location(input, file$7, 40, 24, 1500);
    			attr_dev(div4, "class", "s-col svelte-maszxs");
    			add_location(div4, file$7, 39, 20, 1456);
    			attr_dev(div5, "class", "ability-row svelte-maszxs");
    			add_location(div5, file$7, 34, 16, 1166);

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

    function create_fragment$9(ctx) {
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

    			add_location(h2, file$7, 19, 8, 510);
    			attr_dev(div0, "class", "step-title");
    			add_location(div0, file$7, 18, 4, 477);
    			attr_dev(div1, "class", "m-col svelte-maszxs");
    			add_location(div1, file$7, 24, 16, 682);
    			attr_dev(div2, "class", "l-col svelte-maszxs");
    			add_location(div2, file$7, 25, 16, 728);
    			attr_dev(div3, "class", "s-col svelte-maszxs");
    			add_location(div3, file$7, 26, 16, 781);
    			attr_dev(div4, "class", "s-col svelte-maszxs");
    			add_location(div4, file$7, 27, 16, 826);
    			attr_dev(div5, "class", "s-col svelte-maszxs");
    			add_location(div5, file$7, 28, 16, 870);
    			attr_dev(div6, "class", "ability-row header-row separator svelte-maszxs");
    			add_location(div6, file$7, 23, 12, 619);
    			attr_dev(div7, "class", "abilities-table svelte-maszxs");
    			add_location(div7, file$7, 22, 8, 577);
    			attr_dev(div8, "class", "stat-block");
    			add_location(div8, file$7, 21, 4, 544);
    			attr_dev(div9, "class", "step");
    			add_location(div9, file$7, 17, 0, 454);
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
    		init(this, options, instance$8, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Abilities",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src/components/creator/Gear.svelte generated by Svelte v3.15.0 */

    function create_fragment$a(ctx) {
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
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class Gear extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Gear",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src/pages/Creator.svelte generated by Svelte v3.15.0 */
    const file$8 = "src/pages/Creator.svelte";

    function create_fragment$b(ctx) {
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
    			add_location(div, file$8, 22, 0, 817);
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
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let step = 0;
    	const options = [Traits, Description, Skills, Properties, Abilities, Gear];
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
    		init(this, options, instance$9, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Creator",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src/components/rules/Combat.svelte generated by Svelte v3.15.0 */

    const file$9 = "src/components/rules/Combat.svelte";

    // (13:16) {:else}
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
    		source: "(13:16) {:else}",
    		ctx
    	});

    	return block;
    }

    // (11:16) {#if visible}
    function create_if_block_1$1(ctx) {
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
    		id: create_if_block_1$1.name,
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
    		if (ctx.visible) return create_if_block_1$1;
    		return create_else_block$1;
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

    /* src/components/rules/Creation.svelte generated by Svelte v3.15.0 */

    const file$a = "src/components/rules/Creation.svelte";

    function create_fragment$d(ctx) {
    	let div102;
    	let h2;
    	let t1;
    	let button0;
    	let t3;
    	let div101;
    	let button1;
    	let t5;
    	let div0;
    	let p0;
    	let t7;
    	let button2;
    	let t9;
    	let div1;
    	let p1;
    	let t11;
    	let ul0;
    	let li0;
    	let t13;
    	let li1;
    	let t15;
    	let li2;
    	let t17;
    	let li3;
    	let t19;
    	let button3;
    	let t21;
    	let div2;
    	let p2;
    	let t23;
    	let ul1;
    	let li4;
    	let t25;
    	let li5;
    	let t27;
    	let li6;
    	let t29;
    	let li7;
    	let t31;
    	let button4;
    	let t33;
    	let div3;
    	let p3;
    	let t35;
    	let ul4;
    	let li8;
    	let t37;
    	let li9;
    	let t39;
    	let li10;
    	let t41;
    	let li11;
    	let t43;
    	let li12;
    	let t45;
    	let li13;
    	let t47;
    	let li14;
    	let t49;
    	let li15;
    	let t51;
    	let li16;
    	let t53;
    	let li20;
    	let ul2;
    	let li17;
    	let t55;
    	let li18;
    	let t57;
    	let li19;
    	let t59;
    	let li21;
    	let t61;
    	let li22;
    	let t63;
    	let li25;
    	let ul3;
    	let li23;
    	let t65;
    	let li24;
    	let t67;
    	let button5;
    	let t69;
    	let div8;
    	let p4;
    	let t71;
    	let button6;
    	let t73;
    	let div4;
    	let button7;
    	let t75;
    	let p5;
    	let t76;
    	let button8;
    	let t78;
    	let div5;
    	let button9;
    	let t80;
    	let p6;
    	let t81;
    	let button10;
    	let t83;
    	let div6;
    	let button11;
    	let t85;
    	let p7;
    	let t86;
    	let button12;
    	let t88;
    	let div7;
    	let p8;
    	let t90;
    	let p9;
    	let t92;
    	let button13;
    	let t94;
    	let p10;
    	let t95;
    	let button14;
    	let t97;
    	let div9;
    	let p11;
    	let t99;
    	let button15;
    	let t101;
    	let div100;
    	let p12;
    	let t103;
    	let button16;
    	let t105;
    	let div16;
    	let p13;
    	let t107;
    	let button17;
    	let t109;
    	let div10;
    	let p14;
    	let t111;
    	let p15;
    	let t113;
    	let button18;
    	let t115;
    	let div11;
    	let p16;
    	let t117;
    	let p17;
    	let t119;
    	let button19;
    	let t121;
    	let div12;
    	let p18;
    	let t123;
    	let p19;
    	let t125;
    	let button20;
    	let t127;
    	let div13;
    	let p20;
    	let t129;
    	let p21;
    	let t131;
    	let button21;
    	let t133;
    	let div14;
    	let p22;
    	let t135;
    	let p23;
    	let t137;
    	let button22;
    	let t139;
    	let div15;
    	let p24;
    	let t141;
    	let p25;
    	let t143;
    	let button23;
    	let t145;
    	let div23;
    	let p26;
    	let t147;
    	let button24;
    	let t149;
    	let div17;
    	let p27;
    	let t151;
    	let p28;
    	let t153;
    	let button25;
    	let t155;
    	let div18;
    	let p29;
    	let t157;
    	let p30;
    	let t159;
    	let button26;
    	let t161;
    	let div19;
    	let p31;
    	let t163;
    	let p32;
    	let t165;
    	let button27;
    	let t167;
    	let div20;
    	let p33;
    	let t169;
    	let p34;
    	let t171;
    	let button28;
    	let t173;
    	let div21;
    	let p35;
    	let t175;
    	let p36;
    	let t177;
    	let button29;
    	let t179;
    	let div22;
    	let p37;
    	let t181;
    	let p38;
    	let t183;
    	let button30;
    	let t185;
    	let div60;
    	let p39;
    	let t187;
    	let button31;
    	let t189;
    	let div24;
    	let p40;
    	let t191;
    	let button32;
    	let t193;
    	let div25;
    	let p41;
    	let t195;
    	let button33;
    	let t197;
    	let div26;
    	let p42;
    	let t199;
    	let button34;
    	let t201;
    	let div27;
    	let p43;
    	let t203;
    	let button35;
    	let t205;
    	let div28;
    	let p44;
    	let t207;
    	let button36;
    	let t209;
    	let div29;
    	let p45;
    	let t211;
    	let button37;
    	let t213;
    	let div30;
    	let p46;
    	let t215;
    	let button38;
    	let t217;
    	let div31;
    	let p47;
    	let t219;
    	let button39;
    	let t221;
    	let div32;
    	let p48;
    	let t223;
    	let button40;
    	let t225;
    	let div33;
    	let p49;
    	let t227;
    	let button41;
    	let t229;
    	let div34;
    	let p50;
    	let t231;
    	let button42;
    	let t233;
    	let div35;
    	let p51;
    	let t235;
    	let button43;
    	let t237;
    	let div36;
    	let p52;
    	let t239;
    	let button44;
    	let t241;
    	let div37;
    	let p53;
    	let t243;
    	let button45;
    	let t245;
    	let div38;
    	let p54;
    	let t247;
    	let button46;
    	let t249;
    	let div39;
    	let p55;
    	let t251;
    	let button47;
    	let t253;
    	let div40;
    	let p56;
    	let t255;
    	let button48;
    	let t257;
    	let div41;
    	let p57;
    	let t259;
    	let button49;
    	let t261;
    	let div42;
    	let p58;
    	let t263;
    	let button50;
    	let t265;
    	let div43;
    	let p59;
    	let t267;
    	let button51;
    	let t269;
    	let div44;
    	let p60;
    	let t271;
    	let button52;
    	let t273;
    	let div45;
    	let p61;
    	let t275;
    	let button53;
    	let t277;
    	let div46;
    	let p62;
    	let t279;
    	let button54;
    	let t281;
    	let div47;
    	let p63;
    	let t283;
    	let button55;
    	let t285;
    	let div48;
    	let p64;
    	let t287;
    	let button56;
    	let t289;
    	let div49;
    	let p65;
    	let t291;
    	let button57;
    	let t293;
    	let div50;
    	let p66;
    	let t295;
    	let button58;
    	let t297;
    	let div51;
    	let p67;
    	let t299;
    	let button59;
    	let t301;
    	let div52;
    	let p68;
    	let t303;
    	let button60;
    	let t305;
    	let div53;
    	let p69;
    	let t307;
    	let button61;
    	let t309;
    	let div54;
    	let p70;
    	let t311;
    	let button62;
    	let t313;
    	let div55;
    	let p71;
    	let t315;
    	let button63;
    	let t317;
    	let div56;
    	let p72;
    	let t319;
    	let button64;
    	let t321;
    	let div57;
    	let p73;
    	let t323;
    	let button65;
    	let t325;
    	let div58;
    	let p74;
    	let t327;
    	let button66;
    	let t329;
    	let div59;
    	let p75;
    	let t331;
    	let button67;
    	let t333;
    	let div61;
    	let p76;
    	let t335;
    	let ol0;
    	let li26;
    	let t337;
    	let li27;
    	let t339;
    	let li28;
    	let t341;
    	let li29;
    	let t343;
    	let li30;
    	let t345;
    	let li31;
    	let t347;
    	let li32;
    	let t349;
    	let li33;
    	let t351;
    	let li34;
    	let t353;
    	let li35;
    	let t355;
    	let li36;
    	let t357;
    	let li37;
    	let t359;
    	let li38;
    	let t361;
    	let li39;
    	let t363;
    	let li40;
    	let t365;
    	let li41;
    	let t367;
    	let li42;
    	let t369;
    	let li43;
    	let t371;
    	let li44;
    	let t373;
    	let li45;
    	let t375;
    	let li46;
    	let t377;
    	let li47;
    	let t379;
    	let li48;
    	let t381;
    	let li49;
    	let t383;
    	let li50;
    	let t385;
    	let li51;
    	let t387;
    	let li52;
    	let t389;
    	let li53;
    	let t391;
    	let li54;
    	let t393;
    	let li55;
    	let t395;
    	let li56;
    	let t397;
    	let li57;
    	let t399;
    	let li58;
    	let t401;
    	let li59;
    	let t403;
    	let li60;
    	let t405;
    	let li61;
    	let t407;
    	let button68;
    	let t409;
    	let div98;
    	let p77;
    	let t411;
    	let button69;
    	let t413;
    	let div62;
    	let p78;
    	let t415;
    	let p79;
    	let t417;
    	let button70;
    	let t419;
    	let div63;
    	let p80;
    	let t421;
    	let p81;
    	let t423;
    	let button71;
    	let t425;
    	let div64;
    	let p82;
    	let t427;
    	let p83;
    	let t429;
    	let button72;
    	let t431;
    	let div65;
    	let p84;
    	let t433;
    	let p85;
    	let t435;
    	let button73;
    	let t437;
    	let div66;
    	let p86;
    	let t439;
    	let p87;
    	let t441;
    	let button74;
    	let t443;
    	let div67;
    	let p88;
    	let t445;
    	let p89;
    	let t447;
    	let button75;
    	let t449;
    	let div68;
    	let p90;
    	let t451;
    	let p91;
    	let t453;
    	let button76;
    	let t455;
    	let div69;
    	let p92;
    	let t457;
    	let p93;
    	let t459;
    	let button77;
    	let t461;
    	let div70;
    	let p94;
    	let t463;
    	let p95;
    	let t465;
    	let button78;
    	let t467;
    	let div71;
    	let p96;
    	let t469;
    	let p97;
    	let t471;
    	let button79;
    	let t473;
    	let div72;
    	let p98;
    	let t475;
    	let p99;
    	let t477;
    	let button80;
    	let t479;
    	let div73;
    	let p100;
    	let t481;
    	let p101;
    	let t483;
    	let button81;
    	let t485;
    	let div74;
    	let p102;
    	let t487;
    	let p103;
    	let t489;
    	let button82;
    	let t491;
    	let div75;
    	let p104;
    	let t493;
    	let p105;
    	let t495;
    	let button83;
    	let t497;
    	let div76;
    	let p106;
    	let t499;
    	let p107;
    	let t501;
    	let button84;
    	let t503;
    	let div77;
    	let p108;
    	let t505;
    	let p109;
    	let t507;
    	let button85;
    	let t509;
    	let div78;
    	let p110;
    	let t511;
    	let p111;
    	let t513;
    	let button86;
    	let t515;
    	let div79;
    	let p112;
    	let t517;
    	let p113;
    	let t519;
    	let button87;
    	let t521;
    	let div80;
    	let p114;
    	let t523;
    	let p115;
    	let t525;
    	let button88;
    	let t527;
    	let div81;
    	let p116;
    	let t529;
    	let p117;
    	let t531;
    	let button89;
    	let t533;
    	let div82;
    	let p118;
    	let t535;
    	let p119;
    	let t537;
    	let button90;
    	let t539;
    	let div83;
    	let p120;
    	let t541;
    	let p121;
    	let t543;
    	let button91;
    	let t545;
    	let div84;
    	let p122;
    	let t547;
    	let p123;
    	let t549;
    	let button92;
    	let t551;
    	let div85;
    	let p124;
    	let t553;
    	let p125;
    	let t555;
    	let button93;
    	let t557;
    	let div86;
    	let p126;
    	let t559;
    	let p127;
    	let t561;
    	let button94;
    	let t563;
    	let div87;
    	let p128;
    	let t565;
    	let p129;
    	let t567;
    	let button95;
    	let t569;
    	let div88;
    	let p130;
    	let t571;
    	let p131;
    	let t573;
    	let button96;
    	let t575;
    	let div89;
    	let p132;
    	let t577;
    	let p133;
    	let t579;
    	let button97;
    	let t581;
    	let div90;
    	let p134;
    	let t583;
    	let p135;
    	let t585;
    	let button98;
    	let t587;
    	let div91;
    	let p136;
    	let t589;
    	let p137;
    	let t591;
    	let button99;
    	let t593;
    	let div92;
    	let p138;
    	let t595;
    	let p139;
    	let t597;
    	let button100;
    	let t599;
    	let div93;
    	let p140;
    	let t601;
    	let p141;
    	let t603;
    	let button101;
    	let t605;
    	let div94;
    	let p142;
    	let t607;
    	let p143;
    	let t609;
    	let button102;
    	let t611;
    	let div95;
    	let p144;
    	let t613;
    	let p145;
    	let t615;
    	let button103;
    	let t617;
    	let div96;
    	let p146;
    	let t619;
    	let p147;
    	let t621;
    	let button104;
    	let t623;
    	let div97;
    	let p148;
    	let t625;
    	let p149;
    	let t627;
    	let button105;
    	let t629;
    	let div99;
    	let p150;
    	let t631;
    	let ol1;
    	let li62;
    	let t633;
    	let li63;
    	let t635;
    	let li64;
    	let t637;
    	let li65;
    	let t639;
    	let li66;
    	let t641;
    	let li67;
    	let t643;
    	let li68;
    	let t645;
    	let li69;
    	let t647;
    	let li70;
    	let t649;
    	let li71;
    	let t651;
    	let li72;
    	let t653;
    	let li73;
    	let t655;
    	let li74;
    	let t657;
    	let li75;
    	let t659;
    	let li76;
    	let t661;
    	let li77;
    	let t663;
    	let li78;
    	let t665;
    	let li79;

    	const block = {
    		c: function create() {
    			div102 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Character Creation";
    			t1 = space();
    			button0 = element("button");
    			button0.textContent = "CHARACTER CREATION";
    			t3 = space();
    			div101 = element("div");
    			button1 = element("button");
    			button1.textContent = "STEP 1: DESCRIPTION";
    			t5 = space();
    			div0 = element("div");
    			p0 = element("p");
    			p0.textContent = "Decide on your name, measurements, appearance, gender and age.";
    			t7 = space();
    			button2 = element("button");
    			button2.textContent = "STEP 2: TRAITS AND INSTINCTS";
    			t9 = space();
    			div1 = element("div");
    			p1 = element("p");
    			p1.textContent = "There are four Traits: Agility, Brains, Constitution, and Demeanor. Traits range from 1 to 6. You have either 12 Trait points to assign or d6 per Trait (ask your GN). Instincts equal their parent Traits.";
    			t11 = space();
    			ul0 = element("ul");
    			li0 = element("li");
    			li0.textContent = "Stealth = Agility";
    			t13 = space();
    			li1 = element("li");
    			li1.textContent = "Perception = Brains";
    			t15 = space();
    			li2 = element("li");
    			li2.textContent = "Athletics = Constitution";
    			t17 = space();
    			li3 = element("li");
    			li3.textContent = "Socialize = Demeanor";
    			t19 = space();
    			button3 = element("button");
    			button3.textContent = "STEP 3: SKILLS";
    			t21 = space();
    			div2 = element("div");
    			p2 = element("p");
    			p2.textContent = "You get [Brains x6] Skill points to divide among your Skills. Maximum Skill rating is equal to a Skill's parent Trait.";
    			t23 = space();
    			ul1 = element("ul");
    			li4 = element("li");
    			li4.textContent = "Agility Skills: Acrobatics, Ranged, Larceny";
    			t25 = space();
    			li5 = element("li");
    			li5.textContent = "Brains Skills: Medicine, Science, Survival";
    			t27 = space();
    			li6 = element("li");
    			li6.textContent = "Constitution Skills: Build, Drive, Melee";
    			t29 = space();
    			li7 = element("li");
    			li7.textContent = "Demeanor Skills: Entertain, Leadership, Tame";
    			t31 = space();
    			button4 = element("button");
    			button4.textContent = "STEP 4: PROPERTIES";
    			t33 = space();
    			div3 = element("div");
    			p3 = element("p");
    			p3.textContent = "Calculate your Properties. Always round down.";
    			t35 = space();
    			ul4 = element("ul");
    			li8 = element("li");
    			li8.textContent = "Psyche = [Demeanor] dots away from Crazy";
    			t37 = space();
    			li9 = element("li");
    			li9.textContent = "Speed = [Agility + Constitution] yds";
    			t39 = space();
    			li10 = element("li");
    			li10.textContent = "Fast = [Agility] actions";
    			t41 = space();
    			li11 = element("li");
    			li11.textContent = "XP (Experience) = [Brains x6] Unspent and Total";
    			t43 = space();
    			li12 = element("li");
    			li12.textContent = "DMG Mod = [(Constitution /3) –1] to Melee and Throw DMG";
    			t45 = space();
    			li13 = element("li");
    			li13.textContent = "Carry = current Gear Size left / max [Constitution x6] right";
    			t47 = space();
    			li14 = element("li");
    			li14.textContent = "Luck = [Demeanor] current left / max right";
    			t49 = space();
    			li15 = element("li");
    			li15.textContent = "Threshold = [Constitution + Demeanor]";
    			t51 = space();
    			li16 = element("li");
    			li16.textContent = "Defenses";
    			t53 = space();
    			li20 = element("li");
    			ul2 = element("ul");
    			li17 = element("li");
    			li17.textContent = "Block = Melee(Block)";
    			t55 = space();
    			li18 = element("li");
    			li18.textContent = "Dodge = Acrobatics(Dodge)";
    			t57 = space();
    			li19 = element("li");
    			li19.textContent = "Reflex = Perception";
    			t59 = space();
    			li21 = element("li");
    			li21.textContent = "Pain = 0";
    			t61 = space();
    			li22 = element("li");
    			li22.textContent = "Health";
    			t63 = space();
    			li25 = element("li");
    			ul3 = element("ul");
    			li23 = element("li");
    			li23.textContent = "Head, Arms, Legs = [Constitution] current left / max right";
    			t65 = space();
    			li24 = element("li");
    			li24.textContent = "Torso = [Constitution x2] current left / max right";
    			t67 = space();
    			button5 = element("button");
    			button5.textContent = "STEP 5: GEAR";
    			t69 = space();
    			div8 = element("div");
    			p4 = element("p");
    			p4.textContent = "You start with plain clothes, a Backpack, Food, and Water. Roll d66  on the tables below for Gear: 1 piece of ARMOR, 1 MELEE WEAPON, 1 RANGED WEAPON and d6 common AMMO (FMJ, Birdshot, or Target Arrow) for that weapon. Then roll d666 on the MASTER GEAR LIST.";
    			t71 = space();
    			button6 = element("button");
    			button6.textContent = "STARTING ARMOR";
    			t73 = space();
    			div4 = element("div");
    			button7 = element("button");
    			button7.textContent = "ROLL ARMOR";
    			t75 = space();
    			p5 = element("p");
    			t76 = space();
    			button8 = element("button");
    			button8.textContent = "STARTING MELEE WEAPON";
    			t78 = space();
    			div5 = element("div");
    			button9 = element("button");
    			button9.textContent = "ROLL MELEE WEAPON";
    			t80 = space();
    			p6 = element("p");
    			t81 = space();
    			button10 = element("button");
    			button10.textContent = "STARTING RANGED WEAPON";
    			t83 = space();
    			div6 = element("div");
    			button11 = element("button");
    			button11.textContent = "ROLL RANGED WEAPON";
    			t85 = space();
    			p7 = element("p");
    			t86 = space();
    			button12 = element("button");
    			button12.textContent = "STARTING GEAR";
    			t88 = space();
    			div7 = element("div");
    			p8 = element("p");
    			p8.textContent = "MGL Rolls: Roll once per Luck to get a random MGL item. Vehicles come with d6-1gal Fuel. Guns are empty. Re-roll repeats.";
    			t90 = space();
    			p9 = element("p");
    			p9.textContent = "Spend XP: For 1XP you can get: 1 extra MGL roll, or 1 Resource (Water/Food/Chemical/Part/Fuel), or 1 round of common AMMO.";
    			t92 = space();
    			button13 = element("button");
    			button13.textContent = "ROLL MGL";
    			t94 = space();
    			p10 = element("p");
    			t95 = space();
    			button14 = element("button");
    			button14.textContent = "STEP 6: ABILITIES";
    			t97 = space();
    			div9 = element("div");
    			p11 = element("p");
    			p11.textContent = "You may buy Abilities with XP (Brains x6).";
    			t99 = space();
    			button15 = element("button");
    			button15.textContent = "CHARACTER OPTIONS";
    			t101 = space();
    			div100 = element("div");
    			p12 = element("p");
    			p12.textContent = "These are optional rules that the GN may ignore or include in the Character creation process. The GN may have Players roll randomly or just select an option. Players should record any of these details under Notes on the back of their Character Sheets.";
    			t103 = space();
    			button16 = element("button");
    			button16.textContent = "EXPERIENCED CHARACTERS:";
    			t105 = space();
    			div16 = element("div");
    			p13 = element("p");
    			p13.textContent = "Some games may take place well after The End, when nearly everyone who is left alive is a hardened survivor. To make a highly proficient Character, roll randomly or select an appropriate Experience Level and use those Starting XP and MGL Rolls values in place of the standard starting values.";
    			t107 = space();
    			button17 = element("button");
    			button17.textContent = "1. CAPABLE";
    			t109 = space();
    			div10 = element("div");
    			p14 = element("p");
    			p14.textContent = "Starting XP: Brains x6";
    			t111 = space();
    			p15 = element("p");
    			p15.textContent = "MGL Rolls: Luck x1";
    			t113 = space();
    			button18 = element("button");
    			button18.textContent = "2. ADVANCED";
    			t115 = space();
    			div11 = element("div");
    			p16 = element("p");
    			p16.textContent = "Starting XP: Brains x12";
    			t117 = space();
    			p17 = element("p");
    			p17.textContent = "MGL Rolls: Luck x3";
    			t119 = space();
    			button19 = element("button");
    			button19.textContent = "3. SEASONED";
    			t121 = space();
    			div12 = element("div");
    			p18 = element("p");
    			p18.textContent = "Starting XP: Brains x18";
    			t123 = space();
    			p19 = element("p");
    			p19.textContent = "MGL Rolls: Luck x6";
    			t125 = space();
    			button20 = element("button");
    			button20.textContent = "4. VETERAN";
    			t127 = space();
    			div13 = element("div");
    			p20 = element("p");
    			p20.textContent = "Starting XP: Brains x24";
    			t129 = space();
    			p21 = element("p");
    			p21.textContent = "MGL Rolls: Luck x9";
    			t131 = space();
    			button21 = element("button");
    			button21.textContent = "5. ELITE";
    			t133 = space();
    			div14 = element("div");
    			p22 = element("p");
    			p22.textContent = "Starting XP: Brains x30";
    			t135 = space();
    			p23 = element("p");
    			p23.textContent = "MGL Rolls: Luck x12";
    			t137 = space();
    			button22 = element("button");
    			button22.textContent = "6. MASTER";
    			t139 = space();
    			div15 = element("div");
    			p24 = element("p");
    			p24.textContent = "Starting XP: Brains x36";
    			t141 = space();
    			p25 = element("p");
    			p25.textContent = "MGL Rolls: Luck x15";
    			t143 = space();
    			button23 = element("button");
    			button23.textContent = "AGE:";
    			t145 = space();
    			div23 = element("div");
    			p26 = element("p");
    			p26.textContent = "Character creation rules assume a starting age from 18 to 50. For older or younger Characters, consult the table below before assigning any Trait points to a very young or very old Character:";
    			t147 = space();
    			button24 = element("button");
    			button24.textContent = "8-13";
    			t149 = space();
    			div17 = element("div");
    			p27 = element("p");
    			p27.textContent = "Trait Points: 4";
    			t151 = space();
    			p28 = element("p");
    			p28.textContent = "Max Trait Score: 1";
    			t153 = space();
    			button25 = element("button");
    			button25.textContent = "14-17";
    			t155 = space();
    			div18 = element("div");
    			p29 = element("p");
    			p29.textContent = "Trait Points: 8";
    			t157 = space();
    			p30 = element("p");
    			p30.textContent = "Max Trait Score: 8";
    			t159 = space();
    			button26 = element("button");
    			button26.textContent = "18-50";
    			t161 = space();
    			div19 = element("div");
    			p31 = element("p");
    			p31.textContent = "Trait Points: 12";
    			t163 = space();
    			p32 = element("p");
    			p32.textContent = "Max Trait Score: 6";
    			t165 = space();
    			button27 = element("button");
    			button27.textContent = "51-70";
    			t167 = space();
    			div20 = element("div");
    			p33 = element("p");
    			p33.textContent = "Trait Points: 11";
    			t169 = space();
    			p34 = element("p");
    			p34.textContent = "Max Trait Score: 5";
    			t171 = space();
    			button28 = element("button");
    			button28.textContent = "71-80";
    			t173 = space();
    			div21 = element("div");
    			p35 = element("p");
    			p35.textContent = "Trait Points: 9";
    			t175 = space();
    			p36 = element("p");
    			p36.textContent = "Max Trait Score: 4";
    			t177 = space();
    			button29 = element("button");
    			button29.textContent = "80+";
    			t179 = space();
    			div22 = element("div");
    			p37 = element("p");
    			p37.textContent = "Trait Points: 6";
    			t181 = space();
    			p38 = element("p");
    			p38.textContent = "Max Trait Score: 2";
    			t183 = space();
    			button30 = element("button");
    			button30.textContent = "FLAW:";
    			t185 = space();
    			div60 = element("div");
    			p39 = element("p");
    			p39.textContent = "Serious problems for Characters. Roll a d6. If the result is a 1, roll a random Flaw. +1XP each session where you overcome a Flaw. Flaws marked * are permanent. Others can be removed for 36XP.";
    			t187 = space();
    			button31 = element("button");
    			button31.textContent = "ADDICTION";
    			t189 = space();
    			div24 = element("div");
    			p40 = element("p");
    			p40.textContent = "Cumulative 1 Pain per day without your substance.";
    			t191 = space();
    			button32 = element("button");
    			button32.textContent = "ALLERGY";
    			t193 = space();
    			div25 = element("div");
    			p41 = element("p");
    			p41.textContent = "d6 Pain while exposed to a certain irritant.";
    			t195 = space();
    			button33 = element("button");
    			button33.textContent = "AMNESIA";
    			t197 = space();
    			div26 = element("div");
    			p42 = element("p");
    			p42.textContent = "No memory prior to a few days ago. Half starting XP.";
    			t199 = space();
    			button34 = element("button");
    			button34.textContent = "AMPUTEE";
    			t201 = space();
    			div27 = element("div");
    			p43 = element("p");
    			p43.textContent = "Cannot use 2h items, or Speed /2 and require a Crutch.";
    			t203 = space();
    			button35 = element("button");
    			button35.textContent = "ANEMIA*";
    			t205 = space();
    			div28 = element("div");
    			p44 = element("p");
    			p44.textContent = "-3 Constitution or Medicine rolls to stop Bleeding.";
    			t207 = space();
    			button36 = element("button");
    			button36.textContent = "ANXIETY";
    			t209 = space();
    			div29 = element("div");
    			p45 = element("p");
    			p45.textContent = "Demeanor 9# or be Stunned d6rnds in stressful ENCOUNTERS.";
    			t211 = space();
    			button37 = element("button");
    			button37.textContent = "ASTHMA*";
    			t213 = space();
    			div30 = element("div");
    			p46 = element("p");
    			p46.textContent = "When you Botch Athletics, Suffocation for d6mins.";
    			t215 = space();
    			button38 = element("button");
    			button38.textContent = "BAD BACK*";
    			t217 = space();
    			div31 = element("div");
    			p47 = element("p");
    			p47.textContent = "Your Carry is halved. -3 Constitution rolls to lift.";
    			t219 = space();
    			button39 = element("button");
    			button39.textContent = "BLIND*";
    			t221 = space();
    			div32 = element("div");
    			p48 = element("p");
    			p48.textContent = "Fail Perception(See). -6 all sight-dependent rolls.";
    			t223 = space();
    			button40 = element("button");
    			button40.textContent = "CANCER";
    			t225 = space();
    			div33 = element("div");
    			p49 = element("p");
    			p49.textContent = "Roll d6 every month. -1 Constitution on a Botch.";
    			t227 = space();
    			button41 = element("button");
    			button41.textContent = "COWARD";
    			t229 = space();
    			div34 = element("div");
    			p50 = element("p");
    			p50.textContent = "Demeanor 9# to intentionally risk danger to yourself.";
    			t231 = space();
    			button42 = element("button");
    			button42.textContent = "CRIPPLED*";
    			t233 = space();
    			div35 = element("div");
    			p51 = element("p");
    			p51.textContent = "Your Legs do not work. You need a wheelchair to move.";
    			t235 = space();
    			button43 = element("button");
    			button43.textContent = "CRUEL";
    			t237 = space();
    			div36 = element("div");
    			p52 = element("p");
    			p52.textContent = "You will never show mercy to enemies. You like killing.";
    			t239 = space();
    			button44 = element("button");
    			button44.textContent = "DEAF*";
    			t241 = space();
    			div37 = element("div");
    			p53 = element("p");
    			p53.textContent = "Fail Perception(Hear) rolls.";
    			t243 = space();
    			button45 = element("button");
    			button45.textContent = "DEBT";
    			t245 = space();
    			div38 = element("div");
    			p54 = element("p");
    			p54.textContent = "You owe a lot to someone, and repayment is overdue.";
    			t247 = space();
    			button46 = element("button");
    			button46.textContent = "DEFORMED*";
    			t249 = space();
    			div39 = element("div");
    			p55 = element("p");
    			p55.textContent = "-3 Socialize rolls when your Deformity is visible.";
    			t251 = space();
    			button47 = element("button");
    			button47.textContent = "DIABETES";
    			t253 = space();
    			div40 = element("div");
    			p56 = element("p");
    			p56.textContent = "Die from Starvation (diabetic shock) in half the time.";
    			t255 = space();
    			button48 = element("button");
    			button48.textContent = "DYSLEXIA*";
    			t257 = space();
    			div41 = element("div");
    			p57 = element("p");
    			p57.textContent = "You get no bonuses from reading DOCUMENTS.";
    			t259 = space();
    			button49 = element("button");
    			button49.textContent = "FORGETFUL";
    			t261 = space();
    			div42 = element("div");
    			p58 = element("p");
    			p58.textContent = "-3 Brains rolls to remember something in detail.";
    			t263 = space();
    			button50 = element("button");
    			button50.textContent = "GAMBLER";
    			t265 = space();
    			div43 = element("div");
    			p59 = element("p");
    			p59.textContent = "Demeanor 9# to resist a wager, regardless of odds.";
    			t267 = space();
    			button51 = element("button");
    			button51.textContent = "KLEPTOMANIA";
    			t269 = space();
    			div44 = element("div");
    			p60 = element("p");
    			p60.textContent = "Demeanor 9# to resist stealing at any opportunity.";
    			t271 = space();
    			button52 = element("button");
    			button52.textContent = "LAZY";
    			t273 = space();
    			div45 = element("div");
    			p61 = element("p");
    			p61.textContent = "Demeanor 9# to wake up before you’ve had 8hrs of sleep.";
    			t275 = space();
    			button53 = element("button");
    			button53.textContent = "MEEK";
    			t277 = space();
    			div46 = element("div");
    			p62 = element("p");
    			p62.textContent = "-3 Leadership rolls. -3 vs Leadership(Taunt).";
    			t279 = space();
    			button54 = element("button");
    			button54.textContent = "MUTE*";
    			t281 = space();
    			div47 = element("div");
    			p63 = element("p");
    			p63.textContent = "You are unable to communicate verbally.";
    			t283 = space();
    			button55 = element("button");
    			button55.textContent = "MYOPIA*";
    			t285 = space();
    			div48 = element("div");
    			p64 = element("p");
    			p64.textContent = "-3 Visibility penalty beyond 3yds without glasses.";
    			t287 = space();
    			button56 = element("button");
    			button56.textContent = "NAIVE";
    			t289 = space();
    			div49 = element("div");
    			p65 = element("p");
    			p65.textContent = "-3 Perception vs Entertain(Lie).";
    			t291 = space();
    			button57 = element("button");
    			button57.textContent = "NIGHTMARES";
    			t293 = space();
    			div50 = element("div");
    			p66 = element("p");
    			p66.textContent = "Roll d6 each night. On 1, no sleep and wake screaming.";
    			t295 = space();
    			button58 = element("button");
    			button58.textContent = "NOISY";
    			t297 = space();
    			div51 = element("div");
    			p67 = element("p");
    			p67.textContent = "-3 Stealth rolls.";
    			t299 = space();
    			button59 = element("button");
    			button59.textContent = "OBESE";
    			t301 = space();
    			div52 = element("div");
    			p68 = element("p");
    			p68.textContent = "-3 Athletics rolls. You are significantly overweight.";
    			t303 = space();
    			button60 = element("button");
    			button60.textContent = "PACIFIST";
    			t305 = space();
    			div53 = element("div");
    			p69 = element("p");
    			p69.textContent = "You refuse to kill people for any reason.";
    			t307 = space();
    			button61 = element("button");
    			button61.textContent = "PARANOIA";
    			t309 = space();
    			div54 = element("div");
    			p70 = element("p");
    			p70.textContent = "You cannot have Comrades.";
    			t311 = space();
    			button62 = element("button");
    			button62.textContent = "PHOBIA";
    			t313 = space();
    			div55 = element("div");
    			p71 = element("p");
    			p71.textContent = "Demeanor 9# to not be paralyzed with fear of something.";
    			t315 = space();
    			button63 = element("button");
    			button63.textContent = "RACIST";
    			t317 = space();
    			div56 = element("div");
    			p72 = element("p");
    			p72.textContent = "-3 Socialize rolls with anyone of different Skin color.";
    			t319 = space();
    			button64 = element("button");
    			button64.textContent = "SEXIST";
    			t321 = space();
    			div57 = element("div");
    			p73 = element("p");
    			p73.textContent = "-3 Socialize rolls with anyone of different Gender.";
    			t323 = space();
    			button65 = element("button");
    			button65.textContent = "SPEECH IMPEDIMENT";
    			t325 = space();
    			div58 = element("div");
    			p74 = element("p");
    			p74.textContent = "-1 Socialize and Leadership rolls using speech.";
    			t327 = space();
    			button66 = element("button");
    			button66.textContent = "SUPERSTITIOUS";
    			t329 = space();
    			div59 = element("div");
    			p75 = element("p");
    			p75.textContent = "-3 Science. You believe in supernatural forces.";
    			t331 = space();
    			button67 = element("button");
    			button67.textContent = "HISTORY:";
    			t333 = space();
    			div61 = element("div");
    			p76 = element("p");
    			p76.textContent = "These are idea seeds for some formative factors in a Character's background that influence their personality and may shape their future goals. Work with the GN to integrate your Character’s History into the overall story of the game.";
    			t335 = space();
    			ol0 = element("ol");
    			li26 = element("li");
    			li26.textContent = "Assassinated a leader";
    			t337 = space();
    			li27 = element("li");
    			li27.textContent = "Betrayed by friend(s)";
    			t339 = space();
    			li28 = element("li");
    			li28.textContent = "Bounty for your capture";
    			t341 = space();
    			li29 = element("li");
    			li29.textContent = "Carrying stolen goods";
    			t343 = space();
    			li30 = element("li");
    			li30.textContent = "Committed an atrocity";
    			t345 = space();
    			li31 = element("li");
    			li31.textContent = "Death mark on your head";
    			t347 = space();
    			li32 = element("li");
    			li32.textContent = "Former Bandit";
    			t349 = space();
    			li33 = element("li");
    			li33.textContent = "Former Cannibal";
    			t351 = space();
    			li34 = element("li");
    			li34.textContent = "Former Cultist";
    			t353 = space();
    			li35 = element("li");
    			li35.textContent = "Former Guerrilla";
    			t355 = space();
    			li36 = element("li");
    			li36.textContent = "Former Hooker";
    			t357 = space();
    			li37 = element("li");
    			li37.textContent = "Former Junky";
    			t359 = space();
    			li38 = element("li");
    			li38.textContent = "Former Mercenary";
    			t361 = space();
    			li39 = element("li");
    			li39.textContent = "Former Pirate";
    			t363 = space();
    			li40 = element("li");
    			li40.textContent = "Former Preacher";
    			t365 = space();
    			li41 = element("li");
    			li41.textContent = "Former Raider";
    			t367 = space();
    			li42 = element("li");
    			li42.textContent = "Former Slave";
    			t369 = space();
    			li43 = element("li");
    			li43.textContent = "Former Wrangler";
    			t371 = space();
    			li44 = element("li");
    			li44.textContent = "Friend was kidnapped";
    			t373 = space();
    			li45 = element("li");
    			li45.textContent = "Guarding a big secret";
    			t375 = space();
    			li46 = element("li");
    			li46.textContent = "Had a wise mentor";
    			t377 = space();
    			li47 = element("li");
    			li47.textContent = "Hatred for one Faction";
    			t379 = space();
    			li48 = element("li");
    			li48.textContent = "Hunting a monster";
    			t381 = space();
    			li49 = element("li");
    			li49.textContent = "Left your family";
    			t383 = space();
    			li50 = element("li");
    			li50.textContent = "Looking for lost lover";
    			t385 = space();
    			li51 = element("li");
    			li51.textContent = "Mentoring a protégé";
    			t387 = space();
    			li52 = element("li");
    			li52.textContent = "Murdered an innocent";
    			t389 = space();
    			li53 = element("li");
    			li53.textContent = "Near-death experience";
    			t391 = space();
    			li54 = element("li");
    			li54.textContent = "Outcast from Settlement";
    			t393 = space();
    			li55 = element("li");
    			li55.textContent = "Parent, child d6yrs old";
    			t395 = space();
    			li56 = element("li");
    			li56.textContent = "Recovered from plague";
    			t397 = space();
    			li57 = element("li");
    			li57.textContent = "Saved by a hero";
    			t399 = space();
    			li58 = element("li");
    			li58.textContent = "Still seeking revenge";
    			t401 = space();
    			li59 = element("li");
    			li59.textContent = "Survived under a tyrant";
    			t403 = space();
    			li60 = element("li");
    			li60.textContent = "Told of hidden paradise";
    			t405 = space();
    			li61 = element("li");
    			li61.textContent = "Worshiped as a savior";
    			t407 = space();
    			button68 = element("button");
    			button68.textContent = "PROFESSION:";
    			t409 = space();
    			div98 = element("div");
    			p77 = element("p");
    			p77.textContent = "Roll or select during Step 1 to make a Character who benefits now from their old job before The End. Characters get a Specialty (+1) and a free starting item related to their old job.";
    			t411 = space();
    			button69 = element("button");
    			button69.textContent = "ACTOR";
    			t413 = space();
    			div62 = element("div");
    			p78 = element("p");
    			p78.textContent = "Free Specialty: Entertain(Distract) +1";
    			t415 = space();
    			p79 = element("p");
    			p79.textContent = "Free Gear: Makeup";
    			t417 = space();
    			button70 = element("button");
    			button70.textContent = "ARCHITECT";
    			t419 = space();
    			div63 = element("div");
    			p80 = element("p");
    			p80.textContent = "Free Specialty: Science(Physics) +1";
    			t421 = space();
    			p81 = element("p");
    			p81.textContent = "Free Gear: Tape Measure";
    			t423 = space();
    			button71 = element("button");
    			button71.textContent = "BASEBALL PLAYER";
    			t425 = space();
    			div64 = element("div");
    			p82 = element("p");
    			p82.textContent = "Free Specialty: Melee(Weaponry) +1";
    			t427 = space();
    			p83 = element("p");
    			p83.textContent = "Free Gear: Baseball Bat";
    			t429 = space();
    			button72 = element("button");
    			button72.textContent = "BASKETBALL PLAYER";
    			t431 = space();
    			div65 = element("div");
    			p84 = element("p");
    			p84.textContent = "Free Specialty: Acrobatics(Jump) +1";
    			t433 = space();
    			p85 = element("p");
    			p85.textContent = "Free Gear: Running Shoes";
    			t435 = space();
    			button73 = element("button");
    			button73.textContent = "BURGLAR";
    			t437 = space();
    			div66 = element("div");
    			p86 = element("p");
    			p86.textContent = "Free Specialty: Larceny(Disable) +1";
    			t439 = space();
    			p87 = element("p");
    			p87.textContent = "Free Gear: Balaclava";
    			t441 = space();
    			button74 = element("button");
    			button74.textContent = "CAMP COUNSELOR";
    			t443 = space();
    			div67 = element("div");
    			p88 = element("p");
    			p88.textContent = "Free Specialty: Ranged(Archery) +1";
    			t445 = space();
    			p89 = element("p");
    			p89.textContent = "Free Gear: Compound Bow";
    			t447 = space();
    			button75 = element("button");
    			button75.textContent = "CARPENTER";
    			t449 = space();
    			div68 = element("div");
    			p90 = element("p");
    			p90.textContent = "Free Specialty: Build(Repair) +1";
    			t451 = space();
    			p91 = element("p");
    			p91.textContent = "Free Gear: Tool Box";
    			t453 = space();
    			button76 = element("button");
    			button76.textContent = "CONVICT";
    			t455 = space();
    			div69 = element("div");
    			p92 = element("p");
    			p92.textContent = "Free Specialty: Larceny(Conceal) +1";
    			t457 = space();
    			p93 = element("p");
    			p93.textContent = "Free Gear: Handcuffs";
    			t459 = space();
    			button77 = element("button");
    			button77.textContent = "COP";
    			t461 = space();
    			div70 = element("div");
    			p94 = element("p");
    			p94.textContent = "Free Specialty: Leadership(Taunt) +1";
    			t463 = space();
    			p95 = element("p");
    			p95.textContent = "Free Gear: Glock 17 (+d6 9mmFMJ)";
    			t465 = space();
    			button78 = element("button");
    			button78.textContent = "COURIER";
    			t467 = space();
    			div71 = element("div");
    			p96 = element("p");
    			p96.textContent = "Free Specialty: Survival(Navigate) +1";
    			t469 = space();
    			p97 = element("p");
    			p97.textContent = "Free Gear: Bicycle";
    			t471 = space();
    			button79 = element("button");
    			button79.textContent = "DOG TRAINER";
    			t473 = space();
    			div72 = element("div");
    			p98 = element("p");
    			p98.textContent = "Free Specialty: Tame(Train) +1";
    			t475 = space();
    			p99 = element("p");
    			p99.textContent = "Free Gear: Choker Leash";
    			t477 = space();
    			button80 = element("button");
    			button80.textContent = "ELECTRICIAN";
    			t479 = space();
    			div73 = element("div");
    			p100 = element("p");
    			p100.textContent = "Free Specialty: Science((Tech)) +1";
    			t481 = space();
    			p101 = element("p");
    			p101.textContent = "Free Gear: Multimeter";
    			t483 = space();
    			button81 = element("button");
    			button81.textContent = "FOOTBALL PLAYER";
    			t485 = space();
    			div74 = element("div");
    			p102 = element("p");
    			p102.textContent = "Free Specialty: Ranged(Throw) +1";
    			t487 = space();
    			p103 = element("p");
    			p103.textContent = "Free Gear: Athletic Pads";
    			t489 = space();
    			button82 = element("button");
    			button82.textContent = "GYMNAST";
    			t491 = space();
    			div75 = element("div");
    			p104 = element("p");
    			p104.textContent = "Free Specialty: Acrobatics(Tumble) +1";
    			t493 = space();
    			p105 = element("p");
    			p105.textContent = "Free Gear: Duffel Bag";
    			t495 = space();
    			button83 = element("button");
    			button83.textContent = "HOMELESS";
    			t497 = space();
    			div76 = element("div");
    			p106 = element("p");
    			p106.textContent = "Free Specialty: Survival(Forage) +1";
    			t499 = space();
    			p107 = element("p");
    			p107.textContent = "Free Gear: Winter Coat";
    			t501 = space();
    			button84 = element("button");
    			button84.textContent = "LAWYER";
    			t503 = space();
    			div77 = element("div");
    			p108 = element("p");
    			p108.textContent = "Free Specialty: Entertain(Lie) +1";
    			t505 = space();
    			p109 = element("p");
    			p109.textContent = "Free Gear: Alcohol";
    			t507 = space();
    			button85 = element("button");
    			button85.textContent = "MANAGER";
    			t509 = space();
    			div78 = element("div");
    			p110 = element("p");
    			p110.textContent = "Free Specialty: Leadership(Encourage) +1";
    			t511 = space();
    			p111 = element("p");
    			p111.textContent = "Free Gear: Wristwatch";
    			t513 = space();
    			button86 = element("button");
    			button86.textContent = "MECHANIC";
    			t515 = space();
    			div79 = element("div");
    			p112 = element("p");
    			p112.textContent = "Free Specialty: Build(Customize) +1";
    			t517 = space();
    			p113 = element("p");
    			p113.textContent = "Free Gear: Screwdriver";
    			t519 = space();
    			button87 = element("button");
    			button87.textContent = "MILITARY";
    			t521 = space();
    			div80 = element("div");
    			p114 = element("p");
    			p114.textContent = "Free Specialty: Ranged(Guns) +1";
    			t523 = space();
    			p115 = element("p");
    			p115.textContent = "Free Gear: AR-15 (+d6x2 5.56FMJ)";
    			t525 = space();
    			button88 = element("button");
    			button88.textContent = "MUSICIAN";
    			t527 = space();
    			div81 = element("div");
    			p116 = element("p");
    			p116.textContent = "Free Specialty: Entertain(Inspire) +1";
    			t529 = space();
    			p117 = element("p");
    			p117.textContent = "Free Gear: Musical Instrument";
    			t531 = space();
    			button89 = element("button");
    			button89.textContent = "PARAMEDIC";
    			t533 = space();
    			div82 = element("div");
    			p118 = element("p");
    			p118.textContent = "Free Specialty: Medicine(First-Aid) +1";
    			t535 = space();
    			p119 = element("p");
    			p119.textContent = "Free Gear: EMT Bag";
    			t537 = space();
    			button90 = element("button");
    			button90.textContent = "PARK RANGER";
    			t539 = space();
    			div83 = element("div");
    			p120 = element("p");
    			p120.textContent = "Free Specialty: Survival(Camp) +1";
    			t541 = space();
    			p121 = element("p");
    			p121.textContent = "Free Gear: Binoculars";
    			t543 = space();
    			button91 = element("button");
    			button91.textContent = "PHARMACIST";
    			t545 = space();
    			div84 = element("div");
    			p122 = element("p");
    			p122.textContent = "Free Specialty: Science(Chemistry) +1";
    			t547 = space();
    			p123 = element("p");
    			p123.textContent = "Free Gear: NBC Suit";
    			t549 = space();
    			button92 = element("button");
    			button92.textContent = "PILOT";
    			t551 = space();
    			div85 = element("div");
    			p124 = element("p");
    			p124.textContent = "Free Specialty: Drive(Fly) + Pilot License +1";
    			t553 = space();
    			p125 = element("p");
    			p125.textContent = "Free Gear: Flare Gun (+d6 12g Flares)";
    			t555 = space();
    			button93 = element("button");
    			button93.textContent = "PRIZE FIGHTER";
    			t557 = space();
    			div86 = element("div");
    			p126 = element("p");
    			p126.textContent = "Free Specialty: Melee(Unarmed) +1";
    			t559 = space();
    			p127 = element("p");
    			p127.textContent = "Free Gear: Brass Knuckles";
    			t561 = space();
    			button94 = element("button");
    			button94.textContent = "RIDING INSTRUCTOR";
    			t563 = space();
    			div87 = element("div");
    			p128 = element("p");
    			p128.textContent = "Free Specialty: Tame(Ride) +1";
    			t565 = space();
    			p129 = element("p");
    			p129.textContent = "Free Gear: Cowboy Hat";
    			t567 = space();
    			button95 = element("button");
    			button95.textContent = "SECURITY GUARD";
    			t569 = space();
    			div88 = element("div");
    			p130 = element("p");
    			p130.textContent = "Free Specialty: Melee(Block) +1";
    			t571 = space();
    			p131 = element("p");
    			p131.textContent = "Free Gear: Baton";
    			t573 = space();
    			button96 = element("button");
    			button96.textContent = "SURGEON";
    			t575 = space();
    			div89 = element("div");
    			p132 = element("p");
    			p132.textContent = "Free Specialty: Medicine(Surgery) +1";
    			t577 = space();
    			p133 = element("p");
    			p133.textContent = "Free Gear: Surgery Kit";
    			t579 = space();
    			button97 = element("button");
    			button97.textContent = "TAXI DRIVER";
    			t581 = space();
    			div90 = element("div");
    			p134 = element("p");
    			p134.textContent = "Free Specialty: Drive(Stunt) +1";
    			t583 = space();
    			p135 = element("p");
    			p135.textContent = "Free Gear: S&ampW Snubnose (+d6 .357FMJ)";
    			t585 = space();
    			button98 = element("button");
    			button98.textContent = "TECHNICIAN";
    			t587 = space();
    			div91 = element("div");
    			p136 = element("p");
    			p136.textContent = "Free Specialty: Build(Salvage) +1";
    			t589 = space();
    			p137 = element("p");
    			p137.textContent = "Free Gear: Multi-tool";
    			t591 = space();
    			button99 = element("button");
    			button99.textContent = "TEACHER";
    			t593 = space();
    			div92 = element("div");
    			p138 = element("p");
    			p138.textContent = "Free Specialty: Leadership(Order) +1";
    			t595 = space();
    			p139 = element("p");
    			p139.textContent = "Free Gear: Flashlight";
    			t597 = space();
    			button100 = element("button");
    			button100.textContent = "THERAPIST";
    			t599 = space();
    			div93 = element("div");
    			p140 = element("p");
    			p140.textContent = "Free Specialty: Medicine(Psychology) +1";
    			t601 = space();
    			p141 = element("p");
    			p141.textContent = "Free Gear: Sedatives (d6x10)";
    			t603 = space();
    			button101 = element("button");
    			button101.textContent = "THIEF";
    			t605 = space();
    			div94 = element("div");
    			p142 = element("p");
    			p142.textContent = "Free Specialty: Larceny(Steal) +1";
    			t607 = space();
    			p143 = element("p");
    			p143.textContent = "Free Gear: Crowbar";
    			t609 = space();
    			button102 = element("button");
    			button102.textContent = "TRUCKER";
    			t611 = space();
    			div95 = element("div");
    			p144 = element("p");
    			p144.textContent = "Free Specialty: Drive(Combat) +1";
    			t613 = space();
    			p145 = element("p");
    			p145.textContent = "Free Gear: Tire Iron";
    			t615 = space();
    			button103 = element("button");
    			button103.textContent = "YOGA INSTRUCTOR";
    			t617 = space();
    			div96 = element("div");
    			p146 = element("p");
    			p146.textContent = "Free Specialty: Acrobatics(Dodge) +1";
    			t619 = space();
    			p147 = element("p");
    			p147.textContent = "Free Gear: Pepper Spray";
    			t621 = space();
    			button104 = element("button");
    			button104.textContent = "ZOO KEEPER";
    			t623 = space();
    			div97 = element("div");
    			p148 = element("p");
    			p148.textContent = "Free Specialty: Tame(Calm) +1";
    			t625 = space();
    			p149 = element("p");
    			p149.textContent = "Free Gear: Hand Radio";
    			t627 = space();
    			button105 = element("button");
    			button105.textContent = "RELATIONSHIP:";
    			t629 = space();
    			div99 = element("div");
    			p150 = element("p");
    			p150.textContent = "Each Player may roll once with each other Character on the Team. For any pair of Players, they each roll a Relationship and decide to use one of their results to describe how their Characters are related. Players should work out the details of their Relationships together before the story begins.";
    			t631 = space();
    			ol1 = element("ol");
    			li62 = element("li");
    			li62.textContent = "Biological siblings";
    			t633 = space();
    			li63 = element("li");
    			li63.textContent = "Business partners";
    			t635 = space();
    			li64 = element("li");
    			li64.textContent = "Childhood friends";
    			t637 = space();
    			li65 = element("li");
    			li65.textContent = "Cousins";
    			t639 = space();
    			li66 = element("li");
    			li66.textContent = "Family friends";
    			t641 = space();
    			li67 = element("li");
    			li67.textContent = "Former Faction members";
    			t643 = space();
    			li68 = element("li");
    			li68.textContent = "Had a falling out";
    			t645 = space();
    			li69 = element("li");
    			li69.textContent = "Have the same ex";
    			t647 = space();
    			li70 = element("li");
    			li70.textContent = "Mentor/apprentice";
    			t649 = space();
    			li71 = element("li");
    			li71.textContent = "Once enemies now allies";
    			t651 = space();
    			li72 = element("li");
    			li72.textContent = "Only remaining survivors";
    			t653 = space();
    			li73 = element("li");
    			li73.textContent = "Partners in crime";
    			t655 = space();
    			li74 = element("li");
    			li74.textContent = "Respectful rivals";
    			t657 = space();
    			li75 = element("li");
    			li75.textContent = "Share a dark secret";
    			t659 = space();
    			li76 = element("li");
    			li76.textContent = "Step siblings";
    			t661 = space();
    			li77 = element("li");
    			li77.textContent = "They saved your life";
    			t663 = space();
    			li78 = element("li");
    			li78.textContent = "War buddies";
    			t665 = space();
    			li79 = element("li");
    			li79.textContent = "You saved their life";
    			add_location(h2, file$a, 1, 4, 33);
    			attr_dev(button0, "id", "CharacterCreationBtn");
    			attr_dev(button0, "class", "Btn");
    			add_location(button0, file$a, 2, 4, 65);
    			attr_dev(button1, "id", "CharacterCreationStep1Btn");
    			attr_dev(button1, "class", "Btn");
    			add_location(button1, file$a, 4, 8, 196);
    			add_location(p0, file$a, 6, 12, 346);
    			attr_dev(div0, "id", "CharacterCreationStep1Sec");
    			attr_dev(div0, "class", "Sec3");
    			add_location(div0, file$a, 5, 8, 284);
    			attr_dev(button2, "id", "CharacterCreationStep2Btn");
    			attr_dev(button2, "class", "Btn");
    			add_location(button2, file$a, 8, 8, 439);
    			add_location(p1, file$a, 10, 12, 598);
    			add_location(li0, file$a, 12, 16, 842);
    			add_location(li1, file$a, 13, 16, 885);
    			add_location(li2, file$a, 14, 16, 930);
    			add_location(li3, file$a, 15, 16, 980);
    			add_location(ul0, file$a, 11, 12, 821);
    			attr_dev(div1, "id", "CharacterCreationStep2Sec");
    			attr_dev(div1, "class", "Sec3");
    			add_location(div1, file$a, 9, 8, 536);
    			attr_dev(button3, "id", "CharacterCreationStep3Btn");
    			attr_dev(button3, "class", "Btn");
    			add_location(button3, file$a, 18, 8, 1051);
    			add_location(p2, file$a, 20, 12, 1196);
    			add_location(li4, file$a, 22, 16, 1355);
    			add_location(li5, file$a, 23, 16, 1424);
    			add_location(li6, file$a, 24, 16, 1492);
    			add_location(li7, file$a, 25, 16, 1558);
    			add_location(ul1, file$a, 21, 12, 1334);
    			attr_dev(div2, "id", "CharacterCreationStep3Sec");
    			attr_dev(div2, "class", "Sec3");
    			add_location(div2, file$a, 19, 8, 1134);
    			attr_dev(button4, "id", "CharacterCreationStep4Btn");
    			attr_dev(button4, "class", "Btn");
    			add_location(button4, file$a, 28, 8, 1653);
    			add_location(p3, file$a, 30, 12, 1802);
    			add_location(li8, file$a, 32, 16, 1888);
    			add_location(li9, file$a, 33, 16, 1954);
    			add_location(li10, file$a, 34, 16, 2016);
    			add_location(li11, file$a, 35, 16, 2066);
    			add_location(li12, file$a, 36, 16, 2139);
    			add_location(li13, file$a, 37, 16, 2220);
    			add_location(li14, file$a, 38, 16, 2306);
    			add_location(li15, file$a, 39, 16, 2374);
    			add_location(li16, file$a, 40, 16, 2437);
    			add_location(li17, file$a, 43, 24, 2525);
    			add_location(li18, file$a, 44, 24, 2579);
    			add_location(li19, file$a, 45, 24, 2638);
    			add_location(ul2, file$a, 42, 20, 2496);
    			add_location(li20, file$a, 41, 16, 2471);
    			add_location(li21, file$a, 48, 16, 2731);
    			add_location(li22, file$a, 49, 16, 2765);
    			add_location(li23, file$a, 52, 24, 2851);
    			add_location(li24, file$a, 53, 24, 2943);
    			add_location(ul3, file$a, 51, 20, 2822);
    			add_location(li25, file$a, 50, 16, 2797);
    			add_location(ul4, file$a, 31, 12, 1867);
    			attr_dev(div3, "id", "CharacterCreationStep4Sec");
    			attr_dev(div3, "class", "Sec3");
    			add_location(div3, file$a, 29, 8, 1740);
    			attr_dev(button5, "id", "CharacterCreationStep5Btn");
    			attr_dev(button5, "class", "Btn");
    			add_location(button5, file$a, 58, 8, 3092);
    			add_location(p4, file$a, 60, 12, 3235);
    			attr_dev(button6, "id", "StartingArmorBtn");
    			attr_dev(button6, "class", "Btn");
    			add_location(button6, file$a, 61, 12, 3512);
    			attr_dev(button7, "id", "StartingRolledArmorBtn");
    			attr_dev(button7, "class", "Roll");
    			attr_dev(button7, "onclick", "rollItem(iArmorList,'StartingRolledArmor')");
    			add_location(button7, file$a, 63, 16, 3647);
    			attr_dev(p5, "id", "StartingRolledArmor");
    			add_location(p5, file$a, 64, 16, 3785);
    			attr_dev(div4, "id", "StartingArmorSec");
    			attr_dev(div4, "class", "Sec4");
    			add_location(div4, file$a, 62, 12, 3590);
    			attr_dev(button8, "id", "StartingMeleeBtn");
    			attr_dev(button8, "class", "Btn");
    			add_location(button8, file$a, 66, 12, 3849);
    			attr_dev(button9, "id", "StartingRolledMeleeBtn");
    			attr_dev(button9, "class", "Roll");
    			attr_dev(button9, "onclick", "rollItem(iMeleeWeaponsList,'StartingRolledMelee')");
    			add_location(button9, file$a, 68, 16, 3991);
    			attr_dev(p6, "id", "StartingRolledMelee");
    			add_location(p6, file$a, 69, 16, 4143);
    			attr_dev(div5, "id", "StartingMeleeSec");
    			attr_dev(div5, "class", "Sec4");
    			add_location(div5, file$a, 67, 12, 3934);
    			attr_dev(button10, "id", "StartingRangedBtn");
    			attr_dev(button10, "class", "Btn");
    			add_location(button10, file$a, 71, 12, 4207);
    			attr_dev(button11, "id", "StartingRolledRangedBtn");
    			attr_dev(button11, "class", "Roll");
    			attr_dev(button11, "onclick", "rollItem(iRangedWeaponsList,'StartingRolledRanged')");
    			add_location(button11, file$a, 73, 16, 4352);
    			attr_dev(p7, "id", "StartingRolledRanged");
    			add_location(p7, file$a, 74, 16, 4508);
    			attr_dev(div6, "id", "StartingRangedSec");
    			attr_dev(div6, "class", "Sec4");
    			add_location(div6, file$a, 72, 12, 4294);
    			attr_dev(button12, "id", "StartingMGLBtn");
    			attr_dev(button12, "class", "Btn");
    			add_location(button12, file$a, 76, 12, 4573);
    			add_location(p8, file$a, 78, 16, 4703);
    			add_location(p9, file$a, 79, 16, 4848);
    			attr_dev(button13, "id", "StartingRolledMGLBtn");
    			attr_dev(button13, "class", "Roll");
    			attr_dev(button13, "onclick", "rollItem(iMasterGearList,'StartingRolledMGL')");
    			add_location(button13, file$a, 80, 16, 4994);
    			attr_dev(p10, "id", "StartingRolledMGL");
    			add_location(p10, file$a, 81, 16, 5131);
    			attr_dev(div7, "id", "StartingMGLSec");
    			attr_dev(div7, "class", "Sec4");
    			add_location(div7, file$a, 77, 12, 4648);
    			attr_dev(div8, "id", "CharacterCreationStep5Sec");
    			attr_dev(div8, "class", "Sec3");
    			add_location(div8, file$a, 59, 8, 3173);
    			attr_dev(button14, "id", "CharacterCreationStep6Btn");
    			attr_dev(button14, "class", "Btn");
    			add_location(button14, file$a, 84, 8, 5204);
    			add_location(p11, file$a, 86, 12, 5352);
    			attr_dev(div9, "id", "CharacterCreationStep6Sec");
    			attr_dev(div9, "class", "Sec3");
    			add_location(div9, file$a, 85, 8, 5290);
    			attr_dev(button15, "id", "CharacterOptionsBtn");
    			attr_dev(button15, "class", "Btn");
    			add_location(button15, file$a, 88, 8, 5425);
    			add_location(p12, file$a, 90, 12, 5561);
    			attr_dev(button16, "id", "ExperiencedCharactersBtn");
    			attr_dev(button16, "class", "Btn");
    			add_location(button16, file$a, 91, 12, 5832);
    			add_location(p13, file$a, 93, 16, 5992);
    			attr_dev(button17, "id", "CapableCharactersBtn");
    			attr_dev(button17, "class", "Btn");
    			add_location(button17, file$a, 94, 16, 6308);
    			add_location(p14, file$a, 96, 20, 6455);
    			add_location(p15, file$a, 97, 20, 6505);
    			attr_dev(div10, "id", "CapableCharactersSec");
    			attr_dev(div10, "class", "Sec5");
    			add_location(div10, file$a, 95, 16, 6390);
    			attr_dev(button18, "id", "AdvancedCharactersBtn");
    			attr_dev(button18, "class", "Btn");
    			add_location(button18, file$a, 99, 16, 6570);
    			add_location(p16, file$a, 101, 20, 6720);
    			add_location(p17, file$a, 102, 20, 6771);
    			attr_dev(div11, "id", "AdvancedCharactersSec");
    			attr_dev(div11, "class", "Sec5");
    			add_location(div11, file$a, 100, 16, 6654);
    			attr_dev(button19, "id", "SeasonedCharactersBtn");
    			attr_dev(button19, "class", "Btn");
    			add_location(button19, file$a, 104, 16, 6836);
    			add_location(p18, file$a, 106, 20, 6986);
    			add_location(p19, file$a, 107, 20, 7037);
    			attr_dev(div12, "id", "SeasonedCharactersSec");
    			attr_dev(div12, "class", "Sec5");
    			add_location(div12, file$a, 105, 16, 6920);
    			attr_dev(button20, "id", "VeteranCharactersBtn");
    			attr_dev(button20, "class", "Btn");
    			add_location(button20, file$a, 109, 16, 7102);
    			add_location(p20, file$a, 111, 20, 7249);
    			add_location(p21, file$a, 112, 20, 7300);
    			attr_dev(div13, "id", "VeteranCharactersSec");
    			attr_dev(div13, "class", "Sec5");
    			add_location(div13, file$a, 110, 16, 7184);
    			attr_dev(button21, "id", "EliteCharactersBtn");
    			attr_dev(button21, "class", "Btn");
    			add_location(button21, file$a, 114, 16, 7365);
    			add_location(p22, file$a, 116, 20, 7506);
    			add_location(p23, file$a, 117, 20, 7557);
    			attr_dev(div14, "id", "EliteCharactersSec");
    			attr_dev(div14, "class", "Sec5");
    			add_location(div14, file$a, 115, 16, 7443);
    			attr_dev(button22, "id", "MasterCharactersBtn");
    			attr_dev(button22, "class", "Btn");
    			add_location(button22, file$a, 119, 16, 7623);
    			add_location(p24, file$a, 121, 20, 7767);
    			add_location(p25, file$a, 122, 20, 7818);
    			attr_dev(div15, "id", "MasterCharactersSec");
    			attr_dev(div15, "class", "Sec5");
    			add_location(div15, file$a, 120, 16, 7703);
    			attr_dev(div16, "id", "ExperiencedCharactersSec");
    			attr_dev(div16, "class", "Sec4");
    			add_location(div16, file$a, 92, 12, 5927);
    			attr_dev(button23, "id", "AgeBtn");
    			attr_dev(button23, "class", "Btn");
    			add_location(button23, file$a, 125, 12, 7899);
    			add_location(p26, file$a, 127, 16, 8004);
    			attr_dev(button24, "id", "FirstAgeBtn");
    			attr_dev(button24, "class", "Btn");
    			add_location(button24, file$a, 128, 16, 8219);
    			add_location(p27, file$a, 130, 20, 8342);
    			add_location(p28, file$a, 131, 20, 8385);
    			attr_dev(div17, "id", "FirstAgeSec");
    			attr_dev(div17, "class", "Sec5");
    			add_location(div17, file$a, 129, 16, 8286);
    			attr_dev(button25, "id", "SecondAgeBtn");
    			attr_dev(button25, "class", "Btn");
    			add_location(button25, file$a, 133, 16, 8450);
    			add_location(p29, file$a, 135, 20, 8576);
    			add_location(p30, file$a, 136, 20, 8619);
    			attr_dev(div18, "id", "SecondAgeSec");
    			attr_dev(div18, "class", "Sec5");
    			add_location(div18, file$a, 134, 16, 8519);
    			attr_dev(button26, "id", "ThirdAgeBtn");
    			attr_dev(button26, "class", "Btn");
    			add_location(button26, file$a, 138, 16, 8684);
    			add_location(p31, file$a, 140, 20, 8808);
    			add_location(p32, file$a, 141, 20, 8852);
    			attr_dev(div19, "id", "ThirdAgeSec");
    			attr_dev(div19, "class", "Sec5");
    			add_location(div19, file$a, 139, 16, 8752);
    			attr_dev(button27, "id", "FourthAgeBtn");
    			attr_dev(button27, "class", "Btn");
    			add_location(button27, file$a, 143, 16, 8917);
    			add_location(p33, file$a, 145, 20, 9043);
    			add_location(p34, file$a, 146, 20, 9087);
    			attr_dev(div20, "id", "FourthAgeSec");
    			attr_dev(div20, "class", "Sec5");
    			add_location(div20, file$a, 144, 16, 8986);
    			attr_dev(button28, "id", "FifthAgeBtn");
    			attr_dev(button28, "class", "Btn");
    			add_location(button28, file$a, 148, 16, 9152);
    			add_location(p35, file$a, 150, 20, 9276);
    			add_location(p36, file$a, 151, 20, 9319);
    			attr_dev(div21, "id", "FifthAgeSec");
    			attr_dev(div21, "class", "Sec5");
    			add_location(div21, file$a, 149, 16, 9220);
    			attr_dev(button29, "id", "SixthAgeBtn");
    			attr_dev(button29, "class", "Btn");
    			add_location(button29, file$a, 153, 16, 9384);
    			add_location(p37, file$a, 155, 20, 9506);
    			add_location(p38, file$a, 156, 20, 9549);
    			attr_dev(div22, "id", "SixthAgeSec");
    			attr_dev(div22, "class", "Sec5");
    			add_location(div22, file$a, 154, 16, 9450);
    			attr_dev(div23, "id", "AgeSec");
    			attr_dev(div23, "class", "Sec4");
    			add_location(div23, file$a, 126, 12, 7957);
    			attr_dev(button30, "id", "FlawBtn");
    			attr_dev(button30, "class", "Btn");
    			add_location(button30, file$a, 159, 12, 9629);
    			add_location(p39, file$a, 161, 16, 9737);
    			attr_dev(button31, "id", "AddictionBtn");
    			attr_dev(button31, "class", "Btn");
    			add_location(button31, file$a, 162, 16, 9953);
    			add_location(p40, file$a, 164, 20, 10083);
    			attr_dev(div24, "id", "AddictionSec");
    			attr_dev(div24, "class", "Sec5");
    			add_location(div24, file$a, 163, 16, 10026);
    			attr_dev(button32, "id", "AllergyBtn");
    			attr_dev(button32, "class", "Btn");
    			add_location(button32, file$a, 166, 16, 10179);
    			add_location(p41, file$a, 168, 20, 10303);
    			attr_dev(div25, "id", "AllergySec");
    			attr_dev(div25, "class", "Sec5");
    			add_location(div25, file$a, 167, 16, 10248);
    			attr_dev(button33, "id", "AmnesiaBtn");
    			attr_dev(button33, "class", "Btn");
    			add_location(button33, file$a, 170, 16, 10394);
    			add_location(p42, file$a, 172, 20, 10518);
    			attr_dev(div26, "id", "AmnesiaSec");
    			attr_dev(div26, "class", "Sec5");
    			add_location(div26, file$a, 171, 16, 10463);
    			attr_dev(button34, "id", "AmputeeBtn");
    			attr_dev(button34, "class", "Btn");
    			add_location(button34, file$a, 174, 16, 10617);
    			add_location(p43, file$a, 176, 20, 10741);
    			attr_dev(div27, "id", "AmputeeSec");
    			attr_dev(div27, "class", "Sec5");
    			add_location(div27, file$a, 175, 16, 10686);
    			attr_dev(button35, "id", "AnemiaBtn");
    			attr_dev(button35, "class", "Btn");
    			add_location(button35, file$a, 178, 16, 10842);
    			add_location(p44, file$a, 180, 20, 10964);
    			attr_dev(div28, "id", "AnemiaSec");
    			attr_dev(div28, "class", "Sec5");
    			add_location(div28, file$a, 179, 16, 10910);
    			attr_dev(button36, "id", "AnxietyBtn");
    			attr_dev(button36, "class", "Btn");
    			add_location(button36, file$a, 182, 16, 11062);
    			add_location(p45, file$a, 184, 20, 11186);
    			attr_dev(div29, "id", "AnxietySec");
    			attr_dev(div29, "class", "Sec5");
    			add_location(div29, file$a, 183, 16, 11131);
    			attr_dev(button37, "id", "AsthmaBtn");
    			attr_dev(button37, "class", "Btn");
    			add_location(button37, file$a, 186, 16, 11290);
    			add_location(p46, file$a, 188, 20, 11412);
    			attr_dev(div30, "id", "AsthmaSec");
    			attr_dev(div30, "class", "Sec5");
    			add_location(div30, file$a, 187, 16, 11358);
    			attr_dev(button38, "id", "BadBackBtn");
    			attr_dev(button38, "class", "Btn");
    			add_location(button38, file$a, 190, 16, 11508);
    			add_location(p47, file$a, 192, 20, 11634);
    			attr_dev(div31, "id", "BadBackSec");
    			attr_dev(div31, "class", "Sec5");
    			add_location(div31, file$a, 191, 16, 11579);
    			attr_dev(button39, "id", "BlindBtn");
    			attr_dev(button39, "class", "Btn");
    			add_location(button39, file$a, 194, 16, 11733);
    			add_location(p48, file$a, 196, 20, 11852);
    			attr_dev(div32, "id", "BlindSec");
    			attr_dev(div32, "class", "Sec5");
    			add_location(div32, file$a, 195, 16, 11799);
    			attr_dev(button40, "id", "CancerBtn");
    			attr_dev(button40, "class", "Btn");
    			add_location(button40, file$a, 198, 16, 11950);
    			add_location(p49, file$a, 200, 20, 12071);
    			attr_dev(div33, "id", "CancerSec");
    			attr_dev(div33, "class", "Sec5");
    			add_location(div33, file$a, 199, 16, 12017);
    			attr_dev(button41, "id", "CowardBtn");
    			attr_dev(button41, "class", "Btn");
    			add_location(button41, file$a, 202, 16, 12166);
    			add_location(p50, file$a, 204, 20, 12287);
    			attr_dev(div34, "id", "CowardSec");
    			attr_dev(div34, "class", "Sec5");
    			add_location(div34, file$a, 203, 16, 12233);
    			attr_dev(button42, "id", "CrippledBtn");
    			attr_dev(button42, "class", "Btn");
    			add_location(button42, file$a, 206, 16, 12387);
    			add_location(p51, file$a, 208, 20, 12515);
    			attr_dev(div35, "id", "CrippledSec");
    			attr_dev(div35, "class", "Sec5");
    			add_location(div35, file$a, 207, 16, 12459);
    			attr_dev(button43, "id", "CruelBtn");
    			attr_dev(button43, "class", "Btn");
    			add_location(button43, file$a, 210, 16, 12615);
    			add_location(p52, file$a, 212, 20, 12733);
    			attr_dev(div36, "id", "CruelSec");
    			attr_dev(div36, "class", "Sec5");
    			add_location(div36, file$a, 211, 16, 12680);
    			attr_dev(button44, "id", "DeafBtn");
    			attr_dev(button44, "class", "Btn");
    			add_location(button44, file$a, 214, 16, 12835);
    			add_location(p53, file$a, 216, 20, 12951);
    			attr_dev(div37, "id", "DeafSec");
    			attr_dev(div37, "class", "Sec5");
    			add_location(div37, file$a, 215, 16, 12899);
    			attr_dev(button45, "id", "DebtBtn");
    			attr_dev(button45, "class", "Btn");
    			add_location(button45, file$a, 218, 16, 13026);
    			add_location(p54, file$a, 220, 20, 13141);
    			attr_dev(div38, "id", "DebtSec");
    			attr_dev(div38, "class", "Sec5");
    			add_location(div38, file$a, 219, 16, 13089);
    			attr_dev(button46, "id", "DeformedBtn");
    			attr_dev(button46, "class", "Btn");
    			add_location(button46, file$a, 222, 16, 13239);
    			add_location(p55, file$a, 224, 20, 13367);
    			attr_dev(div39, "id", "DeformedSec");
    			attr_dev(div39, "class", "Sec5");
    			add_location(div39, file$a, 223, 16, 13311);
    			attr_dev(button47, "id", "DiabetesBtn");
    			attr_dev(button47, "class", "Btn");
    			add_location(button47, file$a, 226, 16, 13464);
    			add_location(p56, file$a, 228, 20, 13591);
    			attr_dev(div40, "id", "DiabetesSec");
    			attr_dev(div40, "class", "Sec5");
    			add_location(div40, file$a, 227, 16, 13535);
    			attr_dev(button48, "id", "DyslexiaBtn");
    			attr_dev(button48, "class", "Btn");
    			add_location(button48, file$a, 230, 16, 13692);
    			add_location(p57, file$a, 232, 20, 13820);
    			attr_dev(div41, "id", "DyslexiaSec");
    			attr_dev(div41, "class", "Sec5");
    			add_location(div41, file$a, 231, 16, 13764);
    			attr_dev(button49, "id", "ForgetfulBtn");
    			attr_dev(button49, "class", "Btn");
    			add_location(button49, file$a, 234, 16, 13909);
    			add_location(p58, file$a, 236, 20, 14039);
    			attr_dev(div42, "id", "ForgetfulSec");
    			attr_dev(div42, "class", "Sec5");
    			add_location(div42, file$a, 235, 16, 13982);
    			attr_dev(button50, "id", "GamblerBtn");
    			attr_dev(button50, "class", "Btn");
    			add_location(button50, file$a, 238, 16, 14134);
    			add_location(p59, file$a, 240, 20, 14258);
    			attr_dev(div43, "id", "GamblerSec");
    			attr_dev(div43, "class", "Sec5");
    			add_location(div43, file$a, 239, 16, 14203);
    			attr_dev(button51, "id", "KleptomaniaBtn");
    			attr_dev(button51, "class", "Btn");
    			add_location(button51, file$a, 242, 16, 14355);
    			add_location(p60, file$a, 244, 20, 14491);
    			attr_dev(div44, "id", "KleptomaniaSec");
    			attr_dev(div44, "class", "Sec5");
    			add_location(div44, file$a, 243, 16, 14432);
    			attr_dev(button52, "id", "LazyBtn");
    			attr_dev(button52, "class", "Btn");
    			add_location(button52, file$a, 246, 16, 14588);
    			add_location(p61, file$a, 248, 20, 14703);
    			attr_dev(div45, "id", "LazySec");
    			attr_dev(div45, "class", "Sec5");
    			add_location(div45, file$a, 247, 16, 14651);
    			attr_dev(button53, "id", "MeekBtn");
    			attr_dev(button53, "class", "Btn");
    			add_location(button53, file$a, 250, 16, 14805);
    			add_location(p62, file$a, 252, 20, 14920);
    			attr_dev(div46, "id", "MeekSec");
    			attr_dev(div46, "class", "Sec5");
    			add_location(div46, file$a, 251, 16, 14868);
    			attr_dev(button54, "id", "MuteBtn");
    			attr_dev(button54, "class", "Btn");
    			add_location(button54, file$a, 254, 16, 15012);
    			add_location(p63, file$a, 256, 20, 15128);
    			attr_dev(div47, "id", "MuteSec");
    			attr_dev(div47, "class", "Sec5");
    			add_location(div47, file$a, 255, 16, 15076);
    			attr_dev(button55, "id", "MyopiaBtn");
    			attr_dev(button55, "class", "Btn");
    			add_location(button55, file$a, 258, 16, 15214);
    			add_location(p64, file$a, 260, 20, 15336);
    			attr_dev(div48, "id", "MyopiaSec");
    			attr_dev(div48, "class", "Sec5");
    			add_location(div48, file$a, 259, 16, 15282);
    			attr_dev(button56, "id", "NaiveBtn");
    			attr_dev(button56, "class", "Btn");
    			add_location(button56, file$a, 262, 16, 15433);
    			add_location(p65, file$a, 264, 20, 15551);
    			attr_dev(div49, "id", "NaiveSec");
    			attr_dev(div49, "class", "Sec5");
    			add_location(div49, file$a, 263, 16, 15498);
    			attr_dev(button57, "id", "NightmaresBtn");
    			attr_dev(button57, "class", "Btn");
    			add_location(button57, file$a, 266, 16, 15630);
    			add_location(p66, file$a, 268, 20, 15763);
    			attr_dev(div50, "id", "NightmaresSec");
    			attr_dev(div50, "class", "Sec5");
    			add_location(div50, file$a, 267, 16, 15705);
    			attr_dev(button58, "id", "NoisyBtn");
    			attr_dev(button58, "class", "Btn");
    			add_location(button58, file$a, 270, 16, 15864);
    			add_location(p67, file$a, 272, 20, 15982);
    			attr_dev(div51, "id", "NoisySec");
    			attr_dev(div51, "class", "Sec5");
    			add_location(div51, file$a, 271, 16, 15929);
    			attr_dev(button59, "id", "ObeseBtn");
    			attr_dev(button59, "class", "Btn");
    			add_location(button59, file$a, 274, 16, 16046);
    			add_location(p68, file$a, 276, 20, 16164);
    			attr_dev(div52, "id", "ObeseSec");
    			attr_dev(div52, "class", "Sec5");
    			add_location(div52, file$a, 275, 16, 16111);
    			attr_dev(button60, "id", "PacifistBtn");
    			attr_dev(button60, "class", "Btn");
    			add_location(button60, file$a, 278, 16, 16264);
    			add_location(p69, file$a, 280, 20, 16391);
    			attr_dev(div53, "id", "PacifistSec");
    			attr_dev(div53, "class", "Sec5");
    			add_location(div53, file$a, 279, 16, 16335);
    			attr_dev(button61, "id", "ParanoiaBtn");
    			attr_dev(button61, "class", "Btn");
    			add_location(button61, file$a, 282, 16, 16479);
    			add_location(p70, file$a, 284, 20, 16606);
    			attr_dev(div54, "id", "ParanoiaSec");
    			attr_dev(div54, "class", "Sec5");
    			add_location(div54, file$a, 283, 16, 16550);
    			attr_dev(button62, "id", "PhobiaBtn");
    			attr_dev(button62, "class", "Btn");
    			add_location(button62, file$a, 286, 16, 16678);
    			add_location(p71, file$a, 288, 20, 16799);
    			attr_dev(div55, "id", "PhobiaSec");
    			attr_dev(div55, "class", "Sec5");
    			add_location(div55, file$a, 287, 16, 16745);
    			attr_dev(button63, "id", "RacistBtn");
    			attr_dev(button63, "class", "Btn");
    			add_location(button63, file$a, 290, 16, 16901);
    			add_location(p72, file$a, 292, 20, 17022);
    			attr_dev(div56, "id", "RacistSec");
    			attr_dev(div56, "class", "Sec5");
    			add_location(div56, file$a, 291, 16, 16968);
    			attr_dev(button64, "id", "SexistBtn");
    			attr_dev(button64, "class", "Btn");
    			add_location(button64, file$a, 294, 16, 17124);
    			add_location(p73, file$a, 296, 20, 17245);
    			attr_dev(div57, "id", "SexistSec");
    			attr_dev(div57, "class", "Sec5");
    			add_location(div57, file$a, 295, 16, 17191);
    			attr_dev(button65, "id", "SpeechImpedimentBtn");
    			attr_dev(button65, "class", "Btn");
    			add_location(button65, file$a, 298, 16, 17343);
    			add_location(p74, file$a, 300, 20, 17495);
    			attr_dev(div58, "id", "SpeechImpedimentSec");
    			attr_dev(div58, "class", "Sec5");
    			add_location(div58, file$a, 299, 16, 17431);
    			attr_dev(button66, "id", "SuperstitiousBtn");
    			attr_dev(button66, "class", "Btn");
    			add_location(button66, file$a, 302, 16, 17589);
    			add_location(p75, file$a, 304, 20, 17731);
    			attr_dev(div59, "id", "SuperstitiousSec");
    			attr_dev(div59, "class", "Sec5");
    			add_location(div59, file$a, 303, 16, 17670);
    			attr_dev(div60, "id", "FlawSec");
    			attr_dev(div60, "class", "Sec4");
    			add_location(div60, file$a, 160, 12, 9689);
    			attr_dev(button67, "id", "HistoryBtn");
    			attr_dev(button67, "class", "Btn");
    			add_location(button67, file$a, 307, 12, 17840);
    			add_location(p76, file$a, 309, 16, 17957);
    			add_location(li26, file$a, 311, 20, 18239);
    			add_location(li27, file$a, 312, 20, 18290);
    			add_location(li28, file$a, 313, 20, 18341);
    			add_location(li29, file$a, 314, 20, 18394);
    			add_location(li30, file$a, 315, 20, 18445);
    			add_location(li31, file$a, 316, 20, 18496);
    			add_location(li32, file$a, 317, 20, 18549);
    			add_location(li33, file$a, 318, 20, 18592);
    			add_location(li34, file$a, 319, 20, 18637);
    			add_location(li35, file$a, 320, 20, 18681);
    			add_location(li36, file$a, 321, 20, 18727);
    			add_location(li37, file$a, 322, 20, 18770);
    			add_location(li38, file$a, 323, 20, 18812);
    			add_location(li39, file$a, 324, 20, 18858);
    			add_location(li40, file$a, 325, 20, 18901);
    			add_location(li41, file$a, 326, 20, 18946);
    			add_location(li42, file$a, 327, 20, 18989);
    			add_location(li43, file$a, 328, 20, 19031);
    			add_location(li44, file$a, 329, 20, 19076);
    			add_location(li45, file$a, 330, 20, 19126);
    			add_location(li46, file$a, 331, 20, 19177);
    			add_location(li47, file$a, 332, 20, 19224);
    			add_location(li48, file$a, 333, 20, 19276);
    			add_location(li49, file$a, 334, 20, 19323);
    			add_location(li50, file$a, 335, 20, 19369);
    			add_location(li51, file$a, 336, 20, 19421);
    			add_location(li52, file$a, 337, 20, 19470);
    			add_location(li53, file$a, 338, 20, 19520);
    			add_location(li54, file$a, 339, 20, 19571);
    			add_location(li55, file$a, 340, 20, 19624);
    			add_location(li56, file$a, 341, 20, 19677);
    			add_location(li57, file$a, 342, 20, 19728);
    			add_location(li58, file$a, 343, 20, 19773);
    			add_location(li59, file$a, 344, 20, 19824);
    			add_location(li60, file$a, 345, 20, 19877);
    			add_location(li61, file$a, 346, 20, 19930);
    			add_location(ol0, file$a, 310, 16, 18214);
    			attr_dev(div61, "id", "HistorySec");
    			attr_dev(div61, "class", "Sec4");
    			add_location(div61, file$a, 308, 12, 17906);
    			attr_dev(button68, "id", "ProfessionBtn");
    			attr_dev(button68, "class", "Btn");
    			add_location(button68, file$a, 349, 12, 20014);
    			add_location(p77, file$a, 351, 16, 20140);
    			attr_dev(button69, "id", "ActorBtn");
    			attr_dev(button69, "class", "Btn");
    			add_location(button69, file$a, 352, 16, 20347);
    			add_location(p78, file$a, 354, 20, 20465);
    			add_location(p79, file$a, 355, 20, 20531);
    			attr_dev(div62, "id", "ActorSec");
    			attr_dev(div62, "class", "Sec5");
    			add_location(div62, file$a, 353, 16, 20412);
    			attr_dev(button70, "id", "ArchitectBtn");
    			attr_dev(button70, "class", "Btn");
    			add_location(button70, file$a, 357, 16, 20595);
    			add_location(p80, file$a, 359, 20, 20725);
    			add_location(p81, file$a, 360, 20, 20788);
    			attr_dev(div63, "id", "ArchitectSec");
    			attr_dev(div63, "class", "Sec5");
    			add_location(div63, file$a, 358, 16, 20668);
    			attr_dev(button71, "id", "BaseballPlayerBtn");
    			attr_dev(button71, "class", "Btn");
    			add_location(button71, file$a, 362, 16, 20858);
    			add_location(p82, file$a, 364, 20, 21004);
    			add_location(p83, file$a, 365, 20, 21066);
    			attr_dev(div64, "id", "BaseballPlayerSec");
    			attr_dev(div64, "class", "Sec5");
    			add_location(div64, file$a, 363, 16, 20942);
    			attr_dev(button72, "id", "BasketballPlayerBtn");
    			attr_dev(button72, "class", "Btn");
    			add_location(button72, file$a, 367, 16, 21136);
    			add_location(p84, file$a, 369, 20, 21288);
    			add_location(p85, file$a, 370, 20, 21351);
    			attr_dev(div65, "id", "BasketballPlayerSec");
    			attr_dev(div65, "class", "Sec5");
    			add_location(div65, file$a, 368, 16, 21224);
    			attr_dev(button73, "id", "BurglarBtn");
    			attr_dev(button73, "class", "Btn");
    			add_location(button73, file$a, 372, 16, 21422);
    			add_location(p86, file$a, 374, 20, 21546);
    			add_location(p87, file$a, 375, 20, 21609);
    			attr_dev(div66, "id", "BurglarSec");
    			attr_dev(div66, "class", "Sec5");
    			add_location(div66, file$a, 373, 16, 21491);
    			attr_dev(button74, "id", "CampCounselorBtn");
    			attr_dev(button74, "class", "Btn");
    			add_location(button74, file$a, 377, 16, 21676);
    			add_location(p88, file$a, 379, 20, 21819);
    			add_location(p89, file$a, 380, 20, 21881);
    			attr_dev(div67, "id", "CampCounselorSec");
    			attr_dev(div67, "class", "Sec5");
    			add_location(div67, file$a, 378, 16, 21758);
    			attr_dev(button75, "id", "CarpenterBtn");
    			attr_dev(button75, "class", "Btn");
    			add_location(button75, file$a, 382, 16, 21951);
    			add_location(p90, file$a, 384, 20, 22081);
    			add_location(p91, file$a, 385, 20, 22141);
    			attr_dev(div68, "id", "CarpenterSec");
    			attr_dev(div68, "class", "Sec5");
    			add_location(div68, file$a, 383, 16, 22024);
    			attr_dev(button76, "id", "ConvictBtn");
    			attr_dev(button76, "class", "Btn");
    			add_location(button76, file$a, 387, 16, 22207);
    			add_location(p92, file$a, 389, 20, 22331);
    			add_location(p93, file$a, 390, 20, 22394);
    			attr_dev(div69, "id", "ConvictSec");
    			attr_dev(div69, "class", "Sec5");
    			add_location(div69, file$a, 388, 16, 22276);
    			attr_dev(button77, "id", "CopBtn");
    			attr_dev(button77, "class", "Btn");
    			add_location(button77, file$a, 392, 16, 22461);
    			add_location(p94, file$a, 394, 20, 22573);
    			add_location(p95, file$a, 395, 20, 22637);
    			attr_dev(div70, "id", "CopSec");
    			attr_dev(div70, "class", "Sec5");
    			add_location(div70, file$a, 393, 16, 22522);
    			attr_dev(button78, "id", "CourierBtn");
    			attr_dev(button78, "class", "Btn");
    			add_location(button78, file$a, 397, 16, 22716);
    			add_location(p96, file$a, 399, 20, 22840);
    			add_location(p97, file$a, 400, 20, 22905);
    			attr_dev(div71, "id", "CourierSec");
    			attr_dev(div71, "class", "Sec5");
    			add_location(div71, file$a, 398, 16, 22785);
    			attr_dev(button79, "id", "DogTrainerBtn");
    			attr_dev(button79, "class", "Btn");
    			add_location(button79, file$a, 402, 16, 22970);
    			add_location(p98, file$a, 404, 20, 23104);
    			add_location(p99, file$a, 405, 20, 23162);
    			attr_dev(div72, "id", "DogTrainerSec");
    			attr_dev(div72, "class", "Sec5");
    			add_location(div72, file$a, 403, 16, 23046);
    			attr_dev(button80, "id", "ElectricianBtn");
    			attr_dev(button80, "class", "Btn");
    			add_location(button80, file$a, 407, 16, 23232);
    			add_location(p100, file$a, 409, 20, 23368);
    			add_location(p101, file$a, 410, 20, 23430);
    			attr_dev(div73, "id", "ElectricianSec");
    			attr_dev(div73, "class", "Sec5");
    			add_location(div73, file$a, 408, 16, 23309);
    			attr_dev(button81, "id", "FootballPlayerBtn");
    			attr_dev(button81, "class", "Btn");
    			add_location(button81, file$a, 412, 16, 23498);
    			add_location(p102, file$a, 414, 20, 23644);
    			add_location(p103, file$a, 415, 20, 23704);
    			attr_dev(div74, "id", "FootballPlayerSec");
    			attr_dev(div74, "class", "Sec5");
    			add_location(div74, file$a, 413, 16, 23582);
    			attr_dev(button82, "id", "GymnastBtn");
    			attr_dev(button82, "class", "Btn");
    			add_location(button82, file$a, 417, 16, 23775);
    			add_location(p104, file$a, 419, 20, 23899);
    			add_location(p105, file$a, 420, 20, 23964);
    			attr_dev(div75, "id", "GymnastSec");
    			attr_dev(div75, "class", "Sec5");
    			add_location(div75, file$a, 418, 16, 23844);
    			attr_dev(button83, "id", "HomelessBtn");
    			attr_dev(button83, "class", "Btn");
    			add_location(button83, file$a, 422, 16, 24032);
    			add_location(p106, file$a, 424, 20, 24159);
    			add_location(p107, file$a, 425, 20, 24222);
    			attr_dev(div76, "id", "HomelessSec");
    			attr_dev(div76, "class", "Sec5");
    			add_location(div76, file$a, 423, 16, 24103);
    			attr_dev(button84, "id", "LawyerBtn");
    			attr_dev(button84, "class", "Btn");
    			add_location(button84, file$a, 427, 16, 24291);
    			add_location(p108, file$a, 429, 20, 24412);
    			add_location(p109, file$a, 430, 20, 24473);
    			attr_dev(div77, "id", "LawyerSec");
    			attr_dev(div77, "class", "Sec5");
    			add_location(div77, file$a, 428, 16, 24358);
    			attr_dev(button85, "id", "ManagerBtn");
    			attr_dev(button85, "class", "Btn");
    			add_location(button85, file$a, 432, 16, 24538);
    			add_location(p110, file$a, 434, 20, 24662);
    			add_location(p111, file$a, 435, 20, 24730);
    			attr_dev(div78, "id", "ManagerSec");
    			attr_dev(div78, "class", "Sec5");
    			add_location(div78, file$a, 433, 16, 24607);
    			attr_dev(button86, "id", "MechanicBtn");
    			attr_dev(button86, "class", "Btn");
    			add_location(button86, file$a, 437, 16, 24798);
    			add_location(p112, file$a, 439, 20, 24925);
    			add_location(p113, file$a, 440, 20, 24988);
    			attr_dev(div79, "id", "MechanicSec");
    			attr_dev(div79, "class", "Sec5");
    			add_location(div79, file$a, 438, 16, 24869);
    			attr_dev(button87, "id", "MilitaryBtn");
    			attr_dev(button87, "class", "Btn");
    			add_location(button87, file$a, 442, 16, 25057);
    			add_location(p114, file$a, 444, 20, 25184);
    			add_location(p115, file$a, 445, 20, 25243);
    			attr_dev(div80, "id", "MilitarySec");
    			attr_dev(div80, "class", "Sec5");
    			add_location(div80, file$a, 443, 16, 25128);
    			attr_dev(button88, "id", "MusicianBtn");
    			attr_dev(button88, "class", "Btn");
    			add_location(button88, file$a, 447, 16, 25322);
    			add_location(p116, file$a, 449, 20, 25449);
    			add_location(p117, file$a, 450, 20, 25514);
    			attr_dev(div81, "id", "MusicianSec");
    			attr_dev(div81, "class", "Sec5");
    			add_location(div81, file$a, 448, 16, 25393);
    			attr_dev(button89, "id", "ParamedicBtn");
    			attr_dev(button89, "class", "Btn");
    			add_location(button89, file$a, 452, 16, 25590);
    			add_location(p118, file$a, 454, 20, 25720);
    			add_location(p119, file$a, 455, 20, 25786);
    			attr_dev(div82, "id", "ParamedicSec");
    			attr_dev(div82, "class", "Sec5");
    			add_location(div82, file$a, 453, 16, 25663);
    			attr_dev(button90, "id", "ParkRangerBtn");
    			attr_dev(button90, "class", "Btn");
    			add_location(button90, file$a, 457, 16, 25851);
    			add_location(p120, file$a, 459, 20, 25985);
    			add_location(p121, file$a, 460, 20, 26046);
    			attr_dev(div83, "id", "ParkRangerSec");
    			attr_dev(div83, "class", "Sec5");
    			add_location(div83, file$a, 458, 16, 25927);
    			attr_dev(button91, "id", "PharmacistBtn");
    			attr_dev(button91, "class", "Btn");
    			add_location(button91, file$a, 462, 16, 26114);
    			add_location(p122, file$a, 464, 20, 26247);
    			add_location(p123, file$a, 465, 20, 26312);
    			attr_dev(div84, "id", "PharmacistSec");
    			attr_dev(div84, "class", "Sec5");
    			add_location(div84, file$a, 463, 16, 26189);
    			attr_dev(button92, "id", "PilotBtn");
    			attr_dev(button92, "class", "Btn");
    			add_location(button92, file$a, 467, 16, 26378);
    			add_location(p124, file$a, 469, 20, 26496);
    			add_location(p125, file$a, 470, 20, 26569);
    			attr_dev(div85, "id", "PilotSec");
    			attr_dev(div85, "class", "Sec5");
    			add_location(div85, file$a, 468, 16, 26443);
    			attr_dev(button93, "id", "PrizeFighterBtn");
    			attr_dev(button93, "class", "Btn");
    			add_location(button93, file$a, 472, 16, 26653);
    			add_location(p126, file$a, 474, 20, 26793);
    			add_location(p127, file$a, 475, 20, 26854);
    			attr_dev(div86, "id", "PrizeFighterSec");
    			attr_dev(div86, "class", "Sec5");
    			add_location(div86, file$a, 473, 16, 26733);
    			attr_dev(button94, "id", "RidingInstructorBtn");
    			attr_dev(button94, "class", "Btn");
    			add_location(button94, file$a, 477, 16, 26926);
    			add_location(p128, file$a, 479, 20, 27078);
    			add_location(p129, file$a, 480, 20, 27135);
    			attr_dev(div87, "id", "RidingInstructorSec");
    			attr_dev(div87, "class", "Sec5");
    			add_location(div87, file$a, 478, 16, 27014);
    			attr_dev(button95, "id", "SecurityGuardBtn");
    			attr_dev(button95, "class", "Btn");
    			add_location(button95, file$a, 482, 16, 27203);
    			add_location(p130, file$a, 484, 20, 27346);
    			add_location(p131, file$a, 485, 20, 27405);
    			attr_dev(div88, "id", "SecurityGuardSec");
    			attr_dev(div88, "class", "Sec5");
    			add_location(div88, file$a, 483, 16, 27285);
    			attr_dev(button96, "id", "SurgeonBtn");
    			attr_dev(button96, "class", "Btn");
    			add_location(button96, file$a, 487, 16, 27468);
    			add_location(p132, file$a, 489, 20, 27592);
    			add_location(p133, file$a, 490, 20, 27656);
    			attr_dev(div89, "id", "SurgeonSec");
    			attr_dev(div89, "class", "Sec5");
    			add_location(div89, file$a, 488, 16, 27537);
    			attr_dev(button97, "id", "TaxiDriverBtn");
    			attr_dev(button97, "class", "Btn");
    			add_location(button97, file$a, 492, 16, 27725);
    			add_location(p134, file$a, 494, 20, 27859);
    			add_location(p135, file$a, 495, 20, 27918);
    			attr_dev(div90, "id", "TaxiDriverSec");
    			attr_dev(div90, "class", "Sec5");
    			add_location(div90, file$a, 493, 16, 27801);
    			attr_dev(button98, "id", "TechnicianBtn");
    			attr_dev(button98, "class", "Btn");
    			add_location(button98, file$a, 497, 16, 28005);
    			add_location(p136, file$a, 499, 20, 28138);
    			add_location(p137, file$a, 500, 20, 28199);
    			attr_dev(div91, "id", "TechnicianSec");
    			attr_dev(div91, "class", "Sec5");
    			add_location(div91, file$a, 498, 16, 28080);
    			attr_dev(button99, "id", "TeacherBtn");
    			attr_dev(button99, "class", "Btn");
    			add_location(button99, file$a, 502, 16, 28267);
    			add_location(p138, file$a, 504, 20, 28391);
    			add_location(p139, file$a, 505, 20, 28455);
    			attr_dev(div92, "id", "TeacherSec");
    			attr_dev(div92, "class", "Sec5");
    			add_location(div92, file$a, 503, 16, 28336);
    			attr_dev(button100, "id", "TherapistBtn");
    			attr_dev(button100, "class", "Btn");
    			add_location(button100, file$a, 507, 16, 28523);
    			add_location(p140, file$a, 509, 20, 28653);
    			add_location(p141, file$a, 510, 20, 28720);
    			attr_dev(div93, "id", "TherapistSec");
    			attr_dev(div93, "class", "Sec5");
    			add_location(div93, file$a, 508, 16, 28596);
    			attr_dev(button101, "id", "ThiefBtn");
    			attr_dev(button101, "class", "Btn");
    			add_location(button101, file$a, 512, 16, 28795);
    			add_location(p142, file$a, 514, 20, 28913);
    			add_location(p143, file$a, 515, 20, 28974);
    			attr_dev(div94, "id", "ThiefSec");
    			attr_dev(div94, "class", "Sec5");
    			add_location(div94, file$a, 513, 16, 28860);
    			attr_dev(button102, "id", "TruckerBtn");
    			attr_dev(button102, "class", "Btn");
    			add_location(button102, file$a, 517, 16, 29039);
    			add_location(p144, file$a, 519, 20, 29163);
    			add_location(p145, file$a, 520, 20, 29223);
    			attr_dev(div95, "id", "TruckerSec");
    			attr_dev(div95, "class", "Sec5");
    			add_location(div95, file$a, 518, 16, 29108);
    			attr_dev(button103, "id", "YogaInstructorBtn");
    			attr_dev(button103, "class", "Btn");
    			add_location(button103, file$a, 522, 16, 29290);
    			add_location(p146, file$a, 524, 20, 29436);
    			add_location(p147, file$a, 525, 20, 29500);
    			attr_dev(div96, "id", "YogaInstructorSec");
    			attr_dev(div96, "class", "Sec5");
    			add_location(div96, file$a, 523, 16, 29374);
    			attr_dev(button104, "id", "ZooKeeperBtn");
    			attr_dev(button104, "class", "Btn");
    			add_location(button104, file$a, 527, 16, 29570);
    			add_location(p148, file$a, 529, 20, 29701);
    			add_location(p149, file$a, 530, 20, 29758);
    			attr_dev(div97, "id", "ZooKeeperSec");
    			attr_dev(div97, "class", "Sec5");
    			add_location(div97, file$a, 528, 16, 29644);
    			attr_dev(div98, "id", "ProfessionSec");
    			attr_dev(div98, "class", "Sec4");
    			add_location(div98, file$a, 350, 12, 20086);
    			attr_dev(button105, "id", "RelationshipBtn");
    			attr_dev(button105, "class", "Btn");
    			add_location(button105, file$a, 533, 12, 29841);
    			add_location(p150, file$a, 535, 16, 29973);
    			add_location(li62, file$a, 537, 20, 30319);
    			add_location(li63, file$a, 538, 20, 30368);
    			add_location(li64, file$a, 539, 20, 30415);
    			add_location(li65, file$a, 540, 20, 30462);
    			add_location(li66, file$a, 541, 20, 30499);
    			add_location(li67, file$a, 542, 20, 30543);
    			add_location(li68, file$a, 543, 20, 30595);
    			add_location(li69, file$a, 544, 20, 30642);
    			add_location(li70, file$a, 545, 20, 30688);
    			add_location(li71, file$a, 546, 20, 30735);
    			add_location(li72, file$a, 547, 20, 30788);
    			add_location(li73, file$a, 548, 20, 30842);
    			add_location(li74, file$a, 549, 20, 30889);
    			add_location(li75, file$a, 550, 20, 30936);
    			add_location(li76, file$a, 551, 20, 30985);
    			add_location(li77, file$a, 552, 20, 31028);
    			add_location(li78, file$a, 553, 20, 31078);
    			add_location(li79, file$a, 554, 20, 31119);
    			add_location(ol1, file$a, 536, 16, 30294);
    			attr_dev(div99, "id", "RelationshipSec");
    			attr_dev(div99, "class", "Sec4");
    			add_location(div99, file$a, 534, 12, 29917);
    			attr_dev(div100, "id", "CharacterOptionsSec");
    			attr_dev(div100, "class", "Sec3");
    			add_location(div100, file$a, 89, 8, 5505);
    			attr_dev(div101, "id", "CharacterCreationSec");
    			attr_dev(div101, "class", "Sec2");
    			add_location(div101, file$a, 3, 4, 143);
    			attr_dev(div102, "class", "creation-rules");
    			add_location(div102, file$a, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div102, anchor);
    			append_dev(div102, h2);
    			append_dev(div102, t1);
    			append_dev(div102, button0);
    			append_dev(div102, t3);
    			append_dev(div102, div101);
    			append_dev(div101, button1);
    			append_dev(div101, t5);
    			append_dev(div101, div0);
    			append_dev(div0, p0);
    			append_dev(div101, t7);
    			append_dev(div101, button2);
    			append_dev(div101, t9);
    			append_dev(div101, div1);
    			append_dev(div1, p1);
    			append_dev(div1, t11);
    			append_dev(div1, ul0);
    			append_dev(ul0, li0);
    			append_dev(ul0, t13);
    			append_dev(ul0, li1);
    			append_dev(ul0, t15);
    			append_dev(ul0, li2);
    			append_dev(ul0, t17);
    			append_dev(ul0, li3);
    			append_dev(div101, t19);
    			append_dev(div101, button3);
    			append_dev(div101, t21);
    			append_dev(div101, div2);
    			append_dev(div2, p2);
    			append_dev(div2, t23);
    			append_dev(div2, ul1);
    			append_dev(ul1, li4);
    			append_dev(ul1, t25);
    			append_dev(ul1, li5);
    			append_dev(ul1, t27);
    			append_dev(ul1, li6);
    			append_dev(ul1, t29);
    			append_dev(ul1, li7);
    			append_dev(div101, t31);
    			append_dev(div101, button4);
    			append_dev(div101, t33);
    			append_dev(div101, div3);
    			append_dev(div3, p3);
    			append_dev(div3, t35);
    			append_dev(div3, ul4);
    			append_dev(ul4, li8);
    			append_dev(ul4, t37);
    			append_dev(ul4, li9);
    			append_dev(ul4, t39);
    			append_dev(ul4, li10);
    			append_dev(ul4, t41);
    			append_dev(ul4, li11);
    			append_dev(ul4, t43);
    			append_dev(ul4, li12);
    			append_dev(ul4, t45);
    			append_dev(ul4, li13);
    			append_dev(ul4, t47);
    			append_dev(ul4, li14);
    			append_dev(ul4, t49);
    			append_dev(ul4, li15);
    			append_dev(ul4, t51);
    			append_dev(ul4, li16);
    			append_dev(ul4, t53);
    			append_dev(ul4, li20);
    			append_dev(li20, ul2);
    			append_dev(ul2, li17);
    			append_dev(ul2, t55);
    			append_dev(ul2, li18);
    			append_dev(ul2, t57);
    			append_dev(ul2, li19);
    			append_dev(ul4, t59);
    			append_dev(ul4, li21);
    			append_dev(ul4, t61);
    			append_dev(ul4, li22);
    			append_dev(ul4, t63);
    			append_dev(ul4, li25);
    			append_dev(li25, ul3);
    			append_dev(ul3, li23);
    			append_dev(ul3, t65);
    			append_dev(ul3, li24);
    			append_dev(div101, t67);
    			append_dev(div101, button5);
    			append_dev(div101, t69);
    			append_dev(div101, div8);
    			append_dev(div8, p4);
    			append_dev(div8, t71);
    			append_dev(div8, button6);
    			append_dev(div8, t73);
    			append_dev(div8, div4);
    			append_dev(div4, button7);
    			append_dev(div4, t75);
    			append_dev(div4, p5);
    			append_dev(div8, t76);
    			append_dev(div8, button8);
    			append_dev(div8, t78);
    			append_dev(div8, div5);
    			append_dev(div5, button9);
    			append_dev(div5, t80);
    			append_dev(div5, p6);
    			append_dev(div8, t81);
    			append_dev(div8, button10);
    			append_dev(div8, t83);
    			append_dev(div8, div6);
    			append_dev(div6, button11);
    			append_dev(div6, t85);
    			append_dev(div6, p7);
    			append_dev(div8, t86);
    			append_dev(div8, button12);
    			append_dev(div8, t88);
    			append_dev(div8, div7);
    			append_dev(div7, p8);
    			append_dev(div7, t90);
    			append_dev(div7, p9);
    			append_dev(div7, t92);
    			append_dev(div7, button13);
    			append_dev(div7, t94);
    			append_dev(div7, p10);
    			append_dev(div101, t95);
    			append_dev(div101, button14);
    			append_dev(div101, t97);
    			append_dev(div101, div9);
    			append_dev(div9, p11);
    			append_dev(div101, t99);
    			append_dev(div101, button15);
    			append_dev(div101, t101);
    			append_dev(div101, div100);
    			append_dev(div100, p12);
    			append_dev(div100, t103);
    			append_dev(div100, button16);
    			append_dev(div100, t105);
    			append_dev(div100, div16);
    			append_dev(div16, p13);
    			append_dev(div16, t107);
    			append_dev(div16, button17);
    			append_dev(div16, t109);
    			append_dev(div16, div10);
    			append_dev(div10, p14);
    			append_dev(div10, t111);
    			append_dev(div10, p15);
    			append_dev(div16, t113);
    			append_dev(div16, button18);
    			append_dev(div16, t115);
    			append_dev(div16, div11);
    			append_dev(div11, p16);
    			append_dev(div11, t117);
    			append_dev(div11, p17);
    			append_dev(div16, t119);
    			append_dev(div16, button19);
    			append_dev(div16, t121);
    			append_dev(div16, div12);
    			append_dev(div12, p18);
    			append_dev(div12, t123);
    			append_dev(div12, p19);
    			append_dev(div16, t125);
    			append_dev(div16, button20);
    			append_dev(div16, t127);
    			append_dev(div16, div13);
    			append_dev(div13, p20);
    			append_dev(div13, t129);
    			append_dev(div13, p21);
    			append_dev(div16, t131);
    			append_dev(div16, button21);
    			append_dev(div16, t133);
    			append_dev(div16, div14);
    			append_dev(div14, p22);
    			append_dev(div14, t135);
    			append_dev(div14, p23);
    			append_dev(div16, t137);
    			append_dev(div16, button22);
    			append_dev(div16, t139);
    			append_dev(div16, div15);
    			append_dev(div15, p24);
    			append_dev(div15, t141);
    			append_dev(div15, p25);
    			append_dev(div100, t143);
    			append_dev(div100, button23);
    			append_dev(div100, t145);
    			append_dev(div100, div23);
    			append_dev(div23, p26);
    			append_dev(div23, t147);
    			append_dev(div23, button24);
    			append_dev(div23, t149);
    			append_dev(div23, div17);
    			append_dev(div17, p27);
    			append_dev(div17, t151);
    			append_dev(div17, p28);
    			append_dev(div23, t153);
    			append_dev(div23, button25);
    			append_dev(div23, t155);
    			append_dev(div23, div18);
    			append_dev(div18, p29);
    			append_dev(div18, t157);
    			append_dev(div18, p30);
    			append_dev(div23, t159);
    			append_dev(div23, button26);
    			append_dev(div23, t161);
    			append_dev(div23, div19);
    			append_dev(div19, p31);
    			append_dev(div19, t163);
    			append_dev(div19, p32);
    			append_dev(div23, t165);
    			append_dev(div23, button27);
    			append_dev(div23, t167);
    			append_dev(div23, div20);
    			append_dev(div20, p33);
    			append_dev(div20, t169);
    			append_dev(div20, p34);
    			append_dev(div23, t171);
    			append_dev(div23, button28);
    			append_dev(div23, t173);
    			append_dev(div23, div21);
    			append_dev(div21, p35);
    			append_dev(div21, t175);
    			append_dev(div21, p36);
    			append_dev(div23, t177);
    			append_dev(div23, button29);
    			append_dev(div23, t179);
    			append_dev(div23, div22);
    			append_dev(div22, p37);
    			append_dev(div22, t181);
    			append_dev(div22, p38);
    			append_dev(div100, t183);
    			append_dev(div100, button30);
    			append_dev(div100, t185);
    			append_dev(div100, div60);
    			append_dev(div60, p39);
    			append_dev(div60, t187);
    			append_dev(div60, button31);
    			append_dev(div60, t189);
    			append_dev(div60, div24);
    			append_dev(div24, p40);
    			append_dev(div60, t191);
    			append_dev(div60, button32);
    			append_dev(div60, t193);
    			append_dev(div60, div25);
    			append_dev(div25, p41);
    			append_dev(div60, t195);
    			append_dev(div60, button33);
    			append_dev(div60, t197);
    			append_dev(div60, div26);
    			append_dev(div26, p42);
    			append_dev(div60, t199);
    			append_dev(div60, button34);
    			append_dev(div60, t201);
    			append_dev(div60, div27);
    			append_dev(div27, p43);
    			append_dev(div60, t203);
    			append_dev(div60, button35);
    			append_dev(div60, t205);
    			append_dev(div60, div28);
    			append_dev(div28, p44);
    			append_dev(div60, t207);
    			append_dev(div60, button36);
    			append_dev(div60, t209);
    			append_dev(div60, div29);
    			append_dev(div29, p45);
    			append_dev(div60, t211);
    			append_dev(div60, button37);
    			append_dev(div60, t213);
    			append_dev(div60, div30);
    			append_dev(div30, p46);
    			append_dev(div60, t215);
    			append_dev(div60, button38);
    			append_dev(div60, t217);
    			append_dev(div60, div31);
    			append_dev(div31, p47);
    			append_dev(div60, t219);
    			append_dev(div60, button39);
    			append_dev(div60, t221);
    			append_dev(div60, div32);
    			append_dev(div32, p48);
    			append_dev(div60, t223);
    			append_dev(div60, button40);
    			append_dev(div60, t225);
    			append_dev(div60, div33);
    			append_dev(div33, p49);
    			append_dev(div60, t227);
    			append_dev(div60, button41);
    			append_dev(div60, t229);
    			append_dev(div60, div34);
    			append_dev(div34, p50);
    			append_dev(div60, t231);
    			append_dev(div60, button42);
    			append_dev(div60, t233);
    			append_dev(div60, div35);
    			append_dev(div35, p51);
    			append_dev(div60, t235);
    			append_dev(div60, button43);
    			append_dev(div60, t237);
    			append_dev(div60, div36);
    			append_dev(div36, p52);
    			append_dev(div60, t239);
    			append_dev(div60, button44);
    			append_dev(div60, t241);
    			append_dev(div60, div37);
    			append_dev(div37, p53);
    			append_dev(div60, t243);
    			append_dev(div60, button45);
    			append_dev(div60, t245);
    			append_dev(div60, div38);
    			append_dev(div38, p54);
    			append_dev(div60, t247);
    			append_dev(div60, button46);
    			append_dev(div60, t249);
    			append_dev(div60, div39);
    			append_dev(div39, p55);
    			append_dev(div60, t251);
    			append_dev(div60, button47);
    			append_dev(div60, t253);
    			append_dev(div60, div40);
    			append_dev(div40, p56);
    			append_dev(div60, t255);
    			append_dev(div60, button48);
    			append_dev(div60, t257);
    			append_dev(div60, div41);
    			append_dev(div41, p57);
    			append_dev(div60, t259);
    			append_dev(div60, button49);
    			append_dev(div60, t261);
    			append_dev(div60, div42);
    			append_dev(div42, p58);
    			append_dev(div60, t263);
    			append_dev(div60, button50);
    			append_dev(div60, t265);
    			append_dev(div60, div43);
    			append_dev(div43, p59);
    			append_dev(div60, t267);
    			append_dev(div60, button51);
    			append_dev(div60, t269);
    			append_dev(div60, div44);
    			append_dev(div44, p60);
    			append_dev(div60, t271);
    			append_dev(div60, button52);
    			append_dev(div60, t273);
    			append_dev(div60, div45);
    			append_dev(div45, p61);
    			append_dev(div60, t275);
    			append_dev(div60, button53);
    			append_dev(div60, t277);
    			append_dev(div60, div46);
    			append_dev(div46, p62);
    			append_dev(div60, t279);
    			append_dev(div60, button54);
    			append_dev(div60, t281);
    			append_dev(div60, div47);
    			append_dev(div47, p63);
    			append_dev(div60, t283);
    			append_dev(div60, button55);
    			append_dev(div60, t285);
    			append_dev(div60, div48);
    			append_dev(div48, p64);
    			append_dev(div60, t287);
    			append_dev(div60, button56);
    			append_dev(div60, t289);
    			append_dev(div60, div49);
    			append_dev(div49, p65);
    			append_dev(div60, t291);
    			append_dev(div60, button57);
    			append_dev(div60, t293);
    			append_dev(div60, div50);
    			append_dev(div50, p66);
    			append_dev(div60, t295);
    			append_dev(div60, button58);
    			append_dev(div60, t297);
    			append_dev(div60, div51);
    			append_dev(div51, p67);
    			append_dev(div60, t299);
    			append_dev(div60, button59);
    			append_dev(div60, t301);
    			append_dev(div60, div52);
    			append_dev(div52, p68);
    			append_dev(div60, t303);
    			append_dev(div60, button60);
    			append_dev(div60, t305);
    			append_dev(div60, div53);
    			append_dev(div53, p69);
    			append_dev(div60, t307);
    			append_dev(div60, button61);
    			append_dev(div60, t309);
    			append_dev(div60, div54);
    			append_dev(div54, p70);
    			append_dev(div60, t311);
    			append_dev(div60, button62);
    			append_dev(div60, t313);
    			append_dev(div60, div55);
    			append_dev(div55, p71);
    			append_dev(div60, t315);
    			append_dev(div60, button63);
    			append_dev(div60, t317);
    			append_dev(div60, div56);
    			append_dev(div56, p72);
    			append_dev(div60, t319);
    			append_dev(div60, button64);
    			append_dev(div60, t321);
    			append_dev(div60, div57);
    			append_dev(div57, p73);
    			append_dev(div60, t323);
    			append_dev(div60, button65);
    			append_dev(div60, t325);
    			append_dev(div60, div58);
    			append_dev(div58, p74);
    			append_dev(div60, t327);
    			append_dev(div60, button66);
    			append_dev(div60, t329);
    			append_dev(div60, div59);
    			append_dev(div59, p75);
    			append_dev(div100, t331);
    			append_dev(div100, button67);
    			append_dev(div100, t333);
    			append_dev(div100, div61);
    			append_dev(div61, p76);
    			append_dev(div61, t335);
    			append_dev(div61, ol0);
    			append_dev(ol0, li26);
    			append_dev(ol0, t337);
    			append_dev(ol0, li27);
    			append_dev(ol0, t339);
    			append_dev(ol0, li28);
    			append_dev(ol0, t341);
    			append_dev(ol0, li29);
    			append_dev(ol0, t343);
    			append_dev(ol0, li30);
    			append_dev(ol0, t345);
    			append_dev(ol0, li31);
    			append_dev(ol0, t347);
    			append_dev(ol0, li32);
    			append_dev(ol0, t349);
    			append_dev(ol0, li33);
    			append_dev(ol0, t351);
    			append_dev(ol0, li34);
    			append_dev(ol0, t353);
    			append_dev(ol0, li35);
    			append_dev(ol0, t355);
    			append_dev(ol0, li36);
    			append_dev(ol0, t357);
    			append_dev(ol0, li37);
    			append_dev(ol0, t359);
    			append_dev(ol0, li38);
    			append_dev(ol0, t361);
    			append_dev(ol0, li39);
    			append_dev(ol0, t363);
    			append_dev(ol0, li40);
    			append_dev(ol0, t365);
    			append_dev(ol0, li41);
    			append_dev(ol0, t367);
    			append_dev(ol0, li42);
    			append_dev(ol0, t369);
    			append_dev(ol0, li43);
    			append_dev(ol0, t371);
    			append_dev(ol0, li44);
    			append_dev(ol0, t373);
    			append_dev(ol0, li45);
    			append_dev(ol0, t375);
    			append_dev(ol0, li46);
    			append_dev(ol0, t377);
    			append_dev(ol0, li47);
    			append_dev(ol0, t379);
    			append_dev(ol0, li48);
    			append_dev(ol0, t381);
    			append_dev(ol0, li49);
    			append_dev(ol0, t383);
    			append_dev(ol0, li50);
    			append_dev(ol0, t385);
    			append_dev(ol0, li51);
    			append_dev(ol0, t387);
    			append_dev(ol0, li52);
    			append_dev(ol0, t389);
    			append_dev(ol0, li53);
    			append_dev(ol0, t391);
    			append_dev(ol0, li54);
    			append_dev(ol0, t393);
    			append_dev(ol0, li55);
    			append_dev(ol0, t395);
    			append_dev(ol0, li56);
    			append_dev(ol0, t397);
    			append_dev(ol0, li57);
    			append_dev(ol0, t399);
    			append_dev(ol0, li58);
    			append_dev(ol0, t401);
    			append_dev(ol0, li59);
    			append_dev(ol0, t403);
    			append_dev(ol0, li60);
    			append_dev(ol0, t405);
    			append_dev(ol0, li61);
    			append_dev(div100, t407);
    			append_dev(div100, button68);
    			append_dev(div100, t409);
    			append_dev(div100, div98);
    			append_dev(div98, p77);
    			append_dev(div98, t411);
    			append_dev(div98, button69);
    			append_dev(div98, t413);
    			append_dev(div98, div62);
    			append_dev(div62, p78);
    			append_dev(div62, t415);
    			append_dev(div62, p79);
    			append_dev(div98, t417);
    			append_dev(div98, button70);
    			append_dev(div98, t419);
    			append_dev(div98, div63);
    			append_dev(div63, p80);
    			append_dev(div63, t421);
    			append_dev(div63, p81);
    			append_dev(div98, t423);
    			append_dev(div98, button71);
    			append_dev(div98, t425);
    			append_dev(div98, div64);
    			append_dev(div64, p82);
    			append_dev(div64, t427);
    			append_dev(div64, p83);
    			append_dev(div98, t429);
    			append_dev(div98, button72);
    			append_dev(div98, t431);
    			append_dev(div98, div65);
    			append_dev(div65, p84);
    			append_dev(div65, t433);
    			append_dev(div65, p85);
    			append_dev(div98, t435);
    			append_dev(div98, button73);
    			append_dev(div98, t437);
    			append_dev(div98, div66);
    			append_dev(div66, p86);
    			append_dev(div66, t439);
    			append_dev(div66, p87);
    			append_dev(div98, t441);
    			append_dev(div98, button74);
    			append_dev(div98, t443);
    			append_dev(div98, div67);
    			append_dev(div67, p88);
    			append_dev(div67, t445);
    			append_dev(div67, p89);
    			append_dev(div98, t447);
    			append_dev(div98, button75);
    			append_dev(div98, t449);
    			append_dev(div98, div68);
    			append_dev(div68, p90);
    			append_dev(div68, t451);
    			append_dev(div68, p91);
    			append_dev(div98, t453);
    			append_dev(div98, button76);
    			append_dev(div98, t455);
    			append_dev(div98, div69);
    			append_dev(div69, p92);
    			append_dev(div69, t457);
    			append_dev(div69, p93);
    			append_dev(div98, t459);
    			append_dev(div98, button77);
    			append_dev(div98, t461);
    			append_dev(div98, div70);
    			append_dev(div70, p94);
    			append_dev(div70, t463);
    			append_dev(div70, p95);
    			append_dev(div98, t465);
    			append_dev(div98, button78);
    			append_dev(div98, t467);
    			append_dev(div98, div71);
    			append_dev(div71, p96);
    			append_dev(div71, t469);
    			append_dev(div71, p97);
    			append_dev(div98, t471);
    			append_dev(div98, button79);
    			append_dev(div98, t473);
    			append_dev(div98, div72);
    			append_dev(div72, p98);
    			append_dev(div72, t475);
    			append_dev(div72, p99);
    			append_dev(div98, t477);
    			append_dev(div98, button80);
    			append_dev(div98, t479);
    			append_dev(div98, div73);
    			append_dev(div73, p100);
    			append_dev(div73, t481);
    			append_dev(div73, p101);
    			append_dev(div98, t483);
    			append_dev(div98, button81);
    			append_dev(div98, t485);
    			append_dev(div98, div74);
    			append_dev(div74, p102);
    			append_dev(div74, t487);
    			append_dev(div74, p103);
    			append_dev(div98, t489);
    			append_dev(div98, button82);
    			append_dev(div98, t491);
    			append_dev(div98, div75);
    			append_dev(div75, p104);
    			append_dev(div75, t493);
    			append_dev(div75, p105);
    			append_dev(div98, t495);
    			append_dev(div98, button83);
    			append_dev(div98, t497);
    			append_dev(div98, div76);
    			append_dev(div76, p106);
    			append_dev(div76, t499);
    			append_dev(div76, p107);
    			append_dev(div98, t501);
    			append_dev(div98, button84);
    			append_dev(div98, t503);
    			append_dev(div98, div77);
    			append_dev(div77, p108);
    			append_dev(div77, t505);
    			append_dev(div77, p109);
    			append_dev(div98, t507);
    			append_dev(div98, button85);
    			append_dev(div98, t509);
    			append_dev(div98, div78);
    			append_dev(div78, p110);
    			append_dev(div78, t511);
    			append_dev(div78, p111);
    			append_dev(div98, t513);
    			append_dev(div98, button86);
    			append_dev(div98, t515);
    			append_dev(div98, div79);
    			append_dev(div79, p112);
    			append_dev(div79, t517);
    			append_dev(div79, p113);
    			append_dev(div98, t519);
    			append_dev(div98, button87);
    			append_dev(div98, t521);
    			append_dev(div98, div80);
    			append_dev(div80, p114);
    			append_dev(div80, t523);
    			append_dev(div80, p115);
    			append_dev(div98, t525);
    			append_dev(div98, button88);
    			append_dev(div98, t527);
    			append_dev(div98, div81);
    			append_dev(div81, p116);
    			append_dev(div81, t529);
    			append_dev(div81, p117);
    			append_dev(div98, t531);
    			append_dev(div98, button89);
    			append_dev(div98, t533);
    			append_dev(div98, div82);
    			append_dev(div82, p118);
    			append_dev(div82, t535);
    			append_dev(div82, p119);
    			append_dev(div98, t537);
    			append_dev(div98, button90);
    			append_dev(div98, t539);
    			append_dev(div98, div83);
    			append_dev(div83, p120);
    			append_dev(div83, t541);
    			append_dev(div83, p121);
    			append_dev(div98, t543);
    			append_dev(div98, button91);
    			append_dev(div98, t545);
    			append_dev(div98, div84);
    			append_dev(div84, p122);
    			append_dev(div84, t547);
    			append_dev(div84, p123);
    			append_dev(div98, t549);
    			append_dev(div98, button92);
    			append_dev(div98, t551);
    			append_dev(div98, div85);
    			append_dev(div85, p124);
    			append_dev(div85, t553);
    			append_dev(div85, p125);
    			append_dev(div98, t555);
    			append_dev(div98, button93);
    			append_dev(div98, t557);
    			append_dev(div98, div86);
    			append_dev(div86, p126);
    			append_dev(div86, t559);
    			append_dev(div86, p127);
    			append_dev(div98, t561);
    			append_dev(div98, button94);
    			append_dev(div98, t563);
    			append_dev(div98, div87);
    			append_dev(div87, p128);
    			append_dev(div87, t565);
    			append_dev(div87, p129);
    			append_dev(div98, t567);
    			append_dev(div98, button95);
    			append_dev(div98, t569);
    			append_dev(div98, div88);
    			append_dev(div88, p130);
    			append_dev(div88, t571);
    			append_dev(div88, p131);
    			append_dev(div98, t573);
    			append_dev(div98, button96);
    			append_dev(div98, t575);
    			append_dev(div98, div89);
    			append_dev(div89, p132);
    			append_dev(div89, t577);
    			append_dev(div89, p133);
    			append_dev(div98, t579);
    			append_dev(div98, button97);
    			append_dev(div98, t581);
    			append_dev(div98, div90);
    			append_dev(div90, p134);
    			append_dev(div90, t583);
    			append_dev(div90, p135);
    			append_dev(div98, t585);
    			append_dev(div98, button98);
    			append_dev(div98, t587);
    			append_dev(div98, div91);
    			append_dev(div91, p136);
    			append_dev(div91, t589);
    			append_dev(div91, p137);
    			append_dev(div98, t591);
    			append_dev(div98, button99);
    			append_dev(div98, t593);
    			append_dev(div98, div92);
    			append_dev(div92, p138);
    			append_dev(div92, t595);
    			append_dev(div92, p139);
    			append_dev(div98, t597);
    			append_dev(div98, button100);
    			append_dev(div98, t599);
    			append_dev(div98, div93);
    			append_dev(div93, p140);
    			append_dev(div93, t601);
    			append_dev(div93, p141);
    			append_dev(div98, t603);
    			append_dev(div98, button101);
    			append_dev(div98, t605);
    			append_dev(div98, div94);
    			append_dev(div94, p142);
    			append_dev(div94, t607);
    			append_dev(div94, p143);
    			append_dev(div98, t609);
    			append_dev(div98, button102);
    			append_dev(div98, t611);
    			append_dev(div98, div95);
    			append_dev(div95, p144);
    			append_dev(div95, t613);
    			append_dev(div95, p145);
    			append_dev(div98, t615);
    			append_dev(div98, button103);
    			append_dev(div98, t617);
    			append_dev(div98, div96);
    			append_dev(div96, p146);
    			append_dev(div96, t619);
    			append_dev(div96, p147);
    			append_dev(div98, t621);
    			append_dev(div98, button104);
    			append_dev(div98, t623);
    			append_dev(div98, div97);
    			append_dev(div97, p148);
    			append_dev(div97, t625);
    			append_dev(div97, p149);
    			append_dev(div100, t627);
    			append_dev(div100, button105);
    			append_dev(div100, t629);
    			append_dev(div100, div99);
    			append_dev(div99, p150);
    			append_dev(div99, t631);
    			append_dev(div99, ol1);
    			append_dev(ol1, li62);
    			append_dev(ol1, t633);
    			append_dev(ol1, li63);
    			append_dev(ol1, t635);
    			append_dev(ol1, li64);
    			append_dev(ol1, t637);
    			append_dev(ol1, li65);
    			append_dev(ol1, t639);
    			append_dev(ol1, li66);
    			append_dev(ol1, t641);
    			append_dev(ol1, li67);
    			append_dev(ol1, t643);
    			append_dev(ol1, li68);
    			append_dev(ol1, t645);
    			append_dev(ol1, li69);
    			append_dev(ol1, t647);
    			append_dev(ol1, li70);
    			append_dev(ol1, t649);
    			append_dev(ol1, li71);
    			append_dev(ol1, t651);
    			append_dev(ol1, li72);
    			append_dev(ol1, t653);
    			append_dev(ol1, li73);
    			append_dev(ol1, t655);
    			append_dev(ol1, li74);
    			append_dev(ol1, t657);
    			append_dev(ol1, li75);
    			append_dev(ol1, t659);
    			append_dev(ol1, li76);
    			append_dev(ol1, t661);
    			append_dev(ol1, li77);
    			append_dev(ol1, t663);
    			append_dev(ol1, li78);
    			append_dev(ol1, t665);
    			append_dev(ol1, li79);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div102);
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

    class Creation extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Creation",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* src/components/rules/Dice.svelte generated by Svelte v3.15.0 */

    const file$b = "src/components/rules/Dice.svelte";

    function create_fragment$e(ctx) {
    	let div6;
    	let h2;
    	let t1;
    	let div5;
    	let p0;
    	let t3;
    	let p1;
    	let t5;
    	let p2;
    	let t7;
    	let p3;
    	let t9;
    	let p4;
    	let t11;
    	let button0;
    	let t13;
    	let div0;
    	let p5;
    	let t15;
    	let button1;
    	let t17;
    	let div1;
    	let p6;
    	let t19;
    	let p7;
    	let span0;
    	let t21;
    	let t22;
    	let p8;
    	let span1;
    	let t24;
    	let t25;
    	let button2;
    	let t27;
    	let div2;
    	let p9;
    	let t29;
    	let button3;
    	let t31;
    	let div3;
    	let p10;
    	let t33;
    	let p11;
    	let t35;
    	let p12;
    	let t37;
    	let button4;
    	let t39;
    	let div4;
    	let p13;

    	const block = {
    		c: function create() {
    			div6 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Dice Rules";
    			t1 = space();
    			div5 = element("div");
    			p0 = element("p");
    			p0.textContent = "When a Player wants their Character to attempt a difficult task, dice are used to decide a fair outcome. Players should think fast and give brief descriptions to maintain the survival-horror atmosphere. If a Player takes too long, the GN should skip them.";
    			t3 = space();
    			p1 = element("p");
    			p1.textContent = "Players should also keep in mind that they are members of a Team. Taking advantage of the mechanics that allow cooperative play will increase the Characters' chances of survival. This empowers the Team to be much greater collectively than the sum of its parts.";
    			t5 = space();
    			p2 = element("p");
    			p2.textContent = "Most rolls are made using just one six-sided die (“d6”). The way you calculate the Result of a d6 roll is as follows:";
    			t7 = space();
    			p3 = element("p");
    			p3.textContent = "[d6 roll + (Trait, Instinct, or Skill) + modifiers = Result]";
    			t9 = space();
    			p4 = element("p");
    			p4.textContent = "When rolling on a table d66 or d666 is often used. This means you must roll two or three d6s, one for each number column.";
    			t11 = space();
    			button0 = element("button");
    			button0.textContent = "DIFFICULTY (#):";
    			t13 = space();
    			div0 = element("div");
    			p5 = element("p");
    			p5.textContent = "This is how hard it is to perform a task. The Result of your die roll must equal or exceed this number in order to be successful. Difficulty numbers are indicated with the # symbol. The GN sets the # and gives modifiers when appropriate. The players add their relevant modifiers to their roll to get a Result. If a roll is opposed by another roll, re-roll any ties.";
    			t15 = space();
    			button1 = element("button");
    			button1.textContent = "SUCCESS (S):";
    			t17 = space();
    			div1 = element("div");
    			p6 = element("p");
    			p6.textContent = "Achieving a result that meets or beats a Difficulty (#) is called a Success. Re-roll any ties if making an opposed roll. Players are responsible for keeping track of any ongoing modifiers (bonuses and penalties) that are affecting their Character’s ability to perform actions.";
    			t19 = space();
    			p7 = element("p");
    			span0 = element("span");
    			span0.textContent = "Automatic Success:";
    			t21 = text(" If your bonus alone is greater than the # and circumstances are calm, you Succeed without rolling.");
    			t22 = space();
    			p8 = element("p");
    			span1 = element("span");
    			span1.textContent = "Cooperation:";
    			t24 = text(" If Characters want to help each other perform a task, they all roll at once but only the best roll is used, unless someone Botches (see below) in which case the Botch is used.");
    			t25 = space();
    			button2 = element("button");
    			button2.textContent = "FAIL (F):";
    			t27 = space();
    			div2 = element("div");
    			p9 = element("p");
    			p9.textContent = "When the result is  less than the #, your attempt did not work. This usually is not catastrophic but rather just a temporary inconvenience.";
    			t29 = space();
    			button3 = element("button");
    			button3.textContent = "EXPLODE (6):";
    			t31 = space();
    			div3 = element("div");
    			p10 = element("p");
    			p10.textContent = "When 6 comes up on a d6 roll, roll it again and again as long as 6's continue. This is called Exploding. Add each roll together, then add modifiers to get your Result.";
    			t33 = space();
    			p11 = element("p");
    			p11.textContent = "For example, if your ATK roll is 6, then another 6, then a 1, your ATK result will be 13 + your Skill (say 3) + bonuses (say +1) for a Result of 17. This ATK will hit an enemy with a DEF 16 or less.";
    			t35 = space();
    			p12 = element("p");
    			p12.textContent = "You get a bonus to DMG equal to the amount by which your ATK exceeds the target’s DEF. So on a Successful attack, DMG = Weapon DMG + (ATK – DEF). See Ch:2 for Combat.";
    			t37 = space();
    			button4 = element("button");
    			button4.textContent = "BOTCH (1):";
    			t39 = space();
    			div4 = element("div");
    			p13 = element("p");
    			p13.textContent = "If you roll 1, re-roll to check for a Botch. If 1 is rolled again, you Fail very badly. Any other roll just means you have a 1 plus whatever other modifiers apply to that roll. You do not Botch on Exploding rolls. Skills usually list their Botch effects. The GN may add more negative effects depending on the circumstances around the Botch. Every time you Botch, you get +1XP.";
    			add_location(h2, file$b, 1, 4, 29);
    			add_location(p0, file$b, 3, 8, 98);
    			add_location(p1, file$b, 4, 8, 369);
    			add_location(p2, file$b, 5, 8, 645);
    			add_location(p3, file$b, 6, 8, 778);
    			add_location(p4, file$b, 7, 8, 854);
    			attr_dev(button0, "id", "DifficultyBtn");
    			attr_dev(button0, "class", "Btn");
    			add_location(button0, file$b, 8, 8, 991);
    			add_location(p5, file$b, 10, 12, 1113);
    			attr_dev(div0, "id", "DifficultySec");
    			attr_dev(div0, "class", "Sec3");
    			add_location(div0, file$b, 9, 8, 1063);
    			attr_dev(button1, "id", "SuccessBtn");
    			attr_dev(button1, "class", "Btn");
    			add_location(button1, file$b, 12, 8, 1509);
    			add_location(p6, file$b, 14, 12, 1622);
    			attr_dev(span0, "class", "Heading2");
    			add_location(span0, file$b, 15, 15, 1921);
    			add_location(p7, file$b, 15, 12, 1918);
    			attr_dev(span1, "class", "Heading2");
    			add_location(span1, file$b, 16, 15, 2088);
    			add_location(p8, file$b, 16, 12, 2085);
    			attr_dev(div1, "id", "SuccessSec");
    			attr_dev(div1, "class", "Sec3");
    			add_location(div1, file$b, 13, 8, 1575);
    			attr_dev(button2, "id", "FailBtn");
    			attr_dev(button2, "class", "Btn");
    			add_location(button2, file$b, 18, 8, 2334);
    			add_location(p9, file$b, 20, 12, 2438);
    			attr_dev(div2, "id", "FailSec");
    			attr_dev(div2, "class", "Sec3");
    			add_location(div2, file$b, 19, 8, 2394);
    			attr_dev(button3, "id", "ExplodeBtn");
    			attr_dev(button3, "class", "Btn");
    			add_location(button3, file$b, 22, 8, 2608);
    			add_location(p10, file$b, 24, 12, 2721);
    			add_location(p11, file$b, 25, 12, 2908);
    			add_location(p12, file$b, 26, 12, 3126);
    			attr_dev(div3, "id", "ExplodeSec");
    			attr_dev(div3, "class", "Sec3");
    			add_location(div3, file$b, 23, 8, 2674);
    			attr_dev(button4, "id", "BotchBtn");
    			attr_dev(button4, "class", "Btn");
    			add_location(button4, file$b, 28, 8, 3323);
    			add_location(p13, file$b, 30, 12, 3430);
    			attr_dev(div4, "id", "BotchSec");
    			attr_dev(div4, "class", "Sec3");
    			add_location(div4, file$b, 29, 8, 3385);
    			attr_dev(div5, "id", "DiceRulesSec");
    			attr_dev(div5, "class", "Sec2");
    			add_location(div5, file$b, 2, 4, 53);
    			attr_dev(div6, "class", "dice-rules");
    			add_location(div6, file$b, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div6, anchor);
    			append_dev(div6, h2);
    			append_dev(div6, t1);
    			append_dev(div6, div5);
    			append_dev(div5, p0);
    			append_dev(div5, t3);
    			append_dev(div5, p1);
    			append_dev(div5, t5);
    			append_dev(div5, p2);
    			append_dev(div5, t7);
    			append_dev(div5, p3);
    			append_dev(div5, t9);
    			append_dev(div5, p4);
    			append_dev(div5, t11);
    			append_dev(div5, button0);
    			append_dev(div5, t13);
    			append_dev(div5, div0);
    			append_dev(div0, p5);
    			append_dev(div5, t15);
    			append_dev(div5, button1);
    			append_dev(div5, t17);
    			append_dev(div5, div1);
    			append_dev(div1, p6);
    			append_dev(div1, t19);
    			append_dev(div1, p7);
    			append_dev(p7, span0);
    			append_dev(p7, t21);
    			append_dev(div1, t22);
    			append_dev(div1, p8);
    			append_dev(p8, span1);
    			append_dev(p8, t24);
    			append_dev(div5, t25);
    			append_dev(div5, button2);
    			append_dev(div5, t27);
    			append_dev(div5, div2);
    			append_dev(div2, p9);
    			append_dev(div5, t29);
    			append_dev(div5, button3);
    			append_dev(div5, t31);
    			append_dev(div5, div3);
    			append_dev(div3, p10);
    			append_dev(div3, t33);
    			append_dev(div3, p11);
    			append_dev(div3, t35);
    			append_dev(div3, p12);
    			append_dev(div5, t37);
    			append_dev(div5, button4);
    			append_dev(div5, t39);
    			append_dev(div5, div4);
    			append_dev(div4, p13);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div6);
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

    class Dice extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$e, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Dice",
    			options,
    			id: create_fragment$e.name
    		});
    	}
    }

    /* src/components/rules/Maneuvers.svelte generated by Svelte v3.15.0 */

    const file$c = "src/components/rules/Maneuvers.svelte";

    function create_fragment$f(ctx) {
    	let div26;
    	let h2;
    	let t1;
    	let button0;
    	let t3;
    	let div25;
    	let p0;
    	let t5;
    	let p1;
    	let t7;
    	let button1;
    	let t9;
    	let div9;
    	let button2;
    	let t11;
    	let div0;
    	let p2;
    	let t13;
    	let button3;
    	let t15;
    	let div1;
    	let p3;
    	let t17;
    	let button4;
    	let t19;
    	let div2;
    	let p4;
    	let t21;
    	let button5;
    	let t23;
    	let div3;
    	let p5;
    	let t25;
    	let button6;
    	let t27;
    	let div4;
    	let p6;
    	let t29;
    	let button7;
    	let t31;
    	let div5;
    	let p7;
    	let t33;
    	let button8;
    	let t35;
    	let div6;
    	let p8;
    	let t37;
    	let button9;
    	let t39;
    	let div7;
    	let p9;
    	let t41;
    	let button10;
    	let t43;
    	let div8;
    	let p10;
    	let t45;
    	let button11;
    	let t47;
    	let div24;
    	let button12;
    	let t49;
    	let div10;
    	let p11;
    	let t51;
    	let button13;
    	let t53;
    	let div11;
    	let p12;
    	let t55;
    	let button14;
    	let t57;
    	let div14;
    	let p13;
    	let t59;
    	let p14;
    	let t61;
    	let p15;
    	let t63;
    	let button15;
    	let t65;
    	let div12;
    	let p16;
    	let t67;
    	let button16;
    	let t69;
    	let div13;
    	let p17;
    	let t71;
    	let button17;
    	let t73;
    	let div15;
    	let p18;
    	let t75;
    	let button18;
    	let t77;
    	let div20;
    	let p19;
    	let t79;
    	let button19;
    	let t81;
    	let div16;
    	let p20;
    	let t83;
    	let button20;
    	let t85;
    	let div17;
    	let p21;
    	let t87;
    	let button21;
    	let t89;
    	let div18;
    	let p22;
    	let t91;
    	let button22;
    	let t93;
    	let div19;
    	let p23;
    	let t95;
    	let button23;
    	let t97;
    	let div21;
    	let p24;
    	let t99;
    	let button24;
    	let t101;
    	let div22;
    	let p25;
    	let t103;
    	let button25;
    	let t105;
    	let div23;
    	let p26;

    	const block = {
    		c: function create() {
    			div26 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Maneuvers";
    			t1 = space();
    			button0 = element("button");
    			button0.textContent = "MANEUVERS";
    			t3 = space();
    			div25 = element("div");
    			p0 = element("p");
    			p0.textContent = "These are special combat actions that allow for more creative and detailed combat options than a basic MATK or RATK. The GN may allow Maneuvers to be performed together in combination.";
    			t5 = space();
    			p1 = element("p");
    			p1.textContent = "# = Difficulty.  MATK = Melee.  RATK = Ranged.  DEF = Defense.";
    			t7 = space();
    			button1 = element("button");
    			button1.textContent = "DEFENSIVE MANEUVERS";
    			t9 = space();
    			div9 = element("div");
    			button2 = element("button");
    			button2.textContent = "BLOCK";
    			t11 = space();
    			div0 = element("div");
    			p2 = element("p");
    			p2.textContent = "Melee roll vs ATK. This is your DEF for that ATK. You cannot normally Block Guns unless you use a Shield for Cover. This counts as a Fast action for the rnd.";
    			t13 = space();
    			button3 = element("button");
    			button3.textContent = "DISTRACT";
    			t15 = space();
    			div1 = element("div");
    			p3 = element("p");
    			p3.textContent = "To divert an opponent's attention, roll Entertain(Distract) vs Perception. The opponent uses Reflex for DEF for 1rnd. Botch = fall Prone.";
    			t17 = space();
    			button4 = element("button");
    			button4.textContent = "DODGE";
    			t19 = space();
    			div2 = element("div");
    			p4 = element("p");
    			p4.textContent = "Acrobatics roll vs ATK. This is your DEF for that ATK. This counts as a Fast action for the rnd.";
    			t21 = space();
    			button5 = element("button");
    			button5.textContent = "DUCK";
    			t23 = space();
    			div3 = element("div");
    			p5 = element("p");
    			p5.textContent = "Fast. Take Cover. Material’s DR reduces DMG. See Cover in SITUATIONS.";
    			t25 = space();
    			button6 = element("button");
    			button6.textContent = "FULL DEFENSE";
    			t27 = space();
    			div4 = element("div");
    			p6 = element("p");
    			p6.textContent = "Make no ATK this rnd. You get a bonus to DEF rolls this rnd equal to your Reflex.";
    			t29 = space();
    			button7 = element("button");
    			button7.textContent = "PROTECT";
    			t31 = space();
    			div5 = element("div");
    			p7 = element("p");
    			p7.textContent = "Fast. To put yourself between danger and someone within 1yd, roll Dodge vs their DEF when they are attacked. If you Succeed, and the attack Succeeds, you are hit instead of them.";
    			t33 = space();
    			button8 = element("button");
    			button8.textContent = "SHOVE";
    			t35 = space();
    			div6 = element("div");
    			p8 = element("p");
    			p8.textContent = "Fast. 0DMG MATK. Roll C vs C to push a target d6/2yds away.";
    			t37 = space();
    			button9 = element("button");
    			button9.textContent = "SPRINT";
    			t39 = space();
    			div7 = element("div");
    			p9 = element("p");
    			p9.textContent = "Spend your entire turn moving [Speed x2 + d6yds]. You can Sprint for minutes = C. Use Reflex for DEF. Unstable (-3 RATKs at or from you) unless Sprinting directly toward your opponent.";
    			t41 = space();
    			button10 = element("button");
    			button10.textContent = "TAUNT";
    			t43 = space();
    			div8 = element("div");
    			p10 = element("p");
    			p10.textContent = "Leadership(Taunt) vs D. In combat, provoke the target into attacking you. Using a weapon adds the greater of DMG or Size. The result is a penalty to the loser’s next roll.";
    			t45 = space();
    			button11 = element("button");
    			button11.textContent = "OFFENSIVE MANEUVERS";
    			t47 = space();
    			div24 = element("div");
    			button12 = element("button");
    			button12.textContent = "AIM";
    			t49 = space();
    			div10 = element("div");
    			p11 = element("p");
    			p11.textContent = "Hold your Ranged weapon on target for 1rnd to get a +1 bonus to RATK next rnd, up to 3 consecutive rnds for +3 RATK. Use Reflex for DEF while Aiming. Aim bonus is negated if you move or take DMG.";
    			t51 = space();
    			button13 = element("button");
    			button13.textContent = "AMBUSH";
    			t53 = space();
    			div11 = element("div");
    			p12 = element("p");
    			p12.textContent = "Roll Stealth vs Perception while your target is unaware of your presence. Targets use only their Reflex for DEF.";
    			t55 = space();
    			button14 = element("button");
    			button14.textContent = "CALLED SHOT";
    			t57 = space();
    			div14 = element("div");
    			p13 = element("p");
    			p13.textContent = "ATK targeting a specific body Location.";
    			t59 = space();
    			p14 = element("p");
    			p14.textContent = "MATK penalties: -3 (Eye), -1 (Head), -0 (Arm, Torso, or Leg).";
    			t61 = space();
    			p15 = element("p");
    			p15.textContent = "RATK penalties: -6 (Eye), -3 (Head), -1 (Arm or Leg), -0 Torso.";
    			t63 = space();
    			button15 = element("button");
    			button15.textContent = "DISARM";
    			t65 = space();
    			div12 = element("div");
    			p16 = element("p");
    			p16.textContent = "Arm [MATK vs C/2 if 1h, MATK vs C if 2h]. 0DMG. Attacker gets the weapon if Disarming with an Unarmed MATK.";
    			t67 = space();
    			button16 = element("button");
    			button16.textContent = "TRIP";
    			t69 = space();
    			div13 = element("div");
    			p17 = element("p");
    			p17.textContent = "Legs. Optional 0DMG. A vs C. Knock target Prone.";
    			t71 = space();
    			button17 = element("button");
    			button17.textContent = "DUAL-WIELD";
    			t73 = space();
    			div15 = element("div");
    			p18 = element("p");
    			p18.textContent = "Extra Block for free or Fast ATK with Off-hand weapon. -1 (Primary), -3 (Off-hand). Total Size cannot exceed C x2.";
    			t75 = space();
    			button18 = element("button");
    			button18.textContent = "GRAB";
    			t77 = space();
    			div20 = element("div");
    			p19 = element("p");
    			p19.textContent = "0DMG Unarmed MATK as a Called Shot to disable a Location. Use Reflex for DEF. Fast action to maintain a Grab.";
    			t79 = space();
    			button19 = element("button");
    			button19.textContent = "DEFENDER";
    			t81 = space();
    			div16 = element("div");
    			p20 = element("p");
    			p20.textContent = "Cannot ATK with Grabbed Location. Use Reflex for DEF. Acrobatics or Melee vs Grab ATK to escape. Succeed by 3+ with Melee to reverse the Grab.";
    			t83 = space();
    			button20 = element("button");
    			button20.textContent = "HOLD";
    			t85 = space();
    			div17 = element("div");
    			p21 = element("p");
    			p21.textContent = "Fast. You may Block ATKs using the Defender as a Shield. Defender counts as Cover.";
    			t87 = space();
    			button21 = element("button");
    			button21.textContent = "LOCK";
    			t89 = space();
    			div18 = element("div");
    			p22 = element("p");
    			p22.textContent = "1 BDMG/rnd to the Grabbed Location.";
    			t91 = space();
    			button22 = element("button");
    			button22.textContent = "TACKLE";
    			t93 = space();
    			div19 = element("div");
    			p23 = element("p");
    			p23.textContent = "Sprint and Grab Torso. Combatants both fall Prone.";
    			t95 = space();
    			button23 = element("button");
    			button23.textContent = "OVERWATCH";
    			t97 = space();
    			div21 = element("div");
    			p24 = element("p");
    			p24.textContent = "+1 Perception and RATKs from higher ground.";
    			t99 = space();
    			button24 = element("button");
    			button24.textContent = "RELOAD";
    			t101 = space();
    			div22 = element("div");
    			p25 = element("p");
    			p25.textContent = "Drop empty magazine or shell casings (Fast action), then load one new magazine or 2 new shells per rnd. Use Reflex for DEF.";
    			t103 = space();
    			button25 = element("button");
    			button25.textContent = "SUPPRESSING FIRE";
    			t105 = space();
    			div23 = element("div");
    			p26 = element("p");
    			p26.textContent = "With an Auto gun, pick a 90° firing arc and fire 10 shots/rnd. Make one RATK roll with a d6 only, no bonuses. Until your next turn, the closest 10 individuals in your firing arc take the RATK vs Reflex. RNG penalties apply. Use Reflex for DEF.";
    			add_location(h2, file$c, 1, 4, 34);
    			attr_dev(button0, "id", "ManeuversBtn");
    			attr_dev(button0, "class", "Btn");
    			add_location(button0, file$c, 2, 4, 57);
    			add_location(p0, file$c, 4, 8, 163);
    			add_location(p1, file$c, 5, 8, 363);
    			attr_dev(button1, "id", "DefensiveBtn");
    			attr_dev(button1, "class", "Btn");
    			add_location(button1, file$c, 6, 8, 441);
    			attr_dev(button2, "id", "BlockManBtn");
    			attr_dev(button2, "class", "Btn");
    			add_location(button2, file$c, 8, 12, 565);
    			add_location(p2, file$c, 10, 16, 681);
    			attr_dev(div0, "id", "BlockManSec");
    			attr_dev(div0, "class", "Sec4");
    			add_location(div0, file$c, 9, 12, 629);
    			attr_dev(button3, "id", "DistractManBtn");
    			attr_dev(button3, "class", "Btn");
    			add_location(button3, file$c, 12, 12, 877);
    			add_location(p3, file$c, 14, 16, 1002);
    			attr_dev(div1, "id", "DistractManSec");
    			attr_dev(div1, "class", "Sec4");
    			add_location(div1, file$c, 13, 12, 947);
    			attr_dev(button4, "id", "DodgeManBtn");
    			attr_dev(button4, "class", "Btn");
    			add_location(button4, file$c, 16, 12, 1178);
    			add_location(p4, file$c, 18, 16, 1294);
    			attr_dev(div2, "id", "DodgeManSec");
    			attr_dev(div2, "class", "Sec4");
    			add_location(div2, file$c, 17, 12, 1242);
    			attr_dev(button5, "id", "DuckManBtn");
    			attr_dev(button5, "class", "Btn");
    			add_location(button5, file$c, 20, 12, 1429);
    			add_location(p5, file$c, 22, 16, 1542);
    			attr_dev(div3, "id", "DuckManSec");
    			attr_dev(div3, "class", "Sec4");
    			add_location(div3, file$c, 21, 12, 1491);
    			attr_dev(button6, "id", "FullDefenseManBtn");
    			attr_dev(button6, "class", "Btn");
    			add_location(button6, file$c, 24, 12, 1650);
    			add_location(p6, file$c, 26, 16, 1785);
    			attr_dev(div4, "id", "FullDefenseManSec");
    			attr_dev(div4, "class", "Sec4");
    			add_location(div4, file$c, 25, 12, 1727);
    			attr_dev(button7, "id", "ProtectManBtn");
    			attr_dev(button7, "class", "Btn");
    			add_location(button7, file$c, 28, 12, 1905);
    			add_location(p7, file$c, 30, 16, 2027);
    			attr_dev(div5, "id", "ProtectManSec");
    			attr_dev(div5, "class", "Sec4");
    			add_location(div5, file$c, 29, 12, 1973);
    			attr_dev(button8, "id", "ShoveManBtn");
    			attr_dev(button8, "class", "Btn");
    			add_location(button8, file$c, 32, 12, 2244);
    			add_location(p8, file$c, 34, 16, 2360);
    			attr_dev(div6, "id", "ShoveManSec");
    			attr_dev(div6, "class", "Sec4");
    			add_location(div6, file$c, 33, 12, 2308);
    			attr_dev(button9, "id", "SprintManBtn");
    			attr_dev(button9, "class", "Btn");
    			add_location(button9, file$c, 36, 12, 2458);
    			add_location(p9, file$c, 38, 16, 2577);
    			attr_dev(div7, "id", "SprintManSec");
    			attr_dev(div7, "class", "Sec4");
    			add_location(div7, file$c, 37, 12, 2524);
    			attr_dev(button10, "id", "TauntManBtn");
    			attr_dev(button10, "class", "Btn");
    			add_location(button10, file$c, 40, 12, 2800);
    			add_location(p10, file$c, 42, 16, 2916);
    			attr_dev(div8, "id", "TauntManSec");
    			attr_dev(div8, "class", "Sec4");
    			add_location(div8, file$c, 41, 12, 2864);
    			attr_dev(div9, "id", "DefensiveSec");
    			attr_dev(div9, "class", "Sec3");
    			add_location(div9, file$c, 7, 8, 516);
    			attr_dev(button11, "id", "OffensiveBtn");
    			attr_dev(button11, "class", "Btn");
    			add_location(button11, file$c, 45, 8, 3137);
    			attr_dev(button12, "id", "AimManBtn");
    			attr_dev(button12, "class", "Btn");
    			add_location(button12, file$c, 47, 12, 3261);
    			add_location(p11, file$c, 49, 16, 3371);
    			attr_dev(div10, "id", "AimManSec");
    			attr_dev(div10, "class", "Sec4");
    			add_location(div10, file$c, 48, 12, 3321);
    			attr_dev(button13, "id", "AmbushManBtn");
    			attr_dev(button13, "class", "Btn");
    			add_location(button13, file$c, 51, 12, 3605);
    			add_location(p12, file$c, 53, 16, 3724);
    			attr_dev(div11, "id", "AmbushManSec");
    			attr_dev(div11, "class", "Sec4");
    			add_location(div11, file$c, 52, 12, 3671);
    			attr_dev(button14, "id", "CalledShotManBtn");
    			attr_dev(button14, "class", "Btn");
    			add_location(button14, file$c, 55, 12, 3875);
    			add_location(p13, file$c, 57, 16, 4007);
    			add_location(p14, file$c, 58, 16, 4070);
    			add_location(p15, file$c, 59, 16, 4155);
    			attr_dev(button15, "id", "DisarmManBtn");
    			attr_dev(button15, "class", "Btn");
    			add_location(button15, file$c, 60, 16, 4242);
    			add_location(p16, file$c, 62, 20, 4369);
    			attr_dev(div12, "id", "DisarmManSec");
    			attr_dev(div12, "class", "Sec5");
    			add_location(div12, file$c, 61, 16, 4312);
    			attr_dev(button16, "id", "TripManBtn");
    			attr_dev(button16, "class", "Btn");
    			add_location(button16, file$c, 64, 16, 4523);
    			add_location(p17, file$c, 66, 20, 4644);
    			attr_dev(div13, "id", "TripManSec");
    			attr_dev(div13, "class", "Sec5");
    			add_location(div13, file$c, 65, 16, 4589);
    			attr_dev(div14, "id", "CalledShotManSec");
    			attr_dev(div14, "class", "Sec4");
    			add_location(div14, file$c, 56, 12, 3950);
    			attr_dev(button17, "id", "DualWieldManBtn");
    			attr_dev(button17, "class", "Btn");
    			add_location(button17, file$c, 69, 12, 4754);
    			add_location(p18, file$c, 71, 16, 4883);
    			attr_dev(div15, "id", "DualWieldManSec");
    			attr_dev(div15, "class", "Sec4");
    			add_location(div15, file$c, 70, 12, 4827);
    			attr_dev(button18, "id", "GrabManBtn");
    			attr_dev(button18, "class", "Btn");
    			add_location(button18, file$c, 73, 12, 5036);
    			add_location(p19, file$c, 75, 16, 5149);
    			attr_dev(button19, "id", "DefenderManBtn");
    			attr_dev(button19, "class", "Btn");
    			add_location(button19, file$c, 76, 16, 5282);
    			add_location(p20, file$c, 78, 20, 5415);
    			attr_dev(div16, "id", "DefenderManSec");
    			attr_dev(div16, "class", "Sec5");
    			add_location(div16, file$c, 77, 16, 5356);
    			attr_dev(button20, "id", "HoldManBtn");
    			attr_dev(button20, "class", "Btn");
    			add_location(button20, file$c, 80, 16, 5604);
    			add_location(p21, file$c, 82, 20, 5725);
    			attr_dev(div17, "id", "HoldManSec");
    			attr_dev(div17, "class", "Sec5");
    			add_location(div17, file$c, 81, 16, 5670);
    			attr_dev(button21, "id", "LockManBtn");
    			attr_dev(button21, "class", "Btn");
    			add_location(button21, file$c, 84, 16, 5854);
    			add_location(p22, file$c, 86, 20, 5975);
    			attr_dev(div18, "id", "LockManSec");
    			attr_dev(div18, "class", "Sec5");
    			add_location(div18, file$c, 85, 16, 5920);
    			attr_dev(button22, "id", "TackleManBtn");
    			attr_dev(button22, "class", "Btn");
    			add_location(button22, file$c, 88, 16, 6057);
    			add_location(p23, file$c, 90, 20, 6184);
    			attr_dev(div19, "id", "TackleManSec");
    			attr_dev(div19, "class", "Sec5");
    			add_location(div19, file$c, 89, 16, 6127);
    			attr_dev(div20, "id", "GrabManSec");
    			attr_dev(div20, "class", "Sec4");
    			add_location(div20, file$c, 74, 12, 5098);
    			attr_dev(button23, "id", "OverwatchManBtn");
    			attr_dev(button23, "class", "Btn");
    			add_location(button23, file$c, 93, 12, 6296);
    			add_location(p24, file$c, 95, 16, 6424);
    			attr_dev(div21, "id", "OverwatchManSec");
    			attr_dev(div21, "class", "Sec4");
    			add_location(div21, file$c, 94, 12, 6368);
    			attr_dev(button24, "id", "ReloadManBtn");
    			attr_dev(button24, "class", "Btn");
    			add_location(button24, file$c, 97, 12, 6506);
    			add_location(p25, file$c, 99, 16, 6625);
    			attr_dev(div22, "id", "ReloadManSec");
    			attr_dev(div22, "class", "Sec4");
    			add_location(div22, file$c, 98, 12, 6572);
    			attr_dev(button25, "id", "SuppressingFireManBtn");
    			attr_dev(button25, "class", "Btn");
    			add_location(button25, file$c, 101, 12, 6787);
    			add_location(p26, file$c, 103, 16, 6934);
    			attr_dev(div23, "id", "SuppressingFireManSec");
    			attr_dev(div23, "class", "Sec4");
    			add_location(div23, file$c, 102, 12, 6872);
    			attr_dev(div24, "id", "OffensiveSec");
    			attr_dev(div24, "class", "Sec3");
    			add_location(div24, file$c, 46, 8, 3212);
    			attr_dev(div25, "id", "ManeuversSec");
    			attr_dev(div25, "class", "Sec2");
    			add_location(div25, file$c, 3, 4, 118);
    			attr_dev(div26, "class", "maneuvers-rules");
    			add_location(div26, file$c, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div26, anchor);
    			append_dev(div26, h2);
    			append_dev(div26, t1);
    			append_dev(div26, button0);
    			append_dev(div26, t3);
    			append_dev(div26, div25);
    			append_dev(div25, p0);
    			append_dev(div25, t5);
    			append_dev(div25, p1);
    			append_dev(div25, t7);
    			append_dev(div25, button1);
    			append_dev(div25, t9);
    			append_dev(div25, div9);
    			append_dev(div9, button2);
    			append_dev(div9, t11);
    			append_dev(div9, div0);
    			append_dev(div0, p2);
    			append_dev(div9, t13);
    			append_dev(div9, button3);
    			append_dev(div9, t15);
    			append_dev(div9, div1);
    			append_dev(div1, p3);
    			append_dev(div9, t17);
    			append_dev(div9, button4);
    			append_dev(div9, t19);
    			append_dev(div9, div2);
    			append_dev(div2, p4);
    			append_dev(div9, t21);
    			append_dev(div9, button5);
    			append_dev(div9, t23);
    			append_dev(div9, div3);
    			append_dev(div3, p5);
    			append_dev(div9, t25);
    			append_dev(div9, button6);
    			append_dev(div9, t27);
    			append_dev(div9, div4);
    			append_dev(div4, p6);
    			append_dev(div9, t29);
    			append_dev(div9, button7);
    			append_dev(div9, t31);
    			append_dev(div9, div5);
    			append_dev(div5, p7);
    			append_dev(div9, t33);
    			append_dev(div9, button8);
    			append_dev(div9, t35);
    			append_dev(div9, div6);
    			append_dev(div6, p8);
    			append_dev(div9, t37);
    			append_dev(div9, button9);
    			append_dev(div9, t39);
    			append_dev(div9, div7);
    			append_dev(div7, p9);
    			append_dev(div9, t41);
    			append_dev(div9, button10);
    			append_dev(div9, t43);
    			append_dev(div9, div8);
    			append_dev(div8, p10);
    			append_dev(div25, t45);
    			append_dev(div25, button11);
    			append_dev(div25, t47);
    			append_dev(div25, div24);
    			append_dev(div24, button12);
    			append_dev(div24, t49);
    			append_dev(div24, div10);
    			append_dev(div10, p11);
    			append_dev(div24, t51);
    			append_dev(div24, button13);
    			append_dev(div24, t53);
    			append_dev(div24, div11);
    			append_dev(div11, p12);
    			append_dev(div24, t55);
    			append_dev(div24, button14);
    			append_dev(div24, t57);
    			append_dev(div24, div14);
    			append_dev(div14, p13);
    			append_dev(div14, t59);
    			append_dev(div14, p14);
    			append_dev(div14, t61);
    			append_dev(div14, p15);
    			append_dev(div14, t63);
    			append_dev(div14, button15);
    			append_dev(div14, t65);
    			append_dev(div14, div12);
    			append_dev(div12, p16);
    			append_dev(div14, t67);
    			append_dev(div14, button16);
    			append_dev(div14, t69);
    			append_dev(div14, div13);
    			append_dev(div13, p17);
    			append_dev(div24, t71);
    			append_dev(div24, button17);
    			append_dev(div24, t73);
    			append_dev(div24, div15);
    			append_dev(div15, p18);
    			append_dev(div24, t75);
    			append_dev(div24, button18);
    			append_dev(div24, t77);
    			append_dev(div24, div20);
    			append_dev(div20, p19);
    			append_dev(div20, t79);
    			append_dev(div20, button19);
    			append_dev(div20, t81);
    			append_dev(div20, div16);
    			append_dev(div16, p20);
    			append_dev(div20, t83);
    			append_dev(div20, button20);
    			append_dev(div20, t85);
    			append_dev(div20, div17);
    			append_dev(div17, p21);
    			append_dev(div20, t87);
    			append_dev(div20, button21);
    			append_dev(div20, t89);
    			append_dev(div20, div18);
    			append_dev(div18, p22);
    			append_dev(div20, t91);
    			append_dev(div20, button22);
    			append_dev(div20, t93);
    			append_dev(div20, div19);
    			append_dev(div19, p23);
    			append_dev(div24, t95);
    			append_dev(div24, button23);
    			append_dev(div24, t97);
    			append_dev(div24, div21);
    			append_dev(div21, p24);
    			append_dev(div24, t99);
    			append_dev(div24, button24);
    			append_dev(div24, t101);
    			append_dev(div24, div22);
    			append_dev(div22, p25);
    			append_dev(div24, t103);
    			append_dev(div24, button25);
    			append_dev(div24, t105);
    			append_dev(div24, div23);
    			append_dev(div23, p26);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div26);
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

    class Maneuvers extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$f, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Maneuvers",
    			options,
    			id: create_fragment$f.name
    		});
    	}
    }

    /* src/components/rules/Situations.svelte generated by Svelte v3.15.0 */

    const file$d = "src/components/rules/Situations.svelte";

    function create_fragment$g(ctx) {
    	let div35;
    	let h2;
    	let t1;
    	let button0;
    	let t3;
    	let div34;
    	let p0;
    	let t5;
    	let button1;
    	let t7;
    	let div0;
    	let p1;
    	let t9;
    	let button2;
    	let t11;
    	let div1;
    	let p2;
    	let t13;
    	let button3;
    	let t15;
    	let div3;
    	let p3;
    	let t17;
    	let button4;
    	let t19;
    	let div2;
    	let ul;
    	let li0;
    	let t21;
    	let li1;
    	let t23;
    	let li2;
    	let t25;
    	let li3;
    	let t27;
    	let li4;
    	let t29;
    	let li5;
    	let t31;
    	let li6;
    	let t33;
    	let li7;
    	let t35;
    	let li8;
    	let t37;
    	let button5;
    	let t39;
    	let div4;
    	let p4;
    	let t41;
    	let button6;
    	let t43;
    	let div5;
    	let p5;
    	let t45;
    	let button7;
    	let t47;
    	let div6;
    	let p6;
    	let t49;
    	let button8;
    	let t51;
    	let div7;
    	let p7;
    	let t53;
    	let button9;
    	let t55;
    	let div13;
    	let p8;
    	let t57;
    	let button10;
    	let t59;
    	let div8;
    	let p9;
    	let t61;
    	let button11;
    	let t63;
    	let div9;
    	let p10;
    	let t65;
    	let button12;
    	let t67;
    	let div10;
    	let p11;
    	let t69;
    	let button13;
    	let t71;
    	let div11;
    	let p12;
    	let t73;
    	let button14;
    	let t75;
    	let div12;
    	let p13;
    	let t77;
    	let button15;
    	let t79;
    	let div15;
    	let p14;
    	let t81;
    	let button16;
    	let t83;
    	let div14;
    	let p15;
    	let t85;
    	let button17;
    	let t87;
    	let div16;
    	let p16;
    	let t89;
    	let button18;
    	let t91;
    	let div17;
    	let p17;
    	let t93;
    	let button19;
    	let t95;
    	let div18;
    	let p18;
    	let t97;
    	let button20;
    	let t99;
    	let div19;
    	let p19;
    	let t101;
    	let button21;
    	let t103;
    	let div30;
    	let p20;
    	let t105;
    	let button22;
    	let t107;
    	let div20;
    	let p21;
    	let t109;
    	let button23;
    	let t111;
    	let div21;
    	let p22;
    	let t113;
    	let button24;
    	let t115;
    	let div22;
    	let p23;
    	let t117;
    	let button25;
    	let t119;
    	let div23;
    	let p24;
    	let t121;
    	let button26;
    	let t123;
    	let div24;
    	let p25;
    	let t125;
    	let button27;
    	let t127;
    	let div25;
    	let p26;
    	let t129;
    	let button28;
    	let t131;
    	let div26;
    	let p27;
    	let t133;
    	let button29;
    	let t135;
    	let div27;
    	let p28;
    	let t137;
    	let button30;
    	let t139;
    	let div28;
    	let p29;
    	let t141;
    	let button31;
    	let t143;
    	let div29;
    	let p30;
    	let t145;
    	let button32;
    	let t147;
    	let div31;
    	let p31;
    	let t149;
    	let button33;
    	let t151;
    	let div32;
    	let p32;
    	let t153;
    	let button34;
    	let t155;
    	let div33;
    	let p33;

    	const block = {
    		c: function create() {
    			div35 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Situations";
    			t1 = space();
    			button0 = element("button");
    			button0.textContent = "SITUATIONS";
    			t3 = space();
    			div34 = element("div");
    			p0 = element("p");
    			p0.textContent = "These are special circumstances with unique effects.";
    			t5 = space();
    			button1 = element("button");
    			button1.textContent = "BLEEDING";
    			t7 = space();
    			div0 = element("div");
    			p1 = element("p");
    			p1.textContent = "After lethal DMG, take 1DMG/min to Torso HP. Roll Medicine(First-Aid) or C [# = DMG] to stop (Pain penalty applies). A Bleeding wound can be cauterized by doing 1FDMG to the Location.";
    			t9 = space();
    			button2 = element("button");
    			button2.textContent = "CHASE";
    			t11 = space();
    			div1 = element("div");
    			p2 = element("p");
    			p2.textContent = "Make opposed Athletics, Tame, or Drive rolls each round. +1 Success/rnd for the faster mode of transportation. Keep track of both sides’ total Successes. The Chase ends when the pursuer gives up or one side accumulates 3 Successes above their opponent.";
    			t13 = space();
    			button3 = element("button");
    			button3.textContent = "COVER";
    			t15 = space();
    			div3 = element("div");
    			p3 = element("p");
    			p3.textContent = "Reduce DMG from ATKs that target a Location that is behind Cover by an amount equal to the Material’s Damage Reduction (DR). Roll Block with a Shield to use it’s Cover DR against an RATK.";
    			t17 = space();
    			button4 = element("button");
    			button4.textContent = "MATERIAL";
    			t19 = space();
    			div2 = element("div");
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "Drywall: 1DR";
    			t21 = space();
    			li1 = element("li");
    			li1.textContent = "Glass: 1DR";
    			t23 = space();
    			li2 = element("li");
    			li2.textContent = "Furniture: 3DR";
    			t25 = space();
    			li3 = element("li");
    			li3.textContent = "Wood: 3DR";
    			t27 = space();
    			li4 = element("li");
    			li4.textContent = "Sheet Metal: 6DR";
    			t29 = space();
    			li5 = element("li");
    			li5.textContent = "Brick: 9DR";
    			t31 = space();
    			li6 = element("li");
    			li6.textContent = "Concrete: 12DR";
    			t33 = space();
    			li7 = element("li");
    			li7.textContent = "Log: 15DR";
    			t35 = space();
    			li8 = element("li");
    			li8.textContent = "Water (per ft): 18DR";
    			t37 = space();
    			button5 = element("button");
    			button5.textContent = "DEAFNESS";
    			t39 = space();
    			div4 = element("div");
    			p4 = element("p");
    			p4.textContent = "Fail Perception(Hear) rolls. No audible communication. Guns without Suppressors cause Deafness within 10yds for 1rnd.";
    			t41 = space();
    			button6 = element("button");
    			button6.textContent = "FALLING";
    			t43 = space();
    			div5 = element("div");
    			p5 = element("p");
    			p5.textContent = "1 BDMG/yd after the first to Torso. Fast, Acrobatics # = height in yds for BDMG/2 and choose which Location(s) take BDMG.";
    			t45 = space();
    			button7 = element("button");
    			button7.textContent = "FRIENDLY FIRE";
    			t47 = space();
    			div6 = element("div");
    			p6 = element("p");
    			p6.textContent = "-3 RATK to shoot at a target within 1yd of an ally. F:Roll a d6 RATK (no modifiers) vs ally's Reflex.";
    			t49 = space();
    			button8 = element("button");
    			button8.textContent = "GRABBED";
    			t51 = space();
    			div7 = element("div");
    			p7 = element("p");
    			p7.textContent = "Use Reflex for DEF. Cannot ATK. Roll Acrobatics or Melee vs Grab # to escape. Succeed by 3+ at Melee to reverse the Grab.";
    			t53 = space();
    			button9 = element("button");
    			button9.textContent = "NEEDS";
    			t55 = space();
    			div13 = element("div");
    			p8 = element("p");
    			p8.textContent = "-1 all rolls for each Need that isn’t met per unit of time.";
    			t57 = space();
    			button10 = element("button");
    			button10.textContent = "DEHYDRATION";
    			t59 = space();
    			div8 = element("div");
    			p9 = element("p");
    			p9.textContent = "Die after C days without 1 Water.";
    			t61 = space();
    			button11 = element("button");
    			button11.textContent = "EXHAUSTION";
    			t63 = space();
    			div9 = element("div");
    			p10 = element("p");
    			p10.textContent = "D# = hrs/6 to stay up past 24hrs without 6hrs sleep.";
    			t65 = space();
    			button12 = element("button");
    			button12.textContent = "HYPOTHERMIA";
    			t67 = space();
    			div10 = element("div");
    			p11 = element("p");
    			p11.textContent = "Die after C hours exposed to freezing weather.";
    			t69 = space();
    			button13 = element("button");
    			button13.textContent = "STARVATION";
    			t71 = space();
    			div11 = element("div");
    			p12 = element("p");
    			p12.textContent = "Die after C weeks without 1 Food.";
    			t73 = space();
    			button14 = element("button");
    			button14.textContent = "SUFFOCATION";
    			t75 = space();
    			div12 = element("div");
    			p13 = element("p");
    			p13.textContent = "Die after C minutes without air.";
    			t77 = space();
    			button15 = element("button");
    			button15.textContent = "PAIN";
    			t79 = space();
    			div15 = element("div");
    			p14 = element("p");
    			p14.textContent = "-1 to all rolls per point of DMG or other Pain source. Pain fades as DMG heals. Pain not caused by HP loss heals at 1/min.";
    			t81 = space();
    			button16 = element("button");
    			button16.textContent = "THRESHOLD";
    			t83 = space();
    			div14 = element("div");
    			p15 = element("p");
    			p15.textContent = "Go unconscious when Pain exceeds [C + D]. \tAny further Blunt DMG is considered lethal DMG instead.";
    			t85 = space();
    			button17 = element("button");
    			button17.textContent = "PRONE";
    			t87 = space();
    			div16 = element("div");
    			p16 = element("p");
    			p16.textContent = "+1 RATK. Use Reflex for DEF. +3 Stealth. Speed 1yd.";
    			t89 = space();
    			button18 = element("button");
    			button18.textContent = "RANGE (RNG)";
    			t91 = space();
    			div17 = element("div");
    			p17 = element("p");
    			p17.textContent = "RATKs have a RNG increment in yards. -1 RATK per RNG after the first up to -9 RATK at 10x RNG. RATKs in first RNG target Torso. RATKs beyond that are random Location rolls or Called Shots.  For Scatter, RNG is a penalty to DMG and a bonus to RATK.";
    			t93 = space();
    			button19 = element("button");
    			button19.textContent = "REFLEX";
    			t95 = space();
    			div18 = element("div");
    			p18 = element("p");
    			p18.textContent = "Reflex = Perception. This is default Defense if you are conscious but unaware or out of Fast actions for active Defense. Reflex is never rolled. It is a static Difficulty for enemy ATKs.";
    			t97 = space();
    			button20 = element("button");
    			button20.textContent = "STUNNED";
    			t99 = space();
    			div19 = element("div");
    			p19 = element("p");
    			p19.textContent = "You cannot do anything. You are unaware (-6 Perception). Use Reflex for DEF. Fall Prone if Stunned more than 1 rnd.";
    			t101 = space();
    			button21 = element("button");
    			button21.textContent = "TERRAIN";
    			t103 = space();
    			div30 = element("div");
    			p20 = element("p");
    			p20.textContent = "-1 to -6 Athletics, Acrobatics, Drive, and Speed.";
    			t105 = space();
    			button22 = element("button");
    			button22.textContent = "ACID RAIN";
    			t107 = space();
    			div20 = element("div");
    			p21 = element("p");
    			p21.textContent = "-1 Athletics, Acrobatics, Drive, and Speed";
    			t109 = space();
    			button23 = element("button");
    			button23.textContent = "BLIZZARD";
    			t111 = space();
    			div21 = element("div");
    			p22 = element("p");
    			p22.textContent = "-1/inch Athletics, Acrobatics, Drive, and Speed";
    			t113 = space();
    			button24 = element("button");
    			button24.textContent = "DESERT";
    			t115 = space();
    			div22 = element("div");
    			p23 = element("p");
    			p23.textContent = "-1 Athletics, Acrobatics, Drive, and Speed";
    			t117 = space();
    			button25 = element("button");
    			button25.textContent = "FOREST";
    			t119 = space();
    			div23 = element("div");
    			p24 = element("p");
    			p24.textContent = "-1 Athletics, Acrobatics, Drive, and Speed";
    			t121 = space();
    			button26 = element("button");
    			button26.textContent = "HAIL/SLEET";
    			t123 = space();
    			div24 = element("div");
    			p25 = element("p");
    			p25.textContent = "-3 Athletics, Acrobatics, Drive, and Speed";
    			t125 = space();
    			button27 = element("button");
    			button27.textContent = "MOUNTAIN";
    			t127 = space();
    			div25 = element("div");
    			p26 = element("p");
    			p26.textContent = "-1 Athletics, Acrobatics, Drive, and Speed";
    			t129 = space();
    			button28 = element("button");
    			button28.textContent = "RAIN STORM";
    			t131 = space();
    			div26 = element("div");
    			p27 = element("p");
    			p27.textContent = "-1 Athletics, Acrobatics, Drive, and Speed";
    			t133 = space();
    			button29 = element("button");
    			button29.textContent = "SNOW";
    			t135 = space();
    			div27 = element("div");
    			p28 = element("p");
    			p28.textContent = "-1/in Athletics, Acrobatics, Drive, and Speed";
    			t137 = space();
    			button30 = element("button");
    			button30.textContent = "SWAMP";
    			t139 = space();
    			div28 = element("div");
    			p29 = element("p");
    			p29.textContent = "-6 Athletics, Acrobatics, Drive, and Speed";
    			t141 = space();
    			button31 = element("button");
    			button31.textContent = "TUNDRA";
    			t143 = space();
    			div29 = element("div");
    			p30 = element("p");
    			p30.textContent = "-6 Athletics, Acrobatics, Drive";
    			t145 = space();
    			button32 = element("button");
    			button32.textContent = "UNARMED";
    			t147 = space();
    			div31 = element("div");
    			p31 = element("p");
    			p31.textContent = "Punch or Headbutt: 1 DMG. Kick: 2 DMG. Unarmed MATKs do BDMG. BDMG is only Pain until Pain exceeds the Threshold [C + D]. AR is not reduced by Unarmed DMG.";
    			t149 = space();
    			button33 = element("button");
    			button33.textContent = "UNSTABLE";
    			t151 = space();
    			div32 = element("div");
    			p32 = element("p");
    			p32.textContent = "-3 all physical rolls. -3 to RATKs at or from you.";
    			t153 = space();
    			button34 = element("button");
    			button34.textContent = "VISIBILITY";
    			t155 = space();
    			div33 = element("div");
    			p33 = element("p");
    			p33.textContent = "-1 to -6 to all sight-based rolls. GN discretion.";
    			add_location(h2, file$d, 1, 4, 35);
    			attr_dev(button0, "id", "SituationsBtn");
    			attr_dev(button0, "class", "Btn");
    			add_location(button0, file$d, 2, 4, 59);
    			add_location(p0, file$d, 4, 8, 168);
    			attr_dev(button1, "id", "BleedingSitBtn");
    			attr_dev(button1, "class", "Btn");
    			add_location(button1, file$d, 5, 8, 236);
    			add_location(p1, file$d, 7, 12, 353);
    			attr_dev(div0, "id", "BleedingSitSec");
    			attr_dev(div0, "class", "Sec3");
    			add_location(div0, file$d, 6, 8, 302);
    			attr_dev(button2, "id", "ChaseSitBtn");
    			attr_dev(button2, "class", "Btn");
    			add_location(button2, file$d, 9, 8, 567);
    			add_location(p2, file$d, 11, 12, 675);
    			attr_dev(div1, "id", "ChaseSitSec");
    			attr_dev(div1, "class", "Sec3");
    			add_location(div1, file$d, 10, 8, 627);
    			attr_dev(button3, "id", "CoverSitBtn");
    			attr_dev(button3, "class", "Btn");
    			add_location(button3, file$d, 13, 8, 958);
    			add_location(p3, file$d, 15, 12, 1066);
    			attr_dev(button4, "id", "MaterialSitBtn");
    			attr_dev(button4, "class", "Btn");
    			add_location(button4, file$d, 16, 12, 1273);
    			add_location(li0, file$d, 19, 20, 1423);
    			add_location(li1, file$d, 20, 20, 1465);
    			add_location(li2, file$d, 21, 20, 1505);
    			add_location(li3, file$d, 22, 20, 1549);
    			add_location(li4, file$d, 23, 20, 1588);
    			add_location(li5, file$d, 24, 20, 1634);
    			add_location(li6, file$d, 25, 20, 1674);
    			add_location(li7, file$d, 26, 20, 1718);
    			add_location(li8, file$d, 27, 20, 1757);
    			add_location(ul, file$d, 18, 16, 1398);
    			attr_dev(div2, "id", "MaterialSitSec");
    			attr_dev(div2, "class", "Sec3");
    			add_location(div2, file$d, 17, 12, 1343);
    			attr_dev(div3, "id", "CoverSitSec");
    			attr_dev(div3, "class", "Sec3");
    			add_location(div3, file$d, 14, 8, 1018);
    			attr_dev(button5, "id", "DeafnessSitBtn");
    			attr_dev(button5, "class", "Btn");
    			add_location(button5, file$d, 31, 8, 1851);
    			add_location(p4, file$d, 33, 12, 1968);
    			attr_dev(div4, "id", "DeafnessSitSec");
    			attr_dev(div4, "class", "Sec3");
    			add_location(div4, file$d, 32, 8, 1917);
    			attr_dev(button6, "id", "FallingSitBtn");
    			attr_dev(button6, "class", "Btn");
    			add_location(button6, file$d, 35, 8, 2116);
    			add_location(p5, file$d, 37, 12, 2230);
    			attr_dev(div5, "id", "FallingSitSec");
    			attr_dev(div5, "class", "Sec3");
    			add_location(div5, file$d, 36, 8, 2180);
    			attr_dev(button7, "id", "FriendlyFireSitBtn");
    			attr_dev(button7, "class", "Btn");
    			add_location(button7, file$d, 39, 8, 2382);
    			add_location(p6, file$d, 41, 12, 2512);
    			attr_dev(div6, "id", "FriendlyFireSitSec");
    			attr_dev(div6, "class", "Sec3");
    			add_location(div6, file$d, 40, 8, 2457);
    			attr_dev(button8, "id", "GrabbedSitBtn");
    			attr_dev(button8, "class", "Btn");
    			add_location(button8, file$d, 43, 8, 2644);
    			add_location(p7, file$d, 45, 12, 2758);
    			attr_dev(div7, "id", "GrabbedSitSec");
    			attr_dev(div7, "class", "Sec3");
    			add_location(div7, file$d, 44, 8, 2708);
    			attr_dev(button9, "id", "NeedsSitBtn");
    			attr_dev(button9, "class", "Btn");
    			add_location(button9, file$d, 47, 8, 2910);
    			add_location(p8, file$d, 49, 12, 3018);
    			attr_dev(button10, "id", "SitBtn");
    			attr_dev(button10, "class", "Btn");
    			add_location(button10, file$d, 50, 12, 3097);
    			add_location(p9, file$d, 52, 16, 3209);
    			attr_dev(div8, "id", "SitSec");
    			attr_dev(div8, "class", "Sec4");
    			add_location(div8, file$d, 51, 12, 3162);
    			attr_dev(button11, "id", "ExhaustionSitBtn");
    			attr_dev(button11, "class", "Btn");
    			add_location(button11, file$d, 54, 12, 3281);
    			add_location(p10, file$d, 56, 16, 3412);
    			attr_dev(div9, "id", "ExhaustionSitSec");
    			attr_dev(div9, "class", "Sec4");
    			add_location(div9, file$d, 55, 12, 3355);
    			attr_dev(button12, "id", "HypothermiaSitBtn");
    			attr_dev(button12, "class", "Btn");
    			add_location(button12, file$d, 58, 12, 3503);
    			add_location(p11, file$d, 60, 16, 3637);
    			attr_dev(div10, "id", "HypothermiaSitSec");
    			attr_dev(div10, "class", "Sec4");
    			add_location(div10, file$d, 59, 12, 3579);
    			attr_dev(button13, "id", "StarvationSitBtn");
    			attr_dev(button13, "class", "Btn");
    			add_location(button13, file$d, 62, 12, 3722);
    			add_location(p12, file$d, 64, 16, 3853);
    			attr_dev(div11, "id", "StarvationSitSec");
    			attr_dev(div11, "class", "Sec4");
    			add_location(div11, file$d, 63, 12, 3796);
    			attr_dev(button14, "id", "SuffocationSitBtn");
    			attr_dev(button14, "class", "Btn");
    			add_location(button14, file$d, 66, 12, 3925);
    			add_location(p13, file$d, 68, 16, 4059);
    			attr_dev(div12, "id", "SuffocationSitSec");
    			attr_dev(div12, "class", "Sec4");
    			add_location(div12, file$d, 67, 12, 4001);
    			attr_dev(div13, "id", "NeedsSitSec");
    			attr_dev(div13, "class", "Sec3");
    			add_location(div13, file$d, 48, 8, 2970);
    			attr_dev(button15, "id", "PainSitBtn");
    			attr_dev(button15, "class", "Btn");
    			add_location(button15, file$d, 71, 8, 4141);
    			add_location(p14, file$d, 73, 12, 4246);
    			attr_dev(button16, "id", "ThresholdSitBtn");
    			attr_dev(button16, "class", "Btn");
    			add_location(button16, file$d, 74, 12, 4388);
    			add_location(p15, file$d, 76, 16, 4516);
    			attr_dev(div14, "id", "ThresholdSitSec");
    			attr_dev(div14, "class", "Sec4");
    			add_location(div14, file$d, 75, 12, 4460);
    			attr_dev(div15, "id", "PainSitSec");
    			attr_dev(div15, "class", "Sec3");
    			add_location(div15, file$d, 72, 8, 4199);
    			attr_dev(button17, "id", "ProneSitBtn");
    			attr_dev(button17, "class", "Btn");
    			add_location(button17, file$d, 79, 8, 4664);
    			add_location(p16, file$d, 81, 12, 4772);
    			attr_dev(div16, "id", "ProneSitSec");
    			attr_dev(div16, "class", "Sec3");
    			add_location(div16, file$d, 80, 8, 4724);
    			attr_dev(button18, "id", "RangeSitBtn");
    			attr_dev(button18, "class", "Btn");
    			add_location(button18, file$d, 83, 8, 4854);
    			add_location(p17, file$d, 85, 12, 4968);
    			attr_dev(div17, "id", "RangeSitSec");
    			attr_dev(div17, "class", "Sec3");
    			add_location(div17, file$d, 84, 8, 4920);
    			attr_dev(button19, "id", "ReflexSitBtn");
    			attr_dev(button19, "class", "Btn");
    			add_location(button19, file$d, 87, 8, 5246);
    			add_location(p18, file$d, 89, 12, 5357);
    			attr_dev(div18, "id", "ReflexSitSec");
    			attr_dev(div18, "class", "Sec3");
    			add_location(div18, file$d, 88, 8, 5308);
    			attr_dev(button20, "id", "StunnedSitBtn");
    			attr_dev(button20, "class", "Btn");
    			add_location(button20, file$d, 91, 8, 5574);
    			add_location(p19, file$d, 93, 12, 5688);
    			attr_dev(div19, "id", "StunnedSitSec");
    			attr_dev(div19, "class", "Sec3");
    			add_location(div19, file$d, 92, 8, 5638);
    			attr_dev(button21, "id", "TerrainSitBtn");
    			attr_dev(button21, "class", "Btn");
    			add_location(button21, file$d, 95, 8, 5834);
    			add_location(p20, file$d, 97, 12, 5948);
    			attr_dev(button22, "id", "AcidRainSitBtn");
    			attr_dev(button22, "class", "Btn");
    			add_location(button22, file$d, 98, 12, 6017);
    			add_location(p21, file$d, 100, 16, 6143);
    			attr_dev(div20, "id", "AcidRainSitSec");
    			attr_dev(div20, "class", "Sec4");
    			add_location(div20, file$d, 99, 12, 6088);
    			attr_dev(button23, "id", "BlizzardSitBtn");
    			attr_dev(button23, "class", "Btn");
    			add_location(button23, file$d, 102, 12, 6224);
    			add_location(p22, file$d, 104, 16, 6349);
    			attr_dev(div21, "id", "BlizzardSitSec");
    			attr_dev(div21, "class", "Sec4");
    			add_location(div21, file$d, 103, 12, 6294);
    			attr_dev(button24, "id", "DesertSitBtn");
    			attr_dev(button24, "class", "Btn");
    			add_location(button24, file$d, 106, 12, 6435);
    			add_location(p23, file$d, 108, 16, 6554);
    			attr_dev(div22, "id", "DesertSitSec");
    			attr_dev(div22, "class", "Sec4");
    			add_location(div22, file$d, 107, 12, 6501);
    			attr_dev(button25, "id", "ForestSitBtn");
    			attr_dev(button25, "class", "Btn");
    			add_location(button25, file$d, 110, 12, 6635);
    			add_location(p24, file$d, 112, 16, 6754);
    			attr_dev(div23, "id", "ForestSitSec");
    			attr_dev(div23, "class", "Sec4");
    			add_location(div23, file$d, 111, 12, 6701);
    			attr_dev(button26, "id", "HailSleetSitBtn");
    			attr_dev(button26, "class", "Btn");
    			add_location(button26, file$d, 114, 12, 6835);
    			add_location(p25, file$d, 116, 16, 6964);
    			attr_dev(div24, "id", "HailSleetSitSec");
    			attr_dev(div24, "class", "Sec4");
    			add_location(div24, file$d, 115, 12, 6908);
    			attr_dev(button27, "id", "MountainSitBtn");
    			attr_dev(button27, "class", "Btn");
    			add_location(button27, file$d, 118, 12, 7045);
    			add_location(p26, file$d, 120, 16, 7170);
    			attr_dev(div25, "id", "MountainSitSec");
    			attr_dev(div25, "class", "Sec4");
    			add_location(div25, file$d, 119, 12, 7115);
    			attr_dev(button28, "id", "RainStormSitBtn");
    			attr_dev(button28, "class", "Btn");
    			add_location(button28, file$d, 122, 12, 7251);
    			add_location(p27, file$d, 124, 16, 7380);
    			attr_dev(div26, "id", "RainStormSitSec");
    			attr_dev(div26, "class", "Sec4");
    			add_location(div26, file$d, 123, 12, 7324);
    			attr_dev(button29, "id", "SnowSitBtn");
    			attr_dev(button29, "class", "Btn");
    			add_location(button29, file$d, 126, 12, 7461);
    			add_location(p28, file$d, 128, 16, 7574);
    			attr_dev(div27, "id", "SnowSitSec");
    			attr_dev(div27, "class", "Sec4");
    			add_location(div27, file$d, 127, 12, 7523);
    			attr_dev(button30, "id", "SwampSitBtn");
    			attr_dev(button30, "class", "Btn");
    			add_location(button30, file$d, 130, 12, 7658);
    			add_location(p29, file$d, 132, 16, 7774);
    			attr_dev(div28, "id", "SwampSitSec");
    			attr_dev(div28, "class", "Sec4");
    			add_location(div28, file$d, 131, 12, 7722);
    			attr_dev(button31, "id", "TundraSitBtn");
    			attr_dev(button31, "class", "Btn");
    			add_location(button31, file$d, 134, 12, 7855);
    			add_location(p30, file$d, 136, 16, 7974);
    			attr_dev(div29, "id", "TundraSitSec");
    			attr_dev(div29, "class", "Sec4");
    			add_location(div29, file$d, 135, 12, 7921);
    			attr_dev(div30, "id", "TerrainSitSec");
    			attr_dev(div30, "class", "Sec3");
    			add_location(div30, file$d, 96, 8, 5898);
    			attr_dev(button32, "id", "UnarmedSitBtn");
    			attr_dev(button32, "class", "Btn");
    			add_location(button32, file$d, 139, 8, 8055);
    			add_location(p31, file$d, 141, 12, 8169);
    			attr_dev(div31, "id", "UnarmedSitSec");
    			attr_dev(div31, "class", "Sec3");
    			add_location(div31, file$d, 140, 8, 8119);
    			attr_dev(button33, "id", "UnstableSitBtn");
    			attr_dev(button33, "class", "Btn");
    			add_location(button33, file$d, 143, 8, 8355);
    			add_location(p32, file$d, 145, 12, 8472);
    			attr_dev(div32, "id", "UnstableSitSec");
    			attr_dev(div32, "class", "Sec3");
    			add_location(div32, file$d, 144, 8, 8421);
    			attr_dev(button34, "id", "VisibilitySitBtn");
    			attr_dev(button34, "class", "Btn");
    			add_location(button34, file$d, 147, 8, 8553);
    			add_location(p33, file$d, 149, 12, 8676);
    			attr_dev(div33, "id", "VisibilitySitSec");
    			attr_dev(div33, "class", "Sec3");
    			add_location(div33, file$d, 148, 8, 8623);
    			attr_dev(div34, "id", "SituationsSec");
    			attr_dev(div34, "class", "Sec2");
    			add_location(div34, file$d, 3, 4, 122);
    			attr_dev(div35, "class", "situations-rules");
    			add_location(div35, file$d, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div35, anchor);
    			append_dev(div35, h2);
    			append_dev(div35, t1);
    			append_dev(div35, button0);
    			append_dev(div35, t3);
    			append_dev(div35, div34);
    			append_dev(div34, p0);
    			append_dev(div34, t5);
    			append_dev(div34, button1);
    			append_dev(div34, t7);
    			append_dev(div34, div0);
    			append_dev(div0, p1);
    			append_dev(div34, t9);
    			append_dev(div34, button2);
    			append_dev(div34, t11);
    			append_dev(div34, div1);
    			append_dev(div1, p2);
    			append_dev(div34, t13);
    			append_dev(div34, button3);
    			append_dev(div34, t15);
    			append_dev(div34, div3);
    			append_dev(div3, p3);
    			append_dev(div3, t17);
    			append_dev(div3, button4);
    			append_dev(div3, t19);
    			append_dev(div3, div2);
    			append_dev(div2, ul);
    			append_dev(ul, li0);
    			append_dev(ul, t21);
    			append_dev(ul, li1);
    			append_dev(ul, t23);
    			append_dev(ul, li2);
    			append_dev(ul, t25);
    			append_dev(ul, li3);
    			append_dev(ul, t27);
    			append_dev(ul, li4);
    			append_dev(ul, t29);
    			append_dev(ul, li5);
    			append_dev(ul, t31);
    			append_dev(ul, li6);
    			append_dev(ul, t33);
    			append_dev(ul, li7);
    			append_dev(ul, t35);
    			append_dev(ul, li8);
    			append_dev(div34, t37);
    			append_dev(div34, button5);
    			append_dev(div34, t39);
    			append_dev(div34, div4);
    			append_dev(div4, p4);
    			append_dev(div34, t41);
    			append_dev(div34, button6);
    			append_dev(div34, t43);
    			append_dev(div34, div5);
    			append_dev(div5, p5);
    			append_dev(div34, t45);
    			append_dev(div34, button7);
    			append_dev(div34, t47);
    			append_dev(div34, div6);
    			append_dev(div6, p6);
    			append_dev(div34, t49);
    			append_dev(div34, button8);
    			append_dev(div34, t51);
    			append_dev(div34, div7);
    			append_dev(div7, p7);
    			append_dev(div34, t53);
    			append_dev(div34, button9);
    			append_dev(div34, t55);
    			append_dev(div34, div13);
    			append_dev(div13, p8);
    			append_dev(div13, t57);
    			append_dev(div13, button10);
    			append_dev(div13, t59);
    			append_dev(div13, div8);
    			append_dev(div8, p9);
    			append_dev(div13, t61);
    			append_dev(div13, button11);
    			append_dev(div13, t63);
    			append_dev(div13, div9);
    			append_dev(div9, p10);
    			append_dev(div13, t65);
    			append_dev(div13, button12);
    			append_dev(div13, t67);
    			append_dev(div13, div10);
    			append_dev(div10, p11);
    			append_dev(div13, t69);
    			append_dev(div13, button13);
    			append_dev(div13, t71);
    			append_dev(div13, div11);
    			append_dev(div11, p12);
    			append_dev(div13, t73);
    			append_dev(div13, button14);
    			append_dev(div13, t75);
    			append_dev(div13, div12);
    			append_dev(div12, p13);
    			append_dev(div34, t77);
    			append_dev(div34, button15);
    			append_dev(div34, t79);
    			append_dev(div34, div15);
    			append_dev(div15, p14);
    			append_dev(div15, t81);
    			append_dev(div15, button16);
    			append_dev(div15, t83);
    			append_dev(div15, div14);
    			append_dev(div14, p15);
    			append_dev(div34, t85);
    			append_dev(div34, button17);
    			append_dev(div34, t87);
    			append_dev(div34, div16);
    			append_dev(div16, p16);
    			append_dev(div34, t89);
    			append_dev(div34, button18);
    			append_dev(div34, t91);
    			append_dev(div34, div17);
    			append_dev(div17, p17);
    			append_dev(div34, t93);
    			append_dev(div34, button19);
    			append_dev(div34, t95);
    			append_dev(div34, div18);
    			append_dev(div18, p18);
    			append_dev(div34, t97);
    			append_dev(div34, button20);
    			append_dev(div34, t99);
    			append_dev(div34, div19);
    			append_dev(div19, p19);
    			append_dev(div34, t101);
    			append_dev(div34, button21);
    			append_dev(div34, t103);
    			append_dev(div34, div30);
    			append_dev(div30, p20);
    			append_dev(div30, t105);
    			append_dev(div30, button22);
    			append_dev(div30, t107);
    			append_dev(div30, div20);
    			append_dev(div20, p21);
    			append_dev(div30, t109);
    			append_dev(div30, button23);
    			append_dev(div30, t111);
    			append_dev(div30, div21);
    			append_dev(div21, p22);
    			append_dev(div30, t113);
    			append_dev(div30, button24);
    			append_dev(div30, t115);
    			append_dev(div30, div22);
    			append_dev(div22, p23);
    			append_dev(div30, t117);
    			append_dev(div30, button25);
    			append_dev(div30, t119);
    			append_dev(div30, div23);
    			append_dev(div23, p24);
    			append_dev(div30, t121);
    			append_dev(div30, button26);
    			append_dev(div30, t123);
    			append_dev(div30, div24);
    			append_dev(div24, p25);
    			append_dev(div30, t125);
    			append_dev(div30, button27);
    			append_dev(div30, t127);
    			append_dev(div30, div25);
    			append_dev(div25, p26);
    			append_dev(div30, t129);
    			append_dev(div30, button28);
    			append_dev(div30, t131);
    			append_dev(div30, div26);
    			append_dev(div26, p27);
    			append_dev(div30, t133);
    			append_dev(div30, button29);
    			append_dev(div30, t135);
    			append_dev(div30, div27);
    			append_dev(div27, p28);
    			append_dev(div30, t137);
    			append_dev(div30, button30);
    			append_dev(div30, t139);
    			append_dev(div30, div28);
    			append_dev(div28, p29);
    			append_dev(div30, t141);
    			append_dev(div30, button31);
    			append_dev(div30, t143);
    			append_dev(div30, div29);
    			append_dev(div29, p30);
    			append_dev(div34, t145);
    			append_dev(div34, button32);
    			append_dev(div34, t147);
    			append_dev(div34, div31);
    			append_dev(div31, p31);
    			append_dev(div34, t149);
    			append_dev(div34, button33);
    			append_dev(div34, t151);
    			append_dev(div34, div32);
    			append_dev(div32, p32);
    			append_dev(div34, t153);
    			append_dev(div34, button34);
    			append_dev(div34, t155);
    			append_dev(div34, div33);
    			append_dev(div33, p33);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div35);
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

    class Situations extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$g, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Situations",
    			options,
    			id: create_fragment$g.name
    		});
    	}
    }

    /* src/components/rules/Skills.svelte generated by Svelte v3.15.0 */

    const file$e = "src/components/rules/Skills.svelte";

    function create_fragment$h(ctx) {
    	let div64;
    	let h2;
    	let t1;
    	let button0;
    	let t3;
    	let div63;
    	let p0;
    	let t5;
    	let p1;
    	let t7;
    	let button1;
    	let t9;
    	let div0;
    	let p2;
    	let t11;
    	let button2;
    	let t13;
    	let div1;
    	let p3;
    	let t15;
    	let button3;
    	let t17;
    	let div14;
    	let button4;
    	let t19;
    	let div5;
    	let p4;
    	let t21;
    	let button5;
    	let t23;
    	let div2;
    	let p5;
    	let t25;
    	let button6;
    	let t27;
    	let div3;
    	let p6;
    	let t29;
    	let p7;
    	let t31;
    	let p8;
    	let t33;
    	let p9;
    	let t35;
    	let button7;
    	let t37;
    	let div4;
    	let p10;
    	let t39;
    	let button8;
    	let t41;
    	let div9;
    	let p11;
    	let t43;
    	let button9;
    	let t45;
    	let div6;
    	let p12;
    	let t47;
    	let button10;
    	let t49;
    	let div7;
    	let p13;
    	let t51;
    	let button11;
    	let t53;
    	let div8;
    	let p14;
    	let t55;
    	let button12;
    	let t57;
    	let div13;
    	let p15;
    	let t59;
    	let button13;
    	let t61;
    	let div10;
    	let p16;
    	let t63;
    	let button14;
    	let t65;
    	let div11;
    	let p17;
    	let t67;
    	let button15;
    	let t69;
    	let div12;
    	let p18;
    	let t71;
    	let button16;
    	let t73;
    	let div27;
    	let button17;
    	let t75;
    	let div18;
    	let p19;
    	let t77;
    	let button18;
    	let t79;
    	let div15;
    	let p20;
    	let t81;
    	let button19;
    	let t83;
    	let div16;
    	let p21;
    	let t85;
    	let button20;
    	let t87;
    	let div17;
    	let p22;
    	let t89;
    	let button21;
    	let t91;
    	let div22;
    	let p23;
    	let t93;
    	let button22;
    	let t95;
    	let div19;
    	let p24;
    	let t97;
    	let button23;
    	let t99;
    	let div20;
    	let p25;
    	let t101;
    	let button24;
    	let t103;
    	let div21;
    	let p26;
    	let t105;
    	let button25;
    	let t107;
    	let div26;
    	let p27;
    	let t109;
    	let button26;
    	let t111;
    	let div23;
    	let p28;
    	let t113;
    	let button27;
    	let t115;
    	let div24;
    	let p29;
    	let t117;
    	let button28;
    	let t119;
    	let div25;
    	let p30;
    	let t121;
    	let button29;
    	let t123;
    	let div42;
    	let button30;
    	let t125;
    	let div33;
    	let p31;
    	let t127;
    	let button31;
    	let t129;
    	let div30;
    	let p32;
    	let t131;
    	let button32;
    	let t133;
    	let div28;
    	let ul0;
    	let li0;
    	let t135;
    	let li1;
    	let t137;
    	let li2;
    	let t139;
    	let li3;
    	let t141;
    	let li4;
    	let t143;
    	let button33;
    	let t145;
    	let div29;
    	let ul1;
    	let li5;
    	let t147;
    	let li6;
    	let t149;
    	let li7;
    	let t151;
    	let li8;
    	let t153;
    	let button34;
    	let t155;
    	let div31;
    	let p33;
    	let t157;
    	let button35;
    	let t159;
    	let div32;
    	let p34;
    	let t161;
    	let button36;
    	let t163;
    	let div37;
    	let p35;
    	let t165;
    	let button37;
    	let t167;
    	let div34;
    	let p36;
    	let t169;
    	let button38;
    	let t171;
    	let div35;
    	let p37;
    	let t173;
    	let button39;
    	let t175;
    	let div36;
    	let p38;
    	let t177;
    	let button40;
    	let t179;
    	let div41;
    	let p39;
    	let t181;
    	let button41;
    	let t183;
    	let div38;
    	let p40;
    	let t185;
    	let button42;
    	let t187;
    	let div39;
    	let p41;
    	let t189;
    	let button43;
    	let t191;
    	let div40;
    	let p42;
    	let t193;
    	let button44;
    	let t195;
    	let div62;
    	let button45;
    	let t197;
    	let div46;
    	let p43;
    	let t199;
    	let button46;
    	let t201;
    	let div43;
    	let p44;
    	let t203;
    	let button47;
    	let t205;
    	let div44;
    	let p45;
    	let t207;
    	let button48;
    	let t209;
    	let div45;
    	let p46;
    	let t211;
    	let button49;
    	let t213;
    	let div50;
    	let p47;
    	let t215;
    	let button50;
    	let t217;
    	let div47;
    	let p48;
    	let t219;
    	let button51;
    	let t221;
    	let div48;
    	let p49;
    	let t223;
    	let button52;
    	let t225;
    	let div49;
    	let p50;
    	let t227;
    	let button53;
    	let t229;
    	let div61;
    	let p51;
    	let t231;
    	let button54;
    	let t233;
    	let div51;
    	let p52;
    	let t235;
    	let button55;
    	let t237;
    	let div52;
    	let p53;
    	let t239;
    	let button56;
    	let t241;
    	let div60;
    	let p54;
    	let t243;
    	let button57;
    	let t245;
    	let div59;
    	let button58;
    	let t247;
    	let div53;
    	let p55;
    	let t249;
    	let button59;
    	let t251;
    	let div54;
    	let p56;
    	let t253;
    	let button60;
    	let t255;
    	let div55;
    	let p57;
    	let t257;
    	let button61;
    	let t259;
    	let div56;
    	let p58;
    	let t261;
    	let button62;
    	let t263;
    	let div57;
    	let p59;
    	let t265;
    	let button63;
    	let t267;
    	let div58;
    	let p60;

    	const block = {
    		c: function create() {
    			div64 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Skills";
    			t1 = space();
    			button0 = element("button");
    			button0.textContent = "SKILLS";
    			t3 = space();
    			div63 = element("div");
    			p0 = element("p");
    			p0.textContent = "Skill rolls are [d6 + Skill]. A Skill roll may be against a Difficulty(#), Trait, Instinct, or another Skill. Parent Traits set the limit for their Skill scores. Skills have Specialties listed below that can exceed the Trait by taking the Specialize Ability.";
    			t5 = space();
    			p1 = element("p");
    			p1.textContent = "# = Difficulty.   1 = Botch.";
    			t7 = space();
    			button1 = element("button");
    			button1.textContent = "COOPERATION:";
    			t9 = space();
    			div0 = element("div");
    			p2 = element("p");
    			p2.textContent = "To use a Skill with assistants, everyone rolls. Use the best roll unless someone Botches, then use that.";
    			t11 = space();
    			button2 = element("button");
    			button2.textContent = "RETRAINING SKILLS:";
    			t13 = space();
    			div1 = element("div");
    			p3 = element("p");
    			p3.textContent = "1/month for 6XP you may move 1 point between Skills. You cannot lower a Skill to 0.";
    			t15 = space();
    			button3 = element("button");
    			button3.textContent = "AGILITY SKILLS";
    			t17 = space();
    			div14 = element("div");
    			button4 = element("button");
    			button4.textContent = "ACROBATICS";
    			t19 = space();
    			div5 = element("div");
    			p4 = element("p");
    			p4.textContent = "Gymnastic prowess.";
    			t21 = space();
    			button5 = element("button");
    			button5.textContent = "(DODGE)";
    			t23 = space();
    			div2 = element("div");
    			p5 = element("p");
    			p5.textContent = "Fast. Roll vs an ATK. 1:Prone.";
    			t25 = space();
    			button6 = element("button");
    			button6.textContent = "(JUMP)";
    			t27 = space();
    			div3 = element("div");
    			p6 = element("p");
    			p6.textContent = "6#. Takes your action. 1:Fall, 1 BDMG/yd.";
    			t29 = space();
    			p7 = element("p");
    			p7.textContent = "Standing Long Jump: Speed /2 yds";
    			t31 = space();
    			p8 = element("p");
    			p8.textContent = "Running Long Jump: Speed yds";
    			t33 = space();
    			p9 = element("p");
    			p9.textContent = "Vertical Jump: Speed x3\"";
    			t35 = space();
    			button7 = element("button");
    			button7.textContent = "(TUMBLE)";
    			t37 = space();
    			div4 = element("div");
    			p10 = element("p");
    			p10.textContent = "# = yds to halve fall DMG [1 BDMG/yd] and choose Location. 1:Prone + Stunned d6rnds.";
    			t39 = space();
    			button8 = element("button");
    			button8.textContent = "LARCENY";
    			t41 = space();
    			div9 = element("div");
    			p11 = element("p");
    			p11.textContent = "Delicate operations requiring finesse. 1/rnd.";
    			t43 = space();
    			button9 = element("button");
    			button9.textContent = "(CONCEAL)";
    			t45 = space();
    			div6 = element("div");
    			p12 = element("p");
    			p12.textContent = "Hide items. Penalty = item Size. 1:Detected.";
    			t47 = space();
    			button10 = element("button");
    			button10.textContent = "(DISABLE)";
    			t49 = space();
    			div7 = element("div");
    			p13 = element("p");
    			p13.textContent = "# by item. Takes d6mins 1:Breaks or explodes.";
    			t51 = space();
    			button11 = element("button");
    			button11.textContent = "(STEAL)";
    			t53 = space();
    			div8 = element("div");
    			p14 = element("p");
    			p14.textContent = "Roll vs Perception to pick pocket. 1:Detected.";
    			t55 = space();
    			button12 = element("button");
    			button12.textContent = "RANGED";
    			t57 = space();
    			div13 = element("div");
    			p15 = element("p");
    			p15.textContent = "Projectile fighting techniques. See Ch:2.";
    			t59 = space();
    			button13 = element("button");
    			button13.textContent = "(ARCHERY)";
    			t61 = space();
    			div10 = element("div");
    			p16 = element("p");
    			p16.textContent = "Roll vs DEF. 1:Arrow lost or broken.";
    			t63 = space();
    			button14 = element("button");
    			button14.textContent = "(GUNS)";
    			t65 = space();
    			div11 = element("div");
    			p17 = element("p");
    			p17.textContent = "Roll vs DEF. 1:Jammed dud. 1rnd to clear.";
    			t67 = space();
    			button15 = element("button");
    			button15.textContent = "(THROW)";
    			t69 = space();
    			div12 = element("div");
    			p18 = element("p");
    			p18.textContent = "Roll vs DEF. RNG = C x2. 1:Broken weapon.";
    			t71 = space();
    			button16 = element("button");
    			button16.textContent = "BRAINS SKILLS";
    			t73 = space();
    			div27 = element("div");
    			button17 = element("button");
    			button17.textContent = "MEDICINE";
    			t75 = space();
    			div18 = element("div");
    			p19 = element("p");
    			p19.textContent = "# = total DMG. Requires MEDICAL Gear.";
    			t77 = space();
    			button18 = element("button");
    			button18.textContent = "(FIRST-AID)";
    			t79 = space();
    			div15 = element("div");
    			p20 = element("p");
    			p20.textContent = "Stop Bleeding. Requires a Bandage, First-Aid Kit, or EMT Bag. Takes 1min. 1:Bleed 1DMG.";
    			t81 = space();
    			button19 = element("button");
    			button19.textContent = "(PSYCHOLOGY)";
    			t83 = space();
    			div16 = element("div");
    			p21 = element("p");
    			p21.textContent = "12# – Psyche. Subject gets +1 Psyche 1/week. Takes d6hrs. 1:-1 Psyche. See PSYCHE in Ch:4.";
    			t85 = space();
    			button20 = element("button");
    			button20.textContent = "(SURGERY)";
    			t87 = space();
    			div17 = element("div");
    			p22 = element("p");
    			p22.textContent = "Heals 1HP to one Location and allows a disabled Location to fully Recover it’s maximum HP naturally. Roll once per wound. Takes 15min/DMG. 1: d6DMG and Bleeding.";
    			t89 = space();
    			button21 = element("button");
    			button21.textContent = "SCIENCE";
    			t91 = space();
    			div22 = element("div");
    			p23 = element("p");
    			p23.textContent = "Knowledge and use of scientific data.";
    			t93 = space();
    			button22 = element("button");
    			button22.textContent = "CHEMISTRY";
    			t95 = space();
    			div19 = element("div");
    			p24 = element("p");
    			p24.textContent = "BOMBS/DRUGS cost d6+# Chemicals and # x10mins. 1:Instant detonation (for BOMBS) or d6 Torso DMG to user (for DRUGS). See Ch:3.";
    			t97 = space();
    			button23 = element("button");
    			button23.textContent = "PHYSICS";
    			t99 = space();
    			div20 = element("div");
    			p25 = element("p");
    			p25.textContent = "1/task. Takes d6mins. Base 9#. Add Brains to a physical task roll. 1:Brains is a penalty.";
    			t101 = space();
    			button24 = element("button");
    			button24.textContent = "TECH";
    			t103 = space();
    			div21 = element("div");
    			p26 = element("p");
    			p26.textContent = "Base 12# to hack computer systems. Base 3# to control electronic devices. Roll item # to craft DIY ELECTRONICS. 1:Broken. See Ch:6.";
    			t105 = space();
    			button25 = element("button");
    			button25.textContent = "SURVIVAL";
    			t107 = space();
    			div26 = element("div");
    			p27 = element("p");
    			p27.textContent = ">Primitive practices for living outdoors.";
    			t109 = space();
    			button26 = element("button");
    			button26.textContent = "CAMPING";
    			t111 = space();
    			div23 = element("div");
    			p28 = element("p");
    			p28.textContent = "6#. Takes 1hr. Making fire and shelter costs 1 Wood/hr, prevents Hypothermia, and allows you to cook. Also used for tying knots (d6rnds).";
    			t113 = space();
    			button27 = element("button");
    			button27.textContent = "FORAGE";
    			t115 = space();
    			div24 = element("div");
    			p29 = element("p");
    			p29.textContent = "Find 1 Food, Water, Bandage, or d6 Wood. Takes 1hr. 1:d6 Torso DMG from Food/Water.";
    			t117 = space();
    			button28 = element("button");
    			button28.textContent = "NAVIGATE";
    			t119 = space();
    			div25 = element("div");
    			p30 = element("p");
    			p30.textContent = "Travel to destination. See Ecosystems in Ch:4. Roll vs Perception to cover tracks. 1:Lost.";
    			t121 = space();
    			button29 = element("button");
    			button29.textContent = "CONSTITUTION SKILLS";
    			t123 = space();
    			div42 = element("div");
    			button30 = element("button");
    			button30.textContent = "BUILD";
    			t125 = space();
    			div33 = element("div");
    			p31 = element("p");
    			p31.textContent = "Make items from Parts. Base requirements are 6#, 1hr/1#, and d6+# Parts. 1:Tool broke.";
    			t127 = space();
    			button31 = element("button");
    			button31.textContent = "(CUSTOMIZE)";
    			t129 = space();
    			div30 = element("div");
    			p32 = element("p");
    			p32.textContent = "Base 9#. Each roll is 1 day of work. Reduce remaining # by the result. Costs d6+1 Parts. Max 3/item. Limit 1 each. 1:Item broke.";
    			t131 = space();
    			button32 = element("button");
    			button32.textContent = "WEAPON CUSTOMIZATIONS";
    			t133 = space();
    			div28 = element("div");
    			ul0 = element("ul");
    			li0 = element("li");
    			li0.textContent = "+1 RATK";
    			t135 = space();
    			li1 = element("li");
    			li1.textContent = "+1 Melee DMG";
    			t137 = space();
    			li2 = element("li");
    			li2.textContent = "-1 Size";
    			t139 = space();
    			li3 = element("li");
    			li3.textContent = "Change caliber";
    			t141 = space();
    			li4 = element("li");
    			li4.textContent = "Add a WEAPON ATTRIBUTE";
    			t143 = space();
    			button33 = element("button");
    			button33.textContent = "ARMOR CUSTOMIZATIONS";
    			t145 = space();
    			div29 = element("div");
    			ul1 = element("ul");
    			li5 = element("li");
    			li5.textContent = "+1 AR";
    			t147 = space();
    			li6 = element("li");
    			li6.textContent = "+1 Grab DMG";
    			t149 = space();
    			li7 = element("li");
    			li7.textContent = "-1 Size";
    			t151 = space();
    			li8 = element("li");
    			li8.textContent = "Add an ARMOR ATTRIBUTE";
    			t153 = space();
    			button34 = element("button");
    			button34.textContent = "(REPAIR)";
    			t155 = space();
    			div31 = element("div");
    			p33 = element("p");
    			p33.textContent = "Fix broken items. Base 6#, takes d6hrs, costs d6 Parts. +1 using same Parts. 1:Parts broke.";
    			t157 = space();
    			button35 = element("button");
    			button35.textContent = "(SALVAGE)";
    			t159 = space();
    			div32 = element("div");
    			p34 = element("p");
    			p34.textContent = "3#, takes d6hrs. Get Parts = [Result /2].";
    			t161 = space();
    			button36 = element("button");
    			button36.textContent = "DRIVE";
    			t163 = space();
    			div37 = element("div");
    			p35 = element("p");
    			p35.textContent = "3#. 1/hr or 1/rnd. 1:Wreck, see Ch:3.";
    			t165 = space();
    			button37 = element("button");
    			button37.textContent = "(FLY)";
    			t167 = space();
    			div34 = element("div");
    			p36 = element("p");
    			p36.textContent = "Used for piloting AIRCRAFT. -6 and unable to take off/land unless you take Pilot License.";
    			t169 = space();
    			button38 = element("button");
    			button38.textContent = "(COMBAT)";
    			t171 = space();
    			div35 = element("div");
    			p37 = element("p");
    			p37.textContent = "Ram and Fixed Gun ATKs or Swerve DEF. See Vehicle Combat in Ch:3 for details.";
    			t173 = space();
    			button39 = element("button");
    			button39.textContent = "(STUNT)";
    			t175 = space();
    			div36 = element("div");
    			p38 = element("p");
    			p38.textContent = "Accelerating, braking, and hard turns. 6#. See Driving in Ch:3 for details.";
    			t177 = space();
    			button40 = element("button");
    			button40.textContent = "MELEE";
    			t179 = space();
    			div41 = element("div");
    			p39 = element("p");
    			p39.textContent = "Hand-to-hand combat. See Ch:2.";
    			t181 = space();
    			button41 = element("button");
    			button41.textContent = "(BLOCK)";
    			t183 = space();
    			div38 = element("div");
    			p40 = element("p");
    			p40.textContent = "Fast. Roll vs ATK. Can only Block Guns when using a Shield as Cover. 1:Broken weapon.";
    			t185 = space();
    			button42 = element("button");
    			button42.textContent = "(UNARMED)";
    			t187 = space();
    			div39 = element("div");
    			p41 = element("p");
    			p41.textContent = "Roll vs DEF. Punch or Headbutt: 1 BDMG. Kick: 2 BDMG. Add DMG Mod. 1:Prone.";
    			t189 = space();
    			button43 = element("button");
    			button43.textContent = "(WEAPONRY)";
    			t191 = space();
    			div40 = element("div");
    			p42 = element("p");
    			p42.textContent = "Roll vs DEF. 1:Drop weapon.";
    			t193 = space();
    			button44 = element("button");
    			button44.textContent = "DEMEANOR SKILLS";
    			t195 = space();
    			div62 = element("div");
    			button45 = element("button");
    			button45.textContent = "ENTERTAIN";
    			t197 = space();
    			div46 = element("div");
    			p43 = element("p");
    			p43.textContent = "Any performance that captivates an audience.";
    			t199 = space();
    			button46 = element("button");
    			button46.textContent = "(DISTRACT)";
    			t201 = space();
    			div43 = element("div");
    			p44 = element("p");
    			p44.textContent = "Roll vs B. Target cannot use active DEF and Fails all Perception rolls for 1rnd. 1:Prone.";
    			t203 = space();
    			button47 = element("button");
    			button47.textContent = "(INSPIRE)";
    			t205 = space();
    			div44 = element("div");
    			p45 = element("p");
    			p45.textContent = "1/week. d6mins. # = Comrades present. Each Comrade gets +1 Psyche. 1:-1 Psyche.";
    			t207 = space();
    			button48 = element("button");
    			button48.textContent = "(LIE)";
    			t209 = space();
    			div45 = element("div");
    			p46 = element("p");
    			p46.textContent = "Roll vs Perception. Lie sincerely. 1:Slip up.";
    			t211 = space();
    			button49 = element("button");
    			button49.textContent = "LEADERSHIP";
    			t213 = space();
    			div50 = element("div");
    			p47 = element("p");
    			p47.textContent = "Using your force of personality on others.";
    			t215 = space();
    			button50 = element("button");
    			button50.textContent = "(ENCOURAGE)";
    			t217 = space();
    			div47 = element("div");
    			p48 = element("p");
    			p48.textContent = "1rnd. # = Comrade’s Demeanors. +d6 divided among Comrades to a roll each. 1:-1 all rolls.";
    			t219 = space();
    			button51 = element("button");
    			button51.textContent = "(ORDER)";
    			t221 = space();
    			div48 = element("div");
    			p49 = element("p");
    			p49.textContent = "Roll vs D. -3 per Order per day. Target Extra obeys a harmless command. 1:Target disobeys.";
    			t223 = space();
    			button52 = element("button");
    			button52.textContent = "(TAUNT)";
    			t225 = space();
    			div49 = element("div");
    			p50 = element("p");
    			p50.textContent = "Roll vs D. Provoke ATK in combat. High roll is a penalty to loser’s next roll. 1:Penalty x2.";
    			t227 = space();
    			button53 = element("button");
    			button53.textContent = "TAME";
    			t229 = space();
    			div61 = element("div");
    			p51 = element("p");
    			p51.textContent = "1/rnd. Roll vs Animal's D. Pets are Comrades.";
    			t231 = space();
    			button54 = element("button");
    			button54.textContent = "(CALM)";
    			t233 = space();
    			div51 = element("div");
    			p52 = element("p");
    			p52.textContent = "Improve animal's Attitude by 1. 1:Fight/flee.";
    			t235 = space();
    			button55 = element("button");
    			button55.textContent = "(RIDE)";
    			t237 = space();
    			div52 = element("div");
    			p53 = element("p");
    			p53.textContent = "Mount obeys commands. 1:Thrown, d6 BDMG.";
    			t239 = space();
    			button56 = element("button");
    			button56.textContent = "(TRAIN)";
    			t241 = space();
    			div60 = element("div");
    			p54 = element("p");
    			p54.textContent = "Takes 1 week. An animal can learn a number of Tricks = [its Brains x2]. One word commands.";
    			t243 = space();
    			button57 = element("button");
    			button57.textContent = "TRICKS";
    			t245 = space();
    			div59 = element("div");
    			button58 = element("button");
    			button58.textContent = "ATTACK";
    			t247 = space();
    			div53 = element("div");
    			p55 = element("p");
    			p55.textContent = "MATK against a designated target.";
    			t249 = space();
    			button59 = element("button");
    			button59.textContent = "GUARD";
    			t251 = space();
    			div54 = element("div");
    			p56 = element("p");
    			p56.textContent = "Stays close and alerts you if strangers approach.";
    			t253 = space();
    			button60 = element("button");
    			button60.textContent = "HIDE";
    			t255 = space();
    			div55 = element("div");
    			p57 = element("p");
    			p57.textContent = "Stealth nearby until further notice.";
    			t257 = space();
    			button61 = element("button");
    			button61.textContent = "HUNTING";
    			t259 = space();
    			div56 = element("div");
    			p58 = element("p");
    			p58.textContent = "Hunting roll using the pet's Skills. See Ch:4.";
    			t261 = space();
    			button62 = element("button");
    			button62.textContent = "PERFORM";
    			t263 = space();
    			div57 = element("div");
    			p59 = element("p");
    			p59.textContent = "Entertain(Distract or Inspire) an audience.";
    			t265 = space();
    			button63 = element("button");
    			button63.textContent = "SEARCH";
    			t267 = space();
    			div58 = element("div");
    			p60 = element("p");
    			p60.textContent = "Show it an item. Perception to go find another.";
    			add_location(h2, file$e, 1, 4, 31);
    			attr_dev(button0, "id", "SkillsBtn");
    			attr_dev(button0, "class", "Btn");
    			add_location(button0, file$e, 2, 4, 51);
    			add_location(p0, file$e, 4, 8, 148);
    			add_location(p1, file$e, 5, 8, 422);
    			attr_dev(button1, "id", "SkillCooperationBtn");
    			attr_dev(button1, "class", "Btn");
    			add_location(button1, file$e, 6, 8, 466);
    			add_location(p2, file$e, 8, 12, 597);
    			attr_dev(div0, "id", "SkillCooperationSec");
    			attr_dev(div0, "class", "Sec3");
    			add_location(div0, file$e, 7, 8, 541);
    			attr_dev(button2, "id", "RetrainingSkillsBtn");
    			attr_dev(button2, "class", "Btn");
    			add_location(button2, file$e, 10, 8, 732);
    			add_location(p3, file$e, 12, 12, 869);
    			attr_dev(div1, "id", "RetrainingSkillsSec");
    			attr_dev(div1, "class", "Sec3");
    			add_location(div1, file$e, 11, 8, 813);
    			attr_dev(button3, "id", "AgilitySkillsBtn");
    			attr_dev(button3, "class", "Btn");
    			add_location(button3, file$e, 14, 8, 983);
    			attr_dev(button4, "id", "AcrobaticsSkillBtn");
    			attr_dev(button4, "class", "Btn");
    			add_location(button4, file$e, 16, 12, 1110);
    			add_location(p4, file$e, 18, 16, 1245);
    			attr_dev(button5, "id", "DodgeSpecialtyBtn");
    			attr_dev(button5, "class", "Btn");
    			add_location(button5, file$e, 19, 16, 1287);
    			add_location(p5, file$e, 21, 20, 1425);
    			attr_dev(div2, "id", "DodgeSpecialtySec");
    			attr_dev(div2, "class", "Sec5");
    			add_location(div2, file$e, 20, 16, 1363);
    			attr_dev(button6, "id", "JumpSpecialtyBtn");
    			attr_dev(button6, "class", "Btn");
    			add_location(button6, file$e, 23, 16, 1502);
    			add_location(p6, file$e, 25, 20, 1637);
    			add_location(p7, file$e, 26, 20, 1706);
    			add_location(p8, file$e, 27, 20, 1766);
    			add_location(p9, file$e, 28, 20, 1822);
    			attr_dev(div3, "id", "JumpSpecialtySec");
    			attr_dev(div3, "class", "Sec5");
    			add_location(div3, file$e, 24, 16, 1576);
    			attr_dev(button7, "id", "TumbleSpecialtyBtn");
    			attr_dev(button7, "class", "Btn");
    			add_location(button7, file$e, 29, 22, 1876);
    			add_location(p10, file$e, 31, 20, 2017);
    			attr_dev(div4, "id", "TumbleSpecialtySec");
    			attr_dev(div4, "class", "Sec5");
    			add_location(div4, file$e, 30, 16, 1954);
    			attr_dev(div5, "id", "AcrobaticsSkillSec");
    			attr_dev(div5, "class", "Sec4");
    			add_location(div5, file$e, 17, 12, 1186);
    			attr_dev(button8, "id", "LarcenySkillBtn");
    			attr_dev(button8, "class", "Btn");
    			add_location(button8, file$e, 34, 12, 2163);
    			add_location(p11, file$e, 36, 16, 2289);
    			attr_dev(button9, "id", "ConcealSpecialtyBtn");
    			attr_dev(button9, "class", "Btn");
    			add_location(button9, file$e, 37, 16, 2358);
    			add_location(p12, file$e, 39, 20, 2502);
    			attr_dev(div6, "id", "ConcealSpecialtySec");
    			attr_dev(div6, "class", "Sec5");
    			add_location(div6, file$e, 38, 16, 2438);
    			attr_dev(button10, "id", "DisableSpecialtyBtn");
    			attr_dev(button10, "class", "Btn");
    			add_location(button10, file$e, 41, 16, 2593);
    			add_location(p13, file$e, 43, 20, 2737);
    			attr_dev(div7, "id", "DisableSpecialtySec");
    			attr_dev(div7, "class", "Sec5");
    			add_location(div7, file$e, 42, 16, 2673);
    			attr_dev(button11, "id", "StealSpecialtyBtn");
    			attr_dev(button11, "class", "Btn");
    			add_location(button11, file$e, 45, 16, 2829);
    			add_location(p14, file$e, 47, 20, 2967);
    			attr_dev(div8, "id", "StealSpecialtySec");
    			attr_dev(div8, "class", "Sec5");
    			add_location(div8, file$e, 46, 16, 2905);
    			attr_dev(div9, "id", "LarcenySkillSec");
    			attr_dev(div9, "class", "Sec4");
    			add_location(div9, file$e, 35, 12, 2233);
    			attr_dev(button12, "id", "RangedSkillBtn");
    			attr_dev(button12, "class", "Btn");
    			add_location(button12, file$e, 50, 12, 3075);
    			add_location(p15, file$e, 52, 16, 3198);
    			attr_dev(button13, "id", "ArcherySpecialtyBtn");
    			attr_dev(button13, "class", "Btn");
    			add_location(button13, file$e, 53, 16, 3263);
    			add_location(p16, file$e, 55, 20, 3407);
    			attr_dev(div10, "id", "ArcherySpecialtySec");
    			attr_dev(div10, "class", "Sec5");
    			add_location(div10, file$e, 54, 16, 3343);
    			attr_dev(button14, "id", "GunsSpecialtyBtn");
    			attr_dev(button14, "class", "Btn");
    			add_location(button14, file$e, 57, 16, 3490);
    			add_location(p17, file$e, 59, 20, 3625);
    			attr_dev(div11, "id", "GunsSpecialtySec");
    			attr_dev(div11, "class", "Sec5");
    			add_location(div11, file$e, 58, 16, 3564);
    			attr_dev(button15, "id", "ThrowSpecialtyBtn");
    			attr_dev(button15, "class", "Btn");
    			add_location(button15, file$e, 61, 16, 3713);
    			add_location(p18, file$e, 63, 20, 3851);
    			attr_dev(div12, "id", "ThrowSpecialtySec");
    			attr_dev(div12, "class", "Sec5");
    			add_location(div12, file$e, 62, 16, 3789);
    			attr_dev(div13, "id", "RangedSkillSec");
    			attr_dev(div13, "class", "Sec4");
    			add_location(div13, file$e, 51, 12, 3143);
    			attr_dev(div14, "id", "AgilitySkillsSec");
    			attr_dev(div14, "class", "Sec3");
    			add_location(div14, file$e, 15, 8, 1057);
    			attr_dev(button16, "id", "BrainsSkillsBtn");
    			attr_dev(button16, "class", "Btn");
    			add_location(button16, file$e, 67, 8, 3965);
    			attr_dev(button17, "id", "MedicineSkillBtn");
    			attr_dev(button17, "class", "Btn");
    			add_location(button17, file$e, 69, 12, 4089);
    			add_location(p19, file$e, 71, 16, 4218);
    			attr_dev(button18, "id", "FirstAidSpecialtyBtn");
    			attr_dev(button18, "class", "Btn");
    			add_location(button18, file$e, 72, 16, 4279);
    			add_location(p20, file$e, 74, 20, 4427);
    			attr_dev(div15, "id", "FirstAidSpecialtySec");
    			attr_dev(div15, "class", "Sec5");
    			add_location(div15, file$e, 73, 16, 4362);
    			attr_dev(button19, "id", "PsychologySpecialtyBtn");
    			attr_dev(button19, "class", "Btn");
    			add_location(button19, file$e, 75, 22, 4544);
    			add_location(p21, file$e, 77, 20, 4697);
    			attr_dev(div16, "id", "PsychologySpecialtySec");
    			attr_dev(div16, "class", "Sec5");
    			add_location(div16, file$e, 76, 16, 4630);
    			attr_dev(button20, "id", "SurgerySpecialtyBtn");
    			attr_dev(button20, "class", "Btn");
    			add_location(button20, file$e, 78, 22, 4817);
    			add_location(p22, file$e, 80, 20, 4961);
    			attr_dev(div17, "id", "SurgerySpecialtySec");
    			attr_dev(div17, "class", "Sec5");
    			add_location(div17, file$e, 79, 16, 4897);
    			attr_dev(div18, "id", "MedicineSkillSec");
    			attr_dev(div18, "class", "Sec4");
    			add_location(div18, file$e, 70, 12, 4161);
    			attr_dev(button21, "id", "ScienceSkillBtn");
    			attr_dev(button21, "class", "Btn");
    			add_location(button21, file$e, 83, 12, 5184);
    			add_location(p23, file$e, 85, 16, 5310);
    			attr_dev(button22, "id", "ChemistrySpecialtyBtn");
    			attr_dev(button22, "class", "Btn");
    			add_location(button22, file$e, 86, 16, 5371);
    			add_location(p24, file$e, 88, 20, 5519);
    			attr_dev(div19, "id", "ChemistrySpecialtySec");
    			attr_dev(div19, "class", "Sec5");
    			add_location(div19, file$e, 87, 16, 5453);
    			attr_dev(button23, "id", "PhysicsSpecialtyBtn");
    			attr_dev(button23, "class", "Btn");
    			add_location(button23, file$e, 90, 16, 5692);
    			add_location(p25, file$e, 92, 20, 5834);
    			attr_dev(div20, "id", "PhysicsSpecialtySec");
    			attr_dev(div20, "class", "Sec5");
    			add_location(div20, file$e, 91, 16, 5770);
    			attr_dev(button24, "id", "TechSpecialtyBtn");
    			attr_dev(button24, "class", "Btn");
    			add_location(button24, file$e, 94, 16, 5970);
    			add_location(p26, file$e, 96, 20, 6103);
    			attr_dev(div21, "id", "TechSpecialtySec");
    			attr_dev(div21, "class", "Sec5");
    			add_location(div21, file$e, 95, 16, 6042);
    			attr_dev(div22, "id", "ScienceSkillSec");
    			attr_dev(div22, "class", "Sec4");
    			add_location(div22, file$e, 84, 12, 5254);
    			attr_dev(button25, "id", "SurvivalSkillBtn");
    			attr_dev(button25, "class", "Btn");
    			add_location(button25, file$e, 99, 12, 6296);
    			add_location(p27, file$e, 101, 16, 6425);
    			attr_dev(button26, "id", "CampingSpecialtyBtn");
    			attr_dev(button26, "class", "Btn");
    			add_location(button26, file$e, 102, 16, 6490);
    			add_location(p28, file$e, 104, 20, 6632);
    			attr_dev(div23, "id", "CampingSpecialtySec");
    			attr_dev(div23, "class", "Sec5");
    			add_location(div23, file$e, 103, 16, 6568);
    			attr_dev(button27, "id", "ForageSpecialtyBtn");
    			attr_dev(button27, "class", "Btn");
    			add_location(button27, file$e, 106, 16, 6816);
    			add_location(p29, file$e, 108, 20, 6955);
    			attr_dev(div24, "id", "ForageSpecialtySec");
    			attr_dev(div24, "class", "Sec5");
    			add_location(div24, file$e, 107, 16, 6892);
    			attr_dev(button28, "id", "NavigateSpecialtyBtn");
    			attr_dev(button28, "class", "Btn");
    			add_location(button28, file$e, 110, 16, 7085);
    			add_location(p30, file$e, 112, 20, 7230);
    			attr_dev(div25, "id", "NavigateSpecialtySec");
    			attr_dev(div25, "class", "Sec5");
    			add_location(div25, file$e, 111, 16, 7165);
    			attr_dev(div26, "id", "SurvivalSkillSec");
    			attr_dev(div26, "class", "Sec4");
    			add_location(div26, file$e, 100, 12, 6368);
    			attr_dev(div27, "id", "BrainsSkillsSec");
    			attr_dev(div27, "class", "Sec3");
    			add_location(div27, file$e, 68, 8, 4037);
    			attr_dev(button29, "id", "ConstitutionSkillsBtn");
    			attr_dev(button29, "class", "Btn");
    			add_location(button29, file$e, 116, 8, 7393);
    			attr_dev(button30, "id", "BuildSkillBtn");
    			attr_dev(button30, "class", "Btn");
    			add_location(button30, file$e, 118, 12, 7535);
    			add_location(p31, file$e, 120, 16, 7655);
    			attr_dev(button31, "id", "CustomizeSpecialtyBtn");
    			attr_dev(button31, "class", "Btn");
    			add_location(button31, file$e, 121, 16, 7765);
    			add_location(p32, file$e, 123, 20, 7915);
    			attr_dev(button32, "id", "WeaponCustomizationsBtn");
    			attr_dev(button32, "class", "Btn");
    			add_location(button32, file$e, 124, 20, 8071);
    			add_location(li0, file$e, 127, 28, 8276);
    			add_location(li1, file$e, 128, 28, 8321);
    			add_location(li2, file$e, 129, 28, 8371);
    			add_location(li3, file$e, 130, 28, 8416);
    			add_location(li4, file$e, 131, 28, 8468);
    			add_location(ul0, file$e, 126, 24, 8243);
    			attr_dev(div28, "id", "WeaponCustomizationsSec");
    			attr_dev(div28, "class", "Sec6");
    			add_location(div28, file$e, 125, 20, 8171);
    			attr_dev(button33, "id", "ArmorCustomizationsBtn");
    			attr_dev(button33, "class", "Btn");
    			add_location(button33, file$e, 134, 20, 8577);
    			add_location(li5, file$e, 137, 28, 8779);
    			add_location(li6, file$e, 138, 28, 8822);
    			add_location(li7, file$e, 139, 28, 8871);
    			add_location(li8, file$e, 140, 28, 8916);
    			add_location(ul1, file$e, 136, 24, 8746);
    			attr_dev(div29, "id", "ArmorCustomizationsSec");
    			attr_dev(div29, "class", "Sec6");
    			add_location(div29, file$e, 135, 20, 8675);
    			attr_dev(div30, "id", "CustomizeSpecialtySec");
    			attr_dev(div30, "class", "Sec5");
    			add_location(div30, file$e, 122, 16, 7849);
    			attr_dev(button34, "id", "RepairSpecialtyBtn");
    			attr_dev(button34, "class", "Btn");
    			add_location(button34, file$e, 144, 16, 9044);
    			add_location(p33, file$e, 146, 20, 9185);
    			attr_dev(div31, "id", "RepairSpecialtySec");
    			attr_dev(div31, "class", "Sec5");
    			add_location(div31, file$e, 145, 16, 9122);
    			attr_dev(button35, "id", "SalvageSpecialtyBtn");
    			attr_dev(button35, "class", "Btn");
    			add_location(button35, file$e, 148, 16, 9323);
    			add_location(p34, file$e, 150, 20, 9467);
    			attr_dev(div32, "id", "SalvageSpecialtySec");
    			attr_dev(div32, "class", "Sec5");
    			add_location(div32, file$e, 149, 16, 9403);
    			attr_dev(div33, "id", "BuildSkillSec");
    			attr_dev(div33, "class", "Sec4");
    			add_location(div33, file$e, 119, 12, 7601);
    			attr_dev(button36, "id", "DriveSkillBtn");
    			attr_dev(button36, "class", "Btn");
    			add_location(button36, file$e, 153, 12, 9570);
    			add_location(p35, file$e, 155, 16, 9690);
    			attr_dev(button37, "id", "FlySpecialtyBtn");
    			attr_dev(button37, "class", "Btn");
    			add_location(button37, file$e, 156, 16, 9751);
    			add_location(p36, file$e, 158, 20, 9883);
    			attr_dev(div34, "id", "FlySpecialtySec");
    			attr_dev(div34, "class", "Sec5");
    			add_location(div34, file$e, 157, 16, 9823);
    			attr_dev(button38, "id", "CombatSpecialtyBtn");
    			attr_dev(button38, "class", "Btn");
    			add_location(button38, file$e, 160, 16, 10019);
    			add_location(p37, file$e, 162, 20, 10160);
    			attr_dev(div35, "id", "CombatSpecialtySec");
    			attr_dev(div35, "class", "Sec5");
    			add_location(div35, file$e, 161, 16, 10097);
    			attr_dev(button39, "id", "StuntSpecialtyBtn");
    			attr_dev(button39, "class", "Btn");
    			add_location(button39, file$e, 164, 16, 10284);
    			add_location(p38, file$e, 166, 20, 10422);
    			attr_dev(div36, "id", "StuntSpecialtySec");
    			attr_dev(div36, "class", "Sec5");
    			add_location(div36, file$e, 165, 16, 10360);
    			attr_dev(div37, "id", "DriveSkillSec");
    			attr_dev(div37, "class", "Sec4");
    			add_location(div37, file$e, 154, 12, 9636);
    			attr_dev(button40, "id", "MeleeSkillBtn");
    			attr_dev(button40, "class", "Btn");
    			add_location(button40, file$e, 169, 12, 10559);
    			add_location(p39, file$e, 171, 16, 10679);
    			attr_dev(button41, "id", "BlockSpecialtyBtn");
    			attr_dev(button41, "class", "Btn");
    			add_location(button41, file$e, 172, 16, 10733);
    			add_location(p40, file$e, 174, 20, 10871);
    			attr_dev(div38, "id", "BlockSpecialtySec");
    			attr_dev(div38, "class", "Sec5");
    			add_location(div38, file$e, 173, 16, 10809);
    			attr_dev(button42, "id", "UnarmedSpecialtyBtn");
    			attr_dev(button42, "class", "Btn");
    			add_location(button42, file$e, 175, 22, 10986);
    			add_location(p41, file$e, 177, 20, 11130);
    			attr_dev(div39, "id", "UnarmedSpecialtySec");
    			attr_dev(div39, "class", "Sec5");
    			add_location(div39, file$e, 176, 16, 11066);
    			attr_dev(button43, "id", "WeaponrySpecialtyBtn");
    			attr_dev(button43, "class", "Btn");
    			add_location(button43, file$e, 178, 22, 11235);
    			add_location(p42, file$e, 180, 20, 11382);
    			attr_dev(div40, "id", "WeaponrySpecialtySec");
    			attr_dev(div40, "class", "Sec5");
    			add_location(div40, file$e, 179, 16, 11317);
    			attr_dev(div41, "id", "MeleeSkillSec");
    			attr_dev(div41, "class", "Sec4");
    			add_location(div41, file$e, 170, 12, 10625);
    			attr_dev(div42, "id", "ConstitutionSkillsSec");
    			attr_dev(div42, "class", "Sec3");
    			add_location(div42, file$e, 117, 8, 7477);
    			attr_dev(button44, "id", "DemeanorSkillsBtn");
    			attr_dev(button44, "class", "Btn");
    			add_location(button44, file$e, 184, 8, 11482);
    			attr_dev(button45, "id", "EntertainSkillBtn");
    			attr_dev(button45, "class", "Btn");
    			add_location(button45, file$e, 186, 12, 11612);
    			add_location(p43, file$e, 188, 16, 11744);
    			attr_dev(button46, "id", "DistractSpecialtyBtn");
    			attr_dev(button46, "class", "Btn");
    			add_location(button46, file$e, 189, 16, 11812);
    			add_location(p44, file$e, 191, 20, 11959);
    			attr_dev(div43, "id", "DistractSpecialtySec");
    			attr_dev(div43, "class", "Sec5");
    			add_location(div43, file$e, 190, 16, 11894);
    			attr_dev(button47, "id", "InspireSpecialtyBtn");
    			attr_dev(button47, "class", "Btn");
    			add_location(button47, file$e, 193, 16, 12095);
    			add_location(p45, file$e, 195, 20, 12239);
    			attr_dev(div44, "id", "InspireSpecialtySec");
    			attr_dev(div44, "class", "Sec5");
    			add_location(div44, file$e, 194, 16, 12175);
    			attr_dev(button48, "id", "LieSpecialtyBtn");
    			attr_dev(button48, "class", "Btn");
    			add_location(button48, file$e, 197, 16, 12365);
    			add_location(p46, file$e, 199, 20, 12497);
    			attr_dev(div45, "id", "LieSpecialtySec");
    			attr_dev(div45, "class", "Sec5");
    			add_location(div45, file$e, 198, 16, 12437);
    			attr_dev(div46, "id", "EntertainSkillSec");
    			attr_dev(div46, "class", "Sec4");
    			add_location(div46, file$e, 187, 12, 11686);
    			attr_dev(button49, "id", "LeadershipSkillBtn");
    			attr_dev(button49, "class", "Btn");
    			add_location(button49, file$e, 202, 12, 12604);
    			add_location(p47, file$e, 204, 16, 12739);
    			attr_dev(button50, "id", "EncourageSpecialtyBtn");
    			attr_dev(button50, "class", "Btn");
    			add_location(button50, file$e, 205, 16, 12805);
    			add_location(p48, file$e, 207, 20, 12955);
    			attr_dev(div47, "id", "EncourageSpecialtySec");
    			attr_dev(div47, "class", "Sec5");
    			add_location(div47, file$e, 206, 16, 12889);
    			attr_dev(button51, "id", "OrderSpecialtyBtn");
    			attr_dev(button51, "class", "Btn");
    			add_location(button51, file$e, 209, 16, 13091);
    			add_location(p49, file$e, 211, 20, 13229);
    			attr_dev(div48, "id", "OrderSpecialtySec");
    			attr_dev(div48, "class", "Sec5");
    			add_location(div48, file$e, 210, 16, 13167);
    			attr_dev(button52, "id", "TauntSpecialtyBtn");
    			attr_dev(button52, "class", "Btn");
    			add_location(button52, file$e, 213, 16, 13366);
    			add_location(p50, file$e, 215, 20, 13504);
    			attr_dev(div49, "id", "TauntSpecialtySec");
    			attr_dev(div49, "class", "Sec5");
    			add_location(div49, file$e, 214, 16, 13442);
    			attr_dev(div50, "id", "LeadershipSkillSec");
    			attr_dev(div50, "class", "Sec4");
    			add_location(div50, file$e, 203, 12, 12680);
    			attr_dev(button53, "id", "TameSkillBtn");
    			attr_dev(button53, "class", "Btn");
    			add_location(button53, file$e, 218, 12, 13658);
    			add_location(p51, file$e, 220, 16, 13775);
    			attr_dev(button54, "id", "CalmSpecialtyBtn");
    			attr_dev(button54, "class", "Btn");
    			add_location(button54, file$e, 221, 16, 13844);
    			add_location(p52, file$e, 223, 20, 13979);
    			attr_dev(div51, "id", "CalmSpecialtySec");
    			attr_dev(div51, "class", "Sec5");
    			add_location(div51, file$e, 222, 16, 13918);
    			attr_dev(button55, "id", "RideSpecialtyBtn");
    			attr_dev(button55, "class", "Btn");
    			add_location(button55, file$e, 225, 16, 14071);
    			add_location(p53, file$e, 227, 20, 14206);
    			attr_dev(div52, "id", "RideSpecialtySec");
    			attr_dev(div52, "class", "Sec5");
    			add_location(div52, file$e, 226, 16, 14145);
    			attr_dev(button56, "id", "TrainSpecialtyBtn");
    			attr_dev(button56, "class", "Btn");
    			add_location(button56, file$e, 229, 16, 14293);
    			add_location(p54, file$e, 231, 20, 14431);
    			attr_dev(button57, "id", "TricksBtn");
    			attr_dev(button57, "class", "Btn");
    			add_location(button57, file$e, 232, 20, 14549);
    			attr_dev(button58, "id", "AttackTrickBtn");
    			attr_dev(button58, "class", "Btn");
    			add_location(button58, file$e, 234, 24, 14678);
    			add_location(p55, file$e, 236, 28, 14825);
    			attr_dev(div53, "id", "AttackTrickSec");
    			attr_dev(div53, "class", "Sec7");
    			add_location(div53, file$e, 235, 24, 14758);
    			attr_dev(button59, "id", "GuardTrickBtn");
    			attr_dev(button59, "class", "Btn");
    			add_location(button59, file$e, 238, 24, 14921);
    			add_location(p56, file$e, 240, 28, 15065);
    			attr_dev(div54, "id", "GuardTrickSec");
    			attr_dev(div54, "class", "Sec7");
    			add_location(div54, file$e, 239, 24, 14999);
    			attr_dev(button60, "id", "HideTrickBtn");
    			attr_dev(button60, "class", "Btn");
    			add_location(button60, file$e, 242, 24, 15177);
    			add_location(p57, file$e, 244, 28, 15318);
    			attr_dev(div55, "id", "HideTrickSec");
    			attr_dev(div55, "class", "Sec7");
    			add_location(div55, file$e, 243, 24, 15253);
    			attr_dev(button61, "id", "HuntingTrickBtn");
    			attr_dev(button61, "class", "Btn");
    			add_location(button61, file$e, 246, 24, 15417);
    			add_location(p58, file$e, 248, 28, 15567);
    			attr_dev(div56, "id", "HuntingTrickSec");
    			attr_dev(div56, "class", "Sec7");
    			add_location(div56, file$e, 247, 24, 15499);
    			attr_dev(button62, "id", "PerformTrickBtn");
    			attr_dev(button62, "class", "Btn");
    			add_location(button62, file$e, 250, 24, 15676);
    			add_location(p59, file$e, 252, 28, 15826);
    			attr_dev(div57, "id", "PerformTrickSec");
    			attr_dev(div57, "class", "Sec7");
    			add_location(div57, file$e, 251, 24, 15758);
    			attr_dev(button63, "id", "SearchTrickBtn");
    			attr_dev(button63, "class", "Btn");
    			add_location(button63, file$e, 254, 24, 15932);
    			add_location(p60, file$e, 256, 28, 16079);
    			attr_dev(div58, "id", "SearchTrickSec");
    			attr_dev(div58, "class", "Sec7");
    			add_location(div58, file$e, 255, 24, 16012);
    			attr_dev(div59, "id", "TricksSec");
    			attr_dev(div59, "class", "Sec6");
    			add_location(div59, file$e, 233, 20, 14620);
    			attr_dev(div60, "id", "TrainSpecialtySec");
    			attr_dev(div60, "class", "Sec5");
    			add_location(div60, file$e, 230, 16, 14369);
    			attr_dev(div61, "id", "TameSkillSec");
    			attr_dev(div61, "class", "Sec4");
    			add_location(div61, file$e, 219, 12, 13722);
    			attr_dev(div62, "id", "DemeanorSkillsSec");
    			attr_dev(div62, "class", "Sec3");
    			add_location(div62, file$e, 185, 8, 11558);
    			attr_dev(div63, "id", "SkillsSec");
    			attr_dev(div63, "class", "Sec2");
    			add_location(div63, file$e, 3, 4, 106);
    			attr_dev(div64, "class", "skills-rules");
    			add_location(div64, file$e, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div64, anchor);
    			append_dev(div64, h2);
    			append_dev(div64, t1);
    			append_dev(div64, button0);
    			append_dev(div64, t3);
    			append_dev(div64, div63);
    			append_dev(div63, p0);
    			append_dev(div63, t5);
    			append_dev(div63, p1);
    			append_dev(div63, t7);
    			append_dev(div63, button1);
    			append_dev(div63, t9);
    			append_dev(div63, div0);
    			append_dev(div0, p2);
    			append_dev(div63, t11);
    			append_dev(div63, button2);
    			append_dev(div63, t13);
    			append_dev(div63, div1);
    			append_dev(div1, p3);
    			append_dev(div63, t15);
    			append_dev(div63, button3);
    			append_dev(div63, t17);
    			append_dev(div63, div14);
    			append_dev(div14, button4);
    			append_dev(div14, t19);
    			append_dev(div14, div5);
    			append_dev(div5, p4);
    			append_dev(div5, t21);
    			append_dev(div5, button5);
    			append_dev(div5, t23);
    			append_dev(div5, div2);
    			append_dev(div2, p5);
    			append_dev(div5, t25);
    			append_dev(div5, button6);
    			append_dev(div5, t27);
    			append_dev(div5, div3);
    			append_dev(div3, p6);
    			append_dev(div3, t29);
    			append_dev(div3, p7);
    			append_dev(div3, t31);
    			append_dev(div3, p8);
    			append_dev(div3, t33);
    			append_dev(div3, p9);
    			append_dev(div3, t35);
    			append_dev(div5, button7);
    			append_dev(div5, t37);
    			append_dev(div5, div4);
    			append_dev(div4, p10);
    			append_dev(div14, t39);
    			append_dev(div14, button8);
    			append_dev(div14, t41);
    			append_dev(div14, div9);
    			append_dev(div9, p11);
    			append_dev(div9, t43);
    			append_dev(div9, button9);
    			append_dev(div9, t45);
    			append_dev(div9, div6);
    			append_dev(div6, p12);
    			append_dev(div9, t47);
    			append_dev(div9, button10);
    			append_dev(div9, t49);
    			append_dev(div9, div7);
    			append_dev(div7, p13);
    			append_dev(div9, t51);
    			append_dev(div9, button11);
    			append_dev(div9, t53);
    			append_dev(div9, div8);
    			append_dev(div8, p14);
    			append_dev(div14, t55);
    			append_dev(div14, button12);
    			append_dev(div14, t57);
    			append_dev(div14, div13);
    			append_dev(div13, p15);
    			append_dev(div13, t59);
    			append_dev(div13, button13);
    			append_dev(div13, t61);
    			append_dev(div13, div10);
    			append_dev(div10, p16);
    			append_dev(div13, t63);
    			append_dev(div13, button14);
    			append_dev(div13, t65);
    			append_dev(div13, div11);
    			append_dev(div11, p17);
    			append_dev(div13, t67);
    			append_dev(div13, button15);
    			append_dev(div13, t69);
    			append_dev(div13, div12);
    			append_dev(div12, p18);
    			append_dev(div63, t71);
    			append_dev(div63, button16);
    			append_dev(div63, t73);
    			append_dev(div63, div27);
    			append_dev(div27, button17);
    			append_dev(div27, t75);
    			append_dev(div27, div18);
    			append_dev(div18, p19);
    			append_dev(div18, t77);
    			append_dev(div18, button18);
    			append_dev(div18, t79);
    			append_dev(div18, div15);
    			append_dev(div15, p20);
    			append_dev(div15, t81);
    			append_dev(div18, button19);
    			append_dev(div18, t83);
    			append_dev(div18, div16);
    			append_dev(div16, p21);
    			append_dev(div16, t85);
    			append_dev(div18, button20);
    			append_dev(div18, t87);
    			append_dev(div18, div17);
    			append_dev(div17, p22);
    			append_dev(div27, t89);
    			append_dev(div27, button21);
    			append_dev(div27, t91);
    			append_dev(div27, div22);
    			append_dev(div22, p23);
    			append_dev(div22, t93);
    			append_dev(div22, button22);
    			append_dev(div22, t95);
    			append_dev(div22, div19);
    			append_dev(div19, p24);
    			append_dev(div22, t97);
    			append_dev(div22, button23);
    			append_dev(div22, t99);
    			append_dev(div22, div20);
    			append_dev(div20, p25);
    			append_dev(div22, t101);
    			append_dev(div22, button24);
    			append_dev(div22, t103);
    			append_dev(div22, div21);
    			append_dev(div21, p26);
    			append_dev(div27, t105);
    			append_dev(div27, button25);
    			append_dev(div27, t107);
    			append_dev(div27, div26);
    			append_dev(div26, p27);
    			append_dev(div26, t109);
    			append_dev(div26, button26);
    			append_dev(div26, t111);
    			append_dev(div26, div23);
    			append_dev(div23, p28);
    			append_dev(div26, t113);
    			append_dev(div26, button27);
    			append_dev(div26, t115);
    			append_dev(div26, div24);
    			append_dev(div24, p29);
    			append_dev(div26, t117);
    			append_dev(div26, button28);
    			append_dev(div26, t119);
    			append_dev(div26, div25);
    			append_dev(div25, p30);
    			append_dev(div63, t121);
    			append_dev(div63, button29);
    			append_dev(div63, t123);
    			append_dev(div63, div42);
    			append_dev(div42, button30);
    			append_dev(div42, t125);
    			append_dev(div42, div33);
    			append_dev(div33, p31);
    			append_dev(div33, t127);
    			append_dev(div33, button31);
    			append_dev(div33, t129);
    			append_dev(div33, div30);
    			append_dev(div30, p32);
    			append_dev(div30, t131);
    			append_dev(div30, button32);
    			append_dev(div30, t133);
    			append_dev(div30, div28);
    			append_dev(div28, ul0);
    			append_dev(ul0, li0);
    			append_dev(ul0, t135);
    			append_dev(ul0, li1);
    			append_dev(ul0, t137);
    			append_dev(ul0, li2);
    			append_dev(ul0, t139);
    			append_dev(ul0, li3);
    			append_dev(ul0, t141);
    			append_dev(ul0, li4);
    			append_dev(div30, t143);
    			append_dev(div30, button33);
    			append_dev(div30, t145);
    			append_dev(div30, div29);
    			append_dev(div29, ul1);
    			append_dev(ul1, li5);
    			append_dev(ul1, t147);
    			append_dev(ul1, li6);
    			append_dev(ul1, t149);
    			append_dev(ul1, li7);
    			append_dev(ul1, t151);
    			append_dev(ul1, li8);
    			append_dev(div33, t153);
    			append_dev(div33, button34);
    			append_dev(div33, t155);
    			append_dev(div33, div31);
    			append_dev(div31, p33);
    			append_dev(div33, t157);
    			append_dev(div33, button35);
    			append_dev(div33, t159);
    			append_dev(div33, div32);
    			append_dev(div32, p34);
    			append_dev(div42, t161);
    			append_dev(div42, button36);
    			append_dev(div42, t163);
    			append_dev(div42, div37);
    			append_dev(div37, p35);
    			append_dev(div37, t165);
    			append_dev(div37, button37);
    			append_dev(div37, t167);
    			append_dev(div37, div34);
    			append_dev(div34, p36);
    			append_dev(div37, t169);
    			append_dev(div37, button38);
    			append_dev(div37, t171);
    			append_dev(div37, div35);
    			append_dev(div35, p37);
    			append_dev(div37, t173);
    			append_dev(div37, button39);
    			append_dev(div37, t175);
    			append_dev(div37, div36);
    			append_dev(div36, p38);
    			append_dev(div42, t177);
    			append_dev(div42, button40);
    			append_dev(div42, t179);
    			append_dev(div42, div41);
    			append_dev(div41, p39);
    			append_dev(div41, t181);
    			append_dev(div41, button41);
    			append_dev(div41, t183);
    			append_dev(div41, div38);
    			append_dev(div38, p40);
    			append_dev(div38, t185);
    			append_dev(div41, button42);
    			append_dev(div41, t187);
    			append_dev(div41, div39);
    			append_dev(div39, p41);
    			append_dev(div39, t189);
    			append_dev(div41, button43);
    			append_dev(div41, t191);
    			append_dev(div41, div40);
    			append_dev(div40, p42);
    			append_dev(div63, t193);
    			append_dev(div63, button44);
    			append_dev(div63, t195);
    			append_dev(div63, div62);
    			append_dev(div62, button45);
    			append_dev(div62, t197);
    			append_dev(div62, div46);
    			append_dev(div46, p43);
    			append_dev(div46, t199);
    			append_dev(div46, button46);
    			append_dev(div46, t201);
    			append_dev(div46, div43);
    			append_dev(div43, p44);
    			append_dev(div46, t203);
    			append_dev(div46, button47);
    			append_dev(div46, t205);
    			append_dev(div46, div44);
    			append_dev(div44, p45);
    			append_dev(div46, t207);
    			append_dev(div46, button48);
    			append_dev(div46, t209);
    			append_dev(div46, div45);
    			append_dev(div45, p46);
    			append_dev(div62, t211);
    			append_dev(div62, button49);
    			append_dev(div62, t213);
    			append_dev(div62, div50);
    			append_dev(div50, p47);
    			append_dev(div50, t215);
    			append_dev(div50, button50);
    			append_dev(div50, t217);
    			append_dev(div50, div47);
    			append_dev(div47, p48);
    			append_dev(div50, t219);
    			append_dev(div50, button51);
    			append_dev(div50, t221);
    			append_dev(div50, div48);
    			append_dev(div48, p49);
    			append_dev(div50, t223);
    			append_dev(div50, button52);
    			append_dev(div50, t225);
    			append_dev(div50, div49);
    			append_dev(div49, p50);
    			append_dev(div62, t227);
    			append_dev(div62, button53);
    			append_dev(div62, t229);
    			append_dev(div62, div61);
    			append_dev(div61, p51);
    			append_dev(div61, t231);
    			append_dev(div61, button54);
    			append_dev(div61, t233);
    			append_dev(div61, div51);
    			append_dev(div51, p52);
    			append_dev(div61, t235);
    			append_dev(div61, button55);
    			append_dev(div61, t237);
    			append_dev(div61, div52);
    			append_dev(div52, p53);
    			append_dev(div61, t239);
    			append_dev(div61, button56);
    			append_dev(div61, t241);
    			append_dev(div61, div60);
    			append_dev(div60, p54);
    			append_dev(div60, t243);
    			append_dev(div60, button57);
    			append_dev(div60, t245);
    			append_dev(div60, div59);
    			append_dev(div59, button58);
    			append_dev(div59, t247);
    			append_dev(div59, div53);
    			append_dev(div53, p55);
    			append_dev(div59, t249);
    			append_dev(div59, button59);
    			append_dev(div59, t251);
    			append_dev(div59, div54);
    			append_dev(div54, p56);
    			append_dev(div59, t253);
    			append_dev(div59, button60);
    			append_dev(div59, t255);
    			append_dev(div59, div55);
    			append_dev(div55, p57);
    			append_dev(div59, t257);
    			append_dev(div59, button61);
    			append_dev(div59, t259);
    			append_dev(div59, div56);
    			append_dev(div56, p58);
    			append_dev(div59, t261);
    			append_dev(div59, button62);
    			append_dev(div59, t263);
    			append_dev(div59, div57);
    			append_dev(div57, p59);
    			append_dev(div59, t265);
    			append_dev(div59, button63);
    			append_dev(div59, t267);
    			append_dev(div59, div58);
    			append_dev(div58, p60);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div64);
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

    class Skills$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$h, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Skills",
    			options,
    			id: create_fragment$h.name
    		});
    	}
    }

    /* src/components/rules/Terms.svelte generated by Svelte v3.15.0 */

    const file$f = "src/components/rules/Terms.svelte";

    function create_fragment$i(ctx) {
    	let div7;
    	let h2;
    	let t1;
    	let div6;
    	let button0;
    	let t3;
    	let div0;
    	let ul0;
    	let li0;
    	let t5;
    	let li1;
    	let t7;
    	let li2;
    	let t9;
    	let li3;
    	let t11;
    	let li4;
    	let t13;
    	let li5;
    	let t15;
    	let li6;
    	let t17;
    	let li7;
    	let t19;
    	let button1;
    	let t21;
    	let div1;
    	let ul1;
    	let li8;
    	let t23;
    	let li9;
    	let t25;
    	let li10;
    	let t27;
    	let li11;
    	let t29;
    	let li12;
    	let t31;
    	let li13;
    	let t33;
    	let li14;
    	let t35;
    	let li15;
    	let t37;
    	let li16;
    	let t39;
    	let li17;
    	let t41;
    	let li18;
    	let t43;
    	let li19;
    	let t45;
    	let li20;
    	let t47;
    	let li21;
    	let t49;
    	let li22;
    	let t51;
    	let li23;
    	let t53;
    	let li24;
    	let t55;
    	let li25;
    	let t57;
    	let li26;
    	let t59;
    	let li27;
    	let t61;
    	let li28;
    	let t63;
    	let li29;
    	let t65;
    	let li30;
    	let t67;
    	let li31;
    	let t69;
    	let li32;
    	let t71;
    	let li33;
    	let t73;
    	let button2;
    	let t75;
    	let div2;
    	let p0;
    	let t77;
    	let ul2;
    	let li34;
    	let t79;
    	let li35;
    	let t81;
    	let li36;
    	let t83;
    	let li37;
    	let t85;
    	let button3;
    	let t87;
    	let div3;
    	let p1;
    	let t89;
    	let ul3;
    	let li38;
    	let t91;
    	let li39;
    	let t93;
    	let li40;
    	let t95;
    	let li41;
    	let t97;
    	let button4;
    	let t99;
    	let div4;
    	let p2;
    	let t101;
    	let ul4;
    	let li42;
    	let t103;
    	let li43;
    	let t105;
    	let li44;
    	let t107;
    	let li45;
    	let t109;
    	let li46;
    	let t111;
    	let button5;
    	let t113;
    	let div5;
    	let p3;
    	let t115;
    	let ul5;
    	let li47;
    	let t117;
    	let li48;
    	let t119;
    	let li49;
    	let t121;
    	let li50;
    	let t123;
    	let li51;
    	let t125;
    	let li52;
    	let t127;
    	let li53;

    	const block = {
    		c: function create() {
    			div7 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Symbols and Terms";
    			t1 = space();
    			div6 = element("div");
    			button0 = element("button");
    			button0.textContent = "DICE";
    			t3 = space();
    			div0 = element("div");
    			ul0 = element("ul");
    			li0 = element("li");
    			li0.textContent = "d6: One six-sided die. The only dice needed to play.";
    			t5 = space();
    			li1 = element("li");
    			li1.textContent = "DIFFICULTY (#): Target number you must beat to Succeed.";
    			t7 = space();
    			li2 = element("li");
    			li2.textContent = "EXPLODE (6): Rolling 6, rolling again, and adding up all rolls.";
    			t9 = space();
    			li3 = element("li");
    			li3.textContent = "SUCCESS (S): Rolling above #.";
    			t11 = space();
    			li4 = element("li");
    			li4.textContent = "FAIL (F): Rolling at or under #.";
    			t13 = space();
    			li5 = element("li");
    			li5.textContent = "BOTCH (1): Rolling 1, then re-rolling another 1. Very bad.";
    			t15 = space();
    			li6 = element("li");
    			li6.textContent = "MODIFIER: A bonus or penalty to rolls or Difficulties.";
    			t17 = space();
    			li7 = element("li");
    			li7.textContent = "RESULT: The total of a roll plus or minus any modifiers.";
    			t19 = space();
    			button1 = element("button");
    			button1.textContent = "GAME";
    			t21 = space();
    			div1 = element("div");
    			ul1 = element("ul");
    			li8 = element("li");
    			li8.textContent = "ABILITY: Character upgrades that are bought with Experience.";
    			t23 = space();
    			li9 = element("li");
    			li9.textContent = "ACTION: One significant thing a Character does in a round.";
    			t25 = space();
    			li10 = element("li");
    			li10.textContent = "AR: Armor Rating. Protection given by Armor.";
    			t27 = space();
    			li11 = element("li");
    			li11.textContent = "ATK: Attack. Can be Melee or Ranged. Roll vs Defense.";
    			t29 = space();
    			li12 = element("li");
    			li12.textContent = "BDMG: Blunt Damage. Does not cause Bleeding.";
    			t31 = space();
    			li13 = element("li");
    			li13.textContent = "CR: Cold-Resistant. Delays death from Hypothermia.";
    			t33 = space();
    			li14 = element("li");
    			li14.textContent = "DEF: Defense. Block, Dodge, or Reflex. Attack Difficulty.";
    			t35 = space();
    			li15 = element("li");
    			li15.textContent = "DMG: Damage. Reduces Health Points.";
    			t37 = space();
    			li16 = element("li");
    			li16.textContent = "DR: Damage Reduction. Protection given by Cover.";
    			t39 = space();
    			li17 = element("li");
    			li17.textContent = "EXTRAS: Non-Player Characters and creatures.";
    			t41 = space();
    			li18 = element("li");
    			li18.textContent = "FAST: An action that takes only a split second.";
    			t43 = space();
    			li19 = element("li");
    			li19.textContent = "FDMG: Fire Damage. Can be permanent.";
    			t45 = space();
    			li20 = element("li");
    			li20.textContent = "FR: Fire-Resistant. Protection against Fire Damage.";
    			t47 = space();
    			li21 = element("li");
    			li21.textContent = "GN: Game Narrator. The Player who directs the game.";
    			t49 = space();
    			li22 = element("li");
    			li22.textContent = "HP: Health Points. Maximum Damage Locations can take.";
    			t51 = space();
    			li23 = element("li");
    			li23.textContent = "LOCATION: Body parts: Head, Torso, Arms, or Legs.";
    			t53 = space();
    			li24 = element("li");
    			li24.textContent = "MANEUVER: Special kinds of actions Characters may perform.";
    			t55 = space();
    			li25 = element("li");
    			li25.textContent = "MATK or RATK: Melee Attack or Ranged Attack.";
    			t57 = space();
    			li26 = element("li");
    			li26.textContent = "MGL: Master Gear List. Table with every piece of Gear.";
    			t59 = space();
    			li27 = element("li");
    			li27.textContent = "PAIN: Penalty to all rolls from Damage and other sources.";
    			t61 = space();
    			li28 = element("li");
    			li28.textContent = "REFLEX: Passive Defense = Perception.";
    			t63 = space();
    			li29 = element("li");
    			li29.textContent = "RNG: Range incremented in yards.";
    			t65 = space();
    			li30 = element("li");
    			li30.textContent = "RND: Round. 3 seconds of in-game time, usually in combat.";
    			t67 = space();
    			li31 = element("li");
    			li31.textContent = "SCENARIO: The type of apocalypse taking place in your game.";
    			t69 = space();
    			li32 = element("li");
    			li32.textContent = "SITUATION: Circumstances or status effects that cause modifiers.";
    			t71 = space();
    			li33 = element("li");
    			li33.textContent = "SIZE (SZ): Measure of volume and weight. 1Sz ≈ 5lbs ≈ 1/2gal.";
    			t73 = space();
    			button2 = element("button");
    			button2.textContent = "TRAITS";
    			t75 = space();
    			div2 = element("div");
    			p0 = element("p");
    			p0.textContent = "Agility, Brains, Constitution, and Demeanor. Rated 1 to 6.";
    			t77 = space();
    			ul2 = element("ul");
    			li34 = element("li");
    			li34.textContent = "A: Agility Trait. A rolls are shown as A#.";
    			t79 = space();
    			li35 = element("li");
    			li35.textContent = "B: Brains Trait. B rolls are shown as B#.";
    			t81 = space();
    			li36 = element("li");
    			li36.textContent = "C: Constitution Trait. C rolls are shown as C#.";
    			t83 = space();
    			li37 = element("li");
    			li37.textContent = "D: Demeanor Trait. D rolls are shown as D#.";
    			t85 = space();
    			button3 = element("button");
    			button3.textContent = "INSTINCTS";
    			t87 = space();
    			div3 = element("div");
    			p1 = element("p");
    			p1.textContent = "Natural talents everyone has based on Traits.";
    			t89 = space();
    			ul3 = element("ul");
    			li38 = element("li");
    			li38.textContent = "ATHLETICS: = C. Climbing and swimming.";
    			t91 = space();
    			li39 = element("li");
    			li39.textContent = "PERCEPTION: = B. Processing sensory information.";
    			t93 = space();
    			li40 = element("li");
    			li40.textContent = "SOCIALIZE: = D. Interacting with others.";
    			t95 = space();
    			li41 = element("li");
    			li41.textContent = "STEALTH: = A. Remaining undetected.";
    			t97 = space();
    			button4 = element("button");
    			button4.textContent = "SKILLS";
    			t99 = space();
    			div4 = element("div");
    			p2 = element("p");
    			p2.textContent = "12 different types of actions limited by their Traits.";
    			t101 = space();
    			ul4 = element("ul");
    			li42 = element("li");
    			li42.textContent = "AGILITY SKILLS: Acrobatics, Ranged, Larceny";
    			t103 = space();
    			li43 = element("li");
    			li43.textContent = "BRAINS SKILLS: Medicine, Science, Survival";
    			t105 = space();
    			li44 = element("li");
    			li44.textContent = "CONSTITUTION SKILLS: Build, Drive, Melee";
    			t107 = space();
    			li45 = element("li");
    			li45.textContent = "DEMEANOR SKILLS: Entertain, Leadership, Tame";
    			t109 = space();
    			li46 = element("li");
    			li46.textContent = "Specialty: Sub-Skill that can change independently.";
    			t111 = space();
    			button5 = element("button");
    			button5.textContent = "PROPERTIES";
    			t113 = space();
    			div5 = element("div");
    			p3 = element("p");
    			p3.textContent = "Trait-derived values.";
    			t115 = space();
    			ul5 = element("ul");
    			li47 = element("li");
    			li47.textContent = "CARRY = [C x6]. Maximum total Size you can carry.";
    			t117 = space();
    			li48 = element("li");
    			li48.textContent = "DMG MOD = Melee and Ranged(Thrown) Damage modifier.";
    			t119 = space();
    			li49 = element("li");
    			li49.textContent = "LUCK = D /day. Spend for various effects.";
    			t121 = space();
    			li50 = element("li");
    			li50.textContent = "PSYCHE = [D]. Self-tracked mental health.";
    			t123 = space();
    			li51 = element("li");
    			li51.textContent = "SPEED = [A + C] yds. Jog = Speed x2.";
    			t125 = space();
    			li52 = element("li");
    			li52.textContent = "THRESHOLD = [C + D]. Pain you can take before passing out.";
    			t127 = space();
    			li53 = element("li");
    			li53.textContent = "XP = B x6, then B each in-game week.";
    			add_location(h2, file$f, 1, 4, 30);
    			attr_dev(button0, "id", "DiceTermsBtn");
    			attr_dev(button0, "class", "Btn");
    			add_location(button0, file$f, 3, 8, 104);
    			add_location(li0, file$f, 6, 16, 234);
    			add_location(li1, file$f, 7, 16, 312);
    			add_location(li2, file$f, 8, 16, 393);
    			add_location(li3, file$f, 9, 16, 482);
    			add_location(li4, file$f, 10, 16, 537);
    			add_location(li5, file$f, 11, 16, 595);
    			add_location(li6, file$f, 12, 16, 679);
    			add_location(li7, file$f, 13, 16, 759);
    			add_location(ul0, file$f, 5, 12, 213);
    			attr_dev(div0, "id", "DiceTermsSec");
    			attr_dev(div0, "class", "Sec3");
    			add_location(div0, file$f, 4, 8, 164);
    			attr_dev(button1, "id", "GameTermsBtn");
    			attr_dev(button1, "class", "Btn");
    			add_location(button1, file$f, 16, 8, 866);
    			add_location(li8, file$f, 19, 16, 996);
    			add_location(li9, file$f, 20, 16, 1082);
    			add_location(li10, file$f, 21, 16, 1166);
    			add_location(li11, file$f, 22, 16, 1236);
    			add_location(li12, file$f, 23, 16, 1315);
    			add_location(li13, file$f, 24, 16, 1385);
    			add_location(li14, file$f, 25, 16, 1461);
    			add_location(li15, file$f, 26, 16, 1544);
    			add_location(li16, file$f, 27, 16, 1605);
    			add_location(li17, file$f, 28, 16, 1679);
    			add_location(li18, file$f, 29, 16, 1749);
    			add_location(li19, file$f, 30, 16, 1822);
    			add_location(li20, file$f, 31, 16, 1884);
    			add_location(li21, file$f, 32, 16, 1961);
    			add_location(li22, file$f, 33, 16, 2038);
    			add_location(li23, file$f, 34, 16, 2117);
    			add_location(li24, file$f, 35, 16, 2192);
    			add_location(li25, file$f, 36, 16, 2276);
    			add_location(li26, file$f, 37, 16, 2346);
    			add_location(li27, file$f, 38, 16, 2426);
    			add_location(li28, file$f, 39, 16, 2509);
    			add_location(li29, file$f, 40, 16, 2572);
    			add_location(li30, file$f, 41, 16, 2630);
    			add_location(li31, file$f, 42, 16, 2713);
    			add_location(li32, file$f, 43, 16, 2798);
    			add_location(li33, file$f, 44, 16, 2888);
    			add_location(ul1, file$f, 18, 12, 975);
    			attr_dev(div1, "id", "GameTermsSec");
    			attr_dev(div1, "class", "Sec3");
    			add_location(div1, file$f, 17, 8, 926);
    			attr_dev(button2, "id", "TraitsTermsBtn");
    			attr_dev(button2, "class", "Btn");
    			add_location(button2, file$f, 47, 8, 3000);
    			add_location(p0, file$f, 49, 12, 3115);
    			add_location(li34, file$f, 51, 16, 3214);
    			add_location(li35, file$f, 52, 16, 3282);
    			add_location(li36, file$f, 53, 16, 3349);
    			add_location(li37, file$f, 54, 16, 3422);
    			add_location(ul2, file$f, 50, 12, 3193);
    			attr_dev(div2, "id", "TraitsTermsSec");
    			attr_dev(div2, "class", "Sec3");
    			add_location(div2, file$f, 48, 8, 3064);
    			attr_dev(button3, "id", "InstinctsTermsBtn");
    			attr_dev(button3, "class", "Btn");
    			add_location(button3, file$f, 57, 8, 3516);
    			add_location(p1, file$f, 59, 12, 3640);
    			add_location(li38, file$f, 61, 16, 3726);
    			add_location(li39, file$f, 62, 16, 3790);
    			add_location(li40, file$f, 63, 16, 3864);
    			add_location(li41, file$f, 64, 16, 3930);
    			add_location(ul3, file$f, 60, 12, 3705);
    			attr_dev(div3, "id", "InstinctsTermsSec");
    			attr_dev(div3, "class", "Sec3");
    			add_location(div3, file$f, 58, 8, 3586);
    			attr_dev(button4, "id", "SkillsTermsBtn");
    			attr_dev(button4, "class", "Btn");
    			add_location(button4, file$f, 67, 8, 4016);
    			add_location(p2, file$f, 69, 12, 4131);
    			add_location(li42, file$f, 71, 16, 4226);
    			add_location(li43, file$f, 72, 16, 4295);
    			add_location(li44, file$f, 73, 16, 4363);
    			add_location(li45, file$f, 74, 16, 4429);
    			add_location(li46, file$f, 75, 16, 4499);
    			add_location(ul4, file$f, 70, 12, 4205);
    			attr_dev(div4, "id", "SkillsTermsSec");
    			attr_dev(div4, "class", "Sec3");
    			add_location(div4, file$f, 68, 8, 4080);
    			attr_dev(button5, "id", "PropertiesTermsBtn");
    			attr_dev(button5, "class", "Btn");
    			add_location(button5, file$f, 78, 8, 4601);
    			add_location(p3, file$f, 80, 12, 4728);
    			add_location(li47, file$f, 82, 16, 4790);
    			add_location(li48, file$f, 83, 16, 4865);
    			add_location(li49, file$f, 84, 16, 4942);
    			add_location(li50, file$f, 85, 16, 5009);
    			add_location(li51, file$f, 86, 16, 5076);
    			add_location(li52, file$f, 87, 16, 5138);
    			add_location(li53, file$f, 88, 16, 5222);
    			add_location(ul5, file$f, 81, 12, 4769);
    			attr_dev(div5, "id", "PropertiesTermsSec");
    			attr_dev(div5, "class", "Sec3");
    			add_location(div5, file$f, 79, 8, 4673);
    			attr_dev(div6, "id", "SymbolsSec");
    			attr_dev(div6, "class", "Sec2");
    			add_location(div6, file$f, 2, 4, 61);
    			attr_dev(div7, "class", "terms-rules");
    			add_location(div7, file$f, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div7, anchor);
    			append_dev(div7, h2);
    			append_dev(div7, t1);
    			append_dev(div7, div6);
    			append_dev(div6, button0);
    			append_dev(div6, t3);
    			append_dev(div6, div0);
    			append_dev(div0, ul0);
    			append_dev(ul0, li0);
    			append_dev(ul0, t5);
    			append_dev(ul0, li1);
    			append_dev(ul0, t7);
    			append_dev(ul0, li2);
    			append_dev(ul0, t9);
    			append_dev(ul0, li3);
    			append_dev(ul0, t11);
    			append_dev(ul0, li4);
    			append_dev(ul0, t13);
    			append_dev(ul0, li5);
    			append_dev(ul0, t15);
    			append_dev(ul0, li6);
    			append_dev(ul0, t17);
    			append_dev(ul0, li7);
    			append_dev(div6, t19);
    			append_dev(div6, button1);
    			append_dev(div6, t21);
    			append_dev(div6, div1);
    			append_dev(div1, ul1);
    			append_dev(ul1, li8);
    			append_dev(ul1, t23);
    			append_dev(ul1, li9);
    			append_dev(ul1, t25);
    			append_dev(ul1, li10);
    			append_dev(ul1, t27);
    			append_dev(ul1, li11);
    			append_dev(ul1, t29);
    			append_dev(ul1, li12);
    			append_dev(ul1, t31);
    			append_dev(ul1, li13);
    			append_dev(ul1, t33);
    			append_dev(ul1, li14);
    			append_dev(ul1, t35);
    			append_dev(ul1, li15);
    			append_dev(ul1, t37);
    			append_dev(ul1, li16);
    			append_dev(ul1, t39);
    			append_dev(ul1, li17);
    			append_dev(ul1, t41);
    			append_dev(ul1, li18);
    			append_dev(ul1, t43);
    			append_dev(ul1, li19);
    			append_dev(ul1, t45);
    			append_dev(ul1, li20);
    			append_dev(ul1, t47);
    			append_dev(ul1, li21);
    			append_dev(ul1, t49);
    			append_dev(ul1, li22);
    			append_dev(ul1, t51);
    			append_dev(ul1, li23);
    			append_dev(ul1, t53);
    			append_dev(ul1, li24);
    			append_dev(ul1, t55);
    			append_dev(ul1, li25);
    			append_dev(ul1, t57);
    			append_dev(ul1, li26);
    			append_dev(ul1, t59);
    			append_dev(ul1, li27);
    			append_dev(ul1, t61);
    			append_dev(ul1, li28);
    			append_dev(ul1, t63);
    			append_dev(ul1, li29);
    			append_dev(ul1, t65);
    			append_dev(ul1, li30);
    			append_dev(ul1, t67);
    			append_dev(ul1, li31);
    			append_dev(ul1, t69);
    			append_dev(ul1, li32);
    			append_dev(ul1, t71);
    			append_dev(ul1, li33);
    			append_dev(div6, t73);
    			append_dev(div6, button2);
    			append_dev(div6, t75);
    			append_dev(div6, div2);
    			append_dev(div2, p0);
    			append_dev(div2, t77);
    			append_dev(div2, ul2);
    			append_dev(ul2, li34);
    			append_dev(ul2, t79);
    			append_dev(ul2, li35);
    			append_dev(ul2, t81);
    			append_dev(ul2, li36);
    			append_dev(ul2, t83);
    			append_dev(ul2, li37);
    			append_dev(div6, t85);
    			append_dev(div6, button3);
    			append_dev(div6, t87);
    			append_dev(div6, div3);
    			append_dev(div3, p1);
    			append_dev(div3, t89);
    			append_dev(div3, ul3);
    			append_dev(ul3, li38);
    			append_dev(ul3, t91);
    			append_dev(ul3, li39);
    			append_dev(ul3, t93);
    			append_dev(ul3, li40);
    			append_dev(ul3, t95);
    			append_dev(ul3, li41);
    			append_dev(div6, t97);
    			append_dev(div6, button4);
    			append_dev(div6, t99);
    			append_dev(div6, div4);
    			append_dev(div4, p2);
    			append_dev(div4, t101);
    			append_dev(div4, ul4);
    			append_dev(ul4, li42);
    			append_dev(ul4, t103);
    			append_dev(ul4, li43);
    			append_dev(ul4, t105);
    			append_dev(ul4, li44);
    			append_dev(ul4, t107);
    			append_dev(ul4, li45);
    			append_dev(ul4, t109);
    			append_dev(ul4, li46);
    			append_dev(div6, t111);
    			append_dev(div6, button5);
    			append_dev(div6, t113);
    			append_dev(div6, div5);
    			append_dev(div5, p3);
    			append_dev(div5, t115);
    			append_dev(div5, ul5);
    			append_dev(ul5, li47);
    			append_dev(ul5, t117);
    			append_dev(ul5, li48);
    			append_dev(ul5, t119);
    			append_dev(ul5, li49);
    			append_dev(ul5, t121);
    			append_dev(ul5, li50);
    			append_dev(ul5, t123);
    			append_dev(ul5, li51);
    			append_dev(ul5, t125);
    			append_dev(ul5, li52);
    			append_dev(ul5, t127);
    			append_dev(ul5, li53);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div7);
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

    class Terms extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$i, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Terms",
    			options,
    			id: create_fragment$i.name
    		});
    	}
    }

    /* src/components/rules/Traits.svelte generated by Svelte v3.15.0 */

    const file$g = "src/components/rules/Traits.svelte";

    function create_fragment$j(ctx) {
    	let div28;
    	let h2;
    	let t1;
    	let button0;
    	let t3;
    	let div27;
    	let p0;
    	let t5;
    	let ol0;
    	let li0;
    	let t7;
    	let li1;
    	let t9;
    	let li2;
    	let t11;
    	let li3;
    	let t13;
    	let li4;
    	let t15;
    	let li5;
    	let t17;
    	let p1;
    	let t19;
    	let p2;
    	let t21;
    	let p3;
    	let t23;
    	let p4;
    	let t25;
    	let button1;
    	let t27;
    	let div0;
    	let p5;
    	let t29;
    	let button2;
    	let t31;
    	let div4;
    	let p6;
    	let t33;
    	let p7;
    	let t35;
    	let p8;
    	let t37;
    	let button3;
    	let t39;
    	let div1;
    	let p9;
    	let t41;
    	let p10;
    	let t43;
    	let button4;
    	let t45;
    	let div3;
    	let button5;
    	let t47;
    	let div2;
    	let p11;
    	let t49;
    	let ul0;
    	let li6;
    	let t51;
    	let li7;
    	let t53;
    	let li8;
    	let t55;
    	let button6;
    	let t57;
    	let div8;
    	let p12;
    	let t59;
    	let p13;
    	let t61;
    	let p14;
    	let t63;
    	let button7;
    	let t65;
    	let div5;
    	let p15;
    	let t67;
    	let p16;
    	let t69;
    	let p17;
    	let t71;
    	let button8;
    	let t73;
    	let div7;
    	let button9;
    	let t75;
    	let div6;
    	let p18;
    	let t77;
    	let button10;
    	let t79;
    	let div15;
    	let p19;
    	let t81;
    	let p20;
    	let t83;
    	let p21;
    	let t85;
    	let button11;
    	let t87;
    	let div9;
    	let p22;
    	let t89;
    	let ul1;
    	let li9;
    	let t91;
    	let li10;
    	let t93;
    	let li11;
    	let t95;
    	let p23;
    	let t97;
    	let button12;
    	let t99;
    	let div14;
    	let button13;
    	let t101;
    	let div10;
    	let p24;
    	let t103;
    	let button14;
    	let t105;
    	let div11;
    	let p25;
    	let t107;
    	let ol1;
    	let li12;
    	let t109;
    	let li13;
    	let t111;
    	let li14;
    	let t113;
    	let li15;
    	let t115;
    	let li16;
    	let t117;
    	let li17;
    	let t119;
    	let button15;
    	let t121;
    	let div12;
    	let p26;
    	let t123;
    	let button16;
    	let t125;
    	let div13;
    	let p27;
    	let t127;
    	let button17;
    	let t129;
    	let div26;
    	let p28;
    	let t131;
    	let p29;
    	let t133;
    	let p30;
    	let t135;
    	let div16;
    	let t137;
    	let div17;
    	let p31;
    	let t139;
    	let p32;
    	let t141;
    	let div18;
    	let t143;
    	let div25;
    	let div19;
    	let t145;
    	let div20;
    	let p33;
    	let t147;
    	let div21;
    	let t149;
    	let div22;
    	let p34;
    	let t151;
    	let ul2;
    	let li18;
    	let t153;
    	let li19;
    	let t155;
    	let li20;
    	let t157;
    	let p35;
    	let t159;
    	let div23;
    	let t161;
    	let div24;
    	let p36;

    	const block = {
    		c: function create() {
    			div28 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Traits";
    			t1 = space();
    			button0 = element("button");
    			button0.textContent = "TRAITS";
    			t3 = space();
    			div27 = element("div");
    			p0 = element("p");
    			p0.textContent = "The four Traits range from 1 to 6. Most Characters get 12 points for Traits. Trait rolls are [d6 + Trait]. Trait rolls may be Trait vs a Difficulty(#), Trait vs Trait, or Trait vs Skill. Trait scores set the upper limit for the Skills below them.";
    			t5 = space();
    			ol0 = element("ol");
    			li0 = element("li");
    			li0.textContent = "Feeble";
    			t7 = space();
    			li1 = element("li");
    			li1.textContent = "Poor";
    			t9 = space();
    			li2 = element("li");
    			li2.textContent = "Average";
    			t11 = space();
    			li3 = element("li");
    			li3.textContent = "Good";
    			t13 = space();
    			li4 = element("li");
    			li4.textContent = "Superior";
    			t15 = space();
    			li5 = element("li");
    			li5.textContent = "Best";
    			t17 = space();
    			p1 = element("p");
    			p1.textContent = "Traits act as the basis for the following Properties: Speed, Experience, Carry, Health, Threshold, and Luck.";
    			t19 = space();
    			p2 = element("p");
    			p2.textContent = "Properties are explained in each Trait's description below.";
    			t21 = space();
    			p3 = element("p");
    			p3.textContent = "Each Trait has an Instinct associated with it.";
    			t23 = space();
    			p4 = element("p");
    			p4.textContent = "Agility = Stealth, Brains = Perception, Constitution = Athletics, and Demeanor = Socialize. These Instincts are typically passive static values, most often used by the GN to compare against an Extra's Instinct. They can also be rolled actively, just like Skills. You must declare it when you actively use an Instinct.";
    			t25 = space();
    			button1 = element("button");
    			button1.textContent = "RETRAINING TRAITS:";
    			t27 = space();
    			div0 = element("div");
    			p5 = element("p");
    			p5.textContent = "1/year for 36XP you may move 1 point between Traits. Traits can only be changed by +1 or -1 in this way.";
    			t29 = space();
    			button2 = element("button");
    			button2.textContent = "AGILITY (A)";
    			t31 = space();
    			div4 = element("div");
    			p6 = element("p");
    			p6.textContent = "Agility is a Character’s talent for manual dexterity and physical coordination. Characters with a high Agility are good at feats of balance, flexibility, and fine manipulation. Character’s with a low Agility are clumsy, stiff-jointed, and generally fumbling.";
    			t33 = space();
    			p7 = element("p");
    			p7.textContent = "Agility is the Trait that governs the Stealth Instinct, Fast actions, and also makes up half of the Speed Property, alongside Constitution. Agility is also the parent Trait for the Acrobatics Skill (including Dodge Defense), as well as the Larceny, and Ranged Skills.";
    			t35 = space();
    			p8 = element("p");
    			p8.textContent = "This means that Agility is very important for hiding from enemies, moving quickly, performing gymnastics, avoiding attacks, hiding items, disabling mechanisms, stealing, shooting guns or bows, and throwing weapons.";
    			t37 = space();
    			button3 = element("button");
    			button3.textContent = "Stealth: [= A]";
    			t39 = space();
    			div1 = element("div");
    			p9 = element("p");
    			p9.textContent = "This is your talent for remaining undetected. +3 Stealth if you are Prone and +3 more if you do not move on your turn. Stealth is usually a static number that is compared to an enemy's Perception.";
    			t41 = space();
    			p10 = element("p");
    			p10.textContent = "Stealth can be used actively as a bonus to a d6 roll to focus all of your effort on remaining undetected by nearby enemies, but your Speed is reduced by half.";
    			t43 = space();
    			button4 = element("button");
    			button4.textContent = "AGILITY PROPERTIES:";
    			t45 = space();
    			div3 = element("div");
    			button5 = element("button");
    			button5.textContent = "SPEED: [A+C]";
    			t47 = space();
    			div2 = element("div");
    			p11 = element("p");
    			p11.textContent = "Tactical Speed in yards. You may move part of your Speed before and part after your action in combat. See Ch:2 for detailed Movement rules.";
    			t49 = space();
    			ul0 = element("ul");
    			li6 = element("li");
    			li6.textContent = "Jog = [Speed x2] for up to miles = C.";
    			t51 = space();
    			li7 = element("li");
    			li7.textContent = "Sprint = [(Speed x2) + d6 yds] for up to mins = C.";
    			t53 = space();
    			li8 = element("li");
    			li8.textContent = "March = [Speed /2 mph] for up to C x2 hrs.";
    			t55 = space();
    			button6 = element("button");
    			button6.textContent = "BRAINS (B)";
    			t57 = space();
    			div8 = element("div");
    			p12 = element("p");
    			p12.textContent = "Brains is a Character’s talent for cognitive functioning and abstract thought. Characters with a high Brains are good at retaining and accessing knowledge, processing sensory input, and learning from personal experiences. Characters with a low Brains are absent minded, forgetful, and dull-witted.";
    			t59 = space();
    			p13 = element("p");
    			p13.textContent = "Brains is the Trait that governs the Perception Instinct and is the basis of the Experience Property.  Brains is also the parent Trait for the Medicine, Science, and Survival Skills.";
    			t61 = space();
    			p14 = element("p");
    			p14.textContent = "This means that Brains is very important for awareness, improving through reflection, performing medical procedures to treat wounds, mixing Drugs and Bombs, working on electronics, counseling others, and using primitive skills to shelter, forage, and navigate.";
    			t63 = space();
    			button7 = element("button");
    			button7.textContent = "PERCEPTION: [= B]";
    			t65 = space();
    			div5 = element("div");
    			p15 = element("p");
    			p15.textContent = "Allows the gathering of detailed information from all of your senses. Penalties for distance vary by sense and circumstances but -1 per 30yds is standard to See and Hear from far away.";
    			t67 = space();
    			p16 = element("p");
    			p16.textContent = "Perception is a static number that is compared to a Difficulty determined by the GN. It is only a bonus to a roll when a Character is actively searching (vs Stealth or Larceny), tracking (vs Survival), discerning (vs Socialize or Entertain), or Scavenging (# by AREA).";
    			t69 = space();
    			p17 = element("p");
    			p17.textContent = "Reflex is the base Difficulty that an enemy must beat to hit the Character whenever the Character is caught unaware. Reflex is equal to Perception.";
    			t71 = space();
    			button8 = element("button");
    			button8.textContent = "BRAINS PROPERTIES:";
    			t73 = space();
    			div7 = element("div");
    			button9 = element("button");
    			button9.textContent = "EXPERIENCE (XP): [= B/in-game week]";
    			t75 = space();
    			div6 = element("div");
    			p18 = element("p");
    			p18.textContent = "XP is shown on the Character Sheet as Unspent XP and Total XP. XP is awarded at the end of each in-game week. The GN can give bonus XP when appropriate. Spend XP to buy Abilities.";
    			t77 = space();
    			button10 = element("button");
    			button10.textContent = "CONSTITUTION (C)";
    			t79 = space();
    			div15 = element("div");
    			p19 = element("p");
    			p19.textContent = "Constitution is a Character’s talent for physical strength and durability. Character’s with a high Constitution are extremely healthy, can lift a great deal of weight, and have strong immune systems. Character’s with a low Constitution cannot withstand very much punishment, are physically weak, and sickly.";
    			t81 = space();
    			p20 = element("p");
    			p20.textContent = "Constitution is the Trait that governs the Athletics Instinct. Constitution determines DMG Mod, Health, Carry, which weapons and armor you can use effectively, and it also makes up half of the Speed Property, along with Agility, and half of the Pain Threshold Property, with Demeanor. Constitution is also the parent Trait for the Build and Drive Skills as well as the Melee (including Block Defense) Skill.";
    			t83 = space();
    			p21 = element("p");
    			p21.textContent = "This means that Constitution is very important for absorbing damage, resisting disease, recovering from wounds, moving quickly, climbing and swimming, making, modifying, and repairing items, driving vehicles, attacking and defending with hand-to-hand weapons, and carrying and using heavy equipment.";
    			t85 = space();
    			button11 = element("button");
    			button11.textContent = "ATHLETICS: [= C]";
    			t87 = space();
    			div9 = element("div");
    			p22 = element("p");
    			p22.textContent = "This is the mastery of physically demanding and specialized forms of movement.";
    			t89 = space();
    			ul1 = element("ul");
    			li9 = element("li");
    			li9.textContent = "Climbing: Move at [Speed /2]";
    			t91 = space();
    			li10 = element("li");
    			li10.textContent = "Rappelling: Move at [Speed x4] with a rope";
    			t93 = space();
    			li11 = element("li");
    			li11.textContent = "Swimming: Move at [Speed /4]";
    			t95 = space();
    			p23 = element("p");
    			p23.textContent = "Difficulties are determined by the GN based on a wide variety of factors. Moving with Athletics usually takes your entire action. In some circumstances it may be possible to attack between Athletics rolls (kicking a climber on the wall next to you, for example) but doing so prevents your movement that round. Penalties that apply to Athletics rolls will almost always apply to any ATK or DEF while using Athletics.";
    			t97 = space();
    			button12 = element("button");
    			button12.textContent = "CONSTITUTION PROPERTIES:";
    			t99 = space();
    			div14 = element("div");
    			button13 = element("button");
    			button13.textContent = "CARRY: [= Cx6]";
    			t101 = space();
    			div10 = element("div");
    			p24 = element("p");
    			p24.textContent = "This is the maximum total item Size you can haul comfortably. -1 Speed, DEF, and all rolls for each point of Size in excess of your Carry limit";
    			t103 = space();
    			button14 = element("button");
    			button14.textContent = "DMG MOD: [=(C/3)-1]";
    			t105 = space();
    			div11 = element("div");
    			p25 = element("p");
    			p25.textContent = "Modifier to DMG when using Melee and muscle-powered Ranged weapons as follows:";
    			t107 = space();
    			ol1 = element("ol");
    			li12 = element("li");
    			li12.textContent = "-1";
    			t109 = space();
    			li13 = element("li");
    			li13.textContent = "-1";
    			t111 = space();
    			li14 = element("li");
    			li14.textContent = "-0";
    			t113 = space();
    			li15 = element("li");
    			li15.textContent = "+0";
    			t115 = space();
    			li16 = element("li");
    			li16.textContent = "+1";
    			t117 = space();
    			li17 = element("li");
    			li17.textContent = "+1";
    			t119 = space();
    			button15 = element("button");
    			button15.textContent = "THRESHOLD [= C+D]";
    			t121 = space();
    			div12 = element("div");
    			p26 = element("p");
    			p26.textContent = "The maximum Pain you can take before going unconscious. Any Blunt DMG that is taken after Pain has reached the Threshold is lethal and so reduces HP.";
    			t123 = space();
    			button16 = element("button");
    			button16.textContent = "HEALTH (HP): [Torso HP = C x2, Head and Limb HP = C]";
    			t125 = space();
    			div13 = element("div");
    			p27 = element("p");
    			p27.textContent = "This is the amount of DMG you can take. Limbs are disabled and Bleeding at 0HP, and destroyed at -C. You go unconscious at 0HP on Head or Torso, and die at -C.";
    			t127 = space();
    			button17 = element("button");
    			button17.textContent = "DEMEANOR (D)";
    			t129 = space();
    			div26 = element("div");
    			p28 = element("p");
    			p28.textContent = "Demeanor is a Character’s talent for navigating social encounters and sheer force of will. Character’s with a high Demeanor are charismatic, self-driven, and inspire confidence. Character’s with a low Demeanor are poor speakers, easily discouraged, find it difficult to make friends, and often feel hopeless about their lives.";
    			t131 = space();
    			p29 = element("p");
    			p29.textContent = "Demeanor is the Trait that governs the Socialize Instinct. Demeanor is the amount of Luck and Psyche a Character starts with. Demeanor is also the parent Trait for the Entertain, Leadership, and Tame Skills.";
    			t133 = space();
    			p30 = element("p");
    			p30.textContent = "This means that Demeanor is very important for altering fate, staying sane, haggling, keeping friends, resisting torture, lying convincingly, taking command, intimidating opponents, and handling animals.";
    			t135 = space();
    			div16 = element("div");
    			div16.textContent = "SOCIALIZE: [= D]";
    			t137 = space();
    			div17 = element("div");
    			p31 = element("p");
    			p31.textContent = "This is the subtle art of gaining the upper hand in conversation. Uses include persuading an individual or crowd with a speech, gaining information, currying favor, or just general politicking.";
    			t139 = space();
    			p32 = element("p");
    			p32.textContent = "Socialize should be used to quantify roleplaying interaction when necessary, not as a replacement for it.";
    			t141 = space();
    			div18 = element("div");
    			div18.textContent = "DEMEANOR PROPERTIES:";
    			t143 = space();
    			div25 = element("div");
    			div19 = element("div");
    			div19.textContent = "COMRADES:";
    			t145 = space();
    			div20 = element("div");
    			p33 = element("p");
    			p33.textContent = "Loyal friends and pets who make your life worth living. It takes at least a month to make a new Comrade. Your Comrade must also consider you a Comrade. Only Comrades get bonuses from Demeanor Skills. Comrades should be listed in order of priority to your Character.";
    			t147 = space();
    			div21 = element("div");
    			div21.textContent = "LUCK: [= D]";
    			t149 = space();
    			div22 = element("div");
    			p34 = element("p");
    			p34.textContent = "You may spend Luck in dramatic moments to:";
    			t151 = space();
    			ul2 = element("ul");
    			li18 = element("li");
    			li18.textContent = "Add an Exploding 6 to a roll you just made.";
    			t153 = space();
    			li19 = element("li");
    			li19.textContent = "Take an additional Fast action on your turn.";
    			t155 = space();
    			li20 = element("li");
    			li20.textContent = "Give a Luck point to a Comrade in the AREA.";
    			t157 = space();
    			p35 = element("p");
    			p35.textContent = "Luck points refill at dawn each day. The GN may call for a Luck roll [d6 + current Luck points] for chance events that do not apply to Traits, Skills or Instincts.";
    			t159 = space();
    			div23 = element("div");
    			div23.textContent = "PSYCHE: [= D]";
    			t161 = space();
    			div24 = element("div");
    			p36 = element("p");
    			p36.textContent = "This is a measure of your Character’s mental health on a scale from Crazy to Sane. See Psyche.";
    			add_location(h2, file$g, 1, 4, 31);
    			attr_dev(button0, "id", "TraitsBtn");
    			attr_dev(button0, "class", "Btn");
    			add_location(button0, file$g, 2, 4, 51);
    			add_location(p0, file$g, 4, 8, 148);
    			add_location(li0, file$g, 6, 12, 427);
    			add_location(li1, file$g, 7, 12, 455);
    			add_location(li2, file$g, 8, 12, 481);
    			add_location(li3, file$g, 9, 12, 510);
    			add_location(li4, file$g, 10, 12, 536);
    			add_location(li5, file$g, 11, 12, 566);
    			add_location(ol0, file$g, 5, 8, 410);
    			add_location(p1, file$g, 13, 8, 602);
    			add_location(p2, file$g, 14, 8, 726);
    			add_location(p3, file$g, 15, 8, 801);
    			add_location(p4, file$g, 16, 8, 863);
    			attr_dev(button1, "id", "RetrainingTraitsBtn");
    			attr_dev(button1, "class", "Btn");
    			add_location(button1, file$g, 18, 8, 1197);
    			add_location(p5, file$g, 20, 12, 1334);
    			attr_dev(div0, "id", "RetrainingTraitsSec");
    			attr_dev(div0, "class", "Sec3");
    			add_location(div0, file$g, 19, 8, 1278);
    			attr_dev(button2, "id", "AgilityTraitBtn");
    			attr_dev(button2, "class", "Btn");
    			add_location(button2, file$g, 23, 8, 1470);
    			add_location(p6, file$g, 25, 12, 1592);
    			add_location(p7, file$g, 26, 12, 1870);
    			add_location(p8, file$g, 27, 12, 2157);
    			attr_dev(button3, "id", "StealthInstinctBtn");
    			attr_dev(button3, "class", "Btn");
    			add_location(button3, file$g, 28, 12, 2391);
    			add_location(p9, file$g, 30, 16, 2530);
    			add_location(p10, file$g, 31, 16, 2750);
    			attr_dev(div1, "id", "StealthInstinctSec");
    			attr_dev(div1, "class", "Sec4");
    			add_location(div1, file$g, 29, 12, 2471);
    			attr_dev(button4, "id", "AgilityPropertiesBtn");
    			attr_dev(button4, "class", "Btn");
    			add_location(button4, file$g, 33, 12, 2947);
    			attr_dev(button5, "id", "SpeedPropertyBtn");
    			attr_dev(button5, "class", "Btn");
    			add_location(button5, file$g, 35, 16, 3095);
    			add_location(p11, file$g, 37, 20, 3236);
    			add_location(li6, file$g, 39, 24, 3432);
    			add_location(li7, file$g, 40, 24, 3503);
    			add_location(li8, file$g, 41, 24, 3587);
    			add_location(ul0, file$g, 38, 20, 3403);
    			attr_dev(div2, "id", "SpeedPropertySec");
    			attr_dev(div2, "class", "Sec5");
    			add_location(div2, file$g, 36, 16, 3175);
    			attr_dev(div3, "id", "AgilityPropertiesSec");
    			attr_dev(div3, "class", "Sec4");
    			add_location(div3, file$g, 34, 12, 3034);
    			attr_dev(div4, "id", "AgilityTraitSec");
    			attr_dev(div4, "class", "Sec3");
    			add_location(div4, file$g, 24, 8, 1540);
    			attr_dev(button6, "id", "BrainsTraitBtn");
    			attr_dev(button6, "class", "Btn");
    			add_location(button6, file$g, 47, 8, 3731);
    			add_location(p12, file$g, 49, 12, 3850);
    			add_location(p13, file$g, 50, 12, 4167);
    			add_location(p14, file$g, 51, 12, 4369);
    			attr_dev(button7, "id", "PerceptionInstinctBtn");
    			attr_dev(button7, "class", "Btn");
    			add_location(button7, file$g, 52, 12, 4649);
    			add_location(p15, file$g, 54, 16, 4797);
    			add_location(p16, file$g, 55, 16, 5005);
    			add_location(p17, file$g, 56, 16, 5297);
    			attr_dev(div5, "id", "PerceptionInstinctSec");
    			attr_dev(div5, "class", "Sec4");
    			add_location(div5, file$g, 53, 12, 4735);
    			attr_dev(button8, "id", "BrainsPropertiesBtn");
    			attr_dev(button8, "class", "Btn");
    			add_location(button8, file$g, 58, 12, 5483);
    			attr_dev(button9, "id", "ExperiencePropertyBtn");
    			attr_dev(button9, "class", "Btn");
    			add_location(button9, file$g, 60, 16, 5628);
    			add_location(p18, file$g, 62, 20, 5802);
    			attr_dev(div6, "id", "ExperiencePropertySec");
    			attr_dev(div6, "class", "Sec5");
    			add_location(div6, file$g, 61, 16, 5736);
    			attr_dev(div7, "id", "BrainsPropertiesSec");
    			attr_dev(div7, "class", "Sec4");
    			add_location(div7, file$g, 59, 12, 5568);
    			attr_dev(div8, "id", "BrainsTraitSec");
    			attr_dev(div8, "class", "Sec3");
    			add_location(div8, file$g, 48, 8, 3799);
    			attr_dev(button10, "id", "ConstitutionTraitBtn");
    			attr_dev(button10, "class", "Btn");
    			add_location(button10, file$g, 67, 8, 6055);
    			add_location(p19, file$g, 69, 12, 6192);
    			add_location(p20, file$g, 70, 12, 6519);
    			add_location(p21, file$g, 71, 12, 6946);
    			attr_dev(button11, "id", "AthleticsInstinctBtn");
    			attr_dev(button11, "class", "Btn");
    			add_location(button11, file$g, 72, 12, 7265);
    			add_location(p22, file$g, 74, 16, 7410);
    			add_location(li9, file$g, 76, 20, 7537);
    			add_location(li10, file$g, 77, 20, 7595);
    			add_location(li11, file$g, 78, 20, 7667);
    			add_location(ul1, file$g, 75, 16, 7512);
    			add_location(p23, file$g, 80, 16, 7743);
    			attr_dev(div9, "id", "AthleticsInstinctSec");
    			attr_dev(div9, "class", "Sec4");
    			add_location(div9, file$g, 73, 12, 7349);
    			attr_dev(button12, "id", "ConstitutionPropertiesBtn");
    			attr_dev(button12, "class", "Btn");
    			add_location(button12, file$g, 82, 12, 8197);
    			attr_dev(button13, "id", "CarryPropertyBtn");
    			attr_dev(button13, "class", "Btn");
    			add_location(button13, file$g, 84, 16, 8360);
    			add_location(p24, file$g, 86, 20, 8503);
    			attr_dev(div10, "id", "CarryPropertySec");
    			attr_dev(div10, "class", "Sec5");
    			add_location(div10, file$g, 85, 16, 8442);
    			attr_dev(button14, "id", "DMGModPropertyBtn");
    			attr_dev(button14, "class", "Btn");
    			add_location(button14, file$g, 88, 16, 8693);
    			add_location(p25, file$g, 90, 20, 8843);
    			add_location(li12, file$g, 92, 24, 8978);
    			add_location(li13, file$g, 93, 24, 9014);
    			add_location(li14, file$g, 94, 24, 9050);
    			add_location(li15, file$g, 95, 24, 9086);
    			add_location(li16, file$g, 96, 24, 9122);
    			add_location(li17, file$g, 97, 24, 9158);
    			add_location(ol1, file$g, 91, 20, 8949);
    			attr_dev(div11, "id", "DMGModPropertySec");
    			attr_dev(div11, "class", "Sec5");
    			add_location(div11, file$g, 89, 16, 8781);
    			attr_dev(button15, "id", "ThresholdPropertyBtn");
    			attr_dev(button15, "class", "Btn");
    			add_location(button15, file$g, 100, 16, 9235);
    			add_location(p26, file$g, 102, 20, 9389);
    			attr_dev(div12, "id", "ThresholdPropertySec");
    			attr_dev(div12, "class", "Sec5");
    			add_location(div12, file$g, 101, 16, 9324);
    			attr_dev(button16, "id", "HealthPropertyBtn");
    			attr_dev(button16, "class", "Btn");
    			add_location(button16, file$g, 104, 16, 9585);
    			add_location(p27, file$g, 106, 20, 9768);
    			attr_dev(div13, "id", "HealthPropertySec");
    			attr_dev(div13, "class", "Sec5");
    			add_location(div13, file$g, 105, 16, 9706);
    			attr_dev(div14, "id", "ConstitutionPropertiesSec");
    			attr_dev(div14, "class", "Sec4");
    			add_location(div14, file$g, 83, 12, 8294);
    			attr_dev(div15, "id", "ConstitutionTraitSec");
    			attr_dev(div15, "class", "Sec3");
    			add_location(div15, file$g, 68, 8, 6135);
    			attr_dev(button17, "id", "DemeanorTraitBtn");
    			attr_dev(button17, "class", "Btn");
    			add_location(button17, file$g, 111, 8, 10001);
    			add_location(p28, file$g, 113, 12, 10126);
    			add_location(p29, file$g, 114, 12, 10472);
    			add_location(p30, file$g, 115, 12, 10699);
    			attr_dev(div16, "id", "SocializeInstinctBtn");
    			add_location(div16, file$g, 116, 12, 10922);
    			add_location(p31, file$g, 118, 16, 11049);
    			add_location(p32, file$g, 119, 16, 11266);
    			attr_dev(div17, "id", "SocializeInstinctSec");
    			attr_dev(div17, "class", "Sec4");
    			add_location(div17, file$g, 117, 12, 10988);
    			attr_dev(div18, "id", "DemeanorPropertiesBtn");
    			add_location(div18, file$g, 121, 12, 11410);
    			attr_dev(div19, "id", "ComradesPropertyBtn");
    			add_location(div19, file$g, 123, 16, 11543);
    			add_location(p33, file$g, 125, 20, 11669);
    			attr_dev(div20, "id", "ComradesPropertySec");
    			attr_dev(div20, "class", "Sec5");
    			add_location(div20, file$g, 124, 16, 11605);
    			attr_dev(div21, "id", "LuckPropertyBtn");
    			add_location(div21, file$g, 127, 16, 11981);
    			add_location(p34, file$g, 129, 20, 12101);
    			add_location(li18, file$g, 131, 24, 12200);
    			add_location(li19, file$g, 132, 24, 12277);
    			add_location(li20, file$g, 133, 24, 12355);
    			add_location(ul2, file$g, 130, 20, 12171);
    			add_location(p35, file$g, 135, 20, 12454);
    			attr_dev(div22, "id", "LuckPropertySec");
    			attr_dev(div22, "class", "Sec5");
    			add_location(div22, file$g, 128, 16, 12041);
    			attr_dev(div23, "id", "PsychePropertyBtn");
    			add_location(div23, file$g, 137, 16, 12664);
    			add_location(p36, file$g, 139, 20, 12790);
    			attr_dev(div24, "id", "PsychePropertySec");
    			attr_dev(div24, "class", "Sec5");
    			add_location(div24, file$g, 138, 16, 12728);
    			attr_dev(div25, "id", "DemeanorPropertiesSec");
    			attr_dev(div25, "class", "Sec4");
    			add_location(div25, file$g, 122, 12, 11481);
    			attr_dev(div26, "id", "DemeanorTraitSec");
    			attr_dev(div26, "class", "Sec3");
    			add_location(div26, file$g, 112, 8, 10073);
    			attr_dev(div27, "id", "TraitsSec");
    			attr_dev(div27, "class", "Sec2");
    			add_location(div27, file$g, 3, 4, 106);
    			attr_dev(div28, "class", "traits-rules");
    			add_location(div28, file$g, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div28, anchor);
    			append_dev(div28, h2);
    			append_dev(div28, t1);
    			append_dev(div28, button0);
    			append_dev(div28, t3);
    			append_dev(div28, div27);
    			append_dev(div27, p0);
    			append_dev(div27, t5);
    			append_dev(div27, ol0);
    			append_dev(ol0, li0);
    			append_dev(ol0, t7);
    			append_dev(ol0, li1);
    			append_dev(ol0, t9);
    			append_dev(ol0, li2);
    			append_dev(ol0, t11);
    			append_dev(ol0, li3);
    			append_dev(ol0, t13);
    			append_dev(ol0, li4);
    			append_dev(ol0, t15);
    			append_dev(ol0, li5);
    			append_dev(div27, t17);
    			append_dev(div27, p1);
    			append_dev(div27, t19);
    			append_dev(div27, p2);
    			append_dev(div27, t21);
    			append_dev(div27, p3);
    			append_dev(div27, t23);
    			append_dev(div27, p4);
    			append_dev(div27, t25);
    			append_dev(div27, button1);
    			append_dev(div27, t27);
    			append_dev(div27, div0);
    			append_dev(div0, p5);
    			append_dev(div27, t29);
    			append_dev(div27, button2);
    			append_dev(div27, t31);
    			append_dev(div27, div4);
    			append_dev(div4, p6);
    			append_dev(div4, t33);
    			append_dev(div4, p7);
    			append_dev(div4, t35);
    			append_dev(div4, p8);
    			append_dev(div4, t37);
    			append_dev(div4, button3);
    			append_dev(div4, t39);
    			append_dev(div4, div1);
    			append_dev(div1, p9);
    			append_dev(div1, t41);
    			append_dev(div1, p10);
    			append_dev(div4, t43);
    			append_dev(div4, button4);
    			append_dev(div4, t45);
    			append_dev(div4, div3);
    			append_dev(div3, button5);
    			append_dev(div3, t47);
    			append_dev(div3, div2);
    			append_dev(div2, p11);
    			append_dev(div2, t49);
    			append_dev(div2, ul0);
    			append_dev(ul0, li6);
    			append_dev(ul0, t51);
    			append_dev(ul0, li7);
    			append_dev(ul0, t53);
    			append_dev(ul0, li8);
    			append_dev(div27, t55);
    			append_dev(div27, button6);
    			append_dev(div27, t57);
    			append_dev(div27, div8);
    			append_dev(div8, p12);
    			append_dev(div8, t59);
    			append_dev(div8, p13);
    			append_dev(div8, t61);
    			append_dev(div8, p14);
    			append_dev(div8, t63);
    			append_dev(div8, button7);
    			append_dev(div8, t65);
    			append_dev(div8, div5);
    			append_dev(div5, p15);
    			append_dev(div5, t67);
    			append_dev(div5, p16);
    			append_dev(div5, t69);
    			append_dev(div5, p17);
    			append_dev(div8, t71);
    			append_dev(div8, button8);
    			append_dev(div8, t73);
    			append_dev(div8, div7);
    			append_dev(div7, button9);
    			append_dev(div7, t75);
    			append_dev(div7, div6);
    			append_dev(div6, p18);
    			append_dev(div27, t77);
    			append_dev(div27, button10);
    			append_dev(div27, t79);
    			append_dev(div27, div15);
    			append_dev(div15, p19);
    			append_dev(div15, t81);
    			append_dev(div15, p20);
    			append_dev(div15, t83);
    			append_dev(div15, p21);
    			append_dev(div15, t85);
    			append_dev(div15, button11);
    			append_dev(div15, t87);
    			append_dev(div15, div9);
    			append_dev(div9, p22);
    			append_dev(div9, t89);
    			append_dev(div9, ul1);
    			append_dev(ul1, li9);
    			append_dev(ul1, t91);
    			append_dev(ul1, li10);
    			append_dev(ul1, t93);
    			append_dev(ul1, li11);
    			append_dev(div9, t95);
    			append_dev(div9, p23);
    			append_dev(div15, t97);
    			append_dev(div15, button12);
    			append_dev(div15, t99);
    			append_dev(div15, div14);
    			append_dev(div14, button13);
    			append_dev(div14, t101);
    			append_dev(div14, div10);
    			append_dev(div10, p24);
    			append_dev(div14, t103);
    			append_dev(div14, button14);
    			append_dev(div14, t105);
    			append_dev(div14, div11);
    			append_dev(div11, p25);
    			append_dev(div11, t107);
    			append_dev(div11, ol1);
    			append_dev(ol1, li12);
    			append_dev(ol1, t109);
    			append_dev(ol1, li13);
    			append_dev(ol1, t111);
    			append_dev(ol1, li14);
    			append_dev(ol1, t113);
    			append_dev(ol1, li15);
    			append_dev(ol1, t115);
    			append_dev(ol1, li16);
    			append_dev(ol1, t117);
    			append_dev(ol1, li17);
    			append_dev(div14, t119);
    			append_dev(div14, button15);
    			append_dev(div14, t121);
    			append_dev(div14, div12);
    			append_dev(div12, p26);
    			append_dev(div14, t123);
    			append_dev(div14, button16);
    			append_dev(div14, t125);
    			append_dev(div14, div13);
    			append_dev(div13, p27);
    			append_dev(div27, t127);
    			append_dev(div27, button17);
    			append_dev(div27, t129);
    			append_dev(div27, div26);
    			append_dev(div26, p28);
    			append_dev(div26, t131);
    			append_dev(div26, p29);
    			append_dev(div26, t133);
    			append_dev(div26, p30);
    			append_dev(div26, t135);
    			append_dev(div26, div16);
    			append_dev(div26, t137);
    			append_dev(div26, div17);
    			append_dev(div17, p31);
    			append_dev(div17, t139);
    			append_dev(div17, p32);
    			append_dev(div26, t141);
    			append_dev(div26, div18);
    			append_dev(div26, t143);
    			append_dev(div26, div25);
    			append_dev(div25, div19);
    			append_dev(div25, t145);
    			append_dev(div25, div20);
    			append_dev(div20, p33);
    			append_dev(div25, t147);
    			append_dev(div25, div21);
    			append_dev(div25, t149);
    			append_dev(div25, div22);
    			append_dev(div22, p34);
    			append_dev(div22, t151);
    			append_dev(div22, ul2);
    			append_dev(ul2, li18);
    			append_dev(ul2, t153);
    			append_dev(ul2, li19);
    			append_dev(ul2, t155);
    			append_dev(ul2, li20);
    			append_dev(div22, t157);
    			append_dev(div22, p35);
    			append_dev(div25, t159);
    			append_dev(div25, div23);
    			append_dev(div25, t161);
    			append_dev(div25, div24);
    			append_dev(div24, p36);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div28);
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

    class Traits$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$j, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Traits",
    			options,
    			id: create_fragment$j.name
    		});
    	}
    }

    /* src/pages/Rules.svelte generated by Svelte v3.15.0 */
    const file$h = "src/pages/Rules.svelte";

    function create_fragment$k(ctx) {
    	let div1;
    	let t0;
    	let div0;
    	let button;
    	let t2;
    	let current;
    	let dispose;
    	const combat = new Combat({ $$inline: true });

    	const backnextbuttons = new BackNextButtons({
    			props: { step: ctx.step },
    			$$inline: true
    		});

    	backnextbuttons.$on("message", ctx.nav);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(combat.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			button = element("button");
    			button.textContent = "Home";
    			t2 = space();
    			create_component(backnextbuttons.$$.fragment);
    			attr_dev(button, "class", "nav-button svelte-18puduf");
    			add_location(button, file$h, 25, 8, 971);
    			attr_dev(div0, "class", "nav-bar svelte-18puduf");
    			add_location(div0, file$h, 24, 4, 941);
    			attr_dev(div1, "class", "page rules-page");
    			add_location(div1, file$h, 22, 0, 892);
    			dispose = listen_dev(button, "click", router.Home, false, false, false);
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
    			append_dev(div1, t2);
    			mount_component(backnextbuttons, div1, null);
    			current = true;
    		},
    		p: function update(changed, ctx) {
    			const backnextbuttons_changes = {};
    			if (changed.step) backnextbuttons_changes.step = ctx.step;
    			backnextbuttons.$set(backnextbuttons_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(combat.$$.fragment, local);
    			transition_in(backnextbuttons.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(combat.$$.fragment, local);
    			transition_out(backnextbuttons.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(combat);
    			destroy_component(backnextbuttons);
    			dispose();
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

    function instance$b($$self, $$props, $$invalidate) {
    	let step = 0;
    	const options = [Terms, Dice, Creation, Traits$1, Skills$1, Combat, Maneuvers, Situations];

    	function nav(event) {
    		$$invalidate("step", step = event.detail.number);

    		if (step == options.length || step < 0) {
    			router.Home();
    		} else {
    			selected = options[step];
    		}
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("step" in $$props) $$invalidate("step", step = $$props.step);
    	};

    	return { step, nav };
    }

    class Rules extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$k, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Rules",
    			options,
    			id: create_fragment$k.name
    		});
    	}
    }

    /* src/pages/Home.svelte generated by Svelte v3.15.0 */
    const file$i = "src/pages/Home.svelte";

    function create_fragment$l(ctx) {
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
    			button1.textContent = "Rules";
    			attr_dev(button0, "class", "svelte-hz0e23");
    			add_location(button0, file$i, 7, 4, 164);
    			attr_dev(button1, "class", "svelte-hz0e23");
    			add_location(button1, file$i, 8, 4, 229);
    			attr_dev(div, "class", "page home-page svelte-hz0e23");
    			add_location(div, file$i, 6, 0, 131);

    			dispose = [
    				listen_dev(button0, "click", router.Creator, false, false, false),
    				listen_dev(button1, "click", router.Rules, false, false, false)
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
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$l, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$l.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.15.0 */

    // (12:1) <Router>
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
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(12:1) <Router>",
    		ctx
    	});

    	return block;
    }

    // (10:0) <ViewScreen>
    function create_default_slot(ctx) {
    	let t;
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
    			create_component(router.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(titlebar, target, anchor);
    			insert_dev(target, t, anchor);
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
    			destroy_component(router, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(10:0) <ViewScreen>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$m(ctx) {
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
    		id: create_fragment$m.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$m, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$m.name
    		});
    	}
    }

    const app = new App({
    	target: document.body
    });

    return app;

}());
//# sourceMappingURL=apocalyptia-online.js.map
