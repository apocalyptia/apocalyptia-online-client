import Gear from '/src/classes/Gear.js'

const ToolBelt = new Gear({
	id: ``,
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