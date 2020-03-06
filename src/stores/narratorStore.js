import { writable } from 'svelte/store'
import TableOfContents from '../components/functions/TableOfContents'

const narratorToC = new TableOfContents({
	label: 'Contents',
	root: '/narrator',
	pages: [
		'Areas',
		'Bases',
		'Difficulties',
		'Diseases',
		'Encounters',
		'Environment',
		'Extras',
		'Factions',
		'Hazards',
		'Mission',
		'Narrator',
		'Preparation',
		'Psyche',
		'Scenarios',
		'Settlements',
		'Wasteland',
	],
	modules: [
		Areas,
		Bases,
		Difficulties,
		Diseases,
		Encounters,
		Environment,
		Extras,
		Factions,
		Hazards,
		Mission,
		Narrator,
		Preparation,
		Psyche,
		Scenarios,
		Settlements,
		Wasteland,
	]
})

const narratorStore = writable(narratorToC)

export default narratorStore