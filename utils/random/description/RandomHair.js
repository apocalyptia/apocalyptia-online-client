import RandomRoll from '/src/utils/random/dice/RandomRoll.js'

export default (age, sex, skin) => {
	let hair = [
		`Black`,
		`Brunette`,
	]

	if (sex === `Male`) {
		hair.push(`Bald`)
	}

	if (
		skin === `Tan` ||
		skin === `Fair` ||
		skin === `Pale`
	) {
		hair.push(...[
			`Auburn`,
			`Blonde`,
			`Red`,
		])
	}

	if (age > 40) {
		hair.push(`Gray`)
	}
	if (age > 60) {
		hair.push(`White`)
	}

	return RandomRoll(hair)
}