import Rule from '/src/classes/Rule.js'

const Protect = new Rule({
	name: `Protect`, 
	desc: [
		`You become the new target of all Attacks targeting someone you choose within 1yd of you for 1 round.`,
		`This does not take an Action to declare, but any Defense rolls you make take Actions as usual.`,
	]
})

export default Protect