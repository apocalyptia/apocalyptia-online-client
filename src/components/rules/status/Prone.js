import Rule from 'classes/Rule.js'

const Prone = new Rule({
	name: `Prone`,
	desc: [
		`You may drop Prone at any time for free on your turn or as part of a Dodge action.`,
		`Standing up takes 1 Action.`,
		`The benefits of being Prone are that you get +3 Ranged and +3 Stealth, and attackers take a -3 Ranged penalty to hit you.`,
		`The drawbacks of being Prone are that your Speed drops to 1yrd and attackers get a +3 Melee bonus to hit you.`,
	],
	type: `Status`
})

export default Prone