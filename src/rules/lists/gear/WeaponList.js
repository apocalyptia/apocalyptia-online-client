import MeleeWeaponList from '$rules/lists/gear/MeleeWeaponList.js'
import RangedWeaponList from '$rules/lists/gear/RangedWeaponList.js'

export default {
	name: `Weapons`,
	list: [
		...MeleeWeaponList.list,
		...RangedWeaponList.list,
	]
}