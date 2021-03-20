import Rule from '/src/classes/Rule.js'

const Conditions = new Rule({
	name: `Conditions`, 
	desc: [
		`-1 Absorption and -1 Handling.`,
		`Roll [Drive 9#] to maintain control upon getting a Condition, otherwise the vehicle Wrecks.`,
	]
})

export default Conditions