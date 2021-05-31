import Electronic from '/src/classes/gear/Electronic.js'

const HandRadio = new Electronic({
	name: `Hand Radio`,
	type: `Electronics`,
	desc: [`9-channel 2-way radio.`, `3 mile range.`],
	sz: 1
})
HandRadio.dur = 10800

export default HandRadio
