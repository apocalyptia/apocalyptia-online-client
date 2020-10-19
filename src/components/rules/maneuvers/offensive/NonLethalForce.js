import Maneuver from 'rules/maneuvers/Maneuver.js'


const NonLethalForce = new Maneuver({
	id: `76fb1603-4c1d-4b07-a128-c73927f2f036`,
	cat: `Offensive`,
	name: `Non-Lethal Force`,
	desc: [
		`Declare that you are using this Maneuver before rolling a Melee Attack.`,
		`On a Success, you do half Damage.`,
	]
})

export default NonLethalForce