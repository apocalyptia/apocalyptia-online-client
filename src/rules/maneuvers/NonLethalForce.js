import Maneuver from '$classes/Maneuver.js'

const NonLethalForce = new Maneuver({
	name: `Non-Lethal Force`,
	description: [
		`Declare that you are using this Maneuver before rolling a Melee Attack.`,
		`On a Success, you do half Damage.`
	],
	mode: `Offensive`
})

export default NonLethalForce
