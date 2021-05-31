import Storage from '/src/classes/gear/Storage.js'

const Canteen = new Storage({
	name: `Canteen`,
	desc: [`Holds 1 unit (.5gal) of liquid.`, `Metal.`],
	sz: 1
})
Canteen.slots = 1

export default Canteen
