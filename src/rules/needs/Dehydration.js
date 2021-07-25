import Need from '/src/classes/Need.js'

const Dehydration = new Need({
	name: `Dehydration`,
	description: [
		`1 Water per day is required.`,
		`1 Pain per day without Water.`,
		`Pain penalties from Dehydration are reduced by 1 per day with Water.`,
		`Dehydration for days = [Constitution] is lethal.`,
		`Climate Humidity modifies Water requirements as follows:`,
		`Desert = 3/day.`,
		`Mountain = 2/day.`,
		`Tundra = 2/day.`,
	],
})

export default Dehydration
