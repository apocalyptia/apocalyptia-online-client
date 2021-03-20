import Gear from '/src/classes/Gear.js'

const Suppressor = new Gear({
	id: ``,
	name: `Suppressor`,
	type: `Accessory`,
	desc: [
		`Firing a Gun does not break Concealment.`,
	],
	sz: 1
})

export default Suppressor