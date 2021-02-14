import Alphabetize from 'utils/Alphabetize.js'
import AmmoAttributesList from 'rules/lists/gear/attributes/AmmoAttributesList.js'
import ArmorAttributesList from 'rules/lists/gear/attributes/ArmorAttributesList.js'
import WeaponAttributesList from 'rules/lists/gear/attributes/WeaponAttributesList.js'

export default {
	name: `Attributes`,
	list: Alphabetize([
		...AmmoAttributesList.list,
		...ArmorAttributesList.list,
		...WeaponAttributesList.list,
	])
}