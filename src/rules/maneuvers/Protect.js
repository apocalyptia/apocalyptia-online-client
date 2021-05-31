import Maneuver from '/src/classes/Maneuver.js'

const Protect = new Maneuver({
	name: `Protect`,
	desc: [
		`You become the new target of all Attacks targeting someone you choose within 1yd of you for 1 round.`,
		`This does not take an Action to declare, but any Defense rolls you make take Actions as usual.`
	],
	type: `Defensive`
})

export default Protect
