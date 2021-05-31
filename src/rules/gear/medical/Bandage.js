import Medical from '/src/classes/gear/Medical.js'

const Bandage = new Medical({
	name: `Bandage`,
	type: `Medical`,
	desc: [`+1 Medicine(First-Aid).`, `1 use.`],
	sz: 0
})

export default Bandage
