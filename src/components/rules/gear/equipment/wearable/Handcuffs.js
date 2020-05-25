import Equipment from '../Equipment'


const Handcuffs = new Equipment({
	id: `e8da5e5c-f467-4ff0-88c1-6159b6be4f8a`,
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