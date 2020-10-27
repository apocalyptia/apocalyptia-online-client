import RandomRoll from 'random/RandomRoll.js'

const RandomHair = _ => {
	return RandomRoll(
		[
			`Auburn`,
			`Bald`,
			`Black`,
			`Blonde`,
			`Brunette`,
			`Gray`,
			`Red`,
			`White`,
		]
	)
}

export default RandomHair