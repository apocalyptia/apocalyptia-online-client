import RandomRoll from 'random/RandomRoll.js'

const RandomSkin = _ => {
	return RandomRoll(
		[
			`Black`,
			`Brown`,
			`Olive`,
			`Pale`,
			`Tan`,
			`White`,
		]
	) 
}

export default RandomSkin