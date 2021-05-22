import RandomNumber from '/src/utils/random/dice/RandomNumber.js'
import RandomRoll from '/src/utils/random/dice/RandomRoll.js'
import rulesStore from '/src/stores/rulesStore.js'
import { get } from 'svelte/store'

export default ({caliber='', max=6}) => {
	const rules = get(rulesStore)
	const ammoList = Object.values(rules.list.gear.ammo)
	let randomAmmo
	if (caliber) {
		randomAmmo = RandomRoll(ammoList.filter(a => a.cal === caliber))
	} else {
		randomAmmo = RandomRoll(ammoList)
	}
    randomAmmo.qty = RandomNumber(max)
    return randomAmmo
}