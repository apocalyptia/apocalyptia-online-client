import rulesStore from '/src/stores/rulesStore.js'
import { get } from 'svelte/store'

const rules = get(rulesStore)

const equipmentList = [
	...Object.values(rules.list.gear.accessories),
	...Object.values(rules.list.gear.documents),
	...Object.values(rules.list.gear.drugs),
	...Object.values(rules.list.gear.electronics),
	...Object.values(rules.list.gear.medical),
	...Object.values(rules.list.gear.miscellaneous),
	...Object.values(rules.list.gear.storage),
	...Object.values(rules.list.gear.tools),
	...Object.values(rules.list.gear.wearables),
]

export default (category) => {
	if (category === 'melee') return Object.values(rules.list.gear.melee)
	else if (category === 'projectile') return Object.values(rules.list.gear.projectile)
	else if (category === 'ammo') return Object.values(rules.list.gear.ammo)
	else if (category === 'armor') return Object.values(rules.list.gear.armor)
	else if (category === 'equipment') return equipmentList
}