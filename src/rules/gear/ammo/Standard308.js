import Ammo from '/src/classes/gear/Ammo.js'

const Standard308 = new Ammo({
	name: `.308 Standard`,
	type: `Ammo`,
	desc: [`Basic ammunition.`],
	sz: 0.02
})
Standard308.cal = `.308`

export default Standard308
