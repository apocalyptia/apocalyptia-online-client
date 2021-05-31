import Maneuver from '/src/classes/Maneuver.js'

const Grab = new Maneuver({
	name: `Grab`,
	desc: [`Roll [Melee(Unarmed) vs DEF] to impose the 'Grabbed' Status.`],
	mode: `Offensive`
})

export default Grab
