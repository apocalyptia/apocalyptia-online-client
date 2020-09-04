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
	n.meta.id = c.id
	n.meta.user = c.u
	n.meta.step = c.s
	n.meta.completed = c.c
	n.meta.created = c.d
	n.meta.modified = c.m
	n.meta.notes = c.n
	n.meta.coordinates.map = c.p
	n.meta.coordinates.x = c.x
	n.meta.coordinates.y = c.y
	n.desc.age.value = c.Da
	n.desc.identity.value = c.Di
	n.desc.hair.value = c.Dh
	n.desc.height.value = c.De
	n.desc.sex.value = c.Ds
	n.desc.skin.value = c.Dk
	n.desc.weight.value = c.Dw
	n.traits.agility.score = c.A
	n.traits.brains.score = c.B
	n.traits.constitution.score = c.C
	n.traits.demeanor.score = c.D
	n.skills.acrobatics.score = c.acr
	n.skills.larceny.score = c.lar
	n.skills.ranged.score = c.ran
	n.skills.stealth.score = c.ste
	n.skills.medicine.score = c.med
	n.skills.perception.score = c.per
	n.skills.science.score = c.sci
	n.skills.survival.score = c.sur
	n.skills.athletics.score = c.ath
	n.skills.build.score = c.bui
	n.skills.drive.score = c.dri
	n.skills.melee.score = c.mel
	n.skills.leadership.score = c.lea
	n.skills.perform.score = c.prf
	n.skills.socialize.score = c.soc
	n.skills.tame.score = c.tam
	n.props.luck.current = c.L
	n.props.psyche.current = c.P
	n.health.head.current = c.hD
	n.health.rightArm.current = c.rA
	n.health.leftArm.current = c.lA
	n.health.torso.current = c.tO
	n.health.leftLeg.current = c.lL
	n.health.rightLeg.current = c.rL

	const convertList = (compList, ruleList, compQty, decQty) => {
		let decompList = []
		c[compList].forEach(c => {
			for (let i = 0; i < ruleList.length; i++) {
				if (c.id == ruleList[i].id) {
					let ruleItem = ruleList[i]
					ruleItem[decQty] = c[compQty]
					decompList.push(ruleItem)
					break
				}
			}
		})
		return decompList
	}

	n.abilities = convertList('Ab', AbilitiesList, 't', 'taken')
	n.gear.armor = convertList('Ga', ArmorList, 'q', 'qty')
	n.gear.melee = convertList('Gm', MeleeWeaponList, 'q', 'qty')
	n.gear.ranged = convertList('Gr', RangedWeaponList, 'q', 'qty')
	n.gear.ammo = convertList('Go', AmmoList, 'q', 'qty')
	n.gear.equipment = convertList('Ge', EquipmentList, 'q', 'qty')

	n = Properties.setScores(n)

	return n
}