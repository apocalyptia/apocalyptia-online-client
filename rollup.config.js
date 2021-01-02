import alias from '@rollup/plugin-alias'
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) =>
	(warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
	(warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
	onwarn(warning);

	const aliases = alias({
		resolve: ['.*'],
		entries: [
			{ find: 'abilities',		replacement: 'src/components/rules/abilities' },
			{ find: 'accessories',		replacement: 'src/components/rules/gear/weapons/accessories' },
			{ find: 'ammo',				replacement: 'src/components/rules/gear/weapons/ammo' },
			{ find: 'armor',			replacement: 'src/components/rules/gear/armor' },
			{ find: 'attributes',		replacement: 'src/components/rules/gear/attributes' },
			{ find: 'bombs',			replacement: 'src/components/rules/gear/weapons/bombs' },
			{ find: 'character',		replacement: 'src/routes/character' },
			{ find: 'classes',			replacement: 'src/components/classes' },
			{ find: 'combat',			replacement: 'src/components/rules/combat' },
			{ find: 'complications',	replacement: 'src/components/rules/complications' },
			{ find: 'core',				replacement: 'src/components/rules/core' },
			{ find: 'creator',			replacement: 'src/routes/character/creator' },
			{ find: 'database',			replacement: 'src/database' },
			{ find: 'description',		replacement: 'src/components/rules/description' },
			{ find: 'documents',		replacement: 'src/components/rules/gear/equipment/documents' },
			{ find: 'drugs',			replacement: 'src/components/rules/gear/equipment/drugs' },
			{ find: 'electronics',		replacement: 'src/components/rules/gear/equipment/electronics' },
			{ find: 'gear',				replacement: 'src/components/rules/gear' },
			{ find: 'buttons',			replacement: 'src/components/views/buttons' },
			{ find: 'lists',			replacement: 'src/components/rules/lists' },
			{ find: 'map',				replacement: 'src/components/views/map' },
			{ find: 'maneuvers',		replacement: 'src/components/rules/maneuvers' },
			{ find: 'medical',			replacement: 'src/components/rules/gear/equipment/medical' },
			{ find: 'melee',			replacement: 'src/components/rules/gear/weapons/melee' },
			{ find: 'misc',				replacement: 'src/components/rules/gear/equipment/misc' },
			{ find: 'needs',			replacement: 'src/components/rules/needs' },
			{ find: 'properties',		replacement: 'src/components/rules/properties' },
			{ find: 'random',			replacement: 'src/components/rules/random' },
			{ find: 'ranged',			replacement: 'src/components/rules/gear/weapons/ranged' },
			{ find: 'resources',		replacement: 'src/components/rules/gear/equipment/resources' },
			{ find: 'routes',			replacement: 'src/routes' },
			{ find: 'rules',			replacement: 'src/components/rules' },
			{ find: 'skills',			replacement: 'src/components/rules/skills' },
			{ find: 'status',			replacement: 'src/components/rules/status' },
			{ find: 'storage',			replacement: 'src/components/rules/gear/equipment/storage' },
			{ find: 'stores',			replacement: 'src/stores' },
			{ find: 'tools',			replacement: 'src/components/rules/gear/equipment/tools' },
			{ find: 'traits',			replacement: 'src/components/rules/traits' },
			{ find: 'utils',			replacement: 'src/utils' },
			{ find: 'vehicles',			replacement: 'src/components/rules/gear/vehicles' },
			{ find: 'views',			replacement: 'src/components/views' },
			{ find: 'wearable',			replacement: 'src/components/rules/gear/equipment/wearable' },
			{ find: 'widgets',			replacement: 'src/components/views/widgets' },
		]
	});

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				dev,
				hydratable: true,
				emitCss: true
			}),
			resolve({
				browser: true,
				dedupe: ['svelte']
			}),
			commonjs(),
			legacy && babel({
				extensions: ['.js', '.mjs', '.html', '.svelte'],
				babelHelpers: 'runtime',
				exclude: ['node_modules/@babel/**'],
				presets: [
					['@babel/preset-env', {
						targets: '> 0.25%, not dead'
					}]
				],
				plugins: [
					'@babel/plugin-syntax-dynamic-import',
					['@babel/plugin-transform-runtime', {
						useESModules: true
					}]
				]
			}),
			!dev && terser({
				module: true
			}),
			aliases
		],
		preserveEntrySignatures: false,
		onwarn,
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			replace({
				'process.browser': false,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				generate: 'ssr',
				hydratable: true,
				dev
			}),
			resolve({
				dedupe: ['svelte']
			}),
			commonjs(),
			aliases
		],
		external: Object.keys(pkg.dependencies).concat(require('module').builtinModules),
		preserveEntrySignatures: 'strict',
		onwarn,
	},

	serviceworker: {
		input: config.serviceworker.input(),
		output: config.serviceworker.output(),
		plugins: [
			resolve(),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			commonjs(),
			!dev && terser(),
			aliases
		],
		preserveEntrySignatures: false,
		onwarn,
	}
};
