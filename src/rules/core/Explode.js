import Core from '/src/classes/Core.js'

const Explode = new Core({
	name: `Explode`,
	description: [
		`An Exploding die offers the possibility of doing extraordinarily well at a Trait, Skill, or Property roll.`,
		`If a 6 is rolled, roll it again and keep rolling as long as the die continues to roll a 6.`,
		`When the die finally stops Exploding, add all of these rolls together, then add scores and modifiers as usual to get your Result.`
	]
})

export default Explode
