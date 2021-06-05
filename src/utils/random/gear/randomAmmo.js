import randomNumber from '/src/utils/random/dice/randomNumber.js'
import randomRoll from '/src/utils/random/dice/randomRoll.js'
import Gear from '/src/rules/Gear.js'

function randomAmmo({ caliber = '', max = 6 }) {
	const ammoList = Object.values(Gear.ammo)
	let randomAmmo
	if (caliber) {
		randomAmmo = randomRoll(ammoList.filter((a) => a.caliber === caliber))
	} else {
		randomAmmo = randomRoll(ammoList)
	}
	randomAmmo.quantity = randomNumber(max)
	return randomAmmo
}

export default randomAmmo
