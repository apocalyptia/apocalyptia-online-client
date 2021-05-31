import Need from '/src/classes/Need.js'

const Hypothermia = new Need({
	name: `Hypothermia`,
	desc: [
		`Body temperature must be maintained to avoid Hypothermia.`,
		`1 Pain per hour of Hypothermia.`,
		`Reduce penalty by 1 per hour of warmth.`,
		`Hypothermia for hours = [Constitution] is lethal.`
	]
})

export default Hypothermia
