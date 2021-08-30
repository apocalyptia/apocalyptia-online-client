import Combat from '/src/classes/Combat.js'
import Conditions from './combat/subrules/vehicles/Conditions.js'
import Occupants from './combat/subrules/vehicles/Occupants.js'
import Pedestrians from './combat/subrules/vehicles/Pedestrians.js'
import Tires from './combat/subrules/vehicles/Tires.js'
import Wreck from './combat/subrules/vehicles/Wreck.js'
import Burning from './combat/subrules/vehicles/Burning.js'

const Vehicles = new Combat({
	name: `Vehicles`,
	description: [
		`Roll [ Drive (Ram) vs Drive (Stunt) ] to hit an enemy vehicle.`,
		`If [loser’s Structure <= winner’s Structure], or if a vehicle takes [ Damage > Structure], the vehicle gets a Condition.`,
		`0 Structure disables a vehicle.`,
		`A Botch is a Wreck.`,
	],
	subrules: [ Conditions, Occupants, Pedestrians, Tires, Wreck, Burning],
})

export default Vehicles
