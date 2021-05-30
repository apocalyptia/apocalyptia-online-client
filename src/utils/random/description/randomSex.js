import randomRoll from '/src/utils/random/dice/randomRoll.js'

function randomSex() {
	return randomRoll([`Female`, `Male`])
}

export default randomSex
