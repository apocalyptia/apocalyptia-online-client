import Gear from 'classes/Gear.js'

const ToolBelt = new Gear({
	id: `f82fec74-827a-4ce7-988e-d3f7c4da2aec`,
	name: `Tool Belt`,
	desc: [
		`6x 1 Slots.`,
		`+1 Build.`,
		`Miscellaneous small tools.`,
	],
	sz: 2
})
ToolBelt.slots = 6

export default ToolBelt