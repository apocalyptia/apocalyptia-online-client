import Rule from 'rules/Rule.js'

const NonLethalForce = new Rule({
	id: `76fb1603-4c1d-4b07-a128-c73927f2f036`,
	name: `Non-Lethal Force`,
	desc: [
		`Declare that you are using this Maneuver before rolling a Melee Attack.`,
		`On a Success, you do half Damage.`,
	]
})

export default NonLethalForce