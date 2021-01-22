import Rule from '$classes/Rule.js'

const Exhaustion = new Rule({
	name: `Exhaustion`,
	desc: [
		`8 hours of sleep per day is required.`,
		`1 Pain per day without sufficient sleep.`,
		`Go unconscious for 8 hours after days = [Constitution] without sleep.`,
		`Penalties go away after 8 hours of sleep.`,
	]
})

export default Exhaustion