import RandomNumber from '/src/utils/random/dice/RandomNumber.js'
import RandomRoll from '/src/utils/random/dice/RandomRoll.js'
import Gear from '/src/rules/Gear.js'

export default ({caliber='', max=6}) => {
	const ammoList = Object.values(Gear.ammo)
	let randomAmmo
	if (caliber) {
		randomAmmo = RandomRoll(ammoList.filter(a => a.cal === caliber))
	} else {
		randomAmmo = RandomRoll(ammoList)
	}
    randomAmmo.qty = RandomNumber(max)
    return randomAmmo
}