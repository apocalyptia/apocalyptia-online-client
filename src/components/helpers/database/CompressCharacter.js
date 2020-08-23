export default (c) => {
	return {
		id: c.id,
		user: c.user,
		completed: c.completed,
		created: c.created,
		modified: c.modified,
		age: c.desc.age.value,
		identity: c.desc.identity.value,
		hair: c.desc.hair.value,
		height: c.desc.height.value,
		sex: c.desc.sex.value,
		skin: c.desc.skin.value,
		weight: c.desc.weight.value,
		agility: c.traits.agility.score,
		brains: c.traits.brains.score,
		constitution: c.traits.constitution.score,
		demeanor: c.traits.demeanor.score,
		acrobatics: c.skills.acrobatics.score,
		larceny: c.skills.larceny.score,
		ranged: c.skills.ranged.score,
		stealth: c.skills.stealth.score,
		medicine: c.skills.medicine.score,
		perception: c.skills.perception.score,
		science: c.skills.science.score,
		survival: c.skills.survival.score,
		athletics: c.skills.athletics.score,
		build: c.skills.build.score,
		drive: c.skills.drive.score,
		melee: c.skills.melee.score,
		leadership: c.skills.leadership.score,
		perform: c.skills.perform.score,
		socialize: c.skills.socialize.score,
		tame: c.skills.tame.score,
		luck: c.props.luck.current,
		psyche: c.props.psyche.current,
		head: c.health.head.current,
		rightArm: c.health.rightArm.current,
		leftArm: c.health.leftArm.current,
		torso: c.health.torso.current,
		leftLeg: c.health.leftLeg.current,
		rightLeg: c.health.rightLeg.current,
		abilities: [...c.abilities],
		gear: {
			armor: [{...c.gear.armor}],
			melee: [{...c.gear.melee}],
			ranged: [{...c.gear.ranged}],
			ammo: [{...c.gear.ammo}],
			equipment: [{...c.gear.equipment}]
		}
	}
}