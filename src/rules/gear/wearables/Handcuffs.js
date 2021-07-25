import Wearable from '/src/classes/gear/Wearable.js'

const Handcuffs = new Wearable({
	name: `Handcuffs`,
	description: [`Restrained if placed on Arms.`, `Speed = 1 if placed on Legs.`, `A15# to escape.`, `Larceny(Disable) 12#.`],
	size: 1,
})

export default Handcuffs
