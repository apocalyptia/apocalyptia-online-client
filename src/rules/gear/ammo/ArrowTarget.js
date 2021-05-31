import Ammo from '/src/classes/gear/Ammo.js'

const ArrowTarget = new Ammo({
	name: `Target Arrow`,
	type: `Ammo`,
	desc: [`Practice arrow.`],
	sz: 0.1
})
ArrowTarget.cal = `Arrow`

export default ArrowTarget
