import Rule from '../../rules/Rule'


const Blind = new Rule({
	id: `5fb3123f-b7f0-4e09-acfb-10ed93b675a8`,
	name: `Blind`,
	desc: [
		`You are considered to be Defenseless.`,
		`You automatically Fail any Perception roll that involves seeing.`,
		`You have a -6 penalty to all other rolls that involve seeing.`,
		`This includes Attacks, in which case all opponents are considered to be Concealed from you.`,
	]
})

export default Blind