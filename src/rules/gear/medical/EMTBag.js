import Medical from '/src/classes/gear/Medical.js'

const EMTBag = new Medical({
	name: `EMT Bag`,
	type: `Medical`,
	desc: [`+3 Medicine(First-Aid).`, `30 uses.`],
	sz: 5
})

export default EMTBag
