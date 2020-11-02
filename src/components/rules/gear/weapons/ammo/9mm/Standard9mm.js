import Gear from 'classes/Gear.js'

const Standard9mm = new Gear({
	name: `9mm Standard`,
	desc: [
		`Basic ammunition.`,
	],
	sz: 0.01
})
Standard9mm.cal = `9mm`

export default Standard9mm