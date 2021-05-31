import Ammo from '/src/classes/gear/Ammo.js'

const Standard22 = new Ammo({
	name: `.22 Standard`,
	type: `Ammo`,
	desc: [`Basic ammunition.`],
	sz: 0.005
})
Standard22.cal = `.22`

export default Standard22
