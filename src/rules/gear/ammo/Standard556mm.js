import Ammo from '/src/classes/gear/Ammo.js'

const Standard556mm = new Ammo({
	name: `5.56mm Standard`,
	type: `Ammo`,
	desc: [`Basic ammunition.`],
	sz: 0.02
})
Standard556mm.cal = `5.56mm`

export default Standard556mm
