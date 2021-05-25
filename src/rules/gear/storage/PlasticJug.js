import Gear from '../../../classes/Gear.js' 

const PlasticJug = new Gear({
	name: `Plastic Jug`,
	desc: [
		`Holds 2 units (1gal).`,
	],
	sz: 1
})
PlasticJug.slots = 2

export default PlasticJug