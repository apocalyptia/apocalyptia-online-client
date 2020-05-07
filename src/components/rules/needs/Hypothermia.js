import Rule from '../../rules/Rule'


const Hypothermia = new Rule({
	name: `Hypothermia`, 
	desc: [
		`Warmth is required.`,
		`1 Pain per hour of Hypothermia.`,
		`Reduce penalty by 1 per hour of warmth.`,
		`Hypothermia for hours = [Constitution] is lethal.`,
	]
})

export default Hypothermia