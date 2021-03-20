import Rule from '/src/classes/Rule.js'
import Conditions from '/src/rules/combat/subrules/vehicles/Conditions.js'
import Occupants from '/src/rules/combat/subrules/vehicles/Occupants.js'
import Pedestrians from '/src/rules/combat/subrules/vehicles/Pedestrians.js'
import Tires from '/src/rules/combat/subrules/vehicles/Tires.js'
import Wreck from '/src/rules/combat/subrules/vehicles/Wreck.js'
import Burning from '/src/rules/combat/subrules/vehicles/Burning.js'

const Vehicles = new Rule({
	name: `Vehicles`, 
	desc: [
		`Roll [Drive(Ram) vs Drive(Stunt)] to hit an enemy vehicle.`,
		`If [loser’s Structure <= winner’s Structure], or if a vehicle takes [Damage > Structure], the vehicle gets a Condition.`,
		`0 Structure disables a vehicle.`,
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