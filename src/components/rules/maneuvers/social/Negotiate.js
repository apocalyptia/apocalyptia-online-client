import Rule from 'classes/Rule.js'

const Negotiate = new Rule({
	id: `5d88546a-77df-402d-a9b5-bcab8a62fa6c`,
	name: `Negotiate`,
	desc: [
		`If opposed parties are willing to talk out their differences, each side start with a list of demands.`,
		`Roll [Socialize vs Socialize] once per demand.`,
		`Attitude and situational modifiers should be applied by the Narrator.`,
		`Success means you get your demand and the opposed negotiator concedes.`,
		`Either side can choose to concede a demand without rolling. Some desires may be non-negotiable.`,
	]
})

export default Negotiate