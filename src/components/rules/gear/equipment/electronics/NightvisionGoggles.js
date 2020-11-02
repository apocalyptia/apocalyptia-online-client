import Gear from 'classes/Gear.js'

const NightvisionGoggles = new Gear({
	name: `Nightvision Goggles`,
	desc: [
		`Ignore Visibility penalties in darkness.`,
	],
	sz: 1
})
NightvisionGoggles.dur = 43200

export default NightvisionGoggles