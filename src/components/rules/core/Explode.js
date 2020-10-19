import Rule from 'rules/Rule.js'


const Explode = new Rule({
	id: `6da8a818-56c8-417a-2c98-c2f9bbde7aa5`,
	name: `Explode`,
	desc: [
		`An Exploding die offers the possibility of doing extraordinarily well at a Trait, Skill, or Property roll.`,
		`If a 6 is rolled, roll it again and keep rolling as long as the die continues to roll a 6.`,
		`When the die finally stops Exploding, add all of these rolls together, then add scores and modifiers as usual to get your Result.`,
	]
})

export default Explode