import AmmoList from '/src/rules/lists/gear/ammo/AmmoList.js'
import ArmorList from '/src/rules/lists/gear/ArmorList.js'
import EquipmentList from '/src/rules/lists/gear/EquipmentList.js'
import MeleeWeaponList from '/src/rules/lists/gear/MeleeWeaponsList.js'
import ProjectileWeaponList from '/src/rules/lists/gear/ProjectileWeaponsList.js'

export default (category) => {
	if (category == 'melee') return MeleeWeaponList.list
	else if (category == 'projectile') return ProjectileWeaponList.list
	else if (category == 'ammo') return AmmoList.list
	else if (category == 'armor') return ArmorList.list
	else if (category == 'equipment') return EquipmentList.list
}