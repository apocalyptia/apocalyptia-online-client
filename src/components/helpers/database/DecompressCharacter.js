import Character from '../../rules/Character'
import Properties from '../../rules/properties/Properties'

export default (c) => {
	const n = new Character()
	n.id = c.id
	n.user = c.user
	n.completed = c.completed
	n.created = c.created
	n.modified = c.modified
	n.desc.age.value = c.age
	n.desc.identity.value = c.identity
	n.desc.hair.value = c.hair
	n.desc.height.value = c.height
	n.desc.sex.value = c.sex
	n.desc.skin.value = c.skin
	n.desc.weight.value = c.weight
	n.traits.agility.score = c.agility
	n.traits.brains.score = c.brains
	n.traits.constitution.score = c.constitution
	n.traits.demeanor.score = c.demeanor
	n.skills.acrobatics.score = c.acrobatics
	n.skills.larceny.score = c.larceny
	n.skills.ranged.score = c.ranged
	n.skills.stealth.score = c.stealth
	n.skills.medicine.score = c.medicine
	n.skills.perception.score = c.perception
	n.skills.science.score = c.science
	n.skills.survival.score = c.survival
	n.skills.athletics.score = c.athletics
	n.skills.build.score = c.build
	n.skills.drive.score = c.drive
	n.skills.melee.score = c.melee
	n.skills.leadership.score = c.leadership
	n.skills.perform.score = c.perform
	n.skills.socialize.score = c.socialize
	n.skills.tame.score = c.tame
	n.props.luck.current = c.luck
	n.props.psyche.current = c.psyche
	n.health.head.current = c.head
	n.health.rightArm.current = c.rightArm
	n.health.leftArm.current = c.leftArm
	n.health.torso.current = c.torso
	n.health.leftLeg.current = c.leftLeg
	n.health.rightLeg.current = c.rightLeg
	n.abilities = [...c.abilities]
	n.gear.armor = [...c.gear.armor]
	n.gear.melee = [...c.gear.melee]
	n.gear.ranged = [...c.gear.ranged]
	n.gear.ammo = [...c.gear.ammo]
	n.gear.equipment = [...c.gear.equipment]
	n = Properties.setScores(n)
	return n
}