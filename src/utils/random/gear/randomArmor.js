import randomRoll from '$utils/random/dice/randomRoll.js'
import Gear from '$rules/Gear.js'

function randomArmor() {
	const randomArmor = randomRoll(Object.values(Gear.armor))
	randomArmor.quantity = 1
	return randomArmor
}

export default randomArmor
