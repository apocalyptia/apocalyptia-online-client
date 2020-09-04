import Character from '../../rules/Character'
import AbilitiesList from '../../rules/abilities/Abilities'
import ArmorList from '../../rules/gear/armor/ArmorList'
import MeleeWeaponList from '../../rules/gear/weapons/melee/MeleeWeaponList'
import RangedWeaponList from '../../rules/gear/weapons/ranged/RangedWeaponList'
import AmmoList from '../../rules/gear/weapons/ammo/AmmoList'
import EquipmentList from '../../rules/gear/equipment/EquipmentList'
import Properties from '../../rules/properties/Properties'

export default (c) => {
	const n = new Character()
	n.meta.id = c.Mi
	n.meta.user = c.Mu
	n.meta.step = c.Ms
	n.meta.completed = c.Mc
	n.meta.created = c.Mr
	n.meta.modified = c.Ml
	n.meta.notes = c.Mn
	n.meta.coordinates.map = c.Mm
	n.meta.coordinates.x = c.Mx
	n.meta.coordinates.y = c.My
	n.desc.age.value = c.Da
	n.desc.identity.value = c.Di
	n.desc.hair.value = c.Dh
	n.desc.height.value = c.De
	n.desc.sex.value = c.Ds
	n.desc.skin.value = c.Dk
	n.desc.weight.value = c.Dw
	n.traits.agility.score = c.Ta
	n.traits.brains.score = c.Tb
	n.traits.constitution.score = c.Tc
	n.traits.demeanor.score = c.Td
	n.skills.acrobatics.score = c.ac
	n.skills.larceny.score = c.la
	n.skills.ranged.score = c.ra
	n.skills.stealth.score = c.st
	n.skills.medicine.score = c.md
	n.skills.perception.score = c.pe
	n.skills.science.score = c.sc
	n.skills.survival.score = c.su
	n.skills.athletics.score = c.at
	n.skills.build.score = c.bu
	n.skills.drive.score = c.dr
	n.skills.melee.score = c.me
	n.skills.leadership.score = c.le
	n.skills.perform.score = c.pr
	n.skills.socialize.score = c.so
	n.skills.tame.score = c.ta
	n.props.luck.current = c.Pl
	n.props.psyche.current = c.Pp
	n.health.head.current = c.hD
	n.health.rightArm.current = c.rA
	n.health.leftArm.current = c.lA
	n.health.torso.current = c.tO
	n.health.leftLeg.current = c.lL
	n.health.rightLeg.current = c.rL

	const decompressAbilities = () => {
		n.abilities = c.Ab.map(m => {
			let ability = AbilitiesList.filter(f => m.i == f.id)[0]
			ability.taken = m.t
			return ability
		})
	}

	decompressAbilities()

	const decompressGear = (prop, abv, list) => {
		n.gear[prop] = c[abv].map(m => {
			let item = list.filter(f => m.i == f.id)[0]
			item.qty = m.q
			return item
		})
	}

	decompressGear('armor', 'Ga', ArmorList)
	decompressGear('melee', 'Gm', MeleeWeaponList)
	decompressGear('ranged', 'Gr', RangedWeaponList)
	decompressGear('ammo', 'Go', AmmoList)
	decompressGear('equipment', 'Ge', EquipmentList)

	n = Properties.setScores(n)

	return n
}