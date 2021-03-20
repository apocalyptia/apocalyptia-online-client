import Rule from '/src/classes/Rule.js'

const Prone = new Rule({
	name: `Prone`,
	desc: [
		`You may drop Prone at any time for free on your turn or as part of a Dodge action.`,
		`The benefits are that you get a +3 bonus to Ranged and Stealth, and enemies beyond 10yrds take a -3 Ranged Attack penalty to hit you.`,
		`The drawbacks are that your Speed is 1yrd and you take a -3 penalty to Dodge.`,
		`Standing up takes 1 Action.`,
	],
	type: `Status`
})

export default Prone