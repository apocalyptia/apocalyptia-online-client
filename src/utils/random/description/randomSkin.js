import randomRoll from '/src/utils/random/dice/randomRoll.js'

function randomSkin() {
	return randomRoll([
		`Dark`,
		`Bronze`,
		`Olive`,
		`Tan`,
		`Fair`,
		`Pale`
	])
}

export default randomSkin