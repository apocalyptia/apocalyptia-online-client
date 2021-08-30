import Medical from '/src/classes/gear/Medical.js'

const Bandage = new Medical({
	name: `Bandage`,
	type: `Medical`,
	description: [`+1 Medicine (First-Aid).`, `1 use.`],
	size: 0,
})

export default Bandage
