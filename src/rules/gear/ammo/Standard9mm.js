import Ammo from '/src/classes/gear/Ammo.js'

const Standard9mm = new Ammo({
	name: `9mm Standard`,
	type: `Ammo`,
	desc: [`Basic ammunition.`],
	sz: 0.01
})
Standard9mm.cal = `9mm`

export default Standard9mm
