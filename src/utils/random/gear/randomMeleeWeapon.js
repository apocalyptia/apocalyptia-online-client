import randomRoll from '/src/utils/random/dice/randomRoll.js'
import Gear from '/src/rules/Gear.js'

function randomMeleeWeapon() {
	const randomMeleeWeapon = randomRoll(Object.values(Gear.melee))
	randomMeleeWeapon.qty = 1
	return randomMeleeWeapon
}

export default randomMeleeWeapon
