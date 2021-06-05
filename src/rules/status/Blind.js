import Status from '/src/classes/Status.js'

const Blind = new Status({
	name: `Blind`,
	description: [
		`You are considered to be Defenseless.`,
		`You automatically Fail any Perception roll that involves seeing.`,
		`You have a -6 penalty to all other rolls that involve seeing.`,
		`This includes Attacks, in which case all opponents are considered to be Concealed from you.`
	],
	type: `Status`
})

export default Blind
