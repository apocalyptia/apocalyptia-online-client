import randomRoll from '$utils/random/dice/randomRoll.js'
import Gear from '$rules/Gear.js'

function randomProjectileWeapon() {
	const randomProjectileWeapon = randomRoll(Object.values(Gear.projectile))
	randomProjectileWeapon.quantity = 1
	return randomProjectileWeapon
}

export default randomProjectileWeapon
