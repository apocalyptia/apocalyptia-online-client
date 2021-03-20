import Alphabetize from '/src/utils/sorting/Alphabetize.js'
import AmmoAttributesList from '/src/rules/lists/gear/attributes/AmmoAttributesList.js'
import ArmorAttributesList from '/src/rules/lists/gear/attributes/ArmorAttributesList.js'
import WeaponAttributesList from '/src/rules/lists/gear/attributes/WeaponAttributesList.js'

export default {
	name: `Attributes`,
	list: Alphabetize([
		...AmmoAttributesList.list,
		...ArmorAttributesList.list,
		...WeaponAttributesList.list,
	])
}