import AmmoList from '/src/rules/lists/gear/ammo/AmmoList.js'
import ArmorList from '/src/rules/lists/gear/ArmorList.js'
import EquipmentList from '/src/rules/lists/gear/EquipmentList.js'
import MeleeList from '/src/rules/lists/gear/MeleeWeaponsList.js'
import RangedList from '/src/rules/lists/gear/RangedWeaponsList.js'

export default (category) => {
	if (category == 'melee') return MeleeList.list
	else if (category == 'ranged') return RangedList.list
	else if (category == 'ammo') return AmmoList.list
	else if (category == 'armor') return ArmorList.list
	else if (category == 'equipment') return EquipmentList.list
}