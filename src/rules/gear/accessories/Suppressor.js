import Accessory from '/src/classes/gear/Accessory.js'

const Suppressor = new Accessory({
	name: `Suppressor`,
	type: `Accessory`,
	desc: [`Firing a Gun does not break Concealment.`],
	sz: 1
})

export default Suppressor
