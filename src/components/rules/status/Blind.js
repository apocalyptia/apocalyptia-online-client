import Rule from '../../rules/Rule'


const Blind = new Rule({
	name: `Blind`, 
	desc: [
		`You are considered to be Defenseless.`,
		`You automatically Fail any Perception roll that involves seeing.`,
		`You have a -6 penalty to all other rolls that involve seeing.`,
		`This includes Attacks, in which case all opponents are considered to be Concealed from you.`,
	]
})

export default Blind