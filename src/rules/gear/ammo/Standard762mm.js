import Ammo from '/src/classes/gear/Ammo.js'

const Standard762mm = new Ammo({
	name: `7.62mm Standard`,
	type: `Ammo`,
	desc: [`Basic ammunition.`],
	sz: 0.02
})
Standard762mm.cal = `7.62mm`

export default Standard762mm
