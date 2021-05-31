import Armor from '/src/classes/gear/Armor.js'

const AthleticPads = new Armor({
	name: `Athletic Pads`,
	sz: 2,
	type: `Armor`
})
AthleticPads.dr = 1
AthleticPads.loc = `Torso`

export default AthleticPads
