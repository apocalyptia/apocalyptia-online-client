import Ammo from '/src/classes/gear/Ammo.js'
import Scatter from '../attributes/Scatter.js'

const Buckshot12g = new Ammo({
	name: `12g Buckshot`,
	type: `Ammo`,
	desc: [`Scatter-shot ammunition.`],
	sz: 0.05,
	attr: [Scatter]
})
Buckshot12g.cal = `12g`

export default Buckshot12g
