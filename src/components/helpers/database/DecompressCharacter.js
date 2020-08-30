import Character from '../../rules/Character'
import Properties from '../../rules/properties/Properties'

export default (c) => {
	const n = new Character()
	n.data.id = c.i
	n.data.user = c.u
	n.data.step = c.s
	n.data.completed = c.c
	n.data.created = c.d
	n.data.modified = c.m
	n.data.coordinates.map = c.p
	n.data.coordinates.x = c.x
	n.data.coordinates.y = c.y
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
	n.abilities = [...c.Ab]
	n.gear.armor = [...c.Gr.a]
	n.gear.melee = [...c.Gr.m]
	n.gear.ranged = [...c.Gr.r]
	n.gear.ammo = [...c.Gr.o]
	n.gear.equipment = [...c.Gr.e]
	n = Properties.setScores(n)
	return n
}