import Rule from 'rules/Rule.js'

const Botch = new Rule({
	id: `9d933f25-f236-4674-7c40-d34764f96f72`,
	name: `Botch`,
	desc: [
		`A Botch is when you have failed very very badly at a Trait, Skill, or Property roll.`,
		`If you roll 1 on a die and that die is not Exploding, re-roll to check for a Botch.`,
		`If a 1 is rolled again, you Botch.`,
		`If any other number is rolled, your d6 roll is counted as a normal 1.`,
		`The Narrator has a great deal of latitude to be creative when determining the effects of Botching under various circumstances, but they should always be fair.`,
		`Whenever a Character Botches, they get +1 XP because we learn the most from our greatest failures.`,
	]
})

export default Botch