import Storage from './Storage'


const Canteen = new Storage({
	name: `Canteen`,
	desc: [
		`Holds 1 unit (.5gal) of liquid.`,
		`Metal.`,
	],
	sz: 1,
	slots: 1
})

export default Canteen