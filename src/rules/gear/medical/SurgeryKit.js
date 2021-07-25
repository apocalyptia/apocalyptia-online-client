import Medical from '/src/classes/gear/Medical.js'

const SurgeryKit = new Medical({
	name: `Surgery Kit`,
	type: `Medical`,
	description: [`+3 Medicine(Surgery).`],
	size: 3,
})

export default SurgeryKit
