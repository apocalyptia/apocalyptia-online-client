import Electronic from '/src/classes/gear/Electronic.js'

const Lantern = new Electronic({
	name: `Lantern`,
	type: `Electronics`,
	desc: [`3yd light radius.`],
	sz: 2
})
Lantern.dur = 7200

export default Lantern
