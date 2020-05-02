import Maneuver from '../../../classes/Maneuver'


const Sneak = new Maneuver({
	cat: `Defensive`,
	name: `Sneak`, 
	desc: [
		`Roll [Stealth vs Perception] to move Concealed at [Speed / 2].`,
	]
})

export default Sneak