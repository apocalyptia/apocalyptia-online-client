import { writable } from 'svelte/store'
import TableOfContents from '../components/functions/TableOfContents'
import Abilities from '../components/rules/Abilities'
import Combat from '../components/rules/Combat'
import Complications from '../components/rules/Complications'
import Core from '../components/rules/Core'
import Gear from '../components/rules/Gear'
import Maneuvers from '../components/rules/Maneuvers'
import Properties from '../components/rules/Properties'
import Status from '../components/rules/Status'
import Skills from '../components/rules/Skills'
import Traits from '../components/rules/Traits'
import ContentMenu from '../components/views/ui/ContentMenu.svelte'

const referenceToC = new TableOfContents({
	label: 'Contents',
	startAddress: '/reference',
	endAddress: '/reference',
	pages: [
		ContentMenu,
		Core,
		Traits,
		Skills,
		Properties,
		Combat,
		Maneuvers,
		Status,
		Complications,
		Abilities,
		Gear
	]
})

const referenceStore = writable(referenceToC)

export default referenceStore