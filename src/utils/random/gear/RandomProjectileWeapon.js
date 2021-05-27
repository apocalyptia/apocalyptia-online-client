import RandomRoll from '/src/utils/random/dice/RandomRoll.js'
import Gear from '/src/rules/Gear.js'

export default () => {
	const randomProjectileWeapon = RandomRoll(Object.values(Gear.projectile))
	randomProjectileWeapon.qty = 1
	return randomProjectileWeapon
}