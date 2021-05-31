import Maneuver from '/src/classes/Maneuver.js'

const Negotiate = new Maneuver({
	name: `Negotiate`,
	desc: [
		`If opposed parties are willing to talk out their differences, each side start with a list of demands.`,
		`Roll [Socialize vs Socialize] once per demand.`,
		`Attitude and situational modifiers should be applied by the Narrator.`,
		`Success means you get your demand and the opposed negotiator concedes.`,
		`Either side can choose to concede a demand without rolling. Some desires may be non-negotiable.`
	],
	type: `Social`
})

export default Negotiate
