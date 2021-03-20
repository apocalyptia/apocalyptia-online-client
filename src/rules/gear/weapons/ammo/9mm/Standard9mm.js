import Gear from '/src/classes/Gear.js'

const Standard9mm = new Gear({
	id: ``,
	name: `9mm Standard`,
	type: `Ammo`,
	desc: [
		`Basic ammunition.`,
	],
	sz: 0.01
})
Standard9mm.cal = `9mm`

export default Standard9mm