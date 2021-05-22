import Character from '/src/classes/Character.js'
import rulesStore from '/src/stores/rulesStore.js'
import { get } from 'svelte/store'

export default (c) => {

	let char = new Character(get(rulesStore))

	char.meta.id = this.Mi
	char.meta.user = this.Mu
	char.meta.created = this.Mc
	char.meta.modified = this.Mm
	char.meta.notes = this.Mn
	char.meta.status = this.Sa
	char.meta.step = this.Se
	char.meta.coordinates.m = this.Cm
	char.meta.coordinates.f = this.Cf
	char.meta.coordinates.x = this.Cx
	char.meta.coordinates.y = this.Cy
	char.meta.coordinates.z = this.Cz
	char.description.age.value = this.Da
	char.description.name.value = this.Dn
	char.description.hair.value = this.Dh
	char.description.height.value = this.De
	char.description.sex.value = this.Ds
	char.description.skin.value = this.Dk
	char.description.weight.value = this.Dw
	char.traits.agility.score = this.Ta
	char.traits.brains.score = this.Tb
	char.traits.constitution.score = this.Tc
	char.traits.demeanor.score = this.Td
	char.skills.acrobatics.score = this.ac
	char.skills.larceny.score = this.la
	char.skills.projectile.score = this.ra
	char.skills.stealth.score = this.st
	char.skills.medicine.score = this.md
	char.skills.perception.score = this.pe
	char.skills.science.score = this.sc
	char.skills.survival.score = this.su
	char.skills.athletics.score = this.at
	char.skills.build.score = this.bu
	char.skills.drive.score = this.dr
	char.skills.melee.score = this.me
	char.skills.leadership.score = this.le
	char.skills.perform.score = this.pr
	char.skills.socialize.score = this.so
	char.skills.tame.score = this.ta
	char.abilities = this.Ab
	char.gear.armor.inventory = this.Ga
	char.gear.melee.inventory = this.Gm
	char.gear.projectile.inventory = this.Gr
	char.gear.ammo.inventory = this.Go
	char.gear.equipment.inventory = this.Ge

	char.updateProperties()

	char.properties.health.locations.head.current = this.hD
	char.properties.health.locations.leftArm.current = this.lA
	char.properties.health.locations.leftLeg.current = this.lL
	char.properties.health.locations.rightArm.current = this.rA
	char.properties.health.locations.rightLeg.current = this.rL
	char.properties.health.locations.torso.current = this.tO
	char.properties.luck.current = this.Pl
	char.properties.psyche.current = this.Pp

	return char
}