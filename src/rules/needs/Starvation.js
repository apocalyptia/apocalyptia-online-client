import Rule from '$classes/Rule.js'

const Starvation = new Rule({
	name: `Starvation`,
	desc: [
		`1 Food per day is normally optimal.`,
		`1 Pain per day for the first 3 days without Food.`,
		`After that, the Pain reduces to 1 until you eat.`,
		`The Pain goes away when you eat Food.`,
		`Going without Food for a number of months = [Constitution] is lethal.`,
	]
})

export default Starvation