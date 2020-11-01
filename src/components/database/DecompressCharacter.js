import Character from 'classes/Character.js'
import AbilitiesList from 'lists/AbilitiesList.js'
import ArmorList from 'lists/gear/ArmorList.js'
import MeleeWeaponList from 'lists/gear/MeleeWeaponList.js'
import RangedWeaponList from 'lists/gear/RangedWeaponList.js'
import AmmoList from 'lists/gear/AmmoList.js'
import EquipmentList from 'lists/gear/EquipmentList.js'
import Properties from 'rules/Properties.js'

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
	char.meta.created = c.Mc
	char.meta.modified = c.Mm
	char.meta.notes = c.Mn
	char.meta.coordinates.map = c.Cm
	char.meta.coordinates.x = c.Cx
	char.meta.coordinates.y = c.Cy
	char.meta.status.completed = c.Sc
	char.meta.status.open = c.So
	char.meta.status.step = c.Ss
	char.desc.age.value = c.Da
	char.desc.name.value = c.Dn
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