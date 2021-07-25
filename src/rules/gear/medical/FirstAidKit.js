import Medical from '/src/classes/gear/Medical.js'

const FirstAidKit = new Medical({
	name: `First-Aid Kit`,
	type: `Medical`,
	description: [`+1 Medicine(First-Aid).`, `5 uses.`],
	size: 1,
})

export default FirstAidKit
