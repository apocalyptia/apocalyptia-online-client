import Core from '$classes/Core.js'

const Botch = new Core({
	name: `Botch`,
	description: [
		`A Botch is when you have failed very very badly at a Trait or Skill roll.`,
		`If you roll 1 on a die and that die is not Exploding, re-roll to check for a Botch.`,
		`If a 1 is rolled again, you Botch.`,
		`If any other number is rolled, your d6 roll is counted as a normal 1.`,
		`The Narrator has a great deal of latitude to be creative when determining the effects of Botching under various circumstances, but they should always be fair.`,
		`Whenever a Character Botches, they get +1 XP because we learn the most from our greatest failures.`,
	],
})

export default Botch
