import Maneuver from '../Maneuver'


const Grab = new Maneuver({
	cat: `Offensive`,
	name: `Grab`,
	desc: [
		`Roll [Melee(Unarmed) vs DEF] to impose the 'Grabbed' Status.`,
	]
})

export default Grab