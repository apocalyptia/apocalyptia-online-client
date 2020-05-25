import Rule from '../../rules/Rule'
import Conditions from './vehicles/Conditions'
import Occupants from './vehicles/Occupants'
import Pedestrians from './vehicles/Pedestrians'
import Tires from './vehicles/Tires'
import Wreck from './vehicles/Wreck'
import Burning from './vehicles/Burning'


const Vehicles = new Rule({
	id: `c2660769-4cdf-4822-74d1-cdd443e33324`,
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