import Rule from '../../classes/Rule.js' 

const NonLethalForce = new Rule({
	name: `Non-Lethal Force`,
	desc: [
		`Declare that you are using this Maneuver before rolling a Melee Attack.`,
		`On a Success, you do half Damage.`,
	],
	type: `Offensive`
})

export default NonLethalForce