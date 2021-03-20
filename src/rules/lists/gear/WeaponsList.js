import MeleeWeaponsList from '/src/rules/lists/gear/MeleeWeaponsList.js'
import RangedWeaponsList from '/src/rules/lists/gear/RangedWeaponsList.js'

export default {
	name: `Weapons`,
	list: [
		...MeleeWeaponsList.list,
		...RangedWeaponsList.list,
	]
}