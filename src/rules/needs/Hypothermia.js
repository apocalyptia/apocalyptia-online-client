import Need from '/src/classes/Need.js'

const Hypothermia = new Need({
	name: `Hypothermia`,
	description: [
		`Body temperature must be maintained to avoid Hypothermia.`,
		`1 Pain per hour of Hypothermia.`,
		`Pain penalties from Hypothermia are reduced by 1 per hour of warmth.`,
		`Hypothermia for hours = [Constitution] is lethal.`
	]
})

export default Hypothermia
