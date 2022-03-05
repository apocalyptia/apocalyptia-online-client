import randomRoll from '$utils/random/dice/randomRoll.js'

function randomSex() {
	return randomRoll([`Female`, `Male`])
}

export default randomSex
