import Ammo from '/src/classes/gear/Ammo.js'

const Standard22LR = new Ammo({
	name: `.22LR Standard`,
	type: `Ammo`,
	desc: [`Basic ammunition.`],
	sz: 0.005
})
Standard22LR.cal = `.22LR`

export default Standard22LR
