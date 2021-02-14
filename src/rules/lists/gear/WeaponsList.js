import MeleeWeaponsList from 'rules/lists/gear/MeleeWeaponsList.js'
import RangedWeaponsList from 'rules/lists/gear/RangedWeaponsList.js'

export default {
	name: `Weapons`,
	list: [
		...MeleeWeaponsList.list,
		...RangedWeaponsList.list,
	]
}