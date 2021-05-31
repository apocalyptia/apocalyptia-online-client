import Electronic from '/src/classes/gear/Electronic.js'

const NightvisionGoggles = new Electronic({
	name: `Nightvision Goggles`,
	type: `Electronics`,
	desc: [`Ignore Visibility penalties in darkness.`],
	sz: 1
})
NightvisionGoggles.dur = 43200

export default NightvisionGoggles
