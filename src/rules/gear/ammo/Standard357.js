import Ammo from '/src/classes/gear/Ammo.js'

const Standard357 = new Ammo({
	name: `.357 Standard`,
	type: `Ammo`,
	desc: [`Basic ammunition.`],
	sz: 0.01
})
Standard357.cal = `.357`

export default Standard357
