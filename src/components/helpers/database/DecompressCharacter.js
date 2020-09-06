import Character from 'src/components/rules/Character'
import AbilitiesList from 'src/components/rules/abilities/Abilities'
import ArmorList from 'src/components/rules/gear/armor/ArmorList'
import MeleeWeaponList from 'src/components/rules/gear/weapons/melee/MeleeWeaponList'
import RangedWeaponList from 'src/components/rules/gear/weapons/ranged/RangedWeaponList'
import AmmoList from 'src/components/rules/gear/weapons/ammo/AmmoList'
import EquipmentList from 'src/components/rules/gear/equipment/EquipmentList'
import Properties from 'src/components/rules/properties/Properties'


const decompressAbilities = (char, c) => {
	char.abilities = c.Ab.map(m => {
		let ability = AbilitiesList.filter(f => m.i == f.id)[0]
		ability.taken = m.t
		return ability
	})
	return char
}

const decompressGear = (char, c, prop, abv, list) => {
	char.gear[prop].inventory = c[abv].map(m => {
		let item = list.filter(f => m.i == f.id)[0]
		item.qty = m.q
		return item
	})
	return char
}

export default (c) => {
	const char = new Character()
	char.meta.id = c.Mi
	char.meta.user = c.Mu
	char.meta.step = c.Ms
	char.meta.completed = c.Mc
	char.meta.created = c.Mr
	char.meta.modified = c.Ml
	char.meta.notes = c.Mn
	char.meta.coordinates.map = c.Mm
	char.meta.coordinates.x = c.Mx
	char.meta.coordinates.y = c.My
	char.desc.age.value = c.Da
	char.desc.identity.value = c.Di
	char.desc.hair.value = c.Dh
	char.desc.height.value = c.De
	char.desc.sex.value = c.Ds
	char.desc.skin.value = c.Dk
	char.desc.weight.value = c.Dw
	char.traits.agility.score = c.Ta
	char.traits.brains.score = c.Tb
	char.traits.constitution.score = c.Tc
	char.traits.demeanor.score = c.Td
	char.skills.acrobatics.score = c.ac
	char.skills.larceny.score = c.la
	char.skills.ranged.score = c.ra
	char.skills.stealth.score = c.st
	char.skills.medicine.score = c.md
	char.skills.perception.score = c.pe
	char.skills.science.score = c.sc
	char.skills.survival.score = c.su
	char.skills.athletics.score = c.at
	char.skills.build.score = c.bu
	char.skills.drive.score = c.dr
	char.skills.melee.score = c.me
	char.skills.leadership.score = c.le
	char.skills.perform.score = c.pr
	char.skills.socialize.score = c.so
	char.skills.tame.score = c.ta
	char.props.luck.current = c.Pl
	char.props.psyche.current = c.Pp
	char.health.head.current = c.hD
	char.health.rightArm.current = c.rA
	char.health.leftArm.current = c.lA
	char.health.torso.current = c.tO
	char.health.leftLeg.current = c.lL
	char.health.rightLeg.current = c.rL

	char = decompressAbilities(char, c)

	char = decompressGear(char, c, 'armor', 'Ga', ArmorList)
	char = decompressGear(char, c, 'melee', 'Gm', MeleeWeaponList)
	char = decompressGear(char, c, 'ranged', 'Gr', RangedWeaponList)
	char = decompressGear(char, c, 'ammo', 'Go', AmmoList)
	char = decompressGear(char, c, 'equipment', 'Ge', EquipmentList)

	char = Properties.setScores(char)

	return char
}