import Gear from '/src/classes/Gear.js'

const Handcuffs = new Gear({
	id: ``,
	name: `Handcuffs`,
	desc: [
		`Restrained if placed on Arms.`,
		`Speed = 1 if placed on Legs.`,
		`A15# to escape.`,
		`Larceny(Disable) 12#.`,
	],
	sz: 1
})

export default Handcuffs