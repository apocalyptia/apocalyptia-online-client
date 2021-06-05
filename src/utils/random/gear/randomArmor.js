import randomRoll from '/src/utils/random/dice/randomRoll.js'
import Gear from '/src/rules/Gear.js'

function randomArmor() {
	const randomArmor = randomRoll(Object.values(Gear.armor))
	randomArmor.quantity = 1
	return randomArmor
}

export default randomArmor
