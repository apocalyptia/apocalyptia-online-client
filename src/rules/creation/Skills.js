import Creation from '/src/classes/Creation.js'

const Skills = new Creation({
	name: `Skills`,
	description: [
		`You get Brains x 6 Skill points.`,
		`Skills can range from 0 to 6.`,
		`Skill rolls are [d6 + Skill].`,
		`Trait scores set the upper limit for their Skills.`
	],
	step: 1,
	type: `Creation`
})
Skills.skillFlow = [
	`Once per month (in-game), transfer 1 point from a Skill you have not used to one that you have used.`
],
Skills.specialties = [
	`Specialties (listed below their Skills) equal their parent Skill by default.`,
	`Specialties can exceed the parent Skill by taking the Specialize Ability.`,
	`Unless otherwise noted, a Skill takes one Action.`
]
Skills.startingMultiplier = 6

export default Skills
