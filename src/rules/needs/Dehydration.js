import Rule from 'classes/Rule.js'

const Dehydration = new Rule({
	name: `Dehydration`,
	desc: [
		`1 Water per day is required.`,
		`1 Pain per day without Water.`,
		`This penalty is reduced by 1 per day with Water.`,
		`Going without Water for a number of days = [Constitution] is lethal.`,
		`Climate Humidity modifies Water requirements as follows: Desert, 3/day. Mountain, 2/day. Tundra, 2/day.`,
	]
})

export default Dehydration