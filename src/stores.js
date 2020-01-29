import { writable } from 'svelte/store'
import { Character } from './components/rules/Character'
import { TableOfContents } from './helpers/TableOfContents'
import Abilities from './components/rules/Abilities'
import Combat from './components/rules/Combat'
import Core from './components/rules/Core'
import Maneuvers from './components/rules/Maneuvers'
import Properties from './components/rules/Properties'
import Situations from './components/rules/Situations'
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
		'Gear'
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
		'Situations',
		'Abilities',
		'Gear'
	],
	[
		Core,
		Traits,
		Skills,
		Properties,
		Combat,
		Maneuvers,
		Situations,
		Abilities,
		// 'Gear'
	]
)

export const refToC = writable(referenceToC)