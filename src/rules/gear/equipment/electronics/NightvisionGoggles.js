import Gear from '$classes/Gear.js'

const NightvisionGoggles = new Gear({
	id: ``,
	name: `Nightvision Goggles`,
	type: `Electronics`,
	desc: [
		`Ignore Visibility penalties in darkness.`,
	],
	sz: 1
})
NightvisionGoggles.dur = 43200

export default NightvisionGoggles