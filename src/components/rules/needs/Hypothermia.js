import Rule from 'classes/Rule.js'

const Hypothermia = new Rule({
	id: `1625c80c-5630-4f20-b909-ed91dbce371b`,
	name: `Hypothermia`,
	desc: [
		`Warmth is required.`,
		`1 Pain per hour of Hypothermia.`,
		`Reduce penalty by 1 per hour of warmth.`,
		`Hypothermia for hours = [Constitution] is lethal.`,
	]
})

export default Hypothermia