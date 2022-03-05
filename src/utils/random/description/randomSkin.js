import randomRoll from '$utils/random/dice/randomRoll.js'

function randomSkin() {
	return randomRoll([`Dark`, `Bronze`, `Olive`, `Tan`, `Fair`, `Pale`])
}

export default randomSkin
