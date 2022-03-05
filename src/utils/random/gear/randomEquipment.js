import randomRoll from '$utils/random/dice/randomRoll.js'
import Gear from '$rules/Gear.js'

function randomEquipment({ category = '', numberOfItems = 1 }) {
	let randomEquipmentList = []
	if (category) {
		randomEquipmentList = [...Object.values(Gear[category.toLowerCase()])]
	} else {
		randomEquipmentList = [
			...Object.values(Gear.accessories),
			...Object.values(Gear.documents),
			...Object.values(Gear.drugs),
			...Object.values(Gear.electronics),
			...Object.values(Gear.medical),
			...Object.values(Gear.misc),
			...Object.values(Gear.storage),
			...Object.values(Gear.tools),
			...Object.values(Gear.wearables),
		]
	}
	let randomEquipment = []
	for (let i = 0; i < numberOfItems; i++) {
		const randomItem = randomRoll(randomEquipmentList)
		const existingItemIndex = randomEquipment.findIndex((item) => item.name === randomItem.name)
		if (existingItemIndex > -1) {
			randomEquipment[existingItemIndex].quantity++
		} else {
			randomItem.quantity = 1
			randomEquipment.push(randomItem)
		}
	}
	return randomEquipment
}

export default randomEquipment
