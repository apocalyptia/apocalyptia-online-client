// TODO: Figure out an elegant way to roll Traits and Skills together under StatSelection.svelte


export const statArray = (character, type) => {
	return Object.keys(character[type])
}

export const assignStat = (character, type, stat, starting, max, value) => {
	character[type][stat].base = parseInt(value)
	checkStat(character, type, stat, starting, max, value)
}

export const getRemaining = (character, type, starting) => {
	return starting -
		Object.values(character[type]).reduce(
			(stat, { base }) => stat += base, 0
		)
}

export const calculateResults = (character, type) => {
	statArray(character, type).forEach(stat => {
		character.setStat(type, stat)
		if (type == 'traits') {
			statArray(character, 'skills').forEach(skill => {
				if (character.skills[skill].parent == character[type][stat].name) {
					character.skills[skill].max = character[type][stat].base
				}
			})
		}
	})
	character.updateProperties()
}

export const resetStats = (character, type, starting) => {
	statArray(character, type).forEach((stat) => {
		if (type == 'traits') character[type][stat].base = 1
		if (type == 'skills') character[type][stat].base = 0
	})
	remaining = getRemaining(character, type, starting)
}

export const randomStats = (character, type, starting, max) => {
	resetStats(character, type, starting)
	while(remaining > 0) {
		let stat = random(statArray(character, type))
		if (character[type][stat].base < max) {
			character[type][stat].base++
			remaining = getRemaining(character, type, starting)
		}
	}
	calculateResults(character, type)
}

const checkStat = (character, type, stat, starting, condition=false) => {
	remaining = getRemaining(character, type, starting)
	while (remaining < 0 || condition) {
		character[type][stat].base--
		remaining = getRemaining(character, type, starting)
	}
	calculateResults(character, type)
}