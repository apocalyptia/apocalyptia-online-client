import Medical from '/src/classes/gear/Medical.js'

const SurgeryKit = new Medical({
	name: `Surgery Kit`,
	type: `Medical`,
	desc: [`+3 Medicine(Surgery).`],
	sz: 3
})

export default SurgeryKit
