import Rule from '../../rules/Rule'


const Exhaustion = new Rule({
	id: `0494a41e-f8f8-45f5-a1ef-5660900e37db`,
	name: `Exhaustion`,
	desc: [
		`8 hours of sleep per day is required.`,
		`1 Pain per day without sufficient sleep.`,
		`Go unconscious for 8 hours after days = [Constitution] without sleep.`,
		`Penalties go away after 8 hours of sleep.`,
	]
})

export default Exhaustion