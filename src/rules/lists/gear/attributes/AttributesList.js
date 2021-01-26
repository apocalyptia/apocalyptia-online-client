import AmmoAttributesList from '$rules/lists/gear/attributes/AmmoAttributesList.js'
import ArmorAttributesList from '$rules/lists/gear/attributes/ArmorAttributesList.js'
import PropSort from '$utils/PropSort.js'
import WeaponAttributesList from '$rules/lists/gear/attributes/WeaponAttributesList.js'

export default {
	name: `Attributes`,
	list: [
		...AmmoAttributesList.list,
		...ArmorAttributesList.list,
		...WeaponAttributesList.list,
	].sort((a, b) => PropSort(a, b, `name`))
}