import Ability from '../../classes/Ability'


const VehicleOperation = new Ability({
	name: `Vehicle Operation`,
	desc: [
		`Proficiently operate a class of vehicle.`,
	],
	max: 1,
	xp: 6
}) // TODO: Need to add VehicleList when it is made

export default VehicleOperation