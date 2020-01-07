import { writable } from 'svelte/store'
import { Character } from './components/rules/Character'
import { TableOfContents } from './helpers/TableOfContents'

const newCharacter = new Character()

export const character = writable(newCharacter)

const referenceToC = new TableOfContents(
    'reference',
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