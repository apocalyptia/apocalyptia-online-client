import Need from '/src/classes/Need.js'

const Starvation = new Need({
	name: `Starvation`,
	description: [
		`1 Food per day is normally optimal.`,
		`1 Pain per day for the first 3 days without Food.`,
		`After that, the Pain reduces to 1 until you eat.`,
		`Pain penalties from Starvation go away after you eat Food.`,
		`Starvation for weeks = [Constitution] is lethal.`,
	],
})

export default Starvation
