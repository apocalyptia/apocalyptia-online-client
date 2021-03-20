import Gear from '/src/classes/Gear.js'

const Standard308 = new Gear({
	id: ``,
	name: `.308 Standard`,
	type: `Ammo`,
	desc: [
		`Basic ammunition.`,
	],
	sz: 0.02
})
Standard308.cal = `.308`

export default Standard308