import Electronic from '/src/classes/gear/Electronic.js'

const Lantern = new Electronic({
	name: `Lantern`,
	type: `Electronics`,
	description: [`3yd light radius.`],
	duration: 7200,
	size: 2,
})

export default Lantern
