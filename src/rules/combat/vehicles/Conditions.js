import Rule from 'classes/Rule.js'

const Conditions = new Rule({
	name: `Conditions`, 
	desc: [
		`-1 Damage Resistance and -1 Handling.`,
		`Roll [Drive 9#] to maintain control upon getting a Condition, otherwise the vehicle Wrecks.`,
	]
})

export default Conditions