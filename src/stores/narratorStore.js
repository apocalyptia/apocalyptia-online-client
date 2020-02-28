import { writable } from 'svelte/store'
import TableOfContents from '../components/functions/TableOfContents'

const narratorToC = new TableOfContents(
	'Contents',
	'/narrator',
	[
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
	[
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
)
export const narToC = writable(narratorToC)