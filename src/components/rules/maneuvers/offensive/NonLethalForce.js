import Maneuver from '../Maneuver'


const NonLethalForce = new Maneuver({
	cat: `Offensive`,
	name: `Non-Lethal Force`,
	desc: [
		`Declare that you are using this Maneuver before rolling a Melee Attack.`,
		`On a Success, you do half Damage.`,
	]
})

export default NonLethalForce