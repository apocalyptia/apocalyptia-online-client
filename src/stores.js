import { writable } from 'svelte/store'
import Character from './components/classes/Character'
import TableOfContents from './components/helpers/TableOfContents'
import Abilities from './components/rules/Abilities'
import Combat from './components/rules/Combat'
import Complications from './components/rules/Complications'
import Core from './components/rules/Core'
import Maneuvers from './components/rules/Maneuvers'
import Properties from './components/rules/Properties'
import Status from './components/rules/Status'
import Skills from './components/rules/Skills'
import Traits from './components/rules/Traits'


const newCharacter = new Character()
export const character = writable(newCharacter)


const creatorToC = new TableOfContents(
	'Home',
	'/',
	[
		'Description',
		'Traits',
		'Skills',
		'Properties',
		'Abilities',
		'Gear',
	]
)
export const creToC = writable(creatorToC)


const referenceToC = new TableOfContents(
	'Contents',
	'/reference',
	[
		'Core',
		'Traits',
		'Skills',
		'Properties',
		'Combat',
		'Maneuvers',
		'Status',
		'Complications',
		'Abilities',
	],
	[
		Core,
		Traits,
		Skills,
		Properties,
		Combat,
		Maneuvers,
		Status,
		Complications,
		Abilities,
	]
)
export const refToC = writable(referenceToC)


// const narratorToC = new TableOfContents(
// 	'Contents',
// 	'/narrator',
// 	[
// 		'Areas',
// 		'Bases',
// 		'Difficulties',
// 		'Diseases',
// 		'Encounters',
// 		'Environment',
// 		'Extras',
// 		'Factions',
// 		'Hazards',
// 		'Mission',
// 		'Narrator',
// 		'Preparation',
// 		'Psyche',
// 		'Scenarios',
// 		'Settlements',
// 		'Wasteland',
// 	],
// 	[
// 		Areas,
// 		Bases,
// 		Difficulties,
// 		Diseases,
// 		Encounters,
// 		Environment,
// 		Extras,
// 		Factions,
// 		Hazards,
// 		Mission,
// 		Narrator,
// 		Preparation,
// 		Psyche,
// 		Scenarios,
// 		Settlements,
// 		Wasteland,
// 	]
// )
// export const narToC = writable(narratorToC)