import Ammo from '/src/classes/gear/Ammo.js'

const Standard556 = new Ammo({
	name: `5.56mm Standard`,
	type: `Ammo`,
	desc: [`Basic ammunition.`],
	sz: 0.02
})
Standard556.cal = `5.56`

export default Standard556
