import Maneuver from '/src/classes/Maneuver.js'

const Protect = new Maneuver({
	name: `Protect`,
	description: [
		`You become the new target of all Attacks targeting someone you choose within 1yd of you for 1 Round.`,
		`This does not take an Action to declare, but any Defense rolls you make take Actions as usual.`
	],
	mode: `Defensive`
})

export default Protect
