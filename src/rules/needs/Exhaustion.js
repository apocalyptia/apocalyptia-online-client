import Need from '$classes/Need.js'

const Exhaustion = new Need({
	name: `Exhaustion`,
	description: [
		`6 hours of sleep per day is required.`,
		`1 Pain per day without sufficient sleep.`,
		`When Pain from Exhaustion exceeds your Discipline score, you fall Unconscious and sleep for 12 hours.`,
		`Pain penalties from Exhaustion go away after 6 hours of sleep.`,
	],
})

export default Exhaustion
