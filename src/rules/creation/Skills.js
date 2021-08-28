import CreationStep from '/src/classes/CreationStep.js'

const skillMultiplier = 6

const maxSkills = 6

const Skills = new CreationStep({
	name: `Skills`,
	description: [
		`You get Brains x ${skillMultiplier} Skill points.`,
		`Skills can range from 0 to ${maxSkills}.`,
		`Skill rolls are [d6 + Skill].`,
		`Trait scores set the upper limit for their Skills.`
	],
	subrules: [
		{
			name: `Skill Flow`,
			description: [
				`Once per month (in-game), transfer 1 point from a Skill you have not used to one that you have used.`
			],
		},
		{
			name: `Skill Specialties`,
			description: [
				`Specialties (listed below their Skills) equal their parent Skill by default.`,
				`Specialties can exceed the parent Skill by taking the Specialize Ability.`,
				`Unless otherwise noted, a Skill takes one Action.`
			]
		}
	],
	step: 1,
	type: `CreationStep`,
})
Skills.startingMultiplier = skillMultiplier

export default Skills
