import Maneuver from '../../../classes/Maneuver'


const Protect = new Maneuver({
	cat: `Defensive`,
	name: `Protect`, 
	desc: [
		`You become the new target of all Attacks targeting someone you choose within 1yd of you for 1 round.`,
		`You may still Block, but you cannot Dodge the Attack.`,
		// How does this work with Reflexive Defenses?
	]
})

export default Protect