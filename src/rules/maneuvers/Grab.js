import Maneuver from '$classes/Maneuver.js'

const Grab = new Maneuver({
	name: `Grab`,
	description: [`Roll [ Melee ( Unarmed ) vs DEF ] to impose the 'Grabbed' Status.`],
	mode: `Offensive`,
})

export default Grab
