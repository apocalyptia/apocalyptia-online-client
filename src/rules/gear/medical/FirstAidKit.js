import Medical from '/src/classes/gear/Medical.js'

const FirstAidKit = new Medical({
	name: `First-Aid Kit`,
	type: `Medical`,
	desc: [`+1 Medicine(First-Aid).`, `5 uses.`],
	sz: 1
})

export default FirstAidKit
