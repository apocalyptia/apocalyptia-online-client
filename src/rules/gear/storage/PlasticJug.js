import Storage from '/src/classes/gear/Storage.js'

const PlasticJug = new Storage({
	name: `Plastic Jug`,
	desc: [`Holds 2 units (1gal).`],
	sz: 1
})
PlasticJug.slots = 2

export default PlasticJug
