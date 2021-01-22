import RandomRoll from '$rules/random/RandomRoll.js'

export default (c) => {
	let hair = [
		`Black`,
		`Brunette`,
	]

	if (c.description.sex.value == `Male`) {
		hair.push(`Bald`)
	}

	if (
		c.description.skin.value == `Tan` ||
		c.description.skin.value == `Fair` ||
		c.description.skin.value == `Pale`
	) {
		hair.push(...[
			`Auburn`,
			`Blonde`,
			`Red`,
		])
	}

	if (c.description.age.value > 40) {
		hair.push(`Gray`)
	}
	if (c.description.age.value > 60) {
		hair.push(`White`)
	}

	return RandomRoll(hair)
}