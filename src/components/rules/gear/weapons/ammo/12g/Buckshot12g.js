import Ammo from '../Ammo'
import Scatter from '../../../attributes/weapon/Scatter'


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