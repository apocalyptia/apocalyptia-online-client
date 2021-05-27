import RandomRoll from '/src/utils/random/dice/RandomRoll.js'
import Gear from '/src/rules/Gear.js'

export default () => {
	const randomMeleeWeapon = RandomRoll(Object.values(Gear.melee))
	randomMeleeWeapon.qty = 1
	return randomMeleeWeapon
}