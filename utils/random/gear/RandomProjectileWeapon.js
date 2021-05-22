import RandomRoll from '/src/utils/random/dice/RandomRoll.js'
import rulesStore from '/src/stores/rulesStore.js'
import { get } from 'svelte/store'

export default () => {
	const rules = get(rulesStore)
	const randomProjectileWeapon = RandomRoll(Object.values(rules.list.gear.projectile))
	randomProjectileWeapon.qty = 1
	return randomProjectileWeapon
}