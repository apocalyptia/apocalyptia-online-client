import Maneuver from '/src/classes/Maneuver.js'

const Grab = new Maneuver({
	name: `Grab`,
	desc: [`Roll [Melee(Unarmed) vs DEF] to impose the 'Grabbed' Status.`],
	type: `Offensive`
})

export default Grab
