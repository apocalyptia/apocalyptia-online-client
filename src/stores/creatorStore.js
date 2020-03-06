import { writable } from 'svelte/store'
import TableOfContents from '../components/functions/TableOfContents'
import Creation from '../routes/creator/creation.svelte'
import Description from '../routes/creator/description.svelte'
import Traits from '../routes/creator/traits.svelte'
import Skills from '../routes/creator/skills.svelte'
import Properties from '../routes/creator/properties.svelte'
import Abilities from '../routes/creator/abilities.svelte'
import Gear from '../routes/creator/gear.svelte'
import Sheet from '../routes/creator/sheet.svelte'

const creatorToC = new TableOfContents({
	label: 'Home',
	startAddress: '/creator',
	endAddress: '/',
	pages: [
		Creation,
		Description,
		Traits,
		Skills,
		Properties,
		Abilities,
		Gear,
		Sheet
	]
})

const creatorStore = writable(creatorToC)

export default creatorStore