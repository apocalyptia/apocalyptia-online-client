import Rule from 'classes/Rule.js'
import Conditions from 'combat/vehicles/Conditions.js'
import Occupants from 'combat/vehicles/Occupants.js'
import Pedestrians from 'combat/vehicles/Pedestrians.js'
import Tires from 'combat/vehicles/Tires.js'
import Wreck from 'combat/vehicles/Wreck.js'
import Burning from 'combat/vehicles/Burning.js'

const Vehicles = new Rule({
	name: `Vehicles`, 
	desc: [
		`Roll [Drive(Ram) vs Drive(Stunt)] to hit an enemy vehicle.`,
		`If [loser’s Damage Resistance <= winner’s Damage Resistance], or if a vehicle takes [Damage > Damage Resistance], the vehicle gets a Condition.`,
		`0 Damage Resistance disables a vehicle.`,
		`A Botch is a Wreck.`,
	],
	subrules: [
		Conditions,
		Occupants,
		Pedestrians,
		Tires,
		Wreck,
		Burning,
	]
})

export default Vehicles