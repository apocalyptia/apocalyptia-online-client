import { writable } from 'svelte/store'
import TableOfContents from '../components/functions/TableOfContents'

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

const creatorStore = writable(creatorToC)

export default creatorStore