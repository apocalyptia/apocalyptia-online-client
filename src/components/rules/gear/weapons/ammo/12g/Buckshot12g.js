import Ammo from 'gear/weapons/ammo/Ammo.js'
import Scatter from 'gear/attributes/weapon/Scatter.js'


const Buckshot12g = new Ammo({
	id: `facd4679-38bc-4a4d-9da9-8dda5d569094`,
	name: `12g Buckshot`,
	desc: [
		`Scatter-shot ammunition.`,
	],
	sz: 0.05,
	cal: `12g`,
	attr: [
		Scatter,
	]
})

export default Buckshot12g