import Wearable from '/src/classes/gear/Wearable.js'

const ToolBelt = new Wearable({
	name: `Tool Belt`,
	desc: [`6x 1 Slots.`, `+1 Build.`, `Misc small tools.`],
	sz: 2
})
ToolBelt.slots = 6

export default ToolBelt
