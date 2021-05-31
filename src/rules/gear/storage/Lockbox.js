import Storage from '/src/classes/gear/Storage.js'

const Lockbox = new Storage({
	name: `Lockbox`,
	desc: [`2 Absorption.`, `Fire Resistance.`, `Larceny(Disable) 9#.`],
	sz: 2
})
Lockbox.slots = 1

export default Lockbox
