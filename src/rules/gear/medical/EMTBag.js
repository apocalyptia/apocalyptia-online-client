import Medical from '/src/classes/gear/Medical.js'

const EMTBag = new Medical({
	name: `EMT Bag`,
	type: `Medical`,
	description: [`+3 Medicine(First-Aid).`, `30 uses.`],
	size: 5,
})

export default EMTBag
