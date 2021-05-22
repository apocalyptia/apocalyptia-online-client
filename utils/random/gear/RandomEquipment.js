import RandomRoll from '/src/utils/random/dice/RandomRoll.js'
import rulesStore from '/src/stores/rulesStore.js'
import { get } from 'svelte/store'

export default ({ category='', numberOfItems=1 }) => {
	const rules = get(rulesStore)
	let randomEquipmentList = []
	if (category) {
		randomEquipmentList = [...Object.values(rules.list.gear[category.toLowerCase()])]
	} else {
		randomEquipmentList = [
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
	}
    let randomEquipment = []
	for (let i = 0; i < numberOfItems; i++) { 
		const randomItem = RandomRoll(randomEquipmentList)
		const existingItemIndex = randomEquipment.findIndex(item => item.name === randomItem.name)
		if (existingItemIndex > -1) {
			randomEquipment[existingItemIndex].qty++
		}
		else {
			randomItem.qty = 1
			randomEquipment.push(randomItem)
		}
	}
	return randomEquipment
}