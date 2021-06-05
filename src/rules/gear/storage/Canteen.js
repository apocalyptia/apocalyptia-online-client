import Storage from '/src/classes/gear/Storage.js'

const Canteen = new Storage({
	name: `Canteen`,
	description: [`Holds 1 unit (.5gal) of liquid.`, `Metal.`],
	slots: 1,
	size: 1
})

export default Canteen
