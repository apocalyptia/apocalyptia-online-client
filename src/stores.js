import { writable } from 'svelte/store'
import { Character } from './components/rules/Character'
import { TableOfContents } from './helpers/TableOfContents'

const newCharacter = new Character()

export const character = writable(newCharacter)

const creatorToC = new TableOfContents(
	'Home',
	'/',
	[
		'Abilities',
		'Description',
		'Traits',
		'Skills',
		'Properties',
		'Abilities',
		'Gear'
	]
)

export const creToC = writable(creatorToC)

const referenceToC = new TableOfContents(
	'Contents',
	'/reference',
	[
		'Dice',
		'Traits',
		'Skills',
		'Combat',
		'Maneuvers',
		'Situations',
		'Abilities',
		'Gear'
	]
)

export const refToC = writable(referenceToC)