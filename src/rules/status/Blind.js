import Rule from '$classes/Rule.js'

const Blind = new Rule({
	name: `Blind`,
	desc: [
		`You are considered to be Defenseless.`,
		`You automatically Fail any Perception roll that involves seeing.`,
		`You have a -6 penalty to all other rolls that involve seeing.`,
		`This includes Attacks, in which case all opponents are considered to be Concealed from you.`,
	],
	type: `Status`
})

export default Blind