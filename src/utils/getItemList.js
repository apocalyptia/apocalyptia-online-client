import Gear from '/src/rules/Gear.js'

const equipmentList = [
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

function getItemList(category) {
	if (category === 'melee') return Object.values(Gear.melee)
	else if (category === 'projectile') return Object.values(Gear.projectile)
	else if (category === 'ammo') return Object.values(Gear.ammo)
	else if (category === 'armor') return Object.values(Gear.armor)
	else if (category === 'equipment') return equipmentList
}

export default getItemList
