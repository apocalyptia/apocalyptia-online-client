import randomRoll from '$utils/random/dice/randomRoll.js'
import Gear from '$rules/Gear.js'

function randomMeleeWeapon() {
	const randomMeleeWeapon = randomRoll(Object.values(Gear.melee))
	randomMeleeWeapon.quantity = 1
	return randomMeleeWeapon
}

export default randomMeleeWeapon
