import { writable } from 'svelte/store'
import TableOfContents from '../components/helpers/TableOfContents'
import Abilities from '../components/rules/abilities/Abilities'
import Combat from '../components/rules/combat/Combat'
import Complications from '../components/rules/complications/Complications'
import Core from '../components/rules/core/Core'
import Gear from '../components/rules/gear/Gear'
import Maneuvers from '../components/rules/maneuvers/Maneuvers'
import Needs from '../components/rules/needs/Needs'
import Properties from '../components/rules/properties/Properties'
import Status from '../components/rules/status/Status'
import Skills from '../components/rules/skills/Skills'
import Traits from '../components/rules/traits/Traits'
import ContentMenu from '../components/views/ui/ContentMenu.svelte'


const referenceToC = new TableOfContents({
	label: 'Contents',
	startAddress: '/reference',
	endAddress: '/reference',
	pages: [
		ContentMenu,
		Abilities,
		Combat,
		Complications,
		Core,
		Gear,
		Maneuvers,
		Needs,
		Properties,
		Skills,
		Status,
		Traits,
	],
	pageNames: [
		'menu',
		'abilities',
		'combat',
		'complications',
		'core',
		'gear',
		'maneuvers',
		'needs',
		'properties',
		'skills',
		'status',
		'traits',
	]
})

const referenceStore = writable(referenceToC)

export default referenceStore