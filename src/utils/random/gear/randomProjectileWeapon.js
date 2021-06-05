import randomRoll from '/src/utils/random/dice/randomRoll.js'
import Gear from '/src/rules/Gear.js'

function randomProjectileWeapon() {
	const randomProjectileWeapon = randomRoll(Object.values(Gear.projectile))
	randomProjectileWeapon.quantity = 1
	return randomProjectileWeapon
}

export default randomProjectileWeapon
