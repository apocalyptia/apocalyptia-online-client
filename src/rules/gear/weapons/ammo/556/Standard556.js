import Gear from '/src/classes/Gear.js'

const Standard556 = new Gear({
	id: ``,
	name: `5.56mm Standard`,
	type: `Ammo`,
	desc: [
		`Basic ammunition.`,
	],
	sz: 0.02
})
Standard556.cal = `5.56`

export default Standard556