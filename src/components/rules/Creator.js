import abilities from 'creator/abilities.svelte'
import description from 'creator/description.svelte'
import finalize from 'creator/finalize.svelte'
import gear from 'creator/gear.svelte'
import properties from 'creator/properties.svelte'
import skills from 'creator/skills.svelte'
import traits from 'creator/traits.svelte'

export const contentPages = [
	{ name: `Description`, content: description },
	{ name: `Traits`, content: traits },
	{ name: `Skills`, content: skills },
	{ name: `Properties`, content: properties },
	{ name: `Gear`, content: gear },
	{ name: `Abilities`, content: abilities },
	{ name: `Finalize`, content: finalize },
]

class Page {
	constructor(name, step, content) {
		this.name = name
		this.step = step
		this.content = content
	}
}

const creatorPages = []

for (let i = 0; i < contentPages.length; i++) {
	creatorPages.push(new Page(contentPages[i].name, i + 1, contentPages[i].content))
}

export default creatorPages